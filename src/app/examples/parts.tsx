import Link from "next/link";

/**
 * Shared pieces for the Scott Wittrock example sites. Static (server)
 * components — the two sites use real routes and real navigation.
 */

/** Context banner: marks the page as an example and shows its "real" URL. */
export function Ribbon({ url }: { url: string }) {
  return (
    <div className="sw-ribbon">
      <span>
        Example site · <span className="sw-url">{url}</span>
      </span>
      <span>
        <Link href="/">← Brand Registry</Link>
      </span>
    </div>
  );
}

/**
 * Example disclaimer — rendered in the brand's "Notepad" cream highlight.
 * `prominent` spells out that the résumé content in particular is invented.
 */
export function Disclaimer({ prominent = false }: { prominent?: boolean }) {
  return (
    <div className="sw-disclaimer">
      <span className="sw-dot" aria-hidden="true" />
      <span>
        <b>Example — brand reference only.</b> This page is placeholder styling to
        demonstrate the Scott Wittrock brand.{" "}
        {prominent
          ? "Every company, role, number, and date on this résumé is made up, illustrative, and not proofed for accuracy — it is not a statement of fact about anyone."
          : "The content is illustrative and made up, not proofed for accuracy."}
      </span>
    </div>
  );
}

/** Cross-reference callout linking one property to the other. */
export function CrossLink({
  href,
  title,
  blurb,
  cta,
}: {
  href: string;
  title: string;
  blurb: string;
  cta: string;
}) {
  return (
    <Link className="sw-xlink" href={href}>
      <span className="sw-dot" aria-hidden="true" />
      <span className="sw-xbody">
        <b>{title}</b>
        <span>{blurb}</span>
      </span>
      <span className="sw-btn sw-btn--solid">
        {cta} <span className="sw-arw">→</span>
      </span>
    </Link>
  );
}

/**
 * The runway of essay titles from the brand's voice.md — the publication's
 * three pillars and the anchor/field-note cadence. Shared by the HQ writing
 * teaser and the publication index so both stay in sync.
 */
export const ESSAYS = [
  {
    title: "When something else acts on your data",
    dek: "As agents become a surface, the trust burden goes up, not down. Who is reaching into the data, and on whose behalf.",
    pillar: "The data underneath",
    meta: "Anchor · 2026",
  },
  {
    title: "The connected product: one capability, three front doors",
    dek: "UI, chat, and API as one surface, not three tickets — where people and data meet.",
    pillar: "Surfaces",
    meta: "Anchor · 2026",
  },
  {
    title: "Developer experience is a matter of taste",
    dek: "Treating DX as one surface instead of three tickets made integration roughly three times faster.",
    pillar: "Surfaces",
    meta: "Anchor · 2026",
  },
  {
    title: "What building a freemium SaaS taught me about conversion",
    dek: "One capability across UI, chat, and API — and what shipping it on my own time taught me.",
    pillar: "Building in the open",
    meta: "Anchor · 2026",
  },
];
