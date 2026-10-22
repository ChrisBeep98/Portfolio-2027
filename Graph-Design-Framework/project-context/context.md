# Contexto del Proyecto: Christian Sandoval Portfolio 2026
> **Última Actualización:** 22 de Octubre, 2026
> **Estado:** Fase 1 (Migración de Framework) — Graph-Design-Framework adaptado desde Epicare; Lenis global activo; sistema tipográfico tokenizado; motion tokens en `src/lib/motion.ts`.
> **Navegación:** Ver [`README.md`](./README.md) para el índice completo de archivos de contexto.

## 1. Visión General
Portafolio personal narrativo de **Christian Sandoval** (Senior UX/UI Developer & Frontend Architect). Filosofía **"Cinematic Architect"** con **Glass Engine v2.2** e identidad **Binary Soul**: la página es una película técnica dirigida por scroll, bimodal (Light = The Gallery / Dark = The Simulation).

Rutas vivas:
- `/` — Landing: Header · Hero (2 actos) · About (manifiesto) · Marquee · Projects (showcase) · Process · Footer (cortina fija).
- `/about` — Página About con Mask Reveal editorial.
- `/projects/vank` · `/projects/anyma` · `/projects/nevado` — Case studies "Individual Page Clones" (5 Actos + Liquid Sidebar Index).

## 2. Entorno y Stack Tecnológico
- **Framework:** Next.js 16 (App Router, Turbopack) — `output: "export"` estático, `images.unoptimized`.
- **UI:** React 19 · Tailwind CSS v4 (tokens `@utility`) · lucide-react · framer-motion (acordeones/chips) · clsx + tailwind-merge.
- **Motion:** GSAP 3.14 + ScrollTrigger + ScrollToPlugin · **Lenis 1.3 global** (`SmoothScrollProvider` → `window.__lenis`, sync con `gsap.ticker`).
- **3D:** three `^0.182` + @react-three/fiber + drei (ArtScene) · `@types/three` pinned 0.186.0 (override en `pnpm-workspace.yaml`).
- **i18n:** sistema propio — `LanguageContext` + `src/lib/dictionary.ts` (Data Parity Rule EN/ES forzada por TypeScript). NO next-intl.
- **Tipografía:** Manrope (`--font-display`) + JetBrains Mono (`--font-mono`) vía `next/font`.
- **Tooling:** pnpm 12 (nunca npm/yarn) · Node 20 · Deploy GitHub Pages (`.github/workflows/deploy.yml` → `./out`).
- **Git user:** ChrisBeep98 / christiansandovaldesign@gmail.com.

