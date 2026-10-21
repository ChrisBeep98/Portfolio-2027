# sections/design-system — Estado del Design System

> Censo inicial: 2026-10-20 (migración desde Epicare).
> **SSOT:** [`Design-System.md`](./Design-System.md) (documental) ↔ `src/styles/globals.css` + `src/lib/motion.ts` (código). Si difieren, manda el código y se corrige el doc en la misma sesión.

## Qué hay (estado post-migración)
- **Tipografía:** 27 tokens `@utility` (anatomía Epicare importada a Manrope/JetBrains Mono) — display-3xl→h7, subtitle, body-2xl→xs, caption, overline, ui-label, data, meta. Pesos display 700 móvil/600 desktop; body 300 (sm/xs 400).
- **Color:** Binary Soul bimodal (`#F2F2F0`/`#050505` + tintas invertidas), primary `#a855f7`, glitch strokes cyan/pink/black, `theme-invert` hard-force.
- **Spacing:** Elastic System en `em` (`--px-frame`, `--section-gap`, `--block-gap`, `--content-gap`) + mandato móvil 14px. NO se importó el sistema clamp de Epicare (px-gutter/py-section/gap-fluid) — el portfolio ya tenía el suyo.
- **Motion:** `src/lib/motion.ts` (SSOT) + Lenis global (`window.__lenis`).
- **Glass:** `.glass-engine` (blur 12px saturate 180%) + `.noise-bg`.

## Decisiones de migración registradas
1. Anatomía tipográfica de Epicare adoptada ÍNTEGRA (escalas, clamps, trackings, interlineados, regla anti-override, `text-wrap: pretty`, lección `@utility` #120) — familias NO (Manrope/JetBrains en vez de Inter Display/Tight).
2. Body 300 conservado desde Epicare; sm/xs en 400 (Manrope pierde contraste bajo 14px en 300).
3. Tokens Epicare sin equivalente portado: Liquid Glass completo (glass-liquid-*), shadow-elevation 1-5, radius-button, grid-layout 12/8/6 — el portfolio tiene `.glass-engine` simple y sombras ad-hoc. **Candidatos a portar si se necesitan** (están en `../../_archive/legacy-epicare/design-system/Design-System.md`).
4. Figma tokens JSON (Dark/Light.tokens.json) archivados — eran export de Epicare. Regenerar cuando exista Figma del portfolio.

## Pendientes / sin formalizar
- [ ] Confirmación de dirección: ¿púrpura `#a855f7` es el acento de marca definitivo?
- [ ] Sistema de botones/CTA formalizado (CTA-SYSTEM.md pendiente de adaptar; hoy: patrones ad-hoc por componente).
- [ ] Sombras: sin sistema tokenizado (solo `--card-shadow` de theme-invert).
- [ ] Tokens de espaciado como `@utility` (hoy son variables + 2 utilities planas `.px-frame`/`.section-gap` — si se necesitan con prefijos `md:`, migrar a `@utility`).
- [ ] Página `/design-system` interactiva (existía en Epicare; aquí no existe — decidir si se construye).
- [ ] Self-host del noise SVG.

## Quemados
- CSS plano en `@layer utilities` para tokens nuevos (no genera variantes — lección Epicare #120).
- Ejemplos de clases arbitrarias en `.md` dentro del scanner de Tailwind (rompió el build el 2026-10-20 → `@source not`).
