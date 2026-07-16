import type { BrandAsset } from "@/lib/brands";

/**
 * Renders a brand's image assets, grouped by kind. Uses a relative URL
 * (`/brands/<slug>/assets/…`) for the <img> so it works in any environment,
 * independent of the absolute URL the MCP hands to external clients.
 */

/** Groups render in this order; anything else follows, alphabetically. */
const KIND_ORDER = ["logo", "icon", "illustration", "object", "activity-icon"];

const KIND_LABEL: Record<string, string> = {
  logo: "Logos & wordmarks",
  icon: "Icons",
  illustration: "Character illustrations",
  object: "Objects",
  "activity-icon": "Activity icons",
};

function groupByKind(assets: BrandAsset[]): [string, BrandAsset[]][] {
  const groups = new Map<string, BrandAsset[]>();
  for (const a of assets) {
    const kind = a.kind ?? "other";
    const bucket = groups.get(kind);
    if (bucket) bucket.push(a);
    else groups.set(kind, [a]);
  }
  return [...groups].sort(([a], [b]) => {
    const ia = KIND_ORDER.indexOf(a);
    const ib = KIND_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
}

export function BrandAssets({
  slug,
  assets,
}: {
  slug: string;
  assets: BrandAsset[];
}) {
  if (assets.length === 0) return null;
  const groups = groupByKind(assets);

  return (
    <section className="sc-section">
      <h2>Assets</h2>
      <p className="sc-assets__lede">
        {assets.length} assets, served over MCP via <code>get_brand_assets</code>
        . This registry is the source of truth — use these rather than copying
        art between apps.
      </p>

      {groups.map(([kind, items]) => (
        <div className="sc-assets__group" key={kind}>
          <h3 className="sc-assets__kind-title">
            {KIND_LABEL[kind] ?? kind}
            <span className="sc-assets__count">{items.length}</span>
          </h3>
          <div className="sc-assets">
            {items.map((a) => (
              <figure className="sc-asset" key={a.file}>
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
                  {a.description && <p>{a.description}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
