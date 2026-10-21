# 📏 14. Typography Rhythm (Baseline Grid)

En diseño editorial y e-commerce de alta gama, la "Vertical Rhythm" (Ritmo Vertical) es fundamental. Esto significa que todos los textos, márgenes y alturas de botones deben alinearse a una cuadrícula base invisible (usualmente de 4px u 8px). Esta herramienta inyecta un papel milimetrado en el fondo para garantizar precisión pixel-perfect.

## 1. Setup del Estado
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgRhythm, __setDbgRhythm] = useState(false);
const [__dbgRhythmSize, __setDbgRhythmSize] = useState(8); // Default 8px grid
```

## 2. Inyección del Fondo (Baseline Overlay)
Inyectamos un div posicionado fijamente (`fixed inset-0`) que queda "detrás" de tu contenido (o por encima con `pointer-events-none`) pintando líneas horizontales usando un CSS `repeating-linear-gradient`.

```tsx
{/* 📏 Typography Rhythm Overlay */}
{__dbgRhythm && (
  <div 
    className="fixed inset-0 z-[9990] pointer-events-none opacity-30"
    style={{
      backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent ${__dbgRhythmSize - 1}px, #00ffff ${__dbgRhythmSize}px)`
    }}
  />
)}

{/* Opcional: Para ver mejor el grid, oscurecer el fondo del componente */}
<div className={`relative ${__dbgRhythm ? 'bg-black/90' : ''}`}>
  {/* Component Content */}
</div>
```

## 3. UI Control en el Panel
```tsx
<div className="p-4 border border-white/10 rounded-xl bg-white/5 mt-4">
  <div className="flex items-center justify-between mb-3">
    <div className="flex flex-col">
      <span className="text-white font-bold text-[12px] uppercase">📏 Vertical Rhythm</span>
      <span className="text-white/40 text-[9px] mt-0.5">Alineación de tipografía y espaciado.</span>
    </div>
    
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={__dbgRhythm} onChange={(e) => __setDbgRhythm(e.target.checked)} />
      <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white/40"></div>
    </label>
  </div>

  {__dbgRhythm && (
    <div className="flex gap-2 mt-2">
      {[4, 8, 12, 16].map(size => (
        <button key={size} onClick={() => __setDbgRhythmSize(size)}
          className={`flex-1 py-1 text-[10px] font-mono rounded border ${
            __dbgRhythmSize === size ? 'bg-white/20 border-white/40 text-white' : 'border-white/10 text-white/40 hover:bg-white/10'
          }`}>
          {size}px
        </button>
      ))}
    </div>
  )}
</div>
```