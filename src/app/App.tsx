import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { HeroSection } from "./components/HeroSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { HobbiesSection } from "./components/HobbiesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { useDarkMode } from "./theme/useDarkMode";

const SECTIONS = ["introduction", "education", "experience", "hobbies", "projects", "contact"];

export default function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const bg = darkMode ? "#0d1117" : "#f0f2f4";
  const headerBg = darkMode ? "#161b22" : "#ffffff";
  const headerBorder = darkMode ? "#30363d" : "#d0d7de";
  const textPrimary = darkMode ? "#e6edf3" : "#1f2328";
  const textSecondary = darkMode ? "#8b949e" : "#656d76";

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

  // When arriving from a detail page via /#section, jump to that section,
  // then strip the hash so the home page URL stays a clean "/" (otherwise
  // the leftover #section lingers in the address bar as you scroll away).
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id || !SECTIONS.includes(id)) return;
    // Wait a frame so the sections have laid out before scrolling.
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el && mainRef.current) {
        mainRef.current.scrollTo({ top: el.offsetTop - 16, behavior: "auto" });
        setActiveSection(id);
      }
      // Clear the hash from the URL without adding a history entry.
      navigate("/", { replace: true });
    }, 50);
    return () => clearTimeout(t);
  }, [location.hash, navigate]);

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
            <HeroSection darkMode={darkMode} onNavigate={scrollToSection} />

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

            <div
              style={{
                height: "1px",
                margin: "0 32px",
                backgroundColor: darkMode ? "#21262d" : "#e8ecf0",
              }}
            />

            <ContactSection darkMode={darkMode} />

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