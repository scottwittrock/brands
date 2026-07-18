/**
 * Per-brand *visual* theme.
 *
 * Brand content (`brands-content/`) is prose markdown only, so the values needed
 * to actually render a brand's look live here in code. Keep these consistent
 * with each brand's `look.md` by hand. A brand without an entry falls back to
 * `defaultTheme`, so the showcase still renders.
 */

export interface Swatch {
  name: string;
  hex: string;
  /** Roughly how the color is used, shown under the swatch. */
  role: string;
}

export interface BrandTheme {
  /** CSS custom properties applied to the `.showcase` wrapper. */
  vars: {
    "--b-bg": string;
    "--b-surface": string;
    "--b-fg": string;
    "--b-muted": string;
    "--b-primary": string;
    "--b-on-primary": string;
    "--b-accent": string;
    "--b-border": string;
    "--b-radius": string;
    "--b-font-heading": string;
    "--b-font-body": string;
  };
  /** Swatches shown in the palette section, in display order. */
  palette: Swatch[];
  /** Short type-treatment note shown in the type-scale section. */
  typeNote: string;
}

export const defaultTheme: BrandTheme = {
  vars: {
    "--b-bg": "#ffffff",
    "--b-surface": "#f5f5f5",
    "--b-fg": "#111111",
    "--b-muted": "#666666",
    "--b-primary": "#222222",
    "--b-on-primary": "#ffffff",
    "--b-accent": "#555555",
    "--b-border": "#e2e2e2",
    "--b-radius": "8px",
    "--b-font-heading": "ui-sans-serif, system-ui, sans-serif",
    "--b-font-body": "ui-sans-serif, system-ui, sans-serif",
  },
  palette: [],
  typeNote: "System typefaces.",
};

export const themes: Record<string, BrandTheme> = {
  altrocks: {
    vars: {
      "--b-bg": "#f7f2e8",
      "--b-surface": "#efe7d6",
      "--b-fg": "#2b2118",
      "--b-muted": "#6f6353",
      "--b-primary": "#ff6250",
      "--b-on-primary": "#f7f2e8",
      "--b-accent": "#125e7a",
      "--b-border": "#e0d6c2",
      "--b-radius": "4px",
      "--b-font-heading": "'Fraunces', Georgia, 'Times New Roman', serif",
      "--b-font-body": "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif",
    },
    palette: [
      { name: "Coral", hex: "#ff6250", role: "Lead · Lacey" },
      { name: "Deep Teal", hex: "#125e7a", role: "Anchor · Scott" },
      { name: "Ochre", hex: "#e8a33d", role: "Warm · Jovey" },
      { name: "Fig", hex: "#c9457a", role: "Accent · Ivy" },
      { name: "Olive", hex: "#5c7f4b", role: "Ground · Rue" },
      { name: "Paper", hex: "#f7f2e8", role: "Background" },
      { name: "Ink", hex: "#2b2118", role: "Text" },
    ],
    typeNote: "Fraunces 900 display · Hanken Grotesk body · torn-paper, hand-made.",
  },
  nimbus: {
    vars: {
      "--b-bg": "#ffffff",
      "--b-surface": "#f4f7fb",
      "--b-fg": "#0f1729",
      "--b-muted": "#5b6472",
      "--b-primary": "#2f6bff",
      "--b-on-primary": "#ffffff",
      "--b-accent": "#2f6bff",
      "--b-border": "#e2e8f2",
      "--b-radius": "10px",
      "--b-font-heading": "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
      "--b-font-body": "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
    palette: [
      { name: "Nimbus Blue", hex: "#2f6bff", role: "Primary" },
      { name: "Slate Ink", hex: "#0f1729", role: "Text" },
      { name: "Fog", hex: "#5b6472", role: "Muted" },
      { name: "Mist", hex: "#f4f7fb", role: "Surface" },
      { name: "Paper", hex: "#ffffff", role: "Background" },
      { name: "Hairline", hex: "#e2e8f2", role: "Border" },
    ],
    typeNote: "Space Grotesk headings · Inter body · 1.25 scale, tight tracking.",
  },
  verdant: {
    vars: {
      "--b-bg": "#faf6ee",
      "--b-surface": "#f0e9dc",
      "--b-fg": "#241e18",
      "--b-muted": "#6f6456",
      "--b-primary": "#2f5d3a",
      "--b-on-primary": "#faf6ee",
      "--b-accent": "#c1663f",
      "--b-border": "#ddd2bf",
      "--b-radius": "8px",
      "--b-font-heading": "'Fraunces', Georgia, 'Times New Roman', serif",
      "--b-font-body": "'Nunito Sans', ui-sans-serif, system-ui, sans-serif",
    },
    palette: [
      { name: "Forest", hex: "#2f5d3a", role: "Primary" },
      { name: "Bark", hex: "#241e18", role: "Text" },
      { name: "Stone", hex: "#6f6456", role: "Muted" },
      { name: "Clay", hex: "#c1663f", role: "Accent" },
      { name: "Oat", hex: "#f0e9dc", role: "Surface" },
      { name: "Linen", hex: "#faf6ee", role: "Background" },
      { name: "Twine", hex: "#ddd2bf", role: "Border" },
    ],
    typeNote: "Fraunces headings · Nunito Sans body · 1.2 scale, warm & tactile.",
  },
};

export function getTheme(slug: string): BrandTheme {
  return themes[slug] ?? defaultTheme;
}
