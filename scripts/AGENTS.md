# scripts/ — validation and one-off tools

- `validate-schema.js` runs during `npm run build` and validates every `renderer/locales/*.json` against a schema
  generated from `en.json`:
  - every key in `en.json` is required in every other locale file; extra keys are allowed;
  - failures are only printed — the script never sets a non-zero exit code, so the build continues;
  - array item shapes are inferred from the first element.
- `generate-schema.js` is the recursive schema builder used by the validator.
- `test.py` is not a test and not part of any suite (there is none). It is a stale PyTorch/OpenCV script with a
  hardcoded Windows model path.
- `../update_upscayl_ncnn_binaries.sh` downloads the latest `upscayl-ncnn` release with `curl`/`jq`/`unzip` and
  copies binaries into `resources/{linux,mac,win}/bin`.
