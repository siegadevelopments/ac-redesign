// Subscribes an email to the Kit (formerly ConvertKit) form configured for
// the Business Systems Audit Checklist. The checklist itself is delivered by
// Kit's own incentive-email automation on that form — not by this route —
// so KIT_FORM_ID must point to a form with that incentive already configured
// in the Kit dashboard. See docs/project-context.md "Newsletter / Lead
// Magnet" for setup steps.
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

  const kitResponse = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (!kitResponse.ok) {
    const detail = await kitResponse.text();
    console.error(`Kit subscribe failed (${kitResponse.status}): ${detail}`);
    return Response.json({ error: "Could not complete signup." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
