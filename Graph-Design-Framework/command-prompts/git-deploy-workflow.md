# Git Deploy Workflow — Portfolio 2026

> **ESTADO VIGENTE (verificado 2026-10-20):**
> - **Repo único:** `Portfolio2026` (raíz del working directory), personal.
> - ⚠️ **Git bloqueado por "dubious ownership":** la carpeta `.git` pertenece a otro SID de Windows (instalación/cuenta anterior). Antes de CUALQUIER operación git se requiere la excepción (toca la config global — necesita aprobación del usuario):
>   `git config --global --add safe.directory 'D:/A01 Proyectos-Importantes/Portfolio2026'`
> - **Remote:** por confirmar una vez desbloqueado (`git remote -v`). Git user histórico: `ChrisBeep98` / `christiansandovaldesign@gmail.com`.
> - **Deploy:** GitHub Pages vía `.github/workflows/deploy.yml` — se dispara con push a `main` (+ `workflow_dispatch`). Node 20 + pnpm 12 · `pnpm install --frozen-lockfile` · `pnpm next build` (static export `output: "export"` → `./out`) · `upload-pages-artifact` + `deploy-pages`. **Sin basePath**; `images.unoptimized: true`.
> - La versión histórica (doble rol empleado/fork + Vercel + env vars dummy) era del proyecto anterior: `_archive/legacy-epicare/git-deploy-workflow-goams.md` — NO aplica a este proyecto.

## Flujo de Commit (acuerdos TASTE-LEDGER §3)

1. **Commit solo cuando el usuario lo pide** ("haz un commit"). Nunca proactivo.
2. Antes de commitear: `git status` + `git diff HEAD` + `git log -n 3` (igualar estilo de mensajes). Stagear SOLO los paths del cambio pedido — nada de `git add -A` con cambios no relacionados presentes.
3. Mensajes descriptivos por sección/cambio. Tras cada commit, confirmar con `git status`.
4. **Push solo con confirmación explícita del destino.** Push a `main` = deploy automático vía GitHub Pages — tratar como acción de producción.
5. Nunca force-push a `main`; nunca saltar verificaciones (`--no-verify`); si un commit falla, reportar sin workarounds.

## Verificación previa a deploy

- [ ] `pnpm build` verde en local (el export estático genera `./out`).
- [ ] `pnpm-lock.yaml` actualizado y commiteado (CI usa `--frozen-lockfile`; si difiere, falla).
- [ ] pnpm exclusivo (v12) — npm/yarn prohibidos; `overrides` viven en `pnpm-workspace.yaml` (pnpm v12 ignora el campo `pnpm` de package.json).
- [ ] `@types/three` alineado a 0.186.0 (devDependency + override) si se tocaron dependencias 3D — previene el TS2322 de `MeshTransmissionMaterial`.

## Entorno

- Sin variables de entorno (no hay backend).
- `next.config.mjs`: `output: "export"`, `images.unoptimized`, `allowedDevOrigins: ["192.168.18.221"]` (dev en LAN).
- Detalle de reglas git en `master-framework-command/PORTFOLIO-DESIGN-DIRECTOR.md` §7.
