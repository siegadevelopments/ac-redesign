import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { buildFaqJsonLd, buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const TITLE = "AI Software & Business Automation | Apprising Creatives";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "custom software development",
    "AI integration",
    "business automation",
    "workflow automation",
    "API integration",
    "application support",
    "software development partner",
    "agency development partner",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd(), buildFaqJsonLd()];

  return (
    <html lang="en-AU" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      {/* Browser extensions (ColorZilla, Grammarly, etc.) add attributes to
          <body> before React hydrates, which reports as a mismatch. This is
          shallow — it only covers this element's own attributes, so real
          mismatches inside the tree are still surfaced. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
