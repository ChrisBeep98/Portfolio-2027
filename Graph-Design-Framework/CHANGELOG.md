# Changelog — Graph Design Framework (Portfolio 2026)

All notable changes to this framework are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

> **Nota histórica:** las entradas ≤ 3.2.0 corresponden al framework sirviendo a los proyectos anteriores (GO AMS, Epicare). Los nombres/marcas que aparecen en ellas son historia y no aplican al proyecto actual.

## [4.0.0] — 2026-10-20 · "Migración Portfolio 2026"

Cambio MAYOR: el framework fue adaptado desde Epicare a **Christian Sandoval Portfolio 2026** (migración ejecutada según `master-framework-command/framework-migration-prompt.md`, con `framework-old/` —en la raíz del repo— como fuente histórica: ex `docs/` + `@@Agent-Features/`).

### Added
- **Código vivo (repo):** Lenis 1.3.27 global — `src/components/providers/SmoothScrollProvider.tsx` (sync `gsap.ticker` + `ScrollTrigger.update`, apagado con reduced-motion) expuesto en **`window.__lenis`** (⚠️ Lenis 1.3 reserva `window.lenis` para su auto-setup — el patrón viejo `window.lenis = instancia` produce TS2717) · **`src/lib/motion.ts`** (EASE/DUR/STAGGER/REVEAL/SCRUB/TRIGGER/TOGGLE/CURSOR/DECK/SWAP/PLANET/PARALLAX censados del código shipped + `framework-old/docs/ANIMATION-ENGINE.md`) · **27 tokens tipográficos `@utility`** en `src/styles/globals.css` (anatomía Epicare × Manrope/JetBrains Mono: display-3xl→h7, subtitle, body-2xl→xs, caption, overline, ui-label, data, meta; pesos display 700 móvil/600 desktop) · exclusiones **`@source not`** para carpetas de documentación (el scanner de Tailwind v4 interpretaba ejemplos de clases en `.md` y rompía el build).
- **`project-context/` nuevo:** `context.md` (estado vivo + log Fase 1 + deuda conocida), `scrollytelling-map.md` (setlist real: Header→Hero 2 actos→About manifiesto→Marquee→Projects split-scroll 500vh→Process acordeón→Footer cortina + rutas /about y case studies), `sections/{home,projects-showcase,process,about,vank,anyma,nevado,design-system}/context.md`, `session-notes/2026-10-20_framework-migration-portfolio2026.md`.
- **`master-framework-command/PORTFOLIO-DESIGN-DIRECTOR.md`** (renombrado + reescrito desde EPICARE-DESIGN-DIRECTOR: stack real, git/GitHub Pages, 12 reglas duras) · **`TASTE-LEDGER.md`** (renombrado: el gusto y acuerdos del usuario se conservan íntegros — mismo director creativo; aprobaciones de marca Epicare traducidas).

