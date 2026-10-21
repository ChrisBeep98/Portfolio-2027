---
name: Motion Bible Portfolio 2026
description: LA fuente canónica de motion. Física de marca (Cinematic Architect / Binary Soul) + tokens de movimiento (`src/lib/motion.ts`) + receta ejecutable de cada pilar y de las firmas del portfolio. Reemplaza a AWWWARDS-MOTION, CREATIVE-MOTION y CINEMATIC-ARCHITECT (archivados).
---

# 📖 MOTION-BIBLE — La Física de Portfolio 2026

**Regla de este documento:** ningún concepto vive sin receta. Si un pilar se nombra, su código con valores exactos está al lado. Prohibido citar esta biblia y luego improvisar valores.

**Identidad:** "Cinematic Architect / Binary Soul" — el scroll dirige una película técnica. Metáforas de **colisión controlada, precisión de ingeniería y agresividad tipográfica**: entradas con fuerza física (`power4.out`), salidas disparadas, revelados de máscara, cinética direccional. Nada de Inter, azul/naranja ni fades tímidos — eso es la marca muerta del proyecto anterior (ver `_archive/legacy-epicare/`).

**Stack real:** Next 16 · React 19 · GSAP 3.14 + ScrollTrigger + ScrollToPlugin · **Lenis YA es global** (`SmoothScrollProvider`, sincronizado con el ticker de GSAP — NUNCA lo re-inicialices; la instancia vive en **`window.__lenis`** — `window.lenis` sin guion bajo está reservado por la librería para su auto-setup). Siempre:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => { /* ...animaciones... */ }, sectionRef);
  return () => ctx.revert();
}, []);
```

`prefers-reduced-motion` → el provider de Lenis ni arranca (scroll nativo); las animaciones resuelven a estados finales visibles, sin scrub ni loops.

**Sticky Strategy:** `sticky top-0` nativo dentro de tracks calculados (200vh/300vh/500vh) en vez de pinning manual de GSAP (previene errores de DOM en Next.js).

---

## 0 · TOKENS DE MOTION (la firma — usar SIEMPRE estos, nunca inventar)

Fuente de código: **`src/lib/motion.ts`** (importar, no copiar valores). Censados del código real shipped (Hero, Projects, Header, About, Marquee, Process, Footer, case studies) el 2026-10-20.

| Token | Valor | Uso |
|:--|:--|:--|
| `EASE.out` | `"power3.out"` | Reveal estándar de entrada. El default de la página. |
| `EASE.dramatic` | `"power4.out"` | Slams cinemáticos, Mask Reveal, text-birth. La firma agresiva. |
| `EASE.inOut` | `"power4.inOut"` | Liquid ScrollTo y swaps entre estados. |
| `EASE.transition` | `"power2.inOut"` | Layout shift del Acto 2 (sistema planetario). |
| `EASE.snap` | `"power2.out"` | Micro-interacciones (hover, meta reveals, logo). |
| `EASE.accel` | `"power2.in"` | Salidas aceleradas (elementos que abandonan escena). |
| `EASE.quick` | `"power3"` | quickTo followers (cursor, magnéticos). |
| `EASE.breath` | `"sine.inOut"` | Loops infinitos (pulsos, bombilla, derivas). |
| `EASE.expo` | `"expo.inOut"` | Hairlines y líneas decorativas (scaleX). |
| `EASE.pop` | `"back.out(1.7)"` | Iconos acento con rebote controlado. |
| `DUR.dot / tap / micro / cursor` | `0.1 / 0.2 / 0.3 / 0.4` | quickTo dot · tap feedback móvil · magnético/hover logo · ring del cursor. |
| `DUR.fast` | `0.8` | Meta reveals (chips técnicos, fechas). |
| `DUR.base` | `1.0` | Elementos narrativos (párrafos, items). |
| `DUR.slow` | `1.2` | Títulos de acto, subtítulos, bloques grandes. |
| `DUR.signature` | `1.5` | Mask Reveal de títulos hero + Liquid ScrollTo. |
| `STAGGER.tight / base / wave` | `0.05 / 0.08→0.1 / 0.15` | Meta y anillos · líneas y actos · items de bloque (Process). |
| `REVEAL.meta / narrative / block` | `20 / 40 / 60` (px) | Distancia `y` de entrada según peso del elemento. |
| `REVEAL.maskPercent` | `100` | `yPercent` inicial del texto bajo Mask Reveal. |
| `REVEAL.slamPercent` | `150` | `xPercent` de salida lateral en slams. |
| `SCRUB.crisp / smooth / heavy` | `1 / 2 / 3` | Pegado al dedo · parallax estándar · capas pesadas (split-scroll, marquee). |
| `TRIGGER.narrative / standard / late` | `"top 92%" / "top 80%" / "top 75%"` | Starts de entrada. `narrative` = descubrimiento orgánico por elemento. |
| `TOGGLE.narrative` | `"play none none reverse"` | Flujo narrativo reversible al scrollear atrás. |
| `CURSOR.attraction / collisionRadius / collisionScale` | `0.15 / 60 / 1.15` | Magnetic Cursor Engine (§8.1). |
| `DECK.scaleDown` | `0.95` | Tarjeta inferior del Card Deck móvil (§8.3). |
| `SWAP.zIndexProgress` | `0.5` | 50% Swap Trick (§8.2). |
| `PLANET.scaleMobile / scaleDesktop / ringScaleMobile / orbitOpacity` | `0.7 / 1.15 / 0.6 / 0.6` | Transición planetaria del Acto 2 (§8.4). |
| `PARALLAX.bg / mid` | `0.7 / 0.85` | Ratio de velocidad de capas vs contenido (§3). |

**Consistencia = sensación de estudio.** Dos secciones con easings distintos sin razón se sienten de dos sitios diferentes.

---

## 1 · MASK REVEAL + TEXT-BIRTH (la firma) — títulos NUNCA hacen fade-in

**Física:** el texto nace desde un horizonte invisible, como emergiendo tras una ventana que se abre. Es LA firma de títulos del portfolio (heroes de case studies, footer, /about). Código real shipped (VANK):

```ts
// Wrapper con overflow-hidden por línea + máscara clip-path en el contenedor
gsap.fromTo(".hero-title-mask",
  { clipPath: "inset(0% 0% 100% 0%)" },
  { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.signature, ease: EASE.dramatic, delay: 0.5 });
