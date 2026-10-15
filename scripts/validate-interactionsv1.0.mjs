import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {JSDOM,VirtualConsole}=await import(process.env.TMA_DOM_MODULE?pathToFileURL(process.env.TMA_DOM_MODULE).href:'jsdom');
const root=process.cwd();const bank=JSON.parse(fs.readFileSync('data/academy-question-bankv1.0.json'));let assertions=0;
async function mount(file,query='',blocked=false){
 const errs=[];const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',e=>{if(!/Not implemented: (navigation|window.scrollTo)/.test(e.message))errs.push(e.message);});
 let now=0;const intervals=new Map();let sequence=0;
 const dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:'https://unit.example/'+file+query,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});const w=dom.window;
 w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.print=()=>{};
 w.setInterval=fn=>{const id=++sequence;intervals.set(id,fn);return id;};w.clearInterval=id=>intervals.delete(id);Object.defineProperty(w.performance,'now',{value:()=>now});
 if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('storage blocked');}});
 w.fetch=async url=>{const u=new URL(url,w.location.href);if(u.hostname!=='unit.example')throw Error('external fetch excluded in DOM test');const target=path.join(root,u.pathname);return {ok:fs.existsSync(target),json:async()=>JSON.parse(fs.readFileSync(target,'utf8')),text:async()=>fs.readFileSync(target,'utf8')};};
 w.addEventListener('error',e=>errs.push(e.error?.stack||e.message));
 for(const el of w.document.querySelectorAll('script')){
  if(el.type&&!['text/javascript','application/javascript'].includes(el.type))continue;
  const src=el.getAttribute('src');if(src){const url=new URL(src,w.location.href);const p=path.join(root,url.pathname);if(!fs.existsSync(p)){errs.push('missing script '+src);continue;}try{w.eval(fs.readFileSync(p,'utf8')+'\n//# sourceURL='+url.pathname);}catch(e){errs.push(url.pathname+':'+e.stack);}}
  else if(el.textContent.trim())try{w.eval(el.textContent);}catch(e){errs.push(e.stack);}
 }
 await new Promise(r=>setTimeout(r,20));assert.deepEqual(errs,[],file+' runtime errors');
 if(!query.includes('teacher=1')){const walker=w.document.createTreeWalker(w.document.body,w.NodeFilter.SHOW_TEXT);let node;const bad=[];while((node=walker.nextNode())){if(node.parentElement.closest('script,style,[hidden],[data-teacher-only]'))continue;if(/TRAUMA-ACADEMY-|CASE-TRAUMA-|CLAIM-|teaching_not_protocol|source_required|teacher_preview_only|pending_local_confirmation|pending_clinician_review|visual_asset_pending_review|source_index_pending_review|evidence_review_required|RELEASE GATE|scoring unchanged|Obsidian|待核验|待确认|待审核|教师预览/.test(node.textContent)||/review pending|sign-off pending|待复核|未签署/i.test(node.textContent))bad.push(node.textContent.slice(0,100));}assert.deepEqual(bad,[],file+' learner tokens');assertions++;}

 return {w,dom,tick(ms){now+=ms;[...intervals.values()].forEach(fn=>fn());}};
}
function check(condition,msg){assert.ok(condition,msg);assertions++;}
const pages=Object.keys(bank).filter(x=>!x.startsWith('skill-'));
for(const id of pages){const file=id==='orthopaedics'?'orthopaedics/index.html':['upper-limb','lower-limb','spine'].includes(id)?'orthopaedics/'+id+'.html':'courses/'+id+'.html';const {w,dom}=await mount(file);
 for(const kind of ['pre','post']){const form=w.document.querySelector('#course-'+kind+'test form');check(form,id+' '+kind+' mounted');const items=bank[id][kind];const fields=[...form.querySelectorAll('fieldset')];check(fields.length===5,id+' five fields');
  for(const [i,field] of fields.entries()){const radio=field.querySelector('input[value="'+items[i].answer+'"]');radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));}
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));check(form.querySelector('.test-feedback').textContent.includes('5/5'),id+' all correct');
  for(const [i,field] of fields.entries())field.querySelector('input[value="'+((items[i].answer+1)%items[i].options.length)+'"]').checked=true;
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));check(form.querySelector('.test-feedback').textContent.includes('0/5'),id+' all wrong');
  check(form.querySelectorAll('.test-feedback a').length>=5,id+' evidence feedback');
  w.document.querySelector('[data-set-lang="en"]')?.click();check(fields.every(f=>f.querySelector('input:checked')),id+' answers survive language');
 }
 check(!w.document.body.innerHTML.includes('data-case-release="undefined"'),id+' case indices');
 dom.window.close();
}
for(const id of Object.keys(bank).filter(x=>x.startsWith('skill-'))){const {w,dom,tick}=await mount('courses/trauma-skill.html','?id='+id.slice(6));const std=w.ACADEMY_SKILL_STANDARDS[id.slice(6)];check(w.document.querySelectorAll('[data-rating="2"]').length===5,id+' five scoring criteria');
 w.document.querySelectorAll('[data-rating="2"]').forEach(b=>b.click());check(w.document.querySelector('[data-osce-total]').textContent.includes('10 / 10'),id+' ten point total');const critical=w.document.querySelector('[data-critical-observed]');critical.checked=true;critical.dispatchEvent(new w.Event('change',{bubbles:true}));check(w.document.querySelector('[data-osce-total]').textContent.includes('station fail'),id+' critical override');
 const form=w.document.querySelector('#course-posttest form');form.querySelectorAll('fieldset').forEach((field,i)=>field.querySelector('input[value="'+bank[id].post[i].answer+'"]').checked=true);form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));check(form.querySelector('.test-feedback').textContent.includes('5/5'),id+' independent post');
 w.document.querySelector('#skill-standard [data-clock-start]').click();tick(std.timeLimitSeconds*1000+1);check(w.document.querySelector('#skill-standard .case-practice-clock output').textContent==='0:00',id+' timer ends');dom.window.close();
}
for(const query of ['?course=damage-control-resuscitation','?course=special-populations','?course=missing','?card=txa']){const {w,dom}=await mount('courses/pocket-cards.html',query);const selected=w.document.querySelector('[data-pocket-select]').value;const visible=[...w.document.querySelectorAll('[data-pocket-id]')].filter(c=>!c.hidden);check(visible.length>0,'pocket visible '+query);if(query.includes('course=')&&!query.includes('missing'))check(selected==='course'&&visible.length===JSON.parse(fs.readFileSync('data/clinical-pockets.json')).cards.filter(c=>c.courses.includes(new URLSearchParams(query).get('course'))).length,'course all cards '+query);if(query.includes('card='))check(visible.length===1,'single card');dom.window.close();}
const {w,dom}=await mount('courses/trauma-disaster-medicine.html');for(const system of ['START','JumpSTART','SALT','国内2006']){const select=w.document.querySelector('[data-algorithm-select]');select.value=system;select.dispatchEvent(new w.Event('change'));check(w.document.querySelectorAll('[data-algorithm-lanes] .algorithm-lane').length===(system==='SALT'?5:4),'system categories '+system);const card=w.document.querySelector('[data-algorithm-patient]');card.querySelector('select').value='red';card.querySelector('input').value='Respiratory and perfusion threat';card.querySelector('[data-place-patient]').click();check(w.document.querySelector('[data-category-cards="red"]').children.length===1,'placement '+system);}dom.window.close();
for(const file of ['courses/xabcde.html','courses/tbi-mini.html','courses/chest-trauma-mini.html','courses/open-pelvic-injury-case.html']){const {w,dom}=await mount(file);const before=w.document.querySelector('[data-tc-progress],[data-real-case-progress],[data-mv-release]')?.textContent;w.document.querySelector('[data-tc-next],[data-real-case-next],[data-mv-action="next"],[data-case-lab-action="releaseNext"]')?.click();const after=w.document.querySelector('[data-tc-progress],[data-real-case-progress],[data-mv-release]')?.textContent;if(before)check(before!==after,'progressive release '+file);check(w.document.querySelectorAll('[data-tc-option],[data-mv-answer],.case-practice-options button').length>=3,'clinical options '+file);dom.window.close();}
for(const blocked of [false,true]){const {w,dom}=await mount('courses/trauma-care-chain.html','',blocked);const el=w.document.createElement('span');el.textContent='source_required CLAIM-MINI-TEST 待审核';w.document.body.append(el);await new Promise(r=>setTimeout(r,10));check(!/source_required|CLAIM-MINI|待审核/.test(el.textContent),'dynamic learner token cleanup');dom.window.close();}
const teacher=await mount('courses/xabcde.html','?teacher=1');check(teacher.w.document.body.dataset.audit==='true','teacher query');teacher.dom.window.close();
console.log(JSON.stringify({pass:true,coursePages:22,skillPages:9,assertions,method:'isolated JSDOM interaction tests; not browser visual QA'}));
