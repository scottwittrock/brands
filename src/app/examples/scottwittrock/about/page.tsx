import type { Metadata } from "next";
import Link from "next/link";
import "../../examples.css";
import { Disclaimer, Ribbon } from "../../parts";

export const metadata: Metadata = {
  title: "About / Résumé — Scott Wittrock",
  description:
    "The record: a decade on the same problem — building the surfaces where people and data meet, from computer vision to LLMs to agents.",
};

/**
 * Example site: scottwittrock.com/about — the "About Me" page that is just the
 * résumé (the record). The surfaces thread runs as subtext around the work
 * history — different companies, one problem. Links out to the writing at
 * headforproduct.com but doesn't host it.
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
            Different companies, one <span className="sw-em">problem</span>.
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
              <h4>Surfaces</h4>
              <div className="sw-chips">
                <span>Messaging</span>
                <span>Conversational &amp; agentic</span>
                <span>Visual</span>
                <span>Developer</span>
              </div>
            </div>
            <div>
              <h4>The arc</h4>
              <div className="sw-chips">
                <span>Computer vision</span>
                <span>LLMs</span>
                <span>Agents</span>
              </div>
            </div>
          </aside>

          {/* main */}
          <div className="sw-cv-main">
            <p className="sw-cv-summary">
              Different companies, one problem. The core of most products is data —
              and it&apos;s personal, whether it belongs to a person, a company, or a
              catalog. People hand it over in trust. My craft is building the{" "}
              <span className="sw-em">surfaces</span> where people and data meet, and
              the systems underneath them.
            </p>

            {/* Surface strip — the résumé subtext that makes the arc one practice */}
            <div className="sw-cv-block">
              <h2>Where people and data meet</h2>
              <div className="sw-surfaces">
                <div className="sw-surface-row">
                  <span className="sw-slabel">Messaging</span>
                  <span className="sw-sterms">
                    email · SMS · push · in-app · WhatsApp · Slack
                  </span>
                </div>
                <div className="sw-surface-row">
                  <span className="sw-slabel">Conversational &amp; agentic</span>
                  <span className="sw-sterms">chat · assistants · MCP · agents</span>
                </div>
                <div className="sw-surface-row">
                  <span className="sw-slabel">Visual</span>
                  <span className="sw-sterms">visual search · AR</span>
                </div>
                <div className="sw-surface-row">
                  <span className="sw-slabel">Developer</span>
                  <span className="sw-sterms">API · SDK · CLI</span>
                </div>
              </div>
            </div>

            <div className="sw-cv-block">
              <h2>Experience</h2>
              <div className="sw-job">
                <div className="sw-jt">
                  <span>
                    <span className="sw-jrole">Product Manager · Customer.io</span>{" "}
                    <span className="sw-jwave">messaging · agents · API</span>
                  </span>
                  <span className="sw-jdate">Now</span>
                </div>
                <p>
                  <b>Core:</b> customer data → human connection. The right data to
                  the right person at the right moment. I argued for the MCP server as
                  a first-class surface — a front door for the people and agents who
                  build on top of us. It&apos;s become part of how <b>7,800 teams</b>{" "}
                  work, and I treat developer experience as one surface, not three
                  tickets; integration got roughly <b>three times faster</b>.{" "}
                  <span style={{ color: "var(--sw-soft)" }}>
                    Surfaces: messaging, chat, agents, API, mobile SDKs. Audience:
                    developers and the businesses reaching their customers.
                  </span>
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
                  <b>Core:</b> the catalog. Mapped a retailer&apos;s full inventory so
                  a shopper could snap a photo and find the item — solving what words
                  can&apos;t, across a catalog spanning <b>sixty retailers</b>.{" "}
                  <span style={{ color: "var(--sw-soft)" }}>
                    Surface: visual search. Audience: consumer.
                  </span>
                </p>
              </div>
              <div className="sw-job">
                <div className="sw-jt">
                  <span>
                    <span className="sw-jrole">Product · computer vision</span>{" "}
                    <span className="sw-jwave">the camera · AR</span>
                  </span>
                  <span className="sw-jdate">Earlier still</span>
                </div>
                <p>
                  <b>Core:</b> the world as data. Building toward a knowledge graph of
                  the visual world — the first surface I shipped onto data, and the
                  one that taught me to scope an AI feature around what a phone camera
                  can actually deliver in a user&apos;s hand.{" "}
                  <span style={{ color: "var(--sw-soft)" }}>
                    Surface: the camera, AR.
                  </span>
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
                  A routine tracker that grew into a freemium SaaS, and Tether — one
                  capability across UI, chat, and API. The same shape as the day job,
                  at small scale: data at the core, several surfaces onto it. Where I
                  learn conversion by owning it. Clearly personal work, kept separate
                  from the day job.
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
                — anchor essays on the data underneath, the surfaces where people and
                data meet, and building in the open. This page is the record; the
                archive lives there.
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
