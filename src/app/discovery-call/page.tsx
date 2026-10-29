import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { AssessmentForm } from "@/components/sections/AssessmentForm";
import {
  ASSESSMENT_HONESTY_NOTE,
  ASSESSMENT_STEPS,
  DISCOVERY_CALL_COPY,
} from "@/lib/content/assessment";

export const metadata: Metadata = {
  title: "Free Business Automation Assessment",
  description:
    "Book a free 20-minute Business Automation Assessment. We'll look at how your business actually operates and tell you honestly whether automation, custom software, or AI is justified.",
  alternates: { canonical: "/discovery-call" },
};

export default function DiscoveryCallPage() {
  return (
    <>
      <PageHero
        eyebrow={DISCOVERY_CALL_COPY.eyebrow}
        title={DISCOVERY_CALL_COPY.title}
        lead={DISCOVERY_CALL_COPY.subhead}
      />

      <Section tone="light" className="pt-0 md:pt-0 lg:pt-0">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <ol className="flex flex-col gap-6">
              {ASSESSMENT_STEPS.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-surface-raised text-label font-semibold text-accent"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div className="flex flex-col gap-1 pt-1.5">
                    <h2 className="text-h4 font-bold text-ink">{step.title}</h2>
                    <p className="text-body text-ink-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-(--radius-card) border border-line bg-surface-raised p-6">
              <p className="text-body text-ink-muted text-pretty">{ASSESSMENT_HONESTY_NOTE}</p>
            </div>

            <div className="flex flex-col gap-2 border-t border-line pt-6">
              <h2 className="text-small font-semibold uppercase tracking-[0.12em] text-ink-muted">
                If a build is justified
              </h2>
              <p className="text-body text-ink-muted text-pretty">
                Implementation projects typically range from AUD $5,000–$15,000+ depending on
                scope — always confirmed after the assessment, never quoted sight-unseen.
                Ongoing systems can move onto a Business Systems Care Plan once live.
              </p>
            </div>
          </div>

          <div id="assessment-form">
            <AssessmentForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
