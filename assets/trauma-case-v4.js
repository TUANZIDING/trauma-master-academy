(() => {
  const bi = (p) => `<span class="zh">${p[0]}</span><span class="en">${p[1]}</span>`;
  document.querySelectorAll('[data-trauma-case]').forEach(root => {
    const stages = JSON.parse(root.querySelector('[data-tc-data]').textContent);
    let index = 0;
    const el = name => root.querySelector(`[data-tc-${name}]`);
    const set = (name,p) => {el(name).innerHTML=bi(p);};
    function render() {
      const s=stages[index];
      for(const k of ['title','info','unknown','priority','reassess','question'])set(k,s[k]);
      set('time',s.vitals.time);set('oxygen',s.vitals.oxygen);
      el('vitals').innerHTML=['HR','BP','RR','SpO₂','GCS','T'].map(k=>`<div class="tc-vital"><small>${k}</small><strong>${s.vitals[k]}</strong></div>`).join('');
      el('images').innerHTML=(s.images||[]).map(image=>`<figure><img src="${image.src}" alt="${image.alt}" loading="lazy"><figcaption>${bi(image.caption)} · <a href="#source-backed">${bi(['图注、作者与许可','Caption, author and licence'])}</a></figcaption></figure>`).join('');
      el('labs').innerHTML=s.labs.map(p=>`<p>${bi(p)}</p>`).join('');
      set('progress',[`已释放 ${index+1} / ${stages.length} · 数值只在新观察时点更新`,`Released ${index+1} / ${stages.length} · values update only with a new observation`]);
      set('feedback',['先判断，再查看反馈。反馈不改写生命体征。','Reason first, then review feedback. Feedback does not alter vital signs.']);
      el('prev').disabled=index===0;el('next').disabled=index===stages.length-1;
      root.querySelectorAll('[data-tc-choice]').forEach(b=>b.setAttribute('aria-pressed','false'));
    }
    root.querySelectorAll('[data-tc-choice]').forEach(b=>b.addEventListener('click',()=>{
      set('feedback',stages[index][b.dataset.tcChoice]);
      root.querySelectorAll('[data-tc-choice]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    }));
    el('next').addEventListener('click',()=>{index=Math.min(index+1,stages.length-1);render();});
    el('prev').addEventListener('click',()=>{index=Math.max(0,index-1);render();});
    el('reset').addEventListener('click',()=>{index=0;render();});
    el('full').innerHTML=stages.map((s,i)=>`<article><h3>${bi(s.title)}</h3><p>${bi(s.info)}</p><p><b>${bi(['未解问题','Unresolved'])}</b> · ${bi(s.unknown)}</p><p>${bi(s.priority)}</p><p>${bi(s.reassess)}</p><p>${Object.entries(s.vitals).filter(([k])=>!['time','oxygen'].includes(k)).map(([k,v])=>`${k}: ${v}`).join(' · ')}</p><p>${bi(s.vitals.time)} · ${bi(s.vitals.oxygen)}</p>${s.labs.map(p=>`<p>${bi(p)}</p>`).join('')}</article>`).join('');
    render();
  });
})();
// Preserve the original case and handoff exercises as optional teacher extension.
(() => {
 if (!document.querySelector('#chest-case-entry')) return;
 const original=document.querySelector('.mini-case-expansion');
 if(!original)return;
 const details=document.createElement('details');details.className='tc-original-extension';
 const summary=document.createElement('summary');
 summary.innerHTML='<span class="zh">教师延伸：原病例复盘、机制权重与交接练习</span><span class="en">Teacher extension: original debrief, mechanisms and handoff</span>';
 original.before(details);details.append(summary,original);
})();
