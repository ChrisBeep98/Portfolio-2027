---
name: Mobile Pattern Design Director
description: Cómo rediseñar una página de Portfolio 2026 en móvil a nivel Awwwards, destilado del rediseño móvil de /team (2026-10-08, aprobado sección por sección con "hermoso" / "quedó increíble"). Método de trabajo sección por sección, retícula propia de 4 columnas, 6 patrones aprobados con su receta de código (carrusel de 3 infinito, escena de desktop adaptada con `contents`, lista-foco con imagen flotante sticky, fundido de bloque, slider de opciones con halo, hero compacto con CTA burbuja), lo quemado, las trampas técnicas reales y cómo verificar. Cargar ANTES de tocar cualquier sección en móvil; complementa (no reemplaza) MOBILE-PATTERN-LIBRARY.
---

# 📱 MOBILE PATTERN DESIGN DIRECTOR

> **Origen:** el usuario dijo de /team "en desktop está increíble, pero en mobile no me gusta nada". Rediseñamos sección por
> sección y las 5 quedaron aprobadas ("hermoso", "quedó increíble"). Esta skill es ese proceso convertido en método.
> **Relación con otras skills:** [`MOBILE-PATTERN-LIBRARY.md`](./MOBILE-PATTERN-LIBRARY.md) es el catálogo histórico (GO CRM):
> slider de cuadrados, acordeón, `lg:contents`, retícula de hairlines. **Esta skill manda en el *cómo dirigir* el móvil** y
> añade los patrones nuevos. Ante conflicto de criterio, gana esta; ante un valor técnico concreto, el de la skill especialista.
> **Código vivo de referencia:** `src/components/team/**` (rama `prod-sweep-team`, en producción en `25043be`).

---

## 0 · La idea central (lo que el usuario premió)

**El móvil no es el desktop apilado. Es el desktop *traducido*: el mismo paradigma, la misma firma, recompuesto en 4 columnas.**

Cada vez que propusimos algo "muy de móvil" pero distinto al desktop, el usuario lo corrigió hacia el desktop:
- "reduce ese carrusel en mobile, para que se vean 3 tarjetas en la row, que se vea **más parecido a desktop**"
- "mejor que sea **similar a desktop**: la lista grande de palabras y cuando esté en view la palabra se ilumine"
- eligió "**el reloj, como desktop**" frente a agenda o slider de horas.

Regla: **primero busca cómo vive el paradigma de desktop en 390 px.** Solo si de verdad no cabe, cambia de paradigma.

---

## 1 · Método (cómo se dirige el rediseño móvil)

1. **Diagnóstico de la página entera en 390×844** (capturas a saltos de ~760 px con `tools/visual-qa/shot.mjs <url> 390 844 out.png <y>`).
   Una línea por sección: qué falla *de verdad* (repetición, apilado sin tensión, contenido duplicado, scroll largo).
2. **Una sección a la vez, en orden de página.** Nunca avanzar sin su "sigamos / siguiente".
3. **3 conceptos con preview ASCII sobre las 4 columnas** (AskUserQuestion con `preview`), recomendado primero. Si la sección
   ya existe en desktop, **la opción A es siempre "como desktop, adaptado".** Luego STOP.
4. **Construir solo en móvil.** Desktop intocable: toda clase nueva lleva su contraparte `lg:` que restaura lo de antes, o vive
   en un bloque `lg:hidden`. Verificar desktop con una captura después de cada cambio (ver §6, "hover tapado").
