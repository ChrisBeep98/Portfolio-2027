# Prompt de Validación del Framework (Self-Validation Rules)

Copia y pega este prompt para auditar la consistencia del framework `Graph-Design-Framework/`. **Excluye siempre `_archive/`** (es historia de las marcas muertas; que contenga Epicare/Inter/azul-naranja/GO AMS/Playfair/café es correcto ahí) y **`references/`** (investigación externa).

***

**PROMPT PARA AUDITAR EL FRAMEWORK:**

> "Ejecuta una auditoría completa del framework `Graph-Design-Framework/` (excluyendo `_archive/` y `references/`) con estas reglas. Por cada una reporta ✅ PASS o ❌ FAIL con detalle.
>
> **Reglas:**
>
> 1. **BRAND_CONSISTENCY:** Las únicas fuentes autorizadas son **Manrope y JetBrains Mono**. Buscar y flaggear: `Inter Display`, `Inter Tight`, `Playfair`, `Geist`, `serif premium`, `font-serif`. Buscar y flaggear colores de marcas muertas: `#35BBFD`, `#F26023`, `#2F3437`, `#A40EBB`, `café|coffee|Salento`, `ámbar|amber`, `terracotta`, `green-moss`, `Earthy`, `NEVER Dark Mode|solo Light`. Buscar nombres de marcas muertas fuera de contexto de procedencia: `Epicare`, `GO AMS`, `go-crm`, `go-ams` — se toleran SOLO en `_archive/`, en `CHANGELOG.md` (historial) y en menciones explícitas de procedencia ("proyecto anterior") en TASTE-LEDGER, READMEs, ONBOARDING, START-HERE y project-context. Resultado esperado: 0 menciones sin marcar.
>
> 2. **STACK_CONSISTENCY:** Ningún doc activo prescribe `next-intl`, `useTranslations`, `messages/*.json`, `window.lenis` como instancia, `design-system-app/`, `Epicare-Web/` ni basePath `/Epicare`. La realidad mandada es: i18n propio (`useLanguage()` + `src/lib/dictionary.ts`, Data Parity Rule), `window.__lenis` (Lenis 1.3 reserva `window.lenis`), `src/lib/motion.ts`, static export sin basePath → GitHub Pages.
>
> 3. **PATH_VALIDITY:** Ningún doc activo referencia la raíz muerta `context-Docs/`. Todo enlace relativo `[texto](./archivo.md)` apunta a un archivo existente. Verificar especialmente `ONBOARDING-AI-protocol.md`, `START-HERE.md`, ambos README y `AWWWARDS-CINEMATIC-ACTS.md`.
>
> 4. **TOKEN_REFERENCE:** Toda clase de tipografía/espaciado citada en los `.md` (`text-display-*`, `text-body-*`, `px-frame`, `section-gap`…) existe en `src/styles/globals.css`. Los snippets con vocabulario del proyecto anterior deben estar marcados con su tabla de equivalencias (MOBILE-PATTERN-LIBRARY).
>
> 5. **MOTION_TOKEN_SYNC:** Los valores de la tabla §0 de `MOTION-BIBLE.md` coinciden con `src/lib/motion.ts`. Además, grep en `src/components/` + `src/app/`: easings/duraciones GSAP inline que deberían importar de `motion.ts` → listar como deuda (código shipped congelado = deuda documentada, NO tocar sin protocolo).
>
> 6. **SECTION_SYNC:** Todo componente importado en `src/app/page.tsx` y toda ruta de `src/app/` tiene cobertura en `project-context/sections/` Y entrada en `project-context/scrollytelling-map.md`. El orden del mapa coincide con el orden real de `page.tsx`.
>
> 7. **BIMODAL_RULE:** Ningún doc activo prescribe "solo light" o "solo dark". Grep de `light-only` en componentes → listar excepciones como deuda. Los contextos `theme-invert` cuentan como bimodales (invierten con el tema).
>
> 8. **BUILD_INTEGRITY:** `globals.css` conserva las exclusiones `@source not` de TODAS las carpetas de documentación del repo (`Graph-Design-Framework`, `framework-old`); carpeta de docs nueva → exclusión nueva (el scanner de Tailwind v4 interpreta ejemplos de clases en `.md`). `pnpm build` verde.
>
> 9. **SKILL_FRONTMATTER:** Cada `.md` en `Design-Agent-Skills/` (excepto README) tiene frontmatter `name` + `description`.
>
> 10. **CHANGELOG_CURRENT:** La última entrada del `CHANGELOG.md` es igual o posterior a la última actualización de `context.md`.
>
> **Formato de reporte:**
> ```
> ── Framework Validation Report ──
> Date: [fecha]
> 1.  BRAND_CONSISTENCY:  ✅/❌ (detalle)
> 2.  STACK_CONSISTENCY:  ✅/❌
> 3.  PATH_VALIDITY:      ✅/❌
> 4.  TOKEN_REFERENCE:    ✅/❌
> 5.  MOTION_TOKEN_SYNC:  ✅/❌
> 6.  SECTION_SYNC:       ✅/❌
> 7.  BIMODAL_RULE:       ✅/❌
> 8.  BUILD_INTEGRITY:    ✅/❌
> 9.  SKILL_FRONTMATTER:  ✅/❌
> 10. CHANGELOG_CURRENT:  ✅/❌
> Score: X/10 PASSED
> ```"

***

> **Cuándo ejecutar:** tras sesiones que modifiquen el framework (skills, DS, contexto). Mínimo 1 vez al mes.
