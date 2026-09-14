import type { ReactNode } from "react";

export type Tone = "dark" | "light" | "raised";

const TONE_CLASSES: Record<Tone, string> = {
  dark: "bg-deep-navy text-soft-white",
  light: "bg-warm-white text-charcoal",
  raised: "bg-white text-charcoal",
};

export function Section({
  id,
  tone = "light",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 lg:py-32 ${TONE_CLASSES[tone]} ${className}`}>
      {children}
    </section>
  );
}
