import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FolderGit2, ChevronRight } from "lucide-react";
import { projects, statusColor } from "../data/projects";

interface ProjectsSectionProps {
  darkMode?: boolean;
}

export function ProjectsSection({ darkMode = true }: ProjectsSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const cardBg = darkMode ? "#0c0c0c" : "#ffffff";
  const cardBorder = darkMode ? "#30363d" : "#d0d7de";
  const subtitleColor = darkMode ? "#8b949e" : "#57606a";
  const tagBg = darkMode ? "#161b22" : "#eaeef2";
  const tagText = darkMode ? "#c9d1d9" : "#24292f";
  const tagBorder = darkMode ? "#21262d" : "#d0d7de";

  const gridRef = useRef<HTMLDivElement>(null);

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
        Click any project to open its dedicated page with full details.
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
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="project-card text-left rounded-lg p-4 flex flex-col"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              cursor: "pointer",
              textDecoration: "none",
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
              {project.caseStudy ? "view case study" : "view details"}
              <span className="project-cta-arrow inline-flex">
                <ChevronRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
