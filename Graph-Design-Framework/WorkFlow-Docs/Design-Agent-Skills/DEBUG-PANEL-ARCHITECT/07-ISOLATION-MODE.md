# ☢️ 07. Isolation Mode (Component Isotope)

Cuando se diseña una tarjeta compleja (ej: *Bento Card* o *Calculator Card*), el resto de la página (Navbars, Footers, Videos de fondo) consume recursos de renderizado y distrae visualmente. El modo "Isotope" aísla el componente en el centro de la pantalla.

## 1. Setup del Estado
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgIsolate, __setDbgIsolate] = useState(false);
```

## 2. Inyección del Wrapper "Quarantine"
Se envuelve EXCLUSIVAMENTE el componente o la tarjeta que se desea aislar. 
Si el switch está encendido, el componente abandona su flujo natural (layout) y se posiciona fijamente en el centro de la pantalla por encima de todo (`z-[9995]`), con un backdrop oscuro (`bg-neutral-950`).

```tsx
{/* ☢️ Wrapper de Aislamiento Inyectado */}
<div className={__dbgIsolate ? `fixed inset-0 z-[9995] bg-neutral-950 flex items-center justify-center p-8 overflow-y-auto backdrop-blur-3xl` : ''}>
  
  {/* Botón de Salida Rápida (Solo visible en modo Isolate) */}
  {__dbgIsolate && (
    <button onClick={() => __setDbgIsolate(false)} 
            className="fixed top-6 left-6 px-4 py-2 bg-red-500/20 text-red-500 text-[12px] font-bold rounded-full hover:bg-red-500/40 z-50">
      ← EXIT ISOLATION
    </button>
  )}

  {/* ⬇️ EL COMPONENTE REAL VA AQUÍ ⬇️ */}
  <div className={`transition-all duration-500 ${__dbgIsolate ? 'scale-110 shadow-[0_0_100px_rgba(255,255,255,0.05)] max-w-2xl w-full' : 'w-full'}`}>
    
    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
      <h3 className="text-white text-xl">Bento Card Content</h3>
      <p className="text-white/60">Detalles de la tarjeta que estás debugeando.</p>
    </div>

  </div>
  {/* ⬆️ FIN DEL COMPONENTE REAL ⬆️ */}

</div>
```

## 3. UI Control en el Panel Lateral (Botón de Emergencia)

```tsx
<div className="p-4 border border-red-500/30 rounded-xl bg-red-500/5 mt-6">
  <div className="flex items-center justify-between">
    <div className="flex flex-col">
      <span className="text-red-400 font-bold text-[12px] uppercase">☢️ Isotope Mode</span>
      <span className="text-white/40 text-[9px] mt-0.5">Aísla este nodo del DOM global.</span>
    </div>
    
    <button onClick={() => __setDbgIsolate(!__dbgIsolate)}
      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all shadow-lg ${
        __dbgIsolate 
        ? 'bg-red-500 text-white animate-pulse shadow-red-500/50' 
        : 'bg-white/10 text-white/60 hover:bg-white/20'
      }`}>
      {__dbgIsolate ? 'ACTIVE' : 'ISOLATE'}
    </button>
  </div>
</div>
```

**Purge Rule Específica:** Al aplicar la Fase 3, se debe extraer el "Componente Real" del envoltorio `div` de cuarentena (`fixed inset-0...`) y eliminar todo el código de aislamiento, dejando el componente en su estado natural en el DOM.