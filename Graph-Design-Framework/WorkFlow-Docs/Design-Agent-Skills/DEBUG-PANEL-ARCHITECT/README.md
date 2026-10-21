# 🛠️ DEBUG PANEL ARCHITECT v3.0 (The Ecosystem Edition)

## Contexto & Filosofía
A veces, adivinar valores de CSS (como `mix-blend-mode`), ritmos de animación, o **decidir entre arquitecturas de layout completas** requiere construir y recompilar docenas de veces. Esto es lento y frustrante.

La solución adoptada es la inyección de **Paneles Laterales de Debug en Vivo**. Esta skill instruye sobre cómo construir un panel lateral temporal (drawer/sidebar) sobre cualquier componente React para manipular configuraciones estructurales, espaciados y animaciones al instante.

**CRÍTICO:** Estos paneles son estrictamente para desarrollo. **NUNCA** deben llegar a producción. Respetan el ciclo de vida de **3 Fases**, permitiendo su eliminación quirúrgica total (*zero-trace*).

---

## 📅 El Ciclo de Vida de 3 Fases

### Fase 1: Prueba de Concepto (Live Testing)
Inyección del panel lateral UI con estados temporales (prefijo `__dbg`) para alternar valores CSS, tiempos de animación o estructuras JSX completas. El código se asume "sucio" pero altamente interactivo.

### Fase 2: Tokenización y Consolidación (The Refactor)
El usuario (o el Agente) elige un ganador usando el panel. El Agente transfiere "en piedra" el código ganador aplicando los estándares del DS (Tailwind, variables semánticas, tokens tipográficos).

### Fase 3: The Purge (Zero-Trace Cleanup)
Eliminación quirúrgica total del panel y todos sus estados. Ver la **Purge Checklist** en `01-CORE-INJECTION.md`.

---

## 📂 Arquitectura del Sub-Framework

Este framework se divide en módulos especializados para dominar cada aspecto de la UI:

1. **[`01-CORE-INJECTION.md`](./01-CORE-INJECTION.md)**: Reglas de inyección, la nueva arquitectura del Panel Lateral Completo, y la Purge Checklist.
2. **[`02-UI-CONTROLS.md`](./02-UI-CONTROLS.md)**: Librería base de controles (Sliders, Colors, Toggles, Selects, URL Params).
3. **[`03-LAYOUT-SPACING.md`](./03-LAYOUT-SPACING.md)**: Controles avanzados para arquitectura (Margins, Gaps, Grid Visualizer de 1400px, Viewport Resizer).
4. **[`04-GSAP-SCRUBBER.md`](./04-GSAP-SCRUBBER.md)**: Integración profunda con GSAP (Timelines, Scrubbing, Play/Pause master).
5. **[`05-DOM-SWITCHER.md`](./05-DOM-SWITCHER.md)**: Patrones para A/B testing estructural masivo (Layout A vs Layout B).
6. **[`06-SCROLL-TRIGGER.md`](./06-SCROLL-TRIGGER.md)**: Visualizador de marcadores y triggers dinámicos de scroll.
7. **[`07-ISOLATION-MODE.md`](./07-ISOLATION-MODE.md)**: "Isotope Mode" para aislar componentes (Z-index quarantine).
8. **[`08-TAILWIND-INJECTOR.md`](./08-TAILWIND-INJECTOR.md)**: Editor de texto en vivo para inyectar clases Tailwind.
9. **[`09-ACCESSIBILITY-AUDIT.md`](./09-ACCESSIBILITY-AUDIT.md)**: Auditoría del DOM para SEO y accesibilidad (Webflow inspired).
10. **[`10-BOX-MODEL-INSPECTOR.md`](./10-BOX-MODEL-INSPECTOR.md)**: Visualizador del modelo de caja on-hover (Figma Dev Mode inspired).
11. **[`11-INTERACTION-RECORDER.md`](./11-INTERACTION-RECORDER.md)**: Línea de tiempo para loggear micro-interacciones (Framer inspired).
12. **[`12-PESTICIDE-OVERLAY.md`](./12-PESTICIDE-OVERLAY.md)**: Outliner semántico multicolor por etiqueta HTML (Pesticide/VisBug inspired).
13. **[`13-3D-TILT-VISUALIZER.md`](./13-3D-TILT-VISUALIZER.md)**: Inspector de Z-Index que renderiza el componente en 3D real.
14. **[`14-TYPOGRAPHY-RHYTHM.md`](./14-TYPOGRAPHY-RHYTHM.md)**: Cuadrícula milimetrada interactiva para alinear el ritmo vertical.
15. **[`15-THE-PURGE-PROTOCOL.md`](./15-THE-PURGE-PROTOCOL.md)**: Guía quirúrgica exhaustiva para la Fase 3 (Eliminación total sin rastros).
16. **[`16-RESPONSIVE-STATE-SYNC.md`](./16-RESPONSIVE-STATE-SYNC.md)**: Sincronización de estado dual (Mobile/Desktop) con LocalStorage y Reset.
17. **[`17-DESIGN-SYSTEM-INJECTOR.md`](./17-DESIGN-SYSTEM-INJECTOR.md)**: **MANDATORIO**. Controles UI (Selects/Sliders) para alternar TODO el inventario del Design System.