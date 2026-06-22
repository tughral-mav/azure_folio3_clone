import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-scenario-library/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
// find the Financial Services / industry card section
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const card=[...document.querySelectorAll('*')].find(e=>/^Financial Services/i.test(txt(e))&&txt(e).length<200&&e.querySelector('*')===null===false);
  // the card container: walk up from the "Financial Services" heading
  const head=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test(txt(e)));
  const box=head?.closest('.elementor-column,.e-con,[class*="box"],article')||head?.parentElement?.parentElement;
  let bg=null,img=null,overlay=null;
  if(box){const cs=getComputedStyle(box);bg={bgColor:cs.backgroundColor,bgImage:cs.backgroundImage.slice(0,80)};
    const im=box.querySelector('img');if(im){const ics=getComputedStyle(im);img={src:(im.currentSrc||im.src).split('/').pop().split('?')[0],opacity:ics.opacity,objectFit:ics.objectFit};}
    // look for an overlay child with rgba bg
    box.querySelectorAll('*').forEach(e=>{const c=getComputedStyle(e);if(c.backgroundImage.includes('gradient')&&!overlay)overlay=c.backgroundImage.slice(0,120);if(c.backgroundColor.includes('rgba')&&c.backgroundColor!=='rgba(0, 0, 0, 0)'&&!overlay)overlay=c.backgroundColor;});
  }
  const headColor=head?getComputedStyle(head).color:null;
  return {found:!!head, bg, img, overlay, headColor};
});
console.log(JSON.stringify(info,null,1));
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(e=>/^Financial Services$/i.test((e.textContent||'').trim()));const box=h?.closest('.elementor-section,.elementor-top-section,.e-con')||h;return box.getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-40)),y);await p.waitForTimeout(600);
await p.screenshot({path:'verify/ind-live.png',clip:{x:0,y:0,width:1280,height:620}});
await b.close();
