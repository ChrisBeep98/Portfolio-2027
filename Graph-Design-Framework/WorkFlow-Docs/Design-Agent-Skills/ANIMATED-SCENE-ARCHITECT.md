---
name: Animated Scene Architect
description: Elite UI/UX and Creative Direction skill for crafting Zen-Minimalist animated visual scenes, abstract diegetic UI skeletons, Swiss watchmaker micro-graphics, 3D flip glass cards, and continuous 60fps breathing micro-loops across any product or industry.
---

# 🎐 ANIMATED SCENE ARCHITECT: El Arte de las Visuales Zen-Minimalistas y Esqueletos Vivos

> **Manifiesto Artístico:**
> *"Nunca muestres capturas de pantalla ruidosas ni cajas estáticas sin vida. Esculpe dioramas digitales puros—forjados en cristal líquido esmerilado, bañados en luz cromática ambiental y animados con el silencio, el ritmo y la precisión de una pieza de relojería suiza."*

---

## 👁️ 1. LA FILOSOFÍA ZEN Y EL "WHISPER UI"

El diseño digital de más alta gama (Awwwards Site of the Year, Apple Pro, Linear, Stripe, Flowtify) se rige por la **Estética del Susurro (Whisper UI)**: *Si un elemento es obvio, hazlo sutil; si es sutil, hazlo casi invisible, como vaho sobre un cristal.*

