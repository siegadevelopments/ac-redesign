// Event tracking — see docs/conversion-strategy.md's "Analytics Events"
// section for the full event list. Sends through gtag when Google Analytics
// is loaded (src/components/analytics/GoogleAnalytics.tsx), otherwise pushes
// to window.dataLayer if a tag manager made one, and no-ops if neither
// exists, so it is always safe to call.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
  }
}

export type AnalyticsEvent =
  | "assessment_started"
  | "assessment_completed"
  | "discovery_call_clicked"
  | "contact_form_submitted"
  | "case_study_viewed"
  | "partner_with_us_clicked"
  | "headache_picked"
  | "problem_submitted"
  | "problem_failed";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, data);
    return;
  }
  window.dataLayer?.push({ event, ...data });
}
