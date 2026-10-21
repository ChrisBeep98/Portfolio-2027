# sections/projects-showcase — Showcase de la landing (`Projects.tsx`)

> **Estado:** SHIPPED — **APROBADO/congelado**. Censo inicial: 2026-10-20.
> Componente: `src/components/sections/Projects.tsx` · CSS estructural: `src/styles/globals.css` (bloque ALTERNATING SPLIT SCROLL) · docs históricos: `framework-old/docs/ANIMATION-ENGINE.md` §2 y §5.

## Arquitectura Desktop — Alternating Split Scroll
- **Track:** `.split-master-wrapper` > `.scroll-track` (**500vh** = 5 proyectos × 100vh) + `.split-viewport` sticky top-0 100vh.
- **Paneles:** `.panel` 50vw — `.panel-left` z-10 / `.panel-right` z-20, `will-change: transform`, `contain: layout style paint`.
- **La Regla de las 3 Fases** (por proyecto):
  1. **Entrada:** panel derecho del siguiente sube mientras el actual sigue fijo.
  2. **SWAP (progress 0.5):** izquierdo actual sale disparado arriba, izquierdo siguiente entra; en el punto medio exacto se intercambian zIndex (**50% Swap Trick** — anti-parpadeo).
  3. **Cierre:** derecho anterior termina de salir, tarjeta nueva asentada.
- Breakpoint real del CSS: `max-width: 1023px` oculta el split (`.split-master-wrapper { display:none }`) y colapsa a layout relativo.

## Arquitectura Mobile — Card Deck
- "Deck of Cards": cada tarjeta `sticky top-0`; la nueva sube y cubre a la anterior.
- Tarjeta inferior: scale **0.95** + dimmer negro SÓLIDO (sin transparencia — evita lag).
- **Floating Chips:** etiquetas top-right sobre la imagen, `backdrop-blur-md`, `max-w-[260px]`.
- **Tap Feedback:** círculo "Ver más" en `scale: 0` por defecto; se dispara con `onTouchStart` (0.2s power4.out, delay ~0.1, ciclo de vida corto). Sin lógica magnética en móvil (estabilización de z-index).
- Info reveal: ScrollTrigger individual por tarjeta (no master timeline).

## Magnetic Cursor Engine v1.0 (solo desktop)
- Seguimiento: `gsap.quickTo` (0.3s, `power3`) — zero lag. Censado en código: líneas ~200-201.
- Atracción: multiplicador **0.15** (15% del recorrido — círculo cerca del centro del lane, look técnico).
- Colisión (distancia euclidiana < **60px**): inversión de paleta (fondo blanco/texto negro), `scale: 1.15`; reset con `overwrite: "auto"`.

## Parámetros canónicos (motion.ts)
`CURSOR.attraction 0.15` · `CURSOR.collisionRadius 60` · `CURSOR.collisionScale 1.15` · `DECK.scaleDown 0.95` · `SWAP.zIndexProgress 0.5` · `DUR.tap 0.2` · `EASE.quick "power3"`.

## Reglas
- `gsap.matchMedia()` para la bifurcación desktop/mobile (presente en el componente).
- Prohibido re-stylear el deck móvil como "split scroll chico": son paradigmas distintos (RESPONSIVE-STRATEGY: Kinetic Responsive).
- Rediseño de esta sección → solo vía AWWWARDS-REDESIGN-SECTION-PROTOCOL (está congelada).

## Pendientes (no tocar sin protocolo)
1. Verificar comportamiento del deck con Lenis activo (sticky + smooth scroll): smoke test pendiente post-migración.
2. Documentar aquí el orden real de proyectos (5 slots) cuando se censen los datos del dictionary.
