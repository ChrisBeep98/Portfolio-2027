"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLanguage } from "@/context/LanguageContext";
import {
  EASE,
  DUR,
  STAGGER,
  REVEAL,
  PLANET,
  REDUCED_MOTION_QUERY
} from "@/lib/motion";
import {
  Code,
  Palette, 
  Cpu, 
  Layers, 
  Sparkles, 
  Terminal,
  Camera
} from "lucide-react";

const SAT_ICON = {
  react: Code,
  nextjs: Cpu,
  design: Palette,
  uiux: Layers,
  motion: Sparkles,
  backend: Terminal
} as const;

type SatId = keyof typeof SAT_ICON;

type Side = "top" | "bottom" | "left" | "right" | "top-right" | "bottom-left";

// Lado del que sale la burbuja en desktop, según la geometría de cada pill en
// su anillo; en móvil se centra sobre el planeta. Si el lado elegido sacaría la
// burbuja del viewport, measure() lo voltea al opuesto (nada de cortes abajo).
const CARD_ANCHOR: Record<SatId, Side> = {
  react: "top",
  nextjs: "bottom",
  design: "left",
  uiux: "right",
  motion: "top-right",
  backend: "bottom-left"
};

// Stem de hairline por lado final: apunta a la pill de origen.
const SIDE_STEM: Record<Side, string> = {
  top: "chip-stem-top",
  bottom: "chip-stem-bottom",
  left: "chip-stem-left",
  right: "chip-stem-right",
  "top-right": "chip-stem-top-right",
  "bottom-left": "chip-stem-bottom-left"
};

// ── Config de motion del Hero (valores sin token canónico en motion.ts) ──
const INTRO_HOLD = 0.5; // respiro antes del slam tipográfico del Acto 1
const MOBILE_SLAM_PERCENT = 60; // salida lateral del texto en móvil (desktop usa REVEAL.slamPercent)
const DETAIL_EXIT_Y = 50; // el hero-detail abandona hacia abajo
const ORBITS_LIVE_AT = 0.3; // móvil: órbitas activas solo a partir de este progreso del scrub

// ── Imán de scroll del Hero (auto-advance): banda + intención + consumo único ──
// Calibrado midiendo con tools/visual-qa/trace-hero-autoadvance*.js
const AUTO_ADVANCE_DURATION = 2.0; // segundos del viaje hasta el borde del acto
const AUTO_ADVANCE_INTENT = 0.07; // recorrido mínimo (fracción de viewport) para que el imán actúe
const AUTO_ADVANCE_DEAD_ZONE = 28; // px de holgura en el borde (absorbe el jitter de Lenis)
const AUTO_ADVANCE_SETTLE_MS = 140; // ms sin eventos de scroll para dar por hecho que el usuario soltó
const AUTO_ADVANCE_BAND = { start: 0.15, end: 0.85 }; // progreso del track donde el imán actúa

