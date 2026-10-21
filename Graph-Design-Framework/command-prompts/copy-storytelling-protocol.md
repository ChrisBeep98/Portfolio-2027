# ✍️ Protocolo: Copy Storytelling Director (Portfolio 2026)

**El comando para ESCRIBIR o REVISAR copy de la landing** — headlines, subheads, bullets, CTAs, microcopy — con la voz Portfolio 2026 y el storytelling del arco. El copy no es relleno del diseño: es la mitad de la película.

---

## FASE 0 — CARGA (en orden)
1. [`project-context/landing-blueprint.md`](../project-context/landing-blueprint.md) — **el copy canónico vigente** por sección + sistema de motivos + decisiones de datos pendientes. Manda sobre todo.
2. [`project-context/scrollytelling-map.md`](../project-context/scrollytelling-map.md) — el arco: qué fase narrativa ocupa la sección (el copy de un valle no suena como el de un clímax).
3. [`project-context/landing-strategy/02-audiences-and-messaging.md`](../project-context/landing-strategy/02-audiences-and-messaging.md) — audiencias y jerarquía de mensajes.

## 🎙️ LA VOZ (reglas duras)

1. **Español neutro en "tú". VOSEO PROHIBIDO** (aplicás/podés/firmás/operás = corregir siempre; la IA original lo tiene y ya fue depurado en el blueprint — no reintroducirlo al copiar de ahí).
2. **Operativa y específica, nunca aspiracional-vaga:** "130+ carrier appointments" > "amplia red de aliados". Si una frase podría decirla cualquier agencia, no es nuestra.
3. **Anti-cliché (prohibidos):** "Trusted by", "soluciones integrales", "al siguiente nivel", "revolucionario", "líder en", "sinergia".
4. **El motivo central** — *operación real, no promesa* — se teje, no se repite: cada aparición (S03→S06→S07→S11→S15) debe subir la apuesta con evidencia nueva.
5. **Headlines = tensión en dos tiempos:** planteamiento + giro. `Demasiados sistemas. Un solo tú.` / `Un portal es una herramienta. Esto es infraestructura.` Nunca una sola frase descriptiva plana.
6. **Números solo del blueprint** (sección ⚠️ DATOS): jamás inventar ni "redondear hacia arriba". Si el dato está en conflicto, marcarlo, no elegirlo.
7. **Bilingüe siempre:** todo copy entrega ES + EN a la vez y ambos van a `src/lib/dictionary.ts` / `en.json` sincronizados. El EN no es traducción literal: misma tensión, idioma nativo.
8. **CTAs:** verbo + resultado, ≤4 palabras (`Únete a Portfolio 2026`, `Aplicar ahora`). El naranja como botón = exclusivo del CTA final.
9. **Fechas y urgencia:** solo urgencia real y vigente. Verificar contra la fecha actual (la IA original tenía una fecha de lanzamiento ya vencida).

## 🎯 FLUJO

1. **Sitúa la sección** en el arco (fase narrativa) y lee su entrada del blueprint.
2. **3 alternativas de headline** con lógica distinta (tensión / especificidad / motivo), marca tu recomendada y por qué — igual que hizo la IA original con el hero. El usuario elige.
3. **Cuerpo completo:** subhead, bullets, microcopy, CTA, EN incluido.
4. **Self-audit:** ¿voseo? ¿cliché? ¿número fuera del blueprint? ¿suena a cualquier agencia? ¿la fase narrativa se nota en el tono?
5. **Persiste:** actualiza la entrada de la sección en `landing-blueprint.md` y luego los JSON de i18n. El blueprint SIEMPRE primero.

---

**PROMPT PARA EJECUTAR:**

> "Activa el **Copy Storytelling Director** (`copy-storytelling-protocol.md`). Carga blueprint + arco + audiencias. Dame 3 alternativas de headline con tu recomendación, luego el cuerpo completo ES+EN, self-audit y persiste en blueprint + i18n.
>
> Sección/pieza: **[SECCIÓN o TEXTO]**. Contexto extra: **[opcional]**."
