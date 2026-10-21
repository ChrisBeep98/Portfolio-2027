"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Code, 
  Palette, 
  Cpu, 
  Layers, 
  Sparkles, 
  Terminal,
  Camera
} from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // EFECTO 1: INTRO Y SCROLL (Se ejecuta solo una vez al montar)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. Estado Inicial Forzado (Evita flashes)
      gsap.set(".reveal-left", { opacity: 0, xPercent: -100 });
      gsap.set(".reveal-right", { opacity: 0, xPercent: 100 });
      gsap.set(".reveal-center", { opacity: 0, y: 30 });
      gsap.set(planetRef.current, { scale: 0, opacity: 0 });
      gsap.set(".orbit-ring", { scale: 0, opacity: 0 });
      gsap.set(imageWrapperRef.current, { y: 100, opacity: 0, scale: 1.1 });
      gsap.set(".hero-detail", { y: 20, opacity: 0 });

      // 2. Intro Acto 1 (Timeline de entrada)
      const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      introTl.to({}, { duration: 0.5 }) 
        .to(".reveal-left", { opacity: 1, xPercent: 0, duration: 1.5, stagger: 0.1 })
        .to(".reveal-right", { opacity: 1, xPercent: 0, duration: 1.5, stagger: 0.1 }, "<")
        .to(".reveal-center", { opacity: 1, y: 0, duration: 1.5 }, "<0.2")
        .to(imageWrapperRef.current, { y: 0, opacity: 1, scale: 1, duration: 1.5 }, "-=1")
        .to(".hero-detail", { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, "-=1");

      // 3. Lógica de Recarga (Si ya hay scroll, matamos la intro rápido)
      const initialScroll = window.scrollY;
      if (initialScroll > 50) {
        introTl.progress(1).kill();
      }

      // 4. Scroll Acto 2 (Timeline de Scrub)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Un poco más de suavidad para estabilidad
          onEnter: () => { 
            if (introTl.isActive()) introTl.progress(1).kill();
          },
          onUpdate: (self) => {
            // Si el usuario empieza a bajar, nos aseguramos que la intro terminó
            if (self.progress > 0.01 && introTl.isActive()) {
              introTl.progress(1).kill();
            }
          }
        }
      });

      // Usamos .to() en lugar de .fromTo() para que herede el estado final de la intro
      scrollTl
        .to(".reveal-left", { xPercent: isMobile ? -60 : -150, opacity: 0, scale: isMobile ? 0.85 : 1, ease: "none" }, 0)
        .to(".reveal-right", { xPercent: isMobile ? 60 : 150, opacity: 0, scale: isMobile ? 0.85 : 1, ease: "none" }, 0)
        .to(".reveal-center", { xPercent: isMobile ? -60 : -150, opacity: 0, scale: isMobile ? 0.85 : 1, ease: "none" }, 0)
        .to(imageWrapperRef.current, { 
          left: isMobile ? "14px" : "2em", 
          bottom: isMobile ? "14vh" : "2em", 
          top: isMobile ? "auto" : "2em", 
          x: 0, 
          y: isMobile ? 40 : 0, 
          height: isMobile ? "28vh" : "calc(100vh - 4em)", 
          width: isMobile ? "60vw" : "calc(40vw - 2em)", 
          borderRadius: "24px", 
          opacity: isMobile ? 0 : 1, 
          scale: isMobile ? 0.9 : 1, 
          clipPath: isMobile ? "inset(50% 0% 50% 0%)" : "inset(0% 0% 0% 0%)", 
          ease: "power2.inOut",
          zIndex: 40 
        }, 0)
        .to(".image-inner-container", { borderRadius: "24px", ease: "power2.inOut" }, 0)
        .to(systemRef.current, { x: isMobile ? 0 : "20vw", opacity: 1, ease: "power2.inOut" }, 0)
        .to(planetRef.current, { scale: isMobile ? 0.7 : 1.15, opacity: 1, ease: "power2.inOut" }, 0.1) 
        .to(".orbit-ring", { scale: isMobile ? 0.6 : 1, opacity: 0.6, stagger: 0.05, ease: "power2.inOut" }, 0.1)
        .to(".hero-detail", { opacity: 0, y: 50, ease: "none" }, 0);

      // Sincronización final
      ScrollTrigger.refresh();

      setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // EFECTO 2: ÓRBITAS (Giro infinito y sincronizado)
  useEffect(() => {
    const orbitCtx = gsap.context(() => {
      [1, 2, 3].forEach(i => {
        const rotationValue = i % 2 === 0 ? -360 : 360;
        const duration = 25 + (i * 10);
        
        // Animación de Órbita (Anillo Padre)
        gsap.to(`.orbit-${i}`, {
          rotation: rotationValue,
          duration: duration,
          repeat: -1,
          ease: "none",
          force3D: true,
          onUpdate: function() {
            // Sincronización forzada: el hijo siempre tiene la rotación opuesta al padre en tiempo real
            const currentRotation = gsap.getProperty(this.targets()[0], "rotation");
            gsap.set(`.node-${i}`, { rotation: -Number(currentRotation) });
          }
        });
      });
    }, containerRef);

    return () => orbitCtx.revert();
  }, []); // Quitamos [t] para evitar desincronización al cambiar idioma

  const typographySize = "text-[clamp(2.5rem,10.5vw,9.6rem)]";

  const Satellite = ({ icon: Icon, label, className, nodeClass }: any) => (
    <div className={`absolute ${className} will-change-transform`}>
      <div className={`${nodeClass} will-change-transform`}>
        <div className="node flex items-center gap-3.5 px-5 md:px-5 py-2.5 md:py-2.5 rounded-full border bg-white border-black text-black dark:bg-white/5 dark:border-white/10 dark:text-white/90 dark:backdrop-blur-xl">
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-80" />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap opacity-90">{label}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-[#F2F2F0] dark:bg-[#050505]">
        <div className="relative z-10 flex flex-col justify-center gap-2 md:gap-[12px] w-full leading-[0.82] pointer-events-none px-[14px] md:px-[7em] h-[60vh] md:h-screen pt-10 md:pt-0 will-change-[transform,opacity]">
          <div className="w-full text-left"><div className="reveal-left opacity-0 inline-block"><h1 className={`${typographySize} font-black tracking-tighter uppercase text-black dark:text-transparent dark:[-webkit-text-stroke:2px_#06b6d4] opacity-100 dark:opacity-40 whitespace-nowrap`}>{t.hero.firstName}</h1></div></div>
          <div className="w-full text-right relative">
            <div className="reveal-right opacity-0 inline-block relative group">
              <h1 className={`${typographySize} font-black tracking-tighter uppercase relative z-10 text-black dark:text-transparent dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] whitespace-nowrap`}>{t.hero.lastName}</h1>
              <h1 className={`${typographySize} font-black tracking-tighter uppercase absolute top-0 left-0 -translate-x-[3px] z-0 text-transparent dark:text-cyan-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-all duration-300 whitespace-nowrap`}>{t.hero.lastName}</h1>
              <h1 className={`${typographySize} font-black tracking-tighter uppercase absolute top-0 left-0 translate-x-[3px] z-0 text-transparent dark:text-red-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-all duration-300 whitespace-nowrap`}>{t.hero.lastName}</h1>
            </div>
          </div>
          <div className="w-full text-left md:text-center pl-[15vw] md:pl-0">
            <div className="reveal-left md:reveal-center opacity-0 inline-block">
              <h1 className={`${typographySize} font-black tracking-tighter uppercase text-orange-600 dark:text-transparent dark:[-webkit-text-stroke:2px_#ec4899] opacity-100 dark:opacity-40 whitespace-nowrap`}>{t.hero.role[0]}<span className="hidden md:inline">.{t.hero.role[1]}</span></h1>
            </div>
          </div>
          <div className="w-full text-right md:hidden">
            <div className="reveal-right opacity-0 inline-block">
              <h1 className={`${typographySize} font-black tracking-tighter uppercase text-orange-600 dark:text-transparent dark:[-webkit-text-stroke:2px_#ec4899] opacity-100 dark:opacity-40 whitespace-nowrap`}>{t.hero.role[1]}</h1>
            </div>
          </div>
          <div className="w-full flex justify-start relative md:pl-[20vw]">
             <div className="reveal-left opacity-0 inline-block relative group">
              <h1 className={`${typographySize} font-black tracking-tighter uppercase relative z-10 text-black dark:text-transparent dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] whitespace-nowrap`}>{t.hero.frontend}</h1>
              <h1 className={`${typographySize} font-black tracking-tighter uppercase absolute top-0 left-0 -translate-x-[3px] z-0 text-transparent dark:text-cyan-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-all duration-300 whitespace-nowrap`}>{t.hero.frontend}</h1>
              <h1 className={`${typographySize} font-black tracking-tighter uppercase absolute top-0 left-0 translate-x-[3px] z-0 text-transparent dark:text-red-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-all duration-300 whitespace-nowrap`}>{t.hero.frontend}</h1>
            </div>
          </div>
          <div className="w-full text-right"><div className="reveal-right opacity-0 inline-block"><h1 className={`${typographySize} font-black tracking-tighter uppercase text-black dark:text-transparent dark:[-webkit-text-stroke:2px_#06b6d4] opacity-100 dark:opacity-20 whitespace-nowrap`}>{t.hero.developer}</h1></div></div>
        </div>
        <div ref={imageWrapperRef} className="absolute left-[14px] md:left-[7em] bottom-[14vh] md:bottom-[10vh] w-[60vw] md:w-[16vw] h-[28vh] md:h-[30vh] z-20 pointer-events-auto will-change-transform opacity-0">
          <div className="image-inner-container w-full h-full glass-engine overflow-hidden rounded-sm border border-black/10 dark:border-white/10 relative shadow-2xl bg-black/5 dark:bg-white/5">
            <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68b22e2584f095b8afb03eec_Generated%20Image%20August%2029%2C%202025%20-%203_03PM.jpeg" alt="Portrait" className="w-full h-full object-cover" />
          </div>
          <div className="hero-detail mt-2 md:mt-4 flex items-center gap-3 opacity-0">
            <Camera size={14} className="text-black dark:text-white" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black dark:text-white opacity-70">{t.hero.detail}</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 will-change-transform overflow-hidden md:overflow-visible">
          <div ref={systemRef} className="relative w-full md:w-[400px] h-full md:h-[400px] flex items-center justify-center translate-z-0">
            <div ref={planetRef} className="absolute rounded-full z-10 bg-black dark:bg-white shadow-2xl will-change-transform opacity-0" style={{ width: "120px", height: "120px" }} />
            <div className="orbit-ring orbit-1 opacity-0 absolute w-[280px] md:w-[420px] h-[280px] md:h-[420px] rounded-full border border-foreground/10">
              <Satellite icon={Code} label={t.hero.satellites.react} className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" nodeClass="node-1" />
              <Satellite icon={Cpu} label={t.hero.satellites.nextjs} className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" nodeClass="node-1" />
            </div>
            <div className="orbit-ring orbit-2 opacity-0 absolute w-[450px] md:w-[580px] h-[450px] md:h-[580px] rounded-full border border-foreground/10">
              <Satellite icon={Palette} label={t.hero.satellites.design} className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" nodeClass="node-2" />
              <Satellite icon={Layers} label={t.hero.satellites.uiux} className="right-0 top-1/2 translate-x-1/2 -translate-y-1/2" nodeClass="node-2" />
            </div>
            <div className="orbit-ring orbit-3 opacity-0 absolute w-[620px] md:w-[750px] h-[620px] md:h-[750px] rounded-full border border-foreground/10">
              <Satellite icon={Sparkles} label={t.hero.satellites.motion} className="top-[15%] right-[15%]" nodeClass="node-3" />
              <Satellite icon={Terminal} label={t.hero.satellites.backend} className="bottom-[15%] left-[15%]" nodeClass="node-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}