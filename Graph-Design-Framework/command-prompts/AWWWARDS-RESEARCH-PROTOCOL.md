# 🕵️‍♂️ Protocolo: Awwwards Research Director

**El comando para realizar investigación arquitectónica y de motion de alto calibre.** 
Usa este protocolo cuando necesites salir a la web a buscar inspiración, referencias y algoritmos para animaciones avanzadas, evitando la basura genérica, plantillas aburridas y tutoriales básicos de CSS.

---

## 🛑 EL PROBLEMA
Las inteligencias artificiales están sesgadas hacia el código más común en internet (StackOverflow, tutoriales de Medium, componentes básicos de Bootstrap/Tailwind). Si les pides "un footer animado increíble", te darán un *fade-in* o un *parallax* de 2015. 

Este protocolo **fuerza a la IA a investigar en la frontera del Creative Development (Awwwards, FWA, WebGL).**

---

## 🔎 FASE 1 — BÚSQUEDA POR MECÁNICAS (NO POR DISEÑO)

**PROHIBIDO buscar:** "Cool animated footer", "Best React hero sections", "Modern CSS animations".
**OBLIGATORIO buscar algoritmos y físicas:**
La IA debe utilizar herramientas de búsqueda web (como `search_web`) utilizando términos de ingeniería gráfica:
- *GSAP ScrollTrigger scrub morphSVG "awwwards" codepen*
- *WebGL fluid simulation scroll physics site of the day*
- *Inverted scroll mask wipe locomotive scroll*
- *Kinetic typography scrub timeline*
- *Elastic rubber band SVG scroll effect GSAP*

## 🏢 FASE 2 — LOS MAESTROS DEL CÓDIGO

Si vas a buscar inspiración, busca en el portafolio o en artículos/charlas técnicas de los estudios que definen el estándar mundial. La IA debe priorizar (o buscar explícitamente) estudios de caso técnicos de:
1. **Aristide Benoist** (Físicas fluidas, transiciones DOM a WebGL).
2. **Active Theory** (Entornos inmersivos).
3. **Locomotive** (Scroll inercial y micro-interacciones cinéticas).
4. **Media.Monks** / **Cuberto** / **Bruno Simon**.

## 🛡️ FASE 3 — EL FILTRO ANTI-SLOP (Validación de Resultados)

Antes de presentarle una idea al usuario, la IA debe someter la referencia a este filtro. Si la idea cae en alguna de estas categorías, **MÁTALA INMEDIATAMENTE** y busca otra:
- ❌ "Aparece suavemente al hacer scroll" (Fade-up estándar).
- ❌ "Un efecto parallax simple donde el fondo se mueve más lento".
- ❌ "Tarjetas que giran en 3D al hacer hover".
- ❌ "Un Sticky Header que cambia de color".

**¿Qué SÍ pasa el filtro?**
- ✅ El DOM muta estructuralmente (ej: un botón se expande hasta convertirse en el fondo de la página).
- ✅ Las físicas están atadas directamente a la rueda del ratón (`scrub: true`) permitiendo ir hacia adelante y hacia atrás.
- ✅ Manipulación matemática de SVGs (Morphing, Bezier curves dinámicas).
- ✅ Cinemática de tipografía (Letras masivas que funcionan como ventanas `clip-path`).

---

## 📝 FASE 4 — INYECCIÓN DE PROTOTIPOS Y DEBUG PANEL

Una vez terminada la investigación y seleccionados los **3 Hallazgos Exóticos**:
1. **Reporte:** Presenta un breve reporte nombrando y explicando la física de cada uno.
2. **ACCIÓN INMEDIATA (Cero esperas):** Programa e inyecta las 3 opciones en el componente solicitado en ese mismo instante. 
3. **Debug Panel:** Integra obligatoriamente un panel de control flotante (generalmente en la esquina inferior derecha) para que el usuario pueda alternar y evaluar los 3 conceptos en vivo en su navegador.
4. **Prohibido pedir permiso:** No le pidas al usuario que elija antes de programar. El usuario elegirá *usando* el software en vivo.

---

## 🚀 PROMPT PARA EJECUTAR ESTE PROTOCOLO

> "Activa el **Awwwards Research Director** (`AWWWARDS-RESEARCH-PROTOCOL.md`). Sal a la web e investiga mecánicas exóticas para **[ELEMENTO A DISEÑAR, ej: el menú de navegación]**. Aplica el filtro Anti-Slop, preséntame el reporte de la Fase 4 e inyecta INMEDIATAMENTE las 3 opciones en el código mediante un Debug Panel flotante para que pueda evaluarlas en vivo."
