import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const out=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
  return [...document.querySelectorAll('.elementor-tab-content')].slice(0,4).map(panel=>{
    return [...panel.querySelectorAll('.elementor-icon-box-wrapper')].map(s=>({title:txt(s.querySelector('.elementor-icon-box-title')),svg:s.querySelector('svg')?.outerHTML||''}));
  });
});
// nested per tab: tabIcons[tabIdx] = [svg per sub-feature]
const tabIcons=out.map(tab=>tab.map(s=>s.svg));
writeFileSync('verify/tab-icons.json',JSON.stringify(tabIcons));
out.forEach((tab,i)=>console.log('tab'+i+':',tab.map(s=>s.title.slice(0,22)+'('+(s.svg.match(/fill="([^"]+)"/)?.[1]||'?')+')').join(', ')));
console.log('total icons:',tabIcons.flat().length);
await b.close();
