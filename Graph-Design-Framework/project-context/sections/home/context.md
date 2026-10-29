# sections/home — Landing `/` (Header · Hero · About · Marquee · Footer)

> **Estado:** SHIPPED — trabajo en producción. Tratar como **APROBADO/congelado** salvo pedido explícito (TASTE-LEDGER: "porfa no la dañes que me costó hacerla").
> Censo inicial: 2026-10-20. Componentes: `src/components/sections/{Header,Hero,About,Marquee,Footer}.tsx` + `src/app/page.tsx`.
> Projects y Process tienen su propio context.md (`../projects-showcase/`, `../process/`).

## Header (`Header.tsx`)
- Nav reveal: y→0, opacity, 0.8s, stagger 0.1, `power2.out`, delay 0.2.
- Transiciones de menú: `power4.inOut`; hovers `power2.out`/`power3.out`; CTA scroll: `gsap.to(window, {scrollTo: "max", 1.5s, power4.inOut})`.
- Hide/show por `window.addEventListener("scroll", {passive:true})` leyendo `window.scrollY` — compatible con Lenis (scroll nativo real).
- Logo: `font-black tracking-tighter` con hover scale/rotation 0.3s power2.out.
- ⚠️ Pendiente i18n: textos hardcodeados en Header ("Let's Talk", `aria-label="Toggle Menu"`; roadmap viejo de `framework-old/docs/LANGUAGE-SYSTEM.md`).
- **Menú móvil (rediseño 2026-10-29, diseño APROBADO por el director — «quedó bonito»; motion ajustado a su pedido el mismo día):** panel de vidrio flotante `fixed inset-[4px]` (margen de 4px pedido, NO full-bleed), `rounded-[28px]`. Superficie `.menu-glass` (tinte `color-mix` 74% de `--background` + hairline bimodal + filo superior blanco) + `.menu-glass-blur` (`backdrop-filter: blur(16px) saturate(160%)`) **siempre puesta**: el vidrio entra con blur desde el primer frame. Apertura = fade de compositor `autoAlpha 0→1` en `DUR.tap` (0.2s) con `EASE.snap` (solo opacity: el área del backdrop no cambia y el blur se cachea) + cascade de contenido en paralelo (`REVEAL.meta`, `STAGGER.tight`, `DUR.micro`); cierre = fade `DUR.tap` con `EASE.accel`. Con el menú abierto: `body.overflow hidden` + `window.__lenis?.stop()` (el panel ya no tapa la página).
  - Links a `text-display-sm` (32px, antes monolitos `text-[14vw]`), alineados a la derecha con hairline, + CV con el mismo tratamiento.
  - El link monolítico "Work/Proyectos" **desaparece del menú**: lo sustituye un slider horizontal nativo (`snap-x`, cero JS de arrastre, sin indicador) con 3 tarjetas `w-[34vw] max-w-36` (thumb `aspect-square` `rounded-[12px]` + título `text-h7` fuera de la imagen, media a sangre del gutter). Datos desde `src/lib/projects.ts` (`buildProjects(t)` + `menuThumb()` a ~400px); las miniaturas se montan solo desde la primera apertura (`hasOpenedMenu`) para no descargar 3 imágenes remotas en cada carga.
  - Layout elástico: nav arriba, slider centrado en el aire libre (`my-auto`), footer abajo; `@media (max-height: 640px)` comprime SOLO paddings/gaps para que el CTA no quede bajo el fold a 600/560 de alto.
  - Motion (ajuste del 2026-10-29 tras el «quedó bonito»: el director pidió reactividad sin cortina ni blur asentándose): fade `autoAlpha 0→1` en `DUR.tap` con `EASE.snap` + cascade en paralelo (`REVEAL.meta`, `STAGGER.tight`, `DUR.micro`); cierre `DUR.tap` con `EASE.accel`. Medido (headless, 2ª apertura con thumbs en caché): p50 13.3 / p95 13.4 / max 15.1 ms, 0 frames >50 ms; a los ~80 ms del tap el panel ya computa el blur (`probe-menu-early.js`). La 1ª apertura tiene un pico de ~160 ms = decodificación de las 3 miniaturas.
  - **Quemados:** panel full-bleed opaco `bg-background` con monolitos `text-[14vw]` (pedido explícito de cambio) · cortina `clip-path` desde arriba y blur diferido al `onComplete` (el director vio el tinte sin vidrio: «sale transparente y luego se pone el blur, se ve feo») · `@utility` para el blur (el build emitía solo `-webkit-backdrop-filter` y Chrome computaba `none`; va como clase plana junto a `.glass-engine`) · escribir `backdrop-filter` y `-webkit-backdrop-filter` juntos (Lightning CSS descarta la estándar).