5. **Ajustes en caliente.** El usuario corrige en frases cortas ("aumenta un poquito la imagen", "el nombre encima", "no full
   width"). Se hace exactamente eso, se verifica y se reporta en 3 líneas. Sin rediseñar lo que no pidió.
6. **Aprobación → registrar** en `project-context/sections/<página>/context.md`: aprobado / quemado con cita.

---

## 2 · Principios de diseño móvil (destilados de sus correcciones)

| Principio | De dónde sale |
|:--|:--|
| **Paradigma de desktop, traducido** (§0) | "más parecido a desktop" ×3 |
| **Quitar interfaz, no apretarla.** Preguntas, listas repetidas y "resultado aparte" desaparecen en móvil si un solo componente cuenta lo mismo | "Tu papel": 2 preguntas + resultado + lista "Los 4 caminos" → un slider de 4 tarjetas |
| **Ver más de uno a la vez.** Los carruseles muestran 3 (activa + vecinas asomando), nunca una tarjeta sola a sangre | "tarjetas full width no, que se vea un poquito de la siguiente" → "que se vean 3" |
| **Infinito, pero honesto.** Si gira, el indicador vuelve al inicio al dar la vuelta | "que sí sea infinito pero que la barrita azul vuelva al inicio" |
| **Arranca por la primera.** El carrusel abre en el elemento 01 (con su vecina anterior asomando gracias al infinito) | "haz que la primera tarjeta del centro sea la primera" |
| **Minimalismo de controles.** Una línea de progreso + una burbuja con flecha > una regla de 8 puntos con etiquetas | "ese timeline tiene que ser más minimalista y agrega un botón burbuja flecha para next" |
| **No repetir información.** Si el reloj grande dice 11:00, la línea no repite "11:00" | (detectado en QA, aceptado) |
| **Titulares con peso.** Bajar un paso en la escala para que entren, pero no dos: un título demasiado pequeño pierde el hero | "ese título se ve demasiado pequeño" → `display-sm` ✗, `display` ✓ |
| **Animación simple donde la compleja se rompe.** Lo que en desktop es una ola línea a línea, en móvil es un fundido de bloque | "la animación de cambio de texto se ve horrible en mobile" |
| **Formas casi cuadradas.** Pestañas/toggles `rounded-md`, no píldoras | "que no sean circulares como pill, reduce su border radius" |
| **El estado vive dentro del control.** Un temporizador no es una barra suelta bajo las pestañas: rellena la pestaña que va a activarse | "esa barra debajo de las tabs se ve horrible, incluye ese timer en las tabs" |

---

## 3 · La retícula de 4 columnas

En el proyecto anterior el grid del DS tenía 6 columnas en móvil; el usuario pidió **4** ("para tener más posibilidades de diseño") — el método de 4 columnas se mantiene. Portfolio 2026 no tiene grid tokenizado: la retícula de 4 columnas es método, no token.
No se toca el token global (movería páginas aprobadas): se crea una retícula **local a la página**, idéntica en desktop.

```ts
// src/components/team/grid.ts
export const TEAM_GRID = "grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-[var(--space-fluid-xs)]";
```

Composiciones que funcionaron en 4 columnas (362 px útiles, ~79 px por columna):
- **3 + 1:** texto en cols 1-3, el objeto (CTA burbuja, imagen flotante) en la col 4. Patrón más repetido.
- **2 + 2:** texto/firma en cols 1-2, retrato cuadrado en cols 3-4.
- **4:** el "número protagonista" (el reloj) a todo el ancho.
- Si un objeto flota sobre el texto (col 4), el texto de cols 1-3 lleva **`pr-static-lg/xl`** para no pasar por debajo.

---

## 4 · Patrones aprobados (con receta)

### P1 · Carrusel de 3, infinito (hero y "Tu papel")
**Qué es:** la activa al centro, las vecinas asomando a ambos lados, veladas y sin info; swipe nativo; infinito; contador `01/0n`.
**Código:** `team/useInfiniteSnap.ts` (hook) + `team/SlideIndicator.tsx` + consumidores `case/CaseMobileSlider.tsx`, `role/RoleMobileSlider.tsx`.

```tsx
const { trackRef, onScroll, current, active, copies } = useInfiniteSnap(n, true); // 3 copias, arranca en la central
const items = Array.from({ length: copies }, (_, c) => list.map((x) => ({ x, c }))).flat();

<ul ref={trackRef} onScroll={onScroll}
  className="w-full flex gap-2 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-[22vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  {items.map(({ x, c }, k) => (
    <li key={`${c}-${x.key}`} aria-hidden={c !== 1 || undefined}   // solo la copia central para lectores
        className={`w-[56vw] max-w-72 shrink-0 snap-center transition-opacity duration-300 ${k !== current ? "opacity-70 [&_.gc-panel]:opacity-0 [&_.gc-chip]:opacity-0" : ""}`}>
      …tarjeta…
    </li>))}
</ul>
<SlideIndicator n={n} active={active} counter />
```
- **Medidas:** tarjeta `56vw` → padding lateral `(100-56)/2 = 22vw` (centra cualquiera). Para tarjetas de texto, `64vw` / `18vw`.
- **Infinito:** 3 copias; al detenerse el swipe (140 ms sin scroll) fuera de la copia central, `scrollLeft` salta en silencio a la
  equivalente del centro. `active = current % n` → el indicador vuelve al inicio solo.
- **Vecinas:** velo `opacity-70` (fotos) / `opacity-50` (texto) y **info oculta** (como el desktop, donde solo la activa la muestra).
- **Tarjeta pequeña = vidrio cerca del borde:** `GlassCard tight` (panel a `static-sm`, padding `static-md`, título `text-h3`).
  La copia desenfocada del vidrio se recoloca con el mismo inset (`blurLayer(inset)`), si no se desalinea del retrato.

### P2 · Escena de desktop adaptada con `contents` (Behind the scenes)
**Qué es:** el mismo escenario autónomo de desktop (reloj que corre solo, escena por tarea), recompuesto en 4 columnas.
**Código:** `day/DayStage.tsx`.
- El grupo izquierdo de desktop (`lg:flex lg:col-span-7 lg:flex-col`) es **`contents` en móvil**: se disuelve y cada hijo se coloca
  en la retícula (`col-span-full` el reloj; `col-span-2 row-start-2` la tarea; `col-span-2 row-start-3` la firma; el retrato
  `col-start-3 col-span-2 row-start-2 row-span-2`). En desktop esas clases de fila no actúan (el padre es flex). **Un DOM, dos
  composiciones, desktop intacto.**
- Altura estable: la tarea reserva `min-h-[5lh] lg:min-h-[2lh]` → cambiar de escena no mueve la página.
- Controles móviles: **línea de progreso + burbuja "siguiente"** (`w-static-2xl h-static-2xl rounded-full bg-brand-blue`, flecha
  `ArrowUR rotate-45`, `aria-label` desde i18n). La regla de 8 puntos con horas queda `hidden lg:block`.
- Varios `.dy-progress` (móvil + desktop): `querySelectorAll` y `gsap.set` sobre todos.

### P3 · Lista-foco con imagen flotante sticky (Signed)
**Qué es:** las palabras grandes; la que cruza el centro se ilumina (resto al 20 %) y una imagen cuadrada flota a la derecha
con el retrato de quien firma, nombre encima. "Como scrub pero muy optimizado".
**Código:** `TraitsTeam.tsx`.
```tsx
// Contenedor sticky de ALTO 0 (no ocupa sitio) — items-start + shrink-0 o el cuadro colapsa (ver §6)
<div aria-hidden className="lg:hidden col-span-full sticky top-[38svh] h-0 z-10 flex items-start justify-end pointer-events-none">
  <div className="tt-float w-32 shrink-0 flex flex-col gap-1">
    <span>{name}</span><span>{dept}</span>
    <div className="relative w-full shrink-0 aspect-square rounded-lg overflow-hidden shadow-lg">
      {items.map((it, i) => <CrewPortrait key={…} className={`absolute inset-0 transition-[opacity,scale] duration-500 ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />)}
    </div>
  </div>
