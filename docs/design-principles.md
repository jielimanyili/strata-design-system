# Design Principles & Evaluation Criteria

> How Strata should *look, feel, and behave* — and how to verify it. Each principle is paired with **checkable criteria** so a human reviewer or an agent can evaluate work against the same bar. This is the judgment part of the system, made reproducible.

## Principles → criteria

### 1. Clarity over completeness
A dense screen must stay scannable. Prioritize the decision the user is making; hide or defer the rest.

- [ ] A first-time viewer can name the primary action within 5 seconds.
- [ ] Exactly one primary action per region; secondary actions are visually quieter.

### 2. Hierarchy is typographic, not loud
Establish order with size, weight, color, and spacing — not more boxes or louder colors. One "loudest" element per screen.

- [ ] Reading only type styles (ignoring content) reconstructs the page structure.
- [ ] Exactly one dominant element; no competing emphasis.

### 3. Numbers align and are tabular
Currency, quantities, and identifiers are right-aligned, use tabular numerals, and keep a consistent unit/format.

- [ ] All numeric columns right-align; labels left-align.
- [ ] Amounts use `font-variant-numeric: tabular-nums` (or the `--strata-font-numeric` token).
- [ ] Deltas use semantic color (not only +/- text); color is never the *only* signal.

### 4. Every state is designed
Empty, loading, error, disabled, and hover/focus are first-class — not afterthoughts.

- [ ] Every data region (table, list, feed) has an empty and a loading state.
- [ ] Errors explain what happened + what to do next; no raw stack traces in the UI.

### 5. Motion is meaningful
Motion communicates continuity or gives feedback; it is short and respects reduced motion.

- [ ] Every animation has a stated reason (spatial continuity, state change, feedback).
- [ ] Durations ≤ ~200ms; `prefers-reduced-motion` is honored.

### 6. Accessible by default
Keyboard, focus, ARIA, and contrast are built in, not retrofitted.

- [ ] Full keyboard path through every component (Base UI primitives).
- [ ] Visible focus ring; contrast meets AA; Storybook a11y + jest-axe pass.

### 7. Tokens are the only source of truth
No visual value is hardcoded in a component; everything derives from `--strata-*`.

- [ ] No literal px/color/shadow in component CSS.
- [ ] New values are added to `tokens/*.json`, not inline.

## Using this in reviews (people)

Run the checklist top-to-bottom on any new surface. A "no" is a blocker, not a nit — either fix it, or write a one-line rationale that updates this doc.

## Using this with agents

Ship this file (plus `strata.css`, component docs, and `docs/ARCHITECTURE.md`) as context to an agent so it can check its own output against the criteria before a human looks at it. The checklist lines are written to be machine-evaluable (each is a yes/no observation).
