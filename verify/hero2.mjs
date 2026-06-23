import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['recruit','/ai-powered-solutions/copilot-for-recruitment/'],
  ['smartexpense','/ai-agents/smartexpense-agent/'],
  ['itasset','/ai-agents/it-asset-management-agent/'],
  ['kube','/ai-agents/kubemonitor-agent/'],
  ['ticketing','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();
for(const [name,route] of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.waitForTimeout(1500);
    const r=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const h1=[...document.querySelectorAll('h1')].find(h=>txt(h).length>3);
      const hero=h1?.closest('.elementor-top-section')||h1?.closest('section');
      if(!hero)return{err:'no hero'};
      const links=[...hero.querySelectorAll('a')].map(a=>{const cs=getComputedStyle(a);return {text:txt(a).slice(0,28),href:a.getAttribute('href'),bg:cs.backgroundColor,border:cs.borderWidth!=='0px',hasIcon:!!a.querySelector('svg,i,img')};}).filter(x=>x.text&&x.text.length<28&&!/folio3|talk with us/i.test(x.text));
      // stats: small labelled blocks below buttons + counters
      const counters=[...hero.querySelectorAll('.elementor-counter-number,[data-to-value]')].map(n=>({to:n.getAttribute('data-to-value')||txt(n),sfx:txt(n.parentElement)}));
      // icon-list / icon-box stat items
      const statItems=[...hero.querySelectorAll('.elementor-icon-list-item,.elementor-icon-box-wrapper,.elementor-widget-icon-box')].map(e=>{const img=e.querySelector('img');const ic=e.querySelector('i[class]');return {label:txt(e).slice(0,42),img:img?(img.currentSrc||img.src).split('/').pop().split('?')[0]:'',iconCls:ic?[...ic.classList].join(' '):''};}).filter(x=>x.label&&!/talk with us/i.test(x.label));
      const imgs=[...hero.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(s=>!/svg%|folio3_by/i.test(s));
      return {h1:txt(h1).slice(0,55),links,counters,statItems,imgs:[...new Set(imgs)]};
    });
    console.log('### '+name+' '+route+'\n'+JSON.stringify(r));
  }catch(e){console.log(name+' ERR '+e.message.slice(0,40));}
  if(name==='recruit'){await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);await p.screenshot({path:'verify/hero-recruit.png',clip:{x:0,y:0,width:1280,height:760}});}
  await p.close();
}
await b.close();
