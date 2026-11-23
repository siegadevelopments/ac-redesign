"use client";

import { useSearchParams } from "next/navigation";
import { ASSESSMENT_PRICING_TEXT } from "@/lib/content/assessment";

const CLASSES = "text-body text-ink-muted text-pretty";

/** The server-rendered default: the Australian range. Also the Suspense fallback. */
export function ProjectPricingFallback() {
  return <p className={CLASSES}>{ASSESSMENT_PRICING_TEXT.au}</p>;
}

/**
 * Shows the USD range to visitors sent here from /us (`?region=us`) and the
 * Australian range to everyone else. It reads the query on the client, so
 * /discovery-call stays a statically generated page.
 */
export function ProjectPricingNote() {
  const region = useSearchParams().get("region") === "us" ? "us" : "au";
  return <p className={CLASSES}>{ASSESSMENT_PRICING_TEXT[region]}</p>;
}
