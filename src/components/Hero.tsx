"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const scrollTo = (target: string) => {
    if (lenis) lenis.scrollTo(target);
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-line]", {
          yPercent: 120,
          duration: 1.2,
          stagger: 0.1,
        })
          .from("[data-fade]", { opacity: 0, y: 24, duration: 0.9, stagger: 0.12 }, "-=0.7")
          .from("[data-canvas]", { opacity: 0, duration: 1.6 }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex h-svh w-full flex-col justify-center overflow-hidden px-6 md:px-12">
      {/* 3D backdrop */}
      <div data-canvas className="pointer-events-none absolute inset-0 -z-10">
        <ParticleField />
      </div>
      {/* radial vignette so type stays legible */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.55)_70%,var(--ink)_100%)]" />

      <div className="mx-auto w-full max-w-6xl">
        <div data-fade className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-lime" />
          {"// software engineer"}
        </div>

        <h1 className="display text-paper">
          <span className="block overflow-hidden">
            <span data-line className="block will-reveal text-[clamp(3rem,13vw,12rem)]">
              DENNYS
            </span>
          </span>
        </h1>

        <div className="mt-4 overflow-hidden">
          <p data-line className="display text-[clamp(1.35rem,3.6vw,2.6rem)] leading-tight text-paper">
            I build with AI.{" "}
            <span className="text-lime text-glow-lime">
              I understand what&apos;s under it.
            </span>
          </p>
        </div>

        <p data-fade className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Using AI productively isn&apos;t the hard part — knowing how it works
          is. I&apos;ve spent the last few years closing that gap: writing real
          code, shipping real projects, and staying disciplined enough to keep
          going when it got hard.
        </p>

        <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo("#work")}
            className="group rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            View the work
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-lime hover:text-lime"
          >
            Get in touch
          </button>
        </div>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => scrollTo("#work")}
        data-fade
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-lime"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-lime to-transparent" />
      </button>
    </section>
  );
}
