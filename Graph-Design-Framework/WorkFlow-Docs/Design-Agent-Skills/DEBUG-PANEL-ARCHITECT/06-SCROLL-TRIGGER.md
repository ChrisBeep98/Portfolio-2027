# 🎢 06. GSAP ScrollTrigger Visualizer (Custom Markers)

Para animaciones complejas basadas en el scroll (como los reveals complejos del split-scroll o las case studies), los sliders estáticos no sirven. Necesitamos visualizar y alterar los puntos de activación (`start`, `end`) de GSAP en tiempo real sin recompilar.

## 1. Setup del Estado (Start/End Points)
Inyectamos controles de porcentaje que definirán dónde arranca y termina la animación respecto a la pantalla.

```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgTriggerStart, __setDbgTriggerStart] = useState(80); // % del viewport (bottom)
const [__dbgTriggerEnd, __setDbgTriggerEnd] = useState(20);   // % del viewport (top)
const [__dbgPin, __setDbgPin] = useState(false);              // Activar/Desactivar efecto Sticky
const [__dbgScrub, __setDbgScrub] = useState(true);           // Animación ligada al scroll vs Play/Reverse
```

## 2. Inyección en `useGSAP` (El Motor Reactivo)
La clave está en forzar a GSAP a destruir el `ScrollTrigger` anterior y crear uno nuevo cada vez que el usuario mueve los sliders en el panel.

```tsx
useGSAP(() => {
  // Limpiar instancias previas para evitar memory leaks al debugear
  ScrollTrigger.getAll().forEach(t => t.kill());

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scroll-container',
      start: `top ${__dbgTriggerStart}%`, // Ej: "top 80%"
      end: `bottom ${__dbgTriggerEnd}%`,  // Ej: "bottom 20%"
      scrub: __dbgScrub ? 1 : false,      // Suavidad de 1 segundo si es true
      pin: __dbgPin,
      markers: true,                      // GSAP Markers Nativos (siempre ON en debug)
      id: "debug-trigger"                 // ID para purga fácil
    }
  });

  tl.fromTo('.anim-element', { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' });

}, { dependencies: [__dbgTriggerStart, __dbgTriggerEnd, __dbgPin, __dbgScrub] }); // ¡CRÍTICO! Array de dependencias
```

## 3. UI Controls en el Panel Lateral
Interfaz intuitiva para mover las líneas rojas/verdes de GSAP directamente desde el Drawer.

```tsx
<div className="space-y-4 border border-green/20 p-4 rounded-xl bg-green/5">
  <span className="text-green font-bold text-[12px] uppercase flex items-center gap-2">
    🎢 ScrollTrigger Matrix
  </span>

  {/* Slider: Start Point */}
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] text-white/50 font-mono">
      <span>Start: top {__dbgTriggerStart}%</span>
    </div>
    <input type="range" min={0} max={100} step={1} value={__dbgTriggerStart}
      onChange={(e) => __setDbgTriggerStart(Number(e.target.value))}
      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
                 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-green
                 [&::-webkit-slider-thumb]:rounded-full" />
  </div>

  {/* Slider: End Point */}
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] text-white/50 font-mono">
      <span>End: bottom {__dbgTriggerEnd}%</span>
    </div>
    <input type="range" min={0} max={100} step={1} value={__dbgTriggerEnd}
      onChange={(e) => __setDbgTriggerEnd(Number(e.target.value))}
      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
                 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500
                 [&::-webkit-slider-thumb]:rounded-full" />
  </div>

  {/* Toggles Arquitectónicos */}
  <div className="flex gap-2 pt-2">
    <button onClick={() => __setDbgPin(!__dbgPin)}
      className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-colors ${__dbgPin ? 'bg-green text-black' : 'bg-white/10 text-white/50'}`}>
      📍 PIN: {__dbgPin ? 'ON' : 'OFF'}
    </button>
    <button onClick={() => __setDbgScrub(!__dbgScrub)}
      className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-colors ${__dbgScrub ? 'bg-blue text-black' : 'bg-white/10 text-white/50'}`}>
      ⏱️ SCRUB: {__dbgScrub ? 'ON' : 'OFF'}
    </button>
  </div>
</div>
```

**Purge Rule Específica:** Al finalizar (Fase 3), se debe eliminar `markers: true` obligatoriamente del objeto `scrollTrigger` principal para que no se filtre a producción.