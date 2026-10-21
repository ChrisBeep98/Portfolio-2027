# 🧽 PRODUCTION SWEEP PROTOCOL — Barrido de Producción

> **Qué es:** el barrido profundo **ruta por ruta y sección por sección** que convierte una página hecha a
> velocidad de vibecoding en una página de producción. Cinco ejes: **assets, código muerto, hardcodeo,
> i18n y SEO/a11y**. Su promesa: bajar peso y deuda **sin mover un píxel** del diseño aprobado.
>
> **Cuándo usarlo:** solo cuando el usuario lo invoque sobre una ruta concreta
> (*"aplica el barrido a `/projects/vank`"*). **No se ejecuta solo, ni "de paso" dentro de otra tarea.**
>
> **Qué NO es:**
> - No es [`build-clean-protocol.md`](./build-clean-protocol.md) — ese es higiene rápida de fin de sesión
>   (tsc + build + huérfanos + verificación visual) sobre lo que acabas de tocar. Este es lento, exhaustivo y
>   **obligatoriamente por secciones**.
> - No es un rediseño. Si algo se ve feo o pobre → [`AWWWARDS-REDESIGN-SECTION-PROTOCOL.md`](./AWWWARDS-REDESIGN-SECTION-PROTOCOL.md).
> - **Sustituye** a `optimize-images-prompt.md` y `optimize-video-prompt.md`, que apuntaban a un `ffmpeg`
>   instalado en `C:\Users\Grizzly\...` — una máquina que no es esta — y a un `winget` que este SKU de Windows
>   no tiene. Este protocolo trae la cadena de herramientas real, instalada y verificada (§3).
>
> **Prerrequisito de lectura:** [`codebase-architecture-protocol.md`](./codebase-architecture-protocol.md).
> Sin él no sabes qué NO puedes romper.

---

## 0 · Las 7 leyes del barrido

1. **La unidad de trabajo es UNA sección, nunca "la página".** Una ruta se barre en el orden de render de su
   `page.tsx`. Se cierra una sección —los 5 ejes, verificada y commiteada— antes de abrir la siguiente.
   *Por qué:* un barrido global produce un diff de 60 archivos que nadie puede revisar ni revertir.

2. **Auditar ≠ ejecutar.** El ciclo es **censo → reporte → STOP → autorización → ejecución**. Jamás optimices
   ni borres en el mismo turno en que descubriste el problema. El STOP es del usuario, no tuyo.

3. **Nada se borra: se pone en cuarentena.** `grep` miente — este repo puede construir rutas de asset
   dinámicamente (§9.1). Mover a `_quarantine/` → build verde → verificación visual limpia (VISUAL-QA) → borrar en un commit aparte.

4. **El píxel es sagrado.** Un barrido es un refactor: la verificación anti-regresión debe salir limpia —
   capturas VISUAL-QA sin diferencias salvo en lo **MEDIA** (esperado al tocar `loading`/`poster`/extensión de
   archivo). Cualquier cambio de **layout o copy** se justifica línea por línea o se revierte. No hay tercera
   opción. (El script `design-fingerprint.mjs` del proyecto anterior NO está portado — candidato a portar en el
   primer barrido; mientras, el estándar es §6 de `codebase-architecture-protocol.md`.)

5. **Un eje, un commit.** `perf(assets):`, `chore(purge):`, `refactor(tokens):`, `feat(i18n):`, `feat(seo):`.
   Un commit mixto es irreversible en la práctica.

6. **Sin medición antes y después, no hubo optimización.** Toda acción de peso reporta
   `KB antes → KB después → % reducción`. "Lo optimicé" sin cifras no cuenta como hecho.

7. **La calidad visual manda sobre el peso.** Si la diferencia se nota a ojo en pantalla real, la compresión
   fue demasiado agresiva: sube calidad y reporta el peso mayor. **El LCP nunca se sacrifica.**

---

## 1 · Los 5 ejes

