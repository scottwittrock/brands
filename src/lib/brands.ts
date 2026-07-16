import fs from "node:fs";
import path from "node:path";

/**
 * Brand content loader.
 *
 * The source of truth is the `brands-content/` directory at the repo root. Each
 * subdirectory is one brand (its folder name is the slug) and may contain any of
 * the aspect files below as prose markdown. This module reads that directory and
 * is shared by both the showcase pages and the MCP endpoint.
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
