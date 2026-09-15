// Provider-agnostic event tracking — see docs/conversion-strategy.md's
// "Analytics Events" section for the full event list and why no vendor is
// wired in yet. Pushes to window.dataLayer (GTM/GA4-compatible) if it
// exists; no-ops otherwise, so this is safe to call before any analytics
// container is actually installed.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "assessment_started"
  | "assessment_completed"
  | "discovery_call_clicked"
  | "contact_form_submitted"
  | "case_study_viewed"
  | "partner_with_us_clicked";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event, ...data });
}
