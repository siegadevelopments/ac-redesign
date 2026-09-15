export const DISCOVERY_CALL_COPY = {
  eyebrow: "Free Business Automation Assessment",
  title: "Let's find the work your business shouldn't be doing manually.",
  subhead:
    "A free 20-minute call to understand how your business actually operates, and whether automation, custom software, or AI is genuinely justified — not a sales pitch dressed up as a consultation.",
} as const;

export type AssessmentStep = {
  number: string;
  title: string;
  description: string;
};

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    number: "01",
    title: "We understand your workflow",
    description: "How the work actually happens today, not how the org chart says it should.",
  },
  {
    number: "02",
    title: "We identify bottlenecks",
    description: "Where time, accuracy, or visibility are being lost.",
  },
  {
    number: "03",
    title: "We identify automation opportunities",
    description: "What could realistically be automated, integrated, or rebuilt.",
  },
  {
    number: "04",
    title: "We determine whether software or AI is justified",
    description: "Sometimes the honest answer is no — see below.",
  },
  {
    number: "05",
    title: "We recommend the smallest practical solution",
    description: "The simplest thing that actually solves the problem, not the biggest thing we could sell.",
  },
];

export const ASSESSMENT_HONESTY_NOTE =
  "Apprising doesn't automatically recommend software for every problem. If the call concludes that your existing tools already do the job, we'll say so — that's still a useful 20 minutes, not a failed sales call.";

export const ASSESSMENT_FORM_COPY = {
  formTitle: "Book your free assessment",
  submitLabel: "Book My Free Assessment",
  successMessage:
    "Thanks — we've received your answers. A real person will review them and reach out to schedule your call.",
  errorMessage: "Something went wrong submitting the form. Please try again or email us directly.",
  privacyNote: "No obligation, no generic pitch. Used only to prepare for your call.",
} as const;