## Hero (`Hero.tsx`) — 2 Actos
- **Acto 1:** `gsap.timeline({defaults:{ease:"power4.out"}})` — palabras "Christian/Sandoval/UX-UI…" escalonadas, glitch RGB (`.text-stroke-cyan/pink`), identidad abajo-izq.
- **Acto 2:** transiciones `power2.inOut` — imagen 16vw→40vw (desktop) / fade+scale sin geometría layout (mobile), textos `xPercent ±150` sin `scale` (escalar texto gigante con stroke re-rasteriza en móvil), sistema planetario: orbe scale 0.7 (móvil) / 1.15 (desktop), anillos opacity 0.6 stagger 0.05. `borderRadius 24px` en la imagen.
- **Tipografía (fix 2026-10-21, APROBADO):** las líneas largas se cortaban por la derecha en desktop (`ARQUITECTO.DIGITAL` 1459px vs pista 1216px a 1440). Tokens `@utility` nuevos: `text-hero-fit-wide` (línea centrada) y `text-hero-fit-indent` (línea con `md:pl-[20vw]`) = `min(firma, calc(vw − px))` con coeficientes MEDIDOS en navegador (ES+EN); solo `md:`, móvil intacto; no liga donde las líneas ya cabían.
- **Pills (rework 2026-10-21, APROBADO):** viajan por su anillo con `offset-path` + `offset-rotate: 0deg` (traslación pura, NUNCA giran sobre su eje — pedido del director); 35/45/55s, anillo 2 en reversa; reposo `--o0` por pill (reduced-motion). Pausadas fuera de viewport (`.orbits-paused`, IO) y en móvil durante el Acto 1 (progress < 0.3). Anillos scale desktop **0.8** / móvil 0.6 (con 1 la última órbita se salía del viewport en laptops — corregido por pedido del director).
- **Chip-cards (click en pill, APROBADO v3 2026-10-21):** burbuja `role="dialog"` a NIVEL RAÍZ, `position: fixed`, superficie `theme-invert` opaca + stem hairline 12px hacia su pill en TODOS los breakpoints. Desktop `w-72` con tag mono; móvil `w-40` cuadrada (`rounded-[10px]`, `text-body-xs`) SIN tag y siguiendo a su pill igual que en desktop. La pill SIGUE viajando con la burbuja abierta y esta la persigue por frame (posicionamiento imperativo por ref, sin re-renders — un `setState` por frame remontaba las pills y congelaba el sistema); clamp al viewport anti-cortes. Pill abierta = estado active invertido (`bg-foreground text-background border-foreground`). Cierra con Escape, re-click, o al volver al Acto 1 (progress < 0.12). Copy en `dictionary.ts` → `hero.satellitesInfo` (paridad EN/ES). Burbuja Y wrapper de imagen con `pointer-events-none`: ni la card abierta ni la foto invisible del Acto 2 (opacity 0, z-20, 60vw×28vh) interceptan clicks de pills — zonas muertas reportadas y corregidas 2026-10-21, verificadas con `elementFromPoint` sobre el build de producción. Burbuja EFÍMERA: auto-close a los 4s, y cierre al salir del track hacia la siguiente sección (progress > 0.9) o del viewport (IO).
- **Quemados:** burbuja dentro del subtree del anillo (hereda `opacity: 0.6` → contraste lavado; el `overflow-hidden` móvil la recorta) · burbuja `glass-engine` translúcida (rechazo del director) · anillos congelados sin viaje (el director pidió conservar la traslación) · contrarrotación anidada para pills derechas (se inclinaban; `offset-rotate: 0deg` lo garantiza por construcción) · PAUSAR el viaje al abrir la burbuja ("no quiero que todo se detenga", director) · `setState` por frame para seguir a la pill (remontaba las pills y reiniciaba su animación CSS = sistema solar congelado al click) · Acto 2 ONE-SHOT sin scrub (`toggleActions` + track 200/160vh, 2026-10-21): rechazado por el director («quedó horrible», se desincroniza con scroll rápido); revertido a `1cb50bd` — lo APROBADO es scrub sobre track 300vh.
- Mobile detectado por `window.innerWidth` al montar; tags de anillos escalados 0.6 por performance.
- **Refactor + fix Acto 1 (2026-10-21, tsc+build verdes):** bug "recarga + scroll rápido" (intro y scrub comparten `.reveal-*`/`.hero-detail`/imagen; los `.to()` capturaban start a medio salir y el Acto 1 no se restauraba) → `scrollTl.set(...)` a posición 0 fija el estado visible antes de que los `.to()` capturen su start. Auto-avance (pedido por el director): scroll corto hacia abajo → avanza solo hasta la salida vía `ScrollTrigger.addEventListener("scrollStart"/"scrollEnd")` + `gsap.to(window, { scrollTo })`. Hero consume `motion.ts`; track 300vh y scrub intactos, cero cambio de píxel.

