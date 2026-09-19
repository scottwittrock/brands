# Scott Wittrock — Look

Cool off-white base, ink text, a single **deep teal** as the one brand color.
Sans-first type with one serif accent face. Ships light and dark. Clean,
confident, credible — a senior operator's brand, not a launch page. Colors are
the source of truth pulled from the Brand Registry; type, layout, and components
are defined here and shared across both sites.

## Color

Teal is the one brand color. It's a scalpel, not a paint roller — primary
actions, links, one emphasis moment, the dot, hover states. If teal covers more
than ~10% of a screen, pull it back.

**Light (canonical — from the registry)**

| Token | Name | Hex | Role |
| --- | --- | --- | --- |
| `--pop` | Deep Teal | `#0b7492` | The accent — primary buttons, links, key emphasis |
| `--popd` | Teal Deep | `#085d75` | Accent hover / pressed |
| `--ink` | Ink | `#101828` | Headlines and body text |
| `--soft` | Slate | `#797c83` | Secondary text, captions |
| `--paper` | Cool Mist | `#f2f4f7` | Page background |
| `--card` | Paper | `#ffffff` | Cards, panels, surfaces |
| `--line` | Hairline | `#e4e7ec` | Dividers, input borders |
| `--highlight` | Notepad | `#fffbe8` | Callouts / highlighted resources — sparingly |
| `--faint` | *(derived)* | `#9aa1ab` | Fine metadata / captions — a lighter Slate |

**Dark (derived complement — the registry defines light only)**

| Token | Hex | Role |
| --- | --- | --- |
| `--pop` | `#2ea8c9` | Accent, brightened to hold contrast on dark |
| `--popd` | `#4fbcd9` | Accent, lighter state |
| `--ink` | `#eef1f5` | Primary text |
| `--soft` | `#98a0ab` | Secondary text |
| `--paper` | `#0d1017` | Page background (cool near-black, tuned to the Ink hue) |
| `--card` | `#161b24` | Surfaces |
| `--line` | `#262d38` | Hairlines |
| `--highlight` | `#26261a` | Callout wash (muted) |
| `--faint` | `#6a7078` | Fine metadata |

**Rules**

- Teal is the one brand color — one primary action per view. Never introduce a
  second bright hue to compete with it.
- Text is Ink on a cool off-white, never pure black on pure white.
- The **Notepad** cream highlights a single resource or callout — a highlighter
  over one line, not a wall of yellow.
- Always declare `color-scheme: light dark` so browsers don't auto-invert and
  break contrast.

## Typography

Sans-first, with one serif accent face used only for emphasis. Three roles,
three families — all Google Fonts. Sans carries the information; serif carries
the feeling.

| Role | Family | Weights | Where |
| --- | --- | --- | --- |
| Display / structure | **Space Grotesk** | 500, 600 | Headlines, section labels, wordmark, card titles, meta |
| Body | **Inter** | 400, 500 | Lede, prose, lists, nav |
| Accent | **Fraunces** *(italic)* | 400 italic | The one emphasized word; pull-quotes; drop-cap; writing metadata |

**Type scale (fluid)**

- **Hero H1** — `clamp(36px, 6–7vw, 68–80px)`, Space Grotesk 600, line-height
  ~1.03, −0.03em, max ~16ch
- **Article H1** — `clamp(32px, 5vw, 52px)`, line-height 1.06, −0.03em
- **Featured essay H2** — `clamp(24px, 3.6vw, 34px)`, Space Grotesk 600, −0.02em
- **Lede** — `clamp(16.5px, 2vw, 19px)`, Inter, `--soft`, line-height 1.6,
  max ~52ch
- **Prose body (reading)** — `18.5px`, Inter, line-height 1.72, measure ~680px
- **Pull-quote** — `clamp(22px, 3vw, 30px)`, Fraunces italic, line-height 1.34,
  teal left-border
