// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderLogoImg = document.getElementById('loader-logo-img');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinksUl = document.getElementById('nav-links'); // This is the UL for navigation links
    const mainNavbarLogo = document.querySelector('.nav-logo img');
    const heroTitleEl = document.querySelector('.hero h1#hero-name'); // Homepage specific

    // --- Path & SVGs ---
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    // TODO: Replace with better/custom SVGs if desired
    const sunIconSVG = `<svg class="icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1V6c0-.552.448-1 1-1zm0 12c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm7.778-8.707l1.414-1.414a.997.997 0 000-1.414.999.999 0 00-1.414 0l-1.414 1.414a.999.999 0 001.414 1.414zM4.222 19.778l1.414-1.414a.999.999 0 10-1.414-1.414l-1.414 1.414a.999.999 0 001.414 1.414zM20 12c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zM5 12c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zm12.778-5.707a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 10-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zm-11.314 11.314a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 00-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zM12 9a3 3 0 100 6 3 3 0 000-6z"></path></svg>`;
    const moonIconSVG = `<svg class="icon icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M19.578 16.838a.998.998 0 01.487-1.925 7.992 7.992 0 00-2.649-1.887C17.781 11.56 18.5 9.33 18.5 7c0-4.136-3.364-7.5-7.5-7.5S3.5 2.864 3.5 7c0 2.443.796 4.686 2.064 6.407a8.024 8.024 0 00-3.61 11.131.998.998 0 001.579.566 10.018 10.018 0 0116.045-8.266zM11 19.5a5.984 5.984 0 01-3.397-1.006A7.968 7.968 0 005.5 13.44V7c0-2.982 2.208-5.5 5.5-5.5S16.5 4.018 16.5 7v.012A6 6 0 0111 19.5z"></path></svg>`;

    // --- Helper function to close mobile menu ---
    const closeMobileMenu = () => {
        if (navLinksUl && navLinksUl.classList.contains('active')) {
            navLinksUl.classList.remove('active');
            if (mobileNavToggle) {
                mobileNavToggle.innerHTML = '☰';
                mobileNavToggle.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.classList.remove('mobile-menu-open');
        }
    };

    // --- Theme Management ---
    const applyTheme = (theme, isInitialLoad = false) => {
        const body = document.body;
        const toggleWrapper = themeToggleBtn ? themeToggleBtn.querySelector('.icon-wrapper') : null;

        if (isInitialLoad && loaderWrapper) {
            const lightBg = '#FDFDFE'; const darkBg = '#0B1726';
            const lightAccent = '#111113'; const darkAccent = '#389BFF';
            loaderWrapper.style.backgroundColor = (theme === 'dark') ? darkBg : lightBg;
            const loaderSpinner = loaderWrapper.querySelector('.loader-spinner');
            if (loaderSpinner) {
                const accentColor = (theme === 'dark') ? darkAccent : lightAccent;
                loaderSpinner.style.borderTopColor = accentColor;
                loaderSpinner.style.borderRightColor = accentColor;
            }
        }

        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            body.classList.add('dark-mode'); body.classList.remove('light-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = moonIconSVG + sunIconSVG;
            if (mainNavbarLogo) mainNavbarLogo.src = 'images/dark_logo.png';
            if (loaderLogoImg) loaderLogoImg.src = 'images/dark_logo.png';
        } else {
            document.documentElement.classList.remove('dark-mode');
            body.classList.add('light-mode'); body.classList.remove('dark-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = sunIconSVG + moonIconSVG;
            if (mainNavbarLogo) mainNavbarLogo.src = 'images/light_logo.png';
            if (loaderLogoImg) loaderLogoImg.src = 'images/light_logo.png';
        }
        if (toggleWrapper) void toggleWrapper.offsetHeight;
    };

    const initialStoredTheme = localStorage.getItem('theme');
    const initialSystemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = initialStoredTheme || (initialSystemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme, true);

    if (themeToggleBtn) {
        const buttonTextNode = Array.from(themeToggleBtn.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if(buttonTextNode) buttonTextNode.nodeValue = `${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode `;

        themeToggleBtn.addEventListener('click', () => {
            currentTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
            if (buttonTextNode) buttonTextNode.nodeValue = `${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode `;
        });
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
            const buttonTextNode = themeToggleBtn ? Array.from(themeToggleBtn.childNodes).find(node => node.nodeType === Node.TEXT_NODE) : null;
            if (buttonTextNode) buttonTextNode.nodeValue = `${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode `;
        }
    });

    // --- Mobile Navigation ---
    if (mobileNavToggle && navLinksUl) {
        mobileNavToggle.addEventListener('click', () => {
            const isActive = navLinksUl.classList.toggle('active');
            mobileNavToggle.classList.toggle('active', isActive);
            mobileNavToggle.innerHTML = isActive ? '×' : '☰';
            mobileNavToggle.setAttribute('aria-expanded', isActive.toString());
            document.body.classList.toggle('mobile-menu-open', isActive);
        });

        // Close menu if a link is clicked, or specific CSS ::before close area is clicked (complex to detect reliably)
        navLinksUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') { // Link inside menu
                closeMobileMenu();
            } else if (e.target === navLinksUl && navLinksUl.classList.contains('active')) {
                // Attempt to detect click on ::before (CSS close button) based on click position relative to top-right
                const rect = navLinksUl.getBoundingClientRect();
                const styles = window.getComputedStyle(navLinksUl, '::before'); // If ::before is used as close
                const top = parseFloat(styles.top) || 0;
                const right = parseFloat(styles.right) || 0;
                const width = parseFloat(styles.width) || 0;
                const height = parseFloat(styles.height) || 0;

                // Define the pseudo-element's approximate click area based on its CSS
                // These values need to match your CSS for ::before pseudo-element (if you are using it)
                const closeButtonXstart = rect.width - right - width;
                const closeButtonXend = rect.width - right;
                const closeButtonYstart = top;
                const closeButtonYend = top + height;
                
                const clickXRelative = e.clientX - rect.left;
                const clickYRelative = e.clientY - rect.top;

                if ( clickXRelative >= closeButtonXstart && clickXRelative <= closeButtonXend &&
                     clickYRelative >= closeButtonYstart && clickYRelative <= closeButtonYend ) {
                    closeMobileMenu();
                }
            }
        });
    }
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 880 && navLinksUl && navLinksUl.classList.contains('active')) { // Adjust 880 to your mobile breakpoint
            if (!navLinksUl.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksUl && navLinksUl.classList.contains('active')) {
            closeMobileMenu();
        }
    });


    // --- HOMEPAGE SPECIFIC LOGIC (Hero Animation & Content) ---
    if (heroTitleEl) { // This IF makes this block homepage-specific
        if (typeof HERO_CONTENT !== 'undefined' && HERO_CONTENT.name) {
            const text = HERO_CONTENT.name.trim();
            heroTitleEl.innerHTML = '';
            let cumulativeDelay = 0;
            text.split('').forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('char');
                charSpan.textContent = char === ' ' ? '\u00A0' : char;
                charSpan.style.animationDelay = `${cumulativeDelay}ms`;
                heroTitleEl.appendChild(charSpan);
                cumulativeDelay += (char === ' ' ? 100 : 40);
            });
        } else {
            console.warn("Hero title element found, but HERO_CONTENT.name is not defined.");
        }

        if (typeof HERO_CONTENT !== 'undefined') {
            const heroSubtitleEl = document.getElementById('hero-subtitle');
            if (heroSubtitleEl && HERO_CONTENT.subtitle) {
                heroSubtitleEl.textContent = HERO_CONTENT.subtitle;
                heroSubtitleEl.classList.add('animated-item', 'animate-slide-up');
                heroSubtitleEl.dataset.animationDelay = '600ms';
            }
            const ctaProjects = document.getElementById('hero-cta-projects');
            if (ctaProjects) {
                const btnTextSpan = ctaProjects.querySelector('.btn-text');
                if(btnTextSpan) btnTextSpan.textContent = HERO_CONTENT.ctaText || 'View My Work';
                else ctaProjects.textContent = HERO_CONTENT.ctaText || 'View My Work';
                ctaProjects.href = HERO_CONTENT.ctaLink || "projects.html";
                ctaProjects.classList.add('animated-item', 'animate-slide-up');
                ctaProjects.dataset.animationDelay = `800ms`;
            }
            const ctaCv = document.getElementById('hero-cta-cv');
            if (ctaCv && HERO_CONTENT.cvLink) {
                const btnTextSpan = ctaCv.querySelector('.btn-text');
                if(btnTextSpan) btnTextSpan.textContent = 'Download CV';
                else ctaCv.textContent = 'Download CV';
                ctaCv.href = HERO_CONTENT.cvLink;
                ctaCv.classList.add('animated-item', 'animate-slide-up');
                ctaCv.dataset.animationDelay = `950ms`;
            }
            const socialLinksContainer = document.querySelector('.social-links-hero');
            if (socialLinksContainer) {
                socialLinksContainer.classList.add('animated-item', 'animate-slide-up');
                socialLinksContainer.dataset.animationDelay = '1100ms';
                const heroGithub = document.getElementById('hero-github-link');
                if (heroGithub && HERO_CONTENT.github) heroGithub.href = HERO_CONTENT.github;
                const heroLinkedin = document.getElementById('hero-linkedin-link');
                if (heroLinkedin && HERO_CONTENT.linkedin) heroLinkedin.href = HERO_CONTENT.linkedin;
                const heroEmail = document.getElementById('hero-email-link');
                if (heroEmail && HERO_CONTENT.email) heroEmail.href = `mailto:${HERO_CONTENT.email}`;
            }
        }
    }


    // --- Case Studies Page Specific Logic ---
    const caseStudiesGridContainer = document.getElementById('case-studies-grid-container');
    if (caseStudiesGridContainer && typeof CASE_STUDIES_DATA !== 'undefined' && CASE_STUDIES_DATA.length > 0) {
        CASE_STUDIES_DATA.forEach((study, index) => {
            const cardLink = document.createElement('a'); // Whole card is a link
            cardLink.href = study.link;
            cardLink.classList.add('case-study-card', 'animated-item', 'animate-scale-in');
            cardLink.dataset.animationDelay = `${index * 150}ms`;
            let tagsHtml = study.tags && study.tags.length > 0 ? `<div class="case-study-tags">${study.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
            cardLink.innerHTML = `
                <div class="case-study-card-thumbnail"><img src="${study.thumbnailUrl}" alt="${study.title} Thumbnail"></div>
                <div class="case-study-card-content">
                    <h3>${study.title}</h3>
                    ${study.subtitle ? `<p class="cs-subtitle">${study.subtitle}</p>` : ''}
                    ${study.introduction ? `<p class="cs-introduction">${study.introduction}</p>` : ''}
                    ${tagsHtml}
                    <span class="read-more-link">Read Case Study<span class="arrow"> →</span></span>
                </div>`;
            caseStudiesGridContainer.appendChild(cardLink);
        });
    }


    // --- Projects Page Specific Logic ---
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && typeof PROJECTS !== 'undefined') {
        projectsGrid.innerHTML = '';
        PROJECTS.forEach((project, index) => {
            const card = document.createElement('article');
            card.classList.add('project-card', 'animated-item', 'animate-scale-in');
            if (project.isConfidential) card.classList.add('project-card-confidential');
            card.dataset.animationDelay = `${index * 120}ms`;
            const stackHtml = project.stack.map(tech => `<span class="tech-pill">${tech}</span>`).join('');
            let githubButtonHTML = '';
            if (project.githubLink && project.githubLink.trim() !== '') {
                githubButtonHTML = `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span class="btn-text">GitHub</span></a>`;
            } else if (!project.isConfidential) {
                githubButtonHTML = `<span class="btn btn-secondary btn-disabled" aria-disabled="true" title="Repository is private or not publicly available."><span class="btn-text">Private Repo</span></span>`;
            }
            const liveButtonHTML = (!project.isConfidential && project.liveLink && project.liveLink !== "#")
                ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span class="btn-text">View Live</span></a>` : '';
            let imageAltText = project.isConfidential ? `${project.title} icon` : (project.imageUrl && project.imageUrl.endsWith('.svg') ? `${project.title} logo` : `${project.title} preview`);
            card.innerHTML = `
                <div class="project-card-inner">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${imageAltText}" class="${project.isConfidential ? 'confidential-project-image' : ''}">` : ''}
                    <div class="project-card-content">
                        <p class="project-type">${project.type} ${project.company ? `| ${project.company}` : ''} ${project.period ? `(${project.period})` : ''}</p>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-stack">${stackHtml}</div>
                        <div class="project-links">${githubButtonHTML}${liveButtonHTML}</div>
                    </div>
                </div>`;
            projectsGrid.appendChild(card);
        });
    }
    

    // --- Contact Page Specific Logic (Direct Buttons & Socials) ---
    // These elements are only on contact.html
    const emailBtn = document.getElementById('email-contact-btn');
    const phoneBtn = document.getElementById('phone-contact-btn');
    const contactGithubLinkOnContactPage = document.getElementById('contact-github-link'); // Make sure ID is unique if also on hero
    const contactLinkedinLinkOnContactPage = document.getElementById('contact-linkedin-link'); // Make sure ID is unique

    if (typeof CONTACT_DETAILS !== 'undefined') {
        if (emailBtn && CONTACT_DETAILS.email) {
            emailBtn.href = `mailto:${CONTACT_DETAILS.email}`;
        }
        if (phoneBtn && CONTACT_DETAILS.phone) {
            const cleanPhoneNumber = CONTACT_DETAILS.phone.replace(/[\s()-]/g, '');
            phoneBtn.href = `tel:${cleanPhoneNumber}`;
        }
        if (contactGithubLinkOnContactPage && CONTACT_DETAILS.github) {
            contactGithubLinkOnContactPage.href = CONTACT_DETAILS.github;
        }
        if (contactLinkedinLinkOnContactPage && CONTACT_DETAILS.linkedin) {
            contactLinkedinLinkOnContactPage.href = CONTACT_DETAILS.linkedin;
        }
    }


    // --- Footer ---
    if (typeof FOOTER_CONTENT !== 'undefined') {
        const footerTextEl = document.getElementById('footer-text');
        if (footerTextEl) {
            footerTextEl.innerHTML = `© ${FOOTER_CONTENT.year || new Date().getFullYear()} ${FOOTER_CONTENT.name || "Loukas-Nikolaos Vetoulis"}. Craft with vision and precision.`;
        }
    }


    // --- Intersection Observer Setup ---
    const animatedItems = document.querySelectorAll('.animated-item');
    let observer; // Declare observer globally within this scope

    if (typeof IntersectionObserver !== 'undefined') {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.05 };
        observer = new IntersectionObserver((entries, observerInstance) => { // Assign to global observer
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.animationDelay || '0ms';
                    entry.target.style.transitionDelay = delay;
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, observerOptions);
        animatedItems.forEach(item => {
            if(observer) observer.observe(item); // Check if observer was successfully created
        });

        // Re-observe dynamically added items (this part was slightly problematic before)
        // Ensure the grid containers themselves are part of `animatedItems` or their children are caught
        // The following will add NEW items to the SAME observer, which is good.
        if (caseStudiesGridContainer) {
            const newCSItems = caseStudiesGridContainer.querySelectorAll('.animated-item');
            newCSItems.forEach(item => {if(observer) observer.observe(item)});
        }
        if (projectsGrid) {
            const newProjItems = projectsGrid.querySelectorAll('.animated-item');
            newProjItems.forEach(item => {if(observer) observer.observe(item)});
        }

    } else if (animatedItems.length > 0) {
        // Fallback if IntersectionObserver is not supported: make all items visible
        animatedItems.forEach(item => item.classList.add('is-visible'));
    }


    // --- Project Card Tilt Effect ---
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            const innerCard = card.querySelector('.project-card-inner');
            if (!innerCard) return; // Safety check for innerCard

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const xVal = e.clientX - rect.left;
                const yVal = e.clientY - rect.top;
                const xOffset = (xVal - rect.width / 2) / (rect.width / 1.5);
                const yOffset = (yVal - rect.height / 2) / (rect.height / 1.5);
                const rotateY = xOffset * 6;
                const rotateX = -yOffset * 6;
                innerCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                innerCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            });
        });
    }

    // (No dummy contact form listener - you are using Calendly & direct buttons)

    // --- LOADING SCREEN LOGIC ---
    function hideLoader() {
        if (loaderWrapper) {
            loaderWrapper.classList.add('loaded');
        }
        document.body.classList.add('page-loaded');
    }
    window.addEventListener('load', () => {
        // Using a timeout ensures loader is visible for a minimum duration,
        // even if page loads extremely fast. Also helps if any late-loading resources affect layout.
        setTimeout(hideLoader, 300);
    });
});