## 3. Estándares de Desarrollo (OBLIGATORIO)
Resumen ejecutivo — el detalle vive en `command-prompts/ONBOARDING-AI-protocol.md` y `sections/design-system/Design-System.md`:
- **Zero Px Policy:** tipografía y espaciado desde tokens (`globals.css`); motion desde `src/lib/motion.ts`. Desviaciones = declaradas.
- **Tailwind v4:** tokens nuevos SOLO como `@utility` top-level (el CSS plano no genera variantes `md:`/`dark:` — lección Epicare #120). Carpetas de docs excluidas del scanner con `@source not`.
- **GSAP:** `gsap.context()` + `ctx.revert()`; solo `transform/opacity`; `force3D: true`; sticky nativo en vez de pin manual; `prefers-reduced-motion` cubierto.
- **Componentes:** >~200 líneas → dividir; constantes UPPER_SNAKE_CASE; JSDoc `@description`.
- **i18n:** cero texto quemado en JSX; llaves EN/ES idénticas.
- **Build:** `pnpm build` verde antes de entregar.

## 4. Estructura del Código
```
src/
├── app/                  # layout.tsx (providers: Theme, Language, SmoothScroll) · page.tsx · about/ · projects/{vank,anyma,nevado}/
├── components/
│   ├── canvas/           # ArtScene.tsx (R3F)
│   ├── providers/        # SmoothScrollProvider.tsx (Lenis global)
│   ├── sections/         # Header · Hero · About · Marquee · Projects · Process · Footer
│   └── ui/               # CustomCursor · LanguageSwitch · ThemeToggle
├── context/              # LanguageContext · ThemeContext
├── lib/                  # dictionary.ts (i18n) · motion.ts (tokens cinemáticos)
└── styles/globals.css    # tokens @theme + @utility, elastic spacing, theme-invert, glass-engine, split-scroll
```

## 5. Registro de Acciones Críticas

### Fase 1 — Migración de Framework (20 Oct 2026)

1. **[NUEVO] Consolidación y migración del framework (20 Oct 2026):**
    - `docs/` + `@@Agent-Features/` del repo consolidados en `framework-old/` (referencia histórica read-only).
    - `Graph-Design-Framework/` (identidad Epicare) adaptado a Portfolio2026: contexto Epicare archivado en `_archive/legacy-epicare/`; Design-System.md, START-HERE.md y ONBOARDING-AI-protocol.md reescritos; skills en refactorización semántica (sin daño a recetas).
2. **[NUEVO] Lenis global + motion tokens (20 Oct 2026):**
    - `lenis@1.3.27` instalado; `SmoothScrollProvider` (sync `gsap.ticker`, `ScrollTrigger.update`, apagado con reduced-motion). ⚠️ Instancia en **`window.__lenis`**: `window.lenis` está reservado por Lenis 1.3+ para auto-setup (TS2717 si se declara).
    - `src/lib/motion.ts` creado: EASE/DUR/STAGGER/REVEAL/SCRUB/TRIGGER/TOGGLE/CURSOR/DECK/SWAP/PLANET censados del código real + `framework-old/docs/ANIMATION-ENGINE.md`.
3. **[NUEVO] Sistema tipográfico tokenizado (20 Oct 2026):**
    - Anatomía Epicare importada a Manrope/JetBrains Mono: 27 `@utility` (`text-display-3xl`…`text-h7`, `text-subtitle`, `text-body-2xl`…`xs`, `text-caption`, `text-overline`, `text-ui-label`, `text-data`, `text-meta`). Pesos display: 700 móvil / 600 desktop. Body 300 (sm/xs 400). Viejo `.text-display-xl` plano eliminado (sin usos); `.text-mono` legacy conservado (sin usos).
    - **Fix de scanner Tailwind:** los `.md` del framework con ejemplos de clases (`bg-[url('...')]`, `var(--x-*)`) contaminaban el CSS compilado y rompían el build → `@source not "../../Graph-Design-Framework"` + `@source not "../../framework-old"` en `globals.css`.
    - `pnpm build` verificado verde (7/7 páginas estáticas).
4. **[NUEVO] Repo público nuevo + dominio propio (20 Oct 2026):**
    - Git desbloqueado: `safe.directory` en config global + credencial de Windows reemplazada vía login browser de GCM — ahora autentica como ChrisBeep98 (push 403 de `csandoval-arch` resuelto).
    - Historial limpio: `main` orphan con commit único `699a762` empujada a `origin` = https://github.com/ChrisBeep98/Portfolio-2027.git (estaba vacío; verificado `git ls-remote`). Respaldo: rama local `backup-2026` + remoto `backup` → Portfolio2026.git (historial completo intacto en GitHub).
    - Excluidos del repo público vía `.gitignore` (viven solo en disco local): `Graph-Design-Framework/`, `framework-old/`, `Agent-Features/`, `@@Agent-Features/`, `Kimi_Agent_Layout y responsive completo/`, `.qwen/`, `build_*.log`.
    - Dominio: `christiansandoval.art` (Hostinger; NS dns-parking = zona gestionable en hPanel). Creado `public/CNAME` → viaja como `out/CNAME` en cada deploy. **EJECUTADO y verificado 21 Oct 2026**: DNS aplicado (A @ → 185.199.108/109/110/111.153; CNAME www → chrisbeep98.github.io — `nslookup` OK) + Pages Source=GitHub Actions + dominio OK + deploy verde (commit vacío `49a5a66` lo disparó tras habilitar Pages). Ápex https 200 con cert válido; `www` → 301 al ápex. **Pendiente único**: casilla *Enforce HTTPS* (http:// ápex aún sirve 200 sin redirigir). Ciclo de publicación: `git push` a `main` → workflow → `out/` live en ~1-2 min; si el build CI falla, el dominio sigue sirviendo la última versión buena.

### Fase 2 — Hero: overflow tipográfico + Acto 2 interactivo (21 Oct 2026)

5. **[NUEVO] Fix de overflow del Hero + Acto 2 interactivo (21 Oct 2026):**
    - Tipografía: las líneas largas (`ARQUITECTO.DIGITAL`, `& STORYTELLER`) se cortaban por la derecha en todo desktop. Tokens `@utility` nuevos `text-hero-fit-wide` / `text-hero-fit-indent` en `globals.css` = `min(firma, calc(vw − px))` con coeficientes MEDIDOS en navegador (ES+EN); aplicado solo `md:`; móvil y líneas que ya cabían, intactos. APROBADO por el director ("la composicion quedo perfecta").
    - Performance móvil (HARDWARE-SYMPHONY): `scrub: 1.2` → `scrub: true` (Lenis ya suaviza); imagen móvil sin geometría layout (fade+scale); sin `scale` en las líneas del scrub (escalar texto con stroke re-rasteriza); órbitas GSAP con `gsap.set` por frame → keyframes CSS; pausa fuera de viewport (IO) y en Acto 1 móvil; `backdrop-filter` de la tarjeta del Hero apagado <768px; `will-change` estáticos y `transition-all` de los duplicados glitch eliminados. El harness headless (CPU 4×) NO reproduce el lag de dispositivo: frame-times ~60fps con caídas dentro del ruido; lag real pendiente de confirmación del usuario en su teléfono.
    - Pills del Acto 2: viaje orbital por `offset-path` + `offset-rotate: 0deg` (traslación sin giro propio, pedido explícito del director); chip-cards al click: burbuja `theme-invert` opaca a NIVEL RAÍZ (fixed con coords medidas vía `data-sat`), stem hairline 12px en desktop, centrada sobre el planeta en móvil; viaje pausado con burbuja abierta (`.orbits-open`); cierre por Escape/re-click/scroll. Copy nuevo `hero.satellitesInfo` (paridad EN/ES). APROBADO tras un rechazo de la primera versión (contraste lavado por heredar opacity 0.6 del anillo + recorte móvil).
    - Docs sincronizados: `sections/home/context.md` (aprobados/quemados) y `scrollytelling-map.md` (Acto 2).

6. **[NUEVO] Refactor Hero + fix del Acto 1 (21 Oct 2026):**
    - **Bug (recarga + scroll rápido):** la intro (Acto 1) y el scrub (Acto 2) comparten elementos (`.reveal-*`, `.hero-detail`, imagen); los `.to()` del scrub capturan su start "lazy" al primer render. Al recargar + hacer scroll rápido antes de que termine la intro, capturaban las letras a medio salir y el Acto 1 ya no se restauraba al volver arriba. **Fix:** `scrollTl.set(...)` a posición 0 fija el estado visible del Acto 1 ANTES de que los `.to()` capturen su start (solo rinde al hacer scroll, no al montar → no pisa la intro). Track se mantiene 300vh, scrub intacto (no one-shot — el one-shot sigue QUEMADO).
    - **Auto-avance «imán» (deseado por el director; recalibrado 22 Oct 2026 — ver entrada 7):** un recorrido real dentro del centro del Hero + pausa → lleva solo hasta el borde del acto (ABAJO → salida/Acto 2; ARRIBA → Acto 1). Detección por listener propio con asentamiento (`AUTO_ADVANCE_SETTLE_MS`). ⚠️ La implementación original (GSAP `ScrollToPlugin` con `autoKill: true`) quedó **sustituida**: producía jitter y viajes no deterministas. `prefers-reduced-motion` lo desactiva.
    - **Tokens:** Hero ahora consume `src/lib/motion.ts` (EASE/DUR/STAGGER/REVEAL/PLANET/REDUCED_MOTION_QUERY). Los valores sin token se nombraron como constantes UPPER_SNAKE en `Hero.tsx` (`INTRO_HOLD`, `MOBILE_SLAM_PERCENT`, `DETAIL_EXIT_Y`, `ORBITS_LIVE_AT`, `AUTO_ADVANCE_*`).
    - `npx tsc --noEmit` y `pnpm build` verdes (7 rutas). **Pendiente:** verificación en dispositivo del fix de recarga (headless no lo prueba).

7. **[NUEVO] Calibración del imán de scroll del Hero (22 Oct 2026):**
    - **Síntoma reportado:** «a veces noto una mini reversa» + viajes no deseados al Acto 1/2. **Medido, no supuesto**, con el harness visual (`tools/visual-qa/trace-hero-autoadvance*.js`: tres trazas que muestrean `scrollY`/`velocity`/`direction`/`targetScroll` por frame sobre `evalpage.mjs`, desktop 1440×900 y móvil 390×844).
    - **Antes (ambos viewports, determinista):** un roce de **20px** hacia abajo desde el techo commiteaba el viaje completo a la salida (`0 → 1800`); **40px** hacia arriba devolvían al Acto 1 (`1800 → 0`); una corrección de **5px** a mitad del viaje revertía todo (`399 → 0`); el handoff settle→viaje producía jitter de **±1…8px**; y `autoKill: true` mataba el viaje de forma **no determinista** (móvil completó el viaje, desktop no, con código idéntico).
    - **Fix:** banda `AUTO_ADVANCE_BAND` [0.15, 0.85] + intención `AUTO_ADVANCE_INTENT` 0.07 de viewport de recorrido acumulado + **consumo único** con rearme + holgura 28px + asentamiento 140ms, y **Lenis como autoridad única** (`window.__lenis.scrollTo(target, { easing: gsap.parseEase(EASE.inOut), lock: false })`) en vez de ScrollToPlugin; la dirección se lee de `lenis.direction` (inmune al jitter ±1px). Respaldo GSAP `autoKill: false` si Lenis aún no montó. El asentamiento se reprograma **siempre** (antes un delta 0 cancelaba el timer y el disparo se perdía).
    - **Después (medido, ambos viewports):** 20px abajo se queda en 20; 40px arriba se queda en 1760; la corrección de 5px se queda en ~403 (el usuario manda); inversiones **0** (antes 2-5); `tgtDiv` **0.5px** (antes 8-10px → confirma autoridad única). `npx tsc --noEmit` y `pnpm build` verdes (7 rutas). **Cero cambio de píxel:** el diff se limita al efecto del imán y a sus constantes.
    - **Pendiente:** la *sensación* en dispositivo real (el harness mide trayectorias, no feel).

### Deuda conocida / drift detectado (censo 2026-10-20)
- **Colores hardcodeados en componentes:** `bg-[#F2F2F0] dark:bg-[#050505]` (page.tsx wrapper, Marquee, About), `#0A0A0A/#FAF9F6` (Footer), `#E5E5E3/#0D0D0D` (Process) — candidatos a tokens semánticos en el próximo sweep (NO tocar sin protocolo).
- **Tailwind genéricos:** iconos acento de About usan `text-orange-500/purple-500/cyan-500/pink-500/yellow-500`.
- **Dependencia externa:** `noise-bg` carga SVG de `grainy-gradients.vercel.app` — self-host pendiente.
- **Docs viejos vs código:** `framework-old` describía Process como "3D Cards"; real = acordeón editorial. ARCHITECTURE.md viejo dice Next 15 (real: 16) y referencia COMPONENT-SYSTEM.md (no existe).
- **Púrpura `#a855f7`** documentado como acento de marca por censo — pendiente confirmación de dirección.
- **`pnpm lint` NO es ejecutable (detectado 22 Oct 2026):** el script del `package.json` es `next lint`, comando eliminado en Next 16, y el repo no tiene config de ESLint (`eslint.config.*` / `.eslintrc*` inexistentes) → `Invalid project directory provided, no such directory: .../lint`. El checklist de entrega (§5 del `codebase-architecture-protocol`) pide `pnpm lint`: hoy no se puede cumplir. Candidatos: `eslint` + `eslint-config-next` o retirar el script del checklist. **No es un fallo de código del portfolio.**
- **`git status`/`git diff` intermitentemente bloqueados en Windows (22 Oct 2026):** `ERROR_SHARING_VIOLATION` («El proceso no tiene acceso al archivo porque está siendo utilizado por otro proceso») con el dev server o el build corriendo; `git rev-parse` sí funciona. Workaround: reintentar con la terminal quieta.