| # | Eje | Qué caza | Criterio de "limpio" |
|:--|:--|:--|:--|
| **A** | **ASSETS** | Formato obsoleto, sobre-resolución, sobre-codificación, estrategia de carga, `poster` ausente | Raster en WebP · nada por encima de su cap de resolución · todo `<img>` bajo el fold con `loading="lazy" decoding="async"` · todo vídeo decorativo con `preload="none"` + play/pause por observer (patrón SmartVideo, portar si se usa vídeo) y `poster` |
| **B** | **CÓDIGO MUERTO** | Assets sin referencia, componentes sin import, rutas de preview, variantes de prueba, bloques comentados, claves i18n huérfanas, exports sin consumidor | `0` huérfanos en el censo de la sección |
| **C** | **HARDCODEO** | `text-[15px]`, `#0D0D0E`, `cubic-bezier(...)` inline, `as any`, magic numbers | Todo desde `globals.css` y `lib/motion.ts`; desviación viva = declarada en Reporte de Margen Creativo ([`tokenized-design-protocol.md`](./tokenized-design-protocol.md)) |
| **D** | **i18n** | Texto visible literal en JSX (incluidos `alt` y `aria-label`), paridad en/es rota, voseo | `useLanguage()` en todo componente con texto · paridad exacta de claves en `dictionary.ts` (TypeScript la fuerza) · tú neutro |
| **E** | **SEO / A11Y** | Metadata ausente, sitemap incompleto, sin OG image, `<div onClick>`, sin foco visible, sin `prefers-reduced-motion`, `alt` decorativos mal puestos | Cada ruta pública con metadata propia + entrada en sitemap · interactivo = `<button>`/`<a>` real · reduced-motion cubierto |

**Orden obligatorio dentro de una sección: A → B → C → D → E.**
Los assets primero porque cargan el mayor peso con el menor riesgo de diseño; el hardcodeo después porque es
donde más fácil se rompe un píxel.

---

## 2 · Línea base medida — ⚠️ DATOS DEL PROYECTO ANTERIOR (2026-09-07)

> **Todo lo que sigue en esta sección es la línea base del proyecto anterior (Epicare/GO AMS), conservada
> como ejemplo del NIVEL DE DETALLE esperado en un censo.** NO aplica a Portfolio2026: aquí **re-mide TODO**
> (`public/`, huérfanos, px/hex arbitrarios, i18n, SEO) antes del primer barrido y escribe la nueva línea base
> en `project-context/context.md`. Las rutas citadas (`/go-crm`, `/go-ams`, `/licensing`) no existen en este repo.

**Assets — `public/` = 73 MB**

| Formato | Archivos | Peso | Diagnóstico |
|:--|--:|--:|:--|
| `.jpg` + `.jpeg` | 62 | **33.1 MB** | Sobre-codificados. El eje de mayor retorno del proyecto. |
| `.mp4` | 22 | **33.2 MB** | Ninguno tiene `poster`. |
| `.png` | 29 | 5.5 MB | Varios son fotos que deberían ser WebP, no PNG. |
| `.webp` / `.avif` | 4 / 1 | 0.09 MB | Prácticamente sin adoptar. |
| `.svg` | 14 | 0.06 MB | OK — los SVG no se tocan. |

**Huérfanos: 44 archivos = 19.48 MB (27 % de `public/`).** Incluye `Isometric_wireframe…mp4` (3.52 MB),
5 fotos de `Epicare_Landing/Hero/` (3.96 MB), 4 `banners/cta-*.jpg` (2.02 MB), 4 `landing/go-ams/flow_*.jpg`
(2.22 MB) y los 6 SVG de plantilla de Next (`next.svg`, `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`).

**Los 6 más pesados vivos:** `Hero_02.mp4` 6.17 MB (**es el LCP**) · `go_ams_hero.mp4` 4.10 MB ·
`CRM_Hero.png` 3.00 MB (PNG de 3 MB: debe ser WebP) · `support_dark.mp4` 2.48 MB ·
`Earnings_V3_Dark.mp4` 2.45 MB · `go-ams-quote.jpeg` 2.23 MB.

**Código**

| Métrica | Estado | Objetivo |
|:--|--:|:--|
| Píxeles arbitrarios en JSX (`[NNpx]`) | **317** | Tokens o desviación declarada |
| Hex hardcodeados en JSX | **335** | Tokens semánticos |
| `<img>` sin `loading=` | **30 de 34** | Todos salvo LCP |
| `<video>` crudos vs `<SmartVideo>` | 5 vs 12 | Solo el hero puede ser crudo |
| `src="/..."` sin `asset()` | 2 | 0 — rompe en GitHub Pages |
| `as any` | **43** | 0 (un tipo `EcosystemCard` compartido mata la mayoría) |
| Componentes sin `useTranslations` | **24 de 58** | Solo los que genuinamente no tienen texto |

