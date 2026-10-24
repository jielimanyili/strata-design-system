# Strata

A layered design system, built to demonstrate end-to-end design-system engineering: **design tokens → React components → a consumer app**.

## Structure

- `packages/strata-ui` — `@jieli/strata-ui`, the design system (design tokens as CSS variables + React components).
- `apps/demo` — a Vite + React app that consumes `@jieli/strata`.
- `AGENTS.md` — guidance for AI agents (build rules + check-your-work).
- `docs/design-principles.md` + `docs/guidelines.json` — evaluation criteria (human + machine-readable).

## Commands

```bash
pnpm install     # install everything
pnpm build       # build the library, then the demo app
pnpm dev         # run the demo app (build the library first)
pnpm typecheck   # typecheck all packages

# Storybook (component docs + a11y)
pnpm --filter @jieli/strata-ui storybook        # run the docs UI (dev)
pnpm --filter @jieli/strata-ui build-storybook  # build static docs
```

## Design tokens

Tokens live in `packages/strata-ui/tokens/*.json` (light + dark) and are compiled to CSS variables (`--strata-*`) via Style Dictionary (`scripts/build-tokens.mjs`). Components consume tokens — never hard-coded values.

## Shareable links

| What | URL |
|---|---|
| Repo (public) | https://github.com/jielimanyili/strata-design-system |

### Live demo (Vercel)

`vercel.json` is already configured (builds the lib, then the demo, serves `apps/demo/dist`).

```bash
pnpm install
npx vercel            # preview deploy
npx vercel --prod     # production URL
```

> In Vercel → Settings → General, set **Node.js version = 22** (the CI pins Node 22).

### Storybook (Chromatic)

```bash
pnpm --filter @jieli/strata-ui chromatic
```

> Needs `CHROMATIC_PROJECT_TOKEN` (see `.env.example`). Publishes hosted component docs with visual regression + a11y.

## Publishing (npm)

The package is publish-ready but intentionally **not** published to public npm yet. Validate it without publishing:

```bash
cd packages/strata-ui && npm publish --dry-run   # or: npm pack
```

Release flow (Changesets), for when you want to ship to npm:

```bash
pnpm changeset   # describe a change → creates .changeset/*.md
pnpm version     # bump versions + write CHANGELOG.md
pnpm release     # publish to npm (needs NPM_TOKEN)
```
