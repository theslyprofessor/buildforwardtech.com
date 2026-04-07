export const SITE_CONFIG = {
  name: "Build Forward Tech",
  tagline: "Curating World-Changing Technology",
  description: "Tracking the companies and breakthroughs reshaping our world — from fusion energy to autonomous vehicles. Technology consulting, sector intelligence, and forward-looking investment insights. Led by Vinnie Tiruviluamala, Former CIO of Sony Latin America.",
  email: "vinnie@buildforwardtech.com",
  phone: "(619) 555-0123",
  url: "https://buildforwardtech.com",
} as const;

export const NAV_LINKS = [
  { href: "/#pillars", label: "What We Do" },
  { href: "/sectors", label: "Sectors" },
  { href: "/#consulting", label: "Consulting" },
  { href: "/#labs", label: "Labs" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Three Pillars — the unified BFT value stack.
 * Sector Intelligence (research) → Strategic Consulting (advisory) → Investment Insights (capital)
 * Each pillar feeds the next. The sectors we track inform the consulting we provide
 * and the investment theses we publish.
 */
export const PILLARS = [
  {
    id: "intelligence",
    title: "Sector Intelligence",
    description: "We track 8 frontier technology sectors and 44+ companies. Weekly newsletter, sector dashboards, and deep research reports on fusion, robotics, solid-state batteries, water infrastructure, autonomous vehicles, and more.",
    icon: "Radar",
    cta: "Explore Sectors",
    ctaHref: "/sectors",
    badge: "Research",
  },
  {
    id: "consulting",
    title: "Strategic Consulting",
    description: "We apply frontier tech intelligence to your business. AI readiness assessments, technology modernization roadmaps, and strategic advisory — delivered by Fortune 500 veterans with Sony Latin America CIO experience.",
    icon: "Briefcase",
    cta: "View Engagements",
    ctaHref: "#consulting",
    badge: "Advisory",
  },
  {
    id: "investment",
    title: "Investment Insights",
    description: "Thematic investment research across frontier tech. Model portfolios, company deep dives, and sector-weighted theses for accredited investors and family offices. Coming soon: BFT Frontier Tech Index.",
    icon: "TrendingUp",
    cta: "Join Waitlist",
    ctaHref: "/newsletter",
    badge: "Capital",
  },
] as const;

/**
 * Consulting engagements — priced to reflect Fortune 500-level expertise.
 * These are *applications* of our sector intelligence, not commodity services.
 */
export const SERVICES = [
  {
    id: "ai-readiness",
    title: "AI Readiness Assessment",
    description: "Comprehensive evaluation of your organization's preparedness for AI integration. Infrastructure audit, workflow analysis, vendor selection, risk assessment, and a 12-month implementation roadmap.",
    icon: "Brain",
    price: "$7,500 - $25,000",
  },
  {
    id: "technology-strategy",
    title: "Technology Strategy Advisory",
    description: "Retained advisory for executives navigating frontier technology decisions. Board presentations, vendor negotiations, competitive intelligence, and quarterly sector briefings.",
    icon: "Compass",
    price: "$10,000/quarter",
  },
  {
    id: "modernization",
    title: "Modernization Engagements",
    description: "Legacy system transformation with modern stack migration, cloud architecture, and performance optimization. Scoped to outcomes, not hours.",
    icon: "Code",
    price: "Project-based",
  },
  {
    id: "sector-research",
    title: "Custom Sector Research",
    description: "Bespoke intelligence reports on specific frontier technology sectors. Competitive landscapes, company profiles, investment theses, and market timing analysis for corporate strategy teams.",
    icon: "FileSearch",
    price: "$5,000 - $50,000",
  },
] as const;

/**
 * BFT Labs — frontier projects we're building ourselves.
 * Proof that we don't just write about frontier tech, we ship it.
 */
export const LABS_PROJECTS = [
  {
    id: "nnt",
    name: "NNT",
    fullName: "Nakul Notation Tool",
    url: "https://nnt-docs.com",
    tagline: "A formal language for music notation",
    description: "A novel shorthand notation system and compiler for Western music, enabling musicians to type music as text. Compiles to MusicXML, ABC, and Verovio-rendered staff notation. Originating PhD research on musical process representation and formal language theory.",
    tag: "PhD Research",
    status: "Active",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "midimaze-platform",
    name: "Midimaze Platform",
    fullName: "Educational LMS + Admin Platform",
    url: "https://midimaze.com",
    tagline: "The self-hosted answer to Canvas",
    description: "A full-stack educational platform for Recording Arts & Technology at Southwestern College. TanStack Start + Convex + Clerk. Features: classroom management, gradebook, attendance tracking, audio analysis tools, 3D campus portal, and 30+ specialized portals. Built to replace institutional software that wasn't serving students.",
    tag: "EdTech Platform",
    status: "In Production",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "convex-erp",
    name: "ConvexERP (working name)",
    fullName: "Real-Time Business Operating System",
    url: null,
    tagline: "The next-gen ERP — reactive, AI-native, open",
    description: "A modern reimagining of enterprise resource planning: real-time reactive data layer (Convex), AI-first workflows, pluggable modules, and a beautiful developer experience. Inspired by the Midimaze platform's modular portal architecture. Currently in design phase.",
    tag: "Early R&D",
    status: "Coming 2026",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "tldr-ingestion",
    name: "BFT Sector Intelligence Engine",
    fullName: "AI-Powered Newsletter Ingestion Pipeline",
    url: null,
    tagline: "How we curate frontier tech at scale",
    description: "Our proprietary pipeline ingests TLDR, TLDR AI, and other tech sources into a structured database, uses Claude to auto-classify articles by sector, extract company mentions, and generate weekly digest drafts. Processes ~27,000 articles/year at ~$18/year in AI costs.",
    tag: "Internal Tool",
    status: "Active",
    gradient: "from-green-500/20 to-emerald-500/20",
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
    thumbnail: "/thumbnails/verseandvow.webp?v=4",
  },
  {
    name: "Zora's Little Batch Bakehouse",
    url: "https://zoracohen.com",
    description: "Artisan bakery showcasing handcrafted small-batch pastries, custom cakes, and seasonal menus.",
    tag: "Small Business",
    gradient: "from-amber-500/20 to-orange-500/20",
    thumbnail: "/thumbnails/zoracohen.webp?v=4",
  },
  {
    name: "Midimaze",
    url: "https://midimaze.com",
    description: "Full-stack educational platform built with Astro, React, and TypeScript — featuring knowledge-graph navigation, full-text search, real-time collaboration, and 1,000+ interconnected articles powered by a headless Obsidian CMS.",
    tag: "EdTech Platform",
    gradient: "from-violet-500/20 to-purple-500/20",
    thumbnail: "/thumbnails/midimaze.webp?v=4",
  },
  {
    name: "MusicMind",
    url: "https://musicmind.biz",
    description: "Music business agency offering entertainment consulting, contract and licensing support, business certifications, and entertainment law guidance for artists and industry professionals.",
    tag: "Music Business",
    gradient: "from-cyan-500/20 to-blue-500/20",
    thumbnail: "/thumbnails/musicmind.webp?v=4",
  },
  {
    name: "Southwestern Recording",
    url: "https://southwesternrecording.com",
    description: "Official college program website for Southwestern College's Recording Arts & Technology department.",
    tag: "Education",
    gradient: "from-emerald-500/20 to-teal-500/20",
    thumbnail: "/thumbnails/southwesternrecording.webp?v=4",
  },
  {
    name: "Musician's Empowerment Collective",
    url: "https://mecinfo.org",
    description: "Website for a non-profit organization dedicated to empowering musicians through community, resources, and advocacy.",
    tag: "Non-Profit",
    gradient: "from-sky-500/20 to-indigo-500/20",
    thumbnail: "/thumbnails/mecinfo.webp?v=4",
  },
  {
    name: "April Garnica",
    url: "https://aprilgarnica.com",
    description: "Portfolio site for a professional videographer and photographer showcasing cinematic work and booking info.",
    tag: "Portfolio",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    thumbnail: "/thumbnails/aprilgarnica.webp?v=4",
  },
  {
    name: "Nakul Tiruviluamala",
    url: "https://nakultiruviluamala.com",
    description: "Personal portfolio for a full-stack engineer, music technologist, and educator.",
    tag: "Portfolio",
    gradient: "from-slate-500/20 to-zinc-500/20",
    thumbnail: "/thumbnails/nakultiruviluamala.webp?v=4",
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