**SEO / rutas**

- Metadata propia: solo `/`, `/go-ams`, `/go-crm`. **`/licensing` no tiene**, y está enlazada desde
  el `Header` del proyecto anterior.
- `sitemap.ts` lista 3 URLs — **falta `/licensing`**.
- **No existe imagen OG** (1200×630). Todo preview compartido sale sin miniatura.
- **4 rutas de preview llegan a producción:** `/preview-spotlight`, `/preview-spotlight/dark`,
  `/preview-spotlight/sol`, `/preview-spotlight/sol-dark`. El propio archivo dice
  *"BORRAR al terminar la revisión visual: no debe llegar a producción"*.

---

## 3 · Herramientas — estado y qué hay que construir

**Cadena de herramientas: CLIs globales en el perfil del usuario. Cero dependencias en el repo.**

Esta máquina es **Windows 11 IoT Enterprise LTSC** y **no tiene `winget`, ni Chocolatey, ni Scoop** — por eso
fallaron los prompts anteriores. La instalación es de binarios estáticos en `%USERPROFILE%\Tools`, añadidos al
**PATH de usuario** (sin permisos de administrador):

| Herramienta | Versión | Ubicación | Para qué |
|:--|:--|:--|:--|
| `ffmpeg` · `ffprobe` | 9.0.1 (gyan.dev essentials) | `%USERPROFILE%\Tools\ffmpeg\bin` | Recodificar vídeo · extraer posters · leer dimensiones/duración/bitrate de **cualquier** asset (también imágenes) |
| `cwebp` · `dwebp` · `webpinfo` | libwebp 1.6.0 (Google) | `%USERPROFILE%\Tools\libwebp\bin` | Encoder WebP de referencia. Mejor que el `libwebp` embebido de ffmpeg gracias a `-m 6 -af` |

**Instalado y verificado el 2026-09-07.** ✅ Los 4 binarios responden desde cualquier directorio.

> **Si una shell no los reconoce** (una sesión abierta antes de la instalación no hereda el PATH nuevo):
> ```powershell
> $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
> ```
>
> **En Git Bash** las rutas son `/c/Users/<usuario>/Tools/ffmpeg/bin` y `/c/Users/<usuario>/Tools/libwebp/bin`.
>
> ⚠️ **Nota de CI:** GitHub Actions **no** tiene estas herramientas. Los assets se optimizan **en local y se
> commitean ya optimizados** — el pipeline de deploy no ejecuta nada de esto. Si algún día se quiere en CI,
> añadir un `uses: FedericoCarboni/setup-ffmpeg@v3` al workflow.

### Los 3 scripts a construir (en `scripts/`, raíz del repo — carpeta inexistente hoy)

Se construyen **una sola vez**, en el primer barrido, y se commitean como herramienta permanente.
**Invocan a los CLIs globales por `child_process`; no importan ninguna librería npm** — así el repo no gana
dependencias y los scripts siguen funcionando aunque se borre `node_modules`.

| Script | Qué hace | Salida |
|:--|:--|:--|
| **`asset-audit.mjs`** | Recorre `public/`; por cada asset: peso, formato, dimensiones/duración/bitrate (`ffprobe`), **qué componentes lo referencian** (por basename sobre `src/`, incluido `dictionary.ts`), flag de huérfano, y estrategia de carga detectada (`loading`, vídeo diferido vs `<video>`, `poster`). Agrupa por sección cuando se le pasa `--route`. | Tabla en consola + `scripts/reports/assets-<fecha>.json` |
| **`optimize-assets.mjs`** | Ejecuta las recetas de §4. **Escribe siempre junto al original, nunca encima.** Flags: `--dry-run` (default), `--images`, `--videos`, `--posters`, `--path <glob>`, `--quality <n>`. Imprime la tabla antes/después. | Archivos nuevos + tabla de reducción |
| **`dead-code-audit.mjs`** | Componentes en `src/components/` sin import alcanzable desde `src/app/`; rutas en `src/app/` sin enlace entrante ni entrada en sitemap; claves de `dictionary.ts` sin consumidor (`t.` no las referencia); diferencias de estructura en/es. | Listado accionable |

