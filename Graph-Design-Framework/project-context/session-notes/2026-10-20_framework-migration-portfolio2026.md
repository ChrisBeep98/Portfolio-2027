# 2026-10-20 — Migración de Framework: Epicare → Portfolio 2026 (v4.0.0)

## Resumen
- `Graph-Design-Framework/` (identidad Epicare, traído de otro proyecto) adaptado por completo a **Christian Sandoval Portfolio 2026** siguiendo `master-framework-command/framework-migration-prompt.md` (FASES 1-5), usando `framework-old/` como fuente histórica.
- Código: **Lenis 1.3.27** instalado + `SmoothScrollProvider` global (sync `gsap.ticker` + `ScrollTrigger.update`, reduced-motion lo apaga) · **`src/lib/motion.ts`** creado (tokens censados del código shipped + `framework-old/docs/ANIMATION-ENGINE.md`) · **27 tokens tipográficos `@utility`** en `globals.css` (anatomía Epicare × Manrope/JetBrains Mono).
- Docs: Design-System.md, START-HERE.md, ONBOARDING-AI-protocol.md, PORTFOLIO-DESIGN-DIRECTOR.md, TASTE-LEDGER.md, MOTION-BIBLE.md, Tokenizer.md, Motion-Tokenizer.md, CTA-SYSTEM.md, validation-rules.md, vertical-spacing-protocol.md, git-deploy-workflow.md, tokenized-design-protocol.md, build-clean-protocol.md y READMEs reescritos/adaptados; batch replacement de marca en ~50 archivos; `project-context/` nuevo (context.md, scrollytelling-map.md, 8 sections).
- Epicare archivado en `_archive/legacy-epicare/` (contexto, session-notes, landing-strategy, secciones, Figma tokens JSON, git-deploy viejo).

## Decisiones Tomadas
1. **`window.__lenis`** para la instancia global: Lenis 1.3 declara `window.lenis` como objeto de auto-setup (conflicto TS2717) — el patrón Epicare (`window.lenis = instancia`) ya no es viable.
2. **Familias tipográficas NO se cambian** (decisión del usuario): Manrope + JetBrains Mono; de Epicare se importa la anatomía completa (escala, clamps, trackings, interlineados, pesos 700 móvil/600 desktop, `text-wrap: pretty`, regla anti-override).
3. Body 300 (sm/xs 400): Manrope bajo 14px en 300 pierde contraste — misma regla que Epicare aplicó a Inter Tight.
4. **Spacing elástico conservado** (`--px-frame`/`--section-gap`/`--block-gap`/`--content-gap`): NO se importó el sistema clamp de Epicare (px-gutter/py-section/gap-fluid). Mandato móvil 14px vigente.
5. i18n propio (`dictionary.ts` + Data Parity Rule) se mantiene — NO next-intl.
6. Paleta censada del código: `#F2F2F0`/`#050505`, primary `#a855f7` (**pendiente confirmación de dirección**), glitch `#06b6d4`/`#ec4899`.
7. Skills preservadas: recetas/técnicas intactas; solo cambian marca, tokens, rutas y narrativa (mandato usuario: "sin dañar las skills"). Snippets con vocabulario Epicare conservados con tabla de equivalencias (MOBILE-PATTERN-LIBRARY).
8. `@source not` para carpetas de docs en `globals.css`: el scanner de Tailwind v4 interpretaba ejemplos de clases en `.md` (`bg-[url('...')]`, `var(--x-*)`) y rompía el build.

## Pendientes
- [ ] **Confirmar acento de marca** (¿púrpura `#a855f7`?) con el usuario.
- [ ] Smoke test en dev: Lenis + sticky tracks (Projects 500vh) + ScrollTo de case studies + reduced-motion + deck móvil.
- [ ] `codebase-architecture-protocol.md` y `production-sweep-protocol.md`: adaptar rutas/deudas del proyecto anterior (en progreso al cierre de esta nota).
- [ ] DEBUG-PANEL-ARCHITECT/17-DESIGN-SYSTEM-INJECTOR: opciones de dropdown aún con tokens Epicare.
- [ ] Envoltorios de comandos nativos del entorno (pendiente en command-prompts/README.md).
- [ ] Portar `design-fingerprint` script si se quiere anti-regresión de HTML.
- [ ] Git bloqueado por *dubious ownership* — commit de la migración pendiente de aprobar `safe.directory`.
- [ ] COGNITIVE-TYPOGRAPHER: revisar referencias a Inter restantes en el body de la skill.

## Bugs Descubiertos
- **Tailwind v4 escanea los `.md` del repo**: ejemplos de clases arbitrarias en documentación generan CSS inválido y rompen `next build` (Module not found: `...`). Fix: `@source not` (ver Decisión 8). REGLA: carpeta de docs nueva → exclusión nueva.
- **Lenis 1.3 `window.lenis`**: la librería declara globalmente `Window.lenis` como opciones de auto-setup; asignar la instancia produce TS2717/TS2559/TS2322.
- `@utility` con `@media` anidado compila correctamente en Tailwind 4.3.3 (verificado build verde) — los pesos 700→600 responsivos funcionan sin necesidad de variante `md:` externa.

## Archivos Clave Modificados
- **Código:** `package.json`/`pnpm-lock.yaml` (lenis) · `src/app/layout.tsx` · `src/components/providers/SmoothScrollProvider.tsx` (nuevo) · `src/lib/motion.ts` (nuevo) · `src/styles/globals.css` (27 `@utility` + `@source not`; eliminado `.text-display-xl` plano sin usos).
- **Framework (raíz):** `START-HERE.md` · `CHANGELOG.md` · `command-prompts/*` · `WorkFlow-Docs/Design-Agent-Skills/*` · `project-context/*` (nuevo) · `master-framework-command/PORTFOLIO-DESIGN-DIRECTOR.md` (renombrado+reescrito) · `tools/visual-qa/*.mjs` (URLs + `window.__lenis`) · `_archive/legacy-epicare/` (nuevo archivo).
- **Repo:** `docs/` + `@@Agent-Features/` → `framework-old/` (movidos, read-only).
