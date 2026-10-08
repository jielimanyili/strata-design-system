# ADR-003: Component API (CVA variants) and styling (plain CSS)

**Date:** 2026-10-07
**Status:** Accepted

## Context

Components need a consistent variant API (e.g. `Button` with `variant`/`size`) and a styling approach that stays token-driven and dependency-light.

## Decision: React + TypeScript + `forwardRef`, CVA variants, plain CSS

### Chosen
- Components are React + TypeScript with `forwardRef` (so refs, forms, and a11y props work).
- Variants use `class-variance-authority` (CVA) → stable class names (`strata-button--primary`) with typed `VariantProps`.
- Styling is **plain CSS in `strata.css`** referencing `var(--strata-*)`.

**Rationale:**
- CVA gives typed, composable variants without a styling runtime.
- Plain CSS keeps the token relationship visible and avoids framework lock-in; class names are stable and human-readable (good for documentation and testing).
- `forwardRef` preserves standard React semantics (focus management, form controls, future Radix/Base UI composition).

### Alternative Considered: Tailwind utilities for component styling
- **Why not:** Would entangle the token story with a utility layer and pull in a content-scanning/build dependency across packages.

### Alternative Considered: styled-components / Emotion
- **Why not:** Runtime CSS-in-JS cost + an extra dependency for no benefit at this scope.

## Consequences

### Positive
- Minimal deps (React + CVA only); predictable class names; easy to test and document.

### Negative / Trade-offs
- Manual CSS per component (no utility shorthand).

### Mitigations
- Components are intentionally few and token-driven; CSS is colocated in `strata.css` with clear section headers.
