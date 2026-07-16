import type { BrandTheme } from "@/lib/themes";

/** Palette swatches from the brand theme. */
export function Palette({ theme }: { theme: BrandTheme }) {
  if (theme.palette.length === 0) return null;
  return (
    <section className="sc-section">
      <h2>Palette</h2>
      <div className="sc-palette">
        {theme.palette.map((swatch) => (
          <div className="sc-swatch" key={swatch.hex + swatch.name}>
            <div
              className="sc-swatch__chip"
              style={{ background: swatch.hex }}
            />
            <div className="sc-swatch__meta">
              <strong>{swatch.name}</strong>
              <span>{swatch.hex}</span>
              <div style={{ color: "var(--b-muted)", marginTop: 2 }}>
                {swatch.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const TYPE_ROWS = [
  { label: "Display", size: 56, text: "Aa" },
  { label: "Heading", size: 34, text: "The quick brown fox" },
  { label: "Subhead", size: 22, text: "Jumps over the lazy dog" },
  { label: "Body", size: 16, text: "Pack my box with five dozen liquor jugs." },
];

/** Type scale rendered in the brand's heading font. */
export function TypeScale({ theme }: { theme: BrandTheme }) {
  return (
    <section className="sc-section">
      <h2>Typography</h2>
      <div className="sc-type">
        {TYPE_ROWS.map((row) => (
          <div key={row.label}>
            <div className="sc-type__label">
              {row.label}
              <br />
              {row.size}px
            </div>
            <div
              className="sc-type__sample"
              style={{ fontSize: row.size }}
            >
              {row.text}
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: "var(--b-muted)", marginTop: 18, fontSize: 14 }}>
        {theme.typeNote}
      </p>
    </section>
  );
}

/** Sample UI components rendered in the brand look. */
export function SampleUI({ name }: { name: string }) {
  return (
    <section className="sc-section">
      <h2>Sample UI</h2>
      <div className="sc-ui">
        <div>
          <div className="sc-btn-row">
            <button className="sc-btn sc-btn--primary" type="button">
              Primary action
            </button>
            <button className="sc-btn sc-btn--secondary" type="button">
              Secondary
            </button>
          </div>
          <div className="sc-btn-row">
            <span className="sc-badge">New</span>
            <span className="sc-badge">Beta</span>
            <span className="sc-badge">Popular</span>
          </div>
          <input
            className="sc-input"
            placeholder="you@example.com"
            aria-label="Email"
          />
        </div>
        <div className="sc-card">
          <h4>{name} card</h4>
          <p>
            A representative surface — headline, supporting copy, and an action —
            rendered in {name}&apos;s colors, type, and corner radius.
          </p>
          <button className="sc-btn sc-btn--primary" type="button">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
