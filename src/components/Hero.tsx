"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const lenis = useLenis();
  const scrollTo = (target: string) => lenis ? lenis.scrollTo(target) : document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from("[data-line]", { yPercent: 120, duration: 1.2, stagger: 0.1 })
          .from("[data-fade]", { opacity: 0, y: 24, duration: 0.9, stagger: 0.12 }, "-=0.7")
          .from("[data-canvas]", { opacity: 0, duration: 1.6 }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={root} id="top" className="relative flex h-svh w-full flex-col justify-center overflow-hidden px-6 md:px-12">
    <div data-canvas className="pointer-events-none absolute inset-0 -z-10">{heroInView ? <ParticleField /> : null}</div>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,10,18,0.62)_70%,var(--ink)_100%)]" />
    <div className="mx-auto w-full max-w-6xl">
      <div data-fade className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-lime" />{"// AI engineering · tech education · systems thinking"}</div>
      <h1 className="display max-w-5xl text-paper">
        <span className="block overflow-hidden text-[clamp(3.1rem,8.8vw,8.8rem)]"><span data-line className="block will-reveal">I build AI systems</span></span>
        <span className="block overflow-hidden text-[clamp(3.1rem,8.8vw,8.8rem)] text-lime text-glow-lime"><span data-line className="block will-reveal">people can trust.</span></span>
      </h1>
      <p data-fade className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-xl">I&apos;m Dennys Antunish—a Tech Fellow and systems builder who ships real AI projects, explains the choices behind them, and cares about how they affect people.</p>
      <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
        <button onClick={() => scrollTo("#work")} className="group min-h-11 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">Explore my work <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></button>
        <button onClick={() => scrollTo("#contact")} className="min-h-11 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-lime hover:text-lime">Let&apos;s build</button>
      </div>
    </div>
  </section>;
}
