export const SITE_NAME = "Apprising Creatives";
// Legal entity name, per docs/seo.md §23 (entity consistency).
export const SITE_LEGAL_NAME = "Apprising Corporation";
export const SITE_TAGLINE = "Your business runs on systems. We make them work smarter.";
export const SITE_DESCRIPTION =
  "Apprising Creatives helps Australian businesses eliminate repetitive work and modernise operations with automation, AI, and custom business systems.";

// The real, live domain (apprisingcreatives.com) — this comment previously
// called it a placeholder from before the domain went live; fixed 2026-09.
export const SITE_URL = "https://www.apprisingcreatives.com";

// mailto CTAs (Partner With Us, the "email us directly" fallback) derive
// from this. The primary Assessment CTA no longer uses mailto — see
// CTA_HREFS.bookDiscoveryCall below and docs/project-context.md's
// "Assessment Funnel" section.
export const CONTACT_EMAIL = "info@apprisingcreatives.com";

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// CTA hierarchy fixed sitewide per docs/conversion-strategy.md — avoid
// introducing new CTA wording elsewhere; add a variant there first.
export const CTA_HREFS = {
  bookDiscoveryCall: "/discovery-call",
  exploreWhatWeBuild: "#solutions",
  viewCaseStudies: "/portfolio",
  partnerWithUs: mailto("Agency Partnership"),
  startConversation: mailto("Getting Started"),
};

export const CTA_LABELS = {
  bookDiscoveryCall: "Book a Free Automation Assessment",
  exploreWhatWeBuild: "See What We Can Automate",
  viewCaseStudies: "View Case Studies",
  partnerWithUs: "Partner With Us",
  startConversation: "Email Us Directly",
};
