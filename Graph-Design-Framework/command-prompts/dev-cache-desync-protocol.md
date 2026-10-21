# ⚡ Protocolo: Turbopack / Dev Cache Desync & Ghost Chunk Error

> **Qué es:** Protocolo oficial para diagnosticar y solucionar de inmediato los bloqueos de caché en memoria de Turbopack, errores fantasma de CSS/PostCSS (ej. `globals.css:8634:1 Unexpected end of input`), y bloqueos de archivos en el directorio `.next`.
> **Cuándo usarlo:** Cuando el compilador en desarrollo (`pnpm dev` / `next dev`) lance errores inexplicables en archivos que están bien escritos, cuando hagas `git restore` o cambies de rama con el servidor encendido, o cuando Windows bloquee la eliminación de `.next`.

---

## 1. 🧠 Contexto: ¿Por qué ocurre este error?

Turbopack (el motor de empaquetado en Rust de Next.js 16) utiliza una arquitectura de **caché incremental en memoria (HMR State AST)** para compilar en milisegundos.

### Las 3 causas principales del desync:
1. **Ghost PostCSS Chunk:** Si se modifica o revierte un archivo CSS maestro (`globals.css`) mientras el servidor `pnpm dev` está activo, Turbopack puede retener en memoria un árbol sintáctico (AST) desfasado de un chunk intermedio. Al intentar reconciliar el nuevo archivo con el chunk fantasma en memoria (ej. buscando la línea `8634` en un archivo de `620` líneas), lanza `Parsing CSS source code failed: Unexpected end of input`.
2. **Git Branch Switch / Git Restore:** Revertir archivos de golpe con `git restore .` o cambiar de rama cambia los archivos en disco más rápido de lo que el watcher de Turbopack puede invalidar su grafo de dependencias en memoria.
3. **Windows File Lock en `.next`:** En Windows, Node.js y Turbopack mantienen locks abiertos sobre los archivos dentro de `.next/dev/`. Si intentas borrar `.next` mientras el proceso de Node está corriendo en otra terminal o en segundo plano, el sistema operativo responderá con `RemoveFileSystemItemIOError: El directorio no está vacío`.

---

## 2. 🛠️ Protocolo de Solución Rápida (3 Pasos)

### Paso 1: Matar el proceso bloqueado de Node/Next.js
El servidor `pnpm dev` debe detenerse por completo para liberar los archivos de memoria y disco.

* **En tu terminal:** Presiona `Ctrl + C`.
* **Si el proceso quedó colgado en segundo plano (PowerShell en Windows):**
  ```powershell
  Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
  ```

---

### Paso 2: Purgar la caché corrupta de `.next`
Con el proceso cerrado, elimina la carpeta `.next` para forzar a Turbopack a generar un grafo limpio:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

---

### Paso 3: Validar en limpio y reiniciar

1. **Verificación de Integridad:** Ejecuta el chequeo de tipos para asegurar que el código fuente no tiene errores reales:
   ```bash
   npx tsc --noEmit
   ```

2. **Reinicio del Servidor de Desarrollo:**
   ```bash
   pnpm dev
   ```

---

## 3. 🛡️ Reglas de Oro Preventivas

1. **Antes de un `git restore .` o `git checkout`:** Detén siempre el servidor `pnpm dev` (`Ctrl + C`).
2. **Si dudas de si el bug es de tu código o de la caché:** Ejecuta `pnpm build`. Si `pnpm build` pasa con código `0` pero `pnpm dev` falla, **es 100% un desync de caché de Turbopack**.
3. **Pruebas en Móvil:** Para evitar sobrecargas de WebSockets del HMR en teléfonos locales, usa siempre el modo producción: `pnpm build && pnpm start -H 0.0.0.0`.
