import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "terminal", children, className = "" }: TerminalWindowProps) {
  return (
    <div
      className={`rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundColor: "#0a0a0a",
        border: "1px solid #30363d",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ backgroundColor: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <span className="rounded-full" style={{ width: "10px", height: "10px", backgroundColor: "#ff5f57" }} />
        <span className="rounded-full" style={{ width: "10px", height: "10px", backgroundColor: "#ffbd2e" }} />
        <span className="rounded-full" style={{ width: "10px", height: "10px", backgroundColor: "#28c840" }} />
        <span style={{ color: "#484f58", fontSize: "11px", marginLeft: "8px" }}>{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
