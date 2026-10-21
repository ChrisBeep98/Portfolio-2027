# 🧭 START-HERE — Graph Design Framework (Christian Sandoval Portfolio 2026)

**Único punto de entrada.** Cualquier IA/chat nuevo empieza aquí. Raíz de todo: `Graph-Design-Framework/`.

> ⚠️ `_archive/` = marcas muertas (`legacy-goams/`: GO AMS/café/Playfair · `legacy-epicare/`: Epicare/Inter/azul-naranja). JAMÁS usar como fuente de diseño; solo como historial técnico. `references/` = investigación de sitios ajenos, es inspiración, no protocolo.
> 📜 `framework-old/` (en la raíz del repo, fuera del framework) = memoria técnica previa del portfolio (Glass Engine v2.2 + briefs Binary Soul). Ya fue portada a este framework; queda como referencia histórica read-only.

## Identidad en 3 líneas
**Christian Sandoval Portfolio 2026** — portafolio narrativo "Cinematic Architect": el scroll dirige una película técnica. **Binary Soul:** Light = The Gallery (papel suizo `#F2F2F0`) / Dark = The Simulation (`#050505`). Manrope + JetBrains Mono · acento púrpura `#a855f7` + glitch cyan/pink. Motion de estudio: GSAP + ScrollTrigger + Lenis global (`window.__lenis`) + R3F. Zero Px Policy: todo (incluido motion) sale de tokens (`globals.css` + `src/lib/motion.ts`).

## 👑 Modo por defecto — Portfolio Design Director

**Cualquier sesión de diseño, móvil, sweep o deploy empieza cargando** [`master-framework-command/PORTFOLIO-DESIGN-DIRECTOR.md`](master-framework-command/PORTFOLIO-DESIGN-DIRECTOR.md) — la skill de máxima jerarquía: el modo de trabajo, el bucle entender→censo→construir→verificar→reportar→esperar, y el router a todas las skills. Comando: `/portfolio-director`. Junto con [`TASTE-LEDGER.md`](WorkFlow-Docs/Design-Agent-Skills/TASTE-LEDGER.md) (el gusto del usuario).

## Router — ¿qué vienes a hacer?

| Intención | Carga esto |
|:--|:--|
| **Adaptar/rediseñar una sección en móvil** | `WorkFlow-Docs/Design-Agent-Skills/MOBILE-PATTERN-DESIGN-DIRECTOR.md` ← método + retícula de 4 cols + patrones aprobados (primero) · `MOBILE-PATTERN-LIBRARY.md` ← catálogo histórico + quemados |
| **Mocks de producto / dashboards para case studies** | `WorkFlow-Docs/Design-Agent-Skills/DATA-MOCK-UI.md` |
| **CTAs y labels de botón** | `WorkFlow-Docs/Design-Agent-Skills/CTA-SYSTEM.md` |
| **Verificar visualmente (capturas headless)** | `WorkFlow-Docs/Design-Agent-Skills/VISUAL-QA-HARNESS.md` + `tools/visual-qa/` |
| **Entrar al proyecto por primera vez** | `command-prompts/ONBOARDING-AI-protocol.md` |
| **Planificar/modificar el arco de tensión de la página** | `command-prompts/narrative-arc-protocol.md` ← nivel película: picos, valles, presupuesto de pins |
| **Escribir/revisar copy (headlines, CTAs, microcopy)** | `command-prompts/copy-storytelling-protocol.md` + `src/lib/dictionary.ts` (copy canónico EN/ES) |
| **Crear una sección nueva de alto impacto / actos cinematográficos** | `WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-CINEMATIC-ACTS.md` (`/awwwards-cinematic-acts`) + `command-prompts/AWWWARDS-RESEARCH-PROTOCOL.md` (`/awwwards-research`) |
| **Rediseñar una sección que ya no gusta** | `command-prompts/AWWWARDS-REDESIGN-SECTION-PROTOCOL.md` ← exige censo + 3 conceptos + STOP |
| **Refactor/diseño rápido sin hardcodear** | `command-prompts/tokenized-design-protocol.md` |
| **Entender el scroll de la página** | `project-context/scrollytelling-map.md` |
| **Tocar tokens del DS** | `command-prompts/update-design-system-protocol.md` |
| **Espaciado vertical entre secciones** | `command-prompts/vertical-spacing-protocol.md` |
| **Probar variaciones visuales en vivo / "ponme un debug panel"** | `command-prompts/DEBUG-PANEL-PROTOCOL.md` (`/debug-panel`) ← piezas en `WorkFlow-Docs/Design-Agent-Skills/DEBUG-PANEL-ARCHITECT/` |
| **Auditar calidad de una sección** | `WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-RUBRIC.md` |
| **Limpiar/optimizar una página ya construida** | `command-prompts/production-sweep-protocol.md` ← barrido sección a sección: assets, código muerto, hardcodeo, i18n, SEO. Exige censo + STOP |
| **Auditar el framework mismo** | `command-prompts/validation-rules.md` |
| **Cerrar sesión / actualizar contexto** | `command-prompts/session-close-prompt.md` · `update-context-prompt.md` |

## Los 4 pilares del conocimiento

1. **Contexto** → `project-context/` (estado vivo: `context.md`, mapa de scroll, secciones, notas de sesión)
2. **Vocabulario** → `project-context/sections/design-system/Design-System.md` + `src/lib/motion.ts` (tokens visuales + motion)
3. **Física y recetas** → `WorkFlow-Docs/Design-Agent-Skills/` (MOTION-BIBLE → SCROLL-EFFECTS → ARCHETYPES → RUBRIC → Tokenizer → Hardware-Symphony)
4. **Procesos** → `command-prompts/` (los protocolos invocables del router)

## Las 5 leyes (violarlas = trabajo rechazado)

1. **Nada aparece con fade-in plano.** Mask Reveal, Text-Birth, Lateral Slam o Layered Unveiling (MOTION-BIBLE).
2. **Cero valores inventados.** Medidas del DS; motion de `src/lib/motion.ts`. Desviaciones = declaradas (Reporte de Margen Creativo).
3. **La página es un setlist:** consulta `scrollytelling-map.md`; ninguna sección repite la técnica-firma de su vecina.
4. **Rediseñar = cambiar el paradigma de layout**, nunca re-stylear las mismas cajas.
5. **Nada se entrega sin examen:** RUBRIC ≥ 12/15, `pnpm build` verde, Light+Dark, reduced-motion.
