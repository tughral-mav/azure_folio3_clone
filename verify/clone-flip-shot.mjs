import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1240,height:900}});
await p.goto('http://localhost:3000/azure-for-retail/', { waitUntil:'load', timeout:60000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight){clearInterval(t);r();}},30);});});
await p.waitForTimeout(500);
// scroll the Why-leverage heading into view
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>/why leverage/i.test(x.textContent)); h?.scrollIntoView({block:'start'});});
await p.waitForTimeout(600);
const box = await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>/why leverage/i.test(x.textContent)); const s=h.closest('section'); const r=s.getBoundingClientRect(); return {x:Math.max(0,r.x), y:Math.max(0,r.y), width:Math.min(1240,r.width), height:Math.min(880,r.height)};});
await p.screenshot({ path:'verify/flip_default.png', clip: box });
// hover the 3rd card (Create Seamless) — find its title and hover
const t = await p.evaluateHandle(()=>{const els=[...document.querySelectorAll('h3')].filter(x=>/Create Seamless|Real-Time Insights/i.test(x.textContent)); return els[0]?.closest('.relative');});
await t.asElement()?.hover();
await p.waitForTimeout(700);
await p.screenshot({ path:'verify/flip_hover.png', clip: box });
console.log('shots done');
await b.close();
