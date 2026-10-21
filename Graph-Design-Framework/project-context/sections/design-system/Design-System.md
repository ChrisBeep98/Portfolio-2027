# PORTFOLIO 2026 // DESIGN SYSTEM INVENTORY

Este archivo es la **Única Fuente de Verdad (Single Source of Truth) Documental** del portfolio de Christian Sandoval. Debe estar sincronizado en todo momento con `src/styles/globals.css` (tokens visuales) y `src/lib/motion.ts` (tokens cinemáticos).

> **⚠️ ATENCIÓN AGENTE (TOKENIZER):**
> Nunca uses valores fijos ni arbitrarios (Tailwind default). Si un color o tamaño no está en esta tabla, NO lo puedes usar. Identidad: **Cinematic Architect / Glass Engine v2.2 / Binary Soul** — Light = papel suizo, Dark = simulación.

---

## 1. TIPOGRAFÍA (Sistema de 2 Familias, 3 Roles)

| Rol | Familia | Uso | Pesos |
|:---|:---|:---|:---|
| **Display · Encabezados · Cuerpo** | **Manrope** (variable 200-800, `next/font` → `--font-display`) | Títulos cinemáticos y toda la lectura funcional. El `body` la hereda. | Display/H: 700 móvil · 600 desktop — Body: 300 (400 en ≤sm) |
| **Meta · Código** | **JetBrains Mono** (`next/font` → `--font-mono`) | Solo overlines, labels de UI, cifras y metadata técnica. | 400 · 500 · 600 |

