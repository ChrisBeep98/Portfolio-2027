# 🏗️ Codebase Architecture Protocol

> **Qué es:** el mapa del código del portfolio + las reglas duras para que cualquier
> cambio salga limpio y no rompa el diseño ya aprobado.
> **Cuándo usarlo:** SIEMPRE que vayas a tocar código en `src/`.
> Es el complemento técnico de [`ONBOARDING-AI-protocol.md`](./ONBOARDING-AI-protocol.md):
> ese explica el proyecto, este explica **dónde va cada cosa y qué no debes romper**.
>
> No está atado a ninguna IA. Es un `.md` plano: referéncialo con `@ruta` o pega su
> bloque final "PROMPT PARA EJECUTAR".

---

## 0 · Regla que domina a todas las demás

**El diseño desktop y mobile shipped ya está aprobado. Ningún cambio técnico tiene
derecho a mover un píxel sin permiso explícito.**

Si un arreglo "correcto" cambia lo que se ve, no lo apliques: repórtalo, explica qué
se movería y espera decisión. Un bug de arquitectura conocido y documentado es
preferible a un rediseño accidental.

La verificación anti-regresión es obligatoria (§6).

---

## 1 · Stack y restricciones no negociables

| | |
|:--|:--|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Estilos | Tailwind **v4** (sin `tailwind.config.js`; todo vive en `src/styles/globals.css`) |
| Motion | GSAP 3.14 + ScrollTrigger + ScrollToPlugin · **Lenis global** (`SmoothScrollProvider` → `window.__lenis`) |
| 3D | three + @react-three/fiber + drei (`ArtScene.tsx`) · `@types/three` pinned 0.186.0 (override en `pnpm-workspace.yaml`) |
| i18n | **Sistema propio:** `LanguageContext` + `src/lib/dictionary.ts`, resuelto 100% en cliente |
| Build | `output: "export"` → HTML estático (`./out`) → GitHub Pages (`.github/workflows/deploy.yml`). **Sin basePath.** |
| Gestor | pnpm 12 — nunca npm/yarn |

Lo que `output: "export"` te prohíbe, y que la gente olvida:

- **No hay servidor.** Ni Server Actions, ni Route Handlers, ni ISR, ni middleware,
  ni `redirects`/`headers` de `next.config`. Nada que se ejecute en request-time.
- **`next/image` no optimiza** (`images.unoptimized: true`). Los `<img>` crudos son
  una decisión deliberada, no un descuido. No los "arregles" a `next/image` para optimizar.
- **El HTML se prerenderiza en build.** Todo `window`/`document`/`localStorage`/
  `navigator` va dentro de `useEffect`/`useLayoutEffect`, nunca en el cuerpo del
  componente ni en module scope.
- **Sin basePath:** a diferencia del proyecto anterior, NO existe ni hace falta un
  helper `asset()` — los assets de `public/` se referencian con ruta absoluta simple
  (`/img/...`). No portar `@/lib/asset`.

---

## 2 · Mapa: dónde va cada cosa

```
Portfolio2026/  (raíz del repo)
├── src/app/
│   ├── layout.tsx           Fuentes (next/font: Manrope + JetBrains Mono), script
│   │                        anti-flash de tema, providers: ThemeProvider >
│   │                        LanguageProvider > SmoothScrollProvider, CustomCursor,
│   │                        noise-bg, metadata global.
│   ├── page.tsx             LA LANDING. Solo composición: Header > Hero > About >
│   │                        Marquee > Projects > Process > Footer. Cero lógica.
│   ├── about/page.tsx       Página About (Mask Reveals editoriales).
│   └── projects/{vank,anyma,nevado}/page.tsx
│                            Case studies — "Individual Page Clones": estructura
│                            base compartida (5 Actos + Liquid Sidebar) con
│                            micro-ajustes por pieza. NO convertir en ruta dinámica.
├── src/components/
│   ├── sections/            Header · Hero · About · Marquee · Projects · Process ·
│   │                        Footer. Una sección = un archivo.
│   ├── canvas/              ArtScene.tsx (R3F).
│   ├── providers/           SmoothScrollProvider.tsx (Lenis). Monta UNA vez.
│   └── ui/                  CustomCursor · LanguageSwitch · ThemeToggle.
├── src/context/             LanguageContext.tsx · ThemeContext.tsx.
├── src/lib/
│   ├── dictionary.ts        SSOT de TODO el texto (en/es, Data Parity Rule).
│   └── motion.ts            Tokens canónicos de movimiento (EASE, DUR, STAGGER,
│                            REVEAL, SCRUB, TRIGGER, TOGGLE, CURSOR, DECK, SWAP,
│                            PLANET, PARALLAX).
├── src/styles/globals.css   TODO el design system: @theme, variables bimodales,
│                            elastic spacing, theme-invert, glass-engine,
│                            split-scroll, 27 @utility tipográficos. Ver §3.
└── public/                  Assets (rutas absolutas simples, sin helper).
```

