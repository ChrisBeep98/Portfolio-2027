---
name: Mobile Pattern Library
description: Catálogo de paradigmas móviles APROBADOS por el usuario en sweeps del proyecto anterior (2026-09) con su receta de código, las reglas de espaciado móvil y la lista de paradigmas quemados. Cargar antes de adaptar CUALQUIER sección a móvil.
---

# 📱 MOBILE PATTERN LIBRARY — Lo que funciona en móvil en Portfolio 2026

> **Para dirigir un rediseño móvil, carga primero [`MOBILE-PATTERN-DESIGN-DIRECTOR.md`](./MOBILE-PATTERN-DESIGN-DIRECTOR.md)** (método, retícula de 4 columnas y patrones aprobados en /team, 2026-10). Esta librería es el catálogo histórico de GO CRM.
>
> Complementa `command-prompts/mobile-responsiveness-protocol.md` (los 5 pilares). Aquí están las **recetas concretas**, probadas y aprobadas sección a sección en el proyecto anterior. ⚠️ Los snippets usan el vocabulario de tokens del proyecto anterior — equivalencias Portfolio 2026: `px-gutter-sm`→`px-[14px]` (mobile) / `.px-frame`, `py-section-*`→`.section-gap`, `gap-static-*`/`p-static-*`→escala rem estándar, `--color-brand-blue`→`primary`, `--color-surface-BG-*`→`background`/`surface`. Firmas móviles shipped del portfolio: Card Deck + floating chips + tap feedback (`Projects.tsx`, MOTION-BIBLE §8).

## 0 · Las reglas de oro (el usuario las exige siempre)

1. **Móvil NO es desktop encogido.** Si un layout de desktop no cabe, se **rediseña** el móvil (otro paradigma), nunca `scale-90` ni aplastar columnas.
2. **Nada de pin de GSAP en móvil.** Scroll normal + CSS nativo. Los pins móviles se sentían "lentos / en piloto automático" y se quemaron todos (ver §9). El pin vive solo en `lg:` dentro de `gsap.matchMedia`.
3. **Reducir contenido, no apretarlo.** En móvil se quitan leyendas, métricas secundarias, labels repetidos y subtítulos internos (`hidden lg:flex`). Mejor 4 donuts limpios que 6 con leyenda.
4. **Márgenes laterales = 14px** (mandato Portfolio 2026: `px-[14px]`). Incluye **paddings internos** de celdas/cards en móvil. Tablet/desktop: `.px-frame` (sistema elástico en em).
5. **Un solo separador.** Si los cuadrados/cards ya separan, se elimina la hairline/borde superior (`-mt-px` o `border-b-0 md:border-b`). Nunca dos líneas seguidas ni cambio de fondo entre bloques.
6. **Textos de secciones sobre fondo: alineados a la izquierda en móvil** (`text-left md:text-center`, `items-start md:items-center`).
7. **Aire arriba del titulito/overline en móvil**: ~48px (`pt-static-2xl md:pt-static-lg`) cuando la sección abre con un bloque-celda.
8. **Todo verificado con captura a 390×844** antes de reportar (ver `VISUAL-QA-HARNESS.md`).

## 1 · ⭐ Slider horizontal nativo + indicador (EL caballo de batalla)

Usado en (proyecto anterior): Conversaciones, Métricas, El problema, Caos operativo. **Cero JS de arrastre**: `scroll-snap` nativo (compositor), un `onScroll` con rAF solo para el indicador.

```tsx
const trackRef = useRef<HTMLDivElement>(null);
const frame = useRef(0);
const [active, setActive] = useState(0);
// Slide activo (medido como mucho una vez por frame)
const onScroll = () => {
  cancelAnimationFrame(frame.current);
  frame.current = requestAnimationFrame(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    const index = Math.min(ITEMS.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    setActive((p) => (p === index ? p : index));
  });
};

<div className="md:hidden flex flex-col gap-static-md">
  <div ref={trackRef} onScroll={onScroll}
    className="flex gap-static-sm overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-gutter-sm scroll-px-[var(--space-gutter-sm)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {ITEMS.map((it) => <article key={it.id} className="w-[58vw] max-w-60 aspect-square shrink-0 snap-start …">…</article>)}
  </div>
  {/* Indicador: pista n×2rem, pulgar w-static-xl movido con `translate` (compositor) */}
  <div className="px-gutter-sm" aria-hidden="true">
    <div className="relative h-1.5 rounded-full bg-[var(--color-border-Strokes-default)] overflow-hidden" style={{ width: `${ITEMS.length * 2}rem` }}>
      <span className="absolute inset-y-0 left-0 w-8 rounded-full bg-primary transition-[translate] duration-300 ease-out"
        style={{ translate: `${active * 100}% 0` }} />
    </div>
  </div>
</div>
```

