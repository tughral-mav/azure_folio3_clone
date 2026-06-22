/**
 * Localize every asset referenced by the clone capture.
 * Reads clone-kit/assets-manifest.json → downloads each file into
 * clone-kit/public/<original-path>, preserving directory structure so a
 * Next.js build can reference /wp-content/... or remap easily.
 *
 * Resumable (skips files already on disk). Concurrency-limited.
 * Run: node localize-assets.mjs
 */
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KIT = path.join(__dirname, 'clone-kit');
const PUBLIC = path.join(KIT, 'public');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const CONCURRENCY = 8;

const manifest = JSON.parse(readFileSync(path.join(KIT, 'assets-manifest.json')));
// normalize: absolute URLs only, dedupe, drop data: URIs
const assets = [...new Set(
  manifest.assets
    .map((a) => (a.startsWith('//') ? 'https:' + a : a))
    .filter((a) => /^https?:\/\//.test(a))
)];

const localPathFor = (url) => {
  const u = new URL(url);
  // map by host so off-site assets (fonts, hubspot, etc.) don't collide
  const host = u.hostname.replace(/[^a-z0-9.]/gi, '_');
  let p = decodeURIComponent(u.pathname).replace(/^\/+/, '');
  if (!p || p.endsWith('/')) p += 'index';
  // strip querystring sizing but keep extension
  return path.join(PUBLIC, host, p);
};

let ok = 0, skip = 0, fail = 0;
const failures = [];

async function download(url) {
  const dest = localPathFor(url);
  if (existsSync(dest)) { skip++; return; }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(path.dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    ok++;
  } catch (e) {
    fail++; failures.push({ url, error: String(e).slice(0, 120) });
  }
}

async function pool(items, n, fn) {
  let i = 0, active = 0;
  return new Promise((resolve) => {
    const next = () => {
      if (i >= items.length && active === 0) return resolve();
      while (active < n && i < items.length) {
        const it = items[i++]; active++;
        fn(it).then(() => {
          active--;
          if ((ok + skip + fail) % 50 === 0) process.stdout.write(`\r  ${ok} ok · ${skip} skip · ${fail} fail / ${items.length}`);
          next();
        });
      }
    };
    next();
  });
}

(async () => {
  console.log(`› Localizing ${assets.length} unique assets → clone-kit/public/`);
  mkdirSync(PUBLIC, { recursive: true });
  await pool(assets, CONCURRENCY, download);
  writeFileSync(path.join(KIT, 'assets-download-report.json'),
    JSON.stringify({ total: assets.length, ok, skip, fail, failures }, null, 2));
  console.log(`\n=== DONE ===  ${ok} downloaded · ${skip} already present · ${fail} failed`);
  if (fail) console.log(`  see clone-kit/assets-download-report.json for the ${fail} failures`);
  // breakdown by host
  const byHost = {};
  for (const a of assets) { const h = new URL(a).hostname; byHost[h] = (byHost[h] || 0) + 1; }
  console.log('  assets by host:', Object.entries(byHost).sort((a,b)=>b[1]-a[1]).map(([h,c])=>`${h}:${c}`).join('  '));
})();