**Reglas de ubicación:**

1. **Una sección nueva** → `src/components/sections/<Nombre>.tsx` + su fila en
   `src/app/page.tsx` + su contexto en `Graph-Design-Framework/project-context/sections/`
   + entrada en `scrollytelling-map.md` (Ley 3: no repetir la técnica-firma de la vecina).
2. **Algo usado por 2+ componentes** → sale a su propio archivo. No se duplica.
3. **Un valor de color, espaciado o tipografía** → `globals.css` como token
   (`@utility` top-level). Nunca un hex ni un `px` suelto en el JSX.
4. **Un valor de easing, duración o trigger** → `src/lib/motion.ts`. Nunca inline.
5. **Texto visible al usuario** → `src/lib/dictionary.ts` vía `useLanguage()`. Nunca
   literal en el JSX, ni siquiera en `aria-label` o `alt`.

---

## 3 · `globals.css` — la trampa nº1 de este repo

Tailwind v4 registra utilidades de dos formas y **solo una soporta variantes**:

| Forma | `md:`, `hover:`, `dark:`, `group-hover:` |
|:--|:--|
| `@utility nombre { … }` (nivel superior) | ✅ **funciona** |
| dentro de `@layer utilities { .nombre { … } }` | ❌ **NO genera CSS con variante** |

Una clase declarada en `@layer utilities` usada como `md:mi-clase` **no existe**.
No hay error, no hay warning: el estilo simplemente no se aplica y nadie lo nota.

**Estado a 2026-10-20:** toda la tipografía tokenizada (`text-display-*`, `text-h1..h7`,
`text-body-*`, `text-subtitle`, `text-caption`, `text-overline`, `text-ui-label`,
`text-data`, `text-meta`) está como `@utility` — los pesos responsivos 700→600 van en
`@media` anidado dentro del propio `@utility` (verificado con build verde).
Aún planas en `@layer utilities` → `.px-frame`, `.section-gap`, `.glass-engine`,
`.text-mono`, `.text-stroke-*`: **rotas si se usan con prefijo** — migrarlas a
`@utility` cuando se necesiten con `md:`/`dark:`.

**Trampa nº2 (nueva, 2026-10-20):** el scanner de contenido de Tailwind v4 lee TODOS
los archivos del repo, incluidos `.md`. Los ejemplos de clases arbitrarias en la
documentación (`bg-[url('...')]`, `var(--x-*)`) generaban CSS inválido y **rompían el
build**. Fix vivo: `@source not "../../Graph-Design-Framework"` y
`@source not "../../framework-old"` al inicio de `globals.css`. **Carpeta de docs
nueva en el repo → añadir su exclusión.**

**Antes de declarar cualquier utilidad nueva: usa `@utility`.**
**Antes de usar una existente con prefijo: comprueba cómo está declarada.**

Comando para auditar qué variantes están muertas (compara el uso real contra el CSS
compilado; requiere un `pnpm build` previo):

```bash
grep -rhoE '(sm|md|lg|xl|hover|group-hover|dark|focus):(px-frame|section-gap|glass-engine|text-display|text-h[0-9]|text-body)[a-z0-9-]*' \
  --include='*.tsx' src/ | sort -u | while read cls; do
  lit=$(printf '%s' "$cls" | sed 's/:/\\\\:/')
  grep -rqF ".$lit" out/_next/static/**/*.css \
    && echo "OK      $cls" || echo "MUERTA  $cls"
done
```

