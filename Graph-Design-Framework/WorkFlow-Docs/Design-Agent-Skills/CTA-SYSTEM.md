---
name: CTA System
description: Reglas de label, colocación y motion para CTAs (portadas del proyecto anterior — las reglas son del usuario y siguen vigentes). El sistema de componentes Button del portfolio está pendiente de formalizar; usar los patrones shipped aprobados. Cargar al añadir, mover o renombrar cualquier botón.
---

# 🎯 CTA SYSTEM

> **Estado en Portfolio 2026 (2026-10-20):** las **reglas** (§2 label, §3 colocación, §4 motion) son gusto destilado del usuario y aplican íntegras. Los **componentes** `Button`/`IconButton`/`PrimaryCta`/`SecondaryCta` y los tokens `rounded-button` eran del proyecto anterior — **no existen en este repo**. El sistema de botones del portfolio está sin formalizar (pendiente en `project-context/sections/design-system/context.md`). Mientras tanto: patrones shipped aprobados (§1).

## 1 · Patrones shipped del portfolio (usar estos, no inventar)

| Patrón | Receta (código real) | Dónde vive |
|:--|:--|:--|
| **Botón social/acción** | `h-[44px] md:h-[48px] px-6 md:px-8 rounded-[12px] border border-white/20 dark:border-black/20` + hover `-translate-y-1` + icono con gradiente SVG + flecha `ArrowUpRight` que se desplaza | `Footer.tsx` |
| **Pill de navegación (case studies)** | `px-4 h-9 rounded-[4px] backdrop-blur-2xl border` · activo: `bg-foreground text-background` · inactivo: `bg-background/40 border-foreground/10` · transición 500ms | `anyma/nevado` (FAB móvil) |
| **Burbuja de UI (toggles)** | circular `rounded-full`, border `white/20`, fondo transparente, JetBrains Mono 12px, hover `scale 1.1` + borde `primary/50` | `ThemeToggle`, `LanguageSwitch` |
| **Ítem de índice lateral** | `pl-6 h-[2.25rem] text-[12px]` · activo `opacity-100` · inactivo `opacity-30 hover:opacity-60` | `vank` (Liquid Sidebar) |

Regla de forma: **jerarquía contenedor > pieza** (TASTE-LEDGER §1) — pieza interna siempre con radio menor que su contenedor. `rounded-full` solo en burbujas/puntos/avatares.

## 2 · Reglas de label (el usuario las corrigió en vivo — intocables)

1. **Máximo 3 palabras.** "Bring every conversation together" fue rechazado: *"un label de botón no puede ser tan largo por dios"*. (Excepción aprobada: el del Hero.)
2. **Un verbo distinto por CTA** en la página — ninguno repite verbo con otro visible cerca (Abre / Conecta / Ordena / Centraliza / Ve / Entra).
3. Nada de "Iniciar sesión" / "Log in" genérico (rechazado: se pidió "otro label que no sea iniciar sesión").
4. Nunca la palabra **"oportunidad/opportunity"** en marketing.
5. ES e EN con la misma intención, cada uno natural en su idioma (Data Parity Rule en `dictionary.ts`).

**Set histórico del proyecto anterior (ejemplo de aplicación de las reglas):**
| Sección | ES | EN | Tipo |
|:--|:--|:--|:--|
| Hero | Abre tu centro de control | Open your control center | Primario |
| Contactos | Conecta tus fuentes | Connect your sources | Secundario (dark) |
| Seguimiento | Ordena tu seguimiento | Organize follow-ups | Primario, bajo el titular |
| Conversaciones | Centraliza todo | Centralize it all | Primario, bajo el titular |
| Métricas | Ve tus números | See live numbers | Primario, bajo titular + rayita de acento |
| Cierre | Entra a GO CRM | Open GO CRM | Primario final |

## 3 · Estrategia de colocación (portada, vigente)

- **Bajo el titular** de las secciones que muestran valor (el usuario movió los CTAs de dentro de los pasos a debajo del titular y los hizo primarios).
- **Sin CTA** en secciones de tensión/problema y en recapitulaciones: interrumpen la historia. En el portfolio narrativo esto es AÚN más cierto — la película manda.
- **Cierre = CTA primario final** (en el portfolio: Footer — contacto/email como acción de resolución).
- Varios primarios seguidos es aceptable si cada uno responde a su sección; si se siente repetitivo, degradar uno a secundario.
- En móvil el CTA va alineado a la izquierda con su titular y con aire respecto al contenido siguiente.

## 4 · Motion

- Entrada: fade-up tokenizado (`REVEAL.meta/narrative`, `DUR.fast/base`, `EASE.out`) con `delay: STAGGER.wave * 2` tras el Mask Reveal/Text-Birth del titular, **fuera** de `overflow-hidden`.
- Hover: `-translate-y-0.5 scale-[1.02]` (o el `-translate-y-1` shipped del Footer) — GSAP anima `transform`; el hover CSS usa `translate`/`scale` (propiedades separadas en Tailwind v4) → no chocan.
- Colores de hover con transición 300-500ms (`transition-colors`/`transition-all`), nunca animados con GSAP en loop.
