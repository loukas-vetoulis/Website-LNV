// --- START OF FILE main.js ---

class ProjectShowcase {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    renderFeatured() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        // Ensure FEATURED_PROJECTS is defined in data.js
        const featuredProjects = (typeof FEATURED_PROJECTS !== 'undefined') ? FEATURED_PROJECTS : [];


        featuredProjects.forEach((project, index) => {
            const card = document.createElement('article');
            card.classList.add('project-card', 'animated-item', 'animate-scale-in');
            card.dataset.animationDelay = `${index * 120}ms`;
            
            const stackHtml = project.stack.map(tech => `<span class="tech-pill">${tech}</span>`).join('');
            
            let githubButtonHTML = '';
            if (project.githubLink && project.githubLink.trim() !== '') {
                githubButtonHTML = `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <span class="btn-text">GitHub</span>
                </a>`;
            } else {
                githubButtonHTML = `<span class="btn btn-secondary btn-disabled" aria-disabled="true" title="Repository is private or not publicly available.">
                    <span class="btn-text">Private Repo</span>
                </span>`;
            }

            const liveButtonHTML = (project.liveLink && project.liveLink !== "#") 
                ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <span class="btn-text">View Live</span>
                  </a>` 
                : '';

            card.innerHTML = `
                <div class="project-card-inner">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title}" loading="lazy">` : ''}
                    <div class="project-card-content">
                        <p class="project-type">${project.type}</p>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-stack">${stackHtml}</div>
                        <div class="project-links">
                            ${githubButtonHTML}
                            ${liveButtonHTML}
                            ${project.caseStudyLink ? `
                                <a href="${project.caseStudyLink}" class="btn btn-primary btn-premium">
                                    <span class="btn-text">View Case Study</span>
                                    <span class="arrow">→</span>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>`;

            this.container.appendChild(card);
        });
    }
}


class PremiumHeroAnimation {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.heroSection = document.getElementById('heroSection');
        this.video = document.querySelector('.hero-background-video');
        this.title = document.getElementById('heroTitle');
        this.subtitle = document.getElementById('heroSubtitle');
        this.typewriterElement = document.getElementById('typewriterText');
        this.cursor = document.getElementById('cursor');
        this.introContainer = document.getElementById('introContainer');
        this.mainContent = document.getElementById('mainContent');
        
        this.animationHasBeenTriggered = false; 
        this.scrollEventFiredAtLeastOnce = false;