</div>
```
- **Activación:** un `ScrollTrigger` por fila (`start: "top center", end: "bottom center", onToggle`) en `mm.add("all")` — sin scrub.
- **Cambio de imagen:** los N retratos ya montados y apilados; solo cambia opacidad/escala (sin remontar, sin cargar).
- **"Como scrub":** un único scrub sobre el transform del flotante (`y: REVEAL.md → -REVEAL.md`, `SCRUB.smooth`).
- Filas de altura fija (palabra + cita siempre presentes, solo cambia la opacidad) → cero saltos de layout.

### P4 · Fundido de bloque para cambios de texto (Bilingual)
**Qué es:** en móvil, cambiar de idioma = el párrafo que sale se desvanece subiendo, el otro entra desde abajo.
**Por qué:** la ola línea a línea (SplitText `mask: "lines"`) en pantalla estrecha da 5-6 líneas que **cortan distinto en cada
idioma**; las máscaras no coinciden y se ve desordenado. Desktop conserva la ola.
**Código:** `LanguagesTeam.tsx` — `gsap.matchMedia`: SplitText solo en `(min-width: 1024px)`; en móvil `autoAlpha` por bloque.

### P5 · Opciones como slider de tarjetas con halo (Your role)
**Qué es:** en vez de formularios (preguntas → resultado → lista), las N opciones son tarjetas en el carrusel P1, cada una
autosuficiente (número · etiqueta arriba, título y texto abajo, `aspect-[4/5]`, halo `GLOW` de marca). CTA único debajo.
**Código:** `role/RoleMobileSlider.tsx`; las preguntas/resultado/lista de desktop pasan a `hidden lg:*`.

### P6 · Hero compacto con CTA burbuja
- Titular **un paso** por debajo de desktop (`text-display md:text-display-lg`), no dos.
- Bajo el carrusel, en 4 columnas: subtítulo cols 1-3 + **CTA burbuja** col 4 (botón redondo azul con flecha, `aria-label` con el
  texto del CTA). Se inyecta en el slider con una prop `afterTrack` para que quede entre el indicador y el cierre.

---

## 5 · 🔥 Quemado en móvil (no proponer)

| Rechazado | Cita / motivo |
|:--|:--|
| Tarjetas a sangre / una sola tarjeta a todo el ancho | "tarjetas full width no, como ahora con su margen y que se vea un poquito de la siguiente" |
| Carrusel finito con un lado vacío al inicio | "pero que se vea la tarjeta a la izquierda" |
| Ola de SplitText línea a línea en móvil | "la animación de cambio de texto se ve horrible en mobile" |
| Pestañas píldora (`rounded-full`) | "que no sean circulares como pill" |
| Barra de temporizador suelta bajo un control | "se ve horrible, incluye ese timer en las tabs" |
| Regla de 8 hitos con horas en móvil | "tiene que ser más minimalista" |
| Lista vertical larga de filas iguales (agenda) para algo que en desktop es una escena | (se sustituyó por la escena adaptada) |
| Cajas apiladas casi idénticas con todo el contenido dentro | (Signed: 5 cajas → lista-foco + imagen flotante) |
| Formularios de 2 preguntas + resultado + lista repetida | (Your role → slider de opciones) |
| Título del hero dos pasos más pequeño | "se ve demasiado pequeño en mobile" |
| Avatares/fila de equipo como "visual" decorativo | "quita las visuales" (Bilingual) |

---

## 6 · Trampas técnicas que costaron tiempo

| Trampa | Síntoma | Solución |
|:--|:--|:--|
| **Sticky de alto 0 dentro de flex** | El hijo se estira a 0 de alto y el cuadro (aspect-square) colapsa: solo se ve el texto | `items-start` en el contenedor + `shrink-0` en el hijo y en el cuadro |
| **Elementos colgantes absolutos + sección siguiente** | Al quitar el padding inferior de una sección, la siguiente (con su fondo) **tapa** lo que cuelga (las horas bajo la regla). El DOM dice `display: block`, la captura no lo muestra | Reservar el hueco dentro del bloque (`pb-static-2xl`) y medir con `elementFromPoint`/capturas, no fiarse del estilo calculado |
| **Espaciado doble entre secciones** | Dos paddings sumados (~300 px) | Un solo dueño del espacio: la sección de arriba sin `pb`, la de abajo con `py` simétrico (medido: arriba = abajo) |
| **Comentario JSX antes del elemento raíz del `return`** | `TS1005 ')' expected` | Comentarios de sección como `//` antes del `return`, no `{/* */}` delante de la raíz |
| **Tailwind `scale-*`/`translate-*` + GSAP** | Tailwind v4 usa las propiedades `scale`/`translate`, GSAP `transform`: se componen y el elemento queda a escala 0 o doble desplazado | No poner estado inicial con utilidades de transform en lo que anima GSAP; usar `gsap.set` o `style` |
| **`useRef` escrito en render** | ESLint `react-hooks/refs` | Derivar una clave estable (`timesKey`) o leer en efectos |
| **Recorte de código con búsqueda de texto** | Un `return (` coincide con `return () =>` y deja código viejo | Anclar las búsquedas al contexto exacto (`return (\n    <div`) y compilar inmediatamente |
| **Portapapeles en IP de red** | "Copiar configuración" falla abriendo `http://192.168.x.x:3000` (contexto no seguro) | Probar en `localhost`; los paneles guardan en `localStorage` — recuperable de `Chrome/User Data/Default/Local Storage/leveldb/*.log` |
| **Capturas durante una transición** | Se ve "roto" (fondo activo a mitad, párrafo semi-transparente) | Medir con `evalpage.mjs` (posiciones, opacidades a t=200 ms y t=1500 ms) antes de concluir |
| **Selectores con `:` de Tailwind en scripts de QA** | `'.lg:hidden'` no es un selector válido | Buscar por estructura (`.find(e => e.offsetParent)`) o escapar `\\:` fuera de heredocs |

