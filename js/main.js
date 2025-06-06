// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // --- Theme Toggler ---
    const sunIconSVG = `<svg class="icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1V6c0-.552.448-1 1-1zm0 12c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm7.778-8.707l1.414-1.414a.997.997 0 000-1.414.999.999 0 00-1.414 0l-1.414 1.414a.999.999 0 001.414 1.414zM4.222 19.778l1.414-1.414a.999.999 0 10-1.414-1.414l-1.414 1.414a.999.999 0 001.414 1.414zM20 12c0 .552-.448 1-1 1h-2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zM5 12c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1s.448-1 1-1h2c.552 0 1 .448 1 1zm12.778-5.707a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 10-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zm-11.314 11.314a.999.999 0 000-1.414l-1.414-1.414a.999.999 0 00-1.414 1.414l1.414 1.414a.997.997 0 001.414 0zM12 9a3 3 0 100 6 3 3 0 000-6z"></path></svg>`;
    const moonIconSVG = `<svg class="icon icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M19.578 16.838a.998.998 0 01.487-1.925 7.992 7.992 0 00-2.649-1.887C17.781 11.56 18.5 9.33 18.5 7c0-4.136-3.364-7.5-7.5-7.5S3.5 2.864 3.5 7c0 2.443.796 4.686 2.064 6.407a8.024 8.024 0 00-3.61 11.131.998.998 0 001.579.566 10.018 10.018 0 0116.045-8.266zM11 19.5a5.984 5.984 0 01-3.397-1.006A7.968 7.968 0 005.5 13.44V7c0-2.982 2.208-5.5 5.5-5.5S16.5 4.018 16.5 7v.012A6 6 0 0111 19.5z"></path></svg>`;


    const applyTheme = (theme) => {
        const body = document.body;
        const toggleWrapper = themeToggleBtn ? themeToggleBtn.querySelector('.icon-wrapper') : null;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            body.classList.add('dark-mode'); body.classList.remove('light-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = moonIconSVG + sunIconSVG; // Moon first for transition
        } else {
            document.documentElement.classList.remove('dark-mode');
            body.classList.add('light-mode'); body.classList.remove('dark-mode');
            if (toggleWrapper) toggleWrapper.innerHTML = sunIconSVG + moonIconSVG; // Sun first
        }
        // Force reflow for icon transition if needed, by accessing offsetHeight for example.
        // This is typically needed if you dynamically change content and want an immediate transition.
        if(toggleWrapper) void toggleWrapper.offsetHeight;
    };
    // ... (Rest of theme toggler logic from previous version is good)
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme); // Apply initial theme correctly

    if (themeToggleBtn) {
        const initialToggleText = document.documentElement.classList.contains('dark-mode') ? 'Light' : 'Dark';
        themeToggleBtn.childNodes[0].nodeValue = `${initialToggleText} Mode `; // Update text node directly

        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            applyTheme(theme); // Apply visual theme changes

            // Update button text *after* applying theme so classes are set
            const buttonText = document.documentElement.classList.contains('dark-mode') ? 'Light' : 'Dark';
            themeToggleBtn.childNodes[0].nodeValue = `${buttonText} Mode `;
        });
    }
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
             const buttonText = e.matches ? 'Light' : 'Dark';
             if(themeToggleBtn) themeToggleBtn.childNodes[0].nodeValue = `${buttonText} Mode `;
        }
    });


    // --- Mobile Navigation ---
    // ... (Keep from previous, it's solid)
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileNavToggle.innerHTML = navLinks.classList.contains('active') ? '×' : '☰'; // Simple, effective
            mobileNavToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // --- Active Nav Link ---
    // ... (Keep from previous)
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop() || "index.html";
        if (linkPath === currentPath) { link.classList.add('active'); }
        if (navLinks) {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileNavToggle) mobileNavToggle.innerHTML = '☰';
                }
            });
        }
    });


    // --- Hero Text Character Animation ---
    const heroTitleEl = document.querySelector('.hero h1#hero-name');
    if (heroTitleEl) {
        const text = heroTitleEl.textContent.trim();
        heroTitleEl.innerHTML = ''; // Clear existing
        let cumulativeDelay = 0;
        text.split('').forEach((char, index) => {
            const charSpan = document.createElement('span');
            charSpan.classList.add('char');
            charSpan.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space for spaces
            
            // Staggering delay for each character
            charSpan.style.animationDelay = `${cumulativeDelay}ms`;
            heroTitleEl.appendChild(charSpan);

            // Increase delay more for spaces to create word separation in animation
            cumulativeDelay += (char === ' ' ? 100 : 40); // Shorter delay for chars, longer for spaces
        });
    }

    // --- Dynamic Content Population ---
    // ... (All content loading sections from previous JS should be here)
    // MAKE SURE TO ADD 'animated-item' AND AN APPROPRIATE ANIMATION CLASS (e.g., 'animate-slide-up') TO ELEMENTS CREATED DYNAMICALLY.
    // Hero content (subtitle, CTAs)
    if (document.getElementById('hero-name')) {
        const heroSubtitleEl = document.getElementById('hero-subtitle');
        if (heroSubtitleEl) {
            heroSubtitleEl.textContent = HERO_CONTENT.subtitle;
            heroSubtitleEl.classList.add('animated-item', 'animate-slide-up');
            heroSubtitleEl.dataset.animationDelay = '600ms'; // Delay after title fully appears
        }
        // CTA buttons
        ['hero-cta-projects', 'hero-cta-cv'].forEach((id, index) => {
            const ctaEl = document.getElementById(id);
            if (ctaEl) {
                if (id === 'hero-cta-projects') {
                    ctaEl.querySelector('.btn-text').textContent = HERO_CONTENT.ctaText || 'View My Work';
                    ctaEl.href = "projects.html";
                } else {
                     ctaEl.querySelector('.btn-text').textContent = 'Download CV'; // Ensure text for CV
                    ctaEl.href = HERO_CONTENT.cvLink;
                }
                ctaEl.classList.add('animated-item', 'animate-slide-up');
                ctaEl.dataset.animationDelay = `${800 + index * 150}ms`;
            }
        });
        // Social Links
        const socialLinksContainer = document.querySelector('.social-links-hero');
        if(socialLinksContainer) {
            socialLinksContainer.classList.add('animated-item', 'animate-slide-up');
            socialLinksContainer.dataset.animationDelay = '1100ms';
            // Populate hrefs (ensure these IDs exist in your HTML)
             const heroGithub = document.getElementById('hero-github-link');
             if (heroGithub) heroGithub.href = HERO_CONTENT.github;
             const heroLinkedin = document.getElementById('hero-linkedin-link');
             if (heroLinkedin) heroLinkedin.href = HERO_CONTENT.linkedin;
             const heroEmail = document.getElementById('hero-email-link');
             if (heroEmail) heroEmail.href = `mailto:${HERO_CONTENT.email}`;
        }
    }
    // About page: bio and profile image
    const aboutBioContainer = document.getElementById('about-bio-container');
    if (aboutBioContainer && typeof ABOUT_CONTENT !== 'undefined') {
        aboutBioContainer.classList.add('animated-item', 'animate-slide-in-right');
        aboutBioContainer.dataset.animationDelay = '200ms';
        ABOUT_CONTENT.bio.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutBioContainer.appendChild(p);
        });
        // The additional paragraph outside the loop
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
            profileImg.alt = HERO_CONTENT.name;
        } else {
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
    const skillsCategoriesMap = { languages: 'skills-languages-list', frameworksLibraries: 'skills-frameworks-list', toolsDatabases: 'skills-tools-list', methodologiesConcepts: 'skills-methodologies-list' };
    if (typeof SKILLS !== 'undefined') {
        Object.keys(skillsCategoriesMap).forEach(categoryKey => {
            const ulId = skillsCategoriesMap[categoryKey];
            const ul = document.getElementById(ulId);
            if (ul && SKILLS[categoryKey]) {
                ul.closest('.skill-category').classList.add('animated-item', 'animate-scale-in'); // Animate category block
                SKILLS[categoryKey].forEach((skillName, index) => {
                    const li = document.createElement('li');
                    li.textContent = skillName;
                    // li.classList.add('animated-item', 'animate-fade-in'); // Optional: individual item animation
                    // li.dataset.animationDelay = `${index * 50}ms`;
                    ul.appendChild(li);
                });
            }
        });
    }
    // Awards
    const awardsListContainer = document.getElementById('awards-list');
    if (awardsListContainer && typeof AWARDS_CERTIFICATES !== 'undefined') {
        awardsListContainer.classList.add('animated-item', 'animate-slide-up'); // Animate the whole list
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
            card.innerHTML = `
                <div class="project-card-inner">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title} screenshot">` : ''}
                    <div class="project-card-content">
                        ${project.type ? `<p class="project-type">${project.type}</p>` : ''}
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-stack">${project.stack.map(tech => `<span>${tech}</span>`).join('')}</div>
                        <div class="project-links">
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span class="btn-text">GitHub</span></a>` : ''}
                            ${project.liveLink && project.liveLink !== "#" ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span class="btn-text">View Live</span></a>` : ''}
                        </div>
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
        
        contactDetailsList.appendChild(createListItem(emailSVG, CONTACT_DETAILS.email, `mailto:${CONTACT_DETAILS.email}`));
        contactDetailsList.appendChild(createListItem(phoneSVG, CONTACT_DETAILS.phone, `tel:${CONTACT_DETAILS.phone}`));
        contactDetailsList.appendChild(createListItem(locationSVG, CONTACT_DETAILS.address));

        // Contact social links
         const contactGithubLink = document.getElementById('contact-github-link');
         if(contactGithubLink && CONTACT_DETAILS.github) contactGithubLink.href = CONTACT_DETAILS.github;
         const contactLinkedinLink = document.getElementById('contact-linkedin-link');
         if(contactLinkedinLink && CONTACT_DETAILS.linkedin) contactLinkedinLink.href = CONTACT_DETAILS.linkedin;
    }

    // Footer
    if (document.getElementById('footer-text') && typeof FOOTER_CONTENT !== 'undefined') {
        document.getElementById('footer-text').innerHTML = `© ${FOOTER_CONTENT.year} ${FOOTER_CONTENT.name}. Crafted with passion.`;
    }


    // --- Intersection Observer for Scroll Animations ---
    const animatedItems = document.querySelectorAll('.animated-item');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 }; // Trigger a bit earlier

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay || '0ms';
                entry.target.style.transitionDelay = delay; // Apply stagger
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target); // Animate only once
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
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateY = (x / (rect.width / 2)) * 7; // Max 7deg rotation
            const rotateX = -(y / (rect.height / 2)) * 7;
            innerCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.03)`;
             card.style.boxShadow = `0px ${Math.abs(y/10) + 12}px ${Math.abs(x/5) + 25}px rgba(0,0,0,0.15)`; // Dynamic shadow
             if(document.body.classList.contains('dark-mode')){
                card.style.boxShadow = `0px ${Math.abs(y/10) + 15}px ${Math.abs(x/5) + 30}px rgba(0,0,0,0.38)`;
             }
        });
        card.addEventListener('mouseleave', () => {
            innerCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            card.style.boxShadow = ''; // Reset to CSS defined shadow
        });
    });

    // --- Dummy Contact Form ---
    // ... (Keep from previous)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value;
            alert('Thank you, ' + name + '! Your message has been "sent" (demo).');
            contactForm.reset();
        });
    }
});