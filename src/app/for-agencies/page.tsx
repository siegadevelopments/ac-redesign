import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ForAgencies } from "@/components/sections/ForAgencies";
import { TechCapabilities } from "@/components/sections/TechCapabilities";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { AGENCY_FAQ_ITEMS } from "@/lib/content/agencyFaq";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "For Agencies",
  description:
    "Apprising Creatives partners with Australian agencies and consultancies that need reliable engineering capacity for custom software, AI integrations, and automation.",
  alternates: { canonical: "/for-agencies" },
};

export default function ForAgenciesPage() {
  return (
    <>
      <Section tone="dark">
        <Container className="flex flex-col gap-6">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent-inverse">
            For Agencies
          </span>
          <h1 className="max-w-3xl text-display font-extrabold text-ink-inverse text-balance">
            Engineering capacity for Australian agencies.
          </h1>
          <p className="max-w-2xl text-body-lg text-ink-inverse-muted text-pretty">
            Apprising Creatives works behind the scenes as an engineering partner for agencies
            and consultancies that need additional technical delivery capacity — custom
            software, AI integrations, and complex automation.
          </p>
        </Container>
      </Section>

      <ForAgencies />

      <TechCapabilities />

      <Faq
        id="agency-faq"
        eyebrow="Agency Questions"
        title="Common questions from agencies."
        items={AGENCY_FAQ_ITEMS}
      />

      <FinalCta
        heading="Work with us as an extension of your delivery team."
        body="Tell us what you're delivering and where you need engineering capacity. We'll take it from there."
        primaryHref={CTA_HREFS.partnerWithUs}
        primaryLabel={CTA_LABELS.partnerWithUs}
        primaryAnalyticsEvent="partner_with_us_clicked"
        secondaryHref={CTA_HREFS.viewCaseStudies}
        secondaryLabel={CTA_LABELS.viewCaseStudies}
      />
    </>
  );
}
