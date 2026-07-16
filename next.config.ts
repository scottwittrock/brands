import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The MCP route (app/[transport]/route.ts) reads brand markdown from disk at
  // request time. Next.js file tracing does not follow dynamic fs reads, so
  // explicitly bundle the content directory into the serverless function output.
  outputFileTracingIncludes: {
    "/[transport]": ["./brands-content/**/*"],
    // The asset route streams image bytes from brands-content at request time.
    "/brands/[slug]/assets/[filename]": ["./brands-content/**/*"],
  },
};

export default nextConfig;
