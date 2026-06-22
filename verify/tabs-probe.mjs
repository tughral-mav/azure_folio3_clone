import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/azure-for-construction/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},30);});});
await p.waitForTimeout(1000);
const r=await p.evaluate(()=>{
  const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  // the n-tabs section
  const tabsW=document.querySelector('.elementor-widget-n-tabs, [class*="e-n-tabs"]');
  const sec=tabsW?.closest('.elementor-top-section');
  const allH=sec?[...sec.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>h.tagName+':'+txt(h)).filter(x=>x.length<70):[];
  // tab buttons (labels)
  const tabBtns=tabsW?[...tabsW.querySelectorAll('[role="tab"], .e-n-tab-title, .e-n-tabs-heading > *')].map(t=>txt(t)).filter(Boolean):[];
  return {sectionHeadings:allH.slice(0,12), tabLabels:[...new Set(tabBtns)].slice(0,8)};
});
console.log(JSON.stringify(r,null,1));await b.close();
