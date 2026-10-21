---
name: Section Archetypes
description: Coreografía mínima obligatoria por tipo de sección. La IA no decide "cuánta ambición aplicar" — el piso ya es alto. Cada arquetipo lista composición, motion mínimo y paradigmas de layout alternativos para rediseños.
---

# 🎬 SECTION-ARCHETYPES — El piso de ambición por tipo de sección

Cuando construyas o rediseñes una sección, identifica su arquetipo y cumple su **coreografía mínima**. Las recetas viven en `MOTION-BIBLE.md` (§) y `SCROLL-EFFECTS-ARCHITECT.md` (SEA §).

Cada arquetipo incluye **paradigmas de layout** — estructuras DOM radicalmente distintas entre sí. En un rediseño, cambiar de paradigma es OBLIGATORIO (re-stylear el mismo DOM no es rediseñar).

---

## HERO
**Rol:** primera impresión; 2 segundos para establecer nivel.
**Mínimo obligatorio:** entrada orquestada (no aparece: se revela por olas §2) · Text-Birth en el titular (§1) · ≥3 capas de parallax a velocidades distintas · 1 elemento breathing (§4) · transición coreografiada hacia la sección 2 (§5).
**Paradigmas:** (a) tipográfico masivo con media detrás · (b) split asimétrico texto/visual con overlap · (c) inmersivo full-media con UI diegética · (d) editorial en capas con elementos sangrando.

## MANIFIESTO / WHY (declaración de postura — ej. "Somos la operación")
**Rol:** el momento de voz de marca; convicción, no features.
**Mínimo:** titular como protagonista absoluto (escala display, Text-Birth teatral con scrub) · los argumentos NO compiten con el titular (llegan después o al lado, nunca en grid simétrico de iconitos) · light-up de lectura (§6) o pin narrativo (SEA §4).
**Paradigmas:** (a) lista tipográfica raw de filas full-width con líneas 1px y hover coreografiado · (b) scrollytelling pinned: titular fijo al fondo, argumentos pasan en primer plano (SEA §4) · (c) split-scroll alternado (SEA §1) · (d) un solo bloque editorial gigante con palabras clave que se encienden con scrub y notas al margen estilo revista.

## MÉTRICAS / PROOF
**Rol:** credibilidad en números.
**Mínimo:** count-up obligatorio (§7) · números en `JetBrains Mono` · jerarquía: 1 métrica héroe ≥2× las demás · stagger de entrada (§2).
**Paradigmas:** (a) ticker horizontal continuo · (b) 1 número gigante pinned que rota con scrub · (c) constelación asimétrica con líneas conectoras dibujándose.

## BENTO / SERVICES
**Rol:** amplitud de oferta, escaneable.
**Mínimo:** celdas de tamaños genuinamente distintos (1 dominante) · hover con revelación de contenido (C2 del rubric) · entrada en cascada (§2, `STAGGER.wave`).
**Paradigmas:** (a) bento clásico asimétrico · (b) stacking cards con pin (SEA §2) · (c) fila horizontal con scroll-pin (SEA §3).

## AUDIENCIAS / FOR-WHO
**Rol:** que cada perfil se reconozca.
**Mínimo:** codificación por color de marca por audiencia · el usuario "viaja" entre perfiles (pin, split o snap) — nunca 3 columnas estáticas.
**Paradigmas:** (a) split-scroll alternado (SEA §1) · (b) horizontal pinned, 1 pantalla por perfil (SEA §3) · (c) morph de un mismo layout que se reconfigura por perfil (FLIP, SEA §6).

## PRODUCTO / FEATURES
**Rol:** enseñar el producto en acción.
**Mínimo:** el visual del producto es protagonista (≥50% del espacio) · scrollytelling: cada feature resalta su zona del visual (§6 + SEA §4) · Curtain reveal en imágenes (§3).
**Paradigmas:** (a) visual pinned + features rotando · (b) zoom-journey dentro del producto · (c) alternancia izquierda/derecha con parallax cruzado.

## TESTIMONIOS / LOGOS
**Rol:** confianza social sin aburrir.
**Mínimo:** movimiento continuo (marquee con `mix-blend-difference` si cruza fondos) o flujo horizontal · citas con Text-Birth · jerarquía: 1 testimonio héroe.
**Paradigmas:** (a) marquee de doble fila a velocidades opuestas · (b) carrusel horizontal pinned (SEA §3) · (c) cita gigante única con rotación scrubbed.

## CTA FINAL
**Rol:** el cierre; máxima concentración de energía.
**Mínimo:** cambio de mood respecto a la sección anterior (fondo invierte o gradient morph §7) · titular display con Text-Birth · botón con hover magnético (§7) · breathing en el fondo (§4).
**Paradigmas:** (a) full-screen tipográfico · (b) túnel/spotlight (circle reveal §3) · (c) split con el formulario como objeto flotante 3D.

## FOOTER
**Rol:** utilidad + última firma de marca.
**Mínimo:** reveal de cortina al llegar (la página "aterriza") · wordmark gigante (display-3xl) como cierre · links con hover coreografiado.

---

**Regla transversal:** ninguna sección repite el efecto-firma de su vecina inmediata (verifica `scrollytelling-map.md`). La página es un setlist: cada canción distinta, mismo concierto.
