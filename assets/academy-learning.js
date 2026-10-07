(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bi = value => `<span class="zh">${escape(value[0])}</span><span class="en">${escape(value[1])}</span>`;
  const read = key => {try{return JSON.parse(localStorage.getItem(key));}catch{return null;}};
  const write = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value));}catch{}}
  const base = location.pathname.includes('/courses/') || location.pathname.includes('/orthopaedics/') ? '../' : '';
  // The orthopaedics pages retain their own translators; synchronize only the
  // language marker so the added tests keep answers when language changes.
  if(location.pathname.includes('/orthopaedics/')){
    document.body.classList.add('academy-ortho');
    const syncLanguage=()=>document.body.dataset.lang=document.documentElement.lang.startsWith('en')?'en':'zh';
    syncLanguage();new MutationObserver(syncLanguage).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  const levelKey='academy-learner-level-v1';
  const levels={
    intern:{name:['实习','Intern'],boundary:['识别与报告：说明观察依据、未知信息和升级请求；在导师安排下参与模拟。','Recognize and report observations, uncertainty and escalation needs; join instructor-led simulation.'],route:['trauma-bay','xabcde','secondary-tertiary-survey','documentation-handover']},
    resident:{name:['规培','Resident'],boundary:['决策时机与关键步骤：结合来源学习适用条件，在监督和授权范围内练习操作、确认效果与识别失败。','Learn decision timing and key steps with source-defined scope; practise, confirm effect and recognize failure under supervision and authorization.'],route:['xabcde','damage-control-resuscitation','pelvic-trauma','secondary-tertiary-survey','special-populations']},
    attending:{name:['青年主治','Early attending'],boundary:['团队指挥与资源调度：组织并行任务、止血路径、失败救援、交接责任和系统复评。','Lead parallel tasks, hemorrhage-control pathways, rescue plans, handover ownership and system reassessment.'],route:['trauma-care-chain','damage-control-resuscitation','trauma-disaster-medicine','documentation-handover']}
  };
  let level=read(levelKey);if(!levels[level])level='intern';
  function levelMarkup(){return `<strong>${bi(['当前层级：','Current level: '])}${bi(levels[level].name)}</strong> · ${bi(levels[level].boundary)} <a href="${base}index.html#learning-path">${bi(['更换层级','Change level'])}</a>`;}
  const pathRoot=document.querySelector('[data-learning-path]');
  if(pathRoot){
    function showPath(){
      pathRoot.innerHTML=`<strong>${bi(['推荐顺序','Recommended sequence'])}</strong><ol>${levels[level].route.map(id=>`<li><a href="courses/${id}.html">${bi(window.ACADEMY_COURSES[id].title)}</a></li>`).join('')}</ol><p>${bi(levels[level].boundary)}</p>${level==='resident'?`<a href="courses/trauma-skills-academy.html">${bi(['继续：九项监督下技能训练 →','Continue: nine supervised skills →'])}</a>`:''}`;
      document.querySelectorAll('[data-learner-level]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.learnerLevel===level)));
    }
    document.querySelectorAll('[data-learner-level]').forEach(button=>button.addEventListener('click',()=>{level=button.dataset.learnerLevel;write(levelKey,level);showPath();}));showPath();
  }
  let id=document.body.dataset.academyCourse || location.pathname.split('/').pop().replace(/\.html$/,'');
  if(location.pathname.includes('/orthopaedics/')&&id==='index')id='orthopaedics';
  let course=window.ACADEMY_COURSES?.[id];
  if(id==='trauma-skill'){
    const skill=(window.TRAUMA_SKILLS||[]).find(s=>s.id===new URLSearchParams(location.search).get('id')) || window.TRAUMA_SKILLS?.[0];
    if(skill){
      document.body.dataset.skillAxis=skill.id==='tourniquet'?'x':skill.id==='pelvic-binder'?'c':['efast','needle-decompression','tube-thoracostomy'].includes(skill.id)?'b':skill.id==='splinting'?'e':'a';
      id=`skill-${skill.id}`;
      const branch=(skill.clinicalDecision?.branchQuestions||[]).slice(0,2).map(item=>({pre:[item.promptZh,item.promptEn],post:[`模拟复盘：${item.promptZh}`,`Simulation debrief: ${item.promptEn}`],options:item.options.map(o=>[o[1],o[2]]),answer:item.options.findIndex(o=>o[3]==='best-supported'),why:(()=>{const o=item.options.find(o=>o[3]==='best-supported');return o?[o[4],o[5]]:[skill.boundaryZh,skill.boundaryEn];})()}));
      course={title:[skill.titleZh,skill.titleEn],minutes:25,objectives:[[skill.stationsZh[0],skill.stationsEn[0]],[skill.stationsZh[2],skill.stationsEn[2]],[skill.stationsZh[4],skill.stationsEn[4]]],questions:[...branch,...window.ACADEMY_SHARED_QUESTIONS].slice(0,5)};
    }
  }
  if(course){
    const main=document.querySelector('main') || document.querySelector('body>.wrap');
    const hero=document.querySelector('.reader-hero,.skill-detail-hero,.hero');
    const start=document.createElement('section');start.className='learning-start';start.id='learning-start';
    start.innerHTML=`<p class="eyebrow">${bi(['预计学习','Estimated learning time'])} · ${course.minutes} ${bi(['分钟','min'])}</p><h2>${bi(['学完这门课，你能……','After this course, you can…'])}</h2><ol>${course.objectives.map(o=>`<li>${bi(o)}</li>`).join('')}</ol><div class="learning-level">${levelMarkup()}</div><div class="hero-actions"><a class="button primary" href="#course-pretest">${bi(['先做 5 题前测','Start five-question pretest'])}</a><a class="button" href="#course-posttest">${bi(['学完做 5 题后测','Complete five-question posttest'])}</a><a class="button" href="${base}courses/quality-governance.html#learning-levels">${bi(['分层范围与来源','Tier scope and sources'])}</a>${id.startsWith('skill-')?`<a class="button" href="osce-checklists.html?id=${id.slice(6)}">${bi(['打印本技能 OSCE 表','Print this skill OSCE sheet'])}</a>`:''}</div>`;
    if(hero&&hero.parentElement===main)hero.after(start);else if(hero&&hero.closest('main'))hero.after(start);else if(main)main.prepend(start);else{start.classList.add('wrap');hero?.after(start);}
    const scoreKey=`academy-practice-v1:${id}`;
    const comparison=document.createElement('p');comparison.className='learning-results';comparison.setAttribute('aria-live','polite');
    function compare(){const result=read(scoreKey)||{};comparison.innerHTML=bi(result.pre&&result.post?[`本地练习记录：前测 ${result.pre.score}/5 → 后测 ${result.post.score}/5。题目用于形成性反馈，未作测量学验证。`,`Local practice: pre ${result.pre.score}/5 → post ${result.post.score}/5. Formative items are not psychometrically validated.`]:['练习记录仅保存在本浏览器；不收集姓名，不上传成绩。','Practice records stay in this browser; no names or scores are submitted.']);}
    function makeTest(kind){
      const section=document.createElement('details');section.className='learning-test';section.id=`course-${kind}test`;
      const label=kind==='pre'?['课前测 · 5 题','Pretest · five questions']:['课后测 · 5 题','Posttest · five questions'];
      const order=course.questions.map((item,i)=>item.options.map((_,j)=>(j+i+(kind==='post'?1:0))%item.options.length));
      section.innerHTML=`<summary>${bi(label)}</summary><form><p class="learning-source-note">${bi(['独立完成后提交；每题 1 分。反馈用于找出需要回看的概念，不能判断执业资格。','Submit after answering independently; one point each. Feedback identifies concepts to revisit and does not certify clinical competence.'])}</p>${course.questions.map((item,i)=>`<fieldset><legend>${i+1}. ${bi(item[kind])}</legend>${order[i].map((option,j)=>`<label><input type="radio" name="${kind}-${id}-${i}" value="${option}" required>${bi(item.options[option])}</label>`).join('')}</fieldset>`).join('')}<div class="test-actions"><button type="submit" class="button primary">${bi(['提交并看解析','Submit and review'])}</button><button type="reset" class="button">${bi(['重新作答','Try again'])}</button></div><div class="test-feedback" hidden aria-live="polite"></div></form>`;
      const form=section.querySelector('form');const feedback=section.querySelector('.test-feedback');
      form.addEventListener('submit',event=>{
        event.preventDefault();const answers=course.questions.map((_,i)=>Number(new FormData(form).get(`${kind}-${id}-${i}`)));
        const score=answers.filter((answer,i)=>answer===course.questions[i].answer).length;
        const result=read(scoreKey)||{};result[kind]={score,at:new Date().toISOString()};write(scoreKey,result);
        feedback.hidden=false;feedback.innerHTML=`<strong>${bi(['本次得分','Score'])}: ${score}/5</strong>${course.questions.map((item,i)=>`<p>${i+1}. ${bi(answers[i]===item.answer?['正确','Correct']:['需回看','Revisit'])} — ${bi(item.why)}</p>`).join('')}`;compare();
      });form.addEventListener('reset',()=>{feedback.hidden=true;feedback.textContent='';});return section;
    }
    const pre=makeTest('pre');start.after(pre);const post=makeTest('post');
    const clear=document.createElement('button');clear.type='button';clear.className='button';clear.innerHTML=bi(['清除本课练习记录','Clear this course practice record']);clear.addEventListener('click',()=>{try{localStorage.removeItem(scoreKey);}catch{}compare();});
    if(main)main.append(post,comparison,clear);else start.parentElement.append(post,comparison,clear);compare();
    function openLinkedTest(){if(location.hash==='#course-pretest')pre.open=true;if(location.hash==='#course-posttest')post.open=true;}
    addEventListener('hashchange',openLinkedTest);openLinkedTest();
  }
  // Internal labels are kept in source/audit records while learner headings stay readable.
  function alignLabels(){
    document.querySelectorAll('.eyebrow,.tag,.section-kicker').forEach(node=>{
      if(node.children.length){
        if(node.firstChild?.nodeType===Node.TEXT_NODE)node.firstChild.textContent=node.firstChild.textContent.replace(/^(?:TRAUMA-ACADEMY-[A-Z0-9-]+|TSA-[A-Z0-9-]+)\s*[·|]?\s*/,'');
        return;
      }
      const text=node.textContent.trim();
      if(/^(TRAUMA-ACADEMY-|TSA-)/.test(text)){
        const remainder=text.replace(/^(?:TRAUMA-ACADEMY-[A-Z0-9-]+|TSA-[A-Z0-9-]+)\s*[·|]?\s*/,'');
        if(remainder)node.textContent=remainder;else node.classList.add('academy-internal-id');
      }
    });
    document.querySelectorAll('.stage-section,.stage-module,.stage-card,.stage-visual-card').forEach(node=>{
      const heading=node.querySelector('.stage-letter') || node.querySelector('h3,strong');const letter=heading?.textContent.trim().match(/^([xABCDE])(?:\s|[·:.]|$)/)?.[1];
      if(letter)node.dataset.academyAxis=letter.toLowerCase();
    });
  }alignLabels();
  document.querySelectorAll('[data-real-case]').forEach(root=>{
    const steps=[...root.querySelectorAll('[data-case-step]')];let released=1;
    function render(){steps.forEach((step,i)=>step.hidden=i>=released);root.querySelector('[data-real-case-next]').disabled=released===steps.length;root.querySelector('[data-real-case-progress]').textContent=`${released}/${steps.length}`;}
    root.querySelector('[data-real-case-next]').addEventListener('click',()=>{released=Math.min(released+1,steps.length);render();});
    root.querySelector('[data-real-case-reset]').addEventListener('click',()=>{released=1;render();});render();
  });
  const clocks=document.querySelectorAll('[data-simulation-clock]');
  clocks.forEach(root=>{
    const scenes=JSON.parse(root.querySelector('script[type="application/json"]').textContent);
    let remaining=120,running=false,deadline=0,tick=null,stage=0;
    const output=root.querySelector('output'),findings=root.querySelector('[data-sim-findings]'),vitals=root.querySelector('[data-sim-vitals]');
    function render(){output.textContent=`${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;findings.innerHTML=bi(scenes[stage].finding);vitals.textContent=scenes[stage].vitals;root.querySelector('[data-sim-next]').disabled=stage===scenes.length-1;root.querySelector('[data-sim-start]').innerHTML=bi(running?['暂停','Pause']:remaining===0?['重新开始','Restart']:['开始倒计时','Start timer']);}
    function pause(){running=false;clearInterval(tick);tick=null;render();}
    root.querySelector('[data-sim-start]').addEventListener('click',()=>{
      if(running){remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));pause();return;}
      if(remaining===0){remaining=120;stage=0;}
      running=true;deadline=Date.now()+remaining*1000;render();tick=setInterval(()=>{remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));stage=Math.max(stage,Math.min(scenes.length-1,Math.floor((120-remaining)/30)));if(remaining===0)pause();render();},250);
    });
    root.querySelector('[data-sim-reset]').addEventListener('click',()=>{pause();remaining=120;stage=0;render();});
    root.querySelector('[data-sim-next]').addEventListener('click',()=>{stage=Math.min(stage+1,scenes.length-1);render();});
    addEventListener('pagehide',pause);render();
  });
  if(document.body.dataset.academyHome!==undefined){
    function legacyLinks(){if(['#workflow','#sources','#equipment'].includes(location.hash))location.replace(`courses/quality-governance.html${location.hash}`);}
    addEventListener('hashchange',legacyLinks);legacyLinks();
  }
})();
