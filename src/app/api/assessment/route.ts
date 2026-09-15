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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = asString(body.name);
  const business = asString(body.business);
  const email = asString(body.email);
  const challenge = asString(body.challenge);

  if (!name || !business || !challenge || !EMAIL_PATTERN.test(email)) {
    return Response.json(
      { error: "Please fill in your name, business, email, and biggest challenge." },
      { status: 400 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_ASSESSMENT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("Assessment signup failed: KIT_API_KEY or KIT_ASSESSMENT_FORM_ID is not set.");
    return Response.json({ error: "Signup is not configured yet." }, { status: 503 });
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  const subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
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
        current_tools: asString(body.currentTools),
        automate_wish: asString(body.automateWish),
      },
    }),
  });

  if (!subscriberResponse.ok) {
    const detail = await subscriberResponse.text();
    console.error(`Kit create subscriber failed (${subscriberResponse.status}): ${detail}`);
    return Response.json({ error: "Could not submit the assessment." }, { status: 502 });
  }

  // Linking to the form only drives Kit-side tagging/automation for this
  // lead — not something the visitor-facing promise depends on (this funnel
  // was always "a human reviews it," not an automated email). So a failure
  // here is logged but non-fatal: the submission above already captured
  // every field as a real Kit subscriber, which is what actually matters.
  // TEMPORARY as of 2026-09: Kit confirmed POST /v4/forms/{id}/subscribers
  // 404s for this account (their bug, escalated to a product specialist —
  // see docs/project-context.md "Assessment Funnel"). Once fixed, this
  // should reliably succeed and formLinked can be relied on again.
  const formResponse = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify({ email_address: email }),
  });

  let formLinked = true;
  if (!formResponse.ok) {
    const detail = await formResponse.text();
    console.error(`Kit add-to-form failed (${formResponse.status}): ${detail}`);
    formLinked = false;
  }

  return Response.json({ ok: true, formLinked });
}
