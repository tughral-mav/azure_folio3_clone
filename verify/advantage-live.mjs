import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(txt(e)));
  if(!h)return{err:'heading not found'};
  const sec=h.closest('.elementor-top-section');
  // identify the 4 cards (contain "Cut Resume" etc.)
  const cards=[...sec.querySelectorAll('.elementor-widget,.elementor-column,.e-con')].filter(c=>{const t=txt(c);return /cut resume screening|productivity gained|lower cost-per-hire|match the right talent/i.test(t)&&t.length<260&&c.querySelector('h1,h2,h3,h4,.elementor-heading-title');});
  // pick the tightest card wrapper for the first one
  const card=cards.sort((a,b)=>txt(a).length-txt(b).length)[0];
  const info={heading:txt(h)};
  if(card){
    const cs=getComputedStyle(card);
    info.card={cls:(card.className||'').toString().slice(0,60),transition:cs.transition,boxShadow:cs.boxShadow,border:cs.border,borderRadius:cs.borderRadius,bg:cs.backgroundColor,transform:cs.transform};
    // entrance animation (Elementor)
    const animEl=card.closest('[data-settings]')||card.querySelector('[data-settings]');
    info.dataSettings=animEl?animEl.getAttribute('data-settings'):null;
    info.animClass=[...card.classList].filter(c=>/animat|fade|zoom|slide/i.test(c));
    // is the card or REQUEST A CALL a link?
    const link=card.closest('a')||card.querySelector('a');
    info.cardIsLink=!!link; info.linkHref=link?link.getAttribute('href'):null;
    info.requestACallIsLink=[...card.querySelectorAll('a')].map(a=>({text:txt(a).slice(0,20),href:a.getAttribute('href')}));
    // icon
    const ico=card.querySelector('svg,img,.elementor-icon i,.elementor-icon');
    info.icon={tag:ico?.tagName,cls:(ico?.className||'').toString().slice(0,40),svgPath:ico?.tagName==='svg'?(ico.querySelector('path')?.getAttribute('d')||'').slice(0,40):null};
    const iconBox=card.querySelector('.elementor-icon-box-icon,[class*="icon"]');
    if(iconBox){const ics=getComputedStyle(iconBox);info.iconBox={bg:ics.backgroundColor,radius:ics.borderRadius,w:ics.width,h:ics.height};}
  }
  return info;
});
console.log(JSON.stringify(out,null,1));
// hover test on the first card
try{
  const target=p.locator('text=Cut Resume Screening Time by 80%').first();
  const box=await target.evaluate(el=>{const c=el.closest('.elementor-widget,.elementor-column,.e-con');const s=getComputedStyle(c);return {boxShadow:s.boxShadow,transform:s.transform,bg:s.backgroundColor};});
  await target.hover();await p.waitForTimeout(500);
  const after=await target.evaluate(el=>{const c=el.closest('.elementor-widget,.elementor-column,.e-con');const s=getComputedStyle(c);return {boxShadow:s.boxShadow,transform:s.transform,bg:s.backgroundColor};});
  console.log('HOVER before:',JSON.stringify(box));
  console.log('HOVER after :',JSON.stringify(after));
}catch(e){console.log('hover test err:',e.message.slice(0,50));}
await b.close();
