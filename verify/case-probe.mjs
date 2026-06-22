import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage();
await p.goto('http://localhost:3000/data-science-ai/microsoft-copilot-consulting/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(1500);
// find the Real Results case flip cards (h-64 rounded-2xl) + their imgs
const r=await p.evaluate(()=>[...document.querySelectorAll('.h-64')].map(c=>{const h=c.querySelector('h3');const img=c.querySelector('img');return {title:(h?.textContent||'').slice(0,40),img:img?(img.currentSrc||img.src||'').split('/').pop()?.slice(0,40):'NO IMG'};}));
console.log(JSON.stringify(r,null,1));await b.close();
