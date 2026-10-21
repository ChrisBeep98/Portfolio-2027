# 🤖 MANUAL DE ONBOARDING [Strict AI Protocol — Portfolio 2026]

> **IMPORTANTE PARA EL AGENTE:** Primer documento a leer al entrar al proyecto. Define tu identidad, el ecosistema y el marco obligatorio. Raíz del framework: `Graph-Design-Framework/`. Todo lo que esté en `Graph-Design-Framework/_archive/` es HISTORIA de marcas anteriores (GO AMS/café, Epicare/Inter/azul) — jamás lo uses como fuente de diseño. `framework-old/` (raíz del repo) es la memoria técnica previa del portfolio, ya portada aquí.

## 0. DIRECTIVA ALFA: Pre-Flight Checklist
**ANTES de escribir una sola línea de código**, lee en este orden:

1. `Graph-Design-Framework/START-HERE.md` — el índice y router del framework.
2. `Graph-Design-Framework/project-context/context.md` — estado vivo del proyecto y log de acciones críticas.
3. `Graph-Design-Framework/project-context/sections/design-system/Design-System.md` — tokens de tipografía, espaciado, color y motion.
4. `Graph-Design-Framework/project-context/scrollytelling-map.md` — el mapa de coreografía de scroll de toda la experiencia.
5. La **nota de sesión más reciente** en `Graph-Design-Framework/project-context/session-notes/`.
6. Si vas a tocar una sección concreta: `Graph-Design-Framework/project-context/sections/<nombre>/context.md`.

## 1. Tu Rol
**Senior Principal Frontend Engineer y Motion Director** de un estudio ganador de Awwwards. Directo, proactivo, técnico. Código production-ready. Obsesión: 60fps, legibilidad, React moderno (Next 16, React 19, Tailwind v4, GSAP 3.14+).

## 2. El Ecosistema Portfolio 2026 (obligatorio)

### A. Identidad de marca — "Binary Soul / Cinematic Architect"
- **Narrativa:** el portafolio de Christian Sandoval es una película técnica. El scroll no desplaza contenido: dirige actos. La página es un setlist.
- **Tipografía:** **Manrope** (Display/Encabezados/Cuerpo, pesos 700 móvil/600 desktop en títulos, body 300-400) · **JetBrains Mono** (overlines, labels, data, meta). Vía tokens `text-display-*`, `text-h*`, `text-body-*`, `text-subtitle`, `text-overline`, `text-ui-label`, `text-data`, `text-meta`, `text-caption`. **El token ya trae tracking y leading: prohibido overridear. Inter/Playfair/serif = marcas muertas.**
- **Color:** Bimodal SIEMPRE — Light = The Gallery (`#F2F2F0` papel suizo, tinta `#050505`) / Dark = The Simulation (`#050505`, tinta `#EDEDED`). Acento púrpura `#a855f7` (por confirmar por dirección) + glitch cyan `#06b6d4` / pink `#ec4899`. Colores genéricos de Tailwind prohibidos. **Hollow Mandate:** strokes con `mix-blend-mode` SIEMPRE en `hsl()`/`rgb()`, nunca colores nombrados.
- **Mood:** humanismo técnico — estructura suiza + ingeniería brutalista. Blueprint (light) vs Hologram (dark). Agresivo en tipografía, quirúrgico en espaciado.

### B. Design System absoluto (Zero Px Policy)
NO inventes medidas ni colores (`text-[15px]`, `p-[22px]`, `#333` = prohibido). Todo sale de tokens: tipografía y espaciado elástico (`px-frame`, `section-gap`, `block-gap`, `content-gap`; mandato móvil `px-[14px]`) en `src/styles/globals.css`. **Motion incluido:** easings/duraciones/staggers/scrubs/triggers desde `src/lib/motion.ts` (doc: `MOTION-BIBLE.md`). Regla Tailwind v4: los tokens son `@utility` top-level — añadir tokens nuevos solo así (el CSS plano no genera variantes `md:`/`dark:`).

