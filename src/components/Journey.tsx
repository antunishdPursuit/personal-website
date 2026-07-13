"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    tag: "chapter 01",
    title: "Tech Fellow",
    body: "I became a Tech Fellow to stay at the front edge of AI — and to help pull the next generation of students up with me. Along the way I shipped multiple AI projects and learned something just as valuable: how to explain technical ideas clearly to people who aren't in the weeds with you.",
  },
  {
    tag: "chapter 02",
    title: "Pursuit",
    body: "Pursuit gave me the technical grounding to actually understand how code works — not just how to use it. That foundation changed how I approach AI: I'm not just prompting tools on the surface, I understand what's happening underneath them.",
  },
  {
    tag: "chapter 03",
    title: "CUNY SPS — B.S. Information Systems",
    body: "This degree took years of discipline, late nights, and pushing through when quitting would've been easier. It's where I learned to be a go-getter — and where my technical expertise became something I could actually stand behind on a team.",
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-chapter]", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from("[data-journey-line]", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="journey"
      className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-16 border-b border-white/10 pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
          {"// the journey"}
        </span>
        <h2 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] text-paper">
          How I got here
        </h2>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* vertical spine (mobile) */}
        <span
          data-journey-line
          className="absolute left-[3px] top-2 h-full w-px bg-gradient-to-b from-lime via-cyan/40 to-transparent md:hidden"
        />

        <ol className="flex flex-col gap-14 md:gap-20">
          {chapters.map((c) => (
            <li
              key={c.tag}
              data-chapter
              className="relative grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-10"
            >
              {/* node (mobile) */}
              <span className="absolute -left-8 top-2 h-2 w-2 rounded-full bg-lime md:hidden" />

              <div className="md:col-span-4">
                <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-wider text-cyan">
                  {c.tag}
                </span>
                <h3 className="display mt-4 text-2xl text-paper md:text-3xl">
                  {c.title}
                </h3>
              </div>

              <p className="max-w-2xl leading-relaxed text-muted md:col-span-8 md:text-lg">
                {c.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
