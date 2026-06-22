import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const url=process.argv[2], outdir=process.argv[3], tag=process.argv[4]||'live';
const b=await chromium.launch();
const p=await b.newPage({userAgent:UA,viewport:{width:1440,height:1100}});
await p.goto(url,{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,700);y+=700;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},45);});});
await p.waitForTimeout(1200);
const h=await p.evaluate(()=>document.body.scrollHeight);
const slice=1100; const n=Math.ceil(h/slice);
for(let i=0;i<n;i++){
  await p.evaluate(y=>scrollTo(0,y), i*slice);
  await p.waitForTimeout(300);
  await p.screenshot({path:`${outdir}/${tag}_${String(i).padStart(2,'0')}.png`});
}
console.log('slices:',n,'pageHeight:',h);
await b.close();
