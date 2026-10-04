/* =====================================================================
   trauma-skills-cases-visual-v2 · 紧凑五节点导航渲染器
   用法（给 Codex 集成）：
     1. 在课程页 <head> 引入 ../assets/v2-design.css
     2. 依次引入 v2-key-points.js 与本文件
     3. 在渲染能力路线处调用：
          V2SkillNav.renderInto(document.getElementById('skill-route'), skill)
        其中 skill 为 hydrate 后的技能对象（含 competencyRoute 五节点，
        节点已带 image / mediaKind / mediaUrl / sourceObserve* / mediaScope* /
        visualAttribution），与 trauma-skills.js 现有数据结构一致。
   设计：五节点 = 紧凑导航；当前节点 = 一张匹配视觉 ＋ 三条短重点；
        准备 / 解释 / 证据 放入 <details> 展开；无真实操作图用文字任务流程。
   teacher-review draft · 待临床教师复核
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* 双语：中文主行 + 英文次行（与站点现有 bilingual 风格一致） */
  function bi(zh, en) {
    var z = esc(zh), e = esc(en);
    if (!z && !e) return '';
    return '<span class="zh">' + z + '</span>' + (e ? '<span class="en">' + e + '</span>' : '');
  }

  function keyPoints(skillId, index) {
    var skill = (window.TRAUMA_SKILLS || []).find(function(s) { return s.id === skillId; });
    var n = skill && skill.competencyRoute[index];
    if (!n) return null;
    return [[n.sourceObserveZh || n.summaryZh, n.sourceObserveEn || n.summaryEn],
            [n.successZh || n.summaryZh,n.successEn || n.summaryEn],
            [n.failureZh || n.reassessZh,n.failureEn || n.reassessEn]];
  }
  function taskFlow() {
    return [['描述已有事实','Describe available facts'],['指出需要团队确认的信息','Identify what the team must confirm'],['记录变化与下一次复评','Record changes and next reassessment']];
  }

  /* ---- 当前节点的“一张匹配视觉” ---- */
  function visualHtml(skill, node, index) {
    var kind = node.mediaKind || (node.image ? 'open-image' : 'task-card-only');

    /* 官方视频：外链卡（不嵌入、不下载、不冒充自制） */
    if (kind === 'official-link' || kind === 'official-embed' || kind === 'open-video') {
      var url = node.mediaUrl || node.sourceUrl || '';
      var observe = bi(node.sourceObserveZh, node.sourceObserveEn);
      return '<figure class="v2-visual"><div class="v2-videocard">' +
        '<span class="v2-play" aria-hidden="true">▶</span>' +
        '<strong>' + bi('带着问题到官方原页观看', 'Watch at the official source with a question') + '</strong>' +
        (observe ? '<p>' + observe + '</p>' : '') +
        (url ? '<a class="v2-button" href="' + esc(url) + '" target="_blank" rel="noreferrer">' +
          bi('打开官方视频原页', 'Open official video page') + '</a>' : '') +
        '<small>' + bi('授课前检查播放；原页演示不等于本地通用操作标准。',
                       'Check playback before class; a demonstration is not a universal local protocol.') + '</small>' +
        '</div></figure>';
    }

    /* 真实授权图：单图 + 观察点 + 局限 + 署名 */
    if (node.image) {
      var caption = bi(node.sourceObserveZh, node.sourceObserveEn);
      var limit = bi(node.mediaScopeZh, node.mediaScopeEn);
      var credit = node.visualAttribution ? esc(node.visualAttribution) : '';
      return '<figure class="v2-visual">' +
        '<img src="' + esc(node.image) + '" loading="lazy" alt="' + esc(node.titleEn || node.titleZh || '') + '" />' +
        '<figcaption>' +
        (caption ? '<div>' + caption + '</div>' : '') +
        (limit ? '<div style="margin-top:.5rem">' + limit + '</div>' : '') +
        (credit ? '<span class="v2-credit">' + credit + '</span>' : '') +
        '</figcaption></figure>';
    }

    /* 无真实操作图：准确 HTML 文字任务流程（不造解剖图/操作图/视频） */
    var flow = taskFlow(skill.id, index);
    var steps = flow ? flow.map(function (s) {
      return '<li>' + bi(s[0], s[1]) + '</li>';
    }).join('') : '';
    return '<figure class="v2-visual"><ol class="v2-taskflow">' + steps + '</ol>' +
      '<p class="v2-taskflow-note">' +
      bi('文字任务流程：无适配的真实操作图，不以示意图代替证据。',
         'Text task flow: no suitable authentic operation image; a schematic is not evidence.') +
      '</p></figure>';
  }

  /* ---- 当前节点面板：视觉 ＋ 三短重点 ＋ details ---- */
  function panelHtml(skill, node, index) {
    var num = String(index + 1).padStart(2, '0');
    var title = bi(node.titleZh, node.titleEn);
    var scene = bi(node.sceneZh || node.summaryZh, node.sceneEn || node.summaryEn);

    var pts = keyPoints(skill.id, index);
    var pointsHtml;
    if (pts) {
      pointsHtml = '<ul class="v2-points">' + pts.map(function (p) {
        return '<li>' + bi(p[0], p[1]) + '</li>';
      }).join('') + '</ul>';
    } else {
      var fallback = bi(node.sourceObserveZh, node.sourceObserveEn);
      pointsHtml = '<ul class="v2-points"><li>' + (fallback || bi('观察任务见节点正文。', 'See the node text for the observation task.')) + '</li></ul>';
    }

    var folds = '';
    var prep = bi(node.practiceZh, node.practiceEn);
    if (prep) folds += '<details class="v2-fold"><summary>' +
      bi('准备：在监督下怎么练', 'Prepare: how to practise under supervision') +
      '</summary><div class="v2-fold-body">' + prep + '</div></details>';

    var why = bi(node.whyZh, node.whyEn);
    if (why) folds += '<details class="v2-fold"><summary>' +
      bi('解释：为什么现在讨论', 'Explain: why this node now') +
      '</summary><div class="v2-fold-body">' + why + '</div></details>';

    var evidence = '';
    var obs = bi(node.sourceObserveZh, node.sourceObserveEn);
    if (obs) evidence += '<p>' + obs + '</p>';
    var lim = bi(node.mediaScopeZh, node.mediaScopeEn);
    if (lim) evidence += '<p>' + lim + '</p>';
    if (node.visualAttribution) evidence += '<p><small>' + esc(node.visualAttribution) + '</small></p>';
    var srcUrl = node.sourceUrl || node.mediaUrl || '';
    if (srcUrl) evidence += '<p><a href="' + esc(srcUrl) + '" target="_blank" rel="noreferrer">' +
      bi('打开原始来源与适用边界', 'Open original source and scope') + '</a></p>';
    if (evidence) folds += '<details class="v2-fold"><summary>' +
      bi('证据与边界', 'Evidence and limits') +
      '</summary><div class="v2-fold-body">' + evidence + '</div></details>';

    var reassess = bi(node.reassessZh, node.reassessEn);

    return '<div class="v2-panel" data-node="' + index + '">' +
      visualHtml(skill, node, index) +
      '<div class="v2-panel-copy">' +
      '<p class="v2-node-kicker">' + num + ' · ' + bi('临床节点', 'Clinical node') + '</p>' +
      '<h3>' + title + '</h3>' +
      (scene ? '<p class="v2-scene"><strong><span class="zh">合成教学情景；配图仅展示训练场景：</span><span class="en">Synthetic teaching scenario; image shows a training context only:</span></strong> ' + scene + '</p>' : '') +
      pointsHtml +
      folds +
      (reassess ? '<div class="v2-reassess"><strong>' +
        bi('下一次复评', 'Next reassessment') + '</strong><p>' + reassess + '</p></div>' : '') +
      '</div></div>';
  }

  function renderInto(mount, skill) {
    if (!mount || !skill || !Array.isArray(skill.competencyRoute)) return;
    var nodes = skill.competencyRoute.slice(0, 5);
    var active = 0;

    var navHtml = '<ul class="v2-nodes" aria-label="' +
      esc(skill.titleZh || 'skill') + '">';
    nodes.forEach(function (node, i) {
      navHtml += '<li><button type="button" class="v2-node-tab" data-i="' + i + '"' +
        ' aria-selected="' + (i === active ? 'true' : 'false') + '">' +
        '<span class="v2-num">' + (i + 1) + '</span>' +
        '<span>' + bi(node.titleZh, node.titleEn) + '</span></button></li>';
    });
    navHtml += '</ul>';

    mount.classList.add('v2-skillnav');
    mount.innerHTML = navHtml + '<div class="v2-stage">' + panelHtml(skill, nodes[active], active) + '</div>';

    var stage = mount.querySelector('.v2-stage');
    mount.querySelectorAll('.v2-node-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-i'), 10);
        if (i === active) return;
        active = i;
        mount.querySelectorAll('.v2-node-tab').forEach(function (b) {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        stage.innerHTML = panelHtml(skill, nodes[i], i);
      });
    });
  }

  window.V2SkillNav = { renderInto: renderInto };
})();
