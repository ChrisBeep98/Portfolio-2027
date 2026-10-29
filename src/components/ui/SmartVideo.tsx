"use client";

import { useEffect, useRef } from "react";

/**
 * @description Vídeo decorativo con carga diferida real (Hardware Symphony §5).
 * `preload="none"` evita descargarlo al cargar; el IntersectionObserver asigna
 * el poster y bufferea al acercarse. En modo normal reproduce/pausa al entrar
 * y salir; en `manual` solo prepara la carga y deja el play/pause al padre
 * (el deck móvil solo reproduce la tarjeta acoplada).
 */
export default function SmartVideo({
  src,
  poster,
  className,
  manual = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  manual?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (poster && !video.poster) video.poster = poster;
          if (manual) {
            if (video.preload !== "auto") {
              video.preload = "auto";
              video.load();
            }
          } else {
            void video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [poster, manual]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}