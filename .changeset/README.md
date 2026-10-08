# Changesets

This folder holds **changesets** — small markdown files describing a change to be released. They drive versioning and changelogs via [Changesets](https://github.com/changesets/changesets).

## Commands

- `pnpm changeset` — describe a change (creates a `.changeset/*.md` file).
- `pnpm version` — consume the changesets: bump versions + write `CHANGELOG.md`.
- `pnpm release` — publish the versioned package(s) to npm.

Only `@jieli/strata-ui` is published (`strata-demo` is private and ignored).
