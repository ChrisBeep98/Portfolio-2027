---
name: Awwwards Cinematic Acts
description: Construye secciones y páginas de Portfolio 2026 como ACTOS CINEMATOGRÁFICOS a nivel Awwwards — una película con concepto, estructura de actos (planteamiento · giro · remate) y el scroll como cámara (acercar, recorrer, atravesar, sostener). Método completo (concepto → referencias reales → guion de cámara → recetas de tipos de acto con código → filtro de gusto y presupuesto de pins → traducción a móvil → rúbrica). Destila CINEMATIC-ARCHITECT, maximum-creativity y creative-motion (archivados) y lo aprendido en /team.
---

# 🎬 AWWWARDS CINEMATIC ACTS

> "La pantalla no es un documento: es una ventana a un mundo." — heredado de *Cinematic Architect*.
> **Qué es:** el método para que una sección (o una página entera) se sienta como una película y no como una pila de cajas.
> **Cuándo:** crear una sección de alto impacto, convertir una página en relato, o cuando el usuario pida "algo cinematográfico",
> "awwward", "que se sienta como película", "actos". Para rediseñar algo existente, entra por `/awwwards-redesign-section` y usa esta skill
> para los conceptos. Para la página completa, primero `narrative-arc` (presupuesto de pins y picos).
> **Por encima de esta skill:** el gusto del usuario (`TASTE-LEDGER.md`) y lo quemado. Esta skill propone; el ledger filtra.

---

## 0 · Qué es un "acto" (vocabulario común)

| Término | Significado en la web |
|:--|:--|
| **Concepto** | La metáfora que gobierna la sección, con nombre propio. Se nombra antes de escribir código: *"Estoy construyendo «El día detrás de cámara»"*. |
| **Acto** | Un tramo de la experiencia con un propósito narrativo: **planteamiento** (presenta el mundo), **giro** (algo cambia o se revela), **remate** (la imagen final que se recuerda). Una sección = 1 acto o 3 micro-actos; una página = 3-7 actos. |
| **Cámara** | Lo que hace el scroll (o el tiempo) con la escena: **acercar** (scale), **recorrer** (pan), **atravesar** (túnel), **sostener** (pin), **cortar** (cambio de plano). La página no "baja": la cámara se mueve. |
| **Ancla** | El único objeto que el ojo mira en cada plano. Si hay dos, no hay ninguno. |
| **Vida latente** | Movimiento autónomo y pequeño cuando nadie toca (respiración, reloj que corre, temporizador que llena una pestaña). Pausado fuera de pantalla. |
| **Interfaz diegética** | Los controles forman parte del mundo (la regla de un reloj, el contador de un caso, el sello de un documento), no flechas genéricas. |
| **Firma** | La técnica que define a la sección y que ninguna vecina repite. |

Ejemplo real (en producción): **/team** = "Every case has a crew", una producción de cine: *El elenco* (hero + caso) → *Detrás de cámara* (el reloj del día) → *Bilingüe* → *Firmado* → *Tu papel*. Cada eyebrow habla en vocabulario de cine.

---

## 1 · Método (7 pasos, con un STOP)

### Paso 1 — Situar el acto en la película
Lee `project-context/scrollytelling-map.md` y las secciones vecinas en `page.tsx`. Responde: ¿qué hacen N-1 y N+1? ¿qué técnica-firma queda libre? ¿cuántos pins lleva ya la página (máx. 3 en desktop, **0 en móvil**)? ¿este acto es pico o valle de tensión?

### Paso 2 — Concepto (descartar la primera idea)
1. **Borrado mental:** la primera idea que te venga es la estadísticamente genérica. Descártala.
2. **Elige el eje que se rompe:** gravedad, orientación, profundidad, tiempo, escala o composición tipográfica.
3. **Nombra el concepto** y escribe su metáfora en 2 líneas. Pregunta-filtro: *¿qué es lo ÚNICO que alguien recordará?*
4. Leyes antigenéricas (heredadas de *maximum-creativity*): nada de bento grid por defecto, nada de "texto gigante con parallax",
   nada de *re-skin* (cambiar fondo/borde/blur no es diseñar: el concepto cambia la estructura o la cámara).

### Paso 3 — Referencias reales (no de memoria)
Invoca **`/awwwards-research`** con el tipo de acto ("transición túnel por scroll", "escena por capítulos con pin", "reveal de remate tipográfico") y trae 2-3 mecánicas reales que pasen su filtro anti-slop. El modelo, de memoria, da el promedio de internet.