- **Section label** — `12.5px`, Space Grotesk 500, UPPERCASE, letter-spacing
  0.14em, `--faint`
- **Essay index title** — `19px`, Space Grotesk / Inter 600, −0.01em
- **Drop-cap** — `3.4em`, Fraunces, teal, first paragraph of an essay

Fraunces only ever appears italic, only in teal (or as a quiet pull-quote),
never more than a word or a single line. Headlines tight and short-measure; body
long-measure and airy.

## Logo & mark

A final mark is TBD — leave a simple placeholder in the build. Until it exists,
the **teal dot + wordmark** stands in as the identity: "Head for Product" (the
publication) and "Scott Wittrock" (HQ), each set in Space Grotesk beside a filled
deep-teal dot. Drop in the real mark once it exists.

## Signature elements

These are the brand. Keep only these and it still reads as the system.

1. **All-caps section label + teal rule** — Space Grotesk, 12.5px, UPPERCASE,
   0.14em tracking, `--faint`, preceded by a `22px × 2px` deep-teal bar.
2. **The teal dot** — a filled deep-teal circle, `9px` beside a wordmark, `7px`
   as a status/motif marker (the "now" line, About list, footer). Always round,
   filled, never outlined.
3. **The accent word** — one word per headline in Fraunces italic, teal
   (*choosing*, *come along*). Choose the word that carries the meaning.

Supporting components:

- **Cards / featured blocks** — `--card` on `--paper`, 1px `--line`, 16px radius,
  ~26–34px padding. Hover: lift `translateY(-3px)`, border → teal, soft shadow,
  a `Read →` affordance that nudges right.
- **The reading experience** *(the publication's crown jewel)* — measure ~680px,
  18.5px body at 1.72 line-height, a Fraunces teal drop-cap on the first
  paragraph, teal-bordered Fraunces pull-quotes.
- **Subscribe** — pill-shaped inputs, teal filled button, low-key helper note
  ("A new essay every few weeks. No noise.").
- **The "now" pill** — rounded-full status chip with a 7px teal dot and small
  `--soft` text.

## Space & layout

- **Containers:** 940px for standard pages; **680px for prose**. Side padding
  32px.
- **Vertical rhythm:** major sections `padding: 48–52px 0`, a 1px `--line` top
  border, 40px top margin. The hairline is the only divider; whitespace does the
  rest.
- **Nav:** sticky, translucent `--paper` (~85%) with 12px backdrop blur and a
  bottom hairline. Wordmark left, links right; secondary links may hide under
  600px, Subscribe stays.
- Whitespace is the primary material. When in doubt, add space, not decoration.

## Motion

Minimal — motion confirms, it doesn't perform.

- **Load:** soft rise-and-fade on hero elements (`translateY(9px)`→0, opacity
  0→1), 0.7s ease-out, staggered 0.04 / 0.12 / 0.22 / 0.32s.
- **Hover:** 0.16–0.2s on cards, links, arrows.
- **View change:** ~0.4s opacity fade, scroll to top.
- All wrapped in `@media (prefers-reduced-motion: reduce)`. No parallax, no
  scroll-jacking, no ambient loops, no heavy drop shadows or gradients.

## Accessibility & quality floor

- Keyboard focus shows a 2px teal outline at 3px offset; interactive cards
  operable with Enter/Space.
- Contrast: Ink on Cool Mist and teal on white clear AA; the dark accent is
  brightened to hold.
- Responsive to small phones; grids collapse gracefully.
- Theme follows the device; test dark on an actual phone (the ink-on-dark
  problem only shows there).

## Do / Don't

- **Do** let deep teal and clear hierarchy carry the design; keep type legible
  and long-form readable; use the label + rule for every beat; state numbers
  plainly; keep the Notepad cream to a single highlighted line.
- **Don't** stack a second accent color, gradients, or heavy drop shadows; use
  pure white/black; reach for Fraunces beyond a word or a line; add decorative
  icon sets.
