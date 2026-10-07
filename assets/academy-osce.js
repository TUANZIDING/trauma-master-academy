(() => {
  const root=document.querySelector('[data-osce-sheets]');if(!root)return;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bi=(zh,en)=>`<span class="zh">${escape(zh)}</span><span class="en">${escape(en)}</span>`;
  const criteria={
  "bvm": [
    [
      "核对人员、监护、面罩及球囊准备，完成感染防护。",
      "Check team, monitoring, mask and bag preparation, including infection precautions."
    ],
    [
      "在模型上开放气道，与助手配合形成面罩密闭。",
      "Open the trainer airway and coordinate mask seal with an assistant."
    ],
    [
      "观察胸廓运动、漏气与氧合趋势，报告通气效果。",
      "Observe chest movement, leak and oxygenation trend; report ventilation effect."
    ],
    [
      "识别密闭或通气无效，说明停止点和升级需求。",
      "Recognize ineffective seal or ventilation and state stop points and escalation needs."
    ],
    [
      "明确角色，用闭环语言交接效果与未解决问题。",
      "Clarify roles and hand over effect and unresolved concerns with closed-loop communication."
    ]
  ],
  "intubation": [
    [
      "说明主计划、备选计划、角色和失败停止点。",
      "State primary/backup plans, roles and failure stop points."
    ],
    [
      "核查氧合、器材和监护准备，遵循本站清单。",
      "Check oxygenation, equipment and monitoring preparation against the station checklist."
    ],
    [
      "在训练器上按获授权清单完成受监督演练。",
      "Complete supervised trainer practice within the authorized station checklist."
    ],
    [
      "提出客观位置与通气效果确认，不能只凭胸廓运动。",
      "Request objective placement and ventilation confirmation rather than chest movement alone."
    ],
    [
      "宣告失败并启动团队救援沟通，交接后续监护。",
      "Declare failure, coordinate team rescue communication and hand over monitoring."
    ]
  ],
  "cricothyrotomy": [
    [
      "识别并宣告失败气道危机。",
      "Recognize and declare the failed-airway crisis."
    ],
    [
      "在模型上定位表面解剖并核对训练装置。",
      "Identify trainer surface anatomy and check equipment."
    ],
    [
      "点名操作者、助手、监护与记录角色。",
      "Assign operator, assistant, monitoring and recorder roles."
    ],
    [
      "在专用训练器按本站清单完成受监督演练。",
      "Complete supervised practice on a dedicated trainer against the station checklist."
    ],
    [
      "核查通气，复盘延误、沟通和后续交接。",
      "Confirm ventilation and debrief delay, communication and handover."
    ]
  ],
  "needle-decompression": [
    [
      "整合胸部查体、呼吸和循环的变化。",
      "Integrate chest examination, respiratory and circulatory changes."
    ],
    [
      "说明时间敏感风险与优先级，避免等待单一影像。",
      "Explain time-sensitive risk and priorities without waiting on a single imaging pathway."
    ],
    [
      "在模型上按本地技能清单受监督演练。",
      "Practise on a trainer under supervision using the local skills checklist."
    ],
    [
      "核查效果与持续风险，识别无改善。",
      "Check effect and continuing risk; recognize absent improvement."
    ],
    [
      "回到 xABCDE，报告变化及进一步团队需求。",
      "Return to xABCDE and report changes and further team needs."
    ]
  ],
  "tube-thoracostomy": [
    [
      "说明胸膜腔问题、目标与本地授权范围。",
      "Explain the pleural concern, goal and local authorization scope."
    ],
    [
      "执行核对、无菌、监护及团队准备。",
      "Complete verification, asepsis, monitoring and team preparation."
    ],
    [
      "在胸壁模型按本地清单完成受监督演练。",
      "Complete supervised chest-wall trainer practice using the local checklist."
    ],
    [
      "核查连接系统、患者反应与影像信息。",
      "Check the connected system, response and imaging information."
    ],
    [
      "记录并交接引流、监护和复评重点。",
      "Record and hand over drainage, monitoring and reassessment priorities."
    ]
  ],
  "efast": [
    [
      "说明窗口、探头方向及每个窗口的问题。",
      "Explain windows, probe orientation and the question each window addresses."
    ],
    [
      "取得可解释的图像；质量不足时明确不可判读。",
      "Obtain interpretable images and label inadequate images indeterminate."
    ],
    [
      "识别目标结构，区分正常、异常与不确定。",
      "Identify target structures and distinguish normal, abnormal and uncertain findings."
    ],
    [
      "用标准语言报告发现与局限。",
      "Report findings and limitations in standard language."
    ],
    [
      "将结果放回 xABCDE；阴性结果不独立排除损伤。",
      "Integrate findings with xABCDE; a negative examination alone does not exclude injury."
    ]
  ],
  "tourniquet": [
    [
      "识别危及生命的肢体出血及整体优先级。",
      "Recognize life-threatening limb bleeding and overall priorities."
    ],
    [
      "核对装置准备并说明压迫、填塞与止血带情境。",
      "Check device preparation and discuss pressure, packing and tourniquet context."
    ],
    [
      "在出血控制模型按本地清单受监督演练。",
      "Practise on a hemorrhage-control trainer under supervision with the local checklist."
    ],
    [
      "核查出血控制和肢体状态，报告无效。",
      "Check bleeding control and limb status; report failure."
    ],
    [
      "记录应用时间并交接装置和持续复评。",
      "Record application time and hand over the device and reassessment plan."
    ]
  ],
  "pelvic-binder": [
    [
      "结合机制、生理和查体说明骨盆风险。",
      "Explain pelvic risk using mechanism, physiology and examination."
    ],
    [
      "共享装置目的、移动计划及团队角色。",
      "Share device purpose, movement plan and team roles."
    ],
    [
      "在模型按本地清单受监督应用装置。",
      "Apply the device on a trainer under supervision using the local checklist."
    ],
    [
      "核查解剖水平、装置状态、皮肤与肢体情况。",
      "Check anatomical level, device, skin and limb status."
    ],
    [
      "记录并交接循环、皮肤与后续处置复评。",
      "Record and hand over circulatory, skin and further management reassessment."
    ]
  ],
  "splinting": [
    [
      "先说明整体创伤优先级，再进入肢体任务。",
      "Explain overall trauma priorities before the limb task."
    ],
    [
      "描述畸形、开放伤、软组织和皮肤情况。",
      "Describe deformity, open wounds, soft tissue and skin."
    ],
    [
      "记录固定前神经血管基线。",
      "Record the pre-immobilization neurovascular baseline."
    ],
    [
      "在模型按损伤模式和本地清单受监督固定。",
      "Practise trainer immobilization for the injury pattern under supervision using the local checklist."
    ],
    [
      "固定后复查并记录皮肤、疼痛和神经血管变化，明确交接责任。",
      "Recheck and record skin, pain and neurovascular changes after immobilization and assign handover responsibility."
    ]
  ]
};
  const id=new URLSearchParams(location.search).get('id');
  const skills=(window.TRAUMA_SKILLS||[]).filter(skill=>!id||skill.id===id);
  if(!skills.length){root.textContent='未找到技能 / Skill not found';return;}
  root.innerHTML=skills.map(skill=>`<article class="academy-print-sheet"><h2>${bi(skill.titleZh,skill.titleEn)} · OSCE</h2><p>${bi('监督下模拟站 · 建议 8 分钟（含反馈）','Supervised simulation station · suggested eight minutes including feedback')}</p><div class="signature-lines"><span>${bi('学员编码：________','Learner code: ________')}</span><span>${bi('教师：________','Instructor: ________')}</span><span>${bi('日期：________','Date: ________')}</span></div><table><thead><tr><th>${bi('可观察的行为','Observable behavior')}</th><th>0 / 1 / 2</th><th>${bi('记录与反馈','Evidence / feedback')}</th></tr></thead><tbody>${skill.osceZh.map((item,i)=>`<tr><td><strong>${bi(item,skill.osceEn[i])}</strong><br>${bi(...criteria[skill.id][i])}</td><td>□0 □1 □2</td><td></td></tr>`).join('')}</tbody></table><p class="learning-source-note">${bi('0 未完成/不安全；1 提示后完成；2 监督下无需提示完成。','0 omitted/unsafe; 1 completed with prompting; 2 completed under supervision without prompting.')}</p><p>${bi('本轮合计：____ / 10；关键安全偏差：□ 无观察到 □ 有（另记录）','Total this round: ____ / 10; critical safety deviations: □ None observed □ Present (record separately)')}</p><p>${bi('关键偏差/升级/复评记录：','Safety deviations / escalation / reassessment:')}</p><div class="writing-line"></div><p>${bi('下一轮改进一项：','One improvement for the next round:')}</p><div class="writing-line"></div><p class="learning-source-note">${bi('形成性核对单，未作测量学验证。评分反映本次模拟行为，不替代资质和本地操作授权。','Formative checklist, not psychometrically validated. Ratings describe this simulation and do not replace credentials or local authorization.')}</p><p class="learning-source-note">${bi('来源定位：','Source locator: ')}${bi(skill.locatorZh,skill.locatorEn)}</p><a class="button" href="trauma-skill.html?id=${skill.id}">${bi('回到技能课与原始来源','Return to skill lesson and sources')}</a></article>`).join('');
})();
