# ⚡ 08. Live Tailwind Class Editor

Para flujos de trabajo donde los *Sliders* no son suficientes (ej: probar combinaciones de sombras, gradientes, o filtros de blur complejos). Permite inyectar utilitarios de Tailwind directamente en un nodo del DOM sin recargar la página.

## 1. Setup del Estado
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
// Estado con algunas clases por defecto o vacío
const [__dbgCustomClasses, __setDbgCustomClasses] = useState('hover:scale-105 shadow-2xl shadow-cyan/20');
```

## 2. Inyección en el Componente Objetivo
Se utiliza el hook `cn()` (o template literals simples) para concatenar las clases fijas del componente con las clases dinámicas inyectadas por el panel.

```tsx
<div className={`
  /* Clases Base Inmutables */
  relative w-full p-8 rounded-3xl bg-neutral-900 border border-white/10 transition-all duration-300
  
  /* ⚡ INYECCIÓN EN VIVO ⚡ */
  ${__dbgCustomClasses}
`}>
  {/* Contenido */}
</div>
```

## 3. UI Control en el Panel Lateral (El Editor)
Un input de texto grande, con estilo de terminal, que actualiza el estado en cada pulsación de tecla (`onChange`).

```tsx
<div className="space-y-3 p-4 border border-white/10 rounded-xl bg-black/50">
  <span className="text-white/70 font-bold text-[11px] uppercase tracking-wider flex items-center gap-2">
    ⚡ Live Tailwind Injector
  </span>
  
  <p className="text-[10px] text-white/40 leading-tight">
    Escribe clases de Tailwind separadas por espacios. Se aplicarán instantáneamente al contenedor principal.
  </p>

  <div className="relative">
    <textarea 
      value={__dbgCustomClasses}
      onChange={(e) => __setDbgCustomClasses(e.target.value)}
      placeholder="ej: mix-blend-overlay backdrop-blur-md..."
      className="w-full h-24 bg-neutral-900 border border-white/20 rounded-lg p-3 
                 text-[11px] text-cyan font-mono leading-relaxed
                 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50
                 resize-none custom-scrollbar"
      spellCheck={false}
    />
    
    {/* Botón rápido para limpiar */}
    {__dbgCustomClasses.length > 0 && (
      <button 
        onClick={() => __setDbgCustomClasses('')}
        className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-red-500/20 
                   text-white/40 hover:text-red-400 rounded text-[9px] font-bold transition-colors">
        CLEAR
      </button>
    )}
  </div>

  {/* Snippets Rápidos (Opcional pero útil) */}
  <div className="flex flex-wrap gap-1.5 pt-2">
    <span className="text-[9px] text-white/30 uppercase w-full mb-1">Snippets:</span>
    <button onClick={() => __setDbgCustomClasses(prev => prev + ' backdrop-blur-xl bg-white/5')} className="px-2 py-1 bg-white/5 rounded hover:bg-white/10 text-[9px] text-white/60 font-mono">+ Glassmorphism</button>
    <button onClick={() => __setDbgCustomClasses(prev => prev + ' bg-gradient-to-br from-cyan/20 to-transparent')} className="px-2 py-1 bg-white/5 rounded hover:bg-white/10 text-[9px] text-white/60 font-mono">+ Cyan Glow</button>
  </div>
</div>
```

**Purge Rule Específica:** Al finalizar (Fase 3), se debe copiar el string resultante del textarea y pegarlo permanentemente en el `className` del componente. Luego, eliminar el estado `__dbgCustomClasses` y todo el textarea del panel.