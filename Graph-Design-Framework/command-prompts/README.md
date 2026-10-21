# 🗂️ Command Prompts — Índice

Protocolos **invocables** del framework Portfolio 2026. Son `.md` planos (la fuente canónica) y se invocan de dos formas:

- **En este repo aún NO hay envoltorios de comando instalados** (`.claude/skills/` o equivalentes existían en el proyecto anterior). Por ahora: pídele al agente el protocolo por su nombre o referéncialo con `@ruta`, y lo cargará completo. Crear los envoltorios de comandos es pendiente (ver abajo).
- **En cualquier otra IA:** referéncialos con `@ruta` o pega su bloque "PROMPT PARA EJECUTAR".

Ejemplos de invocación por nombre: *"ejecuta el protocolo awwwards-redesign-section sobre la sección Process"*, *"aplica production-sweep a /projects/vank"*, *"carga el modo portfolio-director"*.

| Comando (conceptual) | Protocolo |
|:--|:--|
| `/onboarding` · `/codebase-architecture` | ONBOARDING-AI · codebase-architecture |
| `/awwwards-cinematic-acts` · `/awwwards-research` · `/awwwards-rubric` | crear secciones nuevas (actos cinematográficos) · referencias reales · examen |
| `/awwwards-redesign-section` · `/narrative-arc` | rediseñar · arco de la página |
| `/mobile-design-director` · `/mobile-responsiveness` | móvil |
| `/debug-panel` | ⭐ panel de debug a medida para elegir usando (presets + ángulos nuevos) |
| `/tokenized-design` · `/update-design-system` · `/vertical-spacing` · `/live-editing` | design system y layout |
| `/copy-storytelling` | copy ES+EN (dictionary.ts) |
| `/production-sweep` · `/build-clean` · `/optimize-images` · `/optimize-video` · `/motion-audit` · `/hardware-audit` | producción y rendimiento |
| `/git-deploy` | commit, build y push con confirmación |
| `/dev-cache-fix` · `/react-globe` · `/arq-inventory` · `/saas-background` | casos puntuales |
| `/session-close` · `/update-context` · `/backup-brain` · `/framework-validation` | mantenimiento |
| `/portfolio-director` | el modo maestro (carga todo lo anterior según la tarea) |

Entrada global del framework: [`../START-HERE.md`](../START-HERE.md).

## 🎨 Diseño & Motion (crear / rediseñar UI)

| Protocolo | Cuándo usarlo |
|:--|:--|
| [`AWWWARDS-RESEARCH-PROTOCOL.md`](./AWWWARDS-RESEARCH-PROTOCOL.md) (`/awwwards-research`) | ⭐ **INVESTIGAR mecánicas reales en la web** para un elemento (menú, hero, galería…): búsqueda por física y no por "cool", estudios de referencia, filtro anti-slop y 3 opciones vivas con panel de debug. |
| [`narrative-arc-protocol.md`](./narrative-arc-protocol.md) | **PLANIFICAR/MODIFICAR el arco de tensión de la página completa**: valles/picos, presupuesto de pins, añadir/quitar/reordenar secciones. Opera a nivel película; los demás protocolos obedecen su arco. |
| [`copy-storytelling-protocol.md`](./copy-storytelling-protocol.md) | **ESCRIBIR/REVISAR copy** con la voz del portfolio: headlines de tensión, tú neutro (jamás voseo), ES+EN con Data Parity Rule en `src/lib/dictionary.ts`. |
| [`AWWWARDS-CINEMATIC-ACTS.md`](../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-CINEMATIC-ACTS.md) (`/awwwards-cinematic-acts`) | **CREAR secciones o páginas como actos cinematográficos**: concepto, actos, el scroll como cámara, recetas, móvil y rúbrica. Sustituye a `creative-motion` y `maximum-creativity` (archivados en `_archive/distilled-2026-10/`). |
| [`AWWWARDS-REDESIGN-SECTION-PROTOCOL.md`](./AWWWARDS-REDESIGN-SECTION-PROTOCOL.md) (`/awwwards-redesign-section`) | ⭐ **REDISEÑAR una sección existente a nivel Awwwards.** Gusto y quemados → autopsia con capturas → referencias con `/awwwards-research` → 3 conceptos en vocabulario de actos (o variantes con panel de debug) → STOP → implementar → móvil → `/awwwards-rubric`. Reglas anti-loop y respeto del alcance. |
| [`tokenized-design-protocol.md`](./tokenized-design-protocol.md) | **Token-Live Mode.** Diseño/refactor rápido sin hardcodear; margen creativo declarado. |
| [`mobile-responsiveness-protocol.md`](./mobile-responsiveness-protocol.md) | **Zero-Friction Mobile.** Protocolo maestro y heurísticas para layouts, spacing, UX táctil y resolución de bugs híbridos en móviles (JS/GSAP vs Scroll Snap). |
| [`motion-audit-protocol.md`](./motion-audit-protocol.md) | **Motion Tokenizer & Auditoría.** Auditar, corregir y tokenizar animaciones con la firma del portfolio (`src/lib/motion.ts`), Hardware Symphony y Line-by-Line Clip. |
| [`update-design-system-protocol.md`](./update-design-system-protocol.md) | Añadir/modificar tokens del DS (`globals.css` como `@utility` + Design-System.md). |
| [`vertical-spacing-protocol.md`](./vertical-spacing-protocol.md) | Auditar/estandarizar el ritmo vertical entre secciones (single-owner, elastic system). |
| [`DEBUG-PANEL-PROTOCOL.md`](./DEBUG-PANEL-PROTOCOL.md) (`/debug-panel`) | ⭐ **PANEL DE DEBUG A MEDIDA**: analiza la sección, caza ángulos que no pediste, panel bonito con presets de paradigma + controles finos por token, copia que siempre funciona, fijado y purga. |
| [`live-editing-protocol.md`](./live-editing-protocol.md) | Edición visual en vivo con controles de grilla genéricos (para paneles completos, `/debug-panel`). |

