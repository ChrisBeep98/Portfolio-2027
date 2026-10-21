# 📱 Mobile Responsiveness Protocol (Zero-Friction Mobile)

**Descripción:** Protocolo maestro para diseñar, refactorizar o auditar el comportamiento de secciones en dispositivos móviles (resoluciones `< 1024px` y especialmente `< 768px`). Reúne todas las lecciones aprendidas sobre físicas de scroll, layouts asimétricos, márgenes laterales y legibilidad.

---

## 🛠️ INSTRUCCIONES PARA EL AGENTE

Cuando el usuario invoque este protocolo o te pida arreglar la versión mobile de una sección, **DEBES OBLIGATORIAMENTE** auditar y aplicar los siguientes 5 pilares:

### Pilar 1: Físicas de Scroll vs Animaciones JS (El "Frenón" de Scroll)
**El problema:** En móviles, si usas `snap-x snap-mandatory` para crear carruseles horizontales, y al mismo tiempo GSAP (o cualquier framework) anima la propiedad `scale` o `transform` (`y`, `x`) de los elementos hijos individuales (`snap-center`), el motor físico nativo del navegador colapsa. Esto provoca que la pantalla táctil se congele al hacer scroll (scroll-blocking).
**La solución:**
- Usa **siempre** `gsap.matchMedia`.
- En Desktop (`min-width: 768px`): Anima libremente los hijos (stagger, scale, translateY) porque normalmente viven en un CSS Grid que no sufre de mecánicas de scroll-snap.
- En Mobile (`max-width: 767px`): **TIENES ESTRICTAMENTE PROHIBIDO** animar `scale` o transformaciones pesadas en los elementos hijos del carrusel. En su lugar, aplica una animación de `opacity` y un ligero `y` **únicamente al contenedor padre** (`scrollContainerRef`).

### Pilar 2: Sangrados a la Izquierda (Bleed Left) y Fallos de Hidratación
**El problema:** Calcular el margen izquierdo hacia el borde de la pantalla usando JavaScript (`getBoundingClientRect().left`) falla frecuentemente en móviles a causa de la hidratación de SSR o debido a re-layouts provocados por GSAP en elementos padre, ocasionando un parpadeo o margen persistente.
**La solución (CSS Puro en Mobile):**
- Conoce el sistema: El padding lateral móvil predeterminado es `var(--space-gutter-sm)`.
- Si necesitas que un elemento se pegue al borde izquierdo del viewport, **evita JS por completo en móvil**. Inyecta utilidades o un tag `<style>`:
  `margin-left: calc(-1 * var(--space-gutter-sm)) !important;`
  `width: calc(100% + var(--space-gutter-sm)) !important;`
- Limita el uso de offsets vía JavaScript **únicamente** a resoluciones de escritorio (`min-width: 1024px`), y si usas JS con GSAP simultáneamente, pon `setTimeout` anidados para recalcular el layout tras la entrada (100ms, 800ms, 1500ms).
- **Control de Recorte:** Si un elemento/imagen interno posee transformaciones negativas (`-translate-x-4`) para recortar bordes decorativos en escritorio, **desactívalas en móvil** (`md:-translate-x-4`); de lo contrario, al estar ya en `x=0`, sacarás el contenido fuera de la pantalla táctil.

### Pilar 3: Respetar la Tipografía y Naturalidad (Cero `text-balance` en Móviles)
**El problema:** La clase `text-balance` intenta que todas las líneas de un párrafo midan lo mismo. En textos gigantes (`text-display-lg` o superiores) sobre pantallas estrechas (375px), esta técnica fuerza saltos de línea prematuros y agresivos que desaprovechan totalmente el lienzo del dispositivo.
**La solución:**
- **Queda prohibido** usar `text-balance` en títulos principales en la versión móvil.
- Permite que los bloques de títulos fluyan de forma natural ocupando el 100% del ancho (`w-full`) y saltando de línea únicamente por límite natural del contenedor.
- Tipografía innegociable: Mantén la clase principal de escala (`text-display-lg`); no reduzcas la fuente para forzar acomodos en una línea.

### Pilar 4: Densidad, Espaciados y Ergonomía del CTA
**El problema:** En móvil, la navegación vertical no tolera vacíos inmensos que en escritorio pueden lucir estéticos, ni permite la exploración fácil de botones centralizados o listas eternas.
**La solución:**
- **Control de Grid Gaps:** Un `gap-fluid-lg` que funciona como columna en Desktop, resulta en un abismo masivo cuando las columnas se apilan (`order-1`, `order-2`) en móvil. Utiliza saltos responsivos obligatorios: `gap-y-8 lg:gap-fluid-lg` o `gap-y-10`.
- **Márgenes Finales:** Las secciones de CTA Final o transiciones hacia footer deben reducir radicalmente el padding inferior. Cambia `pb-section-lg` por `pb-section-xs`.
- **Botones Táctiles Ergónomicos (Thumb-Friendly):** Los botones principales y CTAs deben alinearse en bloque en móviles (`flex-col items-start`, `w-full`), y sus interiores deben usar un flujo expandido (ej: `justify-between` para empujar el texto a la izquierda y la flecha de acción a la extrema derecha).

### Pilar 5: Compresión de Contenido (Listas y Features)
**El problema:** Enumerar 8 características hacia abajo genera demasiada fatiga de scroll ("vertical overload").
**La solución:**
- Utiliza la heurística de compresión: Identifica grandes bloques de texto monótono o listas de viñetas, y propón su conversión automática en:
  1. Carruseles horizontales tipo Pill (Swipeables).
  2. Acordeones/Faqs fluidos.
  3. Pestañas (Tabs) o un Scroll-Tracker interactivo.

---

### 🚀 PROMPT PARA EJECUTAR (Copiar y pegar al chat de IA)
```markdown
# Ejecutar: Mobile Responsiveness Protocol
Por favor, analiza y refactoriza la sección [NOMBRE_DE_LA_SECCION] bajo los estándares del protocolo estricto `mobile-responsiveness-protocol.md`. 
Quiero que garantices específicamente:
1. Que no haya animaciones de scale/transform en hijos de contenedores snap-mandatory (Frenón de scroll / matchMedia).
2. Que todo layout 'Bleed-left' opere en CSS nativo y preciso para mobile sin depender de JS.
3. El destierro absoluto de `text-balance` en títulos Display grandes.
4. Reducción de gaps (y-axis) en layouts apilados.
5. Botones expansivos (w-full justify-between) con alineación a la izquierda para UX móvil.
Genera el código consolidado y limpio tras evaluar.
```