### Paso 4 — Guion de cámara (antes del código)
Escribe el **Motion Score** por acto en 6-10 líneas: qué ve el usuario, qué hace la cámara, con qué tokens.
```
ACTO I · Planteamiento (sin pin)   el marco entra con Curtain (DUR.slow, EASE.inOut); ancla: el titular (Text-Birth)
ACTO II · Giro (pin 1.5 pantallas) la cámara ATRAVIESA: el marco escala hasta llenar el viewport (scrub SCRUB.crisp)
ACTO III · Remate                  dentro del marco, el remate nace de su máscara (DUR.birth, EASE.dramatic) + CTA
MÓVIL                              sin pin: el marco crece con CSS scroll-driven o one-shot; remate igual
```
**STOP:** presenta concepto + guion + 3 variantes si el usuario lo pidió (mejor: construidas con panel de debug —
`DEBUG-PANEL-ARCHITECT` — para que elija *usándolas*; así eligió el carrusel y el layout de Bilingual).

### Paso 5 — Construir con las recetas (§2) y los tokens
Medidas del DS, motion de `src/lib/motion.ts`, solo `transform`/`opacity`, `gsap.matchMedia(el)` + `revert()`, reduced-motion.

### Paso 6 — Traducir a móvil
Con **`/mobile-design-director`**: el mismo concepto, sin pins, en 4 columnas. Cada receta de §2 trae su versión móvil.

### Paso 7 — Examen y registro
**`/awwwards-rubric`** ≥ 12/15 con capturas (390 y 1440, claro y oscuro). Registrar concepto, firma y quemados en
`sections/<página>/context.md` y la entrada del acto en `scrollytelling-map.md`.

---

## 2 · Recetario de tipos de acto (con código)

> Todas con `gsap.matchMedia(el)`: desktop con motion en `(min-width:1024px) and (prefers-reduced-motion:no-preference)`;
> móvil y reduced-motion, su variante. Medidas y tiempos desde tokens.

### A · Escena por capítulos (pin + scrub) — *desktop*
El encuadre queda fijo y el scroll recorre capítulos; algo se transforma entre el primero y el último (el final ≠ el inicio).
```ts
mm.add(PINNED, () => {
  const tl = gsap.timeline({
    defaults: { ease: EASE.none, force3D: true },
    scrollTrigger: { trigger: el, start: "top top", end: () => `+=${window.innerHeight * CHAPTERS * 0.6}`, pin: true, scrub: SCRUB.crisp, invalidateOnRefresh: true },
  });
  // posiciones en fracción del recorrido (timeline de duración 1), no segundos
  tl.fromTo(".act-roll", { y: 0 }, { y: () => -travel(), duration: 0.85 }, 0)
    .fromTo(".act-birth", { yPercent: REVEAL.birthPercent }, { yPercent: 0, duration: 0.08, ease: EASE.dramatic }, 0.86);
});
```
- **Gánate el pin:** solo si hay transformación por capítulos. Si es una lista que pasa, no lleva pin.
- **Una velocidad para lo que se lee junto** (en los créditos de /team, departamento y nombre a dos velocidades "se despegaban").
- **Móvil:** sin pin — scroll natural + remate one-shot (`TRIGGER.late`).
- ⚠️ Quemado: **scroll horizontal pineado para contar una historia** ("ya no quiero scroll horizontal").

### B · Escena autónoma (el tiempo como cámara)
El acto avanza solo cuando está en pantalla; el usuario puede saltar de capítulo. Firma de *Detrás de cámara* (/team).
```ts
const state = { h: START };
const day = gsap.timeline({ paused: true, repeat: -1, repeatDelay: END_HOLD, onUpdate: render });
day.addLabel("s0", 0);
times.slice(1).forEach((t, i) => day.to(state, { h: toHours(t), duration: DUR.cinematic, ease: EASE.inOut }, `+=${SCENE_HOLD}`).addLabel(`s${i + 1}`));
ScrollTrigger.create({ trigger: el, start: "top 75%", end: "bottom 25%", onToggle: (s) => (s.isActive ? day.play() : day.pause()) });
const jumpTo = (i) => day.tweenTo(`s${i}`, { duration: DUR.base, ease: EASE.inOut, onComplete: () => void day.play() });
```
- El valor continuo (la hora) se **escribe directo al DOM** (`textContent`), cero renders por frame; las escenas discretas sí cambian estado.
- Controles diegéticos: la regla del día con hitos clicables (desktop) / línea + burbuja "siguiente" (móvil).
- ⚠️ Quemado aquí: ese mismo acto **con pin + scrub** ("que la animación sea sola, que no se quede pineada").

### C · Túnel (atravesar el marco)
Un marco (ventana) escala hasta cubrir el viewport y el mundo de alrededor se desvanece: el usuario "entra" en el contenido.
```ts
mm.add(PINNED, () => {
  const frame = el.querySelector(".act-frame")!;
  const s = () => Math.max(window.innerWidth / frame.clientWidth, window.innerHeight / frame.clientHeight);
  gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=120%", pin: true, scrub: SCRUB.crisp, invalidateOnRefresh: true } })
    .to(frame, { scale: s, ease: EASE.none }, 0)               // scale, NUNCA width/height
    .to(".act-world", { opacity: 0, ease: EASE.none }, 0)
    .fromTo(".act-inside", { opacity: 0, y: REVEAL.md }, { opacity: 1, y: 0 }, 0.6);
});
```
- **Móvil:** sin pin — el marco crece de 0.86 a 1 con `animation-timeline: view()` (CSS) o one-shot; el contenido entra después.

