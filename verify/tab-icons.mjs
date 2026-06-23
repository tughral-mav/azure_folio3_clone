import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
// click through each tab, capture its sub-feature icons (svg path-count to see if themed vs uniform checkmark)
const out=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
  const panels=[...document.querySelectorAll('.elementor-tab-content')];
  return panels.slice(0,4).map(panel=>{
    const cat=txt(panel.querySelector('h2,h3,.elementor-heading-title'));
    const subs=[...panel.querySelectorAll('.elementor-icon-box-wrapper')].map(s=>{const svg=s.querySelector('svg');return {title:txt(s.querySelector('.elementor-icon-box-title')).slice(0,30),svgViewBox:svg?.getAttribute('viewBox'),paths:svg?svg.querySelectorAll('path').length:0,svgLen:svg?svg.outerHTML.length:0};});
    return {category:cat.slice(0,38), subCount:subs.length, subs};
  });
});
out.forEach(t=>{console.log('TAB:',t.category,'('+t.subCount+' subs)');t.subs.forEach(s=>console.log('   -',s.title,'| viewBox',s.svgViewBox,'paths',s.paths,'len',s.svgLen));});
// are the sub-feature icons all the SAME (checkmark) or different (themed)? compare svgLen uniqueness
const allLens=out.flatMap(t=>t.subs.map(s=>s.svgLen));
console.log('distinct sub-icon svg sizes:',[...new Set(allLens)].length,'of',allLens.length,'->',[...new Set(allLens)].length<=2?'UNIFORM (same icon)':'THEMED (different per item)');
await b.close();
