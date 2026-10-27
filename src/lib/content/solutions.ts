export type SolutionExample = {
  title: string;
  description: string;
  features: string[];
};

// Industry-neutral use-case concepts — supports testing multiple verticals
// rather than committing to one (see docs/target-audience.md). Still
// explicitly "Concept," not client work — see SolutionExamples.tsx's
// disclaimer and docs/case-studies.md for where real client work lives.
export const SOLUTION_EXAMPLES: SolutionExample[] = [
  {
    title: "Automated Quotation System",
    description:
      "A concept for turning back-and-forth quoting and proposals into a fast, tidy workflow.",
    features: [
      "Guided quote builder",
      "Automatic pricing rules",
      "Instant PDF generation",
      "Follow-up notifications",
    ],
  },
  {
    title: "Booking & Scheduling System",
    description:
      "A concept for bringing bookings, availability, client details and reminders into one place, so the diary stops fighting you.",
    features: [
      "Online bookings",
      "Real-time availability",
      "Automatic reminders",
      "Payment integration",
    ],
  },
  {
    title: "Internal Business Dashboard",
    description:
      "A concept for giving owners and managers one live view of how the business is running, instead of five spreadsheets.",
    features: [
      "Centralized reporting",
      "Role-based access",
      "Live data instead of static spreadsheets",
      "Custom views per team",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "A concept for connecting the tools you already use, so a new client's details move from the form to the diary to the invoice without anyone retyping them.",
    features: [
      "System-to-system data sync",
      "Automated notifications",
      "Conditional workflows",
      "Reduced manual handling",
    ],
  },
  {
    title: "AI Business Assistant",
    description:
      "A concept for an AI assistant that helps your team find information, read documents or sort incoming enquiries.",
    features: [
      "Document intelligence",
      "Enquiry triage",
      "Knowledge retrieval",
      "Human review built in",
    ],
  },
  {
    title: "Custom Business Platform",
    description:
      "A concept for the system you need when off-the-shelf software doesn't fit how your team actually works.",
    features: [
      "Built around your workflow",
      "Custom access levels",
      "API integrations",
      "Room to grow with the business",
    ],
  },
];
