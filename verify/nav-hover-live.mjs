import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800},userAgent:UA});
await p.goto('https://azure.folio3.com/',{waitUntil:'load',timeout:90000});
await p.waitForTimeout(1500);
// find a top-level nav link (Services / Solutions) and inspect its CSS for hover/underline animation
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const nav=document.querySelector('#site-navigation, nav, .elementor-nav-menu, header');
  const items=[...document.querySelectorAll('a')].filter(a=>/^(services|solutions|industry|resources)$/i.test(txt(a)));
  const out=[];
  for(const a of items.slice(0,2)){
    const cs=getComputedStyle(a);
    const before=getComputedStyle(a,'::before');const after=getComputedStyle(a,'::after');
    out.push({label:txt(a), color:cs.color, transition:cs.transition, textDecoration:cs.textDecorationLine,
      after:{content:after.content,height:after.height,width:after.width,bg:after.backgroundColor,transform:after.transform,transition:after.transition,bottom:after.bottom,position:after.position,left:after.left},
      before:{content:before.content,height:before.height,width:before.width,bg:before.backgroundColor,transition:before.transition}});
  }
  return out;
});
console.log(JSON.stringify(info,null,1));
await b.close();
