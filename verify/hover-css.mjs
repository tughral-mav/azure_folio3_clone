import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-for-retail/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  // gather the section's element classes for matching
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head?.closest('.elementor-section, .e-con');
  const secEls = sec? [...sec.querySelectorAll('*')] : [];
  const out=[];
  for(const sheet of document.styleSheets){
    let rules; try{ rules=sheet.cssRules; }catch(e){ continue; }
    for(const rule of rules||[]){
      if(rule.selectorText && /:hover/.test(rule.selectorText)){
        // does the base selector (minus :hover) match any element in the section?
        const base=rule.selectorText.replace(/:hover/g,'').replace(/::?(before|after)/g,'').trim();
        try{ if(base && secEls.some(e=>{try{return e.matches(base) || e.closest(base);}catch{return false;}})){
          out.push(rule.selectorText+' { '+rule.style.cssText.slice(0,120)+' }');
        }}catch(e){}
      }
    }
  }
  return [...new Set(out)].slice(0,25);
});
console.log('HOVER RULES affecting Why-leverage section:'); r.forEach(x=>console.log('  '+x));
await b.close();