gsap.fromTo(".hero-title-text",
  { y: "100%" },                                    // REVEAL.maskPercent
  { y: "0%", duration: DUR.signature, ease: EASE.dramatic, delay: 0.5 });
```

**Variante Text-Birth por líneas** (títulos multilínea, sin clip-path — solo overflow):
```tsx
<h2 ref={titleRef}>
  <span className="block overflow-hidden"><span className="line block">Primera línea.</span></span>
  <span className="block overflow-hidden"><span className="line block">Segunda línea.</span></span>
</h2>
```
```ts
gsap.from(".line", {
  yPercent: REVEAL.maskPercent,  // 100
  duration: DUR.slow,            // 1.2
  ease: EASE.dramatic,           // power4.out
  stagger: STAGGER.base,         // ola: línea 2 nace 0.1s después
  scrollTrigger: { trigger: titleRef.current, start: TRIGGER.late },
});
```

**Variantes de intensidad:**
- *Sutil:* solo líneas, sin scrub (arriba).
- *Media:* añade `rotate: 4` inicial en cada línea (nace inclinado y se endereza).
- *Teatral:* scrub-linked — `scrub: SCRUB.smooth`, `start: "top 90%", end: "top 40%"` → la velocidad del scroll del usuario controla el nacimiento.

---

## 2 · KINETIC / LATERAL SLAM — el contenido COLISIONA con la pantalla

**Física (Binary Soul §2.2 "The Kinetic Entry"):** static loading está prohibido. El contenido entra con fuerza física (`power4.out` = alta velocidad inicial, fricción lenta) y con **direccionalidad cruzada**: si un elemento entra desde la izquierda, el siguiente entra desde la derecha. Ritmo: Left → Right → Center → Left.

```ts
// Entrada slam (desde ±120% horizontal o yPercent profundo)
gsap.from(".slam-in", {
  xPercent: (i) => (i % 2 === 0 ? -120 : 120),   // crossfire direccional
  duration: DUR.slow, ease: EASE.dramatic, stagger: STAGGER.base,
});

