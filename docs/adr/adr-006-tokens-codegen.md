# ADR-006: Token codegen pipeline (Style Dictionary)

**Date:** 2026-10-07
**Status:** Accepted

**Related:** [ADR-002](adr-002-design-tokens-css-variables.md)

## Context

ADR-002 chose CSS variables as the token format, but tokens were hand-authored directly in `strata.css`. That risks drift and gives no single machine-readable source. To later sync tokens from Figma (Phases 2–3 of `docs/figma-integration.md`), tokens need a source of truth that a pipeline can read and transform.

## Decision: JSON source of truth + Style Dictionary codegen

### Chosen
- Tokens live in `tokens/light.json` + `tokens/dark.json` (Style Dictionary format).
- `scripts/build-tokens.mjs` generates:
  - `strata.css` — `:root` (light) + `.strata-dark` (dark) + component styles.
  - `src/generated/tokens.ts` — typed constants (same source, second output).

**Rationale:**
- One source → multiple outputs (CSS + TS) proves the "single source of truth" principle.
- JSON is the natural exchange format for Figma (Tokens Studio / Variables API export JSON), so Phases 2–3 drop in without restructuring.
- Style Dictionary is the industry-standard token transformer.

### Alternative Considered: keep hand-writing `strata.css`
- **Why not:** No machine-readable source; can't automate Figma sync later.

### Alternative Considered: custom codegen script (no tool)
- **Why not:** Reinvents a standard tool; Style Dictionary provides transforms/formats/theming for free.

## Consequences

### Positive
- Tokens are generated, not hand-maintained; drift impossible.
- Figma-ready source format.

### Negative / Trade-offs
- Adds a build step and a dev dependency.

### Mitigations
- `build` and `typecheck` run the codegen first; generated files are also committed so a fresh clone works without building.
