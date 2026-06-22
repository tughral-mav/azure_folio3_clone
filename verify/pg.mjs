import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0'});
await p.goto('https://azure.folio3.com/data-integration-as-a-service/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(1000);
const r=await p.evaluate(()=>[...document.querySelectorAll('img')].map(i=>i.currentSrc||i.src).filter(s=>/postgresql/i.test(s)));
console.log(JSON.stringify(r));await b.close();
