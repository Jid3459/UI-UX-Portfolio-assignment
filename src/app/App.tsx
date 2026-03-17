import { useState, useEffect, useRef } from "react";
import { Linkedin, Moon, Sun, ChevronRight } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { HobbiesSection } from "./components/HobbiesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import logoImg from "../../final-portfolio-image.jpg";

const SECTIONS = ["introduction", "education", "experience", "hobbies", "projects"];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const bg = darkMode ? "#0d1117" : "#f0f2f4";
  const headerBg = darkMode ? "#161b22" : "#ffffff";
  const headerBorder = darkMode ? "#30363d" : "#d0d7de";
  const textPrimary = darkMode ? "#e6edf3" : "#1f2328";
  const textSecondary = darkMode ? "#8b949e" : "#656d76";
  const iconBg = darkMode ? "#21262d" : "#eaeef2";
  const iconHover = darkMode ? "#30363d" : "#d0d7de";

  // Track active section on scroll
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const handleScroll = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && mainRef.current) {
      const offsetTop = el.offsetTop - 16;
      mainRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveSection(id);
      setMobileNavOpen(false);
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundColor: bg,
        fontFamily: "'JetBrains Mono', monospace",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Fixed Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavClick={scrollToSection}
        darkMode={darkMode}
      />

      {/* Main area — offset by sidebar width on md+ */}
      <div className="flex flex-col flex-1 overflow-hidden md:ml-[220px]">
        {/* Top Header */}
        <header
          className="flex items-center justify-between px-6 py-3 shrink-0 relative z-20"
          style={{
            backgroundColor: headerBg,
            borderBottom: `1px solid ${headerBorder}`,
            height: "52px",
            transition: "background-color 0.3s ease",
          }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              className="md:hidden mr-2 p-1 rounded"
              style={{ color: textSecondary, backgroundColor: "transparent" }}
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              <ChevronRight size={16} style={{ transform: mobileNavOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            <div
              className="rounded overflow-hidden flex-shrink-0"
              style={{ width: "28px", height: "28px", border: "1px solid #30363d" }}
            >
              <img src={logoImg} alt="JK Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ color: textPrimary, fontSize: "13px", fontWeight: 700 }}>
              Jidneya Kadam
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/jidneya-kadam-794746274/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: iconBg,
                color: textSecondary,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconHover)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconBg)}
            >
              <Linkedin size={15} />
            </a>
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: iconBg,
                color: textSecondary,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = iconHover)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = iconBg)}
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </header>

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div
            className="md:hidden absolute top-[52px] left-0 right-0 z-50 px-4 py-3 flex flex-col gap-1"
            style={{ backgroundColor: headerBg, borderBottom: `1px solid ${headerBorder}` }}
          >
            {["introduction", "education", "experience", "hobbies", "projects"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left px-3 py-2 rounded capitalize"
                style={{
                  fontSize: "12px",
                  color: activeSection === id ? "#3fb950" : textSecondary,
                  backgroundColor: activeSection === id ? (darkMode ? "#21262d" : "#eaeef2") : "transparent",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {id}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable content */}
        <div
          ref={mainRef}
          className="flex-1 overflow-y-auto"
          style={{ marginLeft: "0" }}
        >
          {/* Breadcrumb path */}
          <div
            className="px-8 py-2 flex items-center gap-1 sticky top-0 z-10"
            style={{
              backgroundColor: darkMode ? "#0d1117" : "#f0f2f4",
              borderBottom: `1px solid ${darkMode ? "#21262d" : "#e8ecf0"}`,
              fontSize: "11px",
              color: "#484f58",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span style={{ color: "#3fb950" }}>~/portfolio</span>
            <ChevronRight size={10} />
            <span style={{ color: "#58d5f8" }}>{activeSection}</span>
          </div>

          {/* Sections */}
          <div
            style={{
              color: textPrimary,
              transition: "color 0.3s ease",
            }}
          >
            <HeroSection darkMode={darkMode} />

            <div
              style={{
                height: "1px",
                margin: "0 32px",
                backgroundColor: darkMode ? "#21262d" : "#e8ecf0",
              }}
            />

            <EducationSection darkMode={darkMode} />

            <div
              style={{
                height: "1px",
                margin: "0 32px",
                backgroundColor: darkMode ? "#21262d" : "#e8ecf0",
              }}
            />

            <ExperienceSection darkMode={darkMode} />

            <div
              style={{
                height: "1px",
                margin: "0 32px",
                backgroundColor: darkMode ? "#21262d" : "#e8ecf0",
              }}
            />

            <HobbiesSection darkMode={darkMode} />

            <div
              style={{
                height: "1px",
                margin: "0 32px",
                backgroundColor: darkMode ? "#21262d" : "#e8ecf0",
              }}
            />

            <ProjectsSection darkMode={darkMode} />

            {/* Footer */}
            <footer
              className="px-8 py-6 mt-4"
              style={{
                borderTop: `1px solid ${darkMode ? "#21262d" : "#e8ecf0"}`,
                color: "#484f58",
                fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
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
    </div>
  );
}