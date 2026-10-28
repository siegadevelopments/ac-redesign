import { Workflow, Blocks, BrainCircuit, type LucideIcon } from "lucide-react";

export type Capability = {
  icon: LucideIcon;
  title: string;
  pitch: string;
  examples: string[];
  anchor: string;
  linkLabel: string;
};

// Three pillars, not four — the former fourth card ("Managed Application
// Support") is now the Business Systems Care Plan, a recurring offer
// documented in docs/offers.md rather than a homepage capability card.
// See docs/brand.md's repositioning note.
export const CAPABILITIES: Capability[] = [
  {
    icon: Workflow,
    title: "Business Automation",
    pitch: "Stop retyping the same information between your apps.",
    examples: [
      "Appointment reminders and follow-ups",
      "Connecting the apps you already use",
      "Client details that sync between systems",
      "Reports that build themselves",
      "Workflow automation",
      "Notifications that send themselves",
    ],
    anchor: "/what-we-can-build#solutions",
    linkLabel: "Explore business automation",
  },
  {
    icon: Blocks,
    title: "Custom Business Systems",
    pitch: "Replace spreadsheets and paper forms with one system built around how your team works.",
    examples: [
      "Booking and diary systems",
      "Online intake forms",
      "Quote and proposal builders",
      "Client portals",
      "Internal dashboards",
      "Business management systems",
    ],
    anchor: "/what-we-can-build#solutions",
    linkLabel: "Explore custom business systems",
  },
  {
    icon: BrainCircuit,
    title: "AI Implementation",
    pitch: "Use AI where it saves real time, like sorting enquiries and reading documents, with a person checking the work.",
    examples: [
      "Enquiry triage",
      "Reading and filing documents",
      "Answers to common questions",
      "AI assistants for your team",
      "Lead qualification",
      "Knowledge assistants",
    ],
    anchor: "/what-we-can-build#solutions",
    linkLabel: "Explore AI implementation",
  },
];
