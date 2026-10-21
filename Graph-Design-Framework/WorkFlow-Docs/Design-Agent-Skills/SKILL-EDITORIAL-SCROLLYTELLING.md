---
name: flowtify-editorial-scrollytelling
description: Construye secciones móviles tipo "revista editorial cinematográfica" para Flowtify — narradas en 3+ actos sobre una rejilla de 6 columnas, con Lenis smooth scroll, GSAP ScrollTrigger, tipografía cinética (line-mask, word-stagger, char-spread, word-swap), motion graphics SVG minimalistas, y un HUD diegético que orienta al lector. Úsala cuando el usuario pida una "sección", "scrollytelling", "actos animados", "motion graphics", o cualquier pieza con storytelling visual. Genera siempre HTML estático en mobile-first; consume los tokens del design system (`colors_and_type.css`).
user-invocable: true
---

# Editorial Scrollytelling — Método Flowtify

> Esta skill encapsula cómo se construyó **`ui_kits/landing/Problem-Solution-Mobile-v3.html`**.
> Léelo como referencia canónica antes de empezar — replicas su nivel de detalle, no su contenido.

---

## 0 · Cuándo usar esta skill

Cuando el usuario pida cualquiera de:
- "Una sección animada / con actos / cinematográfica / con scrollytelling"
- Recrear o rediseñar **una** sección de la landing (hero, problem/solution, comparison, services, calculator, testimonials, dashboard reveal, footer-curtain)
- Cualquier pieza móvil donde el storytelling importe más que la densidad informativa

**No** la uses para UI de producto (dashboards, formularios, ajustes) — para eso usa el kit de `ui_kits/landing/` directamente.

---

## 1 · Los 12 principios (no negociables)

1. **Nombra los actos antes de escribir código.** Dos o tres palabras que carguen emoción: *"El Silencio. El Costo. El Flujo."* / *"El Caos. La Promesa. El Cierre."* / *"La Pregunta. La Pausa. La Respuesta."* Sin esto, no hay narrativa.
2. **Cada acto se ve diferente.** Modo cálido (`#FAFAF7`) → cinema negro (`#0a0a0c`) → wash gradiente. El cambio de modo **es** un latido narrativo.
3. **Rejilla de 6 columnas real**, no padding apilado. Todo es `c1-6`, `c1-3`, `c4-6`, etc. Las cosas pequeñas (un número índice, un eyebrow) ocupan 1–2 cols a la izquierda; el cuerpo ocupa 4–6.
4. **Mobile-first, max-width 420px.** El stage es una columna centrada sobre fondo oscuro. Nunca optimices para desktop.
5. **Una palabra clave por acto.** Una cifra masiva. Un verbo en gradiente. Una frase. El resto es respiro.
6. **Tipografía editorial con jerarquía obscena**: mono 11px eyebrow → display 28–30px anchor → italic 22px quiet → display 108–156px hero number → body 16px. Mezcla agresiva de escala = revista.
7. **Cinética tipográfica de verdad.** Toda línea importante entra con line-mask (`overflow:hidden` + `yPercent 110→0`). Las palabras importan más que la imagen.
8. **Lenis smooth scroll + GSAP ScrollTrigger.** Inercia siempre. Scrub para frames secuenciales. Pin para sostener un acto.
9. **HUD diegético persistente.** Una pildora arriba que dice "01 / Silencio" → "02 / Costo" → "03 / Flujo". Cambia color con el acto. Orienta al lector y eleva el tono.
10. **Motion graphics minimalistas, no decorativos.** Un trazo SVG, un cursor pulsante, una línea que se derrumba. Un gráfico por frame, máximo. Cero ilustraciones hechas a mano.
11. **Reveal direction consistente.** Todo sube (`yPercent 110 → 0`, `power4.out`). Un solo lenguaje de movimiento por pieza.
12. **Copy de marca, no relleno.** Spanish, "tú", sin "chatbot/bot/automation/AI agent". Frases del Framework v2.0: *"el silencio no es gratis", "tu empleado digital", "responde como tú", "24/7"*.

