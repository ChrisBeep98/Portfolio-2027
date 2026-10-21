# 📐 03. Layout & Spacing

Herramientas para dominar el ritmo vertical, horizontal y la arquitectura de la página sin tener que inspeccionar con Chrome DevTools.

## 1. Visualizador de "Cajas" (X-Ray Outlines)
Activa un borde rojo discontinuo en TODOS los elementos hijos del componente para detectar colisiones de padding, márgenes colapsados o gaps ocultos.

**State:**
```tsx
const [__dbgXray, __setDbgXray] = useState(false);
```

**Implementación en el Contenedor Padre:**
```tsx
<section className={`relative w-full ${__dbgXray ? '[&_*]:outline [&_*]:outline-1 [&_*]:outline-dashed [&_*]:outline-red-500/50' : ''}`}>
  {/* Component content */}
</section>
```

## 2. Grid Visualizer Global (1400px Framework)
Inyecta la grilla matemática estandarizada del proyecto directamente sobre la pantalla para verificar paralelismo.

**State & UI Toggle:**
```tsx
const [__dbgGrid, __setDbgGrid] = useState(false);
```

**Capa de Grilla Flotante (Inyectar al final del componente principal):**
```tsx
{__dbgGrid && (
  <div className="fixed inset-0 z-[9998] pointer-events-none flex justify-center">
    <div className="w-full max-w-[1400px] h-full grid grid-cols-4 md:grid-cols-12 gap-[12px] md:gap-[24px] px-[clamp(1.5rem,4vw,3.5rem)]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-full bg-cyan/10 border-x border-cyan/20 hidden md:block" />
      ))}
      {/* Mobile Grid Fallback */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={`m-${i}`} className="h-full bg-red/10 border-x border-red/20 md:hidden" />
      ))}
    </div>
  </div>
)}
```

## 3. Controles de Espaciado (Margin / Padding / Gap)
Controla los espaciados en tiempo real. Vincula el state a variables CSS inline temporalmente, o usa template literals en las clases.

**State:**
```tsx
const [__dbgPt, __setDbgPt] = useState(120); // Padding Top Desktop
const [__dbgGap, __setDbgGap] = useState(24); // Gap interno
```

**Implementación:**
```tsx
<div 
  className="flex flex-col w-full"
  style={{
    paddingTop: `${__dbgPt}px`,
    gap: `${__dbgGap}px`
  }}
>
  {/* ... */}
</div>
```

## 4. Simulador de Viewport en Desktop (Iframe-like Resizer)
En lugar de achicar el navegador entero, encoge el contenedor principal para ver cómo responde el layout de desktop a tablet.

**State:**
```tsx
const [__dbgViewportW, __setDbgViewportW] = useState(100); // % percentage
```

**Implementación (Padre Envolvente):**
```tsx
<div className="w-full flex justify-center bg-neutral-900/50 py-10 transition-all">
  <div style={{ width: `${__dbgViewportW}%`, transition: 'width 0.3s ease' }} className="bg-white/5 rounded-xl border border-white/20 overflow-hidden shadow-2xl">
    {/* ACTUAL COMPONENT CONTENT HERE */}
  </div>
</div>
```
*(Y en el panel, un slider que va de 30% a 100%)*