> El escapado importa: en el CSS la clase se escribe `.md\:algo` con backslash
> literal. Buscar `md:algo` sin él da falsos negativos en TODO.

### Convención de nombres de tokens

Patrón real del portfolio: variables semánticas cortas en `:root`/`.dark`
(`--background`, `--foreground`, `--surface`) mapeadas en `@theme`
(`--color-background: var(--background)`); variables elásticas de espaciado
(`--px-frame`, `--section-gap`, `--block-gap`, `--content-gap`) con override en
`@media (max-width: 768px)`. Al añadir un token, **imita el grupo al que entra**; no
"normalices" los existentes: los consumen los componentes shipped.

El bloque `@theme` declara alias que resuelven contra `:root` y `.dark`.
**Es deliberado** — es lo que hace los tokens theme-aware. No lo "limpies".

---

## 4 · Trampas conocidas, con evidencia

### 4.1 · `ScrollTrigger.refresh()` casi no existe

Cuatro cosas cambian la altura del documento: el cambio de idioma (los textos EN/ES
miden distinto), los acordeones (`Process.tsx` anima height con framer-motion), la
carga de imágenes/vídeos y el montaje de `ArtScene`. Es la causa raíz clásica de los
desfases de triggers/sticky.

**Si tu cambio altera la altura del documento, llama a `ScrollTrigger.refresh()`**
(tras el cambio, no durante).

### 4.2 · Disciplina de `gsap.context`

