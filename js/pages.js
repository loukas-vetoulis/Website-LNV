// pages.js — page-specific content renderers driven by data.js globals
// (PROJECTS, FEATURED_PROJECTS, CASE_STUDIES_DATA, CONTACT_DETAILS, FOOTER_CONTENT)

const escapeHtml = (str = "") =>
    String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const resolveLink = (p) => p.caseStudyLink || p.liveLink || p.githubLink || null;
const pad2 = (n) => String(n).padStart(2, "0");

/* -----------------------------------------------------------------------------
   Editorial work list (used by home + projects pages)
   -------------------------------------------------------------------------- */
export function renderWorkList(container, projects, opts = {}) {
    if (!container || !projects?.length) return;
    container.innerHTML = "";

    projects.forEach((project, i) => {
        const href = resolveLink(project);
        const tag = href ? "a" : "div";
        const row = document.createElement(tag);
        row.className = "work-row reveal-row";
        if (project.imageUrl) row.dataset.thumb = project.imageUrl;
        if (href) row.href = href;
        if (href && !project.caseStudyLink && href !== "#") {
            row.target = "_blank";
            row.rel = "noopener noreferrer";
        }
        if (project.type) row.dataset.type = project.type.toLowerCase();

        const stackMeta = (project.stack || []).slice(0, 4).map((s) => `<span>${escapeHtml(s)}</span>`).join("");
        const typeLine = [project.type, project.company, project.period ? `(${project.period})` : null]
            .filter(Boolean).map(escapeHtml).join(" · ");

        let cta;
        if (project.caseStudyLink) cta = "Read case study";
        else if (project.liveLink && project.liveLink !== "#") cta = "View live";
        else if (project.githubLink) cta = "GitHub";
        else cta = "Confidential";

        row.innerHTML = `
            <span class="work-row__index">${pad2(i + 1)}</span>
            <h3 class="work-row__title">
                ${typeLine ? `<small>${typeLine}</small>` : ""}
                ${escapeHtml(project.title)}
            </h3>
            <div class="work-row__meta">
                <div class="work-row__meta-stack">${stackMeta}</div>
            </div>
            <span class="work-row__cta">${cta} <span class="arrow">→</span></span>
        `;

        container.appendChild(row);
    });
}

/* -----------------------------------------------------------------------------
   Project filter chips (projects.html)
   -------------------------------------------------------------------------- */
export function initProjectFilters(chipsContainer, listContainer) {
    if (!chipsContainer || !listContainer) return;
    const chips = chipsContainer.querySelectorAll(".chip");
    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((c) => c.classList.remove("is-active"));
            chip.classList.add("is-active");
            const filter = chip.dataset.filter;
            listContainer.querySelectorAll(".work-row").forEach((row) => {
                const matches = filter === "all" || row.dataset.type === filter;
                row.style.display = matches ? "" : "none";
            });
        });
    });
}

/* -----------------------------------------------------------------------------
   Case study cards (magazine spread)
   -------------------------------------------------------------------------- */
export function renderCaseStudies(container, items) {
    if (!container || !items?.length) return;
    container.innerHTML = "";

    items.forEach((cs, i) => {
        const a = document.createElement("a");
        a.className = "cs-card reveal-rise";
        a.href = cs.link;

        const tags = (cs.tags || []).slice(0, 5).map((t) => `<span>${escapeHtml(t)}</span>`).join("");

        a.innerHTML = `
            <div class="cs-card__media">
                <div class="reveal-clip" style="width:100%;height:100%;">
                    <img src="${escapeHtml(cs.thumbnailUrl)}" alt="${escapeHtml(cs.title)} thumbnail" loading="lazy">
                </div>
            </div>
            <div class="cs-card__index">
                <span>Case · ${pad2(i + 1)}</span>
                <span class="rule"></span>
                <span>Study</span>
            </div>
            <h3 class="cs-card__title">${escapeHtml(cs.title)}</h3>
            ${cs.subtitle ? `<p class="cs-card__sub">${escapeHtml(cs.subtitle)}</p>` : ""}
            ${tags ? `<div class="cs-card__tags">${tags}</div>` : ""}
            <span class="cs-card__read">Read case study <span class="arrow">→</span></span>
        `;

        container.appendChild(a);
    });
}

/* -----------------------------------------------------------------------------
   Resolve contact action targets if present on page
   -------------------------------------------------------------------------- */
export function bindContactLinks() {
    if (typeof CONTACT_DETAILS === "undefined") return;
    const emailLinks = document.querySelectorAll('[data-contact="email"]');
    const phoneLinks = document.querySelectorAll('[data-contact="phone"]');
    const githubLinks = document.querySelectorAll('[data-contact="github"]');
    const linkedinLinks = document.querySelectorAll('[data-contact="linkedin"]');

    emailLinks.forEach((a) => { if (CONTACT_DETAILS.email) a.href = `mailto:${CONTACT_DETAILS.email}`; });
    phoneLinks.forEach((a) => { if (CONTACT_DETAILS.phone) a.href = `tel:${CONTACT_DETAILS.phone.replace(/[\s()-]/g, "")}`; });
    githubLinks.forEach((a) => { if (CONTACT_DETAILS.github) a.href = CONTACT_DETAILS.github; });
    linkedinLinks.forEach((a) => { if (CONTACT_DETAILS.linkedin) a.href = CONTACT_DETAILS.linkedin; });
}
