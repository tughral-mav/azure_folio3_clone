/** Content/SEO gate: compare clone's rendered meta against the golden master capture. */
import { BASE, goldenContent } from './lib.mjs';

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

/** Robust fetch — localhost on Windows can reset rapid sequential connections. */
async function fetchRetry(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'verify-harness', Connection: 'close' } });
      return r;
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 250 * (i + 1)));
    }
  }
}

export async function compareContent(routePath) {
  const golden = goldenContent(routePath);
  const res = await fetchRetry(`${BASE}${routePath}`);
  const html = await res.text();

  const clone = {
    status: res.status,
    title: pick(html, /<title[^>]*>([^<]+)<\/title>/i),
    canonical: pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i),
    description: pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i),
    h1Count: (html.match(/<h1[\s>]/gi) || []).length,
    hasJsonLd: /application\/ld\+json/i.test(html),
    hasOg: /property=["']og:/i.test(html),
  };

  const goldenH1 = golden?.sections?.flatMap((s) => s.headings || []).find((h) => h.tag === 'h1')?.text ?? null;

  // Checks (each true = pass)
  const checks = {
    'returns 200': clone.status === 200,
    'has <title>': !!clone.title,
    'single H1': clone.h1Count === 1, // we deliberately fixed the live 3-H1 issue
    'has canonical': !!clone.canonical,
    'has meta description': !!clone.description,
    'has OpenGraph': clone.hasOg,
  };
  const passed = Object.values(checks).filter(Boolean).length;

  return {
    route: routePath,
    clone,
    goldenTitle: golden?.meta?.title ?? null,
    goldenH1,
    goldenH1Count: golden?.meta?.h1Count ?? null,
    checks,
    score: `${passed}/${Object.keys(checks).length}`,
    ok: passed === Object.keys(checks).length,
  };
}
