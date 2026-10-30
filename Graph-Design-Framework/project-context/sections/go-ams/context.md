# sections/go-ams — Case Study `/projects/go-ams`

> **Estado:** SHIPPED — **APROBADO**. Censo inicial: 2026-10-29.
> Página: `src/app/projects/go-ams/page.tsx`. Sigue el patrón "Individual Page Clones" (VANK Pattern) adaptado a 8 bloques (Intro + 7 Actos).

## Estructura base
- **Ruta:** `/projects/go-ams` (página física propia en App Router).
- **Posición en showcase:** 1º (primer proyecto en la landing `/` y en el slider del menú móvil).
- **Contenido:** 100% en `dictionary.ts` (`t.goams`), con Data Parity Rule EN/ES estricta y tú neutro.
- **Assets:** 12 WebP optimizados en `/public/go-ams/` (dashboard, downline, reporting, notifications, login, agent-support, resources-page, profile-setting, design-system-colors, design-system-typography, design-system-inputs, license-details).
- **Color branding:** Neutros (`lightBg: #E5E5E5`, `darkBg: #171717`, `accent: #737373`), punto del título con `text-primary` (`#a855f7`).

## Coreografía (GSAP 3.14 + ScrollTrigger + ScrollToPlugin)
- **Hero Mask Reveal:** `.hero-title-mask` clip-path `inset(0% 0% 100% 0%)→inset(0%)` + `.hero-title-text` `y 100%→0`, 1.5s `power4.out`, delay 0.5.
- **Subtítulo & Meta:** `y 40→0`, 1.2s `power3.out`, delay 0.9. Meta-reveal: `y 20→0`, 0.8s, stagger 0.05, `power2.out`, delay 0.4.
- **Actos narrativos (01 al 07):**
  - `acto01` (El Proyecto / The Project)
  - `acto02` (El Reto / The Challenge)
  - `acto03` (Diseñando el Producto / Designing the Product)
  - `acto04` (Construyendo el Sistema de Diseño / Building the Design System)
  - `acto05` (De Figma a Desarrollo / From Figma to Development)
  - `acto06` (El Resultado / The Result)
  - `acto07` (Reflexión Final / Final Reflection)
- **Liquid Sidebar Index:** 8 items (Intro + 7 Actos). Sync bidireccional vía ScrollTrigger + ScrollToPlugin (`power4.inOut`, 1.5s). Mobile: Floating Action Button con drawer animado via Framer Motion.
