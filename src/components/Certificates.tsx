"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certificates } from "@/lib/certificates";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (certificates.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cert]", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Self-hide until there is real data to show.
  if (certificates.length === 0) return null;

  return (
    <section
      ref={root}
      id="certificates"
      className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-16 border-b border-white/10 pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
          {"// certificates"}
        </span>
        <h2 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] text-paper">
          Credentials
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {certificates.map((c) => (
          <article
            key={`${c.name}-${c.org}`}
            data-cert
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-lime/40"
          >
            <h3 className="display text-xl text-paper transition-colors group-hover:text-lime">
              {c.name}
            </h3>
            <p className="mt-2 text-muted">{c.org}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
              {c.date}
            </p>
            {c.href ? (
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6 font-mono text-sm text-paper transition-colors hover:text-lime"
              >
                View credential ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
