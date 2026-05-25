// main.js — slim entry. Wires up nav, theme, footer, page content, then hands off to motion.

import { startMotion } from "./motion.js";
import { renderWorkList, renderCaseStudies, initProjectFilters, bindContactLinks } from "./pages.js";

/* -----------------------------------------------------------------------------
   Theme
   -------------------------------------------------------------------------- */
function applyTheme(theme) {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("dark-mode", theme === "dark");
}

function initTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    applyTheme(initial);

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const next = document.documentElement.classList.contains("dark-mode") ? "light" : "dark";
            localStorage.setItem("theme", next);
            applyTheme(next);
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) applyTheme(e.matches ? "dark" : "light");
    });
}

/* -----------------------------------------------------------------------------
   Nav: scrolled state, active link, mobile toggle, Athens clock
   -------------------------------------------------------------------------- */
function initNav() {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach((a) => {
        const href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
        if (href === current || (current === "" && href === "index.html")) {
            a.classList.add("is-active");
        }
    });

    const toggle = document.getElementById("mobile-nav-toggle");
    const links = document.getElementById("nav-links");
    if (toggle && links) {
        const close = () => {
            links.classList.remove("is-open");
            toggle.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("no-scroll");
        };
        toggle.addEventListener("click", () => {
            const open = !links.classList.contains("is-open");
            links.classList.toggle("is-open", open);
            toggle.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("no-scroll", open);
        });
        links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") close();
        });
    }

    // Athens clock — updates every minute
    const clockEl = document.querySelector(".nav-clock .time");
    if (clockEl) {
        const updateClock = () => {
            try {
                const now = new Date();
                const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Athens" };
                clockEl.textContent = new Intl.DateTimeFormat("en-GB", opts).format(now);
            } catch {
                clockEl.textContent = "";
            }
        };
        updateClock();
        setInterval(updateClock, 30 * 1000);
    }
}

/* -----------------------------------------------------------------------------
   Page-ready signal — fires hero reveal once the document is interactive.
   -------------------------------------------------------------------------- */
function announceReady() {
    window.dispatchEvent(new CustomEvent("lnv:page-ready"));
}

/* -----------------------------------------------------------------------------
   Footer injection
   -------------------------------------------------------------------------- */
function injectFooter(root) {
    const host = document.getElementById("footer-root");
    if (!host) return;
    const c = typeof CONTACT_DETAILS !== "undefined" ? CONTACT_DETAILS : {};
    const f = typeof FOOTER_CONTENT !== "undefined" ? FOOTER_CONTENT : {};
    const year = f.year || new Date().getFullYear();

    const githubSvg = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.45 24 17.12 24 12.02 24 5.74 18.27.5 12 .5z"/></svg>`;
    const linkedinSvg = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>`;

    const prefix = root.dataset.linkPrefix || "";

    host.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-mark">LV<span class="dot">.</span></div>
                    <p>Simplicity crafted through vision and precision. Building software for founders and teams who value clarity.</p>
                </div>
                <div class="footer-col">
                    <h4>Navigate</h4>
                    <ul>
                        <li><a href="${prefix}index.html">Home</a></li>
                        <li><a href="${prefix}projects.html">Projects</a></li>
                        <li><a href="${prefix}case-studies.html">Case Studies</a></li>
                        <li><a href="${prefix}contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Elsewhere</h4>
                    <ul>
                        <li><a href="mailto:${c.email || ""}" class="magnetic">${c.email || ""}</a></li>
                        <li><a href="tel:${(c.phone || "").replace(/\s+/g, "")}">${c.phone || ""}</a></li>
                        <li>${c.address || ""}</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© ${year} ${f.name || "Loukas-Nikolaos Vetoulis"}</span>
                <div class="footer-socials">
                    <a href="${c.github || "#"}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${githubSvg}</a>
                    <a href="${c.linkedin || "#"}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${linkedinSvg}</a>
                </div>
            </div>
        </div>
    `;
}

/* -----------------------------------------------------------------------------
   Page renderers — fire based on what containers exist
   -------------------------------------------------------------------------- */
function renderPage() {
    const home = document.getElementById("featured-work");
    if (home && typeof FEATURED_PROJECTS !== "undefined") {
        renderWorkList(home, FEATURED_PROJECTS);
    }

    const allProjects = document.getElementById("all-work");
    if (allProjects && typeof PROJECTS !== "undefined") {
        renderWorkList(allProjects, PROJECTS);
        const chips = document.getElementById("filter-chips");
        if (chips) initProjectFilters(chips, allProjects);
    }

    const csHome = document.getElementById("case-studies-home");
    if (csHome && typeof CASE_STUDIES_DATA !== "undefined") {
        renderCaseStudies(csHome, CASE_STUDIES_DATA);
    }

    const csAll = document.getElementById("case-studies-all");
    if (csAll && typeof CASE_STUDIES_DATA !== "undefined") {
        renderCaseStudies(csAll, CASE_STUDIES_DATA);
    }

    bindContactLinks();
}

/* -----------------------------------------------------------------------------
   Bootstrap
   -------------------------------------------------------------------------- */
function boot() {
    const root = document.documentElement;
    initTheme();
    initNav();
    injectFooter(root);
    renderPage();
    startMotion();
    requestAnimationFrame(announceReady);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
} else {
    boot();
}
