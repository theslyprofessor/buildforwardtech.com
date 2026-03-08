export const SITE_CONFIG = {
  name: "Build Forward Tech",
  tagline: "Future-Ready Technology Consulting",
  description: "AI readiness consulting, web development, security audits, and scalability services. Led by Vinnie Tiruviluamala, Former CIO of Sony Latin America.",
  email: "vinnie@buildforwardtech.com",
  phone: "(619) 555-0123",
  url: "https://buildforwardtech.com",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#ai-readiness", label: "AI Readiness" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    id: "ai-readiness",
    title: "AI Readiness Consulting",
    description: "Prepare your organization for AI integration with comprehensive assessments, strategy development, and implementation roadmaps.",
    icon: "Brain",
    price: "$1,000 - $2,000",
  },
  {
    id: "web-development",
    title: "Web Development & Modernization",
    description: "Modern, performant websites built with cutting-edge technologies. Transform legacy systems into scalable, maintainable solutions.",
    icon: "Code",
    price: null,
  },
  {
    id: "security",
    title: "Security Audits",
    description: "Comprehensive security assessments to identify vulnerabilities, ensure compliance, and protect your digital assets.",
    icon: "Shield",
    price: null,
  },
  {
    id: "scalability",
    title: "Scalability Consulting",
    description: "Architecture reviews and optimization strategies to ensure your systems can grow with your business needs.",
    icon: "TrendingUp",
    price: null,
  },
] as const;

export const AI_READINESS_PILLARS = [
  {
    title: "Security Audit",
    description: "Comprehensive review of your current security posture and AI-specific vulnerabilities",
  },
  {
    title: "Cost Optimization",
    description: "Analysis of infrastructure costs and recommendations for AI workload efficiency",
  },
  {
    title: "AI Integration",
    description: "Strategic roadmap for incorporating AI tools into your existing workflows",
  },
] as const;

export const AI_READINESS_DELIVERABLES = [
  "Executive summary with actionable recommendations",
  "Security risk assessment report",
  "Cost optimization analysis",
  "AI integration roadmap",
  "Implementation timeline",
  "30-day follow-up consultation",
] as const;

export const PORTFOLIO_SITES = [
  {
    name: "Verse & Vow",
    url: "https://verseandvow.com",
    description: "Full-service wedding and event agency featuring entertainment booking, photography packages, and event coordination.",
    tag: "Event Agency",
    gradient: "from-rose-500/20 to-pink-500/20",
    icon: "Heart",
  },
  {
    name: "Zora's Little Batch Bakehouse",
    url: "https://zoracohen.com",
    description: "Artisan bakery showcasing handcrafted small-batch pastries, custom cakes, and seasonal menus.",
    tag: "Small Business",
    gradient: "from-amber-500/20 to-orange-500/20",
    icon: "ChefHat",
  },
  {
    name: "Midimaze",
    url: "https://midimaze.com",
    description: "Full-stack educational platform built with Astro, React, and TypeScript — featuring knowledge-graph navigation, full-text search, real-time collaboration, and 1,000+ interconnected articles powered by a headless Obsidian CMS.",
    tag: "EdTech Platform",
    gradient: "from-violet-500/20 to-purple-500/20",
    icon: "GraduationCap",
  },
  {
    name: "MusicMind",
    url: "https://musicmind.biz",
    description: "AI-powered music education tools and resources for students, educators, and working musicians.",
    tag: "AI / Music",
    gradient: "from-cyan-500/20 to-blue-500/20",
    icon: "Music",
  },
  {
    name: "Southwestern Recording",
    url: "https://southwesternrecording.org",
    description: "Official college program website for Southwestern College's Recording Arts & Technology department.",
    tag: "Education",
    gradient: "from-emerald-500/20 to-teal-500/20",
    icon: "School",
  },
  {
    name: "Musician's Empowerment Collective",
    url: "https://mecinfo.org",
    description: "Website for a non-profit organization dedicated to empowering musicians through community, resources, and advocacy.",
    tag: "Non-Profit",
    gradient: "from-sky-500/20 to-indigo-500/20",
    icon: "Users",
  },
  {
    name: "April Garnica",
    url: "https://aprilgarnica.com",
    description: "Portfolio site for a professional videographer and photographer showcasing cinematic work and booking info.",
    tag: "Portfolio",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    icon: "Camera",
  },
  {
    name: "Nakul Tiruviluamala",
    url: "https://nakultiruviluamala.com",
    description: "Personal portfolio for a full-stack engineer, music technologist, and educator.",
    tag: "Portfolio",
    gradient: "from-slate-500/20 to-zinc-500/20",
    icon: "User",
  },
] as const;

export const TEAM = [
  {
    name: "Vinnie Tiruviluamala",
    title: "Principal Consultant",
    credential: "Former CIO of Sony Latin America",
    initials: "VT",
    bio: "With over two decades of executive technology leadership, Vinnie brings enterprise-level expertise to organizations of all sizes. His experience steering technology strategy for Sony Latin America gives clients access to Fortune 500 insights and best practices, applied with the personalized attention of a boutique consultancy.",
  },
  {
    name: "Nakul Tiruviluamala",
    title: "Chief Technology Officer",
    credential: "Full-Stack Engineer & Systems Architect",
    initials: "NT",
    bio: "Nakul leads the technical execution at Build Forward Tech, architecting modern web applications, cloud infrastructure, and AI integrations. With deep expertise in full-stack development, DevOps, and audio engineering systems, he ensures every project is built on a solid, scalable foundation.",
  },
] as const;

export const VINNIE_BIO = TEAM[0];
