import { chromium } from 'playwright';
import { DESIGN_PAGES } from './routes.mjs';
const CLONE='http://localhost:3000';
const b=await chromium.launch();
const ROUTES=[...DESIGN_PAGES.slice(0,30),'/', '/contact-us/','/thank-you/','/blog/','/about-us/'];
const errs=[];
for(const route of [...new Set(ROUTES)]){
  const p=await b.newPage({viewport:{width:1440,height:1000}});
  const pageErrs=[];
  p.on('console',m=>{ if(m.type()==='error'){ const t=m.text(); if(!/favicon|net::ERR|404 \(/.test(t)) pageErrs.push(t.slice(0,80)); }});
  p.on('pageerror',e=>pageErrs.push('PAGEERROR: '+e.message.slice(0,80)));
  try{ await p.goto(CLONE+route,{waitUntil:'load',timeout:60000}); await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,800);y+=800;if(y>document.body.scrollHeight){clearInterval(t);r();}},20);});}); await p.waitForTimeout(800);}catch(e){pageErrs.push('LOAD: '+e.message.slice(0,40));}
  if(pageErrs.length) errs.push({route,errs:[...new Set(pageErrs)]});
  await p.close();
}
await b.close();
console.log(`checked ${[...new Set(ROUTES)].length} pages`);
console.log(`pages with console/JS errors: ${errs.length}`);
errs.forEach(e=>console.log(`  ${e.route}:\n    ${e.errs.join('\n    ')}`));
