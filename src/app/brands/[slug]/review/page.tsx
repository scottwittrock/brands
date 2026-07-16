import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandSummary, listAssets, listBrandSlugs } from "@/lib/brands";
import type { BrandAsset } from "@/lib/brands";
import { getTheme } from "@/lib/themes";

/**
 * Review view: art that overlaps, grouped so it can be compared side by side.
 *
 * Two kinds of overlap show up here. Assets sharing a `cluster` depict the same
 * idea drawn more than once; assets with `sameArtAs` are literally the same
 * drawing exported at two sizes. Both need a human to pick a winner, so this
 * page puts the candidates next to each other rather than scattering them
 * through the full A-Z grid on the style guide.
 */

export function generateStaticParams() {
  return listBrandSlugs().map((slug) => ({ slug }));
}

const CLUSTER_TITLE: Record<string, string> = {
  afterschool: "Afterschool / backpack",
  morning: "Morning routine",
  evening: "Evening & bedtime",
  potty: "Potty — generic",
  "potty-pee": "Potty — pee",
  "potty-poop": "Potty — poop",
  bottle: "Bottle",
  medicine: "Medicine",
  bath: "Bath",
  growth: "Growth & weight",
  celebrate: "Celebration",
  reading: "Books & reading",
  lunch: "Lunch",
  hug: "Hugs",
  dressing: "Shoes & jacket",
  brushing: "Brushing",
  "two-bears": "Two-bear scenes",
  cup: "Cups & mugs",
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
    title: `${brand.name} — overlapping art`,
    description: `Illustrations that depict the same idea, grouped for review.`,
  };
}

function groupByCluster(assets: BrandAsset[]): [string, BrandAsset[]][] {
  const groups = new Map<string, BrandAsset[]>();
  for (const a of assets) {
    if (!a.cluster) continue;
    const bucket = groups.get(a.cluster);
    if (bucket) bucket.push(a);
    else groups.set(a.cluster, [a]);
  }
  // Same-art groups first (a decision is pending), then biggest, then by name.
  return [...groups]
    .filter(([, items]) => items.length > 1)
    .sort(([ka, a], [kb, b]) => {
      const da = a.some((x) => x.sameArtAs) ? 1 : 0;
      const db = b.some((x) => x.sameArtAs) ? 1 : 0;
      if (da !== db) return db - da;
      if (a.length !== b.length) return b.length - a.length;
      return (CLUSTER_TITLE[ka] ?? ka).localeCompare(CLUSTER_TITLE[kb] ?? kb);
    });
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) notFound();

  const theme = getTheme(slug);
  const assets = listAssets(slug);
  const groups = groupByCluster(assets);
  const inReview = groups.reduce((n, [, items]) => n + items.length, 0);
  const legacy = assets.filter((a) => a.style === "legacy-glossy");

  return (
    <main className="showcase review" style={theme.vars as CSSProperties}>
      <header className="sc-hero">
        <p className="sc-eyebrow">Overlapping art</p>
        <h1>{brand.name}</h1>
        <p>
          {inReview} illustrations across {groups.length} groups depict an idea
          that something else already covers. They&rsquo;re grouped here so the
          candidates sit side by side — pick the one to keep per group, and the
          rest can be retired.
        </p>
        <div className="sc-hero-links">
          <Link className="sc-example-link" href={`/brands/${slug}`}>
            ← Back to style guide
          </Link>
        </div>
      </header>

      {legacy.length > 0 && (
        <section className="sc-section">
          <h2>Drawn in the legacy style</h2>
          <p className="sc-assets__lede">
            {legacy.length} assets still use the old glossy-pink look rather than
            the textured terracotta house style. These are the redraw list —
            independent of the groups below, though some appear in both.
          </p>
          <div className="sc-assets">
            {legacy.map((a) => (
              <figure className="sc-asset" key={a.file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/brands/${slug}/assets/${a.file}`}
                  alt={a.name ?? a.file}
                  loading="lazy"
                />
                <figcaption>
                  <strong>{a.name ?? a.file}</strong>
                  <span className="sc-asset__legacy">redraw</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {groups.map(([cluster, items]) => (
        <section className="sc-section rv-group" key={cluster}>
          <h2>
            {CLUSTER_TITLE[cluster] ?? cluster}
            <span className="sc-assets__count">{items.length}</span>
            {items.some((a) => a.sameArtAs) && (
              <span className="rv-badge">same drawing, two names</span>
            )}
          </h2>
          <div className="rv-row">
            {items.map((a) => (
              <figure className="sc-asset rv-card" key={a.file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/brands/${slug}/assets/${a.file}`}
                  alt={a.name ?? a.file}
                  loading="lazy"
                />
                <figcaption>
                  <strong>{a.name ?? a.file}</strong>
                  {a.style === "legacy-glossy" && (
                    <span className="sc-asset__legacy">legacy style</span>
                  )}
                  <p className="rv-file">{a.file}</p>
                  {a.sameArtAs && (
                    <p className="rv-note">
                      Identical to <code>{a.sameArtAs}</code>.
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
