import {execFileSync} from 'node:child_process';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';
import {files,textParts,displayed,glue} from './english-textv1.0.mjs';
const targets=[...files('courses'),...files('orthopaedics'),...files('data'),...files('assets'),'index.html'];const errors=[];let texts=0;
for(const file of targets){if(!['.html','.js','.json'].includes(path.extname(file)))continue;const source=fs.readFileSync(file,'utf8');
 for(const part of textParts(source,path.extname(file)))for(const value of displayed(part)){texts++;glue.lastIndex=0;if(glue.test(value))errors.push(file+': '+value.slice(0,220));}
 if(/[\u3400-\u9fff]以本院/.test(source))errors.push(file+': punctuation missing before institutional policy');
 if(source.includes('双側'))errors.push(file+': traditional 側');
 if(file.endsWith('.html')){for(const match of source.matchAll(/(?:src|href)="((?:\.\.\/)?assets\/[^"]+\.(?:js|css)(?:\?[^"]*)?)"/g))if(!match[1].includes('?v=20261015-r4'))errors.push(file+': stale asset cache key '+match[1]);}

 if(file.endsWith('.html')&&!file.endsWith('quality-governance.html')){const dom=new JSDOM(source,{url:'https://qa.example/'+file,runScripts:'outside-only'});const w=dom.window;w.eval(fs.readFileSync('assets/academy-viewv1.0.js','utf8'));const walker=w.document.createTreeWalker(w.document.body,w.NodeFilter.SHOW_TEXT);let n;
 while((n=walker.nextNode())){if(n.parentElement.closest('script,style,[hidden],[data-teacher-only]'))continue;if(/review pending|sign-off pending|待复核|待审核|未签署/i.test(n.textContent))errors.push(file+': visible review state '+n.textContent.slice(0,100));}w.close();}
}
const d=JSON.parse(fs.readFileSync('data/clinical-pockets.json'));for(const c of d.cards){assert.ok(c.footer?.length===2,c.id+' bilingual footer');for(const row of c.rows)if(/以本院[^。；]*为准|Follow institutional[^.]*policy/i.test(row.join(' ')))errors.push(c.id+': repeated policy in row');}
const pdfStrings=JSON.parse(execFileSync('python3',['-c',`import ast,json
from pathlib import Path
rows=[]
for name in ['scripts/build-pocket-pdfs.py','scripts/build-osce-pdfsv1.0.py']:
 tree=ast.parse(Path(name).read_text())
 rows.extend([{'file':name,'text':n.value} for n in ast.walk(tree) if isinstance(n,ast.Constant) and isinstance(n.value,str)])
print(json.dumps(rows))`],{encoding:'utf8'}));
for(const row of pdfStrings){if(/[\u3400-\u9fff]/.test(row.text)||/^https?:/.test(row.text))continue;glue.lastIndex=0;if(glue.test(row.text))errors.push(row.file+': '+row.text.slice(0,180));}
// URL, DOI and identifiers are excluded by parsing, while visible numeric units must fail.
assert.ok(textParts('<p class="within8h"><span class="en">within8h</span><a href="https://x.test/within8h">Source</a></p>','.html').some(p=>glue.test(p.value)));
const banks=JSON.parse(fs.readFileSync('data/academy-question-bankv1.0.json'));const objectives=JSON.parse(fs.readFileSync('data/assessment-objectivesv1.0.json')).objectives;let scenarioItems=0;
for(const [id,bank] of Object.entries(banks)){let applied=0;for(const kind of ['pre','post']){assert.equal(bank[kind].length,5,id);assert.ok(bank[kind].filter(q=>q.scenario).length>=2,id+' scenarios per phase');for(const q of bank[kind]){assert.ok(objectives[q.objectiveId],id+' objective exists');assert.ok(['remember','apply','analyze'].includes(q.bloom));if(q.bloom!=='remember')applied++;assert.ok(q.options.length>=3);assert.equal(q.optionWhy.length,q.options.length);for(const li of [0,1])assert.equal(new Set(q.optionWhy.map(p=>p[li])).size,q.optionWhy.length,id+' distinct option explanations');assert.ok(!/此项(?:忽略|不能解决|遗漏|不适合)|This (?:misses a key|does not fit|ignores the|cannot solve)/i.test(JSON.stringify(q)),id+' no canned feedback');if(q.scenario){scenarioItems++;assert.equal(q.options.length,4);assert.ok(q.pre[0].length>=60&&q.pre[0].length<=150,id+' scenario length');assert.ok(/岁/.test(q.pre[0])&&/HR.*BP.*SpO₂/.test(q.pre[0])&&/下一步最合适的是/.test(q.pre[0]),id+' scenario content');assert.equal(q.caseOrigin,'synthetic-parallel-assessment');}}}assert.ok(applied>=4,id+' application/analysis');for(let i=0;i<5;i++){assert.equal(bank.pre[i].objectiveId,bank.post[i].objectiveId,id+' parallel objective');assert.notEqual(bank.pre[i].pre[0],bank.post[i].pre[0],id+' parallel case');}}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(JSON.stringify({pass:true,round:4,englishTextSegments:texts,pocketFooters:d.cards.length,learnerReviewStates:'hidden',scenarioItems,assessmentObjectives:Object.keys(objectives).length}));
