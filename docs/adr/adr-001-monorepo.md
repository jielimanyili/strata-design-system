# ADR-001: pnpm workspace monorepo (design system + demo app)

**Date:** 2026-10-07
**Status:** Accepted

## Context

Strata's purpose is to demonstrate end-to-end design-system engineering: **build a component library and prove it is adoptable by a real consumer**. That requires two artifacts — the library (`@jieli/strata-ui`) and a demo app that imports it — which must version and iterate together.

## Decision: Two projects in one pnpm workspace

### Chosen
`packages/strata-ui` (the DS) + `apps/demo` (the consumer), managed by a single `pnpm-workspace.yaml`; the demo depends on the library via `workspace:*`.

**Rationale:**
- The demo consuming the library through a real workspace link proves "distribution and adoption" — the exact concern a design-system team owns.
- One repo keeps token changes and consumer updates in lockstep (no cross-repo version skew during development).
- `workspace:*` gives instant local linkage with zero publish step during iteration.

### Alternative Considered: separate repos (library + app)
- **Why not:** Requires publishing/versioning the library just to iterate on the demo, adding friction and hiding the adoption story.

### Alternative Considered: single package with a `/demo` route
- **Why not:** Blurs the boundary between "the system" and "a consumer" — the demonstration value is the seam.

## Consequences

### Positive
- Adoption is demonstrable, not asserted.
- Fast iteration; token/component changes propagate immediately.

### Negative / Trade-offs
- Slight monorepo tooling overhead (workspace config, build ordering).

### Mitigations
- Root scripts (`build`, `dev`, `typecheck`) orchestrate the two projects; `pnpm --filter` targets individual packages.
