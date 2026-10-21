"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const svgRingRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const container = containerRef.current;
    const svgRing = svgRingRef.current;
    const circle = circleRef.current;
    if (!dot || !ring || !container || !svgRing || !circle) return;

    const ctx = gsap.context(() => {
      // 1. Inicialización
      gsap.set([dot, ring], { opacity: 0 });

      const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
      const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
      const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power2.out" });
      const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power2.out" });

      const rotationAnim = gsap.to(svgRing, {
        rotate: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        paused: true
      });

      let isInitialized = false;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        if (!isInitialized) {
          gsap.set([dot, ring], { x: clientX, y: clientY, opacity: 1 });
          isInitialized = true;
        }
        xToDot(clientX);
        yToDot(clientY);
        xToRing(clientX);
        yToRing(clientY);
      };

      const handleOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], .clickable')) {
          container.style.mixBlendMode = "exclusion";
          gsap.to(dot, { scale: 0.5, duration: 0.4 });
          gsap.to(ring, { scale: 1.4, opacity: 1, duration: 0.4 });
          gsap.to(circle, { strokeDasharray: "4, 4", duration: 0.3 });
          rotationAnim.play();
        }
      };

      const handleOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], .clickable')) {
          resetCursor();
        }
      };

      const resetCursor = () => {
        container.style.mixBlendMode = "difference";
        gsap.to(dot, { scale: 1, duration: 0.4 });
        gsap.to(ring, { scale: 1, opacity: 0.4, duration: 0.4 });
        gsap.to(circle, { strokeDasharray: "0, 0", duration: 0.3 });
        rotationAnim.pause();
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleOver);
      window.addEventListener("mouseout", handleOut);

      // Reset forzado al cambiar de ruta
      resetCursor();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleOver);
        window.removeEventListener("mouseout", handleOut);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [pathname]); // Se reinicia/limpia cada vez que cambias de página

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
    >
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 flex items-center justify-center will-change-transform opacity-40">
        <svg ref={svgRingRef} viewBox="0 0 40 40" className="w-full h-full">
          <circle ref={circleRef} cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="1" strokeDasharray="0, 0" />
        </svg>
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -ml-[3px] -mt-[3px] will-change-transform" />
    </div>
  );
}
