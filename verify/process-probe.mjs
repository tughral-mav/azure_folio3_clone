import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/data-science-ai/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(h=>/deployment process|our.*process/i.test(txt(h)));
  if(!h)return {found:false};
  const sec=h.closest('.elementor-top-section');
  const widgets={};sec.querySelectorAll('[class*="elementor-widget-"]').forEach(w=>{const m=[...w.classList].find(c=>c.startsWith('elementor-widget-'));if(m){const t=m.replace('elementor-widget-','');if(!/wrap|container|laptop|mobile|tablet/.test(t))widgets[t]=(widgets[t]||0)+1;}});
  // step items
  const steps=[...sec.querySelectorAll('.elementor-icon-box-wrapper, .e-n-tab-title, .elementor-tab-title, [class*="step"]')].map(s=>txt(s).slice(0,50)).filter(Boolean);
  const allText=[...sec.querySelectorAll('h3,h4,.elementor-icon-box-title')].map(x=>txt(x)).filter(Boolean).slice(0,12);
  return {found:true, widgets:Object.entries(widgets).map(([k,v])=>k+'×'+v), stepTitles:allText, imgs:[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(s=>!s.includes('svg%')).slice(0,8)};
});
console.log(JSON.stringify(r,null,1));await b.close();
