// motion.js — orchestration layer for reveals, magnetic interactions, smooth scroll
// Loaded as a module from main.js after DOM is ready. Lenis is loaded globally via CDN.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -----------------------------------------------------------------------------
   Word splitter — wraps each word of an element in
   <span class="word"><span>...</span></span> for masked reveal.
   Preserves <em>/<strong> inline emphasis as nested spans.
   -------------------------------------------------------------------------- */
function splitWords(el) {
    if (!el || el.dataset.split === "true") return;
    const nodes = Array.from(el.childNodes);
    const frag = document.createDocumentFragment();

    const wrapText = (text) => {
        text.split(/(\s+)/).forEach((chunk) => {
            if (!chunk) return;
            if (/^\s+$/.test(chunk)) {
                frag.appendChild(document.createTextNode(chunk));
            } else {
                const word = document.createElement("span");
                word.className = "word";
                const inner = document.createElement("span");
                inner.textContent = chunk;
                word.appendChild(inner);
                frag.appendChild(word);
            }
        });
    };

    nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            wrapText(node.textContent);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Wrap inline-element text (e.g., <em>) but keep the element identity.
            const clone = node.cloneNode(false);
            const text = node.textContent;
            text.split(/(\s+)/).forEach((chunk) => {
                if (!chunk) return;
                if (/^\s+$/.test(chunk)) {
                    clone.appendChild(document.createTextNode(chunk));
                } else {
                    const word = document.createElement("span");
                    word.className = "word";
                    const inner = document.createElement("span");
                    inner.textContent = chunk;
                    word.appendChild(inner);
                    clone.appendChild(word);
                }
            });
            frag.appendChild(clone);
        }
    });

    el.innerHTML = "";
    el.appendChild(frag);
    el.dataset.split = "true";
}

/* -----------------------------------------------------------------------------
   Apply staggered transition delays to children
   -------------------------------------------------------------------------- */
function stagger(elements, stepMs = 80, startMs = 0) {
    elements.forEach((el, i) => {
        const inner = el.querySelector(":scope > span") || el;
        inner.style.transitionDelay = `${startMs + i * stepMs}ms`;
    });
}

/* -----------------------------------------------------------------------------
   Hero reveal — runs once after page loads
   -------------------------------------------------------------------------- */
function initHero() {
    const heroDisplay = document.querySelector(".hero-display.reveal-words, .page-header__title.reveal-words, .cs-detail-header__title.reveal-words");
    if (heroDisplay) {
        splitWords(heroDisplay);
        const words = heroDisplay.querySelectorAll(".word");
        stagger(Array.from(words), 70, 80);
    }

    const revealHero = () => {
        document.querySelectorAll(
            ".hero .reveal-rise, .hero .reveal-words, .hero .reveal-rule, " +
            ".page-header .reveal-rise, .page-header .reveal-words, " +
            ".cs-detail-header .reveal-rise, .cs-detail-header .reveal-words"
        ).forEach((el) => {
            el.classList.add("is-revealed");
        });
    };

    // Fire on the page-ready signal from main.js (sent on next animation frame after boot).
    let fired = false;
    const fire = () => {
        if (fired) return;
        fired = true;
        requestAnimationFrame(revealHero);
    };

    window.addEventListener("lnv:page-ready", fire, { once: true });
    setTimeout(fire, 400);
}

/* -----------------------------------------------------------------------------
   Scroll reveal — IntersectionObserver
   -------------------------------------------------------------------------- */
