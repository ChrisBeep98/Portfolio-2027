# sections/nevado — Case Study `/projects/nevado`

> **Estado:** SHIPPED — **APROBADO/congelado**. Censo inicial: 2026-10-20 (nivel grep).
> Página: `src/app/projects/nevado/page.tsx`. Clon de la base VANK (ver `../vank/context.md`).
> ⚠️ NEVADO no aparece en los docs de `framework-old` (drift conocido: solo VANK y ANYMA estaban documentados) — este context.md es su primera documentación.

## Desviaciones sobre la base VANK (censadas)
- **Índice móvil tipo FAB/pills:** mismo patrón que ANYMA (`rounded-[4px] backdrop-blur-2xl`, activo invertido `bg-foreground text-background`).
- Base compartida intacta: Hero Mask Reveal 1.5s power4.out delay 0.5 · actos 1.2s stagger 0.1 · Narrative Flow `top 92%` y40 1s power3.out reverse · Liquid ScrollTo 1.5s power4.inOut autoKill false · sidebar desktop con items `pl-6 h-[2.25rem]`.

## Pendientes (no tocar sin protocolo)
1. **Censo completo prioritario:** contenido, actos, secciones del índice y especiales de pieza (¿tiene algún patrón propio tipo ANYMA misalignment?) — sin documentar hasta ahora.
2. Verificar paridad de llaves `t.nevado` EN/ES en `dictionary.ts`.
3. Smoke test ScrollTo + Lenis.
