(function () {
  window.TRAUMA_SKILL_SOURCES = Object.assign(window.TRAUMA_SKILL_SOURCES || {}, {
    "S-NICE-QS166-2018": {
      title: "NICE QS166 Quality statement 1: Airway management",
      url: "https://www.nice.org.uk/guidance/qs166/chapter/Quality-statement-1-Airway-management"
    },
    "S-DAS-AIRCLIPS-2025": {
      title: "DAS 2025 AirClips education package",
      url: "https://das.uk.com/airclips/"
    }
  });

  const decisions = {
    intubation: {
      ui: {
        kickerZh: "确定性气道决策", kickerEn: "Definitive-airway decision",
        titleZh: "从气道保护风险到客观确认", titleEn: "From airway-protection risk to objective confirmation",
        descriptionZh: "用功能性风险、团队失败计划和持续波形组织高级气道路线。", descriptionEn: "Organise the advanced-airway pathway around functional risk, a team failure plan, and sustained waveform confirmation.",
        signalAriaZh: "当前高级气道决策指标", signalAriaEn: "Current advanced-airway decision signals",
        metricLabelZh: "警报如何进入决策", metricLabelEn: "How alerts enter the decision",
        metricGuardZh: "单一数值不自动触发插管", metricGuardEn: "No single value automatically triggers intubation"
      },
      guardrailZh: "先证明患者不能持续维持气道保护、氧合或通气，或病程提示即将失去控制；单个 GCS、SpO₂ 或一次失败尝试都不能替代功能性判断。",
      guardrailEn: "First establish that airway protection, oxygenation, or ventilation cannot be sustained, or that the trajectory predicts loss of control; one GCS value, SpO₂ value, or failed attempt cannot replace functional assessment.",
      steps: [
        {
          id: "recognise-activate", number: "01", image: "../assets/trauma-skills/realism/intubation.png",
          titleZh: "识别确定性气道需求并启动团队", titleEn: "Recognise definitive-airway need and activate the team",
          enterZh: "气道保护、氧合或通气不能可靠维持，分泌物/面颈部损伤不断加重，或转运与后续治疗期间预计迅速失去气道控制。",
          enterEn: "Airway protection, oxygenation, or ventilation cannot be sustained reliably; secretions or face-neck injury are worsening; or airway control is expected to be lost during transfer or subsequent care.",
          checkZh: "整合意识趋势、咳嗽与分泌物处理能力、呼吸深度、胸廓、SpO₂、循环灌注和可逆原因，不用一个分数自动决定。",
          checkEn: "Integrate consciousness trend, cough and secretion handling, respiratory depth, chest movement, SpO₂, perfusion, and reversible causes rather than using one score automatically.",
          escalateZh: "尽早呼叫具资质高级气道团队，同时继续开放气道、吸引、氧合/通气支持和胸部、循环原因评估。",
          escalateEn: "Activate a credentialed advanced-airway team early while continuing airway opening, suction, oxygenation/ventilation support, and assessment of thoracic and circulatory causes.",
          sourceIds: ["S-NICE-NG39", "S-NICE-QS166-2018"]
        },
        {
          id: "optimise-plan", number: "02", image: "../assets/trauma-skills/realism/intubation.png",
          titleZh: "优化患者并共享主计划与失败计划", titleEn: "Optimise the patient and share primary and failure plans",
          enterZh: "团队已决定进入高级气道路径，但氧合储备、吸引、颈椎风险、循环状态、监护或救援氧合尚需组织。",
          enterEn: "The team has entered the advanced-airway pathway, but oxygenation reserve, suction, cervical risk, circulation, monitoring, or rescue oxygenation still require organisation.",
          checkZh: "完成团队暂停：角色、吸引、颈椎保护、连续监护、循环风险、主要策略、停止条件和救援氧合路径均被复述确认。",
          checkEn: "Complete a team pause with read-back of roles, suction, cervical protection, continuous monitoring, circulatory risk, primary strategy, stopping conditions, and rescue-oxygenation pathway.",
          escalateZh: "若患者继续恶化，缩短讨论并优先维持氧合；任何失败后先问‘能否继续氧合’，而不是无变化地重复尝试。",
          escalateEn: "If deterioration continues, shorten discussion and prioritise oxygenation; after any failure ask whether oxygenation can still be maintained rather than repeating an unchanged attempt.",
          sourceIds: ["S-DAS-INTUBATION-2025", "S-DAS-CSPINE-2024", "S-DAS-EDUCATION-2025"]
        },
        {
          id: "supervised-attempt", number: "03", image: "../assets/trauma-skills/realism/intubation.png",
          titleZh: "受监督模拟：高质量尝试与及时转换", titleEn: "Supervised simulation: high-quality attempt and timely transition",
          enterZh: "具资质操作者、监护和救援资源已经到位，团队共享主计划与失败计划。",
          enterEn: "A credentialed operator, monitoring, and rescue resources are present, and the team shares primary and failure plans.",
          checkZh: "操作过程持续看患者生理状态；若视野、氧合或循环不能维持，按预设停止条件回到救援氧合并转换策略。",
          checkEn: "Continue to observe physiology during the attempt; if view, oxygenation, or circulation cannot be sustained, return to rescue oxygenation and transition strategy at the pre-agreed stopping condition.",
          escalateZh: "插管未成功但仍可氧合时，按授权困难气道路径继续；救援氧合也不能维持时才进入 CICO 危机路径。",
          escalateEn: "If intubation fails but oxygenation is maintained, continue through the authorised difficult-airway pathway; enter the CICO crisis pathway only when rescue oxygenation also cannot be sustained.",
          sourceIds: ["S-DAS-INTUBATION-2025", "S-NICE-NG39"]
        },
        {
          id: "confirm-reassess", number: "04", image: "../assets/trauma-skills/realism/intubation.png",
          titleZh: "客观确认并回到 xABCDE", titleEn: "Confirm objectively and return to xABCDE",
          enterZh: "模拟导管已经置入，但位置、通气效果和插管后循环状态尚未被证明。",
          enterEn: "The simulated tube has been placed, but position, ventilatory effect, and post-intubation circulation have not yet been proven.",
          checkZh: "以与通气相符的持续呼气末二氧化碳波形为核心，结合双侧胸廓、氧合趋势和固定状态；随后立即复查 B/C/D。",
          checkEn: "Centre confirmation on a sustained ventilation-correlated end-tidal carbon-dioxide waveform, combined with bilateral chest movement, oxygenation trend, and device security; then immediately reassess B/C/D.",
          escalateZh: "没有持续波形时不得宣布成功；新发低氧或低血压要同时检查导管、设备、胸部病变和循环问题。",
          escalateEn: "Do not declare success without a sustained waveform; new hypoxaemia or hypotension requires concurrent checks of the tube, equipment, thoracic pathology, and circulation.",
          sourceIds: ["S-RCUK-ALS-2025", "S-DAS-INTUBATION-2025", "S-NICE-NG39"]
        }
      ],
      metricNotes: [
        {
          value: "GCS 8分或更低", labelZh: "气道保护风险警报", labelEn: "GCS 8 or lower: airway-protection alert",
          noteZh: "NICE 质量标准将昏迷列为不能维持气道/通气的重要情境；仍须结合咳嗽、分泌物、通气、氧合和病程，不能作为自动插管按钮。",
          noteEn: "NICE quality standards identify coma as an important context for failure to maintain airway/ventilation; combine cough, secretions, ventilation, oxygenation, and trajectory rather than using an automatic intubation trigger.",
          sourceId: "S-NICE-QS166-2018"
        },
        {
          value: "SpO₂ 持续下降", labelZh: "氧合储备正在耗竭", labelEn: "Oxygenation reserve is being lost",
          noteZh: "下降方向和对支持的反应比一个孤立数值更重要；同时核对信号质量、通气、胸部损伤和灌注。",
          noteEn: "Direction and response to support matter more than one isolated value; also check signal quality, ventilation, thoracic injury, and perfusion.",
          sourceId: "S-NICE-NG39"
        },
        {
          value: "BP 下降趋势", labelZh: "围气道循环风险警报", labelEn: "Peri-airway circulatory-risk alert",
          noteZh: "休克与低灌注需和气道计划并行处理；不存在仅凭一个血压数值自动选择气道装置的规则。",
          noteEn: "Shock and hypoperfusion require parallel management with the airway plan; no single blood-pressure value automatically selects an airway device.",
          sourceId: "S-NICE-NG39"
        },
        {
          value: "无持续 CO₂ 波形", labelZh: "管位未被证明", labelEn: "Placement not proven",
          noteZh: "持续波形是客观确认核心；胸廓起伏、听诊或水汽不能单独替代。RCUK 来源直接适用复苏语境，本课只提取确认原则。",
          noteEn: "A sustained waveform is central to objective confirmation; chest movement, auscultation, or condensation cannot replace it alone. RCUK directly addresses resuscitation; this course extracts the confirmation principle only.",
          sourceId: "S-RCUK-ALS-2025"
        }
      ],
      signalLabels: [
        ["airwayProtection", "气道保护", "Airway protection"],
        ["ventilation", "通气与胸廓", "Ventilation and chest"],
        ["oxygenation", "氧合趋势", "Oxygenation trend"],
        ["circulation", "循环储备", "Circulatory reserve"],
        ["planRescue", "主计划 / 救援计划", "Primary / rescue plan"],
        ["objectiveConfirmation", "客观确认", "Objective confirmation"]
      ],
      stageSignals: [
        {
          airwayProtection: ["受威胁", "Threatened", "caution", "GCS 10，仍可短句回答，但高速机制和病程需持续观察", "GCS 10 with brief responses; high-energy mechanism and trajectory require continued observation"],
          ventilation: ["RR 26，尚有双侧呼吸音", "RR 26; bilateral breath sounds present", "caution", "频率不能代替呼吸深度和保护能力判断", "Rate cannot replace assessment of depth and protection"],
          oxygenation: ["SpO₂ 90%，需看趋势与反应", "SpO₂ 90%; assess trend and response", "caution", "单值是警报，不是自动插管阈值", "A single value is an alert, not an automatic intubation threshold"],
          circulation: ["BP 96/62，循环风险存在", "BP 96/62; circulatory risk present", "caution", "出血源和围气道低血压风险需并行评估", "Bleeding source and peri-airway hypotension risk require parallel assessment"],
          planRescue: ["提前启动高级气道团队", "Activate advanced-airway team early", "good", "形成主计划、失败计划、颈椎和吸引准备", "Build primary and failure plans with cervical and suction preparation"],
          objectiveConfirmation: ["尚未进入确认阶段", "Not yet at confirmation", "neutral", "先定义之后必须用什么证据证明成功", "Define now what evidence will later prove success"]
        },
        {
          airwayProtection: ["明显恶化", "Clearly worsening", "alert", "GCS 7、分泌物增加、咳嗽无力需组合判断", "GCS 7, increasing secretions, and weak cough are interpreted together"],
          ventilation: ["RR 不规则", "Irregular breathing", "alert", "无效通气风险增加，不能只提高氧浓度", "Risk of ineffective ventilation is increasing; oxygen concentration alone is insufficient"],
          oxygenation: ["SpO₂ 86%，下降", "SpO₂ 86%, falling", "alert", "看下降方向和对救援氧合的反应", "Assess the direction and response to rescue oxygenation"],
          circulation: ["BP 90/56，储备下降", "BP 90/56; reserve falling", "alert", "团队需预先分配循环监护与复评责任", "Assign explicit responsibility for circulatory monitoring and reassessment"],
          planRescue: ["角色与失败路径已共享", "Roles and failure path shared", "good", "操作者、助手、颈椎、监护、救援氧合和高级帮助均有责任人", "Operator, assistant, cervical protection, monitoring, rescue oxygenation, and expert help each have an owner"],
          objectiveConfirmation: ["等待持续波形证明", "Awaiting sustained waveform proof", "neutral", "模拟尝试完成不等于位置确认", "Completion of the simulated attempt does not confirm placement"]
        },
        {
          airwayProtection: ["由装置支持但尚待证明", "Device-supported but not yet proven", "caution", "分支结果决定是否真正建立控制", "The branch outcome determines whether control has truly been established"],
          ventilation: ["A：双侧起伏；B：起伏不确定", "A: bilateral rise; B: uncertain movement", "caution", "胸廓是支持证据，但不能单独确认位置", "Chest movement supports but cannot independently confirm placement"],
          oxygenation: ["86→93→96%，改善", "86→93→96%, improving", "good", "改善支持有效，但仍需客观管位证据", "Improvement supports effect but objective placement evidence is still required"],
          circulation: ["暂未释放插管后 BP", "Post-intubation BP not yet released", "neutral", "不能因氧合改善停止循环监测", "Do not stop circulatory monitoring because oxygenation improves"],
          planRescue: ["B 分支必须回到救援氧合", "Branch B must return to rescue oxygenation", "alert", "无持续波形时不能固着于‘已成功’", "Do not fixate on success when no sustained waveform is present"],
          objectiveConfirmation: ["A：持续 CO₂ 波形；B：无持续波形", "A: sustained CO₂ waveform; B: no sustained waveform", "alert", "只有 A 分支有核心客观确认信息", "Only branch A contains the central objective confirmation signal"]
        },
        {
          airwayProtection: ["已建立但需持续监测", "Established but requires continuous monitoring", "good", "移位、阻塞或固定问题可再次失去控制", "Displacement, obstruction, or fixation problems can cause renewed loss of control"],
          ventilation: ["需复查双侧胸廓与波形", "Recheck bilateral chest and waveform", "caution", "任何新低氧都先回到装置、设备和胸部复查", "Any new hypoxaemia prompts tube, equipment, and thoracic checks"],
          oxygenation: ["SpO₂ 96%，当前改善", "SpO₂ 96%, currently improved", "good", "当前改善不能代表全部问题解决", "Current improvement does not mean all problems are solved"],
          circulation: ["BP 82/50，新风险", "BP 82/50; new risk", "alert", "立即回到 C 轴并评估休克、药物/正压影响和胸部原因", "Return to C and assess shock, medication/positive-pressure effects, and thoracic causes"],
          planRescue: ["进入插管后核查与交接", "Enter post-intubation checks and handoff", "good", "记录困难气道、未解决问题和下一责任人", "Document difficult airway, unresolved issues, and next owner"],
          objectiveConfirmation: ["持续波形需持续存在", "Sustained waveform must remain present", "good", "确认是持续任务，不是一次勾选", "Confirmation is continuous, not a one-time checkbox"]
        }
      ],
      reassessmentRows: [
        ["气道保护", "Airway protection", ["受威胁", "明显恶化", "待客观证明", "已建立但需监测"], ["Threatened", "Clearly worsening", "Awaiting objective proof", "Established but monitored"]],
        ["通气 / 胸廓", "Ventilation / chest", ["RR 26", "呼吸不规则", "双侧 / 不确定分支", "持续复查双侧"], ["RR 26", "Irregular", "Bilateral / uncertain branch", "Continue bilateral checks"]],
        ["氧合趋势", "Oxygenation trend", ["90%，警报", "86%，下降", "86→96%，改善", "96%，当前改善"], ["90%, alert", "86%, falling", "86→96%, improving", "96%, currently improved"]],
        ["循环趋势", "Circulation trend", ["96/62", "90/56", "持续监测", "82/50，新风险"], ["96/62", "90/56", "Continue monitoring", "82/50, new risk"]],
        ["客观确认", "Objective confirmation", ["预先定义标准", "等待确认", "持续波形 / 无持续波形", "持续波形仍需保持"], ["Predefine standard", "Awaiting proof", "Sustained / absent waveform", "Waveform must persist"]],
        ["未解决问题", "Unresolved issue", ["病程与出血源", "失败氧合路径", "B 分支位置未证实", "低血压和困难气道交接"], ["Trajectory and bleeding source", "Failed-oxygenation pathway", "Branch B unconfirmed", "Hypotension and difficult-airway handoff"]]
      ],
      branchQuestions: [
        {
          stageIndex: 1,
          promptZh: "患者持续恶化时，最有依据的团队策略是什么？", promptEn: "As deterioration continues, which team strategy is best supported?",
          options: [
            ["best", "由具资质团队进入确定性气道路径；同步管理颈椎、吸引、救援氧合和循环风险", "A credentialed team enters the definitive-airway pathway while managing cervical protection, suction, rescue oxygenation, and circulatory risk", "best-supported", "依据来自功能性气道失败和恶化趋势，而非单一 GCS 或 SpO₂。", "The rationale comes from functional airway failure and trajectory, not one GCS or SpO₂ value."],
            ["score", "只因 GCS 7 就宣布已经满足全部插管条件", "Declare that every intubation condition is met solely because GCS is 7", "incomplete", "GCS 是重要警报，但仍须整合保护能力、分泌物、通气、氧合、循环和病程。", "GCS is an important alert, but protection, secretions, ventilation, oxygenation, circulation, and trajectory still require integration."],
            ["oxygen", "继续提高氧疗装置，暂不处理不规则呼吸和气道保护", "Increase oxygen delivery while deferring irregular breathing and airway-protection problems", "unsafe", "氧浓度不能纠正无效通气或丧失气道保护。", "Oxygen concentration cannot correct ineffective ventilation or loss of airway protection."]
          ]
        },
        {
          stageIndex: 2,
          promptZh: "模拟尝试后，哪一项反馈最有依据？", promptEn: "After the simulated attempt, which feedback is best supported?",
          options: [
            ["waveform", "只有持续 CO₂ 波形并与胸廓和临床反应一致时，才能宣布管位已客观确认", "Declare objective confirmation only with a sustained CO₂ waveform concordant with chest and clinical response", "best-supported", "持续波形处于确认核心，其他体征作为一致性支持。", "The sustained waveform is central; other signs provide concordant support."],
            ["chest", "看到一次胸廓起伏即可结束确认", "End confirmation after seeing one chest rise", "unsafe", "胸廓起伏不能单独排除位置错误或通气失败。", "Chest movement alone cannot exclude malposition or ventilation failure."],
            ["spo2", "SpO₂ 上升就证明导管位置正确", "An SpO₂ rise proves correct tube position", "unsafe", "SpO₂ 有滞后且受既往氧合影响，不能替代持续波形。", "SpO₂ lags and is influenced by prior oxygenation; it cannot replace a sustained waveform."]
          ]
        }
      ]
    },

    cricothyrotomy: {
      ui: {
        kickerZh: "失败气道危机转换", kickerEn: "Failed-airway crisis transition",
        titleZh: "从仍可氧合到 CICO 危机路径", titleEn: "From maintained oxygenation to the CICO crisis pathway",
        descriptionZh: "区分插管困难、救援氧合失败和授权紧急颈前气道转换。", descriptionEn: "Distinguish difficult intubation, failed rescue oxygenation, and authorised emergency front-of-neck airway transition.",
        signalAriaZh: "当前失败气道危机指标", signalAriaEn: "Current failed-airway crisis signals",
        metricLabelZh: "危机信号如何使用", metricLabelEn: "How crisis signals are used",
        metricGuardZh: "一次插管失败不等于紧急颈前气道", metricGuardEn: "One failed intubation does not equal emergency front-of-neck airway"
      },
      guardrailZh: "eFONA 的功能性触发是标准和救援策略都不能维持氧合的 CICO 危机，不是一次插管失败、某个 SpO₂ 数字或预设失败次数。公开课程只训练状态识别、团队转换、受监督模型演练和效果确认。",
      guardrailEn: "The functional trigger for eFONA is a CICO crisis in which standard and rescue strategies cannot sustain oxygenation—not one failed intubation, one SpO₂ value, or a preset attempt count. The public course trains state recognition, team transition, supervised trainer practice, and effect confirmation only.",
      steps: [
        {
          id: "threatened-plan", number: "01", image: "../assets/trauma-skills/realism/cricothyrotomy.png",
          titleZh: "威胁气道：提前组织主计划与救援计划", titleEn: "Threatened airway: organise primary and rescue plans early",
          enterZh: "严重面颈部损伤、进行性肿胀、血液或分泌物增加，提示常规气道控制可能迅速变难。",
          enterEn: "Severe face-neck injury, progressive swelling, or increasing blood and secretions indicate that conventional airway control may rapidly become difficult.",
          checkZh: "持续观察发声、分泌物处理、胸廓、氧合趋势、颈部解剖、颈椎风险和高级帮助到位情况。",
          checkEn: "Continuously assess voice, secretion handling, chest movement, oxygenation trend, neck anatomy, cervical risk, and availability of expert help.",
          escalateZh: "及早启动高级气道和外科支援，但仍先按共享主计划维持氧合；威胁气道不等于已经进入 eFONA。",
          escalateEn: "Activate advanced-airway and surgical support early while maintaining oxygenation through the shared primary plan; a threatened airway is not yet eFONA.",
          sourceIds: ["S-NICE-NG39", "S-DAS-INTUBATION-2025", "S-DAS-CSPINE-2024"]
        },
        {
          id: "failed-but-oxygenatable", number: "02", image: "../assets/trauma-skills/realism/cricothyrotomy.png",
          titleZh: "插管未成功但仍可氧合：回到救援氧合", titleEn: "Intubation unsuccessful but oxygenatable: return to rescue oxygenation",
          enterZh: "插管尚未建立，但面罩或声门上救援仍能产生有效胸廓起伏和可维持的氧合。",
          enterEn: "Intubation is not established, but mask or supraglottic rescue still produces effective chest movement and sustainable oxygenation.",
          checkZh: "确认救援氧合是否真实有效，并按授权困难气道路径转换策略、操作者或设备；避免无变化的重复尝试。",
          checkEn: "Confirm that rescue oxygenation is genuinely effective and transition strategy, operator, or device through the authorised difficult-airway pathway; avoid unchanged repetition.",
          escalateZh: "只有救援氧合也失效，胸廓、波形和氧合趋势共同提示不能维持氧合时，才宣布 CICO 并进入下一层。",
          escalateEn: "Declare CICO and move to the next level only when rescue oxygenation also fails and chest movement, waveform, and oxygenation trend together show that oxygenation cannot be sustained.",
          sourceIds: ["S-NICE-NG39", "S-DAS-INTUBATION-2025"]
        },
        {
          id: "cico-efona", number: "03", image: "../assets/trauma-skills/realism/cricothyrotomy.png",
          titleZh: "CICO 危机：宣布并启动本地授权 eFONA 路径", titleEn: "CICO crisis: declare and activate the authorised local eFONA pathway",
          enterZh: "插管未建立，面罩及声门上救援均不能产生有效通气或维持氧合，生理趋势持续恶化。",
          enterEn: "Intubation is not established, mask and supraglottic rescue cannot produce effective ventilation or sustain oxygenation, and physiology continues to deteriorate.",
          checkZh: "明确宣布危机；并行维持任何可行的救援氧合、呼叫支援、准备本地标准设备、分配监护和记录责任。",
          checkEn: "Declare the crisis explicitly; in parallel maintain any feasible rescue oxygenation, call for help, prepare local standard equipment, and assign monitoring and documentation.",
          escalateZh: "由获授权人员在专用模型和教师监督下训练本院路径；公开页不提供可脱离监督照做的切开步骤、器械规格或深度。",
          escalateEn: "Authorised personnel train the local pathway on a dedicated trainer under supervision; the public page gives no incision steps, device specifications, or depths that could be followed unsupervised.",
          sourceIds: ["S-DAS-INTUBATION-2025", "S-DAS-EDUCATION-2025", "S-DAS-AIRCLIPS-2025"]
        },
        {
          id: "confirm-aftercare", number: "04", image: "../assets/trauma-skills/realism/cricothyrotomy.png",
          titleZh: "证明恢复通气并处理操作后风险", titleEn: "Prove restored ventilation and manage post-procedure risk",
          enterZh: "受监督模型救援已经完成，但通路效果、装置稳定和全身创伤状态仍需确认。",
          enterEn: "The supervised trainer rescue is complete, but pathway effect, device stability, and whole-patient trauma status still require confirmation.",
          checkZh: "寻找持续呼气波形、有效胸廓起伏和氧合改善，并复查出血、阻塞、移位、胸部问题与循环状态。",
          checkEn: "Seek a sustained expiratory waveform, effective chest movement, and improving oxygenation, then reassess bleeding, obstruction, displacement, thoracic problems, and circulation.",
          escalateZh: "没有持续波形或生理反应时不得宣布成功；立即回到装置、设备、胸部和团队救援复查，并完成困难气道交接。",
          escalateEn: "Do not declare success without a sustained waveform or physiological response; immediately recheck the device, equipment, chest, and team rescue, then complete difficult-airway handoff.",
          sourceIds: ["S-RCUK-ALS-2025", "S-DAS-INTUBATION-2025"]
        }
      ],
      metricNotes: [
        {
          value: "一次插管失败", labelZh: "转换警报，不是 eFONA 自动触发", labelEn: "Transition alert, not an automatic eFONA trigger",
          noteZh: "先评估面罩或声门上救援能否维持氧合；失败次数不能替代氧合功能判断。",
          noteEn: "First assess whether mask or supraglottic rescue can sustain oxygenation; attempt count cannot replace functional oxygenation assessment.",
          sourceId: "S-DAS-INTUBATION-2025"
        },
        {
          value: "无有效胸廓起伏", labelZh: "救援通气失败警报", labelEn: "Rescue-ventilation failure alert",
          noteZh: "需和密闭、气道通畅、设备、呼气波形及 SpO₂ 趋势一起判断，不能由一个体征单独宣布 CICO。",
          noteEn: "Interpret with seal, patency, equipment, expiratory waveform, and SpO₂ trend; one sign alone cannot declare CICO.",
          sourceId: "S-DAS-INTUBATION-2025"
        },
        {
          value: "SpO₂ 快速下降", labelZh: "氧合储备耗竭警报", labelEn: "Oxygenation-reserve depletion alert",
          noteZh: "下降速度和对救援氧合的反应最重要；不设置一个适用于所有患者的固定 eFONA 数字阈值。",
          noteEn: "Rate of decline and response to rescue oxygenation are most important; there is no single fixed eFONA number for every patient.",
          sourceId: "S-DAS-INTUBATION-2025"
        },
        {
          value: "持续 CO₂ 波形", labelZh: "救援后通气效果确认", labelEn: "Confirmation of ventilation after rescue",
          noteZh: "持续波形需与胸廓和氧合改善一致；单次读数或装置进入模型不等于成功。RCUK 来源直接适用复苏语境，本课只提取确认原则。",
          noteEn: "A sustained waveform should agree with chest movement and oxygenation improvement; one reading or device passage into a trainer is not success. RCUK directly addresses resuscitation; this course extracts the confirmation principle only.",
          sourceId: "S-RCUK-ALS-2025"
        }
      ],
      signalLabels: [
        ["airwayControl", "气道控制", "Airway control"],
        ["rescueOxygenation", "救援氧合", "Rescue oxygenation"],
        ["chestMovement", "胸廓 / 通气效果", "Chest / ventilatory effect"],
        ["oxygenationTrend", "氧合趋势", "Oxygenation trend"],
        ["teamState", "团队状态", "Team state"],
        ["objectiveConfirmation", "客观确认", "Objective confirmation"]
      ],
      stageSignals: [
        {
          airwayControl: ["受威胁但尚未失控", "Threatened, not yet lost", "caution", "严重面部损伤、声音改变和进行性呼吸困难", "Severe facial injury, voice change, and progressive respiratory difficulty"],
          rescueOxygenation: ["尚可维持", "Currently maintainable", "caution", "提前准备面罩、声门上救援和高级帮助", "Prepare mask, supraglottic rescue, and expert help early"],
          chestMovement: ["RR 30，仍有呼吸动作", "RR 30; breathing movement remains", "caution", "频率本身不能证明通气有效", "Rate alone does not prove effective ventilation"],
          oxygenationTrend: ["SpO₂ 92%，需持续看趋势", "SpO₂ 92%; trend required", "caution", "单值不是 eFONA 触发点", "A single value is not an eFONA trigger"],
          teamState: ["提前共享主计划和救援计划", "Primary and rescue plans shared early", "good", "呼叫高级气道与外科支持", "Activate advanced-airway and surgical support"],
          objectiveConfirmation: ["尚未进入操作后确认", "Not yet at post-procedure confirmation", "neutral", "先定义危机转换与成功证据", "Define crisis transition and evidence of success in advance"]
        },
        {
          airwayControl: ["快速恶化", "Rapidly worsening", "alert", "肿胀、血液和分泌物增加，插管未建立", "Swelling, blood, and secretions increase; intubation not established"],
          rescueOxygenation: ["已无有效救援", "Rescue no longer effective", "alert", "面罩/救援通气不能产生有效反应", "Mask/rescue ventilation cannot produce an effective response"],
          chestMovement: ["胸廓起伏逐渐减弱", "Chest movement progressively weakens", "alert", "同时检查密闭、通畅、设备和胸部问题", "Check seal, patency, equipment, and thoracic problems together"],
          oxygenationTrend: ["SpO₂ 82%，继续下降", "SpO₂ 82%, continuing to fall", "alert", "方向和无法逆转比单个数字更关键", "Direction and failure to reverse matter more than the isolated number"],
          teamState: ["需要从困难气道转换为危机状态", "Transition from difficult airway to crisis state", "alert", "明确宣布并阻断重复无效尝试", "Declare explicitly and interrupt repeated ineffective attempts"],
          objectiveConfirmation: ["无有效胸廓或持续波形", "No effective chest movement or sustained waveform", "alert", "多信号共同支持无法维持氧合", "Multiple signals together support inability to sustain oxygenation"]
        },
        {
          airwayControl: ["CICO 已宣布", "CICO declared", "alert", "插管未建立且救援氧合失效", "Intubation not established and rescue oxygenation has failed"],
          rescueOxygenation: ["继续任何可行的桥接", "Continue any feasible bridge", "alert", "不因准备 eFONA 停止所有氧合尝试", "Do not stop all oxygenation attempts while preparing eFONA"],
          chestMovement: ["仍无有效起伏", "Still no effective rise", "alert", "不能用重复挤压替代危机转换", "Repeated bagging cannot replace crisis transition"],
          oxygenationTrend: ["82→76→69%，快速恶化", "82→76→69%, rapidly worsening", "alert", "合成趋势用于教学，不是通用数值阈值", "Synthetic trend for teaching, not a universal numeric threshold"],
          teamState: ["并行启动本地授权 eFONA 路径", "Local authorised eFONA pathway activated in parallel", "good", "授权操作者、设备、监护、记录和求助均有责任人", "Authorised operator, equipment, monitoring, documentation, and help each have an owner"],
          objectiveConfirmation: ["等待救援后波形与生理反应", "Awaiting post-rescue waveform and physiology", "neutral", "装置进入模型不能单独定义成功", "Device passage into the trainer cannot define success alone"]
        },
        {
          airwayControl: ["已建立但仍可能再次失效", "Established but may fail again", "caution", "需复查稳定、阻塞、移位和出血", "Recheck stability, obstruction, displacement, and bleeding"],
          rescueOxygenation: ["救援后氧合恢复", "Oxygenation recovering after rescue", "good", "继续全身创伤管理而不是停在气道", "Continue whole-patient trauma care rather than stopping at the airway"],
          chestMovement: ["出现有效双侧起伏", "Effective bilateral rise appears", "good", "必须与持续波形和趋势一致", "Must agree with sustained waveform and trend"],
          oxygenationTrend: ["69→78→90%，逐步改善", "69→78→90%, progressively improving", "good", "改善支持有效但不能结束复评", "Improvement supports effect but does not end reassessment"],
          teamState: ["进入操作后核查与困难气道交接", "Post-procedure checks and difficult-airway handoff", "good", "明确监护、装置和转运责任", "Clarify monitoring, device, and transfer responsibility"],
          objectiveConfirmation: ["持续呼气波形", "Sustained expiratory waveform", "good", "与胸廓和氧合改善共同证明通气恢复", "Together with chest and oxygenation improvement, supports restored ventilation"]
        }
      ],
      reassessmentRows: [
        ["气道控制", "Airway control", ["受威胁", "快速恶化", "CICO 已宣布", "已建立但需持续监测"], ["Threatened", "Rapidly worsening", "CICO declared", "Established but continuously monitored"]],
        ["救援氧合", "Rescue oxygenation", ["尚可维持", "已无有效救援", "继续任何可行桥接", "逐步恢复"], ["Maintainable", "No longer effective", "Continue any feasible bridge", "Recovering"]],
        ["胸廓 / 通气", "Chest / ventilation", ["仍有动作", "起伏减弱", "无有效起伏", "有效双侧起伏"], ["Movement present", "Movement weakens", "No effective rise", "Effective bilateral rise"]],
        ["氧合趋势", "Oxygenation trend", ["92%，观察", "82%，下降", "82→69%，快速恶化", "69→90%，改善"], ["92%, observe", "82%, falling", "82→69%, rapidly worsening", "69→90%, improving"]],
        ["团队转换", "Team transition", ["提前规划", "宣布危机", "本地 eFONA 路径", "操作后核查与交接"], ["Plan early", "Declare crisis", "Local eFONA pathway", "Post-procedure checks and handoff"]],
        ["未解决问题", "Unresolved issue", ["病程与颈部风险", "是否真正 CICO", "效果尚待证明", "出血、装置、B/C/D"], ["Trajectory and neck risk", "Is this truly CICO?", "Effect not yet proven", "Bleeding, device, B/C/D"]]
      ],
      branchQuestions: [
        {
          stageIndex: 1,
          promptZh: "插管未建立后，哪项判断最有依据？", promptEn: "After intubation is not established, which judgement is best supported?",
          options: [
            ["function", "先用胸廓、波形和氧合趋势判断面罩或声门上救援是否仍能维持氧合", "Use chest movement, waveform, and oxygenation trend to determine whether mask or supraglottic rescue can still sustain oxygenation", "best-supported", "eFONA 的触发来自无法维持氧合，而不是插管失败本身。", "eFONA is triggered by inability to sustain oxygenation, not intubation failure itself."],
            ["attempt", "因为第一次插管失败，立即把患者定义为 CICO", "Define CICO immediately because the first intubation attempt failed", "unsafe", "失败插管与失败氧合是两个不同状态。", "Failed intubation and failed oxygenation are different states."],
            ["spo2", "等待 SpO₂ 降到预先设定的固定数字再宣布危机", "Wait for SpO₂ to reach a preset fixed number before declaring the crisis", "unsafe", "功能性失败、下降速度和对救援的反应比一个固定数字更重要。", "Functional failure, rate of decline, and response to rescue matter more than a fixed number."]
          ]
        },
        {
          stageIndex: 2,
          promptZh: "多信号均提示无法维持氧合时，最有依据的团队动作是什么？", promptEn: "When multiple signals show oxygenation cannot be sustained, which team action is best supported?",
          options: [
            ["declare", "明确宣布 CICO，阻断无变化的重复尝试，并行启动本地授权 eFONA 路径和任何可行的救援氧合", "Declare CICO, interrupt unchanged repeated attempts, and activate the authorised local eFONA pathway in parallel with any feasible rescue oxygenation", "best-supported", "危机声明、并行分工和授权路径减少任务固着与延误。", "Crisis declaration, parallel roles, and an authorised pathway reduce task fixation and delay."],
            ["repeat", "由同一操作者继续使用相同方法反复尝试", "Have the same operator continue repeated attempts with the same method", "unsafe", "这是无变化重复，未回应持续恶化的氧合功能。", "This is unchanged repetition and does not address worsening oxygenation failure."],
            ["diagram", "根据网页示意图自行实施侵入性步骤，不等待授权人员", "Perform invasive steps independently from the webpage diagram without authorised personnel", "unsafe", "公开教学页不能替代认证训练、本地设备熟悉和临床授权。", "A public teaching page cannot replace credentialed training, local equipment familiarity, and clinical authorisation."]
          ]
        },
        {
          stageIndex: 3,
          promptZh: "受监督模型救援后，什么信息最能支持通气已经恢复？", promptEn: "After supervised trainer rescue, what best supports restored ventilation?",
          options: [
            ["multi", "持续呼气波形、有效双侧胸廓起伏和氧合趋势改善方向一致", "A sustained expiratory waveform, effective bilateral chest movement, and improving oxygenation trend are concordant", "best-supported", "成功需要多源、持续且相互一致的证据。", "Success requires multiple sustained and concordant signals."],
            ["device", "装置已经进入训练模型，因此自动判定成功", "The device entered the trainer, therefore success is automatic", "unsafe", "装置位置本身不能证明有效通气。", "Device position alone cannot prove effective ventilation."],
            ["single", "看到一次 SpO₂ 上升即可结束复评", "End reassessment after one SpO₂ rise", "incomplete", "SpO₂ 有滞后，且装置稳定、出血、阻塞和 B/C/D 仍需复查。", "SpO₂ lags, and device stability, bleeding, obstruction, and B/C/D still require reassessment."]
          ]
        }
      ]
    }
  };

  (window.TRAUMA_SKILLS || []).forEach((skill) => {
    if (decisions[skill.id]) skill.clinicalDecision = decisions[skill.id];
  });
})();
