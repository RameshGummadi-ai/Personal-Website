// Default portfolio data for Dr. Ramesh Gummadi
const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Gummadi Ramesh",
    subtitle: "AI Researcher | Assistant Professor | Technical Trainer",
    avatar: "assets/ram.jpg",
    resumeLink: "assets/Ramesh_Gummadi_Resume.pdf",
    shortIntro: "Passionate AI researcher, assistant professor, and technical trainer with dual postgraduate degrees (MCA & M.Tech). Specializing in Gen AI, Machine Learning, Data Science, NLP, and RAG systems.",
    email: "rameshgummadi53@gmail.com",
    phone: "+91 95154 54211",
    location: "Andhra Pradesh, India",
    socials: {
      linkedin: "https://linkedin.com/in/gummadi-ramesh-85257a260",
      github: "https://github.com/ramesh-gummadi",
      scholar: "https://scholar.google.com/citations?user=ramesh-gummadi",
      youtube: "https://youtube.com/@AIVR_Channel",
      email: "mailto:rameshgummadi53@gmail.com"
    },
    titles: [
      "AI Researcher",
      "Assistant Professor",
      "Technical Trainer",
      "Java Expert",
      "AI/ML Developer"
    ],
    parentFolder: "Personal Asst",
    careerGoal: "Highly motivated and detail-oriented IT professional with a strong educational background in MCA and M.Tech (AI). Seeking a challenging role where I can utilize my AI/ML knowledge and software training capabilities to drive innovation and growth.",
    aboutBio: "I am an experienced Computer Science educator, software developer, and technical trainer. I hold an MCA from Dr. BR Ambedkar University and an M.Tech in Artificial Intelligence from JNTU Kakinada (GPA 8.5/10). My primary focus areas are Generative AI, Machine Learning, Natural Language Processing, and RAG architecture. I have delivered bootcamps at multiple universities across India and taught core AI/ML coursework."
  },
  achievements: [
    { id: "ach-1", value: "4+", label: "Years Teaching & Training", icon: "fas fa-chalkboard-teacher" },
    { id: "ach-2", value: "3+", label: "Completed Tech Projects", icon: "fas fa-laptop-code" },
    { id: "ach-3", value: "6+", label: "AI & Java Certifications", icon: "fas fa-award" },
    { id: "ach-4", value: "2", label: "Postgrad Degrees (MCA & M.Tech)", icon: "fas fa-graduation-cap" }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Technology (M.Tech) - Artificial Intelligence",
      institution: "JNTU KAKINADA University",
      period: "2023 - 2025",
      description: "Focused on Neural Network Architectures, Generative AI Models, Reinforcement Learning, and Optimization Techniques. Cumulative GPA: 8.5/10.",
      icon: "fas fa-graduation-cap"
    },
    {
      id: "edu-2",
      degree: "Master of Computer Applications (MCA)",
      institution: "Dr. BR Ambedkar University",
      period: "2020 - 2022",
      description: "Focused on computer applications, algorithms, data structures, and database systems. Graduated with a GPA of 7.88/10.",
      icon: "fas fa-university"
    },
    {
      id: "edu-3",
      degree: "Bachelor of Commerce (B.Com)",
      institution: "Aditya Degree College, Haripuram",
      period: "2017 - 2020",
      description: "Background in commerce and business computing. Graduated with an aggregate score of 73%.",
      icon: "fas fa-book"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Java SME | Tech Expert | AI Expert",
      organization: "College Dekho - ImaginXP",
      period: "June 2025 - Present",
      description: "Dedicated Tech Expert and Faculty. Delivering one-on-one mentorship, strategic connection guidance, and teaching courses in AI, ML, Software Engineering, Probability & Statistics, and Data Mining at Impact Engineering College (Bangalore) and Dev Bhoomi Uttarakhand University (Dehradun).",
      icon: "fas fa-chalkboard-teacher"
    },
    {
      id: "exp-2",
      role: "Technical Trainer | Java & AI Expert",
      organization: "Six Phrase-VERANDA (Freelancer)",
      period: "Jan 2025 - May 2025",
      description: "Delivered Java programming, object-oriented logic, and AI bootcamp training to engineering students at Dayananda Sagar University (Bangalore), Jain Deemed University (Bangalore), and Geetanjali Engineering College (Hyderabad).",
      icon: "fas fa-laptop-code"
    },
    {
      id: "exp-3",
      role: "Assistant Professor & IT Developer",
      organization: "GIET Institutions (Godavari Global University)",
      period: "Jan 2022 - Jan 2025",
      description: "Taught Java Programming, DBMS, Web Technologies, and Software Engineering. Coordinated IT infrastructure, maintained the college website, and developed django-based in-house tools.",
      icon: "fas fa-briefcase"
    }
  ],
  skills: {
    frontend: ["HTML", "CSS", "Flask", "Streamlit", "React", "jQuery"],
    programming: ["Python", "Java", "C", "SQL"],
    ai_data: ["Gen AI", "Machine Learning", "Data Science", "Natural Language Processing", "Deep Learning", "RAG", "Agentic AI", "CNN", "ANN", "Clustering"],
    cloud_tools: ["Google Cloud", "Tensorflow", "Numpy", "Pandas", "Scikit-Learn", "OpenCV", "GitLab", "Jira"]
  },
  research: {
    mainTitle: "Faculty-Guided Generative AI Framework for Immersive Classroom Education: A Conceptual Framework",
    description: "Developing a conceptual framework leveraging Generative AI, RAG architectures, and custom LLM interfaces to dynamically create personalized lesson materials, real-time code-debugging templates, and customized evaluation plans.",
    areas: [
      "Artificial Intelligence",
      "Generative AI",
      "Natural Language Processing",
      "RAG Systems",
      "Agentic AI"
    ]
  },
  publications: [
    {
      id: "pub-1",
      title: "Faculty-Guided Generative AI Framework for Immersive Classroom Education: A Conceptual Framework",
      authors: "Gummadi Ramesh",
      venue: "International Conference on Advance in Multidisciplinary Engineering (ICRAME-2026)",
      year: "2026",
      doi: "",
      type: "Conference",
      abstract: "Details a conceptual model using vector embeddings and Retrieval-Augmented Generation (RAG) to dynamically extract textbook chapters and slide content, creating active classroom quizzes and immersive teaching assistant agents."
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "RAG-Based Intelligent Document Assistant",
      description: "Built a Retrieval-Augmented Generation (RAG) system for querying PDF and document repositories using semantic search, vector embeddings, LangChain, ChromaDB, OpenAI API, and FastAPI.",
      tech: ["LangChain", "ChromaDB", "OpenAI API", "FastAPI", "Python"],
      github: "https://github.com/ramesh-gummadi/rag-document-assistant",
      demo: "https://rag-assistant-demo.edu"
    },
    {
      id: "proj-2",
      title: "AI-Powered Instagram Content Automation System",
      description: "Designed and implemented an automated publishing workflow in n8n. Integrates OpenAI API for generating captions, hashtags, and scheduling posts via Instagram Graph API.",
      tech: ["n8n", "OpenAI API", "Instagram API", "Google Sheets"],
      github: "https://github.com/ramesh-gummadi/insta-content-automation",
      demo: "https://n8n-workflow-dashboard.edu"
    },
    {
      id: "proj-3",
      title: "Fake News Detection Using Machine Learning",
      description: "Developed a binary classification model utilizing TF-IDF vectorization and NLP techniques to identify genuine and fake news articles, with a Flask-based real-time prediction interface.",
      tech: ["Python", "Scikit-Learn", "NLP", "Pandas", "Flask"],
      github: "https://github.com/ramesh-gummadi/fake-news-detector",
      demo: "https://fake-news-detector.edu"
    }
  ],
  certifications: [
    { id: "cert-1", name: "Certificate Of Research Paper", issuer: "ICRAME-2026 (International Conference)", year: "2026", icon: "fas fa-file-contract" },
    { id: "cert-2", name: "Programming in JAVA", issuer: "NPTEL - IIT Kharagpur", year: "2023", icon: "fab fa-java" },
    { id: "cert-3", name: "AI, ML, DL Specialization", issuer: "Udemy", year: "2024", icon: "fas fa-brain" },
    { id: "cert-4", name: "Gen-AI Beginners Guide", issuer: "Udemy", year: "2023", icon: "fas fa-code-branch" },
    { id: "cert-5", name: "Gen-AI Development Faculty Development Program", issuer: "Godavari Global University", year: "2024", icon: "fas fa-users" },
    { id: "cert-6", name: "Web Developer Course (HTML/CSS/JS)", issuer: "Udemy", year: "2023", icon: "fas fa-award" }
  ],
  youtube: {
    channelName: "AIVR",
    channelUrl: "https://youtube.com/@AIVR_Channel",
    stats: {
      subscribers: "12K+",
      videos: "150+",
      watchHours: "45K+"
    },
    latestVideos: [
      {
        id: "yt-1",
        title: "How to Build a Custom RAG Agent in 10 Minutes with n8n and LangChain",
        duration: "12:45",
        views: "5.2K views",
        date: "2 weeks ago",
        url: "https://youtube.com/watch?v=mock1",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60"
      },
      {
        id: "yt-2",
        title: "Generative AI vs Prompt Engineering: Master AI in 2026",
        duration: "18:20",
        views: "8.9K views",
        date: "1 month ago",
        url: "https://youtube.com/watch?v=mock2",
        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60"
      },
      {
        id: "yt-3",
        title: "A Complete Guide to VR Classroom Integrations using WebXR",
        duration: "25:10",
        views: "3.4K views",
        date: "2 months ago",
        url: "https://youtube.com/watch?v=mock3",
        thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=60"
      }
    ]
  },
  blogs: [
    {
      id: "blog-1",
      title: "Optimizing University IT infrastructure using Django",
      date: "June 15, 2026",
      readTime: "5 min read",
      summary: "Explore database indexing, view optimizations, and how we integrated standard student registrar data to speed up attendance logging by 25%.",
      content: "Developing for high-enrollment academic institutions requires robust back-end planning. By deploying Django ORM query optimizations and custom caching layers, we built a secure, real-time logging tool for class lists..."
    },
    {
      id: "blog-2",
      title: "Teaching Java & Generative AI: Academic Bootcamps in 2026",
      date: "May 28, 2026",
      readTime: "8 min read",
      summary: "A review of curriculum structures that combine classical object-oriented programming (OOP) principles with new AI agent pipelines in bootcamp classrooms.",
      content: "Teaching modern programming is no longer about syntax; it's about architecture and logical debugging. In our latest student workshops, we combine NPTEL-style Java training with custom GPT assistants to speed up logic formulation..."
    }
  ]
};

