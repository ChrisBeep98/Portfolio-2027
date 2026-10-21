# 🔄 Protocolo: Awwwards Redesign Section (Portfolio 2026)

**El comando para REDISEÑAR una sección que existe y ya no gusta, a nivel Awwwards.** Invocable: `/awwwards-redesign-section`.
Evoluciona el antiguo *Redesign Director* (archivado en `_archive/distilled-2026-10/`) con lo que de verdad funcionó en el
rediseño de `/team`: el gusto del usuario como filtro, referencias reales, el vocabulario de actos cinematográficos, elegir
*usando* un panel de debug, traducción a móvil y verificación medida.

> **Crear algo nuevo** → `/awwwards-cinematic-acts`. **Ajustar algo concreto** ("solo cambia la animación", "sube un token",
> "quita esos textos") → NO es un rediseño: hazlo exactamente y nada más (ver §6). **Solo móvil** → `/mobile-design-director`.

---

## 0 · Las skills que este protocolo usa (las que más sirven)

| Skill / comando | Para qué aquí |
|:--|:--|
| [`TASTE-LEDGER.md`](../WorkFlow-Docs/Design-Agent-Skills/TASTE-LEDGER.md) | **Filtro de entrada.** Lo que aprueba, lo que rechaza (con cita), cómo quiere trabajar. Ningún concepto sobrevive si choca con él. |
| [`/awwwards-research`](./AWWWARDS-RESEARCH-PROTOCOL.md) | **Referencias reales** antes de proponer: mecánicas de estudios premiados, filtro anti-slop. De memoria sale el promedio de internet. |
| [`/awwwards-cinematic-acts`](../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-CINEMATIC-ACTS.md) | **Vocabulario y recetas:** concepto con nombre, actos, la cámara (acercar, recorrer, atravesar, sostener), ancla, firma; recetas de escena por capítulos, autónoma, túnel, capas, foco y remate. |
| [`/debug-panel`](./DEBUG-PANEL-PROTOCOL.md) | **Elegir usando:** las variantes construidas y conmutables en vivo; el usuario decide moviendo, no leyendo. |
| [`/mobile-design-director`](../WorkFlow-Docs/Design-Agent-Skills/MOBILE-PATTERN-DESIGN-DIRECTOR.md) | **La versión móvil:** el mismo paradigma traducido a 4 columnas, sin pins. |
| [`/awwwards-rubric`](../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-RUBRIC.md) | **El examen** antes de enseñar nada (≥ 12/15; el gusto del usuario manda sobre la rúbrica). |
| [`VISUAL-QA-HARNESS.md`](../WorkFlow-Docs/Design-Agent-Skills/VISUAL-QA-HARNESS.md) | Capturas y mediciones con `tools/visual-qa/` (390 y 1440, claro y oscuro). |

---

## ⚖️ La definición dura de "rediseñar" (se conserva)

**Rediseñar = cambiar el PARADIGMA** (de layout o de cámara). El DOM resultante tiene una estructura irreconocible respecto al
anterior. "Mismas cajas con otro fondo, blur, sombra u offset" es un *re-style*, y entregarlo como rediseño está PROHIBIDO.
Test: describe la versión vieja y la nueva a alguien que no las ve. Si ambas descripciones empiezan igual, suspendiste.

---

## FASE 0 — Contexto (silenciosa, en este orden)

1. `TASTE-LEDGER.md` — el gusto y los quemados generales.
2. `project-context/sections/<página>/context.md` — historia de ESTA sección: lo aprobado/congelado y los paradigmas QUEMADOS
   con su cita. No repitas ninguno.
3. `project-context/scrollytelling-map.md` y las vecinas en `src/app/<ruta>/page.tsx` — qué técnicas están gastadas
   alrededor, cuántos pins lleva la página (máx. 3 en desktop, 0 en móvil).
4. El componente actual completo en `src/components/<página>/` (y sus subcarpetas).
5. `AWWWARDS-CINEMATIC-ACTS.md` — vocabulario de conceptos y recetas.

## FASE 1 — Autopsia (visible, máx. 5 líneas, con capturas)

Captura la sección a 1440 y 390 (`tools/visual-qa/elshots.mjs` o `shot.mjs`) y **mírala**. Reporta: (a) paradigma y cámara
actuales, (b) firma de motion, (c) qué dijo el usuario que no le gusta — **si no lo dijo, PREGUNTA**: "¿qué ya no te gusta: el
layout, el movimiento, el mood, la densidad de texto, todo?". (d) qué está congelado (lo aprobado no se toca).

## FASE 2 — Referencias reales

Invoca `/awwwards-research` con el tipo de sección y lo que falla ("galería que se siente estática", "cierre sin remate").
Trae 2-3 mecánicas que pasen su filtro anti-slop **y** el del TASTE-LEDGER (descarta en silencio lo quemado: scroll horizontal
pineado, pins en móvil, ruido decorativo, elementos que el usuario no pidió…).