### Changed
- **MOTION-BIBLE.md:** física = "Cinematic Architect / Binary Soul" (colisión controlada, agresividad tipográfica); §0 sincronizado con `src/lib/motion.ts`; **§8 nuevo — Firmas del Portfolio** (Mask Reveal, Kinetic/Lateral Slam, Magnetic Cursor Engine v1.0, 50% Swap Trick, Card Deck móvil, Planetary Transition, Liquid ScrollTo, Narrative Flow por elemento).
- **Reescritos:** `project-context/sections/design-system/Design-System.md` (paleta Binary Soul, elastic spacing, glass-engine, theme-invert, trampas de build), `START-HERE.md`, `command-prompts/ONBOARDING-AI-protocol.md`, `Tokenizer.md` (blacklist + 5 dimensiones sobre tokens reales), `Motion-Tokenizer.md` (blacklist + arquetipos con tokens nuevos), `CTA-SYSTEM.md` (patrones shipped del portfolio; componentes Epicare marcados como no existentes), `validation-rules.md` (10 reglas: +STACK_CONSISTENCY, +BUILD_INTEGRITY), `vertical-spacing-protocol.md` (Elastic Vertical Rhythm + mapa real), `git-deploy-workflow.md` (GitHub Pages; git bloqueado por dubious ownership), `tokenized-design-protocol.md` (quick reference real), `build-clean-protocol.md` (Data Parity Rule, cuarentena, sin design-fingerprint), `command-prompts/README.md` y `Design-Agent-Skills/README.md`.
- **Ajustes de marca/tokens (batch + edits):** ~50 archivos — Epicare→Portfolio 2026, `design-system-app`→`src`, next-intl→dictionary.ts, `window.lenis`→`window.__lenis` en `tools/visual-qa/*.mjs` (+ URLs `/go-crm`→`/`), MOBILE-PATTERN-LIBRARY/DESIGN-DIRECTOR (snippets viejos conservados con tabla de equivalencias), HARDWARE-SYMPHONY, DATA-MOCK-UI (SURFACE/TYPE a tokens reales), AWWWARDS-RUBRIC (A4 paleta nueva), SAAS-BACKGROUND-PROTOCOL (hex de marca), DEBUG-PANEL 03/06/README, visual-prompt-engineer, COGNITIVE-TYPOGRAPHER, COMMERCE-CONVERSION-ARCHITECT (marcado como técnica de otro producto).

### Archived
- Contexto Epicare completo → `_archive/legacy-epicare/` (context.md con log de 123+ acciones, sections/, session-notes/, landing-strategy/, copies, GO-CRM, scrollytelling-map viejo, variables-entorno, calculator-logic, Figma tokens JSON + Typography.svg, git-deploy-workflow GO AMS) + README explicativo. Marcas muertas del framework: GO AMS/café/Playfair (`legacy-goams/`), Epicare/Inter/azul-naranja (`legacy-epicare/`).

### Deprecated / Pendientes
- Script `design-fingerprint` NO portado (no existe `scripts/` en el repo) — anti-regresión visual vía VISUAL-QA-HARNESS.
- Envoltorios de comandos nativos del entorno (Qwen Code) pendientes de crear.
- Página `/design-system` interactiva: no existe en este proyecto (decisión pendiente).
- Confirmación de dirección: acento púrpura `#a855f7`.

## [3.2.0] — 2026-10-08 · "Mobile Director"

Destilación del rediseño móvil de `/team` (5 secciones, aprobadas una a una: "hermoso", "quedó increíble").

### Added
- **`WorkFlow-Docs/Design-Agent-Skills/MOBILE-PATTERN-DESIGN-DIRECTOR.md`** — método de rediseño móvil sección por sección, retícula local de 4 columnas, 6 patrones aprobados con receta y archivo de referencia, quemados con cita, trampas técnicas y verificación medida.

- **`WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-CINEMATIC-ACTS.md`** (`/awwwards-cinematic-acts`) — crear secciones/páginas como actos cinematográficos: concepto, actos, el scroll como cámara, 6 recetas de acto con código, quemados, móvil y rúbrica.
- **`command-prompts/AWWWARDS-REDESIGN-SECTION-PROTOCOL.md`** (`/awwwards-redesign-section`) — evolución del redesign-section: gusto como filtro, referencias con `/awwwards-research`, conceptos en vocabulario de actos o variantes con panel de debug, móvil, `/awwwards-rubric`, verificación medida y respeto del alcance.
- **`command-prompts/DEBUG-PANEL-PROTOCOL.md`** (`/debug-panel`) — panel de debug a medida: caza de ángulos (incluidos los no pedidos), modelo de config por tokens, cableado en vivo sin reconstruir, diseño fijo del cajón, copia con fallback (IP de red), persistencia, A/B, fijado y purga. Destilado de los paneles reales de /team.
- Comandos `/` de Claude Code para todos los protocolos y para `awwwards-rubric` (`.claude/skills/<nombre>/SKILL.md`).

### Archived
- `redesign-section-protocol` y `/redesign-section` → `_archive/distilled-2026-10/` (evolucionado en AWWWARDS-REDESIGN-SECTION).
- `CINEMATIC-ARCHITECT_V1`, `maximum-creativity-protocol`, `creative-motion-protocol` y sus comandos → `_archive/distilled-2026-10/` (destilados en AWWWARDS-CINEMATIC-ACTS; referencias activas redirigidas).

