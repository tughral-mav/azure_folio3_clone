import { chromium } from 'playwright';

const pages = ['/', '/about-us/', '/services/', '/blog/', '/contact-us/', '/azure-cloud-service/', '/blog/what-is-microsoft-fabric/'];
const browser = await chromium.launch();
const results = {};
for (const p of pages) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const msgs = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') msgs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', e => msgs.push(`[pageerror] ${e.message}`));
  const failed = [];
  page.on('requestfailed', r => failed.push(`${r.failure()?.errorText} ${r.url()}`));
  const resp = await page.goto('http://localhost:3000' + p, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => ({ _err: e.message }));
  await page.waitForTimeout(800);
  results[p] = { status: resp?.status?.() ?? resp?._err, console: msgs, requestfailed: failed };
  await ctx.close();
}
await browser.close();
for (const [p, r] of Object.entries(results)) {
  console.log(`\n=== ${p} (status ${r.status}) ===`);
  console.log('  console errors/warnings:', r.console.length ? '' : 'NONE');
  r.console.slice(0,15).forEach(m => console.log('   ', m.slice(0,200)));
  console.log('  requestfailed:', r.requestfailed.length ? '' : 'NONE');
  r.requestfailed.slice(0,15).forEach(m => console.log('   ', m.slice(0,200)));
}
