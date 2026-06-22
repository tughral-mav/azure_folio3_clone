import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1240,height:820}});
await p.goto('http://localhost:3000/microsoft-power-platform-services/', { waitUntil:'load', timeout:60000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(400);
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>/transforming manual workloads/i.test(x.textContent)); if(h) window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 60);});
await p.waitForTimeout(500);
const card = await p.evaluateHandle(()=>document.querySelector('.card-hover'));
const el = card.asElement();
if(el){ await el.hover(); }
await p.waitForTimeout(600);
await p.screenshot({ path:'verify/cardhover.png' });
console.log('done', !!el);
await b.close();
