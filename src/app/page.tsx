import { OpeningChapter } from "@/components/story/OpeningChapter";
import { ProblemStory } from "@/components/story/ProblemStory";
import { HowWeWork } from "@/components/story/HowWeWork";
import { LegacyHashRedirect } from "@/components/story/LegacyHashRedirect";
import { Faq } from "@/components/sections/Faq";
import { FAQ_ITEMS } from "@/lib/content/faq";
import { buildFaqJsonLd } from "@/lib/seo";

// The short FAQ kept on the homepage; the same list feeds the FAQPage
// schema so the structured data always matches what is visible.
const HOMEPAGE_FAQ_QUESTIONS = [
  "Do I need custom software?",
  "What business processes can be automated?",
  "How much does business automation cost in Australia?",
  "How do you handle security?",
];
const HOMEPAGE_FAQ = FAQ_ITEMS.filter((item) => HOMEPAGE_FAQ_QUESTIONS.includes(item.question));

// Story order per the homepage story redesign plan: the mess becomes one
// system, pick your mess, how we work, then the problem box.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(HOMEPAGE_FAQ)) }}
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
      <Faq items={HOMEPAGE_FAQ} />
    </>
  );
}
