# sections/anyma — Case Study `/projects/anyma`

> **Estado:** SHIPPED — **APROBADO/congelado**. Censo inicial: 2026-10-20.
> Página: `src/app/projects/anyma/page.tsx`. Clon de la base VANK (ver `../vank/context.md` para la coreografía compartida) con desviaciones propias.

## Desviaciones sobre la base VANK (censadas)
- **Editorial Misalignment (patrón ANYMA, `framework-old` §6):** citas destacadas centradas con offset **−36px** a la izquierda en desktop (`lg:-ml-[36px]`) — rompe la simetría de la cuadrícula al estilo editorial suizo. **Mobile:** se anula el desfase y se fuerza `text-left`.
- **Índice móvil tipo FAB/pills:** botones `px-4 h-9 rounded-[4px] backdrop-blur-2xl`, activo `bg-foreground text-background` + shadow, inactivo `bg-background/40 border-foreground/10` (transición 500ms).
- Base compartida intacta: Hero Mask Reveal 1.5s power4.out delay 0.5 · actos 1.2s stagger 0.1 · Narrative Flow `top 92%` y40 1s power3.out reverse · Liquid ScrollTo 1.5s power4.inOut autoKill false.

## Reglas
- El offset −36px es SOLO desktop y SOLO citas — no extender a otros bloques (asimetría controlada, no caos).
- Data Parity: `t.anyma` completo en EN/ES.

## Pendientes (no tocar sin protocolo)
1. Censo de contenido (actos, secciones del índice) al próximo sweep.
2. Smoke test ScrollTo + Lenis (igual que VANK).
