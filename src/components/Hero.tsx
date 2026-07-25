"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useEnvironmentTheme } from "./ThemeProvider";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const { theme } = useEnvironmentTheme();
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
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionEnabled(!media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={root} id="top" className="relative flex h-svh w-full flex-col justify-center overflow-hidden px-6 md:px-12">
    <div data-canvas className="pointer-events-none absolute inset-0 -z-10">{heroInView ? <ParticleField environment={theme} motionEnabled={motionEnabled} /> : null}</div>
    <div className="ocean-rays pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    <div className="ocean-surface pointer-events-none absolute inset-x-0 top-0 -z-10" aria-hidden="true" />
    <div className="ocean-waves pointer-events-none absolute inset-x-0 top-[6%] -z-10" aria-hidden="true">
      <svg className="ocean-wave ocean-wave-back" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M-80 64C80 10 220 108 390 55S690 20 850 63s315 41 500-7 285-22 370 8" />
      </svg>
      <svg className="ocean-wave ocean-wave-front" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M-90 70C90 118 225 14 410 65s315 48 485-4 290-26 475 6 274 34 370-2" />
      </svg>
    </div>
    <div className="ocean-waves ocean-waves-bottom pointer-events-none absolute inset-x-0 bottom-[4%] -z-10" aria-hidden="true">
      <svg className="ocean-wave ocean-wave-back" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M-80 64C80 10 220 108 390 55S690 20 850 63s315 41 500-7 285-22 370 8" />
      </svg>
      <svg className="ocean-wave ocean-wave-front" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M-90 70C90 118 225 14 410 65s315 48 485-4 290-26 475 6 274 34 370-2" />
      </svg>
    </div>
    <div className="hero-vignette pointer-events-none absolute inset-0 -z-10" />
    <div className="mx-auto w-full max-w-6xl">
      <div data-fade className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-lime" />{"// AI engineering · tech education · systems thinking"}</div>
      <h1 className="display max-w-5xl text-paper">
        <span className="block overflow-hidden text-[clamp(3.1rem,8.8vw,8.8rem)]"><span data-line className="block will-reveal">I build AI systems</span></span>
        <span className="block overflow-hidden text-[clamp(3.1rem,8.8vw,8.8rem)] text-lime text-glow-lime"><span data-line className="block will-reveal">people can trust.</span></span>
      </h1>
      <p data-fade className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-xl">I&apos;m Dennys Antunish—a Tech Fellow and systems builder who ships real AI projects, explains the choices behind them, and cares about how they affect people.</p>
      <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
        <button onClick={() => scrollTo("#work")} className="group min-h-11 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.03]">Explore my work <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></button>
        <button onClick={() => scrollTo("#contact")} className="theme-control min-h-11 rounded-full border px-6 py-3 text-sm font-medium text-paper transition-colors">Let&apos;s build</button>
      </div>
    </div>
  </section>;
}
