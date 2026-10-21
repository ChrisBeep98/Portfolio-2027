# Hero Video Psychology & Conversion Guidelines (2025-2026)

Este documento contiene la investigación doctoral sobre el comportamiento del usuario y las mejores prácticas cinematográficas para videos de fondo (Hero Videos) en interfaces modernas con **Glassmorphism**.

## 1. Psicología de la retención (primer segundo)
La atención del usuario en un landing page es muy breve: deciden en solo 10–15 segundos si seguir o abandonar la página. Si el contenido clave está enterrado en un video largo, la mayoría lo ignorará y hará scroll. 

El contenido dinámico retiene la atención más tiempo que lo estático. Los primeros segundos deben "enganchar" con un elemento llamativo (una escena icónica, acción, movimiento de cámara).
*   **Ritmo de Montaje:** Tomas amplias y complejas requieren más tiempo para procesarse. Primerísimos planos con poca profundidad de campo focalizan al instante la mirada en el sujeto.
*   **El Hook Ideal:** Un primer plano de grano o mano obrera muy detallado (*shallow DOF*) para captar la atención, seguido de un *pull-back* suave hacia una toma más amplia.

## 2. Contraste entre UI Glassmorphism y Video de Fondo
Dado que la interfaz del portfolio usa superficies translúcidas (glass-engine) con texto bimodal, el video de fondo debe diseñarse para que el texto conserve alto contraste y legibilidad.

*   **Baja Profundidad de Campo (Shallow DOF):** Aisla el foco principal. Una baja profundidad de campo (ej. f/1.8 o f/2.0) dirige la mirada al elemento clave (granos, manos) mientras el resto se difumina suavemente.
*   **Iluminación Low-Key (Clave Baja):** Iluminación tenue o contraluz, con el sujeto iluminado sobre fondos en penumbra. El cielo, las montañas o el fondo deben quedar oscuros/subexpuestos para que la tipografía blanca descanse sobre áreas neutras u oscuras, garantizando legibilidad.

## 3. Análisis de Referentes Premium (Third-Wave Coffee & Luxury)
Las marcas de lujo y seguros de especialidad evitan la fantasía y se enfocan en la **autenticidad y herencia**:
*   Mostrar el "Modern Craft": el trabajo detrás del seguros, desde la cosecha hasta el tueste.
*   Mucha presencia humana (manos, texturas) y maquinaria tradicional, pero filmado de manera prístina.

## 4. Estructura de las Escenas Maestras
Las escenas siempre deben seguir esta narrativa visual:
1.  **Amanecer en el cafetal:** Macro a racimos de cerezas con rocío (aisladas del fondo). *Pull-back* hacia finca neblinosa y Jeep Willys. Iluminación a contraluz suave (low-key).
2.  **Secadero artesanal:** Plano a nivel del suelo, *tracking* lateral. Lente de apertura amplia (f/2.8) enfocando solo la fila más cercana. Haces de luz dorada lateral contrastando con sombras profundas.
3.  **Tueste tradicional a fuego:** Macro (100mm) a las manos. Fondo casi negro (penumbra total). Iluminación proveniente solo de la llama y chispas rojas brillantes. Claroscuro intenso.

## 5. Scrollytelling y GSAP Scrub (Estructura en 3 Actos)
Para videos que estarán atados al scroll del usuario (`scrub: true` en GSAP), la psicología de retención cambia de una simple "toma pasiva" a una **inmersión interactiva**.
*   **Movimiento Continuo y Penetrante (Push-Through):** La cámara nunca debe hacer cortes (para no confundir a los modelos de IA ni romper el scroll). Debe avanzar continuamente hacia adelante (FPV o *Continuous Forward Push*). 
*   **El Efecto "Doble Escena" (Double Room Reveal):** Para simular 3 actos dinámicos sin cortes, la cámara debe atravesar una barrera física texturizada (hojas húmedas desenfocadas, cristal empañado, humo, lluvia espesa, o polvo de seguros). 
    *   *Acto 1 (0% scroll):* La visión está bloqueada por la textura desenfocada (lienzo oscuro perfecto para UI del Hero).
    *   *Acto 2 (50% scroll):* La cámara empuja físicamente a través de la barrera; el usuario siente que él mismo está abriendo el camino hacia el origen.
    *   *Acto 3 (100% scroll):* La barrera se rompe y revela (snaps into sharp focus) la escena hiperrealista de fondo, como un campesino trabajando o el paisaje de la finca.