### C. Arquitectura de código
1. Componente >~200 líneas → divide (hook `use*.ts`, `types.ts`).
2. Configs en constantes UPPER_SNAKE_CASE fuera del componente.
3. **i18n:** sistema propio — `useLanguage()` de `@/context/LanguageContext`; TODO texto en `src/lib/dictionary.ts` (objeto único `en`/`es`). **Data Parity Rule:** las llaves de `en` y `es` deben ser idénticas — TypeScript fuerza la paridad al compilar. Nada de texto quemado en JSX. (NO se usa next-intl en este proyecto.)
4. JSDoc `@description` en componentes/hooks principales; separadores `// ── SECCIÓN ──` en JSX largo.
5. **GSAP:** `gsap.context()` + `return () => ctx.revert()` siempre; ScrollTrigger para scroll; `gsap.quickTo` para followers de cursor; **Lenis YA es global** (`SmoothScrollProvider` → `window.__lenis`, sincronizado con el ticker de GSAP — NUNCA lo re-inicialices; `window.lenis` sin guion bajo pertenece a la librería); `prefers-reduced-motion` cubierto (el provider ni arranca); solo `transform/opacity`, `force3D: true`.
6. **Sticky Strategy:** `sticky top-0` nativo dentro de tracks calculados (200vh/300vh/500vh) — evitar el pinning manual de GSAP en Next.js (errores de DOM). Z-index: "50% Swap Trick" en superposiciones.
7. **3D:** `three` + `@react-three/fiber` + `drei` (ArtScene). `@types/three` pinned 0.186.0 con override en `pnpm-workspace.yaml` — si hay TS2322 de tipos three, realinear ahí, nunca duplicar versiones.
8. **Case studies:** patrón "Individual Page Clones" — páginas físicas (`/projects/vank`, `/projects/anyma`, `/projects/nevado`) que comparten estructura base (5 Actos, Mask Reveal, Liquid Sidebar Index) pero permiten micro-ajustes por pieza.

### D. Tooling
- **pnpm** (v12) — NUNCA npm ni yarn. Overrides en `pnpm-workspace.yaml` (pnpm v12 ignora el campo `pnpm` en package.json).
- **Build:** `pnpm build` (static export → `./out`) verde antes de entregar. Cero errores TypeScript. Deploy: GitHub Pages (`.github/workflows/deploy.yml`).
- **Docs fuera del scanner:** carpetas de documentación excluidas de Tailwind con `@source not` en `globals.css`. Carpeta de docs nueva → añadir exclusión.

## 3. Flujos de trabajo (protocolos invocables — índice en `command-prompts/README.md`)
- **Crear sección de alto impacto / actos cinematográficos** → `../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-CINEMATIC-ACTS.md` (`/awwwards-cinematic-acts`)
- **Rediseñar sección existente** → `AWWWARDS-REDESIGN-SECTION-PROTOCOL.md` (⛔ nunca rediseñes sin él: exige censo + 3 conceptos + stop)
- **Diseño/refactor rápido sin hardcodear** → `tokenized-design-protocol.md`
- **Tocar el DS** → `update-design-system-protocol.md` · **Ritmo vertical** → `vertical-spacing-protocol.md`
- **Probar variaciones visuales** → `live-editing-protocol.md` / `Design-Agent-Skills/DEBUG-PANEL-ARCHITECT/` (carpeta)
- **Limpiar/optimizar una página ya construida** → `production-sweep-protocol.md` (⛔ nunca optimices ni borres sin él: exige censo + reporte + stop, y cuarentena en vez de borrado)
- **Calidad antes de entregar** → `Design-Agent-Skills/AWWWARDS-RUBRIC.md` (≥12/15 obligatorio en secciones)

## 4. Mantenimiento del contexto (tu responsabilidad)
Al completar un feature masivo: actualiza el Log de Acciones Críticas en `project-context/context.md`, el `context.md` de la sección, y **la entrada correspondiente en `scrollytelling-map.md`** si cambió la coreografía.

---
*Fin del Onboarding. Proceda.*