// Salida disparada (Acto 2 del Hero — los textos abandonan la escena)
gsap.to(".hero-word", { xPercent: (i) => (i % 2 ? REVEAL.slamPercent : -REVEAL.slamPercent), ease: EASE.dramatic });  // ±150
```

---

## 3 · LAYERED UNVEILING — el contenido llega en olas con peso

**Física:** nada aparece todo a la vez. Fondo, estructura y texto viajan a velocidades distintas → profundidad espacial inmediata.

```ts
const tl = gsap.timeline({
  scrollTrigger: { trigger: section, start: TRIGGER.late },   // "top 75%"
});
tl.from(".bg-layer",     { y: REVEAL.narrative * PARALLAX.bg, opacity: 0, duration: DUR.slow, ease: EASE.out })
  .from(".card",         { y: REVEAL.narrative, opacity: 0, duration: DUR.base, ease: EASE.out, stagger: STAGGER.wave }, "-=0.6")
  .from(".card .detail", { y: REVEAL.meta, opacity: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.tight }, "-=0.4");
```

**Parallax persistente** (mientras se scrollea la sección):
```ts
gsap.to(".bg-layer", {
  yPercent: -15,
  ease: "none",
  scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: SCRUB.heavy },
});
```

**Regla:** mínimo **2 velocidades de scroll** por sección (fondo ≠ contenido). Con 1 velocidad, la página es un PDF.

---

## 4 · CURTAIN REVEAL — imágenes y superficies NUNCA hacen fade-in

**Física:** una cortina/persiana que se abre; la imagen interior contra-zoomea para dar volumen.

```ts
gsap.timeline({ scrollTrigger: { trigger: figure, start: TRIGGER.standard } })  // "top 80%"
  .from(figure, { clipPath: "inset(100% 0 0 0)", duration: DUR.slow, ease: EASE.inOut })
  .from(figure.querySelector("img"), { scale: 1.15, duration: DUR.slow, ease: EASE.out }, "<");
```

Variantes: `inset(0 100% 0 0)` (lateral, para layouts asimétricos) · `circle(0% at 50% 50%)` (spotlight, solo momentos de firma).

---

## 5 · BREATHING CANVAS — nada queda muerto cuando el scroll para

**Física:** vida latente — micro-oscilaciones imperceptibles y gradientes que derivan.

```ts
// Elementos flotantes (cards, orbes, badges)
gsap.to(".floating", {
  y: "-=10",                    // REVEAL.meta/2 — pulso corto
  duration: 2.5,                // valor shipped del pulso About
  ease: EASE.breath,            // sine.inOut
  yoyo: true,
  repeat: -1,
  stagger: { each: 0.6, from: "random" },  // asíncrono = orgánico
});
```

**Obligatorio:** pausar fuera de viewport (60fps):
```ts
ScrollTrigger.create({
  trigger: section, start: "top bottom", end: "bottom top",
  onToggle: (self) => breathTl[self.isActive ? "play" : "pause"](),
});
```

Orbes de luz de marca (púrpura `#a855f7` / glitch cyan-pink, `blur(120px)`, opacidad 10-20%) derivando lento son la versión Portfolio 2026 del canvas vivo — **acento, nunca discoteca**: máximo 2 orbes, saturación contenida, funciona en light Y dark. Rotación lenta de iconos: `rotation: 360, duration: 15, ease: "none", repeat: -1` (shipped en About/Marquee).

