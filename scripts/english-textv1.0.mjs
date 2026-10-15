import fs from 'node:fs';
import path from 'node:path';
import {parse as parseJS} from 'acorn';
import {parse as parseHTML,parseFragment} from 'parse5';
export const glue=/\b(for|over|at|beyond|below|under|than|least|within|to|grade|every|after|first|SBP|HR|MAP|GCS|Hb)\d|\d(h|mL|mmHg|kg|min|weeks)\b/g;
export function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>['.git','node_modules','.superpowers'].includes(e.name)?[]:e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function english(s){return /[A-Za-z]/.test(s)&&!/[\u3400-\u9fff]/.test(s)&&!/^https?:\/\//.test(s);}
export function textParts(source,extension){const out=[];
 function html(text,offset=0,fragment=false){const tree=(fragment?parseFragment:parseHTML)(text,{sourceCodeLocationInfo:true});
 function walk(n,skip=false){const loc=n.sourceCodeLocation;const attrs=Object.fromEntries((n.attrs||[]).map(a=>[a.name,a.value]));skip=skip||n.tagName==='style';
 if(n.tagName==='script'){if(loc?.startTag&&loc?.endTag){const start=loc.startTag.endOffset;js(text.slice(start,loc.endTag.startOffset),offset+start,attrs.type==='application/json');}return;}
 if(n.nodeName==='#text'&&!skip&&loc&&english(n.value))out.push({start:offset+loc.startOffset,end:offset+loc.endOffset,value:n.value,kind:'text'});
 for(const child of n.childNodes||[])walk(child,skip);}
 walk(tree);}
 function js(text,offset=0,json=false){let ast;try{ast=parseJS(json?'('+text+')':text,{ecmaVersion:'latest',sourceType:'module'});}catch(e){throw Error('Cannot parse display source: '+e.message);}const delta=offset-(json?1:0);
 function walk(n,parent,key){if(!n||typeof n!=='object')return;
 if(n.type==='Literal'&&typeof n.value==='string'&&!(parent?.type==='Property'&&key==='key'&&!parent.computed)){
  if(english(n.value))out.push({start:delta+n.start,end:delta+n.end,value:n.value,kind:'literal'});
  else if(/<[a-z][^>]*>/i.test(n.value)){const parts=[];const prev=out.length;html(n.value,0,true);const nested=out.splice(prev);if(nested.length)out.push({start:delta+n.start,end:delta+n.end,value:n.value,kind:'htmlLiteral',nested});}return;}
 if(n.type==='TemplateElement'){const raw=text.slice(n.start-(json?1:0),n.end-(json?1:0));if(/<[a-z][^>]*>/i.test(raw)){html(raw,delta+n.start,true);}else if(english(raw))out.push({start:delta+n.start,end:delta+n.end,value:raw,kind:'template'});return;}
 for(const [k,v] of Object.entries(n)){if(k==='start'||k==='end')continue;if(Array.isArray(v))v.forEach(x=>walk(x,n,k));else if(v&&typeof v==='object')walk(v,n,k);}}
 walk(ast);}
 if(extension==='.html')html(source);else js(source,0,extension==='.json');return out;}
export function displayed(part){return part.kind==='htmlLiteral'?part.nested.map(p=>p.value):[part.value];}
