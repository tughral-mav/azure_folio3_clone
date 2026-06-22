import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-for-retail/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
// scroll the section into view + find an icon box widget
const box = await p.evaluateHandle(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head.closest('.elementor-section, .e-con');
  sec.scrollIntoView({block:'center'});
  const w=sec.querySelector('.elementor-widget-icon-box, .elementor-icon-box-wrapper, [class*="icon-box"]');
  return w;
});
const el = box.asElement();
const info = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head.closest('.elementor-section, .e-con');
  const w=sec.querySelector('.elementor-widget-icon-box, .elementor-icon-box-wrapper, [class*="icon-box"]');
  const iconWrap = w?.querySelector('.elementor-icon-box-icon, .elementor-icon');
  return { wCls:(w?.className||'').toString(), iconCls:(iconWrap?.className||'').toString(), animClasses:[...(w?.classList||[])].filter(c=>/animation|hover/i.test(c)) };
});
console.log('icon-box class:', info.wCls.slice(0,80));
console.log('icon class:', info.iconCls.slice(0,80));
console.log('anim classes:', info.animClasses);
await p.waitForTimeout(300);
await el.screenshot({path:'verify/hov_before.png'}).catch(()=>{});
await el.hover();
await p.waitForTimeout(700);
await el.screenshot({path:'verify/hov_after.png'}).catch(()=>{});
console.log('shots saved');
await b.close();
