# flatpak/ — Flathub manifest

`org.upscayl.Upscayl.json` pins a released Linux ZIP by URL and sha256 (currently v2.9.1), so it does not follow the
version in `package.json`. Updating it needs a new release URL, a new sha256, and a new hash for the metainfo file
fetched from `main`. The repo also has an electron-builder `dist:flatpak` script, which is separate from this
manifest.

`org.upscayl.Upscayl.metainfo.xml` is the AppStream metadata used by the Flathub listing.
