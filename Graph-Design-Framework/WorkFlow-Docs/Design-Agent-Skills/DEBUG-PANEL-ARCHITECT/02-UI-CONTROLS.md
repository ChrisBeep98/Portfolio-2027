# 🎛️ 02. UI Controls (Base Library)

Patrones base para inyectar controles de UI dentro del Panel Lateral.

## 1. Sliders (Escala, Opacidad, Tamaños)
Con feedback visual numérico y barra custom.

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-[11px]">
    <span className="text-white/60 uppercase tracking-wider">Image Scale</span>
    <span className="text-cyan font-mono bg-cyan/10 px-1.5 rounded">{__dbgScale.toFixed(2)}x</span>
  </div>
  <input type="range" min={0.5} max={2} step={0.05} value={__dbgScale}
    onChange={(e) => __setDbgScale(parseFloat(e.target.value))}
    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
               [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan
               [&::-webkit-slider-thumb]:rounded-full" />
</div>
```

## 2. Segmented Controls (Selectores Visuales)
Mejor que un `<select>` nativo para pocas opciones (ej. Blend Modes o Direcciones).

```tsx
<div className="space-y-2">
  <span className="text-white/60 text-[11px] uppercase tracking-wider">Flex Direction</span>
  <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
    {['row', 'col', 'row-reverse'].map((dir) => (
      <button key={dir} onClick={() => __setDbgDir(dir)}
        className={`flex-1 py-1.5 text-[10px] font-mono rounded-md transition-colors ${
          __dbgDir === dir ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
        }`}>
        {dir}
      </button>
    ))}
  </div>
</div>
```

## 3. Toggles (Boolean On/Off)
Ideal para activar/desactivar bordes de debug o capas visuales.

```tsx
<label className="flex items-center justify-between cursor-pointer group">
  <span className="text-white/60 text-[11px] uppercase tracking-wider group-hover:text-white transition-colors">
    Show Overlay
  </span>
  <div className={`relative w-10 h-5 rounded-full transition-colors ${__dbgOverlay ? 'bg-cyan' : 'bg-white/20'}`}>
    <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full transition-transform ${__dbgOverlay ? 'translate-x-5' : 'translate-x-1'}`} />
  </div>
  {/* Estado Oculto (Click Handler) */}
  <input type="checkbox" className="hidden" checked={__dbgOverlay} onChange={(e) => __setDbgOverlay(e.target.checked)} />
</label>
```

## 4. Persistencia de Entorno (URL Params Sync)
Permite enviar por Slack/Discord una URL con el panel pre-configurado.
*Inyectar este hook en el bloque STATE.*

```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgGap, __setDbgGap] = useState(24);

// Sincronizar URL <-> State (Solo lado del cliente)
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('dbg_gap')) __setDbgGap(Number(params.get('dbg_gap')));
}, []);

// Actualizar URL al cambiar el slider
const handleGapChange = (val: number) => {
  __setDbgGap(val);
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('dbg_gap', val.toString());
  window.history.replaceState({}, '', newUrl);
};
```