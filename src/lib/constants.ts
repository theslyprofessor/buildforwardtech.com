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
  { name: "Verse & Vow", url: "https://verseandvow.com" },
  { name: "Nakul Tiruviluamala", url: "https://nakultiruviluamala.com" },
  { name: "April Garnica", url: "https://aprilgarnica.com" },
  { name: "Zora Cohen", url: "https://zoracohen.com" },
  { name: "Southwestern Recording", url: "https://southwesternrecording.org" },
  { name: "MEC Info", url: "https://mecinfo.org" },
  { name: "MIDI Maze", url: "https://midimaze.com" },
] as const;

export const VINNIE_BIO = {
  name: "Vinnie Tiruviluamala",
  title: "Principal Consultant",
  credential: "Former CIO of Sony Latin America",
  bio: "With over two decades of executive technology leadership, Vinnie brings enterprise-level expertise to organizations of all sizes. His experience steering technology strategy for Sony Latin America gives clients access to Fortune 500 insights and best practices, applied with the personalized attention of a boutique consultancy.",
} as const;
