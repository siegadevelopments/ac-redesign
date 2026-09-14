export const SITE_NAME = "Apprising Creatives";
// Legal entity name, per docs/seo.md §23 (entity consistency).
export const SITE_LEGAL_NAME = "Apprising Corporation";
export const SITE_TAGLINE = "We build the systems behind better businesses.";
export const SITE_DESCRIPTION =
  "Apprising Creatives builds custom software, AI integrations and business automation systems for growing businesses and technology agencies.";

// PLACEHOLDER — no real domain has been assigned yet. Update before launch.
export const SITE_URL = "https://www.apprisingcreatives.com";

// Every email CTA derives from this, so changing it updates them all.
// No booking tool is wired up yet — swap CTA_HREFS for a scheduling link
// (Calendly/Cal.com) or a /contact route when one is chosen.
export const CONTACT_EMAIL = "info@apprisingcreatives.com";

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export const CTA_HREFS = {
  bookDiscoveryCall: mailto("Discovery Call"),
  exploreWhatWeBuild: "#what-we-do",
  partnerWithUs: mailto("Agency Partnership"),
  startConversation: mailto("Getting Started"),
};

export const CTA_LABELS = {
  bookDiscoveryCall: "Book a Discovery Call",
  exploreWhatWeBuild: "Explore What We Build",
  partnerWithUs: "Partner With Us",
  startConversation: "Start a Conversation",
};
