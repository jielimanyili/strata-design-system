# ADR-007: Reference experience — data-dense spend overview

**Date:** 2026-10-24
**Status:** Accepted

**Related:** ADR-003 (component API & styling), ADR-004 (theming), `design-principles.md`

## Context

Tokens + components prove the system's *engineering*; they don't yet show whether Strata can *compose* into a real, data-dense product experience. To demonstrate design judgment (not just coverage), the system needs a **reference experience** — a worked example that exercises hierarchy, density, tabular numbers, motion, and the states beyond the happy path.

## Decision: a fintech "spend overview" as the canonical reference

### Chosen
- Build a **spend overview** screen in `apps/demo` — KPI `Metric` cards + a dense transactions `Table` + a `SegmentedControl` period switcher + `Skeleton`/`EmptyState` states.
- New primitives: `Table` (+ subcomponents), `Metric`, `Skeleton`, `EmptyState`, `SegmentedControl`; `Badge` gains `success`/`warning` variants.
- New tokens: a full type scale (+ `tabular-nums`), `motion` (duration/easing), and semantic `success`/`warning` (+ soft) colors.

**Rationale:**
- A data-dense fintech surface is the hardest, most representative case for hierarchy/density — it exercises the principles in `design-principles.md` (typographic hierarchy, tabular numbers, states, meaningful motion).
- Composition is the layer a design-system *lead* cares about ("beyond components and tokens").

### Alternative: more primitives, no reference
- **Why not:** proves breadth, not judgment.

## Consequences

### Positive
- The demo now demonstrates *taste* (hierarchy, density, tabular numbers, states, motion) — not just coverage.

### Negative / Trade-offs
- Reference experiences can drift from the library.

### Mitigations
- The reference composes only from tokens + components (`@jieli/strata-ui` as a real dependency) — no fork.
