"use client";

import { useEnvironmentTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useEnvironmentTheme();
  const isOcean = theme === "ocean";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isOcean ? "space" : "ocean"} theme`}
      aria-pressed={isOcean}
      className="theme-control flex min-h-11 items-center gap-2 rounded-full border px-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors"
    >
      <span aria-hidden="true">{isOcean ? "☀" : "✦"}</span>
      <span>{isOcean ? "Ocean" : "Space"}</span>
    </button>
  );
}
