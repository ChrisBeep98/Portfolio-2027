---
name: Visual QA Harness
description: Cómo verificar visualmente cada cambio antes de reportarlo — scripts CDP de Chrome headless en tools/visual-qa (capturas por selector, pin, slider, hover, eval), matriz de viewports y las trampas del entorno (Lenis, Tailwind rancio, Git Bash). Obligatorio: nada se reporta como hecho sin haberlo MIRADO.
---

# 🔍 VISUAL QA HARNESS — "Nada se entrega sin mirarlo"

Scripts: `Graph-Design-Framework/tools/visual-qa/*.mjs`. Requieren el dev server (`pnpm dev` en `Portfolio2026`, puerto 3000) y Chrome en `C:/Program Files/Google/Chrome/Application/chrome.exe`. URL por defecto `/`; cambiar con `QA_URL=http://localhost:3000/projects/vank`. Guardar las capturas en el **scratchpad** de la sesión (nunca en el repo) y **leerlas con la herramienta Read** para verlas.

## 1 · Los scripts

| Script | Uso | Para qué |
|:--|:--|:--|
| `elshots.mjs` | `node elshots.mjs <w> <h> "<selector>" <prefijo> [offsetPx] [dark]` | Captura cada elemento que coincide (scroll a su top − offset). Imprime `docH`, `overflowX` y **warnings/errores de consola** (hidratación, "Invalid scope"). El caballo de batalla. |
| `pinshots.mjs` | `node pinshots.mjs <w> <h> "<selDentroDelPin>" <prefijo> 0 0.35 0.7 1` | Secciones pineadas: captura en fracciones del recorrido del pin. Imprime `{top,len}` → comparar `len` antes/después para detectar que un cambio rompió el pin. |
| `slidershots.mjs` | `node slidershots.mjs <prefijo> "<selectorBloqueSlider>"` | Móvil 390: lleva el slider al viewport y captura slide a slide (el track = hijo con `snap-x`). |
| `hovershot.mjs` | `QA_GRID=… QA_CELL=… QA_TAP=… node hovershot.mjs <w> <h> <out.png>` | Desktop: hover real (Input.dispatchMouseEvent) sobre una celda. Móvil: click en un botón (acordeón). |
| `evalpage.mjs` | `node evalpage.mjs <w> <h> <archivo.js>` | Evalúa JS async en la página y devuelve un string (usar `return JSON.stringify(...)`). Para medir: paddings computados, alturas, si una clase de Tailwind existe, estado de animaciones. |
| `shot.mjs` | `node shot.mjs <url> <w> <h> <out.png> [scrollY] [dark]` | Captura simple por posición. |

## 2 · Matriz mínima por cambio

| Viewport | Cuándo |
|:--|:--|
| **390×844** (móvil) | SIEMPRE — es donde el usuario revisa más |
| **1440×900** (desktop) | SIEMPRE que el cambio toque clases sin prefijo o componentes compartidos |
| **900×1000** (tablet md) | cuando hay layout `md:` distinto de `lg:` |
| **dark** | cambios de color/superficie o texto sobre imagen |
| hover / tap | cuando se toca interacción |

Checklist de lectura de cada captura: márgenes 14px en móvil · nada cortado/solapado · una sola línea separadora · alineaciones · texto legible en dark · sin franjas de fondo · el siguiente slide asoma.

## 3 · Trampas del entorno (todas ocurrieron)

1. **Lenis**: `window.scrollTo` no mueve la página → `window.__lenis?.scrollTo(y, { immediate: true })` (fallback `window.scrollTo`).
2. **Tailwind rancio en dev**: clases nuevas (`lg:w-[85vw]`) no se generan tras muchas ediciones → medir con `evalpage` (crear un div con la clase y leer `getComputedStyle`); si da 0 → **reiniciar el dev server**. No "arreglar" código que está bien.
3. **Capturas a mitad de crossfade**: carruseles automáticos pueden salir superpuestos; verificar con `evalpage` (opacidades, `animationend`) antes de tocar código.
4. **Git Bash**: `NEXT_PUBLIC_BASE_PATH=` se convierte en ruta Windows → `MSYS_NO_PATHCONV=1`. Heredocs con backticks o `$()` se destrozan → escribir archivos con la herramienta Write. `<(…)` (process substitution) no funciona con node en Windows → archivo temporal.
5. **Build de verificación**: `MSYS_NO_PATHCONV=1 pnpm exec next build` (export estático, basePath de producción).
6. Selectores con `:` de Tailwind (`.md:hidden`) son un infierno de escapes → añadir una clase semántica (`pg-slider`) al elemento.
