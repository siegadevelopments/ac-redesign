export type FaqItem = {
  question: string;
  answer: string;
  /** Shown in the short homepage FAQ (and its FAQPage schema). */
  homepage?: boolean;
};

// Homepage FAQ — SME/automation intent only as of 2026-09. The two purely
// agency-specific questions moved to agencyFaq.ts (docs/seo.md §48), since a
// homepage FAQPage schema mixing SME and agency intent dilutes both.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need custom software?",
    homepage: true,
    answer:
      "Not necessarily. We first look at the business problem and determine whether existing software, integration, automation or custom development is the most practical solution.",
  },
  {
    question: "Can you integrate AI into an existing system?",
    answer:
      "Yes. AI can often be introduced into an existing workflow rather than requiring an entirely new platform.",
  },
  {
    question: "What business processes can be automated?",
    homepage: true,
    answer:
      "Anything repetitive and rule-based — quoting, booking, reporting, data entry between systems, customer notifications, and document handling are the most common starting points. The Free Automation Assessment identifies which ones apply to your business specifically.",
  },
  {
    question: "How much does business automation cost in Australia?",
    homepage: true,
    answer:
      "It depends on scope. Implementation projects typically range from AUD $5,000–$15,000+ depending on complexity, with ongoing support available afterward. We only give a specific figure after understanding the actual workflow — not before.",
  },
  {
    question: "Should my business build custom software or use SaaS?",
    answer:
      "Often SaaS is the right answer, and we'll tell you that directly. Custom software makes sense when your workflow doesn't fit existing tools, when you're paying for multiple disconnected subscriptions, or when integration between systems becomes the real cost.",
  },
  {
    question: "How do you handle security?",
    homepage: true,
    answer:
      "Every system we build uses secure authentication, access control, and secure API design as standard practice, not an add-on. We don't hold formal compliance certifications, and we're direct about that rather than implying otherwise.",
  },
];

export const HOMEPAGE_FAQ_ITEMS = FAQ_ITEMS.filter((item) => item.homepage);
