"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { buildProjects, type Project } from "@/lib/projects";
import ProjectMedia from "./projects/ProjectMedia";
import MobileProjectDeck from "./projects/MobileProjectDeck";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Copy = ReturnType<typeof useLanguage>["t"];

/**
 * @description Showcase de proyectos. Desktop: split-scroll de 500vh con
 * paneles alternos y cursor magnético. Móvil: deck sticky de tarjetas
 * (`MobileProjectDeck`), con su propia coreografía y su propia carga.
 */
export default function Projects() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const desktopLeftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopRightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDark, setIsDark] = useState(false);

  const projects = useMemo<Project[]>(
    () => [
      {
        id: 1,
        title: t.nevado.intro.title,
        category: "Adventure Platform",
        description: t.nevado.intro.contextDesc,
        image: "https://res.cloudinary.com/dnx0dmhq3/image/upload/v1770692621/Layout_4_a4k6ah.jpg",
        video: "https://res.cloudinary.com/dnx0dmhq3/video/upload/v1770754632/chrome_4PFMYnDlsP_mejs5o.mp4",
        lightBg: "#F0F9FF",
        darkBg: "#0F172A",
        accent: "#0EA5E9",
        tags: ["Full Stack", "Payments API", "Branding"],
        link: "/projects/nevado",
        github: "#",
      },
      {
        id: 2,
        title: t.vank.intro.title,
        category: "Fintech Platform",
        description: t.vank.intro.contextDesc,
        image: "https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98ffcf18c76db9ce92b_MacBook%20Air%20M4%20-%20Sky%20Blue-2.jpg",
        video: "https://res.cloudinary.com/dnx0dmhq3/video/upload/v1770498001/684d06174bbd508a8dcbc859_68a02c4efff9efe6193d79dd_showcase_09-transcode_kezu6n.mp4",
        lightBg: "#FEF08A",
        darkBg: "#713F12",
        accent: "#facc15",
        tags: ["Strategy", "UI/UX Design", "Fintech"],
        link: "/projects/vank",
        github: "#",
      },
      {
        id: 3,
        title: t.anyma.intro.title,
        category: "Sports Platform",
        description: t.anyma.intro.contextDesc,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
        video: "https://res.cloudinary.com/dnx0dmhq3/video/upload/v1770737959/684d06174bbd508a8dcbc859_68afd4d547d4ac2e7cc5433f_showcase_anyma_02-transcode_mf3jez.mp4",
        lightBg: "#DCFCE7",
        darkBg: "#064E3B",
        accent: "#22c55e",
        tags: ["UI/UX Design", "Strategy", "Sports Tech"],
        link: "/projects/anyma",
        github: "#",
      },
    ],
    [t]
  );

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const leftPanels = desktopLeftRefs.current.filter(Boolean);
      const rightPanels = desktopRightRefs.current.filter(Boolean);
      gsap.set([leftPanels.slice(1), rightPanels.slice(1)], { y: "100vh" });
      gsap.set([leftPanels[0], rightPanels[0]], { y: 0, zIndex: 10 });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      projects.forEach((_, i) => {
        if (i === projects.length - 1) return;
        const cL = leftPanels[i], cR = rightPanels[i];
        const nL = leftPanels[i + 1], nR = rightPanels[i + 1];
        masterTl
          .to(nR, { y: 0, duration: 1, ease: "none", onStart: () => { gsap.set(nR, { zIndex: 30 }); } })
          .to(cL, { y: "-100vh", duration: 1, ease: "none", onUpdate: function () { if (this.progress() > 0.5) { gsap.set([nL, nR], { zIndex: 20 }); gsap.set([cL, cR], { zIndex: 5 }); } } }, ">-0.4")
          .to(nL, { y: 0, duration: 1, ease: "none" }, "<")
          .to(cR, { y: "-100vh", duration: 1, ease: "none" }, ">-0.5");
      });
    });

    return () => {
      mm.revert();
      observer.disconnect();
    };
  }, [isDark, projects]);

  return (
    <section ref={containerRef} id="projects" className="relative bg-background">
      <div className="hidden md:block" style={{ height: `${projects.length * 200}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={`desktop-wrapper-${project.id}`} className="absolute inset-0 w-full h-full flex">
                <div ref={(el) => { desktopLeftRefs.current[index] = el; }} className="w-1/2 h-full absolute top-0 left-0 overflow-hidden bg-background">
                  {isEven ? <DesktopContent project={project} index={index} isDark={isDark} t={t} /> : <ProjectMedia project={project} />}
                </div>
                <div ref={(el) => { desktopRightRefs.current[index] = el; }} className="w-1/2 h-full absolute top-0 right-0 overflow-hidden bg-background border-l border-foreground/5">
                  {!isEven ? <DesktopContent project={project} index={index} isDark={isDark} t={t} /> : <ProjectMedia project={project} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MobileProjectDeck
        projects={projects}
        isDark={isDark}
        projectLabel={t.common.project}
        exploreLabel={t.common.explore}
        viewCaseLabel={t.common.viewCase}
      />
    </section>
  );
}

function DesktopContent({ project, index, isDark, t }: { project: Project; index: number; isDark: boolean; t: Copy }) {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 lg:px-24">
      <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-foreground/30 mb-8 block">{t.common.project} {String(index + 1).padStart(2, '0')}</span>
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.15] mb-10">
        <span className="px-4 py-1 decoration-clone" style={{ backgroundColor: isDark ? project.darkBg : project.lightBg }}>{project.title}</span>
      </h2>
      <p className="text-lg text-foreground/60 leading-relaxed mb-12 max-w-md font-medium">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-14">
        {project.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-[11px] font-medium border border-foreground/10 rounded-full opacity-60">{tag}</span>
        ))}
      </div>
      <Link href={project.link || "#"} className="flex items-center gap-6 w-fit group">
        <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500 transform group-hover:scale-110">
          <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{t.common.viewCase}</span>
      </Link>
    </div>
  );
}