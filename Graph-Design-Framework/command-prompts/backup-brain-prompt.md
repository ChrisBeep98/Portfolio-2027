# Prompt de Respaldo de Cerebro (Brain Backup v2.0)

Copia y pega este prompt cada vez que quieras guardar una "Instantánea" del framework `Graph-Design-Framework`. Esto crea un ZIP versionado en `_archive/` como versionamiento local.

***

**PROMPT PARA RESPALDAR EL CEREBRO:**

> "Hola. Hemos hecho mejoras al framework de contexto. Crea un respaldo siguiendo estos pasos:
> 
> 1. Determina el siguiente número de versión mirando qué archivos ya existen en `Graph-Design-Framework/_archive/`.
> 2. Ejecuta en PowerShell:
>    ```powershell
>    Compress-Archive -Path "d:/A01 Proyectos-Importantes/GOAMS Landing_Production/Graph-Design-Framework/*" -DestinationPath "d:/A01 Proyectos-Importantes/GOAMS Landing_Production/Graph-Design-Framework/_archive/brain-vN_MonDD.zip" -Force
>    ```
>    Reemplaza `vN` por el número de versión y `MonDD` por la fecha (ej: `brain-v3_Mar19.zip`).
>    **Nota:** Excluir la carpeta `_archive` del ZIP no es posible nativamente con `Compress-Archive`. Si el ZIP incluye `_archive`, está bien — los backups anteriores se preservan como nested history.
> 3. Confirma: nombre del archivo, tamaño, y un resumen de 1 línea de qué cambió desde el último backup."

***

## 📜 Historial de Versiones

| Versión | Fecha | Cambios Principales |
|:---|:---|:---|
| `brain-v1_Feb21.zip` | 21 Feb 2026 | Versión inicial del framework |
| `brain-v2_Feb21.zip` | 21 Feb 2026 | Actualizaciones del mismo día |
| `brain-v3_Mar19.zip` | — *Pendiente* — | Correcciones framework: layer system, section context, Debug Panel v2, Skills normalization |

> **Cuándo hacer backup:** Después de sesiones donde se modifiquen skills, Design System, o la estructura del framework. NO es necesario después de cada sesión de código — solo cuando cambia el "cerebro" del agente.
