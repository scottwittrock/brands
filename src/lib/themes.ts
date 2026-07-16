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
  cleo: {
    vars: {
      "--b-bg": "#faf7f2",
      "--b-surface": "#f3f0eb",
      "--b-fg": "#3d4a52",
      "--b-muted": "#7c8790",
      "--b-primary": "#a8c5a0",
      "--b-on-primary": "#ffffff",
      "--b-accent": "#f4a97f",
      "--b-border": "#ddd4c8",
      "--b-radius": "16px",
      "--b-font-heading": "'Nunito', ui-sans-serif, system-ui, sans-serif",
      "--b-font-body": "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    },
    palette: [
      { name: "Sage Green", hex: "#a8c5a0", role: "Primary" },
      { name: "Deep Sage", hex: "#8ab082", role: "Hover" },
      { name: "Warm Peach", hex: "#f4a97f", role: "Accent" },
      { name: "Slate", hex: "#3d4a52", role: "Text" },
      { name: "Cream", hex: "#faf7f2", role: "Background" },
      { name: "Linen", hex: "#f3f0eb", role: "Surface" },
      { name: "Warm Border", hex: "#ddd4c8", role: "Border" },
    ],
    typeNote:
      "Nunito headings · DM Sans body · rounded, warm, generous white space.",
  },
  "scott-wittrock": {
    vars: {
      "--b-bg": "#f2f4f7",
      "--b-surface": "#ffffff",
      "--b-fg": "#101828",
      "--b-muted": "#797c83",
      "--b-primary": "#0b7492",
      "--b-on-primary": "#ffffff",
      "--b-accent": "#0b7492",
      "--b-border": "#e4e7ec",
      "--b-radius": "12px",
      "--b-font-heading":
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "--b-font-body":
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    },
    palette: [
      { name: "Deep Teal", hex: "#0b7492", role: "Primary" },
      { name: "Teal Deep", hex: "#085d75", role: "Hover" },
      { name: "Ink", hex: "#101828", role: "Text" },
      { name: "Slate", hex: "#797c83", role: "Muted" },
      { name: "Notepad", hex: "#fffbe8", role: "Highlight" },
      { name: "Cool Mist", hex: "#f2f4f7", role: "Background" },
      { name: "Hairline", hex: "#e4e7ec", role: "Border" },
    ],
    typeNote:
      "System UI stack · 600 headings · large, readable body for long-form insights.",
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
