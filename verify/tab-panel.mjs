import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  // the active tab content panel
  const panel=document.querySelector('.elementor-tab-content.elementor-active')||document.querySelector('.elementor-tab-content');
  if(!panel)return{err:'no panel'};
  const cs=getComputedStyle(panel);
  const img=panel.querySelector('img');
  const subItems=[...panel.querySelectorAll('h3,h4,.elementor-heading-title')].map(h=>txt(h).slice(0,40)).filter(Boolean).slice(0,6);
  const cta=[...panel.querySelectorAll('a')].find(a=>/request a call/i.test(txt(a)));
  // layout: is it 2-column (image left/right + list)?
  const cols=panel.querySelectorAll('.elementor-column').length;
  return {subItems, img:img?(img.currentSrc||img.src).split('/').pop().split('?')[0]:null, imgPos:img?(img.getBoundingClientRect().left<640?'left':'right'):null, cta:cta?txt(cta):null, cols, display:cs.display};
});
console.log(JSON.stringify(out,null,1));
// screenshot the tabs + active panel
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/what do you get/i.test(e.textContent));return h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy+260)),y);await p.waitForTimeout(600);
await p.screenshot({path:'verify/live-tabpanel.png',clip:{x:0,y:0,width:1280,height:640}});
await b.close();
