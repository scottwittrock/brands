import type { Metadata } from "next";
import Link from "next/link";
import "./altrocks.css";

export const metadata: Metadata = {
  title: "The Altrocks — five of us, five colors, one loud pile",
  description:
    "The Altrocks family home page: an example site rendered from the Altrocks torn-paper style guide — mark, five per-person colors, chore rows, name stickers, and Rue's tag.",
};

/**
 * Example site: thealtrocks.house — a household hub applying the Altrocks
 * torn-paper brand to a real family page. Everything (the Stack mark, the five
 * per-person colors, the utility labels, the torn shapes) comes from the
 * brand's look.md. All selectors are namespaced under `.al-site` / `al-` so
 * they never touch the registry's styles or the Scott Wittrock example CSS.
 */

const FAMILY = [
  { name: "Jovey", color: "ochre", hex: "#e8a33d", role: "Ochre — warm and loud" },
  { name: "Lacey", color: "coral", hex: "#ff6250", role: "Coral — the lead" },
  { name: "Scott", color: "teal", hex: "#125e7a", role: "Deep Teal — the anchor" },
  { name: "Ivy", color: "fig", hex: "#c9457a", role: "Fig — the accent" },
  { name: "Rue", color: "olive", hex: "#5c7f4b", role: "Olive — the dog" },
];

const CHORES = [
  { who: "Lacey", color: "coral", task: "Trash + recycling out", when: "Tue" },
  { who: "Scott", color: "teal", task: "Walk Rue, morning loop", when: "Daily" },
  { who: "Jovey", color: "ochre", task: "Set the table", when: "Nights" },
  { who: "Ivy", color: "fig", task: "Water the plants", when: "Sun" },
  { who: "Scott", color: "teal", task: "Grocery run", when: "Sat" },
];

export default function AltrocksHome() {
  return (
    <div className="al-site">
      {/* Example context ribbon */}
      <div className="al-ribbon">
        <span>
          Example site · <span className="al-url">thealtrocks.house</span>
        </span>
        <span>
          <Link href="/">← Brand Registry</Link>
        </span>
      </div>

      <header className="al-nav">
        <Link className="al-mark" href="/examples/altrocks">
          {/* The Stack mark, straight from the brand assets */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/altrocks/assets/icon.svg" alt="" height={34} />
          <span className="al-wordmark">ALTROCKS</span>
        </Link>
        <nav className="al-navlinks">
          <a href="#family">The five</a>
          <a href="#chores">Chores</a>
          <a href="#stickers">Labels</a>
          <a href="#rue">Rue</a>
        </nav>
      </header>

      {/* Hero: torn coral field, the holiday-card line, the mark */}
      <section className="al-hero">
        <div className="al-hero__copy">
          <p className="al-eyebrow">Northern Liberties, Philadelphia</p>
          <h1>
            Five of us, five colors,
            <br />
            one loud pile.
          </h1>
          <p className="al-lede">
            The Altrocks is a family, not a company — Jovey, Lacey, Scott, Ivy,
            and Rue the dog. Everything here is torn from paper by hand: big flat
            shapes, no outlines, one color each, for life.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="al-hero__mark"
          src="/brands/altrocks/assets/logo.svg"
          alt="The Altrocks mark: five torn strips above the wordmark"
        />
      </section>

      {/* The five — one torn card per person, in their color */}
      <section className="al-section" id="family">
        <p className="al-label">The five</p>
        <div className="al-people">
          {FAMILY.map((p) => (
            <article className={`al-person al-fill--${p.color}`} key={p.name}>
              <span className="al-person__face" aria-hidden="true" />
              <h3>{p.name}</h3>
              <span className="al-person__role">{p.role}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Chore rows — the color-owns-the-person system, applied */}
      <section className="al-section" id="chores">
        <div className="al-sec-head">
          <p className="al-label" style={{ margin: 0 }}>
            This week
          </p>
          <span className="al-meta">On the fridge</span>
        </div>
        <div className="al-chores">
          {CHORES.map((c, i) => (
            <div className="al-chore" key={i}>
              <span className={`al-chip al-fill--${c.color}`}>{c.who}</span>
              <span className="al-chore__task">{c.task}</span>
              <span className="al-chore__when">{c.when}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Name stickers — a torn circle per person, name knocked out */}
      <section className="al-section" id="stickers">
        <div className="al-sec-head">
          <p className="al-label" style={{ margin: 0 }}>
            Name stickers
          </p>
          <span className="al-meta">Cups · bins · backpacks</span>
        </div>
        <div className="al-stickers">
          {FAMILY.map((p) => (
            <span className={`al-sticker al-fill--${p.color}`} key={p.name}>
              {p.name}
            </span>
          ))}
        </div>
      </section>

      {/* Rue's tag — torn olive shape, name in paper */}
      <section className="al-section al-rue" id="rue">
        <div className="al-tag">
          <span className="al-tag__name">RUE</span>
          <span className="al-tag__sub">If found, we miss her — call the pile.</span>
        </div>
        <p className="al-rue__note">
          Olive is Rue&apos;s color. It&apos;s also plants, parks, and anything
          outdoors — the grounding green of the whole system.
        </p>
      </section>

      {/* One ink horizon line, then the footer */}
      <div className="al-horizon" aria-hidden="true" />

      <footer className="al-footer">
        <div className="al-disclaimer">
          <b>Example — brand reference only.</b> This page is placeholder styling
          to demonstrate the Altrocks torn-paper brand. The family details are
          illustrative.
        </div>
        <div className="al-footer__row">
          <span className="al-wordmark al-wordmark--sm">ALTROCKS</span>
          <span className="al-meta">Five people · five colors · one pile.</span>
        </div>
      </footer>
    </div>
  );
}
