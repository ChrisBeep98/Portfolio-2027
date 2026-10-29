"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { buildProjects, menuThumb } from "@/lib/projects";
import { DUR, EASE, REVEAL, STAGGER } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

// ── Header: hide/show por scroll ──
const HEADER_REVEAL_AT_TOP = 10; // px: por debajo de aquí el header siempre visible
const HEADER_INTENT = 24; // px de recorrido sostenido para cambiar de estado (anti-titileo)

// ── Menú móvil: panel de vidrio con margen, no full-bleed ──
// Apertura reactiva (pedido del director, 2026-10-29): el panel entra YA con
// blur mediante un fade corto de compositor (solo opacity: el área del
// backdrop no cambia y el blur se cachea). La cortina clip-path desde arriba
// quedó QUEMADA: dejaba ver el tinte sin vidrio y el blur asentándose después.

// ── CV: se sirve el PDF del idioma activo (el nombre lleva espacio → %20) ──
const CV_FILES = {
  en: "/Documentos%20Profesionales/Christian_Sandoval_CV_En.pdf",
  es: "/Documentos%20Profesionales/Christian_Sandoval_CV_Es.pdf"
} as const;

export default function Header({ hideLogo = false }: { hideLogo?: boolean }) {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Las miniaturas del slider solo se montan desde la primera apertura: el
  // panel vive en el DOM siempre (cerrado con visibility:hidden) y tres <img>
  // remotos ahí dentro se descargarían en cada carga de página.
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false);

  const projects = useMemo(() => buildProjects(t), [t]);

  const navLinks = [
    { id: "work", label: t.header.work, href: "/#projects" },
    { id: "about", label: t.header.about, href: "/about" },
    { id: "contact", label: t.header.contact, href: "#footer", isContact: true }
  ];

  // En móvil el slider de tarjetas sustituye al link monolítico de proyectos.
  const menuLinks = navLinks.filter((item) => item.id !== "work");

  const socialLinks = [
    { 
      icon: <Instagram size={20} />, 
      url: t.footer.links.instagramUrl, 
      color: "hover:!text-[#E4405F] hover:!border-[#E4405F] hover:!bg-[#E4405F]/10" 
    },
    { 
      icon: <MessageCircle size={20} />, 
      url: `https://wa.me/${t.footer.links.phone.replace(/\s+/g, '')}`, 
      color: "hover:!text-[#25D366] hover:!border-[#25D366] hover:!bg-[#25D366]/10" 
    },
    { 
      icon: <Mail size={20} />, 
      url: `mailto:${t.footer.email}`, 
      color: "hover:!text-[#4285F4] hover:!border-[#4285F4] hover:!bg-[#4285F4]/10" 
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [".header-logo", ".header-right"],
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
    }, headerRef);

    // Oculta/muestra por dirección, pero con INTENCIÓN sostenida. Antes el umbral
    // era un delta de 5px medido contra una referencia que solo avanzaba al
    // cambiar de estado, así que cualquier acumulación de 6px en dirección
    // contraria volvía a disparar el toggle: con un trackpad (deltas de 1-3px que
    // la inercia alterna) el header entraba y salía en bucle — el titileo.
    let intent = 0;
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (currentScrollY < HEADER_REVEAL_AT_TOP) {
        intent = 0;
        setIsVisible(true);
        return;
      }

      intent += delta;
      if (intent > HEADER_INTENT) {
        intent = 0;
        setIsVisible(false);
      } else if (intent < -HEADER_INTENT) {
        intent = 0;
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", controlHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlHeader);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        // Fade corto de compositor (solo opacity): el panel entra YA con su
        // blur y el cascade de contenido arranca en paralelo. Sin cortina y
        // sin blur diferido — el director pidió reactividad con vidrio desde
        // el primer frame.
        const tlOpen = gsap.timeline();
        tlOpen
          .fromTo(menuRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: DUR.tap, ease: EASE.snap })
          .from(".menu-item", {
            y: REVEAL.meta,
            opacity: 0,
            stagger: STAGGER.tight,
            duration: DUR.micro,
            ease: EASE.out
          }, 0)
          .from(".menu-projects", {
            y: REVEAL.meta,
            opacity: 0,
            duration: DUR.micro,
            ease: EASE.out
          }, "-=0.2")
          .from(".menu-footer", {
            y: REVEAL.meta,
            opacity: 0,
            duration: DUR.micro,
            ease: EASE.snap
          }, "-=0.2");

        document.body.style.overflow = "hidden";
        // El panel ya no tapa la página (margen de 4px + vidrio): sin esto el
        // fondo seguiría scrolleando detrás del menú y el blur re-muestrearía.
        window.__lenis?.stop();
      } else {
        gsap.to(menuRef.current, { autoAlpha: 0, duration: DUR.tap, ease: EASE.accel });
        document.body.style.overflow = "";
        window.__lenis?.start();
      }
    }, menuRef);

    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      ctx.revert();
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!isMenuOpen) setHasOpenedMenu(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (href: string, isContact: boolean = false) => {
    setIsMenuOpen(false);

    if (isContact) {
      gsap.to(window, { duration: 1.5, scrollTo: "max", ease: "power4.inOut" });
    }
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none transition-[transform,opacity] duration-500 ease-in-out mix-blend-difference ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-full pl-[2em] lg:pl-[7em] pr-[1em] lg:pr-[6.4em] py-8 flex justify-between items-center pointer-events-auto bg-transparent relative">
          {!hideLogo ? (
            <Link 
              href="/" 
              className="header-logo group flex items-center opacity-0"
              onMouseEnter={() => gsap.to(".logo-text", { scale: 1.1, rotation: -5, duration: 0.3, ease: "back.out(1.7)" })}
              onMouseLeave={() => gsap.to(".logo-text", { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" })}
            >
              <span className="logo-text font-display font-black tracking-tighter text-2xl text-white inline-block origin-center">
                CS.
              </span>
            </Link>
          ) : (
            <div className="w-10" />
          )}

          <div className="header-right flex items-center gap-2 md:gap-10 opacity-0 ml-auto">
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  onClick={(e) => {
                    if (item.isContact) {
                      e.preventDefault();
                      handleLinkClick(item.href, true);
                    }
                  }}
                  className="relative group px-5 py-2 flex items-center justify-center"
                >
                  <span className="font-mono uppercase tracking-[0.2em] text-white font-bold text-[11px] relative z-10 mix-blend-difference">
                    {item.label}
                  </span>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white rounded-full transition-all duration-300 ease-out group-hover:w-[44px] group-hover:h-[44px] -z-0 opacity-100" />
                </Link>
              ))}

              <a
                href={CV_FILES[language]}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="relative group px-5 py-2 flex items-center justify-center"
              >
                <span className="font-mono uppercase tracking-[0.2em] text-white font-bold text-[11px] relative z-10 mix-blend-difference">
                  {t.header.cv}
                </span>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white rounded-full transition-all duration-300 ease-out group-hover:w-[44px] group-hover:h-[44px] -z-0 opacity-100" />
              </a>
            </nav>

            <LanguageSwitch />
            <ThemeToggle />

            {/* Mobile Menu Toggle - Absolute Far Right with minimal padding */}
            <button
              className="flex md:hidden items-center justify-center text-white transition-all duration-300 cursor-pointer z-[110] ml-2"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Menú móvil: panel de vidrio flotante, con margen de 4px ── */}
      <div
        ref={menuRef}
        className="menu-glass menu-glass-blur fixed inset-[4px] z-[90] flex flex-col overflow-hidden rounded-[28px] text-foreground md:hidden"
        style={{ visibility: "hidden" }}
      >
        <div className="menu-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pt-24 pb-6">
          <nav className="relative z-10 flex flex-col items-end gap-4 px-[14px]">
            {menuLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (item.isContact) {
                    e.preventDefault();
                    handleLinkClick(item.href, true);
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
                className="menu-item block w-fit border-b border-foreground/20 pb-2 text-right"
              >
                <span className="text-display-sm block font-black uppercase transition-opacity duration-300 hover:opacity-50 active:opacity-60">
                  {item.label}
                </span>
              </Link>
            ))}

            <a
              href={CV_FILES[language]}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="menu-item block w-fit border-b border-foreground/20 pb-2 text-right"
            >
              <span className="text-display-sm block font-black uppercase transition-opacity duration-300 hover:opacity-50 active:opacity-60">
                {t.header.cv}
              </span>
            </a>
          </nav>

          {/* Slider de proyectos: scroll-snap nativo, cero JS de arrastre.
              Las miniaturas se montan desde la primera apertura del menú.
              `my-auto` lo centra en el aire libre y colapsa a 0 si no hay. */}
          <div className="menu-projects relative z-10 my-auto py-6">
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[14px] scroll-px-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {hasOpenedMenu &&
                projects.map((project) => (
                  <Link
                    key={project.id}
                    href={project.link || "#"}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-[34vw] max-w-36 shrink-0 snap-start transition-opacity duration-200 active:opacity-70"
                  >
                    <span className="block aspect-square w-full overflow-hidden rounded-[12px] border border-foreground/10">
                      <img
                        src={menuThumb(project.image)}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="text-h7 mt-2 block truncate">{project.title}</span>
                  </Link>
                ))}
            </div>
          </div>

          <div className="menu-footer relative z-10 flex flex-col items-end gap-6 px-[14px] pt-6">
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`menu-social w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              onClick={() => handleLinkClick("#footer", true)}
              className="flex items-center gap-3 group"
            >
              <span className="font-mono uppercase tracking-widest text-xs opacity-60 group-hover:opacity-100 transition-opacity">Let's Talk</span>
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
