// Localize remote assets listed in clone-kit/assets-manifest.json into /public.
// - Skips data: URIs (inline placeholders) and anything already on disk (resumable).
// - Mirrors each URL's host + path under /public so references stay unambiguous.
// - Retries transient failures, never aborts the whole run on a single bad asset.
// - Emits clone-kit/asset-map.json: { originalUrl -> "/public/..." } for rewriting content later.

import { mkdir, writeFile, stat, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(ROOT, 'public');
const MANIFEST = join(ROOT, 'clone-kit', 'assets-manifest.json');
const MAP_OUT = join(ROOT, 'clone-kit', 'asset-map.json');

const CONCURRENCY = 8;
const RETRIES = 3;
const TIMEOUT_MS = 30_000;

// Map a remote URL to a local path under /public, e.g.
//   https://azure.folio3.com/wp-content/uploads/x.png
//   -> public/azure.folio3.com/wp-content/uploads/x.png
function localPathFor(url) {
  const u = new URL(url);
  let pathname = decodeURIComponent(u.pathname);
  if (!pathname || pathname.endsWith('/')) {
    // No filename (e.g. gravatar avatar URLs) — derive a stable name from the query/hash.
    const key = (u.search || u.pathname || 'index').replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
    pathname = `${pathname.replace(/\/$/, '')}/${key || 'index'}`;
  }
  const rel = join(u.host, pathname);
  return { abs: join(PUBLIC_DIR, rel), webPath: '/' + join(u.host, pathname).split('\\').join('/') };
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function fetchWithRetry(url) {
  let lastErr;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (asset-localizer)' },
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (attempt < RETRIES) await new Promise(r => setTimeout(r, 500 * attempt));
    }
  }
  throw lastErr;
}

async function run() {
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  const urls = [...new Set(manifest.assets.filter(u => /^https?:\/\//i.test(u)))];
  console.log(`Manifest: ${manifest.assets.length} entries -> ${urls.length} unique remote URLs to localize.`);

  const map = {};
  let downloaded = 0, skipped = 0, failed = 0;
  const failures = [];

  // Simple fixed-size worker pool over the URL list.
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      const { abs, webPath } = localPathFor(url);
      map[url] = webPath;
      if (await exists(abs)) { skipped++; continue; }
      try {
        const buf = await fetchWithRetry(url);
        await mkdir(dirname(abs), { recursive: true });
        await writeFile(abs, buf);
        downloaded++;
        if (downloaded % 25 === 0) console.log(`  ...${downloaded} downloaded`);
      } catch (err) {
        failed++;
        failures.push({ url, error: String(err.message || err) });
        delete map[url]; // don't claim a local copy we don't have
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await writeFile(MAP_OUT, JSON.stringify(map, null, 2));

  console.log(`\nDone. downloaded=${downloaded} skipped(existing)=${skipped} failed=${failed}`);
  console.log(`URL -> local map written to ${MAP_OUT} (${Object.keys(map).length} entries).`);
  if (failures.length) {
    console.log('\nFailed assets:');
    for (const f of failures) console.log(`  ${f.url}  (${f.error})`);
  }
}

run().catch(err => { console.error('Fatal:', err); process.exit(1); });
