import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const data=JSON.parse(readFileSync('verify/agent-data.json','utf8'));
const exPath='azure-clone-next/content-kit/agent-extras.json';
const ex=JSON.parse(readFileSync(exPath,'utf8'));
for(const [slug,d] of Object.entries(data)){
  ex[slug]=ex[slug]||{};
  if(d.video?.youtube && d.video.posterUrl){
    const localPath=d.video.posterUrl.replace(/^https?:\/\/[^/]+/,'').split('?')[0];
    const dest='azure-clone-next/public'+localPath;
    try{const res=await fetch(d.video.posterUrl,{headers:{'User-Agent':UA}});if(res.ok){const buf=Buffer.from(await res.arrayBuffer());mkdirSync(dirname(dest),{recursive:true});writeFileSync(dest,buf);console.log('poster '+slug.replace('ai_agents_','')+' -> '+buf.length+'b '+localPath.split('/').pop());}else console.log('poster '+slug+' HTTP '+res.status);}catch(e){console.log('poster '+slug+' ERR '+e.message.slice(0,30));}
    ex[slug].video={youtube:d.video.youtube,poster:localPath};
  }
  if(d.aiAdvantageIcons?.length===4){ex[slug].aiAdvantageIcons=d.aiAdvantageIcons;console.log('  +4 AI Advantage icons for '+slug.replace('ai_agents_',''));}
}
writeFileSync(exPath,JSON.stringify(ex,null,1));
console.log('merged. keys:',Object.keys(ex).length);
