# sections/about — Página `/about`

> **Estado:** SHIPPED — **APROBADO/congelado**. Censo inicial: 2026-10-20 (nivel grep — verificar contra código antes de editar).
> Página: `src/app/about/page.tsx`. No confundir con la sección About (manifiesto) de la landing → `../home/context.md`.

## Coreografía (censada del código)
- Timeline principal con defaults `power3.out`.
- **Mask Reveals editoriales** (patrón case study aplicado a página propia):
  - Bloque 1: `clip-path inset(0% 0% 100% 0%) → inset(0%)` **1.5s `power4.out`** + texto `y 100%→0` en paralelo.
  - Bloques siguientes: misma receta a **1.2s `power4.out`**, encadenados con `"<"`.
- Salidas aceleradas con `power2.in` (elementos que abandonan escena).
- Reveals de apoyo `power3.out` (0.45-0.55 rango de duraciones censado).

## Pendientes (no tocar sin protocolo)
1. Censo completo de layout (columnas, índice lateral, bloques) — esta semilla documenta solo motion; al primer sweep de la página, completar.
2. Verificar paridad de llaves i18n específicas de `/about` en `dictionary.ts`.

## Round 1 de rediseño del hero (2026-10-21) — QUEMADOS
- **A «Placa Editorial»** (collage retícula, retrato como columna tipográfica) — QUEMADO: "ya no me gusto ninguna opcion".
- **B «Túnel»** (frame scale al viewport, incl. versión flush-fit sin sobredimensionar) — QUEMADO idem; cita previa: "no quiero que la imagen se sobredimensione… que quede bien encajada con los bordes".
- **C «Capas»** (nombre hollow + sandwich Z + deriva de cursor) — QUEMADO idem.
- **D «Fusión»** (hollow que se parte + dock en escenario glass) — QUEMADO idem. Aprobación parcial rescatable: "me gusta la parte de la cosa glassmórfica" → el glass-engine SIGUE siendo material deseado en trabajo nuevo.
- Código del round 1 en `_quarantine/about/hero-round1/` (no borrar).
- **Quemados de paradigma para rounds siguientes:** imagen que se sobredimensiona/escala a viewport; pins que se sienten piloto automático; re-estilar cualquiera de los 4 anteriores.
- **Round 2 — QUEMADO (2026-10-21):** "no que diseños tan horribles… se profesional por dios": E «Letras-Ventana», F «Lista-Foco», G «Cortina» + panel. Código en `_quarantine/about/hero-round2/`. Lecciones: elementos flotantes sin retícula, colisiones de sello y experimentos visuales leen como "horrible" — quiere disciplina de grid visible.
- **Round 3 — QUEMADO (2026-10-21):** "no me gustó, vuelve a rediseñar": «Glass Studio Grid» (12 cols + glass card sobre el retrato). Código en `_quarantine/about/hero-round3/`.
- **Round 4 «La Costura» — QUEMADO (2026-10-21):** "no me gustó, vuelve a rediseñar" (split screen + costura + ambas fotos glass). Código en `_quarantine/about/hero-round4/`.
- **Round 5 «Monolito Centrado» — QUEMADO (2026-10-21):** "quedó horrible, por dios, quiero algo profesional" (póster centrado display-3xl + glass mordiendo el texto). Código en `_quarantine/about/hero-round5/`. ⚠️ Lección: se entregó SIN ver las capturas (el batch de QA falló por red) — jamás volver a entregar sin mirar. Diagnóstico acumulado: solapes/elementos flotantes/gimmicks leen como "horrible"; quiere el estándar §5 del PORTFOLIO-DESIGN-DIRECTOR literal: nada flotando suelto, un solo separador, hairlines 1px, jerarquía limpia.
- **Round 6 «Editorial Limpio» — APROBADO COMO BASE (2026-10-21):** "vamos a hacer ligero cambio" — el usuario aceptó la estructura y pidió iterar: derecha = **mazo 3D de 3 cartas glassmórficas** (retrato / insight / ficha con tags+spec), **click → la carta sube al frente** (reorder animado, FLIP), **hover → se expande un poco**. Panel de debug del mazo en dev (`HeroDeckPanel`, localStorage `__dbg_about_deck`): presets Actual/Compacto/Profundo/Flat + sliders (gapY, scaleStep, rotateX perspectiva, hoverScale/hoverDur, reorderDur, ease) + segmented (aspect 4/5·3/4.2·1/1·16/10, topCard) + motion (drift/breath vivos). Cabecera perdió el spec (vive en la carta ficha); tags salieron de la columna izquierda (viven en la carta ficha). Archivos: `HeroEditorial.tsx` + `HeroDeck.tsx` + `HeroDeckPanel.tsx`.
