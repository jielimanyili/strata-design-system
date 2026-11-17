# ADR-009: Native Figma Variables as the design authoring surface (Git remains the source of truth)

**Date:** 2026-11-09
**Status:** Proposed

**Related:** [ADR-002](adr-002-design-tokens-css-variables.md) (tokens as CSS variables), [ADR-004](adr-004-theming.md) (theming), [ADR-006](adr-006-tokens-codegen.md) (token codegen), [ADR-008](adr-008-lit-web-components.md) (Lit package), `docs/figma-integration.md`, `docs/figma-tokens-setup.md`

## Context

ADR-006 made `tokens/light.json` + `tokens/dark.json` the build input, generated into `strata.css` and `src/generated/tokens.ts` with Style Dictionary. This ADR decides **where designers author** tokens — native Figma Variables — while **Git (and the deployed versioned artifacts) stays the source of truth** (see `docs/figma-integration.md`). The current setup guide (`figma-tokens-setup.md`) documents the export flow.

Three things have changed the right choice:

1. **Native Figma Variables are now the standard.** Collections, modes, aliasing, and scoping are built into Figma. Designers apply variables directly to fills, strokes, spacing, and radius without a plugin.
2. **Theming maps directly onto modes.** Strata's dark theme (ADR-004) is a set of *semantic overrides only* (`dark.json` overrides background, foreground, muted, border, and status colors). That is exactly what a Figma collection with Light and Dark modes expresses.
3. **Agent context.** Design-system data must flow into both production code and model context (`AGENTS.md`, `guidelines.json`, the A2UI catalog). A single, structured token source with semantic names is what makes that possible.

The current repo tokens are also **flat**: semantic colors hold raw hex values (`accent` is `#2563eb`, the same value as `primary.500`, but not linked to it). The relationship between primitive and semantic tokens is implicit and can drift.

## Decision: Figma Variables are the authoring surface; Git stays the source of truth

### Chosen

**1. Two variable collections in a Strata Figma file**

| Collection | Modes | Contents | Example |
|---|---|---|---|
| **Primitives** | one (`Value`) | Raw palette and scales | `color/primary/500` = `#2563eb`, `space/4`, `radius/md` |
| **Semantic** | `Light`, `Dark` | Role-based tokens that **alias** primitives | `color/accent` → `{color/primary/500}` in Light; `color/background` → `{color/gray/900}` in Dark |

- Components and designers use **Semantic** variables only. Primitives are hidden from publishing so nobody applies a raw palette value directly.
- **Scoping:** color variables are scoped to fill/stroke/text, spacing to gap/padding, radius to corner radius, so each picker shows only valid choices.
- **Naming:** Figma slash groups mirror the repo dot-paths (`color/primary/500` ↔ `color.primary.500`), so the export maps 1:1 to `--strata-color-primary-500`.

**2. Aliasing survives into code**
- The exported JSON keeps references (`"accent": { "value": "{color.primary.500}" }`) instead of resolved hex values. Style Dictionary resolves references at build time.
- Result: changing `primary.500` once updates every semantic token that points to it, in Figma and in code.

**3. Mode → file mapping (no change to the build)**
- Primitives + Semantic/`Light` → `tokens/light.json`
- Semantic/`Dark` → `tokens/dark.json` (overrides only, same shape as today)
- `scripts/build-tokens.mjs` and every downstream output (`strata.css`, `tokens.ts`, both component packages) stay unchanged.

**4. Export path — a PR, not a side-channel**
- **Now (Phase 2, manual):** export variables to JSON with a plugin, then run a small adapter (`scripts/import-figma-tokens.mjs`) that converts the export (W3C design-tokens `$value`/`$type` format) into the repo's Style Dictionary shape. Commit the result as a **PR** — reviewed like any other change.
- **Later (Phase 3, automated):** pull variables programmatically through the Figma Variables REST API or the Figma MCP server. Same adapter, same output, still gated by a PR.

**5. Figma component library**
- Build Button, Card, and Tabs in Figma with component properties and variants that match the code API (ADR-003, ADR-008): `variant` = `primary | secondary | ghost`, `size` = `sm | md | lg`.
- Every fill, stroke, spacing, and radius in the components uses a Semantic variable. Switching a frame to the `Dark` mode must re-theme everything with no manual edits.
- Publish the file as a library; consuming files get updates through Figma's library update flow.

**Rationale:**
- Native variables are what designers already use; no plugin is needed to apply them.
- Modes model Strata's theming exactly, and aliasing makes the primitive → semantic relationship explicit.
- Keeping the repo JSON and Style Dictionary as the build input means Figma is *where designers author*, while Git remains *what's authoritative* — versioned, reviewed, and rollback-able.
- Matching names across Figma, JSON, CSS, React, and Lit means one vocabulary for designers, engineers, and agents.

### Alternative Considered: Tokens Studio token sets as the source (current setup guide)
- **Why not:** Works on any Figma plan and exports JSON well, but tokens live in a plugin's data model rather than in native variables, so designers apply them through the plugin. Tokens Studio stays useful as an **export bridge** if a native-variable export plugin is insufficient.

### Alternative Considered: Figma Variables as the *sole* source of truth (repo as a dumb transport)
- **Why not:** Loses versioned immutability (`tokens.css@v`), PR review, and rollback — the repo becomes a side effect of Figma rather than the single source. Rejected: Git stays the authority.

### Alternative Considered: keep the repo JSON as the *only* authoring surface (push tokens to Figma)
- **Why not:** Engineers get simplicity, but designers don't author in JSON — their editor is Figma. Excluding designers from proposing changes defeats the design→code handoff. Rejected.

### Alternative Considered: resolve aliases to raw values on export
- **Why not:** Simpler JSON, but it loses the primitive → semantic relationship in code and reintroduces drift.

## Consequences

### Positive
- Figma and code share one vocabulary and one set of values; dark mode is a mode switch on both sides.
- Explicit aliasing removes the silent duplication in today's flat tokens.
- The token pipeline, both component packages, and agent guidance are unaffected downstream.

### Negative / Trade-offs
- **Figma plan limits.** The number of modes per collection, team-library publishing, and the Variables REST API depend on the Figma plan. Two modes (Light/Dark) and library publishing may require a paid plan; check current limits before relying on them.
- Plugin exports vary in shape, so the adapter needs maintaining.
- Until Phase 3, sync is manual and someone must remember to export.
- Some token types (typography composites, shadows) aren't fully expressible as single Figma variables.

### Mitigations
- Keep the adapter small and covered by a test against a sample export.
- Add a CI check that `tokens/*.json` regenerates `strata.css` with no diff, so hand-edits and stale exports are caught.
- Model typography and shadows as Figma styles that reference variables, and keep them in JSON until Figma support is sufficient.
- Update `docs/figma-tokens-setup.md` to the native-variables workflow when this ADR is accepted.
