export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

// Steps renamed 2026-09 (Discover/Diagnose/Design/Build/Optimise) to match
// docs/landing-page.md — same five-step shape and philosophy as before,
// see PROCESS_TRUST_NOTES below.
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "We learn how your team actually works today.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "We find the bottlenecks, repeated work and disconnected tools.",
  },
  {
    number: "03",
    title: "Design",
    description: "We design the simplest system that fixes them.",
  },
  {
    number: "04",
    title: "Build",
    description: "We build it and connect it to the tools you already use.",
  },
  {
    number: "05",
    title: "Optimise",
    description: "We keep improving it as your business changes.",
  },
];

export const PROCESS_TRUST_NOTES = [
  "Not every problem needs AI.",
  "Not every workflow needs custom software.",
  "We recommend the simplest solution that solves the problem.",
];
