import { chromium } from 'playwright';
const [url, out] = [process.argv[2], process.argv[3]];
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1240,height:680}});
await p.goto(url, { waitUntil:'load', timeout:60000 });
await p.waitForTimeout(2000);
await p.screenshot({ path: out });
await b.close(); console.log('shot', out);
