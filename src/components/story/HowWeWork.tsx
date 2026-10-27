import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS, PROCESS_TRUST_NOTES } from "@/lib/content/process";

// The honest-approach chapter between "pick your mess" and the problem
// box (R15). Server-rendered and passed into ProblemStory as children.
export function HowWeWork() {
  return (
    <Section id="how-we-work" tone="raised">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeading eyebrow="How we work" title="We don't start with technology." />
          <ul className="flex flex-col gap-3">
            {PROCESS_TRUST_NOTES.map((note) => (
              <li key={note} className="flex gap-3 text-body-lg text-ink">
                <span className="text-accent" aria-hidden="true">
                  —
                </span>
                {note}
              </li>
            ))}
          </ul>
          <p className="text-body text-ink-muted">
            Sometimes the honest answer is that you don&apos;t need new software at all.{" "}
            <Link href="/portfolio" className="font-semibold text-accent underline underline-offset-4 hover:text-accent-strong">
              See a real project we built
            </Link>
            .
          </p>
        </div>

        <ol className="flex flex-col lg:col-span-7">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-5">
              <span className="font-display text-h4 font-bold text-accent" aria-hidden="true">
                {step.number}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-h4 font-bold text-ink">{step.title}</h3>
                <p className="text-body text-ink-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
