import { Briefcase } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";

interface ExperienceSectionProps {
  darkMode?: boolean;
}

const experiences = [
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2022 – Dec 2023",
    type: "Freelance",
    status: "completed",
    progress: 100,
    description:
      "Built custom web applications, ML pipelines, and automation tools for multiple clients across different industries.",
    stack: ["React", "Node.js", "TensorFlow", "REST API", "Git"],
  },
];

export function ExperienceSection({ darkMode = true }: ExperienceSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const tagBg = darkMode ? "#21262d" : "#eaeef2";
  const tagBorder = darkMode ? "#30363d" : "#d0d7de";

  return (
    <section id="experience" className="px-8 py-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mb-6">
        <span style={{ color: "#484f58", fontSize: "13px" }}>
          <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
          <span style={{ color: "#58d5f8" }}>$</span> ls -la experience/
        </span>
      </div>

      <h2 className="mb-6" style={{ color: headingColor, fontSize: "22px", fontWeight: 700 }}>
        <Briefcase size={20} className="inline mr-2" style={{ color: "#3fb950" }} />
        Experience
      </h2>

      <div className="flex flex-col gap-4 max-w-2xl">
        {experiences.map((exp, i) => (
          <TerminalWindow key={i} title={`${exp.company.toLowerCase().replace(/[\s,]+/g, "_")}.log`}>
            <div>
              <p style={{ color: "#3fb950", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>
                {exp.role}
              </p>
              <p style={{ color: "#58d5f8", fontSize: "12px", marginBottom: "2px" }}>
                <span style={{ color: "#484f58" }}>company:</span> {exp.company}
              </p>
              <p style={{ color: "#8b949e", fontSize: "12px", marginBottom: "2px" }}>
                <span style={{ color: "#484f58" }}>period:</span>{" "}
                {exp.period}{" "}
                <span
                  className="px-1.5 py-0.5 rounded text-xs ml-2"
                  style={{
                    backgroundColor: exp.status === "ongoing" ? "#0e4429" : "#1c1f26",
                    color: exp.status === "ongoing" ? "#3fb950" : "#8b949e",
                    border: `1px solid ${exp.status === "ongoing" ? "#3fb950" : "#30363d"}`,
                    fontSize: "10px",
                  }}
                >
                  {exp.status}
                </span>
              </p>
              <p style={{ color: "#8b949e", fontSize: "12px", marginBottom: "8px", lineHeight: "1.6" }}>
                {exp.description}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <div
                  className="rounded-full overflow-hidden mb-1"
                  style={{ height: "5px", backgroundColor: "#21262d" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${exp.progress}%`,
                      backgroundColor: exp.status === "ongoing" ? "#3fb950" : "#f0883e",
                      transition: "width 1s ease",
                    }}
                  />
                </div>
                <p style={{ color: "#484f58", fontSize: "10px" }}>
                  {exp.status === "ongoing" ? "Ongoing journey..." : "Completed journey"}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: tagBg,
                      color: "#58d5f8",
                      fontSize: "11px",
                      border: `1px solid ${tagBorder}`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </TerminalWindow>
        ))}
      </div>
    </section>
  );
}