> **`design-fingerprint.mjs` NO está portado a este repo.** Si se quiere la prueba dura de la ley 4, portarlo
> desde el proyecto anterior en el primer barrido; mientras, la prueba anti-regresión es VISUAL-QA (§6 de
> `codebase-architecture-protocol.md`).

### Prerrequisito: baseline por ruta

En este repo la baseline son las **capturas VISUAL-QA** de la ruta en su estado aprobado. **Antes de barrer
cualquier ruta**, congela sus capturas (móvil 390 siempre; +1440, light y dark según lo que se toque — matriz
completa en `VISUAL-QA-HARNESS.md`, scripts en `tools/visual-qa/`).

Sin baseline no hay ley 4, y sin ley 4 este protocolo no puede garantizar nada.

---

## 4 · Recetas de optimización

> **Rendimiento medido de esta cadena** (2026-09-07, sobre assets reales del **proyecto anterior** — referencia
> del rendimiento esperable de las herramientas, que son las mismas en esta máquina). No son estimaciones:
>
> | Asset | Antes | Después | Reducción |
> |:--|--:|--:|--:|
> | `CRM_Hero.png` 2952×1588 → WebP q88, **resolución nativa** | 3.00 MB | **215 KB** | **−93 %** |
> | `CRM_Hero.png` → WebP q88, **cap 1440** | 3.00 MB | **88 KB** | **−97 %** |
> | `support_dark.mp4` 1280×720 24fps 10s → H.264 CRF 27 `-an` | 2.48 MB | **200 KB** | **−92 %** |
> | idem CRF 30 | 2.48 MB | **130 KB** | **−95 %** |
> | poster extraído del mismo vídeo | — | 18 KB | — |
>
> Dos lecciones: **(1)** el grueso de la ganancia viene del *formato y de la recodificación*, no del recorte de
> resolución — así que se puede ser conservador con los caps. **(2)** los MP4 originales llevan **pista de audio
> AAC** (verificado en `support_dark.mp4`) en vídeos que se reproducen `muted`: peso 100 % muerto.

### 4.1 · Imágenes (`cwebp`)

| Rol del asset | Formato destino | Calidad | Cap de ancho |
|:--|:--|--:|--:|
| Foto full-bleed / hero visual | WebP | 82 | 1920 px |
| Imagen de card, showcase, mockup de UI | WebP | **88** (el texto de UI y los degradados hacen banding a 82) | 1440 px |
| Fondo decorativo bajo texto, aura, blob | WebP | 70 | 1280 px |
| Thumbnail, avatar, icono raster | WebP | 80 | 2× el tamaño de display |
| Logo, icono, ilustración vectorial | **SVG — no se toca** | — | — |
| PNG con transparencia real necesaria | WebP (soporta alfa) | 88 | igual que su rol |

**Comando base:**

```bash
cwebp -q <calidad> -m 6 -af -metadata none -resize <cap> 0 entrada.jpg -o salida.webp
```

- `-m 6` → esfuerzo de compresión máximo (más lento, archivo menor, misma calidad visual).
- `-af` → auto-filter; reduce artefactos de bloque en degradados y auras.
- `-metadata none` → tira EXIF/ICC. Varias fotos del repo arrastran metadata de cámara inútil.
- `-resize <ancho> 0` → el `0` conserva el aspect ratio. **Omite el flag si el original ya está bajo el cap.**
- Para PNG con transparencia añade `-alpha_q 100`.

**Reglas duras:**
- **Nunca hagas upscale.** Si el original es menor que el cap, omite `-resize`.
- **Un PNG que es una fotografía es un bug**, no una decisión (`CRM_Hero.png`, 3 MB → 215 KB sin tocar resolución).
- **Comprueba el resultado con `dwebp`** antes de dar por buena una conversión agresiva: decodifica a PNG y
  compara a ojo. La ley 7 manda sobre la tabla.
- **AVIF solo para los 3-4 hero más pesados**, y siempre vía `<picture>` con fallback WebP. No lo apliques en
  masa: comprime más pero encoda ~10× más lento y complica el markup — y cada `<picture>` mueve el fingerprint.
- Actualiza la referencia en el `.tsx` **en el mismo commit** que introduce el archivo nuevo.

