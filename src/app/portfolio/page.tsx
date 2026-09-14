import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FinalCta } from "@/components/sections/FinalCta";
import { PORTFOLIO_ITEMS } from "@/lib/content/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A look at what Apprising Creatives has built — client engagements and internal products, clearly labeled.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <Section tone="dark">
        <Container className="flex flex-col gap-6">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-teal-light">
            Portfolio
          </span>
          <h1 className="max-w-3xl text-display font-extrabold text-soft-white text-balance">
            What we&apos;ve built.
          </h1>
          <p className="max-w-2xl text-body-lg text-cool-gray text-pretty">
            A mix of client engagements and internal products. Each is labeled clearly below — we
            never present a demo or internal build as client work.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading title="Selected work" />

          <div className="grid gap-8 md:grid-cols-2">
            {PORTFOLIO_ITEMS.map((item) => (
              <Card key={item.title} className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-h4 font-bold text-charcoal">{item.title}</h2>
                  <Badge onDark={false}>{item.badgeLabel}</Badge>
                </div>
                <p className="text-body text-charcoal-muted">{item.summary}</p>
                <ul className="flex flex-col gap-2 pt-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="text-small text-charcoal-muted">
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-small font-semibold text-charcoal hover:text-teal"
                >
                  Visit {item.title}
                  <ExternalLink className="text-teal" size={15} aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
