# 🎬 Scrollytelling Map — Christian Sandoval Portfolio 2026

> **La página es un setlist.** Ninguna sección repite la técnica-firma de su vecina (Ley 3). Este mapa es la fuente de la coreografía global; los parámetros por sección viven en `sections/<x>/context.md`. Censo inicial: 2026-10-20 (verificar contra código antes de editar).
>
> **Infra global:** Lenis (`window.__lenis`, lerp 0.1) · ScrollTrigger sincronizado por evento `scroll` · `CustomCursor` (dot quickTo 0.1s power3 + ring 0.4s power2.out) · `noise-bg` fijo z-50 · valores canónicos en `src/lib/motion.ts`.

---

## Ruta `/` — Landing (orden real en `src/app/page.tsx`)

| # | Sección | Técnica-firma | Track/Altura |
|:--|:--|:--|:--|
| 0 | **Header** | Overlay persistente + hide/show por scroll | fixed |
| 1 | **Hero** | Kinetic Type Slam (Acto 1) → Sistema Planetario (Acto 2) | sticky en track |
| 2 | **About** | Manifiesto word-by-word en panel invertido | min-h 70vh/sm:100vh |
| 3 | **Marquee** | Banda cinética horizontal con scrub + estrellas giratorias | sección simple |
| 4 | **Projects** | Alternating Split Scroll (desktop) / Card Deck (mobile) + Magnetic Cursor | **500vh** (5 × 100vh) |
| 5 | **Process** | Acordeón editorial con reveal en cascada solapada | sección simple |
| 6 | **Footer** | Cortina fija revelada por spacer + bombilla animada | spacer 100vh + fixed |

### 1 · Hero — 2 Actos (detalle en `sections/home/context.md`)
- **Acto 1 (load):** tipografía cinética aggressiva, defaults `power4.out`; palabras escalonadas; glitch RGB (cyan/pink strokes) en el nombre; imagen de identidad pequeña abajo-izq. Líneas largas con tokens `text-hero-fit-wide` / `text-hero-fit-indent` (md+) para que ninguna se corte por la derecha.
- **Acto 2 (scroll):** layout shift `power2.inOut` — desktop: imagen 16vw→40vw izq., textos salen `xPercent ±150`, orbe+tags emergen al 60% derecho (planeta scale 1.15, anillos 1.0). Mobile: imagen sale abajo con fade+scale (sin geometría layout), sistema planetario centrado (planeta 0.7, anillos 0.6).
- **Pills (2026-10-21):** viajan por su anillo con `offset-path` + `offset-rotate: 0deg` (traslación sin giro propio); click expande chip-card `theme-invert` a nivel raíz que PERSIGUE a la pill sin pausar su viaje (stem hairline en todos los breakpoints; móvil más pequeña y cuadrada, sin tag); pill abierta = estado active invertido; burbuja cierra al volver al Acto 1; anillos scale desktop 0.8; pausa solo fuera de viewport y en Acto 1 móvil.
- **Imán de scroll (22 Oct 2026):** recorrido real dentro del **15-85%** del track + pausa → viaja solo hasta el borde del acto, en ambos sentidos (Lenis `scrollTo` = autoridad única, easing `gsap.parseEase(EASE.inOut)`, consumo único con rearme, holgura 28px). **Fuera de la banda no actúa:** se puede descansar cerca del Acto 1 y de la salida sin que nada arrastre, y cualquier input real corta el viaje.

### 2 · About — Manifiesto invertido
- Panel `rounded-[36px]` con tema invertido (dark en light mode y viceversa), `mt-[8em]`.
- Palabras del diccionario (w1-w31) con máscara individual: `yPercent 100→0`, 1s, stagger 0.02, `power4.out`, trigger `top 80%`, reverse.
- Hairlines `scaleX 0→1` expo.inOut 1.5s stagger 0.2 · iconos acento `back.out(1.7)` 0.8s + loops (rotación 15s linear, pulso y-10 2.5s yoyo sine.inOut).

