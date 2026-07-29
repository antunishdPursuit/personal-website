"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type EnvironmentTheme = "space" | "ocean";

const STORAGE_KEY = "portfolio-environment";

type ThemeContextValue = {
  theme: EnvironmentTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const listeners = new Set<() => void>();

function getThemeSnapshot(): EnvironmentTheme {
  return document.documentElement.dataset.environment === "ocean"
    ? "ocean"
    : "space";
}

function getServerThemeSnapshot(): EnvironmentTheme {
  return "space";
}

function applyTheme(theme: EnvironmentTheme) {
  document.documentElement.dataset.environment = theme;
  document.documentElement.style.colorScheme =
    theme === "ocean" ? "light" : "dark";
  window.localStorage.setItem(STORAGE_KEY, theme);
  listeners.forEach((listener) => listener());
}

function subscribeToTheme(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === "space" || event.newValue === "ocean")
    ) {
      document.documentElement.dataset.environment = event.newValue;
      document.documentElement.style.colorScheme =
        event.newValue === "ocean" ? "light" : "dark";
      listeners.forEach((currentListener) => currentListener());
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "space" ? "ocean" : "space");
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useEnvironmentTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useEnvironmentTheme must be used within ThemeProvider");
  }
  return context;
}
