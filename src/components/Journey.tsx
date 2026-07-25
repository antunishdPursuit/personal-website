"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const chapters = [
  ["01 · Jan 2023 — Dec 2024", "Pursuit", "Software foundations", "I came to Pursuit to become a software engineer: to understand how code works and build a real technical foundation."],
  ["02 · Jan 2025 — May 2026", "CUNY SPS", "Systems and persistence", "My degree strengthened that foundation through systems thinking, persistence, and technical work I could stand behind on a team."],
  ["03 · Jul 2026 — Present", "CodePath Tech Fellow", "Build and teach", "I apply what I know in public: shipping AI projects and helping learners make sense of technical ideas without losing the details that matter."],
  ["04 · Jul 2026 — Present", "Pursuit", "AI builder", "Returning to Pursuit is not a restart. It is the next orbit—using my foundations to build AI systems that are useful, explainable, and grounded in how they actually work."],
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => { const ctx = gsap.context(() => { gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => gsap.from("[data-chapter]", { y: 40, opacity: 0, stagger: 0.14, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 70%" } })); }, root); return () => ctx.revert(); }, []);
  return <section ref={root} id="journey" className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
    <div className="theme-rule mb-16 border-b pb-6"><span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">{"// the journey"}</span><h2 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] text-paper">How I got here</h2></div>
    <ol className="relative space-y-8 before:absolute before:bottom-8 before:left-3 before:top-8 before:w-px before:bg-gradient-to-b before:from-lime before:via-cyan/50 before:to-lime md:before:left-1/2">
      {chapters.map(([tag, title, subtitle, body], index) => <li key={tag} data-chapter className="relative grid gap-5 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
        <span className="journey-node absolute left-0 top-2 h-7 w-7 rounded-full border-4 border-ink bg-lime md:left-1/2 md:-translate-x-1/2" />
        <div className={index % 2 ? "md:col-start-2" : ""}><span className="font-mono text-xs uppercase tracking-wider text-cyan">{tag}</span><h3 className="display mt-3 text-3xl text-paper">{title}</h3><p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">{subtitle}</p></div>
        <div className={`orbit-panel ${index === 3 ? "orbit-return" : ""} ${index % 2 ? "md:col-start-1 md:row-start-1" : ""}`}><p className="leading-relaxed text-muted md:text-lg">{body}</p>{index === 3 ? <span className="orbit-return-line" aria-hidden="true" /> : null}</div>
      </li>)}
    </ol>
  </section>;
}
