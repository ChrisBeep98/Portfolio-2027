"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Zap, Star, Triangle, Diamond, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ContentItem {
  type: "text" | "accent";
  id: string;
  icon?: LucideIcon;
  className?: string;
  isSpecial?: boolean;
  isOrange?: boolean;
}

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loops: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      // Líneas decorativas
      gsap.from(".about-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      // Animación de palabras (Slide Up con máscara)
      gsap.from(".about-word-inner", {
        yPercent: 100,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Animación de iconos
      gsap.from(".about-accent", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Rotaciones y pulsos suaves (GPU Optimized). Se guardan para pausarlos
      // cuando la sección sale del viewport: un loop infinito offscreen sigue
      // escribiendo estilos y repintando en cada frame (Hardware Symphony §1).
      loops.push(
        gsap.to(".about-accent-rotate", {
          rotation: 360,
          duration: 15,
          repeat: -1,
          ease: "none"
        }),
        gsap.to(".about-accent-pulse", {
          y: -10,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      );

    }, sectionRef);

    const loopsIO = new IntersectionObserver(
      ([entry]) => loops.forEach((loop) => loop.paused(!entry.isIntersecting)),
      { rootMargin: "10% 0px" }
    );
    if (sectionRef.current) loopsIO.observe(sectionRef.current);

    return () => {
      loopsIO.disconnect();
      ctx.revert();
    };
  }, [t]);

  const content: ContentItem[] = [
    { type: "text", id: "w1" },
    { type: "text", id: "w2" },
    { type: "text", id: "w3" },
    { type: "text", id: "w4" },
    { type: "text", id: "w5" },
    { type: "text", id: "w6" },
    { type: "text", id: "w7" },
    { type: "text", id: "w8" },
    { type: "accent", id: "a1", icon: Sparkles, className: "text-orange-500 about-accent-rotate" },
    { type: "text", id: "w9" },
    { type: "text", id: "w10" },
    { type: "text", id: "w11" },
    { type: "text", id: "w12" },
    { type: "text", id: "w13" },
    { type: "accent", id: "a2", icon: Zap, className: "text-purple-500 about-accent-pulse" },
    { type: "text", id: "w14" },
    { type: "text", id: "w15" },
    { type: "text", id: "w16" },
    { type: "text", id: "w17" },
    { type: "accent", id: "a3", icon: Star, className: "text-cyan-500 about-accent-rotate" },
    { type: "text", id: "w18" },
    { type: "text", id: "w19" },
    { type: "text", id: "w20" },
    { type: "accent", id: "a4", icon: Triangle, className: "text-pink-500 about-accent-rotate" },
    { type: "text", id: "w21" },
    { type: "text", id: "w22" },
    { type: "text", id: "w23" },
    { type: "text", id: "w24" },
    { type: "text", id: "w25" },
    { type: "accent", id: "a5", icon: Diamond, className: "text-yellow-500 about-accent-pulse" },
    { type: "text", id: "w26" },
    { type: "text", id: "w27" },
    { type: "text", id: "w28" },
    { type: "text", id: "w29" },
    { type: "text", id: "w30", isSpecial: true },
    { type: "text", id: "w31", isSpecial: true },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#F2F2F0] dark:bg-[#050505] transition-colors duration-700 mt-[8em]"
    >
      <div
        ref={containerRef}
        className="relative min-h-[70vh] sm:min-h-screen w-full flex items-center bg-[#050505] dark:bg-[#F2F2F0] rounded-[36px] transition-colors duration-700 py-24 sm:py-32 px-3.5 sm:px-[2em] lg:px-[4em] overflow-hidden"
      >
        <div className="about-line absolute top-0 left-0 w-full h-px bg-white/20 dark:bg-black/20 origin-left" />

        <div className="max-w-[1600px] mx-auto w-full relative z-10">
          <h2 className="text-[8.5vw] sm:text-[7.5vw] md:text-[6vw] lg:text-[4vw] lg:font-medium font-bold tracking-tighter leading-[1.25] sm:leading-[1.15] text-white dark:text-black">
            {content.map((item, index) => {
              if (item.type === "text") {
                const text = (t.about as any)[item.id];
                if (!text) return null;
                return (
                  <span
                    key={index}
                    className="inline-block overflow-hidden align-top pt-[0.1em] pb-[0.15em] px-[0.05em] -mt-[0.1em] -mb-[0.15em] -mx-[0.05em] mr-[0.25em]"
                  >
                    <span
                      className={`about-word-inner inline-block will-change-transform pr-[0.1em] ${
                        item.isSpecial ? "italic font-light" : ""
                      }`}
                    >
                      {text}
                    </span>
                  </span>
                );
              }

              if (item.type === "accent" && item.icon) {
                const Icon = item.icon;
                return (
                  <span
                    key={index}
                    className={`about-accent inline-flex items-center justify-center mx-[0.25em] ${item.className}`}
                  >
                    <Icon className="w-[0.7em] h-[0.7em]" strokeWidth={2} />
                  </span>
                );
              }

              return null;
            })}
          </h2>
        </div>

        <div className="about-line absolute bottom-0 left-0 w-full h-px bg-white/20 dark:bg-black/20 origin-right" />
      </div>
    </section>
  );
}
