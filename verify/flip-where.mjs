import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0'});
await p.goto('https://azure.folio3.com/azure-for-construction/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(800);
const r=await p.evaluate(()=>[...document.querySelectorAll('.elementor-flip-box')].map(f=>{const sec=f.closest('.elementor-section,.e-con');const h=sec?.querySelector('h2,h3');return {sec:h?h.textContent.replace(/\s+/g,' ').trim().slice(0,40):'?',front:(f.querySelector('.elementor-flip-box__layer__title')||{}).textContent?.replace(/\s+/g,' ').trim().slice(0,30)};}));
console.log(JSON.stringify(r));await b.close();
