import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['ai_agents_smartexpense_agent','/ai-agents/smartexpense-agent/'],
  ['ai_agents_it_asset_management_agent','/ai-agents/it-asset-management-agent/'],
  ['ai_agents_kubemonitor_agent','/ai-agents/kubemonitor-agent/'],
  ['ai_agents_ai_powered_ticketing_and_customer_service_agent','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();const out={};
for(const [slug,route] of PAGES){
  const p=await b.newPage({viewport:{width:1366,height:1000},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.waitForTimeout(1200);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);
    const d=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
      const pos=e=>{const r=e.getBoundingClientRect();return {y:Math.round(r.top+window.scrollY),x:Math.round(r.left)};};
      const raw=[];
      for(const el of document.querySelectorAll('.elementor-icon-box-wrapper')){const t=txt(el.querySelector('.elementor-icon-box-title'));const desc=txt(el.querySelector('.elementor-icon-box-description'));const svg=el.querySelector('.elementor-icon svg');const i=el.querySelector('.elementor-icon i');if(t&&t.length<60&&desc.length<6&&(svg||i)){const {y,x}=pos(el);raw.push({type:'icon',y,x,label:t,svg:svg?svg.outerHTML:'',fa:i?i.className:''});}}
      for(const el of document.querySelectorAll('.elementor-counter')){const n=el.querySelector('.elementor-counter-number');const {y,x}=pos(el);raw.push({type:'counter',y,x,to:parseFloat(n?.getAttribute('data-to-value'))||0,suffix:txt(el.querySelector('.elementor-counter-number-suffix')),label:txt(el.querySelector('.elementor-counter-title'))});}
      if(!raw.length)return [];
      const minY=Math.min(...raw.map(r=>r.y));
      return raw.filter(r=>r.y<minY+260).sort((a,b)=>a.x-b.x);
    });
    out[slug]=d.map(({type,label,to,suffix,svg,fa})=>type==='counter'?{type,to,suffix,label}:{type,label,svg,fa});
    console.log(slug.replace('ai_agents_','')+' ('+d.length+'): '+d.map(s=>s.type==='counter'?(s.to+s.suffix+' "'+s.label.slice(0,22)+'"'):('['+(s.svg?'svg':s.fa.replace('fas ',''))+'] "'+s.label.slice(0,24)+'"')).join('  |  '));
  }catch(e){console.log(slug+' ERR '+e.message.slice(0,40));}
  await p.close();
}
writeFileSync('verify/herostats.json',JSON.stringify(out));
await b.close();
