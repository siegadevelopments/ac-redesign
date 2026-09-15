import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Capabilities } from "@/components/sections/Capabilities";
import { SolutionExamples } from "@/components/sections/SolutionExamples";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { TechCapabilities } from "@/components/sections/TechCapabilities";
import { WhyApprising } from "@/components/sections/WhyApprising";
import { Newsletter } from "@/components/sections/Newsletter";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildFaqJsonLd } from "@/lib/seo";

// Section order per docs/landing-page.md's "Section Order" (SME-first,
// revised 2026-09). "For Agencies" moved to /for-agencies — see
// docs/brand.md's repositioning note.
export default function Home() {
  return (
    <>
      {/* FAQPage schema lives here, not the root layout, so it only ships
          on the page where the matching FAQ content is actually visible. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd()) }}
      />
      <Hero />
      <Problem />
      <Capabilities />
      <SolutionExamples />
      <Process />
      <Industries />
      <TechCapabilities />
      <WhyApprising />
      <Newsletter />
      <Faq />
      <FinalCta />
    </>
  );
}