---

## 6 · THEATER CURTAIN + DEEP SPACE — transiciones entre secciones

**Física:** la sección siguiente se desliza POR ENCIMA; la anterior se hunde en el eje Z (escala + oscurece). El DOM se trata como espacio 3D, no como documento.

```ts
// En la sección A (la que se hunde):
gsap.to(sectionA, {
  scale: DECK.scaleDown,        // 0.95
  filter: "brightness(0.8)",
  ease: "none",
  scrollTrigger: { trigger: sectionB, start: "top bottom", end: "top top", scrub: SCRUB.crisp },
});
// Sección B necesita z-index mayor y fondo opaco.
```

**Sandwich 3D** (para secciones-mundo, usar con moderación): contenedor con `perspective: 1000px`; capa fondo `translateZ(-100px)`, contenido `0`, elementos diegéticos `+100px`; mouse-tilt con `gsap.quickTo(layer, "rotationY")` limitado a ±3°.

Técnicas pesadas (pin, split-scroll, horizontal, stacking, FLIP) → recetario completo en `SCROLL-EFFECTS-ARCHITECT.md`.

---

## 7 · SCROLLYTELLING LIGHT-UP — leer se gana scrolleando

```ts
gsap.utils.toArray<HTMLElement>(".read-line").forEach((line) => {
  gsap.fromTo(line, { opacity: 0.2 }, {
    opacity: 1,
    ease: "none",
    scrollTrigger: { trigger: line, start: TRIGGER.late, end: "top 45%", scrub: SCRUB.crisp },
  });
});
```

---

## 8 · FIRMAS DEL PORTFOLIO (integradas desde framework-old — shipped, no re-inventar)

### 8.1 MAGNETIC CURSOR ENGINE v1.0 (Projects, desktop only)
```ts
const xTo = gsap.quickTo(magnetic, "x", { duration: DUR.micro, ease: EASE.quick });   // 0.3, power3
const yTo = gsap.quickTo(magnetic, "y", { duration: DUR.micro, ease: EASE.quick });
// En mousemove: xTo(x + (cx - x) * CURSOR.attraction)  → 0.15 del recorrido, look técnico
// Colisión (distancia euclidiana < CURSOR.collisionRadius = 60px):
//   inversión de paleta (fondo blanco / texto negro) + scale CURSOR.collisionScale (1.15)
//   reset al salir del radio con overwrite: "auto"
```
En móvil: SIN lógica magnética (estabilización de z-index); el círculo "Ver más" usa `scale: 0` y se dispara con `onTouchStart` (`DUR.tap` 0.2s, `EASE.dramatic`, delay ~0.1, ciclo de vida corto).

### 8.2 50% SWAP TRICK (Split Scroll, Projects desktop)
En animaciones de superposición de paneles, el `zIndex` se intercambia en el progreso exacto `SWAP.zIndexProgress` (0.5) del scrub — el panel que sale ya no tapa al que entra. Anti-parpadeo. Track 500vh, viewport sticky 100vh, paneles 50vw (izq z-10 / der z-20).

### 8.3 CARD DECK (Projects, mobile)
Cada tarjeta `sticky top-0`; la nueva sube y cubre a la anterior. La inferior se escala a `DECK.scaleDown` (0.95) y se oscurece con un **dimmer negro SÓLIDO** (sin transparencia — evita lag). Chips flotantes top-right (`backdrop-blur-md`, `max-w-[260px]`).

### 8.4 PLANETARY TRANSITION (Hero, Acto 2)
Activación por scroll manual. Desktop: imagen 16vw→40vw a la izquierda, textos salen `xPercent ±150`, orbe+tags emergen centrados al 60% derecho (`PLANET.scaleDesktop` 1.15, anillos opacity `PLANET.orbitOpacity` 0.6). Mobile: imagen sale abajo, sistema centrado (`PLANET.scaleMobile` 0.7, anillos `PLANET.ringScaleMobile` 0.6 por performance). Easing de todo el layout shift: `EASE.transition` (power2.inOut).

