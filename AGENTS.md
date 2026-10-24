# AGENTS.md — Strata design system

> Guidance for AI agents (and humans) building UI with Strata. Follow the **build rules**, then **check your work** against the criteria before a human reviews it.

## What Strata is

A layered design system: **design tokens → React components → consumer apps**. Tokens are the single source of truth (`--strata-*` CSS variables); components only consume tokens.

## Build rules

1. **Compose, don't recreate.** Use `@jieli/strata-ui` components (Button, Card, Input, Table, Metric, Badge, SegmentedControl, Skeleton, EmptyState, …). Don't hand-roll a component that already exists.
2. **Tokens only.** Style with `var(--strata-*)`. Never hardcode a hex, px, radius, shadow, or font in component CSS.
3. **Import once.** Import `@jieli/strata-ui/styles.css` at the app root; theme by toggling `.strata-dark`.
4. **Numbers are tabular + right-aligned.** Amounts and quantities use `TableCell align="right"` (which applies `font-variant-numeric: var(--strata-font-numeric)`).
5. **Every state is designed.** Include empty, loading, error, disabled, and hover/focus — not just the happy path.

## Check your work (required before handoff)

Run the `docs/design-principles.md` checklist. Each criterion is a yes/no; a **"no" is a blocker**. The same criteria exist as machine-readable data in `docs/guidelines.json` (each tagged `automated`, `llm`, or `human`).

- **Hierarchy** — page structure reconstructable from type styles; exactly one dominant element.
- **Numbers** — right-aligned, tabular, semantic delta color.
- **States** — empty/loading/error for every data region.
- **Motion** — a reason + ≤ 200ms + `prefers-reduced-motion`.
- **Accessibility** — keyboard path, visible focus, AA contrast.
- **Tokens** — no literal values in component CSS.

## Key files

| File | Purpose |
|---|---|
| `docs/design-principles.md` | Principles → checkable criteria (human-readable) |
| `docs/guidelines.json` | The same criteria, machine-readable (for eval harnesses) |
| `packages/strata-ui/strata.css` | Generated tokens + component styles |
| `packages/strata-ui/src/generated/tokens.ts` | Typed token constants |
| `docs/ARCHITECTURE.md` | Layers + token flow |
| `apps/demo` | Reference experience (`Reference · Spend` view) |
