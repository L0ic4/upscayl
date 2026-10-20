# renderer/ — Next.js UI

Pages Router (`pages/index.tsx` is the app; `_app.tsx`, `_error.tsx`), React 18, TypeScript 4.8, Tailwind + daisyUI
+ shadcn/ui, Jotai state. `next.config.js` uses `output: "export"`, so there is no server: no API routes, no
`getServerSideProps`, no server actions. Dev loads port 8000; the packaged app loads `renderer/out/index.html`.

## Conventions

- Talk to the main process only through `window.electron` (`send`/`invoke`/`on`) with command names from
  `@common/electron-commands`. The bridge type is declared in `renderer.d.ts`; extend it when adding preload methods.
- Settings live as Jotai `atomWithStorage` keys in `atoms/user-settings-atom.ts` (localStorage names are the
  strings passed to `atomWithStorage`). Changing a setting usually means: atom, UI, and the IPC payload.
- Translations: `useTranslation()` or `translationAtom`, keys from `locales/en.json`. Every key must exist in every
  locale file (schema check). New locales must also be imported and added to the `Locales` union in
  `atoms/translations-atom.ts`; `it.json`, `ms.json`, and `th.json` currently are not.
- Styling: Tailwind with daisyUI theme `upscayl`; shared primitives in `components/ui` (shadcn), feature UI under
  `components/sidebar` and `components/main-content`. Prettier sorts Tailwind classes.
- `renderer/tsconfig.json` is separate from the root config and sets `strict: false`. `npm run tsc` does not check
  this directory; `next build renderer` is the only typecheck.
- TypeScript is 4.8, so newer syntax (`satisfies`, const type parameters, etc.) does not compile.

## Gotchas

- Path aliases: `@/*` → `renderer/`, `@common/*` → `common/`, `@components/*`, `@lib/utils`.
- Local images are shown with `file:///` URLs built through `sanitizePath`; bundled images use the `public://`
  protocol registered in `electron/index.ts`. Don't pass raw paths to `<img src>`.
- Image optimization is off (`images.unoptimized: true`) and the app is exported statically; do not add `next/image`
  loading that assumes a server.
