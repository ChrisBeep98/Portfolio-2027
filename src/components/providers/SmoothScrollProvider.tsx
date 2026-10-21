"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    /**
     * Instancia global de Lenis (undefined con prefers-reduced-motion).
     * OJO: `window.lenis` (sin guion bajo) pertenece a la librería — es su
     * objeto de auto-setup en Lenis 1.3+; nunca asignar la instancia ahí.
     */
    __lenis?: Lenis | undefined;
  }
}

/**
 * @description Global Lenis smooth-scroll driver, synchronized with the GSAP
 * ticker via `lenis.on("scroll", ScrollTrigger.update)`. Exposes the instance
 * as `window.__lenis` — never re-initialize Lenis elsewhere. Fully disabled
 * when the user prefers reduced motion (native scroll remains).
 */
export default function SmoothScrollProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