### 4.2 · Vídeo (`ffmpeg`)

| Rol | CRF | Extra |
|:--|--:|:--|
| Hero / LCP visible a pantalla completa | **24** | Mantiene `autoPlay`. Cap 1920. Es la excepción legítima de la carga diferida. |
| Vídeo de card visible, contenido real | 27 | Cap 1280 — se ve dentro de una tarjeta, no a pantalla completa. |
| Fondo decorativo con blur/overlay | 30 | Cap 1280. |

**Comando base:**

```bash
ffmpeg -y -i entrada.mp4 -c:v libx264 -preset slow -crf <crf> -an \
       -movflags +faststart -pix_fmt yuv420p salida.mp4
```

Con cap de resolución, añade antes de la salida:
`-vf "scale='min(1280,iw)':-2:flags=lanczos"` — el `-2` mantiene el ratio en múltiplo de 2 (requisito de H.264)
y el `min()` evita el upscale de los que ya son menores.

- **`-an` siempre.** 22 vídeos, todos `muted`, y verificado que **sí traen pista AAC**: peso 100 % muerto.
- **`-pix_fmt yuv420p` no es opcional** — sin él Safari se niega a reproducir.
- **`poster` obligatorio en los 22.** Ninguno lo tiene hoy; sin él el hueco queda en blanco hasta el primer
  frame decodificado, y con `SmartVideo` (`preload="none"`) eso puede ser mucho tiempo:
  `ffmpeg -ss 0.1 -i in.mp4 -frames:v 1 -q:v 2 poster.webp`
- **WebM/VP9 como segunda fuente: no por defecto.** Añade una segunda copia de cada vídeo a `public/` y
  duplica el peso del repo para ganar poco frente a un H.264 bien codificado. Solo si una medición lo justifica.

### 4.3 · Estrategia de carga (esto es código, no compresión — y rinde más que comprimir)

- Todo `<img>` bajo el fold: `loading="lazy" decoding="async"`. **Sin `loading`, React 19 emite un
  `<link rel="preload" as="image">` y lo mete en la ruta crítica** — precedente documentado: 11 imágenes,
  6.5 MB preloadeados.
- Todo vídeo decorativo: `preload="none"` + play/pause por IntersectionObserver (patrón SmartVideo del proyecto
  anterior — portarlo si el portfolio incorpora vídeo). Nunca `<video autoPlay>` crudo (descarga completa aunque
  esté fuera de pantalla o en la variante de tema oculta).
- Imagen de fondo decorativa bajo texto: `alt="" aria-hidden="true"`, no un alt descriptivo.

---

## 5 · Cuarentena: cómo se borra sin romper nada

```bash
mkdir -p _quarantine
git mv "public/ruta/al/huerfano.jpg" "_quarantine/huerfano.jpg"
# …todos los candidatos de la sección…
pnpm build   # + verificación VISUAL-QA contra la baseline de capturas (fingerprint si se porta)
```

- Build verde + capturas sin cambios inesperados → el archivo estaba muerto de verdad.
- Build roto o 404 en runtime → **restaurar y documentar por qué el grep falló** (casi siempre: ruta
  construida dinámicamente, §9.1).
- El borrado real (`git rm -r _quarantine`) va en un **commit separado**, después de la verificación.
- `_quarantine/` está fuera de `public/`, así que no se despliega aunque se quede unos commits.

---

## 6 · El ciclo de barrido de una sección

**Paso 0 · Encuadre.** Identifica la sección y su componente. Localiza `sections/<nombre>/context.md`. Confirma
que existe la baseline de la ruta (§3). Si encuentras secciones comentadas o código dormido en `page.tsx`,
**pregunta antes** si se resucita o se purga — no lo decidas tú.

**Paso 1 · Censo.** Corre `asset-audit.mjs --route <ruta>` y `dead-code-audit.mjs`. Recorre el `.tsx` completo.
Rellena los 5 ejes con **cifras y rutas exactas**, sin proponer nada todavía.

**Paso 2 · Reporte + STOP.** Entrega el reporte de §7. **Detente.** No escribas código hasta la autorización.
Es la misma regla del `AWWWARDS-REDESIGN-SECTION-PROTOCOL`, por la misma razón.

**Paso 3 · Eje A (assets).** `--dry-run` primero, tabla, luego ejecución. Actualiza referencias `.tsx`. Los
originales van a `_quarantine/`, no a la papelera.

