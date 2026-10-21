---
name: Awwwards Rubric
description: Checklist binario de calidad. Toda sección nueva o rediseñada DEBE puntuar antes de mostrarse al usuario. Menos de 12/15 = reescribir sin preguntar.
---

# 🏆 AWWWARDS-RUBRIC — El examen que toda sección debe pasar

"Sé bold" no es verificable. Esto sí. **Corre este examen ANTES de decirle al usuario que terminaste.** Cada criterio es binario: se cumple o no. Reporta la tabla completa con ✅/❌ y la puntuación.

**Umbral: 12/15.** Por debajo → reescribe tú mismo lo que falló y re-examina. No entregues suspensos.

## A · Composición (5 puntos)

| # | Criterio verificable |
|:--|:--|
| A1 | Hay **≥1 ruptura de grid real**: overlap entre elementos, elemento que sangra fuera del contenedor, o asimetría estructural (no solo `mt-32` en una card). |
| A2 | Hay **salto de escala editorial**: el elemento tipográfico mayor es ≥3× el cuerpo de texto (ej. `text-display-*` contra `text-body-*`). |
| A3 | El layout NO es el patrón AI-slop: grid de N cards idénticas con icono centrado + título + párrafo. Si las cards existen, difieren en tamaño, contenido o tratamiento. |
| A4 | La paleta de marca (neutros bimodales `#F2F2F0`/`#050505` + acento púrpura `#a855f7` + glitch cyan/pink como firma) aparece tejida como **acentos/detalles** (no fondos dominantes, no ausentes). |
| A5 | Hay **1 detalle memorable** concreto que ninguna otra sección de la página tiene (nómbralo en el reporte: "el led de fase que cambia de color", "el número que sangra tras el título"). |

## B · Motion (5 puntos)

| # | Criterio verificable |
|:--|:--|
| B1 | **0 fade-ins planos**: ningún elemento entra solo con opacity. Todo reveal usa Text-Birth, Curtain o Layered Unveiling (MOTION-BIBLE §1–3). |
| B2 | **≥2 velocidades de scroll**: fondo/estructura viajan más lento que el contenido (parallax presente). |
| B3 | **Vida latente**: ≥1 elemento respira cuando el scroll se detiene (MOTION-BIBLE §4), pausado fuera de viewport. |
| B4 | Todos los valores de motion salen de `EASE/DUR/STAGGER/REVEAL/SCRUB` (`src/lib/motion.ts`). Desviaciones = declaradas. |
| B5 | La **transición con las secciones vecinas** está coreografiada o verificada contra `scrollytelling-map.md` (no corta el flujo, no repite el efecto exacto de la sección anterior). |

## C · Interacción (2 puntos)

| # | Criterio verificable |
|:--|:--|
| C1 | **Todo elemento interactivo devuelve energía**: hover/focus con respuesta ≤0.2s (EASE.snap). Cero elementos clicables muertos. |
| C2 | Los estados hover hacen algo más que cambiar color: levitación, revelación de contenido, o desplazamiento coreografiado. |

## D · Disciplina (3 puntos)

| # | Criterio verificable |
|:--|:--|
| D1 | **Token-Live**: tipografía, espaciado, sombras y color 100% de tokens del DS (o Reporte de Margen Creativo con desviaciones declaradas). Grep de `text-[0-9]`, `p-[0-9]`, hex sueltos = limpio. |
| D2 | **Bimodal verificado**: la sección funciona en Light Y Dark (`dark:` presente donde toca, sin colores que desaparecen). |
| D3 | **Higiene técnica**: `gsap.context()` + `ctx.revert()`, `prefers-reduced-motion` cubierto, solo `transform/opacity` animados, `pnpm build` pasa. |

---

## Formato de reporte (obligatorio al entregar)

```
RUBRIC: 13/15
❌ A5 — sin detalle memorable único (las cards son correctas pero anónimas)
❌ B3 — sin vida latente
→ [si <12: "Reescribiendo X e Y antes de entregar"]
Detalle memorable: [nómbralo]
Margen creativo: [0 hardcodeados | N desviaciones declaradas]
```

**Prohibido** en el reporte: "perfecto", "brutal", "bellísimo", "hipnótico", "nivel premium logrado". El reporte es factual; el usuario juzga la belleza.
