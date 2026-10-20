# apis/ — Requestly collection

JSON collection for manually testing the hosted Upscayl Cloud API with Requestly. Not imported by the desktop app.

- Default variables (`baseUrl`, `x-api-key`) live in `apis/upscayl/Image-upscaling/vars.json`; `x-api-key` is
  marked secret and must stay a placeholder — never commit a real key.
- One request definition per file under `apis/upscayl/Image-upscaling/`; environments are in
  `apis/upscayl/environments/`.
- Setup and endpoint overview: `apis/upscayl/Readme.md`.
