# ADR-005: Storybook as the documentation layer

**Date:** 2026-10-07
**Status:** Accepted

**Related:** [ADR-003](adr-003-component-api-and-styling.md)

## Context

Components need living documentation — a place to document variants, sizes, and states, and to verify accessibility — without maintaining a parallel docs site.

## Decision: Storybook 10 (React + Vite), zero-config essentials + a11y addon

### Chosen
- **Storybook 10** (`@storybook/react-vite`) colocated in `packages/strata-ui`.
- Essentials (controls, actions, viewport, backgrounds) are **built-in / zero-config** in v10. Docs/autodocs requires **`@storybook/addon-docs`**, and accessibility requires **`@storybook/addon-a11y`**.
- A global **theme toolbar** (light/dark) demonstrates token-driven theming per story.

**Rationale:**
- Storybook is the industry-standard way design-system teams document and govern components.
- Colocating stories with components keeps docs adjacent to the implementation (single source of truth).
- The a11y addon turns the accessibility claim into a verifiable, per-component check — backing the WCAG story.

### Alternative Considered: a separate docs site (Docusaurus/VitePress)
- **Why not:** Duplicates content; stories already encode variants/states, so docs should derive from them (autodocs), not be hand-written in parallel.

### Alternative Considered: no documentation
- **Why not:** Components without stories are hard to review, test, and govern — the opposite of a design system.

## Consequences

### Positive
- Autodocs generate API/variant docs from the component types (props → controls).
- A11y checks run automatically per story.
- Deployable to Chromatic / static hosting as a live work sample.

### Negative / Trade-offs
- Adds dev dependencies and a second build tool in the package.

### Mitigations
- Stories are not part of the published entry (`tsup` only bundles `src/index.ts`).
- `storybook-static/` is git-ignored.
- pnpm needs `shamefully-hoist=true` (`.npmrc`) so Storybook's internal imports resolve during the Vite build.