## About (`About.tsx`) — Manifiesto word-by-word
- Panel invertido `rounded-[36px]` (bg `#050505` light / `#F2F2F0` dark — hardcodeado, candidato a token), `mt-[8em]`, min-h 70vh/sm:100vh.
- Palabras desde `dictionary.ts` (w1-w31, `isSpecial` = itálica ligera): máscara por palabra `yPercent 100→0`, 1s, stagger 0.02, `power4.out`, trigger `top 80%`, `play none none reverse`.
- Hairlines superior/inferior: `scaleX 0→1`, 1.5s, `expo.inOut`, stagger 0.2, trigger `top 85%`.
- Iconos acento inline (Sparkles/Zap/Star/Triangle/Diamond): entrada `back.out(1.7)` 0.8s stagger 0.05 + loops (rotación 360° 15s linear infinito; pulso y −10 2.5s yoyo sine.inOut).
- Tipografía: `text-[8.5vw]` móvil → `lg:text-[4vw]`, `font-bold` móvil / `lg:font-medium`, tracking-tighter.
- ⚠️ Deuda: colores genéricos Tailwind en iconos (`text-orange-500` etc.).

## Marquee (`Marquee.tsx`) — Banda "PROYECTOS"
- Scrub `ease: none`: desktop xPercent −40 (scrub 2) / mobile −80 (scrub 0.5); trigger `top bottom → bottom top`.
- 4 repeticiones + estrella Lucide por bloque, rotación infinita 360° 3s linear.
- Texto `text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter`; bg hardcodeado `#F2F2F0/#050505`.

## Footer (`Footer.tsx`) — Cortina fija
- Patrón: spacer `h-screen` (trigger `top 50%`, play/reverse) + footer `fixed bottom-0 h-screen z-0` siempre invertido (`#0A0A0A` light / `#FAF9F6` dark).
- Mask Reveal título: clip-path inset + `y 100%→0`, 1.5s `power4.out`, delay 0.1; bloques `.footer-reveal-up` y60→0 0.8s stagger 0.1 power3.out (`-=1.0`), force3D.
- Bombilla SVG inline con gradiente en loop (sine.inOut 2s yoyo, 6 pasos de color).
- Botones sociales con gradientes de marca propia (Email/Instagram/Whatsapp), `rounded-[12px]`, h 44/48px, hover lift −4px.
- Copy email: chip "Copied!" con framer-motion (único uso de framer en la sección junto a Process).
- Título `text-[13vw] lg:text-[7.5vw] font-bold uppercase`.

## Quemados / reglas heredadas
- Sin pins manuales de GSAP (sticky nativo); z-index con "50% Swap Trick" en superposiciones.
- Mobile: mandato `px-[14px]`, edge-to-edge en imágenes, sin lógica magnética.

## Pendientes (no tocar sin protocolo)
1. Tokenizar colores hardcodeados (bg de secciones) → variables semánticas.
2. i18n completo del Header.
3. Self-host del noise SVG.
