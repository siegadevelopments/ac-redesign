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
    pitch: "Eliminate repetitive work between your systems.",
    examples: [
      "Workflow automation",
      "CRM integrations",
      "API connections",
      "Data synchronization",
      "Automated reporting",
      "Notifications",
    ],
    anchor: "#solutions",
    linkLabel: "Explore business automation",
  },
  {
    icon: Blocks,
    title: "Custom Business Systems",
    pitch: "Replace spreadsheets and disconnected processes with software designed around your business.",
    examples: [
      "Automated quotation systems",
      "Booking systems",
      "Internal dashboards",
      "Customer portals",
      "Business management systems",
      "API integrations",
    ],
    anchor: "#solutions",
    linkLabel: "Explore custom business systems",
  },
  {
    icon: BrainCircuit,
    title: "AI Implementation",
    pitch: "Put AI into real workflows where it can improve productivity, service, or decision-making.",
    examples: [
      "AI assistants",
      "Document processing",
      "Enquiry handling",
      "Lead qualification",
      "Knowledge assistants",
      "AI-powered internal tools",
    ],
    anchor: "#solutions",
    linkLabel: "Explore AI implementation",
  },
];
