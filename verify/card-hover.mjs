import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
// find the card container that wraps the title + has the lavender bg / is the link
const probe=async(sel)=>{
  const loc=p.locator(sel).first();
  // walk to the card box element
  const handle=await loc.evaluateHandle(el=>{let n=el;for(let k=0;k<8&&n;k++){const cs=getComputedStyle(n);const bg=cs.backgroundColor;const r=parseFloat(cs.borderRadius)||0;if((bg&&bg!=='rgba(0, 0, 0, 0)')||r>8||n.tagName==='A'){return n;}n=n.parentElement;}return el;});
  const before=await handle.evaluate(el=>{const cs=getComputedStyle(el);return {tag:el.tagName,cls:(el.className||'').toString().slice(0,40),transition:cs.transition.slice(0,60),transform:cs.transform,boxShadow:cs.boxShadow.slice(0,50),bg:cs.backgroundColor,border:cs.border};});
  await handle.hover();await p.waitForTimeout(500);
  const after=await handle.evaluate(el=>{const cs=getComputedStyle(el);return {transform:cs.transform,boxShadow:cs.boxShadow.slice(0,50),bg:cs.backgroundColor,border:cs.border};});
  // also check the arrow inside
  const arrow=await handle.evaluate(el=>{const a=el.querySelector('.cr-arrow');if(!a)return null;const cs=getComputedStyle(a);return {transform:cs.transform,transition:cs.transition.slice(0,40)};});
  return {before,after,arrow};
};
const r=await probe('text=Cut Resume Screening Time by 80%');
console.log(JSON.stringify(r,null,1));
await b.close();