function initScrollReveals() {
    // Split words for any heading marked reveal-words (outside the hero, which we already did)
    document.querySelectorAll(".reveal-words:not(.hero-display)").forEach((el) => {
        splitWords(el);
        const words = el.querySelectorAll(".word");
        stagger(Array.from(words), 60, 0);
    });

    // Stagger any group with data-stagger
    document.querySelectorAll("[data-stagger]").forEach((group) => {
        const step = parseInt(group.dataset.stagger, 10) || 100;
        Array.from(group.children).forEach((child, i) => {
            child.style.transitionDelay = `${i * step}ms`;
        });
    });

    // Exclude hero/page-header/case-study-detail elements — those are handled by initHero
    // (gated on the page-ready event so they reveal as a coordinated opening, not via scroll-IO).
    const HERO_SECTIONS = ".hero, .page-header, .cs-detail-header";
    const targets = Array.from(
        document.querySelectorAll(".reveal-rise, .reveal-words:not(.is-revealed), .reveal-clip, .reveal-rule, .reveal-row")
    ).filter((el) => !el.closest(HERO_SECTIONS));

    if (!("IntersectionObserver" in window)) {
        targets.forEach((el) => el.classList.add("is-revealed"));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

    targets.forEach((el) => {
        if (!el.classList.contains("is-revealed")) io.observe(el);
    });
}

/* -----------------------------------------------------------------------------
   Magnetic interactions — buttons / important links subtly track the cursor
   -------------------------------------------------------------------------- */
function initMagnetic() {
    if (reducedMotion) return;
    const STRENGTH = 0.25;
    const MAX = 12;

    document.querySelectorAll(".magnetic").forEach((el) => {
        let raf = null;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * STRENGTH;
            const dy = (e.clientY - cy) * STRENGTH;
            const tx = Math.max(-MAX, Math.min(MAX, dx));
            const ty = Math.max(-MAX, Math.min(MAX, dy));
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            });
        };
        const onLeave = () => {
            if (raf) cancelAnimationFrame(raf);
            el.style.transform = "translate3d(0,0,0)";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
    });
}

/* -----------------------------------------------------------------------------
   Work-row hover thumbnail — mouse-follow image preview on editorial list
   -------------------------------------------------------------------------- */
function initWorkThumb() {
    if (reducedMotion) return;
    const rows = document.querySelectorAll(".work-row[data-thumb]");
    if (!rows.length) return;
    if (window.matchMedia("(max-width: 800px)").matches) return;

    const thumb = document.createElement("div");
    thumb.className = "work-thumb";
    const img = document.createElement("img");
    thumb.appendChild(img);
    document.body.appendChild(thumb);

    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    let rafId = null;
    let active = false;

    const loop = () => {
        tx += (mx - tx) * 0.18;
        ty += (my - ty) * 0.18;
        thumb.style.transform = `translate(calc(${tx}px - 50%), calc(${ty}px - 50%)) scale(${active ? 1 : 0.85})`;
        rafId = requestAnimationFrame(loop);
    };

    rows.forEach((row) => {
        row.addEventListener("pointerenter", () => {
            const src = row.dataset.thumb;
            if (!src) return;
            img.src = src;
            active = true;
            thumb.classList.add("is-visible");
            if (!rafId) loop();
        });
        row.addEventListener("pointerleave", () => {
            active = false;
            thumb.classList.remove("is-visible");
        });
        row.addEventListener("pointermove", (e) => {
            mx = e.clientX;
            my = e.clientY;
        });
    });
}

/* -----------------------------------------------------------------------------
   Lenis smooth scroll (loaded via CDN in HTML head)
   -------------------------------------------------------------------------- */
function initLenis() {
    if (reducedMotion) return;
    if (typeof Lenis === "undefined") return;

    const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
    });

    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Intercept anchor links so they obey Lenis
    document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href");
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
    });

    return lenis;
}

/* -----------------------------------------------------------------------------
   Page transitions — fade out before internal navigation
   -------------------------------------------------------------------------- */
function initPageTransitions() {
    if (reducedMotion) return;
    const isInternal = (href) => {
        if (!href) return false;
        if (href.startsWith("#")) return false;
        if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
        try {
            const url = new URL(href, window.location.href);
            return url.origin === window.location.origin;
        } catch { return false; }
    };

    document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        const href = a.getAttribute("href");
        if (!isInternal(href)) return;
        if (a.target === "_blank") return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        e.preventDefault();
        document.body.classList.add("page-leaving");
        setTimeout(() => { window.location.href = href; }, 380);
    });

    // Fade in on load
    window.addEventListener("pageshow", () => {
        document.body.classList.remove("page-leaving");
    });
}

/* -----------------------------------------------------------------------------
   Entry point
   -------------------------------------------------------------------------- */
export function startMotion() {
    document.documentElement.classList.add("motion-ready");
    document.body.classList.add("motion-ready");

    initHero();
    initScrollReveals();
    initMagnetic();
    initWorkThumb();
    initLenis();
    initPageTransitions();
}
