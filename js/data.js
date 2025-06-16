// js/data.js

const HERO_CONTENT = {
    name: "Loukas-Nikolaos Vetoulis",
    title: "Junior Software Developer",
    subtitle: "Passionate about building automated solutions and exploring data science. Based in Athens, Greece.",
    ctaText: "View My Projects",
    cvLink: "CV_Loukas_Nikolaos_Vetoulis.pdf",
    github: "https://github.com/loukas-vetoulis",
    linkedin: "https://www.linkedin.com/in/loukas-vetoulis/", // REPLACE with your LinkedIn
    email: "loukasvetoulis@gmail.com",
    premiumHeroTypewriter: "I'm Loukas-Nicolaos Vetoulis, a software engineer specializing in automation and data science. My core focus is on building smart, elegant solutions that directly enhance business operations. I believe effective engineering starts not with code, but with a deep understanding of your business and its unique challenges. My goal is always to solve the right problem, the right way, ensuring every project delivers real, lasting impact through technical precision and thoughtful design, embodying the principle that \"simplicity is the ultimate sophistication.\"",
};

const CASE_STUDIES_DATA = [
    {
        id: "project-a", // Corresponds to a project in your main PROJECTS array if you want to link them
        title: "Revolutionizing Real Estate Intelligence for Aquarium Real Estate",
        subtitle: " Transforming tedious data collection into a strategic asset with an advanced, self-adapting web scraper.",
        thumbnailUrl: "images/case-study-thumbnails/real_estate-screenshot.png", // Create this image
        link: "case-studies/case-study-real-estate-scraper.html", // Path to the detail page
        tags: ["Python", "Automation", "Enterprise Systems", "FinTech"], // Optional tags
        introduction: "Deep dive into the development of a sophisticated web scraping solution that automates data extraction for real estate agents, enhancing productivity and strategic decision-making."
    },
    {
        id: "project-b",
        title: "Ai Chatbot for Real Estate",
        subtitle: "Enhancing Real Estate Workflows with AI",
        thumbnailUrl: "images/case-study-thumbnails/ai-chatbot-use-case-thumbnail.webp",
        link: "case-studies/case-study-ai-chatbot.html",
        tags:  ["Python", "Flask", "GPT-4 API", "JavaScript", "HTML", "CSS"],
        introduction: "Building a secure, property-contextual AI chatbot for real estate agents, leveraging advanced GPT-4 capabilities to streamline workflows and enhance customer interactions."

    }
    // Add more case studies as needed
];

