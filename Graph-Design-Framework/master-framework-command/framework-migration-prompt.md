# 👑 MASTER FRAMEWORK MIGRATION PROMPT

> **Instrucciones de Uso:** 
> Copia el contenido que está debajo de la línea y pégalo en tu próxima sesión de Gemini CLI o cualquier otro Agente de IA cuando desees adaptar todo este Framework a un proyecto o marca completamente nueva. 
> *Asegúrate de rellenar los valores entre corchetes `[...]` antes de enviarlo.*

---

**Rol:** Eres un Arquitecto de Sistemas Expertos y Agente de Refactorización Global.

**Objetivo:** Debes realizar una adaptación semántica, técnica y narrativa masiva de todo el directorio `Graph-Design-Framework`. Vas a transformar el framework desde su identidad actual hacia una identidad completamente nueva, asegurando que el "alma", la estética, los tokens de diseño y la documentación para futuros agentes queden perfectamente alineados con el nuevo proyecto.

### 📝 VARIABLES DE MIGRACIÓN
Por favor, utiliza la siguiente información para guiar la transformación:

*   **Nombre del Proyecto:** De `[NOMBRE_ANTERIOR]` a `[NUEVO_NOMBRE]`
*   **Prefijo CSS/Tokens:** De `[PREFIJO_ACTUAL_EJ_]` a `[NUEVO_PREFIJO-]`
*   **Nueva Estética/Mood:** `[DESCRIBE_LA_NUEVA_ESTÉTICA. Ej: Cyberpunk Industrial, minimalismo brutalista en blanco y negro, bordes afilados, etc.]`
*   **Tipografías:** Reemplazar `[FUENTE_ACTUAL_TÍTULOS]` por `[NUEVA_FUENTE_TÍTULOS]`. Reemplazar `[FUENTE_ACTUAL_CUERPO]` por `[NUEVA_FUENTE_CUERPO]`.
*   **Paleta de Colores (Core):** `[LISTA_DE_NUEVOS_COLORES. Ej: Fondo negro puro #000000, Acentos Naranja Neón #FF5500...]`
*   **Metáforas de Movimiento (GSAP/Motion):** `[CÓMO_DEBE_SENTIRSE_LA_ANIMACIÓN. Ej: Movimientos mecánicos, secos, sin inercia, glitch effects]`

### 🛠️ PLAN DE EJECUCIÓN (Sigue estos pasos estrictamente)

**FASE 1: Planificación e Inmersión**
1. Ingresa a `Plan Mode`.
2. Lee `ONBOARDING-AI.md`, `project-context/sections/design-system/Design-System.md` y `project-context/context.md` para entender el estado actual del framework.
3. Redacta un documento de estrategia detallando cómo adaptarás la antigua estética a la nueva.

**FASE 2: Cirugía de Tokens (Core Design System)**
1. Modifica `Design-System.md`: Reescribe la tabla de colores, la tabla tipográfica y las reglas de `Mood Direction` para que coincidan con las Variables de Migración.
2. Modifica `ONBOARDING-AI.md`: Actualiza el "Ecosistema" y las reglas de diseño para que el próximo Agente asimile la nueva personalidad del proyecto de inmediato.

**FASE 3: Reemplazo Global (Batch String Replacement)**
Ejecuta un script o herramienta de reemplazo global (`glob` + `replace`) recursivo en TODOS los archivos `.md` de la carpeta `Graph-Design-Framework` para:
1. Reemplazar el Nombre del Proyecto antiguo por el nuevo (respetando mayúsculas/minúsculas).
2. Reemplazar el Prefijo CSS antiguo por el nuevo (ej. `` -> `nuevo-`).

**FASE 4: Refactorización Semántica y Narrativa (El "Alma")**
Utiliza un sub-agente (como `generalist`) para reescribir el contenido semántico de la carpeta `WorkFlow-Docs/Design-Agent-Skills/` (especialmente archivos de Motion y Creative Direction). 
*   **MANDATO:** No basta con cambiar nombres de variables. Debes reescribir las descripciones de las animaciones, las metáforas (ej. cambiar "Cristal Líquido" por "Acero Forjado"), la descripción del "Parallax" y los nombres de los componentes lógicos (ej. `SoftOrganicCard` -> `GlitchPanel`). La narrativa debe sumergir al lector en la nueva estética.

**FASE 5: Validación**
Busca mediante `grep_search` si quedó algún rastro del `[PREFIJO_ACTUAL]` o `[NOMBRE_ANTERIOR]` en el framework. Si todo está limpio, avísame que la migración ha finalizado con éxito.