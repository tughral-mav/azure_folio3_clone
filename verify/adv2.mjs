import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
// screenshot the section
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(e.textContent||''));return h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y);await p.waitForTimeout(600);
await p.screenshot({path:'verify/adv-live.png',clip:{x:0,y:0,width:1280,height:600}});
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const head=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>/^Cut Resume Screening/i.test(txt(e)));
  // climb to the visible CARD box: nearest ancestor with white-ish bg OR shadow OR radius>6
  let card=head,picked=null;
  for(let k=0;k<10&&card;k++){card=card.parentElement;if(!card)break;const cs=getComputedStyle(card);const hasBg=cs.backgroundColor&&cs.backgroundColor!=='rgba(0, 0, 0, 0)';const hasShadow=cs.boxShadow&&cs.boxShadow!=='none';const r=parseFloat(cs.borderRadius)||0;if(hasBg||hasShadow||r>6){picked=card;break;}}
  const c=picked||head.parentElement;const cs=getComputedStyle(c);
  // icon box
  const ibox=c.querySelector('.elementor-icon,.elementor-icon-box-icon,[class*="icon"]');
  const ib=ibox?getComputedStyle(ibox):null;
  const ibParent=ibox?.parentElement?getComputedStyle(ibox.parentElement):null;
  return {cardTag:c.tagName,cardCls:(c.className||'').toString().slice(0,55),bg:cs.backgroundColor,boxShadow:cs.boxShadow.slice(0,60),border:cs.border,radius:cs.borderRadius,transition:cs.transition.slice(0,60),padding:cs.padding,
    iconBoxBg:ib?ib.backgroundColor:null, iconBoxRadius:ib?ib.borderRadius:null, iconBoxW:ib?ib.width:null, iconColor:ib?ib.color:null};
});
console.log(JSON.stringify(info,null,1));
// proper hover test on the card box
const t=p.locator('.elementor-widget:has-text("Cut Resume Screening Time by 80%")').last();
const before=await t.evaluate(el=>{const cs=getComputedStyle(el);return {boxShadow:cs.boxShadow.slice(0,50),transform:cs.transform,borderColor:cs.borderColor}});
await t.hover();await p.waitForTimeout(450);
const after=await t.evaluate(el=>{const cs=getComputedStyle(el);return {boxShadow:cs.boxShadow.slice(0,50),transform:cs.transform,borderColor:cs.borderColor}});
console.log('hover before:',JSON.stringify(before));
console.log('hover after :',JSON.stringify(after));
await b.close();
