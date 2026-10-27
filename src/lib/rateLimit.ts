// Best-effort, in-memory sliding-window limiter for the public form routes.
// State lives in one server instance, so on serverless hosting it slows
// scripted floods rather than guaranteeing a cap; pair it with a platform
// firewall rule for a hard limit (docs/project-context.md launch checklist).
const hits = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5000;

/** Returns 0 if the request is allowed, otherwise the seconds until it may retry. */
export function checkRateLimit(key: string, limit: number, windowMs: number, now = Date.now()): number {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return 0;
}

/** The caller's IP from the proxy headers the host sets, or a shared bucket if absent. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}