const PROJECTS = [
    {
        type: "Freelance",
        title: "Real Estate AI Chatbot",
        description: "Leveraged Flask and advanced GPT-4 capabilities to construct a secure, property-contextual AI chatbot for the real estate industry. This system, featuring robust data protection via encrypted identifiers and simplified iframe embedding, optimizes agent workflow by saving 3-5 hours in follow-up activities per property weekly.",
        stack: ["Python", "Flask", "GPT-4 API", "JavaScript", "HTML", "CSS"],
        imageUrl: "images/projects-logo/ai-chatbot-logo.webp", // REPLACE
        liveLink: "#", // Optional
        githubLink: "https://github.com/loukas-vetoulis/Ai-Chatbot", // Or specific repo
        caseStudyLink: "case-studies/case-study-ai-chatbot.html", // Link to case study if available


    },
    {
        type: "Freelance", // Added type to differentiate
        title: "Real Estate Scraper",
        description: "Engineered a bespoke web scraping solution for a real estate agency, automating the extraction of private property listings from multiple platforms into Google Sheets and CSVs. Implemented sophisticated anti-bot measures and automation, resulting in a 5-10 hour weekly productivity gain per agent.",
        stack: ["Python", "Selenium", "Google Sheets API", "CSV"],
        imageUrl: "images/projects-logo/spitogatos-scraper-logo.png", // REPLACE
        caseStudyLink: "case-studies/case-study-real-estate-scraper.html", // Link to case study if available
        liveLink: "#", // Optional
    },
    {
        type: "Academic",
        title: "Distributed Food Delivery Backend",
        description: "Engineered a robust distributed backend in Java for an online food delivery platform, designed for high-volume order processing and efficient management of store/product data. The system architecture featured a multithreaded Master server coordinating Worker nodes (TCP), MapReduce for filtering store data based on user criteria, consistent hashing for balanced data distribution. This backend supported an Android mobile front-end for user interaction.",
        stack: ["Java", "TCP/IP", "Multithreading", "MapReduce", "JSON", "Android Studio"],
        imageUrl: "images/projects-logo/freefood-logo.png", // REPLACE
        githubLink: "https://github.com/PPavlou/freefood", // REPLACE with actual or remove
    },
    {
        type: "Academic",
        title: "AI Sentiment Classification System",
        description: "Architected a sentiment classifier for IMDB movie reviews, realizing ~90% predictive accuracy. The system was built by implementing fundamental machine learning algorithms (Naive Bayes, Logistic Regression) from scratch, with performance critically evaluated against Scikit-learn GAU benchmarks and a PyTorch-based Bi-directional RNN (LSTM/GRU). The project emphasized the importance of data preprocessing, feature extraction, and model evaluation in machine learning workflows.",
        stack: ["Python", "NumPy", "Pandas", "Scikit-learn", "PyTorch"],
        imageUrl: "images/projects-logo/machine-learning-logo.jpg", // REPLACE
        githubLink: "https://github.com/loukas-vetoulis/LSTM-ML-Compare", // REPLACE with actual or remove
    },
    {
        type: "Academic",
        title: "C++ Game with SGG Library",
        description: "Engineered core gameplay systems in C++ for a [mention game genre if brief, e.g., 2D arcade game], leveraging the SGG library. This involved implementing robust collision detection, dynamic object management for entities like projectiles and enemies, and responsive player controls. Sound design and power-up mechanics were integrated to enrich the player experience. Object-Oriented Programming and effective dynamic memory management were central to the development.",
        stack: ["C++", "SGG Library", "OOP", "Game Development"],
        imageUrl: "images/projects-logo/asteroid-cpp-logo.webp", // REPLACE
        githubLink: "https://github.com/loukas-vetoulis/C-SGG-Asteroids-Arcade", // REPLACE with actual or remove
    },
    {
        type: "Professional",
        title: "Enterprise Systems Development & Automation", // Broader, more encompassing title
        company: "Mellon Group", // Use if permissible and as on your CV
        description: "Contributed to mission-critical enterprise systems, enhancing process automation and reliability. Developed a Python-based system for banking terminals that automated Process Error monitoring and management (log parsing, DB integration, visualization UI, alerts), significantly boosting error detection. Currently architecting and building a reusable Appium test automation library for Android EFTPOS terminals to improve QA and payment system testing coverage. (Specific project details are confidential.)",
        stack: [
            "Appium",
            "Data Processing & Analysis",
            "Automation",
            "System Monitoring",
        ], // Consolidate relevant skills
        imageUrl: "images/projects-logo/confidential-logo.svg"
    },
];
// Define only the featured projects for the index page
const FEATURED_PROJECTS = [
    {
        type: "Professional",
        title: "Enterprise Systems Development & Automation", // Broader, more encompassing title
        company: "Mellon Group", // Use if permissible and as on your CV
        description: "Contributed to mission-critical enterprise systems, enhancing process automation and reliability. Developed a Python-based system for banking terminals that automated Process Error monitoring and management (log parsing, DB integration, visualization UI, alerts), significantly boosting error detection. Currently architecting and building a reusable Appium test automation library for Android EFTPOS terminals to improve QA and payment system testing coverage. (Specific project details are confidential.)",
        stack: [
            "Appium",
            "Data Processing & Analysis",
            "Automation",
            "System Monitoring",
        ], // Consolidate relevant skills
        imageUrl: "images/projects-logo/confidential-logo.svg"
    },
    {
        type: "Freelance", // Added type to differentiate
        title: "Real Estate Scraper",
        description: "Engineered a bespoke web scraping solution for a real estate agency, automating the extraction of private property listings from multiple platforms into Google Sheets and CSVs. Implemented sophisticated anti-bot measures and automation, resulting in a 5-10 hour weekly productivity gain per agent.",
        stack: ["Python", "Selenium", "Google Sheets API", "CSV"],
        imageUrl: "images/projects-logo/spitogatos-scraper-logo.png", // REPLACE
        caseStudyLink: "case-studies/case-study-real-estate-scraper.html", // Link to case study if available
        liveLink: "#", // Optional
    },
];
const CONTACT_DETAILS = {
  email: HERO_CONTENT.email,
  phone: "+30 6940504661",
  github: HERO_CONTENT.github,
  linkedin: HERO_CONTENT.linkedin,
  address: "Athens, Greece",};

const FOOTER_CONTENT = {
    name: "Loukas-Nikolaos Vetoulis",
    year: new Date().getFullYear()
};