export const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const bi = pair => `<span class="zh">${escape(pair[0])}</span><span class="en">${escape(pair[1])}</span>`;
export function sources(data,ids){return ids.map(id=>{
  const s=data.sources[id];
  return `<a href="${escape(s.url)}" target="_blank" rel="noreferrer">${bi(s.title)}</a>`;
}).join(' · ');}
export function renderClaim(data,id){
  const c=data.claims.find(c=>c.id===id);
  if(!c)throw Error(`Unknown claim ${id}`);
  return `<article class="clinical-anchor" data-evidence-claim="${id}"><h3>${bi(c.title)}</h3><strong class="clinical-number">${bi(c.anchor)}</strong><p class="clinical-scope">${bi(c.scope)}</p><p>${bi(c.decision)}</p><p class="clinical-escalation">${bi(c.upgrade)}</p><p class="clinical-citations">${sources(data,c.references)}</p><details><summary>${bi(['国内外依据与适用差异','Domestic/international scope differences'])}</summary><p>${bi(c.comparisonNote)}</p><p class="learning-source-note">${bi(['来源核对：Codex 辅助 · 2026-10-08；临床审核人/日期：未签署。','Source check: Codex-assisted · 2026-10-08; clinical reviewer/date: unsigned.'])}</p></details></article>`;
}
export const groups={
  'damage-control-resuscitation':['txa','bp','si','mtp','fib','hb','calcium','tbi-pressure'],
  'special-populations':['geriatric','anticoagulants','pregnancy','pregnancy-arrest','peds-fluid','peds-blood','burn-area','burn-fluid'],
  'documentation-handover':['records'],
  'tbi-mini':['tbi-pressure']
};
export function clinicalBlock(data,group){
  const title={
    'damage-control-resuscitation':['数字与条件：国内依据并列核对','Numbers and scope: Chinese guidance alongside'],
    'special-populations':['分组查阅：各自的数字与升级点','By population: anchors and escalation'],
    'documentation-handover':['国内文书要求：时间、告知与签署','Chinese record requirements: timing, consent and signatures'],
    'tbi-mini':['颅脑损伤的替代灌注目标','Alternative perfusion target for brain injury']
  }[group];
  let html=`<section class="section clinical-reference" id="clinical-reference"><h2>${bi(title)}</h2><p>${bi(['具体方案以本院为准；每项数字同时核对人群、阶段和来源。','Follow institutional protocols; check population, stage and source with every number.'])}</p><div class="clinical-anchor-grid">${groups[group].map(id=>renderClaim(data,id)).join('\n')}</div></section>`;
  if(group==='documentation-handover')html+=`<section class="section record-examples"><h2>${bi(['国内写法练习：三个框架','Chinese record exercises: three outlines'])}</h2><p>${bi(['以下为无身份信息的教学框架，实际文书使用本院模板。','These teaching outlines contain no identifiers; use institutional forms in practice.'])}</p><div class="clinical-anchor-grid"><article><h3>${bi(['抢救记录 / 补记','Rescue record / supplementation'])}</h3><p>${bi(['抢救起止时刻［ ］；病情及变化［ ］；措施与反应［ ］；参加人员［ ］；告知［ ］；去向与接收者［ ］。因抢救未能及时书写：补记时刻［ ］、原因［ ］、据实补记标注［ ］、医师签名［ ］。','Rescue start/end [ ]; condition/change [ ]; actions/response [ ]; staff [ ]; communication [ ]; destination/receiver [ ]. If rescue prevented timely writing: supplementation time/reason/marking [ ]; physician signature [ ].'])}</p></article><article><h3>${bi(['病危（重）通知','Critical-condition notification'])}</h3><p>${bi(['诊断与危重情况［ ］；告知时刻、对象及关系［ ］；病情风险与拟救治沟通［ ］；患方意见/签名［ ］；医师签名/日期［ ］。按第27条一式两份，患方与病历各保留一份。','Diagnosis/critical condition [ ]; notification time, recipient/relationship [ ]; risks/care discussion [ ]; recipient response/signature [ ]; physician/date [ ]. Article 27: one copy for the recipient and one for the record.'])}</p></article><article><h3>${bi(['输血知情同意','Transfusion consent'])}</h3><p>${bi(['诊断与输血指征［ ］；拟输成分［ ］；相关检查［ ］；输血风险及可能不良后果［ ］；患者或依法授权签署意见/签名［ ］；医师签名/日期［ ］。无法及时签署时记录原因，走合法急救授权流程。','Diagnosis/indication [ ]; components [ ]; relevant tests [ ]; risks/adverse consequences [ ]; patient/lawfully authorized decision/signature [ ]; physician/date [ ]. If timely signing is impossible, record why and use lawful emergency authorization.'])}</p></article></div><p class="clinical-citations">${sources(data,['cn-records','cn-blood'])}</p></section>`;
  return html;
}
export function pocket(data,card){
  const href = id => id.startsWith('skill-') ? `trauma-skill.html?id=${id.slice(6)}` : id==='orthopaedics' ? '../orthopaedics/index.html' : ['spine','upper-limb','lower-limb'].includes(id) ? `../orthopaedics/${id}.html` : `${id}.html`;
  const courseLinks=card.courses.map((id,i)=>`<a href="${href(id)}">${bi([`打开原课${card.courses.length>1?' '+(i+1):''}`,`Open course${card.courses.length>1?' '+(i+1):''}`])}</a>`).join(' · ');
  return `<article class="pocket-card" id="pocket-${card.id}" data-pocket-id="${card.id}" data-pocket-courses="${card.courses.join(' ')}" data-pocket-axis="${card.axis}"><div class="pocket-face"><h2>${bi(card.title)}</h2><p class="pocket-scope">${bi(card.scope)}</p><ol>${card.rows.map(row=>`<li>${bi(row)}</li>`).join('')}</ol><p class="pocket-source-line">${sources(data,card.references)}</p><small>${bi(['以本院为准 · 教学速记 · 2026-10-08','Institutional policy applies · teaching recall · 2026-10-08'])}</small></div><details class="pocket-more"><summary>${bi(['查适用差异、审核记录和原课','Scope differences, review record and course'])}</summary>${card.claimIds.map(id=>{const c=data.claims.find(c=>c.id===id);return `<p>${bi(c.comparisonNote)}</p>`;}).join('')}<p>${bi(['来源核对：Codex辅助；临床审核人/日期：未签署。','Source check: Codex-assisted; clinical reviewer/date: unsigned.'])} <a href="quality-governance.html#review-record">${bi(['审核记录','Review record'])}</a></p><p>${courseLinks}</p></details></article>`;
}