// Global state holding active portfolio data
let PORTFOLIO_DATA = { ...DEFAULT_PORTFOLIO_DATA };

// Key to store custom modifications
const STORAGE_KEY = "ramesh_portfolio_custom_data";

// Load from local storage if available
function loadPortfolioData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      // Merge keys to avoid breaking structures
      PORTFOLIO_DATA = {
        profile: { ...DEFAULT_PORTFOLIO_DATA.profile, ...parsed.profile },
        achievements: parsed.achievements || [...DEFAULT_PORTFOLIO_DATA.achievements],
        education: parsed.education || [...DEFAULT_PORTFOLIO_DATA.education],
        experience: parsed.experience || [...DEFAULT_PORTFOLIO_DATA.experience],
        skills: { ...DEFAULT_PORTFOLIO_DATA.skills, ...parsed.skills },
        research: { ...DEFAULT_PORTFOLIO_DATA.research, ...parsed.research },
        publications: parsed.publications || [...DEFAULT_PORTFOLIO_DATA.publications],
        projects: parsed.projects || [...DEFAULT_PORTFOLIO_DATA.projects],
        certifications: parsed.certifications || [...DEFAULT_PORTFOLIO_DATA.certifications],
        youtube: { ...DEFAULT_PORTFOLIO_DATA.youtube, ...parsed.youtube },
        blogs: parsed.blogs || [...DEFAULT_PORTFOLIO_DATA.blogs]
      };
    } catch (e) {
      console.error("Failed to parse saved portfolio data, resetting to defaults", e);
      PORTFOLIO_DATA = { ...DEFAULT_PORTFOLIO_DATA };
    }
  } else {
    PORTFOLIO_DATA = { ...DEFAULT_PORTFOLIO_DATA };
  }
  return PORTFOLIO_DATA;
}

// Save current state to local storage
function savePortfolioData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(PORTFOLIO_DATA));
}

// Reset local modifications
function resetPortfolioData() {
  localStorage.removeItem(STORAGE_KEY);
  PORTFOLIO_DATA = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
}

// Initialize data
loadPortfolioData();
