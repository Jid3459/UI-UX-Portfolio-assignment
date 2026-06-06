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
  highlights: string[];
  screens: ScreenComparison[];
}

/** A validation / authenticity link shown on a detail page. */
export interface ProjectResource {
  label: string;
  url: string;
  kind: "repo" | "demo" | "figma" | "screenshots" | "video" | "docs" | "other";
}

/** Rich, multi-section content for a non-UX (technical) project page.
    Follows a narrative case-study flow. Every string[] is a list of
    paragraphs; `features` renders as a bullet list. Empty arrays are
    skipped and section numbers stay sequential. */
export interface ProjectDetail {
  tagline: string;
  overview: string[];          // 01
  motivation: string[];        // 02
  problem: string[];           // 03
  solution: string[];          // 04
  technicalDeepDive: string[]; // 05
  features: string[];          // 06 — Key Features (bulleted)
  results: string[];           // 07 — Results & Impact
  challenges: string[];        // 08 — Challenges Faced
  futureScope: string[];       // 09 — Future Scope
  resources: ProjectResource[];
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
  /** Present for technical projects — renders the detailed case-study page. */
  detail?: ProjectDetail;
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
    detail: {
      tagline: "From a single brief to brand-safe, legally-reviewed, multi-channel publication — orchestrated by 8 AI agents.",
      overview: [
        "ContentShield is a production-grade, multi-agent AI pipeline where enterprises register their brand profile and documents, then auto-generate compliant, on-brand social-media content — orchestrated end-to-end from strategy and drafting through brand compliance, localization, and publishing to configured channels.",
      ],
      motivation: [
        "Enterprise content teams spend hours shepherding one asset through copywriting, brand checks, and legal sign-off — and a single missed compliance rule can trigger a regulatory fine. I wanted to compress that cycle dramatically without removing the human safeguards that keep it safe.",
      ],
      problem: [
        "Producing content that is simultaneously on-brand, legally compliant, SEO-optimized, and localized is slow and error-prone. Manual review doesn't scale, while naive automation risks publishing non-compliant or off-brand claims.",
      ],
      solution: [
        "An 8-agent LangGraph pipeline (strategy → drafting → brand compliance → legal review → human gate → localization → distribution → feedback) that automates the busywork but pauses at a human-in-the-loop approval gate, with bounded auto-revision loops so nothing unreviewed ever ships.",
      ],
      technicalDeepDive: [
        "Built as a stateful LangGraph with conditional edges: the brand-compliance agent can route a draft back to the strategist with violation details before it reaches legal review. The legal agent extracts each factual claim and validates it via RAG against regulatory chunks stored across five specialized Qdrant collections.",
        "A human-approval INTERRUPT node pauses execution for sign-off before localization and distribution, and the LLM layer is provider-agnostic — Groq, Gemini, OpenRouter, or local llama.cpp — with full tracing through Arize Phoenix.",
      ],
      features: [
        "Legal RAG grounded in actual RBI / ASCI / NPCI documents, citing the exact circular for each flagged claim.",
        "Real-time brand compliance scoring with violation highlighting and automatic revision loops.",
        "Brand profile and documents stored as Qdrant embeddings, retrieved with keyword-guided queries (tone, banned words, audience persona) to keep output grounded and on-brand.",
        "Multi-language output (English, Hindi, Tamil, Telugu, Bengali) via Sarvam-1 with LLM refinement.",
        "Branded, platform-specific image cards generated through Playwright HTML rendering.",
        "Live ROI dashboard: hours saved, cost reduction, and violations caught.",
      ],
      results: [
        "Cut content cycle time by roughly 85% — about 5 hours down to 45 minutes — while catching brand and legal violations before publication, with the ROI dashboard quantifying the savings in real time.",
      ],
      challenges: [
        "Balancing autonomy with safety drove the human-in-the-loop gate and bounded revision loops. Local translation needs the ~4GB Sarvam-1 GGUF model, with graceful fallback to the primary LLM when it isn't available.",
      ],
      futureScope: [
        "Migrate checkpointing from in-memory MemorySaver to SqliteSaver for durable, restart-safe state, broaden language coverage, and wire real distribution connectors (Buffer / WordPress / SendGrid) beyond the current simulated mode.",
      ],
      resources: [
        { label: "View Source", url: "https://github.com/Jid3459/ETHack", kind: "repo" },
      ],
    },
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
    detail: {
      tagline: "Catching harmful, non-compliant, or ambiguous clauses in contracts before anyone signs.",
      overview: [
        "ClauseGuard analyzes contracts and agreements to surface clauses that are harmful, non-compliant, or ambiguous, pairing a fine-tuned transformer classifier with a clean reviewer UI.",
      ],
      motivation: [
        "Reviewing contracts line-by-line is slow, and non-lawyers often can't tell which clauses are risky. I wanted a tool that makes dangerous language obvious to anyone, not just legal experts.",
      ],
      problem: [
        "Legal documents are dense and domain-specific; harmful or non-compliant clauses are easy to miss, and manual review is both time-consuming and inconsistent.",
      ],
      solution: [
        "A fine-tuned transformer classifier that flags clauses by risk category and legal domain, surfaced through a React reviewer interface that highlights problems inline and captures reviewer feedback.",
      ],
      technicalDeepDive: [
        "A FastAPI backend exposes a clause-scoring endpoint that returns a risk category and confidence per clause. The React UI highlights flagged clauses inline and lets reviewers accept or override, feeding corrections back for future tuning. PostgreSQL stores clause history and audit trails, and the whole stack runs via Docker for reproducible environments.",
      ],
      features: [
        "Transformer-based classifier flags clauses by risk category and legal domain.",
        "Inline highlighting in a React reviewer UI with accept / override actions.",
        "Clause history, reviewer feedback, and audit trails persisted in PostgreSQL.",
        "Dockerized stack for reproducible deployment.",
      ],
      results: [
        "Reviewers can triage a contract far faster by jumping straight to flagged clauses, with an audit trail capturing every decision for accountability.",
      ],
      challenges: [
        "Legal language is highly domain-specific, addressed by fine-tuning on labeled clause data and grouping predictions by domain. Reducing false positives meant capturing reviewer feedback to refine risk thresholds over time.",
      ],
      futureScope: [
        "Expand the training data across more contract types, add clause-rewrite suggestions, and support additional document formats and languages.",
      ],
      resources: [
        { label: "View Source", url: "https://github.com/Skads745/privacy-chatbot", kind: "repo" },
      ],
    },
  },
  {
    slug: "skintara",
    name: "SkinTara",
    subtitle: "Multi-Class Skin Disease Classifier",
    description:
      "A multi-class skin-disease classifier for Acne Vulgaris, Acne Scars, Acne Corporis, and Melasma, built on OpenAI's CLIP with a transfer-learning pipeline and multimodal image-and-text embeddings — reaching 89% accuracy for early, accessible triage.",
    details: [
      "OpenAI CLIP backbone with a transfer-learning pipeline that lifted detection by 15% over the prior model.",
      "Multimodal embeddings combining images and natural-language prompts.",
      "Multi-class classification across four acne and pigmentation conditions.",
      "89% overall accuracy on the curated dataset; built during the AIM4U AI/ML internship.",
    ],
    stack: ["Python", "OpenAI CLIP", "Transfer Learning", "Multimodal Embeddings"],
    github: "https://github.com/knishkagithub/Dermakure_new_phonepe",
    status: "complete",
    year: "2025",
    detail: {
      tagline: "Multi-class skin-disease detection with OpenAI's CLIP and multimodal embeddings — built for early, accessible triage.",
      overview: [
        "SkinTara is a multi-class skin-disease classifier covering Acne Vulgaris, Acne Scars, Acne Corporis, and Melasma. It uses OpenAI's CLIP with a transfer-learning pipeline and multimodal embeddings — images paired with natural-language prompts — to make early screening more accessible. Built during my AI/ML internship at AIM4U Software Solutions.",
      ],
      motivation: [
        "Access to dermatologists is limited in many areas, and early detection dramatically improves outcomes. I wanted a model that could reliably distinguish visually similar skin conditions from a single image.",
      ],
      problem: [
        "Acne variants and pigmentation conditions like melasma look alike and are hard to tell apart without a specialist, and the existing model struggled to generalize across them.",
      ],
      solution: [
        "A CLIP-based transfer-learning pipeline that fuses image and natural-language prompt embeddings to classify the four conditions, improving detection by 15% over the existing model.",
      ],
      technicalDeepDive: [
        "An end-to-end data pipeline pairs CLIP image embeddings with natural-language prompt embeddings, and transfer learning adapts the model to the four target conditions — reaching 89% overall accuracy on the curated multimodal dataset.",
      ],
      features: [
        "Multi-class classification across Acne Vulgaris, Acne Scars, Acne Corporis, and Melasma.",
        "OpenAI CLIP backbone with a transfer-learning pipeline (+15% detection over the prior model).",
        "Multimodal embeddings combining images and natural-language prompts.",
        "89% overall accuracy on the curated dataset.",
      ],
      results: [
        "The transfer-learning approach lifted detection by 15% over the existing model and reached 89% overall accuracy, giving a fast, non-invasive first-pass screen from a single image.",
      ],
      challenges: [
        "Distinguishing visually similar conditions was the core difficulty, addressed with multimodal image-plus-text embeddings and transfer learning rather than relying on image features alone.",
      ],
      futureScope: [
        "Broaden the set of detectable conditions, add on-device inference for offline use, and validate against larger, more diverse clinical datasets.",
      ],
      resources: [
        { label: "View Source", url: "https://github.com/knishkagithub/Dermakure_new_phonepe", kind: "repo" },
      ],
    },
  },
  {
    slug: "news-bias-detector",
    name: "Geopolitical News Bias Detector",
    subtitle: "BERT-Based Political Bias Classifier",
    description:
      "A machine-learning pipeline that classifies news articles as Left, Right, or Center biased using a fine-tuned BERT model — trained on 2,000+ articles sourced via the NewsAPI and reaching roughly 90% accuracy.",
    details: [
      "Fine-tuned BERT classifier labeling articles Left, Right, or Center.",
      "Trained on a labeled dataset of 2,000+ articles sourced via the NewsAPI.",
      "Achieves approximately 90% classification accuracy.",
      "Built for deployment as a web tool or browser extension.",
    ],
    stack: ["Python", "BERT", "NewsAPI", "scikit-learn"],
    github: "#",
    status: "prototype",
    year: "2025",
    detail: {
      tagline: "A fine-tuned BERT classifier that labels news articles Left, Right, or Center — making media bias measurable.",
      overview: [
        "This project classifies news articles as Left, Right, or Center biased using a fine-tuned BERT model, turning anecdotal claims of 'bias' into a measurable signal that reaches roughly 90% accuracy.",
      ],
      motivation: [
        "Debates about media bias are usually anecdotal. I wanted to make political framing measurable so it could be compared across outlets rather than just argued about.",
      ],
      problem: [
        "'Bias' is hard to pin down objectively, and readers rarely have a way to gauge how far Left, Right, or Center a given outlet leans on the same story.",
      ],
      solution: [
        "A fine-tuned BERT classifier trained on a labeled dataset of 2,000+ articles sourced via the NewsAPI, predicting a Left / Right / Center label for each article.",
      ],
      technicalDeepDive: [
        "Over 2,000 news articles were collected through the NewsAPI, structured into a labeled dataset, and preprocessed for training. A fine-tuned BERT model then classifies each article's political lean, reaching approximately 90% accuracy.",
      ],
      features: [
        "Fine-tuned BERT classifier labeling articles Left, Right, or Center.",
        "Labeled dataset of 2,000+ articles sourced via the NewsAPI.",
        "Approximately 90% classification accuracy.",
        "Designed for deployment as a web tool or browser extension.",
      ],
      results: [
        "Reached around 90% accuracy on Left / Right / Center classification, giving readers a quick, data-backed read on an outlet's political framing.",
      ],
      challenges: [
        "Defining 'bias' objectively was the core difficulty, handled by training on a carefully labeled corpus and reporting a framing category rather than claiming absolute truth.",
      ],
      futureScope: [
        "Deploy as a public web tool or browser extension, expand outlet and language coverage, and add real-time article ingestion.",
      ],
      resources: [],
    },
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
      highlights: [
        "Modern minimalist design with India's tricolor-inspired color scheme",
        "Improved accessibility with WCAG 2.1 AA compliance",
        "Reduced navigation steps by 40% for common tasks",
        "Enhanced document preview and sharing capabilities",
        "Mobile-first responsive design for all screen sizes",
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
    detail: {
      tagline: "The site you're reading — a terminal / IDE-themed developer portfolio with routed case-study pages.",
      overview: [
        "This is the portfolio itself: a PowerShell / code-editor-inspired site with a typewriter intro, scroll-synced sidebar navigation, persistent light/dark mode, and dedicated case-study pages for each project (like the DigiLocker one).",
      ],
      motivation: [
        "I wanted a portfolio that felt like me — a developer — rather than a generic template, and that could present real project depth instead of just thumbnails.",
      ],
      problem: [
        "Most template portfolios look interchangeable and bury project detail behind a single screenshot, making it hard to convey the actual work.",
      ],
      solution: [
        "A custom React + Vite + Tailwind site with a consistent terminal aesthetic, routed per-project case-study pages, and a single typed content model so projects are easy to expand.",
      ],
      technicalDeepDive: [
        "A single design-token system drives both light and dark themes from one source of truth. react-router serves the home page and each /projects/:slug route, with a vercel.json rewrite keeping deep links working on refresh. All project content lives in one typed data module, so adding or expanding a project is a content change rather than a layout rewrite.",
      ],
      features: [
        "Terminal / IDE aesthetic built entirely with React + Vite + Tailwind.",
        "Scroll-synced sidebar navigation with smooth section jumps.",
        "Routed per-project case-study pages with shared chrome and theme.",
        "Dark / light mode persisted across routes; deployed on Vercel.",
      ],
      results: [
        "A fast, distinctive portfolio that presents each project as a full case study — exactly what you're reading now.",
      ],
      challenges: [
        "Keeping a consistent terminal aesthetic across many surfaces while staying accessible and responsive, and sharing chrome between the scroll-based home page and the routed detail pages without duplication.",
      ],
      futureScope: [
        "Add Open Graph link previews, optional project screenshots, and a lighter-weight content workflow.",
      ],
      resources: [
        { label: "View Source", url: "https://github.com/Jid3459/UI-UX-Portfolio-assignment", kind: "repo" },
        { label: "Figma design file", url: "https://www.figma.com/design/EuYUXdKvpM5Q4wDy8bujcj/Portfolio-website-homepage-design", kind: "figma" },
      ],
    },
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
    detail: {
      tagline: "My very first GitHub repository — the version-control lab where the journey started.",
      overview: [
        "Mood.DO is my first-ever GitHub repo, created to learn version control hands-on: branching, commits, merges, and remote workflows that every project since has been built on. It's intentionally kept public and archived as a milestone marker — a snapshot of where the engineering journey began.",
      ],
      motivation: [
        "Before building anything real, I needed to actually understand Git — so I made a low-stakes sandbox to practice the fundamentals safely.",
      ],
      problem: [],
      solution: [],
      technicalDeepDive: [],
      features: [
        "Hands-on practice with staging, committing, branching, and merging.",
        "Experiments with remote pushes, pull requests, and resolving conflicts.",
        "A small JavaScript + Vite + Tailwind sandbox used to learn the toolchain.",
      ],
      results: [],
      challenges: [],
      futureScope: [],
      resources: [
        { label: "View Source", url: "https://github.com/Jid3459/Mood.DO", kind: "repo" },
      ],
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
