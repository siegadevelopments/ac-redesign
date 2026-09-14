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
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-teal-light">
            Engineering partner for Australian businesses and agencies
          </span>

          <h1 className="text-display font-extrabold text-soft-white text-balance">
            Build the systems behind a better business.
          </h1>

          <p className="max-w-lg text-body-lg text-cool-gray text-pretty">
            We design and build custom software, AI integrations, and automated workflows that
            help growing businesses operate with less friction and more intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href={CTA_HREFS.bookDiscoveryCall} variant="primary">
              {CTA_LABELS.bookDiscoveryCall}
            </Button>
            <Button href={CTA_HREFS.exploreWhatWeBuild} variant="secondary" onDark>
              {CTA_LABELS.exploreWhatWeBuild}
            </Button>
          </div>

          <p className="pt-2 text-small text-cool-gray">
            Custom software. AI integration. Automation. Long-term technical support.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroSystemVisual />
        </div>
      </Container>
    </Section>
  );
}
