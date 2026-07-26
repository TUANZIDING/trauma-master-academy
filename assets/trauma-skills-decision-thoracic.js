(function () {
  const sources = window.TRAUMA_SKILL_SOURCES || (window.TRAUMA_SKILL_SOURCES = {});
  Object.assign(sources, {
    "S-NICE-NG39": {
      title: "NICE NG39 Major trauma: assessment and initial management",
      url: "https://www.nice.org.uk/guidance/ng39/chapter/Recommendations"
    },
    "S-WSES-AAST-THORACIC-2025": {
      title: "WSES-AAST Thoracic Trauma Guidelines 2025",
      url: "https://link.springer.com/article/10.1186/s13017-025-00651-1"
    },
    "S-AIUM-EFAST-2023": {
      title: "AIUM EFAST Practice Parameter (posted 2023)",
      url: "https://www.aium.org/resources/practice-parameters/efast"
    }
  });

  const skills = window.TRAUMA_SKILLS || [];
  const inject = (id, clinicalDecision) => {
    const skill = skills.find((item) => item.id === id);
    if (skill) skill.clinicalDecision = clinicalDecision;
  };

  inject("needle-decompression", {
    ui: {
      titleZh: "胸腔紧急减压：从张力性生理到持续复评",
      titleEn: "Emergency chest decompression: from tension physiology to serial reassessment",
      descriptionZh: "沿呼吸与循环同步恶化的功能路径学习；影像是辅助信息，不能替代床旁判断或本院授权。",
      descriptionEn: "Learn through coupled respiratory-circulatory deterioration; imaging is adjunctive and cannot replace bedside judgement or local authorisation.",
      signalAriaZh: "当前胸腔紧急减压决策的六项动态信号",
      signalAriaEn: "Six current dynamic signals for emergency chest decompression decision-making",
      metricLabelZh: "关键警报如何使用",
      metricLabelEn: "How to use key alerts"
    },
    guardrailZh: "紧急胸腔减压处理的是张力性生理，而不是一张片子或一个超声征象。先整合机制、单侧胸部表现、呼吸受损和循环趋势；只有疑似张力性气胸同时出现血流动力学不稳定或严重呼吸受损，才进入具备资质团队的即时减压路径。",
    guardrailEn: "Emergency chest decompression treats tension physiology, not an image or one ultrasound sign. Integrate mechanism, unilateral chest findings, respiratory compromise, and circulatory trend; only suspected tension pneumothorax with haemodynamic instability or severe respiratory compromise enters an immediate credentialed decompression pathway.",
    steps: [
      {
        id: "recognise", number: "01", image: "../assets/trauma-skills/realism/chest-assessment.png",
        titleZh: "识别胸膜腔威胁", titleEn: "Recognise a pleural-space threat",
        enterZh: "胸部撞击、穿透伤或正压通气背景下，出现进行性呼吸困难或单侧胸部异常。", enterEn: "After blunt/penetrating chest trauma or during positive-pressure ventilation, progressive breathing difficulty or unilateral chest abnormalities appear.",
        checkZh: "同时比较双侧胸廓、呼吸音、呼吸功、SpO₂信号质量、HR/BP/皮肤灌注和意识趋势，并保留血胸、肺挫伤、气道问题和失血性休克等替代解释。", checkEn: "Compare bilateral chest movement and breath sounds, work of breathing, SpO₂ signal quality, HR/BP, skin perfusion, and mental-status trends while retaining haemothorax, lung contusion, airway problems, and haemorrhagic shock as alternatives.",
        escalateZh: "若呼吸和循环同步恶化，立即请创伤负责人到场；不要等待某个经典晚期体征凑齐。", escalateEn: "If respiratory and circulatory status deteriorate together, obtain immediate trauma-lead review; do not wait for every classic late sign.",
        sourceIds: ["S-NICE-NG39", "S-WSES-AAST-THORACIC-2025"]
      },
      {
        id: "tension-physiology", number: "02", image: "../assets/illustrations/chest-trauma-mini-vivid.png",
        titleZh: "判断是否为紧急张力性生理", titleEn: "Decide whether tension physiology is an emergency",
        enterZh: "疑似张力性气胸，并有血流动力学不稳定或严重呼吸受损。", enterEn: "Tension pneumothorax is suspected with haemodynamic instability or severe respiratory compromise.",
        checkZh: "用床旁临床评估作决定；eFAST 可补充但不能独立确诊，阴性胸部 eFAST 也不能排除气胸。", checkEn: "Use bedside clinical assessment for the decision; eFAST may augment but cannot decide alone, and a negative chest eFAST does not exclude pneumothorax.",
        escalateZh: "进入本院授权的即时减压路径；具体开放胸廓造口或其他技术取决于场景、人员资质与本地协议，不由学生页指定。", escalateEn: "Enter the locally authorised immediate-decompression pathway; open thoracostomy or another technique depends on setting, credentials, and local protocol and is not prescribed by the learner page.",
        sourceIds: ["S-NICE-NG39"]
      },
      {
        id: "urgent-imaging", number: "03", image: "../assets/trauma-skills/realism/efast.png",
        titleZh: "稳定或复苏有反应：紧急影像与连续观察", titleEn: "Stable or responding: urgent imaging and serial observation",
        enterZh: "没有严重呼吸受损或血流动力学不稳定，或患者对初始复苏有反应。", enterEn: "Severe respiratory compromise and haemodynamic instability are absent, or the patient responds to initial resuscitation.",
        checkZh: "紧急获取并即时解释胸片、eFAST 或 CT；选择由稳定性、机制和资源决定，而不是用一次肺滑动或一张胸片自动触发侵入操作。", checkEn: "Obtain and immediately interpret urgent chest radiography, eFAST, or CT; selection follows stability, mechanism, and resources rather than using one lung-sliding view or radiograph to trigger an invasive procedure automatically.",
        escalateZh: "任何新发呼吸/循环恶化都应重新回到第 02 步，而不是被早期阴性结果安抚。", escalateEn: "Any new respiratory or circulatory deterioration returns the team to step 02 rather than being reassured by an early negative result.",
        sourceIds: ["S-NICE-NG39", "S-AIUM-EFAST-2023"]
      },
      {
        id: "response", number: "04", image: "../assets/illustrations/node-reassessment-vivid.png",
        titleZh: "验证反应、识别复发并衔接确定性管理", titleEn: "Verify response, detect recurrence, and connect definitive care",
        enterZh: "完成授权减压后，或观察中的患者出现新的趋势变化。", enterEn: "After authorised decompression, or when a monitored patient develops a new trend.",
        checkZh: "重新检查呼吸功、双侧胸廓和呼吸音、SpO₂、HR/BP、意识及胸膜腔信息；改善必须可重复且持续。", checkEn: "Recheck work of breathing, bilateral chest movement and sounds, SpO₂, HR/BP, mental status, and pleural information; improvement must be repeatable and sustained.",
        escalateZh: "未改善、再次恶化或出现复发线索时，复核诊断与技术效果并立即升级；即使改善，也需按授权路径衔接胸腔引流/确定性处理。", escalateEn: "If there is no improvement, renewed deterioration, or recurrence concern, recheck diagnosis and technical effect and escalate immediately; even after improvement, connect to authorised drainage/definitive pleural care.",
        sourceIds: ["S-NICE-NG39", "S-WSES-AAST-THORACIC-2025"]
      }
    ],
    metricNotes: [
      { value: "B + C", labelZh: "严重呼吸受损合并循环不稳", labelEn: "Severe respiratory compromise plus circulatory instability", noteZh: "这是进入紧急减压判断的功能性组合；不是由单个 SpO₂、血压或影像征象自动触发。", noteEn: "This functional combination drives the emergency-decompression decision; no single SpO₂, blood-pressure, or imaging sign triggers it automatically.", sourceId: "S-NICE-NG39" },
      { value: "影像前", labelZh: "危急生理不等待影像", labelEn: "Before imaging when physiology is critical", noteZh: "疑似张力性气胸伴血流动力学不稳定或严重呼吸受损时，NICE 建议在影像前减压；该表述不授权未受训人员操作。", noteEn: "For suspected tension pneumothorax with haemodynamic instability or severe respiratory compromise, NICE recommends decompression before imaging; this does not authorise an untrained operator.", sourceId: "S-NICE-NG39" },
      { value: "eFAST− ≠ 排除", labelZh: "阴性胸部 eFAST 警报", labelEn: "Negative chest eFAST alert", noteZh: "阴性结果不能排除气胸，必须继续结合床旁表现、趋势和其他影像。", noteEn: "A negative result does not exclude pneumothorax; continue integrating bedside findings, trends, and other imaging.", sourceId: "S-NICE-NG39" },
      { value: "每次复评", labelZh: "减压后观察复发", labelEn: "Check recurrence after decompression", noteZh: "一次改善不等于风险结束；NICE 明确要求观察张力性气胸复发征象。", noteEn: "One improvement does not end the risk; NICE explicitly requires observation for recurrent tension pneumothorax.", sourceId: "S-NICE-NG39" }
    ],
    signalLabels: [
      ["respiratory", "呼吸负荷", "Respiratory load"], ["laterality", "单侧胸部线索", "Unilateral chest cues"],
      ["circulation", "循环趋势", "Circulatory trend"], ["oxygenation", "氧合与信号质量", "Oxygenation and signal quality"],
      ["imaging", "床旁影像边界", "Bedside-imaging boundary"], ["response", "干预反应/复发", "Response / recurrence"]
    ],
    stageSignals: [
      {
        respiratory: ["RR 24，右胸痛", "RR 24 with right chest pain", "caution", "已在氧疗，需建立趋势基线", "On oxygen; establish a trend baseline"],
        laterality: ["右侧起伏/呼吸音减弱", "Reduced right movement/sounds", "caution", "单侧线索支持胸膜腔问题但不单独定性", "A unilateral cue supports a pleural problem but is not diagnostic alone"],
        circulation: ["BP 108/72，暂可维持", "BP 108/72, currently maintained", "neutral", "尚无单点不稳，继续连续比较", "No single-point instability yet; continue serial comparison"],
        oxygenation: ["SpO₂ 93%，需看趋势", "SpO₂ 93%; trend needed", "caution", "先确认探头与灌注，不以此单独触发操作", "Check probe and perfusion; do not trigger a procedure from this alone"],
        imaging: ["尚未获得", "Not yet obtained", "neutral", "缺失影像不等于阴性", "Unavailable imaging is not a negative result"],
        response: ["尚未进入减压路径", "Decompression pathway not entered", "neutral", "当前任务是识别和连续评估", "Current task is recognition and serial assessment"]
      },
      {
        respiratory: ["RR 30，呼吸功增加", "RR 30; work increased", "alert", "呼吸受损正在进展", "Respiratory compromise is progressing"],
        laterality: ["右侧差异更明显", "Right-sided difference clearer", "alert", "仍需与血胸、肺挫伤等比较", "Still compare with haemothorax, contusion, and alternatives"],
        circulation: ["HR 124，BP 96/64", "HR 124; BP 96/64", "caution", "出现循环恶化方向，但需看持续性与原因", "Circulation is worsening; assess persistence and cause"],
        oxygenation: ["SpO₂ 88%，下降", "SpO₂ 88%, falling", "alert", "是恶化警报，不是张力性气胸单项诊断", "A deterioration alert, not a stand-alone tension diagnosis"],
        imaging: ["右肺滑动未显示", "Right lung sliding not seen", "caution", "可能支持气胸，但不能单独决定侵入操作", "May support pneumothorax but cannot decide an invasive procedure alone"],
        response: ["需创伤负责人床旁整合", "Needs trauma-lead bedside integration", "caution", "同步准备授权路径和替代诊断资源", "Prepare the authorised pathway and resources for alternatives in parallel"]
      },
      {
        respiratory: ["严重呼吸受损", "Severe respiratory compromise", "alert", "呼吸与循环已同步恶化", "Respiration and circulation now deteriorate together"],
        laterality: ["持续右侧胸部异常", "Persistent right-sided abnormality", "alert", "与机制和趋势共同支持紧急假设", "Together with mechanism and trend, supports the emergency hypothesis"],
        circulation: ["HR 132，BP 84/56", "HR 132; BP 84/56", "alert", "血流动力学不稳定", "Haemodynamic instability"],
        oxygenation: ["SpO₂ 84%，持续下降", "SpO₂ 84%, continuing to fall", "alert", "立即处理患者，同时确认信号可靠性", "Treat immediately while checking signal reliability"],
        imaging: ["不因补做影像延误", "Do not delay for more imaging", "alert", "当前决策依赖临床张力性生理", "The present decision rests on clinical tension physiology"],
        response: ["进入本院授权减压路径", "Enter authorised local decompression pathway", "caution", "技术由具资质团队和本地协议决定", "Technique is selected by credentialed staff and local protocol"]
      },
      {
        respiratory: ["呼吸功下降", "Work of breathing reduced", "good", "改善需持续验证", "Improvement requires continuing verification"],
        laterality: ["双侧比较仍需重复", "Bilateral comparison still repeated", "caution", "查体改善不排除残余/复发", "Improved examination does not exclude residual or recurrent pathology"],
        circulation: ["HR 116，BP 102/68", "HR 116; BP 102/68", "good", "循环改善但未证明病因完全解决", "Circulation improves but does not prove full resolution"],
        oxygenation: ["SpO₂ 93%，回升", "SpO₂ 93%, rising", "good", "看持续性而非一个读数", "Assess persistence, not one reading"],
        imaging: ["确定性胸腔管理待衔接", "Definitive pleural care pending", "caution", "按稳定性和本地路径选择后续影像", "Choose subsequent imaging by stability and local pathway"],
        response: ["暂时有效，仍防复发", "Temporarily effective; recurrence remains", "caution", "未改善或再恶化需立即复核诊断/技术", "No improvement or renewed decline requires immediate diagnostic/technical review"]
      }
    ],
    reassessmentRows: [
      ["呼吸功", "Work of breathing", ["轻度增加", "明显增加", "严重受损", "下降但仍复评"], ["Mildly increased", "Clearly increased", "Severely compromised", "Reduced; reassessment continues"]],
      ["单侧胸部线索", "Unilateral chest cue", ["右侧减弱", "差异更明显", "持续异常", "需重复比较"], ["Reduced on right", "Difference clearer", "Persistent abnormality", "Repeat comparison needed"]],
      ["循环", "Circulation", ["暂可维持", "恶化方向", "不稳定", "改善但未结束"], ["Maintained", "Worsening", "Unstable", "Improved; not finished"]],
      ["影像角色", "Role of imaging", ["尚未获得", "辅助、不单独定性", "不得延误", "用于后续完整评估"], ["Unavailable", "Adjunct, not decisive", "Must not delay", "Supports subsequent complete evaluation"]],
      ["未解决问题", "Unresolved issue", ["病因与趋势", "替代诊断", "授权技术与并行复苏", "复发与确定性管理"], ["Cause and trend", "Alternatives", "Authorised technique and parallel resuscitation", "Recurrence and definitive care"]]
    ],
    branchQuestions: [
      {
        stageIndex: 1,
        promptZh: "肺滑动未显示且 SpO₂ 下降，此时最有依据的下一步是什么？", promptEn: "Lung sliding is not seen and SpO₂ is falling. What is the best-supported next step?",
        options: [
          ["integrate", "立即复核双侧胸部、呼吸功和循环趋势，请创伤负责人整合，并同步准备紧急路径", "Immediately recheck bilateral chest findings, work of breathing, and circulation; obtain trauma-lead integration while preparing the emergency pathway", "best-supported", "它把超声放回患者整体，并为进一步恶化预留时间。", "It returns ultrasound to the whole patient and prepares for deterioration."],
          ["ultrasound-only", "仅凭肺滑动未显示就宣布必须侵入性减压", "Declare mandatory invasive decompression solely because lung sliding is not seen", "unsafe", "该征象并非张力性生理的单独证明，也可能受图像质量或其他因素影响。", "The sign alone does not prove tension physiology and may reflect image quality or other causes."],
          ["wait", "等待气管偏移或颈静脉怒张全部出现再升级", "Wait until tracheal deviation and neck-vein distension both appear", "unsafe", "不能等待所有经典晚期体征；应使用呼吸与循环的动态组合。", "Do not wait for every classic late sign; use the dynamic respiratory-circulatory combination."]
        ]
      },
      {
        stageIndex: 3,
        promptZh: "授权减压后生命体征改善，团队接下来应如何做？", promptEn: "Physiology improves after authorised decompression. What should the team do next?",
        options: [
          ["reassess", "记录多信号反应，持续观察复发，并衔接胸腔引流/确定性胸膜腔管理", "Document the multi-signal response, monitor for recurrence, and connect drainage/definitive pleural care", "best-supported", "改善证明当前措施可能有效，但不证明风险已经结束。", "Improvement supports current effectiveness but does not prove the risk is over."],
          ["done", "SpO₂ 已回升，宣布问题解决并停止胸部复评", "SpO₂ has risen, so declare resolution and stop thoracic reassessment", "unsafe", "NICE 要求减压后观察复发，且单一氧合读数不能证明完全解决。", "NICE requires recurrence observation, and one oxygenation reading cannot prove resolution."],
          ["repeat", "不论患者反应如何，立刻重复相同侵入操作", "Repeat the same invasive action immediately regardless of response", "unsafe", "应先验证患者、诊断、技术效果和后续确定性路径。", "First verify the patient, diagnosis, technical effect, and definitive pathway."]
        ]
      }
    ]
  });

  inject("tube-thoracostomy", {
    ui: {
      titleZh: "胸腔引流：患者与系统的双重复评",
      titleEn: "Tube thoracostomy: dual reassessment of patient and system",
      descriptionZh: "先按稳定性和生理影响判断观察或引流；置管后同时追踪患者、管路、漏气、引流和残留风险。",
      descriptionEn: "Use stability and physiological effect to decide observation or drainage, then track the patient, tubing, air leak, output, and retained risk together.",
      signalAriaZh: "当前胸腔引流病例的六项患者与系统信号",
      signalAriaEn: "Six current patient-and-system signals for the chest-drain case",
      metricLabelZh: "分层数值与升级警报",
      metricLabelEn: "Scoped values and escalation alerts"
    },
    guardrailZh: "胸腔引流的决策来自胸膜腔空气/血液造成的生理影响、患者稳定性、正压通气计划和连续影像，而不是由‘看到气胸/血胸’自动触发。置管后必须同时复评患者和系统。",
    guardrailEn: "Chest-drain decisions arise from the physiological effect of pleural air/blood, stability, planned positive-pressure ventilation, and serial imaging—not automatically from seeing pneumothorax or haemothorax. After placement, reassess both patient and system.",
    steps: [
      {
        id: "define-problem", number: "01", image: "../assets/trauma-skills/realism/chest-assessment.png",
        titleZh: "定义胸膜腔问题与生理影响", titleEn: "Define the pleural problem and physiological effect",
        enterZh: "机制、查体或影像提示气胸、血胸或血气胸。", enterEn: "Mechanism, examination, or imaging suggests pneumothorax, haemothorax, or haemopneumothorax.",
        checkZh: "整合呼吸功、双侧胸廓/呼吸音、SpO₂、HR/BP/灌注、影像范围和病情方向。", checkEn: "Integrate work of breathing, bilateral chest movement/sounds, SpO₂, HR/BP/perfusion, imaging extent, and trajectory.",
        escalateZh: "疑似张力性气胸伴不稳定或严重呼吸受损时转入紧急减压路径，不能为等待常规置管准备而延误。", escalateEn: "Suspected tension pneumothorax with instability or severe respiratory compromise moves to emergency decompression without delay for routine drain preparation.",
        sourceIds: ["S-NICE-NG39", "S-WSES-AAST-THORACIC-2025"]
      },
      {
        id: "observe-or-drain", number: "02", image: "../assets/trauma-skills/realism/efast.png",
        titleZh: "观察还是引流：稳定性优先", titleEn: "Observe or drain: stability first",
        enterZh: "患者无立即张力性生理，可进行分层决策。", enterEn: "There is no immediate tension physiology and stratification is possible.",
        checkZh: "结合稳定性、呼吸/循环受损、正压通气需求、气胸大小或血胸估计量、症状和连续影像；数值只限定指南中的特定人群。", checkEn: "Combine stability, respiratory/circulatory impairment, need for positive-pressure ventilation, pneumothorax size or estimated haemothorax volume, symptoms, and serial imaging; numbers apply only to their stated guideline population.",
        escalateZh: "不稳定血胸、呼吸/循环受损或需正压通气的相关气胸需立即专科/创伤团队决策；稳定小病灶可按本地协议观察。", escalateEn: "Unstable haemothorax, respiratory/circulatory impairment, or relevant pneumothorax with positive-pressure ventilation requires immediate specialty/trauma-team decision; stable small injuries may be observed under local policy.",
        sourceIds: ["S-WSES-AAST-THORACIC-2025", "S-NICE-NG39"]
      },
      {
        id: "authorised-drain", number: "03", image: "../assets/trauma-skills/realism/tube-thoracostomy.png",
        titleZh: "授权技能站：准备、置管与连接", titleEn: "Authorised station: prepare, place, and connect",
        enterZh: "团队已确认适应场景、操作者资质、监护、镇痛/无菌和后续接收能力。", enterEn: "The team has confirmed the indication, operator credentialing, monitoring, analgesia/asepsis, and downstream capability.",
        checkZh: "使用本院清单核对患者、侧别、目标、器材、连接和影像/临床确认计划；公开页不提供可脱离监督复制的技术步骤。", checkEn: "Use the local checklist for patient, side, goal, equipment, connection, and clinical/imaging confirmation; the public page does not provide a reproducible unsupervised technique sequence.",
        escalateZh: "任何侧别、目标、授权或设备不清都应暂停；危急恶化时由负责人转换到救命路径。", escalateEn: "Pause for any uncertainty about side, goal, authorisation, or equipment; if critical deterioration occurs, the lead transitions to the life-saving pathway.",
        sourceIds: ["S-NICE-NG39", "S-WSES-AAST-THORACIC-2025"]
      },
      {
        id: "patient-system-check", number: "04", image: "../assets/illustrations/node-reassessment-vivid.png",
        titleZh: "置管后：先看患者，再看系统", titleEn: "After placement: patient first, then system",
        enterZh: "置管完成、患者短暂改善，或再次出现气促/低灌注。", enterEn: "Placement is complete, the patient briefly improves, or dyspnoea/hypoperfusion recurs.",
        checkZh: "重做 A/B/C，检查管路连接、折叠/阻塞、固定、漏气、引流趋势及可用床旁影像；外观波动或气泡不能脱离患者解释。", checkEn: "Repeat A/B/C; check connections, kinking/obstruction, fixation, air leak, output trend, and available bedside imaging; chamber movement or bubbling cannot be interpreted apart from the patient.",
        escalateZh: "未改善或再恶化时，先处理患者并呼叫高级帮助，同时检查系统和其他胸部/全身病因；不得盲目重复侵入操作。", escalateEn: "If there is no improvement or renewed deterioration, treat the patient and call senior help while checking the system and other thoracic/systemic causes; do not blindly repeat an invasive procedure.",
        sourceIds: ["S-WSES-AAST-THORACIC-2025", "S-NICE-NG39"]
      },
      {
        id: "ongoing-risk", number: "05", image: "../assets/illustrations/node-resources-vivid.png",
        titleZh: "识别持续出血、漏气与残留问题", titleEn: "Recognise ongoing bleeding, air leak, and retained problems",
        enterZh: "引流量持续增加、持续漏气、肺未复张、残留血胸或循环不稳。", enterEn: "Output continues to rise, air leak persists, the lung does not re-expand, retained haemothorax remains, or circulation is unstable.",
        checkZh: "用累计量和单位时间趋势配合血流动力学、输血需求、影像和其他出血源；胸管输出量本身可能误导。", checkEn: "Combine cumulative and time-based output with haemodynamics, transfusion requirement, imaging, and other bleeding sources; chest-tube output alone can mislead.",
        escalateZh: "达到指南警报或患者不稳时立即升级胸外科/介入/手术团队；具体路径由本院资源和负责人决定。", escalateEn: "Escalate immediately to thoracic, interventional, or operative teams when guideline alerts or instability are present; the local lead and resources determine the pathway.",
        sourceIds: ["S-WSES-AAST-THORACIC-2025"]
      }
    ],
    metricNotes: [
      { value: "≤2 cm / ≥24 h", labelZh: "稳定小气胸的观察范围", labelEn: "Observation scope for a small stable pneumothorax", noteZh: "WSES-AAST：稳定患者的小气胸（≤2 cm）可保守观察至少24小时；证据等级低，不能用于不稳定、症状进展或正压通气患者的自动豁免。", noteEn: "WSES-AAST: a small pneumothorax (≤2 cm) in a stable patient may be observed for at least 24 h; evidence is low and does not automatically exempt unstable, worsening, or positive-pressure-ventilated patients.", sourceId: "S-WSES-AAST-THORACIC-2025" },
      { value: "<300 / ≥500 mL", labelZh: "稳定血胸的有限分层值", labelEn: "Scoped volume markers for stable haemothorax", noteZh: "WSES-AAST：稳定患者 <300 mL 可观察，≥500 mL 建议引流；均为低等级证据和估算值，必须结合生理、图像质量与趋势。", noteEn: "WSES-AAST: <300 mL may be observed and ≥500 mL should be drained in stable patients; both are low-evidence estimates requiring physiology, image quality, and trend.", sourceId: "S-WSES-AAST-THORACIC-2025" },
      { value: "不稳定 = 不看尺寸", labelZh: "不稳定创伤性血胸警报", labelEn: "Unstable traumatic haemothorax alert", noteZh: "WSES-AAST 建议不稳定创伤患者的血胸无论估计大小均应引流；仍需并行复苏和寻找其他出血源。", noteEn: "WSES-AAST recommends drainage of haemothorax in unstable trauma regardless of estimated size, while resuscitation and search for other bleeding sources continue.", sourceId: "S-WSES-AAST-THORACIC-2025" },
      { value: ">1500/24 h 或 >200/h×3", labelZh: "持续胸腔出血升级警报", labelEn: "Ongoing intrathoracic-bleeding escalation alert", noteZh: "WSES-AAST 的手术评估警报；证据等级低，且原文提醒胸管输出量本身可能误导，必须结合不稳定、其他出血源及临床监测。", noteEn: "A WSES-AAST operative-review alert with low-level evidence; the guideline warns that output alone can mislead and must be combined with instability, other bleeding sources, and close monitoring.", sourceId: "S-WSES-AAST-THORACIC-2025" }
    ],
    signalLabels: [
      ["patient", "患者呼吸表现", "Patient respiratory state"], ["circulation", "循环与灌注", "Circulation and perfusion"],
      ["pleural", "胸膜腔信息", "Pleural-space information"], ["system", "引流系统", "Drain system"],
      ["output", "漏气/引流趋势", "Air-leak/output trend"], ["nextRisk", "下一风险与升级", "Next risk and escalation"]
    ],
    stageSignals: [
      {
        patient: ["RR 26，左胸痛", "RR 26 with left chest pain", "caution", "初步处理后仅短暂改善", "Only brief improvement after initial care"],
        circulation: ["HR 118，BP 104/70", "HR 118; BP 104/70", "caution", "需判断稳定性是否可维持", "Determine whether stability is sustainable"],
        pleural: ["较大左气胸 + 少量液体", "Larger left pneumothorax + small fluid component", "alert", "影像需与正压通气计划和生理影响整合", "Integrate imaging with planned positive pressure and physiological effect"],
        system: ["尚未置管", "No drain yet", "neutral", "先明确目标、侧别、人员和设备", "First confirm goal, side, people, and equipment"],
        output: ["无数据", "No data", "neutral", "缺失不等于零", "Unavailable is not zero"],
        nextRisk: ["正压通气可能改变风险", "Positive pressure may change risk", "caution", "立即由创伤/气道团队共同规划", "Requires immediate joint trauma-airway planning"]
      },
      {
        patient: ["RR 26，SpO₂ 90%", "RR 26; SpO₂ 90%", "caution", "不能仅凭氧合数字判断装置成功", "Oxygenation alone cannot judge device success"],
        circulation: ["HR 120，BP 102/68", "HR 120; BP 102/68", "caution", "监护与复苏继续并行", "Monitoring and resuscitation continue in parallel"],
        pleural: ["已确认需授权引流", "Authorised drainage agreed", "caution", "适应场景由团队综合确认", "The team confirms the indication from combined evidence"],
        system: ["角色/无菌/连接已核对", "Roles/asepsis/connection checked", "good", "使用本院清单，不由网页替代", "Use the local checklist; the webpage does not replace it"],
        output: ["建立基线", "Baseline being established", "neutral", "记录时间、初始表现与后续比较点", "Record time, initial state, and comparison points"],
        nextRisk: ["置管并发症与未改善", "Placement complication or no improvement", "caution", "预先共享失败和升级计划", "Share failure and escalation plans in advance"]
      },
      {
        patient: ["再次气促，RR 29", "Dyspnoea recurs; RR 29", "alert", "先重新评估患者，不先盯装置", "Reassess the patient before focusing on the device"],
        circulation: ["HR 126，BP 98/64", "HR 126; BP 98/64", "caution", "方向恶化，需复核其他病因", "Worsening direction; reassess other causes"],
        pleural: ["残余/复发问题待判断", "Residual/recurrent problem uncertain", "caution", "床旁影像可辅助但不取代查体", "Bedside imaging augments but does not replace examination"],
        system: ["波形异常，连接待核查", "Abnormal chamber movement; connection needs checking", "alert", "检查连接、折叠、阻塞、固定", "Check connection, kinking, obstruction, and fixation"],
        output: ["不能仅凭气泡定性", "Bubbling alone is not diagnostic", "caution", "与患者、通气模式和连续趋势整合", "Integrate with patient, ventilation mode, and serial trend"],
        nextRisk: ["患者或系统或新病因", "Patient, system, or new cause", "alert", "呼叫高级帮助并行排查，避免盲目再操作", "Call senior help and investigate in parallel; avoid blind repeat action"]
      },
      {
        patient: ["RR 22，SpO₂ 95%", "RR 22; SpO₂ 95%", "good", "连接纠正后改善，但需持续观察", "Improves after connection correction; continue observation"],
        circulation: ["灌注暂稳定", "Perfusion currently stable", "good", "趋势仍需交接", "Trend still requires handoff"],
        pleural: ["需后续影像/临床确认", "Follow-up clinical/imaging confirmation needed", "caution", "改善不证明胸膜腔问题完全解决", "Improvement does not prove complete pleural resolution"],
        system: ["连接恢复，固定待持续检查", "Connection restored; fixation remains monitored", "good", "系统和患者均需交接", "Handoff must cover both system and patient"],
        output: ["漏气/引流趋势继续记录", "Continue air-leak/output trend", "caution", "单次值不替代累计和单位时间趋势", "One value does not replace cumulative and time-based trends"],
        nextRisk: ["持续漏气/残留血胸/再恶化", "Persistent leak/retained blood/renewed decline", "caution", "明确胸外科和升级触发点", "State thoracic and escalation triggers"]
      }
    ],
    reassessmentRows: [
      ["呼吸/氧合", "Respiration/oxygenation", ["气促，91%", "技能站前90%", "再气促，89%", "纠正后95%"], ["Dyspnoea, 91%", "90% before station", "Recurrent dyspnoea, 89%", "95% after correction"]],
      ["循环", "Circulation", ["需判定稳定性", "持续监测", "方向恶化", "暂稳定"], ["Stability to determine", "Monitoring continues", "Worsening direction", "Currently stable"]],
      ["胸膜腔问题", "Pleural problem", ["气胸伴少量液体", "目标已共享", "残余/复发待判", "仍需确认"], ["Pneumothorax + small fluid", "Goal shared", "Residual/recurrence uncertain", "Confirmation remains"]],
      ["系统", "System", ["未建立", "完成核对", "连接异常", "连接纠正"], ["Not established", "Checks completed", "Connection abnormal", "Connection corrected"]],
      ["未解决问题", "Unresolved issue", ["PPV与引流决策", "并发症/失败计划", "患者还是系统", "漏气、输出、残留与升级"], ["PPV and drainage decision", "Complication/failure plan", "Patient or system", "Leak, output, retained problem, escalation"]]
    ],
    branchQuestions: [
      {
        stageIndex: 0,
        promptZh: "影像显示较大气胸并拟正压通气，最合理的教学决策是什么？", promptEn: "Imaging shows a larger pneumothorax and positive-pressure ventilation is planned. What is the best teaching decision?",
        options: [
          ["team", "由创伤与气道团队整合稳定性、呼吸/循环受损、影像和正压通气计划，立即决定授权胸腔管理", "Have trauma and airway teams integrate stability, respiratory/circulatory impairment, imaging, and the positive-pressure plan and decide authorised pleural management now", "best-supported", "它把影像放在即将改变胸腔压力的临床情境中。", "It places imaging within the clinical context that may change pleural pressure."],
          ["image-only", "仅凭‘较大’两个字自动选择固定规格胸管", "Automatically select one fixed tube size solely from the word ‘larger’", "unsafe", "器械与技术依患者、目标和本地协议；影像标签不能替代团队决策。", "Device and technique depend on patient, goal, and local protocol; an imaging label does not replace team judgement."],
          ["ignore", "因为血压尚可而忽略正压通气带来的风险变化", "Ignore the risk change from positive pressure because blood pressure is currently maintained", "incomplete", "当前稳定不保证正压通气后仍稳定。", "Current stability does not guarantee stability after positive pressure."]
        ]
      },
      {
        stageIndex: 2,
        promptZh: "置管后患者再次气促且系统波形异常，下一步是什么？", promptEn: "Dyspnoea recurs after drain placement and the system waveform appears abnormal. What next?",
        options: [
          ["patient-first", "重做 A/B/C；呼叫高级帮助；同步核查连接、管路、固定和床旁影像，并寻找其他病因", "Repeat A/B/C, call senior help, and simultaneously check connections, tubing, fixation, bedside imaging, and other causes", "best-supported", "患者优先，同时检查系统和新病因，避免任务固着。", "It prioritises the patient while checking system and new causes, avoiding fixation."],
          ["repeat-invasive", "不检查患者和系统，直接重复侵入操作", "Repeat an invasive procedure without checking the patient or system", "unsafe", "可能遗漏连接、阻塞、错误诊断或其他胸部威胁。", "This may miss disconnection, obstruction, wrong diagnosis, or another thoracic threat."],
          ["watch-bubbles", "只观察水封气泡，等它自行恢复", "Watch only chamber bubbling and wait for spontaneous recovery", "unsafe", "装置外观不能替代患者的呼吸和循环复评。", "Device appearance cannot replace respiratory and circulatory reassessment."]
        ]
      },
      {
        stageIndex: 3,
        promptZh: "连接纠正后症状改善，交接必须包括什么？", promptEn: "Symptoms improve after correcting the connection. What must handoff include?",
        options: [
          ["handoff", "患者趋势、系统问题与纠正时间、漏气/输出、残留问题、再恶化触发点和接收责任", "Patient trend, system problem and correction time, leak/output, residual issues, deterioration triggers, and receiving responsibility", "best-supported", "它保留患者和系统两条安全线。", "It preserves both patient and system safety lines."],
          ["spo2", "只报告 SpO₂ 95% 和‘已解决’", "Report only SpO₂ 95% and ‘resolved’", "unsafe", "单一数字会隐藏系统故障、复发和持续胸膜腔风险。", "One number hides system failure, recurrence, and ongoing pleural risk."],
          ["output-only", "只报告一次引流量", "Report one output value only", "incomplete", "需要累计量、单位时间趋势、循环、其他出血源和影像。", "Cumulative/time-based trend, circulation, other bleeding sources, and imaging are also needed."]
        ]
      }
    ]
  });

  inject("efast", {
    ui: {
      titleZh: "EFAST：把床旁图像放回临床问题",
      titleEn: "EFAST: return bedside images to the clinical question",
      descriptionZh: "逐步训练问题定义、窗口质量、阳性/阴性/受限报告，以及依据稳定性选择复扫、即时路径或完整影像。",
      descriptionEn: "Practise question definition, window quality, positive/negative/limited reporting, and stability-based selection of rescan, immediate care, or complete imaging.",
      signalAriaZh: "当前EFAST病例的六项图像质量与临床整合信号",
      signalAriaEn: "Six current image-quality and clinical-integration signals for the EFAST case",
      metricLabelZh: "结果边界与路径警报",
      metricLabelEn: "Result boundaries and pathway alerts"
    },
    guardrailZh: "EFAST 是床旁聚焦信息节点：先写临床问题，再获取可解释图像，并把阳性、阴性或受限结果放回机制和生理趋势。它既不是‘阴性即排除’，也不是‘阳性即自动操作’。",
    guardrailEn: "EFAST is a focused bedside information node: define the clinical question, acquire interpretable images, and return positive, negative, or limited results to mechanism and physiological trend. It is neither ‘negative equals excluded’ nor ‘positive equals automatic procedure’.",
    steps: [
      {
        id: "question", number: "01", image: "../assets/trauma-skills/realism/chest-assessment.png",
        titleZh: "先确定临床问题与稳定性", titleEn: "First define the clinical question and stability",
        enterZh: "创伤初评需要快速了解心包、胸膜腔或腹腔聚焦问题。", enterEn: "Trauma primary assessment needs rapid focused information about pericardial, pleural, or peritoneal spaces.",
        checkZh: "明确要回答‘是否有可见游离液体/心包液/气胸征象’，同时记录机制、查体、HR/BP/灌注、呼吸和对复苏反应。", checkEn: "State whether the question is visible free fluid, pericardial fluid, or pneumothorax signs, while recording mechanism, examination, HR/BP/perfusion, respiration, and response to resuscitation.",
        escalateZh: "不稳定且不回应复苏者只做指导即时干预所需的最少影像；检查不得延误救命处置。", escalateEn: "In an unstable non-responder, limit imaging to the minimum needed to direct immediate intervention; scanning must not delay life-saving care.",
        sourceIds: ["S-NICE-NG39", "S-AIUM-EFAST-2023"]
      },
      {
        id: "acquire", number: "02", image: "../assets/trauma-skills/realism/efast.png",
        titleZh: "获取完整、可解释的标准窗口", titleEn: "Acquire complete, interpretable standard windows",
        enterZh: "设备、受训操作者和时间条件允许，且不会延误转运或即时处置。", enterEn: "Equipment, a trained operator, and time are available without delaying transfer or immediate care.",
        checkZh: "按 AIUM 参数记录检查窗口、图像质量、可见结构和技术局限；保存代表性图像/动态图像并标记侧别。", checkEn: "Following the AIUM parameter, document windows, image quality, structures seen, and technical limitations; retain representative still/cine images and label laterality.",
        escalateZh: "任何关键窗口不可判读都应明确写‘受限/不可判读’，重新优化、请更有经验者或转入其他影像，而不是写成阴性。", escalateEn: "Any critical nondiagnostic window must be labelled limited/indeterminate and optimised, reviewed by a more experienced operator, or followed by other imaging—not called negative.",
        sourceIds: ["S-AIUM-EFAST-2023"]
      },
      {
        id: "classify", number: "03", image: "../assets/illustrations/node-efast-vivid.png",
        titleZh: "分类报告：阳性、阴性或受限", titleEn: "Classify the report: positive, negative, or limited",
        enterZh: "窗口已逐一查看并完成质量判断。", enterEn: "Each window has been reviewed and its quality judged.",
        checkZh: "只报告本次可见事实、位置、图像质量和局限；避免把液性暗区直接命名为出血，也避免把‘未见’写成排除损伤。", checkEn: "Report only visible facts, location, image quality, and limitations; do not label every anechoic area as bleeding or translate ‘not seen’ into injury excluded.",
        escalateZh: "阳性结果需与稳定性、机制和查体整合；阴性或受限但生理异常者继续寻找腹膜后、骨盆、胸腔、长骨或其他来源。", escalateEn: "Integrate a positive result with stability, mechanism, and examination; after a negative or limited study with abnormal physiology, continue searching retroperitoneal, pelvic, thoracic, long-bone, and other sources.",
        sourceIds: ["S-AIUM-EFAST-2023", "S-NICE-NG39"]
      },
      {
        id: "pathway", number: "04", image: "../assets/illustrations/node-resources-vivid.png",
        titleZh: "把结果放回复苏与完整影像路径", titleEn: "Return the result to resuscitation and complete imaging",
        enterZh: "已有 EFAST 结果，但诊断和处置仍需团队整合。", enterEn: "An EFAST result is available, but diagnosis and management still require team integration.",
        checkZh: "不稳定非响应者用最少影像指导即时路径；稳定或对复苏有反应者进入紧急 CT/完整影像；FAST 不作为是否做 CT 的单独筛查门。", checkEn: "Use minimum imaging to direct immediate care in an unstable non-responder; stable patients or responders proceed to urgent CT/complete imaging; FAST is not a stand-alone gate for CT.",
        escalateZh: "任何生理恶化、新症状、原受限窗口或干预后变化都触发床旁重评、重复扫查或升级影像。", escalateEn: "Physiological deterioration, new symptoms, a previously limited window, or post-intervention change triggers bedside reassessment, repeat scanning, or escalated imaging.",
        sourceIds: ["S-NICE-NG39"]
      },
      {
        id: "handoff", number: "05", image: "../assets/illustrations/node-reassessment-vivid.png",
        titleZh: "动态复扫与结构化交接", titleEn: "Serial rescan and structured handoff",
        enterZh: "患者状态或临床问题发生变化，或需要转运/交接。", enterEn: "Patient state or the clinical question changes, or transfer/handoff is required.",
        checkZh: "报告时间、适应问题、已完成窗口、质量、阳性/阴性/受限发现、与前次变化及仍不能回答的问题。", checkEn: "Report time, indication/question, windows completed, quality, positive/negative/limited findings, change from prior examination, and unanswered questions.",
        escalateZh: "若检查结果与患者生理不一致，以患者为先并升级团队；不要重复扫描同一窗口而忽略全身复评。", escalateEn: "If the examination conflicts with physiology, prioritise the patient and escalate the team; do not repeatedly scan one window while neglecting whole-patient reassessment.",
        sourceIds: ["S-AIUM-EFAST-2023", "S-NICE-NG39"]
      }
    ],
    metricNotes: [
      { value: "3类", labelZh: "阳性 / 阴性 / 受限", labelEn: "Positive / negative / limited", noteZh: "图像质量不足必须单列为受限或不可判读，不能并入阴性。AIUM 参数要求记录完整性和局限。", noteEn: "Inadequate image quality must be labelled limited/indeterminate, not grouped with negative. The AIUM parameter requires documentation of completeness and limitations.", sourceId: "S-AIUM-EFAST-2023" },
      { value: "胸部 eFAST− ≠ 排除气胸", labelZh: "胸部阴性结果边界", labelEn: "Boundary of a negative chest result", noteZh: "NICE 明确阴性胸部 eFAST 不能排除气胸；临床恶化时仍需复评和其他影像/处置路径。", noteEn: "NICE states that a negative chest eFAST does not exclude pneumothorax; deterioration still requires reassessment and other imaging/management pathways.", sourceId: "S-NICE-NG39" },
      { value: "FAST− ≠ 排除出血", labelZh: "腹腔/腹膜后阴性边界", labelEn: "Intraperitoneal/retroperitoneal negative boundary", noteZh: "阴性 FAST 不能排除腹腔内或腹膜后出血，也不能排除无足量游离液体的脏器/肠管损伤。", noteEn: "A negative FAST does not exclude intraperitoneal or retroperitoneal haemorrhage or injuries without enough free fluid to visualise.", sourceId: "S-NICE-NG39" },
      { value: "FAST ≠ CT筛查门", labelZh: "不能单独决定是否 CT", labelEn: "Not a stand-alone CT gate", noteZh: "NICE 不建议用 FAST 作为决定重大创伤患者是否 CT 的筛查方式；稳定或复苏有反应者仍走紧急 CT 路径。", noteEn: "NICE advises against using FAST to screen major-trauma patients for CT; stable patients or responders still proceed along an urgent CT pathway.", sourceId: "S-NICE-NG39" }
    ],
    signalLabels: [
      ["question", "本次临床问题", "Clinical question"], ["physiology", "生理与灌注趋势", "Physiology and perfusion trend"],
      ["windows", "窗口完整性", "Window completeness"], ["quality", "图像质量", "Image quality"],
      ["finding", "可见发现", "Visible finding"], ["boundary", "不能回答/下一步", "Unanswered / next step"]
    ],
    stageSignals: [
      {
        question: ["是否有可见胸腹盆腔游离液体", "Is visible thoracoabdominopelvic free fluid present?", "neutral", "先写问题，避免无目的扫查", "Define the question before scanning"],
        physiology: ["HR 108，BP 112/74", "HR 108; BP 112/74", "caution", "当前可维持但需建立趋势", "Currently maintained; establish a trend"],
        windows: ["腹部窗口已扫", "Abdominal windows obtained", "caution", "胸部/心包范围须按本次协议说明", "State whether thoracic/pericardial components were included"],
        quality: ["一窗受肠气限制", "One window limited by bowel gas", "caution", "受限不能写成阴性", "Limited cannot be called negative"],
        finding: ["未见明确游离液", "No definite free fluid seen", "neutral", "只描述本次可见事实", "Describe only what is visible this time"],
        boundary: ["不能排除隐匿/腹膜后损伤", "Occult/retroperitoneal injury not excluded", "caution", "继续结合机制和完整评估", "Continue mechanism-based complete assessment"]
      },
      {
        question: ["结构化报告和质量边界", "Structured report and quality boundary", "neutral", "报告需要回答检查做了什么", "The report must state what was examined"],
        physiology: ["HR 110，BP 108/70", "HR 110; BP 108/70", "caution", "轻微变化需要连续比较", "Small change requires serial comparison"],
        windows: ["4窗中1窗受限", "1 of 4 windows limited", "caution", "逐窗记录而非笼统写阴性", "Document each window rather than a blanket negative"],
        quality: ["受限/不可判读", "Limited/indeterminate", "caution", "明确局限原因和补救计划", "State the reason and remediation plan"],
        finding: ["‘本次未见’", "‘Not seen on this exam’", "neutral", "不翻译为‘已排除出血’", "Do not translate into ‘bleeding excluded’"],
        boundary: ["12分钟后复评", "Reassess at 12 minutes", "caution", "时间点由病情变化触发，不是固定课程阈值", "Timing is triggered by clinical change, not a universal course threshold"]
      },
      {
        question: ["生理恶化的出血来源", "Source of bleeding with worsening physiology", "alert", "临床问题已经改变", "The clinical question has changed"],
        physiology: ["HR 122，BP 94/62，皮肤凉", "HR 122; BP 94/62; cool skin", "alert", "低灌注方向增加", "Hypoperfusion is worsening"],
        windows: ["需复扫并扩大信息来源", "Rescan and broaden information sources", "caution", "不能只重复一个方便窗口", "Do not repeat only one convenient window"],
        quality: ["原受限窗仍需解决", "Previously limited window remains unresolved", "caution", "优化、升级操作者或其他影像", "Optimise, escalate operator, or use other imaging"],
        finding: ["RUQ出现少量新液性暗区", "Small new RUQ fluid-like area", "alert", "描述位置与变化，不单独命名病因", "Describe location and change; do not name the cause from this alone"],
        boundary: ["阳性不能自动决定手术", "Positive does not automatically decide operation", "caution", "由稳定性、复苏反应和完整伤情决定路径", "Stability, response, and complete injury pattern determine the pathway"]
      },
      {
        question: ["进一步出血评估与控制路径", "Further bleeding evaluation and control pathway", "alert", "结果必须回到临床决策", "The result must return to clinical decision-making"],
        physiology: ["HR 124，BP 92/60", "HR 124; BP 92/60", "alert", "持续异常，不能被一次图像解释完", "Persistent abnormality cannot be explained by one image"],
        windows: ["已记录完成/受限窗口", "Complete/limited windows documented", "good", "便于下一团队知道信息缺口", "Allows the next team to see information gaps"],
        quality: ["变化可比较", "Change is comparable", "good", "保存代表性图像和时间", "Retain representative images and time"],
        finding: ["分支A新液体；分支B仍阴性", "Branch A new fluid; branch B remains negative", "caution", "两支都需按生理状态继续评估", "Both branches continue according to physiology"],
        boundary: ["腹膜后/骨盆/其他来源仍开放", "Retroperitoneal/pelvic/other sources remain open", "alert", "稳定/响应者进入CT；不稳非响应者用最少影像导向即时路径", "Stable/responders proceed to CT; unstable non-responders use minimum imaging to direct immediate care"]
      }
    ],
    reassessmentRows: [
      ["临床问题", "Clinical question", ["是否有可见游离液", "准确报告什么", "恶化来自哪里", "下一评估/控制路径"], ["Visible free fluid?", "What can be reported accurately?", "What explains deterioration?", "Next evaluation/control pathway"]],
      ["生理", "Physiology", ["暂可维持", "轻微变化", "低灌注恶化", "持续异常"], ["Maintained", "Small change", "Hypoperfusion worsens", "Persistent abnormality"]],
      ["图像质量", "Image quality", ["一窗受限", "明确不可判读", "重新优化/补充", "完成与局限已交接"], ["One window limited", "Indeterminate stated", "Optimised/supplemented", "Completeness and limits handed off"]],
      ["发现", "Finding", ["未见明确游离液", "不能写排除", "少量新暗区", "阳性/仍阴性两分支"], ["No definite free fluid", "Cannot call excluded", "Small new dark area", "Positive/still-negative branches"]],
      ["未解决问题", "Unresolved issue", ["腹膜后等盲区", "受限窗口", "病因与处置", "CT/即时路径及其他来源"], ["Retroperitoneal and other blind spots", "Limited window", "Cause and management", "CT/immediate pathway and other sources"]]
    ],
    branchQuestions: [
      {
        stageIndex: 1,
        promptZh: "四个腹部窗口未见明确液体，但一个窗口受限，最佳报告是哪一句？", promptEn: "No definite fluid is seen in four abdominal windows, but one is limited. Which report is best?",
        options: [
          ["accurate", "本次 EFAST 腹部评估未见明确游离液；其中一窗受肠气限制，不能排除腹腔内、腹膜后或其他损伤", "No definite free fluid is seen on this abdominal EFAST assessment; one window is limited by bowel gas, and intraperitoneal, retroperitoneal, or other injury is not excluded", "best-supported", "它区分了可见事实、检查质量和不能回答的问题。", "It separates visible fact, examination quality, and unanswered questions."],
          ["negative", "EFAST 阴性，已排除内出血", "EFAST negative; internal bleeding excluded", "unsafe", "NICE 明确阴性 FAST 不能排除腹腔内或腹膜后出血。", "NICE states that negative FAST does not exclude intraperitoneal or retroperitoneal bleeding."],
          ["positive", "只要窗口受限就按 FAST 阳性处理", "Treat any limited window as FAST positive", "unsafe", "受限既不是阴性也不是阳性，需要补救图像或其他评估。", "Limited is neither negative nor positive and needs remediation or another assessment."]
        ]
      },
      {
        stageIndex: 2,
        promptZh: "复扫出现少量新液性暗区且灌注恶化，最合理的团队表述是什么？", promptEn: "Repeat scanning shows a small new fluid-like area while perfusion worsens. What is the best team statement?",
        options: [
          ["integrate", "报告新发现和生理恶化，立即由创伤团队按稳定性与复苏反应决定最少影像即时路径或完整CT/止血路径", "Report the new finding and physiological deterioration and have the trauma team use stability and response to choose minimum-imaging immediate care or complete CT/haemorrhage-control pathway", "best-supported", "阳性信息会改变风险，但不单独决定某一种侵入操作。", "The positive information changes risk but does not choose one invasive procedure by itself."],
          ["operate", "一见液性暗区就自动宣布手术", "Automatically declare surgery when any fluid-like area appears", "unsafe", "处置取决于生理、机制、复苏反应和完整伤情。", "Management depends on physiology, mechanism, response, and complete injury pattern."],
          ["ignore", "因首次检查阴性而忽略复扫变化", "Ignore the rescan change because the first examination was negative", "unsafe", "EFAST 是动态信息节点，趋势变化必须进入新的复评循环。", "EFAST is a dynamic information node; a changed trend starts a new reassessment loop."]
        ]
      },
      {
        stageIndex: 3,
        promptZh: "若另一分支重复 FAST 始终阴性但低灌注持续，下一步是什么？", promptEn: "In an alternate branch, repeat FAST stays negative while hypoperfusion persists. What next?",
        options: [
          ["broaden", "继续复苏与全身复评，寻找腹膜后、骨盆、胸腔、长骨等来源；按稳定性决定即时控制或CT", "Continue resuscitation and whole-patient reassessment for retroperitoneal, pelvic, thoracic, long-bone, and other sources; use stability to choose immediate control or CT", "best-supported", "阴性 FAST 不能关闭出血鉴别。", "A negative FAST cannot close the bleeding differential."],
          ["stop", "阴性两次即可停止寻找出血", "Two negative scans are enough to stop searching for bleeding", "unsafe", "重复阴性仍不能排除腹膜后等盲区。", "Repeated negative scans still do not exclude retroperitoneal and other blind spots."],
          ["scan-only", "持续重复同一个窗口，暂不重做 xABCDE", "Keep repeating one window and defer repeat xABCDE", "unsafe", "这是影像固着，会遗漏患者整体恶化和其他出血源。", "This is imaging fixation and can miss whole-patient deterioration and other bleeding sources."]
        ]
      }
    ]
  });
})();
