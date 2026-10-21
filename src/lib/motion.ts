/**
 * Motion Tokens — firma cinemática del Portfolio (Cinematic Architect).
 *
 * Fuente canónica: Graph-Design-Framework/WorkFlow-Docs/Design-Agent-Skills/MOTION-BIBLE.md
 * Valores censados del código real (Hero, Projects, Header, About, case studies
 * vank/anyma/nevado) + framework-old/docs/ANIMATION-ENGINE.md — 2026-10-20.
 *
 * Regla Zero-Inventory: importar de aquí, no copiar valores sueltos.
 */

export const EASE = {
  /** Reveal estándar de entrada. El default de la página. */
  out: "power3.out",
  /** Slams cinemáticos, Mask Reveal, text-birth. La firma agresiva. */
  dramatic: "power4.out",
  /** Liquid ScrollTo y swaps entre estados. */
  inOut: "power4.inOut",
  /** Layout shift del Acto 2 (sistema planetario). */
  transition: "power2.inOut",
  /** Micro-interacciones: hover, meta reveals, logo. */
  snap: "power2.out",
  /** Salidas aceleradas (elementos que abandonan escena). */
  accel: "power2.in",
  /** quickTo followers: cursor magnético, atracción de paneles. */
  quick: "power3",
  /** Loops orgánicos: pulsos, bombilla del footer, derivas (About, Footer). */
  breath: "sine.inOut",
  /** Hairlines y líneas decorativas (scaleX). */
  expo: "expo.inOut",
  /** Iconos acento con rebote controlado (About). */
  pop: "back.out(1.7)",
  /** Lineal — obligatorio en timelines con scrub (el scroll es el easing). */
  none: "none",
} as const;

export const DUR = {
  /** quickTo del dot del cursor (zero-lag). */
  dot: 0.1,
  /** Tap feedback en móvil (círculo "Ver más"). */
  tap: 0.2,
  /** quickTo magnético / hover de logo. */
  micro: 0.3,
  /** quickTo del ring del cursor. */
  cursor: 0.4,
  /** Meta reveals (chips técnicos, fechas). */
  fast: 0.8,
  /** Elementos narrativos (párrafos, items de lista). */
  base: 1.0,
  /** Títulos de acto, subtítulos, bloques grandes. */
  slow: 1.2,
  /** Mask Reveal de títulos hero + Liquid ScrollTo. */
  signature: 1.5,
} as const;

export const STAGGER = {
  /** Meta items, anillos orbitales, pills. */
  tight: 0.05,
  /** Títulos de acto, links de navegación, líneas de texto. */
  base: 0.1,
  /** Items de bloque (Process), cards en ola. */
  wave: 0.15,
} as const;

export const REVEAL = {
  /** Distancia y (px) de meta reveals. */
  meta: 20,
  /** Distancia y (px) de elementos narrativos. */
  narrative: 40,
  /** Distancia y (px) de bloques grandes (footer-reveal, cards). */
  block: 60,
  /** yPercent inicial del texto bajo Mask Reveal (apertura de ventana). */
  maskPercent: 100,
  /** xPercent de salida lateral en slams (Acto 2, Lateral Slam). */
  slamPercent: 150,
} as const;

export const SCRUB = {
  /** Pins y efectos pegados al dedo. */
  crisp: 1,
  /** Parallax estándar. */
  smooth: 2,
  /** Capas pesadas: split-scroll, marquees, fondos. */
  heavy: 3,
} as const;

export const PARALLAX = {
  /** Capa de fondo vs contenido (receta Layered Unveiling, MOTION-BIBLE §2). */
  bg: 0.7,
  /** Capa intermedia. */
  mid: 0.85,
} as const;

export const TRIGGER = {
  /** Descubrimiento orgánico por elemento (case studies). */
  narrative: "top 92%",
  /** Ola de cards/bloques (ligeramente antes que el estándar). */
  early: "top 90%",
  /** Entrada estándar de secciones. */
  standard: "top 80%",
  /** Entradas tardías / remates. */
  late: "top 75%",
} as const;

export const TOGGLE = {
  /** Flujo narrativo reversible al hacer scroll atrás. */
  narrative: "play none none reverse",
} as const;

export const CURSOR = {
  /** Multiplicador de atracción magnética (15% del recorrido). */
  attraction: 0.15,
  /** Radio de colisión (px) para proximity feedback. */
  collisionRadius: 60,
  /** Escala del círculo en colisión. */
  collisionScale: 1.15,
} as const;

export const DECK = {
  /** Escala de la tarjeta inferior en el deck móvil. */
  scaleDown: 0.95,
} as const;

export const SWAP = {
  /** Progreso exacto del "50% Swap Trick" (intercambio de zIndex). */
  zIndexProgress: 0.5,
} as const;

export const PLANET = {
  /** Escala del orbe en Acto 2 (móvil / desktop). */
  scaleMobile: 0.7,
  scaleDesktop: 1.15,
  /** Escala de anillos orbitales en móvil (performance). */
  ringScaleMobile: 0.6,
  /** Opacidad de anillos orbitales. */
  orbitOpacity: 0.6,
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
