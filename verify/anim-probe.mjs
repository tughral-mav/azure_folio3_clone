import { chromium } from 'playwright';
const b = await chromium.launch();
for (const route of ['/', '/azure-managed-services/']) {
  const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
  await p.goto('https://azure.folio3.com'+route, { waitUntil:'domcontentloaded', timeout:90000 });
  // read BEFORE scroll so entrance animations haven't been stripped
  const r = await p.evaluate(()=>{
    const out={};
    document.querySelectorAll('[data-settings]').forEach(el=>{
      const ds=el.getAttribute('data-settings')||'';
      const m=ds.match(/"_animation":"([a-zA-Z]+)"/);
      if(m){ const hasImg=!!el.querySelector('img') || el.tagName==='IMG'; const key=m[1]+(hasImg?' (img)':' (other)'); out[key]=(out[key]||0)+1; }
    });
    // also elementor-invisible image widgets
    const invis=document.querySelectorAll('.elementor-widget-image.elementor-invisible, img.elementor-invisible').length;
    return {anims:out, invisibleImages:invis};
  });
  console.log(route, JSON.stringify(r));
  await p.close();
}
await b.close();
