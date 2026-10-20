# electron/ — main process

Entry points: `index.ts` creates the app, registers every IPC handler, and wires auto-update; `main-window.ts` owns
the single `BrowserWindow`; `preload.ts` exposes `window.electron`; `commands/` holds one handler per feature;
`utils/` holds spawning, path resolution, CLI arguments, logging, and mutable session state.

## Adding IPC

1. Add the command string to `common/electron-commands.ts`.
2. Register it in `electron/index.ts` with `ipcMain.on` (fire-and-forget) or `ipcMain.handle` (request/response).
3. Put payload types in `common/types/types.d.ts` and call it from the renderer through `window.electron`.

Two channels bypass the constant and are registered as raw strings: `get-gpu-info` and `get-app-version` (used by
`utils/get-device-specs.ts` and the preload bridge).

## Behavior to preserve

- Dev vs packaged is decided by `electron-is-dev`: dev loads `http://localhost:8000`, packaged loads
  `renderer/out/index.html`. `utils/get-resource-paths.ts` resolves `resources/<os>/bin` in dev and the siblings of
  `app.asar` when packaged (`extraFiles` in `package.json`).
- Commands report progress, results, and errors with `mainWindow.webContents.send(ELECTRON_COMMANDS.*)`. Use
  `logit` (not `console.log`) for messages that should appear in the in-app log; `console.log` only reaches the
  terminal.
- `utils/config-variables.ts` holds process-wide mutable state. `setStopped(false)` must run before each operation;
  `childProcesses` is only appended and never cleared.
- Single-image output names are `<name>_upscayl_<scale>x_<model>.<ext>`; an existing output is reused (and reported
  as done) unless `overwrite` is set.
- Custom model folders must be literally named `models` and contain `.param`/`.bin` files
  (`commands/custom-models-select.ts`, `utils/get-models.ts`).
- `FEATURE_FLAGS.APP_STORE_BUILD` gates App Store-only behavior: security-scoped bookmarks, in-process GPU, and no
  auto-update. `enable-store`/`disable-store` rewrite `common/feature-flags.ts` with BSD `sed -i ''`, which fails on
  GNU sed/Linux.
- `main-window.ts` enables `nodeIntegration` and disables `webSecurity`. Never load remote or untrusted content in
  that window.
