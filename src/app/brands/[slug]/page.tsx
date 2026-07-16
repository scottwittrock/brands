import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAspect,
  getBrandSummary,
  listAssets,
  listBrandSlugs,
} from "@/lib/brands";
import { getTheme } from "@/lib/themes";
import { Markdown } from "@/components/showcase/Markdown";
import { BrandAssets } from "@/components/showcase/BrandAssets";
import { Palette, SampleUI, TypeScale } from "@/components/showcase/Showcase";

/** Statically generate one page per brand at build time. */
export function generateStaticParams() {
  return listBrandSlugs().map((slug) => ({ slug }));
}

/** Pull "**Tagline:** ..." out of overview.md, if present. */
function getTagline(slug: string): string | null {
  const overview = getAspect(slug, "overview");
  if (!overview) return null;
  const match = overview.match(/\*\*Tagline:\*\*\s*(.+)/);
  return match ? match[1].trim() : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) return { title: "Brand not found" };
  const tagline = getTagline(slug);
  return {
    title: `${brand.name} — brand look & voice`,
    description: tagline ?? `Look and voice guidelines for ${brand.name}.`,
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) notFound();

  const theme = getTheme(slug);
  const tagline = getTagline(slug);
  const look = getAspect(slug, "look");
  const voice = getAspect(slug, "voice");
  const assets = listAssets(slug);
  // Only worth offering the review view when some art actually overlaps.
  const hasOverlappingArt = (() => {
    const counts = new Map<string, number>();
    for (const a of assets) {
      if (a.cluster) counts.set(a.cluster, (counts.get(a.cluster) ?? 0) + 1);
    }
    return [...counts.values()].some((n) => n > 1);
  })();

  return (
    <main className="showcase" style={theme.vars as CSSProperties}>
      <div className="wrap">
        <header className="sc-hero">
          <span className="sc-eyebrow">Brand style guide</span>
          <h1>{brand.name}</h1>
          {tagline && <p>{tagline}</p>}
          <div className="sc-hero-links">
            <Link className="sc-example-link" href={`/brands/${slug}/example`}>
              View example landing page →
            </Link>
            <Link className="sc-example-link" href={`/brands/${slug}/source`}>
              View source markdown →
            </Link>
            {hasOverlappingArt && (
              <Link className="sc-example-link" href={`/brands/${slug}/review`}>
                Review overlapping art →
              </Link>
            )}
          </div>
        </header>

        <BrandAssets slug={slug} assets={assets} />
        <Palette theme={theme} />
        <TypeScale theme={theme} />
        <SampleUI name={brand.name} />

        <div className="sc-section">
          <h2>Guidelines</h2>
          <div className="doc-cols">
            {look && <Markdown>{look}</Markdown>}
            {voice && <Markdown>{voice}</Markdown>}
          </div>
        </div>

        <footer className="sc-footer">
          <Link href="/">← All brands</Link>
          <span>
            Available over MCP as <code>brand://{slug}/*</code>
          </span>
        </footer>
      </div>
    </main>
  );
}