### 3 · Marquee — "PROYECTOS" ×4 + estrellas
- Scrub horizontal `ease: none`: desktop xPercent −40, scrub 2 · mobile xPercent −80, scrub 0.5. Trigger `top bottom → bottom top`.
- Estrellas Lucide en rotación infinita (360°, 3s, linear). Texto 15vw mobile / 10vw desktop `font-black uppercase`.

### 4 · Projects — Split Scroll (detalle en `sections/projects-showcase/context.md`)
- Desktop: track `.scroll-track` 500vh, viewport sticky 100vh, paneles 50vw (izq z-10 / der z-20), 3 fases por proyecto + **50% Swap Trick**.
- Mobile: Card Deck sticky (scale 0.95 + dimmer sólido), chips flotantes top-right, tap feedback 0.2s.
- Magnetic Cursor Engine v1.0 (desktop): quickTo 0.3s power3, atracción 0.15, colisión <60px → inversión de paleta + scale 1.15.

### 5 · Process — Acordeón editorial
- ⚠️ Los docs viejos lo describían como "3D Cards" — real: acordeón de bloques hairline con Plus rotativo.
- Reveal: título y100→0 1.2s power4.out · sub y30 1s power3.out (`-=0.8`) · items y50 0.8s stagger 0.15 power3.out (`-=0.6`). Trigger `top 80%`, reverse.
- Acordeón: framer-motion height auto, 0.5s, ease `[0.33,1,0.68,1]`.

### 6 · Footer — Cortina fija
- Spacer `h-screen` como trigger (`start: "top 50%"`, play/reverse); footer `fixed bottom-0 h-screen` siempre invertido (#0A0A0A light / #FAF9F6 dark).
- Mask Reveal del título 1.5s power4.out (delay 0.1) · bloques `footer-reveal-up` y60→0 0.8s stagger 0.1 power3.out (`-=1.0`).
- Bombilla SVG con gradiente animado en loop (sine.inOut 2s, yoyo): ámbar→teal→cian→oro→azul.

---

## Ruta `/about`
- Timeline default `power3.out`; Mask Reveals `clip-path inset` 1.5s/1.2s `power4.out`; salidas aceleradas `power2.in`. Detalle en `sections/about/context.md`.

## Rutas `/projects/{vank,anyma,nevado}` — Case Studies (Individual Page Clones)
Estructura base compartida (5 Actos):
1. **Hero:** Mask Reveal — título `clip-path inset(0 0 100% 0)→0` + texto `y 100%→0`, 1.5s power4.out delay 0.5; subtítulo y40 1.2s power3.out delay 0.9; meta-reveal y20 0.8s stagger 0.05 power2.out delay 0.4.
2. **Actos narrativos:** títulos por acto (`.acto{n}-title-mask/-text`) 1.2s stagger 0.1 power4.out.
3. **Narrative Flow:** cada párrafo/item con su propio ScrollTrigger `top 92%`, y40→0, 1s power3.out, `play none none reverse`.
4. **Liquid Sidebar Index:** desktop fixed 15% con sync bidireccional ScrollTrigger; mobile FAB/pills. Navegación: ScrollToPlugin 1.5s power4.inOut `autoKill: false`.
5. **Especiales por pieza:** ANYMA = Editorial Misalignment (citas −36px desktop, text-left mobile). VANK/NEVADO = micro-ajustes propios (ver su context.md).

---

## Presupuesto de técnicas (Ley 3 — anti-repetición)
Firmas en uso: Kinetic Slam · Planetary Orbit · Word-Mask Manifesto · Scrub Marquee · Split Scroll · Card Deck · Magnetic Cursor · Accordion Cascade · Curtain Footer · Mask Reveal (case studies) · Liquid Sidebar. **Al crear una sección nueva:** elegir paradigma distinto al de sus vecinas o justificar la colisión.
