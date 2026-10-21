# 🎬 Protocolo: Auditoría y Estandarización de Movimiento (Motion-Tokenizer)

Usa este comando cuando necesites **auditar, corregir o unificar las animaciones de cualquier componente o sección**, asegurando que cumplan con la firma de movimiento de Portfolio 2026 (`@/lib/motion`), 60fps constantes y cero bugs de ciclo de vida con React y el Loader.

---

## 🧠 STACK QUE SE CARGA
1. [`WorkFlow-Docs/Design-Agent-Skills/Motion-Tokenizer.md`](../WorkFlow-Docs/Design-Agent-Skills/Motion-Tokenizer.md) — Reglas canónicas de motion, blacklist de 7 pecados y los 4 arquetipos oficiales.
2. [`WorkFlow-Docs/Design-Agent-Skills/MOTION-BIBLE.md`](../WorkFlow-Docs/Design-Agent-Skills/MOTION-BIBLE.md) — Física y filosofía cinética.
3. `src/lib/motion.ts` — Los tokens reales de código (`EASE`, `DUR`, `STAGGER`, `REVEAL`, `TRIGGER`, `SCRUB`).

---

## 🎯 FLUJO DE EJECUCIÓN (4 Fases)

### PASO 1 — Auditoría Factual (Sin tocar código todavía)
Escanear el componente objetivo y generar el **Motion Report**:
1. ¿Hay duraciones o easings numéricos inventados (ej. `duration: 0.7`, `ease: "power2.out"`)?
2. ¿Hay divisiones carácter por carácter (`.split('')`) que carguen la GPU? → Migrar a Line-by-Line Clip (`.hero-title-line`, `.section-title-line`).
3. ¿Falta `clearProps: "willChange,clipPath"` al terminar la animación?
4. ¿El `gsap.context()` tiene scope seguro y `ctx.revert()` en el retorno del effect?

### PASO 2 — Asignación de Arquetipo
- **Arquetipo 1 (Hero Entrance):** Si es el Hero principal (`/`), usar timeline pausada en montaje y reproducirla al montar. Este proyecto no tiene loader ni evento global de arranque: la entrada corre en cuanto el componente monta.
- **Arquetipo 2 (Section Reveal):** Si es sección de contenido con scroll, usar `fromTo` atado a `ScrollTrigger` (`start: TRIGGER.standard`).
- **Arquetipo 3 (Bento / Cards):** Si son tarjetas/features, usar `stagger: STAGGER.wave` + `force3D: true`.
- **Arquetipo 4 (Scrollytelling):** Si es sección anclada, usar `pin: true` + `scrub: SCRUB.crisp`.

### PASO 3 — Refactorización con Tokens Oficiales
Importar `{ EASE, DUR, STAGGER, REVEAL } from '@/lib/motion'` y sustituir toda la lógica.

### PASO 4 — Verificación
Ejecutar `pnpm run build` para garantizar cero errores de TypeScript y rendimiento fluido.

---

## 💬 PROMPT PARA EJECUTAR:

> "Ejecuta el protocolo de **Motion Tokenizer** (`motion-audit-protocol.md`) sobre **[RUTA DEL COMPONENTE]**. 
> Dame primero el reporte de violaciones de animación, asigna el arquetipo correspondiente y refactoriza usando estrictamente los tokens de `@/lib/motion` y la técnica Line-by-Line Clip."
