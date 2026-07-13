"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const strengths = [
  {
    tag: "emotional awareness",
    title: "I read the room",
    body: "I pay attention to how people are doing, not just what they're saying. That lets me work with teammates in the way they actually understand best — and keep the whole team moving forward together.",
  },
  {
    tag: "clear communication",
    title: "I keep everyone informed",
    body: "Good decisions need good information. I make sure my team has what it needs, when it needs it, so nobody's guessing and nobody's blocked.",
  },
  {
    tag: "steady leadership",
    title: "I'm the calm in the room",
    body: "I can be the voice of reason when a group needs one — cutting through noise, bringing people closer, and getting the work done without the drama.",
  },
];

export default function Strengths() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-strength]", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="strengths"
      className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-16 border-b border-white/10 pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
          {"// what I bring"}
        </span>
        <h2 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] text-paper">
          How I work with a team
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {strengths.map((s) => (
          <article
            key={s.tag}
            data-strength
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-lime/40"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-cyan">
              {s.tag}
            </span>
            <h3 className="display mt-4 text-2xl text-paper transition-colors group-hover:text-lime">
              {s.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
