import { useEffect, useRef, useState } from "react";
import { FolderGit2, Github, ExternalLink, X, ChevronRight } from "lucide-react";

interface ProjectsSectionProps {
  darkMode?: boolean;
}

interface Project {
  name: string;
  subtitle: string;
  description: string;
  details: string[];
  stack: string[];
  github: string;
  demo?: string;
  status: string;
  year: string;
}

const projects: Project[] = [
  {
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
    name: "LinkedIn ReDesign",
    subtitle: "Modern UI/UX Redesign",
    description:
      "A comprehensive UI redesign of the LinkedIn platform focusing on improved user experience, accessibility, and a cleaner visual hierarchy with modern design patterns.",
    details: [
      "High-fidelity Figma prototype covering feed, profile, and messaging surfaces.",
      "WCAG-aware color and contrast system with full light/dark variants.",
      "Component-driven React + Tailwind implementation to validate the design.",
      "Focus on reducing cognitive load and surfacing higher-signal content first.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    github: "#",
    status: "design",
    year: "2025",
  },
  {
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

const statusColor: Record<string, string> = {
  active: "#3fb950",
  complete: "#58d5f8",
  prototype: "#f0883e",
  design: "#d2a8ff",
  archived: "#8b949e",
};

export function ProjectsSection({ darkMode = true }: ProjectsSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const cardBg = darkMode ? "#0c0c0c" : "#ffffff";
  const cardBorder = darkMode ? "#30363d" : "#d0d7de";
  const subtitleColor = darkMode ? "#8b949e" : "#57606a";
  const tagBg = darkMode ? "#161b22" : "#eaeef2";
  const tagText = darkMode ? "#c9d1d9" : "#24292f";
  const tagBorder = darkMode ? "#21262d" : "#d0d7de";

  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  // Stagger-reveal cards as they scroll into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".project-card"));

    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = cards.indexOf(el);
            el.style.animationDelay = `${Math.max(0, idx) * 80}ms`;
            el.classList.add("is-visible");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="px-8 py-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mb-6">
        <span style={{ color: "#484f58", fontSize: "13px" }}>
          <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
          <span style={{ color: "#58d5f8" }}>$</span> ls projects/ --detail
        </span>
      </div>

      <h2 className="mb-6" style={{ color: headingColor, fontSize: "22px", fontWeight: 700 }}>
        <FolderGit2 size={20} className="inline mr-2" style={{ color: "#3fb950" }} />
        Projects
      </h2>

      <p
        className="mb-6 max-w-2xl"
        style={{ color: subtitleColor, fontSize: "12px", lineHeight: 1.7 }}
      >
        <span style={{ color: "#ff7b72" }}>{"// "}</span>
        Click any project card to see full details and the repo link.
      </p>

      {/* Grid of cards */}
      <div
        ref={gridRef}
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          maxWidth: "1100px",
        }}
      >
        {projects.map((project, i) => (
          <button
            key={i}
            onClick={() => setSelected(project)}
            className="project-card text-left rounded-lg p-4 flex flex-col"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={project.status === "active" ? "project-status-active" : ""}
                style={{
                  color: statusColor[project.status] ?? "#8b949e",
                  fontSize: "10px",
                  padding: "2px 6px",
                  border: `1px solid ${statusColor[project.status] ?? "#8b949e"}`,
                  borderRadius: "4px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {project.status}
              </span>
              <span style={{ color: "#484f58", fontSize: "10px" }}>{project.year}</span>
            </div>

            <p style={{ color: "#4afa7b", fontSize: "14px", fontWeight: 700, marginBottom: "2px" }}>
              {project.name}
            </p>
            <p style={{ color: subtitleColor, fontSize: "11px", marginBottom: "8px" }}>
              {project.subtitle}
            </p>
            <p
              style={{
                color: darkMode ? "#c9d1d9" : "#24292f",
                fontSize: "12px",
                lineHeight: 1.6,
                marginBottom: "12px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="project-tag"
                  style={{
                    backgroundColor: tagBg,
                    color: tagText,
                    fontSize: "10px",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    border: `1px solid ${tagBorder}`,
                  }}
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span style={{ color: "#484f58", fontSize: "10px", padding: "2px 4px" }}>
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            <div
              className="mt-auto flex items-center gap-1"
              style={{ color: "#58d5f8", fontSize: "11px" }}
            >
              view details
              <span className="project-cta-arrow inline-flex">
                <ChevronRight size={12} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="project-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="project-modal rounded-lg overflow-hidden w-full"
            style={{
              maxWidth: "720px",
              maxHeight: "90vh",
              backgroundColor: darkMode ? "#0c0c0c" : "#ffffff",
              border: `1px solid ${cardBorder}`,
              display: "flex",
              flexDirection: "column",
              fontFamily: "'JetBrains Mono', monospace",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-2 shrink-0"
              style={{
                backgroundColor: "#1a1a2e",
                borderBottom: `1px solid ${cardBorder}`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
                </div>
                <span style={{ color: "#8b949e", fontSize: "11px", marginLeft: "8px" }}>
                  {selected.name.toLowerCase().replace(/\s+/g, "_")}.md
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="rounded p-1"
                style={{ color: "#8b949e", backgroundColor: "transparent", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#e6edf3")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b949e")}
              >
                <X size={14} />
              </button>
            </div>

            {/* Content (scrollable) */}
            <div className="p-6 overflow-y-auto" style={{ flex: 1 }}>
              <div className="mb-4" style={{ color: "#484f58", fontSize: "12px" }}>
                <span style={{ color: "#3fb950" }}>~/projects</span>{" "}
                <span style={{ color: "#58d5f8" }}>$</span> cat{" "}
                <span style={{ color: "#e6edf3" }}>
                  {selected.name.toLowerCase().replace(/\s+/g, "_")}.md
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  style={{
                    color: statusColor[selected.status] ?? "#8b949e",
                    fontSize: "10px",
                    padding: "2px 6px",
                    border: `1px solid ${statusColor[selected.status] ?? "#8b949e"}`,
                    borderRadius: "4px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {selected.status}
                </span>
                <span style={{ color: "#484f58", fontSize: "11px" }}>{selected.year}</span>
              </div>

              <h3 style={{ color: "#4afa7b", fontSize: "20px", fontWeight: 700 }}>
                # {selected.name}
              </h3>
              <p style={{ color: subtitleColor, fontSize: "13px", marginBottom: "16px" }}>
                {selected.subtitle}
              </p>

              <p
                style={{
                  color: darkMode ? "#e6edf3" : "#1f2328",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}
              >
                {selected.description}
              </p>

              <p
                style={{
                  color: headingColor,
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#ff7b72" }}>{"## "}</span>Highlights
              </p>
              <ul className="mb-5 flex flex-col gap-1.5">
                {selected.details.map((d, idx) => (
                  <li
                    key={idx}
                    style={{
                      color: darkMode ? "#c9d1d9" : "#24292f",
                      fontSize: "12px",
                      lineHeight: 1.7,
                      paddingLeft: "18px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "#3fb950",
                      }}
                    >
                      ›
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <p
                style={{
                  color: headingColor,
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#ff7b72" }}>{"## "}</span>Tech stack
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selected.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      backgroundColor: tagBg,
                      color: tagText,
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      border: `1px solid ${tagBorder}`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.github && selected.github !== "#" ? (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded"
                    style={{
                      backgroundColor: "#21262d",
                      color: "#e6edf3",
                      fontSize: "12px",
                      border: "1px solid #30363d",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#30363d")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#21262d")
                    }
                  >
                    <Github size={14} /> View on GitHub
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center gap-2 px-3 py-2 rounded"
                    style={{
                      backgroundColor: darkMode ? "#161b22" : "#eaeef2",
                      color: "#8b949e",
                      fontSize: "12px",
                      border: "1px dashed #30363d",
                    }}
                  >
                    <Github size={14} /> Repo coming soon
                  </span>
                )}
                {selected.demo && selected.demo !== "#" && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded"
                    style={{
                      backgroundColor: "#238636",
                      color: "#ffffff",
                      fontSize: "12px",
                      border: "1px solid #2ea043",
                      textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={14} /> Live demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