### Changed
- Catálogo: los índices de skills y protocolos listan ya TODOS los archivos activos (añadidos AWWWARDS-RESEARCH y 4 protocolos puntuales; 3 skills marcadas como pendientes de destilar / de otro proyecto).
- Router de `EPICARE-DESIGN-DIRECTOR`, `START-HERE`, índice de skills y `/epicare-director`: el trabajo móvil carga primero la nueva skill; `MOBILE-PATTERN-LIBRARY` queda como catálogo histórico con referencia cruzada.

## [3.1.0] — 2026-09-22 · "El Director"

Destilación del sweep de producción de `/go-crm` (8 secciones rediseñadas/limpiadas, aprobadas una a una por el usuario) en skills reutilizables, más una skill maestra que reproduce el modo de trabajo en cualquier chat nuevo.

### Added
- **`master-framework-command/EPICARE-DESIGN-DIRECTOR.md`** — skill de máxima jerarquía: identidad del modo, arranque, router de tareas→skills, bucle de trabajo, estándar visual, reglas duras, flujo git/producción. Entradas: `.claude/skills/epicare-director/SKILL.md` (`/epicare-director`) y `.agents/skills/epicare-director/SKILL.md`.
- **`EPICARE-TASTE-LEDGER.md`** — gusto del usuario, rechazos con cita, acuerdos de trabajo, vocabulario.
- **`MOBILE-PATTERN-LIBRARY.md`** — paradigmas móviles aprobados con receta + quemados.
- **`DATA-MOCK-UI.md`** — dashboards de producción (datos fijos, `TYPE`, superficies, timer CSS).
- **`CTA-SYSTEM.md`** — componentes, reglas de label, colocación.
- **`VISUAL-QA-HARNESS.md`** + **`tools/visual-qa/`** — scripts CDP de captura (elshots, pinshots, slidershots, hovershot, evalpage, shot).

### Changed
- `HARDWARE-SYMPHONY.md` §6 — lecciones de campo (sombras recortadas por overflow-x, hairlines comidas por transforms, timers CSS, aspectRatio en vídeo lazy, Invalid scope).
- `production-sweep-protocol.md` §10 — checklist por sección del ciclo aprobado.
- `START-HERE.md` y `Design-Agent-Skills/README.md` — director como modo por defecto; router a las nuevas skills.

## [3.0.0] — 2026-07-22 · "La Gran Purga"

Reestructuración completa tras auditoría: la ruta de entrada calibraba a la IA con la marca muerta (GO AMS/café/Playfair) vía rutas rotas (`context-Docs/`), la sustancia ejecutable estaba enterrada bajo 4 docs de filosofía redundantes, y no existían tokens de motion ni criterios de calidad verificables.

### Added
- **`START-HERE.md`** — único punto de entrada con router por intención y las 5 leyes.
- **`MOTION-BIBLE.md`** — fusión de AWWWARDS-MOTION + CREATIVE-MOTION + CINEMATIC-ARCHITECT: cada pilar con receta GSAP ejecutable y valores de la firma real.
- **`src/lib/motion.ts`** (design-system-app) — tokens de motion (EASE/DUR/STAGGER/REVEAL/SCRUB/TRIGGER/PARALLAX) extraídos del censo de la landing.
- **`SECTION-ARCHETYPES.md`** — coreografía mínima obligatoria + paradigmas de layout por tipo de sección.
- **`AWWWARDS-RUBRIC.md`** — examen binario 15 puntos, umbral 12/15 para entregar.
- **`redesign-section-protocol.md`** — comando de rediseño: censo → autopsia → 3 conceptos de paradigmas distintos → STOP → implementar → rubric. Reglas anti-loop.
- **`project-context/scrollytelling-map.md`** — mapa canónico de la coreografía de scroll de toda la página (censo 2026-07-22), con firma, deudas y territorio virgen.