## 🚀 Proceso & Mantenimiento

| Prompt | Para qué |
|:--|:--|
| [`ONBOARDING-AI-protocol.md`](./ONBOARDING-AI-protocol.md) | **Primer documento a leer** al entrar al proyecto. |
| [`codebase-architecture-protocol.md`](./codebase-architecture-protocol.md) | **OBLIGATORIO antes de tocar código en `src/`.** Mapa de dónde va cada cosa, restricciones del static export, la trampa `@utility` vs `@layer utilities`, disciplina de GSAP/cleanup y Lenis, checklist de "limpio y pulido". |
| [`build-clean-protocol.md`](./build-clean-protocol.md) | **Build & Clean (Hardening & Purga).** Higiene *rápida* de fin de sesión sobre lo que acabas de tocar: tipos, i18n (paridad EN/ES de `dictionary.ts`), huérfanos, pureza React 19 y build estático limpio. |
| [`production-sweep-protocol.md`](./production-sweep-protocol.md) | **Production Sweep (Barrido de Producción).** El barrido *profundo* ruta-por-ruta y sección-por-sección sobre 5 ejes: assets, código muerto, hardcodeo, i18n y SEO/a11y. Censo → reporte → **STOP** → ejecución, con cuarentena en vez de borrado. |
| [`update-context-prompt.md`](./update-context-prompt.md) | Actualizar el log de contexto tras un feature. |
| [`session-close-prompt.md`](./session-close-prompt.md) | Cerrar sesión (notas de sesión). |
| [`backup-brain-prompt.md`](./backup-brain-prompt.md) | Respaldo del framework a `_archive/`. |
| [`git-deploy-workflow.md`](./git-deploy-workflow.md) | Flujo de git + deploy (GitHub Pages; git actualmente bloqueado por dubious ownership — ver el doc). |
| ~~[`optimize-images-prompt.md`](./optimize-images-prompt.md)~~ · ~~[`optimize-video-prompt.md`](./optimize-video-prompt.md)~~ | ⚠️ **OBSOLETOS.** Asumen un `ffmpeg` global que no existe en esta máquina. Solo sirven como referencia de parámetros. Usa `production-sweep-protocol.md`. |
| [`hardware-audit-prompt.md`](./hardware-audit-prompt.md) | Auditoría de rendimiento (60fps, leaks). |
| [`validation-rules.md`](./validation-rules.md) | Auditoría de consistencia del framework (10 reglas). |

## 🧩 Casos puntuales (bajo demanda)

| Protocolo | Cuándo usarlo |
|:--|:--|
| [`arq-inv-protocol.md`](./arq-inv-protocol.md) (`/arq-inventory`) | Inventario exhaustivo y no destructivo de la arquitectura, contenido y motion de una interfaz (ingeniería inversa de UI). |
| [`dev-cache-desync-protocol.md`](./dev-cache-desync-protocol.md) (`/dev-cache-fix`) | Caché de Turbopack bloqueada, errores fantasma de CSS/PostCSS, archivos bloqueados en dev. |
| [`react-globe-protocol.md`](./react-globe-protocol.md) (`/react-globe`) | Trabajar con el globo 3D `react-globe.gl` sin romper el scroll (técnica del proyecto anterior; el portfolio usa R3F — `ArtScene.tsx`). |
| [`SAAS-BACKGROUND-PROTOCOL.md`](./SAAS-BACKGROUND-PROTOCOL.md) (`/saas-background`) | Prompts de fondos abstractos de marca (gradientes fluidos, glass, grano) con la paleta del portfolio. |

> Los **skills** (MOTION-BIBLE, SCROLL-EFFECTS-ARCHITECT, SECTION-ARCHETYPES, AWWWARDS-RUBRIC, Tokenizer, etc.) viven en [`../WorkFlow-Docs/Design-Agent-Skills/`](../WorkFlow-Docs/Design-Agent-Skills/) y se cargan desde estos protocolos.
>
> ⚠️ Los antiguos `master-design-prompt.md`, `refactor-design-prompt.md` y `onboarding-context.md` fueron retirados a `../_archive/legacy-goams/` (marca muerta, rutas rotas). No los uses.
>
> **Pendiente de migración:** crear los envoltorios de comandos nativos de este entorno (Qwen Code) para los protocolos marcados con `/`.