### 8.5 LIQUID SCROLLTO (case studies + Header)
```ts
gsap.to(window, { duration: DUR.signature, scrollTo: { y: `#${id}`, autoKill: false }, ease: EASE.inOut });  // 1.5s power4.inOut
```
Elimina los saltos bruscos nativos en los índices laterales (Liquid Sidebar Index: desktop fixed 15% con sync bidireccional ScrollTrigger ↔ ScrollToPlugin; mobile FAB/pills). Con Lenis activo, `autoKill: false` mantiene el aterrizaje exacto.

### 8.6 NARRATIVE FLOW POR ELEMENTO (case studies)
Cada párrafo/item tiene su propio ScrollTrigger — `{ start: TRIGGER.narrative, toggleActions: TOGGLE.narrative }` ("top 92%", play/reverse), `y: REVEAL.narrative → 0`, `DUR.base`, `EASE.out`. Evita el despliegue masivo de contenido no visible: sensación de descubrimiento orgánico.

---

## 9 · RECETAS COMPLEMENTARIAS

**Count-up de métricas** (números que suben al entrar):
```ts
gsap.from(el, {
  textContent: 0,
  duration: DUR.slow,
  ease: EASE.out,
  snap: { textContent: 1 },
  scrollTrigger: { trigger: el, start: "top 85%" },
});
```

**Gradient morph** (fondo que muta de mood por fase):
```ts
gsap.to(orb, {
  backgroundColor: phaseColor,       // púrpura → glitch según card activa
  duration: DUR.slow, ease: EASE.inOut, overwrite: "auto",
});
```

**Magnetic snap hover** (rápido, no acolchado):
```ts
el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.05, duration: DUR.tap, ease: EASE.snap }));    // in: 0.2
el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1,    duration: DUR.micro, ease: EASE.snap }));   // out: 0.3
```

---

## 10 · 60FPS (resumen ejecutable — detalle en HARDWARE-SYMPHONY.md)

- Animar SOLO `transform` y `opacity` (`clip-path` con cuidado — es firma aquí, pero sin animarlo en loops). PROHIBIDO `width/height/top/left/box-shadow/filter` en loops.
- `will-change` solo en elementos activos; quitar al terminar. `contain: layout style paint` en paneles de split-scroll (shipped).
- Loops infinitos SIEMPRE pausados fuera de viewport (receta en §5).
- `invalidateOnRefresh: true` en todo lo responsive; `gsap.matchMedia()` para degradar en mobile.
- `force3D: true` / `translateZ(0)` en contenedores sticky (GPU forcing móvil).

---

## ✅ SELF-CHECK antes de entregar (si fallas 1, reescribe)

1. ¿Hay algún `opacity: 0 → 1` sin transform acompañante? → Es un fade-in plano. PROHIBIDO. Mask Reveal, Text-Birth, Slam o Curtain.
2. ¿Hay ≥2 velocidades de scroll en la sección? Si no → añade parallax (§3).
3. ¿Algo respira cuando el scroll se detiene? Si no → §5.
4. ¿Todos los valores salen de `EASE/DUR/STAGGER/REVEAL/SCRUB/TRIGGER/CURSOR/DECK/SWAP/PLANET`? Valores inventados = declararlos en el Reporte de Margen Creativo.
5. ¿La transición con la sección anterior/siguiente está coreografiada (o al menos considerada)? Consulta `project-context/scrollytelling-map.md` — ninguna sección repite la técnica-firma de su vecina.
6. ¿Light Y Dark verificados? ¿`prefers-reduced-motion` cubierto? ¿`ctx.revert()` presente? ¿Móvil sin pins ni lógica magnética?
