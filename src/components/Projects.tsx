"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((row) => {
          gsap.from(row, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          });
        });

        // section heading
        gsap.from("[data-work-head]", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-work-head]", start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
      <div data-work-head className="mb-16 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
        <h2 className="display text-[clamp(2.5rem,7vw,6rem)] text-paper">
          Selected<span className="text-lime">.</span>
        </h2>
        <span className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {projects.length.toString().padStart(2, "0")} projects
        </span>
      </div>

      <div className="flex flex-col">
        {projects.map((p) => (
          <article
            key={p.id}
            data-project
            className="group grid grid-cols-1 gap-6 border-b border-white/10 py-12 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-sm text-muted">{p.index}</span>
            </div>

            <div className="md:col-span-5">
              <h3
                className={`display text-4xl text-paper transition-colors md:text-6xl ${
                  p.accent === "lime" ? "group-hover:text-lime" : "group-hover:text-cyan"
                }`}
              >
                {p.title}
              </h3>
              <p className="mt-3 text-lg text-muted">{p.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between md:col-span-6">
              <p className="max-w-md leading-relaxed text-paper/80">{p.description}</p>
              <div className="mt-6 flex items-center gap-5">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      p.accent === "lime"
                        ? "text-paper hover:text-lime"
                        : "text-paper hover:text-cyan"
                    }`}
                  >
                    {l.label} ↗
                  </a>
                ))}
                <span className="ml-auto font-mono text-xs text-muted">{p.year}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
