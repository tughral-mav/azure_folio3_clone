import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const d = JSON.parse(readFileSync('verify/audit-desktop.json', 'utf8'));
const slug = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const telD = (s) => (s || '').replace(/[^0-9]/g, '');
const byR = new Map(d.map((r) => [r.route, r]));
const out = [];
for (const route of DESIGN_PAGES) {
  const r = byR.get(route) || {};
  const links = (r.linkMismatches || []).filter((l) => !(l.clone.startsWith('tel:') && l.live.split('|').every((x) => x.trim().startsWith('tel:') && telD(x) === telD(l.clone))));
  out.push({
    route,
    slug: slug(route),
    liveStatus: r.liveStatus ?? 0,
    miss: (r.missingImages || []).length,
    missSample: (r.missingImages || []).slice(0, 14).map((i) => i.path.split('/').pop()),
    links: links.map((l) => `${l.text} -> ${l.live}`),
  });
}
writeFileSync('verify/visual-context.json', JSON.stringify(out));
console.log('design pages:', out.length, ' shots:', readdirSync('verify/shots').length);
