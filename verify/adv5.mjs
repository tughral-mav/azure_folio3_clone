import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,300);y+=300;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(2000);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const head=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>txt(e).startsWith('Cut Resume Screening'));
  // the card = the e-con/column ancestor that visually wraps icon+title+desc+cta
  let card=head;for(let k=0;k<8;k++){const par=card.parentElement;if(!par)break;if(/cut resume/i.test(txt(par))&&/request a call/i.test(txt(par))){card=par;break;}card=par;}
  // icon element
  const iconEl=card.querySelector('.elementor-icon i, .elementor-icon svg, i[class*="fa"], i[class*="icon"]');
  // computed bg of the card (color + image)
  const cs=getComputedStyle(card);
  // find the element carrying the lavender bg
  let bgInfo=null;[card,...card.querySelectorAll('*')].forEach(e=>{const c=getComputedStyle(e);if(!bgInfo&&((c.backgroundColor&&c.backgroundColor!=='rgba(0, 0, 0, 0)')||(c.backgroundImage&&c.backgroundImage.includes('gradient')))){bgInfo={tag:e.tagName,cls:(e.className||'').toString().slice(0,40),bg:c.backgroundColor,bgImg:c.backgroundImage.slice(0,60),radius:c.borderRadius,shadow:c.boxShadow.slice(0,40)};}});
  return {
    iconHTML: iconEl?iconEl.outerHTML.slice(0,160):'(no icon el)',
    iconClass: iconEl?(iconEl.className||'').toString():null,
    cardBg: bgInfo,
    cardTransition: cs.transition.slice(0,50),
    cardOuterStart: card.outerHTML.replace(/\s+/g,' ').slice(0,400),
  };
});
console.log(JSON.stringify(out,null,1));
await b.close();
