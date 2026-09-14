export type FaqItem = {
  question: string;
  answer: string;
};

// Answers 1–3 are taken from docs/seo.md §20. Answers 4–5 address the agency
// objections documented in docs/target-audience.md §5.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need custom software?",
    answer:
      "Not necessarily. We first look at the business problem and determine whether existing software, integration, automation or custom development is the most practical solution.",
  },
  {
    question: "Can you integrate AI into an existing system?",
    answer:
      "Yes. AI can often be introduced into an existing workflow rather than requiring an entirely new platform.",
  },
  {
    question: "Do you work with agencies?",
    answer:
      "Yes. Apprising can provide engineering capacity behind agencies delivering software, AI, automation and integration projects.",
  },
  {
    question: "Will you work directly with our clients?",
    answer:
      "Only in the way you decide. We support your client relationship rather than competing for it — you keep strategy, account management and commercial ownership, and we provide the engineering behind it.",
  },
  {
    question: "How do you handle communication and quality?",
    answer:
      "With defined responsibilities, clear technical communication and written documentation. Testing, maintainability and handover quality are part of delivery, not an afterthought.",
  },
];