### Changed
- **`creative-motion-protocol.md`** — reescrito sin tabla de overrides (fuentes ya limpias); carga scrollytelling-map primero; exige Motion Score y RUBRIC.
- **`ONBOARDING-AI-protocol.md`** — identidad Epicare (Inter/bimodal/fintech), rutas reales, router de protocolos.
- **`validation-rules.md`** — ahora valida la marca correcta (flaggea Playfair/café/violeta) + reglas MOTION_TOKEN_SYNC y BIMODAL_RULE.
- **Rutas unificadas** a raíz `Graph-Design-Framework/` en todos los prompts activos (update-context, session-close, hardware-audit, backup-brain, framework-migration).
- Ambos README (command-prompts y Design-Agent-Skills) actualizados; skills marcadas como receta/dirección/guardián/examen.

### Removed (→ `_archive/legacy-goams/`)
- `master-design-prompt.md`, `refactor-design-prompt.md`, `onboarding-context.md` (calibraban a la marca muerta con rutas rotas).
- `CREATIVE-DIRECTION.md`, `CREATIVE-MOTION.md`, `AWWWARDS-MOTION.md`, `CINEMATIC-ARCHITECT.md` (fusionadas en MOTION-BIBLE).
- Scrapings (Alche, iru) movidos a `references/` como inspiración, no protocolo.

## [2.3.0] — 2026-03-19

### Added
- **Section-based context architecture:** 12 folders in `project-context/sections/` with individual `context.md` files per section.
- **`AGENTS.md`** at repo root — open standard for AI agent interoperability.
- **`CHANGELOG.md`** (this file) with retroactive history.
- **Debug Panel Architect v2.0:** Collapsible pill UI, 8 control types, `__dbg` prefix convention, 9-step purge checklist.
- **Agent Skills `README.md`** index with recommended reading order and categories.
- **YAML frontmatter** on all 9 agent skills.
- **Session Notes** infrastructure (`session-notes/` folder + close prompt).
- **Self-Validation Rules** for document consistency auditing.
- **TL;DR headers** on section context files.
- **`update-context-prompt.md` v2.0:** Section-specific update and onboarding prompts.

### Changed
- **`ONBOARDING-AI.md`:** i18n rule updated from blanket `useTranslations()` to 2-zone system (Admin vs Landing).
- **`Design-System.md`:** `px-frame` deprecated → `clamp()` native. Changelog section added.
- **`master-design-prompt.md`:** Font reference corrected (Walsheim → Inter).
- **`onboarding-context.md`:** Phase reference updated (Fase 2 → Fase 8).
- **`Creative-Skill.md`:** Font reference corrected (Inter/Geist → Playfair Display/Inter). Renamed to `CREATIVE-DIRECTION.md`.
- **`agent-skill-advanced-scroll-effects.md`:** Renamed to `SCROLL-EFFECTS-ARCHITECT.md`.
- **`context.md`:** Slimmed from 271 → 85 lines. Entries #1-38 archived.
- **`backup-brain-prompt.md`:** Updated with version history table.

### Fixed
- Folder typo: `Bussines-Logic` → `Business-Logic`.

---

## [2.2.0] — 2026-02-22

### Added
- 12-token typography system (Apple HIG + Major Third 1.25×).
- Inter font integration via Fontshare CDN.
- `Tokenizer.md` — 5-dimensional analysis framework.

### Changed
- Replaced GT Walsheim Pro with Inter in `--font-sans`.

---

## [2.1.0] — 2026-02-21

### Added
- Agent Skills library (9 files).
- `ONBOARDING-AI.md` Pre-Flight Checklist protocol.
- `Informe.md` business logic documentation.
- Command prompts collection (onboarding, update, refactor, deploy, backup, audit, master design).

---

## [2.0.0] — 2026-02-16

### Added
- Initial framework structure (`context-Docs/`).
- Design System v1: Vibrant Energy (Light Mode), 4-Pillar Gradient, button definitions.
- `context.md` with project vision, stack, and standards.

### Changed
- Full migration from generic README approach to structured agent-oriented documentation.