```
             ┌────────────────────────────────────────────────────────────────────────┐
             │       TOP LIGHT SPECULAR (Reflejo óptico de 1px)                       │
             │       h-[1px] bg-gradient-to-r from-transparent via-[COLOR]/50 to-t   │
             ├────────────────────────────────────────────────────────────────────────┤
             │                                                                        │
             │   [HALO CROMÁTICO ATMOSFÉRICO]                                         │
             │   Luz difusa orgánica de fondo                                         │
             │   w-40 h-40 bg-[COLOR]/10 blur-[60px] rounded-full                     │
             │                                                                        │
             │   [ESQUELETO DIEGÉTICO VIVO]                                           │
             │   • Waveforms de audio: 13 micro-barras de 2px                         │
             │   • Typing dots: 3 esferas con opacidad decreciente (15%, 10%, 8%)    │
             │   • Líneas de radar: trazo ultrafino de 0.5px de grosor                │
             │                                                                        │
             │   [MICRO-TIPOGRAFÍA DE RELOJERÍA]                                      │
             │   • text-[7px] text-white/10 -> "0:12"                                 │
             │   • text-[8px] text-white/10 -> "10:42" + ✓✓ en #53BDEB/25            │
             │                                                                        │
             │   [TEXTURA DE GRANO ANALÓGICO]                                         │
             │   • SVG feTurbulence al 3% (elimina la textura de plástico digital)    │
             │                                                                        │
             └────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 2. LOS 5 PILARES DE LA ARTESANÍA VISUAL ZEN

### Pilar I: La Jerarquía de Micro-Opacidades (Whisper Opacities)
Nunca uses colores 100% sólidos opacos para fondos ni elementos de interfaz. Construye profundidad superponiendo velos translúcidos:
- **Cuerpo del Cristal:** `bg-white/5` a `bg-white/[0.08]` (92–95% de transparencia pura).
- **Formas Secundarias / Placeholders:** `bg-white/10` a `bg-white/20`.
- **Cristal Texturizado:** `border border-white/10` o `border-white/15 backdrop-blur-xl`.
- **Acentos de Color de Marca:** Nunca saturación al 100%. Tiñe con `bg-[#25D366]/20`, `bg-[#0084FF]/15`, `bg-purple-500/10`.
- **Texto de Metadatos Fantasma:** `text-white/10`, `text-white/20`, `text-white/40`.

### Pilar II: Micro-Tipografía a Escala de Relojero Suizo
Cuando los gráficos muestran metadatos microscópicos y exquisitamente proporcionados, el subconsciente percibe **máxima ingeniería y lujo**:
- Duraciones / Horas: `text-[7px]` o `text-[8px]` con `font-mono tracking-wider text-white/10`.
- Badges / Monedas: `text-[9px]` o `text-[10px]` con `font-mono tracking-widest uppercase`.
- Símbolos de Estado: Doble check en miniatura (`✓✓` en `#53BDEB/25`), pastilla de reacción (`👍` a `opacity-40 text-[8px]`).

### Pilar III: Precisión Geométrica Vectorial (Hairline Strokes)
- **Grosores de Trazo:** Usa líneas de `0.5px` a `1px` para círculos, ejes cartesianos y esferas.
- **Arrays de Waveforms:** Usa arreglos matemáticos armónicos en vez de alturas aleatorias:
  `[40, 70, 30, 85, 50, 65, 25, 75, 45, 60, 35, 80, 55] * 0.14px`.
- **Anchura:** Las barras de onda son estrictamente de `w-[2px]` con `rounded-full`.

### Pilar IV: Shaders Táctiles y Luz Especular
- **Borde Especular Superior:** Una línea óptica de 1px en la parte superior simula el bisel de un cristal reflejando la luz del techo:
  ```tsx
  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[COLOR]/50 to-transparent pointer-events-none" />
  ```
- **Grano Analógico:** Una textura de ruido SVG al 3% elimina la apariencia sintética de render:
  ```tsx
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
  ```

### Pilar V: Respiración Cinética (Stillness & Living Cycles)
El movimiento no es hiperactivo; respira con cadencia:
- **Pausa de Contemplación:** Los micro-loops entran suavemente (`0.4s`), pero se quedan **completamente inmóviles durante 2.5 segundos** (`+=2.5`) para que el ojo descanse antes de desvanecerse.
- **Aura Respirable (`ps2-breathe`):** El halo de luz ambiental pulsa `scale(1) → scale(1.15)` en ciclos sinusoidales de 4 segundos.

---

## 🏛️ 3. LA COREOGRAFÍA TEMPORAL EN 4 ACTOS

```
[ACTO 0: Vacío Espacial & Horizonte]
  └── Fondo atmosférico oscuro, gradiente de 4 pilares, marca de agua tipográfica.
[ACTO 1: La Revelación Espacial]
  └── Pinning de ScrollTrigger, máscara circular expansiva (`waveCircleRef`), título hero cinético.
[ACTO 2: Llegada Escalonada de Shards]
  └── Tarjetas en grid asimétrico emergen en cascada (`y: 40px → 0px, opacity: 0 → 1, stagger: 0.1s`).
[ACTO 3: Los Micro-Loops Vivos Autónomos]
  └── Waveforms, typing dots y streams de datos se animan perpetuamente con pausas orgánicas.
[ACTO 4: Interacción Dimensional Táctil]
  └── Giro físico 3D Flip (180° al click), hover scale (`1.02x`) y badge de giro `flipBounce`.
```

---

## 💎 4. CATÁLOGO UNIVERSAL DE GRÁFICOS ZEN

Componentes de arte listos para producción para cualquier industria:

---

### Componente A: El Waveform de Audio de Lujo & Nota de Voz
*Uso: WhatsApp, IA de Voz, Podcasts, Mensajería, Asistentes Virtuales.*

```tsx
<div className="w-full flex flex-col gap-3">
  {/* Burbuja de Nota de Voz */}
  <div className="w-3/4 bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm flex items-center gap-3 px-4 h-[51px] backdrop-blur-md">
    {/* Micro Botón de Play */}
    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5 opacity-40 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
    </div>
    {/* Waveform Armónico de 13 Barras */}
    <div className="flex items-center gap-[2px] flex-1">
      {[40, 70, 30, 85, 50, 65, 25, 75, 45, 60, 35, 80, 55].map((h, i) => (
        <div 
          key={i} 
          className="w-[2px] rounded-full bg-white/[0.12] transition-all duration-300" 
          style={{ height: `${h * 0.14}px` }} 
        />
      ))}
    </div>
    {/* Timestamp de Relojero */}
    <span className="text-[7px] font-mono text-white/20 tracking-wider shrink-0">0:12</span>
  </div>

  {/* Mensaje Saliente con Doble Check */}
  <div className="w-1/2 bg-[#25D366]/20 border border-[#25D366]/25 rounded-2xl rounded-br-sm self-end ml-auto flex items-center justify-between px-4 h-[51px]">
    <div className="h-1.5 w-1/3 bg-white/20 rounded-full" />
    <div className="flex items-center gap-1.5">
      <span className="text-[8px] font-mono text-white/20">10:42</span>
      {/* Doble Check Azul Cian */}
      <svg viewBox="0 0 16 11" fill="none" className="w-3.5 h-2.5 text-[#53BDEB]/35">
        <path d="M11.07 0.66L4.68 7.09L2.93 5.37L1.5 6.84L4.68 9.97L12.5 2.13L11.07 0.66Z" fill="currentColor"/>
        <path d="M14.07 0.66L7.68 7.09L6.83 6.25L5.4 7.71L7.68 9.97L15.5 2.13L14.07 0.66Z" fill="currentColor"/>
      </svg>
    </div>
  </div>
</div>
```

---

### Componente B: El Stream de Escritura & Reacción Minimalista
*Uso: Messenger, Soporte en Vivo, Chatbots IA, Colaboración.*

```tsx
<div className="w-full flex flex-col gap-3">
  {/* Píldora de Typing Dots */}
  <div className="bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5 px-4 h-[44px] self-start">
    <div className="w-1.5 h-1.5 rounded-full bg-white/25 animate-pulse" style={{ animationDelay: '0s' }} />
    <div className="w-1.5 h-1.5 rounded-full bg-white/15 animate-pulse" style={{ animationDelay: '0.2s' }} />
    <div className="w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: '0.4s' }} />
  </div>

  {/* Mensaje Saliente con Reacción Flotante */}
  <div className="w-3/5 bg-[#0084FF]/20 border border-[#0084FF]/25 rounded-2xl rounded-br-sm self-end ml-auto flex items-center justify-between px-4 h-[48px] relative">
    <div className="h-1.5 w-1/3 bg-white/25 rounded-full" />
    {/* Reacción Flotante */}
    <div className="absolute -bottom-2 right-3 w-5 h-5 rounded-full bg-[#0084FF]/30 border border-white/20 flex items-center justify-center shadow-lg">
      <span className="text-[8px] opacity-60">👍</span>
    </div>
  </div>
</div>
```

---

### Componente C: La Cuadrícula de Feed Zen 2x2
*Uso: Instagram, Portafolios, E-Commerce, Catálogos.*

```tsx
<div className="grid grid-cols-2 gap-2.5 w-full flex-1 min-h-0">
  {[1, 2, 3, 4].map((i) => (
    <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden relative flex flex-col justify-end p-2.5 h-[80px] group transition-all duration-500 hover:bg-white/10">
      {/* Corazón Sutil en la Esquina */}
      {i === 1 && (
        <div className="absolute bottom-2.5 left-2.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-3.5 h-3.5 opacity-20">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
      )}
      {/* Micro Pip de Notificación Roja */}
      {i === 3 && (
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#FF2D55]/50 animate-ping" />
      )}
      <div className="w-3/4 h-1.5 bg-white/20 rounded-full mb-1" />
      <div className="w-1/2 h-1 bg-white/10 rounded-full" />
    </div>
  ))}
</div>
```

---

### Componente D: El Radar Astronómico de Precisión & Medidor de Telemetría
*Uso: Analítica, Seguridad, Monitoreo, Datos de Sensores.*

```tsx
<div className="relative w-20 h-20 mx-auto flex items-center justify-center">
  {/* Anillos Concêntricos (0.5px) */}
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="0.5" opacity="0.15" fill="none" />
    <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="0.5" opacity="0.1" fill="none" />
    {/* 8 Puntos Cardinales */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <circle key={angle} cx={32 + 28 * Math.cos(rad)} cy={32 + 28 * Math.sin(rad)} r="0.75" fill="white" opacity="0.3" />
      );
    })}
    {/* Aguja de Escaneo */}
    <line x1="32" y1="32" x2="32" y2="6" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" className="origin-[32px_32px] animate-[spin_4s_linear_infinite]" />
  </svg>
  {/* Núcleo Brillante */}
  <div className="absolute w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#22d3ee]" />
</div>
```

---

### Componente E: Tarjeta de Cristal Financiera de Lujo
*Uso: Fintech, Pagos, Suscripciones, Cripto.*

```tsx
<div className="w-full p-4 bg-gradient-to-tr from-white/[0.12] to-white/[0.02] border border-white/15 rounded-2xl flex flex-col justify-between h-[120px] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
  <div className="flex justify-between items-center">
    {/* Chip Dorado EMV */}
    <div className="w-7 h-5 rounded bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center">
      <div className="w-3 h-2 border-t border-b border-yellow-400/40" />
    </div>
    <span className="text-[9px] font-mono text-white/30 tracking-widest">FLOWTIFY PRO</span>
  </div>
  <div className="flex justify-between items-end">
    <span className="text-xs font-mono text-white/70 tracking-widest">•••• 9184</span>
    <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">+$2,480.00</span>
  </div>
</div>
```

---

## 🔄 5. SISTEMA DE GIRO FÍSICO 3D (FLIP SYSTEM)

```css
.card-flip-container {
  perspective: 1200px;
}
.card-flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), scale 0.3s ease;
}
.card-flip-inner:hover {
  scale: 1.02;
}
.card-flip-inner.flipped {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: inherit;
}
.card-back {
  transform: rotateY(180deg);
}

@keyframes flipBounce {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
}
```

---

## ⚡ 6. MOTOR GSAP 60FPS & SMART SHUTDOWN

```typescript
// Loop autónomo GSAP con pausa de contemplación de 2.5s
useEffect(() => {
  if (!bubblesRef.current || window.innerWidth < 768) return;
  const bubbles = bubblesRef.current.children;
  if (!bubbles.length) return;

  gsap.set(bubbles, { opacity: 0, y: 12 });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, delay: 0.4 });

  tl.to(bubbles, { opacity: 1, y: 0, duration: 0.4, stagger: 0.3, ease: 'power2.out' })
    .to(bubbles, { opacity: 0, y: -6, duration: 0.3, stagger: 0.1, ease: 'power1.in' }, '+=2.5'); // Pausa de lectura

  return () => { tl.kill(); };
}, []);

// Smart Shutdown: Apaga el uso de GPU si sale del viewport
useEffect(() => {
  const cards = document.querySelectorAll('.social-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => e.target.classList.toggle('is-in-view', e.isIntersecting));
    },
    { threshold: 0.05 }
  );

  cards.forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, []);
```

---

## 🎯 CHECKLIST DE APROBACIÓN DEL DIRECTOR DE ARTE

1. [ ] **Jerarquía de Opacidades Whisper:** ¿Las tarjetas están en `bg-white/5` a `bg-white/[0.08]`? (Cero plástico opaco).
2. [ ] **Borde Especular Superior:** ¿Está presente la línea de reflejo óptico de 1px (`via-[COLOR]/50`)?
3. [ ] **Halo Cromático Atmosférico:** ¿Hay un resplandor `blur-[60px]` coloreando sutilmente la escena?
4. [ ] **Micro-Tipografía de Relojero:** ¿Las marcas de tiempo y métricas están en `text-[7px]`–`text-[9px]` con `font-mono tracking-wider`?
5. [ ] **Desfase Asimétrico en Grid:** ¿Las tarjetas contiguas usan elevaciones con `translate-y-*` para romper el plano horizontal?
6. [ ] **Pausa de Contemplación:** ¿Los bucles de movimiento se detienen inmóviles al menos `2.0s–2.5s` antes de reiniciar?
