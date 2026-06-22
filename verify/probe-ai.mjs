import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/ai-scenario-library/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  const out=[];document.querySelectorAll('a[href*="/ai-scenario-library/"]').forEach(a=>{if(a.closest('header,footer'))return;const img=a.querySelector('img');const txt=(a.textContent||'').replace(/\s+/g,' ').trim();out.push({href:a.getAttribute('href').replace('https://azure.folio3.com',''),text:txt.slice(0,30),img:img?(img.currentSrc||img.src||'').split('/').pop():''});});
  return out;
});
console.log(JSON.stringify(r,null,1));await b.close();
