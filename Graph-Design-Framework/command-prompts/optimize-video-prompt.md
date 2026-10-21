# Prompt de Optimización de Video (ffmpeg)

Copia y pega este prompt cada vez que necesites optimizar un video del proyecto.

***

**PROMPT PARA OPTIMIZAR VIDEO:**

> "Hola. Necesito optimizar el siguiente video: **[RUTA DEL VIDEO]**.
>
> **Contexto:**
> - Tenemos `ffmpeg` instalado globalmente via `winget` (Gyan.FFmpeg 8.1+).
> - La ruta de instalación es `C:\Users\Grizzly\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_...`.
> - Si la shell no reconoce `ffmpeg`, refrescar el PATH con: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")`
>
> **Instrucciones:**
> 1. Analiza el video original: resolución, duración, bitrate, codec, si tiene audio.
> 2. Comprímelo con estos parámetros base:
>    - **Codec:** H.264 (`libx264`)
>    - **CRF:** 28-30 (background videos toleran más compresión)
>    - **Preset:** `slow` (mejor compresión)
>    - **Audio:** Eliminar (`-an`) si es video de fondo con `muted`
>    - **Faststart:** `-movflags +faststart` para carga web rápida
>    - **Resolución:** Mantener la original (no upscale)
> 3. Si es un video de fondo con blur/overlay, usa CRF 30. Si es video hero visible, usa CRF 26.
> 4. Guarda el optimizado con sufijo `_optimized` en la misma carpeta.
> 5. Compara tamaños y muéstrame la tabla de resultados.
> 6. Actualiza el componente `.tsx` que referencia el video para usar la versión optimizada.
> 7. Confirma que el video se ve bien en dev."

***

## Referencia Rápida de Parámetros ffmpeg

| Parámetro | Valor | Noción |
|:---|:---|:---|
| CRF 23 | Alta calidad | Hero videos, contenido principal visible |
| CRF 26 | Buena calidad | Videos con overlays ligeros |
| CRF 28-30 | Aceptable | Background videos con blur, muted |
| CRF 32+ | Baja calidad | Solo para previews o thumbnails |
| `-preset slow` | Mejor ratio | Más tiempo de encoding, menor tamaño |
| `-preset fast` | Rápido | Menos compresión, encoding rápido |
| `-an` | Sin audio | Para videos `muted` en web |
| `-movflags +faststart` | Web-ready | Mueve metadata al inicio del archivo |

> **Nota:** El video original NO se elimina automáticamente. Bórralo manualmente cuando confirmes que el optimizado se ve bien.
