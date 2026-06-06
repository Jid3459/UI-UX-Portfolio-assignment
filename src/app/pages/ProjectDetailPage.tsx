import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ChevronRight, ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { useDarkMode } from "../theme/useDarkMode";
import { getProjectBySlug, statusColor } from "../data/projects";
import { CaseStudyView } from "./CaseStudyView";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

const SECTIONS = ["introduction", "education", "experience", "hobbies", "projects", "contact"];

export function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const project = getProjectBySlug(slug);

  const bg = darkMode ? "#0d1117" : "#f0f2f4";
  const headerBg = darkMode ? "#161b22" : "#ffffff";
  const headerBorder = darkMode ? "#30363d" : "#d0d7de";
  const textPrimary = darkMode ? "#e6edf3" : "#1f2328";
  const textSecondary = darkMode ? "#8b949e" : "#656d76";

  // Always start a detail page scrolled to the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Sidebar nav from a detail page returns home and scrolls to the section.
  const goToSection = (id: string) => {
    setMobileNavOpen(false);
    navigate({ pathname: "/", hash: id });
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: bg, fontFamily: "'JetBrains Mono', monospace", transition: "background-color 0.3s ease" }}
    >
      <Sidebar activeSection="projects" onNavClick={goToSection} darkMode={darkMode} />

      <div className="flex flex-col flex-1 overflow-hidden md:ml-[220px]">
        <TopBar
          darkMode={darkMode}
          onToggleDark={toggleDarkMode}
          mobileNavOpen={mobileNavOpen}
          onToggleMobileNav={() => setMobileNavOpen((v) => !v)}
        />

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div
            className="md:hidden absolute top-[52px] left-0 right-0 z-50 px-4 py-3 flex flex-col gap-1"
            style={{ backgroundColor: headerBg, borderBottom: `1px solid ${headerBorder}` }}
          >
            {SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className="text-left px-3 py-2 rounded capitalize"
                style={{ fontSize: "12px", color: textSecondary, backgroundColor: "transparent", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {id}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto" style={{ color: textPrimary }}>
          {/* Breadcrumb */}
          <div
            className="px-8 py-2 flex items-center gap-1 sticky top-0 z-10"
            style={{
              backgroundColor: bg,
              borderBottom: `1px solid ${darkMode ? "#21262d" : "#e8ecf0"}`,
              fontSize: "11px",
              color: "#484f58",
            }}
          >
            <Link to="/" style={{ color: "#3fb950", textDecoration: "none" }}>~/portfolio</Link>
            <ChevronRight size={10} />
            <Link to={{ pathname: "/", hash: "projects" }} style={{ color: "#58d5f8", textDecoration: "none" }}>projects</Link>
            <ChevronRight size={10} />
            <span style={{ color: textSecondary }}>{slug}</span>
          </div>

          {/* Back button — returns to the home page project list */}
          <div className="px-6 md:px-8 pt-5">
            <Link
              to={{ pathname: "/", hash: "projects" }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded"
              style={{
                color: textPrimary,
                fontSize: "12px",
                textDecoration: "none",
                backgroundColor: darkMode ? "#21262d" : "#eaeef2",
                border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#3fb950")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = darkMode ? "#30363d" : "#d0d7de")}
            >
              <ArrowLeft size={14} /> all projects
            </Link>
          </div>

          {renderBody(project, darkMode)}

          {/* Footer */}
          <footer
            className="px-8 py-6 mt-4"
            style={{
              borderTop: `1px solid ${darkMode ? "#21262d" : "#e8ecf0"}`,
              color: "#484f58",
              fontSize: "11px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#3fb950" }}>&lt;</span>
            Built with React + Tailwind CSS
            <span style={{ color: "#3fb950" }}> /&gt;</span>
            {" · "}
            <span style={{ color: "#58d5f8" }}>Jidneya Kadam</span>
            {" · "}
            {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
}

/* Pick the right body for a project: UX case study, technical case study,
   compact generic fallback, or 404. */
function renderBody(project: ReturnType<typeof getProjectBySlug>, darkMode: boolean) {
  if (!project) return <NotFound darkMode={darkMode} />;
  if (project.caseStudy) return <CaseStudyView project={project} caseStudy={project.caseStudy} darkMode={darkMode} />;
  if (project.detail) return <ProjectCaseStudy project={project} detail={project.detail} darkMode={darkMode} />;
  return <GenericDetail project={project} darkMode={darkMode} />;
}

/* ---------- Compact layout for projects without a full case study ---------- */
function GenericDetail({ project, darkMode }: { project: ReturnType<typeof getProjectBySlug> & {}; darkMode: boolean }) {
  const heading = darkMode ? "#e6edf3" : "#1f2328";
  const subtitle = darkMode ? "#8b949e" : "#57606a";
  const body = darkMode ? "#c9d1d9" : "#24292f";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const tagBg = darkMode ? "#161b22" : "#eaeef2";

  return (
    <div className="px-8 py-8" style={{ maxWidth: "820px", fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
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
        <span style={{ color: "#484f58", fontSize: "11px" }}>{project.year}</span>
      </div>

      <h1 style={{ color: "#4afa7b", fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700 }}># {project.name}</h1>
      <p style={{ color: subtitle, fontSize: "14px", marginTop: "6px", marginBottom: "20px" }}>{project.subtitle}</p>

      <p style={{ color: body, fontSize: "13px", lineHeight: 1.8, marginBottom: "24px" }}>{project.description}</p>

      <h2 style={{ color: heading, fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>
        <span style={{ color: "#ff7b72" }}>## </span>Highlights
      </h2>
      <ul className="mb-8 flex flex-col gap-2">
        {project.details.map((d, i) => (
          <li key={i} style={{ color: body, fontSize: "13px", lineHeight: 1.7, paddingLeft: "20px", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "#3fb950" }}>›</span>
            {d}
          </li>
        ))}
      </ul>

      <h2 style={{ color: heading, fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>
        <span style={{ color: "#ff7b72" }}>## </span>Tech stack
      </h2>
      <div className="flex flex-wrap gap-1.5 mb-8">
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              backgroundColor: tagBg,
              color: body,
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "4px",
              border: `1px solid ${border}`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.github && project.github !== "#" ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded"
            style={{ backgroundColor: "#21262d", color: "#e6edf3", fontSize: "12px", border: "1px solid #30363d", textDecoration: "none" }}
          >
            <Github size={14} /> View on GitHub
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-2 px-3 py-2 rounded"
            style={{ backgroundColor: tagBg, color: "#8b949e", fontSize: "12px", border: "1px dashed #30363d" }}
          >
            <Github size={14} /> Repo coming soon
          </span>
        )}
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded"
            style={{ backgroundColor: "#238636", color: "#fff", fontSize: "12px", border: "1px solid #2ea043", textDecoration: "none" }}
          >
            <ExternalLink size={14} /> Live demo
          </a>
        )}
      </div>
    </div>
  );
}

function NotFound({ darkMode }: { darkMode: boolean }) {
  const heading = darkMode ? "#e6edf3" : "#1f2328";
  return (
    <div className="px-8 py-16" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <p style={{ color: "#ff7b72", fontSize: "13px", marginBottom: "8px" }}>
        <span style={{ color: "#3fb950" }}>~/projects</span> $ cat: project not found
      </p>
      <h1 style={{ color: heading, fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>404 — no such project</h1>
      <Link to={{ pathname: "/", hash: "projects" }} style={{ color: "#58d5f8", fontSize: "13px" }}>
        ← back to all projects
      </Link>
    </div>
  );
}
