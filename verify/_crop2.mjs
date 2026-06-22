import { chromium } from 'playwright';
import path from 'path';
const b = await chromium.launch();
const p = await b.newPage();
async function crop(file, y, h, out) {
  const abs = 'file:///' + path.resolve(file).replaceAll('\\', '/');
  await p.setViewportSize({ width: 1440, height: h });
  await p.goto(abs);
  await p.evaluate((y) => {
    document.body.style.margin = '0';
    const img = document.querySelector('img');
    img.style.position = 'absolute';
    img.style.top = -y + 'px';
    img.style.left = '0';
  }, y);
  await p.screenshot({ path: out });
}
// Top region: hero + The Customer
await crop('verify/shots/daraz__desktop__live.png', 0, 1500, 'verify/shots/_live_top.png');
await crop('verify/shots/daraz__desktop__clone.png', 0, 1500, 'verify/shots/_clone_top.png');
await b.close();
console.log('done');
