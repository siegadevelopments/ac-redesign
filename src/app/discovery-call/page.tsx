import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
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
      <Section tone="dark">
        <Container className="flex flex-col gap-6">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-teal-light">
            {DISCOVERY_CALL_COPY.eyebrow}
          </span>
          <h1 className="max-w-3xl text-display font-extrabold text-soft-white text-balance">
            {DISCOVERY_CALL_COPY.title}
          </h1>
          <p className="max-w-2xl text-body-lg text-cool-gray text-pretty">
            {DISCOVERY_CALL_COPY.subhead}
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <ol className="flex flex-col gap-6">
              {ASSESSMENT_STEPS.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal bg-white text-label font-semibold text-teal"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div className="flex flex-col gap-1 pt-1.5">
                    <h3 className="text-h4 font-bold text-charcoal">{step.title}</h3>
                    <p className="text-body text-charcoal-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-(--radius-card) border border-line-light bg-white p-6">
              <p className="text-body text-charcoal-muted text-pretty">{ASSESSMENT_HONESTY_NOTE}</p>
            </div>

            <div className="flex flex-col gap-2 border-t border-line-light pt-6">
              <h3 className="text-small font-semibold uppercase tracking-[0.12em] text-charcoal-muted">
                If a build is justified
              </h3>
              <p className="text-body text-charcoal-muted text-pretty">
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
