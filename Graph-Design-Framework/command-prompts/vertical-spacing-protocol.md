# Protocolo: Ritmo Vertical entre Secciones (Vertical Rhythm)

Usa este protocolo cuando necesitemos **auditar, mapear o estandarizar el espaciado vertical** entre las secciones de una página (el margen/padding top y bottom de cada sección respecto a su contenido), garantizando un ritmo simétrico y consistente en **desktop y mobile**. El sistema de espaciado del portfolio es **elástico (em)** y vive en `globals.css`; este protocolo asegura que se aplique bien y sin acumulaciones.

> **Fuente ampliada de la regla de simetría de** `Tokenizer.md` §2.1. Este documento la expande con la escala real, la convención de propiedad (single-owner) y el **mapa vivo** de la página.

***

## 📏 EL ESTÁNDAR — "Elastic Vertical Rhythm" (Portfolio 2026)

### 1. Escala de ritmo (Elastic System — variables en `globals.css`)
| Variable | Utilidad | Desktop | Mobile (<768px) | Cuándo usar |
|:--|:--|:--|:--|:--|
| `--section-gap` | `.section-gap` | 8em | 3.25em | **Ritmo estándar** entre secciones principales |
| `--block-gap` | (vía escala rem) | 2em | 1.5em | Entre bloques dentro de una misma sección |
| `--content-gap` | (vía escala rem) | 1em | 0.75em | Contenido interno / micro-agrupaciones |
| `--px-frame` | `.px-frame` | 6em | 0.75em | Frame horizontal (no es ritmo vertical, pero auditar juntos) |

> A diferencia del proyecto anterior (4 niveles clamp `py-section-*`), el portfolio usa UN gap elástico por breakpoint. Si una página necesita granularidad adicional (xs/sm/md/lg), **proponer tokens nuevos como `@utility`** vía `update-design-system-protocol.md` — no improvisar clamps sueltos.
> **Requisito de motor:** `.px-frame`/`.section-gap` son utilities planas; si se necesitan con prefijos responsivos (`md:`), migrarlas a `@utility` top-level (lección Tailwind v4: el CSS plano no genera variantes).

### 2. Regla de Oro — un solo dueño por frontera (single-owner)
Ninguna frontera entre dos secciones debe **sumar** padding de ambos lados (evita el "doble margen"). Convención canónica: **la sección superior posee el gap** con su padding-bottom; la sección inferior arranca en `pt-0` en esa costura.
- Cada sección declara **exactamente un** dueño de gap por frontera.
- **Excepción — primera sección de contenido:** puede declarar su propio `pt-*` (no tiene vecino arriba que le dé aire).
- El "aire superior" visible de una sección lo aporta el `pb` de la anterior.

### 3. Baseline móvil
En móvil el gap estándar entre secciones principales lo da `--section-gap` móvil (**3.25em ≈ 52px**). ⚠️ Las secciones shipped usan valores más pesados (`py-24` = 96px, `md:py-32`): es **estado shipped congelado** — se respeta (TASTE-LEDGER: no dañar lo aprobado); el baseline prescribe sobre trabajo NUEVO. Auditar activamente clases responsivas desalineadas (`mt-10 md:mt-24` rompiendo simetría con `mb-12`).

### 4. Secciones full-bleed y mecánicas especiales (SIN excepción de ritmo)
- Secciones a altura de viewport (`h-screen`/`h-[Xvh]`) **también respetan el ritmo**: gap vía wrapper/margen externo.
- **Mecánica de cortina (Footer):** el spacer `h-screen` + footer `fixed` NO es ritmo — es el trigger de revelado. No se le aplica gap ni se "corrige".
- **Track de split-scroll (Projects):** consume sus 500vh propios; no añadir gap adicional alrededor del track.

### 5. Zero-Px (con excepciones documentadas)
Prohibido para ritmo: `py-[Xpx]`, `pt-[Xvh]`, `mt-[Xpx]`, `mb-[Xrem]` arbitrarios → reemplazar por la variable/utilidad más cercana.
- **Excepciones explícitas shipped (NO son violación, nunca "corregir"):**
  - `About.tsx` → `mt-[8em]`: separador de firma Hero→About. Deuda registrada: en móvil 8em es pesado (vs 3.25em del baseline) — candidato a responsive en un futuro sweep CON autorización.
  - `Footer.tsx` → spacer `h-screen`: mecánica de cortina (§4).

