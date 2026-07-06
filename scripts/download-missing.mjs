/** Download every base image the audit flagged as missing/not-on-disk. */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const PUB = 'd:/AzureClone/azure-clone-next/public';
const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const { report } = JSON.parse(readFileSync('d:/AzureClone/verify/image-audit.json', 'utf8'));

// every unique base image referenced as missing across all sections
const bases = new Set();
for (const r of report) for (const m of r.missing) bases.add(m.base);

let ok = 0, skip = 0, fail = 0;
for (const base of bases) {
  const dest = PUB + base;
  if (existsSync(dest)) { skip++; continue; }
  try {
    const res = await fetch(LIVE + base, { headers: { 'User-Agent': UA } });
    if (!res.ok) { console.log(`FAIL ${res.status}  ${base}`); fail++; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    console.log(`  got ${String(buf.length).padStart(7)}b  ${base}`);
    ok++;
  } catch (e) { console.log(`ERR  ${base}  ${e.message}`); fail++; }
}
console.log(`\nDownloaded ${ok}, already-present ${skip}, failed ${fail}`);
