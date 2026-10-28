import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

// Adds the motion class before first paint so the opening chapter's start
// state never flashes. If the story script hasn't arrived within 5s (slow or
// failed chunk), drop the class so the finished, readable state shows instead
// of a hidden headline. Pages without the story lose nothing: only the
// opening chapter's CSS reads the class.
const MOTION_FLAG_SCRIPT =
  'try{if(matchMedia("(prefers-reduced-motion: no-preference)").matches){var d=document.documentElement;d.classList.add("motion");setTimeout(function(){if(!window.__storyReady)d.classList.remove("motion")},5000)}}catch(e){}';

const TITLE = "Business Automation & Custom Software | Apprising Creatives";

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
    "business automation Australia",
    "AI automation for small business Australia",
    "custom business software Australia",
    "business process automation Australia",
    "custom internal software Australia",
    "AI implementation Australia",
    "workflow automation Australia",
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
  // Organization/WebSite are true sitewide facts, so they belong here.
  // FAQPage previously lived here too and was injected on every route,
  // including ones with no visible FAQ content (e.g. /about, /portfolio) —
  // a schema/content mismatch. It's now added by the homepage itself
  // (src/app/page.tsx) instead, where the matching FAQ is actually visible.
  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];

  return (
    // suppressHydrationWarning: the pre-paint script below adds `motion` to
    // this element's class before React hydrates. Shallow, like on <body>.
    <html
      lang="en-AU"
      className={`${instrumentSans.variable} ${bricolageGrotesque.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint motion flag (plan KTD1). Runs before first paint so the
            homepage story's start state and track height are in place from
            the first frame, with nothing jumping at hydration. No-JS and
            reduced-motion visitors never get the class, so they see the
            finished, static page. Allowed by the CSP's 'unsafe-inline'. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG_SCRIPT }} />
      </head>
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