---

## 2 · Anatomía de un acto

```
┌──────────────────────────────────────────┐
│  HUD (fixed, top)        01 / NOMBRE  03 │
├──────────────────────────────────────────┤
│  EYEBROW · VOL. 0X       footnote/meta   │  ← masthead (c1-3 + c4-6)
│  ────────────────────────────────────    │  ← regla animada scaleX 0→1
│                                          │
│  Anchor line (display 30px)              │  ← line-mask, word-stagger
│  Quiet line (italic 22px muted)          │
│  Quiet line (italic 22px muted)          │
│                                          │
│  ┌──────────────────────────────┐        │
│  │  HUGE NUMBER OR WORD         │        │  ← clamp(72px, 21vw, 92px)
│  │  108–156px display            │        │     char-spread, counter
│  └──────────────────────────────┘        │
│                                          │
│  Coda / data block (mono 12px)           │  ← editorial aside
│                                          │
│  01 · NOMBRE             → siguiente     │  ← footer (fn mono)
└──────────────────────────────────────────┘
```

Cada acto debe tener: **eyebrow + regla**, **un foco visual masivo** (número, palabra, gráfico), **2–4 líneas de copy editorial**, y **un aside de datos en mono**.

---

## 3 · Receta paso a paso

### Paso 1 — Define el guion (en texto, antes de cualquier código)

Escribe en una lista:
- Nombre de cada acto (2 palabras)
- Frase ancla de cada acto (la que se va a mostrar en grande)
- Cifra clave o palabra clave de cada acto
- Cambio de modo visual entre actos
- Un mecanismo cinético por acto (counter, word-swap, char-spread, frame-scrub, etc.)

Ejemplo (Problem/Solution v3):
- 01 Silencio · warm-white · *"Ads Generate Leads."* · contador 0→4 HRS · word-swap del coda
- 02 Costo · cinema-black · 3 frames en scrub: $94 → $2,840 → $0 con crash gráfico
- 03 Flujo · gradient wash · "Por eso construimos a Flow." char-spread

### Paso 2 — Crea 3 archivos hermanos

```
ui_kits/landing/<NombreSeccion>-Mobile.html
ui_kits/landing/<nombreseccion>.css
ui_kits/landing/<nombreseccion>.js
```

El HTML carga (en este orden): `../../colors_and_type.css` → `<nombre>.css` → GSAP UMD → ScrollTrigger → Lenis → Lucide (si se necesita) → `<nombre>.js`.

### Paso 3 — Copia el esqueleto

Empieza desde `Problem-Solution-Mobile-v3.html` + `ps-v3.css` + `ps-v3.js`. **No** los reescribas desde cero. Esos archivos son el toolkit canónico — modifica el contenido (texto, motion graphics SVG, color de acento) y la coreografía específica de tu narrativa.

### Paso 4 — Adapta los actos uno por uno

Para cada acto:
1. Cambia el `data-act` y `data-label`.
2. Cambia el modo visual (background del `.act<N>`).
3. Escribe el copy en bloques `.c1-6 .line` con `data-kin="words"` o `data-kin="chars"`.
4. Diseña UN motion graphic SVG inline (≤ 30 líneas, una sola idea).
5. En `<nombre>.js`, adapta la timeline del acto: cuándo entra, cuándo se hace pin/scrub, qué se anima.

### Paso 5 — Verifica en vivo

Abre el archivo en el preview. Las animaciones se pausan cuando la pestaña no está activa — **avisa al usuario** que tiene que hacer scroll dentro del preview para verlas correr.

### Paso 6 — Registra como asset

```
register_assets({ items: [{
  asset: 'Section Name (mobile, editorial)',
  group: 'Components',
  path: 'ui_kits/landing/<NombreSeccion>-Mobile.html',
  viewport: { width: 440, height: 800 },
  subtitle: '3-act editorial scrollytelling · Lenis + GSAP · kinetic typography'
}]})
```

