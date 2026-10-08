# Figma Integration Plan

How Strata connects Figma (design) to code (tokens). Three phases, each independently valuable.

## Phase 1 — Token codegen pipeline ✅ implemented

Move tokens out of hand-written CSS into a source of truth, and generate the CSS + typed constants.

- Source of truth: `tokens/light.json` + `tokens/dark.json`
- Generated: `strata.css` + `src/generated/tokens.ts`
- Tool: **Style Dictionary** (`scripts/build-tokens.mjs`)
- No Figma account required.
- See `docs/adr/adr-006-tokens-codegen.md`.

## Phase 2 — Figma as the source of truth (in progress)

Create a Figma file with **variables** (colors, spacing, radius). Export them as JSON and feed the same pipeline — tokens now originate in design, not in the repo.

- Tools: **Tokens Studio for Figma** (free JSON export), or the **Figma Variables/REST API**.
- Output: same `tokens/*.json` shape → same generated artifacts (no code changes downstream).
- ⚠️ **Blocked on your side:** requires a Figma account + ~20 min in the Figma UI (can't be done programmatically without your personal access token). See `docs/figma-tokens-setup.md` for the exact steps and naming convention.

## Phase 3 — Automated sync (planned)

Replace the manual export with a script that pulls tokens programmatically.

- Tools: **Figma Variables API** or the official **Figma MCP server** (`figma-developer-mcp`).
- Needs: a Figma **personal access token** (kept in `.env`, git-ignored).
- Result: the design↔dev handoff, automated — reproducible in this repo.

## Why this matters

Maps to the role's core mandate: "increase efficiency of the design/engineering handoff," "AI solutions that accelerate design workflows," "distribution and adoption."
