import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://localhost:3000/power-bi-financial-reporting-for-alibaba/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,p')].find(e=>/about the client/i.test(e.textContent));return h?h.closest('section').getBoundingClientRect().top+scrollY:0;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y); await p.waitForTimeout(700);
await p.screenshot({path:'verify/cs-client.png'});
await b.close();
