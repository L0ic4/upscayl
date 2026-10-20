# resources/ — shipped binaries, models, icons

- `linux/bin`, `mac/bin`, `win/bin` contain the committed `upscayl-bin` executable(s). Dev runs
  `resources/<platform>/bin/upscayl-bin`; electron-builder copies `resources/${os}/bin` to `resources/bin` in the
  package (`extraFiles`).
- `models/` holds the 7 built-in `.param` + `.bin` pairs. Every ID in `common/models-list.ts` needs a pair here;
  names containing `x2`/`x3` change scale inference (otherwise 4x).
- `icons/` and `entitlements*.plist` are consumed by electron-builder; do not rename or remove them.
- The root-level `models/` directory is not wired into the app or the build; built-ins come only from
  `resources/models`.
- These are platform build artifacts with execute permissions. Do not replace or regenerate binaries unless the
  task is about the upscaler backend.
