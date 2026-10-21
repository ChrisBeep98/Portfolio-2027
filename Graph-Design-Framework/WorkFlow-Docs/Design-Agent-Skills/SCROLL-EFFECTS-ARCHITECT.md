---
name: Scroll Effects Architect
description: Complete reference with 7 advanced GSAP scroll techniques - Split Scroll, Stacking Cards, Horizontal Parallax, Scrollytelling, Velocity Animations, FLIP Transitions, and Micro-Interactions.
---

# 🎭 Agent Skill: Advanced Scroll Effects Architecture
## Guía Completa para Diseñar Efectos de Scroll Técnicos Complejos

**Nivel:** Avanzado  
**Stack:** GSAP 3.x + ScrollTrigger + Lenis (Smooth Scroll)  
**Target:** Webflow/Custom Development

---

## 📋 Índice de Técnicas (Actualizado 2025)

1. [Alternating Split Scroll (Panel Switching)](#1-alternating-split-scroll)
2. [Stacking Cards Effect (3D Depth)](#2-stacking-cards-effect)
3. [Horizontal Scroll + Cinematic Parallax](#3-horizontal-scroll--parallax--velocity-skew)
4. [Scrollytelling Narrative (Pinned Sections)](#4-scrollytelling-narrative)
5. [Velocity-Based Animations (Stretch & Skew)](#5-scroll-velocity-based-animations)
6. [GSAP FLIP: Seamless Layout Transitions](#6-gsap-flip-seamless-layout)
7. [Ultra-Fast Micro-Interactions (The 2025 Standard)](#7-ultra-fast-micro-interactions)

---

## 1. Alternating Split Scroll

### 🎯 Concepto Arquitectónico
Técnica de **pinning alternado** donde dos columnas intercambian el control del scroll. Una sección se queda fija (pinned) mientras la otra se desplaza, luego alternan.

**Patrón Visual:**
```
Fase 1 (0-33%):   [IZQ: PINNED] | [DER: SCROLLEA ↑]
Fase 2 (33-66%):  [TRANSICIÓN: Swap de control]
Fase 3 (66-100%): [IZQ: SCROLLEA ↑] | [DER: PINNED]
```

### 🏗️ Estructura HTML
```html
<div class="split-master-wrapper">
  <!-- Track de scroll invisible que controla la duración -->
  <div class="scroll-track" style="height: 300vh;"></div>

  <!-- Contenedor sticky principal -->
  <div class="split-viewport">

    <!-- Panel Izquierdo -->
    <div class="panel panel-left" data-phase="1">
      <div class="content-block" data-index="0">Contenido A1</div>
      <div class="content-block" data-index="1">Contenido A2</div>
      <div class="content-block" data-index="2">Contenido A3</div>
    </div>

    <!-- Panel Derecho -->
    <div class="panel panel-right" data-phase="3">
      <div class="content-block" data-index="0">Contenido B1</div>
      <div class="content-block" data-index="1">Contenido B2</div>
      <div class="content-block" data-index="2">Contenido B3</div>
    </div>

  </div>
</div>
```

### 🎨 CSS Base
```css
.split-master-wrapper {
  position: relative;
  width: 100%;
}

.scroll-track {
  /* Altura = número de fases × 100vh */
  height: 300vh;
  pointer-events: none;
}

.split-viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.panel {
  width: 50vw;
  height: 100vh;
  position: relative;
  will-change: transform;
}

.content-block {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; /* Se revela con GSAP */
  transform: translateY(100vh);
}

/* Z-index dinámico gestionado por JS */
.panel-left { z-index: 10; }
.panel-right { z-index: 20; }
```

### ⚙️ Lógica GSAP (Arquitectura Master Timeline)
```javascript
gsap.registerPlugin(ScrollTrigger);

const masterTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".split-master-wrapper",
    start: "top top",
    end: "bottom bottom",
    scrub: 1, // Suavizado esencial para el efecto
    snap: {
      snapTo: [0, 0.33, 0.66, 1], // Snap a puntos de fase
      duration: { min: 0.2, max: 0.5 },
      ease: "power2.inOut"
    }
  }
});

// === FASE 1: Izquierda fija, derecha entra ===
masterTl
  .to(".panel-right .content-block[data-index='0']", {
    y: 0,
    opacity: 1,
    duration: 0.33,
    ease: "none"
  })
  .to(".panel-right .content-block[data-index='0']", {
    y: "-100vh",
    opacity: 0,
    duration: 0.01 // Cambio instantáneo al final de fase
  })

  // === FASE 2: Swap - Ambos se mueven ===
  .to(".panel-left .content-block[data-index='0']", {
    y: "-100vh",
    duration: 0.33,
    ease: "none"
  }, 0.33)
  .to(".panel-right .content-block[data-index='1']", {
    y: 0,
    opacity: 1,
    duration: 0.33
  }, 0.33)

  // Cambio de z-index en el punto medio
  .add(() => {
    document.querySelector('.panel-left').style.zIndex = '20';
    document.querySelector('.panel-right').style.zIndex = '10';
  }, 0.50)

  // === FASE 3: Derecha fija, izquierda entra ===
  .to(".panel-left .content-block[data-index='1']", {
    y: 0,
    opacity: 1,
    duration: 0.34
  }, 0.66)
  .to(".panel-left .content-block[data-index='1']", {
    scale: 1.1, // Efecto de enfoque final
    duration: 0.1
  });

// Sistema de progreso para debugging
ScrollTrigger.create({
  trigger: ".split-master-wrapper",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const progress = self.progress;
    let currentPhase = '';

    if (progress < 0.33) currentPhase = 'LEFT_PINNED';
    else if (progress < 0.66) currentPhase = 'TRANSITION_SWAP';
    else currentPhase = 'RIGHT_PINNED';

    document.body.setAttribute('data-scroll-phase', currentPhase);
  }
});
```

### 🔧 Consideraciones Técnicas

**1. Z-Index Management**
- El panel activo siempre debe tener `z-index` superior
- Usar `will-change: transform` en ambos paneles
- Evitar `position: fixed` dentro de elementos pinned

**2. Performance**
```css
.panel {
  contain: layout style paint;
  content-visibility: auto;
}
```

**3. Responsive Breakpoints**
```javascript
ScrollTrigger.matchMedia({
  "(min-width: 1024px)": () => {
    // Inicializar efecto completo
    return () => { masterTl.kill(); };
  },
  "(max-width: 1023px)": () => {
    // Versión apilada vertical
    gsap.set(".panel", { 
      position: "relative", 
      width: "100%",
      height: "auto" 
    });
  }
});
```

---

## 2. Stacking Cards Effect

### 🎯 Concepto
Tarjetas que se apilan una sobre otra formando una "pila" visual mientras el usuario hace scroll. Cada nueva tarjeta cubre la anterior con efecto de escala y profundidad.

### 🏗️ Estructura HTML
```html
<section class="stacking-section">
  <div class="cards-container">
    <div class="card" data-index="0">
      <div class="card-content">Card 1</div>
    </div>
    <div class="card" data-index="1">
      <div class="card-content">Card 2</div>
    </div>
    <div class="card" data-index="2">
      <div class="card-content">Card 3</div>
    </div>
  </div>
</section>
```

### 🎨 CSS (Grid Trick)
```css
.stacking-section {
  height: 300vh; /* Espacio para el scroll */
  position: relative;
}

.cards-container {
  display: grid;
  /* Todos los items en la misma celda */
  grid-template-areas: "stack";
  position: sticky;
  top: 10vh;
  height: 80vh;
}

.card {
  grid-area: stack; /* Todos se superponen */
  height: 80vh;
  border-radius: 20px;
  transform-origin: center top;
  will-change: transform;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
}

/* Offset inicial visual */
.card[data-index="0"] { transform: translateY(0); }
.card[data-index="1"] { transform: translateY(20px); }
.card[data-index="2"] { transform: translateY(40px); }
```

### ⚙️ Lógica GSAP
```javascript
const cards = gsap.utils.toArray(".card");
const cardCount = cards.length;

// Timeline principal
const stackTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".stacking-section",
    start: "top top",
    end: "+=300%",
    pin: ".cards-container",
    scrub: 1,
    snap: 1 / (cardCount - 1),
    invalidateOnRefresh: true
  }
});

cards.forEach((card, i) => {
  const scaleValue = 1 - (cardCount - 1 - i) * 0.05;
  const brightness = 100 - (cardCount - 1 - i) * 10;

  if (i < cardCount - 1) {
    stackTl.to(card, {
      scale: scaleValue,
      filter: `brightness(${brightness}%)`,
      y: -30 * (i + 1), // Sube para revelar siguiente
      duration: 1,
      ease: "none"
    }, i);
  }
});

// Efecto de entrada para cada card
cards.forEach((card, i) => {
  gsap.from(card, {
    y: "100vh",
    scrollTrigger: {
      trigger: ".stacking-section",
      start: () => `top+=${i * (100 / cardCount)}% top`,
      end: () => `top+=${(i + 1) * (100 / cardCount)}% top`,
      scrub: true
    }
  });
});
```

---

## 3. Horizontal Scroll + Parallax + Velocity Skew

### 🎯 Concepto
Sección que convierte el scroll vertical en horizontal, con parallax en imágenes de fondo y deformación (skew) basada en la velocidad del scroll.

### 🏗️ Estructura HTML
```html
<section class="horizontal-section">
  <div class="horizontal-wrapper">
    <div class="horizontal-track">
      <div class="h-item">
        <div class="h-bg-image" style="background-image: url(...)"></div>
        <div class="h-content">Content 1</div>
      </div>
      <div class="h-item">
        <div class="h-bg-image"></div>
        <div class="h-content">Content 2</div>
      </div>
      <!-- Más items -->
    </div>
  </div>
</section>
```

### 🎨 CSS
```css
.horizontal-section {
  height: 100vh;
  overflow: hidden;
}

.horizontal-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
}

.horizontal-track {
  display: flex;
  gap: 10vw;
  padding: 0 5vw;
  will-change: transform;
}

.h-item {
  flex-shrink: 0;
  width: 35vw;
  height: 70vh;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  /* Para el skew effect */
  will-change: transform;
  transform-origin: center center;
}

.h-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  /* Para parallax interno */
  width: 120%;
  left: -10%;
  will-change: background-position;
}
```

### ⚙️ Lógica GSAP Completa
```javascript
// 1. Scroll Horizontal Principal
const track = document.querySelector(".horizontal-track");
const items = gsap.utils.toArray(".h-item");

const horizontalScroll = gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: () => `+=${track.scrollWidth}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: 1
  }
});

// 2. Parallax en imágenes de fondo
items.forEach((item) => {
  const bg = item.querySelector(".h-bg-image");

  gsap.fromTo(bg, 
    { backgroundPosition: "0% 50%" },
    {
      backgroundPosition: "100% 50%",
      ease: "none",
      scrollTrigger: {
        trigger: item,
        containerAnimation: horizontalScroll, // Vinculado al scroll horizontal
        start: "left right",
        end: "right left",
        scrub: true
      }
    }
  );
});

// 3. Velocity Skew Effect
const skewSetter = gsap.quickSetter(".h-item", "skewX", "deg");
const clamp = gsap.utils.clamp(-10, 10); // Limitar skew máximo

let proxy = { skew: 0 };

ScrollTrigger.create({
  trigger: ".horizontal-section",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    const skewAmount = clamp(velocity / -300); // Ajustar divisor para sensibilidad

    // Solo actualizar si el skew es significativo
    if (Math.abs(skewAmount) > Math.abs(proxy.skew)) {
      proxy.skew = skewAmount;

      gsap.to(proxy, {
        skew: 0,
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew)
      });
    }
  }
});

// 4. Scale/Reveal de items al entrar
items.forEach((item, i) => {
  gsap.from(item, {
    scale: 0.8,
    opacity: 0.5,
    scrollTrigger: {
      trigger: item,
      containerAnimation: horizontalScroll,
      start: "left center",
      end: "center center",
      scrub: true
    }
  });
});
```

---

## 4. Scrollytelling Narrative

### 🎯 Concepto
Narrativa guiada donde el scroll controla la progresión de una historia. Elementos se revelan en secuencia, texto aparece palabra por palabra, y visuales cambian sincronizados.

### 🏗️ Estructura
```html
<article class="story-container">

  <!-- Pin 1: Intro -->
  <section class="story-chapter" data-chapter="1">
    <div class="sticky-visual">
      <div class="visual-bg" style="background-image: url(scene1.jpg)"></div>
      <div class="visual-overlay"></div>
    </div>
    <div class="narrative-text">
      <p class="line" data-line="1">Primera línea...</p>
      <p class="line" data-line="2">Segunda línea...</p>
      <p class="line" data-line="3">Tercera línea...</p>
    </div>
  </section>

  <!-- Pin 2: Desarrollo -->
  <section class="story-chapter" data-chapter="2">
    <!-- Estructura similar -->
  </section>

</article>
```

### ⚙️ Lógica GSAP (SplitText + Timeline)
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText);

const chapters = gsap.utils.toArray(".story-chapter");

chapters.forEach((chapter, i) => {
  const bg = chapter.querySelector(".visual-bg");
  const lines = chapter.querySelectorAll(".line");

  // Timeline para cada capítulo
  const chapterTl = gsap.timeline({
    scrollTrigger: {
      trigger: chapter,
      start: "top top",
      end: "+=200%", // 200vh de scroll para esta sección
      pin: ".sticky-visual",
      scrub: 1,
      snap: {
        snapTo: "labels", // Snap a las etiquetas del timeline
        duration: { min: 0.2, max: 0.5 }
      }
    }
  });

  // SplitText para animar palabra por palabra
  lines.forEach((line, index) => {
    const split = new SplitText(line, { type: "words,chars" });

    chapterTl
      .addLabel(`line${index}`)
      .from(split.chars, {
        opacity: 0,
        y: 50,
        rotationX: 90,
        stagger: 0.02,
        duration: 0.5
      })
      .to(bg, {
        scale: 1.1 + (index * 0.05), // Zoom progresivo
        filter: `brightness(${100 - index * 10}%)`,
        duration: 1
      }, "<"); // Sincronizado con texto
  });

  // Transición de salida
  chapterTl
    .addLabel("exit")
    .to(bg, { 
      opacity: 0, 
      scale: 1.3,
      duration: 0.5 
    });
});
```

---

## 5. Scroll Velocity-Based Animations

### 🎯 Concepto
Animaciones que responden a la velocidad del scroll, no solo a la posición. Efectos de "stretch", skew, o deformación basados en qué tan rápido scrollea el usuario.

### ⚙️ Sistema Base Reutilizable
```javascript
class VelocityAnimator {
  constructor(targets, config = {}) {
    this.targets = gsap.utils.toArray(targets);
    this.config = {
      property: "skewX",
      unit: "deg",
      maxValue: 10,
      sensitivity: 300,
      lerp: 0.1,
      ...config
    };

    this.proxy = { value: 0 };
    this.setter = gsap.quickSetter(this.targets, this.config.property, this.config.unit);
    this.clamp = gsap.utils.clamp(-this.config.maxValue, this.config.maxValue);

    this.init();
  }

  init() {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const targetValue = this.clamp(velocity / this.config.sensitivity);

        if (Math.abs(targetValue) > Math.abs(this.proxy.value)) {
          this.proxy.value = targetValue;

          gsap.to(this.proxy, {
            value: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => this.setter(this.proxy.value)
          });
        }
      }
    });
  }
}

// Uso:
// Skew basado en velocidad
new VelocityAnimator(".velocity-skew", {
  property: "skewY",
  maxValue: 15,
  sensitivity: 200
});

// Scale stretch
new VelocityAnimator(".velocity-stretch", {
  property: "scaleY",
  unit: "",
  maxValue: 1.2,
  sensitivity: 400
});

// Rotation
new VelocityAnimator(".velocity-rotate", {
  property: "rotation",
  maxValue: 30,
  sensitivity: 250
});
```

---

## 6. GSAP FLIP: Seamless Layout Transitions (2025 Trend)

### 🎯 Concepto
En lugar de animar posiciones en pixeles, usamos el plugin FLIP de GSAP (First, Last, Invert, Play) para crear transiciones de estado imposibles o morphings complejos (e.g., una tarjeta que se expande para convertirse en un modal hero). Es la técnica reina en los Sitios del Mes de Awwwards para 2025.

### ⚙️ Lógica Base
```javascript
gsap.registerPlugin(Flip);

function toggleCardState(card) {
  // 1. FIRST: Capturar el estado inicial
  const state = Flip.getState(card);

  // 2. LAST: Hacer el cambio en el DOM (añadir clase)
  card.classList.toggle("is-expanded");

  // 3 & 4. INVERT & PLAY: GSAP anima la diferencia
  Flip.from(state, {
    duration: 0.8,
    ease: "power4.inOut",
    absolute: true, // Crucial para elementos que cambian de flujo (flex/grid a absolute)
    onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.8}),
    onLeave: elements => gsap.to(elements, {opacity: 0, duration: 0.4})
  });
}
```

---

## 7. Ultra-Fast Micro-Interactions (The 2025 Standard)

### 🎯 Concepto
Las interacciones de hover, click, y cursores líquidos ya no deben sentirse "lentas" o "acolchadas". La tendencia es movimiento sutil pero **ultra rápido y de respuesta instantánea** (snappy) para dar sensación de control absoluto y tecnología avanzada.

### ⚙️ Implementación (Snappy Hover)
```javascript
// Hover responsivo y cortante (0.2s - 0.3s max)
gsap.utils.toArray('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" }); // Retorno un poco más relajado
  });
});
```

### 🎯 Concepto
Transiciones fluidas donde una sección se transforma en otra usando clip-path, morphSVG o transformaciones 3D durante el scroll.

### ⚙️ Ejemplo: Clip-Path Reveal
```javascript
const morphSection = gsap.timeline({
  scrollTrigger: {
    trigger: ".morph-wrapper",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: 1
  }
});

morphSection
  .fromTo(".section-a", 
    { clipPath: "circle(100% at 50% 50%)" },
    { clipPath: "circle(0% at 50% 50%)", duration: 0.5 }
  )
  .fromTo(".section-b",
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(100% at 50% 50%)", duration: 0.5 },
    "<" // Superposición
  )
  .to(".section-b .content", {
    scale: 1,
    opacity: 1,
    duration: 0.5
  });
```

---

## 🛠️ Setup General Requerido

### 1. Smooth Scroll (Lenis)
```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sincronizar con ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### 2. Configuración Global GSAP
```javascript
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// Prevenir FOUC
gsap.set(".animate-on-scroll", { 
  visibility: "visible" 
});
```

### 3. Resize Handler
```javascript
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
```

---

## ⚠️ Reglas de Oro

1. **Nunca uses `position: fixed` dentro de elementos pinned** - Usa `position: sticky` o transformaciones
2. **Siempre usa `invalidateOnRefresh: true`** para animaciones responsive
3. **Evita animar `width/height`** - Usa `scale` o `clip-path` para mejor performance
4. **Usa `will-change` con moderación** - Solo en elementos activos
5. **Testea en dispositivos reales** - El scroll táctil se comporta diferente
6. **Respeta `prefers-reduced-motion`** - Desactiva efectos complejos para accesibilidad

```javascript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (prefersReducedMotion.matches) {
  ScrollTrigger.getAll().forEach(st => st.kill());
}
```

---

## 📦 Checklist de Implementación

- [ ] Estructura HTML semántica con data-attributes
- [ ] CSS base con `contain` y `content-visibility`
- [ ] GSAP timeline organizado por fases
- [ ] Sistema de snap configurado
- [ ] MatchMedia para responsive
- [ ] Lenis smooth scroll integrado
- [ ] Cleanup functions para unmount
- [ ] Test de performance (FPS > 55)
- [ ] Accesibilidad (reduced-motion)

---

**Nota para IA:** Cuando se solicite implementar cualquiera de estas técnicas, seguir este orden:
1. Analizar el layout y determinar la técnica más adecuada
2. Crear la estructura HTML semántica primero
3. Implementar CSS base con consideraciones de performance
4. Desarrollar la lógica GSAP siguiendo el patrón de timeline mostrado
5. Agregar responsive y accesibilidad
6. Testear y optimizar
