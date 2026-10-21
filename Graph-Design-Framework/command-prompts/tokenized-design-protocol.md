# 🎯 Protocolo: Diseño Tokenizado en Vivo (Token-Live Mode)

Usa este protocolo cuando estés **creando o refactorizando UI rápido** y quieras que la IA use el Design System **desde el primer trazo** — sin hardcodear y sin el viaje de vuelta al Tokenizer. Es el **punto medio** entre los protocolos creativos (`AWWWARDS-CINEMATIC-ACTS`, `AWWWARDS-REDESIGN-SECTION-PROTOCOL`) y la auditoría pesada del `Tokenizer.md`.

> **Diferencia clave:**
> - `Tokenizer.md` = **auditoría** por fases, después de escribir (diagnóstico → fix). Correctivo.
> - **Este protocolo** = **disciplina en caliente**, mientras escribes. Preventivo. No hardcodeas, así que no hay que limpiar.
>
> **Principio rector:** *La creatividad vive en la **composición, la narrativa y el movimiento**. Las **medidas** (tamaños, espaciados, sombras, colores) **siempre** salen de tokens.* Rompe la caja en layout, NO en la escala.

---

## 🚦 PRE-FLIGHT (una sola lectura, opcional)

El quick-reference de abajo te hace **autosuficiente** para trabajo rápido. Abre las fuentes completas solo si algo no está en la tabla:
- `Graph-Design-Framework/project-context/sections/design-system/Design-System.md` — inventario completo (Single Source of Truth).
- `Graph-Design-Framework/WorkFlow-Docs/Design-Agent-Skills/Tokenizer.md` — blacklist y las 5 dimensiones (usar si necesitas auditar).
- `Graph-Design-Framework/command-prompts/vertical-spacing-protocol.md` — ritmo vertical entre secciones (single-owner).
- Motor real: `src/styles/globals.css` (visuales) + `src/lib/motion.ts` (cinemáticos).

---

## 📋 QUICK REFERENCE — Vocabulario de tokens (Portfolio 2026 DS)

### ✒️ Tipografía — 2 familias, 3 roles
- **Display · Encabezados → Manrope (700 móvil / 600 desktop, horneado en el token):** `text-display-3xl` · `text-display-2xl` · `text-display-xl` · `text-display-lg` · `text-display` · `text-display-sm` · `text-display-xs` · `text-h1`…`text-h7`.
- **Cuerpo · UI → Manrope (heredado del body, weight 300; sm/xs 400):** `text-subtitle` · `text-body-2xl` · `text-body-xl` · `text-body-lg` · `text-body`/`text-body-md` · `text-body-sm` · `text-body-xs` · `text-caption`.
- **Meta · Código → JetBrains Mono:** `text-data` (cifras/años, 600) · `text-meta` (hex/IDs/fichas, 500) · `text-overline` (eyebrows, 600) · `text-ui-label` (botones/tags, 500).
- ❌ Prohibido: `text-[Npx]`, `text-2xl/text-lg/...` genéricos de Tailwind, `font-[family]` o `style={{fontFamily}}` inline, y **cualquier `tracking-*`/`leading-*` sobre título tokenizado** (el token ya los trae).
- ✅ Excepción firma cinética (shipped, congelada): monolitos `font-black uppercase tracking-tighter` en `vw` (Header, Marquee, Process, Footer). Trabajo nuevo: token display + peso declarado como margen creativo.

### 📐 Espaciado horizontal (marco de página)
- `.px-frame` — contenedores principales (`--px-frame`: 6em desktop / 0.75em móvil). Nunca `px-4`, `px-[20px]` en contenedores de página.
- **Mandato móvil 14px:** tarjetas y bloques de texto en móvil con `px-[14px]`; media edge-to-edge (padding en los hijos de texto, no en el contenedor de imagen).

