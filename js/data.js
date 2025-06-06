// js/data.js

const HERO_CONTENT = {
    name: "Loukas-Nikolaos Vetoulis",
    title: "Junior Software Developer",
    subtitle: "Passionate about building automated solutions and exploring data science. Based in Athens, Greece.",
    ctaText: "View My Projects",
    cvLink: "CV_Loukas_Nikolaos_Vetoulis.pdf",
    github: "https://github.com/loukas-vetoulis",
    linkedin: "https://www.linkedin.com/in/your-linkedin-id/", // REPLACE with your LinkedIn
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
        type: "Freelance", // Added type to differentiate
        title: "Spitogatos Scraper",
        description: "Developed a custom web scraper for Aquarium Real Estate that extracts private property listings from spitogatos and exports data to Google Sheets/CSVs. Integrated advanced anti-bot evasion and automation features, saving agents 5–10 hours per week and €300–€600 per agent monthly.",
        stack: ["Python", "Selenium", "Google Sheets API", "CSV"],
        imageUrl: "images/placeholder-project1.webp", // REPLACE
        liveLink: "#", // Optional
        githubLink: "https://github.com/loukas-vetoulis", // Or specific repo
    },
    {
        type: "Freelance",
        title: "Perspective AI Chatbot",
        description: "Built a secure, property-specific AI chatbot using Flask and GPT-4 for real estate clients during virtual tours. Features encrypted property identifiers and easy iframe deployment. Reduces agent follow-up time by 3–5 hours per property, saving €150–€400 per property.",
        stack: ["Python", "Flask", "GPT-4 API", "JavaScript"],
        imageUrl: "images/placeholder-project2.webp", // REPLACE
        liveLink: "#", // Optional
        githubLink: "https://github.com/loukas-vetoulis", // Or specific repo
    },
    {
        type: "Academic",
        title: "Distributed Food Delivery Backend",
        description: "Developed a distributed backend for an online food delivery platform in Java. Implemented a multithreaded Master server, Worker nodes (TCP), MapReduce architecture, console manager, consistent hashing, and in-memory storage. Android front-end.",
        stack: ["Java", "TCP/IP", "Multithreading", "MapReduce", "JSON", "Android Studio"],
        imageUrl: "images/placeholder-project3.webp", // REPLACE
        githubLink: "https://github.com/loukas-vetoulis/Distributed-Systems-Project", // REPLACE with actual or remove
    },
    {
        type: "Academic",
        title: "AI Sentiment Classification System",
        description: "Developed a sentiment classification system on the IMDB dataset. Implemented Naive Bayes (Bernoulli & Multinomial) and Logistic Regression from scratch. Achieved ~89% accuracy. Compared with Scikit-learn and a stacked bidirectional RNN (LSTM/GRU) in PyTorch.",
        stack: ["Python", "NumPy", "Pandas", "Scikit-learn", "PyTorch"],
        imageUrl: "images/placeholder-project1.webp", // REPLACE
        githubLink: "https://github.com/loukas-vetoulis/AI-Sentiment-Analysis", // REPLACE with actual or remove
    },
    {
        type: "Academic",
        title: "C++ Game with SGG Library",
        description: "Designed and implemented core gameplay mechanics (collision detection, dynamic object management, player controls) using C++ and the SGG library. Applied OOP principles and dynamic memory management. Enhanced user experience with power-ups and sound effects.",
        stack: ["C++", "SGG Library", "OOP", "Game Development"],
        imageUrl: "images/placeholder-project2.webp", // REPLACE
        githubLink: "https://github.com/loukas-vetoulis/CPP-SGG-Game", // REPLACE with actual or remove
    },
];

const CONTACT_DETAILS = {
  email: HERO_CONTENT.email,
  phone: "+30 6940504661",
  github: HERO_CONTENT.github,
  linkedin: HERO_CONTENT.linkedin,
  address: "Laodikis 10, 16674 Glyfada, Athens, Greece"
};

const FOOTER_CONTENT = {
    name: "Loukas-Nikolaos Vetoulis",
    year: new Date().getFullYear()
};