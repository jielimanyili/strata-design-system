# ADR-010: Generate the component contract (catalogs.json) from the component sources

**Date:** 2026-11-16
**Status:** Accepted

## Context

Strata had a token source of truth (`tokens/*.json` → Style Dictionary → CSS + TS, ADR-006), but no
machine-readable *component* contract. The A2UI renderer demo hand-authored a `catalog-schema.ts`
that could drift from the actual components. We needed the component API (names + variant enums) as
a versioned artifact derived from the code.

## Decision

Add `scripts/build-catalogs.mjs`, which reads `src/components/*.tsx` and emits
`dist-catalogs/catalogs.json`. The contract has **two halves**:

1. **API half (derived)** — component name + variant enums + defaults, parsed from the component
   `Props` + `cva` definitions. Regenerated on every build → cannot drift from the code.
2. **Design-intent half (authored)** — `tokenBindings` + `layout` per component, empty by default.
   Captured from Figma via Loop 1 (or authored by hand), review-gated, merged in later.

The source of truth is therefore the component *source* for the API, and the *designer* for the
design intent — not a hand-maintained schema file.

## Rationale

- The API half can't drift because it's *generated from the code* that defines it.
- Keeps the deployed contract (`catalogs.json`) machine-consumable for Figma write-to-canvas and docs.
- Mirrors the tokens pipeline (ADR-006): source files in Git, generated artifacts in `dist-*/`.

## Alternatives considered

- **Hand-maintained `catalogs.json`** — rejected: drifts from the code (the exact bug this fixes).
- **react-docgen-typescript** — full type extraction, but a new dependency and no clean way to
  surface `cva` variant enums; rejected in favor of a small source parser.

## Consequences

**Positive**
- A versioned, deployed component contract, derived from code.
- The design-intent half gives designers an explicit, review-gated place to capture intent.

**Negative / trade-offs**
- The parser is pattern-based (reads `cva` + `export const/function` conventions); a component that
  breaks the convention silently loses its variant metadata. Mitigation: keep the convention and
  add a CI check later.