/** Download every captured design-page image (exact src, incl -WIDTHxHEIGHT variants) that
 *  isn't on disk. The parity auto-download collapses to base names, so variants whose base
 *  doesn't exist on the live (e.g. *-300x131.webp tech logos) were never fetched → broken <img>. */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const KIT = 'd:/AzureClone/clone-kit/content';
const PUB = 'd:/AzureClone/azure-clone-next/public';
const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const wanted = new Set();
for (const f of readdirSync(KIT)) {
  if (!f.endsWith('.json') || f.startsWith('blog_')) continue;
  try {
    const d = JSON.parse(readFileSync(path.join(KIT, f), 'utf8'));
    for (const s of d.sections ?? []) for (const it of s.items ?? []) { if (it.t === 'img' && it.src && !it.src.startsWith('data:')) { const rel = it.src.replace(/^https?:\/\/[^/]+/, '').split('?')[0]; if (rel.startsWith('/wp-content/')) wanted.add(rel); } }
    for (const b of d.bgImages ?? []) { const rel = (b || '').replace(/^https?:\/\/[^/]+/, '').split('?')[0]; if (rel.startsWith('/wp-content/')) wanted.add(rel); }
  } catch {}
}
const list = [...wanted].filter((rel) => !existsSync(PUB + decodeURIComponent(rel)));
console.log(`${wanted.size} referenced, ${list.length} missing on disk`);
let i = 0, dl = 0, fail = 0;
async function worker() {
  while (i < list.length) {
    const rel = list[i++];
    try {
      const r = await fetch(LIVE + rel, { headers: { 'User-Agent': UA } });
      if (r.ok) { const buf = Buffer.from(await r.arrayBuffer()); const dest = PUB + decodeURIComponent(rel); mkdirSync(path.dirname(dest), { recursive: true }); writeFileSync(dest, buf); dl++; }
      else fail++;
    } catch { fail++; }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`downloaded ${dl}, failed ${fail}`);
