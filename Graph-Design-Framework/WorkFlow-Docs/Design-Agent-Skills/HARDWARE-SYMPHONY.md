---
name: Hardware Symphony
description: Performance gatekeeper ensuring 60fps on all devices. Smart Shutdown protocol, elegant degradation, legal animated properties, and accessibility.
---

# 🖥️ Agent Skill: THE HARDWARE SYMPHONY (Extreme Performance)

**Level:** Systems Architect / Master-Class
**Stack:** React, GSAP, CSS, Next.js, IntersectionObserver
**Objective:** Ensure Portfolio 2026's Awwwards-level animations run at a flawless 60fps on both an M3 Max MacBook and a 4-year-old Android phone.

---

> *"A beautiful animation that stutters is not an animation; it's a glitch. Performance is the ultimate luxury."*

This skill is the **Gatekeeper**. It dictates the engineering practices required to pull off our *AWWWARDS-MOTION Dynamics* without burning the user's CPU or draining their battery. 

Whenever you implement heavy visual effects (Parallax, Glassmorphism, GSAP logic), you MUST adhere to the Hardware Symphony protocol:

## 1. THE "SMART SHUTDOWN" PROTOCOL (Intersection Observers)
Never run math or animations on elements the user cannot see.

*   **The Rule:** If an element enters the viewport, animate it. If it leaves the viewport by 1px, **PAUSE** its animation and ticker.
*   **Implementation (React):** Use Intersection Observers (or `framer-motion`'s `useInView`, or GSAP's native ScrollTrigger toggles) to suspend heavy loops, Canvas repaints, or continuous CSS animations.
*   **Glassmorphism Quarantine:** `backdrop-filter: blur()` is a GPU killer. If a glass element (like the *Glass Engine* surfaces) is out of view, its blur must mathematically cease rendering.

## 2. ELEGANT DEGRADATION (Mobile vs. Desktop)
Do not force a mobile phone to run a desktop's WebGL or heavy DOM manipulation.

*   **Mobile Simplification:** On viewports under `768px`, heavily animated 3D cards or complex DOM-based Parallaxes should degrade elegantly into simpler CSS transitions (`opacity` and `transform`).
*   **Disable on Resize:** GSAP ScrollTriggers must be configured using `gsap.matchMedia()` so memory-heavy ScrollTriggers are killed completely on smaller breakpoints, not just hidden with CSS.

## 3. ACCESSIBILITY FIRST (`prefers-reduced-motion`)
Some users experience motion sickness. We must respect the OS-level flag.

*   **The Rule:** Before firing any GSAP Master Timeline or complex Lenis smooth scroll, check for `prefers-reduced-motion: reduce`.
*   **Implementation:** If true, instantly kill the timeline and default all elements to `opacity: 1, transform: none`. 

## 4. THE ONLY LEGAL ANIMATED PROPERTIES
To maintain 60fps, we strictly control what the browser calculates.

*   **DO ANIMATE:** `transform` (translate, scale, rotate, skew) and `opacity`. These are handled by the GPU (Compositor thread).
*   **NEVER ANIMATE:** `width`, `height`, `margin`, `padding`, `top`, `left`, `box-shadow`. These trigger Layout Recalculations and Paint, destroying framerates.
*   **Will-Change:** Apply `will-change: transform` or `will-change: opacity`, but *only* dynamically via JS just before the animation starts, and remove it after. Leaving it on statically consumes excessive VRAM.

## 5. IMAGE & VIDEO HYGIENE
*   **Videos:** Must NOT have audio tracks unless requested. Must use `playsInline`, `muted`, `loop`, and `preload="none"` (or `metadata`).
*   **Images:** Must use modern formats (WebP/AVIF), strict `sizes` attributes for `next/image`, and `priority={true}` ONLY for the LCP (Largest Contentful Paint) hero image.

## 6. LECCIONES DE CAMPO — sweeps del proyecto anterior (2026-09), todas fueron bugs reales

| Síntoma | Causa | Arreglo |
|:--|:--|:--|
| Móvil "súper lento" | pins de GSAP + `backdrop-filter` sobre vídeo/capas animadas + loops en GSAP | sin pin en móvil, sliders `scroll-snap` nativos, blur fuera, loops en keyframes CSS |
| Loops consumiendo fuera de pantalla | keyframes sin pausa | `IntersectionObserver` que alterna `.is-offscreen` en la sección + `.root.is-offscreen * { animation-play-state: paused }` |
| Carruseles con `setInterval` siempre vivos | timer JS | la barra del paginador ES el timer: keyframe `scaleX` + `onAnimationEnd` (ver DATA-MOCK-UI §4) |
| **Franja de fondo** bajo un slider | el contenedor `overflow-x` **recorta la sombra** de las slides en su borde | sin `shadow-*` en slides móviles; sombra solo `lg:` |
| Hairlines de 1px que desaparecen (`gap-px`) | celdas que quedan con `transform` tras la entrada → capa compuesta se come el gap | `clearProps: "transform,willChange"` en la entrada |
| "Brinco" entre secciones / pins descuadrados | `SmartVideo` lazy sin alto reservado crece al cargar | `style={{ aspectRatio: "W / H" }}` en todo vídeo lazy |
| Pin que se pausa a mitad | IO/trigger calculado sobre el elemento pineado ignora el recorrido | usar `pin.start/pin.end` o observar la sección |
| `"Invalid scope"` en consola | `gsap.context(fn, ref)` con `ref.current` null | `gsap.matchMedia(el)` con el **elemento**, montado en `useLayoutEffect` tras comprobar `el` |
| Hydration mismatch | `Math.random()` en render | datos fijos |
| Keyframe animando `width` | layout por frame | `transform: scaleX` con `origin-left` |
| Pin horizontal "pesado" en desktop (proyecto anterior, Métricas) | una transición de paint (`stroke-dasharray`) dentro de una pista transformada repinta la capa entera; `scrub: 1` sobre Lenis = doble suavizado | aislar lo que pinta en capa propia (`will-change-transform` en el SVG), `will-change: transform` en cada acto con paralaje mientras dura el pin (vía `gsap.set` dentro de `mm.add`, se revierte solo), `scrub: true`. **No quitar el paralaje para "optimizar"**: el usuario lo quiere (mazo 3D) y con capas estables cuesta poco. Para "opacar" una tarjeta que tapa a otras, velo del color del fondo encima, no `opacity` de la tarjeta (se transparenta). Medir con `LayerTree.paintCount` por capa, no a ojo |
| Entrada GSAP "con delay" / a saltos | `transition-all` en el mismo elemento: la transición CSS re-suaviza cada frame del `transform`/`opacity` de GSAP | transicionar solo lo que usa el hover (`transition-[translate,box-shadow,border-color]`); nunca `transition-all` en algo que anima GSAP |
| Tailwind v4 `scale-x-*` no transiciona con `transition-transform` | v4 usa la propiedad `scale` | `transition-[scale]`; ídem `translate-*` → `transition-[translate]` |

## 🤖 AI PROMPT DIRECTIVES
When writing front-end code for Portfolio 2026:
1. *"Did I just animate a `box-shadow` or `width`? If yes, rewrite it to animate a pseudo-element's `opacity` or `transform: scale`."*
2. *"Is this infinite CSS keyframe animation running off-screen? If yes, wrap it in an Intersection Observer."*
3. *"Did I wrap my GSAP ScrollTriggers in a `gsap.matchMedia()` block? If not, do it now."*
