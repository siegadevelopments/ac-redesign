import type { ReactNode } from "react";

export type Tone = "dark" | "light" | "raised";

// Tones map onto the role tokens: dark → inverse, light → surface,
// raised → raised surface. Each also sets the focus-ring colour that meets
// 3:1 on that surface (see :focus-visible in globals.css).
const TONE_CLASSES: Record<Tone, string> = {
  dark: "bg-surface-inverse text-ink-inverse [--focus-ring:var(--color-accent-inverse)]",
  light: "bg-surface text-ink [--focus-ring:var(--color-accent)]",
  raised: "bg-surface-raised text-ink [--focus-ring:var(--color-accent)]",
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
