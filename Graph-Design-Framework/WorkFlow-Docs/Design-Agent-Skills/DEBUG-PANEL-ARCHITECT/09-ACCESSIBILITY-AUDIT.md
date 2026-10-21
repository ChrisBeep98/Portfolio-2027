# ♿ 09. Accessibility & DOM Audit (Webflow Inspired)

Inspirado en el Panel de Auditoría de Webflow, esta herramienta inyecta un escáner en tiempo real que evalúa el DOM del componente renderizado buscando violaciones de accesibilidad (a11y) y malas prácticas de SEO.

## 1. Setup del Estado y Motor de Auditoría
El panel utiliza un `useEffect` para escanear el nodo `ref` del componente cada vez que cambia el DOM.

```tsx
// 🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE
const [__dbgAuditResults, __setDbgAuditResults] = useState<{type: string, msg: string, node: HTMLElement}[]>([]);
const __componentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!__componentRef.current) return;
  const target = __componentRef.current;
  const issues = [];

  // 1. Imágenes sin alt
  target.querySelectorAll('img:not([alt])').forEach(img => 
    issues.push({ type: 'error', msg: 'Imagen sin atributo alt', node: img as HTMLElement })
  );

  // 2. Botones sin aria-label o texto
  target.querySelectorAll('button').forEach(btn => {
    if (!btn.textContent?.trim() && !btn.getAttribute('aria-label')) {
      issues.push({ type: 'warning', msg: 'Botón sin texto descriptivo o aria-label', node: btn });
    }
  });

  // 3. Contraste de texto (Heurística básica)
  // ... lógica para calcular contraste si bg y color están inline ...

  __setDbgAuditResults(issues);
}, [/* dependencias de render del componente */]);
```

## 2. UI Control en el Panel Lateral
Muestra una lista de advertencias. Al hacer clic en una advertencia, inyecta un borde rojo temporal en el elemento culpable en la pantalla (como Figma Dev Mode).

```tsx
<div className="space-y-3 p-4 border border-yellow-500/20 rounded-xl bg-yellow-500/5">
  <div className="flex items-center justify-between">
    <span className="text-yellow-500 font-bold text-[12px] uppercase flex items-center gap-2">
      ♿ DOM Audit
    </span>
    <span className="text-white/40 text-[10px]">{__dbgAuditResults.length} issues</span>
  </div>

  {__dbgAuditResults.length === 0 ? (
    <p className="text-[10px] text-green-400">✓ Componente accesible y optimizado.</p>
  ) : (
    <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
      {__dbgAuditResults.map((issue, idx) => (
        <li key={idx} 
            onMouseEnter={() => issue.node.classList.add('outline', 'outline-2', 'outline-red-500', 'outline-offset-2')}
            onMouseLeave={() => issue.node.classList.remove('outline', 'outline-2', 'outline-red-500', 'outline-offset-2')}
            className={`p-2 rounded bg-black/40 text-[10px] cursor-help border-l-2 ${issue.type === 'error' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'}`}>
          {issue.msg}
        </li>
      ))}
    </ul>
  )}
</div>
```

**Ventaja:** Permite al desarrollador corregir el SEO y la accesibilidad de una tarjeta *antes* de que se multiplique 50 veces en un grid de e-commerce.