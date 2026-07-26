(function () {
  const sources = window.TRAUMA_SKILL_SOURCES || {};
  Object.assign(sources, {
    "S-DAS-CSPINE-2024": { title: "DAS cervical-spine airway guideline 2024", url: "https://das.uk.com/guidelines/cervical-spine-injury/" },
    "S-NICE-NG37": { title: "NICE NG37 Fractures (complex)", url: "https://www.nice.org.uk/guidance/ng37/chapter/recommendations" },
    "S-DAS-EDUCATION-2025": { title: "DAS 2025 intubation education package", url: "https://das.uk.com/new-das-2025-intubation-guidelines/" },
    "S-BTS-OXYGEN-2017": { title: "BTS guideline for emergency oxygen in adults", url: "https://www.brit-thoracic.org.uk/clinical-resources/guidelines/emergency-oxygen/" },
    "S-RCUK-FIRST-AID-2025": { title: "RCUK/ERC First Aid Guidelines 2025", url: "https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/first-aid-guidelines" }
  });

  const A = "../assets/";
  const art = {
    bvm: "illustrations/trauma-bay-vivid.png",
    intubation: "illustrations/polytrauma-shock-case-vivid.png",
    cricothyrotomy: "illustrations/node-reassessment-vivid.png",
    "needle-decompression": "illustrations/chest-trauma-mini-vivid.png",
    "tube-thoracostomy": "illustrations/node-resources-vivid.png",
    efast: "illustrations/node-efast-vivid.png",
    tourniquet: "illustrations/trauma-disaster-vivid.png",
    "pelvic-binder": "illustrations/pelvic-trauma-vivid.png",
    splinting: "illustrations/cspine-hip-case-vivid.png"
  };
  const nodeAssets = [
    "generated/nodes/prehospital-alert.svg",
    "generated/nodes/team-handoff.svg",
    "icons/clinical-signals.svg",
    "generated/nodes/imaging-resources.svg",
    "generated/nodes/dual-reassessment-loop.svg"
  ];
  const nodeFallback = "icons/clinical-signals.svg";
  const routeImages = (custom = []) => nodeAssets.map((src, i) => A + (custom[i] || src || nodeFallback));
  const routeSets = {
    bvm: ["icons/clinical-signals.svg", "generated/nodes/team-handoff.svg", "generated/overview/trauma-bay.svg", "generated/nodes/xabcde-loop.svg", "generated/nodes/dual-reassessment-loop.svg"],
    intubation: ["generated/nodes/brain-risk.svg", "generated/nodes/team-handoff.svg", "generated/nodes/imaging-resources.svg", "generated/nodes/xabcde-loop.svg", "generated/nodes/dual-reassessment-loop.svg"],
    cricothyrotomy: ["generated/nodes/brain-risk.svg", "generated/nodes/team-handoff.svg", "generated/nodes/disaster-resource-panel.svg", "generated/overview/trauma-bay.svg", "generated/nodes/dual-reassessment-loop.svg"],
    "needle-decompression": ["generated/nodes/chest-risk.svg", "generated/stages/xabcde-stage-b.svg", "generated/nodes/xabcde-loop.svg", "generated/nodes/team-handoff.svg", "generated/nodes/dual-reassessment-loop.svg"],
    "tube-thoracostomy": ["generated/nodes/chest-risk.svg", "generated/nodes/imaging-resources.svg", "generated/nodes/team-handoff.svg", "generated/nodes/disaster-resource-panel.svg", "generated/nodes/dual-reassessment-loop.svg"],
    efast: ["generated/nodes/efast-node.svg", "generated/overview/abdominal-injury-mini.svg", "generated/nodes/abdominal-risk.svg", "generated/nodes/imaging-resources.svg", "generated/nodes/dual-reassessment-loop.svg"],
    tourniquet: ["generated/nodes/prehospital-alert.svg", "generated/nodes/team-handoff.svg", "generated/nodes/disaster-resource-panel.svg", "generated/nodes/hospital-casualty-flow.svg", "generated/nodes/dual-reassessment-loop.svg"],
    "pelvic-binder": ["generated/nodes/pelvic-risk.svg", "generated/nodes/xabcde-loop.svg", "generated/overview/pelvic-trauma.svg", "generated/nodes/imaging-resources.svg", "generated/nodes/dual-reassessment-loop.svg"],
    splinting: ["generated/nodes/polytrauma-priority.svg", "icons/clinical-signals.svg", "generated/nodes/team-handoff.svg", "generated/nodes/xabcde-loop.svg", "generated/nodes/dual-reassessment-loop.svg"]
  };
  const scene = (image, titleZh, titleEn, duration, objectiveZh, objectiveEn, promptZh, promptEn) => ({
    image: A + image, titleZh, titleEn, duration, objectiveZh, objectiveEn, promptZh, promptEn
  });
  const evidence = (titleZh, titleEn, messageZh, messageEn, limitZh, limitEn, sourceIds) => ({
    titleZh, titleEn, messageZh, messageEn, limitZh, limitEn, sourceIds, reviewStatus: "pending_clinician_review"
  });
  const stage = (time, titleZh, titleEn, vitals, findingsZh, findingsEn, taskZh, taskEn, revealZh, revealEn) => ({
    time, titleZh, titleEn, vitals, findingsZh, findingsEn, taskZh, taskEn, revealZh, revealEn
  });
  const commonLevels = [
    { id: "not_observed", zh: "未观察到", en: "Not observed" },
    { id: "developing", zh: "正在形成", en: "Developing" },
    { id: "supervised", zh: "可在监督下完成", en: "Demonstrated under supervision" }
  ];

  const configs = {
    bvm: {
      redlineZh: "BVM 是维持氧合与通气的桥接能力；一次胸廓起伏或一次 SpO₂ 改善不等于问题已经解决。",
      redlineEn: "BVM is a bridge for oxygenation and ventilation; one chest rise or one SpO₂ improvement does not prove the problem is solved.",
      route: [
        ["识别通气不足", "Recognise inadequate ventilation", "同时看意识、呼吸幅度、胸廓、气道音和 SpO₂ 趋势。", "Read consciousness, respiratory depth, chest movement, airway sound, and SpO₂ trend together.", "通气是否持续有效？", "Is ventilation sustainably effective?"],
        ["开放并清理气道", "Open and clear the airway", "气道通畅是有效通气的前提；颈椎风险需由团队共同保护。", "Airway patency precedes effective ventilation; the team protects a potentially injured cervical spine.", "阻塞或分泌物是否再次出现？", "Has obstruction or secretion recurred?"],
        ["建立团队通气", "Establish team ventilation", "观察密闭、双侧胸廓起伏、漏气与胃胀风险；困难时升级协作。", "Observe seal, bilateral chest rise, leak, and gastric-inflation risk; escalate teamwork when difficult.", "密闭和起伏能否稳定维持？", "Can seal and chest rise be maintained?"],
        ["用生理反应验证", "Verify with physiology", "联合胸廓、SpO₂、心率和可用的呼气波形，不凭手感宣布成功。", "Combine chest movement, SpO₂, heart rate, and available expiratory waveform; do not declare success by feel.", "改善是否持续，是否仍有 B/C 轴威胁？", "Is improvement sustained, and do B/C threats remain?"],
        ["复评并升级", "Reassess and escalate", "重新检查通畅、密闭、分泌物和团队技术，并启动高级气道支持。", "Recheck patency, seal, secretions, and team technique, and activate advanced airway support.", "下一轮复评要确认什么？", "What must the next reassessment confirm?"]
      ],
      evidence: [
        evidence("有效性靠多信号确认", "Effectiveness needs multiple signals", "气道通畅、面罩密闭和可见胸廓起伏应共同判断。", "Airway patency, mask seal, and visible chest rise should be judged together.", "RCUK 细节直接适用于成人复苏语境，不能把其参数原样外推到有脉搏创伤患者。", "RCUK details directly apply to adult resuscitation and should not be copied as parameters for perfusing trauma patients.", ["S-RCUK-ALS-2025"]),
        evidence("颈椎风险改变开放气道策略", "Cervical-spine risk changes airway opening", "疑似颈椎损伤时应减少颈部运动并保持团队保护。", "Minimise cervical movement and maintain team protection when injury is suspected.", "托颌倾向来自弱推荐，不应包装为所有情境的绝对规则。", "The preference for jaw thrust is a weak recommendation, not an absolute rule for every setting.", ["S-DAS-CSPINE-2024"]),
        evidence("BVM 是升级前的桥梁", "BVM is a bridge to escalation", "不能维持气道或通气的严重创伤需由具备资质的团队建立确定性气道。", "Severe trauma with an unsustainable airway or ventilation requires a qualified team to establish a definitive airway.", "本页不规定药物、器械规格、频率、压力或本院升级阈值。", "This page does not specify drugs, devices, rates, pressures, or local escalation thresholds.", ["S-NICE-NG39", "S-WHO-BEC-2018"])
      ],
      clinicalDecision: {
        ui: {
          kickerZh: "支持升级决策", kickerEn: "Support escalation",
          titleZh: "从氧疗到 BVM，再到高级气道", titleEn: "From oxygen therapy to BVM and advanced airway",
          descriptionZh: "先区分氧合不足与无效通气，再结合气道保护和病情轨迹决定升级。", descriptionEn: "Separate oxygenation failure from ineffective ventilation, then integrate airway protection and trajectory before escalation.",
          signalAriaZh: "当前气道支持指标", signalAriaEn: "Current airway support signals",
          metricLabelZh: "数值如何使用", metricLabelEn: "How to use numbers",
          metricGuardZh: "警报值用于触发复评，不替代临床判断", metricGuardEn: "Alerts trigger reassessment; they do not replace clinical judgement"
        },
        guardrailZh: "先判断患者是‘缺氧但仍能有效自主通气’，还是‘已经不能有效通气’。氧疗支持前者，BVM 桥接后者；高级气道用于气道保护、氧合或通气无法持续维持的患者。",
        guardrailEn: "First decide whether the patient is hypoxaemic but still ventilating effectively, or is no longer ventilating effectively. Oxygen therapy supports the former, BVM bridges the latter, and an advanced airway is considered when airway protection, oxygenation, or ventilation cannot be sustained.",
        steps: [
          {
            id: "oxygen", number: "01", image: "../assets/trauma-skills/realism/bvm-01-recognise-inadequate-ventilation.png",
            titleZh: "支持氧合：鼻导管 / 普通面罩 / 储氧面罩", titleEn: "Support oxygenation: cannula / simple mask / reservoir mask",
            enterZh: "患者仍能维持气道并有基本有效的自主呼吸与胸廓起伏，主要问题是氧合不足。", enterEn: "The patient maintains the airway with basically effective spontaneous breathing and chest movement; oxygenation is the main problem.",
            checkZh: "连续看意识、气道音、呼吸深度、双侧胸廓、呼吸功和 SpO₂ 趋势，而不是只看流量。", checkEn: "Continuously assess consciousness, airway sound, respiratory depth, bilateral chest movement, work of breathing, and SpO₂ trend—not flow alone.",
            escalateZh: "鼻导管或普通面罩未达到目标范围时，按本地流程升级储氧面罩并呼叫高级帮助；若同时出现无效通气，不要只继续增加氧浓度。", escalateEn: "If cannula or simple mask does not achieve the target range, escalate to a reservoir mask and senior help under local policy; if ventilation is also ineffective, do not merely increase oxygen concentration.",
            sourceIds: ["S-BTS-OXYGEN-2017", "S-RCUK-FIRST-AID-2025"]
          },
          {
            id: "bvm", number: "02", image: "../assets/trauma-skills/realism/bvm-team-ventilation.png",
            titleZh: "辅助通气：BVM 桥接", titleEn: "Assist ventilation: BVM bridge",
            enterZh: "呼吸暂停、濒死样呼吸、呼吸过浅/过慢、胸廓起伏不足，或氧疗后仍低氧并伴通气不足。", enterEn: "Apnoea, agonal breathing, breathing that is too shallow/slow, inadequate chest movement, or persistent hypoxaemia after oxygen therapy with inadequate ventilation.",
            checkZh: "先确认气道通畅与面罩密闭；每次辅助通气出现适度双侧胸廓起伏，并观察 SpO₂、心率及可用的连续呼气波形。", checkEn: "Confirm airway patency and mask seal; each assisted breath should produce appropriate bilateral chest rise, with SpO₂, heart rate, and any available continuous expiratory waveform observed.",
            escalateZh: "优化开放气道、吸引、辅助器具、双人密闭和设备后仍无有效起伏，或效果不能持续，即启动高级气道团队并继续救援氧合。", escalateEn: "If there is still no effective chest rise after optimising airway opening, suction, adjuncts, two-person seal, and equipment—or the effect cannot be sustained—activate the advanced-airway team while continuing rescue oxygenation.",
            sourceIds: ["S-WHO-BEC-2018", "S-RCUK-ALS-2025"]
          },
          {
            id: "advanced-airway", number: "03", image: "../assets/trauma-skills/realism/bvm-05-reassess-escalate.png",
            titleZh: "高级气道：具备资质团队", titleEn: "Advanced airway: credentialed team",
            enterZh: "不能维持或保护气道、不能可靠维持氧合/通气、BVM 只能短暂桥接，或预计气道快速恶化。", enterEn: "The airway cannot be maintained or protected, oxygenation/ventilation cannot be sustained reliably, BVM offers only a brief bridge, or rapid airway deterioration is anticipated.",
            checkZh: "共享主计划和失败计划；准备吸引、颈椎保护、救援氧合和循环风险管理，并以持续波形等客观证据确认效果。", checkEn: "Share primary and failure plans; prepare suction, cervical protection, rescue oxygenation, and circulatory-risk management, and confirm effect with objective evidence such as a sustained waveform.",
            escalateZh: "一次插管失败不等于自动进入颈前气道；先区分‘仍可氧合’与‘无法插管且无法氧合’，按本院授权失败气道路径转换。", escalateEn: "One failed intubation does not automatically trigger a front-of-neck airway; distinguish maintained oxygenation from cannot-intubate/cannot-oxygenate and transition through the authorised local failure pathway.",
            sourceIds: ["S-NICE-NG39", "S-DAS-INTUBATION-2025", "S-DAS-CSPINE-2024"]
          }
        ],
        metricNotes: [
          { value: "94–98%", labelZh: "多数急症成人氧疗目标", labelEn: "Target for most acutely ill adults", noteZh: "用于滴定氧疗；不是 BVM 或插管的自动阈值。高碳酸血症风险者通常需血气与本地流程个体化。", noteEn: "Used to titrate oxygen therapy, not as an automatic BVM or intubation threshold. Hypercapnia risk requires blood gases and local individualisation.", sourceId: "S-BTS-OXYGEN-2017" },
          { value: "↓ ≥3%", labelZh: "较基线下降的复评警报", labelEn: "Reassessment alert from baseline", noteZh: "即使仍处目标区间，也要复核患者、传感器、灌注及胸部病因。", noteEn: "Even within target, reassess the patient, sensor, perfusion, and thoracic causes.", sourceId: "S-BTS-OXYGEN-2017" },
          { value: "<88%", labelZh: "危及生命低氧红色警报", labelEn: "Life-threatening hypoxaemia alert", noteZh: "RCUK/ERC 2025 院外急救语境：立即高浓度氧与紧急升级；仍不是单独插管阈值。", noteEn: "RCUK/ERC 2025 first-aid scope: immediate high-concentration oxygen and urgent escalation; still not a stand-alone intubation threshold.", sourceId: "S-RCUK-FIRST-AID-2025" },
          { value: "GCS 8分或更低", labelZh: "联系高级气道能力者", labelEn: "GCS 8 or lower: contact advanced-airway capability", noteZh: "WHO BEC 的转交/升级警报；需结合咳嗽、分泌物、通气、氧合和病程，不是自动插管按钮。", noteEn: "A WHO BEC handoff/escalation alert; combine cough, secretions, ventilation, oxygenation, and trajectory rather than using it as an automatic intubation button.", sourceId: "S-WHO-BEC-2018" }
        ],
        signalLabels: [
          ["airwayProtection", "气道保护", "Airway protection"], ["airwayPatency", "气道通畅", "Airway patency"],
          ["ventilation", "自主/辅助通气", "Spontaneous/assisted ventilation"], ["bvmEffect", "BVM 机械效果", "BVM mechanical effect"],
          ["oxygenation", "氧合趋势", "Oxygenation trend"], ["objectiveSignal", "客观确认信号", "Objective confirmation"]
        ],
        stageSignals: [
          {
            airwayProtection: ["差，且在恶化", "Poor and worsening", "alert", "GCS 7；嗜睡，不能可靠处理分泌物", "GCS 7; drowsy and cannot reliably manage secretions"],
            airwayPatency: ["鼾样气道音", "Snoring airway sound", "alert", "提示上气道阻塞，需开放并准备吸引", "Suggests upper-airway obstruction; open airway and prepare suction"],
            ventilation: ["RR 8，浅；双侧起伏弱", "RR 8, shallow; weak bilateral rise", "alert", "低频率与低潮气量线索必须一起判断", "Rate and low-volume cues must be judged together"],
            bvmEffect: ["尚未开始", "Not started", "neutral", "先分派气道、颈椎保护、球囊和监护角色", "Assign airway, cervical protection, bag, and monitoring roles"],
            oxygenation: ["SpO₂ 84%，下降", "SpO₂ 84%, falling", "alert", "先确认信号质量，同时立即处理患者", "Check signal quality while treating the patient immediately"],
            objectiveSignal: ["未提供呼气波形", "Expiratory waveform unavailable", "neutral", "缺失不是阴性；使用胸廓和趋势继续验证", "Unavailable is not negative; continue with chest and trend verification"]
          },
          {
            airwayProtection: ["仍差", "Still poor", "alert", "气道风险尚未因一次开放手法解决", "Airway risk is not resolved by one opening manoeuvre"],
            airwayPatency: ["已开放，吸引准备", "Opened; suction ready", "caution", "持续观察分泌物和异常气道音", "Continue to observe secretions and airway sounds"],
            ventilation: ["团队辅助后双侧起伏", "Bilateral rise with team assistance", "caution", "需要连续验证，不能只看一次", "Needs continuous verification, not one breath"],
            bvmEffect: ["密闭改善，暂有效", "Seal improved; temporarily effective", "caution", "仍需看漏气、阻力和胃胀", "Still assess leak, resistance, and gastric inflation"],
            oxygenation: ["84%，等待趋势反应", "84%, awaiting trend response", "caution", "装置改变后立即复评，而非等待固定分钟数", "Reassess immediately after changing support, not after a fixed delay"],
            objectiveSignal: ["可见双侧胸廓起伏", "Visible bilateral chest rise", "good", "与 SpO₂、心率及可用波形共同确认", "Combine with SpO₂, heart rate, and any waveform"]
          },
          {
            airwayProtection: ["仍需桥接", "Still requires bridging", "caution", "氧合改善不等于保护能力恢复", "Better oxygenation does not restore airway protection"],
            airwayPatency: ["暂时通畅", "Temporarily patent", "good", "继续观察分泌物复发", "Continue to watch for recurrent secretions"],
            ventilation: ["连续双侧起伏", "Sustained bilateral rise", "good", "辅助通气产生可重复生理反应", "Assisted ventilation produces repeatable physiological response"],
            bvmEffect: ["密闭稳定", "Seal stable", "good", "无明显漏气；仍避免过度通气", "No major leak; continue to avoid excessive ventilation"],
            oxygenation: ["84→90→95%，改善", "84→90→95%, improving", "good", "看方向与持续性，不用一次读数宣布结束", "Use direction and persistence, not one reading as the endpoint"],
            objectiveSignal: ["连续呼气波形（如设备具备）", "Continuous expiratory waveform if available", "good", "波形需与通气和临床反应一致", "Waveform should match ventilation and clinical response"]
          },
          {
            airwayProtection: ["仍差", "Still poor", "alert", "高级气道理由仍存在", "The rationale for advanced airway support remains"],
            airwayPatency: ["分泌物增加", "Secretions increasing", "alert", "重新开放并吸引，不能机械重复挤压", "Reopen and suction; do not mechanically repeat bagging"],
            ventilation: ["胸廓起伏再次变弱", "Chest rise weakens again", "alert", "复核气道、密闭、设备和胸部威胁", "Recheck airway, seal, equipment, and thoracic threats"],
            bvmEffect: ["漏气，效果不能维持", "Leak; effect not sustained", "alert", "双人优化并启动失败计划", "Optimise with two people and activate the failure plan"],
            oxygenation: ["95→88%，再次下降", "95→88%, falling again", "alert", "是病情恶化警报，不是单一病因诊断", "A deterioration alert, not a single-cause diagnosis"],
            objectiveSignal: ["波形减弱/需重新确认", "Waveform diminished / needs reconfirmation", "caution", "任何策略变化后重新核查", "Recheck after every strategy change"]
          }
        ],
        reassessmentRows: [
          ["气道保护", "Airway protection", ["差且恶化", "仍差", "仍需桥接", "仍差，升级理由持续"], ["Poor/worsening", "Still poor", "Still needs bridge", "Still poor; escalation rationale persists"]],
          ["气道音 / 分泌物", "Airway sound / secretions", ["鼾声", "开放并准备吸引", "暂时通畅", "分泌物增加"], ["Snoring", "Opened; suction ready", "Temporarily patent", "Secretions increase"]],
          ["呼吸深度 / 胸廓", "Depth / chest movement", ["浅，起伏弱", "辅助后双侧起伏", "连续双侧起伏", "再次变弱"], ["Shallow; weak rise", "Bilateral rise with help", "Sustained bilateral rise", "Weakens again"]],
          ["氧合趋势", "Oxygenation trend", ["84%，下降", "84%，待反应", "84→95%，改善", "95→88%，恶化"], ["84%, falling", "84%, awaiting response", "84→95%, improving", "95→88%, worsening"]],
          ["未解决问题", "Unresolved issue", ["病因与信号可靠性", "能否持续有效", "气道保护仍差", "密闭/分泌物/高级气道"], ["Cause and signal reliability", "Can effect be sustained?", "Protection remains poor", "Seal/secretions/advanced airway"]]
        ],
        branchQuestions: [
          {
            stageIndex: 1,
            promptZh: "此时最合理的团队组织是什么？", promptEn: "What is the best-supported team organisation now?",
            options: [
              ["best", "开放/清理气道并保护颈椎；双人 BVM；同步看双侧胸廓和趋势", "Open/clear the airway with cervical protection; use two-person BVM; observe bilateral chest movement and trends", "best-supported", "同时处理通畅、通气与验证，符合当前问题。", "Addresses patency, ventilation, and verification together."],
              ["number", "只调高给氧装置，等 SpO₂ 上升后再看呼吸", "Increase oxygen delivery alone and reassess breathing only after SpO₂ rises", "incomplete", "患者已有浅慢呼吸和胸廓起伏弱，单纯增加氧浓度不能纠正无效通气。", "The patient already has shallow slow breathing and weak chest rise; oxygen concentration alone cannot correct ineffective ventilation."],
              ["label", "仅根据 SpO₂ 84% 就宣布直接进入插管", "Declare immediate intubation solely because SpO₂ is 84%", "unsafe", "低氧需要紧急处理，但高级气道决定需整合气道保护、通气、可逆原因、趋势和团队能力。", "Hypoxaemia needs urgent action, but the advanced-airway decision integrates protection, ventilation, reversible causes, trajectory, and team capability."]
            ]
          },
          {
            stageIndex: 3,
            promptZh: "BVM 效果再次失败，下一步团队路径是什么？", promptEn: "BVM effect is failing again. What is the next team pathway?",
            options: [
              ["best", "宣布通气再次无效；并行吸引、重新密闭、查设备与胸部原因；呼叫高级气道团队并继续桥接", "Declare ventilation ineffective; suction, reseal, check equipment and thoracic causes in parallel; activate the advanced-airway team while bridging", "best-supported", "先纠正可逆失败，同时不延误具资质团队的确定性气道计划。", "Corrects reversible failure without delaying a credentialed definitive-airway plan."],
              ["repeat", "由同一人继续以相同方式反复挤压球囊", "Have the same person continue bagging in the same way", "unsafe", "这是任务固着；没有处理阻塞、漏气、设备或胸部威胁。", "This is task fixation and does not address obstruction, leak, equipment, or thoracic threats."],
              ["wait", "等待 SpO₂ 再下降到某个固定数值再升级", "Wait for SpO₂ to fall to a fixed number before escalating", "unsafe", "气道保护差、起伏减弱和效果不能维持已经构成功能性升级理由。", "Poor protection, weak chest rise, and unsustained effect already provide functional escalation reasons."]
            ]
          }
        ]
      },
      storyboard: [
        scene(art.bvm, "看见问题", "See the problem", "00:50", "从意识、胸廓、气道音和监护趋势辨认通气不足。", "Recognise inadequate ventilation from consciousness, chest movement, airway sound, and monitor trend.", "这是单纯低氧数字，还是气道保护/通气问题？", "Is this merely a low number, or an airway-protection/ventilation problem?"),
        scene("illustrations/node-handoff-vivid.png", "团队建立有效通气", "Team establishes effective ventilation", "01:40", "展示颈椎保护、设备核对、双人配合与持续效果观察。", "Show cervical protection, equipment checks, two-person teamwork, and continuous effect checks.", "胸廓无起伏时，团队先重新检查什么？", "What should the team recheck first when there is no chest rise?"),
        scene("illustrations/node-reassessment-vivid.png", "复评与升级", "Reassess and escalate", "01:10", "监护先改善后再次下降，训练重新检查和升级沟通。", "The monitor improves then declines, training renewed checks and escalation communication.", "一次改善为什么不能结束 xABCDE？", "Why can one improvement not end xABCDE?")
      ],
      simulation: {
        titleZh: "摩托车碰撞后意识下降与低通气", titleEn: "Reduced consciousness and hypoventilation after motorcycle collision",
        stages: [
          stage("T+00", "院前信息", "Prehospital information", "HR 118 · BP 108/68 · RR 8 浅 · SpO₂ 84% · GCS 7", ["头面部受力，颈椎损伤尚未排除", "途中逐渐嗜睡"], ["Head/face impact; cervical injury not excluded", "Progressively drowsy during transport"], "先报告你看到的事实，不先给诊断标签。", "Report observed facts before assigning a diagnosis.", "鼾样气道音，双侧胸廓起伏弱。", "Snoring airway sound with weak bilateral chest movement."),
          stage("T+02", "查体释放", "Examination released", "HR 118 · BP 108/68 · SpO₂ 84%", ["桡动脉可触，皮肤偏凉", "未见明显单侧胸廓差异"], ["Radial pulse palpable; skin cool", "No clear unilateral chest asymmetry"], "组织气道开放、吸引、BVM 与颈椎保护角色。", "Organise airway opening, suction, BVM, and cervical-protection roles.", "团队通气后出现稳定双侧起伏。", "Stable bilateral chest rise appears after team ventilation."),
          stage("T+04", "效果趋势", "Effect trend", "SpO₂ 84→90→95% · HR 118→110", ["连续胸廓起伏", "如设备具备，可见连续呼气波形"], ["Continuous chest rise", "A continuous expiratory waveform if available"], "说明哪些信息支持有效，哪些风险尚未解决。", "State what supports effectiveness and what remains unresolved.", "数分钟后分泌物增加，面罩漏气。", "Secretions increase and mask leak develops minutes later."),
          stage("T+07", "再次恶化", "Deterioration", "SpO₂ 95→88% · HR 110→122", ["胸廓起伏变弱", "气道保护能力仍差"], ["Chest movement becomes weaker", "Airway protection remains poor"], "重新检查原因并启动高级气道团队，而不是重复同一动作。", "Recheck causes and activate the advanced-airway team instead of repeating the same action.", "病例进入高级气道计划与全身复评。", "The case moves to advanced-airway planning and whole-patient reassessment.")
        ]
      }
    },

    intubation: {
      redlineZh: "不要把单个 GCS 数字做成自动插管按钮；气道保护、氧合、通气、趋势和失败氧合计划必须一起讨论。",
      redlineEn: "Do not turn one GCS value into an automatic intubation button; discuss airway protection, oxygenation, ventilation, trend, and the failed-oxygenation plan together.",
      route: [
        ["判断为何需要确定性气道", "Why a definitive airway is needed", "整合保护能力、通气、氧合、意识与恶化趋势。", "Integrate protection, ventilation, oxygenation, consciousness, and deterioration.", "风险是否仍在加重？", "Is risk still worsening?"],
        ["共享主计划与失败计划", "Share primary and failure plans", "明确角色、监护、颈椎保护、救援氧合与高级帮助。", "Define roles, monitoring, cervical protection, rescue oxygenation, and expert help.", "失败后能否继续维持氧合？", "Can oxygenation be maintained after failure?"],
        ["优化首次条件", "Optimise first conditions", "完成预氧合、吸引、设备、循环风险和团队暂停。", "Prepare preoxygenation, suction, equipment, haemodynamic risk, and team pause.", "是否存在遗漏或任务固着？", "Is anything omitted or becoming task fixation?"],
        ["客观证明位置", "Objectively confirm placement", "持续呼气波形是核心信息，并结合胸廓和氧合变化。", "Continuous expiratory waveform is central, combined with chest and oxygenation response.", "能否证明，而不是推测？", "Can placement be proven rather than assumed?"],
        ["插管后复评", "Post-intubation reassessment", "重新检查 A/B/C/D、血压、并发症和困难气道交接。", "Recheck A/B/C/D, blood pressure, complications, and difficult-airway handoff.", "新的循环风险是否出现？", "Has a new circulatory risk emerged?"]
      ],
      evidence: [
        evidence("适应场景不是单一分数", "Indication is not one score", "严重创伤不能维持气道和/或通气时，确定性气道由具备资质的团队建立。", "A qualified team establishes a definitive airway when severe trauma cannot sustain airway and/or ventilation.", "药物、剂量和本地资质不由公开学生页规定。", "The public learner page does not prescribe drugs, doses, or local credentials.", ["S-NICE-NG39"]),
        evidence("失败先回到氧合", "After failure, return to oxygenation", "RSI 失败后以基础手法、辅助器具或声门上气道桥接，直至后续救援。", "After failed RSI, basic manoeuvres, adjuncts, or a supraglottic airway bridge to rescue.", "失败插管不等于自动进入紧急颈前气道。", "Failed intubation does not automatically equal emergency front-of-neck airway.", ["S-NICE-NG39", "S-DAS-INTUBATION-2025"]),
        evidence("管位必须客观确认", "Placement needs objective confirmation", "持续波形二氧化碳应处于确认核心，同时核查胸廓和临床反应。", "Continuous waveform capnography should sit at the core of confirmation, with chest and clinical response.", "RCUK 直接适用成人复苏场景；本页只提取监护原则。", "RCUK directly applies to adult resuscitation; this page extracts the monitoring principle only.", ["S-RCUK-ALS-2025"])
      ],
      storyboard: [
        scene(art.intubation, "决策而非器械", "Decision before device", "01:10", "跟随意识、分泌物、呼吸与 SpO₂ 的时间变化。", "Follow changes in consciousness, secretions, breathing, and SpO₂.", "哪些是事实，哪些仍未知？", "What is fact, and what remains unknown?"),
        scene("illustrations/node-resources-vivid.png", "团队计划与模拟实施", "Team plan and simulated performance", "02:20", "角色、主计划、救援氧合、颈椎策略和监护共同上墙。", "Roles, primary plan, rescue oxygenation, cervical strategy, and monitoring share one board.", "如果主计划失败，谁做什么？", "If the primary plan fails, who does what?"),
        scene("illustrations/node-lab-trends-vivid.png", "证明与复评", "Prove and reassess", "01:20", "对照持续波形与无持续波形，随后回到 A/B/C/D。", "Compare sustained with absent waveform, then return to A/B/C/D.", "为什么胸廓起伏不能单独确认？", "Why can chest movement not confirm placement alone?")
      ],
      simulation: {
        titleZh: "多发伤患者进行性意识下降", titleEn: "Progressive loss of consciousness in polytrauma",
        stages: [
          stage("T+00", "到院", "Arrival", "HR 124 · BP 96/62 · RR 26 · SpO₂ 90% · GCS 10", ["高速碰撞", "颈椎损伤未排除"], ["High-speed collision", "Cervical injury not excluded"], "整合气道保护、通气、氧合与循环风险。", "Integrate airway protection, ventilation, oxygenation, and circulatory risk.", "口腔分泌物增多，咳嗽反射减弱。", "Oral secretions increase and cough weakens."),
          stage("T+10", "趋势恶化", "Deteriorating trend", "HR 132 · BP 90/56 · RR 不规则 · SpO₂ 86% · GCS 7", ["双侧呼吸音存在", "出血源仍在并行评估"], ["Bilateral breath sounds present", "Bleeding source still under parallel assessment"], "分配操作者、颈椎保护、监护确认、救援氧合和高级帮助。", "Assign operator, cervical protection, monitor confirmation, rescue oxygenation, and expert help.", "模拟尝试结束，等待客观确认。", "The simulated attempt ends; objective confirmation is pending."),
          stage("T+12", "确认分支", "Confirmation branch", "SpO₂ 86→93→96%", ["分支 A：连续呼气波形与双侧起伏", "分支 B：无持续波形，外观起伏不确定"], ["Branch A: sustained expiratory waveform and bilateral rise", "Branch B: no sustained waveform; movement uncertain"], "只有哪一分支可以宣布确认？为什么？", "Which branch permits confirmation, and why?", "成功分支随后出现 BP 82/50。", "The success branch is followed by BP 82/50."),
          stage("T+15", "插管后复评", "Post-intubation reassessment", "BP 82/50 · SpO₂ 96%", ["氧合改善不代表循环风险解决", "需记录困难气道并交接"], ["Improved oxygenation does not resolve circulation risk", "Difficult-airway documentation and handoff are required"], "回到 B/C/D，列出本轮未解决问题。", "Return to B/C/D and list unresolved problems.", "病例进入团队复盘。", "The case enters team debrief.")
        ]
      }
    },

    cricothyrotomy: {
      redlineZh: "紧急颈前气道的触发是无法维持有效氧合的危机状态，不是单纯‘插管失败’。公开页只展示状态转换、团队和效果确认。",
      redlineEn: "Emergency front-of-neck airway is triggered by inability to sustain effective oxygenation, not intubation failure alone. The public page shows state transition, teamwork, and effect confirmation only.",
      route: [
        ["识别失控气道", "Recognise loss of airway control", "区分插管困难但可氧合，与无法插管且无法有效氧合。", "Distinguish difficult intubation with oxygenation from failure to intubate and oxygenate.", "氧合能力是否仍可维持？", "Can oxygenation still be maintained?"],
        ["清晰宣布并呼救", "Declare clearly and call for help", "停止无变化的重复尝试，形成共享危机状态。", "Stop unchanged repeated attempts and create a shared crisis state.", "团队是否听到并确认状态？", "Has the team heard and confirmed the state?"],
        ["并行维持与准备", "Maintain and prepare in parallel", "救援氧合、器材、授权操作者、监护和时间记录并行。", "Rescue oxygenation, equipment, authorised operator, monitoring, and timekeeping proceed in parallel.", "是否出现任务固着？", "Is task fixation occurring?"],
        ["受监督模型演练", "Supervised trainer drill", "只在专用训练器和授权教师监督下练习。", "Practise only on a dedicated trainer under authorised supervision.", "转换是否及时且闭环？", "Was transition timely and closed loop?"],
        ["证明效果与复盘", "Prove effect and debrief", "寻找持续呼气波形、胸廓、SpO₂ 回升，并复评出血和装置。", "Seek sustained waveform, chest movement, and SpO₂ recovery, then reassess bleeding and device.", "哪些延误可在下一轮避免？", "Which delays can be avoided next time?"]
      ],
      evidence: [
        evidence("触发点是无法维持氧合", "Trigger is inability to sustain oxygenation", "eFONA 属于标准策略不能维持氧合时的救援路径。", "eFONA is a rescue path when standard strategies cannot maintain oxygenation.", "不能把一次插管失败直接等同于进入侵入性救援。", "One failed intubation cannot be equated with immediate invasive rescue.", ["S-DAS-INTUBATION-2025"]),
        evidence("失败后保持桥接氧合", "Bridge oxygenation after failure", "基础手法、辅助器具和/或声门上气道作为桥接，直至后续救援。", "Basic manoeuvres, adjuncts, and/or a supraglottic airway bridge to subsequent rescue.", "公开页不提供切开路径、器械规格或操作深度。", "The public page gives no incision path, device size, or procedural depth.", ["S-NICE-NG39"]),
        evidence("模拟训练重在转换与团队", "Simulation centres on transition and team", "教育包强调危机声明、共享心智模型和团队演练。", "Education resources emphasise crisis declaration, shared mental model, and team rehearsal.", "成人通用困难气道框架不等同于专门创伤操作规范。", "A general adult difficult-airway framework is not a trauma-specific procedural standard.", ["S-DAS-EDUCATION-2025", "S-DAS-CSPINE-2024"])
      ],
      storyboard: [
        scene(art.cricothyrotomy, "识别状态转换", "Recognise the state transition", "01:10", "对比‘插管未成功但仍可氧合’与‘救援氧合不再有效’。", "Contrast failed intubation with maintained oxygenation against ineffective rescue oxygenation.", "当前真正危险的是插管失败，还是氧合失败？", "Is the immediate danger failed intubation or failed oxygenation?"),
        scene("illustrations/node-handoff-vivid.png", "危机资源管理", "Crisis resource management", "02:00", "团队宣布、确认、分工，并阻断重复无效尝试。", "The team declares, confirms, assigns, and interrupts repeated ineffective attempts.", "谁负责继续救援氧合和记录趋势？", "Who maintains rescue oxygenation and records the trend?"),
        scene("illustrations/node-lab-trends-vivid.png", "效果确认与交接", "Effect confirmation and handoff", "01:20", "模型操作被遮挡，画面聚焦波形、胸廓和复评。", "Trainer action is obscured; focus stays on waveform, chest movement, and reassessment.", "怎样证明通气恢复？", "How is restored ventilation proven?")
      ],
      simulation: {
        titleZh: "严重面颈部创伤后的无法插管与无法氧合危机", titleEn: "Cannot-intubate/cannot-oxygenate crisis after severe face-neck trauma",
        stages: [
          stage("T+00", "早期风险", "Early risk", "HR 126 · BP 112/70 · RR 30 · SpO₂ 92% · GCS 11", ["严重面部损伤", "声音改变、进行性呼吸困难"], ["Severe facial injury", "Voice change and progressive respiratory difficulty"], "提前呼叫高级气道和外科支持，形成主计划与救援计划。", "Call advanced airway and surgical support early; build primary and rescue plans.", "面部肿胀、血液和分泌物持续增加。", "Facial swelling, blood, and secretions continue to increase."),
          stage("T+06", "快速恶化", "Rapid deterioration", "HR 138 · BP 98/60 · SpO₂ 82% · GCS 7", ["胸廓起伏逐渐减弱", "颈椎风险未排除"], ["Chest movement weakens", "Cervical risk not excluded"], "说明何时仍属于可氧合的困难气道，何时进入失控状态。", "State when this remains a difficult but oxygenatable airway and when control is lost.", "插管未建立，救援通气也无有效胸廓起伏。", "Intubation is not established and rescue ventilation produces no effective chest rise."),
          stage("T+08", "危机宣布", "Crisis declaration", "SpO₂ 82→76→69% · HR 138→146", ["无持续呼气波形", "团队有人准备重复相同尝试"], ["No sustained expiratory waveform", "A team member is about to repeat the same attempt"], "清晰宣布状态、阻断任务固着并启动本院 eFONA 路径。", "Declare the state, interrupt task fixation, and activate the local eFONA pathway.", "授权模型演练后出现连续呼气波形。", "A sustained expiratory waveform appears after the authorised trainer drill."),
          stage("T+11", "处置后", "After rescue", "SpO₂ 69→78→90% · HR 146→128", ["连续呼气波形", "需复评出血、装置稳定和 B/C/D"], ["Sustained expiratory waveform", "Bleeding, device stability, and B/C/D require reassessment"], "证明效果并完成困难气道交接。", "Prove effect and complete the difficult-airway handoff.", "病例进入危机复盘。", "The case enters crisis debrief.")
        ]
      }
    },

    "needle-decompression": {
      redlineZh: "本课程讨论‘胸腔紧急减压’，不宣布针刺是所有场景的唯一方法；技术取决于生理状态、环境、人员资质和本地路径。",
      redlineEn: "This course teaches emergency chest decompression, not needle decompression as the sole universal method; technique depends on physiology, setting, credentials, and local pathway.",
      route: [
        ["识别机制与风险", "Recognise mechanism and risk", "撞击、穿透或正压通气背景下联想到胸膜腔压力风险。", "Consider pleural-pressure risk after impact, penetration, or positive-pressure ventilation.", "风险是否在动态增加？", "Is risk increasing dynamically?"],
        ["连续观察", "Observe continuously", "呼吸功、胸廓对称、呼吸音与 SpO₂/HR/BP 趋势一起看。", "Read work of breathing, chest symmetry, breath sounds, and SpO₂/HR/BP trends together.", "呼吸和循环是否同步恶化？", "Are breathing and circulation worsening together?"],
        ["判断张力性生理", "Judge tension physiology", "用‘呼吸恶化+循环受损’综合判断，不追单个体征。", "Integrate respiratory deterioration with circulatory compromise rather than chasing one sign.", "替代诊断有哪些？", "What alternative diagnoses remain?"],
        ["进入授权路径", "Enter authorised pathway", "团队明确风险、角色、器材和本地授权技术。", "The team declares risk, roles, equipment, and the locally authorised technique.", "是否因等待影像而延误？", "Is imaging causing delay?"],
        ["反应与复发复评", "Reassess response and recurrence", "看监护与查体变化，并衔接确定性胸腔管理。", "Read monitor and examination response and connect to definitive pleural management.", "是否复发或仍有其他威胁？", "Has the problem recurred or do other threats remain?"]
      ],
      evidence: [
        evidence("紧急减压有严格临床语境", "Emergency decompression has a clinical context", "疑似张力性气胸伴血流动力学不稳定或严重呼吸受损时进入紧急减压。", "Emergency decompression is considered for suspected tension pneumothorax with haemodynamic instability or severe respiratory compromise.", "不能以单个数值或单个超声征象作为自动命令。", "No single number or ultrasound sign is an automatic command.", ["S-NICE-NG39"]),
        evidence("不稳定生理不应等待影像", "Unstable physiology should not wait for imaging", "稳定且对复苏有反应者则进入紧急影像路径。", "Patients who are stable or respond to resuscitation enter urgent imaging pathways.", "阴性胸部 eFAST 不能排除气胸。", "A negative chest eFAST does not exclude pneumothorax.", ["S-NICE-NG39"]),
        evidence("技术路径存在情境差异", "Technique depends on context", "NICE 与 WSES-AAST 对不同环境和能力条件下的技术路径表述不同。", "NICE and WSES-AAST frame technical paths differently across settings and capabilities.", "本页并列呈现差异，不宣布唯一通用术式。", "This page presents the difference without declaring one universal technique.", ["S-WSES-AAST-THORACIC-2025", "S-NICE-NG39"])
      ],
      storyboard: [
        scene(art["needle-decompression"], "张力性生理机制", "Tension physiology", "00:50", "用胸膜腔压力、肺受压和静脉回流受影响解释风险。", "Explain risk through pleural pressure, lung compression, and impaired venous return.", "为什么这是呼吸与循环的共同问题？", "Why is this both a respiratory and circulatory problem?"),
        scene("illustrations/node-lab-trends-vivid.png", "逐层点亮信息", "Layer the evidence", "01:30", "监护、单侧查体和 eFAST 片段逐层出现。", "Monitor trend, unilateral examination, and an eFAST clip appear in layers.", "哪条信息最不能单独定性？", "Which information is least able to decide alone?"),
        scene("illustrations/node-reassessment-vivid.png", "决策与复评", "Decision and reassessment", "01:15", "授权干预被遮挡，展示改善与未改善两分支。", "The authorised intervention is obscured; improved and unimproved branches are shown.", "改善后为何仍需确定性处理？", "Why is definitive management still needed after improvement?")
      ],
      simulation: { titleZh: "高速碰撞后的呼吸循环同步恶化", titleEn: "Coupled respiratory-circulatory deterioration after high-speed collision", stages: [
        stage("T+00", "初始观察", "Initial observation", "HR 112 · BP 108/72 · RR 24 · SpO₂ 93%", ["右胸痛，清醒焦虑", "已接受初始氧疗"], ["Right chest pain; alert and anxious", "Receiving initial oxygen therapy"], "描述事实和趋势起点。", "Describe facts and the trend baseline.", "右侧胸廓活动和呼吸音减弱。", "Right chest movement and breath sounds are reduced."),
        stage("T+05", "恶化", "Deterioration", "HR 124 · BP 96/64 · RR 30 · SpO₂ 88%", ["呼吸功增加", "右侧线索更明显"], ["Increased work of breathing", "Right-sided cues are more apparent"], "提出危及生命假设，同时列出替代诊断。", "Propose the life-threatening hypothesis and alternatives.", "eFAST 右侧肺滑动未显示，但该信息不能单独定性。", "Right lung sliding is not seen on eFAST, but this cannot decide alone."),
        stage("T+08", "危急趋势", "Critical trend", "HR 132 · BP 84/56 · SpO₂ 84%", ["呼吸与循环同步恶化", "团队需进入本院授权减压路径"], ["Respiratory and circulatory deterioration are coupled", "The team should enter the local authorised decompression pathway"], "完成闭环汇报并解释为何不应等待影像。", "Deliver a closed-loop report and explain why imaging should not delay action.", "合成干预后生命体征和呼吸功改善。", "Physiology and work of breathing improve after the synthetic intervention."),
        stage("T+11", "复评", "Reassessment", "HR 116 · BP 102/68 · SpO₂ 93%", ["呼吸功下降", "仍需监测复发并衔接确定性胸腔处理"], ["Work of breathing decreases", "Recurrence monitoring and definitive pleural care remain"], "说明改善不能结束复评的原因。", "Explain why improvement cannot end reassessment.", "病例进入胸腔持续管理。", "The case moves to ongoing pleural management.")
      ] }
    },

    "tube-thoracostomy": {
      redlineZh: "‘已经放管’不等于问题结束；持续漏气、引流趋势、管路功能、临床反应和并发症必须继续复评。",
      redlineEn: "A drain in place does not end the problem; air leak, output trend, system function, clinical response, and complications need continued reassessment.",
      route: [
        ["辨认胸膜腔问题", "Recognise pleural-space problem", "区分空气、液体及其对通气循环的影响。", "Distinguish air, fluid, and their effects on ventilation and circulation.", "生理影响是什么？", "What is the physiological effect?"],
        ["整合查体与影像", "Integrate examination and imaging", "患者、监护、eFAST 与 X-ray 信息放在同一条线。", "Place patient, monitor, eFAST, and X-ray information on one line.", "是否存在不应等待影像的威胁？", "Is there a threat that should not wait for imaging?"],
        ["明确团队目标", "Define team goal", "明确排气、引流、持续监测和并行复苏目标。", "Define evacuation, drainage, monitoring, and parallel resuscitation goals.", "目标是否被团队共享？", "Is the goal shared by the team?"],
        ["认证技能站演练", "Authorised station drill", "无菌、团队暂停和系统连接在训练器中演练。", "Asepsis, team pause, and system connection are rehearsed on a trainer.", "流程是否依本地清单执行？", "Is the local checklist followed?"],
        ["确认系统与复评", "Confirm system and reassess", "看患者、管路、持续漏气、引流趋势和床旁影像。", "Check patient, tubing, ongoing air leak, output trend, and bedside imaging.", "未改善时先检查什么？", "What is checked first if the patient does not improve?"]
      ],
      evidence: [
        evidence("胸腔引流不是所有气胸的唯一答案", "A drain is not the only answer to every pneumothorax", "呼吸/循环受损和正压通气情境尤其需要团队评估；小而孤立者可能有其他路径。", "Respiratory/circulatory compromise and positive-pressure ventilation need particular team assessment; small isolated injuries may follow other paths.", "不能把一个诊断标签自动转换为同一装置。", "One diagnostic label cannot automatically map to one device.", ["S-WSES-AAST-THORACIC-2025"]),
        evidence("危及生命时不等影像", "Life threat should not wait for imaging", "影像应紧急获取和即时解释，但不稳定生理优先。", "Imaging should be urgent and interpreted immediately, but unstable physiology comes first.", "公开页不提供切口位置、器材规格或推进深度。", "The public page gives no incision site, device specification, or insertion depth.", ["S-NICE-NG39"]),
        evidence("置管后仍是动态任务", "Post-placement remains dynamic", "持续评价患者反应、漏气、引流、连接和并发症。", "Continue to evaluate response, air leak, output, connection, and complications.", "器材规格、系统和抗菌策略留给本院协议。", "Device specification, system, and antimicrobial strategy remain local protocol items.", ["S-WSES-AAST-THORACIC-2025"])
      ],
      storyboard: [
        scene("illustrations/chest-trauma-mini-vivid.png", "胸膜腔问题", "Pleural-space problem", "00:55", "空气与液体如何影响通气和循环。", "How air and fluid affect ventilation and circulation.", "患者最需要解决的生理问题是什么？", "What physiological problem most needs solving?"),
        scene(art["tube-thoracostomy"], "安全文化与团队", "Safety culture and team", "01:50", "技能站全景呈现团队暂停、无菌、连接和职责。", "A full trainer view shows team pause, asepsis, connection, and roles.", "哪些内容必须来自本院清单？", "Which items must come from the local checklist?"),
        scene("illustrations/node-reassessment-vivid.png", "系统与患者复评", "System and patient reassessment", "01:25", "展示通畅、持续漏气和未改善三分支。", "Show patent, ongoing-air-leak, and no-improvement branches.", "患者恶化时为什么先看患者再看装置？", "Why look at the patient before the device when deterioration occurs?")
      ],
      simulation: { titleZh: "置管后再次气促：患者还是系统？", titleEn: "Recurrent dyspnoea after drain placement: patient or system?", stages: [
        stage("T+00", "胸部损伤", "Thoracic injury", "HR 118 · BP 104/70 · RR 26 · SpO₂ 91%", ["坠落伤，左胸痛", "初步处理后短暂改善"], ["Fall with left chest pain", "Brief improvement after initial care"], "整合胸膜腔问题与生理影响。", "Integrate the pleural-space problem and physiology.", "影像显示左侧较大气胸并少量液体，拟正压通气。", "Imaging shows a larger left pneumothorax with a small fluid component; positive-pressure ventilation is planned."),
        stage("T+08", "团队准备", "Team preparation", "HR 120 · BP 102/68 · SpO₂ 90%", ["进入授权胸腔引流技能站路径", "完成角色、无菌、系统与监护核对"], ["Enter the authorised chest-drain station path", "Check roles, asepsis, system, and monitoring"], "说明为什么此时讨论胸腔引流。", "Explain why chest drainage is being discussed now.", "模拟处置后 SpO₂ 96%、RR 21。", "After the simulated intervention, SpO₂ is 96% and RR 21."),
        stage("T+18", "再次气促", "Recurrent dyspnoea", "HR 126 · BP 98/64 · RR 29 · SpO₂ 89%", ["引流波形异常", "患者再次不适"], ["Drain-system waveform appears abnormal", "Patient is symptomatic again"], "先检查患者、连接/管路和再影像，不盲目重复侵入操作。", "Check patient, connections/tubing, and repeat imaging before blindly repeating invasive action.", "复评发现连接问题并被纠正。", "Reassessment identifies and corrects a connection problem."),
        stage("T+22", "交接", "Handoff", "SpO₂ 95% · RR 22", ["仍需监测漏气、引流趋势和并发症", "胸外科路径待本院确认"], ["Air leak, output trend, and complications still need monitoring", "Local thoracic-surgery pathway remains to be confirmed"], "完成结构化交接和未解决问题清单。", "Complete structured handoff and unresolved-problem list.", "病例进入持续观察。", "The case enters ongoing observation.")
      ] }
    },

    efast: {
      redlineZh: "阴性不等于排除；‘本次未见’与‘已排除损伤’必须分开，结果必须回到生理状态、机制和完整影像路径。",
      redlineEn: "Negative does not mean excluded; ‘not seen on this examination’ must be separated from ‘injury excluded’, and the result must return to physiology, mechanism, and the full imaging pathway.",
      route: [
        ["先写临床问题", "Define the clinical question", "明确要回答心包、胸腔或腹腔中的哪一个聚焦问题。", "Define the focused pericardial, pleural, or peritoneal question.", "这个窗口能回答什么？", "What can this window answer?"],
        ["定位并获取窗口", "Locate and acquire windows", "在模拟器完成标准窗口定位与图像获取。", "Acquire standard windows on the simulator.", "图像是否达到可解释质量？", "Is image quality interpretable?"],
        ["区分异常与受限", "Distinguish abnormal from limited", "明确正常、异常、受限/不可判读，不用模糊语言掩盖质量。", "Name normal, abnormal, and limited/indeterminate without hiding quality.", "‘未见’是阴性还是受限？", "Is ‘not seen’ negative or limited?"],
        ["整合而非替代", "Integrate rather than replace", "把结果与机制、血流动力学、查体和其他影像放在同一线路。", "Place the result with mechanism, haemodynamics, examination, and other imaging.", "结果改变了什么，不能回答什么？", "What does the result change, and what can it not answer?"],
        ["重复扫查与交接", "Repeat scan and handoff", "趋势改变时重复扫查或升级影像，并记录窗口与局限。", "Repeat or escalate imaging when trends change and document windows and limits.", "下一轮复评何时发生？", "When is the next reassessment?"]
      ],
      evidence: [
        evidence("检查完整性与记录有最低标准", "Completeness and documentation have minimum criteria", "应记录窗口、图像质量、结果和局限。", "Document windows, image quality, findings, and limitations.", "AIUM 参数不是法律意义上的照护标准，也不替代本地质控。", "The AIUM parameter is not a legal standard of care and does not replace local quality assurance.", ["S-AIUM-EFAST-2023"]),
        evidence("阴性胸部 eFAST 不排除气胸", "Negative chest eFAST does not exclude pneumothorax", "eFAST 只能补充临床评估。", "eFAST supplements clinical assessment.", "不得用一次阴性检查停止复评或完整影像。", "One negative examination must not stop reassessment or complete imaging.", ["S-NICE-NG39"]),
        evidence("FAST 不是 CT 单独筛查器", "FAST is not a stand-alone CT gate", "稳定或对复苏有反应者仍按完整影像路径。", "Stable patients or responders continue along complete imaging pathways.", "阴性 FAST 不能排除腹腔外或腹膜后出血。", "Negative FAST cannot exclude extra-peritoneal or retroperitoneal bleeding.", ["S-NICE-NG39"])
      ],
      storyboard: [
        scene(art.efast, "人体窗口导航", "Body-window navigation", "01:00", "探头移动与对应解剖问题同步。", "Probe movement synchronises with the anatomical question.", "当前窗口真正回答什么？", "What does the current window actually answer?"),
        scene("illustrations/abdominal-injury-mini-vivid.png", "正常、异常与受限", "Normal, abnormal, and limited", "02:00", "每帧标明可见信息和不能回答的问题。", "Each frame states visible information and unanswered questions.", "图像不足时怎样报告才诚实？", "How should an inadequate image be reported honestly?"),
        scene("illustrations/node-reassessment-vivid.png", "时间轴复扫", "Time-axis rescan", "01:30", "首次未见异常但低灌注持续，进入复扫/CT/其他出血源。", "The first scan is negative but hypoperfusion persists, leading to rescan/CT/other bleeding sources.", "如何避免被早期阴性结果锚定？", "How do we avoid anchoring on an early negative result?")
      ],
      simulation: { titleZh: "首次 EFAST 未见明确异常，但灌注趋势恶化", titleEn: "No definite initial EFAST abnormality despite worsening perfusion", stages: [
        stage("T+00", "首次评估", "First assessment", "HR 108 · BP 112/74 · RR 22 · SpO₂ 97%", ["侧撞伤", "腹部压痛不典型"], ["Side-impact collision", "Non-specific abdominal tenderness"], "先定义本次检查要回答的问题。", "First define the question this examination should answer.", "四个腹部窗口未见明确游离液，其中一窗受肠气限制。", "No definite free fluid is seen in four abdominal windows; one is limited by bowel gas."),
        stage("T+03", "结构化报告", "Structured report", "HR 110 · BP 108/70", ["一个窗口受限", "‘本次未见’不能写成‘排除出血’"], ["One window is limited", "‘Not seen this time’ cannot become ‘bleeding excluded’"], "用一句准确语言报告结果和局限。", "Report the result and limitation in one precise sentence.", "12 分钟后生命体征和症状变化。", "Vital signs and symptoms change 12 minutes later."),
        stage("T+12", "趋势改变", "Trend change", "HR 122 · BP 94/62", ["皮肤凉，腹痛加重", "低灌注风险增加"], ["Cool skin and worsening pain", "Hypoperfusion risk increases"], "说明为什么不能被首次阴性结果安抚。", "Explain why the first negative result is not reassuring.", "重复扫查右上腹出现少量新液性暗区。", "Repeat scan shows a small new fluid-like dark area in the right upper quadrant."),
        stage("T+15", "整合决策", "Integrated decision", "HR 124 · BP 92/60", ["结果必须回到机制和生理状态", "另一分支可始终 FAST 阴性但 CT 发现腹膜后/骨盆出血"], ["Result returns to mechanism and physiology", "An alternate branch remains FAST-negative while CT finds retroperitoneal/pelvic bleeding"], "启动进一步出血评估并列出 FAST 不能回答的范围。", "Start further bleeding evaluation and list what FAST cannot answer.", "病例进入完整影像与团队复评。", "The case proceeds to full imaging and team reassessment.")
      ] }
    },

    tourniquet: {
      redlineZh: "止血带针对危及生命的肢体外出血，且直接压迫未能控制；不能外推为躯干或交界区出血的通用方案。",
      redlineEn: "A tourniquet is for life-threatening limb haemorrhage not controlled by direct pressure; it is not a universal solution for torso or junctional bleeding.",
      route: [
        ["识别危及生命出血", "Recognise life-threatening bleeding", "看持续活动性出血、失血速度与全身灌注趋势。", "Read ongoing active bleeding, rate of loss, and whole-body perfusion trend.", "这是肢体还是非肢体出血？", "Is this limb or non-limb bleeding?"],
        ["安全、呼救与压迫", "Safety, help, and pressure", "保持直接压迫并请求资源。", "Maintain direct pressure and call for resources.", "压迫是否真正有效？", "Is pressure actually effective?"],
        ["进入止血带路径", "Enter tourniquet pathway", "仅在危及生命的肢体出血未受控时讨论。", "Discuss only when life-threatening limb bleeding remains uncontrolled.", "适用部位是否正确？", "Is the anatomical context appropriate?"],
        ["受训应用与记录", "Trained application and documentation", "模型演练同时记录应用时间和交接信息。", "The trainer drill includes application time and handoff information.", "时间和装置状态是否被共享？", "Are time and device status shared?"],
        ["确认控制并复评休克", "Confirm control and reassess shock", "观察出血是否停止，同时继续评估循环与其他伤。", "Confirm bleeding control while continuing circulatory and whole-patient assessment.", "设备已上是否等于止血成功？", "Does device placement equal haemorrhage control?"]
      ],
      evidence: [
        evidence("直接压迫是起点", "Direct pressure is the starting point", "先以简单敷料直接压迫控制外出血。", "Start with direct pressure using a simple dressing for external haemorrhage.", "页面不把所有出血都直接导向止血带。", "The page does not route every bleed directly to a tourniquet.", ["S-NICE-NG39"]),
        evidence("适用范围是未受控的致命肢体出血", "Scope is uncontrolled life-threatening limb bleeding", "直接压迫未能控制时，才进入受训止血带路径。", "Enter a trained tourniquet pathway when direct pressure fails to control it.", "躯干和交界区出血需要其他团队路径。", "Torso and junctional bleeding require other team pathways.", ["S-NICE-NG39"]),
        evidence("设备不是终点", "The device is not the endpoint", "确认出血控制、记录时间，并持续观察全身休克。", "Confirm haemorrhage control, record time, and continue whole-body shock assessment.", "ACS Stop the Bleed 是公共急救培训资源，临床边界由专业指南和本院流程支撑。", "ACS Stop the Bleed is public first-aid training; clinical boundaries come from professional guidance and local policy.", ["S-ACS-STOP-THE-BLEED", "S-NICE-NG39"])
      ],
      storyboard: [
        scene(art.tourniquet, "失血速度与休克趋势", "Blood-loss and shock trend", "00:45", "用时间轴表现持续失血如何改变全身状态。", "Use a timeline to show how ongoing loss changes whole-body physiology.", "什么线索提示已是危及生命？", "Which cues suggest life-threatening bleeding?"),
        scene("illustrations/node-prehospital-vivid.png", "场景分支", "Scene branching", "01:20", "压迫有效/无效、肢体/非肢体两组分支。", "Branch by effective/ineffective pressure and limb/non-limb location.", "哪一支才进入止血带讨论？", "Which branch enters tourniquet discussion?"),
        scene("illustrations/node-handoff-vivid.png", "效果、时间与交接", "Effect, time, and handoff", "01:10", "远景模型演练，聚焦出血是否停止、时间和循环复评。", "A wide trainer scene focuses on bleeding cessation, time, and circulatory reassessment.", "交接中最容易漏掉什么？", "What is most easily omitted in handoff?")
      ],
      simulation: { titleZh: "直接压迫后仍持续的肢体大出血", titleEn: "Severe limb bleeding persisting after direct pressure", stages: [
        stage("T+00", "现场", "Scene", "HR 118 · BP 108/70 · RR 24 · SpO₂ 98%", ["工地肢体锐器伤", "持续活动性出血、苍白焦虑"], ["Industrial limb laceration", "Ongoing active bleeding; pale and anxious"], "描述出血事实、部位和全身趋势。", "Describe bleeding facts, location, and systemic trend.", "标准直接压迫后敷料仍持续浸透。", "The dressing continues to soak despite standard direct pressure."),
        stage("T+03", "压迫未控", "Pressure not controlling", "HR 128 · BP 94/60", ["持续失血", "无躯干或交界区伤口"], ["Ongoing blood loss", "No torso or junctional wound"], "维持压迫、呼叫资源并选择由受训者进入止血带路径。", "Maintain pressure, call resources, and select a trained tourniquet pathway.", "模型反馈：活动性出血停止。", "Trainer feedback: active bleeding stops."),
        stage("T+06", "效果核查", "Effect check", "HR 120 · BP 100/66", ["出血停止", "仍需记录时间和评估休克"], ["Bleeding has stopped", "Time documentation and shock assessment remain"], "完成时间记录和结构化交接。", "Document time and complete structured handoff.", "出现干扰分支：新增躯干伤口。", "A distractor branch adds a torso wound."),
        stage("T+08", "边界识别", "Boundary recognition", "HR 122 · BP 98/64", ["躯干伤口不能用肢体止血带解决", "需启动其他出血控制资源"], ["A limb tourniquet cannot treat a torso wound", "Other haemorrhage-control resources are required"], "指出适用边界并回到全身循环复评。", "State the scope boundary and return to whole-body circulatory reassessment.", "病例进入团队复盘。", "The case enters team debrief.")
      ] }
    },

    "pelvic-binder": {
      redlineZh: "骨盆束带是疑似活动性骨盆出血情境中的早期辅助，不是所有骨盆骨折的通用夹板，也不能排除其他出血源。",
      redlineEn: "A pelvic binder is an early adjunct when active pelvic bleeding is suspected; it is not a universal splint for every pelvic fracture and does not exclude other bleeding sources.",
      route: [
        ["机制与低灌注趋势", "Mechanism and hypoperfusion trend", "高能机制、生命体征和皮肤/意识趋势共同提示风险。", "High-energy mechanism, vitals, and skin/consciousness trends indicate risk together.", "是否存在持续失血？", "Is bleeding ongoing?"],
        ["并行寻找出血源", "Search bleeding sources in parallel", "胸、腹、骨盆、长骨和外出血同步评估。", "Assess chest, abdomen, pelvis, long bones, and external bleeding in parallel.", "FAST 阴性排除了什么？", "What does a negative FAST exclude?"],
        ["定位为早期辅助", "Frame as an early adjunct", "理解外部压迫与骨盆环稳定的目的，不把它当万能固定。", "Understand external compression and ring stabilisation without treating it as universal fixation.", "束带解决了全部问题吗？", "Has the binder solved the whole problem?"],
        ["继续复苏与协调", "Continue resuscitation and coordination", "影像、创伤、骨科、介入与手术资源继续并行。", "Imaging, trauma, orthopaedics, intervention, and surgery remain parallel.", "患者走向哪条下一路径？", "Which next pathway fits the patient?"],
        ["复评皮肤与计划", "Reassess skin and plan", "记录位置、皮肤、肢体、生理趋势和移除/替代计划。", "Document position, skin, limbs, physiology, and removal/replacement plan.", "何时由谁复核和调整？", "Who reviews and adjusts, and when?"]
      ],
      evidence: [
        evidence("适用于特定出血风险场景", "Applies to a defined bleeding-risk context", "高能钝性创伤、疑似骨盆骨折活动性出血时进入目的性束带路径。", "A purposeful binder pathway applies to high-energy blunt trauma with suspected active pelvic bleeding.", "骨盆痛或骨折标签本身不是自动触发。", "Pelvic pain or a fracture label alone is not an automatic trigger.", ["S-NICE-NG37"]),
        evidence("辅助而不是终点", "Adjunct, not endpoint", "早期外部压迫可支持骨盆环稳定和早期出血管理。", "Early external compression can support ring stability and early haemorrhage management.", "仍需复苏、影像和确定性止血/固定路径。", "Resuscitation, imaging, and definitive haemorrhage/fixation pathways remain.", ["S-WSES-PELVIC-2017"]),
        evidence("留置和移除需要计划", "Placement and removal need a plan", "在生理允许时尽早由相关专科讨论移除或替代。", "Discuss early removal or replacement with relevant specialists when physiology allows.", "孕妇、老年人和软组织风险需本地校准。", "Pregnancy, older adults, and soft-tissue risk need local calibration.", ["S-NICE-NG37"])
      ],
      storyboard: [
        scene(art["pelvic-binder"], "骨盆环与出血风险", "Pelvic ring and bleeding risk", "00:55", "用受力和出血空间解释为什么是循环问题。", "Use force and bleeding-space concepts to explain the circulatory problem.", "为什么 FAST 阴性不能让团队放心？", "Why can a negative FAST not reassure the team?"),
        scene("illustrations/node-handoff-vivid.png", "团队并行路径", "Parallel team pathway", "01:35", "束带概念定位与监护、影像、专科资源同步。", "Binder concept positioning runs alongside monitoring, imaging, and specialty resources.", "哪些任务不能因束带而停止？", "Which tasks must not stop because a binder is applied?"),
        scene("illustrations/node-reassessment-vivid.png", "辅助不是终点", "Adjunct is not endpoint", "01:20", "改善与未改善两分支都继续寻找出血源和移除计划。", "Both improved and unimproved branches continue source search and removal planning.", "血压改善证明出血源只有骨盆吗？", "Does improved blood pressure prove the pelvis is the only source?")
      ],
      simulation: { titleZh: "FAST 阴性的低血压骨盆创伤", titleEn: "Pelvic trauma with hypotension and a negative FAST", stages: [
        stage("T+00", "高能机制", "High-energy mechanism", "HR 126 · BP 88/56 · RR 25 · SpO₂ 96%", ["摩托车撞击", "骨盆/会阴区疼痛，四肢无大量外出血"], ["Motorcycle collision", "Pelvic/perineal pain; no major limb bleeding"], "列出可能失血腔隙和并行任务。", "List possible bleeding compartments and parallel tasks.", "首轮 FAST 阴性。", "Initial FAST is negative."),
        stage("T+03", "阴性结果", "Negative result", "HR 128 · BP 86/54", ["低灌注仍持续", "FAST 不能排除骨盆/腹膜后出血"], ["Hypoperfusion persists", "FAST cannot exclude pelvic/retroperitoneal bleeding"], "说明为什么不能停止出血源搜索。", "Explain why source search cannot stop.", "团队进入本院骨盆束带路径。", "The team enters the local pelvic-binder pathway."),
        stage("T+06", "应用后", "After application", "HR 120 · BP 96/62", ["血压部分改善但仍心动过速", "改善不能证明唯一出血源"], ["Blood pressure partly improves; tachycardia persists", "Improvement does not prove a single bleeding source"], "继续选择影像或损伤控制路径，并说明取决于生理状态。", "Continue to imaging or damage-control pathway and explain that physiology determines the route.", "皮肤检查和移除/替代计划尚未建立。", "Skin check and removal/replacement plan are not yet documented."),
        stage("T+12", "持续复评", "Ongoing reassessment", "HR 118 · BP 98/64", ["仍需其他出血源评估", "需要专科、皮肤和设备计划"], ["Other bleeding sources still need assessment", "Specialty, skin, and device plans are required"], "完成结构化交接与未解决问题。", "Complete structured handoff and unresolved problems.", "病例进入确定性止血路径。", "The case proceeds to definitive haemorrhage control.")
      ] }
    },

    splinting: {
      redlineZh: "四肢临时固定没有一种万能动作；核心是 xABCDE 优先、固定前后神经血管记录、软组织保护和持续筋膜室复评。",
      redlineEn: "There is no universal extremity-splint action; the core is xABCDE priority, pre/post neurovascular documentation, soft-tissue protection, and ongoing compartment reassessment.",
      route: [
        ["先 xABCDE 再肢体", "xABCDE before the limb", "先处理全身威胁，再定位肢体损伤。", "Treat whole-patient threats before localising limb injury.", "是否有更高优先级威胁？", "Is there a higher-priority threat?"],
        ["固定前完整记录", "Document before splinting", "伤口、畸形、感觉、运动、灌注和硬性血管征。", "Document wound, deformity, sensation, movement, perfusion, and hard vascular signs.", "基线是否可供固定后比较？", "Is there a baseline for post-splint comparison?"],
        ["按伤型选择支持", "Select support by injury pattern", "临时支持方式依损伤模式和场景，不用一个夹板套所有骨折。", "Temporary support depends on injury pattern and setting; one splint does not fit every fracture.", "软组织是否得到保护？", "Are soft tissues protected?"],
        ["固定后立即复查", "Recheck immediately after splinting", "再次记录感觉、运动、灌注、疼痛和肿胀。", "Repeat sensation, movement, perfusion, pain, and swelling.", "与固定前相比发生了什么？", "What changed from baseline?"],
        ["持续复评与转运", "Ongoing reassessment and transfer", "关注进行性疼痛、麻木、肿胀和血管硬性征。", "Watch progressive pain, numbness, swelling, and hard vascular signs.", "何时升级骨科/血管团队？", "When should orthopaedic/vascular teams be escalated?"]
      ],
      evidence: [
        evidence("固定方法由伤型与场景决定", "Splinting depends on injury and setting", "院前长骨固定存在不同选项，不能套用一个装置到所有骨折。", "Prehospital long-bone support has different options; one device cannot cover every fracture.", "复位权限、牵引和具体装置需由本地课程批准。", "Reduction authority, traction, and specific devices require local approval.", ["S-NICE-NG37"]),
        evidence("血管风险不能只看一个末梢指标", "Vascular risk cannot rely on one distal sign", "脉搏缺失、持续出血或扩张性血肿等硬性征需要立即升级。", "Hard signs such as absent pulse, ongoing bleeding, or expanding haematoma require escalation.", "毛细血管再充盈或 Doppler 不能单独排除血管损伤。", "Capillary refill or Doppler alone cannot exclude vascular injury.", ["S-NICE-NG37"]),
        evidence("固定前后都要重复神经血管检查", "Repeat neurovascular checks before and after", "软组织保护、感觉/运动/灌注变化和进行性疼痛是持续任务。", "Soft-tissue protection, sensory/motor/perfusion change, and progressive pain are ongoing tasks.", "脉搏存在不能排除筋膜室风险。", "A present pulse does not exclude compartment risk.", ["S-AO-SURGERY-REFERENCE"])
      ],
      storyboard: [
        scene(art.splinting, "从全身到肢体", "Whole patient to limb", "00:55", "镜头从 xABCDE 转到畸形、创面和灌注。", "The camera moves from xABCDE to deformity, wound, and perfusion.", "什么时候局部操作必须让位于全身复苏？", "When must local care yield to whole-patient resuscitation?"),
        scene("illustrations/node-lab-trends-vivid.png", "神经血管记录", "Neurovascular documentation", "01:30", "点击人体图记录脉搏/灌注、感觉、运动、创面和肿胀。", "An interactive body map records pulse/perfusion, sensation, movement, wound, and swelling.", "哪项必须在固定前留下基线？", "What must be documented before splinting?"),
        scene("illustrations/node-reassessment-vivid.png", "固定后趋势", "Post-splint trend", "01:20", "对比固定前后并加入进行性疼痛和麻木分支。", "Compare before and after, adding progressive pain and numbness branches.", "脉搏仍在为何也要升级？", "Why escalate even when a pulse remains?")
      ],
      simulation: { titleZh: "固定后疼痛加重：不能被‘脉搏仍在’安抚", titleEn: "Worsening pain after splinting despite a present pulse", stages: [
        stage("T+00", "初始评估", "Initial assessment", "HR 104 · BP 118/76", ["摩托车伤，小腿明显畸形伴小创口", "足部温暖、可触及脉搏，感觉稍麻"], ["Motorcycle injury with leg deformity and a small wound", "Foot warm with palpable pulse; mild numbness"], "先完成全身优先评估，再记录固定前神经血管基线。", "Complete whole-patient priorities, then document the pre-splint neurovascular baseline.", "开放伤需保护，临时固定方式由伤型和本地流程决定。", "The open wound needs protection; temporary support depends on injury pattern and local policy."),
        stage("T+06", "固定后", "After splinting", "HR 100 · BP 120/78", ["疼痛下降", "感觉稳定、灌注未恶化"], ["Pain decreases", "Sensation stable; perfusion not worsened"], "重复记录感觉、运动、灌注、疼痛和肿胀。", "Repeat sensation, movement, perfusion, pain, and swelling.", "20 分钟后疼痛明显加重并出现麻木进展。", "Twenty minutes later, pain markedly worsens and numbness progresses."),
        stage("T+20", "警示趋势", "Warning trend", "HR 116 · BP 116/74", ["被动活动痛、麻木加重", "脉搏仍可触及"], ["Pain with passive movement and worsening numbness", "Pulse remains palpable"], "识别筋膜室/神经血管恶化风险并升级，不被脉搏存在安抚。", "Escalate compartment/neurovascular risk and do not be reassured by a present pulse.", "另一分支出现脉搏缺失或持续出血。", "Another branch develops an absent pulse or ongoing bleeding."),
        stage("T+22", "专科协同", "Specialty escalation", "HR 118 · BP 112/72", ["硬性血管征需立即血管-骨科协同", "固定不是终点"], ["Hard vascular signs require immediate vascular-orthopaedic coordination", "Splinting is not the endpoint"], "完成升级、转运和未解决问题交接。", "Complete escalation, transfer, and unresolved-problem handoff.", "病例进入专科接管。", "The case proceeds to specialty care.")
      ] }
    }
  };

  const genericAssessment = (skill) => ({
    scoringMode: "formative-no-cutoff",
    levels: commonLevels,
    domains: (skill.osceZh || []).map((titleZh, index) => ({
      id: `domain-${index + 1}`,
      titleZh,
      titleEn: skill.osceEn[index],
      behavioursZh: ["能用可观察事实表达，而非跳到结论", "能说明效果核查与下一轮复评"],
      behavioursEn: ["Uses observable facts rather than jumping to a conclusion", "States effect checks and the next reassessment"]
    })),
    noteZh: "讨论稿：不计算总分、不设置统一合格线，也不由系统认定独立操作资格。导师只记录本轮行为证据与下一项改进。",
    noteEn: "Discussion draft: no total score, universal cut-off, or system-granted independent practice. The instructor records observed behaviour and one next improvement."
  });

  (window.TRAUMA_SKILLS || []).forEach((skill) => {
    const config = configs[skill.id];
    if (!config) return;
    skill.redlineZh = config.redlineZh;
    skill.redlineEn = config.redlineEn;
    skill.competencyRoute = config.route.map((r, index) => ({
      id: `route-${index + 1}`,
      titleZh: r[0], titleEn: r[1], summaryZh: r[2], summaryEn: r[3], reassessZh: r[4], reassessEn: r[5],
      image: routeImages(routeSets[skill.id])[index]
    }));
    skill.evidenceHighlights = config.evidence;
    skill.storyboard = config.storyboard;
    skill.simulation = { synthetic: true, ...config.simulation };
    skill.clinicalDecision = config.clinicalDecision || null;
    skill.assessment = genericAssessment(skill);
    skill.heroImage = A + art[skill.id];
  });
})();
