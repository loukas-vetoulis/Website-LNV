// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const logoImage = document.querySelector('.nav-logo img'); // Get the logo image

    // --- Theme Toggler ---
    const sunIconSVG = `<svg class="icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1V6c0-.552.448-1 1-1zm0 12c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm7.778-8.707l1.414-1.414a.997.997 0 000-1.414.999.999 0 00-1.414 0l-1.414 1.414a.999.999 0 001.414 1.414zM4.222 19.778l1.414-1.414a.999.999 0 10-1.414-1.414l-1.414 1.414a.999.999 0 001.414 1.414zM20 12c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zM5 12c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zm12.778-5.707a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 10-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zm-11.314 11.314a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 00-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zM12 9a3 3 0 100 6 3 3 0 000-6z"></path></svg>`;
    const moonIconSVG = `<svg class="icon icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M19.578 16.838a.998.998 0 01.487-1.925 7.992 7.992 0 00-2.649-1.887C17.781 11.56 18.5 9.33 18.5 7c0-4.136-3.364-7.5-7.5-7.5S3.5 2.864 3.5 7c0 2.443.796 4.686 2.064 6.407a8.024 8.024 0 00-3.61 11.131.998.998 0 001.579.566 10.018 10.018 0 0116.045-8.266zM11 19.5a5.984 5.984 0 01-3.397-1.006A7.968 7.968 0 005.5 13.44V7c0-2.982 2.208-5.5 5.5-5.5S16.5 4.018 16.5 7v.012A6 6 0 0111 19.5z"></path></svg>`;

    const applyTheme = (theme) => {
        const body = document.body;
        const toggleWrapper = themeToggleBtn ? themeToggleBtn.querySelector('.icon-wrapper') : null;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            body.classList.add('dark-mode'); body.classList.remove('light-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = moonIconSVG + sunIconSVG;
            if (logoImage) logoImage.src = 'images/dark_logo.png'; // Change to dark logo
        } else {
            document.documentElement.classList.remove('dark-mode');
            body.classList.add('light-mode'); body.classList.remove('dark-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = sunIconSVG + moonIconSVG;
            if (logoImage) logoImage.src = 'images/light_logo.png'; // Change to light logo
        }
        if(toggleWrapper) void toggleWrapper.offsetHeight; // Force reflow for icon transition
    };

    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Ensure logo matches initial theme before applyTheme visually updates it
    if (logoImage) {
        logoImage.src = initialTheme === 'dark' ? 'images/dark_logo.png' : 'images/light_logo.png';
    }
    applyTheme(initialTheme); // Apply visual theme changes and potentially logo again (harmless)


    if (themeToggleBtn) {
        // Set initial button text based on the actually applied theme
        const initialButtonText = document.documentElement.classList.contains('dark-mode') ? 'Light' : 'Dark';
        if (themeToggleBtn.firstChild.nodeType === Node.TEXT_NODE) {
            themeToggleBtn.firstChild.nodeValue = `${initialButtonText} Mode `;
        }


        themeToggleBtn.addEventListener('click', () => {
            let newTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);

            const buttonText = newTheme === 'dark' ? 'Light' : 'Dark';
            if (themeToggleBtn.firstChild.nodeType === Node.TEXT_NODE) {
                themeToggleBtn.firstChild.nodeValue = `${buttonText} Mode `;
            }
        });
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only if no user preference is set
            const newSystemTheme = e.matches ? 'dark' : 'light';
            applyTheme(newSystemTheme);
            if(themeToggleBtn && themeToggleBtn.firstChild.nodeType === Node.TEXT_NODE) {
                 const buttonText = e.matches ? 'Light' : 'Dark';
                 themeToggleBtn.firstChild.nodeValue = `${buttonText} Mode `;
            }
        }
    });

    // --- Mobile Navigation ---
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileNavToggle.innerHTML = isActive ? '×' : '☰';
            mobileNavToggle.setAttribute('aria-expanded', isActive);
        });
    }

    // --- Active Nav Link ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = (link.getAttribute('href') || "").split("/").pop() || "index.html";
        if (linkPath === currentPath) { link.classList.add('active'); }
        if (navLinks) {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileNavToggle) mobileNavToggle.innerHTML = '☰';
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // --- Hero Text Character Animation ---
    const heroTitleEl = document.querySelector('.hero h1#hero-name');
    if (heroTitleEl && HERO_CONTENT && HERO_CONTENT.name) { // Check if HERO_CONTENT.name exists
        const text = HERO_CONTENT.name.trim(); // Use name from data.js
        heroTitleEl.innerHTML = ''; // Clear existing
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
        // Fallback if HERO_CONTENT.name is not defined, keep original text or a default
        console.warn("HERO_CONTENT.name is not defined in data.js for hero title animation.");
    }


    // --- Dynamic Content Population (Ensure sections match from "Plus" version) ---

    // Hero content (subtitle, CTAs)
    if (typeof HERO_CONTENT !== 'undefined') { // Check if HERO_CONTENT is defined
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
            else ctaProjects.textContent = HERO_CONTENT.ctaText || 'View My Work'; // Fallback
            ctaProjects.href = "projects.html"; // Or HERO_CONTENT.ctaLink if defined
            ctaProjects.classList.add('animated-item', 'animate-slide-up');
            ctaProjects.dataset.animationDelay = `800ms`;
        }
        const ctaCv = document.getElementById('hero-cta-cv');
        if (ctaCv && HERO_CONTENT.cvLink) {
            const btnTextSpan = ctaCv.querySelector('.btn-text');
            if(btnTextSpan) btnTextSpan.textContent = 'Download CV';
            else ctaCv.textContent = 'Download CV'; // Fallback
            ctaCv.href = HERO_CONTENT.cvLink;
            ctaCv.classList.add('animated-item', 'animate-slide-up');
            ctaCv.dataset.animationDelay = `950ms`;
        }
        const socialLinksContainer = document.querySelector('.social-links-hero');
        if(socialLinksContainer) {
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
    // ... (Rest of the dynamic content loading, ensuring HERO_CONTENT, ABOUT_CONTENT etc. are checked for existence)
    // About page: bio and profile image
    const aboutBioContainer = document.getElementById('about-bio-container');
    if (aboutBioContainer && typeof ABOUT_CONTENT !== 'undefined' && ABOUT_CONTENT.bio) {
        aboutBioContainer.classList.add('animated-item', 'animate-slide-in-right');
        aboutBioContainer.dataset.animationDelay = '200ms';
        ABOUT_CONTENT.bio.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutBioContainer.appendChild(p);
        });
        const additionalBioP = document.createElement('p');
        additionalBioP.textContent = "My main interests lie in software engineering, particularly in automation, backend systems, and the ever-evolving fields of Artificial Intelligence and Data Science. I am always eager to learn new technologies and methodologies to build innovative and impactful solutions.";
        aboutBioContainer.appendChild(additionalBioP);
    }
    const profileImageContainer = document.getElementById('profile-image-container');
    if(profileImageContainer && typeof ABOUT_CONTENT !== 'undefined') {
        profileImageContainer.classList.add('animated-item', 'animate-slide-in-left');
         const profileImg = document.getElementById('profile-image');
        if(profileImg && ABOUT_CONTENT.profileImage) {
            profileImg.src = ABOUT_CONTENT.profileImage;
            profileImg.alt = (typeof HERO_CONTENT !== 'undefined' && HERO_CONTENT.name) ? HERO_CONTENT.name : "Profile Photo";
        } else if(profileImg) { // if img element exists but no src from data.js
            profileImageContainer.style.display = 'none';
        }
    }

    // Experience
    const experienceContainer = document.getElementById('experience-list');
    if (experienceContainer && typeof EXPERIENCES !== 'undefined') {
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
        EDUCATION.forEach((edu, index) => {
            const item = document.createElement('div');
            item.classList.add('item', 'animated-item', 'animate-slide-up');
            item.dataset.animationDelay = `${index * 100}ms`;
            item.innerHTML = `<h4>${edu.degree}</h4><p class="institution">${edu.institution}</p><p class="period item-meta">${edu.period}</p>${edu.description ? `<p class="secondary">${edu.description}</p>` : ''}`;
            educationContainer.appendChild(item);
        });
    }

    // Skills
    // const skillsCategoriesMap = { languages: 'skills-languages-list', frameworksLibraries: 'skills-frameworks-list', toolsDatabases: 'skills-tools-list', methodologiesConcepts: 'skills-methodologies-list' };
    // Ensure skillsCategoriesMap is defined or handle skills another way if these IDs are not used.
    if (typeof SKILLS !== 'undefined' && typeof skillsCategoriesMap !== 'undefined') {
        Object.keys(skillsCategoriesMap).forEach(categoryKey => {
            const ulId = skillsCategoriesMap[categoryKey];
            const ul = document.getElementById(ulId);
            if (ul && SKILLS[categoryKey]) {
                const categoryBlock = ul.closest('.skill-category');
                if(categoryBlock) categoryBlock.classList.add('animated-item', 'animate-scale-in');
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
        awardsListContainer.classList.add('animated-item', 'animate-slide-up');
        AWARDS_CERTIFICATES.forEach(award => {
            const li = document.createElement('li');
            li.innerHTML = award;
            awardsListContainer.appendChild(li);
        });
    }

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && typeof PROJECTS !== 'undefined') {
        PROJECTS.forEach((project, index) => {
            const card = document.createElement('article');
            card.classList.add('project-card', 'animated-item', 'animate-scale-in');
            card.dataset.animationDelay = `${index * 120}ms`;
            // Ensure buttons inside projects also have the .btn-text span
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
    // Contact Details
    const contactDetailsList = document.getElementById('contact-details-list');
    if (contactDetailsList && typeof CONTACT_DETAILS !== 'undefined') {
        const createListItem = (svg, text, href) => { const li = document.createElement('li'); li.innerHTML = `${svg} ${href ? `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>` : text}`; return li; };
        const emailSVG = `<svg viewBox="0 0 24 24"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg>`;
        const phoneSVG = `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>`;
        const locationSVG = `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`;
        
        if (CONTACT_DETAILS.email) contactDetailsList.appendChild(createListItem(emailSVG, CONTACT_DETAILS.email, `mailto:${CONTACT_DETAILS.email}`));
        if (CONTACT_DETAILS.phone) contactDetailsList.appendChild(createListItem(phoneSVG, CONTACT_DETAILS.phone, `tel:${CONTACT_DETAILS.phone}`));
        if (CONTACT_DETAILS.address) contactDetailsList.appendChild(createListItem(locationSVG, CONTACT_DETAILS.address));

         const contactGithubLink = document.getElementById('contact-github-link');
         if(contactGithubLink && CONTACT_DETAILS.github) contactGithubLink.href = CONTACT_DETAILS.github;
         const contactLinkedinLink = document.getElementById('contact-linkedin-link');
         if(contactLinkedinLink && CONTACT_DETAILS.linkedin) contactLinkedinLink.href = CONTACT_DETAILS.linkedin;
    }

    // Footer
    if (document.getElementById('footer-text') && typeof FOOTER_CONTENT !== 'undefined') {
        document.getElementById('footer-text').innerHTML = `© ${FOOTER_CONTENT.year || new Date().getFullYear()} ${FOOTER_CONTENT.name || "Your Name"}. Crafted with passion.`;
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
            const xVal = e.clientX - rect.left;
            const yVal = e.clientY - rect.top;
            const xOffset = (xVal - rect.width / 2) / (rect.width / 2);  // -1 to 1
            const yOffset = (yVal - rect.height / 2) / (rect.height / 2); // -1 to 1

            const rotateY = xOffset * 7; // Max 7deg rotation
            const rotateX = -yOffset * 7;
            
            innerCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.03)`;

            // Dynamic shadow (more subtle for minimalism)
            let currentBoxShadow = getComputedStyle(card).getPropertyValue('--current-box-shadow');
            if (document.body.classList.contains('dark-mode')) {
                currentBoxShadow = getComputedStyle(card).getPropertyValue('--current-box-shadow-dark');
            }
            // The tilt already enhances shadow perception; complex dynamic shadows might be overkill here.
            // Let's use the hover shadow from CSS directly by temporarily applying a class if needed, or just rely on the CSS :hover state
            // card.style.boxShadow = document.body.classList.contains('dark-mode') ? 
            //                          `0px ${15 + Math.abs(yOffset*5)}px ${30 + Math.abs(xOffset*10)}px rgba(0,0,0,0.38)` : 
            //                          `0px ${12 + Math.abs(yOffset*5)}px ${25 + Math.abs(xOffset*10)}px rgba(0,0,0,0.15)`;
        });
        card.addEventListener('mouseleave', () => {
            innerCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            // card.style.boxShadow = ''; // Reverts to CSS defined :hover or base shadow
        });
    });

    // --- Dummy Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('#name');
            const name = nameInput ? nameInput.value : "there";
            alert('Thank you, ' + name + '! Your message has been "sent" (demo).');
            contactForm.reset();
        });
    }
});