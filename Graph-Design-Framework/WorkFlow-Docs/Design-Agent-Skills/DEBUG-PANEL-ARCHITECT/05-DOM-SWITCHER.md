# 🔀 05. DOM Switcher (A/B Layout Testing)

Cuando la duda no es un margen o un color, sino **la estructura HTML/JSX completa**. 
Ejemplo: ¿La sección se ve mejor con una imagen estática a la izquierda (`Layout A`), o con un grid de Bento Box complejo (`Layout B`)?

## 1. Setup del Estado de Estructura
```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgLayoutMode, __setDbgLayoutMode] = useState<'A' | 'B'>('A');
```

## 2. Construcción de Layouts Aislados
En lugar de llenar el DOM principal con if/else masivos que lo hacen ilegible, construimos las variaciones como componentes funcionales temporales O variables dentro del componente.

```tsx
// ── Layout A (Clásico 50/50 Flex) ──
const __dbgStructureA = (
  <div className="flex flex-col md:flex-row gap-10 items-center">
    <div className="flex-1 space-y-6">
      <h2>Titular</h2>
      <p>Descripción</p>
    </div>
    <div className="flex-1">
      <img src="..." className="rounded-xl shadow-2xl" />
    </div>
  </div>
);

// ── Layout B (Stacked con Bento Box) ──
const __dbgStructureB = (
  <div className="flex flex-col gap-16 text-center items-center">
    <div className="max-w-2xl space-y-6">
      <h2>Titular Centralizado</h2>
      <p>Descripción debajo</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Bento Cards */}
    </div>
  </div>
);
```

## 3. Render Condicional Principal
El DOM central queda extremadamente limpio.

```tsx
<section className="w-full relative py-20">
  <div className="max-w-[1400px] mx-auto px-[clamp(1.5rem,4vw,3.5rem)]">
    
    {/* Alternador Mágico */}
    {__dbgLayoutMode === 'A' ? __dbgStructureA : __dbgStructureB}

  </div>
</section>
```

## 4. UI Control en el Panel Lateral

```tsx
<div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
  <span className="text-[12px] font-bold text-white uppercase">Architectural Layout</span>
  <p className="text-[10px] text-white/40 leading-tight">Alterna entre dos filosofías de diseño distintas sin recargar.</p>
  
  <div className="flex p-1 bg-black/50 rounded-lg border border-white/10 shadow-inner mt-2">
    <button onClick={() => __setDbgLayoutMode('A')}
      className={`flex-1 py-2 text-[11px] font-bold rounded-md transition-all ${
        __dbgLayoutMode === 'A' ? 'bg-cyan text-black shadow-md' : 'text-white/50 hover:text-white'
      }`}>
      A: Split View 50/50
    </button>
    <button onClick={() => __setDbgLayoutMode('B')}
      className={`flex-1 py-2 text-[11px] font-bold rounded-md transition-all ${
        __dbgLayoutMode === 'B' ? 'bg-cyan text-black shadow-md' : 'text-white/50 hover:text-white'
      }`}>
      B: Central Bento Grid
    </button>
  </div>
</div>
```

**Purge Rule Específica:** En la Fase 3, se elimina la variable perdedora (`__dbgStructureB`), el switch if/else se borra, y el contenido de la variable ganadora (`__dbgStructureA`) se inyecta directamente en el JSX principal para optimizar rendimiento de React.