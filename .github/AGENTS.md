# .github/ — CI and release workflows

- `workflows/main.yml` publishes release builds on `v*` tags (and manual dispatch) for Linux, macOS, and Windows.
  It needs `GH_TOKEN`, signing secrets, and the macOS provisioning profile. There is no test job — CI only builds
  and publishes.
- `workflows/ci.yml` runs on pull requests and pushes to `main`: `npm ci`, `npm test`, then `npm run build` on the
  Node version in `.nvmrc`. It does not package or publish.
- `workflows/build-windows.yml` is manual-only and uploads the Windows build to the latest release.
- Linux/macOS jobs delete `node_modules/sharp` and reinstall it per platform before packaging. Keep that sequence
  if you touch those jobs; `package.json` unpacks `sharp` from asar.
- Release artifacts land in `dist/`: `main.yml` publishes through electron-builder, `build-windows.yml` uploads
  through an action. Tags and publishing are maintainer actions.
