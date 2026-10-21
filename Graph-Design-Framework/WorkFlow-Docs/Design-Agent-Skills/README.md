---
name: Agent Skills Index
description: Índice y orden de carga de las Design Agent Skills de Portfolio 2026, marcando cuáles son ejecutables (recetas) y cuáles filosofía.
---

# 🧠 Portfolio 2026 Design Agent Skills — Índice

> **Propósito:** protocolos modulares para agentes de IA. Entrada global: [`../../START-HERE.md`](../../START-HERE.md). Las skills se cargan desde los protocolos de `command-prompts/` (AWWWARDS-REDESIGN-SECTION, tokenized) y desde `AWWWARDS-CINEMATIC-ACTS`.
> **Procedencia:** parte del catálogo se destiló en el proyecto anterior (Epicare, sweeps 2026-09/10) — las técnicas son portables; la marca, los tokens y las rutas ya son de Portfolio 2026.

## 📖 Orden de carga para trabajo de DISEÑO/MOTION

| # | Skill | Archivo | Tipo | Descripción |
|:--|:---|:---|:---|:---|
| 1 | **Motion Bible** | [`MOTION-BIBLE.md`](./MOTION-BIBLE.md) | ⚙️ receta | LA fuente canónica: física Cinematic Architect/Binary Soul + tokens de motion (`src/lib/motion.ts`) + firma del portfolio (Mask Reveal, Kinetic Slam, Magnetic Cursor, 50% Swap, Card Deck, Planetary, Liquid ScrollTo) + receta ejecutable de cada pilar. |
| 2 | **Scroll Effects Architect** | [`SCROLL-EFFECTS-ARCHITECT.md`](./SCROLL-EFFECTS-ARCHITECT.md) | ⚙️ receta | Técnicas GSAP pesadas con código completo (split-scroll, stacking, horizontal, scrollytelling, velocity, FLIP). |
| 3 | **Section Archetypes** | [`SECTION-ARCHETYPES.md`](./SECTION-ARCHETYPES.md) | 🎯 dirección | Coreografía mínima obligatoria + paradigmas de layout por tipo de sección. |
| 4 | **Awwwards Rubric** | [`AWWWARDS-RUBRIC.md`](./AWWWARDS-RUBRIC.md) | ✅ examen | Checklist binario 15 puntos. Umbral 12/15 para entregar. |
| 5 | **Tokenizer** | [`Tokenizer.md`](./Tokenizer.md) | 🛡️ guardián | Enforcement Zero-Px del Design System (tipografía Manrope/JetBrains Mono, elastic spacing, color bimodal). |
| 6 | **Motion Tokenizer** | [`Motion-Tokenizer.md`](./Motion-Tokenizer.md) | 🛡️ guardián | Enforcement de tokens cinemáticos (`src/lib/motion.ts`), arquetipos de entrada y Line-by-Line Clip. |
| 7 | **Cognitive Typographer** | [`COGNITIVE-TYPOGRAPHER.md`](./COGNITIVE-TYPOGRAPHER.md) | ⚙️ receta | Tracking, text-wrap, medida de línea. |
| 8 | **Hardware Symphony** | [`HARDWARE-SYMPHONY.md`](./HARDWARE-SYMPHONY.md) | 🛡️ guardián | 60fps: qué animar y qué no, smart shutdown, degradación. |

## 👑 Por encima de todas

**[`PORTFOLIO-DESIGN-DIRECTOR`](../../master-framework-command/PORTFOLIO-DESIGN-DIRECTOR.md)** — skill maestra: modo de trabajo + router. Decide qué skill de esta carpeta se carga y con qué estándar.

## 🎯 Gusto del usuario

| Skill | Archivo | Tipo | Descripción |
|:--|:---|:---|:---|
| **Taste Ledger** | [`TASTE-LEDGER.md`](./TASTE-LEDGER.md) | 🎯 dirección | Gusto del usuario, rechazos con cita, acuerdos de trabajo, vocabulario. Destilado en el proyecto anterior (mismo director creativo) — Cargar siempre. |

## 🆕 Destiladas en el proyecto anterior (técnicas portables, 2026-09/10)

