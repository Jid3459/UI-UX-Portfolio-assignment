import { Heart } from "lucide-react";

interface HobbiesSectionProps {
  darkMode?: boolean;
}

const hobbies = [
  { emoji: "📸", name: "Photography", desc: "Capturing candid moments and street scenes" },
  { emoji: "📚", name: "Reading", desc: "Tech blogs, sci-fi, and self-improvement books" },
  { emoji: "🎮", name: "Gaming", desc: "Strategy games and indie titles" },
  { emoji: "✈️", name: "Travelling", desc: "Exploring new cultures and landscapes" },
  { emoji: "🎵", name: "Music", desc: "Lo-fi, jazz, and ambient sounds while coding" },
  { emoji: "🏋️", name: "Fitness", desc: "Gym workouts and morning runs" },
];

export function HobbiesSection({ darkMode = true }: HobbiesSectionProps) {
  const headingColor = darkMode ? "#e6edf3" : "#1f2328";
  const cardBg = darkMode ? "#161b22" : "#ffffff";
  const cardBorder = darkMode ? "#30363d" : "#d0d7de";
  const cardHoverBg = darkMode ? "#0e1c12" : "#f0fdf4";
  const descText = darkMode ? "#8b949e" : "#57606a";

  return (
    <section id="hobbies" className="px-8 py-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="mb-6">
        <span style={{ color: "#484f58", fontSize: "13px" }}>
          <span style={{ color: "#3fb950" }}>~/portfolio</span>{" "}
          <span style={{ color: "#58d5f8" }}>$</span> cat hobbies.txt
        </span>
      </div>

      <h2 className="mb-6" style={{ color: headingColor, fontSize: "22px", fontWeight: 700 }}>
        <Heart size={20} className="inline mr-2" style={{ color: "#ff7b72" }} />
        Hobbies & Interests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
        {hobbies.map((hobby) => (
          <div
            key={hobby.name}
            className="flex items-start gap-3 p-3 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#3fb950";
              (e.currentTarget as HTMLDivElement).style.backgroundColor = cardHoverBg;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = cardBorder;
              (e.currentTarget as HTMLDivElement).style.backgroundColor = cardBg;
            }}
          >
            <span style={{ fontSize: "20px" }}>{hobby.emoji}</span>
            <div>
              <p style={{ color: "#3fb950", fontSize: "12px", fontWeight: 700, marginBottom: "2px" }}>
                {hobby.name}
              </p>
              <p style={{ color: descText, fontSize: "11px", lineHeight: "1.5" }}>{hobby.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}