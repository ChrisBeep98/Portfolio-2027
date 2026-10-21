# 🎛️ Protocolo: Debug Panel (Portfolio 2026)

**El comando para construir, sobre cualquier sección, un panel de debug bonito, bien diseñado y muy visual que deje al usuario
elegir *usándolo* — con muchas opciones, incluidas las que no se le habían ocurrido.** Invocable: `/debug-panel <sección>`.

> **Por qué existe:** en /team las decisiones más difíciles se resolvieron en minutos con un panel (el layout de "Bilingual" por
> columnas; la física del carrusel 3D del caso, tras 4 rondas de conceptos escritos rechazados). El usuario decide moviendo, no leyendo.
> **Diferencia con `live-editing-protocol`:** aquel envuelve bloques con controles de grilla genéricos. Este **analiza la sección,
> descubre sus ángulos**, diseña un panel a medida con presets + controles finos, y trae el ciclo completo hasta la purga.
> **Librería de piezas:** [`DEBUG-PANEL-ARCHITECT/`](../WorkFlow-Docs/Design-Agent-Skills/DEBUG-PANEL-ARCHITECT/README.md) (17 módulos).
> **Ejemplos reales (en cuarentena, para copiar — locales: `_quarantine/` está fuera de git):** `Portfolio2026/_quarantine/team/languages-debug/` (mapa de 12 columnas
> arrastrable) y `Portfolio2026/_quarantine/team/case-debug/DeckDebugPanel.tsx` (presets + sliders agrupados + congelar).

---

## FASE 1 — Leer la sección (silencioso)

Componente completo + sus subcomponentes + su `context.md` (aprobado, congelado, QUEMADO) + el `TASTE-LEDGER`.
Identifica qué es: layout tipográfico, carrusel/galería, escena animada, retícula, formulario, hero… y qué está congelado
(lo aprobado **no** entra en el panel salvo que el usuario lo pida).

## FASE 2 — La caza de ángulos (lo que el usuario no pidió)

Recorre SIEMPRE esta lista y quédate con todo lo que aplique a la sección. El usuario pidió una cosa; el panel le enseña el espacio entero.

| Ángulo | Qué se puede abrir |
|:--|:--|
| **Composición** | columnas de inicio/fin por bloque (mapa de 12 arrastrable), fila, alineación del bloque y del texto, orden, asimetría |
| **Escala tipográfica** | token de cada texto (`text-display-lg/display/display-sm/h1…`), peso (ligero ↔ token), interlineado, ancho de medida |
| **Densidad** | mostrar/ocultar subtítulo, etiquetas, cifras; número de elementos visibles; versión corta del texto |
| **Espacio** | padding de sección (`py-section-*`), gaps (`static-*`), aire entre bloques — siempre por escalón de token |
| **Superficie y color** | fondo (papel / oscuro / azul de marca), bordes (hairline / stroke / ninguno), halos y texturas, radios (`rounded-md/lg/xl`) |
| **Física / forma** | separación, arco, profundidad, giro, escala, velo de las vecinas, perspectiva (como el carrusel del caso) |
| **Movimiento** | tipo de entrada (Text-Birth / Curtain / Layered / fundido de bloque), duración y easing por **token**, stagger, scrub sí/no, autoplay y su ritmo |
| **Interacción** | hover (revela / eleva / ninguno), click, autoplay vs manual, pausa al hover, infinito sí/no |
| **Móvil** | versión móvil del mismo bloque (3 arriba / 1 a sangre / slider / lista-foco), tamaño de tarjeta, contador |
| **Paradigma entero** | 3-5 presets con nombre que cambian la sección completa (no solo un valor) |

**Regla de los ángulos nuevos:** al menos **2 presets o controles** deben ser de dimensiones que el usuario NO mencionó, marcados
en el panel con la etiqueta `ángulo nuevo`. Si hay tiempo, saca uno de `/awwwards-research` o de las recetas de `/awwwards-cinematic-acts`.

## FASE 3 — Diseñar el modelo de configuración

```ts
// <seccion>/debug<Nombre>.ts  — todo con prefijo __dbg, entre los comentarios de bloqueo (purga fácil)
export interface SectionConfig { … }            // una propiedad por control
export const DEFAULT: SectionConfig = { … };    // REPRODUCE EXACTAMENTE lo que hay hoy (abrir el panel no cambia nada)
export const PRESETS: Record<string, SectionConfig> = { "Actual": DEFAULT, "…": {…}, … };   // 3-5 con nombre
```
- **Valores del DS como opciones, no números libres:** tamaños, espacios, radios, duraciones y easings se eligen de la escala de
  tokens (segmented/select). Así lo que el usuario elija **ya es válido en producción**. Números libres solo para física de
  composición (separación, arco, profundidad…), declarados como margen creativo.
- Si el `DEFAULT` cambia algo respecto a hoy, está mal: corrígelo antes de seguir.

## FASE 4 — Cablear en vivo (sin reconstruir)

- La sección lee la config de una **ref** en cada frame/render (`cfgRef.current`): mover un slider repinta al instante, sin
  recrear timelines. Solo lo que exige reconstruir (duraciones de un loop) va en las dependencias del efecto.
