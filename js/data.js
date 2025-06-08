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
};

const ABOUT_CONTENT = {
    bio: [
        "A highly motivated and results-driven individual, dedicated to continuous learning and professional growth.",
        "Adept at adapting to new challenges, with a strong focus on software engineering, particularly in the development of automated solutions and data science.",
        "Committed to leveraging knowledge and skills to contribute to future innovations."
    ],
    profileImage: "images/profile.webp", // Optional: Add your photo
};

const EXPERIENCES = [
    {
        role: "Junior Software Developer",
        company: "Mellon Group (Piraeus Headquarters)",
        period: "Oct 2024 - Present",
        location: "Piraeus, Greece",
        description: [
            "Developed an automated system to monitor and manage Process Errors in banking terminals, improving error detection efficiency.",
            "Implemented a Python-based solution with key features: daily script execution for terminal log files, automated database storage and processing of error data, robust UI for error visualization, and automated email notifications for recurring error patterns.",
            "Currently working on Android EFTPOS testing automations.",
        ],
    },
    {
        role: "Barista, Bartender",
        company: "Food Services, FAMILY VOULA",
        period: "Mar 2024 - Oct 2024",
        location: "Voula, Greece",
        description: ["Provided customer service, prepared beverages, and managed bar operations."],
    },
    {
        role: "Food Service Professional",
        company: "Food Services, ICE ROLL GLYFADA",
        period: "Apr 2023 - Mar 2024",
        location: "Glyfada, Greece",
        description: ["Involved in ice cream production, coffee preparation, production of cold and hot beverages, shop preparation, cashier duties, customer service, and food preparation."],
    },
];

const EDUCATION = [
    {
        degree: "Bachelor of Science in Informatics",
        institution: "Athens University of Economics and Business (AUEB)",
        period: "Oct 2022 - Present",
        description: "Focusing on software engineering, data science, and algorithms."
    },
    {
        degree: "High School Diploma (Apolytirion)",
        institution: "2nd General High School of Glyfada",
        period: "Graduated 2022",
        description: "Field of Economic and Informatics Sciences."
    }
];

const SKILLS = {
    languages: ["Python", "Java", "C++", "JavaScript", "SQL", "HTML", "CSS"],
    frameworksLibraries: ["Flask", "PyTorch", "Scikit-learn", "Selenium", "Node.js (basic)", "SGG Library (C++)"],
    toolsDatabases: ["Git & GitHub", "Docker (basic)", "Android Studio", "VS Code", "PostgreSQL (basic)", "MySQL (basic)"],
    methodologiesConcepts: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Machine Learning", "NLP", "Web Scraping", "Automation", "Distributed Systems Concepts", "REST APIs"],
};

const AWARDS_CERTIFICATES = [
    "1st in the Panhellenic Exams in the field of Economic and Informatics Sciences at the 2nd General High School of Glyfada (Year: 2022)",
    "2nd in the Panhellenic Exams in the field of Economic and Informatics Sciences at Romvos Tutorial Center (Year: 2022)",
    "Ranked 51st in the Informatics Department at AUEB (Academic Year 2022-2023)",
    "MIT GSW 2023 Athens Participant",
    "Commendation from the 9th Mathematics Competition of the Hellenic Mathematical Society",
    "Commendation from the 10th Mathematics Competition of the Hellenic Mathematical Society",
    "Certificate of Lower in English - Michigan Language Assessment (B2)"
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
    },
    {
        type: "Freelance", // Added type to differentiate
        title: "Real Estate Scraper",
        description: "Engineered a bespoke web scraping solution for a real estate agency, automating the extraction of private property listings from multiple platforms into Google Sheets and CSVs. Implemented sophisticated anti-bot measures and automation, resulting in a 5-10 hour weekly productivity gain per agent.",
        stack: ["Python", "Selenium", "Google Sheets API", "CSV"],
        imageUrl: "images/projects-logo/spitogatos-scraper-logo.png", // REPLACE
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
        type: "Professional - Confidential",
        title: "Enterprise Systems Development & Automation", // Broader, more encompassing title
        company: "Mellon Group", // Use if permissible and as on your CV
        description: "Contributed to mission-critical enterprise systems, focusing on process automation and system reliability. Key responsibilities included developing a Python-based automated system to monitor and manage Process Errors in banking terminals—significantly improving error detection efficiency through automated log parsing, database integration, a visualization UI, and alert notifications. Currently also involved in architecting and building a reusable test automation library using Appium for Android EFTPOS terminals to streamline QA processes and enhance testing coverage for payment systems. Due to confidentiality agreements, further specific details about these projects and their proprietary technologies cannot be publicly shared.",
        stack: [
            "Appium",
            "Data Processing & Analysis",
            "Automation",
            "System Monitoring",
        ], // Consolidate relevant skills
        imageUrl: "images/projects-logo/confidential-logo.svg"
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