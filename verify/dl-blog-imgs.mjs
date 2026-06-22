/** Download every blog image (resolved bodyHtml <img>, related thumbnails, hero) that
 *  isn't already on disk, from the live site into public/. Run after recapture-blogs.mjs. */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, appendFileSync } from 'node:fs';
import path from 'node:path';

const KIT = 'd:/AzureClone/clone-kit/content';
const PUB = 'd:/AzureClone/azure-clone-next/public';
const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PROG = 'verify/dl-blog-imgs.progress';
writeFileSync(PROG, '');

const files = readdirSync(KIT).filter((f) => f.startsWith('blog_') && f.endsWith('.json') && !/^blog_(category|tag|author)_/.test(f));
const wanted = new Set();
for (const f of files) {
  try {
    const data = JSON.parse(readFileSync(path.join(KIT, f), 'utf8'));
    const html = data.bodyHtml || '';
    for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/gi)) { const s = m[1]; if (/\/wp-content\/uploads\//.test(s) && !s.startsWith('data:')) wanted.add(s.split('?')[0]); }
    (data.related || []).forEach((r) => { if (r.image && /\/wp-content\/uploads\//.test(r.image)) wanted.add(r.image.split('?')[0]); });
    // featured image (og:image) — used for hero + as a related thumbnail by OTHER posts
    const og = data.meta?.ogImage;
    if (og && /\/wp-content\/uploads\//.test(og)) wanted.add(og.replace(/^https?:\/\/[^/]+/, '').split('?')[0]);
  } catch {}
}
const list = [...wanted].filter((p) => p.startsWith('/wp-content/'));
let i = 0, dl = 0, have = 0, fail = 0;
async function worker() {
  while (i < list.length) {
    const rel = list[i++];
    const dest = PUB + rel;
    if (existsSync(dest)) { have++; continue; }
    try {
      const r = await fetch(LIVE + rel, { headers: { 'User-Agent': UA } });
      if (r.ok) { const buf = Buffer.from(await r.arrayBuffer()); mkdirSync(path.dirname(dest), { recursive: true }); writeFileSync(dest, buf); dl++; }
      else { fail++; appendFileSync(PROG, `MISS ${r.status} ${rel}\n`); }
    } catch (e) { fail++; appendFileSync(PROG, `ERR ${rel}\n`); }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`blog images: ${list.length} referenced | ${have} already on disk | ${dl} downloaded | ${fail} failed`);
