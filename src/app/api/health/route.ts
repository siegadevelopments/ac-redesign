// For an uptime monitor (see docs/project-context.md). Returns 200 with
// `formsConfigured: true` when the form routes have the settings they need,
// and 503 when they don't, so a missing or wiped environment variable pages
// the founder instead of surfacing as visitor errors. It only checks that
// settings exist; it never calls Resend or Kit, and never reveals values.
export const dynamic = "force-dynamic";

export function GET() {
  const formsConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.PROBLEM_NOTIFY_TO &&
      process.env.PROBLEM_NOTIFY_FROM &&
      process.env.KIT_API_KEY &&
      process.env.KIT_PROBLEM_FORM_ID &&
      process.env.KIT_FORM_ID &&
      process.env.KIT_ASSESSMENT_FORM_ID
  );
  return Response.json({ ok: formsConfigured, formsConfigured }, { status: formsConfigured ? 200 : 503 });
}
