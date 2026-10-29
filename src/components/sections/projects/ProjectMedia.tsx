"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import SmartVideo from "@/components/ui/SmartVideo";
import type { Project } from "@/lib/projects";

// Primer frame del vídeo como imagen (Cloudinary `so_0`). En móvil el deck usa
// esto en vez del <video>: mismo contenido visual, cero decodificación mientras
// la tarjeta se escala (Hardware Symphony §2 y §5).
const videoFirstFrame = (src: string) =>
  src.includes("res.cloudinary.com")
    ? src.replace("/video/upload/", "/video/upload/so_0,w_720,q_auto/").replace(/\.mp4(\?.*)?$/, ".jpg")
    : src;

/**
 * @description Media de un proyecto: vídeo diferido (o imagen) + feedback
 * magnético de cursor en desktop. Con `manualPlayback` (deck móvil) el padre
 * decide cuándo reproducir: el poster es el primer frame exacto del vídeo.
 */
export default function ProjectMedia({
  project,
  isMobile = false,
  manualPlayback = false,
  label = "View Case",
}: {
  project: Project;
  isMobile?: boolean;
  manualPlayback?: boolean;
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const magnetic = magneticRef.current;
      if (!container || !magnetic) return;

      const xTo = gsap.quickTo(magnetic, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(magnetic, "y", { duration: 0.3, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        xTo(dx * 0.3);
        yTo(dy * 0.3);

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 60) {
          gsap.to(magnetic, { backgroundColor: "#fff", color: "#000", scale: 1.15, duration: 0.3, overwrite: "auto" });
        } else {
          gsap.to(magnetic, { backgroundColor: "#000", color: "#fff", scale: 1, duration: 0.3, overwrite: "auto" });
        }
      };

      const onMouseEnter = () => {
        gsap.to(magnetic, { scale: 1, opacity: 1, duration: 0.4, ease: "expo.out" });
      };

      const onMouseLeave = () => {
        gsap.to(magnetic, { scale: 0, opacity: 0, x: 0, y: 0, duration: 0.4, ease: "expo.inOut" });
      };

      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleTap = () => {
    if (!isMobile || !magneticRef.current) return;
    gsap.fromTo(
      magneticRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power4.out",
        onComplete: () => {
          gsap.to(magneticRef.current, { scale: 0, opacity: 0, duration: 0.2, delay: 0.1 });
        },
      }
    );
  };

  const showVideo = Boolean(project.video);
  const poster = project.video && manualPlayback ? videoFirstFrame(project.video) : project.image;

  const mediaContent = (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden group ${isMobile ? "" : "bg-background p-12 lg:p-24"}`}
      onPointerDown={handleTap}
    >
      <div className={`w-full h-full relative overflow-hidden ${isMobile ? "" : "rounded-sm shadow-2xl"}`}>
        {showVideo ? (
          <SmartVideo
            src={project.video as string}
            poster={poster}
            manual={manualPlayback}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={magneticRef}
          className="w-28 h-28 bg-black text-white rounded-full flex flex-col items-center justify-center origin-center scale-0 opacity-0 shadow-2xl"
        >
          <span className="text-[10px] font-black uppercase tracking-wider mb-1">{label}</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );

  if (project.link && project.link !== "#") {
    return <Link href={project.link} className="w-full h-full block">{mediaContent}</Link>;
  }

  return <div className="w-full h-full">{mediaContent}</div>;
}