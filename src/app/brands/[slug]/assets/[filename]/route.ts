import fs from "node:fs";
import { getAssetFile } from "@/lib/brands";

/**
 * Serves brand image files from `brands-content/<slug>/assets/`.
 *
 * These files live outside `public/`, so this handler exposes them at stable
 * public URLs (`/brands/<slug>/assets/<filename>`). Only files listed in the
 * brand's `assets.json` resolve — getAssetFile() acts as an allowlist, so
 * arbitrary paths and traversal never reach disk.
 */
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; filename: string }> },
) {
  const { slug, filename } = await params;
  const asset = getAssetFile(slug, decodeURIComponent(filename));

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  const body = fs.readFileSync(asset.path);
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": asset.mimeType,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
