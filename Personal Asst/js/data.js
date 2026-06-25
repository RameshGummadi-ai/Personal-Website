// Default portfolio data for Dr. Ramesh Gummadi
const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Dr. Ramesh Gummadi",
    subtitle: "Future PhD Scholar | AI Researcher | Assistant Professor",
    avatar: "assets/ram.jpg",
    resumeLink: "assets/Ramesh_Gummadi_Resume.pdf",
    shortIntro: "Passionate educator and AI researcher with expertise in Computer Science, Artificial Intelligence, Data Science, Software Engineering, and Emerging Technologies.",
    email: "ramesh.gummadi.academic@gmail.com",
    phone: "+91 99999 88888",
    location: "Hyderabad, India",
    socials: {
      linkedin: "https://linkedin.com/in/ramesh-gummadi",
      github: "https://github.com/ramesh-gummadi",
      scholar: "https://scholar.google.com/citations?user=ramesh-gummadi",
      youtube: "https://youtube.com/@AIVR_Channel",
      email: "mailto:ramesh.gummadi.academic@gmail.com"
    },
    titles: [
      "Assistant Professor",
      "AI Researcher",
      "Technical Trainer",
      "Future PhD Scholar",
      "Content Creator"
    ],
    careerGoal: "PhD in AI and Immersive Learning Technologies, bridging the gap between cutting-edge Generative AI frameworks and VR-enabled classroom environments.",
    aboutBio: "I am a dedicated computer science educator, trainer, and researcher with MCA and M.Tech (CSE - AI) degrees. Over the past 4+ years, I have taught core subjects, run coding bootcamps, designed specialized AI curricula, and mentored 10,000+ students. My primary research interests lie at the intersection of Generative AI, Autonomous AI Agents, VR Learning Systems, and Educational Technology."
  },
  achievements: [
    { id: "ach-1", value: "4+", label: "Years Teaching Experience", icon: "fas fa-chalkboard-teacher" },
    { id: "ach-2", value: "10K+", label: "Students Mentored", icon: "fas fa-users" },
    { id: "ach-3", value: "5+", label: "AI Research Publications", icon: "fas fa-file-invoice" },
    { id: "ach-4", value: "100K+", label: "YouTube Educational Views", icon: "fab fa-youtube" }
  ],
  education: [
    {
      id: "edu-1",
      degree: "M.Tech (CSE - Artificial Intelligence)",
      institution: "Jawaharlal Nehru Technological University",
      period: "2021 - 2023",
      description: "Specialized in Deep Learning, Natural Language Processing, and AI-driven Educational Frameworks. Graduated with top honors.",
      icon: "fas fa-graduation-cap"
    },
    {
      id: "edu-2",
      degree: "Master of Computer Applications (MCA)",
      institution: "Osmania University",
      period: "2018 - 2021",
      description: "Focused on Software Engineering, Database Management Systems, and Object-Oriented Programming.",
      icon: "fas fa-university"
    },
    {
      id: "edu-3",
      degree: "Bachelor of Commerce (B.Com)",
      institution: "Kakatiya University",
      period: "2015 - 2018",
      description: "Background in business analytics, computer applications, and corporate accounts.",
      icon: "fas fa-book"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Assistant Professor",
      organization: "Leading Engineering Institution",
      period: "2023 - Present",
      description: "Delivering courses in Artificial Intelligence, Machine Learning, and Software Engineering. Pioneering dynamic and active VR-based classroom models.",
      icon: "fas fa-briefcase"
    },
    {
      id: "exp-2",
      role: "Technical Trainer",
      organization: "AIVR Tech Academy",
      period: "2022 - Present",
      description: "Conducting hands-on coding bootcamps, workshops, and courses covering Python, Machine Learning, Generative AI APIs, and Cloud Architectures.",
      icon: "fas fa-laptop-code"
    },
    {
      id: "exp-3",
      role: "Curriculum Developer",
      organization: "Academic Advisory Board",
      period: "2022 - 2024",
      description: "Designed curriculum syllabi for undergraduate CSE-AI streams, incorporating LangChain, n8n workflows, RAG systems, and AI Agents.",
      icon: "fas fa-file-signature"
    },
    {
      id: "exp-4",
      role: "Student Mentor",
      organization: "Global Tech Mentorship Programs",
      period: "2020 - Present",
      description: "Guided over 10,000+ students and fresh graduates on resume building, technical interview preparation, AI project design, and career mapping.",
      icon: "fas fa-user-friends"
    },
    {
      id: "exp-5",
      role: "Content Strategist",
      organization: "AIVR Educational YouTube Channel",
      period: "2021 - Present",
      description: "Producing technical tutorials, career guides, and courses on Generative AI, RAG, and AI agent automations.",
      icon: "fas fa-video"
    }
  ],
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "React"],
    programming: ["Java", "Python", "SQL"],
    ai_data: ["Machine Learning", "Deep Learning", "Generative AI", "LangChain", "RAG", "Prompt Engineering", "AI Agents"],
    cloud_tools: ["Google Cloud", "GitHub", "Docker", "n8n", "OpenRouter", "Gemini API"]
  },
  research: {
    mainTitle: "Faculty-Led Generative AI Framework for Immersive Classroom Education",
    description: "Developing a novel educational architecture that empowers professors to dynamically inject real-time AI agents and modular virtual reality content into high-enrollment classrooms to maximize student retention.",
    areas: [
      "Artificial Intelligence",
      "Virtual Reality",
      "Generative AI",
      "Educational Technology",
      "AI-Powered Learning Systems"
    ]
  },
  publications: [
    {
      id: "pub-1",
      title: "Faculty-Led Generative AI Framework for Immersive Classroom Education",
      authors: "Ramesh Gummadi, et al.",
      venue: "Springer Lecture Notes in Educational Technology",
      year: "2025",
      doi: "10.1007/978-3-031-xxxx-x",
      type: "Journal",
      abstract: "This paper outlines a hybrid framework combining Large Language Models and VR visualization tools. It allows educators to generate custom lesson plans, dynamic quizzes, and interactive VR simulations from standard slide materials on the fly, bridging classroom pedagogy with immersive experiences."
    },
    {
      id: "pub-2",
      title: "RAG-Based Intelligent Agents for Personalized Student Mentorship in Higher Education",
      authors: "Ramesh Gummadi",
      venue: "IEEE International Conference on Advanced Learning Technologies (ICALT)",
      year: "2024",
      doi: "10.1109/ICALT.2024.000xx",
      type: "Conference",
      abstract: "Proposes an architecture deploying retrieval-augmented generation (RAG) models trained on university curriculum, policies, and lecture resources. Results demonstrate a 40% speedup in student query resolutions with 95% accuracy compared to standard forum channels."
    },
    {
      id: "pub-3",
      title: "Analyzing the Impact of Large Language Models as Teaching Assistants in CSE Classrooms",
      authors: "Ramesh Gummadi",
      venue: "International Journal of Artificial Intelligence in Education",
      year: "2024",
      doi: "10.1007/s40593-024-xxxx-z",
      type: "Journal",
      abstract: "A comprehensive analysis of deployment of OpenAI and Google Gemini agents in coding labs. Studies user experience across a sample size of 500 students, documenting key improvements in logic formulation and debugging capabilities."
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "AIVR Learning Platform",
      description: "AI + VR platform for immersive K-12 education. Dynamically generates VR environments using text-to-3D APIs based on standard teacher lecture notes.",
      tech: ["Python", "React", "Three.js", "WebXR", "Gemini API"],
      github: "https://github.com/ramesh-gummadi/aivr-learning-platform",
      demo: "https://aivr-demo.edu"
    },
    {
      id: "proj-2",
      title: "AI Content Generation System",
      description: "Automated educational content generation system using LLMs. Generates structured lesson notes, flashcards, MCQs, and detailed rubrics from text inputs.",
      tech: ["Python", "n8n", "OpenRouter", "LangChain", "SQL"],
      github: "https://github.com/ramesh-gummadi/ai-content-generator",
      demo: "https://ai-content-generator.edu"
    },
    {
      id: "proj-3",
      title: "YouTube Educational Automation",
      description: "An AI-driven content creation and publishing workflow. Automates video topic research, script outlines, description formatting, and social banner distribution.",
      tech: ["Node.js", "Gemini API", "n8n", "YouTube API"],
      github: "https://github.com/ramesh-gummadi/yt-educational-automation",
      demo: "https://yt-automation-dashboard.edu"
    }
  ],
  certifications: [
    { id: "cert-1", name: "Google Advanced AI & Machine Learning Specialization", issuer: "Google Cloud", year: "2024", icon: "fab fa-google" },
    { id: "cert-2", name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023", icon: "fas fa-brain" },
    { id: "cert-3", name: "Associate Cloud Engineer", issuer: "Google Cloud Platform", year: "2024", icon: "fas fa-cloud" },
    { id: "cert-4", name: "Generative AI Agents Workflow Design", issuer: "n8n Academy", year: "2024", icon: "fas fa-project-diagram" },
    { id: "cert-5", name: "Advanced Data Science with Python", issuer: "IBM", year: "2022", icon: "fas fa-chart-line" }
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
      title: "The Future of AI in Immersive VR Classrooms",
      date: "June 15, 2026",
      readTime: "5 min read",
      summary: "Explore the intersection of WebXR technology and Generative AI, demonstrating how educators can create real-time adaptive virtual worlds for science education.",
      content: "Immersive VR classrooms have transitioned from science fiction to practical reality. By integrating real-time LLMs, virtual tutors can now guide students through historical sites or atomic structures, responding dynamically to student confusion in three dimensions..."
    },
    {
      id: "blog-2",
      title: "Building Autonomous AI Agents for Educational Workflows",
      date: "May 28, 2026",
      readTime: "8 min read",
      summary: "A practical guide to implementing LangChain RAG agents and n8n pipelines to automate standard teacher activities like grading, quiz creation, and lecture summarization.",
      content: "Automation in academics doesn't replace the professor; it frees them. In this article, we step through creating a RAG agent using OpenRouter and Gemini API to ingest a university syllabus and instantly formulate standard assignments and matching rubrics..."
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