> **Regla de anatomía (heredada de Epicare):** el token YA trae `font-size` (clamp), `line-height` y `letter-spacing`. **No añadas `tracking-*` ni `leading-*` a un título tokenizado.** Los overrides manuales fueron la plaga del proyecto anterior (72 dispersos).
>
> **Regla Tailwind v4 (lección Epicare #120):** los tokens viven como `@utility` top-level en `globals.css`. Con CSS plano en `@layer utilities`, los prefijos responsivos/de estado (`md:`, `dark:`, `hover:`) NO se generan y colapsan silenciosamente al token base.

**Display + Encabezados → Manrope (weight 700 móvil / 600 desde 48rem):**

| Token | Tamaño (clamp) | Interlineado | Tracking | Uso |
|:---|:---|:---|:---|:---|
| `.text-display-3xl` | clamp(6rem, 12vw, 12rem) | 0.9 | -0.04em | Monolitos cinemáticos, hero principal (escala "Wall" 12em+) |
| `.text-display-2xl` | clamp(4.5rem, 8vw, 8rem) | 0.95 | -0.035em | Títulos gigantes |
| `.text-display-xl` | clamp(3.5rem, 6vw, 6rem) | 1 | -0.035em | Portadas / heroes de case study |
| `.text-display-lg` | clamp(3rem, 5vw, 4.5rem) | 1.05 | -0.03em | Headers principales de sección |
| `.text-display` | clamp(2.5rem, 4vw, 3.5rem) | 1.1 | -0.025em | Headers secundarios |
| `.text-display-sm` | clamp(2rem, 3vw, 2.5rem) | 1.15 | -0.02em | Headers de tarjetas gigantes |
| `.text-display-xs` | clamp(1.375rem, 2vw, 1.75rem) | 1.2 | -0.015em | Lectura premium destacada |
| `.text-h1` | clamp(1.75rem, 2.5vw, 2.25rem) | 1.2 | -0.02em | Títulos de sección |
| `.text-h2` | clamp(1.5rem, 2vw, 1.875rem) | 1.25 | -0.015em | Subtítulos de sección |
| `.text-h3` | clamp(1.25rem, 1.5vw, 1.5rem) | 1.3 | -0.01em | Títulos de tarjetas |
| `.text-h4` | clamp(1.1875rem, 1.25vw, 1.25rem) | 1.4 | -0.005em | Títulos de grupos pequeños |
| `.text-h5` | 1.125rem | 1.5 | -0.005em | Etiquetas grandes |
| `.text-h6` | 1rem | 1.5 | 0 | Títulos micro / datos secundarios |
| `.text-h7` | 0.875rem | 1.6 | 0 | Títulos nano / opciones de menú |

> **Firma cinética histórica (conservada, no tokenizada aún):** `Header.tsx` y el Hero usan `font-black` (900), `uppercase` y `tracking-tighter` inline — es la firma agresiva "Binary Soul" (Kinetic Typography "The Wall"). Los componentes existentes siguen intactos; el trabajo NUEVO usa tokens. Para un monolito aggressivo: `.text-display-3xl` + override declarado de `font-black` (Reporte de Margen Creativo).
>
> **Jerarquía cruzada conocida (heredada, sin resolver):** `display-xs` (22-28px) es menor que `h1` (28-36px); `h4`/`h5` casi iguales. Cambiar tamaños movería el sitio; se documenta y se convive.

**Cuerpo · UI → Manrope (todos con `text-wrap: pretty`):**

| Token | Tamaño | Interlineado | Peso | Tracking | Uso |
|:---|:---|:---|:---|:---|:---|
| `.text-subtitle` | clamp(1.125rem, 2vw, 1.5rem) | 1.5 | 300 | 0 | Bajadas / subtítulos largos |
| `.text-body-2xl` | 1.5rem | 1.45 | 300 | -0.01em | Párrafos destacados |
| `.text-body-xl` | 1.25rem | 1.5 | 300 | -0.005em | Párrafos grandes |
| `.text-body-lg` | 1.125rem | 1.6 | 300 | 0 | El párrafo estándar |
| `.text-body` / `.text-body-md` | 1rem | 1.6 | 300 | 0 | Párrafos (idénticos: usa `.text-body`) |
| `.text-body-sm` | 0.875rem | 1.6 | **400** | 0.005em | Texto secundario |
| `.text-body-xs` | 0.75rem | 1.6 | **400** | 0.01em | Micro-texto |
| `.text-caption` | 0.75rem | 1.5 | 400 | 0.01em | Notas al pie, timestamps |

> `sm`/`xs` suben a 400: Manrope por debajo de 14px en 300 pierde contraste (x-height menor que Inter Tight, de donde viene la anatomía).

**Meta · Código → JetBrains Mono:**

| Token | Tamaño | Interlineado | Peso | Tracking | Uso |
|:---|:---|:---|:---|:---|:---|
| `.text-overline` | 0.875rem, uppercase | 1.2 | 600 | 0.1em | Eyebrows / categorías |
| `.text-ui-label` | 0.875rem, uppercase | 1.2 | 500 | 0.05em | Botones y tags |
| `.text-data` | 1rem, **tabular-nums** | 1.2 | 600 | 0 | Cifras, años, contadores |
| `.text-meta` | 0.75rem, **tabular-nums** | 1.5 | 500 | 0.01em | Hex, IDs, versiones, fichas técnicas |

> Legacy: `.text-mono` (mono 12px uppercase tracking 0.2em opacity 50%) sobrevive en `globals.css` — sin usos actuales; en código nuevo usa `.text-overline` o `.text-meta`.

---

## 2. COLOR (Binary Soul — Bimodal SIEMPRE)

El sistema invierte entre **The Gallery** (light) y **The Simulation** (dark). Prohibidos los colores genéricos de Tailwind (`bg-gray-100`, `text-blue-500`) salvo los acentos glitch documentados abajo.

**Núcleo semántico (variables en `globals.css`, mapeadas en `@theme`):**

| Token | Light (Gallery) | Dark (Simulation) | Uso |
|:---|:---|:---|:---|
| `--background` / `bg-background` | `#F2F2F0` (Swiss Light Grey) | `#050505` | Fondo de página |
| `--foreground` / `text-foreground` | `#050505` (Deep Black) | `#EDEDED` | Tinta principal |
| `--surface` | `rgba(0,0,0,0.03)` | `rgba(255,255,255,0.03)` | Superficies sutiles / glass |
| `--color-primary` | `#a855f7` (púrpura) | ídem | Acento de marca, selection (`primary/30`) |

> ⚠️ **Púrpura `#a855f7` marcado como acento de marca por censo de código (2026-10-20) — pendiente de confirmación de dirección.** Si la marca dicta otro acento, se cambia SOLO aquí y en `@theme`.

**Acentos glitch (capas RGB del nombre principal, Acto 1 del Hero):**

| Utilidad | Color | Rol |
|:---|:---|:---|
| `.text-stroke-cyan` | `#06b6d4` (2px stroke) | Canal glitch frío |
| `.text-stroke-pink` | `#ec4899` (2px stroke) | Canal glitch cálido |
| `.text-stroke-black` | `#000000` (2px stroke) | Hollow en light |

**Hollow Mandate (regla crítica heredada de Binary Soul):** al combinar `-webkit-text-stroke` con `mix-blend-mode: difference`, el color del stroke DEBE escribirse en `hsl()` o `rgb()` — **nunca colores nombrados** (`black`, `white`, `cyan`): el difference-blend los invierte al color equivocado en light mode y arruina el efecto Hollow.

**Theme Inversion (`theme-invert`, hard-force):** secciones completas que invierten el tema (dark section en light mode y viceversa). Redefine `--background`/`--foreground`/`--card-bg`/`--card-shadow` en cascada con `!important`; las utilidades `bg-background`/`text-foreground` anidadas resuelven contra el contexto invertido. Dark card: `#0A0A0A` sin sombra; light card: `#FFFFFF` con sombra suiza `0 20px 40px -10px rgba(0,0,0,0.04)`.

**Modo por defecto:** Light. El script inline de `layout.tsx` lee `localStorage('theme')` y aplica la clase `.dark` + `data-theme` antes del paint (cero flash). Variante: `@custom-variant dark (&:where(.dark, .dark *))`.

---

## 3. ESPACIADO Y LAYOUT (Elastic System — Zero Px Policy)

El portfolio usa un sistema **elástico en `em`** (no el clamp de Epicare). Todo margen estructural sale de estas variables; los valores responden solos en el breakpoint 768px:

| Variable | Desktop | Mobile (<768px) | Utilidad |
|:---|:---|:---|:---|
| `--px-frame` | 6em | 0.75em | `.px-frame` (padding horizontal global) |
| `--section-gap` | 8em | 3.25em | `.section-gap` (padding vertical de sección) |
| `--block-gap` | 2em | 1.5em | Separación entre bloques |
| `--content-gap` | 1em | 0.75em | Separación interna de contenido |

**Mandato de Margen 14px (Mobile):** tarjetas y bloques de texto respetan `px-[14px]` en móvil para consistencia global (herencia `framework-old/docs/RESPONSIVE-STRATEGY.md`). **Edge-to-Edge:** los contenedores de imagen NO llevan padding — los hijos de texto lo llevan independiente.

**Grid:** sin grid universal tokenizado (a diferencia de Epicare). El showcase usa el sistema de paneles `50vw` de `globals.css` (split-scroll, sección 5). Regla práctica: alineación a retícula invisible de 12 col en desktop, 4 col en móvil (MOBILE-PATTERN-DESIGN-DIRECTOR).

**Regla Zero-Px adaptada:** prohibido `mt-[37px]`, `p-[22px]` y demás mágicos inline. Medidas estructurales → variables elásticas; detalles finos → escala `rem` estándar de Tailwind (0.25/0.5/1/1.5/2/3rem). Desviación = declarada en comentario (Reporte de Margen Creativo).

---

## 4. GLASS ENGINE + ATMÓSFERA

| Utilidad | Receta | Uso |
|:---|:---|:---|
| `.glass-engine` | `background: var(--surface)` + `backdrop-filter: blur(12px) saturate(180%)` + `border: 1px solid rgba(255,255,255,0.08)` | Tarjetas/píldoras de vidrio. UN solo blur por pantalla (regla heredada: nunca vidrio sobre vidrio) |
| `.noise-bg` | SVG de ruido externo fijo (`grainy-gradients.vercel.app/noise.svg`), opacity 0.05, z-50, pointer-events none | Grano fílmico global. ⚠️ dependencia de red externa — candidato a self-host |

**Burbujas de UI (patrón existente):** ThemeToggle y LanguageSwitch = círculos "glass bubble" con border `white/20`, fondo transparente, JetBrains Mono 12px, hover scale 1.1 + borde `primary/50`.

**Botones:** sin sistema formalizado todavía (el `CTA-SYSTEM.md` del framework queda pendiente de adaptar). Patrón observable en case studies: píldoras `rounded-[4px]` con `backdrop-blur-2xl` y estados activo/inactivo por inversión `bg-foreground text-background`.

---

## 5. MOTION (fuente: `src/lib/motion.ts`)

**SSOT de código:** `src/lib/motion.ts` — importar, nunca copiar valores sueltos. Tabla resumida (detalle y recetas → `MOTION-BIBLE.md`):

| Grupo | Tokens firma |
|:---|:---|
| `EASE` | `dramatic: power4.out` (slams, Mask Reveal) · `out: power3.out` (reveal estándar) · `inOut: power4.inOut` (Liquid ScrollTo) · `transition: power2.inOut` (Acto 2 planetario) · `snap: power2.out` · `accel: power2.in` · `quick: power3` (quickTo) |
| `DUR` | `dot: 0.1` · `tap: 0.2` · `micro: 0.3` · `cursor: 0.4` · `fast: 0.8` · `base: 1.0` · `slow: 1.2` · `signature: 1.5` (Mask Reveal + ScrollTo) |
| `STAGGER` | `tight: 0.05` · `base: 0.1` |
| `REVEAL` | `meta: 20` · `narrative: 40` · `maskPercent: 100` · `slamPercent: 150` |
| `TRIGGER` | `narrative: "top 92%"` · `standard: "top 80%"` · `late: "top 75%"` |
| `SCRUB` | `crisp: 1` · `smooth: 2` · `heavy: 3` |
| Firma | `CURSOR` (attraction 0.15, collisionRadius 60, collisionScale 1.15) · `DECK.scaleDown: 0.95` · `SWAP.zIndexProgress: 0.5` (50% Swap Trick) · `PLANET` (orbe 0.7 móvil / 1.15 desktop) |

**Infraestructura:**
- **Lenis global** vía `SmoothScrollProvider` (`src/components/providers/`), sincronizado con `gsap.ticker` + `lenis.on("scroll", ScrollTrigger.update)`. Instancia expuesta como **`window.__lenis`** — NUNCA re-inicializar. ⚠️ `window.lenis` (sin guion bajo) está RESERVADO por Lenis 1.3+ para su auto-setup; no asignar la instancia ahí.
- **Reduced motion:** con `prefers-reduced-motion: reduce` el provider no arranca (scroll nativo) y las animaciones deben resolver a estados finales.
- **Hardware Sovereignty:** solo `transform` (translate3d/scale/rotate) y `opacity` en loops; `force3D: true`; prohibido animar `top/left/margin/width/height/filter`.
- **Sticky Strategy:** `sticky top-0` nativo en tracks calculados (200vh/300vh/500vh) en vez de pinning manual de GSAP (previene errores de DOM en Next.js).
- **GSAP:** siempre `gsap.context()` dentro de `useEffect` + `return () => ctx.revert()`.

---

## 6. BUILD & TOOLING (trampas conocidas)

1. **pnpm exclusivo** (v12). `overrides` en `pnpm-workspace.yaml` (NO en package.json — pnpm v12 lo ignora). `@types/three` pinned `0.186.0` alineado con drei/maath; `three` runtime `^0.182.0`.
2. **Tailwind v4 scanea TODO el repo:** los `.md` del framework con ejemplos de clases (`bg-[url('...')]`, `var(--x-*)`) contaminan el CSS compilado. Excluidos en `globals.css` con `@source not "../../Graph-Design-Framework"` y `@source not "../../framework-old"`. **Carpeta nueva de docs → añadir su exclusión.**
3. **Static export:** `output: "export"` + `images.unoptimized`. Deploy: GitHub Pages vía `.github/workflows/deploy.yml` (Node 20, pnpm 12, `pnpm next build` → `./out`).
4. Verificación obligatoria: `pnpm build` verde (TypeScript strict) antes de entregar.

---

## CONEXIÓN CON TOKENIZER
El Agente Tokenizer (`Tokenizer.md`) lee este documento en su Fase 1 y obliga a que cualquier código UI generado aplique estas tablas. Si una medida no encaja, se fuerza el token más cercano.

*Sincronizado con el código real el 2026-10-20 (migración desde Epicare). Anatomía tipográfica importada de Epicare (lección #120 incluida); familias, paleta y spacing son los nativos del portfolio.*
