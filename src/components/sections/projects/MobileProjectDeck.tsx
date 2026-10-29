"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import ProjectMedia from "./ProjectMedia";
import type { Project } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * @description Deck de proyectos en móvil. Solo transform y opacidad: la
 * tarjeta que sale se escala y se atenúa bajo un velo; la que se acopla pierde
 * el radio de golpe. Sin backdrop-filter, sin sombras y sin will-change
 * estático (la capa se enciende solo mientras el deck está en pantalla).
 * UN SOLO vídeo decodifica a la vez: el de la tarjeta acoplada; las demás
 * muestran el primer frame como poster hasta que les toca.
 */
export default function MobileProjectDeck({
  projects,
  isDark,
  projectLabel,
  exploreLabel,
  viewCaseLabel,
}: {
  projects: Project[];
  isDark: boolean;
  projectLabel: string;
  exploreLabel: string;
  viewCaseLabel: string;
}) {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = deckRef.current;
    if (!scope) return;

    const inners = () => gsap.utils.toArray<HTMLElement>(".mobile-card-inner", scope);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".mobile-project-card", scope);

      // Solo reproduce la tarjeta acoplada: nunca hay dos decodificadores.
      const setActive = (index: number) => {
        cards.forEach((card, i) => {
          const video = card.querySelector<HTMLVideoElement>("video");
          if (!video) return;
          if (i === index) {
            if (video.paused) void video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        });
      };

      const syncActive = () => {
        const y = window.scrollY;
        let active = -1;
        cards.forEach((card, i) => {
          if (y >= card.getBoundingClientRect().top + y - 1) active = i;
        });
        setActive(active);
      };

      cards.forEach((card, index) => {
        const inner = card.querySelector<HTMLElement>(".mobile-card-inner");
        const dimmer = card.querySelector<HTMLElement>(".mobile-card-dimmer");
        if (!inner || !dimmer) return;

        if (index === 0) {
          gsap.set(inner, { borderTopLeftRadius: 0, borderTopRightRadius: 0 });
        } else {
          // Radio instantáneo al acoplarse, no tween por frame.
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            onEnter: () => gsap.set(inner, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }),
            onLeaveBack: () => gsap.set(inner, { borderTopLeftRadius: 36, borderTopRightRadius: 36 }),
          });
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          onEnter: () => setActive(index),
          onLeaveBack: () => setActive(index - 1),
        });

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        gsap.timeline({
          scrollTrigger: { trigger: nextCard, start: "top bottom", end: "top top", scrub: true },
        })
          .to(inner, { scale: 0.96, force3D: true, ease: "none" })
          .to(dimmer, { opacity: 1, ease: "none" }, 0);
      });

      // Smart shutdown: compositing y vídeo solo mientras el deck se ve.
      const liveIO = new IntersectionObserver(
        ([entry]) => {
          inners().forEach((el) => gsap.set(el, { willChange: entry.isIntersecting ? "transform" : "auto" }));
          if (entry.isIntersecting) syncActive();
          else setActive(-1);
        },
        { rootMargin: "25% 0px" }
      );
      liveIO.observe(scope);
      syncActive();

      return () => liveIO.disconnect();
    });

    return () => {
      inners().forEach((el) => gsap.set(el, { willChange: "auto" }));
      mm.revert();
    };
  }, [projects]);

  return (
    <div ref={deckRef} className="md:hidden flex flex-col">
      {projects.map((project, index) => (
        <article
          key={project.id}
          className="mobile-project-card sticky top-0 h-dvh w-full bg-transparent overflow-hidden"
          style={{ zIndex: index + 1 }}
        >
          <div className="mobile-card-inner relative w-full h-full bg-background flex flex-col rounded-t-[36px] overflow-hidden border-t border-transparent dark:border-white/20">
            <div className="mobile-card-dimmer absolute inset-0 z-[60] bg-black/40 dark:bg-black/60 opacity-0 pointer-events-none" />

            <div className="flex-1 min-h-0 px-[14px] pt-24 pb-8 flex flex-col justify-center relative">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/30 mb-4 block">
                {projectLabel} {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-[1.15] mb-6">
                <span
                  className="px-2 py-0.5 decoration-clone"
                  style={{ backgroundColor: isDark ? project.darkBg : project.lightBg }}
                >
                  {project.title}
                </span>
              </h2>
              <p className="text-sm text-foreground/60 leading-relaxed mb-8 font-medium">{project.description}</p>
              <Link
                href={project.link || "#"}
                className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] w-fit border-b border-foreground/20 pb-1"
              >
                {exploreLabel} <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="h-[55%] w-full relative shrink-0">
              <ProjectMedia project={project} isMobile manualPlayback label={viewCaseLabel} />
              <div className="absolute top-6 right-6 flex flex-wrap gap-2 justify-end max-w-[260px]">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[10px] font-medium bg-background/90 border border-foreground/10 rounded-full text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}