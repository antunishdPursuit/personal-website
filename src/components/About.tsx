"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "Pursuit", label: "Fellowship" },
  { value: "AI", label: "Focus area" },
  { value: "Full-stack", label: "Range" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-about] > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
      <div data-about className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">About</span>
        </div>
        <div className="md:col-span-8">
          <p className="display text-3xl leading-tight text-paper md:text-5xl">
            I&apos;m Dennys — a software engineer who likes building things that{" "}
            <span className="text-lime">think, talk, and move</span>.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            I&apos;m a Pursuit fellow focused on AI engineering. My work spans
            conversational 3D interfaces, agent tooling, and responsible-AI
            systems — pairing modern frontend craft with Python back ends and
            LLM orchestration. I care about products that feel alive without
            losing sight of the people using them.
          </p>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="display text-2xl text-paper md:text-4xl">{s.value}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