**Medidas aprobadas de la slide:**
| Uso | Ancho | Contenido |
|:--|:--|:--|
| Cuadrado de mensaje (El problema) | `w-[58vw] max-w-60 aspect-square` | **solo la frase**, `text-body-lg`, alineada ARRIBA (`justify-start`), borde 1px, sin radio |
| Cuadrado con título + texto largo (proyecto anterior) | `w-[64vw] max-w-64 aspect-square` | `**Título.** descripción` en un solo `<p>` |
| Tarjeta de feature compacta (Conversaciones) | `w-43` cuadrada | icono + título, SIN subtítulo, sin "cachito"/punto de esquina |
| Dashboard completo (Métricas) | `w-[86vw]` | título fuera + dashboard + lead |

- La siguiente slide **debe asomar** (peek) → ancho < 100vw.
- Entrada del slider: **como bloque** (`CARD_FROM/TO` al contenedor), nunca slide a slide.
- Las slides NO llevan `shadow-*`: el `overflow-x` recorta la sombra y pinta una **franja de fondo** en el borde inferior (bug real, ver HARDWARE-SYMPHONY §6).
- El slider va **encima** del vídeo/visual si el usuario lo pide así (Conversaciones), o **debajo del titular** (Problema, Métricas).

## 2 · Contenido fuera del contenedor (título · visual · lead)

El usuario rechaza títulos/subtítulos metidos dentro de la tarjeta en móvil. Patrón aprobado (Seguimiento, Métricas):

```tsx
<article className="flex flex-col gap-static-md lg:block">
  <h3 className="lg:hidden text-display-xs">{title}</h3>   {/* fuera del dashboard */}
  <div className="w-full"><Board /></div>                    {/* la cabecera interna del Board es hidden lg:flex */}
  <p className="lg:hidden text-body-md text-[var(--color-text-secondary)]">{lead}</p>
</article>
```
Variante editorial (Seguimiento): el lead sangrado a columnas 2-4 de una retícula de 4 → `grid grid-cols-4 gap-x-static-md` + `col-start-2 col-span-3`.

## 3 · Media y celdas a sangre (full-bleed)

- **Vídeos/pantallazos en móvil: ancho completo sin márgenes** (`md:px-gutter-md` en el wrapper, `border-y md:border md:rounded-xl` en la consola). El texto conserva su gutter de 14px.
- **La celda de resolución azul** (cierre de una retícula) en móvil = celda completa sin inset ni radio (`md:rounded-xl`, `md:p-4` solo en desktop), `px-gutter-sm py-static-lg`.
- `SmartVideo` SIEMPRE con `style={{ aspectRatio: "W / H" }}`: sin reservar alto, el vídeo lazy crece al cargar y descuadra los pins de las secciones siguientes (el "brinco" entre secciones).

## 4 · Acordeón compacto

Aprobado para listas de pasos/etapas (Journey §7 de GO CRM). Fila = número mono + título + `+` que rota a `×`; cuerpo con `grid-rows-[0fr]→[1fr]`. El destino/resolución va como tarjeta azul abierta al final.

```tsx
<button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center gap-static-md py-static-md text-left">
  <span className="w-6 shrink-0 text-meta text-[var(--color-text-accent-blue)]">{n}</span>
  <span className="flex-1 text-h5">{title}</span>
  <svg className={`w-5 h-5 transition-[rotate] duration-300 ${isOpen ? "rotate-45" : ""}`}>…+…</svg>
</button>
<div className={`grid transition-[grid-template-rows,opacity] duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
  <div className="overflow-hidden"><p className="pl-[calc(1.5rem+var(--spacing-static-md))] pb-static-md">{desc}</p></div>
