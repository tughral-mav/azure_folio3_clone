import { NextResponse } from 'next/server';
import { LeadSchema } from '@/lib/lead-schema';
import { rateLimit, sweep } from '@/lib/rate-limit';

export const runtime = 'nodejs';

/**
 * Secure, hardened server-side lead proxy (Phase 5).
 * The browser never sees NetSuite / HubSpot credentials. Layered defenses:
 *   1. rate limit per IP   2. honeypot   3. Cloudflare Turnstile
 *   4. Zod re-validation   5. timeouts + resilient dual forwarding
 *   6. delivery alerting — a failed forward NEVER silently drops a lead.
 * See BLUEPRINT.md §4.
 */

const clientIp = (req: Request) =>
  req.headers.get('cf-connecting-ip') ||
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  'unknown';

async function fetchWithTimeout(url: string, init: RequestInit, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // not configured → skip (dev)
  if (!token) return false;
  try {
    const r = await fetchWithTimeout('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await r.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Alert on dropped leads so they're never lost silently. */
async function alertDrop(payload: object, error: unknown) {
  console.error('LEAD_DELIVERY_FAILED', JSON.stringify(payload), String(error));
  if (process.env.LEAD_ALERT_WEBHOOK) {
    try {
      await fetchWithTimeout(process.env.LEAD_ALERT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `⚠️ Lead delivery failed: ${JSON.stringify(payload)} — ${String(error)}` }),
      });
    } catch {}
  }
}

export async function POST(req: Request) {
  sweep();
  const ip = clientIp(req);

  // 1. rate limit
  const rl = rateLimit(`lead:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 4. validate
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 });
  }
  const lead = parsed.data;

  // 2. honeypot — silently accept (don't tip off bots) but don't forward
  if (lead.website) return NextResponse.json({ ok: true });

  // 3. Turnstile
  if (!(await verifyTurnstile(lead.turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }

  const crmPayload = {
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone || '',
    company: lead.company || '',
    message: lead.message,
    page_url: lead.pageUrl || '',
    page_journey: JSON.stringify(lead.utm ?? {}),
    custentity_f3_wpcf_sign: process.env.NETSUITE_WPCF_SIGN ?? '',
  };

  // 5. resilient dual forwarding — settle both, never let one failure drop the lead
  const targets: Promise<unknown>[] = [];
  if (process.env.NETSUITE_LEAD_URL) {
    targets.push(
      fetchWithTimeout(process.env.NETSUITE_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NETSUITE_TOKEN ?? ''}` },
        body: JSON.stringify(crmPayload),
      }).then((r) => { if (!r.ok) throw new Error(`NetSuite ${r.status}`); })
    );
  }
  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID) {
    targets.push(
      fetchWithTimeout(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'email', value: lead.email },
              { name: 'firstname', value: lead.fullName },
              { name: 'phone', value: lead.phone || '' },
              { name: 'company', value: lead.company || '' },
              { name: 'message', value: lead.message },
            ],
            context: { pageUri: lead.pageUrl, pageName: 'Lead' },
          }),
        }
      ).then((r) => { if (!r.ok) throw new Error(`HubSpot ${r.status}`); })
    );
  }

  if (targets.length === 0) {
    // No CRM configured. Never silently accept-and-drop a real lead.
    // Fallback sink: if an alert webhook exists, capture the lead there.
    if (process.env.LEAD_ALERT_WEBHOOK) {
      try {
        const r = await fetchWithTimeout(process.env.LEAD_ALERT_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: `📥 New lead (no CRM configured): ${JSON.stringify(crmPayload)}` }),
        });
        if (!r.ok) throw new Error(`Webhook ${r.status}`);
        return NextResponse.json({ ok: true });
      } catch (e) {
        await alertDrop(crmPayload, e);
        return NextResponse.json({ error: 'Submission failed, please retry' }, { status: 502 });
      }
    }
    // No destination at all. In production this is a misconfiguration — fail LOUD
    // (so a deploy smoke-test catches it) rather than returning a false success.
    if (process.env.NODE_ENV === 'production') {
      await alertDrop(crmPayload, 'No lead destination configured — set NETSUITE_*/HUBSPOT_* or LEAD_ALERT_WEBHOOK');
      return NextResponse.json({ error: 'Lead capture is not configured' }, { status: 503 });
    }
    // dev only — accept so the local UX flow works
    return NextResponse.json({ ok: true, note: 'no CRM configured (dev)' });
  }

  const results = await Promise.allSettled(targets);
  const failures = results.filter((r) => r.status === 'rejected');
  if (failures.length === targets.length) {
    // every destination failed → the lead would be lost: alert + signal retry
    await alertDrop(crmPayload, (failures[0] as PromiseRejectedResult).reason);
    return NextResponse.json({ error: 'Submission failed, please retry' }, { status: 502 });
  }
  if (failures.length > 0) {
    // partial failure — lead is captured by at least one system; alert for backfill
    await alertDrop(crmPayload, (failures[0] as PromiseRejectedResult).reason);
  }
  return NextResponse.json({ ok: true });
}
