import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-scenario-library/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test((e.textContent||'').trim()));h?.scrollIntoView({block:'center'});});
await p.waitForTimeout(1500);
// load images in the card section
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
await p.waitForTimeout(800);
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const head=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test(txt(e)));
  // climb to the card box: the first ancestor that has a background-image or an <img> child + rounded corners
  let box=head, picked=null;
  for(let k=0;k<8&&box;k++){box=box.parentElement;if(!box)break;const cs=getComputedStyle(box);const hasImg=box.querySelector('img');const rounded=parseFloat(cs.borderRadius)>4;if((cs.backgroundImage.includes('url')||hasImg)&&(rounded||cs.backgroundImage.includes('gradient'))){picked=box;break;}}
  const card=picked||head?.parentElement;
  const cs=card?getComputedStyle(card):{};
  const im=card?.querySelector('img');
  const ics=im?getComputedStyle(im):{};
  // any overlay element
  let overlays=[];card?.querySelectorAll('*').forEach(e=>{const c=getComputedStyle(e);if((c.backgroundColor&&c.backgroundColor.startsWith('rgba')&&c.backgroundColor!=='rgba(0, 0, 0, 0)')||c.backgroundImage.includes('gradient'))overlays.push((c.backgroundColor!=='rgba(0, 0, 0, 0)'?c.backgroundColor:'')+(c.backgroundImage.includes('gradient')?' | '+c.backgroundImage.slice(0,90):''));});
  return {cardBg:cs.backgroundColor, cardBgImg:(cs.backgroundImage||'').slice(0,100), cardRadius:cs.borderRadius, img:im?{src:(im.currentSrc||im.src).split('/').pop().split('?')[0],opacity:ics.opacity,objectFit:ics.objectFit}:null, overlays:overlays.slice(0,4), headColor:head?getComputedStyle(head).color:null, bodyColor:(()=>{const pp=card?.querySelector('p');return pp?getComputedStyle(pp).color:null;})()};
});
console.log(JSON.stringify(info,null,1));
const r=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test((e.textContent||'').trim()));const rect=h.getBoundingClientRect();return {top:rect.top+scrollY};});
await p.evaluate((y)=>scrollTo(0,Math.max(0,y-320)),r.top);await p.waitForTimeout(500);
await p.screenshot({path:'verify/ind-live2.png',clip:{x:0,y:0,width:1280,height:560}});
await b.close();
