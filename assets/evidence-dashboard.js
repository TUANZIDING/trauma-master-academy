(function () {
  const root = document.querySelector('[data-evidence-dashboard]');
  if (!root) return;

  const statusFilter = root.querySelector('[data-evidence-status]');
  const searchInput = root.querySelector('[data-evidence-search]');
  const list = root.querySelector('[data-evidence-list]');
  const error = root.querySelector('[data-evidence-error]');
  const metrics = root.querySelector('[data-evidence-metrics]');
  const caseGate = root.querySelector('[data-case-gate]');
  let claims = [];

  function bilingual(zh, en) {
    return `<span class="zh">${zh}</span><span class="en">${en}</span>`;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
    })[character]);
  }

  function renderMetrics(summary) {
    const values = [
      ['主张记录', 'Claim records', summary.claim_count],
      ['缺证据位置', 'Missing evidence locations', summary.missing_evidence_location_count],
      ['需本地适配', 'Local adaptation required', summary.local_adaptation_count],
      ['可公开主张', 'Publishable claims', summary.publishable_count]
    ];
    metrics.innerHTML = values.map(([zh, en, value]) => `
      <article class="evidence-metric"><strong>${escapeHtml(value)}</strong><span>${bilingual(zh, en)}</span></article>
    `).join('');
  }

  function renderClaims() {
    const status = statusFilter.value;
    const query = searchInput.value.trim().toLowerCase();
    const visible = claims.filter((claim) => {
      const matchesStatus = status === 'all' || claim.review_status === status;
      const haystack = [claim.claim_id, claim.module_path, claim.source_organization, claim.source_title].join(' ').toLowerCase();
      return matchesStatus && (!query || haystack.includes(query));
    });

    list.innerHTML = visible.slice(0, 80).map((claim) => `
      <article class="evidence-row">
        <div><code>${escapeHtml(claim.claim_id)}</code><small>${escapeHtml(claim.module_path)}</small></div>
        <span class="governance-status" data-state="${escapeHtml(claim.review_status)}">${escapeHtml(claim.review_status)}</span>
        <span>${escapeHtml(claim.source_organization || 'source not recorded')}</span>
        <span>${escapeHtml(claim.evidence_location)}</span>
      </article>
    `).join('') || `<p class="muted">${bilingual('没有符合当前筛选条件的记录。', 'No records match the current filters.')}</p>`;
  }

  function renderCaseGate(register) {
    caseGate.innerHTML = register.cases.map((item) => `
      <article class="case-gate-row">
        <div><code>${escapeHtml(item.case_id)}</code><strong>${bilingual(item.working_title_zh, item.working_title_en)}</strong></div>
        <span class="governance-status" data-state="${escapeHtml(item.review_status)}">${escapeHtml(item.review_status)}</span>
        <p>${item.public_payload_included ? bilingual('历史匿名衍生内容已存在，但授权记录有冲突；保持教师预览并暂停扩展。', 'A legacy anonymous derivative exists, but authorization records conflict; retain instructor preview and pause expansion.') : bilingual('公开病例载荷：否。完成脱敏和书面教学授权前保持阻断。', 'Public case payload: no. Keep blocked until de-identification and documented teaching authorization are complete.')}</p>
      </article>
    `).join('');
  }

  Promise.all([
    fetch('../data/claim-evidence-ledger.json').then((response) => response.json()),
    fetch('../data/evidence-governance-summary.json').then((response) => response.json()),
    fetch('../data/case-intake-register.json').then((response) => response.json())
  ]).then(([ledger, summary, register]) => {
    claims = ledger.claims;
    renderMetrics(summary);
    renderCaseGate(register);
    [...new Set(claims.map((claim) => claim.review_status))].sort().forEach((status) => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      statusFilter.appendChild(option);
    });
    renderClaims();
  }).catch((reason) => {
    error.hidden = false;
    error.textContent = `Evidence data could not be loaded: ${reason.message}`;
  });

  statusFilter.addEventListener('change', renderClaims);
  searchInput.addEventListener('input', renderClaims);
})();
