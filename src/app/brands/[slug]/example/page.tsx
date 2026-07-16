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

/**
 * An **example landing page**, generated entirely from a brand's style guide:
 * the theme colors/fonts/radius (lib/themes.ts) plus copy pulled from the
 * brand's own `overview.md`. It exists to show what the guidelines look like
 * applied to a real marketing surface — not to be a second source of truth.
 */

export function generateStaticParams() {
  return listBrandSlugs().map((slug) => ({ slug }));
}

/** "**Tagline:** ..." from overview.md. */
function getTagline(slug: string): string | null {
  const overview = getAspect(slug, "overview");
  const match = overview?.match(/\*\*Tagline:\*\*\s*(.+)/);
  return match ? match[1].trim() : null;
}

/** The first ordinary prose paragraph of overview.md (skips headings/meta). */
function getLede(slug: string): string | null {
  const overview = getAspect(slug, "overview");
  if (!overview) return null;
  const body = overview.replace(/^#.*$/gm, ""); // drop headings
  for (const block of body.split(/\n\s*\n/)) {
    const line = block.trim();
    if (!line || line.startsWith("**") || line.startsWith("-") || line.startsWith("|"))
      continue;
    return line.replace(/\s+/g, " ");
  }
  return null;
}

interface Highlight {
  title: string;
  body: string;
}

/**
 * Highlight cards, pulled from the first bulleted list of the form
 * `- **Name** — description` (or `: description`) in overview.md. This is where
 * the suite / at-a-glance bullets live, so the features reflect the real brand.
 */
function getHighlights(slug: string): Highlight[] {
  const overview = getAspect(slug, "overview");
  if (!overview) return [];
  const out: Highlight[] = [];
  const re = /^-\s+\*\*(.+?)\*\*\s*[—:-]+\s*(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(overview)) !== null) {
    out.push({ title: m[1].trim(), body: m[2].trim() });
    if (out.length === 4) break;
  }
  return out;
}

/** First logo-kind asset (e.g. the wordmark), if the brand ships one. */
function getLogo(slug: string): string | null {
  const logo =
    listAssets(slug).find((a) => a.kind === "logo") ?? listAssets(slug)[0];
  return logo ? `/brands/${slug}/assets/${logo.file}` : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) return { title: "Brand not found" };
  return {
    title: `${brand.name} — example landing page`,
    description: `A sample landing page rendered from the ${brand.name} style guide.`,
  };
}

export default async function ExampleLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandSummary(slug);
  if (!brand) notFound();

  const theme = getTheme(slug);
  const tagline = getTagline(slug);
  const lede = getLede(slug);
  const highlights = getHighlights(slug);
  const logo = getLogo(slug);
  const swatches = theme.palette.length
    ? theme.palette
    : [{ name: "Primary", hex: theme.vars["--b-primary"], role: "Primary" }];

  return (
    <div className="example" style={theme.vars as CSSProperties}>
      {/* Ribbon marking this as a generated demo, not a real product site. */}
      <div className="ex-ribbon">
        <span>
          Example landing page — generated from the {brand.name} style guide.
        </span>
        <Link href={`/brands/${slug}`}>← Back to style guide</Link>
      </div>

      <header className="ex-nav">
        <div className="ex-nav__brand">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={`${brand.name} logo`} height={30} />
          ) : (
            <span className="ex-wordmark">{brand.name}</span>
          )}
        </div>
        <nav className="ex-nav__links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">Support</a>
          <button className="ex-btn ex-btn--primary" type="button">
            Get started
          </button>
        </nav>
      </header>

      <main>
        <section className="ex-hero">
          <div className="ex-hero__copy">
            <span className="ex-eyebrow">Now available</span>
            <h1>{tagline ?? `Meet ${brand.name}`}</h1>
            {lede && <p className="ex-lede">{lede}</p>}
            <div className="ex-cta-row">
              <button className="ex-btn ex-btn--primary ex-btn--lg" type="button">
                Get started free
              </button>
              <button className="ex-btn ex-btn--ghost ex-btn--lg" type="button">
                See how it works
              </button>
            </div>
            <p className="ex-fineprint">
              No credit card required. {brand.name} keeps your data yours.
            </p>
          </div>

          {/* Decorative visual built from the brand's own palette. */}
          <div className="ex-hero__art" aria-hidden="true">
            <div className="ex-blob ex-blob--a" />
            <div className="ex-blob ex-blob--b" />
            <div className="ex-mock">
              <div className="ex-mock__bar">
                <span />
                <span />
                <span />
              </div>
              <div className="ex-mock__row ex-mock__row--wide" />
              <div className="ex-mock__row" />
              <div className="ex-mock__row ex-mock__row--short" />
              <div className="ex-mock__chip">Saved</div>
            </div>
          </div>
        </section>

        {highlights.length > 0 && (
          <section className="ex-features" id="features">
            <h2 className="ex-section-title">Everything in one calm place</h2>
            <div className="ex-feature-grid">
              {highlights.map((h, i) => (
                <article className="ex-feature" key={h.title}>
                  <div className={`ex-feature__icon ex-feature__icon--${i % 3}`}>
                    <span>{h.title.charAt(0)}</span>
                  </div>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="ex-cta" id="pricing">
          <h2>Ready when you are.</h2>
          <p>
            Start free and upgrade whenever it helps. {brand.name} is built to
            make the hard parts feel manageable.
          </p>
          <button className="ex-btn ex-btn--primary ex-btn--lg" type="button">
            Get started free
          </button>
        </section>
      </main>

      <footer className="ex-footer" id="faq">
        <div className="ex-footer__top">
          <div>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={`${brand.name} logo`} height={26} />
            ) : (
              <span className="ex-wordmark">{brand.name}</span>
            )}
            {tagline && <p className="ex-footer__tag">{tagline}</p>}
          </div>
          <div className="ex-footer__swatches">
            {swatches.map((s) => (
              <span
                key={s.hex + s.name}
                className="ex-footer__swatch"
                style={{ background: s.hex }}
                title={`${s.name} ${s.hex}`}
              />
            ))}
          </div>
        </div>
        <p className="ex-footer__note">
          This is a demonstration page. Every color, font, and word above is
          drawn from the {brand.name} style guide.
        </p>
      </footer>
    </div>
  );
}