**Paso 4 · Eje B (código muerto).** Cuarentena de assets, componentes, rutas y claves i18n huérfanas.

**Paso 5 · Eje C (hardcodeo).** ⚠️ **El paso de mayor riesgo.** Sustituir `p-[22px]` por un token **cambia el
píxel** si el token no vale exactamente 22px. Regla: solo sustituye cuando el valor coincide con el token;
cuando no coincide, **no lo toques** — anótalo en el Reporte de Margen Creativo y deja que el usuario decida
entre mover el diseño o promover un token nuevo.

**Paso 6 · Eje D (i18n).** Extrae texto a `src/lib/dictionary.ts` con paridad exacta en/es. Español en tú neutro.
Recuerda: cambiar la longitud del texto **cambia la altura del documento** → `ScrollTrigger.refresh()`.

**Paso 7 · Eje E (SEO/a11y).** Metadata de ruta, sitemap, OG, `alt`, foco, teclado, reduced-motion.

**Paso 8 · Verificación y commit.** Los tres comandos, en orden, con la salida pegada:

```bash
npx tsc --noEmit
pnpm lint
pnpm build
# + capturas VISUAL-QA de la ruta (390/1440, light/dark) LEÍDAS contra la baseline
```

Un commit por eje. Y actualiza `sections/<nombre>/context.md` + el log de
`project-context/context.md` — el barrido es un cambio arquitectónico y se documenta como tal.

---

## 7 · Plantilla del Reporte de Barrido (obligatoria en el Paso 2)

```markdown
## BARRIDO — <Ruta> › <Sección>   [CENSO — sin ejecutar]

### A · ASSETS
| Archivo | Peso | Formato | Dimensiones | Rol | Carga hoy | Propuesta | Peso estimado |
Subtotal sección: X MB → Y MB (−Z %)

### B · CÓDIGO MUERTO
Assets huérfanos: N (X MB) · Componentes: … · Claves i18n: … · Bloques comentados: …
→ candidatos a cuarentena (lista exacta)

### C · HARDCODEO
px arbitrarios: N · hex: N · easings inline: N · `as any`: N
Sustituibles sin mover píxel: N — Requieren decisión (valor ≠ token): N (listados uno a uno)

### D · i18n
Literales en JSX: N (incluidos `alt`/`aria-label`: N) · Paridad en/es: OK / rota en <claves>

### E · SEO / A11Y
Metadata · sitemap · OG · interactivos no operables por teclado · reduced-motion · contraste

### ⚠️ RIESGOS
Qué podría mover un píxel y por qué. Qué NO voy a tocar sin autorización explícita.

### 🎯 PROPUESTA
Ganancia total estimada · nº de commits · orden de ejecución.
**Esperando autorización.**
```

---

## 8 · Orden de barrido recomendado

| Orden | Ruta | Por qué | Deuda medida |
|:--|:--|:--|:--|
| **0** | *(transversal, sin ruta)* | Huérfanos de `public/` y cualquier ruta/preview muerta: no pertenecen a ninguna sección — cuarentena primero y el resto del barrido se hace sobre terreno limpio. | Por censar |
| **1** | `/projects/vank` | Piloto ideal: case study autocontenida y patrón de las demás — lo que se aprenda aplica a anyma/nevado. | Por censar |
| **2** | `/` (landing) | La de mayor tráfico. Larga: Header→Hero→About→Marquee→Projects→Process→Footer, una sección por vez (código shipped = congelado, §0 de `codebase-architecture-protocol.md`). | Censo 2026-10-20: colores hardcodeados en secciones, iconos Tailwind genéricos en About, noise SVG externo, Header sin i18n (`project-context/context.md`) |
| **3** | `/about` + `/projects/anyma` + `/projects/nevado` | Rutas restantes; nevado nunca fue censada a fondo. | Por censar |

> En este repo no existe `/design-system` (decisión pendiente en `sections/design-system/context.md`).

---

## 9 · Trampas de este repo durante un barrido

