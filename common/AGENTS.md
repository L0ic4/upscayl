# common/ — shared contracts

Imported by both processes: the renderer as `@common/*`, the main process by relative path. Keep changes compatible
with both.

- `electron-commands.ts` — single source of IPC command names. Start here when adding a command, then register it in
  `electron/index.ts`.
- `types/types.d.ts` — payload types for the IPC operations (`ImageUpscaylPayload`, `BatchUpscaylPayload`,
  `DoubleUpscaylPayload`). Keep them in sync with the handlers in `electron/commands/`.
- `models-list.ts` — built-in model IDs. Adding one also needs `.param`/`.bin` files in `resources/models`.
- `check-model-scale.ts` — infers a model's native scale from its filename: `x2`/`2x` → 2, `x3`/`3x` → 3, else 4.
  Custom model filenames therefore change scale behavior.
- `feature-flags.ts` — `APP_STORE_BUILD` and `SHOW_UPSCAYL_CLOUD_INFO`; rewritten by the `enable-store` /
  `disable-store` npm scripts.
- Path helpers (`decode-path`, `sanitize-path`, `get-directory-from-path`, `get-file-name`): use these instead of
  ad-hoc separator/split logic. `decode-path` imports Node `path`, so it is main-process-only.
