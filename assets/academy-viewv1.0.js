(() => {
  'use strict';
  const teacher = new URLSearchParams(location.search).get('teacher') === '1';
  document.body.dataset.audit = String(teacher);
  if (teacher) return;
  const internal = /\b(?:TRAUMA-ACADEMY-[\w-]+|TSA-[\w-]+|CASE-TRAUMA-[\w-]+|CLAIM-[\w-]+|teaching_not_protocol|source_required|teacher_preview_only|pending_local_confirmation|pending_clinician_review|visual_asset_pending_review|source_index_pending_review|evidence_review_required|RELEASE GATE|scoring unchanged)\b/g;
  const hidden = '.learner-status,.audit-code,.claim,[data-teacher-only],.tag[data-review-status]';
  function clean(root) {
    if(root.matches?.(hidden))root.hidden=true;
    root.querySelectorAll?.(hidden).forEach(el => { el.hidden = true; });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script,style,[data-teacher-only],.learner-status,.audit-code')) continue;
      const en = node.parentElement?.closest('.en,.t-en');
      const text = node.textContent.replace(internal, '').replace(/Obsidian/g, en ? 'Course structure resources' : '课程结构资料')
        .replace(/临床内容待教师终审|临床适用性仍待教师逐项复核|Codex 辅助[^。\n]*未签署/g,en?'Clinical review ongoing':'临床审核进行中').replace(/ChatGPT合成教学情景/g,en?'Teaching scene':'教学情境')
        .replace(/(?:待核验|待确认)/g, '需进一步核查').replace(/(?:待审核|教师预览)/g, '教学参考');
      if (text !== node.textContent) node.textContent = text;
    }
  }
  clean(document.body);
  document.querySelectorAll('.tag,.pill,.status-pill,.review-badge').forEach(el=>{if(/来源待补|待专家复核|教学试用版|待复核|待审核|已批准|已登记|source_required|pending_|review required|approved|indexed/i.test(el.textContent))el.hidden=true;});
  new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) clean(node);
    else if(node.nodeType === Node.TEXT_NODE&&node.parentElement)clean(node.parentElement);
  }))).observe(document.body, {childList: true, subtree: true});
})();
