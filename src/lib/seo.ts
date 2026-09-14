import {
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/content/faq";

/**
 * Schema is deliberately limited to facts the site can actually support.
 * docs/seo.md §19 forbids inventing reviews, ratings, awards, locations,
 * employee counts or certifications — so none are declared here, and no
 * address is claimed (§17: no fabricated Australian local signals).
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    knowsAbout: [
      "Custom software development",
      "AI integration",
      "Business automation",
      "Workflow automation",
      "API and systems integration",
      "Managed application support",
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Mirrors the visible FAQ section — required for FAQPage to be legitimate. */
export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