### 📏 Ritmo vertical (entre secciones) — regla single-owner
- `.section-gap` (`--section-gap`: 8em desktop / 3.25em móvil). La sección superior posee el gap (`pb`); la inferior arranca en `pt-0`.
- Entre bloques: escala rem coherente con `--block-gap` (2em/1.5em) · contenido interno con `--content-gap` (1em/0.75em).
- Nunca `py-20`, `mt-[80px]`, `pt-[10vh]` para ritmo. (Detalle y excepciones shipped: `vertical-spacing-protocol.md`.)

### ↔️ Gaps de layout (flex/grid)
- Sin tokens fluidos dedicated: micro-espaciado con escala rem estándar `gap-1`…`gap-6`, consistente con `--block-gap`/`--content-gap`.

### 🧱 Márgenes/paddings de componente
- Escala rem estándar de Tailwind (4/8/16/24/32/48px = `p-1`…`p-12`). Nunca mágicos en px (`p-[22px]`, `mt-[37px]`).

### 📦 Anchos máximos (wrappers maestros)
- Sin token dedicado — patrones shipped: `max-w-[1600px]` (About), `max-w-screen-2xl` (Process), `max-w-6xl`/`max-w-4xl` (bloques de texto). Wrapper nuevo: alinearse a un patrón existente o proponer token vía `update-design-system-protocol.md`.

### 🌫️ Elevación / sombras
- Sin sistema tokenizado todavía. Permitido: `--card-shadow` (contextos `theme-invert`). `shadow-*` genéricos solo con margen creativo declarado.

### 🔲 Grid
- Sin grid tokenizado: alineación a retícula invisible **12 col desktop / 4 col móvil** (método `MOBILE-PATTERN-DESIGN-DIRECTOR`). Split-scroll del showcase tiene su CSS propio (`.panel` 50vw).

### 🎨 Color (semántico, bimodal)
- **Superficies:** `bg-background` (página) · `bg-surface` (capas sutiles/glass) · `.glass-engine` (vidrio: un solo blur por pantalla).
- **Texto:** `text-foreground` (invierte por modo) · atenuados con alfa `text-foreground/70`…`/30` (nunca `opacity-*` sobre texto).
- **Acento:** `primary` (`#a855f7`, pendiente de confirmación de dirección) + alfas `primary/30`.
- **Glitch (firma cinética):** `.text-stroke-cyan` / `.text-stroke-pink` / `.text-stroke-black`. **Hollow Mandate:** strokes con `mix-blend-mode` siempre en `hsl()`/`rgb()`, nunca colores nombrados.
- **Secciones invertidas:** `.theme-invert` (resuelve `bg-background`/`text-foreground` anidados en cascada).
- ❌ Prohibido: `bg-gray-100`, `text-blue-500`, `text-black`/`text-white` crudo en código nuevo (shipped congelado se tolera), cualquier `#hex` inline que no sea token.

> **Directiva de marca:** en secciones nuevas, teje el **acento púrpura** y el **glitch cyan/pink** como firma en detalles y cierres — no como fondos dominantes.

---

## ✅ REGLA "AL ESCRIBIR" (on-write)

Antes de teclear cualquier `className`, mapea mentalmente: *"¿esto es tamaño / espaciado / color / sombra? → ¿qué token lo cubre?"* Si existe token, úsalo. Si dudas, sube un peldaño al token más cercano.

**Excepciones permitidas (no son violación):**
1. **Mega-tipografía decorativa/cinética** >100px o en `vw` (shipped: `text-[15vw]`, `text-[13vw]`, `text-[12vw]`) — la firma "The Wall" vive en vw.
2. **Mecánicas de layout/motion sin token semántico:** `w-[85vw]`, `h-[65vh]`, tracks `500vh`, offsets de sticky, transforms de GSAP, `mt-[8em]` shipped de About, `rounded-[36px]` del panel invertido. Son geometría/animación, no escala del DS.
3. **Alfas sobre tokens:** `bg-primary/10`, `border-foreground/20`, `bg-background/40`.
4. Valores realmente únicos → en `rem`, nunca `px` (salvo `1px` de hairline y el mandato móvil `14px`).

