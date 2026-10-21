# 🧊 13. 3D Z-Index Visualizer (Stacking Context)

Uno de los problemas más difíciles en CSS es cuando algo debería estar encima de otro elemento pero no lo está (guerras de `z-index` y `stacking context`). Esta herramienta aplica una transformación 3D al contenedor padre y extruye los elementos hijos basándose en su `z-index`, permitiéndote ver tu app como si fuera un holograma en 3D.

## 1. Setup del Estado
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbg3D, __setDbg3D] = useState(false);
const [__dbg3DRotation, __setDbg3DRotation] = useState(60); // Inclinación
```

## 2. Inyección del Efecto 3D
Al activar el modo, el contenedor principal adquiere perspectiva 3D, y mediante CSS temporal forzamos a los elementos anidados a "volar" hacia la cámara.

```tsx
{__dbg3D && (
  <style>{`
    .debug-3d-root {
      transform: perspective(1500px) rotateX(${__dbg3DRotation}deg) rotateZ(-15deg);
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
      /* Prevenir que el 3D rompa el scroll global */
      max-height: 80vh; overflow: visible;
    }
    /* Extrusión por capas */
    .debug-3d-root > * { transform: translateZ(20px); box-shadow: 0 20px 20px rgba(0,0,0,0.5); }
    .debug-3d-root > * > * { transform: translateZ(30px); }
    
    /* Extrusión extrema para z-index altos */
    .debug-3d-root .z-10 { transform: translateZ(50px) !important; border: 1px solid rgba(0,255,0,0.5); }
    .debug-3d-root .z-20 { transform: translateZ(100px) !important; border: 1px solid rgba(255,255,0,0.5); }
    .debug-3d-root .z-30 { transform: translateZ(150px) !important; border: 1px solid rgba(255,0,0,0.5); }
    .debug-3d-root .z-40, .debug-3d-root .z-50 { transform: translateZ(200px) !important; }
    
    /* Añadir fondos semitransparentes para ver las capas */
    .debug-3d-root * { background-color: rgba(255,255,255,0.05); }
  `}</style>
)}

{/* Componente Envoltorio */}
<div className={`w-full ${__dbg3D ? 'debug-3d-root' : ''}`}>
  {/* Todo el contenido aquí */}
</div>
```

## 3. UI Control en el Panel
```tsx
<div className="p-4 border border-cyan-500/20 rounded-xl bg-cyan-500/5 mt-4">
  <div className="flex items-center justify-between mb-3">
    <div className="flex flex-col">
      <span className="text-cyan-400 font-bold text-[12px] uppercase">🧊 3D Z-Index Viewer</span>
      <span className="text-white/40 text-[9px] mt-0.5">Descompone la UI en capas espaciales.</span>
    </div>
    <button onClick={() => __setDbg3D(!__dbg3D)}
      className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
        __dbg3D ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'bg-white/10 text-white/50'
      }`}>
      {__dbg3D ? '3D ON' : '3D OFF'}
    </button>
  </div>

  {__dbg3D && (
    <div className="space-y-1 pt-2 border-t border-cyan-500/20">
      <div className="flex justify-between text-[10px] text-white/50">
        <span>Inclinación X</span>
        <span className="font-mono">{__dbg3DRotation}°</span>
      </div>
      <input type="range" min={0} max={80} step={1} value={__dbg3DRotation}
        onChange={(e) => __setDbg3DRotation(Number(e.target.value))}
        className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
    </div>
  )}
</div>
```