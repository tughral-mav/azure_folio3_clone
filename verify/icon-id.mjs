import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,300);y+=300;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},20);});});
await p.waitForTimeout(2000);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(txt(e)));
  const sec=h.closest('.elementor-top-section');
  const titles=['Cut Resume Screening','Productivity Gained','Lower Cost-per-Hire','Match the Right Talent'];
  return titles.map(t=>{
    const head=[...sec.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>txt(e).startsWith(t.split(' ').slice(0,3).join(' ')));
    // walk up to icon-box wrapper, find the icon
    const box=head?.closest('.elementor-widget-icon-box,.elementor-icon-box-wrapper')||head?.closest('.elementor-widget');
    const i=box?.querySelector('i[class]');const svg=box?.querySelector('svg');const img=box?.querySelector('img');
    let glyph=null,font=null;
    if(i){const cs=getComputedStyle(i,'::before');glyph=cs.content;font=cs.fontFamily;}
    return {title:t, iClass:i?[...i.classList].join(' '):null, glyph, font, svg:svg?(svg.querySelector('use')?.getAttribute('xlink:href')||svg.querySelector('use')?.getAttribute('href')||'inline-svg'):null, img:img?(img.currentSrc||img.src).split('/').pop():null};
  });
});
console.log(JSON.stringify(out,null,1));
await b.close();
