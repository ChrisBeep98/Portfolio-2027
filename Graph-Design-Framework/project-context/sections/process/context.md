# sections/process — Acordeón editorial de proceso (`Process.tsx`)

> **Estado:** SHIPPED — **APROBADO/congelado**. Censo inicial: 2026-10-20.
> Componente: `src/components/sections/Process.tsx`.

## Evolución de Arquitectura (documentar, no borrar)
Los docs viejos (`framework-old/docs/ARCHITECTURE.md`) describían esta sección como **"Process (3D Cards)"**. El código real es un **acordeón editorial** de bloques hairline — la evolución ocurrió antes del censo actual. No reintroducir tarjetas 3D: paradigma quemado por la implementación real.

## Layout
- Sección con bg propio hardcodeado (`#E5E5E3` light / `#0D0D0D` dark — candidato a token) + `border-t` hairline + sombra inset superior (`inset 0 60px 80px -40px rgba(0,0,0,0.08)`).
- Grid 2 columnas en `lg`: izquierda 1/3 (título `text-[12vw] lg:text-[5vw]` uppercase font-bold tracking-tighter + subtítulo opacity-60), derecha 2/3 (acordeón).
- Items desde `dictionary.ts` (`t.process.items`): fila con ID mono (opacity 30→100 en hover), título `text-2xl lg:text-5xl` uppercase con `group-hover:translate-x-2`, botón Plus circular que rota 45° al abrir.
- Contenido desplegable: framer-motion `height 0→auto`, 0.5s, ease `[0.33, 1, 0.68, 1]`, AnimatePresence; texto `font-light opacity-70`.

## Coreografía de entrada (GSAP)
- Trigger: `containerRef` `start: "top 80%"`, `toggleActions: "play none none reverse"`.
- Timeline en cascada solapada:
  1. `.process-reveal-title` y 100→0, opacity, **1.2s `power4.out`**.
  2. `.process-reveal-sub` y 30→0, **1s `power3.out`**, overlap `-=0.8`.
  3. `.process-reveal-item` y 50→0, **0.8s, stagger 0.15, `power3.out`**, overlap `-=0.6`.
- Estados iniciales con `gsap.set` (anti-flash).

## Parámetros canónicos (motion.ts)
`DUR.slow 1.2` · `DUR.base 1.0` · `DUR.fast 0.8` · `EASE.dramatic power4.out` · `EASE.out power3.out` · `STAGGER.wave` ≈ 0.15 (valor del componente; en motion.ts el stagger wave de Epicare era 0.15 — alineado).

## Pendientes (no tocar sin protocolo)
1. Tokenizar bg de sección (`#E5E5E3`/`#0D0D0D`).
2. El stagger 0.15 del componente no está en `motion.ts` como token con ese nombre — al próximo sweep, decidir: añadir `STAGGER.wave: 0.15` o normalizar a `STAGGER.base`.
