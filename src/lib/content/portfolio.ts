type PortfolioKind = "client" | "internal";

export type PortfolioItem = {
  kind: PortfolioKind;
  badgeLabel: string;
  title: string;
  summary: string;
  features: string[];
  url: string;
};

// Facts here come from what's actually published on each site — no invented
// metrics, testimonials, or certifications. See docs/seo.md §19/§24/§25 and
// CLAUDE.md's "Do not invent" rule.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    kind: "client",
    badgeLabel: "Client Project",
    title: "Lifestyle Medicine Gateway",
    summary:
      "A full platform build for an Australian wellness marketplace connecting people with evidence-based health products and guidance.",
    features: [
      "Curated marketplace of Australian wellness brands",
      "Goal-based shopping across categories like sleep, gut health, and stress management",
      "Educational content — articles, guides, and research",
      "A vendor platform for practitioners and brands to list products",
    ],
    url: "https://www.lifestylemedicinegateway.com/",
  },
  {
    kind: "internal",
    badgeLabel: "Internal Product",
    title: "MediFlow",
    summary:
      "An internal product exploring AI-powered clinic management — built and hosted by Apprising, not a client engagement.",
    features: [
      "Appointment scheduling with real-time availability",
      "Digital patient intake and records",
      "Staff scheduling and role-based access",
      "AI-assisted consultation documentation",
    ],
    url: "https://mediflow.apprisingcreatives.com/",
  },
];
