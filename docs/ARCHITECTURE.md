# Strata — Architecture

Strata is a **layered design system**: design tokens at the base, primitive components above, and a consumer app on top. The guiding principle is **"tokens are the single source of truth"** — every visual decision lives in one place (`strata.css`), and components only ever consume tokens.

## Layers

```
┌──────────────────────────────────────────────────┐
│  apps/demo — consumer (Vite + React 19)          │
│  imports @jieli/strata-ui + styles.css           │
└───────────────────────┬──────────────────────────┘
                        │ workspace:* dependency
┌───────────────────────▼──────────────────────────┐
│  packages/strata-ui — @jieli/strata-ui           │
│  ┌─────────────────────────────────────────────┐ │
│  │ components (Button, Card, Input, …)         │ │  consume tokens via CSS
│  │  • React + TypeScript + forwardRef          │ │  variables (var(--strata-*))
│  │  • CVA variants (variant, size)             │ │
│  └─────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────┐ │
│  │ strata.css — design tokens                  │ │  single source of truth
│  │  • --strata-color-* / space / radius        │ │  :root (light) + .strata-dark
│  │  • typography, elevation                    │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

## Package boundaries

| Package | Name | Responsibility |
|---|---|---|
| `packages/strata-ui` | `@jieli/strata-ui` | Tokens + components; public API via `src/index.ts`; ships `strata.css` |
| `apps/demo` | `strata-demo` | Consumes the DS to prove **adoption** — the demo is the "integration" evidence |

## Token flow

1. `tokens/*.json` is the source of truth (light + dark).
2. `scripts/build-tokens.mjs` (Style Dictionary) generates `strata.css` (`:root` + `.strata-dark`) and `src/generated/tokens.ts`.
3. Component CSS references `var(--strata-*)` — never literal values.
4. Consumers import `@jieli/strata-ui/styles.css` once at the root; flipping `.strata-dark` re-skins everything.

## Theming

- Light = `:root` defaults.
- Dark = a `.strata-dark` (or `[data-theme="dark"]`) ancestor overrides the same variables.
- Components are theme-agnostic — they don't know which theme is active.

## Build & distribution

- `tsup` compiles `src/index.ts` → ESM (`dist/index.js`) + CJS (`dist/index.cjs`) + types (`.d.ts`).
- `strata.css` ships as a standalone file (`@jieli/strata-ui/styles.css`) — no runtime CSS-in-JS.
- `react`/`react-dom` are peer dependencies (externalized in the build).

## Roadmap

- [ ] Storybook (component docs + a11y + interactions)
- [x] `tokens.json` → CSS/TS codegen via Style Dictionary (see ADR-006)
- [ ] Figma → tokens pipeline (design↔dev handoff automation)
- [ ] Base UI primitives for Dialog/Tabs/Tooltip (accessibility)
- [ ] Vitest + Testing Library + jest-axe
