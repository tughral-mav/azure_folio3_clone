/** Download every unique missing image (verify/to-download.json) from the live into public/. */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const PUB = 'd:/AzureClone/azure-clone-next/public';
const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const list = JSON.parse(readFileSync('verify/to-download.json', 'utf8'));
const CONC = 8;
let ok = 0, skip = 0, fail = 0;
const failed = [];
let i = 0;
async function worker() {
  while (i < list.length) {
    const base = list[i++];
    const dest = PUB + base;
    if (existsSync(dest)) { skip++; continue; }
    try {
      const res = await fetch(LIVE + base, { headers: { 'User-Agent': UA } });
      if (!res.ok) { fail++; failed.push(base + ' (' + res.status + ')'); continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, buf);
      ok++;
    } catch (e) { fail++; failed.push(base + ' (' + String(e).slice(0, 40) + ')'); }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
writeFileSync('verify/download-failures.json', JSON.stringify(failed, null, 2));
console.log(`downloaded ${ok}, already-present ${skip}, failed ${fail} (see verify/download-failures.json)`);
