# Deployment Runbook — azure.folio3.com Next.js Clone

Everything needed to go live, in order. Nothing here requires changes to the
codebase — it's all account setup + config + the reversible cutover.

## 1. Essentials to acquire (the shopping list)

| Need | What / where | Notes |
|---|---|---|
| **Host** | **Vercel** (recommended) or Cloudflare Pages | Free tier is enough to start; first-class Next 15 App Router + ISR |
| **Git repo** | GitHub / GitLab / Bitbucket | Host deploys from here; push `azure-clone-next/` |
| **DNS control** | The **Cloudflare** account for folio3.com | Already in front of the live site — this is what makes rollback instant |
| **NetSuite** | Lead endpoint URL + auth token + `custentity_f3_wpcf_sign` value | From the current WP integration |
| **HubSpot** | Portal ID + Form GUID | From the current HubSpot account |
| **Cloudflare Turnstile** | Site key + secret | Free, dashboard → Turnstile |
| **Tracking** | GTM container ID + Microsoft Clarity ID | Reuse the current site's IDs |
| **Alerts (optional)** | Slack incoming-webhook URL | Pings if a lead fails to reach the CRM |

## 2. Environment variables (set in the host dashboard)
```
# public (safe in browser)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAA...
# server-only (NEVER public)
TURNSTILE_SECRET=0x4AAA...
NETSUITE_LEAD_URL=https://...
NETSUITE_TOKEN=...
NETSUITE_WPCF_SIGN=...
HUBSPOT_PORTAL_ID=...
HUBSPOT_FORM_GUID=...
LEAD_ALERT_WEBHOOK=https://hooks.slack.com/...
```
Template is in `azure-clone-next/.env.example`. Tracking/bot-protection simply
disable when blank. **Lead pipeline:** set at least ONE destination
(`NETSUITE_*`, `HUBSPOT_*`, or `LEAD_ALERT_WEBHOOK`). In **production** the form
now **fails loudly (HTTP 503)** if no destination is configured — by design, so a
missing config is caught by the smoke-test instead of silently dropping leads.
Quickest path: set `LEAD_ALERT_WEBHOOK` (Slack/Zapier) — it doubles as a fallback
sink that captures every lead even without a full CRM.

## 3. Deploy steps
1. **Push** the repo to a Git remote (a `git` repo is initialised at the project root).
2. **Import** the repo into Vercel → **set Root Directory = `azure-clone-next`**
   (Project → Settings → General). Critical: the app + its self-contained
   `content-kit/` build data live there. Framework auto-detects Next.js; Node ≥18.18
   and `npm ci`/`next build` are pinned (`package.json` engines + `vercel.json`).
3. **Add the env vars** (section 2) in Project Settings → Environment Variables.
   After deploy, confirm the build log shows **`Generating static pages (190/190)`** —
   fewer means the Root Directory is wrong or `content-kit/` didn't ship.
4. **Deploy** → you get a preview URL (`*.vercel.app`).
5. **Verify the preview** with the harness (no code change):
   ```
   CLONE_BASE=https://<preview>.vercel.app node verify/run.mjs
   CLONE_BASE=https://<preview>.vercel.app node verify/redirect-test.mjs
   ```
   Gate: content 12/12 · perf budget pass · links clean · redirect-test 0 broken.
6. **Sandbox-test the lead form** end-to-end with NetSuite/HubSpot **sandbox** creds;
   confirm a test lead lands in both before using production creds.

## 4. Staging (recommended before cutover)
- Map a `staging.azure.folio3.com` subdomain (Cloudflare CNAME → Vercel).
- Mark it `noindex` (already handled for `/thank-you/`; add a staging-wide noindex env if desired).
- Run the **full harness** against staging one final time + manual spot-check the
  top-traffic blog posts.

## 5. Cutover — reversible, low-risk (Cloudflare-mediated)
The whole point: **WordPress stays warm, rollback is seconds.**
1. In Cloudflare, point the apex/`www` record (or origin) for azure.folio3.com at
   the Vercel deployment. **Do not delete the WP origin.**
2. **Canary:** if using Cloudflare load-balancing or a path/percentage rule, send a
   small % of traffic to the clone first; otherwise switch fully and watch closely.
3. **Monitor 24–48h:** Vercel Analytics + Sentry/logs + form deliveries + GSC coverage.
4. **Rollback (if any alarm):** repoint Cloudflare back to the WP origin — **seconds,
   no redeploy.** This is the safety valve.
5. **Post-cutover:** submit the new `sitemap.xml` in Google Search Console; keep the
   old WP sitemap returning 200 for one crawl cycle, then let the 301s take over.
6. **Decommission WP** only after impressions/positions/CWV hold for ~4 weeks.

## 6. Pre-cutover checklist (all must pass)
- [ ] `verify/run.mjs` — content 12/12, perf budget, links clean
- [ ] `verify/redirect-test.mjs` — **0 of 243 URLs 404**
- [ ] Lead form: 10/10 synthetic submissions delivered to NetSuite + HubSpot (sandbox)
- [ ] Turnstile + rate-limit active (env keys set)
- [ ] Tracking fires (GTM/Clarity verified in staging)
- [ ] Top-traffic blog posts spot-checked visually
- [ ] WordPress origin confirmed still reachable (rollback path)

## 7. Rough cost
- Vercel Hobby: $0 (or Pro $20/mo for team/analytics). Cloudflare: existing.
- **Eliminated:** Elementor Pro, WP Rocket, Astra Pro licenses + WP hosting once WP is retired.
