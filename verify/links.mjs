/** Link gate: crawl the clone from the homepage, assert no broken internal links. */
import { BASE } from './lib.mjs';

async function fetchRetry(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try { return await fetch(url, { headers: { Connection: 'close' } }); }
    catch (e) { if (i === tries - 1) throw e; await new Promise((r) => setTimeout(r, 250 * (i + 1))); }
  }
}

/** Extract only real anchor hrefs (NOT <link rel=canonical> / <meta og:url>, which
 *  legitimately point at the production domain). */
function anchorHrefs(html) {
  const out = [];
  for (const m of html.matchAll(/<a\s+[^>]*href=["']([^"'#][^"']*)["']/gi)) out.push(m[1]);
  return out;
}

export async function checkLinks(max = 120) {
  const seen = new Set(['/']);
  const queue = ['/'];
  const broken = [];
  const anchorLeaks = []; // <a> still pointing at the live WP host (real problem)
  let checked = 0;

  while (queue.length && checked < max) {
    const route = queue.shift();
    checked++;
    let html = '';
    try {
      const res = await fetchRetry(`${BASE}${route}`);
      if (res.status >= 400) { broken.push({ route, status: res.status }); continue; }
      html = await res.text();
    } catch (e) {
      broken.push({ route, status: String(e).slice(0, 60) });
      continue;
    }
    for (const href of anchorHrefs(html)) {
      if (/azure\.folio3\.com/.test(href)) anchorLeaks.push({ on: route, href });
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const clean = href.split('?')[0];
      if (!seen.has(clean)) { seen.add(clean); queue.push(clean); }
    }
  }
  return {
    crawled: checked,
    discovered: seen.size,
    broken,
    anchorLeaks: anchorLeaks.slice(0, 20),
    ok: broken.length === 0 && anchorLeaks.length === 0,
  };
}
