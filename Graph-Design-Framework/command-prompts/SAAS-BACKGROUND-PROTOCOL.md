# 🌌 Protocolo: SaaS Texture Generator (Pro-Max)

**El comando definitivo para generar fondos y texturas 3D ultra-premium usando inteligencia artificial.**
Usa este protocolo cuando necesites crear imágenes de fondo (backgrounds), texturas abstractas, hero images, o banners que no parezcan "AI slop" genérico, sino arte digital de alta gama renderizado en Silicon Valley.

---

## 🛑 EL PROBLEMA
Cuando se le pide a una IA que genere "un fondo de tecnología", tiende a vomitar imágenes de circuitos azules brillantes, candados flotantes, código matrix verde o mallas plásticas de baja calidad. Eso destruye la credibilidad de un producto de software serio.

## 🛠️ LA SOLUCIÓN
Este protocolo fuerza al agente generador de imágenes (vía la herramienta `generate_image`) a usar un vocabulario arquitectónico, cinematográfico y de materiales premium.

---

## 🎨 FÓRMULA DEL PROMPT PERFECTO

Cada vez que el usuario te pida generar una textura, debes construir el prompt en inglés siguiendo exactamente esta estructura de 5 partes:

1. **El Medio y la Geometría:** `Abstract fluid gradient background` / `High-end 3D composition` / `Architectural geometric shapes`.
2. **El Material (Crítico):** `smooth liquid glassmorphism` / `frosted glass` / `matte silicone` / `brushed dark metal`.
3. **Inyección de Marca (Hex Codes):** Tienes que forzar los colores de la marca directamente en el prompt usando nombres y códigos HEX. Ej: `blending deep black (#050505) and charcoal (#1A1A1A) with a subtle purple reflection (#a855f7)`.
4. **Acabado Fotográfico (El Anti-Slop):** `Subtle grain texture` (ruido fotográfico sutil), `moody cinematic lighting` (iluminación cinemática), `depth of field` (profundidad de campo), `4k, extremely high quality`.
5. **Restricción Final:** Siempre terminar el prompt con `, no text` para evitar que la IA intente dibujar letras deformes.

---

## 📚 CATÁLOGO DE ESTILOS (Ejemplos listos para usar)

### 1. Liquid Dark Glassmorphism (El Clásico Portfolio 2026)
> "Abstract fluid gradient background, extremely high quality, 4k, smooth liquid glassmorphism, blending deep black (#050505) and charcoal (#1A1A1A), with a very subtle purple reflection (#a855f7). Subtle grain texture, professional SaaS brand background, ultra-modern tech aesthetic, moody cinematic lighting, 3D soft surface, no text."

### 2. Apple-Style Light Mesh (Minimalista)
> "Abstract 3D geometric mesh gradient background, extremely high quality, smooth soft light, blending pure white, soft silver, and vibrant purple (#a855f7) with a touch of glitch cyan (#06b6d4). Subtle noise texture, professional SaaS brand background, ultra-modern tech aesthetic, Apple style, depth of field, minimalist, clean, no text."

### 3. Sculptural InsurTech (Estructural)
> "3D sculptural tech background, dark mode, floating metallic and frosted glass geometric blocks, glowing cyan and orange rim lights, architectural scale, premium insurtech brand, cinematic lighting, ultra-realistic, no text."

### 4. Vibrant Chromatic Aura (Energético)
> "Vibrant chromatic mesh gradient background, blending purple (#a855f7) and glitch pink (#ec4899), smooth liquid color transitions, frosted glass effect, modern tech brand, 4k resolution, clean empty space for typography, no text."

### 5. Swiss Corporate Gradient (Limpio y Elegante)
> "Abstract minimalist banner background, extremely high quality, 4k, smooth gradient blending vibrant purple (#a855f7) and deep black (#050505). Clean Swiss design aesthetic, subtle frosted glass texture, no harsh shadows, ultra-modern SaaS brand background, smooth color transitions, soft grain, no text."

---

## 🚀 CÓMO EJECUTAR ESTE COMANDO

El usuario te dirá algo como:
> *"Aplica el **SAAS TEXTURE GENERATOR** (`SAAS-BACKGROUND-PROTOCOL.md`) y genérame una imagen para el Hero de la página de precios, usa el estilo Sculptural pero ponle más cristal."*

**Tus acciones como Agente:**
1. Lees este archivo para recordar la fórmula.
2. Armas el prompt en inglés siguiendo las 5 partes, asegurándote de incluir los HEX codes de la marca actual.
3. Ejecutas la herramienta `generate_image` silenciosamente.
4. Mueves la imagen generada (vía `run_command` con `cp`) a la carpeta `public/images/banners/` del proyecto.
5. Se la presentas al usuario y/o la integras en el código React.
