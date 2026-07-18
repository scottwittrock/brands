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
      "--b-radius": "16px",
      "--b-font-heading": "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
      "--b-font-body": "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
    palette: [
      { name: "Deep Teal", hex: "#0b7492", role: "Accent" },
      { name: "Teal Deep", hex: "#085d75", role: "Accent hover" },
      { name: "Ink", hex: "#101828", role: "Text" },
      { name: "Slate", hex: "#797c83", role: "Muted" },
      { name: "Cool Mist", hex: "#f2f4f7", role: "Background" },
      { name: "Paper", hex: "#ffffff", role: "Surface" },
      { name: "Hairline", hex: "#e4e7ec", role: "Border" },
      { name: "Notepad", hex: "#fffbe8", role: "Highlight" },
    ],
    typeNote:
      "Space Grotesk display · Inter body · Fraunces italic accent — one word at a time.",
  },
  cleo: {
    vars: {
      "--b-bg": "#faf7f2",
      "--b-surface": "#f3f0eb",
      "--b-fg": "#3d4a52",
      "--b-muted": "#7a858c",
      "--b-primary": "#a8c5a0",
      "--b-on-primary": "#ffffff",
      "--b-accent": "#f4a97f",
      "--b-border": "#e7e0d6",
      "--b-radius": "16px",
      "--b-font-heading": "'Nunito', ui-sans-serif, system-ui, sans-serif",
      "--b-font-body": "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    },
    palette: [
      { name: "Sage Green", hex: "#a8c5a0", role: "Primary" },
      { name: "Deep Sage", hex: "#8ab082", role: "Hover" },
      { name: "Warm Peach", hex: "#f4a97f", role: "Accent" },
      { name: "Slate", hex: "#3d4a52", role: "Text" },
      { name: "Light Sand", hex: "#f3f0eb", role: "Surface" },
      { name: "Cream", hex: "#faf7f2", role: "Background" },
    ],
    typeNote: "Nunito headings · DM Sans body · calm scale, rounded & warm.",
  },
};

export function getTheme(slug: string): BrandTheme {
  return themes[slug] ?? defaultTheme;
}
