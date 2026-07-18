# CLAUDE.md

Guidance for agents (and humans) working in this repo.

## What this is

A public **brand-guidelines registry**: one Next.js app that serves each brand's
identity as markdown over an **MCP endpoint** (`/mcp`) and renders live
**showcase pages**. Brand content lives in `brands-content/<slug>/` as prose
markdown (`overview.md`, `look.md`, `voice.md`) plus optional `assets/` +
`assets.json`. Per-brand visual themes live in `src/lib/themes.ts`. See
`README.md` for the full tour.

## ⚠️ Every merged PR must bump the MCP version

**Whenever you merge a PR, increment the MCP server version.** Clients cache the
server by its advertised version, so if the version doesn't change, they may not
pick up new or edited brand content. A merge without a version bump ships changes
that consumers never see.

The version lives in **two places that must stay in sync**:

1. `src/app/[transport]/route.ts` — `serverInfo.version` (this is the version
   MCP clients actually read).
2. `package.json` — `"version"`.

Convention so far is a **minor** bump per release (`0.1.0` → `0.2.0` → `0.3.0`).
Use a patch bump only for a trivial fix that changes no brand content.

Do the bump **on the PR branch before merging**, so the version change lands in
the same merge as the content it ships. Checklist for any content/behavior PR:

- [ ] Bump `serverInfo.version` in `src/app/[transport]/route.ts`
- [ ] Bump `"version"` in `package.json` to match
- [ ] `npm run build` passes
- [ ] Merge

## Adding or editing a brand

1. Edit files under `brands-content/<slug>/` (the folder name is the slug; the
   first `#` heading in `overview.md` is the display name).
2. Keep `src/lib/themes.ts` consistent with the brand's `look.md` by hand — the
   markdown is prose-only, so the render values live in code.
3. Bump the MCP version (see above).
4. `npm run build` — it should prerender each brand's `/brands/<slug>` page.
