import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  '/ai-powered-solutions/copilot-for-recruitment/',
  '/ai-agents/smartexpense-agent/',
  '/ai-agents/it-asset-management-agent/',
  '/ai-agents/kubemonitor-agent/',
  '/ai-agents/ai-powered-ticketing-and-customer-service-agent/',
];
const b=await chromium.launch();
for(const route of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'domcontentloaded',timeout:90000});
    await p.waitForTimeout(1800);
    const r=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const hero=document.querySelector('.elementor-top-section');
      const h1=txt(hero.querySelector('h1,.elementor-heading-title'));
      // buttons
      const btns=[...hero.querySelectorAll('a.elementor-button,a.elementor-button-link,.elementor-button-wrapper a, a[class*="button"]')].map(a=>({text:txt(a),href:a.getAttribute('href'),hasIcon:!!a.querySelector('svg,i,img')})).filter(x=>x.text);
      // stat items: icon-list or icon-box with a label; plus counters
      const stats=[];
      hero.querySelectorAll('.elementor-icon-box-wrapper,.elementor-icon-list-item,[class*="counter"]').forEach(e=>{const t=txt(e);if(t&&t.length<60){const img=e.querySelector('img');const ic=e.querySelector('i[class],svg,.elementor-icon');stats.push({label:t.slice(0,40),img:img?(img.currentSrc||img.src).split('/').pop():'',iconCls:ic?(ic.className||'').toString().slice(0,30):''});}});
      // counter numbers
      const nums=[...hero.querySelectorAll('.elementor-counter-number,[data-to-value]')].map(n=>({to:n.getAttribute('data-to-value')||txt(n),suffix:txt(n.parentElement?.querySelector('.elementor-counter-number-suffix'))}));
      // ALL imgs in hero (for icon discovery)
      const imgs=[...hero.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(s=>!/svg%|folio3_by/i.test(s));
      return {h1:h1.slice(0,50),btns,stats,nums,imgs:[...new Set(imgs)]};
    });
    console.log('### '+route);
    console.log(JSON.stringify(r,null,1));
  }catch(e){console.log(route+' ERR '+e.message.slice(0,40));}
  await p.close();
}
await b.close();
