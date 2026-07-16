import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  ASPECTS,
  getAspect,
  getBrand,
  listAssets,
  listBrands,
  type Aspect,
} from "./brands";

/**
 * Registers the brand-registry tools and resources on an MCP server instance.
 * Shared by the HTTP endpoint (mcp-handler). Everything here is read-only.
 */
export function registerBrandServer(server: McpServer): void {
  // --- Tool: list_brands -------------------------------------------------
  server.tool(
    "list_brands",
    "List every brand in the registry with its slug, display name, the " +
      "aspects available (overview, look, voice), and how many image assets it " +
      "has. Call this first to discover valid brand slugs for get_brand and " +
      "get_brand_assets.",
    async () => {
      const brands = listBrands();
      const lines = brands.map((b) => {
        const count = listAssets(b.slug).length;
        const assetNote = count > 0 ? ` · ${count} asset${count === 1 ? "" : "s"}` : "";
        return `- ${b.slug} — ${b.name} (aspects: ${b.aspects.join(", ")})${assetNote}`;
      });
      const text = brands.length
        ? `Brands in the registry:\n\n${lines.join("\n")}`
        : "No brands are currently registered.";
      return { content: [{ type: "text", text }] };
    },
  );

  // --- Tool: get_brand ---------------------------------------------------
  server.tool(
    "get_brand",
    "Get a brand's guidelines as markdown: its look (visual identity) and " +
      "voice (tone and writing), so an LLM can produce on-brand output. Use " +
      "aspect to fetch just one part, or 'all' (default) for everything.",
    {
      brand: z
        .string()
        .describe("Brand slug, e.g. 'nimbus'. Use list_brands to see options."),
      aspect: z
        .enum(["overview", "look", "voice", "all"])
        .optional()
        .describe(
          "Which part to return: 'look', 'voice', 'overview', or 'all' (default).",
        ),
    },
    async ({ brand, aspect }) => {
      const markdown = getBrand(brand, aspect ?? "all");
      if (markdown === null) {
        const valid = listBrands()
          .map((b) => b.slug)
          .join(", ");
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Unknown brand "${brand}". Available brands: ${valid || "(none)"}.`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: markdown }] };
    },
  );

  // --- Tool: get_brand_assets --------------------------------------------
  server.tool(
    "get_brand_assets",
    "List a brand's image assets (logos, wordmarks, icons, etc.) as public " +
      "URLs with descriptions, so an LLM can reference or embed them (e.g. an " +
      "<img> tag in generated HTML). Images are served by URL — fetch a URL to " +
      "retrieve the file.",
    {
      brand: z
        .string()
        .describe("Brand slug, e.g. 'nimbus'. Use list_brands to see options."),
    },
    async ({ brand }) => {
      const summary = listBrands().find((b) => b.slug === brand);
      if (!summary) {
        const valid = listBrands()
          .map((b) => b.slug)
          .join(", ");
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Unknown brand "${brand}". Available brands: ${valid || "(none)"}.`,
            },
          ],
        };
      }

      const assets = listAssets(brand);
      if (assets.length === 0) {
        return {
          content: [
            { type: "text", text: `${summary.name} has no image assets yet.` },
          ],
        };
      }

      // Siblings per cluster, so each asset can name the alternatives that
      // cover the same idea rather than exposing a bare cluster id.
      const siblings = new Map<string, string[]>();
      for (const a of assets) {
        if (!a.cluster) continue;
        const bucket = siblings.get(a.cluster);
        if (bucket) bucket.push(a.file);
        else siblings.set(a.cluster, [a.file]);
      }

      const lines = assets.map((a) => {
        const label = a.name ?? a.file;
        const kind = a.kind ? ` [${a.kind}]` : "";
        const desc = a.description ? ` — ${a.description}` : "";
        const bg = a.background ? ` (background: ${a.background})` : "";
        // Flag overlapping art so a caller doesn't settle on one of a redundant
        // set without knowing the alternatives exist.
        const dupe = a.sameArtAs
          ? ` Same drawing as ${a.sameArtAs} — one of the pair should win.`
          : "";
        const others = (siblings.get(a.cluster ?? "") ?? []).filter(
          (f) => f !== a.file,
        );
        const alts = others.length
          ? ` Also drawn as: ${others.join(", ")}.`
          : "";
        return `- **${label}**${kind}${desc}${bg}${dupe}${alts}\n  ${a.url}`;
      });

      return {
        content: [
          {
            type: "text",
            text: `Image assets for ${summary.name}:\n\n${lines.join("\n")}`,
          },
        ],
      };
    },
  );

  // --- Resources: brand://{slug}/{aspect} --------------------------------
  server.resource(
    "brand",
    new ResourceTemplate("brand://{slug}/{aspect}", {
      list: async () => ({
        resources: listBrands().flatMap((b) => {
          const entries = b.aspects.map((aspect) => ({
            uri: `brand://${b.slug}/${aspect}`,
            name: `${b.name} — ${aspect}`,
            description: `${aspect} guidelines for ${b.name}`,
            mimeType: "text/markdown",
          }));
          // A JSON asset manifest, listed only when the brand has images.
          if (listAssets(b.slug).length > 0) {
            entries.push({
              uri: `brand://${b.slug}/assets`,
              name: `${b.name} — assets`,
              description: `Image asset manifest (URLs) for ${b.name}`,
              mimeType: "application/json",
            });
          }
          return entries;
        }),
      }),
    }),
    async (uri, variables) => {
      const slug = String(variables.slug);
      const aspect = String(variables.aspect);

      // The `assets` pseudo-aspect returns a JSON manifest of image URLs.
      if (aspect === "assets") {
        const assets = listAssets(slug);
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify({ brand: slug, assets }, null, 2),
            },
          ],
        };
      }

      const markdown = ASPECTS.includes(aspect as Aspect)
        ? getAspect(slug, aspect as Aspect)
        : null;

      if (markdown === null) {
        throw new Error(
          `No content for brand://${slug}/${aspect}. Valid aspects: ${ASPECTS.join(", ")}, assets.`,
        );
      }

      return {
        contents: [
          { uri: uri.href, mimeType: "text/markdown", text: markdown },
        ],
      };
    },
  );
}
