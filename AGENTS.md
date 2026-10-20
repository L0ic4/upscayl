# AGENTS.md

Upscayl: Electron desktop app (main process) + Next.js renderer, built with TypeScript. AI upscaling is delegated to
the external `upscayl-bin` binary (Real-ESRGAN/Vulkan), not to JavaScript. The main process compiles with plain
`tsc`; the renderer is a static Next export.

Per-area instructions sit next to the code they describe. OpenCode loads them when that area is read:
`electron/AGENTS.md`, `renderer/AGENTS.md`, `common/AGENTS.md`, `scripts/AGENTS.md`, `resources/AGENTS.md`,
`models/AGENTS.md`, `docs/AGENTS.md`, `apis/AGENTS.md`, `flatpak/AGENTS.md`, `.github/AGENTS.md`.

## Commands

- `npm install`, then `npm run start` — runs `tsc`, starts the Next dev server on port **8000**, and launches
  Electron. The port is hardcoded in `electron/main-window.ts`; Next's default 3000 does not apply.
- `npm run build` — full verification: `tsc` → `npm run validate-schema` → `next build renderer`.
- `npm run tsc` — typechecks `electron/` and `common/` only. Root `tsconfig.json` excludes `renderer/`.
- `npx prettier --write <path>` — only style tooling (`prettier-plugin-tailwindcss`). No ESLint config, lint script,
  or test suite exists.
- Packaging: `npm run pack-app` (unpacked) or `npm run dist:<target>`. Artifacts go to `dist/`; compiled JS goes to
  `export/` (gitignored), which `package.json` `main` points at.
- Use Node 18 (CI uses 18; `volta` pin is 18.20.5). The host default may be much newer.

## Verification limits

- No tests. `scripts/test.py` is a stale one-off PyTorch script, not a test.
- Upscaling needs a Vulkan GPU and a committed `resources/<platform>/bin/upscayl-bin`. In a headless/CPU-only
  environment verify compile and build only; do not claim upscaling works without running it.
- `npm run validate-schema` logs locale errors but never exits non-zero, so `npm run build` can pass with broken
  locale files. Read its output rather than trusting the exit code.

## Cross-cutting rules

- IPC command names are defined once in `common/electron-commands.ts` and used by both processes.
- Check both consumers before changing `common/`: the renderer imports it as `@common/*`, the main process by
  relative path. Some helpers (`decode-path`) use Node `path` and only work in the main process.
- Build output is generated: never edit `export/`, `renderer/out/`, `renderer/.next/`, or `dist/`.
- Release publishing is tag-driven (`v*`). Do not bump versions, create tags, push, or publish unless asked.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
