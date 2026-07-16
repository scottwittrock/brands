# Cleo — Look

The Cleo look is warm and rounded: soft, low-saturation color on generous cream
space, friendly type, and gentle illustration. Nothing stiff, clinical, or
urgent. When in doubt, round the corners and add space, not decoration.

## Color

The core Cleo Track palette anchors the whole family.

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Primary | Sage Green | `#A8C5A0` | Primary actions, buttons, the wordmark period |
| Primary (dark) | Deep Sage | `#8AB082` | Hover and pressed states |
| Accent | Warm Peach | `#F4A97F` | Highlights, small moments of delight |
| Background | Cream | `#FAF7F2` | Page and app background |
| Surface | Light Sand | `#F3F0EB` | Nav, cards, section backgrounds |
| Text | Slate | `#3D4A52` | Headings and body text |

**Rules**

- Palettes stay warm and soft — no neon, no high-saturation color.
- Text is Slate on Cream, never pure black on pure white.
- Sage is the primary action color; Peach is a highlight, used sparingly.
- Backgrounds stay light and warm; avoid cold grays and clinical white.

### Per-product tints

Each app keeps the warm, low-saturation feeling but can carry its own mood. For
example, **Cleo Routine** uses a "Morning Mist" palette — warm linen and the
soft light of early morning (`morningCream #FAF7F3`, `warmStone #EDE8E2`,
`plumText #2E2620`, `driftwood #A89880`, star gold `#C4A070`, sage check
`#8BB885`), with pastel task-card families (lilac `#DED0F0`, blush `#F0D4CC`,
sage `#C8DEB8`). Product tints shift the hue; they never break the warmth.

## Typography

Cleo uses a two-font system, plus a serif reserved for editorial moments.

- **Display / headings:** Nunito — rounded and friendly, it carries the Cleo
  personality. Titles, section headers, CTA buttons, and the wordmark.
- **Body / UI:** DM Sans — clean and highly legible, it keeps body copy readable
  without competing with the headings.
- **Editorial:** Playfair Display — a warm serif used only for long-form
  flourishes like release-note sign-offs, never for UI.
- **Scale:** calm and generous. Body is 16px minimum; headings are large but soft.

## Logo & wordmark

- The wordmark is always **lowercase** — **"cleo."** — in bold Slate text, with a
  **Sage Green period** (`#A8C5A0`) at the same weight and size as the preceding
  letter. It is set lowercase even though the brand name is capitalized (Cleo) in
  running prose.
- The wordmark always uses **DM Sans Bold** (the body font), not Nunito.
- The parent brand wordmark is always **cleo.** with the green period. Products
  extend it, lowercase: **cleo track.**, **cleo routine.**, **cleo plan.**,
  **cleo connect.** The paid tier is **cleo+** (never "cleo track+"). In running
  prose (not the wordmark), product names keep title case: Cleo Track, Cleo
  Routine, Cleo Plan, Cleo Connect.
- Corners are softly rounded everywhere. Nothing sharp; nothing clinical.

**Logo files.** The registry ships the ready-to-use marks as brand assets: the
primary `cleo.` wordmark, the rounded-square app icon, and per-product wordmarks
(`cleo track.`, `cleo routine.`, `cleo plan.`, `cleo connect.`). Alongside them
sits the full illustration library — the bear cast, product objects, and Routine
activity icons. Everything is listed on the style guide and available over MCP
via `get_brand_assets`.

## Space & layout

- Generous white space is the brand. Screens breathe; nothing feels cluttered.
- If a view holds more than three pieces of information, simplify it.
- Large tap targets and minimal reading — designed to be used one-handed at 3am,
  with dark mode support.
- Motion is gentle and reassuring; nothing bounces or demands attention.

## Illustration & imagery

The bear is Cleo's mascot and the face of the product. One cast of bears carries
every app: the same character, drawn doing whatever the moment calls for —
sleeping, holding a bottle, standing on a scale, waving hello.

**The house style is textured terracotta.** All new illustration is drawn this
way:

- A warm terracotta body (around `#E79464`), not pink and not glossy.
- A visible paper-grain texture over the fill — the art should look printed,
  not vector-slick.
- Cream ear insets and muzzle, rosy matte cheeks, soft brown eyes with a single
  highlight dot.
- Filled, rounded shapes with soft internal shading and no hard outlines; shapes
  overlap and nest. Props stay small and charming (a tiny moon, a steaming bowl),
  each illustration living in its own color family.
- Transparent background, square canvas, 1024×1024 for characters and objects;
  activity icons are 270×270.

**Legacy glossy-pink art.** An earlier generation of bears is flat pink
(around `#FD9572`), glossy, and untextured, with large solid-black eyes. It is
off-brand and being phased out. Those assets are marked `"style":
"legacy-glossy"` in the manifest and badged on the style guide. Don't reach for
one when a textured equivalent exists, and don't draw new art in that style.

**One bear per idea.** The registry is the source of truth: there is exactly one
`brush-teeth` and one `nap-bear`, and every app pulls that same file rather than
keeping its own copy. If an app needs a bear that doesn't exist yet, add it here
first.

- Real content over lorem ipsum; product shown calm and uncluttered.

## Do / Don't

- **Do** lean on warmth, rounded shapes, and generous space.
- **Do** keep Sage as the one action color and Peach as an occasional highlight.
- **Don't** use clipart, medical-form layouts, timers, or high-saturation color.
- **Don't** crowd a screen or use urgent reds and exclamation-heavy badges.
