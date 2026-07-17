import type { Metadata } from "next";
import Link from "next/link";
import "../../examples.css";
import { Disclaimer, Ribbon } from "../../parts";

export const metadata: Metadata = {
  title: "About / Résumé — Scott Wittrock",
  description:
    "The record: a decade close to AI across three waves — computer vision, visual search, now language models.",
};

/**
 * Example site: scottwittrock.com/about — the "About Me" page that is just the
 * résumé (the record). Organized by the three AI waves; links out to the
 * writing at headforproduct.com but doesn't host it.
 */
export default function ScottWittrockAbout() {
  return (
    <div className="sw-site">
      <Ribbon url="scottwittrock.com/about" />

      <header className="sw-nav">
        <Link className="sw-mark" href="/examples/scottwittrock">
          <span className="sw-dot" aria-hidden="true" />
          Scott Wittrock
        </Link>
        <nav>
          <Link className="sw-navlink" href="/examples/scottwittrock">
            Home
          </Link>
          <Link className="sw-navlink" href="/examples/headforproduct">
            Writing ↗
          </Link>
          <Link
            className="sw-navlink"
            href="/examples/scottwittrock/about"
            aria-current="page"
          >
            Résumé
          </Link>
        </nav>
      </header>

      <div className="sw-wrap">
        <header className="sw-resume-head">
          <p className="sw-label">About — the record</p>
          <h1>
            A decade close to AI. The same lesson each <span className="sw-em">time</span>.
          </h1>
        </header>

        <div style={{ margin: "8px 0 4px" }}>
          <Disclaimer prominent />
        </div>

        <div className="sw-cv-grid">
          {/* rail */}
          <aside className="sw-rail">
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:scott@scottwittrock.com">scott@scottwittrock.com</a>
                </li>
                <li>
                  <a href="#">linkedin.com/in/scottwittrock</a>
                </li>
                <li>
                  <a href="#">github.com/scottwittrock</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Writing</h4>
              <ul>
                <li>
                  <Link href="/examples/headforproduct">Head for Product ↗</Link>
                </li>
                <li style={{ color: "var(--sw-faint)" }}>
                  Essays on AI-era product craft
                </li>
              </ul>
            </div>
            <div>
              <h4>Throughline</h4>
              <div className="sw-chips">
                <span>Mobile</span>
                <span>Developer experience</span>
                <span>Connected products</span>
                <span>Conversion</span>
                <span>Curation</span>
              </div>
            </div>
            <div>
              <h4>Three waves</h4>
              <div className="sw-chips">
                <span>Computer vision</span>
                <span>Visual search</span>
                <span>Language models</span>
              </div>
            </div>
          </aside>

          {/* main */}
          <div className="sw-cv-main">
            <p className="sw-cv-summary">
              I&apos;ve spent about a decade close to AI — from computer vision and
              visual search to language models. At Customer.io I work on developer
              experience, the MCP server included — building for the people who build
              on top of you, increasingly agentic ones. The throughline is mobile and
              developer experience: the longer I do this, the more I think the hard
              part was never the engineering — it&apos;s{" "}
              <span className="sw-em">choosing</span> what deserves to exist.
            </p>

            <div className="sw-cv-block">
              <h2>Experience</h2>
              <div className="sw-job">
                <div className="sw-jt">
                  <span>
                    <span className="sw-jrole">Product Manager · Customer.io</span>{" "}
                    <span className="sw-jwave">language models</span>
                  </span>
                  <span className="sw-jdate">Now</span>
                </div>
                <p>
                  I argued for building the MCP server as a first-class surface, not a
                  side demo — a front door for the people and agents who build on top
                  of us. It&apos;s become part of how <b>7,800 teams</b> work. I treat
                  developer experience as one surface rather than three tickets;
                  integration got roughly <b>three times faster</b>.
                </p>
              </div>
              <div className="sw-job">
                <div className="sw-jt">
                  <span>
                    <span className="sw-jrole">Product · visual search</span>{" "}
                    <span className="sw-jwave">visual search</span>
                  </span>
                  <span className="sw-jdate">Earlier</span>
                </div>
                <p>
                  Shipped search-by-image across a catalog spanning <b>sixty
                  retailers</b>. I owned the part most people skip: deciding what a
                  &ldquo;good match&rdquo; means. The model was the easy part —
                  taste and curation were the product.
                </p>
              </div>
              <div className="sw-job">
                <div className="sw-jt">
                  <span>
                    <span className="sw-jrole">Product · computer vision</span>{" "}
                    <span className="sw-jwave">computer vision</span>
                  </span>
                  <span className="sw-jdate">Earlier still</span>
                </div>
                <p>
                  My first wave close to the models. Learned to scope AI features
                  around what a phone camera could actually deliver in a user&apos;s
                  hand — mobile and developer experience as the constraint that made
                  the work honest.
                </p>
              </div>
            </div>

            {/* Building in the open — the personal-time work, clearly delineated */}
            <div className="sw-cv-block">
              <h2>Building in the open</h2>
              <div className="sw-job">
                <div className="sw-jt">
                  <span>
                    <span className="sw-jrole">Connected products · personal time</span>
                  </span>
                  <span className="sw-jdate">Ongoing</span>
                </div>
                <p>
                  A freemium SaaS I built end to end — UI, chat, and API as one
                  capability with three front doors. Where I learn conversion by
                  owning it, and ship small on my own time. Clearly personal work,
                  kept separate from the day job.
                </p>
              </div>
            </div>

            {/* cross-reference to the publication */}
            <div className="sw-cv-block">
              <h2>Selected writing</h2>
              <p style={{ color: "var(--sw-soft)", margin: "16px 0 0", fontSize: 15.5 }}>
                The thinking gets published on{" "}
                <Link className="sw-inline-x" href="/examples/headforproduct">
                  Head for Product ↗
                </Link>{" "}
                — anchor essays on the AI-era PM reframe, how product gets built, and
                building in the open. This page is the record; the archive lives
                there.
              </p>
            </div>

            <div className="sw-cv-block">
              <h2>Education</h2>
              <div className="sw-edu">
                <span className="sw-d">
                  B.S., Computer Science <span className="sw-s">· placeholder — swap for your own</span>
                </span>
                <span className="sw-y">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="sw-footer">
        <div>
          <span className="sw-fmark">
            <span className="sw-dot" aria-hidden="true" /> scottwittrock.com/about
          </span>
          <div style={{ marginTop: 6 }}>
            How I think, in longer form?{" "}
            <Link href="/examples/headforproduct">Read the essays ↗</Link>
          </div>
        </div>
        <div style={{ textAlign: "right", color: "var(--sw-faint)" }}>
          The builder&apos;s record
        </div>
      </footer>
    </div>
  );
}
