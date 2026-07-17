import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Registry — look & voice for LLM clients",
  description:
    "A public registry of brand guidelines. Browse each brand's look & voice, or connect an LLM client to the MCP endpoint to pull them on demand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Brand showcase fonts are loaded here at runtime (rather than via
          next/font) so the build never depends on fetching fonts. Each brand's
          theme in lib/themes.ts references these families by name.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,400;1,9..144,600&family=Nunito+Sans:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
