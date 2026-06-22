import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  const sh=[...document.querySelectorAll('h2')].find(h=>/our services.*automation/i.test(h.textContent));const ssec=sh?.closest('.elementor-section,.e-con');
  return [...new Set([...(ssec?.querySelectorAll('a[href]')||[])].map(a=>a.getAttribute('href')).filter(h=>h&&!h.startsWith('#')))].map(h=>h.replace('https://azure.folio3.com',''));
});
console.log(JSON.stringify(r));await b.close();
