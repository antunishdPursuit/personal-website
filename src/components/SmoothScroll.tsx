"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Keeps GSAP ScrollTrigger in sync with Lenis' smoothed scroll position. */
function GsapSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.15, smoothWheel: true, wheelMultiplier: 1 }}>
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
