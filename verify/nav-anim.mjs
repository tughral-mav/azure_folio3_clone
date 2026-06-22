import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:300}});
const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,80)));p.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,80)));
await p.goto('http://localhost:3000/',{waitUntil:'networkidle',timeout:60000});
const sol=p.locator('nav[aria-label="Primary"] button:has-text("Solutions")');
// underline width at rest vs hovered
const rest=await sol.evaluate(el=>getComputedStyle(el,'::after').width);
await sol.hover();await p.waitForTimeout(400);
const hov=await sol.evaluate(el=>getComputedStyle(el,'::after').width);
const bg=await sol.evaluate(el=>getComputedStyle(el,'::after').backgroundColor);
console.log('Solutions underline ::after width  rest:',rest,' hovered:',hov,' color:',bg);
await p.screenshot({path:'verify/nav-anim.png',clip:{x:280,y:0,width:620,height:90}});
console.log('console/page errors:',errs.length?JSON.stringify(errs):'none');
await b.close();
