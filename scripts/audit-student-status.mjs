import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd(),script=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
const issues=[];
const privatePath=['/','Users','/'].join(''),privateVault=['obsdian','Vault'].join('_');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name==='.git'||e.name==='node_modules'?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(root).filter(p=>/\.(html|js|json|mjs|md|py|txt|css)$/.test(p));
for(const file of files){const text=fs.readFileSync(file,'utf8');if(text.includes(privatePath)||text.includes(privateVault))issues.push(path.relative(root,file)+': private workstation reference');}
for(const match of script.matchAll(/([a-z_]+_required):\s*\["([^"]+)"/g))if(/已登记|已定位|已完成/.test(match[2]))issues.push('misleading required-state mapping: '+match[1]);
const pages=files.filter(p=>p.endsWith('.html'));
for(const p of pages)assert.ok(fs.readFileSync(p,'utf8').includes('academy-viewv1.0.js'),path.relative(root,p)+' missing learner-view policy');
console.log(JSON.stringify({pass:!issues.length,pageCount:pages.length,privatePathChecks:files.length,teacherView:'?teacher=1',issues},null,2));
if(issues.length)process.exitCode=1;
