/* ============================================================================
   LNV Portfolio — single classic script
   Wires theme, nav, footer, content renderers, hero vector field, reveals,
   magnetic interactions, cursor crosshair, page transitions, Lenis scroll.
   Depends only on globals from data.js (loaded immediately before this file).
   ========================================================================= */

(function () {
    "use strict";

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    function $(sel, root) { return (root || document).querySelector(sel); }
    function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

    function escapeHtml(s) {
        s = s == null ? "" : String(s);
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function pad2(n) { return n < 10 ? "0" + n : "" + n; }

    /* ------------------------------------------------------------------------
       Theme
       --------------------------------------------------------------------- */
    function applyTheme(theme) {
        document.documentElement.classList.toggle("dark-mode", theme === "dark");
        document.body.classList.toggle("dark-mode", theme === "dark");
    }
    function initTheme() {
        var stored = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var initial = stored || (prefersDark ? "dark" : "light");
        applyTheme(initial);

        var btn = $("#theme-toggle");
        if (btn) {
            btn.addEventListener("click", function () {
                var next = document.documentElement.classList.contains("dark-mode") ? "light" : "dark";
                localStorage.setItem("theme", next);
                applyTheme(next);
            });
        }
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
            if (!localStorage.getItem("theme")) applyTheme(e.matches ? "dark" : "light");
        });
    }

    /* ------------------------------------------------------------------------
       Nav (scrolled state, active link, mobile toggle, Athens clock)
       --------------------------------------------------------------------- */
    function initNav() {
        var nav = $(".navbar");
        if (nav) {
            var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
            onScroll();
            window.addEventListener("scroll", onScroll, { passive: true });
        }

        var current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
        $$(".nav-links a").forEach(function (a) {
            var href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
            if (href === current || (current === "" && href === "index.html")) a.classList.add("is-active");
        });

        var toggle = $("#mobile-nav-toggle");
        var links = $("#nav-links");
        if (toggle && links) {
            var close = function () {
                links.classList.remove("is-open");
                toggle.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("no-scroll");
            };
            toggle.addEventListener("click", function () {
                var open = !links.classList.contains("is-open");
                links.classList.toggle("is-open", open);
                toggle.classList.toggle("is-open", open);
                toggle.setAttribute("aria-expanded", String(open));
                document.body.classList.toggle("no-scroll", open);
            });
            $$("a", links).forEach(function (a) { a.addEventListener("click", close); });
            document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
        }

        var clockEl = $(".nav-clock .time");
        if (clockEl) {
            var update = function () {
                try {
                    var opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Athens" };
                    clockEl.textContent = new Intl.DateTimeFormat("en-GB", opts).format(new Date());
                } catch (e) { clockEl.textContent = ""; }
            };
            update();
            setInterval(update, 30 * 1000);
        }
    }

    /* ------------------------------------------------------------------------
       Footer (single source — content in data.js)
       --------------------------------------------------------------------- */
    function injectFooter() {
        var host = $("#footer-root");
        if (!host) return;
        var c = (typeof CONTACT_DETAILS !== "undefined") ? CONTACT_DETAILS : {};
        var f = (typeof FOOTER_CONTENT !== "undefined") ? FOOTER_CONTENT : {};
        var year = f.year || new Date().getFullYear();
        var prefix = document.documentElement.getAttribute("data-link-prefix") || "";

        var gh = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.45 24 17.12 24 12.02 24 5.74 18.27.5 12 .5z"/></svg>';
        var li = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>';

        host.innerHTML = '' +
            '<div class="container">' +
                '<div class="footer-rule"><span class="footer-rule__label">End. of document</span><span class="footer-rule__line"></span><span class="footer-rule__label">' + year + '</span></div>' +
                '<div class="footer-grid">' +
                    '<div class="footer-brand">' +
                        '<div class="footer-mark">LV<span class="dot">.</span></div>' +
                        '<p class="muted">Simplicity crafted through vision and precision. Building software for founders and teams who value clarity.</p>' +
                        '<p class="footer-coord mono">[ 37.98°N · 23.72°E — Athens, Gr ]</p>' +
                    '</div>' +
                    '<div class="footer-col">' +
                        '<h4>§ Navigate</h4>' +
                        '<ul>' +
                            '<li><a href="' + prefix + 'index.html">Index</a></li>' +
                            '<li><a href="' + prefix + 'projects.html">Work</a></li>' +
                            '<li><a href="' + prefix + 'case-studies.html">Studies</a></li>' +
                            '<li><a href="' + prefix + 'contact.html">Contact</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="footer-col">' +
                        '<h4>§ Direct line</h4>' +
                        '<ul>' +
                            '<li><a href="mailto:' + (c.email || "") + '" class="magnetic">' + (c.email || "") + '</a></li>' +
                            '<li><a href="tel:' + (c.phone || "").replace(/\s+/g, "") + '">' + (c.phone || "") + '</a></li>' +
                            '<li class="muted">' + (c.address || "") + '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="footer-bottom">' +
                    '<span>© ' + year + ' · ' + (f.name || "Loukas-Nikolaos Vetoulis") + '</span>' +
                    '<div class="footer-socials">' +
                        '<a href="' + (c.github || "#") + '" target="_blank" rel="noopener" aria-label="GitHub">' + gh + '</a>' +
                        '<a href="' + (c.linkedin || "#") + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + li + '</a>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /* ------------------------------------------------------------------------
       Renderers — Selected Work catalog list + Case Study plates
       --------------------------------------------------------------------- */
    function resolveLink(p) { return p.caseStudyLink || p.liveLink || p.githubLink || null; }

    function projectDescriptor(p) {
        var parts = [];
        if (p.type) parts.push(p.type);
        if (p.company) parts.push(p.company);
        if (p.period) parts.push(p.period);
        return parts.join(" · ");
    }

    function renderWorkList(container, projects) {
        if (!container || !projects || !projects.length) return;
        container.innerHTML = "";
        projects.forEach(function (p, i) {
            var href = resolveLink(p);
            var tag = href ? "a" : "div";
            var row = document.createElement(tag);
            row.className = "work-row reveal-row";
            row.setAttribute("data-fig", "Fig. " + pad2(i + 1));
            if (p.imageUrl) row.setAttribute("data-thumb", p.imageUrl);
            if (p.type) row.setAttribute("data-type", p.type.toLowerCase());
            if (href) {
                row.href = href;
                if (!p.caseStudyLink && href !== "#") {
                    row.target = "_blank";
                    row.rel = "noopener noreferrer";
                }
            }

            var stackHtml = (p.stack || []).slice(0, 4).map(function (s) {
                return '<span>' + escapeHtml(s) + '</span>';
            }).join("");

            var cta = p.caseStudyLink ? "Read study" : (p.liveLink && p.liveLink !== "#" ? "View live" : (p.githubLink ? "GitHub" : "Confidential"));

            row.innerHTML = '' +
                '<span class="work-row__fig mono">' + pad2(i + 1) + '</span>' +
                '<div class="work-row__main">' +
                    '<h3 class="work-row__title">' + escapeHtml(p.title) + '</h3>' +
                    '<p class="work-row__descr mono">' + escapeHtml(projectDescriptor(p)) + '</p>' +
                '</div>' +
                '<div class="work-row__stack mono">' + stackHtml + '</div>' +
                '<span class="work-row__cta mono">' + cta + ' <span class="arrow">→</span></span>' +
                '<span class="corner corner--tl"></span><span class="corner corner--tr"></span>' +
                '<span class="corner corner--bl"></span><span class="corner corner--br"></span>';

            container.appendChild(row);
        });
    }

    function initProjectFilters(chipsRoot, listRoot) {
        if (!chipsRoot || !listRoot) return;
        var chips = $$(".chip", chipsRoot);
        chips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                chips.forEach(function (c) { c.classList.remove("is-active"); });
                chip.classList.add("is-active");
                var filter = chip.getAttribute("data-filter");
                $$(".work-row", listRoot).forEach(function (row) {
                    var m = filter === "all" || row.getAttribute("data-type") === filter;
                    row.style.display = m ? "" : "none";
                });
            });
        });
    }

    function renderCaseStudies(container, items) {
        if (!container || !items || !items.length) return;
        container.innerHTML = "";
        items.forEach(function (cs, i) {
            var a = document.createElement("a");
            a.className = "cs-card reveal-rise";
            a.href = cs.link;
            var tags = (cs.tags || []).slice(0, 5).map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join("");
            a.innerHTML = '' +
                '<div class="cs-card__plate mono"><span>Plate</span><span class="rule"></span><span>' + pad2(i + 1) + ' / ' + pad2(items.length) + '</span></div>' +
                '<div class="cs-card__media">' +
                    '<img src="' + escapeHtml(cs.thumbnailUrl) + '" alt="' + escapeHtml(cs.title) + '" loading="lazy">' +
                    '<span class="corner corner--tl"></span><span class="corner corner--tr"></span>' +
                    '<span class="corner corner--bl"></span><span class="corner corner--br"></span>' +
                '</div>' +
                '<h3 class="cs-card__title">' + escapeHtml(cs.title) + '</h3>' +
                (cs.subtitle ? '<p class="cs-card__sub muted">' + escapeHtml(cs.subtitle) + '</p>' : "") +
                (tags ? '<div class="cs-card__tags mono">' + tags + '</div>' : "") +
                '<span class="cs-card__read mono">Read study <span class="arrow">→</span></span>';
            container.appendChild(a);
        });
    }

    function bindContactLinks() {
        if (typeof CONTACT_DETAILS === "undefined") return;
        $$('[data-contact="email"]').forEach(function (a) { if (CONTACT_DETAILS.email) a.href = "mailto:" + CONTACT_DETAILS.email; });
        $$('[data-contact="phone"]').forEach(function (a) { if (CONTACT_DETAILS.phone) a.href = "tel:" + CONTACT_DETAILS.phone.replace(/[\s()-]/g, ""); });
        $$('[data-contact="github"]').forEach(function (a) { if (CONTACT_DETAILS.github) a.href = CONTACT_DETAILS.github; });
        $$('[data-contact="linkedin"]').forEach(function (a) { if (CONTACT_DETAILS.linkedin) a.href = CONTACT_DETAILS.linkedin; });
    }

    /* ------------------------------------------------------------------------
       Hero vector field — canvas flow simulation
       --------------------------------------------------------------------- */
    function initVectorField() {
        var canvas = $("#vector-field");
        if (!canvas) return;
        if (reducedMotion) { canvas.style.opacity = "0.25"; return; }

        var ctx = canvas.getContext("2d");
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = 0, h = 0, t = 0;
        var particles = [];

        function resize() {
            var r = canvas.getBoundingClientRect();
            w = r.width; h = r.height;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function getStrokeColor() {
            return getComputedStyle(document.documentElement).getPropertyValue("--field-stroke").trim() || "rgba(30, 58, 95, 0.18)";
        }
        function getFadeColor() {
            return getComputedStyle(document.documentElement).getPropertyValue("--field-fade").trim() || "rgba(246, 245, 240, 0.04)";
        }

        function spawn(p) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.life = 80 + Math.random() * 160;
        }

        function makeParticles() {
            var count = Math.min(220, Math.floor((w * h) / 7000));
            particles = [];
            for (var i = 0; i < count; i++) {
                var p = { x: 0, y: 0, life: 0 };
                spawn(p);
                particles.push(p);
            }
        }

        function flow(x, y) {
            // Smooth noise-ish field via composed sinusoids.
            var a = Math.sin(x * 0.0042 + t * 0.00018) + Math.cos(y * 0.0036 - t * 0.00013);
            var b = Math.cos(x * 0.0028 - t * 0.00010) + Math.sin(y * 0.0032 + t * 0.00021);
            return Math.atan2(b, a);
        }

        var stroke = "rgba(30,58,95,0.18)";
        var fade = "rgba(246,245,240,0.04)";

        function refreshColors() {
            stroke = getStrokeColor();
            fade = getFadeColor();
        }

        function step() {
            t += 16;
            // Trail fade: paint a sheer rectangle of bg color over previous frame
            ctx.fillStyle = fade;
            ctx.fillRect(0, 0, w, h);

            ctx.strokeStyle = stroke;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var ang = flow(p.x, p.y);
                var speed = 0.85;
                var nx = p.x + Math.cos(ang) * speed;
                var ny = p.y + Math.sin(ang) * speed;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(nx, ny);
                p.x = nx; p.y = ny;
                p.life -= 1;
                if (p.life <= 0 || p.x < -10 || p.y < -10 || p.x > w + 10 || p.y > h + 10) spawn(p);
            }
            ctx.stroke();
            raf = requestAnimationFrame(step);
        }

        var raf = null;
        function start() {
            cancelAnimationFrame(raf);
            resize();
            refreshColors();
            // Clear once with full bg before re-seeding so theme changes look intentional
            ctx.clearRect(0, 0, w, h);
            makeParticles();
            raf = requestAnimationFrame(step);
        }

        var resizeTimer = null;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(start, 120);
        });

        // Restart on theme change so trail-fade color matches
        new MutationObserver(function () {
            refreshColors();
            ctx.clearRect(0, 0, w, h);
        }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        start();
    }

    /* ------------------------------------------------------------------------
       Reveals — split words for headings, observe scroll, fade rows in
       --------------------------------------------------------------------- */
    function splitWords(el) {
        if (!el || el.getAttribute("data-split") === "true") return;
        var frag = document.createDocumentFragment();
        function wrap(text, into) {
            text.split(/(\s+)/).forEach(function (chunk) {
                if (!chunk) return;
                if (/^\s+$/.test(chunk)) { into.appendChild(document.createTextNode(chunk)); return; }
                var w = document.createElement("span");
                w.className = "word";
                var inner = document.createElement("span");
                inner.textContent = chunk;
                w.appendChild(inner);
                into.appendChild(w);
            });
        }
        Array.prototype.slice.call(el.childNodes).forEach(function (n) {
            if (n.nodeType === 3) { wrap(n.textContent, frag); }
            else if (n.nodeType === 1) {
                var clone = n.cloneNode(false);
                wrap(n.textContent, clone);
                frag.appendChild(clone);
            }
        });
        el.innerHTML = "";
        el.appendChild(frag);
        el.setAttribute("data-split", "true");
    }

    function stagger(els, step, base) {
        els.forEach(function (el, i) {
            var inner = el.querySelector(":scope > span") || el;
            inner.style.transitionDelay = (base + i * step) + "ms";
        });
    }

    function initReveals() {
        // Split words for any heading marked reveal-words
        $$(".reveal-words").forEach(function (el) {
            splitWords(el);
            stagger($$(".word", el), 60, 0);
        });

        // Stagger children of any [data-stagger] group
        $$("[data-stagger]").forEach(function (group) {
            var step = parseInt(group.getAttribute("data-stagger"), 10) || 100;
            Array.prototype.slice.call(group.children).forEach(function (child, i) {
                child.style.transitionDelay = (i * step) + "ms";
            });
        });

        var HERO = ".hero, .page-header, .cs-detail-header";
        var heroTargets = $$(HERO + " .reveal-rise, " + HERO + " .reveal-words, " + HERO + " .reveal-rule");
        var scrollTargets = $$(".reveal-rise, .reveal-words, .reveal-rule, .reveal-row, .reveal-clip").filter(function (el) {
            return !el.closest(".hero, .page-header, .cs-detail-header");
        });

        // Hero reveals fire on page-ready
        window.addEventListener("lnv:page-ready", function () {
            heroTargets.forEach(function (el) { el.classList.add("is-revealed"); });
        }, { once: true });

        if (!("IntersectionObserver" in window)) {
            scrollTargets.forEach(function (el) { el.classList.add("is-revealed"); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
        scrollTargets.forEach(function (el) { io.observe(el); });
    }

    /* ------------------------------------------------------------------------
       Magnetic interactions (desktop only)
       --------------------------------------------------------------------- */
    function initMagnetic() {
        if (reducedMotion || isTouch) return;
        var STRENGTH = 0.22, MAX = 10;
        $$(".magnetic").forEach(function (el) {
            var raf = null;
            el.addEventListener("pointermove", function (e) {
                var r = el.getBoundingClientRect();
                var dx = (e.clientX - (r.left + r.width / 2)) * STRENGTH;
                var dy = (e.clientY - (r.top + r.height / 2)) * STRENGTH;
                if (Math.abs(dx) > MAX) dx = MAX * (dx < 0 ? -1 : 1);
                if (Math.abs(dy) > MAX) dy = MAX * (dy < 0 ? -1 : 1);
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(function () {
                    el.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
                });
            });
            el.addEventListener("pointerleave", function () {
                if (raf) cancelAnimationFrame(raf);
                el.style.transform = "translate3d(0,0,0)";
            });
        });
    }

    /* ------------------------------------------------------------------------
       Crosshair cursor (desktop only — drafting metaphor)
       --------------------------------------------------------------------- */
    function initCrosshair() {
        if (reducedMotion || isTouch) return;
        var ch = document.createElement("div");
        ch.className = "cursor-crosshair";
        ch.innerHTML = '<span class="ch-h"></span><span class="ch-v"></span><span class="ch-dot"></span>';
        document.body.appendChild(ch);

        var tx = 0, ty = 0, x = 0, y = 0;
        var raf = null;
        function loop() {
            x += (tx - x) * 0.22;
            y += (ty - y) * 0.22;
            ch.style.transform = "translate(" + x + "px," + y + "px)";
            raf = requestAnimationFrame(loop);
        }
        window.addEventListener("pointermove", function (e) {
            tx = e.clientX; ty = e.clientY;
            if (!raf) loop();
            ch.classList.add("is-visible");
        });
        window.addEventListener("pointerleave", function () { ch.classList.remove("is-visible"); });
        // Hover-link highlight
        document.addEventListener("pointerover", function (e) {
            if (e.target.closest("a, button, .magnetic, .chip, .work-row")) ch.classList.add("is-hover");
        }, true);
        document.addEventListener("pointerout", function (e) {
            if (e.target.closest("a, button, .magnetic, .chip, .work-row")) ch.classList.remove("is-hover");
        }, true);
    }

    /* ------------------------------------------------------------------------
       Page transitions — schematic curtain wipe
       --------------------------------------------------------------------- */
    function initPageTransitions() {
        if (reducedMotion) return;
        function isInternal(href) {
            if (!href) return false;
            if (href.charAt(0) === "#") return false;
            if (href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return false;
            try {
                var u = new URL(href, window.location.href);
                return u.origin === window.location.origin;
            } catch (e) { return false; }
        }
        document.addEventListener("click", function (e) {
            var a = e.target.closest("a");
            if (!a) return;
            var href = a.getAttribute("href");
            if (!isInternal(href)) return;
            if (a.target === "_blank") return;
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();
            document.body.classList.add("page-leaving");
            setTimeout(function () { window.location.href = href; }, 420);
        });
        window.addEventListener("pageshow", function () {
            document.body.classList.remove("page-leaving");
        });
    }

    /* ------------------------------------------------------------------------
       Lenis smooth scroll (loaded via CDN)
       --------------------------------------------------------------------- */
    function initLenis() {
        if (reducedMotion || typeof Lenis === "undefined") return;
        var lenis = new Lenis({
            duration: 1.05,
            easing: function (t) { return 1 - Math.pow(1 - t, 3); },
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.4
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        document.addEventListener("click", function (e) {
            var a = e.target.closest('a[href^="#"]');
            if (!a) return;
            var id = a.getAttribute("href");
            if (id.length <= 1) return;
            var target = $(id);
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
        });
    }

    /* ------------------------------------------------------------------------
       Page-specific content rendering
       --------------------------------------------------------------------- */
    function renderPage() {
        var home = $("#featured-work");
        if (home && typeof FEATURED_PROJECTS !== "undefined") renderWorkList(home, FEATURED_PROJECTS);

        var all = $("#all-work");
        if (all && typeof PROJECTS !== "undefined") {
            renderWorkList(all, PROJECTS);
            var chips = $("#filter-chips");
            if (chips) initProjectFilters(chips, all);
        }

        var csHome = $("#case-studies-home");
        if (csHome && typeof CASE_STUDIES_DATA !== "undefined") renderCaseStudies(csHome, CASE_STUDIES_DATA);
        var csAll = $("#case-studies-all");
        if (csAll && typeof CASE_STUDIES_DATA !== "undefined") renderCaseStudies(csAll, CASE_STUDIES_DATA);

        bindContactLinks();
    }

    /* ------------------------------------------------------------------------
       Boot
       --------------------------------------------------------------------- */
    function boot() {
        document.documentElement.classList.add("motion-ready");
        document.body.classList.add("motion-ready");
        initTheme();
        initNav();
        injectFooter();
        renderPage();
        initReveals();
        initVectorField();
        initMagnetic();
        initCrosshair();
        initPageTransitions();
        initLenis();
        // Signal hero/page-header reveals to fire after one paint frame
        requestAnimationFrame(function () {
            window.dispatchEvent(new CustomEvent("lnv:page-ready"));
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
