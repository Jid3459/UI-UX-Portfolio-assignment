import { useEffect, useRef, useState } from "react";
import { Mail, Copy, Check, Send, Github, Linkedin, Terminal } from "lucide-react";

interface ContactSectionProps {
  darkMode?: boolean;
}

// Stored split to keep naive scrapers from grabbing it in plain text.
const EMAIL_USER = "jidneya.kadam23";
const EMAIL_HOST = "spit.ac.in";
const FULL_EMAIL = `${EMAIL_USER}@${EMAIL_HOST}`;
const SCRAMBLE_POOL = "!@#$%^&*<>?/[]{}=+abcdefghijklmnopqrstuvwxyz0123456789";

function scrambleChar() {
  return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
}

export function ContactSection({ darkMode = true }: ContactSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const bodyText = darkMode ? "#c9d1d9" : "#24292f";
  const subtleText = darkMode ? "#8b949e" : "#57606a";
  const panelBg = "#0c0c0c";
  const panelBorder = darkMode ? "#30363d" : "#d0d7de";
  const inputBg = darkMode ? "#161b22" : "#ffffff";
  const inputBorder = darkMode ? "#30363d" : "#d0d7de";

  const [revealed, setRevealed] = useState(false);
  const [display, setDisplay] = useState(
    FULL_EMAIL.replace(/[^@.]/g, "•")
  );
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const animRef = useRef<number | null>(null);

  // "Decrypt" animation: cycle random characters then settle into the real email.
  useEffect(() => {
    if (!revealed) return;
    const target = FULL_EMAIL;
    const start = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // reveal characters left-to-right as t increases
      const resolvedCount = Math.floor(t * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < resolvedCount || target[i] === "@" || target[i] === ".") {
          out += target[i];
        } else {
          out += scrambleChar();
        }
      }
      setDisplay(out);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, [revealed]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(FULL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignored — fall back silently
    }
  };

  const mailtoHref = () => {
    const params = new URLSearchParams();
    if (subject.trim()) params.set("subject", subject.trim());
    if (body.trim()) params.set("body", body.trim());
    const qs = params.toString();
    return `mailto:${FULL_EMAIL}${qs ? `?${qs}` : ""}`;
  };

  const gmailHref = () => {
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: FULL_EMAIL,
    });
    if (subject.trim()) params.set("su", subject.trim());
    if (body.trim()) params.set("body", body.trim());
    return `https://mail.google.com/mail/?${params.toString()}`;
  };

  return (
    <section id="contact" className="px-8 py-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mb-6">
        <span style={{ color: "#484f58", fontSize: "13px" }}>
          <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
          <span style={{ color: "#58d5f8" }}>$</span> ./mail --compose
        </span>
      </div>

      <h2 className="mb-2" style={{ color: headingColor, fontSize: "22px", fontWeight: 700 }}>
        <Mail size={20} className="inline mr-2" style={{ color: "#3fb950" }} />
        Contact
      </h2>
      <p className="mb-6 max-w-2xl" style={{ color: subtleText, fontSize: "12px", lineHeight: 1.7 }}>
        <span style={{ color: "#ff7b72" }}>{"// "}</span>
        No forms that email into a void. Decrypt my address, or compose a draft right here —
        it opens in your mail client pre-filled, so nothing sends until you press Send.
      </p>

      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: panelBg,
          border: `1px solid ${panelBorder}`,
          maxWidth: "720px",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ backgroundColor: "#1a1a2e", borderBottom: `1px solid ${panelBorder}` }}
        >
          <div className="flex items-center gap-1 mr-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
          </div>
          <Terminal size={12} style={{ color: "#8b949e" }} />
          <span style={{ color: "#8b949e", fontSize: "11px" }}>mail-client</span>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Email reveal row */}
          <div>
            <p style={{ color: "#8b949e", fontSize: "12px", marginBottom: "6px" }}>
              <span style={{ color: "#3fb950" }}>&gt;</span> resolve_address{" "}
              <span style={{ color: "#484f58" }}>--target jidneya</span>
            </p>
            <div
              className="flex flex-wrap items-center gap-2 px-3 py-2 rounded"
              style={{ backgroundColor: "#161b22", border: "1px solid #21262d" }}
            >
              <span
                style={{
                  color: revealed ? "#4afa7b" : "#f0883e",
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  fontFamily: "'JetBrains Mono', monospace",
                  wordBreak: "break-all",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {display}
              </span>

              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="px-3 py-1 rounded text-xs"
                  style={{
                    backgroundColor: "#21262d",
                    color: "#58d5f8",
                    border: "1px solid #30363d",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#30363d")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#21262d")}
                >
                  decrypt →
                </button>
              ) : (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1 rounded"
                  style={{
                    backgroundColor: copied ? "#238636" : "#21262d",
                    color: copied ? "#ffffff" : "#e6edf3",
                    border: `1px solid ${copied ? "#2ea043" : "#30363d"}`,
                    cursor: "pointer",
                    fontSize: "11px",
                    transition: "background-color 0.2s",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "copied" : "copy"}
                </button>
              )}
            </div>
          </div>

          {/* Compose form */}
          <div>
            <p style={{ color: "#8b949e", fontSize: "12px", marginBottom: "6px" }}>
              <span style={{ color: "#3fb950" }}>&gt;</span> compose{" "}
              <span style={{ color: "#484f58" }}>--draft</span>
            </p>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <span style={{ color: "#58d5f8", fontSize: "11px", minWidth: "64px" }}>subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Let's build something"
                  className="flex-1 px-2 py-1 rounded outline-none"
                  style={{
                    backgroundColor: inputBg,
                    border: `1px solid ${inputBorder}`,
                    color: bodyText,
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                />
              </label>

              <label className="flex items-start gap-2">
                <span
                  style={{ color: "#58d5f8", fontSize: "11px", minWidth: "64px", paddingTop: "6px" }}
                >
                  message:
                </span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Hi Jidneya, I saw your portfolio..."
                  rows={5}
                  className="flex-1 px-2 py-2 rounded outline-none resize-y"
                  style={{
                    backgroundColor: inputBg,
                    border: `1px solid ${inputBorder}`,
                    color: bodyText,
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                    lineHeight: 1.6,
                  }}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <a
                href={gmailHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded"
                style={{
                  backgroundColor: "#238636",
                  color: "#ffffff",
                  fontSize: "12px",
                  border: "1px solid #2ea043",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2ea043")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#238636")}
              >
                <Send size={13} /> send via Gmail
              </a>
              <a
                href={mailtoHref()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded"
                style={{
                  backgroundColor: darkMode ? "#21262d" : "#eaeef2",
                  color: darkMode ? "#e6edf3" : "#1f2328",
                  fontSize: "12px",
                  border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = darkMode ? "#30363d" : "#d0d7de")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = darkMode ? "#21262d" : "#eaeef2")}
              >
                <Send size={13} /> default mail app
              </a>

              <a
                href="https://github.com/Jid3459"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded"
                style={{
                  backgroundColor: "#21262d",
                  color: "#e6edf3",
                  fontSize: "12px",
                  border: "1px solid #30363d",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#30363d")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#21262d")}
              >
                <Github size={13} /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/jidneya-kadam-794746274/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded"
                style={{
                  backgroundColor: "#21262d",
                  color: "#e6edf3",
                  fontSize: "12px",
                  border: "1px solid #30363d",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#30363d")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#21262d")}
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </div>

            <p className="mt-3" style={{ color: "#484f58", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
              # "send via Gmail" opens gmail.com in a new tab with the draft pre-filled.
              "default mail app" uses your OS mail handler (Outlook, Apple Mail, etc.).
              Either way, nothing is sent until you press send.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
