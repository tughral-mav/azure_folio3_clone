import { chromium } from 'playwright';
const b=await chromium.launch();
for(const w of [1440, 1280]){
  const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:w,height:900}});
  await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},30);});});
  await p.waitForTimeout(1000);
  const r=await p.evaluate(()=>{const box=document.querySelector('.industries-box');if(!box)return 'none';const parent=box.parentElement;const cs=getComputedStyle(parent);return {parentDisplay:cs.display,gridCols:cs.gridTemplateColumns,flexWrap:cs.flexWrap,parentCls:parent.className.slice(0,40),boxW:Math.round(box.getBoundingClientRect().width)};});
  console.log('width '+w+':', JSON.stringify(r));
  await p.close();
}
await b.close();
