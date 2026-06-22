import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-scenario-library/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(()=>{const el=[...document.querySelectorAll('p,div,span')].find(e=>/regulatory compliance checks/i.test(e.textContent||''));el?.scrollIntoView({block:'center'});});
await p.waitForTimeout(1500);
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
await p.waitForTimeout(800);
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const body=[...document.querySelectorAll('p,div,span')].find(e=>/^For regulatory compliance checks/i.test(txt(e)));
  // the card = ancestor that visually is the box (has bg or img + padding/radius)
  let box=body, picked=null;
  for(let k=0;k<8&&box;k++){box=box.parentElement;if(!box)break;const cs=getComputedStyle(box);const hasImg=box.querySelector('img');if(cs.backgroundImage.includes('url')||cs.backgroundImage.includes('gradient')||hasImg||cs.backgroundColor.startsWith('rgb')&&cs.backgroundColor!=='rgba(0, 0, 0, 0)'){picked=box;if(parseFloat(cs.borderRadius)>4||cs.backgroundImage.includes('gradient'))break;}}
  const card=picked||body?.parentElement;const cs=getComputedStyle(card);
  const head=card.querySelector('h2,h3,h4,.elementor-heading-title');
  const im=card.querySelector('img');const ics=im?getComputedStyle(im):{};
  let layers=[];card.querySelectorAll('*').forEach(e=>{const c=getComputedStyle(e);if(c.backgroundImage.includes('gradient'))layers.push('grad:'+c.backgroundImage.slice(0,80));else if(c.backgroundColor.startsWith('rgba')&&c.backgroundColor!=='rgba(0, 0, 0, 0)')layers.push('rgba:'+c.backgroundColor);});
  return {cardBgColor:cs.backgroundColor,cardBgImg:cs.backgroundImage.slice(0,90),cardRadius:cs.borderRadius,img:im?{src:(im.currentSrc||im.src).split('/').pop().split('?')[0],opacity:ics.opacity,fit:ics.objectFit,w:Math.round(im.getBoundingClientRect().width),h:Math.round(im.getBoundingClientRect().height)}:null,headText:txt(head),headColor:head?getComputedStyle(head).color:null,bodyColor:getComputedStyle(body).color,layers:[...new Set(layers)].slice(0,5)};
});
console.log(JSON.stringify(info,null,1));
const r=await p.evaluate(()=>{const el=[...document.querySelectorAll('p,div,span')].find(e=>/^For regulatory compliance checks/i.test((e.textContent||'').replace(/\s+/g,' ').trim()));return {top:el.getBoundingClientRect().top+scrollY};});
await p.evaluate((y)=>scrollTo(0,Math.max(0,y-300)),r.top);await p.waitForTimeout(500);
await p.screenshot({path:'verify/ind-live3.png',clip:{x:0,y:0,width:1280,height:560}});
await b.close();
