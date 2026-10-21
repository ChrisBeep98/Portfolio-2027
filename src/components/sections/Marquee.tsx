"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      // Horizontal Scroll - High velocity with inertia on desktop
      gsap.to(textRef.current, {
        xPercent: isMobile ? -80 : -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: isMobile ? 0.5 : 2,
        }
      });

      // Spinning Stars
      gsap.to(".marquee-star", {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full pt-24 pb-16 md:py-32 overflow-hidden bg-[#F2F2F0] dark:bg-[#050505] transition-colors duration-700"
    >
      <div className="w-full whitespace-nowrap overflow-hidden">
        <div ref={textRef} className="flex items-center gap-4 md:gap-8 will-change-transform">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-8">
              <h2 className="text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none text-black dark:text-white">
                PROYECTOS
              </h2>
              <Star 
                className="marquee-star w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] text-black dark:text-white" 
                fill="currentColor" 
                strokeWidth={0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
