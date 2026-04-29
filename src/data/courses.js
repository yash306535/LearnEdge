import shivaniCertificateImage from '../asset/shivani.png';

export const courses = [
  {
    id: "shivani-demo",
    title: "Shivani's Demo Course",
    subtitle: "Demo course pre-seeded for Shivani Kapase",
    description: "A short demo course used to show seeded certificate and completed progress for Shivani.",
    instructor: {
      name: "Shivani Kapase",
      title: "Learner",
      company: "LearnEdge Demo",
      avatar: shivaniCertificateImage,
      bio: "Demo instructor account for Shivani.",
      courses: 1,
      students: 1,
      rating: 5
    },
    category: "Demo",
    level: "Beginner",
    totalHours: 45,
    duration: "45 hours",
    lectures: 12,
    students: 1,
    rating: 5,
    reviews: 0,
    price: 0,
    originalPrice: 0,
    thumbnail: shivaniCertificateImage,
    badge: "Demo",
    certificate: true,
    lastUpdated: "April 2026",
    language: "English",
    tags: ["Demo", "Seed"],
    whatYouLearn: ["This is a seeded demo course for Shivani"],
    requirements: ["No prerequisites"],
    playlist: [
      {
        id: 1,
        section: "Demo Playlist",
        videos: [
          { id: "d-v1", title: "Welcome (Demo)", duration: "5:00", videoId: "demo1", preview: true },
          { id: "d-v2", title: "Overview (Demo)", duration: "10:00", videoId: "demo2" },
          { id: "d-v3", title: "Wrap Up (Demo)", duration: "8:00", videoId: "demo3" }
        ]
      }
    ]
  },
  {
    id: "claude-fundamentals",
    title: "Claude AI Fundamentals",
    subtitle: "Master the basics of working with Claude AI from Anthropic",
    description: "Begin your AI journey with a comprehensive introduction to Claude, Anthropic's most capable AI assistant. You'll learn how to effectively interact with Claude, understand its core capabilities, and apply it to real-world tasks across writing, coding, analysis, and research. By the end, you'll have a solid foundation to advance into more specialized AI topics.",
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior AI Researcher",
      company: "Anthropic Alumni",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      bio: "Dr. Chen spent 6 years at Anthropic working on Claude's alignment and capabilities. She has published 30+ papers on AI safety and natural language understanding, and has trained over 34,000 students worldwide.",
      courses: 5,
      students: 34500,
      rating: 4.9
    },
    category: "AI Fundamentals",
    level: "Beginner",
    totalHours: 32,
    duration: "32 hours",
    lectures: 48,
    students: 12847,
    rating: 4.9,
    reviews: 2341,
    price: 89.99,
    originalPrice: 199.99,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    badge: "Bestseller",
    certificate: true,
    lastUpdated: "March 2025",
    language: "English",
    tags: ["Claude", "AI", "Anthropic", "Beginner", "Machine Learning", "LLM"],
    whatYouLearn: [
      "Understand how Claude AI works and its core capabilities",
      "Write effective prompts to get accurate, reliable responses",
      "Apply Claude to real-world business and personal problems",
      "Understand AI safety, ethics, and Constitutional AI principles",
      "Build workflows that integrate Claude into daily tasks",
      "Use Claude for writing, coding, analysis, research, and more",
      "Navigate Claude's limitations and handle edge cases",
      "Master multi-turn conversations and context management"
    ],
    requirements: [
      "No prior AI experience required",
      "Basic computer literacy and internet access",
      "Curiosity and willingness to experiment"
    ],
    playlist: [
      {
        id: 1,
        section: "Getting Started with Claude",
        videos: [
          { id: "v1-1", title: "Welcome to Claude AI Fundamentals", duration: "5:23", videoId: "zjkBMFhNj_g", preview: true },
          { id: "v1-2", title: "What is Claude? A Complete Overview", duration: "18:45", videoId: "zjkBMFhNj_g" },
          { id: "v1-3", title: "Claude vs GPT-4 vs Gemini: A Comparison", duration: "24:12", videoId: "zjkBMFhNj_g" },
          { id: "v1-4", title: "Setting Up Your Claude Account & API Keys", duration: "12:30", videoId: "zjkBMFhNj_g" }
        ]
      },
      {
        id: 2,
        section: "Understanding AI & Language Models",
        videos: [
          { id: "v2-1", title: "How Large Language Models Actually Work", duration: "42:18", videoId: "zjkBMFhNj_g" },
          { id: "v2-2", title: "Constitutional AI: Claude's Moral Foundation", duration: "35:00", videoId: "zjkBMFhNj_g" },
          { id: "v2-3", title: "Safety and Alignment in Modern AI Systems", duration: "28:45", videoId: "zjkBMFhNj_g" }
        ]
      },
      {
        id: 3,
        section: "Basic Interactions & Prompting",
        videos: [
          { id: "v3-1", title: "Your First Conversation with Claude", duration: "20:15", videoId: "zjkBMFhNj_g" },
          { id: "v3-2", title: "Understanding Tokens and Context Windows", duration: "32:40", videoId: "zjkBMFhNj_g" },
          { id: "v3-3", title: "Fundamental Prompt Structures and Patterns", duration: "28:20", videoId: "zjkBMFhNj_g" },
          { id: "v3-4", title: "Getting Consistent and Reliable Responses", duration: "25:10", videoId: "zjkBMFhNj_g" }
        ]
      },
      {
        id: 4,
        section: "Practical Real-World Applications",
        videos: [
          { id: "v4-1", title: "Claude for Writing & Content Creation", duration: "38:22", videoId: "zjkBMFhNj_g" },
          { id: "v4-2", title: "Claude for Research & Deep Analysis", duration: "42:00", videoId: "zjkBMFhNj_g" },
          { id: "v4-3", title: "Claude for Coding Assistance & Debugging", duration: "45:30", videoId: "zjkBMFhNj_g" },
          { id: "v4-4", title: "Claude for Data Processing & Summarization", duration: "36:15", videoId: "zjkBMFhNj_g" }
        ]
      },
      {
        id: 5,
        section: "Advanced Concepts & Best Practices",
        videos: [
          { id: "v5-1", title: "Mastering Multi-Turn Conversations", duration: "30:00", videoId: "zjkBMFhNj_g" },
          { id: "v5-2", title: "Working Around Claude's Limitations", duration: "28:45", videoId: "zjkBMFhNj_g" },
          { id: "v5-3", title: "Ethical Use and Responsible AI Practices", duration: "24:30", videoId: "zjkBMFhNj_g" },
          { id: "v5-4", title: "Final Project: Build a Claude-Powered Workflow", duration: "55:00", videoId: "zjkBMFhNj_g" }
        ]
      }
    ]
  },
  {
    id: "advanced-prompt-engineering",
    title: "Advanced Prompt Engineering with Claude",
    subtitle: "Master the art and science of crafting perfect AI prompts",
    description: "Take your Claude interactions to the next level with professional-grade prompt engineering techniques. This course covers chain-of-thought prompting, few-shot learning, role assignment, structured outputs, and many other sophisticated strategies used by AI engineers at top tech companies. You'll build a complete prompt library by the end.",
    instructor: {
      name: "Prof. James Martinez",
      title: "Head of AI Engineering",
      company: "TechForward Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Prof. Martinez has trained over 52,000 AI engineers and is a globally recognized expert in prompt engineering and large language model optimization. He consults for Fortune 500 companies on AI adoption strategies.",
      courses: 8,
      students: 52000,
      rating: 4.8
    },
    category: "Prompt Engineering",
    level: "Intermediate",
    totalHours: 38,
    duration: "38 hours",
    lectures: 62,
    students: 8934,
    rating: 4.8,
    reviews: 1567,
    price: 109.99,
    originalPrice: 249.99,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop",
    badge: "Top Rated",
    certificate: true,
    lastUpdated: "April 2025",
    language: "English",
    tags: ["Prompt Engineering", "Claude", "Advanced", "NLP", "AI", "Chain-of-Thought"],
    whatYouLearn: [
      "Master chain-of-thought and tree-of-thought prompting",
      "Implement few-shot and zero-shot learning techniques effectively",
      "Design complex multi-step reasoning prompt chains",
      "Optimize prompts for specific professional domains and tasks",
      "Evaluate and systematically iterate on prompt performance",
      "Build production-ready, versioned prompt libraries",
      "Handle edge cases, hallucinations, and output validation",
      "Apply ReAct and Constitutional AI prompting patterns"
    ],
    requirements: [
      "Basic understanding of Claude or a similar AI model",
      "Completed Claude AI Fundamentals or 3+ months of hands-on experience",
      "Familiarity with basic AI and language model concepts"
    ],
    playlist: [
      {
        id: 1,
        section: "Foundations of Advanced Prompting",
        videos: [
          { id: "v1-1", title: "Course Overview & Your Learning Path", duration: "8:45", videoId: "aircAruvnKk", preview: true },
          { id: "v1-2", title: "The Anatomy of a Perfect Prompt", duration: "35:20", videoId: "aircAruvnKk" },
          { id: "v1-3", title: "Tokens, Context Density & Information Management", duration: "42:15", videoId: "aircAruvnKk" },
          { id: "v1-4", title: "Prompt Evaluation Frameworks & Metrics", duration: "28:30", videoId: "aircAruvnKk" }
        ]
      },
      {
        id: 2,
        section: "Core Advanced Techniques",
        videos: [
          { id: "v2-1", title: "Chain-of-Thought Prompting: Deep Mastery", duration: "52:00", videoId: "aircAruvnKk" },
          { id: "v2-2", title: "Few-Shot Learning: Examples That Work", duration: "45:30", videoId: "aircAruvnKk" },
          { id: "v2-3", title: "Role Assignment & Persona-Based Prompting", duration: "38:45", videoId: "aircAruvnKk" },
          { id: "v2-4", title: "Zero-Shot vs Few-Shot: Choosing Wisely", duration: "32:20", videoId: "aircAruvnKk" }
        ]
      },
      {
        id: 3,
        section: "Specialized Prompting Strategies",
        videos: [
          { id: "v3-1", title: "Tree of Thought Prompting for Complex Problems", duration: "48:15", videoId: "aircAruvnKk" },
          { id: "v3-2", title: "ReAct Prompting: Reasoning + Acting", duration: "42:00", videoId: "aircAruvnKk" },
          { id: "v3-3", title: "Constitutional AI Prompting Patterns", duration: "35:30", videoId: "aircAruvnKk" },
          { id: "v3-4", title: "Structured & JSON Output Prompting", duration: "38:45", videoId: "aircAruvnKk" }
        ]
      },
      {
        id: 4,
        section: "Domain-Specific Applications",
        videos: [
          { id: "v4-1", title: "Advanced Code Generation Prompts", duration: "55:00", videoId: "aircAruvnKk" },
          { id: "v4-2", title: "Scientific Research & Literature Review Prompting", duration: "48:20", videoId: "aircAruvnKk" },
          { id: "v4-3", title: "Creative Writing: Controlling Style & Voice", duration: "42:30", videoId: "aircAruvnKk" },
          { id: "v4-4", title: "Business Analytics & Report Generation", duration: "38:15", videoId: "aircAruvnKk" }
        ]
      },
      {
        id: 5,
        section: "Production Prompt Engineering Systems",
        videos: [
          { id: "v5-1", title: "Building & Organizing a Prompt Library", duration: "45:00", videoId: "aircAruvnKk" },
          { id: "v5-2", title: "A/B Testing and Iterating on Prompts", duration: "35:30", videoId: "aircAruvnKk" },
          { id: "v5-3", title: "Prompt Version Control & Documentation", duration: "28:45", videoId: "aircAruvnKk" },
          { id: "v5-4", title: "Capstone: Build a Professional Prompt System", duration: "72:00", videoId: "aircAruvnKk" }
        ]
      }
    ]
  },
  {
    id: "building-ai-apps-claude-api",
    title: "Building Real-World AI Apps with Claude API",
    subtitle: "From zero to production: Build and ship powerful AI applications",
    description: "Learn to architect, build, and deploy production-ready AI applications using the Claude API. This hands-on course covers API integration, streaming responses, prompt management, error handling, scaling strategies, and deployment to major cloud providers. You will build 3 complete, real-world applications ready to showcase in your portfolio.",
    instructor: {
      name: "Dr. Aisha Johnson",
      title: "Lead AI Software Engineer",
      company: "AI Ventures Inc.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      bio: "Dr. Johnson has engineered AI applications for Fortune 500 companies including healthcare, fintech, and e-commerce sectors. She has been building production systems with Claude since its first public API release.",
      courses: 6,
      students: 28000,
      rating: 4.9
    },
    category: "API Development",
    level: "Advanced",
    totalHours: 35,
    duration: "35 hours",
    lectures: 55,
    students: 6521,
    rating: 4.9,
    reviews: 987,
    price: 129.99,
    originalPrice: 299.99,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    badge: "New",
    certificate: true,
    lastUpdated: "April 2025",
    language: "English",
    tags: ["Claude API", "Python", "JavaScript", "AI Apps", "Production", "Backend", "Full-Stack"],
    whatYouLearn: [
      "Integrate Claude API into web applications using Python and JavaScript",
      "Build 3 complete production-ready AI applications",
      "Implement streaming responses for real-time user experiences",
      "Manage API costs, rate limits, and optimize for efficiency",
      "Deploy AI applications to AWS, GCP, and Azure",
      "Implement proper error handling, logging, and monitoring",
      "Architect multi-agent systems and tool-use workflows",
      "Handle security, authentication, and data privacy in AI apps"
    ],
    requirements: [
      "Proficiency in Python or JavaScript/TypeScript",
      "Basic understanding of REST APIs and web development",
      "Completed Advanced Prompt Engineering or equivalent experience",
      "Familiarity with Claude AI fundamentals"
    ],
    playlist: [
      {
        id: 1,
        section: "Claude API Fundamentals",
        videos: [
          { id: "v1-1", title: "Introduction to the Claude API Ecosystem", duration: "12:30", videoId: "c0m6yaGlZh4", preview: true },
          { id: "v1-2", title: "API Authentication, Security & Key Management", duration: "28:45", videoId: "c0m6yaGlZh4" },
          { id: "v1-3", title: "Making Your First API Call (Python & JS)", duration: "35:20", videoId: "c0m6yaGlZh4" },
          { id: "v1-4", title: "Understanding API Responses & Message Formats", duration: "25:15", videoId: "c0m6yaGlZh4" },
          { id: "v1-5", title: "Rate Limiting, Retries & Error Handling", duration: "32:00", videoId: "c0m6yaGlZh4" }
        ]
      },
      {
        id: 2,
        section: "Building Core Application Features",
        videos: [
          { id: "v2-1", title: "Implementing Streaming Responses", duration: "45:30", videoId: "c0m6yaGlZh4" },
          { id: "v2-2", title: "Conversation History & Context Management", duration: "38:20", videoId: "c0m6yaGlZh4" },
          { id: "v2-3", title: "File Processing and Document Analysis", duration: "42:45", videoId: "c0m6yaGlZh4" },
          { id: "v2-4", title: "Tool Use and Function Calling with Claude", duration: "50:00", videoId: "c0m6yaGlZh4" }
        ]
      },
      {
        id: 3,
        section: "Project: AI Writing Assistant App",
        videos: [
          { id: "v3-1", title: "Architecture Planning & Tech Stack", duration: "22:30", videoId: "c0m6yaGlZh4" },
          { id: "v3-2", title: "Building the FastAPI Backend", duration: "52:45", videoId: "c0m6yaGlZh4" },
          { id: "v3-3", title: "Building the React Frontend with Streaming", duration: "48:20", videoId: "c0m6yaGlZh4" },
          { id: "v3-4", title: "Deploying to Vercel & Railway", duration: "35:15", videoId: "c0m6yaGlZh4" }
        ]
      },
      {
        id: 4,
        section: "Project: AI Analytics Dashboard",
        videos: [
          { id: "v4-1", title: "Connecting Claude to Business Data Sources", duration: "38:30", videoId: "c0m6yaGlZh4" },
          { id: "v4-2", title: "Automated Report & Insight Generation", duration: "45:20", videoId: "c0m6yaGlZh4" },
          { id: "v4-3", title: "Natural Language Querying Interface", duration: "42:45", videoId: "c0m6yaGlZh4" }
        ]
      },
      {
        id: 5,
        section: "Production, Scaling & Deployment",
        videos: [
          { id: "v5-1", title: "Token Cost Optimization Strategies", duration: "32:00", videoId: "c0m6yaGlZh4" },
          { id: "v5-2", title: "Deploying to AWS Lambda & ECS", duration: "48:45", videoId: "c0m6yaGlZh4" },
          { id: "v5-3", title: "Monitoring, Logging & Observability", duration: "35:20", videoId: "c0m6yaGlZh4" },
          { id: "v5-4", title: "Scaling AI Apps: Caching, Queuing & Load Balancing", duration: "42:30", videoId: "c0m6yaGlZh4" }
        ]
      }
    ]
  }
];

export const getCourseById = (id) => courses.find(c => c.id === id);

export const categories = [
  { name: "AI Fundamentals", icon: "🧠", count: 24, color: "#EDE9FE", iconBg: "#7C3AED" },
  { name: "Prompt Engineering", icon: "✍️", count: 18, color: "#DBEAFE", iconBg: "#2563EB" },
  { name: "API Development", icon: "⚡", count: 15, color: "#D1FAE5", iconBg: "#059669" },
  { name: "Data Science", icon: "📊", count: 22, color: "#FEF3C7", iconBg: "#D97706" },
  { name: "Natural Language Processing", icon: "💬", count: 12, color: "#FCE7F3", iconBg: "#DB2777" },
  { name: "Computer Vision", icon: "👁️", count: 9, color: "#CFFAFE", iconBg: "#0891B2" },
  { name: "AI Ethics", icon: "⚖️", count: 7, color: "#FEE2E2", iconBg: "#DC2626" },
  { name: "Research Methods", icon: "🔬", count: 11, color: "#F0FDF4", iconBg: "#16A34A" }
];
