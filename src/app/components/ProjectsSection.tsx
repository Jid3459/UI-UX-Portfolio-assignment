import { FolderGit2 } from "lucide-react";

interface ProjectsSectionProps {
  darkMode?: boolean;
}

const projects = [
  {
    name: "ClauseGuard",
    subtitle: "Compliance and Harmful Clauses Detector",
    description:
      "AI-powered legal document analysis tool that detects harmful, non-compliant, or ambiguous clauses in contracts and agreements using NLP and transformer models.",
    stack: ["Python", "FastAPI", "Transformers", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Skads745/privacy-chatbot",
    demo: "#",
  },
  {
    name: "LinkedIn ReDesign",
    subtitle: "Modern UI/UX Redesign",
    description:
      "A comprehensive UI redesign of the LinkedIn platform focusing on improved user experience, accessibility, and a cleaner visual hierarchy with modern design patterns.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    github: "#",
    demo: "#",
  },
  {
    name: "Geopolitical News Bias Detector",
    subtitle: "ML-Powered Media Bias Analysis",
    description:
      "Machine learning model that analyzes news articles and identifies geopolitical bias patterns across different news sources using sentiment analysis and NLP techniques.",
    stack: ["Python", "scikit-learn", "BERT", "Flask", "React", "D3.js"],
    github: "#",
    demo: "#",
  },
  {
    name: "SkinTara",
    subtitle: "Skin Disease Detector",
    description:
      "Deep learning application for non-invasive skin disease detection from images. Uses a fine-tuned CNN model to classify multiple dermatological conditions with high accuracy.",
    stack: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React Native"],
    github: "https://github.com/knishkagithub/Dermakure_new_phonepe",
    demo: "#",
  },
];

export function ProjectsSection({ darkMode = true }: ProjectsSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";

  return (
    <section id="projects" className="px-8 py-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* PS-style header */}
      <div className="mb-6">
        <span style={{ color: "#484f58", fontSize: "13px" }}>
          <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
          <span style={{ color: "#58d5f8" }}>$</span> ls projects/
        </span>
      </div>

      <h2 className="mb-6" style={{ color: headingColor, fontSize: "22px", fontWeight: 700 }}>
        <FolderGit2 size={20} className="inline mr-2" style={{ color: "#3fb950" }} />
        Projects
      </h2>

      {/* PowerShell-style terminal */}
      <div
        className="rounded-lg overflow-hidden max-w-3xl"
        style={{
          backgroundColor: "#0c0c0c",
          border: "1px solid #30363d",
        }}
      >
        {/* Title bar mimicking Windows Terminal */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ backgroundColor: "#1a1a2e", borderBottom: "1px solid #30363d" }}
        >
          <div className="flex items-center gap-1 mr-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
          </div>
          <span style={{ color: "#6e7681", fontSize: "11px" }}>Windows PowerShell</span>
          <span style={{ color: "#30363d", fontSize: "11px", marginLeft: "4px" }}>×</span>
        </div>

        {/* Terminal content */}
        <div className="p-5 flex flex-col gap-6">
          {projects.map((project, i) => (
            <div key={i}>
              {/* Project name – green like PowerShell output */}
              <p
                style={{
                  color: "#4afa7b",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                {project.name}
              </p>
              <p
                style={{
                  color: "#e6edf3",
                  fontSize: "12px",
                  marginBottom: "4px",
                  lineHeight: "1.6",
                }}
              >
                {project.description}
              </p>
              <p
                style={{
                  color: "#8b949e",
                  fontSize: "12px",
                  marginBottom: "6px",
                }}
              >
                Tech Stack:{" "}
                <span style={{ color: "#e6edf3" }}>{(project.stack ?? []).join(", ")}</span>
              </p>

              {/* Separator */}
              {i < projects.length - 1 && (
                <div
                  className="mt-5"
                  style={{ height: "1px", backgroundColor: "#21262d" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}