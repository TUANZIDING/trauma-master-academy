/* Presentation-only enhancement. Existing case state, scoring, and controls remain in site.js. */
(() => {
  const casePanel = document.querySelector('.lesson-case');
  if (!casePanel) return;
  const steps = [...casePanel.querySelectorAll('[data-progressive-step]')];
  const progress = document.createElement('div');
  progress.className = 'dv9-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = steps.map((_,i) => `<span>${String(i+1).padStart(2,'0')}</span>`).join('');
  const caption = document.createElement('p');
  caption.className = 'dv9-progress-caption';
  caption.setAttribute('aria-live','polite');
  casePanel.querySelector('.progressive-case-grid').before(progress,caption);
  function update() {
    const visible = steps.filter(step=>step.classList.contains('is-visible'));
    steps.forEach(step=>{const current=step===visible.at(-1);if(step.classList.contains('dv9-current')!==current)step.classList.toggle('dv9-current',current);});
    [...progress.children].forEach((item,i)=>item.classList.toggle('dv9-released',i<visible.length));
    const html = `<span class="zh">已释放 ${visible.length} / ${steps.length} 条 · 颜色表示信息层次，不表示诊断或病情等级。</span><span class="en">${visible.length} / ${steps.length} items released · colors indicate information layers, not diagnosis or severity.</span>`;
    if(caption.innerHTML!==html)caption.innerHTML=html;
  }
  const observer = new MutationObserver(update);
  steps.forEach(step=>observer.observe(step,{attributes:true,attributeFilter:['class']}));
  update();
})();

/* Translate presentation strings after the original controller updates them. */
(() => {
  const root = document.querySelector('[data-disaster-course]');
  if (!root) return;
  const translations = {
    Available:'可用', Limited:'有限', Strained:'紧张', Unavailable:'不可用',
    'trend elevated':'趋势偏快', 'trend concerning':'趋势令人担心', 'trend vulnerable':'氧合趋势需关注',
    'trend increased':'趋势增快', 'watch change':'关注变化', 'warming risk':'关注保暖风险',
    'trend more stressed':'趋势压力增加', 'trend more concerning':'趋势更令人担心',
    'work increased':'呼吸费力增加', 'change watch':'关注意识变化', 'warming risk rising':'保暖风险增加',
    ready:'待开始', arrival:'到院', assessment:'评估中', reassess:'复评中', worsening:'趋势恶化'
  };
  const targets = [...root.querySelectorAll('[data-resource], [data-disaster-monitor], [data-disaster-score="state"]')];
  function localize(el) {
    if (el.querySelector('.zh')) return;
    const en = el.textContent.trim();
    const zh = translations[en] || (/^\d+ min$/.test(en) ? en.replace(' min',' 分钟') : null);
    if (!zh) return;
    const a = document.createElement('span'); a.className='zh'; a.textContent=zh;
    const b = document.createElement('span'); b.className='en'; b.textContent=en;
    el.replaceChildren(a,b);
  }
  const observer = new MutationObserver(records => {
    const changed = new Set(records.map(r=>targets.find(el=>el===r.target || el.contains(r.target))).filter(Boolean));
    changed.forEach(localize);
  });
  targets.forEach(el=>{localize(el);observer.observe(el,{childList:true,subtree:true});});
  const p6 = root.querySelector('[data-patient-status="P6"]');
  if(p6) {
    const p6Observer = new MutationObserver(()=>{
      if(p6.querySelector('.zh')) return;
      const en=p6.textContent;
      const worse=en.includes('Concern: worsening');
      const a=document.createElement('span');a.className='zh';a.textContent=worse?'已知：腹部受伤机制 · 未知：隐匿出血 · 担心：趋势恶化 · 资源：复评循环 · 复评：关注度发生变化':'已知：腹部受伤机制 · 未知：隐匿出血 · 担心：后续恶化 · 资源：复评循环 · 复评：趋势变化';
      const b=document.createElement('span');b.className='en';b.textContent=en;p6.replaceChildren(a,b);
    });
    p6Observer.observe(p6,{childList:true});
  }
  function placeholders() {
    const lang=document.body.dataset.lang==='en'?'en':'zh';
    root.querySelectorAll('[data-placeholder-zh]').forEach(el=>el.placeholder=el.dataset[lang==='en'?'placeholderEn':'placeholderZh']);
  }
  new MutationObserver(placeholders).observe(document.body,{attributes:true,attributeFilter:['data-lang']});
  placeholders();
})();
