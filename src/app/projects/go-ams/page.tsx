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
  section: "grid grid-cols-1 lg:grid-cols-[40%_60%] content-gap lg:pl-0 lg:pr-[8em] px-[14px] md:px-[6em] section-gap border-t border-foreground/5",
  label: "text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-foreground/40 font-semibold block mb-2 md:mb-3 ml-[2px]",
};

export default function GoAmsProject() {
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
      // Reveal animations intro
      gsap.fromTo(
        ".hero-title-mask",
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".hero-title-text",
        { y: "100%" },
        { y: "0%", duration: 1.5, ease: "power4.out", delay: 0.5 }
      );
      gsap.from(".hero-subtitle", { y: 40, opacity: 0, duration: 1.2, delay: 0.9, ease: "power3.out" });
      gsap.from(".meta-reveal", { y: 20, opacity: 0, duration: 0.8, stagger: 0.05, delay: 0.4, ease: "power2.out" });

      const imgContainers = gsap.utils.toArray(".hero-img-container");
      imgContainers.forEach((container: any) => {
        gsap.fromTo(
          container,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: container, start: "top 92%", toggleActions: "play none none reverse" },
          }
        );
      });

      const actos = ["01", "02", "03", "04", "05", "06", "07"];
      const actIds = ["proyecto", "reto", "producto", "sistema", "handoff", "resultado", "reflexion"];

      actos.forEach((num, idx) => {
        const id = actIds[idx];
        const tl = gsap.timeline({
          scrollTrigger: { trigger: `#${id}`, start: "top 80%", toggleActions: "play none none reverse" },
        });

        tl.fromTo(
          `.acto${num}-title-mask`,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.1, ease: "power4.out" }
        ).fromTo(
          `.acto${num}-title-text`,
          { y: "100%" },
          { y: "0%", duration: 1.2, stagger: 0.1, ease: "power4.out" },
          "<"
        );

        gsap.utils.toArray(`.acto${num}-desc`).forEach((el: any) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
          });
        });
      });

      const sections = ["hero", "proyecto", "reto", "producto", "sistema", "handoff", "resultado", "reflexion"];
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: `#${section}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(index),
          onEnterBack: () => setActiveSection(index),
        });
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
    <div className="space-y-1.5 md:space-y-2 w-full">
      {/* Mobile Title: Full-width, sin saltos forzados, peso contundente (font-black) idéntico a los otros proyectos */}
      <div className="lg:hidden w-full">
        <div className={`${actoNum}-title-mask overflow-hidden py-2 -my-2 w-full`}>
          <h2 className={`${actoNum}-title-text font-black uppercase tracking-[-0.06em] will-change-transform text-[clamp(2.5rem,8.5vw,4.5em)] leading-[0.88] w-full break-words`}>
            {mobileTitleArray.join(" ")}
          </h2>
        </div>
      </div>
      {/* Desktop Title: line by line, sized to fit comfortably in column without horizontal or vertical clipping */}
      <div className="hidden lg:block space-y-2">
        {titleArray.map((line, i) => (
          <div key={i} className={`${actoNum}-title-mask overflow-hidden py-2 -my-2`}>
            <h2 className={`${actoNum}-title-text font-bold uppercase tracking-tighter will-change-transform text-[clamp(1.75rem,3.2vw,3.75rem)] leading-[0.9]`}>
              {line}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );

  const navigationItems = [
    { id: "hero", label: t.goams.index.intro },
    { id: "proyecto", label: t.goams.index.acto01 },
    { id: "reto", label: t.goams.index.acto02 },
    { id: "producto", label: t.goams.index.acto03 },
    { id: "sistema", label: t.goams.index.acto04 },
    { id: "handoff", label: t.goams.index.acto05 },
    { id: "resultado", label: t.goams.index.acto06 },
    { id: "reflexion", label: t.goams.index.acto07 },
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
          <span className="hidden md:inline-block font-bold text-[0.65em] uppercase tracking-[0.3em]">{t.goams.intro.back}</span>
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
                  className={`pointer-events-auto px-4 h-9 rounded-[4px] backdrop-blur-2xl transition-all duration-500 flex items-center border ${
                    activeSection === index
                      ? "bg-foreground text-background border-foreground shadow-lg"
                      : "bg-background/40 text-foreground border-foreground/10"
                  }`}
                >
                  <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap capitalize">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsIndexOpen(!isIndexOpen)}
          className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
          aria-label="Toggle Project Index"
        >
          {isIndexOpen ? <X size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col lg:flex-row relative">
          {/* DESKTOP LIQUID SIDEBAR */}
          <aside className="hidden lg:flex flex-col w-[15%] h-screen sticky top-0 pt-48 pl-12 justify-start z-40 pointer-events-none self-start">
            <div className="relative pointer-events-auto flex flex-col">
              <div
                className="absolute left-[-1rem] w-[2px] h-5 bg-black dark:bg-white transition-all duration-500 ease-out"
                style={{ transform: `translateY(${activeSection * 2.25}rem)` }}
              />
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-[13px] font-normal tracking-tight transition-all duration-300 w-full pl-6 h-[2.25rem] flex items-center ${
                    activeSection === index ? "opacity-100 text-foreground font-semibold" : "opacity-30 hover:opacity-60 text-foreground"
                  }`}
                >
                  <span className="tracking-wide capitalize truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN CASE STUDY CONTENT */}
          <div className="w-full lg:w-[85%] pb-[15vh]">
            {/* HERO */}
            <header id="hero" className="px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] pt-[8em] md:pt-[8em] pb-0">
              <div className="flex flex-col mb-0 pb-[1.5em] md:mb-0 md:pb-[4em] px-[14px] md:px-0">
                <div className="hero-title-mask overflow-hidden py-3 -my-3">
                  <h1 className="hero-title-text font-black tracking-[-0.08em] uppercase will-change-transform text-[clamp(2.5rem,4.5vw,6em)] leading-[0.85]">
                    {t.goams.intro.title}
                    <span className="text-primary ml-[0.05em]">.</span>
                  </h1>
                </div>
                <p className="hero-subtitle text-[5vw] lg:text-[2rem] font-medium tracking-normal mt-[0.8em] md:mt-[0.6em] text-foreground/80 leading-[1.1] max-w-4xl will-change-transform">
                  {t.goams.intro.tagline}
                </p>
              </div>

              {/* HERO IMAGE MOBILE */}
              <div className="md:hidden w-full pb-[3em] px-[14px]">
                <div className="hero-img-container overflow-hidden rounded-[1em] bg-surface shadow-sm h-auto relative flex items-center justify-center">
                  <img
                    src="/go-ams/dashboard.webp"
                    alt="GO AMS Dashboard"
                    className="w-full h-full object-contain relative"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* CONTEXT & METADATA */}
              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 md:gap-20 pt-[1.5em] md:pt-[4em] border-t border-foreground/10 pb-[3em] md:pb-[4em] px-[14px] md:px-0">
                <div className="flex flex-col gap-[1.5em]">
                  <span className="font-sans text-[0.85em] italic opacity-40 block mb-[0.25em] md:mb-[1.5em] meta-reveal">
                    {t.goams.intro.contextLabel}
                  </span>
                  <p className="text-xl md:text-2xl font-light leading-snug tracking-normal max-w-2xl opacity-80 will-change-transform meta-reveal">
                    {t.goams.intro.contextDesc}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-y-[2.5em] gap-x-[2em]">
                  {[
                    { l: t.goams.intro.meta.role, v: t.goams.intro.meta.role_val },
                    { l: t.goams.intro.meta.scope, v: t.goams.intro.meta.scope_val },
                    { l: t.goams.intro.meta.tools, v: t.goams.intro.meta.tools_val },
                    { l: t.goams.intro.meta.status, v: t.goams.intro.meta.status_val },
                  ].map((item, i) => (
                    <div key={i} className="meta-reveal space-y-[0.5em] will-change-transform">
                      <h5 className="font-sans text-[0.85em] italic opacity-40 block">{item.l}</h5>
                      <p className="text-sm font-bold uppercase tracking-tight text-foreground/80">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* CINEMATIC IMAGE: DESKTOP HERO */}
            <section className="hidden md:block w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/dashboard.webp"
                  alt="GO AMS Dashboard UI"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 01: EL PROYECTO */}
            <section id="proyecto" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto01.label}</span>
                {renderTitle(t.goams.acto01.title, t.goams.acto01.titleMobile, "acto01")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto01-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto01.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto01.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto01-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* IMAGE: DOWNLINE */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/downline.webp"
                  alt="GO AMS Downline Management"
                  className="w-full h-full object-contain md:object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 02: EL RETO */}
            <section id="reto" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto02.label}</span>
                {renderTitle(t.goams.acto02.title, t.goams.acto02.titleMobile, "acto02")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto02-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto02.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto02.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto02-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* IMAGE: REPORTING */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/reporting.webp"
                  alt="GO AMS Reporting"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* IMAGE: NOTIFICATIONS */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/notifications.webp"
                  alt="GO AMS Notifications"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 03: DISEÑANDO EL PRODUCTO */}
            <section id="producto" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto03.label}</span>
                {renderTitle(t.goams.acto03.title, t.goams.acto03.titleMobile, "acto03")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto03-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto03.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto03.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto03-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* IMAGE: LOGIN */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/login.webp"
                  alt="GO AMS Login Flow"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* IMAGE: AGENT SUPPORT */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/agent-support.webp"
                  alt="GO AMS Agent Support"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* IMAGE: RESOURCES */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/resources-page.webp"
                  alt="GO AMS Resources"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* IMAGE: PROFILE SETTINGS */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/profile-setting.webp"
                  alt="GO AMS Profile Settings"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 04: CONSTRUYENDO EL SISTEMA DE DISEÑO */}
            <section id="sistema" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto04.label}</span>
                {renderTitle(t.goams.acto04.title, t.goams.acto04.titleMobile, "acto04")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto04-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto04.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto04.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto04-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* IMAGE: DESIGN SYSTEM COLORS */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/design-system-colors.webp"
                  alt="GO AMS Design System Colors"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* IMAGE: DESIGN SYSTEM TYPOGRAPHY */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/design-system-typography.webp"
                  alt="GO AMS Design System Typography"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* IMAGE: DESIGN SYSTEM INPUTS */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/design-system-inputs.webp"
                  alt="GO AMS Design System Inputs"
                  className="w-full h-full object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 05: DE FIGMA A DESARROLLO */}
            <section id="handoff" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto05.label}</span>
                {renderTitle(t.goams.acto05.title, t.goams.acto05.titleMobile, "acto05")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto05-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto05.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto05.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto05-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* IMAGE: LICENSE DETAILS */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/license-details.webp"
                  alt="GO AMS License Details Specification"
                  className="w-full h-full object-contain md:object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 06: EL RESULTADO */}
            <section id="resultado" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto06.label}</span>
                {renderTitle(t.goams.acto06.title, t.goams.acto06.titleMobile, "acto06")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto06-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto06.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto06.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto06-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* CLOSING HERO IMAGE */}
            <section className="w-full px-0 md:px-[6em] lg:pl-0 lg:pr-[8em] py-[1em]">
              <div className="hero-img-container md:rounded-[2em] overflow-hidden bg-surface md:shadow-sm will-change-transform aspect-square md:aspect-auto md:h-[90vh] relative flex items-center justify-center translate-z-0">
                <img
                  src="/go-ams/dashboard.webp"
                  alt="GO AMS Production Dashboard"
                  className="w-full h-full object-contain md:object-cover relative"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* ACTO 07: REFLEXIÓN FINAL */}
            <section id="reflexion" className={STYLING.section}>
              <div className="lg:pr-10 w-full">
                <span className={STYLING.label}>{t.goams.acto07.label}</span>
                {renderTitle(t.goams.acto07.title, t.goams.acto07.titleMobile, "acto07")}
              </div>
              <div className="pt-[4em] md:pt-[18em] space-y-[2em]">
                <h3 className="acto07-desc text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  {t.goams.acto07.lead}
                </h3>
                <div className="space-y-[1.5em]">
                  {t.goams.acto07.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="acto07-desc text-xl md:text-2xl font-light leading-snug tracking-normal max-w-3xl opacity-80 will-change-transform">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
