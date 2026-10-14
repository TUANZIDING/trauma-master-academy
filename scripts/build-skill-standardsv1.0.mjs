import fs from 'node:fs';
const standards=JSON.parse(fs.readFileSync('data/skill-standardsv1.0.json','utf8'));
const sources=JSON.parse(fs.readFileSync('data/clinical-pockets.json','utf8')).sources;
const runtime=`
(window.TRAUMA_SKILLS||[]).forEach(skill=>{
 const s=window.ACADEMY_SKILL_STANDARDS[skill.id];if(!s)return;skill.standard=s;
 skill.stationsZh=s.criteria.map(p=>p[0]);skill.stationsEn=s.criteria.map(p=>p[1]);
 skill.osceZh=s.criteria.map(p=>p[0]);skill.osceEn=s.criteria.map(p=>p[1]);
 if(skill.assessment){skill.assessment.levels=[{id:'0',zh:'0 未做/不安全',en:'0 omitted/unsafe'},{id:'1',zh:'1 提示后完成',en:'1 prompted'},{id:'2',zh:'2 独立完成',en:'2 independent'}];
 skill.assessment.domains=s.criteria.map((p,i)=>({id:'criterion-'+i,titleZh:'评分 '+(i+1),titleEn:'Criterion '+(i+1),behavioursZh:[p[0]],behavioursEn:[p[1]]}));}
 (skill.competencyRoute||[]).forEach((node,i)=>{const step=s.steps[i];if(!step)return;node.summaryZh=node.practiceZh=step[0];node.summaryEn=node.practiceEn=step[1];node.successZh=s.criteria[i][0];node.successEn=s.criteria[i][1];});
 const d=skill.clinicalDecision;if(d){d.guardrailZh=s.steps[0][0];d.guardrailEn=s.steps[0][1];d.steps.forEach((step,i)=>{const p=s.steps[Math.min(i,4)];step.enterZh=step.checkZh=p[0];step.enterEn=step.checkEn=p[1];step.sourceIds=s.references.map(id=>'R-'+id);});
 if(skill.id==='cricothyrotomy')d.branchQuestions.forEach(question=>{if(!/等待|wait|授权|authoris/i.test(question.promptZh+' '+question.promptEn+JSON.stringify(question.options)))return;
 question.promptZh='受训气道操作者确认CICO后，下一步是什么？';question.promptEn='A trained airway operator confirms CICO. What next?';question.options=[['immediate','即刻eFONA并同时呼救','Immediate eFONA while calling help','best-supported','不能因等另一操作者延误；未受训者协助，不自行切开。','Do not wait for another operator; untrained learners assist rather than incise.'],['wait','继续等待另一个授权者','Wait for another authorized operator','unsafe','无法氧合时等待会加重损伤。','Waiting during failed oxygenation causes harm.'],['repeat','继续重复相同插管','Repeat identical intubation','unsafe','应转救援而非无限尝试。','Enter rescue rather than unlimited attempts.']];});}
});
Object.entries(window.ACADEMY_SKILL_SOURCE_INDEX).forEach(([id,s])=>{window.TRAUMA_SKILL_SOURCES=window.TRAUMA_SKILL_SOURCES||{};window.TRAUMA_SKILL_SOURCES['R-'+id]={title:s.title[0],url:s.url};});
`;
fs.writeFileSync('assets/academy-skill-standardsv1.0.js','window.ACADEMY_SKILL_STANDARDS='+JSON.stringify(standards)+';window.ACADEMY_SKILL_SOURCE_INDEX='+JSON.stringify(sources)+';\n'+runtime);
console.log('Built nine skill standards and45 observable OSCE criteria.');
