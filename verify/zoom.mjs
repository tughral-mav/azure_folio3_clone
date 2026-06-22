import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [600, 2200]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto('http://localhost:3000/azure-cloud-service/', { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(1000);
  await p.screenshot({ path: `verify/acs/zoom_${w}.png` });
  await p.close();
}
await b.close();
console.log('done');
