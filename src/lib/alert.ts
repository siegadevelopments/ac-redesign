// Pushes a short alert to the founder's phone through ntfy (https://ntfy.sh)
// when a form route breaks. It is a separate channel on purpose: if Resend is
// the thing failing, an email alert would fail with it.
//
// Alerts never contain visitor details (no names, emails or message text),
// because ntfy topics are only protected by an unguessable name. Best-effort:
// it never throws and never changes a route's response. Set ALERT_NTFY_URL
// (e.g. https://ntfy.sh/<private-topic>) to turn it on; without it this is a no-op.
import { checkRateLimit } from "@/lib/rateLimit";

const ALERT_TIMEOUT_MS = 3000;
// One alert per category per window per server instance, so an outage under
// traffic can't bury the phone.
const ALERT_WINDOW_MS = 10 * 60 * 1000;

/** ntfy priorities: 5 urgent, 4 high, 3 default. Headers must stay ASCII. */
export async function sendAlert(category: string, message: string, priority: 3 | 4 | 5 = 4) {
  const url = process.env.ALERT_NTFY_URL;
  if (!url) return;
  if (checkRateLimit(`alert:${category}`, 1, ALERT_WINDOW_MS)) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: AbortSignal.timeout(ALERT_TIMEOUT_MS),
      headers: {
        Title: `Apprising site: ${category}`,
        Priority: String(priority),
        Tags: priority === 5 ? "rotating_light" : "warning",
      },
      body: message,
    });
    if (!response.ok) console.error(`Alert delivery failed (${response.status})`);
  } catch (error) {
    console.error("Alert delivery failed:", error);
  }
}
