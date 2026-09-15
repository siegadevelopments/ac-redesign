// Subscribes an email for the Business Systems Audit Checklist. The
// checklist itself is delivered by Kit's own incentive-email automation on
// KIT_FORM_ID — not by this route — which requires the subscriber to
// actually be linked to that form. See docs/project-context.md "Newsletter
// / Lead Magnet" for setup steps.
//
// TEMPORARY as of 2026-09: Kit confirmed POST /v4/forms/{id}/subscribers
// 404s for this account (their bug, escalated to a product specialist).
// Until fixed, we still capture the subscriber via the working
// POST /v4/subscribers endpoint (so no lead is lost) but the form-link call
// that actually triggers the checklist email fails — so the response
// reports formLinked: false and the UI shows an honest "on its way
// shortly" message instead of "check your inbox," which would be untrue
// right now. Once Kit's fix lands, formLinked should reliably be true and
// the honest-delay message stops appearing.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("Newsletter signup failed: KIT_API_KEY or KIT_FORM_ID is not set.");
    return Response.json({ error: "Signup is not configured yet." }, { status: 503 });
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  const subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify({ email_address: email }),
  });

  if (!subscriberResponse.ok) {
    const detail = await subscriberResponse.text();
    console.error(`Kit create subscriber failed (${subscriberResponse.status}): ${detail}`);
    return Response.json({ error: "Could not complete signup." }, { status: 502 });
  }

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
