// Forwards Business Automation Assessment submissions to Kit (formerly
// ConvertKit). Two calls, per Kit's actual v4 API shape (verified against
// https://developers.kit.com/api-reference 2026-09 — POST /v4/forms/{id}/
// subscribers only accepts email_address/referrer, NOT first_name/fields):
//   1. POST /v4/subscribers — upserts the subscriber and sets first_name +
//      custom fields (business, website, etc.).
//   2. POST /v4/forms/{KIT_ASSESSMENT_FORM_ID}/subscribers — links that
//      subscriber to the assessment form so Kit's form automation fires.
// See docs/project-context.md "Assessment Funnel" for the required custom
// field keys and setup steps.
import { sendAlert } from "@/lib/alert";
import { checkRateLimit, clientKey } from "@/lib/rateLimit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per visitor IP, and an outbound timeout so a hung Kit can't hold the request.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const KIT_TIMEOUT_MS = 8000;
// Field caps: anything longer is cut, not rejected, so a real answer is never lost to a typo.
const SHORT_MAX = 200;
const LONG_MAX = 2000;
const EMAIL_MAX = 254;

function asString(value: unknown, max = SHORT_MAX): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = asString(body.name);
  const business = asString(body.business);
  const email = asString(body.email, EMAIL_MAX);
  const challenge = asString(body.challenge, LONG_MAX);

  if (!name || !business || !challenge || !EMAIL_PATTERN.test(email)) {
    return Response.json(
      { error: "Please fill in your name, business, email, and biggest challenge." },
      { status: 400 }
    );
  }

  const retryAfter = checkRateLimit(`assessment:${clientKey(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (retryAfter) {
    return Response.json(
      { error: "You've sent a few requests in a row. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_ASSESSMENT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("Assessment signup failed: KIT_API_KEY or KIT_ASSESSMENT_FORM_ID is not set.");
    await sendAlert(
      "assessment form not configured",
      "The free assessment form is missing its Kit settings, so every request fails. Check the Vercel environment variables.",
      5
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
      body: JSON.stringify({
        email_address: email,
        first_name: name,
        fields: {
          business,
          website: asString(body.website),
          industry: asString(body.industry),
          team_size: asString(body.teamSize),
          biggest_challenge: challenge,
          current_tools: asString(body.currentTools, LONG_MAX),
          automate_wish: asString(body.automateWish, LONG_MAX),
        },
      }),
    });
  } catch (error) {
    console.error("Kit create subscriber failed:", error);
    await sendAlert(
      "assessment form failing",
      "Assessment requests are NOT being saved: Kit could not be reached. Visitors see an error. Check Kit.",
      5
    );
    return Response.json({ error: "Could not submit the assessment." }, { status: 502 });
  }

  if (!subscriberResponse.ok) {
    const detail = await subscriberResponse.text();
    console.error(`Kit create subscriber failed (${subscriberResponse.status}): ${detail}`);
    await sendAlert(
      "assessment form failing",
      `Assessment requests are NOT being saved: Kit returned ${subscriberResponse.status}. Visitors see an error. Check Kit and the API key.`,
      5
    );
    return Response.json({ error: "Could not submit the assessment." }, { status: 502 });
  }

  // Linking to the form only drives Kit-side tagging/automation for this
  // lead — the visitor-facing promise is "a human reviews it," not an
  // automated email. So a failure here is logged but non-fatal: the call
  // above already captured every field as a real Kit subscriber. The
  // subscriber must exist before this call (Kit 404s otherwise), which is
  // why it comes second.
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
      "assessment: Kit form link failing",
      "An assessment request was saved, but linking it to the Kit form failed, so Kit's automation did not run.",
      3
    );
  }
  return Response.json({ ok: true, formLinked });
}
