import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/visuals/RevealOnScroll";

/**
 * Shared opening for secondary pages: warm-paper surface, oversized heading,
 * accent eyebrow and a hairline rule. Light motion only; content is fully
 * visible without JavaScript or with reduced motion.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
}) {
  return (
    <Section tone="light" className="pb-12 md:pb-16 lg:pb-20">
      <Container>
        <RevealOnScroll className="flex flex-col gap-8 border-b border-line pb-12 md:gap-10 md:pb-16">
          <span className="reveal-item text-label font-semibold uppercase tracking-[0.12em] text-accent">
            {eyebrow}
          </span>
          <h1
            className="reveal-item max-w-4xl text-display font-extrabold text-ink text-balance"
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
          >
            {title}
          </h1>
          <p
            className="reveal-item max-w-2xl text-body-lg text-ink-muted text-pretty"
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
          >
            {lead}
          </p>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