---

## 4 · Toolkit CSS (qué tiene que tener tu stylesheet)

Cópialo de `ui_kits/landing/ps-v3.css` y adapta. Lo no negociable:

```css
/* 6-col grid */
.grid { display: grid; grid-template-columns: repeat(6, 1fr);
        column-gap: 12px; padding: 0 22px; }
.c1-6 { grid-column: 1 / span 6; } .c1-3, .c4-6, .c1-2, .c3-6 ... (define lo que uses)

/* Editorial primitives */
.eb  { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em;
       text-transform: uppercase; }
.fn  { font-family: var(--font-mono); font-size: 11px; color: rgba(14,14,16,0.55); }
.idx { font-family: var(--font-mono); font-weight: 600; font-size: 12.5px; }

/* Kinetic primitives */
.line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.row  { display: block; will-change: transform; }
.rule { height: 1px; background: currentColor; transform: scaleX(0);
        transform-origin: left; }

/* Cinema-black mode (acto 02) */
.act-cinema { background: #0a0a0c; color: #fff; }
.act-cinema .fn, .act-cinema .eb { color: rgba(255,255,255,0.5); }
.act-cinema [data-line="rule"] { background: rgba(255,255,255,0.5); }

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; }
  .row, .word, .char { transform: none !important; opacity: 1 !important; }
  .rule { transform: scaleX(1) !important; }
  .frame { opacity: 1 !important; position: relative !important; }
}
```

---

## 5 · Toolkit JS (qué tiene que hacer tu script)

Cópialo de `ui_kits/landing/ps-v3.js`. Funciones obligatorias:

| Helper | Qué hace | Cuándo usarlo |
|---|---|---|
| `splitWords(el)` | envuelve cada palabra en `.wm` (mask) + `.word` | líneas editoriales con stagger |
| `splitChars(el)` | envuelve cada char manteniendo átomos de palabra (nowrap por palabra) | titulares display masivos |
| `clearMasks(scope)` | quita `overflow:hidden` post-reveal (deja respirar descenders) | siempre, en `onComplete` |
| `revealLine(el)` | timeline word/char/row reveal según `data-kin` | dentro de `revealScope` |
| `revealScope(sel)` | scope completo: rises + rules + lines en cascada | una vez por acto |
| `counter(o, el, target)` | anima un número 0→target con `power2.out` | dentro de scrub timeline |

Patrón Lenis:
```js
const lenis = new Lenis({ duration: 1.35,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)),
  smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Patrón "frame stage" (varios sub-estados dentro de un acto):
```js
gsap.timeline({
  scrollTrigger: { trigger: '.act2', start: 'top top', end: '+=320%',
                   scrub: 1, pin: '.act2', anticipatePin: 1 }
})
.fromTo('.frame-0', {opacity:1}, {opacity:0, yPercent:-14})
.fromTo('.frame-1', {opacity:0, yPercent:14}, {opacity:1, yPercent:0}, '<')
// ...
```

Patrón word-swap (reescritura mid-scroll):
```js
gsap.to(oldWords, { yPercent: -110, stagger: 0.025, ease: 'power3.in',
  onComplete: () => {
    el.textContent = newText;
    const w = splitWords(el);
    gsap.fromTo(w, { yPercent: 110 }, { yPercent: 0, stagger: 0.035 });
  }});
