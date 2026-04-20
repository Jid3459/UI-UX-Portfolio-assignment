import { useEffect, useState } from "react";
import { Download, Eye, Mail, Send } from "lucide-react";

const GMAIL_COMPOSE =
  "https://mail.google.com/mail/?view=cm&fs=1&to=jidneya.kadam23%40spit.ac.in";

const fullName = "Jidneya Kadam";

interface HeroSectionProps {
  darkMode?: boolean;
  onNavigate?: (id: string) => void;
}

export function HeroSection({ darkMode = true, onNavigate }: HeroSectionProps) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [doneTyping, setDoneTyping] = useState(false);

  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const bodyText = darkMode ? "#8b949e" : "#57606a";
  const skillBg = darkMode ? "#21262d" : "#eaeef2";
  const skillText = darkMode ? "#e6edf3" : "#1f2328";
  const skillBorder = darkMode ? "#30363d" : "#d0d7de";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setDisplayed(fullName.slice(0, i));
        i++;
      } else {
        setDoneTyping(true);
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <section id="introduction" className="px-8 py-12" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Greeting */}
      <div className="mb-2" style={{ color: "#484f58", fontSize: "13px" }}>
        <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
        <span style={{ color: "#58d5f8" }}>$</span> whoami
      </div>

      <h1
        className="mb-4"
        style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          color: headingColor,
          letterSpacing: "-0.02em",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        Hello, I'm{" "}
        <span style={{ color: "#3fb950" }}>{displayed}</span>
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "1em",
            backgroundColor: "#3fb950",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        />
      </h1>

      <p
        className="mb-6 max-w-2xl"
        style={{
          color: bodyText,
          fontSize: "13px",
          lineHeight: "1.8",
        }}
      >
        I am passionate about building intelligent, pixel-perfect applications that solve real-world problems.
        My focus spans machine learning, web development, and creating impactful tools.
        Feel free to explore my projects, and let's connect if you're looking to collaborate or build something amazing together!
      </p>

      {/* CTA row */}
      <div className="flex flex-wrap gap-2 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <a
          href="/Jidneya_Kadam_Resume.pdf"
          download="Jidneya-Kadam-Resume.pdf"
          className="inline-flex items-center gap-2 px-3 py-2 rounded"
          style={{
            backgroundColor: "#238636",
            color: "#ffffff",
            fontSize: "12px",
            border: "1px solid #2ea043",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2ea043")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#238636")}
        >
          <Download size={13} /> Download Resume
        </a>
        <a
          href="/Jidneya_Kadam_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded"
          style={{
            backgroundColor: darkMode ? "#21262d" : "#eaeef2",
            color: darkMode ? "#e6edf3" : "#1f2328",
            fontSize: "12px",
            border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
            textDecoration: "none",
          }}
        >
          <Eye size={13} /> View Resume
        </a>
        <button
          onClick={() => onNavigate?.("contact")}
          className="inline-flex items-center gap-2 px-3 py-2 rounded"
          style={{
            backgroundColor: darkMode ? "#21262d" : "#eaeef2",
            color: darkMode ? "#e6edf3" : "#1f2328",
            fontSize: "12px",
            border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <Mail size={13} /> Contact Me
        </button>
        <a
          href={GMAIL_COMPOSE}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compose email in Gmail"
          className="inline-flex items-center gap-2 px-3 py-2 rounded"
          style={{
            backgroundColor: darkMode ? "#21262d" : "#eaeef2",
            color: darkMode ? "#e6edf3" : "#1f2328",
            fontSize: "12px",
            border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
            textDecoration: "none",
          }}
        >
          <Send size={13} /> Send Mail
        </a>
      </div>

      {/* Skills */}
      <div className="mt-10">
        <p
          className="mb-4"
          style={{ color: headingColor, fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span style={{ color: "#ff7b72" }}>{"// "}</span>What I do
        </p>
        <div className="flex flex-wrap gap-2">
          {["Python", "React", "JavaScript", "TypeScript", "TensorFlow", "FastAPI", "Node.js", "Docker", "SQL", "Git", "Figma", "REST APIs"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: skillBg,
                  color: skillText,
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  border: `1px solid ${skillBorder}`,
                }}
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}