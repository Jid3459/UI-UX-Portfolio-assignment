import { GraduationCap } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";

interface EducationSectionProps {
  darkMode?: boolean;
}

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "Mumbai University",
    period: "2020 – 2024",
    grade: "CGPA: 8.4 / 10",
    highlights: ["Machine Learning", "Data Structures", "Web Technologies", "Computer Vision"],
  },
  {
    degree: "Higher Secondary (XII) – Science",
    school: "BN Bandodkar College of Science",
    period: "2018 – 2020",
    grade: "Percentage: 92%",
    highlights: ["Mathematics", "Physics", "Computer Science"],
  },
];

export function EducationSection({ darkMode = true }: EducationSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const tagBg = darkMode ? "#21262d" : "#eaeef2";
  const tagText = darkMode ? "#8b949e" : "#57606a";
  const tagBorder = darkMode ? "#30363d" : "#d0d7de";

  return (
    <section id="education" className="px-8 py-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mb-6 flex items-center gap-2">
        <span style={{ color: "#484f58", fontSize: "13px" }}>
          <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
          <span style={{ color: "#58d5f8" }}>$</span> cat education.json
        </span>
      </div>

      <h2
        className="mb-6"
        style={{ color: headingColor, fontSize: "22px", fontWeight: 700 }}
      >
        <GraduationCap size={20} className="inline mr-2" style={{ color: "#3fb950" }} />
        Education
      </h2>

      <div className="flex flex-col gap-4 max-w-2xl">
        {education.map((edu, i) => (
          <TerminalWindow key={i} title={`education_${i + 1}.log`}>
            <div>
              <p style={{ color: "#3fb950", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>
                {edu.degree}
              </p>
              <p style={{ color: "#58d5f8", fontSize: "12px", marginBottom: "2px" }}>
                <span style={{ color: "#484f58" }}>institution:</span> {edu.school}
              </p>
              <p style={{ color: "#8b949e", fontSize: "12px", marginBottom: "2px" }}>
                <span style={{ color: "#484f58" }}>period:</span> {edu.period}
              </p>
              <p style={{ color: "#f0883e", fontSize: "12px", marginBottom: "8px" }}>
                <span style={{ color: "#484f58" }}>result:</span> {edu.grade}
              </p>
              <div className="flex flex-wrap gap-1">
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: tagBg,
                      color: tagText,
                      fontSize: "11px",
                      border: `1px solid ${tagBorder}`,
                    }}
                  >
                    {h}
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