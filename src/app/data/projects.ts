/* -----------------------------------------------------------
   Single source of truth for every project shown on the site.

   - The home page (ProjectsSection) renders these as cards.
   - Each card links to /projects/:slug.
   - A project may optionally carry a rich `caseStudy` object; when
     present, its detail page renders the full UX case-study layout
     (DigiLocker). Otherwise the detail page renders the compact
     "generic" layout built from the fields below.
   ----------------------------------------------------------- */

/** One numbered step in the design-process timeline. */
export interface ProcessStep {
  title: string;
  body: string;
}

/** A before/after comparison of a single redesigned screen. */
export interface ScreenComparison {
  /** e.g. "Home Screen". */
  label: string;
  /** Description of what the redesigned screen does. */
  description: string;
  /** Bullet list of key improvements. */
  improvements: string[];
  /** Image paths under /public — empty/missing renders a placeholder. */
  beforeImage?: string;
  afterImage?: string;
}

export interface CaseStudy {
  /** Two-tone hero title: `title` (primary) + `titleAccent` (coloured). */
  title: string;
  titleAccent: string;
  /** Short tagline shown under the title on the case-study hero. */
  tagline: string;
  /** Pill tags shown under the tagline. */
  tags: string[];
  /** Hero phone mockup (landing screen) + its caption. */
  heroImage?: string;
  heroImageCaption?: string;
  /** Optional link to the live Figma file / prototype. */
  figma?: string;

  overview: string;
  problems: string[];
  process: ProcessStep[];
  screens: ScreenComparison[];
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  details: string[];
  stack: string[];
  github: string;
  demo?: string;
  status: string;
  year: string;
  /** Optional thumbnail for the card / generic detail page. */
  thumbnail?: string;
  /** Present only for full UX case studies (DigiLocker). */
  caseStudy?: CaseStudy;
}

export const statusColor: Record<string, string> = {
  active: "#3fb950",
  complete: "#58d5f8",
  prototype: "#f0883e",
  design: "#d2a8ff",
  archived: "#8b949e",
};

