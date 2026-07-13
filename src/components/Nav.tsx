"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const scrollTo = (target: string) => {
    if (lenis) lenis.scrollTo(target);
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <button
          onClick={() => scrollTo("#top")}
          className="font-display text-lg font-bold tracking-tight text-paper"
          aria-label="Back to top"
        >
          D<span className="text-lime">A</span>
        </button>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5 backdrop-blur-sm">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="rounded-full px-4 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-paper"
            >
              {l.label}
            </button>
          ))}
        </div>

        <a
          href="https://github.com/antunishdPursuit"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-sm text-muted transition-colors hover:text-lime sm:block"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
