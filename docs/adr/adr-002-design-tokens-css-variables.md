# ADR-002: Design tokens as CSS variables

**Date:** 2026-10-07
**Status:** Accepted

## Context

A design system's foundation is its **tokens** — the named values (color, spacing, radius, type, elevation) behind every component. The token format determines how the system theming, distributes, and syncs with design.

## Decision: CSS custom properties as the single source of truth

### Chosen
Tokens live in `strata.css` as CSS variables (`--strata-color-*`, `--strata-space-*`, `--strata-radius-*`, `--strata-font-*`, `--strata-shadow-*`). Components consume `var(--strata-*)` exclusively — never literal values.

**Rationale:**
- CSS variables are the **universal, runtime-native** token format: they cascade, swap at runtime, and work in any consumer (React, plain HTML, SSR) with zero build step.
- Runtime theming (light/dark) falls out for free — swap variable values, not component code.
- Honest and portable: no framework-specific token syntax to explain.

### Alternative Considered: Tailwind v4 `@theme` tokens
- **Why not:** Powerful, but it mediates tokens through a utility layer and ties the story to one framework's config. For demonstrating "tokens as first-class," raw variables are clearer.

### Alternative Considered: CSS-in-JS (Panda / vanilla-extract)
- **Why not:** Type-safe tokens are attractive, but they add a build/runtime layer and learning curve for marginal benefit at this scale.

## Consequences

### Positive
- One file, one truth; theming is trivial; no runtime cost.

### Negative / Trade-offs
- Tokens are authoring-time strings (no compile-time type safety).

### Mitigations
- Roadmap: define tokens once in a typed `tokens.ts` and **generate** `strata.css`; later, a Figma → tokens pipeline feeds the same source.
