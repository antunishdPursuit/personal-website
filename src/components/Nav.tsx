"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["Journey", "#journey"],
  ["Stories", "#stories"],
  ["Work", "#work"],
  ["Credentials", "#certificates"],
  ["Contact", "#contact"],
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const go = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-transparent transition-all duration-300 ${
        scrolled ? "nav-scrolled border-b backdrop-blur-xl" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12"
      >
        <button
          type="button"
          onClick={() => go("#top")}
          className="font-display text-lg font-bold tracking-tight text-paper"
          aria-label="Back to top"
        >
          D<span className="text-lime">A</span>
        </button>

        <div className="nav-links hidden items-center gap-1 rounded-full border px-1.5 py-1.5 backdrop-blur-sm md:flex">
          {links.map(([label, href]) => (
            <button
              key={href}
              type="button"
              onClick={() => go(href)}
              className="nav-link min-h-11 rounded-full px-4 text-sm transition-colors hover:text-lime"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="theme-control min-h-11 rounded-full border px-4 font-mono text-xs uppercase tracking-wider text-paper md:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="site-menu"
          className="mobile-menu mx-6 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl md:hidden"
        >
          {links.map(([label, href]) => (
            <button
              key={href}
              type="button"
              onClick={() => go(href)}
              className="nav-link block min-h-11 w-full rounded-xl px-4 text-left text-sm hover:text-lime"
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}
