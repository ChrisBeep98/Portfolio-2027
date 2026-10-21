# Protocolo: Modificar el Design System (Actualizar o Añadir)

Usa este protocolo cuando necesitemos agregar nuevos colores, nuevas tipografías, nuevos paddings, nuevos max-widths o cualquier token visual fundamental al sistema. Esto garantiza que la actualización se propague en los tres lugares críticos (Documentación, CSS y UI Interactiva).

***

**PROMPT PARA EJECUTAR EL PROTOCOLO:**

> "Hola. Necesito agregar [NUEVO_TOKEN_O_REGLA] al Design System. Por favor, ejecuta estrictamente el **Protocolo de Modificación del Design System** en las siguientes 3 Fases:
>
> ### FASE 1: Actualización del Motor (CSS)
> 1. Modifica `src/app/globals.css`.
> 2. Añade las nuevas variables nativas (`--color-...`, `--space-...`, etc.) dentro de `:root` y `.dark`.
> 3. Añade la clase utilitaria correspondiente (`.bg-...`, `.px-gutter-...`, `.text-display-...`) en la sección `@layer utilities` o de Typography Tokens.
> 4. Asegúrate de usar clamp() para valores responsivos si aplica.
> 
> ### FASE 2: Actualización Visual (Página Interactiva)
> 1. Modifica la sección correspondiente en `src/app/design-system/components/` (Ej: `TypographySection.tsx`, `ColorsSection.tsx` o `SpacingSection.tsx`).
> 2. Crea o actualiza el bloque visual en la interfaz para que yo (el usuario) pueda VER en tiempo real el nuevo token agregado.
> 3. Ejecuta un `pnpm run build` en background para asegurar que la página compila.
> 
> ### FASE 3: Actualización Documental (El Inventario y Tokenizer)
> 1. Modifica `Graph-Design-Framework/project-context/sections/design-system/Design-System.md`. Añade el nuevo token a la tabla correspondiente.
> 2. Modifica `Graph-Design-Framework/WorkFlow-Docs/Design-Agent-Skills/Tokenizer.md`. Añade el nuevo token a la tabla de The Blacklist para que el agente empiece a forzar su uso.
> 
> Confírmame una vez hayas completado las 3 Fases y ESPERA mi autorización para hacer commit."
