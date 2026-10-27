import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

export function FinalCta({
  heading = "Tell us what keeps eating your team's time.",
  body = "Describe how things work today. We'll tell you honestly whether software, automation or AI would make a real difference, and when it wouldn't.",
  primaryHref = CTA_HREFS.bookDiscoveryCall,
  primaryLabel = CTA_LABELS.bookDiscoveryCall,
  primaryAnalyticsEvent = "discovery_call_clicked" as const,
  secondaryHref = CTA_HREFS.viewCaseStudies,
  secondaryLabel = CTA_LABELS.viewCaseStudies,
}: {
  heading?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  primaryAnalyticsEvent?: "discovery_call_clicked" | "partner_with_us_clicked";
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <Section id="final-cta" tone="dark">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-3xl text-h2 font-bold text-ink-inverse text-balance">{heading}</h2>
        <p className="max-w-xl text-body-lg text-ink-inverse-muted text-pretty">{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button href={primaryHref} variant="primary" analyticsEvent={primaryAnalyticsEvent}>
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="secondary" onDark>
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
