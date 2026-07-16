import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  ASPECTS,
  getAspect,
  getBrand,
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
    "List every brand in the registry with its slug, display name, and the " +
      "aspects available (overview, look, voice). Call this first to discover " +
      "valid brand slugs for get_brand.",
    async () => {
      const brands = listBrands();
      const lines = brands.map(
        (b) => `- ${b.slug} — ${b.name} (aspects: ${b.aspects.join(", ")})`,
      );
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

  // --- Resources: brand://{slug}/{aspect} --------------------------------
  server.resource(
    "brand",
    new ResourceTemplate("brand://{slug}/{aspect}", {
      list: async () => ({
        resources: listBrands().flatMap((b) =>
          b.aspects.map((aspect) => ({
            uri: `brand://${b.slug}/${aspect}`,
            name: `${b.name} — ${aspect}`,
            description: `${aspect} guidelines for ${b.name}`,
            mimeType: "text/markdown",
          })),
        ),
      }),
    }),
    async (uri, variables) => {
      const slug = String(variables.slug);
      const aspect = String(variables.aspect) as Aspect;

      const markdown = ASPECTS.includes(aspect)
        ? getAspect(slug, aspect)
        : null;

      if (markdown === null) {
        throw new Error(
          `No content for brand://${slug}/${aspect}. Valid aspects: ${ASPECTS.join(", ")}.`,
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
