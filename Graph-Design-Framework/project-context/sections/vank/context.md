# sections/vank — Case Study `/projects/vank`

> **Estado:** SHIPPED — **APROBADO/congelado**. Censo inicial: 2026-10-20.
> Página: `src/app/projects/vank/page.tsx`. **VANK es la pieza patrón** de los Case Studies (el "VANK Pattern" de `framework-old/docs/ANIMATION-ENGINE.md` §4). ANYMA y NEVADO clonan esta base.

## Estructura base (Individual Page Clones)
- Página física propia (no dinámica) — permite micro-ajustes de diseño/tiempos por pieza sin romper las demás.
- Contenido 100% vía `dictionary.ts` (`t.vank`) — Data Parity Rule EN/ES obligatoria.

## Coreografía (censada del código)
- **Hero Mask Reveal:** `.hero-title-mask` clip-path `inset(0% 0% 100% 0%)→inset(0%)` + `.hero-title-text` `y 100%→0`, **1.5s `power4.out`, delay 0.5**.
- Subtítulo: `y 40→0`, 1.2s `power3.out`, delay 0.9 · Meta-reveal: `y 20→0`, 0.8s, stagger 0.05, `power2.out`, delay 0.4.
- **Actos narrativos:** por acto `{n}`, `.acto{n}-title-mask` + `.acto{n}-title-text` — 1.2s, stagger 0.1, `power4.out`, máscara y texto en paralelo (`"<"`).
- **Narrative Flow:** cada párrafo/item con ScrollTrigger propio — `start: "top 92%"`, `y 40→0`, 1s `power3.out`, `toggleActions: "play none none reverse"` (descubrimiento orgánico, evita despliegue masivo).
- **Liquid Sidebar Index:** desktop `position: fixed` 15% width, sync bidireccional ScrollTrigger ↔ ScrollToPlugin. Items: botones `pl-6 h-[2.25rem] text-[12px]`, activo opacity-100 / inactivo opacity-30 (hover 60). Mobile: menú colapsable.
- **Liquid ScrollTo:** `gsap.to(window, {scrollTo: {y: "#id", autoKill: false}, duration: 1.5, ease: "power4.inOut"})`.

## Reglas heredadas (framework-old)
- Mask Reveal = técnica firma de títulos (GPU-friendly: clip-path + transform).
- Z-index con "50% Swap Trick" en superposiciones.
- Mobile: hero `55vh` object-cover (aspecto cinematográfico), jerarquía Título→Subtítulo→Visual→Info.

## Pendientes (no tocar sin protocolo)
1. Censo de contenido (número exacto de actos y secciones del índice) al próximo sweep.
2. Con Lenis activo: verificar que `scrollTo` con `autoKill: false` siga aterrizando exacto (Lenis + ScrollToPlugin coexisten, pero smoke test pendiente).
