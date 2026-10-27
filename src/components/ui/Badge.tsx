import type { ReactNode } from "react";

const TONE_CLASSES = {
  // Accent-inverse text reads clearly against a dark card (SolutionExamples).
  dark: "border-accent-inverse/40 bg-accent-inverse/10 text-accent-inverse",
  // Ink text on light cards: the tint stays accent but the text goes dark,
  // so small uppercase labels keep a wide contrast margin.
  light: "border-accent/30 bg-accent/10 text-ink",
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
