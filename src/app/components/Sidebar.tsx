import { User, Code2, BookOpen, Briefcase, Heart, FolderGit2, Monitor } from "lucide-react";
import logoImg from "figma:asset/fab473e2fba6a0e439834ba63a2f1fd525253e33.png";

interface SidebarProps {
  activeSection: string;
  onNavClick: (section: string) => void;
  darkMode?: boolean;
}

const navItems = [
  { id: "introduction", label: "Introduction", icon: User },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "hobbies", label: "Hobbies", icon: Heart },
  { id: "projects", label: "Projects", icon: FolderGit2 },
];

const platforms = ["Figma", "AutoCAD", "Docker"];

export function Sidebar({ activeSection, onNavClick, darkMode = true }: SidebarProps) {
  const bg = darkMode ? "#161b22" : "#f6f8fa";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const sectionDivider = darkMode ? "#30363d" : "#d0d7de";
  const navActive = darkMode ? "#21262d" : "#eaeef2";
  const navActiveText = "#3fb950";
  const navInactiveText = darkMode ? "#8b949e" : "#656d76";
  const navHoverBg = darkMode ? "#21262d" : "#eaeef2";
  const navHoverText = darkMode ? "#e6edf3" : "#1f2328";
  const platformText = darkMode ? "#8b949e" : "#656d76";
  const nameText = darkMode ? "#e6edf3" : "#1f2328";
  const footerText = darkMode ? "#484f58" : "#8b949e";

  return (
    <aside
      className="fixed top-0 left-0 h-full flex flex-col z-30 hidden md:flex"
      style={{
        width: "220px",
        backgroundColor: bg,
        borderRight: `1px solid ${border}`,
        fontFamily: "'JetBrains Mono', monospace",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Profile */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4" style={{ borderBottom: `1px solid ${sectionDivider}` }}>
        <div
          className="relative flex items-center justify-center rounded-full mb-3 overflow-hidden"
          style={{
            width: "80px",
            height: "80px",
            border: "2px solid #3fb950",
          }}
        >
          <img src={logoImg} alt="Jidneya Kadam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <p style={{ color: nameText, fontSize: "13px", fontWeight: 600, textAlign: "center" }}>Jidneya Kadam</p>
        <p style={{ color: "#3fb950", fontSize: "11px", marginTop: "2px" }}>
          <span style={{ color: "#ff7b72" }}>&lt;</span>
          Developer
          <span style={{ color: "#ff7b72" }}>/&gt;</span>
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <p style={{ color: footerText, fontSize: "10px", marginBottom: "8px", paddingLeft: "8px", letterSpacing: "0.1em" }}>
          NAVIGATE
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => onNavClick(id)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 text-left"
                style={{
                  fontSize: "12px",
                  backgroundColor: activeSection === id ? navActive : "transparent",
                  color: activeSection === id ? navActiveText : navInactiveText,
                  borderLeft: activeSection === id ? "2px solid #3fb950" : "2px solid transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = navHoverBg;
                    (e.currentTarget as HTMLButtonElement).style.color = navHoverText;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = navInactiveText;
                  }
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Platforms */}
        <div className="mt-6">
          <p style={{ color: footerText, fontSize: "10px", marginBottom: "8px", paddingLeft: "8px", letterSpacing: "0.1em" }}>
            PLATFORMS
          </p>
          <ul className="flex flex-col gap-1">
            {platforms.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 px-3 py-1"
                style={{ color: platformText, fontSize: "12px" }}
              >
                <Monitor size={11} style={{ color: "#58d5f8" }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3" style={{ borderTop: `1px solid ${sectionDivider}` }}>
        <p style={{ color: footerText, fontSize: "10px", textAlign: "center" }}>
          <Code2 size={10} className="inline mr-1" style={{ color: "#3fb950" }} />
          portfolio v1.0.0
        </p>
      </div>
    </aside>
  );
}