// Pill del sistema solar: button real (teclado/táctil) y hover que revela.
// Viaja por offset-path sin rotar sobre su propio eje (offset-rotate: 0deg).
// A scope de módulo a propósito: definida dentro del componente, cada render
// creaba un tipo nuevo y React remontaba las pills (su animación CSS reiniciaba
// y el sistema solar "se detenía" al abrir la chip-card).
const Satellite = ({ id, icon: Icon, label, orbitClass, open, onToggle }: any) => (
  <div className={`orbit-pill ${orbitClass}`}>
    <div className="relative">
      <button
        type="button"
        data-sat={id}
        aria-expanded={open}
        aria-label={label}
        onClick={onToggle}
        className={`node pointer-events-auto flex cursor-pointer items-center gap-3.5 rounded-full border px-5 py-2.5 transition-[scale,background-color,color,border-color] duration-200 hover:scale-[1.06] ${open ? "scale-[1.06] bg-foreground text-background border-foreground" : "bg-white text-black border-black hover:border-black/40 dark:bg-white/10 dark:text-white/90 dark:border-white/10 md:dark:bg-white/5 md:dark:backdrop-blur-xl dark:hover:border-white/40"}`}
      >
        <Icon className="w-3.5 h-3.5 opacity-80 md:w-4 md:h-4" />
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap opacity-90 md:text-xs">{label}</span>
      </button>
    </div>
  </div>
);

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [openSat, setOpenSat] = useState<SatId | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Escape cierra la chip-card abierta (accesibilidad de teclado).
  useEffect(() => {
    if (!openSat) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSat(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSat]);

  // La burbuja es efímera: se auto-cierra a los 4s para no quedar clavada.
  useEffect(() => {
    if (!openSat) return;
    const id = window.setTimeout(() => setOpenSat(null), 4000);
    return () => window.clearTimeout(id);
  }, [openSat]);

  // La burbuja se posiciona IMPERATIVAMENTE por frame (sin setState): un setState
  // a 60fps re-renderizaba Hero y remontaba las pills, reiniciando su animación
  // CSS (el sistema solar "se detenía" al abrir la tarjetita). La pill sigue
  // viajando; la burbuja la sigue. Clamp al viewport para que nunca se corte.
  useLayoutEffect(() => {
    if (!openSat) return;
    const apply = () => {
      const btn = document.querySelector<HTMLButtonElement>(`[data-sat="${openSat}"]`);
      const card = cardRef.current;
      if (!btn || !card) return;
      const r = btn.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      const side = CARD_ANCHOR[openSat];
      let left: number;
      let top: number;
      let transform: string;
      if (side === "top") { left = r.left + r.width / 2; top = Math.min(r.bottom + 12, vh - 8 - ch); transform = "translate(-50%, 0)"; }
      else if (side === "bottom") { left = r.left + r.width / 2; top = Math.max(r.top - 12, 8 + ch); transform = "translate(-50%, -100%)"; }
      else if (side === "left") { left = Math.min(r.right + 12, vw - 8 - cw); top = r.top + r.height / 2; transform = "translate(0, -50%)"; }
      else if (side === "right") { left = Math.max(r.left - 12, 8 + cw); top = r.top + r.height / 2; transform = "translate(-100%, -50%)"; }
      else if (side === "top-right") { left = r.right; top = Math.min(r.bottom + 12, vh - 8 - ch); transform = "translate(-100%, 0)"; }
      else { left = r.left; top = Math.max(r.top - 12, 8 + ch); transform = "translate(0, -100%)"; }
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.style.transform = transform;
    };
    apply();
    let raf = 0;
    const loop = () => {
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", apply);
    };
  }, [openSat, t]);

  // EFECTO 1: INTRO Y SCROLL (Se ejecuta solo una vez al montar)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let refreshTimer = 0;
    const isMobile = window.innerWidth < 768;

    // Las órbitas (keyframes CSS) tienen dos puertas de apagado: fuera de
    // viewport y, en móvil, durante el Acto 1 (capas invisibles rotando =
    // trabajo de compositor gratuito justo en la ventana de scroll lag).
    const orbitsState = { offscreen: false, live: !isMobile };
    const applyOrbits = () =>
      containerRef.current?.classList.toggle("orbits-paused", orbitsState.offscreen || !orbitsState.live);

    const ctx = gsap.context(() => {
      // 1. Estado Inicial Forzado (Evita flashes)
      gsap.set(".reveal-left", { opacity: 0, xPercent: -100 });
      gsap.set(".reveal-right", { opacity: 0, xPercent: 100 });
      gsap.set(".reveal-center", { opacity: 0, y: 30 });
      gsap.set(planetRef.current, { scale: 0, opacity: 0 });
      gsap.set(".orbit-ring", { scale: 0, opacity: 0 });
      gsap.set(imageWrapperRef.current, { y: 100, opacity: 0, scale: 1.1 });
      gsap.set(".hero-detail", { y: 20, opacity: 0 });

      // 2. Intro Acto 1 (Timeline de entrada)
      const introTl = gsap.timeline({ defaults: { ease: EASE.dramatic } });
      introTl.to({}, { duration: INTRO_HOLD }) 
        .to(".reveal-left", { opacity: 1, xPercent: 0, duration: DUR.signature, stagger: STAGGER.base })
        .to(".reveal-right", { opacity: 1, xPercent: 0, duration: DUR.signature, stagger: STAGGER.base }, "<")
        .to(".reveal-center", { opacity: 1, y: 0, duration: DUR.signature }, "<0.2")
        .to(imageWrapperRef.current, { y: 0, opacity: 1, scale: 1, duration: DUR.signature }, "-=1")
        .to(".hero-detail", { y: 0, opacity: 1, stagger: STAGGER.base, duration: DUR.base }, "-=1");

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
          // Lenis ya suaviza el scroll: scrub numérico añadía un segundo
          // suavizado (doble lag en móvil). scrub: true = sync exacto.
          scrub: true,
          onEnter: () => {
            if (introTl.isActive()) introTl.progress(1).kill();
          },
          onUpdate: (self) => {
            // Si el usuario empieza a bajar, nos aseguramos que la intro terminó
            if (self.progress > 0.01 && introTl.isActive()) {
              introTl.progress(1).kill();
            }
            // La burbuja es efímera: cierra al volver al Acto 1 o al salir del
            // track hacia la siguiente sección.
            if (self.progress < 0.12 || self.progress > 0.9) setOpenSat((cur) => (cur ? null : cur));
            if (isMobile) {
              const live = self.progress > ORBITS_LIVE_AT;
              if (live !== orbitsState.live) {
                orbitsState.live = live;
                applyOrbits();
              }
            }
          }
        }
      });

      // Usamos .to() en lugar de .fromTo() para que herede el estado final de la intro.
      // Sin `scale` en las líneas: en desktop el objetivo era 1 (no-op) y en móvil
      // escalar texto gigante con stroke fuerza re-raster de 6 capas por frame
      // (scroll lag real en dispositivo; headless no lo reproduce).
      scrollTl
        .set(".reveal-left", { opacity: 1, xPercent: 0 }, 0)
        .set(".reveal-right", { opacity: 1, xPercent: 0 }, 0)
        .set(".reveal-center", { opacity: 1, xPercent: 0, y: 0 }, 0)
        .set(".hero-detail", { opacity: 1, y: 0 }, 0)
        .set(imageWrapperRef.current, { y: 0, opacity: 1, scale: 1 }, 0)
        .to(".reveal-left", { xPercent: isMobile ? -MOBILE_SLAM_PERCENT : -REVEAL.slamPercent, opacity: 0, ease: EASE.none }, 0)
        .to(".reveal-right", { xPercent: isMobile ? MOBILE_SLAM_PERCENT : REVEAL.slamPercent, opacity: 0, ease: EASE.none }, 0)
        .to(".reveal-center", { xPercent: isMobile ? -MOBILE_SLAM_PERCENT : -REVEAL.slamPercent, opacity: 0, ease: EASE.none }, 0);

      // La imagen: en desktop conserva su geometría aprobada (crece 16vw→40vw).
      // En móvil terminaba invisible de todos modos, así que su recorrido de
      // left/bottom/width/height/clipPath (layout+paint por frame) se degrada
      // a transform/opacity — mismo destino, cero repaint (Hardware Symphony §2).
      if (isMobile) {
        scrollTl.to(imageWrapperRef.current, { x: 0, y: 40, scale: 0.9, opacity: 0, ease: EASE.transition, zIndex: 40 }, 0);
      } else {
        scrollTl
          .to(imageWrapperRef.current, {
            left: "2em",
            bottom: "2em",
            top: "2em",
            x: 0,
            y: 0,
            height: "calc(100vh - 4em)",
            width: "calc(40vw - 2em)",
            borderRadius: "24px",
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: EASE.transition,
            zIndex: 40
          }, 0)
          .to(".image-inner-container", { borderRadius: "24px", ease: EASE.transition }, 0);
      }

      scrollTl
        .to(systemRef.current, { x: isMobile ? 0 : "20vw", opacity: 1, ease: EASE.transition }, 0)
        .to(planetRef.current, { scale: isMobile ? PLANET.scaleMobile : PLANET.scaleDesktop, opacity: 1, ease: EASE.transition }, 0.1) 
        .to(".orbit-ring", { scale: isMobile ? PLANET.ringScaleMobile : 0.8, opacity: PLANET.orbitOpacity, stagger: STAGGER.tight, ease: EASE.transition }, 0.1)
        .to(".hero-detail", { opacity: 0, y: DETAIL_EXIT_Y, ease: EASE.transition }, 0);

      // Sincronización final
      ScrollTrigger.refresh();

      refreshTimer = window.setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    }, containerRef);

    applyOrbits();
    const orbitsIO = new IntersectionObserver(
      ([entry]) => {
        orbitsState.offscreen = !entry.isIntersecting;
        applyOrbits();
        if (!entry.isIntersecting) setOpenSat(null);
      },
      { threshold: 0 }
    );
    if (containerRef.current) orbitsIO.observe(containerRef.current);

    return () => {
      window.clearTimeout(refreshTimer);
      orbitsIO.disconnect();
      containerRef.current?.classList.remove("orbits-paused");
      ctx.revert();
    };
  }, []);

  // IMÁN DE SCROLL (auto-advance): un recorrido real dentro del centro del Hero,
  // seguido de una pausa, lleva solo hasta el borde del acto (hacia ABAJO hasta
  // la salida / Acto 2; hacia ARRIBA de vuelta al Acto 1).
  //
  // Reglas, calibradas midiendo con tools/visual-qa/trace-hero-autoadvance*.js:
  // - Banda: fuera de AUTO_ADVANCE_BAND el imán no actúa → se puede descansar
  //   cerca del Acto 1 y de la salida sin que nada arrastre (el scroll de 20px
  //   desde el techo ya no commitea el viaje completo).
  // - Intención: exige AUTO_ADVANCE_INTENT de recorrido en una sola dirección.
  // - Consumo único: tras el viaje, o tras una interrupción, hace falta volver a
  //   recorrer ese umbral → sin re-disparo y sin reversa al corregir 5px.
  // - Autoridad única: el viaje lo conduce Lenis (`window.__lenis.scrollTo`).
  //   Con ScrollToPlugin + `autoKill: true` había dos escritores sobre el mismo
  //   eje: jitter de ±1-8px en el handoff y viajes muertos de forma no determinista.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    // Lenis monta en un efecto PADRE (SmoothScrollProvider) y en React los
    // efectos corren de hijo a padre: en el mount del Hero todavía no existe.
    // Se lee perezosamente, nunca capturado una sola vez.
    const lenis = () => window.__lenis;

    let settleTimer = 0;
    let flying = false; // el imán está viajando (ignoramos sus propios eventos)
    let rearmed = true; // consumo único: false hasta recuperar el umbral
    let travel = 0; // recorrido acumulado en la dirección actual
    let travelDir: 1 | -1 = 1;
    let lastY = window.scrollY;
    let decisionAt = window.scrollY; // referencia para volver a armar el imán

    const glideTo = (target: number) => {
      flying = true;
      rearmed = false;
      travel = 0;
      const done = () => {
        flying = false;
        decisionAt = window.scrollY;
      };
      const lenisInstance = lenis();
      if (lenisInstance) {
        lenisInstance.scrollTo(target, {
          duration: AUTO_ADVANCE_DURATION,
          easing: gsap.parseEase(EASE.inOut),
          lock: false,
          onComplete: done
        });
      } else {
        // Respaldo si Lenis no montó (tramo entre el mount del Hero y el provider).
        gsap.to(window, {
          duration: AUTO_ADVANCE_DURATION,
          scrollTo: { y: target, autoKill: false },
          ease: EASE.inOut,
          onComplete: done
        });
      }
    };

    const evaluate = () => {
      if (flying) return;

      const rect = container.getBoundingClientRect();
      const startY = window.scrollY + rect.top;
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;

      const y = window.scrollY;
      const intentPx = AUTO_ADVANCE_INTENT * window.innerHeight;

      // Consumo único: el imán no vuelve a actuar hasta recuperar el umbral.
      if (!rearmed) {
        if (Math.abs(y - decisionAt) < intentPx) return;
        rearmed = true;
      }

      const progress = (y - startY) / span;
      if (progress < AUTO_ADVANCE_BAND.start || progress > AUTO_ADVANCE_BAND.end) return;
      if (travel < intentPx) return;

      const endY = startY + span;
      if (travelDir === 1) {
        if (y >= endY - AUTO_ADVANCE_DEAD_ZONE) return; // ya en la salida
        glideTo(endY);
      } else {
        if (y <= startY + AUTO_ADVANCE_DEAD_ZONE) return; // ya en el Acto 1
        glideTo(startY);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;

      // El asentamiento se reprograma SIEMPRE, también con delta 0: antes ese
      // `return` cancelaba el timer sin volver a programarlo y el disparo se
      // perdía (una de las causas de que el imán fuera no determinista).
      window.clearTimeout(settleTimer);
      if (flying) return;
      settleTimer = window.setTimeout(evaluate, AUTO_ADVANCE_SETTLE_MS);

      // Dirección desde Lenis cuando existe: suavizada, inmune al jitter de ±1px
      // del handoff (un delta crudo invertido reiniciaba el recorrido acumulado).
      const lenisInstance = lenis();
      const dir: 1 | -1 | 0 = lenisInstance ? lenisInstance.direction : d > 0 ? 1 : d < 0 ? -1 : 0;
      if (dir === 0) return;

      if (dir === travelDir) travel += Math.abs(d);
      else {
        travelDir = dir;
        travel = Math.abs(d);
      }
    };

    // Interrupción: cualquier input real corta el viaje y obliga a re-armar el
    // imán (por eso una corrección de 5px ya no revierte el viaje completo).
    const onUserInput = () => {
      if (!flying) return;
      flying = false;
      travel = 0;
      decisionAt = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchstart", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      window.clearTimeout(settleTimer);
    };
  }, []);

  // EFECTO 2: ÓRBITAS — el giro vive en keyframes CSS (globals.css); las puertas
  // de apagado (fuera de viewport + Acto 1 en móvil) están en el EFECTO 1.

  const typographySize = "text-[clamp(2.5rem,10.5vw,9.6rem)]";

  const toggleSat = (id: SatId) => setOpenSat((cur) => (cur === id ? null : id));

  const OpenIcon = openSat ? SAT_ICON[openSat] : null;

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-[#F2F2F0] dark:bg-[#050505]">
        <div className="relative z-10 flex flex-col justify-center gap-2 md:gap-[12px] w-full leading-[0.82] pointer-events-none px-[14px] md:px-[7em] h-[60vh] md:h-screen pt-10 md:pt-0">
          <div className="w-full text-left"><div className="reveal-left opacity-0 inline-block"><h1 className={`${typographySize} font-black tracking-tighter uppercase text-black dark:text-transparent dark:[-webkit-text-stroke:2px_#06b6d4] opacity-100 dark:opacity-40 whitespace-nowrap`}>{t.hero.firstName}</h1></div></div>
          <div className="w-full text-right relative">
            <div className="reveal-right opacity-0 inline-block relative group">
              <h1 className={`${typographySize} font-black tracking-tighter uppercase relative z-10 text-black dark:text-transparent dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] whitespace-nowrap`}>{t.hero.lastName}</h1>
              <h1 className={`${typographySize} font-black tracking-tighter uppercase absolute top-0 left-0 -translate-x-[3px] z-0 text-transparent dark:text-cyan-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>{t.hero.lastName}</h1>
              <h1 className={`${typographySize} font-black tracking-tighter uppercase absolute top-0 left-0 translate-x-[3px] z-0 text-transparent dark:text-red-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>{t.hero.lastName}</h1>
            </div>
          </div>
          <div className="w-full text-left md:text-center pl-[15vw] md:pl-0">
            <div className="reveal-left md:reveal-center opacity-0 inline-block">
              <h1 className={`${typographySize} md:text-hero-fit-wide font-black tracking-tighter uppercase text-orange-600 dark:text-transparent dark:[-webkit-text-stroke:2px_#ec4899] opacity-100 dark:opacity-40 whitespace-nowrap`}>{t.hero.role[0]}<span className="hidden md:inline">.{t.hero.role[1]}</span></h1>
            </div>
          </div>
          <div className="w-full text-right md:hidden">
            <div className="reveal-right opacity-0 inline-block">
              <h1 className={`${typographySize} font-black tracking-tighter uppercase text-orange-600 dark:text-transparent dark:[-webkit-text-stroke:2px_#ec4899] opacity-100 dark:opacity-40 whitespace-nowrap`}>{t.hero.role[1]}</h1>
            </div>
          </div>
          <div className="w-full flex justify-start relative md:pl-[20vw]">
             <div className="reveal-left opacity-0 inline-block relative group">
              <h1 className={`${typographySize} md:text-hero-fit-indent font-black tracking-tighter uppercase relative z-10 text-black dark:text-transparent dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] whitespace-nowrap`}>{t.hero.frontend}</h1>
              <h1 className={`${typographySize} md:text-hero-fit-indent font-black tracking-tighter uppercase absolute top-0 left-0 -translate-x-[3px] z-0 text-transparent dark:text-cyan-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>{t.hero.frontend}</h1>
              <h1 className={`${typographySize} md:text-hero-fit-indent font-black tracking-tighter uppercase absolute top-0 left-0 translate-x-[3px] z-0 text-transparent dark:text-red-500/50 mix-blend-screen opacity-0 dark:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>{t.hero.frontend}</h1>
            </div>
          </div>
          <div className="w-full text-right"><div className="reveal-right opacity-0 inline-block"><h1 className={`${typographySize} font-black tracking-tighter uppercase text-black dark:text-transparent dark:[-webkit-text-stroke:2px_#06b6d4] opacity-100 dark:opacity-20 whitespace-nowrap`}>{t.hero.developer}</h1></div></div>
        </div>
        <div ref={imageWrapperRef} className="absolute left-[14px] md:left-[7em] bottom-[14vh] md:bottom-[10vh] w-[60vw] md:w-[16vw] h-[28vh] md:h-[30vh] z-20 pointer-events-none opacity-0">
          <div className="image-inner-container hero-card w-full h-full glass-engine overflow-hidden rounded-sm border border-black/10 dark:border-white/10 relative shadow-2xl bg-black/5 dark:bg-white/5">
            <img src="https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68b22e2584f095b8afb03eec_Generated%20Image%20August%2029%2C%202025%20-%203_03PM.jpeg" alt="Portrait" className="w-full h-full object-cover" />
          </div>
          <div className="hero-detail mt-2 md:mt-4 flex items-center gap-3 opacity-0">
            <Camera size={14} className="text-black dark:text-white" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black dark:text-white opacity-70">{t.hero.detail}</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden md:overflow-visible">
          <div ref={systemRef} className="relative w-full md:w-[400px] h-full md:h-[400px] flex items-center justify-center translate-z-0">
            <div ref={planetRef} className="absolute rounded-full z-10 bg-black dark:bg-white shadow-2xl opacity-0" style={{ width: "120px", height: "120px" }} />
            <div className="orbit-ring orbit-1 opacity-0 absolute w-[280px] md:w-[420px] h-[280px] md:h-[420px] rounded-full border border-foreground/10">
              <Satellite id="react" icon={Code} label={t.hero.satellites.react} orbitClass="orbit-r1 o-react" open={openSat === "react"} onToggle={() => toggleSat("react")} />
              <Satellite id="nextjs" icon={Cpu} label={t.hero.satellites.nextjs} orbitClass="orbit-r1 o-nextjs" open={openSat === "nextjs"} onToggle={() => toggleSat("nextjs")} />
            </div>
            <div className="orbit-ring orbit-2 opacity-0 absolute w-[450px] md:w-[580px] h-[450px] md:h-[580px] rounded-full border border-foreground/10">
              <Satellite id="design" icon={Palette} label={t.hero.satellites.design} orbitClass="orbit-r2 o-design" open={openSat === "design"} onToggle={() => toggleSat("design")} />
              <Satellite id="uiux" icon={Layers} label={t.hero.satellites.uiux} orbitClass="orbit-r2 o-uiux" open={openSat === "uiux"} onToggle={() => toggleSat("uiux")} />
            </div>
            <div className="orbit-ring orbit-3 opacity-0 absolute w-[620px] md:w-[750px] h-[620px] md:h-[750px] rounded-full border border-foreground/10">
              <Satellite id="motion" icon={Sparkles} label={t.hero.satellites.motion} orbitClass="orbit-r3 o-motion" open={openSat === "motion"} onToggle={() => toggleSat("motion")} />
              <Satellite id="backend" icon={Terminal} label={t.hero.satellites.backend} orbitClass="orbit-r3 o-backend" open={openSat === "backend"} onToggle={() => toggleSat("backend")} />
            </div>
          </div>
        </div>
      </div>
      {openSat && OpenIcon && (
        <div
          ref={cardRef}
          role="dialog"
          aria-label={t.hero.satellites[openSat]}
          className="pointer-events-none fixed left-0 top-0 z-50"
        >
          <div className={`chip-card ${SIDE_STEM[CARD_ANCHOR[openSat]]} theme-invert relative w-40 rounded-[10px] border border-foreground/10 p-3 shadow-[var(--card-shadow)] md:w-72 md:rounded-[12px] md:p-4`}>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <OpenIcon className="h-4 w-4 opacity-80" />
                <span className="text-ui-label">{t.hero.satellites[openSat]}</span>
              </span>
              <span className="text-meta opacity-60 max-md:hidden">{t.hero.satellitesInfo[openSat].tag}</span>
            </div>
            <p className="text-body-xs mt-1.5 opacity-80 md:text-body-sm md:mt-2">{t.hero.satellitesInfo[openSat].text}</p>
          </div>
        </div>
      )}
    </div>
  );
}