        // Bind event handlers to `this` instance
        this.handleScroll = this.handleScroll.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);

        if (!this.heroSection) {
            console.warn("PremiumHeroAnimation: heroSection not found. Animation will not run.");
            return;
        }
        this.init();
    }

    init() {
        console.log('[PHA] Initializing PremiumHeroAnimation. isIOS:', this.isIOS);
        // We are NOT adding body.hero-active here for iOS scroll lock.
        // The #heroSection CSS (position:fixed) should handle the visual appearance.
        
        this.setupVideoAnimation();
        this.setupTextAnimation();
        this.setupTypewriter();
        this.attachEventListeners(); 

        if (this.isIOS) {
            this.setupIOSFixes();
        }

        setTimeout(() => {
            document.body.classList.add('hero-started');
        }, 300);
    }

    setupIOSFixes() {
        if (this.heroSection) {
            this.heroSection.style.webkitTransform = 'translateZ(0)';
            this.heroSection.style.webkitBackfaceVisibility = 'hidden';
            this.heroSection.style.webkitPerspective = '1000px';
            console.log('[PHA IOSFix] Applied webkit transforms to heroSection.');
        }
        // Fallback: If no scroll or interaction triggers animation after a delay
        // setTimeout(() => {
        //     if (!this.animationHasBeenTriggered) {
        //         console.warn('[PHA IOSFix] Fallback: Animation not triggered after 5s. Forcing trigger.');
        //         this.triggerAnimationLogic(); 
        //     }
        // }, 5000); // 5 seconds
    }

    setupVideoAnimation() {
        if (this.video) {
            if (this.isMobile) {
                this.video.muted = true;
                this.video.playsInline = true;
                this.video.setAttribute('webkit-playsinline', '');
                this.video.setAttribute('playsinline', '');
                
                const playVideo = () => {
                    if (this.video.paused) { 
                        const playPromise = this.video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                                console.log('Video autoplay failed:', error);
                                this.video.classList.add('loaded');
                            });
                        }
                    }
                };
                playVideo();
                ['touchstart', 'click'].forEach(event => {
                    document.addEventListener(event, playVideo, { once: true });
                });
            }
            
            this.video.addEventListener('loadeddata', () => {
                this.video.classList.add('loaded');
            });
            
            setTimeout(() => { 
                if (!this.video.classList.contains('loaded')) {
                    this.video.classList.add('loaded');
                }
            }, 800);
        }
    }

    setupTextAnimation() {
        const titleDelay = this.isMobile ? 400 : 600;
        const subtitleDelay = this.isMobile ? 800 : 1200;
        
        if (this.title) {
            setTimeout(() => {
                this.title.classList.add('ready');
                this.animateText(this.title, this.isMobile ? 50 : 100);
            }, titleDelay);
        }
        
        if (this.subtitle) {
            setTimeout(() => {
                this.subtitle.classList.add('ready');
                this.animateText(this.subtitle, 0); 
            }, subtitleDelay);
        }
    }

    animateText(element, delay) {
        if (!element || !element.textContent) return;
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'letter';
            
            if (this.isIOS) {
                span.style.webkitTransform = 'translateZ(0)';
                span.style.webkitBackfaceVisibility = 'hidden';
            }
            element.appendChild(span);
            
            const timing = this.isMobile ? 40 : 60;
            const randomDelay = this.isMobile ? Math.random() * 20 : Math.random() * 30;
            
            setTimeout(() => {
                span.classList.add('animate');
                if (this.isIOS) span.offsetHeight;
            }, delay + (index * timing) + randomDelay);
        });
    }

    setupTypewriter() {
        const text = (typeof HERO_CONTENT !== 'undefined' && HERO_CONTENT.premiumHeroTypewriter) 
                     ? HERO_CONTENT.premiumHeroTypewriter
                     : "Default typewriter text if HERO_CONTENT is missing."; 

        if (this.typewriterElement && this.introContainer) {
            let index = 0;
            const typeSpeed = this.isMobile ? 35 : 25;
            
            setTimeout(() => {
                this.introContainer.classList.add('show');
                
                const typeInterval = setInterval(() => {
                    if (index < text.length) {
                        this.typewriterElement.textContent += text[index];
                        index++;
                        if (this.isIOS) this.typewriterElement.offsetHeight;
                    } else {
                        clearInterval(typeInterval);
                        if (this.cursor) {
                            setTimeout(() => { this.cursor.style.display = 'none'; }, 1000);
                        }
                    }
                }, typeSpeed);
            }, this.isMobile ? 1400 : 1800);
        }
    }

    triggerAnimationLogic() {
        if (this.animationHasBeenTriggered) {
            console.log('[PHA triggerAnimationLogic] Already triggered. Aborting.');
            return;
        }
        this.animationHasBeenTriggered = true;
        console.log('%c[PHA triggerAnimationLogic] Animation TRIGGERED!', 'color: green; font-weight: bold;');

        if (this.heroSection) this.heroSection.classList.add('scrolled');
        
        setTimeout(() => {
            if (this.mainContent) this.mainContent.classList.add('reveal');
            if (document.body.classList.contains('home-page')) {
                document.body.classList.add('hero-content-revealed');
            }
            console.log('[PHA triggerAnimationLogic] Main content reveal scheduled.');
        }, 300); 
        
        setTimeout(() => {
            if (this.heroSection) {
                this.heroSection.style.display = 'none';
                console.log('[PHA triggerAnimationLogic] Hero section display set to none.');
            }
        }, 1200);

        this.removeEventListeners();
    }

    handleScroll() {
        this.scrollEventFiredAtLeastOnce = true; 
        console.log(`[PHA handleScroll] scrollY: ${window.scrollY}, animationTriggered: ${this.animationHasBeenTriggered}`);
        
        if (!this.animationHasBeenTriggered && window.scrollY > 1) { 
            this.triggerAnimationLogic();
        }
    }

    handleWheel(e) {
        console.log(`[PHA handleWheel] deltaY: ${e.deltaY}, animationTriggered: ${this.animationHasBeenTriggered}`);
        if (!this.animationHasBeenTriggered && e.deltaY > 0) {
            this.triggerAnimationLogic();
        }
    }

    handleTouchStart() {
        console.log(`[PHA handleTouchStart] User touched screen. animationTriggered: ${this.animationHasBeenTriggered}, scrollEventFiredAtLeastOnce: ${this.scrollEventFiredAtLeastOnce}`);
        // AGGRESSIVE FALLBACK for iOS if scroll events are unreliable:
        // Uncomment this block if console logs show 'scroll' events are not firing or scrollY isn't changing on iOS
        // after a touch swipe, even with body not being position:fixed.
        
        setTimeout(() => {
            if (!this.animationHasBeenTriggered && !this.scrollEventFiredAtLeastOnce && this.isIOS) {
                console.warn('[PHA handleTouchStart] iOS Fallback: Scroll event has not fired shortly after touch. Forcing animation.');
                this.triggerAnimationLogic();
            }
        }, 250); // Wait a short moment (e.g., 250ms) to see if a scroll event follows the touch
    
    }

    attachEventListeners() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('wheel', this.handleWheel, { passive: true });
        window.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        console.log('[PHA attachEventListeners] Event listeners ADDED.');
    }

    removeEventListeners() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('touchstart', this.handleTouchStart);
        console.log('[PHA removeEventListeners] Event listeners REMOVED.');
    }
}

