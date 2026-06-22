import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  const sh=[...document.querySelectorAll('h2')].find(h=>/our services.*automation/i.test(h.textContent));const ssec=sh?.closest('.elementor-section,.e-con');
  const map={};[...(ssec?.querySelectorAll('a[href]')||[])].forEach(a=>{const h=a.getAttribute('href');if(!h||h.startsWith('#'))return;const card=a.closest('[class*="elementor-widget"],[class*="box"],.elementor-column');const title=card?.querySelector('h3,h4,.elementor-heading-title')?.textContent.replace(/\s+/g,' ').trim();if(title)map[title]=h.replace('https://azure.folio3.com','');});
  return map;
});
console.log(JSON.stringify(r,null,1));await b.close();
