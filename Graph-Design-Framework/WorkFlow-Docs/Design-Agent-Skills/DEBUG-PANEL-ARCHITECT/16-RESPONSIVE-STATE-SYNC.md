# 📱 16. Responsive State Sync (Breakpoint Memory)

En el desarrollo moderno, los valores de CSS y animaciones casi siempre difieren entre Mobile y Desktop (ej: `padding-top: 120px` en Desktop vs `80px` en Mobile). Si el Debug Panel solo maneja una variable por propiedad, sobreescribirás accidentalmente los valores del otro breakpoint al testear. 

Este módulo introduce **Breakpoint Tabs** en el panel y **Persistencia Dual** en el estado para testear ambos entornos simultáneamente sin perder datos al recargar la página.

## 1. Setup del Estado Dual & LocalStorage
En lugar de guardar un solo valor, guardamos un objeto con las configuraciones para `desktop` y `mobile`. Usamos `useEffect` para persistir esto en `localStorage` y sobrevivir a recargas.

```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgBreakpoint, __setDbgBreakpoint] = useState<'desktop' | 'mobile'>('desktop');

// Estado unificado con valores por defecto para ambos breakpoints
const [__dbgValues, __setDbgValues] = useState({
  desktop: { gap: 24, pt: 120, scale: 1.2, blendMode: 'normal' },
  mobile:  { gap: 16, pt: 80, scale: 1.0, blendMode: 'multiply' }
});

// 1. Cargar de LocalStorage al montar
useEffect(() => {
  const saved = localStorage.getItem('__dbg_salento_values');
  if (saved) __setDbgValues(JSON.parse(saved));
}, []);

// 2. Guardar en LocalStorage cada vez que cambia
useEffect(() => {
  localStorage.setItem('__dbg_salento_values', JSON.stringify(__dbgValues));
}, [__dbgValues]);

// Helper para actualizar un valor específico del breakpoint actual
const __updateDbgVal = (key: string, val: any) => {
  __setDbgValues(prev => ({
    ...prev,
    [__dbgBreakpoint]: { ...prev[__dbgBreakpoint], [key]: val }
  }));
};
```

## 2. Inyección en el Componente
Al inyectar valores en el DOM, debemos leer el breakpoint actual, o si estamos usando clases Tailwind dinámicas, inyectar AMBOS valores con sus prefijos (`md:`).

```tsx
{/* Ejemplo 1: Estilos Inline (Responde al toggle del panel) */}
<div style={{ paddingTop: `${__dbgValues[__dbgBreakpoint].pt}px` }}>
  
  {/* Ejemplo 2: Clases Tailwind Generadas (Responde al tamaño real de pantalla) */}
  <div className={`gap-[${__dbgValues.mobile.gap}px] md:gap-[${__dbgValues.desktop.gap}px]`}>
    {/* Contenido */}
  </div>
  
</div>
```

## 3. UI Control en el Panel (Header Tabs & Reset)
Inyectamos un selector global en el Header del Panel Lateral que cambia el contexto de todos los sliders de abajo, y un botón de emergencia (Reset).

```tsx
{/* ── Header Extra: Breakpoint Switcher ── */}
<div className="px-4 py-3 border-b border-white/10 bg-black/50 flex flex-col gap-3">
  
  <div className="flex justify-between items-center">
    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Target Device</span>
    {/* Botón de Reset LocalStorage */}
    <button 
      onClick={() => {
        localStorage.removeItem('__dbg_salento_values');
        window.location.reload(); // Recarga dura para limpiar todo
      }}
      className="px-2 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded text-[9px] font-bold transition-colors">
      RESET VALUES
    </button>
  </div>

  {/* Los Tabs de Breakpoint */}
  <div className="flex p-1 bg-white/5 rounded-lg border border-white/10 shadow-inner">
    <button 
      onClick={() => __setDbgBreakpoint('mobile')}
      className={`flex-1 py-1.5 flex justify-center items-center gap-2 text-[11px] font-bold rounded-md transition-all ${
        __dbgBreakpoint === 'mobile' ? 'bg-cyan text-black shadow-md' : 'text-white/40 hover:text-white/80'
      }`}>
      📱 Mobile
    </button>
    <button 
      onClick={() => __setDbgBreakpoint('desktop')}
      className={`flex-1 py-1.5 flex justify-center items-center gap-2 text-[11px] font-bold rounded-md transition-all ${
        __dbgBreakpoint === 'desktop' ? 'bg-cyan text-black shadow-md' : 'text-white/40 hover:text-white/80'
      }`}>
      🖥️ Desktop
    </button>
  </div>
</div>

{/* ── Contenido de los Sliders (Vinculados al Breakpoint Actual) ── */}
<div className="p-4 space-y-4">
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] text-white/60">
      <span>Padding Top ({__dbgBreakpoint})</span>
      <span className="font-mono text-cyan">{__dbgValues[__dbgBreakpoint].pt}px</span>
    </div>
    <input type="range" min={0} max={200} step={4} 
      value={__dbgValues[__dbgBreakpoint].pt}
      onChange={(e) => __updateDbgVal('pt', Number(e.target.value))}
      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan [&::-webkit-slider-thumb]:rounded-full" />
  </div>
</div>
```

**Purge Rule Específica:** En la Fase 3, copia AMBOS valores (el de mobile por defecto, y el de desktop con prefijo `md:`) en el template string final. Elimina el hook que lee/escribe en el `localStorage`.