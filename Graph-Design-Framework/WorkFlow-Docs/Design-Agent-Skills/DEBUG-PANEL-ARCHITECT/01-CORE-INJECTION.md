# 📦 01. Core Injection & Panel Architecture

Este módulo define la estructura base del **Panel Lateral Avanzado** y las reglas de inyección.

## 🚨 DELIMITACIÓN ESTRICTA (The Sandbox)

### Regla de Prefijo `__dbg`
TODOS los estados temporales del debug panel deben usar el prefijo `__dbg` para facilitar la búsqueda y purga:
```tsx
const [__dbgOpen, __setDbgOpen] = useState(false);
const [__dbgTab, __setDbgTab] = useState('layout'); // 'layout', 'visuals', 'motion', 'dom'
```

### Comentarios de Bloqueo Inmutables
Deben rodear EXACTAMENTE la lógica temporal.

```tsx
// ==========================================
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE 
// ==========================================
// ... todos los useState con prefijo __dbg ...
// ==========================================
// 🛑 TERMINA: TEMPORARY DEBUG TESTER STATE 
// ==========================================
```

## 🏗️ ARQUITECTURA DEL PANEL LATERAL (Side Drawer)

El panel v3.0 ya no es una simple caja flotante. Es un **Drawer Lateral de altura completa** (fijo a la derecha) con tabs categorizadas, permitiendo un inspector robusto sin tapar la UI central.

```tsx
{/* ========================================== */}
{/* 🧪 INICIALIZA: TEMPORARY DEBUG UI PANEL    */}
{/* ========================================== */}

{/* ── Botón Trigger (Pill Flotante) ── */}
{!__dbgOpen && (
  <button onClick={() => __setDbgOpen(true)}
    className="fixed top-1/2 right-0 -translate-y-1/2 z-[9999] px-2 py-6
               bg-black/90 backdrop-blur-xl rounded-l-xl border-y border-l border-white/20
               text-cyan text-[10px] font-bold shadow-[-5px_0_20px_rgba(0,180,255,0.2)]
               hover:bg-black transition-all hover:-translate-x-1 uppercase"
    style={{ writingMode: 'vertical-rl' }}>
    🧪 Inspect
  </button>
)}

{/* ── Panel Lateral Completo ── */}
{__dbgOpen && (
  <div className="fixed top-0 right-0 h-[100dvh] w-[380px] z-[10000]
                  bg-black/95 backdrop-blur-3xl border-l border-white/10
                  shadow-[-20px_0_60px_rgba(0,0,0,0.8)]
                  flex flex-col text-white font-sans overflow-hidden
                  transform transition-transform duration-300">
    
    {/* Header & Acciones Globales */}
    <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
      <div className="flex flex-col">
        <span className="font-bold text-[14px] text-cyan flex items-center gap-2">
          🧪 Dev Inspector
        </span>
        <span className="text-[10px] text-white/40 font-mono">v3.0 Ecosystem</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => {/* Copy Logic */}} className="px-3 py-1 bg-cyan/20 text-cyan rounded text-[11px] font-bold hover:bg-cyan/30">📋 COPY</button>
        <button onClick={() => __setDbgOpen(false)} className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-full hover:bg-red-500/40 text-white/60 hover:text-white">✕</button>
      </div>
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
      {/* ── Tabs de Navegación Rápida ── */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
        {['layout', 'visuals', 'motion', 'dom'].map((t) => (
          <button key={t} onClick={() => __setDbgTab(t)}
            className={`flex-1 py-1.5 text-[11px] font-bold rounded-md capitalize transition-colors ${__dbgTab === t ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/70'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Contenido de las Tabs (Render Condicional) ── */}
      {__dbgTab === 'layout' && <div className="space-y-6">{/* Controles Spacing/Grid */}</div>}
      {__dbgTab === 'visuals' && <div className="space-y-6">{/* Controles Color/Tipografía */}</div>}
      {__dbgTab === 'motion' && <div className="space-y-6">{/* Controles GSAP */}</div>}
      {__dbgTab === 'dom' && <div className="space-y-6">{/* A/B Testing JSX */}</div>}
    </div>
  </div>
)}

{/* ========================================== */}
{/* 🛑 TERMINA: TEMPORARY DEBUG UI PANEL       */}
{/* ========================================== */}
```

## 🧹 PURGE CHECKLIST (Fase 3: Zero-Trace)

Ejecutar obligatoriamente al finalizar:

- [ ] 1. **Consolidar Valores:** Transferir los valores ganadores (del "📋 COPY") a las clases Tailwind definitivas.
- [ ] 2. **Eliminar STATE:** Borrar bloque `🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE`.
- [ ] 3. **Eliminar UI:** Borrar bloque `🧪 INICIALIZA: TEMPORARY DEBUG UI PANEL`.
- [ ] 4. **Limpiar Layouts:** Borrar componentes perdedores del DOM Switcher.
- [ ] 5. **Limpiar Imports:** Borrar `useState`, `useEffect`, `useRef` huérfanos.
- [ ] 6. **Zero Matches:** Grep `__dbg` en el archivo -> Debe retornar 0 resultados.
- [ ] 7. **Verify & Build:** Render intacto, `pnpm build` sin errores.