</div>
```
⚠️ Para frases/mensajes el usuario prefirió **slider de cuadrados** sobre acordeón (El problema: acordeón → rechazado → slider). Acordeón = etapas con nombre corto; slider = mensajes.

## 5 · Un DOM para dos paradigmas: `lg:contents`

Métricas: en móvil un slider; en desktop los mismos slides son hijos directos de la pista horizontal pineada. El contenedor del slider se **disuelve** en desktop:

```tsx
<div className="md-slider flex flex-col gap-static-md lg:contents">
  <div className="flex overflow-x-auto snap-x … lg:contents">{slides}</div>
  <div className="lg:hidden">{indicador}</div>
</div>
```
`.md-slide` sigue siendo seleccionable por `gsap.utils.toArray(".md-slide", el)` para el pin de desktop. Sin duplicar markup.

## 6 · Desktop pin ↔ móvil sin pin (misma sección)

```ts
const mm = gsap.matchMedia(el);
mm.add("(min-width: 1024px)", () => { /* pin + scrub horizontal */ });
mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => { /* entradas one-shot */ });
return () => mm.revert();
```
Clases: `lg:h-screen`, `lg:w-max`, `lg:flex-row`; en móvil `flex-col` + `py-section-md`. Si hace falta "fijar" algo en desktop sin GSAP → `lg:sticky lg:top-32 lg:self-start` (ojo: ningún ancestro con `overflow:hidden`; `overflow-x: clip` sí sirve).

## 7 · Retícula de hairlines (grid minimalista controlado)

Aprobado como rediseño de "El problema" (usuario: "minimalista tipo grid, controlado, profesional"):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border-Strokes-default)] border border-[var(--color-border-Strokes-default)]">
  <div className="bg-surface px-[14px] py-8 md:px-6 lg:p-8 md:col-span-2">…titular…</div>
  …celdas…
  <div className="bg-primary md:col-span-2">…resolución…</div>
</div>
```
- Desktop: detalle secundario (día/fecha) **solo al hover** (`opacity-0 translate-x-2 group-hover:…`) + línea azul superior `scale-x-0 → group-hover:scale-x-100`.
- Las celdas que entran con GSAP deben limpiar el transform al terminar (`clearProps: "transform,willChange"`): una capa compuesta se "come" el hairline de 1px.

## 8 · Entradas en móvil (Motion Tokenizer)

- Títulos: Text-Birth (`yPercent: REVEAL.birthPercent` dentro de `overflow-hidden pb-1`).
- Media en lista (Seguimiento): **zigzag** desde los lados (`xPercent ±100`, `DUR.slow`, `EASE.dramatic`) — aprobado para vídeos apilados.
- Sliders/acordeones: bloque entero con `CARD_FROM/TO`.
- CTAs: fade-up **fuera** de cualquier `overflow-hidden` (si no, se recortan hover y sombra).

## 9 · 🔥 Paradigmas móviles QUEMADOS (no proponer)

| Sección | Rechazado | Cita / motivo |
|:--|:--|:--|
| Seguimiento (3 pasos) | pinned mitad/mitad con tira que sube | "el cambio de imagen está súper forzado y lento" |
| Seguimiento | lo mismo con snap vía Lenis | "va en piloto automático" → **no usar snap de Lenis** |
| Seguimiento | stacking cards / lista con pin | se siente raro en móvil |
| Contact vs Opp | strips + shrink card + sheet con pin GSAP | "horrible de optimizado" → CSS/nativo |
| Contact vs Opp | 3 columnas en móvil | "horribles" |
| Métricas | dashboards de desktop dentro del pin horizontal | aplastados, ilegibles |
| Métricas | títulos dentro del contenedor | "saca los títulos y subtítulos del contenedor" |
| El problema | acordeón de frases | reemplazado por slider de cuadrados |
| El problema | canal + día dentro de los cuadrados | "solo deja el mensaje" |
| Cualquiera | números/índices añadidos ("01", reglas) sin pedirlos | "qué manía con agregar números" |
