import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const context={window:{},encodeURIComponent};vm.createContext(context);
for(const file of ['assets/academy-curriculum.js','assets/academy-learning-markup.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const {start,test}=context.window.ACADEMY_MARKUP;
for(const [id,course] of Object.entries(context.window.ACADEMY_COURSES)){
  const rel=id==='orthopaedics'?'orthopaedics/index.html':['spine','upper-limb','lower-limb'].includes(id)?`orthopaedics/${id}.html`:`courses/${id}.html`;
  const file=path.join(root,rel);let html=fs.readFileSync(file,'utf8');
  html=html.replace(/<!-- academy-start -->[\s\S]*?<!-- \/academy-start -->\s*/g,'').replace(/<!-- academy-post -->[\s\S]*?<!-- \/academy-post -->\s*/g,'');
  const marker=html.match(/<(section|div)\b[^>]*class="[^"]*\b(?:reader-hero|hero)\b[^"\n]*"[^>]*>/);
  let insertAt;
  if(marker){const tags=new RegExp(`<(\\/?)${marker[1]}\\b[^>]*>`,'g');tags.lastIndex=marker.index+marker[0].length;let depth=1,t;while((t=tags.exec(html))&&depth){depth+=t[1]?-1:1;if(!depth)insertAt=tags.lastIndex;}}
  if(insertAt===undefined){const main=html.match(/<main\b[^>]*>/);if(!main)throw Error(`Missing main: ${rel}`);insertAt=main.index+main[0].length;}
  const noMain=!html.includes('<main');
  const first=`\n<!-- academy-start -->\n${noMain?'<div class="wrap">':''}${start(course,id,'../')}\n${test(course,id,'pre')}${noMain?'</div>':''}\n<!-- /academy-start -->\n`;
  html=html.slice(0,insertAt)+first+html.slice(insertAt);
  const post=`<!-- academy-post -->\n${noMain?'<div class="wrap">':''}${test(course,id,'post')}${noMain?'</div>':''}\n<!-- /academy-post -->\n`;
  html=noMain?html.replace('<footer',post+'<footer'):html.replace('</main>',post+'</main>');
  if(!html.includes('academy-learning-markup.js'))html=html.replace(/<script src="([^\"]*)academy-learning\.js/,`<script src="../assets/academy-learning-markup.js?v=20261008"></script><script src="$1academy-learning.js`);
  fs.writeFileSync(file,html);
}
console.log(`Built static objectives and tests for ${Object.keys(context.window.ACADEMY_COURSES).length} courses.`);
