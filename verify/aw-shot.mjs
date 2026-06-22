import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:3000/azure-for-construction/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const y=await p.evaluate(()=>{const s=[...document.querySelectorAll('section')].find(s=>/awards/i.test(s.textContent||'')&&getComputedStyle(s).backgroundImage.includes('gradient'));return s?s.getBoundingClientRect().top+scrollY:0;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-30)),y); await p.waitForTimeout(600);
await p.screenshot({path:'verify/awards-check.png', clip:{x:0,y:0,width:1440,height:340}});
// also: do the badge imgs have a rendered bounding box (visible) even with naturalWidth 0?
const r=await p.evaluate(()=>{const s=[...document.querySelectorAll('section')].find(s=>/awards/i.test(s.textContent||'')&&getComputedStyle(s).backgroundImage.includes('gradient'));const imgs=[...s.querySelectorAll('img')];return imgs.slice(0,3).map(i=>({nw:i.naturalWidth,boxW:Math.round(i.getBoundingClientRect().width),complete:i.complete,vis:i.offsetParent!==null}));});
console.log(JSON.stringify(r));
await b.close();
