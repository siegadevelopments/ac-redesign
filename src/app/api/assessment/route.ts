// Forwards Business Automation Assessment submissions to a Kit (formerly
// ConvertKit) form distinct from the newsletter's, so Kit's own automation
// can notify differently for an assessment lead. See docs/project-context.md
// "Assessment Funnel" for the required custom fields and setup steps.
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

  const kitResponse = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
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

  if (!kitResponse.ok) {
    const detail = await kitResponse.text();
    console.error(`Kit assessment subscribe failed (${kitResponse.status}): ${detail}`);
    return Response.json({ error: "Could not submit the assessment." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
