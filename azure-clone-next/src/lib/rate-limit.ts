/**
 * Tiny in-memory sliding-window rate limiter for the lead endpoint.
 * Good enough for a single instance; swap for Cloudflare KV / Upstash in
 * a multi-instance deploy. Keyed by client IP.
 */
type Hit = { count: number; reset: number };
const buckets = new Map<string, Hit>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  b.count += 1;
  if (b.count > limit) return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

// opportunistic cleanup so the map can't grow unbounded
export function sweep() {
  const now = Date.now();
  for (const [k, v] of buckets) if (now > v.reset) buckets.delete(k);
}
