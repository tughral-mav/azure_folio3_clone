import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-managed-services/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(700);
const r = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/here.?s what we have got|what we have got/i.test(h.textContent));
  if(!head) return 'no head';
  const sec=head.closest('.elementor-section, .e-con');
  // icon-list items
  const items=[...sec.querySelectorAll('.elementor-icon-list-item')].slice(0,4);
  return items.map(it=>({ text:(it.querySelector('.elementor-icon-list-text')||it).textContent.replace(/\s+/g,' ').trim().slice(0,30), hasSvg: !!it.querySelector('svg'), hasImg: !!it.querySelector('img'), iconClass: (it.querySelector('i,svg')||{}).className?.toString?.().slice(0,30) }));
});
console.log(JSON.stringify(r,null,1));
await b.close();
