import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "@emcy/docs/styles.css";
import "./globals.css";
import { defaultSiteLocale } from "@/lib/site-i18n";

const manrope = Manrope({
  variable: "--font-sans-ui",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EmcyDocs | App Router-native docs for Next.js",
  description:
    "EmcyDocs is an App Router-native MDX documentation library for Next.js with locale-aware routes, a flexible theme system, built-in mobile docs UX, search, TOC, and customizable docs chrome.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' y1='0' x2='32' y2='32'><stop stop-color='%23a855f7'/><stop offset='1' stop-color='%237c3aed'/></linearGradient></defs><rect width='32' height='32' rx='8' fill='url(%23g)'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultSiteLocale}>
      <body className={`${manrope.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
