# ADR-008: Lit Web Components package (`@jieli/strata-lit`)

**Date:** 2026-11-09
**Status:** Proposed

**Related:** [ADR-002](adr-002-design-tokens-css-variables.md) (tokens as CSS variables), [ADR-003](adr-003-component-api-and-styling.md) (component API & styling), [ADR-004](adr-004-theming.md) (theming), [ADR-005](adr-005-storybook.md) (Storybook), [ADR-006](adr-006-tokens-codegen.md) (token codegen)

## Context

Strata's components are React-only (ADR-003). That limits the design system in three ways:

1. **Consumers.** Enterprise design systems serve many stacks — React, Angular, server-rendered pages, and CMS-authored content. A React-only catalog can't be dropped into an Angular app or a CMS template without a React runtime.
2. **Agent-composed UI.** The A2UI renderer (`a2ui-strata-renderer`) maps an agent's declarative payload onto the Strata catalog. The catalog is only as portable as its components; a framework-agnostic catalog lets the same payload render in any host.
3. **Standards.** Web Components (Custom Elements + Shadow DOM) are the browser-native component model. Many enterprise design systems ship them, commonly authored with **Lit**.

The token layer is already framework-agnostic: tokens are CSS custom properties (ADR-002) generated from JSON (ADR-006). CSS custom properties inherit through shadow roots, so a Web Components package can reuse the tokens unchanged. Only the component layer needs a second implementation.

## Decision: add `packages/strata-lit` — Lit 3 + TypeScript + SCSS, consuming the existing tokens

### Chosen
- **New package** `packages/strata-lit` → `@jieli/strata-lit`, alongside `@jieli/strata-ui`. The React package is unchanged.
- **Lit 3 + TypeScript** (decorators: `@customElement`, `@property` for public API, `@state` for internal state).
- **Tokens are shared, not copied.** Components read `var(--strata-*)` from `@jieli/strata-ui/styles.css`, loaded once at the document level. Theming (`.strata-dark`, ADR-004) works unchanged because custom properties cross the shadow boundary.
- **Component styles in SCSS**, one file per component, compiled by Vite and adopted as the component's `static styles` (`import styles from './button.scss?inline'` → `unsafeCSS(styles)`). SCSS is only for authoring convenience (nesting, partials); every value is still a token.
- **API parity with React.** Same component names, attribute names, and variant values (e.g. `<strata-button variant="primary" size="sm">` ↔ `<Button variant="primary" size="sm">`). The A2UI catalog then maps one component name to either implementation.
- **Naming:** tag prefix `strata-` (`strata-button`, `strata-card`, `strata-tabs`).
- **Events:** `CustomEvent`s named `strata-*` with `bubbles: true, composed: true`, so they cross shadow roots and reach framework listeners.
- **Extension points:** named `<slot>`s for content and `::part()` for limited, documented styling hooks. No other styling access into the shadow root.
- **Accessibility inside Shadow DOM:**
  - Render native elements inside the shadow root (`<button>`, not `<div role="button">`).
  - `delegatesFocus: true` where the host should forward focus to an inner control.
  - Keep ARIA ID references (`aria-controls`, `aria-labelledby`) inside the same shadow root, because ID references don't cross shadow boundaries. For Tabs, the tab list and panels live in one component's shadow root.
  - Form controls (Input, Select) will use form-associated custom elements (`ElementInternals`) when added.
- **Documentation:** a Storybook for the package with `@storybook/web-components-vite` and the a11y addon, mirroring ADR-005.
- **Initial scope:** `strata-button`, `strata-card`, `strata-tabs` — covering reactive properties and events, slots and parts, and keyboard/ARIA behavior respectively. More components follow only when a consumer needs them.
- **Versioning:** an independent package in the Changesets release flow.

**Rationale:**
- Lit is a thin layer over the platform: reactive properties and efficient templates (only the dynamic parts of `html` templates update), with a small runtime and no virtual DOM.
- Reusing the token layer proves the layered architecture: a second component implementation needs zero token changes.
- API parity keeps documentation, design specs, and the agent catalog shared across both packages.

### Alternative Considered: wrap the React components as custom elements (e.g. `@r2wc/react-to-web-component`)
- **Why not:** Every consumer pays for the React runtime, and Shadow DOM styling and events become a leaky adapter around React's model. It hides the framework instead of removing the dependency.

### Alternative Considered: Stencil
- **Why not:** A capable compiler that can also output framework wrappers, but a heavier toolchain and its own component model. Lit is closer to the platform and more common in enterprise design systems.

### Alternative Considered: plain Custom Elements (no library)
- **Why not:** Fully standard, but reactive updates, attribute–property reflection, and templating have to be hand-written in every component — the boilerplate Lit exists to remove.

### Alternative Considered: replace the React package with Lit, and give React consumers `@lit/react` wrappers
- **Why not now:** A single implementation is the long-term ideal, but it's a breaking change for every React consumer and a large migration. Running both packages first lets the Lit components prove parity (a11y, theming, docs) before any consolidation is considered. Revisit once the Lit package covers the full catalog.

## Consequences

### Positive
- Strata components work in any framework or plain HTML; the catalog becomes framework-agnostic for agent-composed UI.
- The token architecture is validated by a second consumer with no token changes.
- Accessibility patterns for Shadow DOM are documented and tested in one place.

### Negative / Trade-offs
- **Two implementations of each component** to keep in sync (API, behavior, a11y).
- Shadow DOM limits global styling and some ARIA relationships across component boundaries.
- Server-side rendering of Web Components needs Declarative Shadow DOM (`@lit-labs/ssr`) — out of scope for now.
- Another build path (Vite + Sass) and a second Storybook.

### Mitigations
- Keep the initial scope to three components; add more only on demand.
- Shared Storybook stories and a parity checklist per component (same props, variants, states, keyboard behavior).
- Shared a11y criteria from `docs/guidelines.json` apply to both implementations.
- Revisit the "replace React with Lit + wrappers" alternative once parity is proven.
