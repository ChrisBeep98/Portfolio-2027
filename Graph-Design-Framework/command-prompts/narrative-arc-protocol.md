# 🎢 Protocolo: Narrative Arc Director (Portfolio 2026)

**El comando para PLANIFICAR o MODIFICAR el arco de tensión de la página completa** — añadir/quitar/reordenar secciones, decidir dónde van los picos (pins) y los valles, y mantener la película coherente. Opera a nivel PÁGINA; los protocolos de sección (creative-motion, redesign) operan a nivel ESCENA y obedecen lo que este arco dicte.

---

## 📚 LA TEORÍA (asimilar antes de opinar)

**El scrollbar es la línea de tiempo de una película.** El usuario controla el playback — excepto donde tú tomas el control. Una landing premium alterna dos estados:

- **VALLE (flujo libre):** el contenido pasa a ritmo del usuario. Reveals suaves, parallax, light-ups. ~70% de la página. Su función es hacer respirar: **sin valles, los picos no se sienten**.
- **PICO (pausa forzada / pin):** la página deja de avanzar y el scroll mueve la escena. Le quitas al usuario el control de su tiempo — potentísimo y carísimo.

### Las 6 leyes del arco
1. **Presupuesto de pins: 3 máximo por landing.** Más = parque de atracciones agotador.
2. **Nunca dos pins adyacentes.** Tras cada pico, valle obligatorio (idealmente uno emocional/ligero).
3. **Un pin debe ganarse su costo:** solo se pina lo que no puede contarse estático — una transformación, una secuencia por capítulos, un antes/después. Test: *"¿qué recibió el usuario a cambio de las pantallas de scroll que le cobré?"* Si la respuesta es "vio N items que cabían en una pantalla" → el pin es criminal. Contenido de **comparación/escaneo** (features, precios, FAQs) NUNCA se pina.
4. **Distribución:** hook al inicio (pin 1), segundo pico hacia la mitad, clímax hacia el final. Entre ellos, desarrollo.
5. **Todo clímax necesita resolución:** la página termina en acción (CTA + footer), nunca en el clímax.
6. **Dentro de un pin también hay arco:** el final del pin debe ser *distinto* de su inicio (algo evolucionó — mood, color, escala). Un pin donde nada cambia es un carrusel con el scroll secuestrado.

### La forma canónica
```
tensión ▲   HOOK          PICO 2          CLÍMAX
        │   ██              ██              ███
        │   ██░░░      ░░░░░██░░░      ░░░░░███░░
        └───┴────┴─────┴────┴────┴─────┴────┴───┴──▶ scroll
            pin1  valle-desarrollo pin2 respiro valle pin3  CTA
```

---

## 🎯 FLUJO DE EJECUCIÓN

### FASE 0 — Cargar el estado real
1. `project-context/scrollytelling-map.md` — secuencia actual, técnicas-firma, sección "ARCO NARRATIVO Y PACING" (el arco vigente y el presupuesto de pins restante).
2. `src/app/page.tsx` — el orden real renderizado.
3. Si existe planeación de contenido (IA/copy), cargarla desde `project-context/`. (La del proyecto anterior quedó archivada en `_archive/legacy-epicare/epicare_landing_ia_copy.html` — solo referencia histórica del formato.)

### FASE 1 — Diagnóstico del arco actual (visible, compacto)
Dibuja la curva actual: qué sección ocupa cada fase narrativa (hook / desarrollo / pico / respiro / clímax / resolución), pins gastados vs presupuesto, huecos (¿falta clímax? ¿falta resolución? ¿dos picos pegados? ¿valle demasiado largo sin mini-pico?).

### FASE 2 — Propuesta de arco (el entregable)
Tabla: orden propuesto de secciones → fase narrativa → valle/pico → técnica-firma sugerida (respetando la regla de setlist: vecinas nunca repiten técnica) → qué se añade/quita/mueve y POR QUÉ. Máximo 2 alternativas si hay una decisión genuinamente abierta. **STOP: esperar aprobación del usuario antes de tocar código o el mapa.**

### FASE 3 — Persistir la decisión
Con el arco aprobado: actualizar la sección "ARCO NARRATIVO Y PACING" de `scrollytelling-map.md` (fases, presupuesto de pins, estados ✅/🔴). Ese mapa es la ley que los protocolos de sección obedecen — si el arco no está ahí, no existe.

### FASE 4 — Derivar el trabajo
Listar las tareas de sección resultantes, cada una con su protocolo: sección nueva → `../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-CINEMATIC-ACTS.md` (`/awwwards-cinematic-acts`); sección existente que cambia de rol → `AWWWARDS-REDESIGN-SECTION-PROTOCOL.md`; ajuste menor → `tokenized-design-protocol.md`.

---

## 🚫 ANTI-PATRONES DE ARCO
- Pinear una lista comparable "porque se ve premium" (viola ley 3).
- Añadir una sección sin asignarle fase narrativa ("va después de X" no es una fase).
- Convertir cada sección en pico porque cada una se diseñó por separado (el síntoma clásico de diseñar escenas sin película).
- Terminar la página en el clímax sin CTA/resolución.
- Modificar el arco en el chat y no persistirlo en el mapa (la próxima IA no lo verá).

---

**PROMPT PARA EJECUTAR:**

> "Activa el **Narrative Arc Director** (`narrative-arc-protocol.md`). Ejecuta FASE 0–1 (diagnóstico del arco actual con la curva) y preséntame la propuesta de FASE 2. No modifiques nada hasta que apruebe; luego persiste en `scrollytelling-map.md` y deriva las tareas.
>
> Cambio que quiero evaluar: **[ej. "añadir sección Problema y FAQ, quitar X, decidir dónde va el clímax"]**."
