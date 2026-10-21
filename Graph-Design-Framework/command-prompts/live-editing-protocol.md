# 🧪 LIVE EDITING SUB-FRAMEWORK

## 🎯 Objetivo
Este framework permite transformar cualquier componente de interfaz en una "mesa de trabajo" visual e interactiva. Envuelve bloques de código con controles para que el usuario humano pueda deslizar elementos por la grilla de 12 columnas en el navegador, y luego proporciona el estado final en JSON para que la IA aplique los estilos en producción.

## ⚙️ El Proceso en 2 Fases

### FASE 1: Inyección (Ensuciar el archivo)
**Trigger:** El usuario solicita `/live-edit` o pide "habilita el live editing en este componente".
**Acción de la IA:**
1. Importa los componentes de `@/components/utils/LiveEditor`.
2. Identifica las capas del layout y envuélvelas con el editor correspondiente:
   - `<SectionLiveEditor>`: Para los contenedores padre `<section>`. Permite alterar `py-section`, `max-w-section`.
   - `<GridLiveEditor>`: Para los bloques internos dentro de `.grid-layout`. Permite moverlos por las 12 columnas (start, span) y controlar flexbox/gaps.
   - `<CardLiveEditor>`: Para tarjetas o paneles con fondos. Controla `bg-surface`, `p-static` y `shadow-elevation`.
   - `<TextLiveEditor>`: Para textos individuales (H1, p, span). Permite recorrer todos los tokens tipográficos (`text-display`, `text-body`, etc.).
3. Renderiza `<LiveEditorCopier />` en algún punto del archivo para habilitar el botón global.
4. Avisa al usuario que el modo Live está activado y que configure los elementos a su antojo.

### FASE 2: Purga (Limpieza a Producción)
**Trigger:** El usuario pega un bloque JSON en el chat (el output del botón "Copy Final Layout") y pide "purga el código" o "aplica estos cambios".
**Acción de la IA:**
1. Lee el JSON proporcionado por el usuario.
2. Elimina todas las importaciones e instancias de `GridLiveEditor` y `LiveEditorCopier` del archivo objetivo.
3. Convierte las variables del JSON en clases estáticas de Tailwind (Ej: `start: 1, span: 7` se traduce en `md:col-start-1 md:col-span-7`).
4. Reemplaza el código para dejarlo 100% limpio y listo para producción, manteniendo la semántica y evitando estilos inline en la medida de lo posible.
