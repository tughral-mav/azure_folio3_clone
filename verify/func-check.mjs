import { chromium } from 'playwright';
import { DESIGN_PAGES } from './routes.mjs';
const CLONE='http://localhost:3000';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:1000}});
const ROUTES=[...DESIGN_PAGES, '/', '/contact-us/', '/thank-you/', '/blog/', '/about-us/'];
const linkCache=new Map();
async function status(url){
  if(linkCache.has(url))return linkCache.get(url);
  let s=0; try{ const r=await ctx.request.get(url,{maxRedirects:0,timeout:20000}); s=r.status(); }catch{ s=-1; }
  linkCache.set(url,s); return s;
}
const issues=[];
const p=await ctx.newPage();
let checked=0;
for(const route of [...new Set(ROUTES)]){
  try{
    const resp=await p.goto(CLONE+route,{waitUntil:'load',timeout:60000});
    if(!resp || resp.status()>=400){ issues.push(`PAGE ${route} → status ${resp?.status()}`); continue; }
    // console errors
    // collect internal links + form + interactive widgets
    const info=await p.evaluate(()=>{
      const links=[...document.querySelectorAll('a[href^="/"]')].map(a=>a.getAttribute('href')).filter(h=>h && !h.startsWith('//') && !/\.(png|jpg|webp|svg|pdf)$/i.test(h));
      const hasForm=!!document.querySelector('form input[name],form input[type="email"]');
      const formAtPg=!!document.querySelector('#pgForm');
      const tabs=document.querySelectorAll('[role="tab"]').length;
      const ctaToForm=[...document.querySelectorAll('a[href="#pgForm"]')].length;
      return {links:[...new Set(links)], hasForm, formAtPg, tabs, ctaToForm};
    });
    // verify each internal link resolves (200 or 3xx to a real page); flag 404/-1
    for(const l of info.links){
      const u=l.startsWith('http')?l:CLONE+l;
      const s=await status(u.split('#')[0]);
      if(s===404 || s===-1 || s>=500){ issues.push(`BROKEN-LINK ${route} → ${l} (status ${s})`); }
    }
    // a page with a #pgForm CTA must have the form anchor
    if(info.ctaToForm>0 && !info.formAtPg) issues.push(`MISSING-FORM-ANCHOR ${route} (has ${info.ctaToForm} #pgForm CTAs but no #pgForm)`);
    checked++;
  }catch(e){ issues.push(`ERR ${route} ${e.message.slice(0,40)}`); }
}
await b.close();
console.log(`checked ${checked} pages, ${linkCache.size} unique links`);
console.log(`ISSUES: ${issues.length}`);
issues.slice(0,60).forEach(i=>console.log('  '+i));
