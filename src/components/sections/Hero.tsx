import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroSystemVisual } from "@/components/visuals/HeroSystemVisual";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

export function Hero() {
  return (
    <Section tone="dark">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent-inverse">
            Automation &amp; custom systems for Australian businesses
          </span>

          <h1 className="text-display font-extrabold text-ink-inverse text-balance">
            Your business runs on systems. We make them work smarter.
          </h1>

          <p className="max-w-lg text-body-lg text-ink-inverse-muted text-pretty">
            We help Australian businesses eliminate repetitive work, replace manual processes,
            and build custom systems using automation, AI, and modern software.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              href={CTA_HREFS.bookDiscoveryCall}
              variant="primary"
              analyticsEvent="discovery_call_clicked"
            >
              {CTA_LABELS.bookDiscoveryCall}
            </Button>
            <Button href={CTA_HREFS.exploreWhatWeBuild} variant="secondary" onDark>
              {CTA_LABELS.exploreWhatWeBuild}
            </Button>
          </div>

          <p className="pt-2 text-small text-ink-inverse-muted">
            Business automation. Custom business systems. AI implementation.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroSystemVisual />
        </div>
      </Container>
    </Section>
  );
}
