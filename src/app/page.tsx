import Link from "next/link";
import { getAspect, listBrands } from "@/lib/brands";
import { getTheme } from "@/lib/themes";

/** A few representative colors for a brand's gallery-card swatch. */
function cardColors(slug: string): string[] {
  const theme = getTheme(slug);
  if (theme.palette.length > 0) {
    return theme.palette.slice(0, 5).map((s) => s.hex);
  }
  return [theme.vars["--b-primary"], theme.vars["--b-accent"]];
}

function tagline(slug: string): string | null {
  const overview = getAspect(slug, "overview");
  const match = overview?.match(/\*\*Tagline:\*\*\s*(.+)/);
  return match ? match[1].trim() : null;
}

export default function Home() {
  const brands = listBrands();

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="brandmark">
            Brand Registry
          </Link>
          <a
            className="nav-link"
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noreferrer"
          >
            What is MCP?
          </a>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <h1>Brand look &amp; voice, ready for LLMs.</h1>
          <p>
            A public registry of brand guidelines. Browse each brand&apos;s
            visual look and writing voice below, or connect an LLM client to the
            MCP endpoint to pull them on demand.
          </p>
        </section>

        <section className="grid">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="brand-card"
            >
              <div className="brand-card__swatch">
                {cardColors(brand.slug).map((hex, i) => (
                  <span key={i} style={{ background: hex }} />
                ))}
              </div>
              <div className="brand-card__body">
                <h3>{brand.name}</h3>
                <p>{tagline(brand.slug) ?? `${brand.name} guidelines`}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="mcp-callout">
          <h2>Connect via MCP</h2>
          <p>
            Add this server to any MCP-capable client (Claude, Cursor, and
            others) to give it every brand&apos;s look and voice as markdown. The
            endpoint is stateless and read-only.
          </p>
          <code className="code">{`{
  "mcpServers": {
    "brand-registry": {
      "url": "https://brands.scottwittrock.com/mcp"
    }
  }
}`}</code>
          <div className="pill-row">
            <span className="pill">tool: list_brands</span>
            <span className="pill">tool: get_brand</span>
            <span className="pill">resource: brand://&#123;slug&#125;/&#123;aspect&#125;</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          Brand Registry — an example MCP server serving brand guidelines.{" "}
          {brands.length} brand{brands.length === 1 ? "" : "s"} registered. See a
          brand applied to real pages in the{" "}
          <Link href="/examples/scottwittrock">Scott Wittrock example sites</Link>.
        </div>
      </footer>
    </>
  );
}
