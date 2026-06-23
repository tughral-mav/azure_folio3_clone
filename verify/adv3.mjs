import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(txt(e)));
  const sec=h.closest('.elementor-top-section');
  // the 4 cards = inner containers each containing one of the titles
  const titles=['Cut Resume Screening','Productivity Gained','Lower Cost-per-Hire','Match the Right Talent'];
  const cards=titles.map(t=>{
    const head=[...sec.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>txt(e).startsWith(t.split(' ').slice(0,3).join(' ')));
    if(!head)return{title:t,err:'no head'};
    // the card container = the e-con / column ancestor with a background color
    let box=head,bgBox=null;for(let k=0;k<9&&box;k++){box=box.parentElement;if(!box)break;const cs=getComputedStyle(box);if(cs.backgroundColor&&cs.backgroundColor!=='rgba(0, 0, 0, 0)'){bgBox=box;break;}}
    const cs=bgBox?getComputedStyle(bgBox):{};
    const img=(head.closest('.e-con,.elementor-column,.elementor-widget-wrap')||sec).querySelector('img');
    const link=head.closest('a')||bgBox?.querySelector('a')||head.parentElement?.querySelector('a');
    return {title:t, cardBg:cs.backgroundColor, cardRadius:cs.borderRadius, cardShadow:(cs.boxShadow||'').slice(0,40), cardBorder:cs.border, cardTransition:(cs.transition||'').slice(0,40),
      icon:img?(img.currentSrc||img.src).split('/').pop().split('?')[0]:'NO-IMG', href:link?link.getAttribute('href'):null};
  });
  // all icon imgs in section
  const allIcons=[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(s=>!/svg%|logo|folio3/i.test(s));
  // CTA arrow: look for the request-a-call link structure
  const ctaLink=[...sec.querySelectorAll('a')].find(a=>/request a call/i.test(txt(a)));
  const cta={text:txt(ctaLink),href:ctaLink?.getAttribute('href'),hasArrowSvg:!!ctaLink?.querySelector('svg,i,img'),html:(ctaLink?.innerHTML||'').slice(0,120)};
  const secBg=getComputedStyle(sec).backgroundColor;
  return {cards,allIcons:[...new Set(allIcons)],cta,secBg};
});
console.log(JSON.stringify(out,null,1));
await b.close();
