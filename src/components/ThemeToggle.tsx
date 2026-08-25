"use client";

import { useEnvironmentTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useEnvironmentTheme();
  const targetTheme = theme === "space" ? "ocean" : "space";
  const targetIsOcean = targetTheme === "ocean";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={targetTheme === "ocean" ? "Ocean" : "Space"}
      aria-pressed={theme === "ocean"}
      className={`theme-control theme-control-target-${targetTheme} flex min-h-11 items-center gap-2 rounded-full border px-3 font-mono text-xs uppercase tracking-wider transition-colors`}
    >
      <span aria-hidden="true">{targetIsOcean ? "☀" : "✦"}</span>
      <span>{targetIsOcean ? "Ocean" : "Space"}</span>
    </button>
  );
}
