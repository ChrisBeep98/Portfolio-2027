"use client";

import { useEffect, useRef } from "react";

/**
 * @description Vídeo decorativo con carga diferida real (Hardware Symphony §5).
 * `preload="none"` evita que el archivo se descargue al cargar la página y un
 * IntersectionObserver lo reproduce solo cuando entra en pantalla, pausándolo
 * al salir (ni red ni decodificación fuera de viewport). El poster se asigna
 * al acercarse, no antes, para no meter otra imagen en la ruta crítica.
 */
export default function SmartVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (poster && !video.poster) video.poster = poster;
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [poster]);

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