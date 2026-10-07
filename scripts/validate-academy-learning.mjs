import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const context={window:{}};vm.createContext(context);
for(const file of ['assets/trauma-skills-data.js','assets/trauma-skills-enriched-data.js','assets/trauma-skills-decision-airway.js','assets/trauma-skills-decision-thoracic.js','assets/trauma-skills-decision-hemorrhage-ortho.js','assets/academy-curriculum.js']) vm.runInContext(read(file),context);
const pair=(v,label)=>assert.ok(Array.isArray(v)&&v.length===2&&v.every(x=>typeof x==='string'&&x.trim()),label);
function questions(items,label){
 assert.equal(items.length,5,`${label}: five questions`);
 items.forEach((item,i)=>{
  pair(item.pre,`${label} pre ${i}`);pair(item.post,`${label} post ${i}`);pair(item.why,`${label} explanation ${i}`);
  assert.ok(item.options.length>=2,`${label} options ${i}`);item.options.forEach(o=>pair(o,`${label} bilingual option`));
  assert.ok(Number.isInteger(item.answer)&&item.answer>=0&&item.answer<item.options.length,`${label} valid answer ${i}`);
  for(let lang=0;lang<2;lang++)assert.equal(new Set(item.options.map(x=>x[lang])).size,item.options.length,`${label} unique options ${i}`);
 });
}
const courses=context.window.ACADEMY_COURSES;
for(const [id,course] of Object.entries(courses)){
 pair(course.title,id);assert.equal(course.objectives.length,3,`${id}: three objectives`);course.objectives.forEach(o=>pair(o,id));
 assert.ok(course.minutes>0,id);questions(course.questions,id);
 const file=id==='orthopaedics'?'orthopaedics/index.html':['spine','upper-limb','lower-limb'].includes(id)?`orthopaedics/${id}.html`:`courses/${id}.html`;
 const text=read(file);assert.ok(text.includes('academy-curriculum.js')&&text.includes('academy-learning.js')&&text.includes('academy-refresh.css'),`${id} mounted learning module`);
}
for(const skill of context.window.TRAUMA_SKILLS){
 assert.equal(skill.osceZh.length,5);assert.equal(skill.osceEn.length,5);assert.equal(skill.stationsZh.length,5);assert.equal(skill.stationsEn.length,5);
 const branch=(skill.clinicalDecision.branchQuestions||[]).slice(0,2).map(x=>({pre:[x.promptZh,x.promptEn],post:[x.promptZh,x.promptEn],options:x.options.map(o=>[o[1],o[2]]),answer:x.options.findIndex(o=>o[3]==='best-supported'),why:x.options.filter(o=>o[3]==='best-supported').map(o=>[o[4],o[5]])[0]}));
 questions([...branch,...context.window.ACADEMY_SHARED_QUESTIONS].slice(0,5),skill.id);
 assert.ok(skill.clinicalDecision.branchQuestions.every(x=>x.options.filter(o=>o[3]==='best-supported').length===1),`${skill.id} unique supported answer`);
}
const sheets={innerHTML:''};context.document={querySelector:()=>sheets};context.location={search:''};context.URLSearchParams=URLSearchParams;
vm.runInContext(read('assets/academy-osce.js'),context);
assert.equal((sheets.innerHTML.match(/class="academy-print-sheet"/g)||[]).length,9);
assert.equal((sheets.innerHTML.match(/<tbody>/g)||[]).length,9);
assert.equal((sheets.innerHTML.match(/<tr><td>/g)||[]).length,45);
assert.ok(!sheets.innerHTML.includes('undefined'));
const home=read('index.html');assert.equal((home.match(/class="course-card"/g)||[]).length,6);
assert.ok(!home.includes('TRAUMA-ACADEMY-')&&!home.includes('比赛演示'));
assert.ok(!home.includes('id="workflow"')&&!home.includes('id="sources"')&&!home.includes('id="equipment"'));
const realCase=read('courses/open-pelvic-injury-case.html');assert.equal((realCase.match(/data-case-step=/g)||[]).length,4);
assert.ok(!/\b\d{17}[0-9Xx]\b|\b1[3-9]\d{9}\b|\.(pptx|dcm)\b|ppt\/media|病案号|住院号/.test(realCase));
assert.ok(realCase.includes('未确认本病例是否属于该队列')&&realCase.includes('未在所提供材料中给出'));
const dcr=read('courses/damage-control-resuscitation.html');const scene=JSON.parse(dcr.match(/<script type="application\/json">([\s\S]*?)<\/script>/)[1]);
assert.equal(scene.length,4);scene.forEach(s=>{pair(s.finding,'sim');assert.ok(['HR','BP','RR','SpO₂','GCS','T'].every(x=>s.vitals.includes(x)));});
// Exact-context warnings must never act as broad file exceptions.
const baseline=JSON.parse(read('data/legacy-boundary-findings.json'));
assert.equal(baseline.baselineCommit,'fa50476b0fae533d6043a451d625a0baae9b9eeb');
assert.equal(baseline.findings.length,11);baseline.findings.forEach(x=>assert.ok(x.contexts.length>0&&x.contexts.every(h=>/^[a-f0-9]{64}$/.test(h))));
function lum(hex){const c=hex.match(/[a-f0-9]{2}/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];}
const colors=[['4b6067','ffffff'],['4b6067','f5f7f8'],['0d5156','ffffff'],['805000','fff2d9'],['ffffff','a32129']];
const ratios=colors.map(([a,b])=>{const l=[lum(a),lum(b)].sort((a,b)=>a-b);const r=(l[1]+.05)/(l[0]+.05);assert.ok(r>=4.5,`${a}/${b}`);return Number(r.toFixed(2));});
console.log(JSON.stringify({pass:true,courseMetadata:Object.keys(courses).length,skillCourses:9,preAndPostQuestions:5,osceSheets:9,osceRows:45,realCaseStages:4,paletteContrastRatios:ratios,clinicalSignoff:'not_implied'},null,2));
