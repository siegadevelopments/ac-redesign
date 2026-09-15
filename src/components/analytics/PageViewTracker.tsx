"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Fires one analytics event on mount, renders nothing — lets an otherwise
 * server-rendered page track a page view without becoming a client component
 * itself. See docs/conversion-strategy.md's Analytics Events section. */
export function PageViewTracker({ event }: { event: AnalyticsEvent }) {
  useEffect(() => {
    trackEvent(event);
  }, [event]);

  return null;
}
