import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto('https://azure.folio3.com/petrochemical-producer-edms-compliance-agent/', { waitUntil: 'load', timeout: 90000 });
for (let i = 0; i < 2; i++) { await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 40); }); }); await p.waitForTimeout(500); }
await p.evaluate(() => scrollTo(0, 0));
const ys = await p.evaluate(() => {
  const out = {};
  for (const h of document.querySelectorAll('h2,h3')) {
    const t = (h.textContent || '').replace(/\s+/g, ' ').trim();
    if (/^Key Features$|^Impact & Outcomes$|Ready to modernize|Frequently Asked|^Common Questions$|Schedule a 1:1/i.test(t)) {
      const r = h.getBoundingClientRect(); out[t.slice(0, 28)] = Math.round(r.top + scrollY);
    }
  }
  return { docH: document.body.scrollHeight, ...out };
});
console.log(JSON.stringify(ys, null, 1));
await b.close();
