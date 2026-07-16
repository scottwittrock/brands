import { createMcpHandler } from "mcp-handler";
import { registerBrandServer } from "@/lib/mcp";

/**
 * MCP endpoint. mcp-handler serves the Streamable HTTP transport at `/mcp`
 * (the `[transport]` segment). The server is stateless and read-only, so no
 * Redis / session store is required. Point an MCP client at `<origin>/mcp`.
 */
const handler = createMcpHandler(
  (server) => {
    registerBrandServer(server);
  },
  {
    serverInfo: {
      name: "brand-registry",
      version: "0.1.0",
    },
  },
  {
    // No redisUrl: stateless streamable-HTTP only (no resumable SSE).
    maxDuration: 60,
    verboseLogs: false,
  },
);

export { handler as GET, handler as POST };
