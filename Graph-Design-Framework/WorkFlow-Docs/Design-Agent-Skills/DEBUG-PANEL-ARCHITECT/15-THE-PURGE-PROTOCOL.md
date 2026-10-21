# 🧹 15. The Purge Protocol (Zero-Trace Phase 3)

La **Fase 3: The Purge** es el paso más crítico de todo el Sub-Framework. Dejar rastro de código de depuración en producción no solo engorda el DOM y el bundle de JavaScript, sino que puede causar memory leaks masivos (por timelines GSAP no eliminadas) o brechas de seguridad.

Este protocolo garantiza una limpieza quirúrgica y absoluta (Zero-Trace).

---

## 🛠️ El Checklist Universal (Para todos los paneles)

No importa qué módulos inyectaste, siempre debes ejecutar estos pasos en orden:

- [ ] 1. **Hardcodear Valores Ganadores:** Copia los valores finales (espaciados, colores, escalas) del panel lateral y aplícalos permanentemente a las clases Tailwind (`className="..."`) o configuración GSAP del componente.
- [ ] 2. **Destruir el Estado (STATE):** Borra todo el bloque de código comprendido entre `🧪 INICIALIZA: TEMPORARY DEBUG TESTER STATE` y `🛑 TERMINA: TEMPORARY DEBUG TESTER STATE`.
- [ ] 3. **Destruir la Interfaz (UI):** Borra todo el bloque de código del JSX comprendido entre `🧪 INICIALIZA: TEMPORARY DEBUG UI PANEL` y `🛑 TERMINA: TEMPORARY DEBUG UI PANEL`.
- [ ] 4. **Limpiar Imports Huérfanos:** Elimina `useState`, `useRef`, `useEffect` si el componente original ya no los necesita.
- [ ] 5. **Comprobación de Seguridad (El Grep de la Muerte):** Busca la cadena `__dbg` en el archivo. **El resultado DEBE ser 0 coincidencias.** Si encuentras algo, bórralo.

---

## ⚠️ Reglas de Purga Específicas por Módulo

Si inyectaste módulos avanzados, debes aplicar estas limpiezas especiales:

### 🎢 ScrollTrigger (Módulo 06)
- **Regla:** Busca en tu objeto `scrollTrigger` y **ELIMINA OBLIGATORIAMENTE** la propiedad `markers: true`. Si la dejas, los usuarios en producción verán las líneas rojas y verdes de GSAP.
- **Regla:** Elimina la propiedad `id: "debug-trigger"` si no se usa para lógica de la app.

### ☢️ Isolation Mode (Módulo 07)
- **Regla:** Al activar este modo, envolviste tu componente real en un `<div className="fixed inset-0...">`. Para purgarlo, debes "desempaquetar" tu componente y **ELIMINAR EL WRAPPER** padre por completo para que el elemento regrese a su flujo normal en el DOM.

### ⚡ Tailwind Injector (Módulo 08)
- **Regla:** El string generado por el textarea debe copiarse y pegarse "en piedra" dentro del template literal del `className` original. Elimina la variable `${__dbgCustomClasses}` de la interpolación.

### 🔀 DOM Switcher (Módulo 05)
- **Regla:** Borra la variable de la estructura perdedora (ej: `const __dbgStructureB = ...`). 
- **Regla:** Borra la condición ternaria (`{__dbgLayoutMode === 'A' ? ...}`) y pega el contenido JSX ganador directamente en el render principal para evitar renderizados condicionales inútiles que afecten el rendimiento de React.

### 🐛 Semantic Outliner & 3D Tilt (Módulos 12 y 13)
- **Regla:** Asegúrate de borrar la etiqueta inyectada `<style>{...}</style>` global que contenía el CSS temporal de los bordes multicolor o transformaciones 3D.
- **Regla:** Elimina cualquier clase condicional como `${__dbgPesticide ? 'pesticide-root' : ''}` del contenedor raíz.

---

## ✅ Verificación Final

Una vez realizada la purga, el archivo debe parecer como si el Agente de Debug **nunca hubiera existido**. 

Ejecuta el entorno local:
1. Navega por el componente. Se debe ver y animar exactamente igual que con los valores del panel.
2. Abre la consola del navegador. No debe haber advertencias de "React state unmounted" o "Invalid DOM property".
3. En la terminal, ejecuta `pnpm build`. Si compila sin errores de TypeScript, **el componente está listo para Producción.**