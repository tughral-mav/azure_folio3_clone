import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1240,height:760}});
await p.goto('http://localhost:3000/azure-cloud-service/', { waitUntil:'load', timeout:60000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(400);
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>/real results/i.test(x.textContent)); window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 40);});
await p.waitForTimeout(500);
await p.screenshot({ path:'verify/case_default.png' });
const t = await p.evaluateHandle(()=>{ const els=[...document.querySelectorAll('h3')].filter(x=>/Savills/i.test(x.textContent)); return els[0]?.closest('.relative'); });
const el = t.asElement(); if(el){ await el.hover(); }
await p.waitForTimeout(700);
await p.screenshot({ path:'verify/case_hover.png' });
console.log('done', !!el);
await b.close();
