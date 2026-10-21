# 🎬 04. GSAP Scrubber & Motion Inspector

Ajustar animaciones GSAP a ciegas causa frustración. Esta herramienta permite enlazar una `timeline` de GSAP al panel lateral para controlarla manualmente (scrub) o alterar sus duraciones on-the-fly.

## 1. Captura de la Timeline Principal
Para inspeccionar una animación, necesitamos almacenar la instancia de la timeline en una referencia o en el estado, y exponer un control de `progress()`.

**State Setup:**
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgTlProgress, __setDbgTlProgress] = useState(0);
const [__dbgStagger, __setDbgStagger] = useState(0.1);
const [__dbgDuration, __setDbgDuration] = useState(1.2);
const __tlRef = useRef<gsap.core.Timeline | null>(null);

// Disparar re-render de la animación cuando cambian valores
const [__dbgRefreshKey, __setDbgRefreshKey] = useState(0);
```

## 2. Inyección en `useGSAP` o `useEffect`
Debemos matar la timeline anterior y recrearla con los nuevos valores.

```tsx
useGSAP(() => {
  // Limpiar instancia previa si existe
  if (__tlRef.current) __tlRef.current.kill();

  // Crear nueva Timeline
  const tl = gsap.timeline({
    paused: true, // ¡CRÍTICO! Pausado para que el Scrubber lo controle, o para usar Play.
    onUpdate: function() {
      // Actualizar el slider del Scrubber mientras corre la animación
      __setDbgTlProgress(this.progress());
    }
  });

  tl.fromTo('.anim-element', 
    { y: 50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: __dbgDuration, stagger: __dbgStagger, ease: 'power3.out' }
  );

  __tlRef.current = tl;

  // Opcional: auto-play al montar
  tl.play();

}, { dependencies: [__dbgRefreshKey, __dbgDuration, __dbgStagger] });
```

## 3. UI Controls para el Scrubber (En el Panel)

```tsx
<div className="space-y-4 border border-cyan/20 p-4 rounded-xl bg-cyan/5">
  
  <div className="flex justify-between items-center pb-2 border-b border-cyan/10">
    <span className="text-cyan font-bold text-[12px] uppercase">GSAP Master Control</span>
    
    {/* Controles de Reproducción */}
    <div className="flex gap-1">
      <button onClick={() => __tlRef.current?.restart()} className="w-8 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center text-[10px]">⏮</button>
      <button onClick={() => __tlRef.current?.pause()} className="w-8 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center text-[10px]">⏸</button>
      <button onClick={() => __tlRef.current?.play()} className="w-8 h-6 bg-cyan/20 text-cyan hover:bg-cyan/40 rounded flex items-center justify-center text-[10px] font-bold">▶</button>
    </div>
  </div>

  {/* Scrubber Manual */}
  <div className="space-y-1 pt-2">
    <div className="flex justify-between text-[10px] text-white/50 font-mono">
      <span>0.00</span>
      <span>Progress: {__dbgTlProgress.toFixed(2)}</span>
      <span>1.00</span>
    </div>
    <input 
      type="range" min={0} max={1} step={0.001} value={__dbgTlProgress}
      onChange={(e) => {
        const val = parseFloat(e.target.value);
        __setDbgTlProgress(val);
        // Scrub manual de la timeline
        if (__tlRef.current) {
          __tlRef.current.pause();
          __tlRef.current.progress(val);
        }
      }}
      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5
                 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-cyan
                 [&::-webkit-slider-thumb]:rounded-sm"
    />
  </div>

  {/* Controles de Tiempos */}
  <div className="pt-4 space-y-4">
    {/* Duration Slider */}
    {/* Stagger Slider */}
  </div>
</div>
```

**Ventaja Arquitectónica:** Si la animación es demasiado rápida para ver un fallo de opacidad (glitch visual), puedes pausarla (⏸) y arrastrar el scrubber lentamente para diseccionar el milisegundo exacto del fallo.