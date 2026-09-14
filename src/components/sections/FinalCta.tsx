import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

export function FinalCta() {
  return (
    <Section id="final-cta" tone="dark">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-3xl text-h2 font-bold text-soft-white text-balance">
          Let&apos;s figure out what your business should automate next.
        </h2>
        <p className="max-w-xl text-body-lg text-cool-gray text-pretty">
          Tell us how your business works today. We&apos;ll help identify where software,
          automation, or AI can make a meaningful difference.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button href={CTA_HREFS.bookDiscoveryCall} variant="primary">
            {CTA_LABELS.bookDiscoveryCall}
          </Button>
          <Button href={CTA_HREFS.startConversation} variant="secondary" onDark>
            {CTA_LABELS.startConversation}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
