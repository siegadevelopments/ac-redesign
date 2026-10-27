import { OpeningChapter } from "@/components/story/OpeningChapter";
import { ProblemStory } from "@/components/story/ProblemStory";
import { HowWeWork } from "@/components/story/HowWeWork";
import { LegacyHashRedirect } from "@/components/story/LegacyHashRedirect";
import { Faq } from "@/components/sections/Faq";
import { HOMEPAGE_FAQ_ITEMS } from "@/lib/content/faq";
import { buildFaqJsonLd } from "@/lib/seo";

// Story order per the homepage story redesign plan: the mess becomes one
// system, pick your mess, how we work, then the problem box.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(HOMEPAGE_FAQ_ITEMS)) }}
      />
      <LegacyHashRedirect />
      <a
        href="#problem"
        className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-4 focus:z-50 focus:rounded-(--radius-btn) focus:bg-surface-raised focus:px-4 focus:py-3 focus:text-ink focus:shadow"
      >
        Skip to tell us your problem
      </a>
      <OpeningChapter />
      <ProblemStory>
        <HowWeWork />
      </ProblemStory>
      {/* The same short list feeds the FAQPage schema above, so it always matches. */}
      <Faq items={HOMEPAGE_FAQ_ITEMS} />
    </>
  );
}
