import type { Metadata } from "next";
import Link from "next/link";
import "../examples.css";
import { CrossLink, Disclaimer, ESSAYS, Ribbon } from "../parts";

export const metadata: Metadata = {
  title: "Scott Wittrock — product manager & builder",
  description:
    "Product manager and builder, a decade close to AI — computer vision, visual search, now language models.",
};

/**
 * Example site: scottwittrock.com — the Personal HQ / the record (the builder).
 * Leads with the positioning line, the arc of the work, the "Building" list,
 * the résumé link, and contact. Links out to the writing; doesn't host essays.
 */
export default function ScottWittrockHome() {
  return (
    <div className="sw-site">
      <Ribbon url="scottwittrock.com" />

      <header className="sw-nav">
        <Link className="sw-mark" href="/examples/scottwittrock">
          <span className="sw-dot" aria-hidden="true" />
          Scott Wittrock
        </Link>
        <nav>
          <a className="sw-navlink" href="#building">
            Building
          </a>
          <Link className="sw-navlink" href="/examples/headforproduct">
            Writing ↗
          </Link>
          <Link className="sw-navlink" href="/examples/scottwittrock/about">
            Résumé
          </Link>
          <a className="sw-navlink" href="mailto:scott@scottwittrock.com">
            Contact
          </a>
        </nav>
      </header>

      <div className="sw-wrap">
        <section className="sw-hero">
          <p className="sw-label sw-rise">Product manager &amp; builder</p>
          <h1 className="sw-rise">
            The craft was never the building. It&apos;s the <span className="sw-em">choosing</span>.
          </h1>
          <p className="sw-lede sw-rise">
            A decade close to AI — computer vision, visual search, now language
            models. I work at Customer.io and write about what changes for product
            people when building software stops being the hard part.
          </p>
          <div className="sw-cta-row sw-rise">
            <Link className="sw-btn sw-btn--solid" href="/examples/scottwittrock/about">
              Read the résumé <span className="sw-arw">→</span>
            </Link>
            <Link className="sw-btn sw-btn--ghost" href="/examples/headforproduct">
              Read the writing <span className="sw-arw">→</span>
            </Link>
            <span className="sw-now">
              <span className="sw-dot sw-dot--sm" aria-hidden="true" /> Now — Product at
              Customer.io, on developer experience
            </span>
          </div>
        </section>

        {/* The arc / "Building" list — judgment, not activity */}
        <section className="sw-section" id="building">
          <p className="sw-label">Building &amp; built</p>
          <div className="sw-list">
            <div className="sw-item">
              <span className="sw-dot" aria-hidden="true" />
              <div>
                <h3>The MCP server as a first-class surface</h3>
                <p>
                  I argued for building it as a real product surface, not a side
                  demo — a front door for the people (and increasingly the agents)
                  who build on top of us. It&apos;s become part of how 7,800 teams
                  work.
                </p>
              </div>
              <span className="sw-when">Customer.io · now</span>
            </div>
            <div className="sw-item">
              <span className="sw-dot" aria-hidden="true" />
              <div>
                <h3>Developer experience as one surface</h3>
                <p>
                  I treated onboarding, docs, and SDKs as a single surface instead
                  of three tickets. Integration got roughly three times faster.
                </p>
              </div>
              <span className="sw-when">Customer.io</span>
            </div>
            <div className="sw-item">
              <span className="sw-dot" aria-hidden="true" />
              <div>
                <h3>Visual search, at retail scale</h3>
                <p>
                  Shipped search-by-image across a catalog spanning sixty
                  retailers. The lesson that stuck: the model is the easy part —
                  the taste is deciding what a good match even means.
                </p>
              </div>
              <span className="sw-when">Visual search era</span>
            </div>
            <div className="sw-item">
              <span className="sw-dot" aria-hidden="true" />
              <div>
                <h3>Connected products on my own time</h3>
                <p>
                  A freemium SaaS I built end to end — UI, chat, and API as one
                  capability with three front doors. Where I learn conversion by
                  owning it, clearly on personal time.
                </p>
              </div>
              <span className="sw-when">Personal</span>
            </div>
          </div>
        </section>

        {/* Writing teaser → cross-reference to headforproduct.com */}
        <section className="sw-section">
          <div className="sw-sec-head">
            <p className="sw-label" style={{ margin: 0 }}>
              From the writing
            </p>
            <span className="sw-e-meta">headforproduct.com</span>
          </div>
          <div className="sw-essays" style={{ marginTop: 20 }}>
            {ESSAYS.slice(0, 3).map((e) => (
              <Link className="sw-essay" href="/examples/headforproduct" key={e.title}>
                <div className="sw-e-title">{e.title}</div>
                <div className="sw-e-dek">{e.dek}</div>
                <div className="sw-e-meta">{e.meta}</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <CrossLink
              href="/examples/headforproduct"
              title="Head for Product"
              blurb="Where the thinking gets published — essays on AI-era product craft. Same person, same press."
              cta="Read the writing"
            />
          </div>
        </section>

        <div style={{ margin: "40px 0 8px" }}>
          <Disclaimer />
        </div>
      </div>

      <footer className="sw-footer">
        <div>
          <span className="sw-fmark">
            <span className="sw-dot" aria-hidden="true" /> Scott Wittrock
          </span>
          <div style={{ marginTop: 6 }}>
            <a href="mailto:scott@scottwittrock.com">scott@scottwittrock.com</a>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div>
            <Link href="/examples/headforproduct">headforproduct.com ↗</Link> · LinkedIn ·
            GitHub
          </div>
          <div style={{ marginTop: 6, color: "var(--sw-faint)" }}>
            One person, one press.
          </div>
        </div>
      </footer>
    </div>
  );
}
