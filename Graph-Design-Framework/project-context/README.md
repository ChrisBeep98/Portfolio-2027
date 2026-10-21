# project-context/ — Índice (Portfolio 2026)

Estado vivo del proyecto. Todo archivo de este directorio describe **Portfolio2026 real** (censo de código). El historial de Epicare/GO AMS vive en `../_archive/legacy-epicare/`.

| Archivo | Qué es |
|:--|:--|
| [`context.md`](./context.md) | Estado vivo: visión, stack, estándares, estructura de código y **Log de Acciones Críticas** (actualizar al cerrar features masivos). |
| [`scrollytelling-map.md`](./scrollytelling-map.md) | Mapa de coreografía de scroll de toda la experiencia (la página es un setlist: ninguna sección repite la técnica-firma de su vecina). |
| `sections/<nombre>/context.md` | Contexto por sección/página: qué hay, qué está APROBADO/congelado, paradigmas quemados, pendientes. |
| `sections/design-system/Design-System.md` | **SSOT de tokens** (tipografía, color, espaciado, glass, motion, build). |
| `session-notes/` | Notas por sesión de trabajo (formato `YYYY-MM-DD_tema.md`). |

## Secciones documentadas
- `sections/home/` — landing `/` (Header, Hero 2 actos, About manifiesto, Marquee, Footer cortina).
- `sections/projects-showcase/` — showcase de la landing (split-scroll desktop / card deck mobile + magnetic cursor).
- `sections/process/` — acordeón editorial de proceso.
- `sections/about/` — página `/about`.
- `sections/vank/` · `sections/anyma/` · `sections/nevado/` — case studies (Individual Page Clones).
- `sections/design-system/` — tokens y reglas del DS.

## Reglas de mantenimiento
1. Al terminar un feature masivo: actualizar `context.md` (log) + `sections/<x>/context.md` + `scrollytelling-map.md` si cambió la coreografía (protocolo: `command-prompts/session-close-prompt.md`).
2. Aprobaciones del usuario ("me gusta", "hermoso") → anotar **APROBADO/congelado** en el context.md de la sección en ese momento.
3. Paradigmas rechazados → anotar como **QUEMADO** con cita textual, para no volver a proponerlos.
