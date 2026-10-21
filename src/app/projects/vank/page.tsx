"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronUp, X } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const STYLING = {
  section: "grid grid-cols-1 lg:grid-cols-[35%_65%] content-gap px-frame section-gap border-b border-foreground/5",
  label: "font-sans text-[1.25rem] uppercase tracking-tighter text-foreground/30 font-bold block mb-1 ml-[6px]"
};

export default function VankProject() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      // reveal animations
      gsap.fromTo(".hero-title-mask", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out", delay: 0.5 });
      gsap.fromTo(".hero-title-text", { y: "100%" }, { y: "0%", duration: 1.5, ease: "power4.out", delay: 0.5 });
      gsap.from(".hero-subtitle", { y: 40, opacity: 0, duration: 1.2, delay: 0.9, ease: "power3.out" });
      gsap.from(".meta-reveal", { y: 20, opacity: 0, duration: 0.8, stagger: 0.05, delay: 0.4, ease: "power2.out" });

      const imgContainers = gsap.utils.toArray(".hero-img-container");
      imgContainers.forEach((container: any) => {
        gsap.fromTo(container, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 92%", toggleActions: "play none none reverse" }
        });
      });

      ["01", "02", "03", "04", "05"].forEach(num => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: num === "01" ? "#contexto" : num === "02" ? "#acto02" : num === "03" ? "#solucion" : num === "04" ? "#resultado" : "#impacto", start: "top 80%", toggleActions: "play none none reverse" }});
        tl.fromTo(`.acto${num}-title-mask`, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.1, ease: "power4.out" })
          .fromTo(`.acto${num}-title-text`, { y: "100%" }, { y: "0%", duration: 1.2, stagger: 0.1, ease: "power4.out" }, "<");
        
        gsap.utils.toArray(`.acto${num}-desc`).forEach((el: any) => {
          gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" }});
        });
      });

      const sections = ["hero", "contexto", "acto02", "solucion", "resultado", "impacto"];
      sections.forEach((section, index) => {
        ScrollTrigger.create({ trigger: `#${section}`, start: "top center", end: "bottom center", onEnter: () => setActiveSection(index), onEnterBack: () => setActiveSection(index) });
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [t]);

  const scrollToSection = (id: string) => {
    gsap.to(window, { duration: 1.5, scrollTo: { y: `#${id}`, autoKill: false }, ease: "power4.inOut" });
    setIsIndexOpen(false);
  };

  const renderTitle = (titleArray: string[], mobileTitleArray: string[], actoNum: string) => (
    <div className="space-y-2">
      <div className="lg:hidden">
        <div className={`${actoNum}-title-mask overflow-hidden pt-2 -mt-2`}>
          <h2 className={`${actoNum}-title-text font-bold uppercase tracking-tighter will-change-transform text-[clamp(2.5rem,8vw,4.5em)] leading-[0.9]`}>
            {mobileTitleArray.join(" ")}
          </h2>
        </div>
      </div>
      <div className="hidden lg:block space-y-2">
        {titleArray.map((line, i) => (
          <div key={i} className={`${actoNum}-title-mask overflow-hidden pt-2 -mt-2`}>
            <h2 className={`${actoNum}-title-text font-bold uppercase tracking-tighter will-change-transform text-[clamp(2.5rem,4.5vw,6em)] leading-[0.85]`}>
              {line}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );

  const navigationItems = [
    { id: "hero", label: "Intro" },
    { id: "contexto", label: t.vank.intro.contextLabel.split(' ')[0] },
    { id: "acto02", label: t.vank.intro.back === "Projects" ? "Challenge" : "Desafío" },
    { id: "solucion", label: t.vank.intro.back === "Projects" ? "Solution" : "Solución" },
    { id: "resultado", label: t.vank.intro.back === "Projects" ? "Result" : "Resultado" },
    { id: "impacto", label: t.vank.intro.back === "Projects" ? "Impact" : "Impacto" }
  ];

  return (
    <main ref={containerRef} className="bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background overflow-x-clip">
      <Header hideLogo={true} />
      
      {/* Back Button */}
      <div className="fixed top-8 left-6 md:left-12 lg:left-20 z-[110] mix-blend-difference pointer-events-none">
        <Link href="/#projects" className="pointer-events-auto group flex items-center gap-[0.75em] text-white">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="hidden font-bold text-[0.65em] uppercase tracking-[0.3em]">{t.vank.intro.back}</span>
        </Link>
      </div>

      {/* MOBILE FLOATING INDEX */}
      <div className="lg:hidden fixed bottom-8 right-6 z-[120] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isIndexOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex flex-col items-end gap-2 pointer-events-none"
            >
              {navigationItems.map((item, index) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className={`pointer-events-auto px-4 h-9 rounded-[4px] backdrop-blur-2xl transition-all duration-500 flex items-center gap-3 border ${
                    activeSection === index 
                      ? "bg-foreground text-background border-foreground shadow-lg" 
                      : "bg-background/40 text-foreground border-foreground/10"
                  }`}
                >
                  <span className="font-mono text-[0.65em] opacity-50">0{index}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsIndexOpen(!isIndexOpen)}
          className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
        >
          {isIndexOpen ? <X size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col lg:flex-row relative">
          
          <aside className="hidden lg:flex flex-col w-[15%] h-screen sticky top-0 pt-48 pl-12 justify-start z-40 pointer-events-none self-start">
            <div className="relative pointer-events-auto flex flex-col">
              <div className="absolute left-[-1rem] w-[2px] h-5 bg-black dark:bg-white transition-all duration-500 ease-out" style={{ transform: `translateY(${activeSection * 2.25}rem)` }} />
              {navigationItems.map((item, index) => (
                <button key={index} onClick={() => scrollToSection(item.id)} className={`text-left text-[12px] font-normal tracking-tight transition-all duration-300 block w-full pl-6 h-[2.25rem] flex items-center ${activeSection === index ? "opacity-100 text-foreground" : "opacity-30 hover:opacity-60 text-foreground"}`}>
                  <span className="font-mono text-[0.8em] mr-3 opacity-50">0{index}</span>
                  <span className="uppercase tracking-[0.1em]">{item.label}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="w-full lg:w-[85%] pb-[15vh]">
            
            <header id="hero" className="px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] pt-[8em] md:pt-[8em] pb-0">
              <div className="flex flex-col mb-0 pb-[1.5em] md:mb-0 md:pb-[4em] px-[14px] md:px-0">
                <div className="hero-title-mask overflow-hidden pb-4 -mb-4">
                  <h1 className="hero-title-text font-black tracking-[-0.08em] uppercase will-change-transform text-[clamp(2.5rem,4.5vw,6em)] leading-[0.85]">
                    {t.vank.intro.title}<span className="text-yellow-300 ml-[0.05em]">.</span>
                  </h1>
                </div>
                <p className="hero-subtitle text-[5vw] lg:text-[2rem] font-medium tracking-normal mt-[0.8em] md:mt-[0.6em] text-foreground/80 leading-[1.1] max-w-4xl will-change-transform">
                  {t.vank.intro.tagline}
                </p>
              </div>

              <div className="md:hidden w-full pb-[3em]">
                <div className="hero-img-container overflow-hidden bg-surface shadow-sm h-auto relative flex items-center justify-center">
                  <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98ffcf18c76db9ce92b_MacBook%20Air%20M4%20-%20Sky%20Blue-2.jpg" 
                    alt="Vank" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 md:gap-20 pt-[1.5em] md:pt-[4em] border-t border-foreground/10 pb-[3em] md:pb-[4em] px-[14px] md:px-0">
                <div className="flex flex-col gap-[1.5em]">
                  <span className="font-sans text-[0.85em] italic opacity-40 block mb-[0.25em] md:mb-[1.5em] meta-reveal">{t.vank.intro.contextLabel}</span>
                  <p className="text-xl md:text-2xl font-light leading-snug tracking-normal max-w-2xl opacity-80 will-change-transform meta-reveal">{t.vank.intro.contextDesc}</p>
                </div>
                <div className="grid grid-cols-2 gap-y-[2.5em] gap-x-[2em]">
                  {[
                    { l: t.vank.intro.meta.services, v: "UX / UI Strategy" },
                    { l: t.vank.intro.meta.date, v: "2023 - 2024" },
                    { l: t.vank.intro.meta.deliverables, v: "MVP, UI Kit" },
                    { l: t.vank.intro.meta.ecosystem, v: "Fintech" }
                  ].map((item, i) => (
                    <div key={i} className="meta-reveal space-y-[0.5em] will-change-transform">
                      <h5 className="font-sans text-[0.85em] italic opacity-40 block">{item.l}</h5>
                      <p className="text-sm font-bold uppercase tracking-tight text-foreground/80">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* CINEMATIC IMAGE 1 */}
            <section className="hidden md:block w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98ffcf18c76db9ce92b_MacBook%20Air%20M4%20-%20Sky%20Blue-2.jpg" 
                  alt="MacBook" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            {/* CINEMATIC IMAGE 2 */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98c8b356cc505bff059_iPad%20Mockup%20Light-2.jpg" 
                  alt="iPad" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section id="contexto" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.vank.acto01.label}</span>
                {renderTitle(t.vank.acto01.title, t.vank.acto01.titleMobile, "acto01")}
              </div>
              <div className="pt-[4em] md:pt-[18em]">
                <p className="acto01-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">{t.vank.acto01.description}</p>
              </div>
            </section>

            {/* CINEMATIC IMAGE 3 */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98d47f23eece986b74c_Layout%205.jpg" 
                  alt="Layout Detail" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            {/* CINEMATIC IMAGE 4 */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98de492f2b844c5bf3a_Frame%201171275577.jpg" 
                  alt="UI System" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section id="acto02" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.vank.acto02.label}</span>
                {renderTitle(t.vank.acto02.title, t.vank.acto02.titleMobile, "acto02")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <div className="space-y-[1.5em]">
                  <h3 className="acto02-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground will-change-transform">{t.vank.acto02.contextLabel}</h3>
                  <p className="acto02-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">{t.vank.acto02.contextDesc}</p>
                </div>
                <div className="space-y-[2em]">
                  <h3 className="acto02-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground will-change-transform">{t.vank.acto02.problemsLabel}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {t.vank.acto02.problemsList.map((text: string, i: number) => (
                      <div key={i} className="acto02-desc flex items-start gap-[0.75em] will-change-transform">
                        <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                        <p className="text-lg md:text-xl font-light leading-snug opacity-80">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-[4em] md:pt-[6em] pb-[2em] flex justify-start md:justify-center text-left md:text-center px-[14px] md:px-0 lg:-ml-[66.6%] lg:w-[166.6%] pointer-events-none">
                  <p className="acto02-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform pointer-events-auto text-left md:text-center">
                    {t.vank.acto02.insightMessage}
                  </p>
                </div>
                <div className="space-y-[2.5em] pt-[4em] lg:-ml-[66.6%] lg:w-full">
                  <h3 className="acto02-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground will-change-transform">{t.vank.acto02.insightsLabel}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {t.vank.acto02.insightsList.map((text: string, i: number) => (
                      <div key={i} className="acto02-desc flex items-start gap-[0.75em] will-change-transform">
                        <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                        <p className="text-lg md:text-xl font-light leading-snug opacity-80">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CINEMATIC IMAGE 5 */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98fac1c6a1592b34c6c_MacBook%20Air%20M4%20-%20Sky%20Blue-1.jpg" 
                  alt="Interface 1" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            {/* CINEMATIC IMAGE 6 */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98e7d50442728168c29_MacBook%20Air%20M4%20-%20Sky%20Blue.jpg" 
                  alt="Interface 2" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section className="px-[14px] md:px-frame py-[6em] md:py-[10em] flex justify-start md:justify-center text-left md:text-center">
              <p className="acto02-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform text-left md:text-center">
                {t.vank.acto02.objectivesBridge}
              </p>
            </section>

            <section className="px-[14px] md:px-frame lg:pl-0 lg:pr-[8em] pb-[4em] mt-[2em] md:mt-[4em] overflow-hidden text-left">
              <div className="max-w-5xl flex flex-col items-start space-y-[1.5em]">
                <h3 className="acto02-desc text-xl md:text-2xl font-medium tracking-tight text-foreground will-change-transform text-left">
                  {t.vank.acto02.objectivesLabel}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 w-full">
                  {t.vank.acto02.objectivesList.map((text: string, i: number) => (
                    <div key={i} className="acto02-desc flex items-start gap-[0.75em] will-change-transform text-left">
                      <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                      <p className="text-lg md:text-xl font-light leading-snug opacity-80 text-left">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98f4cacb189e2e1ce90_iPad%20Mockup%20Light.jpg" 
                  alt="iPad Process" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section id="solucion" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.vank.acto03.label}</span>
                {renderTitle(t.vank.acto03.title, t.vank.acto03.titleMobile, "acto03")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <p className="acto03-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                  {t.vank.acto03.description}
                </p>
                
                <div className="grid grid-cols-1 gap-y-10">
                  {t.vank.acto03.list.map((text: string, i: number) => (
                    <div key={i} className="acto03-desc flex items-start gap-[1.5em] will-change-transform md:border-l border-foreground/10 md:pl-8">
                      <p className="text-lg md:text-xl font-light leading-snug opacity-80">
                        <span className="font-bold text-foreground opacity-100 block mb-2">
                          {text.split(":")[0]}
                        </span>
                        {text.split(":")[1]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-video relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/6897f7d682665ced3cd4a2cb_Wireframe%20-%201.png" 
                  alt="Wireframes" className="w-full h-full object-contain relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[60vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68983095c959083bd0f24696_Frame%201000004217.jpg" 
                  alt="Design System Detail" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[60vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/6898309237fee820de12d95b_fasfdasdf.png" 
                  alt="Process Detail" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section className="px-[14px] md:px-frame py-[6em] md:py-[10em] flex justify-start md:justify-center items-start md:items-center text-left md:text-center w-full">
              <p className="acto03-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform md:mx-auto md:-translate-x-[80px] text-left md:text-center">
                {t.vank.acto03.solutionBridge}
              </p>
            </section>

            <section className="px-[14px] md:px-frame lg:pl-0 lg:pr-[8em] pb-[4em] overflow-hidden text-left">
              <div className="max-w-5xl flex flex-col items-start space-y-[4em] md:space-y-[6em]">
                {t.vank.acto03.methodologyDetails.map((item: any, i: number) => (
                  <div key={i} className="acto03-desc space-y-4 will-change-transform">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-xl font-light leading-snug opacity-70 max-w-4xl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-[14px] md:px-frame py-[2em] md:py-[4em] flex justify-start md:justify-center items-start md:items-center text-left md:text-center w-full">
              <p className="acto03-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform md:mx-auto md:-translate-x-[80px] text-left md:text-center">
                {t.vank.acto03.designSystemBridge}
              </p>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/689683784f56907d00b74a31_isometric-frame-1%20vank.jpg" 
                  alt="Design System Isometric" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section id="resultado" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.vank.acto04.label}</span>
                {renderTitle(t.vank.acto04.title, t.vank.acto04.titleMobile, "acto04")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <p className="acto04-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                  {t.vank.acto04.description}
                </p>
              </div>
            </section>

            <section className="px-[14px] md:px-frame py-[6em] md:py-[10em] flex justify-start md:justify-center items-start md:items-center text-left md:text-center w-full">
              <p className="acto04-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform md:mx-auto md:-translate-x-[80px] text-left md:text-center">
                {t.vank.acto04.resultBridge}
              </p>
            </section>

            <section className="px-[14px] md:px-frame lg:pl-0 lg:pr-[8em] pb-[4em] overflow-hidden text-left">
              <div className="max-w-5xl flex flex-col items-start space-y-[3em]">
                <h3 className="acto04-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground will-change-transform text-left">
                  {t.vank.acto04.changesLabel}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 w-full">
                  {t.vank.acto04.results.map((text: string, i: number) => (
                    <div key={i} className="acto04-desc flex items-start gap-[0.75em] will-change-transform text-left">
                      <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                      <p className="text-lg md:text-xl font-light leading-snug opacity-80 text-left">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98c8b356cc505bff059_iPad%20Mockup%20Light-2.jpg" 
                  alt="Final iPad Showcase" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/689447f99d4a88b1d0f561b3_01%20Free%20iPhone%2016%20Pro%20Mockup%20On%20Rock.jpg" 
                  alt="Final iPhone Showcase" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

            <section id="impacto" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden border-t border-foreground/5">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.vank.impact.label}</span>
                {renderTitle(t.vank.impact.title, t.vank.impact.titleMobile, "acto05")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <p className="acto05-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                  {t.vank.impact.description}
                </p>

                <div className="pt-[4em] md:pt-[6em] pb-[2em] flex justify-start md:justify-center text-left md:text-center px-[14px] md:px-0 lg:-ml-[66.6%] lg:w-[166.6%] pointer-events-none">
                  <p className="acto05-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform pointer-events-auto text-left md:text-center">
                    {t.vank.impact.insightMessage}
                  </p>
                </div>

                <div className="space-y-[2.5em] pt-[4em] lg:-ml-[66.6%] lg:w-full">
                  <h3 className="acto05-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground bill-change-transform text-left">
                    {t.vank.impact.resultsLabel}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 w-full">
                    {t.vank.impact.resultsList.map((text: string, i: number) => (
                      <div key={i} className="acto05-desc flex items-start gap-[0.75em] will-change-transform text-left">
                        <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                        <p className="text-lg md:text-xl font-light leading-snug opacity-80 text-left">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68981ddc80f51af6ea7290e6_iphone-14-pro-mockup-against-the-wall-front-view.jpg" 
                  alt="iPhone 14 Pro Mockup" className="w-full h-full object-cover relative" loading="lazy" decoding="async" />
              </div>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