---

## 🗺️ EL MAPA — Página actual (`src/app/page.tsx`, censo 2026-10-20)

Orden de render: **Header (overlay fixed) → Hero → About → Marquee → Projects → Process → Footer (cortina)**. El wrapper central (`div.relative.z-10`) no aporta espaciado; todo vive en cada sección.

| Frontera | Estado actual (shipped) | Prescripción (single-owner) | Notas |
|:--|:--|:--|:--|
| **Hero → About** | About `mt-[8em]` | **EXCEPCIÓN shipped** (firma) | Deuda móvil documentada (§5) |
| **About → Marquee** | Panel About `py-24 sm:py-32` (interno) · Marquee `pt-24 md:pt-32` | Dueño: **Marquee** (`pt`) | La sección About exterior no suma `pb` |
| **Marquee → Projects** | Marquee `pb-16 md:pb-32` | Dueño: **Marquee** (`pb`) | Projects arranca con track 500vh (§4) |
| **Projects → Process** | Process `py-24 md:py-32` + `border-t` + inset shadow | Dueño: **Process** (`pt`) | El `border-t` es el separador visual: un solo separador entre bloques |
| **Process → Footer** | Footer: spacer `h-screen` + fixed | **EXCEPCIÓN CORTINA** (§4) | El spacer es trigger, no ritmo |

> Trabajo nuevo en la landing: respetar dueños existentes; cualquier cambio de frontera pasa por este mapa y se registra en `project-context/scrollytelling-map.md`.

***

**PROMPT PARA EJECUTAR EL PROTOCOLO:**

> "Hola. Ejecuta estrictamente el **Protocolo de Ritmo Vertical entre Secciones** sobre [PÁGINA/SECCIÓN]. Aplica la escala elástica, la Regla de Oro (single-owner) y el baseline móvil de `--section-gap`, en las siguientes 3 Fases:
>
> ### FASE 1: Auditoría & Mapa
> 1. Lista las secciones en orden de render del archivo que las ensambla (`page.tsx`).
> 2. Para CADA sección, extrae su espaciado vertical actual (`file:línea`): padding/margen top y bottom, distinguiendo utilidades del sistema (`.section-gap`, variables) de valores crudos (`py-20`, `mt-[Xpx]`, `md:pt-[Xvh]`).
> 3. Marca violaciones: px/vh crudos para ritmo, y **acumulaciones** (dos secciones adyacentes sumando padding).
> 4. **Produce la tabla-MAPA** con una fila por frontera: `Frontera | Actual | Prescripción (dueño + token) | Desktop/Móvil`.
> 5. NO escribas código aún. Repórtame el mapa y espera confirmación.
>
> ### FASE 2: Motor (pre-requisito)
> 1. Verifica en `globals.css` que las utilities de ritmo existan y, si el mapa prescribe prefijos responsivos (`md:`), que estén como `@utility` top-level. Si no, migra (uso bare queda idéntico, retrocompatible).
> 2. Confírmalo con `pnpm build` + grep del CSS de producción por la variante (`.md\:` correspondiente).
>
> ### FASE 3: Aplicación (Regla de Oro)
> 1. Aplica el mapa: cada frontera con UN dueño de gap y `pt-0` en la costura; primera sección conserva su `pt-*`.
> 2. Baseline móvil = `--section-gap` (3.25em); trabajo nuevo desktop = 8em salvo dirección explícita.
> 3. Secciones full-bleed (viewport): gap vía wrapper/margen, sin excepción. Mecánicas de cortina/track: no tocar.
> 4. Respeta las excepciones shipped documentadas (§5) y el código congelado — nunca re-stylear lo APROBADO sin pedido explícito.
>
> ### FORMATO DE REPORTE
> ```
> ## 🔴 VIOLACIONES DE RITMO
> | # | Sección | Línea | Actual (❌) | Fix (✅) | Motivo |
>
> ## 🗺️ MAPA FINAL
> | Frontera | Dueño | Token | Desktop | Móvil |
> ```
>
> Confírmame al completar las 3 Fases y **ESPERA mi autorización para hacer commit**."
