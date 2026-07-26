(function () {
  const list = window.TRAUMA_SKILLS || [];
  const sourceCatalog = window.TRAUMA_SKILL_SOURCES || {};
  const params = new URLSearchParams(window.location.search);
  const selected = list.find((item) => item.id === params.get("id")) || list[0];
  const bilingual = (zh, en) => `<span class="zh">${zh}</span><span class="en">${en}</span>`;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  const currentLang = () => document.body.dataset.lang === "en" ? "en" : "zh";
  const mediaLabel = (kind) => ({
    "official-embed": ["官方播放器", "Official player"],
    "official-link": ["专业机构原站", "Professional source"],
    "open-image": ["开放许可影像", "Open-licence image"],
    "open-video": ["开放许可视频", "Open-licence video"],
    "local-video": ["站内原创模拟短片", "Locally hosted simulation"],
    "local-simulation": ["高仿真模拟教学视觉", "High-fidelity simulation visual"]
  }[kind] || ["原创模拟视觉", "Original simulation visual"]);
  const completeDecision = (skill) => {
    const decision = skill && skill.clinicalDecision;
    if (!decision || !Array.isArray(decision.steps) || !Array.isArray(decision.metricNotes) || !Array.isArray(decision.signalLabels) || !Array.isArray(decision.stageSignals) || !Array.isArray(decision.reassessmentRows) || !Array.isArray(decision.branchQuestions)) return null;
    if (!skill.simulation || decision.stageSignals.length !== skill.simulation.stages.length) return null;
    const signalIds = decision.signalLabels.map((item) => item[0]);
    if (decision.stageSignals.some((stage) => signalIds.some((id) => !Array.isArray(stage[id]) || stage[id].length < 5))) return null;
    if (decision.reassessmentRows.some((row) => !Array.isArray(row[2]) || !Array.isArray(row[3]) || row[2].length !== skill.simulation.stages.length || row[3].length !== skill.simulation.stages.length)) return null;
    if (decision.branchQuestions.some((question) => !Number.isInteger(question.stageIndex) || question.stageIndex < 0 || question.stageIndex >= skill.simulation.stages.length || !Array.isArray(question.options))) return null;
    return decision;
  };

  function routeMedia(node) {
    const fallback = node.fallbackImage || node.image;
    if (node.mediaKind === "official-embed") return `<div class="route-media-frame video-frame"><iframe src="${node.mediaUrl}" title="${node.mediaTitleZh}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    if (node.mediaKind === "open-video" || node.mediaKind === "local-video") return `<div class="route-media-frame video-frame"><video controls preload="metadata" playsinline poster="${fallback}"><source src="${node.mediaUrl}" type="video/mp4" />${bilingual("浏览器不支持此视频，请使用下方原始来源。", "This browser cannot play the video; use the source link below.")}</video></div>`;
    return `<div class="route-media-frame"><img src="${node.image}" data-fallback="${fallback}" alt="${node.mediaTitleZh || node.titleZh}教学视觉" /></div>`;
  }

  function mediaLibrary(skill) {
    const featured = skill.competencyRoute.find((node) => node.mediaKind === "local-video" || node.mediaKind === "official-embed" || node.mediaKind === "open-video");
    return `<div class="verified-media">
      <div class="verified-media-copy"><span>${bilingual("媒体学习入口", "Media learning access")}</span><h3>${bilingual("先看站内模拟序列，再到权威原站核对", "Start with the local simulation, then verify at the authoritative source")}</h3><p>${bilingual("站内原创媒体可稳定播放；版权未明确允许再利用的专业内容只链接原站，不下载、不剪辑、不冒充本课程自制视频。", "Locally authored media remains directly playable. Professional content without explicit reuse rights is linked at source without downloading, editing, or claiming ownership.")}</p></div>
      ${featured ? `<div class="verified-media-player">${featured.mediaKind === "official-embed" ? `<iframe src="${featured.mediaUrl}" title="${featured.mediaTitleZh}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : `<video controls preload="metadata" playsinline poster="${featured.fallbackImage || featured.image}"><source src="${featured.mediaUrl}" type="video/mp4" /></video>`}<small>${bilingual(featured.mediaScopeZh, featured.mediaScopeEn)}</small></div>` : `<figure class="verified-media-player"><img src="${skill.realismVisual || skill.heroImage}" alt="${skill.titleZh}高仿真训练视觉" /><small>${bilingual("原创高仿真教学视觉；不含真实患者资料。", "Original high-fidelity teaching visual; no real-patient data.")}</small></figure>`}
      <div class="verified-media-links">${skill.competencyRoute.map((node, index) => { const label = mediaLabel(node.mediaKind); return `<a href="${node.sourceUrl || node.mediaUrl || node.fallbackImage}" target="_blank" rel="noreferrer"><b>0${index + 1}</b><span><strong>${bilingual(node.mediaTitleZh || node.titleZh, node.mediaTitleEn || node.titleEn)}</strong><small>${bilingual(label[0], label[1])}</small></span></a>`; }).join("")}</div>
    </div>`;
  }

  function renderHub() {
    const grid = document.querySelector("[data-skills-grid]");
    if (!grid) return;
    grid.innerHTML = list.map((skill, index) => `
      <article class="skill-card accent-${skill.accent}">
        <div class="skill-card-visual">
          <img src="${skill.heroImage}" alt="${skill.titleZh}模拟教学场景" loading="lazy" />
          <span class="skill-number">${String(index + 1).padStart(2, "0")}</span>
          <strong>${skill.icon}</strong>
        </div>
        <div class="skill-card-copy">
          <p class="skill-domain">${bilingual(skill.domainZh, skill.domainEn)}</p>
          <h3>${bilingual(skill.titleZh, skill.titleEn)}</h3>
          <p>${bilingual(skill.focusZh, skill.focusEn)}</p>
          <div class="tag-row"><span class="tag">${skill.code}</span><span class="tag warning">${bilingual("待逐项临床审核", "Claim-level review pending")}</span></div>
          <a class="button primary" href="trauma-skill.html?id=${skill.id}">${bilingual("打开完整课程", "Open full course")}</a>
        </div>
      </article>`).join("");
  }

  function routeSection(skill) {
    return `
      <div class="route-experience" data-route-experience>
        <ol class="route-tabs" aria-label="${skill.titleZh}能力路线">
          ${skill.competencyRoute.map((node, index) => `
            <li>
              <button type="button" class="route-tab ${index === 0 ? "active" : ""}" data-route-index="${index}" ${index === 0 ? 'aria-current="step"' : ""}>
                <img src="${node.image}" alt="${node.titleZh}高仿真模拟教学照片" />
                <span class="route-count">${String(index + 1).padStart(2, "0")}</span>
                ${node.visualKind === "local-simulation" ? `<small class="route-visual-label">${bilingual("合成模拟场景 · 不用于影像判读", "Synthetic simulation · not for image interpretation")}</small>` : node.visualKind === "open-image" ? `<small class="route-visual-label verified-image">${bilingual("真实开放影像 · 仅限所示窗口", "Authentic open image · shown view only")}</small>` : ""}
                <strong>${bilingual(node.titleZh, node.titleEn)}</strong>
              </button>
            </li>`).join("")}
        </ol>
        <div class="route-detail" data-route-detail aria-live="polite"></div>
      </div>`;
  }

  function decisionLadder(skill) {
    const decision = completeDecision(skill);
    if (!decision) return "";
    const ui = decision.ui || {};
    const repeatedStepImage = new Set(decision.steps.map((step) => step.image)).size < decision.steps.length;
    return `<section class="skill-section decision-lab" data-decision-ladder>
      <div class="section-heading"><div class="section-kicker">01A · ${bilingual(ui.kickerZh || "决策与升级", ui.kickerEn || "Decision & escalation")}</div><h2>${bilingual(ui.titleZh || `${skill.titleZh}：从识别到复评`, ui.titleEn || `${skill.titleEn}: recognition to reassessment`)}</h2><p>${bilingual(ui.descriptionZh || "把适用场景、效果确认、失败表现和升级路径放在同一条可复评路线中。", ui.descriptionEn || "Place indication, effect confirmation, failure signs, and escalation on one reassessable pathway.")}</p></div>
      <div class="decision-guardrail"><strong>${bilingual("先问这一句", "Ask this first")}</strong><p>${bilingual(decision.guardrailZh, decision.guardrailEn)}</p></div>
      <ol class="decision-ladder">
        ${decision.steps.map((step, index) => { const routeNode = skill.competencyRoute[index]; const image = repeatedStepImage ? (routeNode?.image || step.image) : step.image; return `<li class="decision-step step-${step.id}">
          <figure><img src="${image}" alt="${step.titleZh}教学视觉" /><span>${step.number}</span>${routeNode?.visualKind === "local-simulation" ? `<small class="visual-origin-badge">${bilingual("合成模拟场景 · 不用于影像判读", "Synthetic simulation · not for image interpretation")}</small>` : routeNode?.visualKind === "open-image" ? `<small class="visual-origin-badge verified-image">${bilingual("真实开放影像 · 仅限所示窗口", "Authentic open image · shown view only")}</small>` : ""}</figure>
          <div class="decision-step-copy"><h3>${bilingual(step.titleZh, step.titleEn)}</h3>
            <dl><div><dt>${bilingual("何时进入", "Enter when")}</dt><dd>${bilingual(step.enterZh, step.enterEn)}</dd></div><div><dt>${bilingual("如何确认有效", "Confirm effect")}</dt><dd>${bilingual(step.checkZh, step.checkEn)}</dd></div><div class="escalate"><dt>${bilingual("何时升级", "Escalate when")}</dt><dd>${bilingual(step.escalateZh, step.escalateEn)}</dd></div></dl>
            <div class="decision-sources">${step.sourceIds.map((id) => `<code>${id}</code>`).join("")}</div>
          </div>
        </li>`; }).join("")}
      </ol>
      <div class="metric-explainer"><div class="metric-explainer-head"><span>${bilingual(ui.metricLabelZh || "指标如何使用", ui.metricLabelEn || "How to use indicators")}</span><strong>${bilingual(ui.metricGuardZh || "警报用于触发复评，不替代临床判断", ui.metricGuardEn || "Alerts trigger reassessment; they do not replace clinical judgement")}</strong></div>
        <div class="metric-note-grid">${decision.metricNotes.map((item) => `<article><b>${escapeHtml(item.value)}</b><h3>${bilingual(item.labelZh, item.labelEn)}</h3><p>${bilingual(item.noteZh, item.noteEn)}</p><code>${escapeHtml(item.sourceId)}</code></article>`).join("")}</div>
      </div>
    </section>`;
  }

  function evidenceSection(skill) {
    const decision = completeDecision(skill);
    const decisionSourceIds = decision ? [
      ...decision.steps.flatMap((item) => item.sourceIds || []),
      ...decision.metricNotes.map((item) => item.sourceId).filter(Boolean)
    ] : [];
    const sourceIds = [...new Set([...(skill.evidence || []), ...decisionSourceIds])];
    return `
      <section class="skill-section evidence-lens">
        <div class="section-heading"><div class="section-kicker">02 · Evidence</div><h2>${bilingual("证据定位、重要主张与适用边界", "Evidence, key claims, and scope")}</h2><p>${bilingual(skill.locatorZh, skill.locatorEn)}</p></div>
        <div class="redline-card"><span>${bilingual("本页不要学错", "Do not learn this incorrectly")}</span><strong>${bilingual(skill.redlineZh, skill.redlineEn)}</strong></div>
        <div class="evidence-layout">
          <div class="evidence-cards">
            ${skill.evidenceHighlights.map((item, index) => `
              <article class="evidence-card">
                <div class="evidence-card-top"><span>0${index + 1}</span><small>${bilingual("待临床逐条审核", "Claim review pending")}</small></div>
                <h3>${bilingual(item.titleZh, item.titleEn)}</h3>
                <p>${bilingual(item.messageZh, item.messageEn)}</p>
                <div class="evidence-limit"><strong>${bilingual("不能外推", "Do not extrapolate")}</strong><p>${bilingual(item.limitZh, item.limitEn)}</p></div>
                <div class="evidence-ids">${item.sourceIds.map((id) => `<code>${id}</code>`).join("")}</div>
              </article>`).join("")}
          </div>
          <aside class="source-stack" aria-label="Evidence sources">
            <h3>${bilingual("来源定位", "Source locators")}</h3>
            ${sourceIds.map((source) => { const item = sourceCatalog[source]; return item ? `<a href="${item.url}" target="_blank" rel="noreferrer"><small>${source}</small><strong>${item.title}</strong><span>${bilingual("打开原始来源（新窗口）", "Open source (new window)")}</span></a>` : `<span>${source}</span>`; }).join("")}
            <div class="boundary-note"><strong>${bilingual("本地边界", "Local boundary")}</strong><p>${bilingual(skill.boundaryZh, skill.boundaryEn)}</p></div>
          </aside>
        </div>
      </section>`;
  }

  function visualSection(skill) {
    return `
      <section class="skill-section visual-lab" data-storyboard>
        <div class="section-heading"><div class="section-kicker">03 · ${bilingual("视觉与视频", "Visuals & video")}</div><h2>${bilingual("真实动态示例 + 可拍摄的本地教学脚本", "Authentic motion examples + a shoot-ready local script")}</h2><p>${bilingual("先通过开放许可影像或专业机构原站建立视觉认识，再用高仿真模型完成本地授权训练。", "Build visual recognition through open-licence media or professional source sites, then practise locally on high-fidelity trainers under authorisation.")}</p></div>
        ${mediaLibrary(skill)}
        <div class="visual-stage">
          <figure class="visual-main"><img data-story-image src="${skill.storyboard[0].image}" alt="${skill.storyboard[0].titleZh}教学关键帧" /><figcaption><span data-story-duration>${skill.storyboard[0].duration}</span><strong data-story-title>${bilingual(skill.storyboard[0].titleZh, skill.storyboard[0].titleEn)}</strong></figcaption></figure>
          <div class="visual-chapters" role="tablist" aria-label="Video storyboard chapters">
            ${skill.storyboard.map((item, index) => `<button type="button" role="tab" aria-selected="${index === 0}" class="story-tab ${index === 0 ? "active" : ""}" data-story-index="${index}"><span>0${index + 1}</span><strong>${bilingual(item.titleZh, item.titleEn)}</strong><small>${item.duration}</small></button>`).join("")}
          </div>
        </div>
        <div class="story-notes" aria-live="polite">
          <div><span>${bilingual("本章目标", "Objective")}</span><p data-story-objective>${bilingual(skill.storyboard[0].objectiveZh, skill.storyboard[0].objectiveEn)}</p></div>
          <div><span>${bilingual("暂停提问", "Pause prompt")}</span><p data-story-prompt>${bilingual(skill.storyboard[0].promptZh, skill.storyboard[0].promptEn)}</p></div>
          <div><span>${bilingual("拍摄边界", "Filming boundary")}</span><p>${bilingual("侵入性环节仅使用模拟器、授权教师与遮挡镜头；公开页不展示可脱离监督复制的动作序列。", "Invasive segments use trainers, authorised instructors, and obscured views; the public page does not show a sequence reproducible without supervision.")}</p></div>
        </div>
      </section>`;
  }

  function simulationSection(skill) {
    const simulation = skill.simulation;
    const decision = completeDecision(skill);
    const ui = decision ? (decision.ui || {}) : {};
    const signalBoard = decision ? `<div class="signal-board" data-signal-board aria-label="${currentLang() === "en" ? (ui.signalAriaEn || "Current skill decision signals") : (ui.signalAriaZh || "当前技能决策指标")}"></div>` : "";
    const reassessmentTable = decision ? `<div class="reassessment-table-wrap"><table><caption>${bilingual("动态复评：从单点回到趋势", "Dynamic reassessment: return from a single point to the trend")}</caption><thead><tr><th scope="col">${bilingual("复评轴", "Reassessment axis")}</th>${simulation.stages.map((stage, index) => `<th scope="col" data-reassessment-head="${index}">${stage.time}<small>${bilingual(stage.titleZh, stage.titleEn)}</small></th>`).join("")}</tr></thead><tbody>${decision.reassessmentRows.map((row) => `<tr><th scope="row">${bilingual(row[0], row[1])}</th>${row[2].map((value, index) => `<td data-reassessment-cell="${index}">${bilingual(value, row[3][index])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : "";
    return `
      <section class="skill-section simulation-lab" data-simulation>
        <div class="section-heading"><div class="section-kicker">04 · AI Simulation</div><h2>${bilingual(simulation.titleZh, simulation.titleEn)}</h2><p>${bilingual("合成教学病例，生命体征用于训练趋势整合，不是指南阈值，也不对应真实患者。", "Synthetic teaching case. Vitals train trend integration; they are not guideline thresholds and do not represent a real patient.")}</p></div>
        <div class="simulation-shell">
          <ol class="case-timeline" aria-label="Case stages">
            ${simulation.stages.map((item, index) => `<li><button type="button" data-case-index="${index}" ${index > 0 ? "disabled" : ""} class="case-stage-button ${index === 0 ? "active" : ""}"><span>${item.time}</span><strong>${bilingual(item.titleZh, item.titleEn)}</strong><small>${index === 0 ? bilingual("已释放", "Released") : bilingual("待释放", "Locked")}</small></button></li>`).join("")}
          </ol>
          <article class="case-panel" aria-live="polite">
            <div class="case-panel-head"><span data-case-time>${simulation.stages[0].time}</span><strong data-case-title>${bilingual(simulation.stages[0].titleZh, simulation.stages[0].titleEn)}</strong></div>
            <div class="vital-strip" data-case-vitals>${simulation.stages[0].vitals}</div>
            ${signalBoard}
            <div class="case-findings"><h3>${bilingual("当前已知", "Known now")}</h3><ul data-case-findings></ul></div>
            <div class="case-task"><span>${bilingual("学员任务", "Learner task")}</span><p data-case-task></p></div>
          </article>
          <aside class="case-action">
            <div><span>${bilingual("尚未解决", "Still unresolved")}</span><p>${bilingual("病因、措施效果、其他 xABCDE 威胁与下一轮复评均需继续验证。", "Cause, effect, other xABCDE threats, and the next reassessment all need continuing verification.")}</p></div>
            ${decision ? `<div class="branch-question" data-branch-question aria-live="polite"></div>` : ""}
            <button class="button primary" type="button" data-reveal-next>${bilingual("提交观察并释放下一节点", "Submit observation and release next stage")}</button>
            <div class="case-reveal" data-case-reveal hidden><strong>${bilingual("新信息", "New information")}</strong><p></p></div>
            <small>${bilingual("此交互只记录学习进程，不输出治疗指令或独立执业判断。", "This interaction records learning progress only; it produces no treatment instruction or independent-practice judgement.")}</small>
          </aside>
        </div>
        ${reassessmentTable}
      </section>`;
  }

  function assessmentSection(skill) {
    return `
      <section class="skill-section formative-board" data-assessment>
        <div class="section-heading"><div class="section-kicker">05 · ${bilingual("形成性反馈", "Formative feedback")}</div><h2>${bilingual("记录行为证据，不急着给一个总分", "Record behavioural evidence—not a premature total score")}</h2><p>${bilingual(skill.assessment.noteZh, skill.assessment.noteEn)}</p></div>
        <div class="assessment-grid">
          ${skill.assessment.domains.map((domain, index) => `<article class="assessment-domain"><span class="domain-number">0${index + 1}</span><h3>${bilingual(domain.titleZh, domain.titleEn)}</h3><ul>${domain.behavioursZh.map((item, i) => `<li>${bilingual(item, domain.behavioursEn[i])}</li>`).join("")}</ul><div class="rating-group" role="group" aria-label="${domain.titleZh}观察等级">${skill.assessment.levels.map((level) => `<button type="button" data-domain="${domain.id}" data-rating="${level.id}" aria-pressed="false">${bilingual(level.zh, level.en)}</button>`).join("")}</div></article>`).join("")}
        </div>
        <div class="assessment-summary"><strong>${bilingual("导师总结", "Instructor summary")}</strong><div><span>${bilingual("本轮做得较好", "Strength this round")}</span><input type="text" aria-label="Strength this round" placeholder="${currentLang() === "en" ? "Observed behaviour" : "记录可观察行为"}" /></div><div><span>${bilingual("下一轮只改进一项", "One focus for the next round")}</span><input type="text" aria-label="One next improvement" placeholder="${currentLang() === "en" ? "One next behaviour" : "只写一个下一步行为"}" /></div><button type="button" class="button" data-reset-assessment>${bilingual("清空本轮记录", "Clear this record")}</button></div>
      </section>`;
  }

  function renderDetail() {
    const root = document.querySelector("[data-skill-detail]");
    if (!root || !selected) return;
    document.title = `${selected.titleZh} | Trauma Skills Academy`;
    root.innerHTML = `
      <section class="skill-detail-hero accent-${selected.accent}">
        <div class="skill-hero-copy"><span class="eyebrow">${selected.code} · ${bilingual(selected.domainZh, selected.domainEn)}</span><h1>${bilingual(selected.titleZh, selected.titleEn)}</h1><p class="lead">${bilingual(selected.objectiveZh, selected.objectiveEn)}</p><div class="tag-row"><span class="tag warning">${bilingual("教师预览 / 模拟训练草案", "Instructor preview / simulation draft")}</span><span class="tag">${bilingual("逐条临床复核中", "Claim-level clinical review in progress")}</span></div></div>
        <figure class="skill-hero-image"><img src="${selected.heroImage}" alt="${selected.titleZh}模拟教学场景" /><figcaption>${bilingual("模拟技能中心视觉，不含真实患者资料", "Simulated skills-lab visual; no real-patient data")}</figcaption></figure>
      </section>
      <section class="skill-section"><div class="section-heading"><div class="section-kicker">01 · ${bilingual("能力路线", "Competency route")}</div><h2>${bilingual("每一个节点都有图、有观察任务、有复评问题", "Every node has a visual, observation task, and reassessment question")}</h2><p>${bilingual("点击五个节点，查看‘看什么—如何组织—下一次确认什么’。", "Select each node to inspect what to observe, how to organise, and what to confirm next.")}</p></div>${routeSection(selected)}</section>
      ${decisionLadder(selected)}
      ${evidenceSection(selected)}
      ${visualSection(selected)}
      ${simulationSection(selected)}
      ${assessmentSection(selected)}
      <nav class="skill-next" aria-label="Skill navigation"><a class="button" href="trauma-skills-academy.html">${bilingual("返回 9 项技能地图", "Back to nine-skill map")}</a>${list.map((skill) => `<a class="tag ${skill.id === selected.id ? "approved" : ""}" ${skill.id === selected.id ? 'aria-current="page"' : ""} href="trauma-skill.html?id=${skill.id}">${skill.icon}</a>`).join("")}</nav>`;
    bindInteractions(selected);
  }

  function bindInteractions(skill) {
    const routeDetail = document.querySelector("[data-route-detail]");
    const renderRoute = (index) => {
      const node = skill.competencyRoute[index];
      const label = mediaLabel(node.visualKind || node.mediaKind);
      const attribution = node.visualAttribution || node.attribution;
      routeDetail.innerHTML = `<div class="route-detail-media">${routeMedia(node)}<div class="media-provenance"><span>${bilingual(label[0], label[1])}</span><strong>${bilingual(node.mediaTitleZh || node.titleZh, node.mediaTitleEn || node.titleEn)}</strong>${attribution ? `<small>${attribution}</small>` : ""}</div></div><div class="route-detail-copy"><span>${String(index + 1).padStart(2, "0")} · ${bilingual("临床识别节点", "Clinical recognition node")}</span><h3>${bilingual(node.titleZh, node.titleEn)}</h3><p class="route-scene">${bilingual(node.sceneZh || node.summaryZh, node.sceneEn || node.summaryEn)}</p><div class="learning-grid"><article><b>${bilingual("为什么现在讨论", "Why now")}</b><p>${bilingual(node.whyZh || node.summaryZh, node.whyEn || node.summaryEn)}</p></article><article><b>${bilingual("监督下怎么练", "How to practise")}</b><p>${bilingual(node.practiceZh || node.summaryZh, node.practiceEn || node.summaryEn)}</p></article><article class="success"><b>${bilingual("成功表现", "Success looks like")}</b><p>${bilingual(node.successZh || node.summaryZh, node.successEn || node.summaryEn)}</p></article><article class="failure"><b>${bilingual("失败或危险表现", "Failure / danger signs")}</b><p>${bilingual(node.failureZh || node.summaryZh, node.failureEn || node.summaryEn)}</p></article></div><div class="reassess-question"><strong>${bilingual("下一次复评", "Next reassessment")}</strong><p>${bilingual(node.reassessZh, node.reassessEn)}</p></div><div class="media-action"><a class="button" href="${node.sourceUrl || node.mediaUrl || node.fallbackImage}" target="_blank" rel="noreferrer">${bilingual(node.sourceUrl ? "打开权威补充来源" : "打开原始媒体与适用边界", node.sourceUrl ? "Open authoritative supplement" : "Open original media and scope")}</a><small>${bilingual(node.mediaScopeZh || "原创模拟视觉用于教学认识，不替代临床判断。", node.mediaScopeEn || "Original simulation visual supports learning and does not replace clinical judgement.")}</small></div></div>`;
      routeDetail.querySelectorAll("img[data-fallback]").forEach((img) => img.addEventListener("error", () => { if (img.src !== img.dataset.fallback) img.src = img.dataset.fallback; }, { once: true }));
      document.querySelectorAll("[data-route-index]").forEach((button, i) => { button.classList.toggle("active", i === index); button.toggleAttribute("aria-current", i === index); });
    };
    renderRoute(0);
    document.querySelectorAll("[data-route-index]").forEach((button) => button.addEventListener("click", () => renderRoute(Number(button.dataset.routeIndex))));

    document.querySelectorAll("[data-story-index]").forEach((button) => button.addEventListener("click", () => {
      const index = Number(button.dataset.storyIndex); const item = skill.storyboard[index];
      document.querySelector("[data-story-image]").src = item.image;
      document.querySelector("[data-story-image]").alt = `${item.titleZh}教学关键帧`;
      document.querySelector("[data-story-duration]").textContent = item.duration;
      document.querySelector("[data-story-title]").innerHTML = bilingual(item.titleZh, item.titleEn);
      document.querySelector("[data-story-objective]").innerHTML = bilingual(item.objectiveZh, item.objectiveEn);
      document.querySelector("[data-story-prompt]").innerHTML = bilingual(item.promptZh, item.promptEn);
      document.querySelectorAll("[data-story-index]").forEach((tab, i) => { tab.classList.toggle("active", i === index); tab.setAttribute("aria-selected", String(i === index)); });
    }));

    let caseIndex = 0;
    const caseButtons = [...document.querySelectorAll("[data-case-index]")];
    const revealButton = document.querySelector("[data-reveal-next]");
    const decision = completeDecision(skill);
    const renderSignals = (index) => {
      const board = document.querySelector("[data-signal-board]");
      if (!board || !decision) return;
      const signals = decision.stageSignals[index];
      board.innerHTML = decision.signalLabels.map(([id, labelZh, labelEn]) => {
        const [valueZh, valueEn, status, evidenceZh, evidenceEn] = signals[id];
        return `<article class="signal-card status-${status}"><span>${bilingual(labelZh, labelEn)}</span><strong>${bilingual(valueZh, valueEn)}</strong><small>${bilingual(evidenceZh, evidenceEn)}</small></article>`;
      }).join("");
    };
    const renderReassessment = (index) => {
      document.querySelectorAll("[data-reassessment-head]").forEach((head) => {
        const column = Number(head.dataset.reassessmentHead);
        head.classList.toggle("current", column === index);
        head.classList.toggle("released", column < index);
        head.classList.toggle("locked", column > index && caseButtons[column].disabled);
      });
      document.querySelectorAll("[data-reassessment-cell]").forEach((cell) => {
        const column = Number(cell.dataset.reassessmentCell);
        cell.classList.toggle("current", column === index);
        cell.classList.toggle("released", column < index);
        cell.classList.toggle("locked", column > index && caseButtons[column].disabled);
      });
    };
    const renderBranch = (index) => {
      const container = document.querySelector("[data-branch-question]");
      if (!container || !decision) return false;
      const question = decision.branchQuestions.find((item) => item.stageIndex === index);
      if (!question) {
        container.innerHTML = "";
        container.hidden = true;
        return false;
      }
      container.hidden = false;
      container.innerHTML = `<fieldset><legend>${bilingual(question.promptZh, question.promptEn)}</legend><div class="branch-options">${question.options.map((option) => `<button type="button" data-branch-choice="${option[0]}" data-classification="${option[3]}">${bilingual(option[1], option[2])}</button>`).join("")}</div></fieldset><div class="branch-feedback" data-branch-feedback hidden></div>`;
      revealButton.disabled = true;
      container.querySelectorAll("[data-branch-choice]").forEach((button) => button.addEventListener("click", () => {
        const option = question.options.find((item) => item[0] === button.dataset.branchChoice);
        const classificationLabels = {
          "best-supported": ["最有依据的路径", "Best-supported pathway"],
          incomplete: ["信息或行动不完整", "Incomplete response"],
          unsafe: ["存在安全风险", "Safety concern"]
        };
        container.querySelectorAll("[data-branch-choice]").forEach((choice) => {
          choice.classList.toggle("selected", choice === button);
          choice.setAttribute("aria-pressed", String(choice === button));
        });
        const feedback = container.querySelector("[data-branch-feedback]");
        const label = classificationLabels[option[3]] || classificationLabels.incomplete;
        feedback.className = `branch-feedback feedback-${option[3]}`;
        feedback.innerHTML = `<strong>${bilingual(label[0], label[1])}</strong><p>${bilingual(option[4], option[5])}</p>`;
        feedback.hidden = false;
        revealButton.disabled = false;
      }));
      return true;
    };
    const renderCase = (index) => {
      const item = skill.simulation.stages[index];
      document.querySelector("[data-case-time]").textContent = item.time;
      document.querySelector("[data-case-title]").innerHTML = bilingual(item.titleZh, item.titleEn);
      document.querySelector("[data-case-vitals]").textContent = item.vitals;
      document.querySelector("[data-case-findings]").innerHTML = item.findingsZh.map((finding, i) => `<li>${bilingual(finding, item.findingsEn[i])}</li>`).join("");
      document.querySelector("[data-case-task]").innerHTML = bilingual(item.taskZh, item.taskEn);
      document.querySelector("[data-case-reveal]").hidden = true;
      revealButton.disabled = false;
      revealButton.innerHTML = index === skill.simulation.stages.length - 1 ? bilingual("查看本节点结局", "Reveal this stage outcome") : bilingual("提交观察并释放下一节点", "Submit observation and release next stage");
      caseButtons.forEach((button, i) => button.classList.toggle("active", i === index));
      renderSignals(index);
      renderReassessment(index);
      renderBranch(index);
    };
    caseButtons.forEach((button) => button.addEventListener("click", () => { if (!button.disabled) { caseIndex = Number(button.dataset.caseIndex); renderCase(caseIndex); } }));
    revealButton.addEventListener("click", (event) => {
      const item = skill.simulation.stages[caseIndex]; const reveal = document.querySelector("[data-case-reveal]");
      reveal.hidden = false; reveal.querySelector("p").innerHTML = bilingual(item.revealZh, item.revealEn);
      if (caseIndex < skill.simulation.stages.length - 1) {
        const nextButton = caseButtons[caseIndex + 1]; nextButton.disabled = false; nextButton.querySelector("small").innerHTML = bilingual("可进入", "Available");
        event.currentTarget.innerHTML = bilingual("下一节点已解锁", "Next stage unlocked");
      } else event.currentTarget.innerHTML = bilingual("本病例已完成，进入形成性反馈", "Case complete—continue to formative feedback");
      event.currentTarget.disabled = true;
    });
    renderCase(0);

    document.querySelectorAll("[data-rating]").forEach((button) => button.addEventListener("click", () => {
      const group = document.querySelectorAll(`[data-domain="${button.dataset.domain}"]`);
      group.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    }));
    document.querySelector("[data-reset-assessment]").addEventListener("click", () => {
      document.querySelectorAll("[data-rating]").forEach((button) => button.setAttribute("aria-pressed", "false"));
      document.querySelectorAll(".assessment-summary input").forEach((input) => { input.value = ""; });
    });
  }

  renderHub();
  renderDetail();
})();
