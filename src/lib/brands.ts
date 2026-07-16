import fs from "node:fs";
import path from "node:path";
import { getBaseUrl } from "./site";

/**
 * Brand content loader.
 *
 * The source of truth is the `brands-content/` directory at the repo root. Each
 * subdirectory is one brand (its folder name is the slug) and may contain any of
 * the aspect files below as prose markdown. This module reads that directory and
 * is shared by both the style guide pages and the MCP endpoint.
 */

export const ASPECTS = ["overview", "look", "voice"] as const;
export type Aspect = (typeof ASPECTS)[number];

/** Aspect argument accepted by getBrand — the real aspects plus "all". */
export type AspectQuery = Aspect | "all";

export interface BrandSummary {
  slug: string;
  name: string;
  aspects: Aspect[];
}

const CONTENT_DIR = path.join(process.cwd(), "brands-content");

function contentDirExists(): boolean {
  try {
    return fs.statSync(CONTENT_DIR).isDirectory();
  } catch {
    return false;
  }
}

function titleize(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function aspectPath(slug: string, aspect: Aspect): string {
  return path.join(CONTENT_DIR, slug, `${aspect}.md`);
}

function readAspectFile(slug: string, aspect: Aspect): string | null {
  try {
    return fs.readFileSync(aspectPath(slug, aspect), "utf8");
  } catch {
    return null;
  }
}

/** Aspects that actually have a file on disk for this brand, in canonical order. */
function availableAspects(slug: string): Aspect[] {
  return ASPECTS.filter((aspect) => readAspectFile(slug, aspect) !== null);
}

/** Display name: first level-1 heading in overview.md, else a titleized slug. */
function deriveName(slug: string): string {
  const overview = readAspectFile(slug, "overview");
  if (overview) {
    const heading = overview.match(/^#\s+(.+?)\s*$/m);
    if (heading) return heading[1].trim();
  }
  return titleize(slug);
}

/** All brand slugs, sorted, that exist as directories with at least one aspect. */
export function listBrandSlugs(): string[] {
  if (!contentDirExists()) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => availableAspects(slug).length > 0)
    .sort();
}

export function brandExists(slug: string): boolean {
  return listBrandSlugs().includes(slug);
}

/** Summaries for every brand: slug, display name, and available aspects. */
export function listBrands(): BrandSummary[] {
  return listBrandSlugs().map((slug) => ({
    slug,
    name: deriveName(slug),
    aspects: availableAspects(slug),
  }));
}

export function getBrandSummary(slug: string): BrandSummary | null {
  if (!brandExists(slug)) return null;
  return {
    slug,
    name: deriveName(slug),
    aspects: availableAspects(slug),
  };
}

/** Raw markdown for a single existing aspect file, or null if it's absent. */
export function getAspect(slug: string, aspect: Aspect): string | null {
  if (!brandExists(slug)) return null;
  return readAspectFile(slug, aspect);
}

/**
 * Markdown for a brand. A specific aspect returns that file; "all" concatenates
 * the present aspects under section headers. Returns null for unknown brands.
 */
export function getBrand(slug: string, aspect: AspectQuery = "all"): string | null {
  if (!brandExists(slug)) return null;

  if (aspect !== "all") {
    return readAspectFile(slug, aspect);
  }

  const name = deriveName(slug);
  const sections = availableAspects(slug).map((a) => {
    const body = readAspectFile(slug, a) ?? "";
    return body.trim();
  });

  return [`# ${name} — Brand Guidelines`, "", ...interleave(sections)].join("\n");
}

/** Join sections with a blank line + horizontal rule between them. */
function interleave(sections: string[]): string[] {
  const out: string[] = [];
  sections.forEach((section, i) => {
    if (i > 0) out.push("", "---", "");
    out.push(section);
  });
  return out;
}

/* ===========================================================================
 * Brand assets (images)
 *
 * Images live in `brands-content/<slug>/assets/` and are described by an
 * optional `brands-content/<slug>/assets.json` manifest. We serve them URL-only
 * (see the route at app/brands/[slug]/assets/[filename]); `url` and `mimeType`
 * are derived here, not stored in the manifest.
 * ======================================================================== */

/** One entry as authored in `assets.json`. */
export interface AssetManifestEntry {
  /** File name inside the brand's `assets/` folder, e.g. "logo.svg". */
  file: string;
  /** Human label, e.g. "Primary logo". */
  name?: string;
  /** Free-form category: logo, wordmark, icon, mark, palette-board, photo, … */
  kind?: string;
  /** What it is / how to use it. */
  description?: string;
  /** Intended background, e.g. "light" | "dark" | "any". */
  background?: string;
}

/** A manifest entry resolved with its public URL and derived mime type. */
export interface BrandAsset extends AssetManifestEntry {
  url: string;
  mimeType: string;
}

const MIME_BY_EXT: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

function mimeFor(file: string): string {
  const ext = file.split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

function assetsDir(slug: string): string {
  return path.join(CONTENT_DIR, slug, "assets");
}

function manifestPath(slug: string): string {
  return path.join(CONTENT_DIR, slug, "assets.json");
}

/** Read + parse a brand's assets.json, or [] if missing/invalid. */
function readManifest(slug: string): AssetManifestEntry[] {
  let raw: string;
  try {
    raw = fs.readFileSync(manifestPath(slug), "utf8");
  } catch {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as { assets?: AssetManifestEntry[] };
    return Array.isArray(parsed.assets) ? parsed.assets : [];
  } catch {
    return [];
  }
}

function assetFileExists(slug: string, file: string): boolean {
  try {
    return fs.statSync(path.join(assetsDir(slug), file)).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolved assets for a brand: manifest entries whose file actually exists,
 * each with a derived public `url` and `mimeType`. Empty for unknown brands or
 * brands with no manifest.
 */
export function listAssets(slug: string): BrandAsset[] {
  if (!brandExists(slug)) return [];
  const base = getBaseUrl();
  return readManifest(slug)
    .filter((entry) => entry.file && assetFileExists(slug, entry.file))
    .map((entry) => ({
      ...entry,
      mimeType: mimeFor(entry.file),
      url: `${base}/brands/${slug}/assets/${entry.file}`,
    }));
}

export function hasAssets(slug: string): boolean {
  return listAssets(slug).length > 0;
}

/**
 * Resolve a request for a single asset file to a path on disk. Acts as an
 * allowlist: only files named in the manifest (and present on disk) resolve, so
 * arbitrary paths / traversal never reach the filesystem. Returns null otherwise.
 */
export function getAssetFile(
  slug: string,
  filename: string,
): { path: string; mimeType: string } | null {
  if (!brandExists(slug)) return null;
  const listed = readManifest(slug).some((entry) => entry.file === filename);
  if (!listed || !assetFileExists(slug, filename)) return null;
  return {
    path: path.join(assetsDir(slug), filename),
    mimeType: mimeFor(filename),
  };
}