- Layout por **variables CSS** aplicadas solo en el breakpoint objetivo (`lg:[grid-column:var(--dbg-col)]`…): móvil intacto.
- Contornos con etiqueta de color por bloque cuando el panel está abierto; retícula de 12 columnas superpuesta conmutable.
- **Persistencia en `localStorage`** (clave `__dbg_<página>_<sección>`) en cada cambio — el trabajo del usuario sobrevive a
  recargas y se puede recuperar aunque falle todo lo demás.
- **Solo desarrollo:** `{process.env.NODE_ENV !== "production" && <Panel … />}`.

## FASE 5 — El diseño del panel (siempre este)

Cajón flotante a la derecha, `w-[360px]`, `top/right/bottom-3`, `rounded-2xl`, fondo `#0E1013` al 92 % + `backdrop-blur-2xl`,
borde `white/10`, sombra larga. Pestaña vertical azul en el borde derecho para abrirlo (`◧ <Sección>`).

```
┌──────────────────────────────────┐
│ DEBUG · SOLO DEV            ( ✕ )│  cabecera: etiqueta mono azul, título, 1 línea de ayuda
│ Carrusel 3D de "El caso"         │
├──────────────────────────────────┤
│ [Actual][Mazo][Lineal][Coverflow]│  presets en rejilla 2×n (el activo en azul)
│ ┌ MODO ────────────────────────┐ │  tarjetas por grupo (bg white/3, borde white/10, rounded-xl)
│ │ Congelar             (●  )   │ │  toggles
│ └──────────────────────────────┘ │
│ ┌ FORMA ───────────────────────┐ │
│ │ Separación        [0.62 ×w]  │ │  slider con valor en chip azul mono
│ │ ━━━━━━━━━━●────────────────  │ │
│ │ Bloque   [ ⫷ | ⫶ | ⫸ ]        │ │  segmented con iconos SVG mínimos
│ └──────────────────────────────┘ │
│ ┌ COMPOSICIÓN ─────────────────┐ │
│ │ ▢▢▢■■■■■■■■▢  col 4→11       │ │  mapa de 12 columnas arrastrable (pointer capture)
│ └──────────────────────────────┘ │
├──────────────────────────────────┤
│ [ Reset ]  [ Copiar configuración ]│  pie fijo
└──────────────────────────────────┘
```
Controles (copiar de los ejemplos en cuarentena): `Slider` (pista con relleno azul hasta el valor), `Segmented` (con iconos),
`Toggle`, `PresetGrid`, `ColumnMap` (arrastre con `setPointerCapture` y columna por `clientX` — funciona con ratón y táctil y
aunque el puntero salga de la celda), `Group` (tarjeta con título mono). Etiquetas de los ángulos nuevos: chip `ángulo nuevo`.

**Extras que siempre suman:**
- **A/B:** botón "Guardar A" / "Ver A ↔ actual" para comparar dos estados sin perder ninguno.
- **Congelar** el movimiento autónomo para mirar con calma.
- **En móvil** (< 1024 px) el cajón pasa a hoja inferior a pantalla completa (`inset-x-0 bottom-0 max-h-[70svh]`).

## FASE 6 — Copiar que SIEMPRE funcione

`navigator.clipboard` no existe fuera de contexto seguro (abrir la página por la IP de la red, p. ej. `http://192.168.x.x:3000`).
```ts
const copy = async (text: string) => {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try { const ta = Object.assign(document.createElement("textarea"), { value: text }); document.body.append(ta); ta.select();
        const ok = document.execCommand("copy"); ta.remove(); if (ok) return true; } catch {}
  return false; // → mostrar el JSON en un <textarea readOnly> dentro del panel para copiarlo a mano
};
```
Lo copiado incluye **las clases/valores listos para producción** (p. ej. `lg:col-start-4 lg:col-span-8`) + el JSON.
Si aun así se pierde: la config está en `localStorage` — en Chrome, `User Data/Default/Local Storage/leveldb/*.log` (buscar la clave).

## FASE 7 — Entregar y esperar

Reporte corto: qué controla el panel, qué presets hay, **qué ángulos nuevos añadiste y por qué**, cómo abrirlo (en `localhost`).
Verifica el panel con una captura (abierto, con un preset aplicado) y con una prueba de arrastre/slider real (CDP
`Input.dispatchMouseEvent`). Luego espera a que el usuario juegue.

## FASE 8 — Fijar y purgar (cuando el usuario elija)

1. La config elegida pasa a ser la constante de producción (`DEFAULT` → la constante real de la sección) o a clases fijas.
2. Panel + archivo de config → `_quarantine/<página>/<sección>-debug/` (nunca borrar: sirven de plantilla).
3. `grep -rn "__dbg\|DEBUG\|🧪" <carpeta>` = 0 resultados; `tsc` + ESLint limpios; captura de la sección sin panel.
4. Registrar en `sections/<página>/context.md` lo elegido y los presets descartados (como quemados si los rechazó).

---

**PROMPT PARA EJECUTAR (o `/debug-panel <sección>`):**

> "Activa el **Debug Panel Protocol** (`DEBUG-PANEL-PROTOCOL.md`) sobre **[SECCIÓN]**. Haz la caza de ángulos, constrúyeme un
> panel bonito con presets y controles finos (incluidos ángulos que no te pedí) y avísame cuando esté listo para jugar.
> Lo que más me interesa probar: **[opcional: layout / tamaños / movimiento / móvil…]**."
