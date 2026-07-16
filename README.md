# Brand Registry

A public **brand-guidelines registry** that does two things from one Next.js app:

1. **MCP server** — an endpoint LLM clients (Claude, Cursor, …) connect to that
   returns each brand's **look** (visual identity) and **voice** (tone & writing)
   as markdown, so a model can produce on-brand output.
2. **Showcase pages** — public web pages that render each brand's identity
   visually (palette, type scale, sample UI) as a live example.

It's built to hold **many brands**: each brand is a folder of prose markdown, and
new brands are added by dropping in files (plus a small visual theme entry).

## How it works

- **Content** lives in [`brands-content/`](./brands-content). Each subdirectory is
  one brand (the folder name is its `slug`) and contains prose markdown:
  - `overview.md` — positioning, personality, tagline (first `#` heading = display name)
  - `look.md` — color, type, logo, layout, imagery
  - `voice.md` — principles, tone, vocabulary, examples
- **Visual themes** live in [`src/lib/themes.ts`](./src/lib/themes.ts) — the
  colors, fonts, and radius used to *render* each brand's showcase. Content stays
  prose-only, so keep the theme values consistent with `look.md` by hand.
- The MCP endpoint and the showcase pages both read the same content via
  [`src/lib/brands.ts`](./src/lib/brands.ts).

## MCP surface

The endpoint is served at **`/mcp`** (stateless, read-only).

**Tools**
- `list_brands` — every brand's slug, name, and available aspects. Call first.
- `get_brand({ brand, aspect? })` — a brand's markdown. `aspect` is
  `overview` | `look` | `voice` | `all` (default `all`).

**Resources**
- `brand://{slug}/{aspect}` — one markdown document per brand/aspect, enumerable
  via `resources/list`.

### Connect a client

```json
{
  "mcpServers": {
    "brand-registry": {
      "url": "https://<your-deployment>/mcp"
    }
  }
}
```

Locally the URL is `http://localhost:3000/mcp`.

## Add a brand

1. Create `brands-content/<slug>/` with `overview.md`, `look.md`, `voice.md`.
   (Any subset works; present files become the brand's aspects.)
2. Add a matching entry to `themes` in `src/lib/themes.ts` so the showcase renders
   its real look. A brand with no theme entry falls back to a neutral default.

That's it — the home gallery, the `/brands/<slug>` page, and the MCP tools/resources
all pick it up automatically.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

- `/` — gallery of all brands + MCP connection info
- `/brands/<slug>` — a brand's full showcase
- `/mcp` — the MCP endpoint

Inspect the MCP endpoint interactively:

```bash
npx @modelcontextprotocol/inspector
# then connect to http://localhost:3000/mcp (Streamable HTTP)
```

## Deploy (Vercel)

This is a standard Next.js App Router app, so Vercel needs no special config.

1. Push this repo and import it in the Vercel dashboard (or run `vercel`).
2. Deploy — `vercel --prod` (or connect the repo for automatic deploys).
3. Your MCP endpoint is `https://<project>.vercel.app/mcp`; the showcase is at the
   root.

`next.config.ts` bundles `brands-content/` into the MCP function via
`outputFileTracingIncludes` so the markdown is readable at request time.

## Tech

Next.js (App Router) · `mcp-handler` + `@modelcontextprotocol/sdk` · `react-markdown`.

> The seed brands **Nimbus** and **Verdant** are fictional examples included to
> demonstrate the format.
