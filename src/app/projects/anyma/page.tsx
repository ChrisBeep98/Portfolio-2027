"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronUp, X } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const STYLING = {
  label: "text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 block mb-8 meta-reveal",
  titleLine: "font-black tracking-tighter uppercase text-[clamp(2.5rem,8vw,10em)] leading-[0.8]",
};

export default function AnymaProject() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      // reveal animations
      gsap.fromTo(".hero-title-mask", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out", delay: 0.5 });
      gsap.fromTo(".hero-title-text", { y: "100%" }, { y: "0%", duration: 1.5, ease: "power4.out", delay: 0.5 });
      gsap.from(".hero-subtitle", { y: 40, opacity: 0, duration: 1.2, delay: 0.9, ease: "power3.out" });
      gsap.from(".meta-reveal", { y: 20, opacity: 0, duration: 0.8, stagger: 0.05, delay: 0.4, ease: "power2.out" });

      const imgContainers = gsap.utils.toArray(".hero-img-container");
      const acts = ["01", "02", "03", "04", "05"];
      acts.forEach((num) => {
        const triggerId = num === "01" ? "#contexto" : num === "02" ? "#acto02" : num === "03" ? "#solucion" : num === "04" ? "#resultado" : "#impacto";
        const tl = gsap.timeline({ scrollTrigger: { trigger: triggerId, start: "top 80%", toggleActions: "play none none reverse" }});
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
    { id: "contexto", label: t.anyma.intro.contextLabel.split(' ')[0] },
    { id: "acto02", label: t.anyma.intro.back === "Projects" ? "Challenge" : "Desafío" },
    { id: "solucion", label: t.anyma.intro.back === "Projects" ? "Strategy" : "Estrategia" },
    { id: "resultado", label: t.anyma.intro.back === "Projects" ? "Result" : "Resultado" },
    { id: "impacto", label: t.anyma.intro.back === "Projects" ? "Impact" : "Impacto" }
  ];

  return (
    <main ref={containerRef} className="bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background overflow-x-clip">
      <Header hideLogo={true} />
      
      <div className="fixed top-8 left-6 md:left-12 lg:left-20 z-[110] mix-blend-difference pointer-events-none">
        <Link href="/#projects" className="pointer-events-auto group flex items-center gap-[0.75em] text-white">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="hidden font-bold text-[0.65em] uppercase tracking-[0.3em]">{t.anyma.intro.back}</span>
        </Link>
      </div>

      <div className="lg:hidden fixed bottom-8 right-6 z-[120] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isIndexOpen && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="flex flex-col items-end gap-2 pointer-events-none">
              {navigationItems.map((item, index) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`pointer-events-auto px-4 h-9 rounded-[4px] backdrop-blur-2xl transition-all duration-500 flex items-center gap-3 border ${activeSection === index ? "bg-foreground text-background border-foreground shadow-lg" : "bg-background/40 text-foreground border-foreground/10"}`}>
                  <span className="font-mono text-[0.65em] opacity-50">0{index}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsIndexOpen(!isIndexOpen)} className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform">
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
                    {t.anyma.intro.title}<span className="text-green-500 ml-[0.05em]">.</span>
                  </h1>
                </div>
                <p className="hero-subtitle text-[5vw] lg:text-[2rem] font-medium tracking-normal mt-[0.8em] md:mt-[0.6em] text-foreground/80 leading-[1.1] max-w-4xl will-change-transform">
                  {t.anyma.intro.tagline}
                </p>
              </div>

              <div className="md:hidden w-full pb-[3em]">
                <div className="hero-img-container overflow-hidden bg-surface shadow-sm h-auto relative flex items-center justify-center">
                  <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa4b79e5a3e61d548ffbab_FRONT%2001.jpg" alt="Anyma" className="w-full h-full object-cover relative" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 md:gap-20 pt-[1.5em] md:pt-[4em] border-t border-foreground/10 pb-[3em] md:pb-[4em] px-[14px] md:px-0">
                <div className="flex flex-col gap-[1.5em]">
                  <span className="font-sans text-[0.85em] italic opacity-40 block mb-[0.25em] md:mb-[1.5em] meta-reveal">{t.anyma.intro.contextLabel}</span>
                  <p className="text-xl md:text-2xl font-light leading-snug tracking-normal max-w-2xl opacity-80 will-change-transform meta-reveal">{t.anyma.intro.contextDesc}</p>
                </div>
                <div className="grid grid-cols-2 gap-y-[2.5em] gap-x-[2em]">
                  {[
                    { l: t.anyma.intro.meta.services, v: t.anyma.intro.meta.services_val },
                    { l: t.anyma.intro.meta.date, v: t.anyma.intro.meta.date_val },
                    { l: t.anyma.intro.meta.deliverables, v: t.anyma.intro.meta.deliverables_val },
                    { l: t.anyma.intro.meta.ecosystem, v: t.anyma.intro.meta.ecosystem_val }
                  ].map((item, i) => (
                    <div key={i} className="meta-reveal space-y-[0.5em] will-change-transform">
                      <h5 className="font-sans text-[0.85em] italic opacity-40 block">{item.l}</h5>
                      <p className="text-sm font-bold uppercase tracking-tight text-foreground/80">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <section className="hidden md:block w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa4b79e5a3e61d548ffbab_FRONT%2001.jpg" alt="Anyma Desktop" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa4cd96c9998dce62012bf_FRONT%2006.png" alt="Anyma UI" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section id="contexto" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.anyma.acto01.label}</span>
                {renderTitle(t.anyma.acto01.title, t.anyma.acto01.titleMobile, "acto01")}
              </div>
              <div className="pt-[4em] md:pt-[18em]">
                <p className="acto01-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">{t.anyma.acto01.description}</p>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa54e2e6d1d2e9329319de_FRONT%2007.png" alt="Anyma Showcase" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section id="acto02" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden border-t border-foreground/5">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.anyma.acto02.label}</span>
                {renderTitle(t.anyma.acto02.title, t.anyma.acto02.titleMobile, "acto02")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <div className="space-y-[1.5em]">
                  <h3 className="acto02-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground">{t.anyma.acto02.contextLabel}</h3>
                  <p className="acto02-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80">{t.anyma.acto02.contextDesc}</p>
                </div>
                <div className="space-y-[2em]">
                  <h3 className="acto02-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground">{t.anyma.acto02.problemsLabel}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {t.anyma.acto02.problemsList.map((text: string, i: number) => (
                      <div key={i} className="acto02-desc flex items-start gap-[0.75em]">
                        <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                        <p className="text-lg md:text-xl font-light leading-snug opacity-80">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa4b79cbb46c5a59badc6b_FRONT%2002.jpg" alt="Anyma UI 1" className="w-full h-full object-cover relative" />
              </div>
            </section>
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa4b172c174baf0a693012_FRONT%2003.png" alt="Anyma UI 2" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section id="solucion" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden border-t border-foreground/5 pb-0">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.anyma.acto03.label}</span>
                {renderTitle(t.anyma.acto03.title, t.anyma.acto03.titleMobile, "acto03")}
              </div>
              <div className="pt-[4em] md:pt-[18em]">
                <p className="acto03-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80">{t.anyma.acto03.description}</p>
              </div>
            </section>

            {/* BLOQUE CITA: IZQUIERDA EN MOBILE, CENTRADO DESFASADO EN DESKTOP */}
            <section className="px-[14px] md:px-frame py-[6em] md:py-[10em] flex justify-start md:justify-center text-left md:text-center w-full">
              <p className="acto03-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform lg:-ml-[36px]">
                {t.anyma.acto03.solutionBridge}
              </p>
            </section>

            {/* SECCIÓN HALLAZGOS: CIERRA CON LA IMAGEN ABAJO */}
            <section className="px-[14px] md:px-[6em] lg:pl-0 lg:pr-[8em] pb-[10em] overflow-hidden text-left">
              <div className="lg:grid lg:grid-cols-[40%_60%] w-full">
                <div className="space-y-[2.5em]">
                  <h3 className="acto03-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                    {t.anyma.acto03.insightsLabel || "Hallazgos clave"}
                  </h3>
                  <div className="grid grid-cols-1 gap-y-8">
                    {t.anyma.acto03.list.map((text: string, i: number) => (
                      <div key={i} className="acto03-desc flex items-start gap-[1em] will-change-transform">
                        <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                        <p className="text-lg md:text-xl font-light leading-snug opacity-80">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa5c7f32abbe05efae7691_FRONT09.png" alt="Anyma UI 3" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section id="resultado" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden border-t border-foreground/5">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.anyma.acto04.label}</span>
                {renderTitle(t.anyma.acto04.title, t.anyma.acto04.titleMobile, "acto04")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <p className="acto04-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80">{t.anyma.acto04.description}</p>
                
                <div className="grid grid-cols-1 gap-y-8">
                  {t.anyma.acto04.results.map((text: string, i: number) => (
                    <div key={i} className="acto04-desc flex items-start gap-[1em] will-change-transform">
                      <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                      <p className="text-lg md:text-xl font-light leading-snug opacity-80">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CINEMATIC IMAGE: UI KIT */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/689d69be046d4d5ac89866f0_ui%20kit.jpg" alt="Anyma UI Kit" className="w-full h-full object-cover relative" />
              </div>
            </section>

            {/* BLOQUE CITA FINAL: IZQUIERDA EN MOBILE, CENTRADO DESFASADO EN DESKTOP */}
            <section className="px-[14px] md:px-frame py-[6em] md:py-[10em] flex justify-start md:justify-center text-left md:text-center w-full">
              <p className="acto04-desc text-3xl md:text-5xl font-medium tracking-tighter leading-tight max-w-4xl text-foreground italic opacity-90 will-change-transform lg:-ml-[36px]">
                {t.anyma.acto04.resultBridge}
              </p>
            </section>

            {/* DETALLES POR PERFIL: ALINEADO A LA IZQUIERDA */}
            <section className="px-[14px] md:px-[6em] lg:pl-0 lg:pr-[8em] pb-[10em] overflow-hidden text-left">
              <div className="max-w-5xl flex flex-col items-start space-y-[4em] md:space-y-[6em]">
                <div className="acto04-desc space-y-4 will-change-transform">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-tight">
                    {t.anyma.acto04.playersTitle}
                  </h3>
                  <p className="text-lg md:text-xl font-light leading-snug opacity-70 max-w-4xl">
                    {t.anyma.acto04.playersDesc}
                  </p>
                </div>
                <div className="acto04-desc space-y-4 will-change-transform">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-tight">
                    {t.anyma.acto04.ownersTitle}
                  </h3>
                  <p className="text-lg md:text-xl font-light leading-snug opacity-70 max-w-4xl">
                    {t.anyma.acto04.ownersDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* CINEMATIC IMAGES: FINAL DETAILS */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa5c345cc0b69f07137d7a_FRONT%2010.jpg" alt="Anyma Detail 10" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa54e4c0e27b7c4fad830a_FRONT%2008.png" alt="Anyma Detail 08" className="w-full h-full object-cover relative" />
              </div>
            </section>

            <section id="impacto" className="grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap overflow-hidden border-t border-foreground/5">
              <div className="lg:pr-10">
                <span className={STYLING.label}>{t.anyma.impact.label}</span>
                {renderTitle(t.anyma.impact.title, t.anyma.impact.titleMobile, "acto05")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[4em]">
                <p className="acto05-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80">{t.anyma.impact.description}</p>
                <div className="space-y-[2.5em] pt-[4em] lg:-ml-[66.6%] lg:w-full">
                  <h3 className="acto05-desc text-xl md:text-2xl font-semibold tracking-tight text-foreground">{t.anyma.impact.resultsLabel}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {t.anyma.impact.resultsList.map((text: string, i: number) => (
                      <div key={i} className="acto05-desc flex items-start gap-[0.75em]">
                        <div className="w-[5px] h-[5px] rounded-full bg-foreground/30 mt-[0.6em] flex-shrink-0" />
                        <p className="text-lg md:text-xl font-light leading-snug opacity-80">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CINEMATIC IMAGE: FINAL CLOSURE */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68aa4b17ecdfeba3e54aef95_FRONT%2004.jpg" alt="Anyma Final Closure" className="w-full h-full object-cover relative" />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
