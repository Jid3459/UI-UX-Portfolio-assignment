import type { ReactNode } from "react";

/* -----------------------------------------------------------
   Shared visual language for every project detail page so the
   UX case study (DigiLocker) and the technical case studies all
   feel cohesive: terminal/IDE palette, ghost section numbers,
   icon-tile markers, JetBrains Mono.
   ----------------------------------------------------------- */

export type CaseTokens = ReturnType<typeof caseTokens>;

export function caseTokens(darkMode: boolean) {
  return {
    heading: darkMode ? "#e6edf3" : "#1f2328",
    subtitle: darkMode ? "#8b949e" : "#57606a",
    body: darkMode ? "#c9d1d9" : "#24292f",
    border: darkMode ? "#30363d" : "#d0d7de",
    cardBg: darkMode ? "#0c0c0c" : "#ffffff",
    ghost: darkMode ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.04)",
    tileBg: darkMode ? "#161b22" : "#eaeef2",
    tagPill: {
      backgroundColor: darkMode ? "#161b22" : "#eaeef2",
      color: darkMode ? "#c9d1d9" : "#24292f",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.08em",
      padding: "5px 12px",
      borderRadius: "999px",
      border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
    },
  };
}

/** Two-column row: section marker beside its content, optionally reversed. */
export function SectionRow({ marker, children, reverse }: { marker: ReactNode; children: ReactNode; reverse?: boolean }) {
  return (
    <section className="py-8">
      <div className={`grid gap-8 items-start ${reverse ? "md:grid-cols-[1fr_240px]" : "md:grid-cols-[240px_1fr]"}`}>
        {reverse ? (
          <>
            <div className="order-2 md:order-1">{children}</div>
            <div className="order-1 md:order-2">{marker}</div>
          </>
        ) : (
          <>
            <div>{marker}</div>
            <div>{children}</div>
          </>
        )}
      </div>
    </section>
  );
}

/** Icon tile + big title + SECTION 0X badge, with a large faded ghost number. */
export function SectionMarker({
  icon,
  title,
  index,
  t,
  accent = "#3fb950",
}: {
  icon: ReactNode;
  title: string;
  index: number;
  t: CaseTokens;
  accent?: string;
}) {
  const padded = String(index).padStart(2, "0");
  return (
    <div className="relative">
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-18px",
          left: "8px",
          fontSize: "120px",
          fontWeight: 800,
          lineHeight: 1,
          color: t.ghost,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {padded}
      </span>
      <div className="relative">
        <div
          className="flex items-center justify-center rounded-xl mb-4"
          style={{ width: "52px", height: "52px", backgroundColor: t.tileBg, border: `1px solid ${t.border}`, color: accent }}
        >
          {icon}
        </div>
        <h2 style={{ color: t.heading, fontSize: "22px", fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1.15 }}>
          {title}
        </h2>
        <span
          className="inline-block mt-3"
          style={{
            color: "#58d5f8",
            fontSize: "10px",
            letterSpacing: "0.12em",
            padding: "3px 10px",
            border: "1px solid #58d5f8",
            borderRadius: "999px",
          }}
        >
          SECTION {padded}
        </span>
      </div>
    </div>
  );
}

export function Pill({ label, color, border }: { label: string; color: string; border: string }) {
  return (
    <span
      style={{
        color,
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        padding: "4px 12px",
        border: `1px solid ${border}`,
        borderRadius: "999px",
      }}
    >
      {label}
    </span>
  );
}
