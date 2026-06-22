import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('verify/shots', { recursive: true });
const ROUTES = ['/azure-data-analytics/', '/microsoft-fabric-services/', '/microsoft-power-platform-services/', '/azure-managed-services/', '/solution/intellifabric/'];
const slug = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });
async function shoot(base, route, tag) {
  const p = await ctx.newPage();
  try {
    await p.goto(base + route, { waitUntil: 'load', timeout: 60000 });
    await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 45); }); });
    await p.waitForTimeout(900);
    await p.evaluate(() => scrollTo(0, 0));
    await p.waitForTimeout(300);
    await p.screenshot({ path: `verify/shots/${slug(route)}__desktop__${tag}.png`, fullPage: true });
  } catch {}
  finally { await p.close(); }
}
for (const r of ROUTES) { await shoot('http://localhost:3000', r, 'clone'); await shoot('https://azure.folio3.com', r, 'live'); console.log('captured', r); }
await b.close();