export const projects: Project[] = [
  {
    slug: "contentshield",
    name: "ContentShield",
    subtitle: "AI-Powered Enterprise Content Operations",
    description:
      "Production-grade multi-agent AI pipeline that automates the full lifecycle of enterprise marketing content — from brief to brand-compliant, legally reviewed, SEO-optimized, multi-channel publication.",
    details: [
      "8-agent LangGraph pipeline: strategy, drafting, brand compliance, legal review, localization, distribution, image generation, analytics feedback.",
      "RAG-backed legal review grounded in actual RBI / ASCI / NPCI regulatory documents via Qdrant.",
      "Supports multiple LLM providers (Groq, Gemini, OpenRouter, local Llama.cpp) with observable tracing through Arize Phoenix.",
      "85% reduction in content cycle time with measurable compliance guardrails before publication.",
    ],
    stack: ["Python 3.11", "FastAPI", "LangGraph", "Qdrant", "Groq", "Gemini", "Playwright", "React", "TypeScript"],
    github: "https://github.com/Jid3459/ETHack",
    status: "active",
    year: "2026",
  },
  {
    slug: "clauseguard",
    name: "ClauseGuard",
    subtitle: "Compliance & Harmful Clauses Detector",
    description:
      "AI-powered legal document analysis tool that detects harmful, non-compliant, or ambiguous clauses in contracts and agreements using NLP and transformer models.",
    details: [
      "Fine-tuned transformer classifier flags clauses by risk category and legal domain.",
      "FastAPI backend exposes a clause-scoring endpoint consumed by a React reviewer UI.",
      "PostgreSQL persistence for clause history, reviewer feedback, and audit trails.",
      "Dockerized pipeline for reproducible deployment across environments.",
    ],
    stack: ["Python", "FastAPI", "Transformers", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Skads745/privacy-chatbot",
    status: "complete",
    year: "2025",
  },
  {
    slug: "skintara",
    name: "SkinTara",
    subtitle: "Skin Disease Detector",
    description:
      "Deep learning application for non-invasive skin disease detection from images. Uses a fine-tuned CNN to classify multiple dermatological conditions with high accuracy.",
    details: [
      "Transfer-learning CNN trained on labeled dermatological datasets.",
      "OpenCV preprocessing pipeline for lesion isolation and normalization.",
      "Mobile-first React Native client talks to a FastAPI inference service.",
      "Designed for early-stage triage in low-resource telemedicine scenarios.",
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React Native"],
    github: "https://github.com/knishkagithub/Dermakure_new_phonepe",
    status: "complete",
    year: "2025",
  },
  {
    slug: "news-bias-detector",
    name: "Geopolitical News Bias Detector",
    subtitle: "ML-Powered Media Bias Analysis",
    description:
      "Machine learning pipeline that analyzes news articles and surfaces geopolitical bias patterns across sources using sentiment analysis and fine-tuned language models.",
    details: [
      "BERT-based classifier trained on annotated bias corpora.",
      "Flask API serves per-article bias scores and source-level aggregates.",
      "D3.js dashboard visualizes framing shifts across topics and outlets over time.",
      "Built to make media bias visible and quantifiable rather than anecdotal.",
    ],
    stack: ["Python", "scikit-learn", "BERT", "Flask", "React", "D3.js"],
    github: "#",
    status: "prototype",
    year: "2025",
  },
  {
    slug: "digilocker-redesign",
    name: "DigiLocker Redesign",
    subtitle: "UX/UI Case Study — Government Document Wallet",
    description:
      "An end-to-end UX/UI redesign of DigiLocker, India's official digital document wallet. The goal: turn a confusing, cluttered utility into a calm, trustworthy app that citizens can navigate in seconds.",
    details: [
      "Full UX process: research, personas, pain-point mapping, IA, wireframes, and a high-fidelity prototype.",
      "Rebuilt information architecture so issued documents, uploads, and sharing are no longer buried.",
      "Accessibility-first visual system with clear hierarchy, larger tap targets, and readable typography.",
      "Streamlined the document-sharing flow that citizens use most, reducing steps and ambiguity.",
    ],
    stack: ["Figma", "Figma Prototype", "User Research", "Wireframing", "UI Design"],
    github: "#",
    demo: "https://www.figma.com/design/Y0n1TTfmVGNVhIliKT77gZ/DIGILOCKER",
    status: "design",
    year: "2025",
    // ----------------------------------------------------------------
    // IMAGES: drop exported PNGs into  public/digilocker/  using the exact
    // filenames referenced below. Each slot shows a placeholder until the
    // matching file exists, then displays automatically (see public/digilocker/README.txt).
    // ----------------------------------------------------------------
    caseStudy: {
      title: "DigiLocker",
      titleAccent: "App Redesign",
      tagline:
        "A complete UX overhaul — simplifying document management, improving search, and providing a cleaner interface for India's digital wallet.",
      tags: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Design Systems"],
      heroImage: "/digilocker/landing.png",
      heroImageCaption: "Landing Screen",
      figma: "https://www.figma.com/design/Y0n1TTfmVGNVhIliKT77gZ/DIGILOCKER",
      overview:
        "This project is a UI/UX redesign of the DigiLocker mobile application, India's official digital document locker service. The redesign aims to modernize the interface, improve navigation, and make document access more intuitive and user-friendly.",
      problems: [
        "Outdated interface with poor visual hierarchy and cluttered layouts",
        "Confusing navigation structure making it hard to find documents quickly",
        "Lack of modern touch interactions and accessibility features",
        "Inefficient search functionality for large document collections",
        "Settings buried deep in menus with poor discoverability",
      ],
      process: [
        {
          title: "User Research",
          body: "Conducted surveys and usability testing with DigiLocker users to identify pain points and user needs.",
        },
        {
          title: "Wireframing",
          body: "Created low-fidelity wireframes to reorganize information architecture and simplify core workflows.",
        },
        {
          title: "Visual Design",
          body: "Designed high-fidelity screens with a clean, modern aesthetic inspired by Material Design principles.",
        },
        {
          title: "Prototyping",
          body: "Built interactive prototypes to test user flows and gather feedback on the redesigned experience.",
        },
        {
          title: "Testing",
          body: "Iterated on designs based on user feedback, focusing on accessibility and performance improvements.",
        },
      ],
      screens: [
        {
          label: "Home Screen",
          description:
            "Redesigned home screen with quick access to recent documents, issued certificates, and important notifications in a clean, organized layout.",
          improvements: [
            "Organized documents into categorized cards for better scannability",
            "Added quick action buttons for common tasks like issuing new documents",
            "Integrated notifications panel to surface important updates",
            "Improved visual hierarchy with larger headings and better spacing",
            "Added search bar prominently at the top for instant access",
          ],
          beforeImage: "/digilocker/before/home.jpeg",
          afterImage: "/digilocker/home.png",
        },
        {
          label: "Search & Filter",
          description:
            "Enhanced search interface with advanced filters, recent searches, and intelligent suggestions to help users find documents quickly and efficiently.",
          improvements: [
            "Implemented advanced filtering options by document type and issuer",
            "Introduced smart suggestions based on user behavior",
            "Added voice search capability for hands-free operation",
            "Added recent searches and popular queries for quick access",
            "Improved search results layout with thumbnails and metadata",
          ],
          beforeImage: "/digilocker/before/search.jpeg",
          afterImage: "/digilocker/search.png",
        },
        {
          label: "Documents View",
          description:
            "Restructured documents screen with grid view, sorting options, and batch operations for better document management and organization.",
          improvements: [
            "Switched to grid layout for better document visualization",
            "Implemented batch selection for multiple document operations",
            "Added document expiry notifications and renewal reminders",
            "Added sorting and filtering options for document management",
            "Enhanced document preview with zoom and share options",
          ],
          beforeImage: "/digilocker/before/document.jpeg",
          afterImage: "/digilocker/documents.png",
        },
        {
          label: "Settings & Profile",
          description:
            "Streamlined settings page with organized sections, quick toggles, and easy access to account management features.",
          improvements: [
            "Grouped settings into logical categories with clear headings",
            "Improved account management with profile picture and verification status",
            "Added help and support section with FAQs and contact options",
            "Added quick toggle switches for common preferences",
            "Enhanced security settings with biometric options",
          ],
          beforeImage: "/digilocker/before/settings.jpeg",
          afterImage: "/digilocker/settings.png",
        },
      ],
    },
  },
  {
    slug: "portfolio-website",
    name: "Portfolio Website",
    subtitle: "Terminal-Themed Developer Portfolio",
    description:
      "This site. A PowerShell / IDE-inspired portfolio with typewriter intro, scroll-synced sidebar navigation, light/dark mode, and interactive project and contact surfaces.",
    details: [
      "React + Vite + Tailwind, styled entirely in a terminal / code-editor aesthetic.",
      "Scroll-synced active section highlighting in the sidebar with smooth navigation.",
      "Dark and light modes share a single token-based color system.",
      "Deployed on Vercel with zero-config CI from the main branch.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vercel"],
    github: "https://github.com/Jid3459/UI-UX-Portfolio-assignment",
    status: "active",
    year: "2026",
  },
  {
    slug: "mood-do",
    name: "Mood.DO",
    subtitle: "First-Project Version Control Lab",
    description:
      "My very first GitHub repository — a sandbox used to learn Git fundamentals: branching, commits, merges, and remote workflows that every project since has been built on.",
    details: [
      "Hands-on exploration of staging, committing, branching, and merging.",
      "Experiments with remote pushes, pull requests, and resolving conflicts.",
      "Kept public as a milestone marker for my engineering journey.",
    ],
    stack: ["JavaScript", "Git", "GitHub"],
    github: "https://github.com/Jid3459/Mood.DO",
    status: "archived",
    year: "2025",
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
