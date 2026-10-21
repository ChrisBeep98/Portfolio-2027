---
name: Data Mock UI
description: Cómo construir dashboards y mocks de producto (calendario, pipeline, KPIs, donuts, charts) listos para producción — datos fijos, superficies bimodales, escala tipográfica por rol (TYPE), pares de estado del DS, carruseles con temporizador CSS y trampas de SVG. Referencia: dashboards del proyecto anterior — técnica portable a mocks de case studies.
---

# 📊 DATA MOCK UI — Dashboards de marketing que parecen producto real

Código de referencia: el original (`metrics-dashboard/`) es del proyecto anterior; aquí se aplica a mocks dentro de case studies. Tokens adaptados a Portfolio 2026.

## 1 · Datos: fijos y fuera del render

- **Prohibido `Math.random()` en render**: el servidor y el cliente pintan números distintos → hydration mismatch. Cifras de demo fijas en `data.ts`.
- Cálculos (arcos de donut) en **funciones puras** — `react-hooks/immutability` rechaza mutar un `let offset` dentro del `.map`:
```ts
export const donutArcs = (percents: number[], circumference: number) =>
  percents.map((p, i) => ({ dash: (p / 100) * circumference,
    offset: -percents.slice(0, i).reduce((s, q) => s + (q / 100) * circumference, 0) }));
```
- Nombres de persona/agente = datos de muestra, no se traducen. Etiquetas = i18n (`goCrm.metricsDash.*`), con paridad es/en.

## 2 · Superficies bimodales (surfaces.ts)

`BG-white` no cambia con el tema → siempre emparejarlo:
```ts
export const SURFACE = "bg-background"; // bimodal por semántica
export const SURFACE_MUTED = "bg-surface";
export const SHELL = `${SURFACE} relative z-10 w-full max-w-5xl mx-auto flex flex-col overflow-hidden rounded-2xl border border-foreground/10`;
```
- Sombras: el portfolio no tiene sistema de sombras tokenizado — `--card-shadow` (contextos theme-invert) o ninguna; desviaciones declaradas.
- Estados (tendencias, alertas): **par `surface-subtle` + `text-Medium`** del mismo color (`status-red/green/blue-*`). NO `text-strong` sobre `surface-subtle`: en dark son el mismo color.
- Paletas por widget: un token de estado en 4 intensidades con `color-mix(in srgb, var(--token) N%, transparent)` → bimodal sin hex.

## 3 · Escala tipográfica por ROL (TYPE)

El usuario pidió coherencia: *"mucho label con mayúsculas innecesarias, no hay coherencia entre los tamaños"*. Un tamaño por rol en todos los dashboards, sentence case, cifras tabulares:
```ts
export const TYPE = {
  title:    "text-display-xs text-foreground",
  subtitle: "text-body-sm text-[var(--color-text-secondary)]",
  heading:  "text-body-sm font-medium text-foreground",   // título de tarjeta interna
  label:    "text-body-sm text-[var(--color-text-muted)]",                 // nombre de métrica
  hero:     "text-display-sm tabular-nums text-foreground",// cifra principal
  value:    "text-h5 tabular-nums text-foreground",       // cifra secundaria
  num:      "text-body-sm font-medium tabular-nums text-foreground",
  caption:  "text-caption text-[var(--color-text-muted)]",               // ejes, notas
  badge:    "text-caption font-medium tabular-nums px-1.5 py-0.5 rounded", // + trendClass()
} as const;
```
- `uppercase` solo en abreviaturas reales (1W / YTD). Nada de `text-ui-label`/`text-meta` en mayúsculas para labels normales.
- Mínimo `text-caption` (12px): nada de `text-[10px]`; si no cabe, `truncate` o menos contenido.

## 4 · Carruseles automáticos sin setInterval

El temporizador ES la barra: keyframe CSS de `scaleX` que avisa con `onAnimationEnd`; pausado fuera de pantalla con `.is-offscreen` (IntersectionObserver en la sección). Con reduced-motion no hay keyframe → no rota.
```css
@keyframes md-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@media (prefers-reduced-motion: no-preference) {
  .md-root .md-timer { animation-name: md-timer; animation-timing-function: linear; animation-fill-mode: forwards; }
  .md-root.is-offscreen * { animation-play-state: paused; }
}
```
```tsx
<div key={active} onAnimationEnd={onDone} className="md-timer absolute inset-0 origin-left" style={{ animationDuration: `${ROTATE_MS}ms` }} />
```
Páginas: `transition-[opacity,translate]` (no `transition-all`, no `width`).

## 5 · Trampas de SVG y layout

- **Texto dentro de un SVG `preserveAspectRatio="none"` se deforma** con el ancho → etiquetas de ejes en HTML absoluto (`top: ${y/2}%`).
- Grids con CSS `row-start-1` explícito cuando una columna se oculta en móvil (si no, el auto-placement mete eventos en una 2ª fila y aplasta la columna).
- Spans con `truncate` dentro de un flex-col de alto fijo: añadir `shrink-0` (si no, encogen a 0 y "desaparece" el texto).
- `text-wrap: pretty` (shorthand) anula `truncate` → los tokens usan `text-wrap-style: pretty`.

## 6 · Versión móvil de un dashboard

Nunca el dashboard de desktop escalado. Se decide qué es esencial: cabecera interna `hidden lg:flex` (el título va fuera, ver MOBILE-PATTERN-LIBRARY §2), columnas secundarias `hidden lg:flex`, calendario de 5 → 3 días, leyendas fuera, grid 3×2 → 2×2 con los 4 datos clave.
