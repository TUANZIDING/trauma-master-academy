(() => {
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bi = pair => `<span class="zh">${escape(pair[0])}</span><span class="en">${escape(pair[1])}</span>`;
  function start(course,id,base){
    return `<section class="learning-start" id="learning-start" data-static-learning><p class="eyebrow">${bi(['预计学习','Estimated learning time'])} · ${course.minutes} ${bi(['分钟','min'])}</p><h2>${bi(['学完这门课，你能……','After this course, you can…'])}</h2><ol>${course.objectives.map(o=>`<li>${bi(o)}</li>`).join('')}</ol><div class="learning-level">${bi(['实习：识别与报告；规培：决策时机与监督下关键步骤；青年主治：团队指挥与资源调度。','Intern: recognize/report; resident: decision timing and supervised key steps; early attending: team leadership and resources.'])}</div><div class="hero-actions"><a class="button primary" href="#course-pretest">${bi(['先做 5 题前测','Start five-question pretest'])}</a><a class="button" href="#course-posttest">${bi(['学完做 5 题后测','Complete five-question posttest'])}</a><a class="button" href="${base}courses/pocket-cards.html?course=${encodeURIComponent(id)}">${bi(['本课口袋卡','Course pocket card'])}</a></div><noscript>${bi(['题目与目标可直接阅读；自动评分需要启用脚本。','Objectives and questions are readable; automatic scoring requires JavaScript.'])}</noscript></section>`;
  }
  function test(course,id,kind){
    const label=kind==='pre'?['课前测 · 5 题','Pretest · five questions']:['课后测 · 5 题','Posttest · five questions'];
    return `<details class="learning-test" id="course-${kind}test" data-static-learning><summary>${bi(label)}</summary><form><p class="learning-source-note">${bi(['每题 1 分；用于形成性反馈。','One point per item; formative feedback.'])}</p>${course.questions.map((item,i)=>`<fieldset><legend>${i+1}. ${bi(item[kind])}</legend>${item.options.map((_,j)=>(j+i+(kind==='post'?1:0))%item.options.length).map(option=>`<label><input type="radio" name="${kind}-${id}-${i}" value="${option}" required>${bi(item.options[option])}</label>`).join('')}</fieldset>`).join('')}<div class="test-actions"><button type="submit" class="button primary" data-grade-submit disabled>${bi(['提交并看解析','Submit and review'])}</button><button type="reset" class="button">${bi(['重新作答','Try again'])}</button></div><div class="test-feedback" hidden aria-live="polite"></div></form></details>`;
  }
  window.ACADEMY_MARKUP={bi,start,test};
})();
