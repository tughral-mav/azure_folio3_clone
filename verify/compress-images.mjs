import sharp from '../azure-clone-next/node_modules/sharp/lib/index.js';
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const ROOT='azure-clone-next/public';
function walk(dir){let out=[];for(const e of readdirSync(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())out=out.concat(walk(p));else out.push(p);}return out;}
const files=walk(ROOT).filter(f=>/\.(png|jpe?g|webp)$/i.test(f)&&statSync(f).size>500*1024);
let saved=0,before=0,after=0,n=0;
for(const f of files){
  const orig=readFileSync(f);before+=orig.length;
  try{
    const img=sharp(orig,{failOn:'none'});const meta=await img.metadata();
    let pipe=sharp(orig,{failOn:'none'}).rotate();
    if(meta.width&&meta.width>1280) pipe=pipe.resize({width:1280,withoutEnlargement:true});
    const ext=f.toLowerCase().split('.').pop();
    let buf;
    if(ext==='png') buf=await pipe.png({palette:true,quality:80,compressionLevel:9,effort:9}).toBuffer();
    else if(ext==='webp') buf=await pipe.webp({quality:78}).toBuffer();
    else buf=await pipe.jpeg({quality:80,mozjpeg:true}).toBuffer();
    if(buf.length<orig.length){writeFileSync(f,buf);after+=buf.length;saved+=orig.length-buf.length;n++;}
    else after+=orig.length;
  }catch(e){after+=orig.length;console.log('skip',f.replace(ROOT,''),e.message.slice(0,40));}
}
console.log(`compressed ${n}/${files.length} files | before ${(before/1048576).toFixed(1)}MB → after ${(after/1048576).toFixed(1)}MB | saved ${(saved/1048576).toFixed(1)}MB`);
