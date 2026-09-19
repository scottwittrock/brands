# Look

## Color

Tether is a dark-first brand. The palette is three colors on screen at a time:
a deep navy field, near-white text, and a single cyan accent that marks the one
thing that matters.

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#0f172a` | Page background |
| `--color-surface` | `#16233b` | Cards, raised panels |
| `--color-accent` | `#06b6d4` | The core, primary actions, the one highlight |
| `--color-accent-bright` | `#22d3ee` | Hover, active, emphasis on the accent |
| `--color-accent-ink` | `#042630` | Icon tiles; text *on* the accent |
| `--color-text-primary` | `#f8fafc` | Headings, the mark's nodes |
| `--color-text-body` | `#e2e8f0` | Body copy |
| `--color-text-muted` | `#94a3b8` | Secondary text, labels |
| `--color-border-subtle` | `#1e2b41` | Hairlines between sections |

**The accent is rationed.** One cyan element per view. It is the core of the
mark, the primary button, or the single number that changed — never three of
those at once.

**There is no light mode yet.** Ink colors for light surfaces exist as
overrides (`#0f172a` nodes, `#334155` for signatures), and `logo-*-on-light`
assets are provided, but a full light theme is undecided. Do not invent one.

## Type

**Sora** at two weights, both jobs:

- **Wordmark** — 600, tracking `-0.02em`
- **Body** — 400, tracking `-0.005em`

Sora is squarer and more engineered than a neutral grotesk; the flat-sided `e`
and `r` echo the mark's geometry, which is why it was chosen over Inter, IBM
Plex Sans, Outfit, Space Grotesk and a serif (Fraunces). It stays readable at
body size without turning generic.

Tracking is per-family, not global: Sora is already fairly tight, and anything
below `-0.02em` closes its counters at wordmark size.

## The mark

Eight nodes and a core, drawn in a 100x100 box.

- **Core:** cyan disc, radius 9.06
- **Large nodes:** radius 7.76, at distance 40, on the **diagonals**
- **Small nodes:** radius 3.28, at distance 27, on the **cardinals**
- **Spokes:** flat strokes, round caps, width 2.24, same color as the nodes
- **Tilt:** the whole mark rotates **10°**

The large-on-diagonal / small-on-cardinal split is load-bearing: it gives the
six-pointed-star silhouette. Reversed, the mark reads as a plus sign.

Spoke gaps are **absolute**, not proportional — the cardinal spokes are
two-thirds the length of the diagonals, so a percentage inset leaves them
touching the core while the diagonals look correct.

### What the mark does not have

No containment ring, no glow, no gradient. An earlier exploration dressed it
with all three for a circuit-board hero scene; that treatment was dropped. The
logo is the plain drawing.

### Small sizes

The proportions are drawn for a large rendering. Below ~40px the thin elements
are boosted as the mark shrinks (rising to ~1.5x at favicon scale), and the
small cardinals are boosted harder than the diagonals, because shrinking hurts
the smallest element first.

**The favicon drops the four cardinal nodes entirely.** At 16px the cardinals
(radius 27) and diagonals (radius 40) land within a few pixels of each other,
and keeping all eight collapsed the mark into an undifferentiated 3x3 grid.
Four dots plus the core still read as this mark; nine equal dots do not.

## Lockups

Both orientations are fractions of the mark, so they hold proportion at any
size rather than needing per-size numbers:

- **Horizontal** — gap `0.3x` the mark, wordmark `0.98x`. The default; use
  wherever the space is wider than it is tall.
- **Stacked** — gap `0.14x`. For square-ish space: splash screens, centred
  cards, sponsor slots.

Minimum sizes: **28px** mark for the horizontal lockup (a real nav bar),
**16px** for the favicon variant. Below 28 the spokes thin out before the dots
do.

There is **no tagline lockup**. One was explored and dropped; the brand has no
tagline yet.

## Application

The mark is judged on whether it survives being small, sitting next to other
type, and cropped by a real surface — not on a neutral field.

- **Website header** — mark 26, beside nav at nav's type size. The most common
  size the logo is seen at; optimise for it.
- **Website footer** — mark 22, quieter, under a rule with the legal line.
- **Business card** — 3.5 x 2in. Front carries the horizontal lockup and the
  contact block; the reverse bleeds the mark off a corner, which is the real
  test of whether it reads from a fragment.
- **Home screen** — icon 44, among other apps. An icon that only reads in
  isolation is not finished.
- **Email signature** — mark 18 on white, nodes overridden to `#334155`. At the
  default near-white they vanish; this surface is the argument for a light
  variant.
- **Social avatar** — 64 / 40 / 24, **circular** crop, which cuts more off the
  corners than the app icon's superellipse.

## Motion

The intro animation is four phases over ~5.6s:

1. **Drift** — every particle is already on screen, fading up in place and
   floating like bubbles. Nothing enters from off-frame.
2. **Hubs** — four hubs appear (three wide, one near centre) and draw links to
   the particles nearest each.
3. **Gather** — each particle slides onto its own hub and is fully hidden
   behind it.
4. **Burst** — the hubs pulse and vanish; the particles explode back out past
   where they started, and the lockup resolves.

**The hubs never move.** An earlier version collapsed them to the centre first,
which read as one implosion; holding them keeps it as four local events, which
is what the clustering is about.

Float is a three-point loop, not a two-point yoyo — a yoyo retraces one straight
line and reads as a shuttle.

Everything respects `prefers-reduced-motion`, settling on the resolved lockup.

## Assets

SVG is the source of truth; PNGs are provided for tools that cannot take SVG
(Slack, some email clients, app stores). Both are generated from the same
geometry constants by `scripts/generate-brand-assets.mjs` in the Tether repo —
regenerate rather than hand-editing, or the files will drift from the code.

The lockup SVGs reference Sora as `<text>` rather than converting to paths, so
they stay searchable and restylable. A renderer without Sora installed will
substitute — use the PNGs where the font cannot be guaranteed.
