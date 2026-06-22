import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1240,height:900}});
await p.goto(process.argv[2],{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(600);
const r=await p.evaluate(()=>{const out=[];document.querySelectorAll('*').forEach(e=>{if(e.children.length===0&&e.textContent.trim()==='◆'){let n=e.closest('li,div');let t='';for(let k=0;k<4&&n;k++){const h=n.querySelector('h3,h4');if(h){t=h.textContent.trim();break;}n=n.parentElement;}out.push(t.slice(0,40));}});return out;});
console.log(JSON.stringify(r));await b.close();
