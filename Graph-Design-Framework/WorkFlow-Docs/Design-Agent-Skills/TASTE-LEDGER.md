---
name: Taste Ledger
description: El gusto del usuario (Christian Sandoval, director creativo) y los acuerdos de trabajo, destilados de sus correcciones reales en el proyecto anterior (sweeps de Epicare /go-crm y /team, 2026-09/10) y vigentes en Portfolio 2026. Lo que aprueba, lo que rechaza y cómo quiere que se trabaje. Cargar SIEMPRE antes de proponer o tocar diseño.
---

# 🧭 TASTE LEDGER — Cómo piensa el usuario

> **Procedencia:** destilado de correcciones reales del proyecto anterior (Epicare). Es el MISMO director creativo: los rechazos (§2) y los acuerdos de trabajo (§3) aplican íntegros. Las aprobaciones estéticas (§1) se traducen aquí al vocabulario Portfolio 2026; donde una aprobación era específica de la marca Epicare, se anota.

## 1 · Lo que aprueba (dirección estética)

- **Minimalista, controlado, profesional, "bien organizado".** Retículas claras, hairlines de 1px, jerarquía limpia, mucho aire. Awwwards por *disciplina*, no por efectos. (En Portfolio 2026 la disciplina convive con la agresividad cinemática de la tipografía — Binary Soul.)
- **Menos es más en móvil**: sliders nativos de cuadrados, contenido reducido, títulos fuera de los contenedores, media a sangre.
- **Tipografía con jerarquía fuerte y coherente**: tokens del DS (títulos 700 móvil / 600 desktop), un tamaño por rol, cero overrides de tracking/leading.
- **Acento de marca como cierre** (celda o banda de resolución, CTA primario). *En Epicare fue el azul `#35BBFD`; en Portfolio 2026 el acento censado es el púrpura `#a855f7` — pendiente de confirmación de dirección.*
- **Detalles que se revelan al hover** en desktop (fecha, línea de acento), no todo visible a la vez.
- Rendimiento se nota: "súper lento" en móvil es un defecto grave → Hardware Symphony.
- **Esquinas: jerarquía contenedor > pieza.** Regla Epicare (30/09/2026): piezas internas siempre con radio MENOR que su contenedor; nada de radios gigantes gratuitos. *En Portfolio 2026 mandan las formas ya aprobadas por el código shipped:* panel invertido About `rounded-[36px]`, pills de case studies `rounded-[4px]`, botones sociales `rounded-[12px]`, burbujas de UI `rounded-full`. No re-estilar lo congelado; en trabajo nuevo, radio contenido y coherente.

## 2 · Lo que rechaza (no repetir)

| Rechazo | Cita |
|:--|:--|
| Añadir elementos que no pidió (números, índices, reglas, labels) | "qué manía con agregar números, yo no te dije agrega cosas" |
| Textos largos / cargados | "demasiado cargado ese texto, quiero algo más simple de digerir" |
| Labels de botón largos | "un label de botón no puede ser tan largo por dios" |
| La palabra "oportunidad/opportunity" repetida en marketing | "no puedes decir oportunidad tantas veces" / "ya no quiero volver a verla" |
| Prosa editorial suelta, notas flotando, timelines narrativos, tablas tipo registro | "no quiero eso, quiero algo minimalista tipo grid" |
| Scroll horizontal pineado para contar una historia | "ya no quiero scroll horizontal" |
| Pins/snap en móvil que se sienten en piloto automático | "va en piloto automático, no me gusta" |
| Cambiar lo que ya aprobó | "porfa no la dañes que me costó hacerla" |
| Overrides de peso/tracking/leading en títulos | "ese título tiene un font weight que no es del token" |
| Cambios de fondo/franjas entre bloques | "necesito que solo haya 1 fondo" |
| Sombras fuera del DS | "que las sombras que haya solo sean las del design system" |

> Nota Portfolio 2026: el showcase de Projects usa split-scroll con paneles sticky en desktop — está APROBADO/congelado (shipped). El rechazo al "scroll horizontal pineado" aplica a propuestas NUEVAS de narrativa horizontal, no a lo existente.

## 3 · Cómo quiere trabajar (acuerdos)

1. **Una sección a la vez, con su revisión.** Terminar, verificar, reportar y ESPERAR. No avanzar a la siguiente sin su "seguimos".
2. **Hacer exactamente lo pedido.** "1 palabra" = una palabra. "Solo en mobile" = no tocar desktop (verificarlo con captura). Ante la duda en algo menor, elegir la opción conservadora y decirlo en una línea.
3. **Commit solo cuando lo pide** ("haz un commit"). Push solo con confirmación explícita. Mensajes de commit descriptivos por sección.
4. **No borrar: cuarentena** (`_quarantine/`) para assets/componentes huérfanos.
5. **Verificar visualmente antes de reportar** (VISUAL-QA-HARNESS): móvil 390 siempre.
6. **Reporte factual y corto**, en español, sin autoelogio ("perfecto", "brutal", "hermoso" prohibidos en boca del agente). Tabla o bullets de qué cambió; qué quedó pendiente; pregunta de commit al final.
7. **Si pide opciones, ofrecerlas lado a lado** (panel de debug o `?variant=`) en vez de iterar una por una; al elegir, borrar las demás y registrar las quemadas en el `context.md` de la sección.
8. **Si rechaza, no insistir con el mismo paradigma re-estilado**: saltar de paradigma (AWWWARDS-REDESIGN-SECTION-PROTOCOL, reglas anti-loop).
9. **Su frase de aprobación** ("me gusta", "hermoso", "quedó increíble") = congelar ese diseño y anotarlo como APROBADO en el context.md.

## 4 · Vocabulario del usuario → traducción técnica

| Dice | Significa |
|:--|:--|
| "tokenizado" | nada hardcodeado: tokens DS (`globals.css`) + `src/lib/motion.ts` |
| "hardware symphony" | solo transform/opacity, loops pausados offscreen, sin blur sobre contenido animado |
| "protocolo tokenized-motion" / "animación de entrada" | Mask Reveal / Text-Birth / Curtain / Slam con tokens (Motion Tokenizer) |
| "fullwidth sin márgenes" | a sangre en móvil, sin gutter ni radio (edge-to-edge) |
| "sube 1 token" | siguiente paso de la escala tipográfica (body-md → body-lg) |
| "listo para prod" | el ciclo completo de `production-sweep-protocol` + checklist §10 |
| "awward level" | pasar AWWWARDS-RUBRIC, pero su gusto (§1) manda sobre la rúbrica |
| "el modo" | cargar PORTFOLIO-DESIGN-DIRECTOR y trabajar con su bucle |