**9.1 · El grep de huérfanos da falsos positivos.** Hay rutas construidas en runtime (precedente del proyecto
anterior: `` asset(`/Files_Landing/Brand_icons/${b}`) `` — el basename vive en un array de constantes, no en un
`src=` literal). El censo por basename los detecta, **pero el patrón vuelve a aparecer.** En este repo vigila
`dictionary.ts` (rutas de media por llave) y las 3 case studies clonadas. Por eso la ley 3: cuarentena, no borrado.

**9.2 · El doble montaje desktop/mobile duplica los assets del censo.** Patrón del proyecto anterior (`hidden md:block` /
`block md:hidden` montando ambos árboles); en este repo lo shipped usa `gsap.matchMedia()` con un solo árbol
(`Projects.tsx`). Si aparece doble montaje: un asset referenciado dos veces no está duplicado en disco;
no lo cuentes dos veces ni creas que uno de los dos está muerto.

**9.3 · Cambiar la extensión de un asset altera las capturas solo en contenido MEDIA.** Es esperado y correcto.
Lo que **no** puede cambiar es layout ni copy.

**9.4 · Este repo NO tiene basePath** (a diferencia del anterior): los assets de `public/` van con ruta absoluta
simple y no existe `asset()`. Si algún día se añade basePath, portar el helper y prefijar TODO — los `src` crudos
funcionan en local y revientan en producción.

**9.5 · Tocar i18n cambia la altura del documento** → `ScrollTrigger.refresh()` (§4.1 de
`codebase-architecture-protocol.md`).

**9.6 · Las utilidades planas con variante muerta NO son parte de este barrido.** `.px-frame`, `.section-gap`,
`.glass-engine`, `.text-stroke-*` y `.text-mono` están en `@layer utilities`: usadas con prefijo (`md:`, `dark:`)
NO generan CSS. Migrarlas a `@utility` puede **cambiar el diseño aprobado** si algo ya las usa con prefijo a
ciegas. Es una decisión de diseño con el usuario, no una limpieza. **Repórtalo, no lo arregles.**

**9.7 · El LCP no se sacrifica.** Si el hero incorpora vídeo/imagen pesada, mantiene su carga eager a propósito
(precedente del proyecto anterior: `Hero_02.mp4`). Recodifica y da `poster`, pero **no lo migres a carga diferida**.

**9.8 · El diff INLINE puede ser MEDIA disfrazado.** Un verificador de huella clasifica **por atributo, no por
semántica**: un asset servido con `style={{ backgroundImage: url(...) }}` cae en INLINE, no en MEDIA. Precedente
del proyecto anterior: los `-11/+11` de INLINE resultaron ser `background-image:url()` cambiando `.jpeg` →
`.webp`. **Inspecciona siempre el diff de estilos línea por línea antes de concluir que movió el diseño — y
también antes de concluir que no.** Un `padding` cambiado se ve exactamente igual de inocente en el resumen.

**9.9 · Convertir un asset compartido rompe otras rutas.** Precedente del proyecto anterior: un mismo aura jpg
lo usaban 3 componentes de 3 rutas; un asset de CTA, tres botones distintos. En este repo el riesgo análogo son
las 3 case studies clonadas (vank/anyma/nevado comparten patrones y posiblemente media). **Antes de renombrar,
`grep` el basename en TODO `src/` (incluido `dictionary.ts`), no solo en la sección que barres**, y verifica al
final que cada referencia del HTML generado resuelve a un archivo real:

```bash
for p in out/index.html out/about/index.html out/projects/vank/index.html out/projects/anyma/index.html out/projects/nevado/index.html; do
  grep -oE '(src|poster)="/[^"]*"' "$p" | sed 's/.*="//;s/"$//' | sort -u | while read -r a; do
    [ -f "out$a" ] || echo "FALTA $a ($p)"
  done
done
```

---

## 10 · Checklist por sección — ciclo aprobado en el proyecto anterior (2026-09), vigente aquí

Modo de trabajo real (más ligero que §6, válido cuando el usuario pide "déjala lista para prod" sección a sección y revisa cada una): **censo rápido → arreglar → verificar con capturas → reporte corto → esperar su revisión → commit solo cuando lo pide.**

