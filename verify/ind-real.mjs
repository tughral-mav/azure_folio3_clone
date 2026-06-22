import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-scenario-library/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(()=>{const el=[...document.querySelectorAll('*')].find(e=>/^For regulatory compliance checks/i.test((e.textContent||'').replace(/\s+/g,' ').trim()));el?.scrollIntoView({block:'center'});});
await p.waitForTimeout(1200);
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete&&i.naturalWidth>0?1:new Promise(r=>{i.addEventListener('load',r);i.addEventListener('error',r);setTimeout(r,4000);})));});
await p.waitForTimeout(1000);
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const head=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test(txt(e)));
  if(!head)return{err:'no head'};
  // CARD = ancestor that contains the photo img + the blue box
  let card=head;for(let k=0;k<9;k++){card=card.parentElement;if(card&&card.querySelector('img')&&getComputedStyle(card).borderRadius&&card.getBoundingClientRect().height>200)break;}
  const C=card.getBoundingClientRect();
  const rel=el=>{const r=el.getBoundingClientRect();return {x:Math.round(r.left-C.left),y:Math.round(r.top-C.top),w:Math.round(r.width),h:Math.round(r.height)};};
  const img=card.querySelector('img');const ics=img?getComputedStyle(img):{};
  // blue box = nearest ancestor of head with a solid blue bg
  let box=head;for(let k=0;k<6;k++){const cs=getComputedStyle(box);if(cs.backgroundColor&&cs.backgroundColor!=='rgba(0, 0, 0, 0)'&&/^rgb/.test(cs.backgroundColor)&&parseInt(cs.backgroundColor.match(/\d+/g)[2])>120)break;box=box.parentElement;if(!box){box=head;break;}}
  const bcs=getComputedStyle(box);
  return {
    card:{w:Math.round(C.width),h:Math.round(C.height),radius:getComputedStyle(card).borderRadius},
    photo:img?{src:(img.currentSrc||img.src).split('/').pop().split('?')[0],fit:ics.objectFit,opacity:ics.opacity,rect:rel(img)}:null,
    blueBox:{rect:rel(box),bg:bcs.backgroundColor,transform:bcs.transform,radius:bcs.borderRadius,padding:bcs.padding},
    headColor:getComputedStyle(head).color,
  };
});
console.log(JSON.stringify(info,null,1));
const r=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test((e.textContent||'').trim()));let c=h;for(let k=0;k<9;k++){c=c.parentElement;if(c&&c.querySelector('img')&&c.getBoundingClientRect().height>200)break;}return {top:c.getBoundingClientRect().top+scrollY};});
await p.evaluate((y)=>scrollTo(0,Math.max(0,y-30)),r.top);await p.waitForTimeout(600);
await p.screenshot({path:'verify/ind-real.png',clip:{x:0,y:0,width:1280,height:480}});
await b.close();