---

## 7 · Verificación (obligatoria antes de reportar)

1. `npx tsc --noEmit` y `npx eslint src/components/<página>` limpios.
2. **Captura 390×844** de la sección (y del momento clave: tras swipe, con el reloj corriendo, con un rasgo activo).
3. **Captura 1440×900 de la misma sección** — desktop no puede haber cambiado.
4. **Medir el comportamiento**, no solo mirarlo: `evalpage.mjs` con scripts que mueven `scrollLeft`, pulsan botones y leen
   contador/índice/opacidad. Ejemplos de esta sesión en el scratchpad: bucle infinito (inicio `01/06`, antes de la primera
   `06/06`, después de la última `01/06`), burbuja siguiente (`08:00 → 09:30`), simetría de padding (arriba = abajo).
5. Reportar en corto: qué cambió, qué se midió, qué no se probó (p. ej. swipe real con el dedo).

---

## 8 · Checklist rápido de una sección móvil "Portfolio 2026-level"

- [ ] ¿El paradigma es el de desktop traducido a 4 columnas? (o hay una razón para no serlo)
- [ ] ¿Se eliminó la interfaz redundante (preguntas, listas repetidas, datos duplicados)?
- [ ] ¿Los carruseles muestran 3, son infinitos, arrancan en el 01 y el indicador vuelve al inicio?
- [ ] ¿Altura estable al cambiar de estado (sin saltos de layout)?
- [ ] ¿Solo `transform`/`opacity`, un toggle por fila, como mucho un scrub ligero, sin pin?
- [ ] ¿Controles mínimos (línea + burbuja), formas `rounded-md`, estado dentro del control?
- [ ] ¿Desktop verificado idéntico con captura?
- [ ] ¿Aprobado → registrado en `sections/<página>/context.md`?
