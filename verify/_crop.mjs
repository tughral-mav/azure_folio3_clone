import { chromium } from 'playwright';
import path from 'path';
const b = await chromium.launch();
const p = await b.newPage();
async function crop(file, regions, prefix) {
  const abs = 'file:///' + path.resolve(file).replaceAll('\\', '/');
  for (const [name, y, h] of regions) {
    await p.setViewportSize({ width: 1440, height: h });
    await p.goto(abs);
    await p.evaluate((y) => {
      document.body.style.margin = '0';
      const img = document.querySelector('img');
      img.style.position = 'absolute';
      img.style.top = -y + 'px';
      img.style.left = '0';
    }, y);
    await p.screenshot({ path: `verify/shots/_${prefix}_${name}.png` });
  }
}
await crop('verify/shots/daraz__desktop__clone.png', [['customer', 560, 1100], ['mid', 2600, 1300]], 'clone');
await crop('verify/shots/daraz__desktop__live.png', [['customer', 560, 1100], ['mid', 2600, 1300]], 'live');
await b.close();
console.log('done');
