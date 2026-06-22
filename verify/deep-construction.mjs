import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function dump(url, tag){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(1500);
  const secs=await p.evaluate(()=>{
    const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const tops=[...document.querySelectorAll('.elementor-top-section')];
    const list = tops.length? tops : [...document.querySelectorAll('main > section, main > div > section, section')];
    return list.map(s=>{
      const heads=[...s.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].map(h=>(h.tagName||'SPAN')+':'+txt(h)).filter(t=>t.length<60).slice(0,10);
      const imgs=[...s.querySelectorAll('img')].filter(i=>i.offsetParent!==null && i.naturalWidth>1).map(i=>(i.currentSrc||i.src||'').split('/').pop().split('?')[0]).slice(0,12);
      const widgets={};s.querySelectorAll('[class*="elementor-widget-"]').forEach(w=>{const m=[...w.classList].find(c=>c.startsWith('elementor-widget-'));if(m){const t=m.replace('elementor-widget-','');if(!/wrap|container|laptop|mobile|tablet/.test(t))widgets[t]=(widgets[t]||0)+1;}});
      const counters=[...s.querySelectorAll('.elementor-counter-number, [class*="counter"]')].map(c=>txt(c)).filter(Boolean).slice(0,6);
      const r=s.getBoundingClientRect();
      return {h:heads[0]||'(no heading)', allHeads:heads, imgs, widgets:Object.keys(widgets), counters, height:Math.round(r.height)};
    }).filter(s=>s.allHeads.length||s.imgs.length);
  });
  await p.close(); return secs;
}
const live=await dump('https://azure.folio3.com/azure-for-construction/','live');
const clone=await dump('http://localhost:3000/azure-for-construction/','clone');
console.log('### LIVE ('+live.length+' sections) ###');
live.forEach((s,i)=>console.log(`L${i} h=${s.height} | ${s.h}\n   heads: ${s.allHeads.join(' | ')}\n   imgs(${s.imgs.length}): ${s.imgs.join(', ')}\n   widgets: ${s.widgets.join(',')}${s.counters.length?'\n   counters: '+s.counters.join(', '):''}`));
console.log('\n### CLONE ('+clone.length+' sections) ###');
clone.forEach((s,i)=>console.log(`C${i} h=${s.height} | ${s.h}\n   heads: ${s.allHeads.join(' | ')}\n   imgs(${s.imgs.length}): ${s.imgs.join(', ')}\n   widgets: ${s.widgets.join(',')}${s.counters.length?'\n   counters: '+s.counters.join(', '):''}`));
await b.close();