## FASE 3 — 3 conceptos + STOP

Tres conceptos de **paradigmas distintos**, escritos con el vocabulario de actos. Por cada uno:

```
CONCEPTO B — «El día detrás de cámara»
Paradigma: escena autónoma (adiós lista de filas)          Firma: el reloj que corre solo
Cámara: sostiene el encuadre; el tiempo avanza la escena    Ancla: el reloj (display-3xl)
Acto I: entra el reloj (Text-Birth) · II: cada hora cambia la escena (tarea, retrato con telón) · III: remate 18:00 = el agente
Interacción: hitos clicables (desktop) / línea + burbuja "siguiente" (móvil)
Diferencia estructural vs actual: de lista vertical de 8 filas → una escena que se transforma
Referencia: [mecánica de /awwwards-research]
```

Presenta los 3 con **AskUserQuestion y preview ASCII** (recomendado primero; si la sección existe en desktop y se trabaja móvil,
la opción A es "como desktop, adaptado").
**⛔ STOP: no codifiques hasta que elija.**
**Modo panel (el preferido cuando duda o pide "ponme opciones"):** construye las 3 como variantes conmutables con un panel de
debug (`/debug-panel`, con sus presets y ángulos nuevos): elige usándolas. Al elegir, se fijan los valores y el panel se purga a `_quarantine/`.

## FASE 4 — Implementación

- Recetas de `AWWWARDS-CINEMATIC-ACTS` §2 / `MOTION-BIBLE` / `SCROLL-EFFECTS-ARCHITECT`; medidas del DS; motion de
  `src/lib/motion.ts`; solo `transform`/`opacity`; `gsap.matchMedia(el)` + `revert()`; reduced-motion.
- Textos en `messages/{en,es}.json` con paridad; español en tú neutro; textos cortos (el usuario resume siempre: "hay demasiado texto").
- Lo que sobra va a `_quarantine/`, nunca se borra. Las variantes descartadas también.
- Verifica la transición con las vecinas (espaciado simétrico, un solo dueño del espacio; nada colgante tapado por la sección siguiente).

## FASE 5 — Móvil

Con `/mobile-design-director`: el paradigma elegido traducido a 4 columnas, sin pins, mismo concepto. Desktop intacto
(verificarlo con captura).

## FASE 6 — Examen, verificación y registro

1. `npx tsc --noEmit` + ESLint del directorio limpios; `pnpm build` verde si va a producción.
2. `/awwwards-rubric` con la tabla completa; < 12/15 → reescribe tú antes de enseñarlo (sin añadir elementos que no pidió).
3. Capturas 390 + 1440, claro + oscuro, y **medición** con `evalpage.mjs` de lo interactivo (contadores, saltos, simetría).
4. Reporte corto: qué cambió estructuralmente, qué se midió, qué NO se probó. Sin autoelogio.
5. Al aprobar ("me gusta", "hermoso", "quedó increíble") → **APROBADO/congelado** en `sections/<página>/context.md`; los
   conceptos descartados y rechazados → **QUEMADOS con su cita**.

---

## 🚨 Reglas anti-loop (se conservan y crecen)

1. "Sigue igual" / "no me gusta" → **prohibido re-estilar el mismo concepto.** Cada rechazo quema el paradigma entero: salta a
   otro de la FASE 3 o vuelve a la FASE 2 con nuevas referencias.
2. **Dos rechazos seguidos → modo panel** con 3 variantes construidas (en /team el carrusel del caso quemó 4 rondas de conceptos
   escritos; se resolvió eligiendo en vivo).
3. **Lo aprobado está congelado** — el rediseño ocurre alrededor.
4. Registra cada paradigma quemado en el `context.md` en el momento (sobrevive al compactado del chat).
5. Prohibido autoelogiarse y prohibido preguntar "¿es este el nivel que buscabas?".

## 6 · Cuándo NO es un rediseño (respetar el alcance)

El usuario distingue: "no la rediseñes, solo cámbiale la animación", "quita esos textos", "aumenta un poquito la imagen",
"alinea a la izquierda". Eso se hace **literalmente** y nada más, se verifica y se reporta en 3 líneas. Convertir un ajuste en
rediseño (o proponer 3 conceptos para un ajuste) rompe el acuerdo de trabajo.

---

**PROMPT PARA EJECUTAR (o `/awwwards-redesign-section <sección>`):**

> "Activa el **Awwwards Redesign Section** (`AWWWARDS-REDESIGN-SECTION-PROTOCOL.md`). Fases 0–2 (contexto, autopsia con
> capturas, referencias con /awwwards-research) y preséntame 3 conceptos con preview (FASE 3). No codifiques hasta que elija
> — o constrúyelos con panel de debug si te lo pido.
>
> Sección: **[COMPONENTE / PÁGINA]**. Lo que ya no me gusta: **[LAYOUT / MOVIMIENTO / MOOD / TEXTO / TODO]**.
> Congelado (no tocar): **[ej. el titular]**."
