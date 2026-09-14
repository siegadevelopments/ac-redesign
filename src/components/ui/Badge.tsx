import type { ReactNode } from "react";

const TONE_CLASSES = {
  // Teal text reads clearly against a dark card (SolutionExamples).
  dark: "border-teal/40 bg-teal/10 text-teal-light",
  // Charcoal text on light cards — teal-light text on white falls short of
  // WCAG AA at this size, so the tint stays teal but the text goes dark.
  light: "border-teal/30 bg-teal/10 text-charcoal",
};

export function Badge({
  children,
  onDark = true,
}: {
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-label font-semibold uppercase tracking-[0.12em] ${
        TONE_CLASSES[onDark ? "dark" : "light"]
      }`}
    >
      {children}
    </span>
  );
}
