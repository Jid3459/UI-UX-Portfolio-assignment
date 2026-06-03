import { useEffect, useState } from "react";

/* -----------------------------------------------------------
   Shared dark-mode state, persisted to localStorage so the
   theme stays consistent when navigating between the home page
   and project detail pages (which are separate routes).

   Defaults to dark (the site's original default) when nothing
   is stored yet.
   ----------------------------------------------------------- */

const STORAGE_KEY = "portfolio:darkMode";

function readInitial(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    /* ignore unavailable storage */
  }
  return true;
}

export function useDarkMode(): [boolean, () => void, (v: boolean) => void] {
  const [darkMode, setDarkMode] = useState<boolean>(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(darkMode));
    } catch {
      /* ignore unavailable storage */
    }
    // Keep other open tabs / routes in sync within the same document.
    window.dispatchEvent(new CustomEvent("portfolio:darkmode-change", { detail: darkMode }));
  }, [darkMode]);

  // Sync if another component instance (e.g. after route change) toggles it.
  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<boolean>).detail;
      setDarkMode((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("portfolio:darkmode-change", onChange as EventListener);
    return () => window.removeEventListener("portfolio:darkmode-change", onChange as EventListener);
  }, []);

  const toggle = () => setDarkMode((v) => !v);

  return [darkMode, toggle, setDarkMode];
}