```

---

## 6 · Cinética tipográfica — el menú completo

| Mecanismo | Para qué | Receta |
|---|---|---|
| **Line-mask** | la entrada base de cualquier línea | `.line { overflow: hidden }` + `.row { yPercent: 110 → 0 }` |
| **Word-stagger** | copy editorial multi-palabra | `splitWords` + cada `.word` desde `yPercent: 110`, stagger 0.04 |
| **Char-spread** | titular display (1–2 palabras) | `splitChars` (con word atomicity) + stagger 0.025 |
| **Counter** | cifras (HRS, $, %) | `gsap.to({v:0}, {v: target, onUpdate})` |
| **Word-swap** | rewrite emocional ("Hace 4 hrs" → "Ya es de otro") | salida hacia arriba + texto nuevo + entrada desde abajo |
| **Rule-draw** | regla horizontal editorial | `transform: scaleX(0→1)`, origen left |
| **Marquee** | puente entre actos | `display: inline-flex` + `animation: translate -50%` infinito |
| **Frame-scrub** | 2–3 sub-estados en un acto | pin + scrub + cross-fade entre frames absolutos |

---

## 7 · Motion graphics SVG — bestiario minimalista

Cada uno cabe en < 30 líneas. Una idea, un trazo.

- **Hilo de comunicación roto**: dos nodos circulares + path discontinuo entre ellos + spark animado que avanza y se apaga a la mitad.
- **Cursor pulsante**: una línea + un círculo que se desplaza en X con `power1.inOut`.
- **Línea ascendente**: path con `pathLength: 100` y `stroke-dashoffset` que va de 100 a 0.
- **Crash chart**: path descendente con `stroke-dashoffset` + monedas (circles) que caen con stagger.
- **Tic-tac de reloj**: anillo SVG con stroke-dasharray + aguja rotando 0→270°.
- **Stacked bars**: 3 rects con height animado de 0 a target.

**Reglas:**
- Sin gradientes complicados — usa `currentColor` o un acento sólido.
- Sin filtros pesados (drop-shadow está bien, blur no).
- Sin animaciones infinitas decorativas — solo loops si son diegéticos (cursor de typing, etc.).

---

## 8 · Copy editorial — vocabulario Flowtify

Voz: **tú**, premium pero cálido, sin tecnicismos. Frases ya canónicas:
- *"El silencio no es gratis."*
- *"Tu empleado digital."*
- *"Responde como tú."*
- *"24/7. Sin chatbots. Sin tecnicismos."*
- *"Por eso construimos a Flow."*
- *"Dinero que tu negocio ya generó — pero que nadie cobró."*
- *"Ningún lead se enfría."*

Eyebrow editorial: `PROBLEMA · VOL. 01`, `COSTO · VOL. 02`, `RESPUESTA · VOL. 03`, `ESTUDIO INTERNO — n=200`, `PRODUCTO — Flow™`.

Aside/data: **siempre** en `Geist Mono`. Etiquetas en uppercase con `letter-spacing: 0.18em`. Valores con `font-variant-numeric: tabular-nums`.

---

## 9 · Quality bar (checklist antes de entregar)

- [ ] Tres actos como mínimo, cada uno con nombre + cifra/palabra clave + modo visual propio.
- [ ] HUD diegético arriba que cambia con el acto.
- [ ] Por lo menos **5** mecanismos cinéticos distintos en la pieza (line-mask, word-stagger, char-spread, counter, rule-draw, word-swap, frame-scrub).
- [ ] Mobile-first (max-width 420px), centrado sobre fondo oscuro.
- [ ] Rejilla de 6 columnas usada de verdad (al menos 4 distintos `c<x>-<y>` distintos en el archivo).
- [ ] `prefers-reduced-motion` respetado.
- [ ] Lenis activado, smooth scroll perceptible.
- [ ] Copy en español, voz Flowtify, sin "chatbot/bot/AI/automation".
- [ ] Cero ilustraciones SVG inventadas (logos, mascotas, ilustraciones decorativas a mano — prohibido).
- [ ] Registrado con `register_assets` en grupo `Components`.

---

## 10 · Cómo arrancar (acción concreta)

1. Lee `ui_kits/landing/Problem-Solution-Mobile-v3.html`, `ps-v3.css` y `ps-v3.js` completos.
2. Lee `project-context/sections/<seccion>/context.md` si el usuario está rediseñando una sección documentada.
3. Pregunta al usuario qué 2–3 actos quiere si no es obvio del brief.
4. Crea los 3 archivos hermanos, ejecuta los 6 pasos, registra el asset, y dile al usuario que haga scroll dentro del preview activo para verlo correr.
