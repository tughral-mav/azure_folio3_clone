/**
 * SEO safety net: every URL in the live sitemap must resolve on the clone —
 * either 200 (page exists) or 301→200 (redirected to a canonical page).
 * A 404 here = lost search equity at cutover. Exit 1 if any URL 404s.
 *
 * Usage: CLONE_BASE=http://localhost:3000 node verify/redirect-test.mjs
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { __dirname, BASE } from './lib.mjs';

const ORIGIN = 'https://azure.folio3.com';
const reg = JSON.parse(readFileSync(path.join(__dirname, '..', 'audit-output', 'registry.json'), 'utf8'));
const urls = [...new Set(Object.values(reg).flat().map((u) => u.loc.replace(ORIGIN, '')))];

const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', X = '\x1b[0m';

async function check(p) {
  // manual redirect handling so we can see the chain
  let res = await fetch(`${BASE}${p}`, { redirect: 'manual', headers: { Connection: 'close' } }).catch(() => null);
  if (!res) return { p, status: 'ERR', final: null };
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location') || '';
    const follow = await fetch(loc.startsWith('http') ? loc : `${BASE}${loc}`, { redirect: 'follow', headers: { Connection: 'close' } }).catch(() => null);
    return { p, status: res.status, redirectsTo: loc, final: follow?.status ?? 'ERR' };
  }
  return { p, status: res.status, final: res.status };
}

(async () => {
  try { if (!(await fetch(BASE)).ok) throw 0; }
  catch { console.error(`${R}✗ Clone not reachable at ${BASE}. Start it first.${X}`); process.exit(2); }

  console.log(`\nRedirect test: ${urls.length} live URLs vs the clone (${BASE})\n`);
  const results = [];
  // small concurrency
  let i = 0;
  async function worker() { while (i < urls.length) { const p = urls[i++]; results.push(await check(p)); } }
  await Promise.all(Array.from({ length: 8 }, worker));

  const ok200 = results.filter((r) => r.final === 200 && r.status === 200);
  const redirected = results.filter((r) => r.status >= 300 && r.status < 400 && r.final === 200);
  const broken = results.filter((r) => r.final !== 200);

  console.log(`${G}200 OK${X}            : ${ok200.length}`);
  console.log(`${Y}301→200${X}           : ${redirected.length}`);
  console.log(`${broken.length ? R : G}404 / broken${X}      : ${broken.length}`);
  if (broken.length) {
    console.log(`\n${R}Broken URLs (would lose SEO at cutover):${X}`);
    broken.slice(0, 40).forEach((b) => console.log(`  ${b.status}/${b.final}  ${b.p}`));
  }
  console.log(broken.length ? `\n${R}✗ FAIL — ${broken.length} URLs do not resolve${X}\n` : `\n${G}✓ PASS — all ${urls.length} live URLs resolve (200 or 301→200)${X}\n`);
  process.exit(broken.length ? 1 : 0);
})();