**Código**
- [ ] `useLanguage()` usado de verdad; todo texto visible en `src/lib/dictionary.ts` con paridad en/es (TypeScript la fuerza en el build).
- [ ] Assets de `public/` con ruta absoluta simple (repo sin basePath); cero 404.
- [ ] Sin `Math.random()`/`Date.now()` en render; sin `any[]`; sin imports/vars muertos (eslint limpio).
- [ ] GSAP: `gsap.matchMedia(el)` con el elemento, `(prefers-reduced-motion: no-preference)`, `ScrollTrigger.config({ ignoreMobileResize: true })`, `mm.revert()`.
- [ ] Botones falsos (`div` con `cursor-pointer`) → `span aria-hidden` o botón real.

**Tokens (Tokenizer + Blacklist)**
- [ ] Colores: tokens semánticos bimodales (`bg-white`/`gray-*`/hex → `bg-background`/`bg-surface`/`text-foreground`, acento `primary`). Texto sobre imagen → blanco fijo.
- [ ] Tipografía: tokens sin overrides de `font-bold`/`tracking-*`/`leading-*` en títulos; nada `< text-caption`.
- [ ] Sombras: solo `--card-shadow` (theme-invert) o declaradas; radios = patrones shipped (36/12/4px, burbujas full).

**Motion / rendimiento (Motion Tokenizer + HARDWARE-SYMPHONY §6)**
- [ ] Entradas one-shot con tokens de `src/lib/motion.ts` (`REVEAL/DUR/EASE/TRIGGER`); nada solo-opacity.
- [ ] Solo transform/opacity; loops en CSS con pausa `.is-offscreen`; `willChange` solo durante el tween.
- [ ] Vídeos lazy con `aspectRatio`; sin blur sobre contenido animado; blobs de blur grandes solo desktop.

**Responsive (MOBILE-PATTERN-LIBRARY)**
- [ ] Móvil rediseñado si el desktop no cabe (slider / fuera del contenedor / a sangre / reducir contenido). Nunca `scale-*`.
- [ ] 14px laterales (incluidos paddings internos); un solo separador; texto left en móvil.

**Verificación (VISUAL-QA-HARNESS)**
- [ ] `npx tsc --noEmit` + eslint del componente.
- [ ] Capturas 390 + 1440 (+ tablet/dark/hover si aplica) LEÍDAS; `pinshots` `len` igual si hay pins debajo.
- [ ] `pnpm build` verde antes de subir a producción.

---

## PROMPT PARA EJECUTAR

```
Aplica el Production Sweep Protocol a: [RUTA o RUTA › SECCIÓN]

Lee completos, en este orden:
@Graph-Design-Framework/command-prompts/codebase-architecture-protocol.md
@Graph-Design-Framework/command-prompts/production-sweep-protocol.md

Reglas que no puedes romper:

1. UNA sección por vez, en el orden de render. No abras la siguiente sin cerrar la anterior.
2. Censo primero. Entrégame el Reporte de Barrido (§7) y PÁRATE. No escribas una línea
   de código hasta que yo autorice.
3. Nada se borra: todo candidato va a _quarantine/. El borrado real es un commit aparte
   después de build verde + verificación visual.
4. El diseño está aprobado. Las capturas VISUAL-QA no deben diferir de la baseline salvo en MEDIA.
   Cualquier cambio de layout o copy me lo justificas línea por línea o lo reviertes.
5. Si un px arbitrario NO coincide exactamente con un token, NO lo sustituyas: anótalo en el
   Reporte de Margen Creativo y yo decido.
6. Un eje = un commit.
7. Toda optimización viene con cifras: KB antes → KB después → % reducción.

Herramientas: ffmpeg/ffprobe/cwebp ya están instalados GLOBALMENTE en %USERPROFILE%\Tools
y en el PATH de usuario. NO instales nada en el repo — ni sharp, ni ffmpeg-static, ni
ninguna dependencia npm nueva. Si la shell no los reconoce, refresca el PATH (§3).

Si es el primer barrido del proyecto, antes de nada:
  - construye scripts/asset-audit.mjs, optimize-assets.mjs y dead-code-audit.mjs (§3),
    invocando a los CLIs globales por child_process
  - congela la baseline de capturas VISUAL-QA de la ruta si no existe

Al terminar cada sección, ejecuta y pégame la salida:
  npx tsc --noEmit
  pnpm lint
  pnpm build
Y adjunta la comparación de capturas VISUAL-QA (390 + 1440) contra la baseline.

No me digas que quedó excelente. Dime qué cambió, cuánto pesó antes y después,
qué verificaste y qué NO tocaste.
```