---

## 🎨 MARGEN CREATIVO (permitido, con reporte OBLIGATORIO)

El objetivo NO es amordazar la creatividad. Si el diseño gana de verdad con un valor, color, gradiente o medida que **no existe en el DS**, **estás autorizado a usarlo** — pero nunca en silencio. Toda desviación se **declara** para que el usuario decida si se queda o se promueve a token.

**Reglas del margen:**
1. Primero intenta resolverlo con tokens (o subiendo/bajando un peldaño). Solo desvíate si el token más cercano **empeora** el resultado.
2. Cada desviación va en `rem`/`vw` (nunca `px` salvo hairline/14px móvil) y, si es color, respeta la bimodalidad (light/dark).
3. **Decláralas todas** en un reporte al final. Una desviación **no declarada = violación**; una declarada = decisión de diseño válida.
4. Si una desviación se repite o se vuelve patrón → propón promoverla a token vía `update-design-system-protocol.md` (como `@utility` top-level).

**Formato del reporte (obligatorio si hubo alguna):**

```markdown
## 🎨 REPORTE DE MARGEN CREATIVO
| # | Elemento | Valor usado (fuera de token) | Token más cercano | Por qué me salí | ¿Promover a token? |
|:--|:--|:--|:--|:--|:--|
| 1 | Glow del hero | radial `#a855f7→transparent` 40vw | (ninguno) | acento de marca difuso, no hay token de glow | Sí → `--gradient-glow-brand` |
```

Si NO hubo desviaciones, dilo: **"Sin margen creativo: todo salió de tokens."**

---

## 🔍 SELF-AUDIT (10 segundos, antes de entregar)

Escanea tu propio output. Si aparece algo de la izquierda, corrígelo **antes** de mostrar el código:

| Grep en tu output ❌ | Salvo que sea… |
|:--|:--|
| `text-[` con `px` | mega-tipografía en `vw` o mandato `14px` móvil |
| `px-[`, `py-[`, `p-[`, `m-[`, `gap-[` con px/rem | mecánica de layout (vw/vh/%) o excepción shipped |
| `text-xs/sm/base/lg/xl/2xl…` (genérico Tailwind) | nunca |
| `shadow-md/lg/xl/2xl` | margen creativo declarado |
| `#hex` inline, `bg-gray/slate/*`, `text-black/white` | nunca en código nuevo (usa token semántico) |
| `mt-`, `py-` arbitrario para separar secciones | `.section-gap` single-owner |
| `window.lenis` (como instancia) | nunca — la instancia es `window.__lenis` |

Cierre obligatorio, uno de dos:
- **"✅ Token-Live: 0 valores hardcodeados."** (todo salió de tokens), o
- **"✅ Token-Live: N desviaciones creativas — ver Reporte de Margen Creativo."** (hubo margen, y está declarado arriba).

Lo único prohibido es un valor fuera de token **sin declarar**.

---

**PROMPT PARA EJECUTAR EL PROTOCOLO:**

> "Activa el **Token-Live Mode** (`tokenized-design-protocol.md`) para esta tarea. Diseña/refactoriza con toda la libertad creativa que quieras en **composición, narrativa y movimiento**, y por defecto TODAS las medidas (tipografía, espaciado horizontal/vertical, gaps, márgenes/paddings, sombras y colores) salen de los tokens del Design System — desde el primer trazo. **Tienes margen creativo:** si un valor fuera de token mejora de verdad el diseño, úsalo, pero **decláralo** en el *Reporte de Margen Creativo* (nunca en silencio). Usa el quick-reference embebido; abre `Design-System.md` solo si algo no está ahí. Teje el acento púrpura y el glitch como firma, no como fondo. Al terminar, corre el **Self-Audit** y confírmame *'Token-Live: 0 hardcodeados'* o *'N desviaciones creativas declaradas'* junto al código.
>
> Tarea: **[INSERTAR SECCIÓN/COMPONENTE]**."

***
