# 🐛 12. Advanced DOM Outliner (Pesticide Inspired)

El módulo *X-Ray* anterior usa un solo color (rojo) para todo. Para depurar estructuras HTML complejas, necesitamos un sistema inspirado en **Pesticide** o **VisBug**, donde cada etiqueta HTML (`div`, `span`, `img`, `section`) reciba un color de borde distinto. Esto te permite ver exactamente dónde empieza un texto y dónde termina su contenedor.

## 1. Setup del Estado
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgPesticide, __setDbgPesticide] = useState(false);
```

## 2. Inyección del CSS Dinámico (Global)
En lugar de inyectar clases línea por línea, inyectamos un tag `<style>` temporal en el componente cuando el modo está activo. Este CSS colorea el DOM jerárquicamente.

```tsx
{/* 🐛 Pesticide Style Injector */}
{__dbgPesticide && (
  <style>{`
    .pesticide-root * { outline: 1px solid rgba(255, 0, 0, 0.3) !important; }
    .pesticide-root div { outline: 1px solid rgba(0, 180, 255, 0.6) !important; }
    .pesticide-root section, .pesticide-root article { outline: 2px solid rgba(167, 139, 250, 0.8) !important; }
    .pesticide-root p, .pesticide-root h1, .pesticide-root h2, .pesticide-root h3, .pesticide-root span { outline: 1px dashed rgba(52, 211, 153, 0.8) !important; }
    .pesticide-root img, .pesticide-root video, .pesticide-root svg { outline: 2px solid rgba(245, 158, 11, 0.8) !important; background: rgba(245, 158, 11, 0.1); }
    .pesticide-root button, .pesticide-root a { outline: 2px solid rgba(236, 72, 153, 0.8) !important; }
  `}</style>
)}

{/* Componente Envoltorio */}
<div className={__dbgPesticide ? 'pesticide-root' : ''}>
  {/* Todo el contenido de la sección aquí */}
</div>
```

## 3. UI Control en el Panel
```tsx
<div className="p-4 border border-blue-500/20 rounded-xl bg-blue-500/5">
  <div className="flex items-center justify-between">
    <div className="flex flex-col">
      <span className="text-blue-400 font-bold text-[12px] uppercase">🐛 Semantic Outliner</span>
      <span className="text-white/40 text-[9px] mt-0.5">Mapeo de color por tag HTML.</span>
    </div>
    
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={__dbgPesticide} onChange={(e) => __setDbgPesticide(e.target.checked)} />
      <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
    </label>
  </div>
  
  {/* Leyenda de Colores */}
  {__dbgPesticide && (
    <div className="flex flex-wrap gap-2 mt-3 text-[9px] font-mono">
      <span className="text-blue-400 flex items-center gap-1"><div className="w-2 h-2 border border-blue-400"></div> DIV</span>
      <span className="text-purple-400 flex items-center gap-1"><div className="w-2 h-2 border border-purple-400"></div> SECT</span>
      <span className="text-green-400 flex items-center gap-1"><div className="w-2 h-2 border-dashed border-green-400"></div> TEXT</span>
      <span className="text-orange-400 flex items-center gap-1"><div className="w-2 h-2 border border-orange-400"></div> MEDIA</span>
    </div>
  )}
</div>
```