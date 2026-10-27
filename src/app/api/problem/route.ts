// Handles homepage problem-box sends. A send is only reported as successful
// when the founder will be notified (R27), so the order is fixed:
//   1. Email the founder through Resend's REST API (POST /emails), with the
//      full problem text and reply_to set to the visitor. This is the
//      success condition: if it fails, the route returns 502 and makes no
//      Kit call. The email also keeps every repeat send, which Kit's single
//      `problem` field cannot.
//   2. Record the contact in Kit, per the same v4 shape as
//      src/app/api/assessment/route.ts: upsert the subscriber with
//      first_name and the custom fields `problem` and `problem_headache`
//      (never `biggest_challenge`, so an assessment lead keeps that value),
//      then link it to KIT_PROBLEM_FORM_ID. Kit failures here are logged
//      only, because the founder already has the message.
//
// Request JSON: name, email, problem, headache (optional, a key from
// src/lib/content/headaches.ts) and the honeypot `company_website`. The
// client renders that field visually hidden with autocomplete="off",
// tabindex="-1" and aria-hidden="true", so browsers don't autofill it and
// real visitors never see it. A filled honeypot gets a success-shaped
// response with no email or Kit call, and is logged so a wrongly trapped
// real visitor still shows up in the logs.
import { findHeadache } from "@/lib/content/headaches";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 100;
const PROBLEM_MIN = 10;
const PROBLEM_MAX = 2000;

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
  const email = asString(body.email);
  const problem = asString(body.problem);
  const headacheKey = asString(body.headache);
  const honeypot = asString(body.company_website);

  if (!name || name.length > NAME_MAX) {
    return Response.json(
      { error: `Please enter your name (up to ${NAME_MAX} characters).` },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (problem.length < PROBLEM_MIN || problem.length > PROBLEM_MAX) {
    return Response.json(
      {
        error: `Please describe your problem in ${PROBLEM_MIN} to ${PROBLEM_MAX.toLocaleString("en-AU")} characters.`,
      },
      { status: 400 }
    );
  }
  const headache = headacheKey ? findHeadache(headacheKey) : undefined;
  if (headacheKey && !headache) {
    return Response.json({ error: "Please pick one of the listed headaches." }, { status: 400 });
  }

  if (honeypot) {
    console.warn(`Problem send caught by honeypot (email: ${email}); no email or Kit call made.`);
    return Response.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.PROBLEM_NOTIFY_TO;
  const notifyFrom = process.env.PROBLEM_NOTIFY_FROM;
  const kitKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_PROBLEM_FORM_ID;

  if (!resendKey || !notifyTo || !notifyFrom) {
    console.error(
      "Problem send failed: RESEND_API_KEY, PROBLEM_NOTIFY_TO or PROBLEM_NOTIFY_FROM is not set."
    );
    return Response.json({ error: "Sending is not configured yet." }, { status: 503 });
  }

  const headacheLabel = headache?.label ?? "Not picked";
  const emailText = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Headache: ${headacheLabel}`,
    "",
    "Problem:",
    problem,
  ].join("\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: notifyFrom,
        to: notifyTo,
        reply_to: email,
        // Collapse whitespace so a name can't break the subject line.
        subject: `New problem from ${name.replace(/\s+/g, " ")}`,
        text: emailText,
      }),
    });
    if (!emailResponse.ok) {
      const detail = await emailResponse.text();
      console.error(`Resend notification failed (${emailResponse.status}): ${detail}`);
      return Response.json({ error: "Could not send your problem." }, { status: 502 });
    }
  } catch (error) {
    console.error("Resend notification failed:", error);
    return Response.json({ error: "Could not send your problem." }, { status: 502 });
  }

  // The founder has the message from here on, so nothing below may turn
  // the response into a failure — including a thrown network error or
  // missing Kit configuration.
  if (!kitKey || !formId) {
    console.error("Kit record skipped: KIT_API_KEY or KIT_PROBLEM_FORM_ID is not set.");
    return Response.json({ ok: true });
  }
  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": kitKey,
  };
  try {
    const subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({
        email_address: email,
        first_name: name,
        fields: {
          problem,
          problem_headache: headache?.key ?? "",
        },
      }),
    });

    if (!subscriberResponse.ok) {
      const detail = await subscriberResponse.text();
      console.error(`Kit create subscriber failed (${subscriberResponse.status}): ${detail}`);
    } else {
      // The subscriber must exist before this call (Kit 404s otherwise).
      const formResponse = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify({ email_address: email }),
      });
      if (!formResponse.ok) {
        const detail = await formResponse.text();
        console.error(`Kit add-to-form failed (${formResponse.status}): ${detail}`);
      }
    }
  } catch (error) {
    console.error("Kit problem send failed:", error);
  }

  return Response.json({ ok: true });
}
