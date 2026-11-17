# Figma ↔ Code Integration

How Strata connects Figma (design) to code. The model is **Contract-First**: Git (the deployed,
versioned artifacts) is the source of truth; Figma is a *capture* surface (designers propose) and a
*projection* (the canvas mirrors the contract). Full architecture: `references/design-code-workflow.md`.

## The model (one line)

> Git is the factory; the deployed versioned artifacts (`tokens.css@v`, `catalogs.json@v`) are the
> truth; Figma is where designers *propose* changes and where the contract is *projected* back.

## Tokens — Git is the source of truth (implemented)

`tokens/light.json` + `tokens/dark.json` (Git) → Style Dictionary (`scripts/build-tokens.mjs`) →
`strata.css` + `src/generated/tokens.ts`.

- ✅ Phase 1 — codegen pipeline. See `adr-006-tokens-codegen.md`.
- **Figma variables are a mirror, not the source**: tokens flow Git → Figma variables (Tokens
  Studio "sync to variables", or Figma MCP write-to-canvas), never the other way as the authority.
- A designer *proposing* a token change goes through the PR loop (Loop 1), not by editing Figma
  variables directly.

## Components — the contract has two halves (implemented)

`scripts/build-catalogs.mjs` generates `dist-catalogs/catalogs.json` from the component sources:

| Half | Contents | Authority |
|---|---|---|
| **API** (name, variant enums, defaults) | *derived* from the component `Props` + `cva` definitions | the code — can't drift |
| **Design intent** (`tokenBindings`, `layout`) | *authored* — captured from Figma (Loop 1) or hand-authored | designer — review-gated |

The API half regenerates on every build; the design-intent half is merged in from Figma extractions.

## Two loops (changes always pass through a PR)

### Loop 1 — Designer proposes (Figma → contract)
Designer edits in Figma → Figma MCP extracts context → agent proposes a **contract diff** →
validation gate + design review → merge → artifacts re-deployed.

### Loop 2 — Contract deploys (contract → Figma)
Merge to stable = release → deployed artifacts (`tokens.css@v`, `catalogs.json@v`) → Figma MCP
**write-to-canvas** regenerates the Figma library (variables + components) = deploy.

## Setup (what you need)

- Figma account + **Tokens Studio for Figma** — token sync (see `docs/figma-tokens-setup.md`).
- **Code Connect** metadata (`.figma/`) — links each Figma component to its code component.
- Figma **personal access token** (`.env`, git-ignored) — for the Variables API / MCP automation.

## Phases

1. ✅ **Token codegen** — Git tokens → Style Dictionary → CSS + TS.
2. ✅ **Component contract** — `build-catalogs.mjs` → `dist-catalogs/catalogs.json`.
3. ⏳ **Figma mirror** — tokens flow Git → Figma variables.
4. ⏳ **Figma capture** — Figma MCP extract → contract diff → PR (Loop 1 automation).
5. ⏳ **Automated sync** — Figma Variables API / MCP for deploy (project) + capture (propose),
   both gated by the PR.

## Why this matters

Maps to the role's mandate: "increase efficiency of the design/engineering handoff," "AI solutions
that accelerate design workflows," "distribution and adoption." Contract-First is the mechanism:
one source of truth, two mirrors, no drift.
