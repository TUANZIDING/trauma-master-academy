import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';
import {files,textParts,displayed,glue} from './english-textv1.0.mjs';
const targets=[...files('courses'),...files('orthopaedics'),...files('data'),...files('assets'),'index.html'];const errors=[];let texts=0;
for(const file of targets){if(!['.html','.js','.json'].includes(path.extname(file)))continue;const source=fs.readFileSync(file,'utf8');
 for(const part of textParts(source,path.extname(file)))for(const value of displayed(part)){texts++;glue.lastIndex=0;if(glue.test(value))errors.push(file+': '+value.slice(0,220));}
 if(/[\u3400-\u9fff]以本院/.test(source))errors.push(file+': punctuation missing before institutional policy');
 if(source.includes('双側'))errors.push(file+': traditional 側');
 if(file.endsWith('.html')&&!file.endsWith('quality-governance.html')){const dom=new JSDOM(source,{url:'https://qa.example/'+file,runScripts:'outside-only'});const w=dom.window;w.eval(fs.readFileSync('assets/academy-viewv1.0.js','utf8'));const walker=w.document.createTreeWalker(w.document.body,w.NodeFilter.SHOW_TEXT);let n;
 while((n=walker.nextNode())){if(n.parentElement.closest('script,style,[hidden],[data-teacher-only]'))continue;if(/review pending|sign-off pending|待复核|待审核|未签署/i.test(n.textContent))errors.push(file+': visible review state '+n.textContent.slice(0,100));}w.close();}
}
const d=JSON.parse(fs.readFileSync('data/clinical-pockets.json'));for(const c of d.cards){assert.ok(c.footer?.length===2,c.id+' bilingual footer');for(const row of c.rows)if(/以本院[^。；]*为准|Follow institutional[^.]*policy/i.test(row.join(' ')))errors.push(c.id+': repeated policy in row');}
// URL, DOI and identifiers are excluded by parsing, while visible numeric units must fail.
assert.ok(textParts('<p class="within8h"><span class="en">within8h</span><a href="https://x.test/within8h">Source</a></p>','.html').some(p=>glue.test(p.value)));
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(JSON.stringify({pass:true,round:4,englishTextSegments:texts,pocketFooters:d.cards.length,learnerReviewStates:'hidden'}));
