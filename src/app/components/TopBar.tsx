import { Linkedin, Moon, Sun, ChevronRight, Github, FileDown } from "lucide-react";

// Served from /public — referenced by URL, not bundled.
const logoImg = "/final-portfolio-image.jpg";

interface TopBarProps {
  darkMode: boolean;
  onToggleDark: () => void;
  /** Optional — only the home page needs the mobile-nav toggle. */
  mobileNavOpen?: boolean;
  onToggleMobileNav?: () => void;
}

/* The fixed top header chrome shared by the home page and every
   project detail page, so the IDE-style bar stays identical everywhere. */
export function TopBar({ darkMode, onToggleDark, mobileNavOpen, onToggleMobileNav }: TopBarProps) {
  const headerBg = darkMode ? "#161b22" : "#ffffff";
  const headerBorder = darkMode ? "#30363d" : "#d0d7de";
  const textPrimary = darkMode ? "#e6edf3" : "#1f2328";
  const textSecondary = darkMode ? "#8b949e" : "#656d76";
  const iconBg = darkMode ? "#21262d" : "#eaeef2";
  const iconHover = darkMode ? "#30363d" : "#d0d7de";

  return (
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
        {onToggleMobileNav && (
          <button
            className="md:hidden mr-2 p-1 rounded"
            style={{ color: textSecondary, backgroundColor: "transparent" }}
            onClick={onToggleMobileNav}
            aria-label="Toggle navigation"
          >
            <ChevronRight
              size={16}
              style={{ transform: mobileNavOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
            />
          </button>
        )}
        <div
          className="rounded overflow-hidden flex-shrink-0"
          style={{ width: "28px", height: "28px", border: "1px solid #30363d" }}
        >
          <img src={logoImg} alt="JK Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ color: textPrimary, fontSize: "13px", fontWeight: 700 }}>Jidneya Kadam</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/Jid3459"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ width: "32px", height: "32px", backgroundColor: iconBg, color: textSecondary }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconHover)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconBg)}
        >
          <Github size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/jidneya-kadam-794746274/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ width: "32px", height: "32px", backgroundColor: iconBg, color: textSecondary }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconHover)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconBg)}
        >
          <Linkedin size={15} />
        </a>
        <a
          href="/Jidneya_Kadam_Resume.pdf"
          download="Jidneya-Kadam-Resume.pdf"
          aria-label="Download resume"
          title="Download resume (PDF)"
          className="hidden sm:flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ width: "32px", height: "32px", backgroundColor: iconBg, color: textSecondary }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconHover)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = iconBg)}
        >
          <FileDown size={15} />
        </a>
        <button
          onClick={onToggleDark}
          aria-label="Toggle theme"
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ width: "32px", height: "32px", backgroundColor: iconBg, color: textSecondary, cursor: "pointer" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = iconHover)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = iconBg)}
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
