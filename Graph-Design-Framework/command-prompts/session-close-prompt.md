# Prompt de Cierre de Sesión (Session Close)

Copia y pega este prompt al FINAL de cada sesión de trabajo para que el agente deje "notas de sesión" que el próximo agente pueda leer.

***

**PROMPT PARA CERRAR LA SESIÓN:**

> "Hola. Estamos cerrando esta sesión de trabajo. Por favor, crea una nota de sesión siguiendo estos pasos:
> 
> 1. Crea un archivo en `Graph-Design-Framework/project-context/session-notes/` con el nombre `YYYY-MM-DD_[tema-principal].md`.
> 2. Incluye estas secciones:
>    - **Resumen:** Qué se logró en esta sesión (3-5 bullets).
>    - **Decisiones Tomadas:** Decisiones de diseño o arquitectura importantes y por qué.
>    - **Pendientes:** Qué quedó sin terminar o necesita seguimiento.
>    - **Bugs Descubiertos:** Cualquier bug encontrado pero no resuelto.
>    - **Archivos Clave Modificados:** Lista de los archivos .tsx/.ts/.css/.md principales que se tocaron.
> 3. Actualiza el `context.md` de la sección correspondiente (en `sections/[nombre]/context.md`) con las entradas nuevas.
> 4. Confirma: nombre del archivo de sesión creado y entradas añadidas al contexto de sección."

***

## 📂 Notas de Sesión Existentes

| Archivo | Fecha | Tema |
|:---|:---|:---|
| `2026-10-20_framework-migration-portfolio2026.md` | 20 Oct 2026 | Migración del framework Epicare → Portfolio 2026 (v4.0.0): Lenis global, `motion.ts`, 27 tokens tipográficos `@utility`, project-context nuevo, skills adaptadas, fix `@source not` |

> Las notas del proyecto anterior (jun-oct 2026: tokenization, typography-lenis, gsap-invalid-scope, sweeps go-ams/go-crm, production sweeps) están archivadas en `_archive/legacy-epicare/session-notes/`.

> **Regla:** Cada sesión importante debe dejar su nota. No es necesario para sesiones de <30 minutos o fixes triviales.
