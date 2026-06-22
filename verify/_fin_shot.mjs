import { chromium } from 'playwright';
const route = '/ai-scenario-library/finance/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b = await chromium.launch();
async function shot(url, isLive, out) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive ? UA : undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
  await p.waitForTimeout(2500);
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(800);
  await p.screenshot({ path: out, fullPage: true });
  await p.close();
}
await shot('https://azure.folio3.com' + route, true, 'verify/_fin_live.png');
await shot('http://localhost:3000' + route, false, 'verify/_fin_clone.png');
await b.close();
console.log('done');
