# Figma Token Setup (Phase 2)

How to make Figma the source of truth for Strata tokens.

## What you need

- A **Figma account** (free tier is fine).
- The **Tokens Studio for Figma** plugin (free).

## Steps

### 1. Create a Figma file
Create a new Figma file, e.g. "Strata — Tokens".

### 2. Install Tokens Studio
Figma menu → **Plugins** → search "Tokens Studio for Figma" → install/run.

### 3. Create token sets
In Tokens Studio, create two token sets that mirror the repo:

- `strata-light` — all light tokens
- `strata-dark` — dark semantic overrides only (background, foreground, muted, mutedForeground, border)

### 4. Name tokens with the same dot-paths as the repo
Use the exact paths from `packages/strata-ui/tokens/light.json`:

- `color.primary.50 / 100 / 500 / 600 / 700`
- `color.background`, `color.foreground`, `color.muted`, `color.mutedForeground`, `color.border`, `color.accent`, `color.accentForeground`, `color.destructive`
- `space.1` … `space.8`
- `radius.sm`, `radius.md`, `radius.lg`, `radius.full`
- `font.sans`, `font.size.sm / base / lg / xl`, `font.weight.medium`, `font.weight.semibold`
- `shadow.sm`, `shadow.md`

Same paths → the codegen maps them 1:1 to `--strata-*`. Keep this convention and the mapping is trivial.

### 5. (Optional) Sync to Figma variables
Tokens Studio → **Sync to variables** so the tokens are also native Figma variables — this is what enables the Variables API in Phase 3.

### 6. Export JSON
Tokens Studio → **Export** → JSON for each set → save as `strata-light.json` and `strata-dark.json`.

### 7. Drop the exports into the repo
- `packages/strata-ui/tokens/light.json` ← from `strata-light`
- `packages/strata-ui/tokens/dark.json` ← from `strata-dark`

## Format bridge

Tokens Studio exports a slightly different JSON shape (W3C `$type`-style) than the repo's current Style Dictionary format. When your exports land, I'll wire the bridge (via `@tokens-studio/sd-transforms` or a small adapter in `scripts/build-tokens.mjs`) — no downstream component changes.

## Then

```bash
cd packages/strata-ui && pnpm build   # regenerate strata.css + tokens.ts
```
