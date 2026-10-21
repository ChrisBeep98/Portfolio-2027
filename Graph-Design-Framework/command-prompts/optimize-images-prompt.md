# Prompt de Optimización de Imágenes (ffmpeg + cwebp)

Copia y pega este prompt cada vez que necesites optimizar imágenes o convertirlas a WebP.

***

**PROMPT PARA OPTIMIZAR IMÁGENES:**

> "Hola. Necesito optimizar las siguientes imágenes: **[RUTA o CARPETA]**.
>
> **Contexto:**
> - Tenemos `ffmpeg` instalado globalmente (puede convertir a WebP).
> - Si la shell no reconoce `ffmpeg`, refrescar el PATH con: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")`
>
> **Instrucciones:**
> 1. Escanea los archivos de imagen en la ruta indicada (`.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.tiff`).
> 2. Muéstrame una tabla con: nombre, formato actual, dimensiones, y tamaño en KB/MB.
> 3. Convierte todas a `.webp` con estos parámetros:
>    - **Calidad:** 80 (buen balance calidad/peso)
>    - **Resolución:** Mantener original. Si alguna supera 2000px de ancho, redimensionar a 1920px max.
>    - **Comando base:** `ffmpeg -i input.png -quality 80 output.webp`
> 4. Guarda las versiones WebP en la **misma carpeta** con el mismo nombre pero extensión `.webp`.
> 5. Muéstrame tabla comparativa: tamaño original vs WebP, % de reducción.
> 6. Actualiza cualquier componente `.tsx` o `.css` que referencie las imágenes originales para usar `.webp`.
> 7. **NO elimines los originales** — yo los borraré cuando confirme."

***

**PROMPT PARA CONVERTIR UNA SOLA IMAGEN:**

> "Hola. Convierte esta imagen a WebP: **[RUTA]**. Calidad 80, mantener resolución."

***

## Referencia Rápida

| Formato | Mejor para | Soporte |
|:---|:---|:---|
| `.webp` | Web general, fotos + transparencia | ✅ Todos los navegadores modernos |
| `.avif` | Máxima compresión | ⚠️ Safari 16+, Chrome 85+ |
| `.svg` | Iconos, logos, ilustraciones | ✅ Universal |

### Parámetros de Calidad WebP

| Calidad | Uso | Noción |
|:---|:---|:---|
| 90-100 | Hero images, portfolio | Casi sin pérdida visible |
| 75-85 | Fotos generales, avatares | Balance ideal calidad/peso |
| 60-70 | Thumbnails, backgrounds | Buena reducción, artefactos mínimos |
| 40-55 | Previews, placeholders | Máxima reducción |

### Comando Batch (todas las imágenes de una carpeta)

```powershell
# Convertir todas las PNG de una carpeta a WebP (calidad 80)
Get-ChildItem "CARPETA/*.png" | ForEach-Object {
    ffmpeg -i $_.FullName -quality 80 "$($_.DirectoryName)\$($_.BaseName).webp"
}
```

> **Nota:** Los archivos `.svg` NO necesitan conversión — son vectores y ya pesan poco. Solo optimiza raster (PNG, JPG, etc.).
