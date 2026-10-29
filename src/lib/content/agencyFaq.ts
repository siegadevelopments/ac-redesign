import type { FaqItem } from "@/lib/content/faq";

// Agency-specific FAQ, scoped to /for-agencies — moved out of the homepage
// FAQ in the 2026-09 repositioning (docs/seo.md §48). Addresses the
// objections documented in docs/target-audience.md's Agency Objections.
export const AGENCY_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Where are you based, and can we work in the same hours?",
    answer:
      "We're a small team based in the Philippines, not an Australian-incorporated company. Our working day overlaps with Australian business hours, so calls and quick questions are realistic.",
  },
  {
    question: "Will you take my client?",
    answer:
      "No. We support your client relationship rather than competing for it — you keep strategy, account management and commercial ownership, and we provide the engineering behind it.",
  },
  {
    question: "Will you work directly with our clients?",
    answer:
      "Only in the way you decide. Some agencies prefer us fully behind the scenes; others loop us into technical conversations directly. Either way, you set the boundary.",
  },
  {
    question: "How do you handle communication and quality?",
    answer:
      "With defined responsibilities, clear technical communication and written documentation. Testing, maintainability and handover quality are part of delivery, not an afterthought.",
  },
  {
    question: "Can you sign an NDA, and work under our brand?",
    answer:
      "Yes to both. We'll sign a confidentiality agreement before you share client details, and we can work white-label, behind your brand, if that's how you want to run it.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You or your client do. The code and IP go to the agency or client, with no lock-in.",
  },
];
