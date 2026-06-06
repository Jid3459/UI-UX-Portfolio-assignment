import type { ReactNode } from "react";
import {
  Layers, Lightbulb, Target, CheckCircle2, Cpu, ListChecks, TrendingUp,
  AlertTriangle, Rocket, Link2, Github, ExternalLink, Figma, ImageIcon,
} from "lucide-react";
import type { Project, ProjectDetail, ProjectResource } from "../data/projects";
import { caseTokens, SectionMarker, SectionRow, type CaseTokens } from "./caseStudyKit";

interface ProjectCaseStudyProps {
  project: Project;
  detail: ProjectDetail;
  darkMode: boolean;
}

/* -----------------------------------------------------------
   Detailed case-study layout for technical (non-UX) projects.
   Reuses the shared kit (ghost section numbers, markers) so it
   matches DigiLocker, and follows a narrative flow:
   Overview → Motivation → The Problem → The Solution →
   Technical Deep Dive → Key Features → Results & Impact →
   Challenges Faced → Future Scope → Resources.
   Empty sections are skipped; numbering stays sequential.
   ----------------------------------------------------------- */
export function ProjectCaseStudy({ project, detail, darkMode }: ProjectCaseStudyProps) {
  const t = caseTokens(darkMode);

  const blocks: { title: string; icon: ReactNode; accent: string; content: ReactNode }[] = [];

  const addParagraphs = (title: string, icon: ReactNode, accent: string, items: string[]) => {
    if (!items.length) return;
    blocks.push({
      title,
      icon,
      accent,
      content: (
        <Card t={t} accent={accent}>
          <Paragraphs items={items} t={t} />
        </Card>
      ),
    });
  };

  addParagraphs("OVERVIEW", <Layers size={22} />, "#3fb950", detail.overview);
  addParagraphs("MOTIVATION", <Lightbulb size={22} />, "#58d5f8", detail.motivation);
  addParagraphs("THE PROBLEM", <Target size={22} />, "#f85149", detail.problem);
  addParagraphs("THE SOLUTION", <CheckCircle2 size={22} />, "#3fb950", detail.solution);
  addParagraphs("TECHNICAL DEEP DIVE", <Cpu size={22} />, "#58d5f8", detail.technicalDeepDive);

  if (detail.features.length) {
    blocks.push({
      title: "KEY FEATURES",
      icon: <ListChecks size={22} />,
      accent: "#3fb950",
      content: (
        <Card t={t}>
          <BulletList items={detail.features} t={t} marker="›" markerColor="#3fb950" />
        </Card>
      ),
    });
  }

  addParagraphs("RESULTS & IMPACT", <TrendingUp size={22} />, "#3fb950", detail.results);
  addParagraphs("CHALLENGES FACED", <AlertTriangle size={22} />, "#f0883e", detail.challenges);
  addParagraphs("FUTURE SCOPE", <Rocket size={22} />, "#d2a8ff", detail.futureScope);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mx-auto px-6 md:px-8" style={{ maxWidth: "1080px" }}>
        {/* Hero */}
        <section className="py-10">
          <div className="mb-4" style={{ color: "#484f58", fontSize: "12px" }}>
            <span style={{ color: "#3fb950" }}>~/projects</span>{" "}
            <span style={{ color: "#58d5f8" }}>$</span> open{" "}
            <span style={{ color: t.heading }}>{project.slug}</span>
          </div>

          <h1 className="mt-2" style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#4afa7b" }}># </span>
            <span style={{ color: t.heading }}>{project.name}</span>
          </h1>
          <p style={{ color: "#58d5f8", fontSize: "14px", marginTop: "8px" }}>{project.subtitle}</p>
          <p style={{ color: t.subtitle, fontSize: "15px", lineHeight: 1.7, marginTop: "14px", maxWidth: "680px" }}>
            {detail.tagline}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((s) => (
              <span key={s} style={t.tagPill}>{s.toUpperCase()}</span>
            ))}
          </div>

          {/* Quick links */}
          {detail.resources.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {detail.resources.map((r) => (
                <ResourceButton key={r.url} resource={r} />
              ))}
            </div>
          )}
        </section>

        {/* Numbered narrative sections */}
        {blocks.map((b, i) => (
          <SectionRow
            key={b.title}
            reverse={i % 2 === 1}
            marker={<SectionMarker icon={b.icon} title={b.title} index={i + 1} t={t} accent={b.accent} />}
          >
            {b.content}
          </SectionRow>
        ))}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Card({ children, t, accent }: { children: ReactNode; t: CaseTokens; accent?: string }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{
        backgroundColor: t.cardBg,
        border: `1px solid ${t.border}`,
        borderLeft: accent ? `3px solid ${accent}` : `1px solid ${t.border}`,
      }}
    >
      {children}
    </div>
  );
}

function Paragraphs({ items, t }: { items: string[]; t: CaseTokens }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i} style={{ color: t.body, fontSize: "14px", lineHeight: 1.85, marginBottom: i < items.length - 1 ? "12px" : 0 }}>
          {p}
        </p>
      ))}
    </>
  );
}

function BulletList({ items, t, marker, markerColor }: { items: string[]; t: CaseTokens; marker: string; markerColor: string }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3" style={{ color: t.body, fontSize: "13.5px", lineHeight: 1.65 }}>
          <span style={{ color: markerColor, marginTop: "1px", flexShrink: 0 }}>{marker}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ResourceButton({ resource }: { resource: ProjectResource }) {
  const map: Record<ProjectResource["kind"], { icon: ReactNode; bg: string; color: string; border: string }> = {
    repo: { icon: <Github size={14} />, bg: "#21262d", color: "#e6edf3", border: "#30363d" },
    demo: { icon: <ExternalLink size={14} />, bg: "#238636", color: "#ffffff", border: "#2ea043" },
    figma: { icon: <Figma size={14} />, bg: "#21262d", color: "#d2a8ff", border: "#3d2f57" },
    screenshots: { icon: <ImageIcon size={14} />, bg: "#21262d", color: "#58d5f8", border: "#30363d" },
    video: { icon: <ExternalLink size={14} />, bg: "#21262d", color: "#58d5f8", border: "#30363d" },
    docs: { icon: <ExternalLink size={14} />, bg: "#21262d", color: "#e6edf3", border: "#30363d" },
    other: { icon: <Link2 size={14} />, bg: "#21262d", color: "#e6edf3", border: "#30363d" },
  };
  const s = map[resource.kind];
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 rounded"
      style={{ backgroundColor: s.bg, color: s.color, fontSize: "12px", border: `1px solid ${s.border}`, textDecoration: "none" }}
    >
      {s.icon} {resource.label}
    </a>
  );
}
