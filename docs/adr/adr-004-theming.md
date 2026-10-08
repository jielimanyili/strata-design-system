# ADR-004: Theming via token override (light/dark)

**Date:** 2026-10-07
**Status:** Accepted

## Context

The system must support light and dark themes without forking component code, and without a runtime theme provider.

## Decision: Ancestor-scoped token override (`.strata-dark` / `[data-theme="dark"]`)

### Chosen
- Light values live in `:root`.
- Dark values override the same variables under `.strata-dark` or `[data-theme="dark"]`.
- Any ancestor can carry the theme class; components stay theme-agnostic.

**Rationale:**
- Leverages CSS variable cascading — no JS theme provider, no context, no re-render.
- Works in any consumer (React, static HTML, SSR) and composes with `prefers-color-scheme` later.
- The demo proves it: a single toggle flips the class and the whole UI re-skins.

### Alternative Considered: React Context theme provider + JS token objects
- **Why not:** Couples theming to React and adds runtime; unnecessary when CSS variables already cascade.

### Alternative Considered: `prefers-color-scheme` media query
- **Why not:** Good for *detecting* preference, but doesn't give users an explicit toggle; keep as an additive enhancement.

## Consequences

### Positive
- Theme switching is a pure CSS cascade; zero component changes for new themes.

### Negative / Trade-offs
- Tokens must be defined for every theme (no automatic dark derivation).

### Mitigations
- Semantic tokens (background/foreground/border/accent) keep the override surface small — only the semantic layer changes between themes, not the raw palette.
