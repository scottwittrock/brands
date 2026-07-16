import type { BrandAsset } from "@/lib/brands";

/**
 * Renders a brand's image assets. Uses a relative URL (`/brands/<slug>/assets/…`)
 * for the <img> so it works in any environment, independent of the absolute URL
 * the MCP hands to external clients.
 */
export function BrandAssets({
  slug,
  assets,
}: {
  slug: string;
  assets: BrandAsset[];
}) {
  if (assets.length === 0) return null;
  return (
    <section className="sc-section">
      <h2>Assets</h2>
      <div className="sc-assets">
        {assets.map((a) => (
          <figure className="sc-asset" key={a.file}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/brands/${slug}/assets/${a.file}`}
              alt={a.name ?? a.file}
              loading="lazy"
            />
            <figcaption>
              <strong>{a.name ?? a.file}</strong>
              {a.kind && <span className="sc-asset__kind">{a.kind}</span>}
              {a.description && <p>{a.description}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
