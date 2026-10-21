# 🎨 17. Design System Injector (Mandatory UI Sync)

**MANDATO ESTRICTO:** Cada vez que el Agente cree un panel de debug, DEBE OBLIGATORIAMENTE incluir controles (`<select>`, sliders, etc.) para **TODOS** los tokens existentes en el inventario del Design System (`Design-System.md` ↔ `src/styles/globals.css`). El usuario debe poder alterar colores, tipografías, anchos máximos y espaciados dinámicamente.

## 1. 🧪 Inyección de Estado (React State)
Incluye estos estados en el bloque de inicialización:

```tsx
// Tokens de Tipografía (@utility — mismos nombres en light y dark)
const [__dbgTextDisplay, __setDbgTextDisplay] = useState('text-display-sm');
const [__dbgTextBody, __setDbgTextBody] = useState('text-body');

// Espaciado (Elastic System — utilidades + escala rem)
const [__dbgFrame, __setDbgFrame] = useState('px-frame');
const [__dbgSectionGap, __setDbgSectionGap] = useState('section-gap');
const [__dbgGap, __setDbgGap] = useState('gap-4');

// Max Widths (patrones shipped — sin token dedicado todavía)
const [__dbgMaxWidth, __setDbgMaxWidth] = useState('1600px');

// Colores (variables semánticas bimodales de globals.css)
const [__dbgBgColor, __setDbgBgColor] = useState('var(--background)');
const [__dbgTextColor, __setDbgTextColor] = useState('var(--foreground)');
const [__dbgAccent, __setDbgAccent] = useState('var(--color-primary)');

// Bimodalidad (probar la sección en el modo opuesto)
const [__dbgInvert, __setDbgInvert] = useState(false);
```

## 2. 🎛️ Inyección de Controles UI (Tabs: Layout & Visuals)
Agrega estos fragmentos de JSX dentro de los Tabs correspondientes en tu Panel:

### En el Tab `visuals` (Colores y Tipografía):
```tsx
{/* Selector de Tipografías */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Títulos (Display / H)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgTextDisplay} onChange={e => __setDbgTextDisplay(e.target.value)}>
    <option value="text-display-3xl">text-display-3xl (Monolito 12vw)</option>
    <option value="text-display-2xl">text-display-2xl (Giant)</option>
    <option value="text-display-xl">text-display-xl</option>
    <option value="text-display-lg">text-display-lg</option>
    <option value="text-display">text-display</option>
    <option value="text-display-sm">text-display-sm</option>
    <option value="text-h1">text-h1</option>
    <option value="text-h2">text-h2</option>
    <option value="text-h3">text-h3</option>
  </select>
</div>

{/* Selector de Colores (semánticos bimodales + acentos) */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Fondo (semántico)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgBgColor} onChange={e => __setDbgBgColor(e.target.value)}>
    <option value="var(--background)">--background (página: #F2F2F0 / #050505)</option>
    <option value="var(--surface)">--surface (capa sutil / glass)</option>
    <option value="var(--color-primary)">--color-primary (púrpura #a855f7)</option>
    <option value="#06b6d4">Glitch Cyan (#06b6d4)</option>
    <option value="#ec4899">Glitch Pink (#ec4899)</option>
    <option value="#0A0A0A">Dark card (#0A0A0A — theme-invert)</option>
    <option value="#FFFFFF">Light card (#FFFFFF — theme-invert)</option>
  </select>
</div>

{/* Toggle de bimodalidad */}
<div className="flex items-center justify-between">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">theme-invert (probar modo opuesto)</label>
  <input type="checkbox" checked={__dbgInvert} onChange={e => __setDbgInvert(e.target.checked)} />
</div>
```

### En el Tab `layout` (Espaciado y Max Width):
```tsx
{/* Selector de Max Width */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Max Width Global</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgMaxWidth} onChange={e => __setDbgMaxWidth(e.target.value)}>
    <option value="896px">max-w-4xl (896px — bloques de texto)</option>
    <option value="1152px">max-w-6xl (1152px — Footer title)</option>
    <option value="1536px">max-w-screen-2xl (1536px — Process)</option>
    <option value="1600px">1600px (About)</option>
    <option value="100%">100% (Fluid / full-bleed)</option>
  </select>
</div>

{/* Selector de Frame / Section Gap */}
<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Frame (Padding X)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgFrame} onChange={e => __setDbgFrame(e.target.value)}>
    <option value="px-frame">px-frame (6em / 0.75em móvil)</option>
    <option value="px-[14px]">px-[14px] (mandato móvil)</option>
    <option value="">(sin frame — edge-to-edge)</option>
  </select>
</div>

<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Ritmo vertical</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgSectionGap} onChange={e => __setDbgSectionGap(e.target.value)}>
    <option value="section-gap">section-gap (8em / 3.25em móvil)</option>
    <option value="py-24 md:py-32">py-24 md:py-32 (shipped Process/Marquee)</option>
    <option value="">(sin gap — full-bleed)</option>
  </select>
</div>

<div className="space-y-2">
  <label className="text-[10px] text-white/50 uppercase tracking-widest">Gaps Flex/Grid (escala rem)</label>
  <select className="w-full bg-white/10 text-white text-xs p-2 rounded outline-none" value={__dbgGap} onChange={e => __setDbgGap(e.target.value)}>
    <option value="gap-1">gap-1 (0.25rem)</option>
    <option value="gap-2">gap-2 (0.5rem)</option>
    <option value="gap-4">gap-4 (1rem)</option>
    <option value="gap-8">gap-8 (2rem)</option>
    <option value="gap-12">gap-12 (3rem)</option>
    <option value="gap-16">gap-16 (4rem)</option>
  </select>
</div>
```

## 3. 📦 Aplicación en el Componente
Aplica el estado dinámico al elemento objetivo interpolando las clases y estilos:

```tsx
<div
  className={`w-full ${__dbgFrame} ${__dbgSectionGap} ${__dbgInvert ? 'theme-invert' : ''}`}
  style={{ backgroundColor: __dbgBgColor }}
>
  <div
    className={`mx-auto flex flex-col ${__dbgGap}`}
    style={{ maxWidth: __dbgMaxWidth }}
  >
    <h1
      className={`${__dbgTextDisplay}`}
      style={{ color: __dbgTextColor }}
    >
      Texto del Componente
    </h1>
    <p className={`${__dbgTextBody}`} style={{ color: __dbgTextColor }}>
      Cuerpo de prueba con el token de body seleccionado.
    </p>
    <span className="text-ui-label" style={{ color: __dbgAccent }}>Acento (primary)</span>
  </div>
</div>
```

> **IMPORTANTE:** Si el usuario requiere testear *otros* valores del inventario (glitch strokes, `.glass-engine`, `--card-shadow` de theme-invert, tokens de `src/lib/motion.ts` vía presets), el Agente DEBE agregarlos dinámicamente en las opciones del `<select>`. Recordatorio: los tokens tipográficos son `@utility` — si el panel inyecta clases dinámicamente, añadirlas también a una safelist o escribirlas literales en el panel para que Tailwind las emita.
