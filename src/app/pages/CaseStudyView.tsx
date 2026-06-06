import { useState } from "react";
import { Figma, Layers, AlertTriangle, Palette, Sparkles, Smartphone, ExternalLink, ImageIcon } from "lucide-react";
import type { CaseStudy, Project, ScreenComparison } from "../data/projects";
import { caseTokens, SectionMarker, SectionRow, Pill, type CaseTokens } from "./caseStudyKit";

interface CaseStudyViewProps {
  project: Project;
  caseStudy: CaseStudy;
  darkMode: boolean;
}

/* -----------------------------------------------------------
   Rich UX case-study layout for DigiLocker. Mirrors the
   reference's storytelling (ghost section numbers, a numbered
   design-process timeline, and before/after screen comparisons)
   but stays in the site's terminal / IDE theme: JetBrains Mono,
   GitHub-dark palette, green/cyan accents, ## markdown headings.
   ----------------------------------------------------------- */
export function CaseStudyView({ project, caseStudy, darkMode }: CaseStudyViewProps) {
  const t = caseTokens(darkMode);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mx-auto px-6 md:px-8" style={{ maxWidth: "1080px" }}>
        {/* ---------------- Hero ---------------- */}
        <section className="grid md:grid-cols-2 gap-8 items-center py-10">
          <div>
            <div className="mb-4" style={{ color: "#484f58", fontSize: "12px" }}>
              <span style={{ color: "#3fb950" }}>~/projects</span>{" "}
              <span style={{ color: "#58d5f8" }}>$</span> open{" "}
              <span style={{ color: t.heading }}>{project.slug}</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span
                style={{
                  color: "#3fb950",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: "4px 12px",
                  border: "1px solid #3fb950",
                  borderRadius: "999px",
                }}
              >
                UI/UX CASE STUDY
              </span>
              <span style={{ color: t.subtitle, fontSize: "12px" }}>Figma</span>
            </div>

            <h1 style={{ fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              <span style={{ color: t.heading }}>{caseStudy.title}</span>
              <br />
              <span style={{ color: "#4afa7b" }}>{caseStudy.titleAccent}</span>
            </h1>

            <p style={{ color: t.subtitle, fontSize: "15px", lineHeight: 1.7, marginTop: "18px", maxWidth: "520px" }}>
              {caseStudy.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {caseStudy.tags.map((tag) => (
                <span key={tag} style={t.tagPill}>{tag.toUpperCase()}</span>
              ))}
            </div>
          </div>

          {/* Hero phone */}
          <div className="flex flex-col items-center">
            <PhoneImage src={caseStudy.heroImage} alt="DigiLocker landing screen" darkMode={darkMode} maxWidth="300px" />
            {caseStudy.heroImageCaption && (
              <span style={{ color: "#484f58", fontSize: "11px", letterSpacing: "0.15em", marginTop: "12px", textTransform: "uppercase" }}>
                {caseStudy.heroImageCaption}
              </span>
            )}
          </div>
        </section>

        {/* ---------------- Overview (Section 01) ---------------- */}
        <SectionRow
          marker={<SectionMarker icon={<Layers size={22} />} title="OVERVIEW" index={1} t={t} />}
        >
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}`, borderLeft: "3px solid #3fb950" }}
          >
            <p style={{ color: t.body, fontSize: "15px", lineHeight: 1.85 }}>{caseStudy.overview}</p>
          </div>
        </SectionRow>

        {/* ---------------- The Problem (Section 02) — reversed ---------------- */}
        <SectionRow
          reverse
          marker={<SectionMarker icon={<AlertTriangle size={22} />} title="THE PROBLEM" index={2} t={t} accent="#f85149" />}
        >
          <div
            className="rounded-lg p-6"
            style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}`, borderLeft: "3px solid #f85149" }}
          >
            <ul className="flex flex-col gap-4">
              {caseStudy.problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: t.body, fontSize: "14px", lineHeight: 1.6 }}>
                  <span style={{ color: "#58d5f8", marginTop: "2px", flexShrink: 0 }}>●</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </SectionRow>

        {/* ---------------- Design Process (Section 03) ---------------- */}
        <SectionRow
          marker={<SectionMarker icon={<Palette size={22} />} title="DESIGN PROCESS" index={3} t={t} />}
        >
          <ProcessTimeline steps={caseStudy.process} t={t} />
        </SectionRow>

        {/* ---------------- Highlights (Section 04) ---------------- */}
        <SectionRow
          marker={<SectionMarker icon={<Sparkles size={22} />} title="HIGHLIGHTS" index={4} t={t} />}
        >
          <div className="flex flex-wrap gap-2.5">
            {caseStudy.highlights.map((h, i) => {
              const baseBorder = darkMode ? "#30363d" : "#d0d7de";
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    padding: "9px 16px",
                    borderRadius: "999px",
                    border: `1px solid ${baseBorder}`,
                    backgroundColor: t.cardBg,
                    color: t.body,
                    fontSize: "12.5px",
                    lineHeight: 1.4,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    transition: "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.borderColor = "#3fb950";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 6px 16px -8px rgba(63,185,80,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.borderColor = baseBorder;
                    el.style.transform = "none";
                    el.style.boxShadow = "none";
                  }}
                >
                  {h}
                </span>
              );
            })}
          </div>
        </SectionRow>
      </div>

      {/* ---------------- Before / After screens (full bleed-ish) ---------------- */}
      <div className="mx-auto px-6 md:px-8 mt-4" style={{ maxWidth: "1080px" }}>
        <h2 className="mb-2 flex items-center gap-2" style={{ color: t.heading, fontSize: "20px", fontWeight: 700 }}>
          <span style={{ color: "#3fb950" }}><Smartphone size={18} /></span>
          <span><span style={{ color: "#ff7b72" }}>## </span>Before &amp; After</span>
        </h2>
        <p style={{ color: t.subtitle, fontSize: "13px", marginBottom: "8px" }}>
          <span style={{ color: "#ff7b72" }}>{"// "}</span>
          Original DigiLocker UI on the left, redesigned screens on the right.
        </p>

        {caseStudy.screens.map((screen, i) => (
          <ScreenBlock key={screen.label} screen={screen} index={i + 1} darkMode={darkMode} t={t} figma={caseStudy.figma} />
        ))}
      </div>

      {/* ---------------- Figma CTA ---------------- */}
      {caseStudy.figma && (
        <div className="mx-auto px-6 md:px-8 mt-10 mb-12" style={{ maxWidth: "1080px" }}>
          <a
            href={caseStudy.figma}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded"
            style={{ backgroundColor: "#238636", color: "#fff", fontSize: "13px", border: "1px solid #2ea043", textDecoration: "none" }}
          >
            <Figma size={15} /> Open the full Figma file
          </a>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Layout helpers
   ============================================================ */

/** Vertical numbered timeline for the design-process steps. */
function ProcessTimeline({ steps, t }: { steps: CaseStudy["process"]; t: CaseTokens }) {
  return (
    <div className="relative">
      <div className="flex flex-col gap-7">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex gap-4">
            {/* connector line */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                style={{ position: "absolute", left: "17px", top: "36px", bottom: "-28px", width: "1px", backgroundColor: t.border }}
              />
            )}
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: "36px", height: "36px", border: "1px solid #58d5f8", color: "#58d5f8", fontSize: "12px", fontWeight: 700, backgroundColor: t.cardBg }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="pt-1">
              <p style={{ color: t.heading, fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {step.title}
              </p>
              <p style={{ color: t.subtitle, fontSize: "13px", lineHeight: 1.7, marginTop: "4px" }}>{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One before/after screen comparison + key improvements. */
function ScreenBlock({ screen, index, darkMode, t, figma }: { screen: ScreenComparison; index: number; darkMode: boolean; t: CaseTokens; figma?: string }) {
  const padded = String(index).padStart(2, "0");
  return (
    <div className="py-8" style={{ borderTop: `1px solid ${t.border}`, marginTop: "24px" }}>
      {/* Phones */}
      <div className="relative grid md:grid-cols-2 gap-8 items-start">
        {/* center divider on md+ */}
        <span aria-hidden className="hidden md:block" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: "#f85149", opacity: 0.5 }} />

        <div className="flex flex-col items-center">
          <Pill label="BEFORE" color={t.subtitle} border={t.border} />
          <div className="mt-4 w-full flex justify-center">
            <PhoneImage src={screen.beforeImage} alt={`${screen.label} — before`} darkMode={darkMode} maxWidth="260px" muted />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Pill label="AFTER" color="#58d5f8" border="#58d5f8" />
            <Pill label={`SCREEN ${padded}`} color="#58d5f8" border="#58d5f8" />
          </div>
          <div className="mt-4 w-full flex justify-center">
            <PhoneImage src={screen.afterImage} alt={`${screen.label} — after`} darkMode={darkMode} maxWidth="260px" />
          </div>
        </div>
      </div>

      {/* Descriptions + improvements */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <p style={{ color: "#484f58", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Original UI</p>
          <h3 style={{ color: t.heading, fontSize: "20px", fontWeight: 700, marginTop: "6px" }}>{screen.label}</h3>
          <p style={{ color: t.subtitle, fontSize: "13px", lineHeight: 1.75, marginTop: "10px" }}>{screen.description}</p>
          {figma && (
            <a
              href={figma}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4"
              style={{ color: "#58d5f8", fontSize: "12px", textDecoration: "none" }}
            >
              View full screen <ExternalLink size={12} />
            </a>
          )}
        </div>

        <div>
          <p style={{ color: "#58d5f8", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
            Key Improvements
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-3">
            {screen.improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2" style={{ color: t.body, fontSize: "12px", lineHeight: 1.6 }}>
                <span style={{ color: "#3fb950", marginTop: "1px", flexShrink: 0 }}>›</span>
                {imp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Phone image with graceful fallback to a placeholder slot.
   Pre-wired src paths show the slot until the PNG is dropped in.
   ============================================================ */
function PhoneImage({ src, alt, darkMode, maxWidth = "260px", muted }: { src?: string; alt: string; darkMode: boolean; maxWidth?: string; muted?: boolean }) {
  const [errored, setErrored] = useState(false);
  const border = darkMode ? "#30363d" : "#d0d7de";
  const placeholderBg = darkMode ? "#0c0c0c" : "#f6f8fa";

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        style={{
          width: "100%",
          maxWidth,
          borderRadius: "18px",
          border: `1px solid ${border}`,
          display: "block",
          opacity: muted ? 0.92 : 1,
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-2"
      style={{
        width: "100%",
        maxWidth,
        aspectRatio: "9 / 19",
        backgroundColor: placeholderBg,
        border: `1px dashed ${darkMode ? "#3d444d" : "#c0c8d0"}`,
        borderRadius: "18px",
        color: "#484f58",
        textAlign: "center",
        padding: "16px",
      }}
    >
      <ImageIcon size={22} />
      <span style={{ fontSize: "11px" }}>image slot</span>
      <span style={{ fontSize: "10px", color: "#58d5f8", wordBreak: "break-all" }}>{src}</span>
    </div>
  );
}
