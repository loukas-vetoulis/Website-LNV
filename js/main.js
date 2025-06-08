// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderLogoImg = document.getElementById('loader-logo-img');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const mainNavbarLogo = document.querySelector('.nav-logo img'); // Your main navbar logo
    const heroTitleEl = document.querySelector('.hero h1#hero-name');

    // --- Path & SVGs ---
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    //TODO: Put better sunicon and moon icon SVGs 
    const sunIconSVG = `<svg class="icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1V6c0-.552.448-1 1-1zm0 12c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm7.778-8.707l1.414-1.414a.997.997 0 000-1.414.999.999 0 00-1.414 0l-1.414 1.414a.999.999 0 001.414 1.414zM4.222 19.778l1.414-1.414a.999.999 0 10-1.414-1.414l-1.414 1.414a.999.999 0 001.414 1.414zM20 12c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zM5 12c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zm12.778-5.707a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 10-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zm-11.314 11.314a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 00-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zM12 9a3 3 0 100 6 3 3 0 000-6z"></path></svg>`;
    const moonIconSVG = `<svg class="icon icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M19.578 16.838a.998.998 0 01.487-1.925 7.992 7.992 0 00-2.649-1.887C17.781 11.56 18.5 9.33 18.5 7c0-4.136-3.364-7.5-7.5-7.5S3.5 2.864 3.5 7c0 2.443.796 4.686 2.064 6.407a8.024 8.024 0 00-3.61 11.131.998.998 0 001.579.566 10.018 10.018 0 0116.045-8.266zM11 19.5a5.984 5.984 0 01-3.397-1.006A7.968 7.968 0 005.5 13.44V7c0-2.982 2.208-5.5 5.5-5.5S16.5 4.018 16.5 7v.012A6 6 0 0111 19.5z"></path></svg>`;

    // --- Theme Management ---
    const applyTheme = (theme, isInitialLoad = false) => {
        const body = document.body;
        const toggleWrapper = themeToggleBtn ? themeToggleBtn.querySelector('.icon-wrapper') : null;

        // Directly set loader background and spinner color for initial load if CSS vars aren't ready
        if (isInitialLoad && loaderWrapper) {
            const lightBg = '#FDFDFE';
            const darkBg = '#0B1726';
            const lightAccent = '#111113'; 
            const darkAccent = '#389BFF';

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
        if (toggleWrapper) void toggleWrapper.offsetHeight; // Force reflow for icon transition
    };

    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    applyTheme(initialTheme, true); // Apply theme initially, flagging it as initial load

    if (themeToggleBtn) {
        const initialButtonText = document.documentElement.classList.contains('dark-mode') ? 'Light' : 'Dark';
        if (themeToggleBtn.firstChild && themeToggleBtn.firstChild.nodeType === Node.TEXT_NODE) {
            themeToggleBtn.firstChild.nodeValue = `${initialButtonText} Mode `;
        }

        themeToggleBtn.addEventListener('click', () => {
            let newTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
            if (themeToggleBtn.firstChild && themeToggleBtn.firstChild.nodeType === Node.TEXT_NODE) {
                themeToggleBtn.firstChild.nodeValue = `${newTheme === 'dark' ? 'Light' : 'Dark'} Mode `;
            }
        });
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            applyTheme(newSystemTheme);
            if (themeToggleBtn && themeToggleBtn.firstChild && themeToggleBtn.firstChild.nodeType === Node.TEXT_NODE) {
                themeToggleBtn.firstChild.nodeValue = `${newSystemTheme === 'dark' ? 'Light' : 'Dark'} Mode `;
            }
        }
    });

    // --- Mobile Navigation ---
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileNavToggle.innerHTML = isActive ? '×' : '☰';
            mobileNavToggle.setAttribute('aria-expanded', isActive.toString());
        });
    }

    // --- Active Nav Link ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if(linkHref){
            const linkPath = linkHref.split("/").pop() || "index.html";
            if (linkPath === currentPath) { link.classList.add('active'); }
        }
        if (navLinks) { // Ensure navLinks exists before adding event listener
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileNavToggle) mobileNavToggle.innerHTML = '☰';
                    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // --- Hero Text Character Animation ---
    if (heroTitleEl && typeof HERO_CONTENT !== 'undefined' && HERO_CONTENT.name) {
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
    } else if (heroTitleEl) {
        console.warn("Hero title element exists, but HERO_CONTENT.name is undefined. Using static text.");
        // Optionally, clear its 'char' class if pre-filled to avoid broken animation
        heroTitleEl.classList.remove('char'); // If .char implies styling for animated state
    }


    // --- Dynamic Content Population ---
    // Hero content (subtitle, CTAs, Social links)
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
            if (btnTextSpan) btnTextSpan.textContent = HERO_CONTENT.ctaText || 'View My Work';
            ctaProjects.href = "projects.html"; // Or from HERO_CONTENT.ctaLink
            ctaProjects.classList.add('animated-item', 'animate-slide-up');
            ctaProjects.dataset.animationDelay = `800ms`;
        }
        const ctaCv = document.getElementById('hero-cta-cv');
        if (ctaCv && HERO_CONTENT.cvLink) {
            const btnTextSpan = ctaCv.querySelector('.btn-text');
            if(btnTextSpan) btnTextSpan.textContent = 'Download CV';
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

    // About page: bio and profile image
    const aboutBioContainer = document.getElementById('about-bio-container');
    if (aboutBioContainer && typeof ABOUT_CONTENT !== 'undefined' && ABOUT_CONTENT.bio) {
        aboutBioContainer.innerHTML = ''; // Clear first if re-populating
        aboutBioContainer.classList.add('animated-item', 'animate-slide-in-right');
        aboutBioContainer.dataset.animationDelay = '200ms';
        ABOUT_CONTENT.bio.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutBioContainer.appendChild(p);
        });
        // The additional static paragraph for "My main interests..."
        const additionalBioP = document.createElement('p');
        additionalBioP.textContent = "My main interests lie in software engineering, particularly in automation, backend systems, and the ever-evolving fields of Artificial Intelligence and Data Science. I am always eager to learn new technologies and methodologies to build innovative and impactful solutions.";
        aboutBioContainer.appendChild(additionalBioP);

    }
    const profileImageContainer = document.getElementById('profile-image-container');
    if (profileImageContainer && typeof ABOUT_CONTENT !== 'undefined') {
        profileImageContainer.classList.add('animated-item', 'animate-slide-in-left');
        const profileImg = document.getElementById('profile-image');
        if (profileImg && ABOUT_CONTENT.profileImage) {
            profileImg.src = ABOUT_CONTENT.profileImage;
            profileImg.alt = (typeof HERO_CONTENT !== 'undefined' && HERO_CONTENT.name) ? HERO_CONTENT.name : "Profile Photo";
        } else if (profileImg) {
            profileImageContainer.style.display = 'none';
        }
    }

    // Experience
    const experienceContainer = document.getElementById('experience-list');
    if (experienceContainer && typeof EXPERIENCES !== 'undefined') {
        experienceContainer.innerHTML = ''; // Clear if re-populating
        EXPERIENCES.forEach((exp, index) => {
            const item = document.createElement('div');
            item.classList.add('item', 'animated-item', 'animate-slide-up');
            item.dataset.animationDelay = `${index * 100}ms`;
            item.innerHTML = `<h4>${exp.role}</h4><p class="company">${exp.company} ${exp.location ? `• ${exp.location}` : ''}</p><p class="period item-meta">${exp.period}</p><ul>${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>`;
            experienceContainer.appendChild(item);
        });
    }

    // Education
    const educationContainer = document.getElementById('education-list');
    if (educationContainer && typeof EDUCATION !== 'undefined') {
        educationContainer.innerHTML = ''; // Clear if re-populating
        EDUCATION.forEach((edu, index) => {
            const item = document.createElement('div');
            item.classList.add('item', 'animated-item', 'animate-slide-up');
            item.dataset.animationDelay = `${index * 100}ms`;
            item.innerHTML = `<h4>${edu.degree}</h4><p class="institution">${edu.institution}</p><p class="period item-meta">${edu.period}</p>${edu.description ? `<p class="secondary">${edu.description}</p>` : ''}`;
            educationContainer.appendChild(item);
        });
    }

    // Skills
    const skillsCategoriesMap = { languages: 'skills-languages-list', frameworksLibraries: 'skills-frameworks-list', toolsDatabases: 'skills-tools-list', methodologiesConcepts: 'skills-methodologies-list' };
    if (typeof SKILLS !== 'undefined') {
        Object.keys(skillsCategoriesMap).forEach(categoryKey => {
            const ulId = skillsCategoriesMap[categoryKey];
            const ul = document.getElementById(ulId);
            if (ul && SKILLS[categoryKey]) {
                ul.innerHTML = ''; // Clear if re-populating
                const categoryBlock = ul.closest('.skill-category');
                if (categoryBlock) categoryBlock.classList.add('animated-item', 'animate-scale-in');
                SKILLS[categoryKey].forEach((skillName) => {
                    const li = document.createElement('li');
                    li.textContent = skillName;
                    ul.appendChild(li);
                });
            }
        });
    }

    // Awards
    const awardsListContainer = document.getElementById('awards-list');
    if (awardsListContainer && typeof AWARDS_CERTIFICATES !== 'undefined') {
        awardsListContainer.innerHTML = ''; // Clear if re-populating
        awardsListContainer.classList.add('animated-item', 'animate-slide-up');
        AWARDS_CERTIFICATES.forEach(award => {
            const li = document.createElement('li');
            li.innerHTML = award; // Awards might have bold tags, so innerHTML is fine
            awardsListContainer.appendChild(li);
        });
    }

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && typeof PROJECTS !== 'undefined') {
        projectsGrid.innerHTML = ''; // Clear if re-populating
        PROJECTS.forEach((project, index) => {
            const card = document.createElement('article');
            card.classList.add('project-card', 'animated-item', 'animate-scale-in');
            card.dataset.animationDelay = `${index * 120}ms`;
            const githubButton = project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span class="btn-text">GitHub</span></a>` : '';
            const liveButton = (project.liveLink && project.liveLink !== "#") ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span class="btn-text">View Live</span></a>` : '';

            card.innerHTML = `
                <div class="project-card-inner">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title} screenshot">` : ''}
                    <div class="project-card-content">
                        ${project.type ? `<p class="project-type">${project.type}</p>` : ''}
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-stack">${project.stack.map(tech => `<span>${tech}</span>`).join('')}</div>
                        <div class="project-links">${githubButton}${liveButton}</div>
                    </div>
                </div>`;
            projectsGrid.appendChild(card);
        });
    }
    
    if (typeof CONTACT_DETAILS !== 'undefined') { // Check if CONTACT_DETAILS object exists in data.js
        
        // Populate "Send an Email" button
        const emailBtn = document.getElementById('email-contact-btn');
        if (emailBtn && CONTACT_DETAILS.email) {
            emailBtn.href = `mailto:${CONTACT_DETAILS.email}`;
            // The text "Send an Email" is already in your HTML button,
            // so no need to update emailBtn.querySelector('.btn-text').textContent
            // unless you want to change it from "Send an Email" to something else.
        }

        // Populate "Make a Call" button
        const phoneBtn = document.getElementById('phone-contact-btn');
        if (phoneBtn && CONTACT_DETAILS.phone) {
            const cleanPhoneNumber = CONTACT_DETAILS.phone.replace(/[\s()-]/g, ''); // Cleans phone number for tel: link
            phoneBtn.href = `tel:${cleanPhoneNumber}`;
            // The text "Make a Call" is already in your HTML button.
        }

        // Populate Social Links in the contact section
        const contactGithubLink = document.getElementById('contact-github-link');
        if (contactGithubLink && CONTACT_DETAILS.github) {
            contactGithubLink.href = CONTACT_DETAILS.github;
        }
        const contactLinkedinLink = document.getElementById('contact-linkedin-link');
        if (contactLinkedinLink && CONTACT_DETAILS.linkedin) {
            contactLinkedinLink.href = CONTACT_DETAILS.linkedin;
        }

        // REMOVE THIS BLOCK if ul#contact-details-list is no longer in your HTML for email/phone
        // Your new HTML structure uses .direct-contact-options, not this old list for email/phone.
        /*
        const contactDetailsList = document.getElementById('contact-details-list');
        if (contactDetailsList) {
            contactDetailsList.innerHTML = ''; // Clear if re-populating (old logic)
            const createListItem = (svg, text, href) => { const li = document.createElement('li'); li.innerHTML = `${svg} ${href ? `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>` : text}`; return li; };
            const emailSVGIcon = `<svg viewBox="0 0 24 24">...</svg>`; // Your SVG string
            const phoneSVGIcon = `<svg viewBox="0 0 24 24">...</svg>`; // Your SVG string
            const locationSVGIcon = `<svg viewBox="0 0 24 24">...</svg>`; // Your SVG string

            if (CONTACT_DETAILS.email) contactDetailsList.appendChild(createListItem(emailSVGIcon, CONTACT_DETAILS.email, `mailto:${CONTACT_DETAILS.email}`));
            if (CONTACT_DETAILS.phone) contactDetailsList.appendChild(createListItem(phoneSVGIcon, CONTACT_DETAILS.phone, `tel:${CONTACT_DETAILS.phone}`));
            if (CONTACT_DETAILS.address) contactDetailsList.appendChild(createListItem(locationSVGIcon, CONTACT_DETAILS.address));
        }
        */
    }

    // Footer
    if (typeof FOOTER_CONTENT !== 'undefined') {
        const footerTextEl = document.getElementById('footer-text');
        if (footerTextEl) {
            footerTextEl.innerHTML = `© ${FOOTER_CONTENT.year || new Date().getFullYear()} ${FOOTER_CONTENT.name || "Your Name"}. Craft with vision and precision.`;
        }
    }


    // --- Intersection Observer for Scroll Animations ---
    const animatedItems = document.querySelectorAll('.animated-item');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay || '0ms';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedItems.forEach(item => observer.observe(item));


    // --- Project Card Tilt Effect ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const innerCard = card.querySelector('.project-card-inner');
        if (!innerCard) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const xVal = e.clientX - rect.left; const yVal = e.clientY - rect.top;
            const xOffset = (xVal - rect.width / 2) / (rect.width / 1.5); // Reduce divisor for more sensitivity
            const yOffset = (yVal - rect.height / 2) / (rect.height / 1.5);
            const rotateY = xOffset * 6; // Max 6deg rotation for subtlety
            const rotateX = -yOffset * 6;
            innerCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`; // Slightly less scale
        });
        card.addEventListener('mouseleave', () => {
            innerCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
    });

    // --- Dummy Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('#name');
            const name = nameInput ? nameInput.value : "there";
            alert('Thank you, ' + name + '! Your message has been "sent" (this is a demo).');
            contactForm.reset();
        });
    }

    // --- LOADING SCREEN LOGIC ---
    function hideLoader() {
        if (loaderWrapper) {
            loaderWrapper.classList.add('loaded');
        }
        document.body.classList.add('page-loaded');
    }
    window.addEventListener('load', () => {
        setTimeout(hideLoader, 500); // Minimum display time for loader
    });
});