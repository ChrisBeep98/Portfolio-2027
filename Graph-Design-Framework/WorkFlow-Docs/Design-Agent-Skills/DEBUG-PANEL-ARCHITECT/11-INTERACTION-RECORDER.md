# ⏱️ 11. Interaction Timeline (Framer/Webflow Inspired)

Inspirado en la grabadora de interacciones 2.0 de Webflow y Framer. En e-commerce con micro-interacciones (ej. un botón que al hacer click abre un modal con GSAP), a veces la secuencia falla muy rápido. Esta herramienta graba los eventos (clicks, hovers, scroll) y los cambios de estado en una línea de tiempo para entender qué ocurrió.

## 1. Setup del Logger de Eventos
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgEvents, __setDbgEvents] = useState<{time: number, type: string, target: string}[]>([]);

// Función helper para inyectar en onClick/onMouseEnter de componentes críticos
const __dbgLogEvent = (type: string, e: React.SyntheticEvent) => {
  const target = (e.target as HTMLElement).tagName.toLowerCase() + 
                 ((e.target as HTMLElement).id ? '#' + (e.target as HTMLElement).id : '');
  __setDbgEvents(prev => [...prev, { time: Date.now(), type, target }].slice(-10)); // Guardar últimos 10
};
```

## 2. Inyección en los Triggers
```tsx
<button 
  onClick={(e) => {
    __dbgLogEvent('CLICK', e);
    // Lógica real de tu app...
    setCartOpen(true);
  }}
  onMouseEnter={(e) => __dbgLogEvent('HOVER_START', e)}
  className="btn-checkout"
>
  Comprar
</button>
```

## 3. UI Control en el Panel (La Consola Visual)
Muestra una cascada de eventos con sus deltas de tiempo, crucial para entender si dos estados chocaron por milisegundos.

```tsx
<div className="space-y-3 p-4 border border-purple-500/20 rounded-xl bg-purple-500/5">
  <div className="flex items-center justify-between">
    <span className="text-purple-400 font-bold text-[12px] uppercase flex items-center gap-2">
      ⏱️ Interaction Log
    </span>
    <button onClick={() => __setDbgEvents([])} className="text-[9px] text-white/40 hover:text-white">CLEAR</button>
  </div>

  <div className="h-32 overflow-y-auto custom-scrollbar flex flex-col justify-end space-y-1">
    {__dbgEvents.length === 0 ? (
      <span className="text-[10px] text-white/30 italic">Esperando interacción...</span>
    ) : (
      __dbgEvents.map((ev, i, arr) => {
        // Calcular tiempo transcurrido desde el evento anterior
        const delta = i > 0 ? `+${ev.time - arr[i-1].time}ms` : '0ms';
        return (
          <div key={ev.time} className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-white/30 w-10 text-right">{delta}</span>
            <span className={`px-1.5 rounded text-[9px] font-bold ${ev.type.includes('CLICK') ? 'bg-purple-500/30 text-purple-300' : 'bg-white/10 text-white/60'}`}>
              {ev.type}
            </span>
            <span className="text-cyan truncate">{ev.target}</span>
          </div>
        );
      })
    )}
  </div>
</div>
```