| Skill | Archivo | Tipo | Descripción |
|:--|:---|:---|:---|
| **Mobile Pattern Library** | [`MOBILE-PATTERN-LIBRARY.md`](./MOBILE-PATTERN-LIBRARY.md) | ⚙️ receta | Slider nativo + indicador, contenido fuera del contenedor, a sangre, acordeón, `lg:contents`, retícula de hairlines, quemados. Complementa las firmas móviles del portfolio (Card Deck, floating chips, tap feedback — MOTION-BIBLE §8). |
| **Data Mock UI** | [`DATA-MOCK-UI.md`](./DATA-MOCK-UI.md) | ⚙️ receta | Dashboards de producción para case studies: datos fijos, `TYPE` por rol, superficies bimodales, timer CSS, trampas SVG. |
| **CTA System** | [`CTA-SYSTEM.md`](./CTA-SYSTEM.md) | ⚙️ receta | Reglas de label y colocación. ⚠️ Los componentes PrimaryCta/SecondaryCta eran del proyecto anterior — en Portfolio 2026 el sistema de botones está sin formalizar (ver `project-context/sections/design-system/context.md`); aplicar las reglas de label, no los componentes. |
| **Visual QA Harness** | [`VISUAL-QA-HARNESS.md`](./VISUAL-QA-HARNESS.md) | ✅ examen | Scripts CDP en `tools/visual-qa/`, matriz de viewports, trampas del entorno. |
| **Awwwards Cinematic Acts** | [`AWWWARDS-CINEMATIC-ACTS.md`](./AWWWARDS-CINEMATIC-ACTS.md) | 🎯 dirección + ⚙️ receta | **Crear secciones/páginas como actos cinematográficos** (`/awwwards-cinematic-acts`): concepto, actos, el scroll como cámara, 6 recetas de acto con código (capítulos, autónoma, túnel, capas, foco, remate), quemados. |
| **Mobile Pattern Design Director** | [`MOBILE-PATTERN-DESIGN-DIRECTOR.md`](./MOBILE-PATTERN-DESIGN-DIRECTOR.md) | 🎯 dirección + ⚙️ receta | **Cargar primero para cualquier trabajo móvil.** Método sección por sección, retícula de 4 columnas, patrones aprobados, quemados, trampas y verificación. |

## 🧰 Skills de workflow (bajo demanda)

| Skill | Archivo | Descripción |
|:--|:---|:---|
| **Debug Panel Architect** | [`DEBUG-PANEL-ARCHITECT/`](./DEBUG-PANEL-ARCHITECT/README.md) | **Carpeta** de 17 módulos: panel de debug inyectable para tuning visual en vivo + Purge Protocol. |
| **Commerce Architect** | [`COMMERCE-CONVERSION-ARCHITECT.md`](./COMMERCE-CONVERSION-ARCHITECT.md) | UX/motion e-commerce (cart drawer, galerías, FLIP → ver SEA §6). ⚠️ De otro producto (e-commerce del proyecto anterior); consulta de técnica. |
| **Visual Prompter** | [`visual-prompt-engineer/SKILL.md`](./visual-prompt-engineer/SKILL.md) | Prompts para AI video/imagen (Veo, Midjourney) para heros. |

## ⏳ Pendientes de destilar (no se cargan por defecto)

| Skill | Archivo | Estado |
|:--|:---|:---|
| **Animated Scene Architect** | [`ANIMATED-SCENE-ARCHITECT.md`](./ANIMATED-SCENE-ARCHITECT.md) | Escenas animadas zen, esqueletos de UI diegética, micrográficos y tarjetas de vidrio con micro-loops. Candidata a destilar en `AWWWARDS-CINEMATIC-ACTS` y archivar. |
| **Kinetic Avant-Garde Typography** | [`KINETIC-AVANT-GARDE-TYPOGRAPHY.md`](./KINETIC-AVANT-GARDE-TYPOGRAPHY.md) | Texto como póster editorial con escalas y pesos mezclados. **Muy afín a la firma Binary Soul** (The Wall, Hollow) — candidata a destilar pronto. |
| **Editorial Scrollytelling (Flowtify)** | [`SKILL-EDITORIAL-SCROLLYTELLING.md`](./SKILL-EDITORIAL-SCROLLYTELLING.md) | ⚠️ **De otro proyecto (Flowtify)**, retícula de 6 columnas. No aplicar directo; consulta de técnica solamente. |

## 🗄️ Retiradas (no cargar)

**2026-10-08 (proyecto anterior):** `CINEMATIC-ARCHITECT_V1`, `maximum-creativity` y `creative-motion` se destilaron en `AWWWARDS-CINEMATIC-ACTS.md` y se archivaron en [`../../_archive/distilled-2026-10/`](../../_archive/distilled-2026-10/).

`CREATIVE-DIRECTION`, `CREATIVE-MOTION`, `AWWWARDS-MOTION` y `CINEMATIC-ARCHITECT` fueron **fusionadas en MOTION-BIBLE.md** y archivadas en [`../../_archive/legacy-goams/`](../../_archive/legacy-goams/) — contenían la marca muerta (Playfair/café/violeta/light-only). Los scrapings de referencia (Alche, iru) viven en [`../../references/`](../../references/) como inspiración, no protocolo.

**Ojo:** el brief "Cinematic Architect" original del portfolio vive en `framework-old/@@Agent-Features/CINEMATIC-ARCHITECT.md` (raíz del repo) — es OTRA pieza distinta de la skill retirada homónima: aquella es historia de Epicare; esta es la identidad vigente, ya portada a MOTION-BIBLE + Design-System.
