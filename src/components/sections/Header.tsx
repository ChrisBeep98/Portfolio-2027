"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

// ── Header: hide/show por scroll ──
const HEADER_REVEAL_AT_TOP = 10; // px: por debajo de aquí el header siempre visible
const HEADER_INTENT = 24; // px de recorrido sostenido para cambiar de estado (anti-titileo)

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

  const navLinks = [
    { label: t.header.work, href: "/#projects" },
    { label: t.header.about, href: "/about" },
    { label: t.header.contact, href: "#footer", isContact: true }
  ];

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
        gsap.set(menuRef.current, { visibility: "visible" });
        const tlOpen = gsap.timeline();
        tlOpen.to(menuRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power4.inOut"
        })
        .from(".menu-item", {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.3")
        .from(".menu-footer", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4");

        document.body.style.overflow = "hidden";
      } else {
        const tlClose = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, { visibility: "hidden" });
          }
        });
        tlClose.to(menuRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power4.inOut"
        });
        document.body.style.overflow = "";
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      <div 
        ref={menuRef}
        className="fixed inset-0 z-[90] bg-background text-foreground flex flex-col justify-center px-6 md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)", visibility: "hidden" }}
      >
        <nav className="flex flex-col w-full relative z-10 gap-10 items-end">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={(e) => {
                if (item.isContact) {
                  e.preventDefault();
                  handleLinkClick(item.href, true);
                } else {
                  setIsMenuOpen(false);
                }
              }}
              className="menu-item block w-fit text-right border-b border-foreground/20 pb-6"
            >
              <span className="font-display font-black text-[14vw] leading-[0.85] uppercase tracking-tighter hover:opacity-50 transition-opacity duration-300">
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
            className="menu-item block w-fit text-right"
          >
            <span className="font-display font-black text-[14vw] leading-[0.85] uppercase tracking-tighter hover:opacity-50 transition-opacity duration-300">
              {t.header.cv}
            </span>
          </a>
        </nav>

        <div className="menu-footer mt-16 flex flex-col gap-8 relative z-10 w-full items-end">
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
    </>
  );
}
