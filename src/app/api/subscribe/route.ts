// Subscribes an email for the Business Systems Audit Checklist. The
// checklist itself is delivered by Kit's own incentive-email automation on
// KIT_FORM_ID — not by this route — which requires the subscriber to
// actually be linked to that form. See docs/project-context.md "Newsletter
// / Lead Magnet" for setup steps.
//
// Order matters: POST /v4/forms/{id}/subscribers 404s unless the subscriber
// already exists (confirmed by Kit support, 2026-09), so we create the
// subscriber first. If the form-link call still fails, the lead is captured
// but the checklist email won't fire, so the response reports
// formLinked: false and the UI shows an honest "on its way shortly" message
// instead of claiming it was sent.
import { sendAlert } from "@/lib/alert";
import { checkRateLimit, clientKey } from "@/lib/rateLimit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX = 254;

// Per visitor IP, and an outbound timeout so a hung Kit can't hold the request.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const KIT_TIMEOUT_MS = 8000;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const retryAfter = checkRateLimit(`subscribe:${clientKey(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (retryAfter) {
    return Response.json(
      { error: "Too many signups in a row. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("Newsletter signup failed: KIT_API_KEY or KIT_FORM_ID is not set.");
    await sendAlert(
      "checklist signup not configured",
      "The checklist signup is missing its Kit settings, so every signup fails. Check the Vercel environment variables.",
      4
    );
    return Response.json({ error: "Signup is not configured yet." }, { status: 503 });
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  let subscriberResponse: Response;
  try {
    subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      signal: AbortSignal.timeout(KIT_TIMEOUT_MS),
      headers: kitHeaders,
      body: JSON.stringify({ email_address: email }),
    });
  } catch (error) {
    console.error("Kit create subscriber failed:", error);
    await sendAlert("checklist signup failing", "Checklist signups are failing: Kit could not be reached.", 4);
    return Response.json({ error: "Could not complete signup." }, { status: 502 });
  }

  if (!subscriberResponse.ok) {
    const detail = await subscriberResponse.text();
    console.error(`Kit create subscriber failed (${subscriberResponse.status}): ${detail}`);
    await sendAlert(
      "checklist signup failing",
      `Checklist signups are failing: Kit returned ${subscriberResponse.status}. Check Kit and the API key.`,
      4
    );
    return Response.json({ error: "Could not complete signup." }, { status: 502 });
  }

  let formLinked = true;
  try {
    const formResponse = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: "POST",
      signal: AbortSignal.timeout(KIT_TIMEOUT_MS),
      headers: kitHeaders,
      body: JSON.stringify({ email_address: email }),
    });
    if (!formResponse.ok) {
      const detail = await formResponse.text();
      console.error(`Kit add-to-form failed (${formResponse.status}): ${detail}`);
      formLinked = false;
    }
  } catch (error) {
    console.error("Kit add-to-form failed:", error);
    formLinked = false;
  }

  if (!formLinked) {
    await sendAlert(
      "checklist: Kit form link failing",
      "A checklist signup was saved, but linking it to the Kit form failed, so the checklist email did not go out.",
      3
    );
  }
  return Response.json({ ok: true, formLinked });
}
