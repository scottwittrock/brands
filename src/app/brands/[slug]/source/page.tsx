import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAspect,
  getBrandSummary,
  listBrandSlugs,
} from "@/lib/brands";
import { getTheme } from "@/lib/themes";

/**
 * Source view: the raw markdown files a brand is built from. These are the exact
 * documents in `brands-content/<slug>/` that feed both the MCP endpoint and the
 * rendered style guide, shown verbatim so there's a single, visible source.
 */

export function generateStaticParams() {
  return listBrandSlugs().map((slug) => ({ slug }));
}

const ASPECT_BLURB: Record<string, string> = {
  overview: "Positioning, personality, and tagline.",
  look: "Color, type, logo, layout, and imagery.",
  voice: "Principles, tone, vocabulary, and examples.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) return { title: "Brand not found" };
  return {
    title: `${brand.name} — source markdown`,
    description: `The raw markdown files the ${brand.name} brand is built from.`,
  };
}

export default async function BrandSourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) notFound();

  const theme = getTheme(slug);
  const files = brand.aspects.map((aspect) => {
    const raw = getAspect(slug, aspect) ?? "";
    return {
      aspect,
      file: `${aspect}.md`,
      blurb: ASPECT_BLURB[aspect] ?? "",
      raw,
      lines: raw.trimEnd().split("\n").length,
    };
  });

  return (
    <main className="showcase source" style={theme.vars as CSSProperties}>
      <div className="wrap">
        <header className="sc-hero">
          <span className="sc-eyebrow">Source markdown</span>
          <h1>{brand.name}</h1>
          <p>
            The raw files in <code>brands-content/{slug}/</code>. These are the
            single source the MCP endpoint and the style guide both read from —
            what you see here is exactly what feeds every on-brand decision.
          </p>
          <Link className="sc-example-link" href={`/brands/${slug}`}>
            ← Back to style guide
          </Link>
        </header>

        <div className="src-files">
          {files.map((f) => (
            <section className="src-file" key={f.file} id={f.aspect}>
              <div className="src-file__head">
                <div>
                  <h2>{f.file}</h2>
                  <p>{f.blurb}</p>
                </div>
                <div className="src-file__meta">
                  <span>{f.lines} lines</span>
                  <code>
                    brand://{slug}/{f.aspect}
                  </code>
                </div>
              </div>
              <pre className="src-file__body">
                <code>{f.raw.trimEnd()}</code>
              </pre>
            </section>
          ))}
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
