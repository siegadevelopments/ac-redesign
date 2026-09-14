export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "We learn how your business currently works.",
  },
  {
    number: "02",
    title: "Identify",
    description:
      "We identify bottlenecks, repetitive work, disconnected systems, and opportunities.",
  },
  {
    number: "03",
    title: "Design",
    description: "We design the right technical solution.",
  },
  {
    number: "04",
    title: "Build",
    description: "We build and integrate the system.",
  },
  {
    number: "05",
    title: "Improve",
    description: "We continue improving it as your business evolves.",
  },
];

export const PROCESS_TRUST_NOTES = [
  "Not every problem needs AI.",
  "Not every workflow needs custom software.",
  "We recommend the simplest solution that solves the problem.",
];