El patrón correcto, universal en el repo shipped:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => { /* animaciones */ }, containerRef);
  return () => ctx.revert();
}, []);
```

Toda animación creada **fuera** del callback del contexto sobrevive al desmontaje
(lección del proyecto anterior: un contador creaba su ScrollTrigger fuera y dejaba 8
huérfanos por montaje). Implementaciones de referencia en este repo: `Hero.tsx`
(2 actos), `Projects.tsx` (`gsap.matchMedia()` para desktop/mobile), case studies
(triggers por elemento). **Cópialas; no las reinventes.**

### 4.3 · Scroll programático: Lenis o ScrollToPlugin, nunca nativo

`window.scrollTo` y `scrollIntoView({behavior:'smooth'})` **pelean con Lenis** y
producen saltos. Usar:
- `window.__lenis?.scrollTo(target, { offset, immediate })` — con optional chaining
  (con `prefers-reduced-motion` el provider no arranca y no existe), o
- ScrollToPlugin, el patrón shipped de las case studies:
  `gsap.to(window, { duration: DUR.signature, scrollTo: { y: "#id", autoKill: false }, ease: EASE.inOut })`.

⚠️ `window.lenis` (sin guion bajo) pertenece a la librería (auto-setup de Lenis 1.3) —
no asignar ni leer la instancia ahí.

### 4.4 · Doble montaje desktop/mobile

Si montas dos árboles con `hidden md:block` / `block md:hidden`, ten presente:

- Ambos árboles se envían e hidratan siempre.
- **`id` duplicados** en el DOM: un `href="#seccion"` siempre resuelve al primero.
- Los ScrollTrigger con **selector string** (`trigger: '.mi-clase'`) resuelven al
  primer match, que puede estar en `display:none`. Usa refs, o clases distintas por
  breakpoint, o el patrón shipped `gsap.matchMedia()` (Projects.tsx).

### 4.5 · Vídeo e imagen: cómo se cargan

- **`<img>` por debajo del fold → `loading="lazy"` + `decoding="async"`.** Sin
  `loading`, React 19 emite un `<link rel="preload" as="image">` en el `<head>` y
  mete la imagen en la ruta crítica (precedente del proyecto anterior: 11 imágenes
  = 6.5 MB preloadeados).
- **Imagen de fondo decorativa bajo texto → `alt="" aria-hidden="true"`**, no un alt
  descriptivo: el título ya se anuncia como texto.
- **Vídeo decorativo:** nunca `<video autoPlay>` crudo — descarga el archivo completo
  aunque esté fuera de pantalla. La técnica `SmartVideo` del proyecto anterior
  (`preload="none"` + IntersectionObserver play/pause) está documentada en
  `_archive/legacy-epicare/`; portarla si el portfolio incorpora vídeo.
- **`noise-bg` actual:** SVG externo (`grainy-gradients.vercel.app`) — dependencia de
  red registrada como deuda; self-host pendiente.

### 4.6 · i18n: todo es cliente

`LanguageProvider` importa el objeto completo de `dictionary.ts` y sirve el idioma
activo vía `useLanguage()`. Implicaciones:

- Persistencia real: `localStorage('language')` + autodetección `navigator.language`
  en el primer mount; fallback `'en'`.
- El HTML prerenderizado sale en el idioma inicial; el swap ocurre en cliente sin
  remontar el DOM (los ScrollTrigger sobreviven — verificar tras cambios grandes de
  contenido).
- Al cambiar idioma el texto cambia de longitud y las alturas se mueven → hace falta
  `ScrollTrigger.refresh()` (§4.1).
- **Data Parity Rule:** `es` debe satisfacer el tipo de `en` — TypeScript la fuerza
  al compilar. Aun así: mismas claves, mismos tipos, arrays de la misma longitud;
  añadir llaves a AMBOS objetos en la misma edición.
- Español: **tú neutro, jamás voseo** (`trabajás`, `operás`, `vos` = violación). Ver
  [`copy-storytelling-protocol.md`](./copy-storytelling-protocol.md).
- Deuda known: `Header.tsx` tiene textos hardcodeados (roadmap histórico).

---

## 5 · Checklist de "limpio y pulido"

Antes de decir que terminaste, todo esto debe cumplirse:

- [ ] **Tokens, no valores.** Cero hex, cero `px` sueltos, cero `cubic-bezier`
      literal en el JSX. Color y espaciado desde `globals.css`; easing y duración
      desde `src/lib/motion.ts`.
- [ ] **Utilidad nueva declarada con `@utility`**, no en `@layer utilities` (§3).
      Carpeta de docs nueva → `@source not` (§3, trampa nº2).
- [ ] **Ninguna clase fantasma.** Si usas `text-algo`, comprueba que existe.
- [ ] **Ninguna variable CSS inexistente.** `color: var(--no-existe)` es inválido:
      la declaración se descarta en silencio y el elemento hereda del padre.
- [ ] **Cada animación en un `gsap.context` con `revert()`** en el cleanup (§4.2).
- [ ] **Cada `setTimeout`/`setInterval`/`addEventListener`/observer con su cleanup.**
- [ ] **`ScrollTrigger.refresh()`** si el cambio altera la altura del documento.
- [ ] **Texto visible en `dictionary.ts`**, incluidos `alt` y `aria-label`.
      Paridad en/es verificada (el build la fuerza).
- [ ] **Sin duplicar.** Si copiaste un bloque de otro archivo, extráelo en su lugar
      (excepción deliberada: case studies son "Individual Page Clones" — la
      duplicación estructural entre vank/anyma/nevado es la arquitectura aprobada).
- [ ] **Accesibilidad mínima:** lo interactivo es `<button>`/`<a>` real (no
      `<div onClick>`); los acordeones llevan `aria-expanded` + `aria-controls`; los
      SVG decorativos `aria-hidden="true"`; nada se revela **solo** en `:hover`
      (teclado y táctil no llegan).
- [ ] **`prefers-reduced-motion` respetado.** Referencia: `SmoothScrollProvider`
      (no arranca Lenis) + estados finales visibles sin scrub ni loops.
- [ ] **`pnpm build` verde + `npx tsc --noEmit` limpio + `pnpm lint` sin errores nuevos.**
- [ ] **Verificación anti-regresión ejecutada** (§6).

---

## 6 · Verificación anti-regresión: OBLIGATORIA

El script `design-fingerprint.mjs` del proyecto anterior **no está portado** (no
existe `scripts/` en este repo — candidato a portar, registrado en context.md).
Mientras tanto, el protocolo equivalente es **VISUAL-QA-HARNESS**:

1. **Antes de tocar:** capturas de baseline con `tools/visual-qa/` (móvil 390 siempre;
   +1440 desktop, dark mode y hover según lo que se toque). Los scripts ya usan
   `window.__lenis?.scrollTo(y, {immediate:true})` con fallback a `window.scrollTo`.
2. **Después:** mismas capturas, **leídas con la herramienta de lectura** (no solo generadas).
3. En refactors/limpiezas: las capturas no deben diferir perceptiblemente. Cualquier
   diferencia en layout/copy se justifica línea por línea o se revierte.
4. Con Lenis activo, verificar además el comportamiento runtime que las capturas no
   prueban: sticky tracks (Projects 500vh), ScrollTo de case studies, deck móvil.

> Limitación honesta: las capturas prueban el frame, no la animación. Un cambio de
> motion se verifica en dev server, no en PNG.

---

## 7 · Deuda abierta a 2026-10-20 (censo de migración)

Contexto para no re-descubrirlo. **No lo arregles sin pedirlo** (código shipped = congelado).

| Tema | Detalle |
|:--|:--|
| Colores hardcodeados | `bg-[#F2F2F0] dark:bg-[#050505]` (page.tsx wrapper, Marquee, About), `#0A0A0A/#FAF9F6` (Footer), `#E5E5E3/#0D0D0D` (Process) → candidatos a tokens semánticos en el próximo sweep. |
| Tailwind genéricos | Iconos acento de `About.tsx` (`text-orange-500/purple-500/cyan-500/pink-500/yellow-500`). |
| Dependencia externa | `noise-bg` carga SVG de `grainy-gradients.vercel.app` → self-host. |
| i18n | `Header.tsx` con textos hardcodeados (roadmap histórico de `framework-old`). |
| Legacy CSS | `.text-mono` sin usos (candidato a purga); vieja `.text-display-xl` plana ya eliminada en la migración. |
| Motion tokens | Componentes shipped con valores inline (todos censados en `motion.ts`) — la adopción de imports es gradual, NO se refactoriza lo congelado sin pedido. |
| Acento de marca | Púrpura `#a855f7` documentado por censo — pendiente confirmación de dirección. |
| Smoke test Lenis | Pendiente: sticky tracks + ScrollTo + deck móvil + reduced-motion con Lenis activo. |
| Git | RESUELTO 2026-10-20: `safe.directory` aprobado + credencial ChrisBeep98. Migración empujada a Portfolio-2027 (historial limpio, commit `699a762`; backup en Portfolio2026). |

---

## PROMPT PARA EJECUTAR

```
Vas a tocar código en src/ de este repo (Portfolio2026).

ANTES DE ESCRIBIR NADA, lee completo:
@Graph-Design-Framework/command-prompts/codebase-architecture-protocol.md

Reglas que no puedes romper:

1. El diseño desktop y mobile shipped ya está aprobado. Si tu cambio mueve un píxel
   y no te lo pedí, NO lo apliques: repórtalo, dime qué se movería, y espera.
2. Tailwind v4: declara utilidades nuevas con `@utility` a nivel superior. Las que
   están dentro de `@layer utilities` no funcionan con md:/hover:/dark:. Carpeta de
   docs nueva → exclusión `@source not` en globals.css.
3. Cero hex y cero px sueltos en el JSX: color y espaciado desde globals.css,
   easing y duración desde src/lib/motion.ts.
4. Assets de public/ con ruta absoluta simple (no existe ni hace falta asset()).
5. Todo texto visible (incluidos alt y aria-label) en src/lib/dictionary.ts, con
   paridad en/es (TypeScript la fuerza). Español en tú neutro, nunca voseo.
6. Cada animación dentro de un gsap.context con revert() en el cleanup. Cada
   timer/listener/observer con su cleanup. Si cambias la altura del documento,
   llama a ScrollTrigger.refresh().
7. Scroll programático: window.__lenis?.scrollTo o ScrollToPlugin (autoKill: false).
   Nunca window.scrollTo/scrollIntoView sueltos. Lenis no se re-inicializa.
8. Imágenes bajo el fold con loading="lazy" + decoding="async".

AL TERMINAR, ejecuta y pégame la salida:

  npx tsc --noEmit
  pnpm lint
  pnpm build

Y verifica visualmente con tools/visual-qa/ (móvil 390 + lo que toque), LEYENDO las
capturas antes de reportar.

No me digas que quedó excelente. Dime qué cambió, qué verificaste y qué no.
```
