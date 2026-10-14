import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=f=>fs.readFileSync(f,'utf8');
const ledger=JSON.parse(read('data/clinical-pockets.json'));
const banks=JSON.parse(read('data/academy-question-bankv1.0.json'));
const skills=JSON.parse(read('data/skill-standardsv1.0.json'));
const context={window:{},encodeURIComponent};vm.createContext(context);
for(const file of ['assets/academy-question-bankv1.0.js','assets/academy-curriculum.js','assets/trauma-skills-data.js','assets/trauma-skills-enriched-data.js','assets/trauma-skills-decision-airway.js','assets/trauma-skills-decision-thoracic.js','assets/trauma-skills-decision-hemorrhage-ortho.js','assets/academy-skill-standardsv1.0.js'])vm.runInContext(read(file),context,{filename:file});
const ids=[...Object.keys(context.window.ACADEMY_COURSES),...Object.keys(skills).map(id=>'skill-'+id)];
assert.equal(ids.length,31);assert.deepEqual(new Set(Object.keys(banks)),new Set(ids));
const all=[];
for(const id of ids){const bank=banks[id];assert.equal(bank.pre.length,5);assert.equal(bank.post.length,5);
 assert.equal(new Set([...bank.pre,...bank.post].map(q=>q.pre[0])).size,10,id+' distinct pre/post');
 const preOptions=new Set(bank.pre.map(q=>JSON.stringify(q.options)));assert.ok(bank.post.every(q=>!preOptions.has(JSON.stringify(q.options))),id+' post options differ');
 for(const q of [...bank.pre,...bank.post]){assert.ok(q.options.length>=3);assert.equal(q.optionWhy.length,q.options.length);assert.ok(q.optionWhy.every(p=>p.length===2&&p.every(x=>x.trim())));assert.ok(q.references.length&&q.references.every(r=>ledger.sources[r]),id+' sources');all.push(q.pre[0]);}
}
assert.equal(new Set(all).size,310,'No shared stems among31 independent banks');
const criteria=Object.values(skills).flatMap(s=>s.criteria.map(p=>p[0]));assert.equal(criteria.length,45);assert.equal(new Set(criteria).size,45);
for(const s of context.window.TRAUMA_SKILLS){assert.equal(s.standard.criteria.length,5);assert.equal(s.assessment.levels.map(x=>x.id).join(','),'0,1,2');assert.equal(s.osceZh.join('|'),s.standard.criteria.map(p=>p[0]).join('|'));assert.ok(s.standard.critical[0]);assert.ok(s.standard.timeLimitSeconds>0);}
const mini=JSON.parse(read('assets/mini-clinical-v7-data.json'));
const inline=JSON.parse(read('assets/mini-clinical-v7.js').split('const data = ')[1].split(';\nconst key=')[0]);assert.deepEqual(inline,mini,'mini JSON/JS equality');
for(const c of Object.values(mini)){assert.ok(!('condition' in c));assert.equal(c.options.length,4);c.options.forEach(options=>{assert.equal(options.length,3);assert.equal(options.filter(o=>o.correct).length,1);});}
const x=JSON.parse(read('data/xabcde-case-v4.json'));const xhtml=read('courses/xabcde.html');const xinline=JSON.parse(xhtml.match(/<script[^>]*data-tc-data[^>]*>([\s\S]*?)<\/script>/)[1]);assert.deepEqual(xinline,x.stages);
assert.ok(x.stages.every(s=>s.options.length>=3&&Number.isFinite(s.injuryMinutes)));
assert.ok(read('courses/abdominal-hemorrhagic-shock-case.html').includes('id="briefing"'));
const disaster=read('courses/trauma-disaster-medicine.html');assert.equal((disaster.match(/id="resources"/g)||[]).length,1);assert.equal((disaster.match(/data-resource-event=/g)||[]).length,6);assert.ok(!disaster.includes('data-triage-lane="info"'));
assert.ok(['START','JumpSTART','SALT','国内2006'].every(s=>read('assets/academy-triagev1.0.js').includes(s)));
const htmlFiles=[...fs.readdirSync('courses').filter(f=>f.endsWith('.html')).map(f=>'courses/'+f),...fs.readdirSync('orthopaedics').filter(f=>f.endsWith('.html')).map(f=>'orthopaedics/'+f),'index.html'];
for(const file of htmlFiles){const html=read(file);const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,file+' duplicate id');assert.ok(html.includes('academy-viewv1.0.js'),file+' learner policy');}
console.log(JSON.stringify({pass:true,banks:31,independentItems:310,distinctOSCECriteria:45,miniDataParity:true,caseOptions:true,clinicalSignoff:'not_implied'}));
