# 📐 10. Box Model Inspector (Figma Dev Mode Inspired)

Inspirado en Figma Dev Mode y las Chrome DevTools, pero inyectado directamente en la UI de React. Cuando el desarrollador pasa el ratón sobre un elemento dentro del componente debugeado, el panel lateral muestra instantáneamente su Box Model (Padding, Margin, Ancho, Alto) sin tener que abrir las herramientas del navegador.

## 1. Setup del Estado de Inspección
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgHoveredNode, __setDbgHoveredNode] = useState<{
  tag: string; w: number; h: number; mt: string; mr: string; mb: string; ml: string; pt: string; pr: string; pb: string; pl: string;
} | null>(null);

// Función atada al evento onMouseMove del contenedor padre
const handleInspectMove = (e: React.MouseEvent) => {
  const target = e.target as HTMLElement;
  const style = window.getComputedStyle(target);
  const rect = target.getBoundingClientRect();
  
  __setDbgHoveredNode({
    tag: target.tagName.toLowerCase(),
    w: Math.round(rect.width), h: Math.round(rect.height),
    mt: style.marginTop, mr: style.marginRight, mb: style.marginBottom, ml: style.marginLeft,
    pt: style.paddingTop, pr: style.paddingRight, pb: style.paddingBottom, pl: style.paddingLeft
  });
};
```

## 2. Inyección en el Componente
```tsx
<section 
  onMouseMove={handleInspectMove} 
  onMouseLeave={() => __setDbgHoveredNode(null)}
  className="relative w-full"
>
  {/* Componente... */}
</section>
```

## 3. UI Control (El Gráfico del Box Model)
Renderiza un gráfico visual concéntrico exacto al de Chrome/Figma en el panel lateral.

```tsx
<div className="p-4 border border-white/10 rounded-xl bg-black/40">
  <span className="text-white font-bold text-[12px] uppercase">📐 Box Model</span>
  
  {!__dbgHoveredNode ? (
    <p className="text-[10px] text-white/40 mt-2">Hover sobre un elemento para inspeccionar...</p>
  ) : (
    <div className="mt-4 text-[9px] font-mono text-center">
      <div className="mb-2 text-cyan font-bold text-[11px]">&lt;{__dbgHoveredNode.tag}&gt;</div>
      
      {/* Margin Box */}
      <div className="bg-orange-500/20 border border-orange-500/50 p-1 relative group">
        <span className="absolute top-0 left-1 text-orange-300">margin</span>
        <div className="py-1 text-orange-300">{__dbgHoveredNode.mt}</div>
        <div className="flex justify-between px-1 text-orange-300">
          <span>{__dbgHoveredNode.ml}</span>
          
          {/* Padding Box */}
          <div className="bg-green-500/20 border border-green-500/50 p-1 flex-1 mx-2 relative">
            <span className="absolute top-0 left-1 text-green-300">padding</span>
            <div className="py-1 text-green-300">{__dbgHoveredNode.pt}</div>
            <div className="flex justify-between px-1 text-green-300">
              <span>{__dbgHoveredNode.pl}</span>
              
              {/* Content Box */}
              <div className="bg-blue-500/30 border border-blue-500/50 px-2 py-1 text-white">
                {__dbgHoveredNode.w} x {__dbgHoveredNode.h}
              </div>
              
              <span>{__dbgHoveredNode.pr}</span>
            </div>
            <div className="py-1 text-green-300">{__dbgHoveredNode.pb}</div>
          </div>
          
          <span>{__dbgHoveredNode.mr}</span>
        </div>
        <div className="py-1 text-orange-300">{__dbgHoveredNode.mb}</div>
      </div>
    </div>
  )}
</div>
```