### D · Profundidad en capas ("sandwich" en Z)
Tres planos a distinta velocidad o profundidad: atrás (contorno / ambiente), medio (la imagen), delante (texto o figura).
- Scroll: cada capa con su deriva (`y: el.offsetHeight * DRIFT[capa]`, scrub) — 2-3 velocidades, nunca sobre el cuerpo de texto.
- Cursor (desktop con ratón): `gsap.quickTo` por capa (deriva) y por figura (`rotateX/Y` ±6°), nunca `mousemove` directo al estilo.
- Referencia: el hero "The cast" de /team (`_quarantine/team/hero-cast/` — el usuario lo cambió porque **repetía a las mismas
  personas que el acto siguiente**: dos actos seguidos no pueden enseñar el mismo reparto).

### E · Foco (el plano que se ilumina)
Una lista de elementos grandes; el que cruza el centro de la pantalla se ilumina y un panel fijo (sticky) muestra su detalle.
Firma de *Firmado* (/team). Un `ScrollTrigger` por fila (`top center → bottom center`, `onToggle`), sin scrub; el detalle
cambia con fundido por opacidad sobre elementos ya montados. Móvil: imagen flotante sticky (ver mobile-design-director P3).

### F · Remate (la última imagen)
Cierra el acto con UNA línea grande que nace de su máscara (Text-Birth) y, si toca, el CTA. La última imagen es **el usuario**
(el agente), no la empresa: "Starring: you." / "Tú vendiste. Nosotros nos encargamos del resto."

---

## 3 · Dirección (reglas de director)

1. **Concepto antes que layout.** No se empieza por columnas: se empieza por la metáfora y la cámara.
2. **Un ancla por plano.** Si el ojo no sabe dónde mirar, sobra algo.
3. **La cámara se mueve, la página no "baja".** Cada acto declara su movimiento de cámara (acercar, recorrer, atravesar, sostener, cortar).
4. **El final es distinto del inicio.** Un acto que termina igual que empezó no es un acto, es un adorno.
5. **Ningún acto repite la firma de su vecino**, ni el reparto (no enseñar a las mismas personas dos veces seguidas).
6. **Pins: máximo 3 por página, nunca adyacentes, 0 en móvil.** Cada pin se gana con una transformación.
7. **Vida latente en el acto activo**, pausada fuera de pantalla (IntersectionObserver o `ScrollTrigger.onToggle`).
8. **Interfaz diegética** (contadores, reglas, sellos, temporizadores dentro del control) en vez de flechas genéricas.
9. **Riesgo alto en el concepto, control en la ejecución.** El usuario prefiere un "bájale dos tonos" a una caja aburrida, pero su
   gusto es minimalista y en retícula: el riesgo va en la estructura y la cámara, no en el ruido (sin glows ni efectos de más).
10. **60 fps o no existe:** solo `transform`/`opacity`, `quickTo`/lerp para el cursor, nada de `getBoundingClientRect` en bucles de
    scroll sin throttling, `will-change` solo mientras anima, vídeos y tickers parados fuera de pantalla.

---

## 4 · 🔥 Quemado en actos (no proponer)

| Rechazado | Cita / contexto |
|:--|:--|
| Scroll horizontal pineado para contar una historia | "ya no quiero scroll horizontal" (proyecto anterior) |
| Pins o snap de Lenis en móvil | "va en piloto automático" |
| Acto autónomo convertido en pin + scrub | "que la animación sea sola, que no se quede pineada" (/team) |
| Dos actos seguidos con el mismo reparto | el hero de figuras + el carrusel de las mismas personas → "sobrecargada" |
| Créditos a dos velocidades (rol y nombre) | se despegaban y dejaban de leerse |
| Estética "aurora glass" sobre blanco / glow decorativo | marca anterior de *Cinematic Architect*; Portfolio 2026 = papel/oscuro, azul como acento |
| Fade-in plano como única entrada | MOTION-BIBLE: Text-Birth, Curtain o Layered Unveiling |

---

## 5 · Formato de entrega

```
CONCEPTO: «Nombre» — metáfora en 2 líneas
ACTOS: I planteamiento (cámara) · II giro (cámara) · III remate (cámara)
FIRMA: la técnica que nadie más usa en la página
PINS DE LA PÁGINA: n/3 · MÓVIL: 0
REFERENCIAS: 2-3 mecánicas de /awwwards-research
RUBRIC: x/15 (tabla) · detalle memorable · margen creativo
```

*Destila: `CINEMATIC-ARCHITECT_V1`, `maximum-creativity-protocol`, `creative-motion-protocol` (en `_archive/distilled-2026-10/`).*
