/**
 * Sliding-window rate limiter, in-memory per server instance.
 * Suitable for a single-region deployment; when scaling horizontally,
 * swap the store for Redis (@upstash/ratelimit) — the call-site API
 * (`rateLimit(key, limit, windowMs)`) is designed to stay identical.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  hits.set(key, timestamps);
  // Opportunistic cleanup so the map does not grow unbounded.
  if (hits.size > 10_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= windowStart)) hits.delete(k);
    }
  }
  return true;
}

export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "local";
}
