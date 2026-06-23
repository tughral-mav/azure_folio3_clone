import { readFileSync } from 'node:fs';
for(const slug of ['ai_agents_it_asset_management_agent','ai_agents_kubemonitor_agent','ai_agents_ai_powered_ticketing_and_customer_service_agent','ai_agents_smartexpense_agent']){
  const j=JSON.parse(readFileSync('azure-clone-next/content-kit/content/'+slug+'.json','utf8'));
  const secs=(j.sections||[]).map(s=>{const h=(s.items||[]).find(it=>it.t==='h');return h?h.text:'(none)';});
  const ri=secs.findIndex(t=>/^\s*ready to /i.test(t));
  console.log(slug.replace('ai_agents_','')+': video-sec(idx '+(ri-1)+')="'+secs[ri-1]+'"  | ready(idx '+ri+')="'+secs[ri]+'"');
}