// Initialize PremiumHeroAnimation only on the homepage
if (document.body.classList.contains('home-page')) {
    const initPremiumHero = () => {
        document.body.classList.add('premium-hero-ready'); // Make body visible
        new PremiumHeroAnimation();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPremiumHero, { once: true });
    } else {
        initPremiumHero();
    }
}


// --- General Site Logic (runs on all pages after DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    const isHomepage = document.body.classList.contains('home-page');
    
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderLogoImg = document.getElementById('loader-logo-img');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinksUl = document.getElementById('nav-links');
    const mainNavbarLogo = document.getElementById('navbar-logo-img'); 
    
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const sunIconSVG = `<svg class="icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1V6c0-.552.448-1 1-1zm0 12c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm7.778-8.707l1.414-1.414a.997.997 0 000-1.414.999.999 0 00-1.414 0l-1.414 1.414a.999.999 0 001.414 1.414zM4.222 19.778l1.414-1.414a.999.999 0 10-1.414-1.414l-1.414 1.414a.999.999 0 001.414 1.414zM20 12c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zM5 12c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zm12.778-5.707a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 10-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zm-11.314 11.314a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 00-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zM12 9a3 3 0 100 6 3 3 0 000-6z"></path></svg>`;
    const moonIconSVG = `<svg class="icon icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M19.578 16.838a.998.998 0 01.487-1.925 7.992 7.992 0 00-2.649-1.887C17.781 11.56 18.5 9.33 18.5 7c0-4.136-3.364-7.5-7.5-7.5S3.5 2.864 3.5 7c0 2.443.796 4.686 2.064 6.407a8.024 8.024 0 00-3.61 11.131.998.998 0 001.579.566 10.018 10.018 0 0116.045-8.266zM11 19.5a5.984 5.984 0 01-3.397-1.006A7.968 7.968 0 005.5 13.44V7c0-2.982 2.208-5.5 5.5-5.5S16.5 4.018 16.5 7v.012A6 6 0 0111 19.5z"></path></svg>`;

    if (!isHomepage) {
        if (!document.body.classList.contains('premium-hero-ready') && 
            !document.body.classList.contains('general-page-ready')) {
            document.body.classList.add('general-page-ready'); 
        }
    } else {
        if (loaderWrapper) {
            loaderWrapper.style.display = 'none'; 
        }
    }
    
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

    const applyTheme = (theme, isInitialLoad = false) => {
        const body = document.body;
        const toggleWrapper = themeToggleBtn ? themeToggleBtn.querySelector('.icon-wrapper') : null;

        if (isInitialLoad && loaderWrapper && !isHomepage && loaderWrapper.style.display !== 'none') {
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
            if (loaderLogoImg && !isHomepage) loaderLogoImg.src = 'images/dark_logo.png';
        } else {
            document.documentElement.classList.remove('dark-mode');
            body.classList.add('light-mode'); body.classList.remove('dark-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = sunIconSVG + moonIconSVG;
            if (mainNavbarLogo) mainNavbarLogo.src = 'images/light_logo.png';
            if (loaderLogoImg && !isHomepage) loaderLogoImg.src = 'images/light_logo.png';
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

    if (mobileNavToggle && navLinksUl) {
        mobileNavToggle.addEventListener('click', () => {
            const isActive = navLinksUl.classList.toggle('active');
            mobileNavToggle.classList.toggle('active', isActive);
            mobileNavToggle.innerHTML = isActive ? '×' : '☰';
            mobileNavToggle.setAttribute('aria-expanded', isActive.toString());
            document.body.classList.toggle('mobile-menu-open', isActive);
        });

        navLinksUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') { 
                closeMobileMenu();
            } else if (e.target.matches('ul.nav-links::before') || (e.target === navLinksUl && navLinksUl.classList.contains('active'))) {
                const rect = navLinksUl.getBoundingClientRect();
                const styles = window.getComputedStyle(navLinksUl, '::before');
                const closeBtnSize = 50; 
                const closeBtnTop = parseFloat(styles.top) || (2 * 16); 
                const closeBtnRight = parseFloat(styles.right) || (2*16); 

                const closeButtonXstart = rect.width - closeBtnRight - closeBtnSize;
                const closeButtonXend = rect.width - closeBtnRight;
                const closeButtonYstart = closeBtnTop;
                const closeButtonYend = closeBtnTop + closeBtnSize;
                
                const clickXRelative = e.clientX - rect.left;
                const clickYRelative = e.clientY - rect.top;

                if ( clickXRelative >= closeButtonXstart && clickXRelative <= closeButtonXend &&
                     clickYRelative >= closeButtonYstart && clickYRelative <= closeButtonYend ) {
                    closeMobileMenu();
                }
            }
        });
    }
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 3768 && navLinksUl && navLinksUl.classList.contains('active')) {
            if (!navLinksUl.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksUl && navLinksUl.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    const heroNameEl = document.querySelector('.hero h1#hero-name'); 
    if (isHomepage && heroNameEl && typeof HERO_CONTENT !== 'undefined' && HERO_CONTENT.name) {
        // This part would be relevant if #hero-name was separate from PremiumHeroAnimation's #heroTitle
    }

    const caseStudiesGridContainer = document.getElementById('case-studies-grid-container');
    if (caseStudiesGridContainer && typeof CASE_STUDIES_DATA !== 'undefined' && CASE_STUDIES_DATA.length > 0) {
        CASE_STUDIES_DATA.forEach((study, index) => {
            const cardLink = document.createElement('a');
            cardLink.href = study.link;
            cardLink.classList.add('case-study-card', 'animated-item', 'animate-scale-in');
            cardLink.dataset.animationDelay = `${index * 150}ms`;
            let tagsHtml = study.tags && study.tags.length > 0 ? `<div class="case-study-tags">${study.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
            cardLink.innerHTML = `
                <div class="case-study-card-thumbnail"><img src="${study.thumbnailUrl}" alt="${study.title} Thumbnail" loading="lazy"></div>
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

    const projectsGrid = document.getElementById('projects-grid');
    const allProjects = (typeof PROJECTS !== 'undefined') ? PROJECTS : [];

    if (projectsGrid && currentPath === 'index.html') {
        const showcase = new ProjectShowcase('projects-grid'); 
        showcase.renderFeatured();
    } else if (projectsGrid && currentPath === 'projects.html') {
        projectsGrid.innerHTML = '';
        allProjects.forEach((project, index) => {
            const card = document.createElement('article');
            card.classList.add('project-card', 'animated-item', 'animate-scale-in');
            if (project.isConfidential) card.classList.add('project-card-confidential');
            card.dataset.animationDelay = `${index * 120}ms`;
            const stackHtml = project.stack.map(tech => `<span class="tech-pill">${tech}</span>`).join('');
            let githubButtonHTML = '';
            if (project.githubLink && project.githubLink.trim() !== '') {
                githubButtonHTML = `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span class="btn-text">GitHub</span></a>`;
            } 
            else if (!project.isConfidential) {
                githubButtonHTML = `<span class="btn btn-secondary btn-disabled" aria-disabled="true" title="Repository is private or not publicly available."><span class="btn-text">Private Repo</span></span>`;
            }
            const liveButtonHTML = (!project.isConfidential && project.liveLink && project.liveLink !== "#")
                ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span class="btn-text">View Live</span></a>` : '';
            
            let caseStudyButtonHTML = '';
            if (project.caseStudyLink && project.caseStudyLink.trim() !== '') {
                caseStudyButtonHTML = `<a href="${project.caseStudyLink}" class="btn btn-outline project-card-cs-link"><span class="btn-text">Read Case Study</span> <span class="arrow">→</span></a>`;
            }

            let imageAltText = project.isConfidential ? `${project.title} icon` : (project.imageUrl && project.imageUrl.endsWith('.svg') ? `${project.title} logo` : `${project.title} preview`);
            card.innerHTML = `
                <div class="project-card-inner">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${imageAltText}" class="${project.isConfidential ? 'confidential-project-image' : ''}" loading="lazy">` : ''}
                    <div class="project-card-content">
                        <p class="project-type">${project.type} ${project.company ? `| ${project.company}` : ''} ${project.period ? `(${project.period})` : ''}</p>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-stack">${stackHtml}</div>
                        <div class="project-links">${githubButtonHTML}${liveButtonHTML}${caseStudyButtonHTML}</div>
                    </div>
                </div>`;
            projectsGrid.appendChild(card);
        });
    }
    
    const emailBtn = document.getElementById('email-contact-btn');
    const phoneBtn = document.getElementById('phone-contact-btn');
    const contactGithubLinkOnContactPage = document.getElementById('contact-github-link'); 
    const contactLinkedinLinkOnContactPage = document.getElementById('contact-linkedin-link'); 

    if (typeof CONTACT_DETAILS !== 'undefined') {
        if (emailBtn && CONTACT_DETAILS.email) emailBtn.href = `mailto:${CONTACT_DETAILS.email}`;
        if (phoneBtn && CONTACT_DETAILS.phone) phoneBtn.href = `tel:${CONTACT_DETAILS.phone.replace(/[\s()-]/g, '')}`;
        if (contactGithubLinkOnContactPage && CONTACT_DETAILS.github) contactGithubLinkOnContactPage.href = CONTACT_DETAILS.github;
        if (contactLinkedinLinkOnContactPage && CONTACT_DETAILS.linkedin) contactLinkedinLinkOnContactPage.href = CONTACT_DETAILS.linkedin;
    }

    const animatedItems = document.querySelectorAll('.animated-item');
    let intersectionObserverInstance; 

    if (typeof IntersectionObserver !== 'undefined') {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.05 };
        intersectionObserverInstance = new IntersectionObserver((entries, observerInstance) => { 
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
            if(intersectionObserverInstance) intersectionObserverInstance.observe(item); 
        });

        if (caseStudiesGridContainer) {
            const newCSItems = caseStudiesGridContainer.querySelectorAll('.animated-item');
            newCSItems.forEach(item => {if(intersectionObserverInstance) intersectionObserverInstance.observe(item)});
        }
        if (projectsGrid) {
            const newProjItems = projectsGrid.querySelectorAll('.animated-item');
            newProjItems.forEach(item => {if(intersectionObserverInstance) intersectionObserverInstance.observe(item)});
        }
    } else {
        animatedItems.forEach(item => item.classList.add('is-visible'));
    }

    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            const innerCard = card.querySelector('.project-card-inner');
            if (!innerCard) return; 

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

    function hideGeneralLoader() {
        if (loaderWrapper) {
            loaderWrapper.classList.add('loaded');
        }
        if (!isHomepage) {
            document.body.classList.add('page-loaded');
        }
    }

    if (!isHomepage) {
        window.addEventListener('load', () => {
            setTimeout(hideGeneralLoader, 300);
        });
    }

    const footerEl = document.getElementById('footer-content');
    if (footerEl && typeof CONTACT_DETAILS !== 'undefined' && typeof FOOTER_CONTENT !== 'undefined') {
        footerEl.innerHTML = `
            <div class="footer-brand" style="margin-bottom:1.2rem;">
                <img src="images/light_logo.png" alt="LNV Logo" id="footer-logo-img" style="height:36px;width:auto;display:block;margin:0 auto 0.5rem;">
                <div class="footer-moto" style="font-size:1.05rem;color:var(--current-secondary-text);font-style:italic;">
                    Simplicity crafted through vision and precision.
                </div>
            </div>
            <nav class="footer-nav" aria-label="Footer Navigation">
                <a href="index.html">Home</a>
                <a href="projects.html">Projects</a>
                <a href="case-studies.html">Case Studies</a>
                <a href="contact.html">Contact</a>
            </nav>
            <div class="footer-socials" style="margin:1.2rem 0;">
                <a href="${CONTACT_DETAILS.github}" target="_blank" aria-label="GitHub" style="margin-right:1.2rem;">
                    <svg width="22" height="22" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.45 24 17.12 24 12.02 24 5.74 18.27.5 12 .5z"/></svg>
                </a>
                <a href="${CONTACT_DETAILS.linkedin}" target="_blank" aria-label="LinkedIn">
                    <svg width="22" height="22" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.56v4.77z"/></svg>
                </a>
            </div>
            <div class="footer-contact" style="margin-bottom:1.2rem;">
                <a href="mailto:${CONTACT_DETAILS.email}">${CONTACT_DETAILS.email}</a>
                <span style="margin:0 0.7rem;">|</span>
                <a href="tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}">${CONTACT_DETAILS.phone}</a>
                <span style="margin:0 0.7rem;">|</span>
                <span>${CONTACT_DETAILS.address}</span>
            </div>
            <div class="footer-copy" style="font-size:0.97rem;color:var(--current-secondary-text);margin-top:0.7rem;">
                © ${FOOTER_CONTENT.year || new Date().getFullYear()} ${FOOTER_CONTENT.name}
            </div>
        `;

        const updateFooterLogo = () => {
            const htmlEl = document.documentElement;
            const footerLogoImgEl = document.getElementById('footer-logo-img');
            if (!footerLogoImgEl) return;
            if (htmlEl.classList.contains('dark-mode')) {
                footerLogoImgEl.src = 'images/dark_logo.png';
            } else {
                footerLogoImgEl.src = 'images/light_logo.png';
            }
        };
        updateFooterLogo();
        const themeMutationObserver = new MutationObserver(updateFooterLogo);
        themeMutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    if (isHomepage && document.getElementById('scrollIndicator')) {
        const scrollIndicator = document.getElementById('scrollIndicator');
        let lastScrollY = 0;
        function handleScrollIndicator() {
            const currentScrollY = window.scrollY;
            const shouldHide = currentScrollY > 50 || currentScrollY > lastScrollY;
            if (scrollIndicator) {
                if (shouldHide && !scrollIndicator.classList.contains('hidden')) {
                    scrollIndicator.classList.add('hidden');
                } else if (!shouldHide && currentScrollY < 20) {
                    scrollIndicator.classList.remove('hidden');
                }
            }
            lastScrollY = currentScrollY;
        }
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScrollIndicator();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        ['click', 'keydown', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                if (scrollIndicator) scrollIndicator.classList.add('hidden');
            }, { once: true });
        });
    }
    
    // Crucial: Keep the original `touchmove` preventDefault listener commented out.
    // document.addEventListener('touchmove', function(e) {
    //     if (document.body.classList.contains('hero-active')) { // 'hero-active' is not being added for iOS anymore
    //         e.preventDefault();
    //     }
    // }, { passive: false });

}); // End of DOMContentLoaded