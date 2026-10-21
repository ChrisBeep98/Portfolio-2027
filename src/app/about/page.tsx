"use client";

import React, { useRef, useEffect } from "react";
import Header from "@/components/sections/Header";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Zap, Figma } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Elements to be animated on load, initially hidden or off-screen.
      // These classes will be applied in conjunction with initial CSS states (or handled by GSAP's fromTo).
      
      // 1. INITIAL LOAD ANIMATION (Grow & Reveal)
      // Ensure elements are hidden/off-screen before the animation starts
      gsap.set(".hero-text-reveal", { y: 60, opacity: 0 });
      gsap.set(".name-title-text", { y: "100%" });
      gsap.set(".name-title-mask", { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(".reveal-monolith", { scale: 1.1, opacity: 0, filter: "blur(10px)" });
      gsap.set(".reveal-insight", { scale: 0.8, opacity: 0, y: 40 });
      gsap.set(".tech-grid-line", { scaleY: 0, transformOrigin: "top" }); // Grid lines
      gsap.set(".profile-label-reveal", { x: -20, opacity: 0 });

      tl.fromTo(".tech-grid-line", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 1.5, stagger: 0.05, transformOrigin: "top" }
      )
      .to(".profile-label-reveal", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=1.2")
      .fromTo(".hero-text-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        "-=1.0" // Start slightly before the grid lines finish
      )
      // Name Mask Reveal
      .fromTo(".name-title-mask", 
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out" },
        "-=1.2" // Overlap with hero text reveal
      )
      .fromTo(".name-title-text", 
        { y: "100%" },
        { y: "0%", duration: 1.5, ease: "power4.out" },
        "<" // Start at the same time as the mask reveal
      )
      // Optimized Image Reveal (GPU Accelerated)
      .fromTo(".reveal-monolith", 
        { scale: 1.1, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out", force3D: true },
        "-=1.2" // Overlap with name reveal
      )
      .fromTo(".reveal-insight",
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.75)", force3D: true },
        "-=1.4" // Overlap with monolith reveal
      );

      // 2. PARALLAX SCROLL (Optimized Scrub)
      gsap.to(".parallax-monolith-layer", {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-monolith-layer",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5 // Smoother scrubbing
        }
      });

      gsap.to(".parallax-insight-layer", {
        y: -250, // Faster movement for depth
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-insight-layer",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });

      gsap.to(".vertical-text", {
        y: -80,
        scrollTrigger: {
          trigger: ".parallax-monolith-layer",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // 3. STORY ANIMATION
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.set(".story-title-text", { y: "100%" });
      gsap.set(".story-title-mask", { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(".story-reveal-item", { y: 40, opacity: 0 });

      storyTl.fromTo(".story-title-mask", 
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" }
      )
      .fromTo(".story-title-text", 
        { y: "100%" },
        { y: "0%", duration: 1.2, ease: "power4.out" }, "<"
      )
      .to(".story-reveal-item", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

      // 4. TOOLS MASTER PINNING & REVEAL
      const toolsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tools-section",
          start: "top 75%", // Trigger slightly earlier for smoother entry
          toggleActions: "play none none reverse"
        }
      });

      gsap.set(".tools-title-text", { y: "100%" });
      gsap.set(".tools-title-mask", { clipPath: "inset(0% 0% 100% 0%)" });
      
      // Initialize tool cards hidden
      gsap.set(".tool-card-reveal", { y: 50, opacity: 0, scale: 0.95 });

      toolsTl.fromTo(".tools-title-mask", 
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" }
      )
      .fromTo(".tools-title-text", 
        { y: "100%" },
        { y: "0%", duration: 1.2, ease: "power4.out" }, "<"
      );

      // 5. INDIVIDUAL CARD REVEALS
      const cards = gsap.utils.toArray(".tool-card-reveal");
      cards.forEach((card: any) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5, // Faster animation
          ease: "power2.in", // Accelerating ease
          scrollTrigger: {
            trigger: card,
            start: "top 95%", 
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-background text-foreground min-h-screen font-sans transition-colors duration-1000 relative">
      <Header />
      
      {/* WRAPPER FOR REVEAL EFFECT */}
      <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        {/* GRID ESTRUCTURAL */}
      <div className="fixed inset-0 pointer-events-none z-0 px-frame">
        <div className="grid grid-cols-4 lg:grid-cols-12 h-full w-full gap-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`tech-grid-line w-px h-full bg-foreground/[0.03] dark:bg-white/[0.03] relative ${i > 3 ? 'hidden lg:block' : ''}`} />
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-[8em] lg:pt-[12em] pb-[2em] px-frame z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
          
          {/* TEXT CONTENT */}
          <div className="lg:col-span-7 flex flex-col pr-0 lg:pr-20">
            <div className="mb-6 lg:mb-12 profile-label-reveal">
              <span className="font-mono text-[0.6em] uppercase tracking-[0.5em] text-orange-500 font-bold flex items-center gap-4">
                <span className="w-8 h-px bg-orange-500" />
                <span className="italic">{t.about.profile}</span>
              </span>
            </div>
            <div className="mb-8 lg:mb-16 max-w-4xl">
              <div className="name-title-mask overflow-hidden">
                <h1 className="name-title-text text-4xl md:text-7xl lg:text-[4.5rem] font-bold tracking-tighter leading-[1.1] uppercase text-black dark:text-white">
                  Christian Sandoval Moná
                </h1>
              </div>
            </div>
            <div className="hero-text-reveal max-w-xl border-l-0 lg:border-l-2 border-orange-500 pl-0 lg:pl-8 space-y-8 text-xl md:text-2xl font-light leading-snug text-foreground/70">
              <p>{t.about.intro}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                {["UX / UI", "Webflow Dev", "Bilingual"].map((tag) => (
                  <span key={tag} className="px-4 py-1 border border-foreground/10 rounded-full font-mono text-[0.55em] uppercase tracking-widest opacity-40">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* VISUAL EXHIBITION (Refactored) */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-0">
            
            {/* Main Monolith */}
            <div className="reveal-monolith parallax-monolith-layer relative w-full aspect-[3/4.2] bg-neutral-200 dark:bg-neutral-900 shadow-2xl overflow-hidden rounded-sm will-change-transform">
              <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68b22e2584f095b8afb03eec_Generated%20Image%20August%2029%2C%202025%20-%203_03PM.jpeg" alt="Portrait" className="w-full h-full object-cover brightness-110 contrast-110" />
              <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay opacity-0 dark:opacity-100 transition-opacity" />
              <div className="absolute top-6 right-6 font-mono text-[0.45em] tracking-[0.4em] text-white mix-blend-difference vertical-text">CS_REF_001</div>
            </div>

            {/* Insight Image (Elevated Position & Optimized) */}
            <div className="reveal-insight parallax-insight-layer absolute -bottom-12 lg:-bottom-8 right-0 lg:right-auto lg:-left-24 w-[55%] aspect-square z-20 p-[0.35em] lg:p-4 bg-background shadow-2xl border border-foreground/5 rounded-sm overflow-hidden will-change-transform">
              <div className="w-full h-full overflow-hidden">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68b22e25d6ef7c3b9aeab6e8_Generated%20Image%20August%2029%2C%202025%20-%202_51PM.jpeg" alt="Detail" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>

            {/* Tech Specs */}
            <div className="mt-32 md:mt-20 text-left lg:text-right hero-text-reveal">
              <p className="font-mono text-[0.65em] uppercase tracking-[0.3em] opacity-40 leading-loose">27 Años / Salento, COL</p>
            </div>
          </div>

        </div>
      </section>

      {/* STORY SECTION */}
      <section className="story-section relative py-[6em] lg:pt-[8em] lg:pb-[10em] px-frame border-t border-foreground/5 z-10 bg-background">
        <div className="mb-16">
          <div className="story-title-mask overflow-hidden">
            <h3 className="story-title-text text-[2.5rem] md:text-7xl lg:text-[4.5rem] font-bold uppercase tracking-tighter leading-none text-foreground">
              {t.story.title}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[3em] lg:gap-[5em] items-start">
          <div className="story-reveal-item"><p className="text-xl font-light leading-relaxed text-foreground/70">{t.story.p1}</p></div>
          <div className="story-reveal-item"><p className="text-xl font-light leading-relaxed text-foreground/70">{t.story.p2}</p></div>
          <div className="relative group story-reveal-item">
            <span className="font-mono text-[0.6em] uppercase tracking-[0.3em] text-foreground/20 font-bold block mb-8">[ {t.story.disciplinesTitle} ]</span>
            <div className="space-y-2">
              {t.story.disciplinesList.map((item, i) => (
                <div key={i} className="flex items-center gap-6 py-4 px-6 rounded-xl border border-transparent hover:border-foreground/5 hover:bg-foreground/[0.01] transition-all duration-500 group/item">
                  <span className="font-mono text-[0.6em] text-orange-500/40 group-hover/item:text-orange-500 transition-colors">0{i + 1}</span>
                  <span className="text-lg font-bold uppercase tracking-tight text-foreground/80 group-hover/item:text-foreground transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS SECTION (Refactored & Stable) */}
      <section className="tools-section relative py-[6em] lg:py-[10em] px-frame border border-foreground/5 z-10 theme-invert bg-background overflow-hidden rounded-[40px] lg:rounded-[48px] mx-0 lg:mx-[0.5em]">
        <div className="flex flex-col lg:flex-row items-start">
          
          {/* LADO IZQUIERDO: Sticky Nativo */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 mb-20 lg:mb-0">
            <div className="lg:pr-24">
              <div className="tools-title-mask overflow-hidden">
                <h3 className="tools-title-text text-[2.5rem] md:text-7xl lg:text-[4.5rem] font-bold uppercase tracking-tighter leading-[0.85] text-foreground mb-8">
                  {t.tools.title}
                </h3>
              </div>
              <p className="text-xl font-light leading-relaxed text-foreground/60 max-w-sm">{t.tools.description}</p>
            </div>
          </div>

          {/* LADO DERECHO: Checkerboard Real (Zig-Zag solo en Desktop) */}
          <div className="w-full lg:w-7/12 flex justify-end">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-3xl bg-transparent gap-2 lg:gap-0">
              {t.tools.items.map((tool, i) => {
                const isEven = i % 2 === 0;
                return (
                  <React.Fragment key={i}>
                    {isEven ? (
                      <>
                        <div className="group relative aspect-[1.8/1] lg:aspect-[1.3/1] bg-[var(--card-bg)] border border-foreground/[0.06] rounded-[3px] shadow-[var(--card-shadow)] hover:scale-[1.03] hover:z-20 transition-all duration-700 flex flex-col items-start justify-between text-left p-[14px] lg:p-8 tool-card-reveal">
                          <div className="w-full flex justify-between items-start">
                            <div className="group-hover:scale-110 transition-transform duration-700 ease-out">
                              {/* @ts-ignore */}
                              {tool.name === 'GSAP' ? (
                                <Zap className="w-8 lg:w-10 h-8 lg:h-10 text-[#88CE02]" strokeWidth={1.5} />
                              ) : tool.name === 'FIGMA' ? (
                                <Figma className="w-8 lg:w-10 h-8 lg:h-10 text-[#F24E1E]" strokeWidth={1.5} />
                              ) : (
                                <img 
                                  src={tool.img} 
                                  alt={tool.name} 
                                  className={`w-8 lg:w-10 h-8 lg:h-10 object-contain transition-all duration-500 ${tool.name === 'A.I.' ? 'dark:brightness-0 dark:invert' : ''}`} 
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-xl lg:text-2xl tracking-tighter text-foreground block mb-2">{tool.name}</span>
                            <p className="text-[0.8em] lg:text-[0.9em] leading-relaxed text-foreground/70 group-hover:text-foreground transition-colors duration-500 font-light">{tool.desc}</p>
                          </div>
                        </div>
                        <div className="hidden lg:block aspect-[1.8/1] lg:aspect-[1.3/1]" />
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block aspect-[1.8/1] lg:aspect-[1.3/1]" />
                        <div className="group relative aspect-[1.8/1] lg:aspect-[1.3/1] bg-[var(--card-bg)] border border-foreground/[0.06] rounded-[3px] shadow-[var(--card-shadow)] hover:scale-[1.03] hover:z-20 transition-all duration-700 flex flex-col items-start justify-between text-left p-[14px] lg:p-8 tool-card-reveal">
                          <div className="w-full flex justify-between items-start">
                            <div className="group-hover:scale-110 transition-transform duration-700 ease-out">
                              {/* @ts-ignore */}
                              {tool.name === 'GSAP' ? (
                                <Zap className="w-8 lg:w-10 h-8 lg:h-10 text-[#88CE02]" strokeWidth={1.5} />
                              ) : tool.name === 'FIGMA' ? (
                                <Figma className="w-8 lg:w-10 h-8 lg:h-10 text-[#F24E1E]" strokeWidth={1.5} />
                              ) : (
                                <img 
                                  src={tool.img} 
                                  alt={tool.name} 
                                  className={`w-8 lg:w-10 h-8 lg:h-10 object-contain transition-all duration-500 ${tool.name === 'A.I.' ? 'dark:brightness-0 dark:invert' : ''}`} 
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-xl lg:text-2xl tracking-tighter text-foreground block mb-2">{tool.name}</span>
                            <p className="text-[0.8em] lg:text-[0.9em] leading-relaxed text-foreground/70 group-hover:text-foreground transition-colors duration-500 font-light">{tool.desc}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <Process />
      </div>

      <Footer />

      <div className="fixed bottom-12 left-12 mix-blend-difference z-40 hidden lg:block opacity-20 pointer-events-none">
        <p className="font-mono text-[0.5em] tracking-[1em] uppercase rotate-[-90deg] origin-left">ART_DIRECTION_2026</p>
      </div>
    </main>
  );
}

