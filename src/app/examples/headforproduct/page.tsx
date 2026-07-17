import type { Metadata } from "next";
import Link from "next/link";
import "../examples.css";
import { CrossLink, Disclaimer, ESSAYS, Ribbon } from "../parts";

export const metadata: Metadata = {
  title: "Head for Product — essays on AI-era product craft",
  description:
    "A publication by Scott Wittrock on what changes for product people when building software stops being the hard part.",
};

const PILLARS = [
  {
    n: "One",
    title: "The AI-era PM reframe",
    body: "When building gets cheap, craft moves from making to choosing. Taste, curation, judgment.",
  },
  {
    n: "Two",
    title: "How product gets built",
    body: "Process and teams without dogma: cycles, ratios, autonomy, and what actually ships meaningful work.",
  },
  {
    n: "Three",
    title: "Building in the open",
    body: "What I learn making things myself — connected products, AI tooling, conversion, shipping small.",
  },
];

/**
 * Example site: headforproduct.com — the HEAD of the publication's landing
 * page (the leader). Leads with the writing: masthead, the reframe thesis,
 * subscribe, the anchor essay, the three pillars, and recent pieces. Doesn't
 * carry the résumé; cross-references back to scottwittrock.com.
 */
export default function HeadForProductLanding() {
  const [anchor, ...rest] = ESSAYS;

  return (
    <div className="sw-site">
      <Ribbon url="headforproduct.com" />

      <header className="sw-nav">
        <Link className="sw-mark" href="/examples/headforproduct">
          <span className="sw-dot" aria-hidden="true" />
          Head for Product
          <small>by Scott Wittrock</small>
        </Link>
        <nav>
          <a className="sw-navlink" href="#essays">
            Essays
          </a>
          <a className="sw-navlink" href="#pillars">
            About the writing
          </a>
          <Link className="sw-navlink" href="/examples/scottwittrock">
            Scott ↗
          </Link>
          <a className="sw-btn sw-btn--solid" href="#subscribe" style={{ padding: "9px 16px" }}>
            Subscribe
          </a>
        </nav>
      </header>

      <div className="sw-wrap">
        <section className="sw-pub-hero">
          <p className="sw-label sw-rise">A publication on product craft</p>
          <h1 className="sw-rise">
            When building gets cheap, the craft moves to <span className="sw-em">choosing</span>.
          </h1>
          <p className="sw-pub-dek sw-rise">
            Essays on AI-era product craft — taste, judgment, and choosing what
            deserves to exist. Here&apos;s how I&apos;m thinking about it, from
            someone still in the work.
          </p>
          <form className="sw-subscribe sw-rise" id="subscribe" action="#">
            <input type="email" placeholder="you@work.com" aria-label="Email address" />
            <button className="sw-btn sw-btn--solid" type="submit">
              Subscribe <span className="sw-arw">→</span>
            </button>
            <span className="sw-note">A new essay every few weeks. No noise.</span>
          </form>
        </section>

        {/* anchor essay — the head's centerpiece */}
        <section className="sw-section" id="essays" style={{ marginTop: 44 }}>
          <p className="sw-label">The latest anchor</p>
          <Link className="sw-feature" href="#">
            <div className="sw-f-kick">{anchor.pillar}</div>
            <h2>{anchor.title}</h2>
            <p className="sw-f-dek">{anchor.dek}</p>
            <div className="sw-f-meta">
              <span>{anchor.meta}</span>
              <span>·</span>
              <span>12 min read</span>
              <span>·</span>
              <span className="sw-read">Read →</span>
            </div>
          </Link>
        </section>

        {/* three pillars — the spine */}
        <section className="sw-section" id="pillars">
          <p className="sw-label">The spine — three pillars</p>
          <div className="sw-pillars">
            {PILLARS.map((p) => (
              <div className="sw-pillar" key={p.title}>
                <div className="sw-pnum">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* recent essays */}
        <section className="sw-section">
          <div className="sw-sec-head">
            <p className="sw-label" style={{ margin: 0 }}>
              More essays
            </p>
            <a className="sw-e-meta" href="#">
              Full archive →
            </a>
          </div>
          <div className="sw-essays" style={{ marginTop: 20 }}>
            {rest.map((e) => (
              <a className="sw-essay" href="#" key={e.title}>
                <div className="sw-e-title">{e.title}</div>
                <div className="sw-e-dek">{e.dek}</div>
                <div className="sw-e-meta">
                  <span className="sw-e-pillar">{e.pillar}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* cross-reference back to the HQ / résumé */}
        <section className="sw-section">
          <CrossLink
            href="/examples/scottwittrock/about"
            title="Who's writing this"
            blurb="Scott Wittrock — product manager and builder, a decade close to AI. The record and the résumé live on scottwittrock.com."
            cta="scottwittrock.com"
          />
        </section>

        <div style={{ margin: "40px 0 8px" }}>
          <Disclaimer />
        </div>
      </div>

      <footer className="sw-footer">
        <div>
          <span className="sw-fmark">
            <span className="sw-dot" aria-hidden="true" /> Head for Product
          </span>
          <div style={{ marginTop: 6 }}>
            By <Link href="/examples/scottwittrock">Scott Wittrock</Link> ·
            headforproduct.com
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div>
            <Link href="/examples/scottwittrock">scottwittrock.com ↗</Link> · RSS · Archive
          </div>
          <div style={{ marginTop: 6, color: "var(--sw-faint)" }}>
            One person, one press.
          </div>
        </div>
      </footer>
    </div>
  );
}
