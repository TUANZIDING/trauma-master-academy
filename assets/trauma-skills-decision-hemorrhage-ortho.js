(function () {
  window.TRAUMA_SKILL_SOURCES = Object.assign(window.TRAUMA_SKILL_SOURCES || {}, {
    "S-ACS-STOP-THE-BLEED": {
      title: "American College of Surgeons STOP THE BLEED training",
      url: "https://www.stopthebleed.org/get-trained/"
    },
    "S-NICE-NG37": {
      title: "NICE NG37 Fractures (complex): assessment and management",
      url: "https://www.nice.org.uk/guidance/ng37/chapter/recommendations"
    },
    "S-AO-PATIENT-ASSESSMENT": {
      title: "AO Surgery Reference: patient assessment and serial neurovascular examination",
      url: "https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-humerus/further-reading/patient-assessment"
    },
    "S-AO-COMPARTMENT": {
      title: "AO Surgery Reference: compartment syndrome",
      url: "https://surgeryreference.aofoundation.org/cmf/reconstruction/further-reading/compartment-syndrome-in-the-leg"
    }
  });

  const decisions = {
    tourniquet: {
      ui: {
        kickerZh: "致命性外出血决策", kickerEn: "Life-threatening external-haemorrhage decision",
        titleZh: "从直接压迫到有边界的止血带路径", titleEn: "From direct pressure to a bounded tourniquet pathway",
        descriptionZh: "先判断是否为危及生命的肢体外出血，再验证控制效果、时间记录和全身循环趋势。", descriptionEn: "First decide whether this is life-threatening external limb bleeding, then verify control, time documentation, and whole-patient circulatory trend.",
        signalAriaZh: "当前止血带病例的六项出血控制信号", signalAriaEn: "Six current bleeding-control signals for the tourniquet case",
        metricLabelZh: "功能性指标与适用边界", metricLabelEn: "Functional indicators and scope",
        metricGuardZh: "不是所有出血都进入止血带路径", metricGuardEn: "Not every bleed enters a tourniquet pathway"
      },
      guardrailZh: "止血带只处理特定部位的危及生命肢体外出血；直接压迫未能控制是 NICE 进入条件。躯干、颈部或深部交界区出血不能套用肢体止血带，装置上肢不等于出血已控制。",
      guardrailEn: "A tourniquet treats life-threatening external haemorrhage in an appropriate limb location; failure of direct pressure is the NICE entry condition. Torso, neck, or deep junctional bleeding cannot be treated with a limb tourniquet, and placing a device does not prove bleeding control.",
      steps: [
        {
          id: "recognise-pressure", number: "01", image: "../assets/trauma-skills/realism/tourniquet.png",
          titleZh: "识别致命性肢体出血并持续直接压迫", titleEn: "Recognise life-threatening limb bleeding and maintain direct pressure",
          enterZh: "出现持续大量活动性肢体外出血，并伴快速浸透、喷射/涌出或全身低灌注方向。", enterEn: "There is ongoing severe external limb bleeding with rapid soak-through, spurting/pooling, or a systemic hypoperfusion trajectory.",
          checkZh: "确认场景安全、出血确实来自可使用肢体止血带的部位，同时观察意识、皮肤、HR/BP 和直接压迫后的反应。", checkEn: "Confirm scene safety and that bleeding arises from a limb location suitable for a limb tourniquet, while observing consciousness, skin, HR/BP, and response to direct pressure.",
          escalateZh: "持续直接压迫并呼救；若直接压迫控制住出血，不因伤口外观夸张自动升级止血带。", escalateEn: "Maintain direct pressure and call for help; if pressure controls bleeding, do not escalate automatically because the wound looks dramatic.",
          sourceIds: ["S-NICE-NG39", "S-ACS-STOP-THE-BLEED"]
        },
        {
          id: "bounded-choice", number: "02", image: "../assets/trauma-skills/realism/tourniquet.png",
          titleZh: "确认压迫失败和解剖适用范围", titleEn: "Confirm pressure failure and anatomical scope",
          enterZh: "重大肢体创伤的危及生命出血在持续有效直接压迫下仍不能控制。", enterEn: "Life-threatening haemorrhage from major limb trauma remains uncontrolled despite sustained effective direct pressure.",
          checkZh: "区分肢体、可填塞伤口和非肢体/交界区问题；公开页不把压迫、填塞和止血带包装成适用于所有伤口的固定顺序。", checkEn: "Differentiate limb bleeding, a packable wound, and non-limb/junctional problems; the public page does not present pressure, packing, and tourniquet use as one fixed sequence for every wound.",
          escalateZh: "只有满足致命性、肢体部位和压迫失败的组合，才由受训人员进入本地授权止血带路径。", escalateEn: "Only the combination of life-threatening severity, limb location, and failed pressure moves trained personnel into the authorised local tourniquet pathway.",
          sourceIds: ["S-NICE-NG39", "S-ACS-STOP-THE-BLEED"]
        },
        {
          id: "apply-verify", number: "03", image: "../assets/trauma-skills/realism/tourniquet.png",
          titleZh: "受监督模型应用并证明出血已控制", titleEn: "Apply on a supervised trainer and prove bleeding control",
          enterZh: "适应场景、操作者训练、获批装置、监护与接收路径均已确认。", enterEn: "The scenario, operator training, approved device, monitoring, and receiving pathway have been confirmed.",
          checkZh: "按装置和本地认证课程完成模型操作；用活动性出血是否停止、装置是否稳定和循环趋势共同验证，而不是只看‘已经套上’。", checkEn: "Perform the trainer task according to the device and local credentialed course; verify by cessation of active bleeding, device stability, and circulatory trend rather than by placement alone.",
          escalateZh: "仍有活动性出血、装置松动/移位或循环继续恶化时，保持现场控制并立即呼叫高级出血控制资源，复核其他出血源。", escalateEn: "If active bleeding persists, the device loosens/migrates, or circulation continues to worsen, maintain scene control, obtain advanced haemorrhage-control help, and reassess other bleeding sources.",
          sourceIds: ["S-ACS-STOP-THE-BLEED", "S-NICE-NG39"]
        },
        {
          id: "time-whole-patient", number: "04", image: "../assets/illustrations/node-reassessment-vivid.png",
          titleZh: "记录时间、持续监测并回到全身复评", titleEn: "Record time, monitor continuously, and return to whole-patient reassessment",
          enterZh: "肢体活动性出血当前已停止，但休克、其他损伤、装置状态和后续责任尚未解决。", enterEn: "Active limb bleeding is currently stopped, but shock, other injuries, device state, and downstream responsibility remain unresolved.",
          checkZh: "明确记录应用时间、装置位置与效果，持续观察再出血、循环、皮肤温度和其他 xABCDE 威胁，并在交接中复述。", checkEn: "Record application time, device location, and effect; continuously observe rebleeding, circulation, skin temperature, and other xABCDE threats, and read them back at handoff.",
          escalateZh: "不得因疼痛自行松解或移除；任何调整、转换或移除都由授权临床团队按本地路径决定。", escalateEn: "Do not loosen or remove it because of pain; adjustment, conversion, or removal belongs to an authorised clinical team under local policy.",
          sourceIds: ["S-ACS-STOP-THE-BLEED", "S-NICE-NG39"]
        }
      ],
      metricNotes: [
        { value: "直接压迫失败", labelZh: "进入止血带讨论的功能性条件", labelEn: "Functional entry condition for tourniquet discussion", noteZh: "NICE 限定为重大肢体创伤中危及生命的出血；它不是以伤口大小、一个 HR 或一个 BP 数值触发。", noteEn: "NICE limits this to life-threatening haemorrhage in major limb trauma; wound size, one HR, or one BP value is not the trigger.", sourceId: "S-NICE-NG39" },
        { value: "肢体 ≠ 躯干/颈部", labelZh: "解剖范围警报", labelEn: "Anatomical-scope alert", noteZh: "肢体止血带不能解决躯干、颈部或深部交界区出血；这些需要其他团队资源。", noteEn: "A limb tourniquet cannot control torso, neck, or deep junctional bleeding; those require other team resources.", sourceId: "S-NICE-NG39" },
        { value: "活动性出血 = 0", labelZh: "模型成功表现", labelEn: "Trainer success appearance", noteZh: "目标是活动性出血停止并能持续维持；装置已经放置但仍渗/涌血属于失败警报。", noteEn: "The goal is cessation of active bleeding that remains controlled; continued oozing or pooling after device placement is a failure alert.", sourceId: "S-ACS-STOP-THE-BLEED" },
        { value: "HR/BP + 复苏反应", labelZh: "全身大出血协议依据", labelEn: "Whole-patient major-haemorrhage context", noteZh: "NICE 建议用血流动力学状态及其对即时复苏的反应，而不是一次风险评分，决定大出血协议；止住一个肢体出血源不能结束全身复评。", noteEn: "NICE uses haemodynamic status and response to immediate resuscitation—not a one-time risk score—to activate major-haemorrhage protocols; controlling one limb source does not end whole-patient reassessment.", sourceId: "S-NICE-NG39" }
      ],
      signalLabels: [
        ["location", "出血部位", "Bleeding location"], ["bleeding", "活动性出血", "Active bleeding"],
        ["perfusion", "全身灌注", "Systemic perfusion"], ["pressureDevice", "压迫 / 装置效果", "Pressure / device effect"],
        ["timeHandoff", "时间与交接", "Time and handoff"], ["wholePatient", "其他出血源与 xABCDE", "Other sources and xABCDE"]
      ],
      stageSignals: [
        {
          location: ["下肢外出血", "External lower-limb bleeding", "caution", "先确认是肢体且适合外部控制", "First confirm a limb source suitable for external control"],
          bleeding: ["持续活动性大量出血", "Ongoing severe active bleeding", "alert", "快速浸透并伴苍白焦虑", "Rapid soak-through with pallor and anxiety"],
          perfusion: ["HR 118，BP 108/70", "HR 118; BP 108/70", "caution", "尚需看方向与对控制的反应", "Direction and response to control are still needed"],
          pressureDevice: ["正在直接压迫", "Direct pressure in progress", "caution", "不能过早移开去反复查看", "Do not repeatedly lift pressure to inspect"],
          timeHandoff: ["尚无装置时间", "No device time yet", "neutral", "先记录伤情和已做措施", "Record injury and attempted measures first"],
          wholePatient: ["全身初评未完成", "Whole-patient survey incomplete", "caution", "肢体伤不能遮蔽其他致命威胁", "The limb injury must not hide other lethal threats"]
        },
        {
          location: ["确认重大肢体创伤", "Major limb trauma confirmed", "good", "无躯干或颈部伤口解释当前失血", "No torso or neck wound explains the current loss"],
          bleeding: ["压迫后仍涌血", "Bleeding persists despite pressure", "alert", "满足压迫失败的功能性条件", "Meets the functional failed-pressure condition"],
          perfusion: ["HR 128，BP 94/60", "HR 128; BP 94/60", "alert", "灌注方向恶化，需并行大出血管理", "Worsening perfusion requires parallel major-haemorrhage management"],
          pressureDevice: ["进入授权止血带路径", "Authorised tourniquet pathway entered", "caution", "由受训人员使用获批装置", "Trained personnel use an approved device"],
          timeHandoff: ["准备记录应用时间", "Preparing to record application time", "neutral", "责任明确到具体团队成员", "Assign explicit ownership"],
          wholePatient: ["继续寻找其他来源", "Other sources still being sought", "caution", "不能把全部低血压归因于这一肢体", "Do not attribute all hypotension to this limb"]
        },
        {
          location: ["装置位于授权肢体位置", "Device at authorised limb location", "good", "位置和装置状态可交接", "Location and device state can be handed over"],
          bleeding: ["活动性出血停止", "Active bleeding stopped", "good", "这才是效果证据，不是‘已放置’", "This is effect evidence, not mere placement"],
          perfusion: ["HR 120，BP 100/66", "HR 120; BP 100/66", "caution", "部分改善仍需连续观察", "Partial improvement still needs serial observation"],
          pressureDevice: ["装置稳定，继续可视核查", "Device stable; visual checks continue", "good", "任何松动或再出血都要升级", "Any loosening or rebleeding requires escalation"],
          timeHandoff: ["应用时间已记录", "Application time documented", "good", "交接需复述时间、部位和效果", "Handoff reads back time, site, and effect"],
          wholePatient: ["休克与其他伤仍未排除", "Shock and other injuries remain unresolved", "caution", "继续 C 轴和全身复评", "Continue circulation and whole-patient reassessment"]
        },
        {
          location: ["新增躯干伤口", "New torso wound", "alert", "超出肢体止血带适用范围", "Outside limb-tourniquet scope"],
          bleeding: ["肢体已控，躯干源未控", "Limb controlled; torso source uncontrolled", "alert", "两个出血源必须分开表达", "The two sources must be represented separately"],
          perfusion: ["HR 122，BP 98/64", "HR 122; BP 98/64", "caution", "持续异常不能被一个局部成功安抚", "Persistent abnormality is not reassured by one local success"],
          pressureDevice: ["肢体装置保持核查", "Limb device remains under check", "good", "不把第二个止血带用于躯干", "Do not use another limb tourniquet on the torso"],
          timeHandoff: ["两条问题线分开交接", "Two problem lines handed over separately", "good", "已控与未控必须明确", "Controlled and uncontrolled problems must be explicit"],
          wholePatient: ["升级其他出血控制资源", "Escalate other haemorrhage-control resources", "alert", "回到 xABCDE 和大出血团队路径", "Return to xABCDE and the major-haemorrhage pathway"]
        }
      ],
      reassessmentRows: [
        ["出血部位", "Bleeding location", ["下肢", "重大肢体", "肢体装置位置", "新增躯干源"], ["Lower limb", "Major limb", "Limb-device location", "New torso source"]],
        ["活动性出血", "Active bleeding", ["大量持续", "压迫未控", "已停止", "肢体已控/躯干未控"], ["Severe and ongoing", "Not controlled by pressure", "Stopped", "Limb controlled/torso uncontrolled"]],
        ["灌注趋势", "Perfusion trend", ["118 / 108/70", "128 / 94/60", "120 / 100/66", "122 / 98/64"], ["118 / 108/70", "128 / 94/60", "120 / 100/66", "122 / 98/64"]],
        ["措施效果", "Control effect", ["直接压迫", "压迫失败", "装置有效", "局部成功不等于全身结束"], ["Direct pressure", "Pressure failed", "Device effective", "Local success does not end whole-patient care"]],
        ["时间/交接", "Time/handoff", ["记录已做措施", "准备计时", "时间/部位/效果完整", "两条问题线交接"], ["Record attempted measures", "Prepare time record", "Time/site/effect complete", "Two problem lines handed over"]],
        ["未解决问题", "Unresolved issue", ["严重度和其他伤", "休克和其他来源", "全身循环", "躯干出血控制"], ["Severity and other injuries", "Shock and other sources", "Whole-patient circulation", "Torso haemorrhage control"]]
      ],
      branchQuestions: [
        {
          stageIndex: 1,
          promptZh: "持续直接压迫后仍有致命性肢体大出血，最有依据的下一步是什么？", promptEn: "Life-threatening limb bleeding persists despite sustained direct pressure. What is the best-supported next step?",
          options: [
            ["bounded", "保持压迫、呼叫大出血资源，由受训人员进入本地授权止血带路径，并继续全身复评", "Maintain pressure, call haemorrhage resources, have trained personnel enter the authorised tourniquet pathway, and continue whole-patient reassessment", "best-supported", "同时满足致命性、肢体部位和压迫失败，并保留全身管理。", "This meets severity, limb location, and failed-pressure conditions while preserving whole-patient care."],
            ["all", "任何肉眼可见的出血都立即使用止血带", "Use a tourniquet immediately for every visible bleed", "unsafe", "这会把非致命、非肢体和可由压迫控制的伤口错误合并。", "This incorrectly combines non-life-threatening, non-limb, and pressure-controlled wounds."],
            ["score", "等待一个固定血压阈值出现后再控制出血", "Wait for a fixed blood-pressure threshold before controlling bleeding", "unsafe", "致命性外出血需要立即控制，不能等待单一晚期数值。", "Life-threatening external bleeding requires immediate control and must not wait for one late numeric value."]
          ]
        },
        {
          stageIndex: 2,
          promptZh: "装置已经应用，哪项信息最能证明模型操作有效？", promptEn: "The device has been applied. Which finding best proves trainer effectiveness?",
          options: [
            ["stop", "活动性出血停止、装置稳定，并记录应用时间后继续循环复评", "Active bleeding stops, the device is stable, application time is recorded, and circulation continues to be reassessed", "best-supported", "把机械效果、记录和全身生理连接起来。", "This links mechanical effect, documentation, and whole-patient physiology."],
            ["placed", "只要装置在肢体上就宣布成功", "Declare success whenever the device is on the limb", "unsafe", "放置不等于出血控制。", "Placement does not equal bleeding control."],
            ["pulse", "以远端脉搏是否消失作为唯一成功标准", "Use disappearance of the distal pulse as the sole success criterion", "incomplete", "核心是活动性出血控制和整体趋势，且设备训练/临床路径需本地化。", "The core is active bleeding control and whole-patient trend, with device and clinical pathways localised."]
          ]
        },
        {
          stageIndex: 3,
          promptZh: "肢体出血已控制但发现新增躯干伤口，团队如何表达？", promptEn: "Limb bleeding is controlled but a new torso wound is found. How should the team respond?",
          options: [
            ["separate", "明确‘肢体源已控、躯干源未控’，保持装置核查并升级其他出血控制资源", "State ‘limb source controlled, torso source uncontrolled’, maintain device checks, and escalate other haemorrhage-control resources", "best-supported", "它保留每一条问题线和止血带边界。", "This preserves each problem line and the tourniquet boundary."],
            ["second", "在躯干伤口上再加一个肢体止血带", "Apply another limb tourniquet to the torso wound", "unsafe", "肢体装置不适用于躯干。", "A limb device is not for the torso."],
            ["done", "因为血压略有改善，停止寻找其他出血源", "Stop searching for other bleeding sources because blood pressure improved slightly", "unsafe", "局部改善不能排除其他持续失血。", "Local improvement cannot exclude other ongoing blood loss."]
          ]
        }
      ]
    },
    "pelvic-binder": {
      ui: {
        kickerZh: "骨盆源性出血风险决策", kickerEn: "Pelvic-haemorrhage risk decision",
        titleZh: "从高能机制与低灌注到早期束带辅助", titleEn: "From high-energy mechanism and hypoperfusion to early binder support",
        descriptionZh: "把疑似活动性骨盆出血、正确解剖水平、FAST 边界和确定性止血路径放在同一条复评线上。", descriptionEn: "Place suspected active pelvic bleeding, correct anatomical level, FAST limits, and definitive haemorrhage control on one reassessment pathway.",
        signalAriaZh: "当前骨盆束带病例的六项风险信号", signalAriaEn: "Six current risk signals for the pelvic-binder case",
        metricLabelZh: "范围限定的骨盆风险指标", metricLabelEn: "Scoped pelvic-risk indicators",
        metricGuardZh: "束带是早期辅助，不是诊断或确定性止血", metricGuardEn: "A binder is an early adjunct, not a diagnosis or definitive haemorrhage control"
      },
      guardrailZh: "进入条件是高能钝性创伤后疑似骨盆骨折活动性出血，而不是所有骨盆痛或所有低血压。FAST 阴性不能排除腹腔内或腹膜后出血；束带应用后仍须寻找其他出血源并衔接复苏、影像和确定性止血。",
      guardrailEn: "The entry condition is suspected active bleeding from a pelvic fracture after blunt high-energy trauma—not every pelvic pain or every low blood pressure. A negative FAST cannot exclude intraperitoneal or retroperitoneal haemorrhage; after binder application, continue source search, resuscitation, imaging, and definitive haemorrhage control.",
      steps: [
        {
          id: "suspect", number: "01", image: "../assets/trauma-skills/realism/pelvic-risk.png",
          titleZh: "整合机制、生理和骨盆线索", titleEn: "Integrate mechanism, physiology, and pelvic cues",
          enterZh: "高能钝性创伤伴持续低灌注方向，并有骨盆/会阴机制、疼痛或查体线索，怀疑活动性骨盆源性出血。", enterEn: "High-energy blunt trauma with persistent hypoperfusion plus pelvic/perineal mechanism, pain, or examination cues raises concern for active pelvic bleeding.",
          checkZh: "同时检查可见外出血、胸、腹、骨盆和长骨；结合意识、皮肤、HR/BP、复苏反应和已知抗凝情况，不用一次评分自动触发。", checkEn: "Assess visible external bleeding, chest, abdomen, pelvis, and long bones in parallel; integrate consciousness, skin, HR/BP, response to resuscitation, and known anticoagulation rather than using one score automatically.",
          escalateZh: "若缺少高能机制、活动性出血怀疑或低灌注方向，需先澄清替代诊断，不把束带当所有钝性创伤的默认动作。", escalateEn: "If high-energy mechanism, suspected active bleeding, or hypoperfusion trajectory is absent, clarify alternatives rather than making a binder the default for all blunt trauma.",
          sourceIds: ["S-NICE-NG39", "S-NICE-NG37"]
        },
        {
          id: "bind", number: "02", image: "../assets/trauma-skills/realism/pelvic-risk.png",
          titleZh: "受监督应用：大转子水平而非腰部", titleEn: "Supervised application: greater-trochanter level, not the waist",
          enterZh: "团队确认疑似活动性骨盆出血、装置适用性、操作者训练、移动计划与后续接收能力。", enterEn: "The team confirms suspected active pelvic bleeding, device suitability, operator training, movement plan, and downstream capability.",
          checkZh: "在模型上按获批装置说明和本地清单完成，核查束带围绕大转子水平、位置稳定、皮肤和双下肢状态可复评。", checkEn: "Use the approved device instructions and local checklist on a trainer, confirming greater-trochanter level, stable position, and assessable skin and both lower limbs.",
          escalateZh: "位置过高、装置不合适、皮肤/会阴问题或患者情况不允许时暂停并请创伤/骨科负责人确认；不得反复试验性挤压骨盆。", escalateEn: "Pause for a high position, unsuitable device, skin/perineal concerns, or patient factors and obtain trauma/orthopaedic lead review; do not repeatedly test pelvic stability by compression.",
          sourceIds: ["S-WSES-PELVIC-2017", "S-NICE-NG37"]
        },
        {
          id: "verify-parallel", number: "03", image: "../assets/trauma-skills/realism/pelvic-risk.png",
          titleZh: "验证位置与反应，同时继续寻找出血源", titleEn: "Verify position and response while continuing source search",
          enterZh: "束带已应用，但其位置、皮肤/肢体影响、生理反应和其他出血源仍未解决。", enterEn: "The binder has been applied, but position, skin/limb effects, physiological response, and other bleeding sources remain unresolved.",
          checkZh: "重复记录 HR/BP/灌注、束带水平与完整性、皮肤、感觉/运动/灌注，并按稳定性选择紧急影像或损伤控制路径。", checkEn: "Repeat HR/BP/perfusion, binder level and integrity, skin, sensation/movement/perfusion, and select urgent imaging or damage-control pathways according to stability.",
          escalateZh: "FAST 阴性或血压部分改善都不能结束搜索；无反应或再恶化时立即升级创伤、骨科、介入/手术与大出血资源。", escalateEn: "Neither a negative FAST nor partial blood-pressure improvement ends the search; absent response or renewed deterioration requires immediate trauma, orthopaedic, interventional/operative, and major-haemorrhage escalation.",
          sourceIds: ["S-NICE-NG39", "S-WSES-PELVIC-2017"]
        },
        {
          id: "definitive-plan", number: "04", image: "../assets/illustrations/node-reassessment-vivid.png",
          titleZh: "衔接确定性止血并建立移除/替代计划", titleEn: "Connect definitive haemorrhage control and a removal/replacement plan",
          enterZh: "患者已进入创伤中心路径；束带仍是临时辅助，确定性止血/固定、皮肤风险和下一责任人尚需明确。", enterEn: "The patient is in the trauma-centre pathway; the binder remains temporary, and definitive haemorrhage/fixation, skin risk, and next ownership need clarification.",
          checkZh: "记录放置时间、位置、皮肤和肢体状态、复苏/影像结果、未解决出血源以及由谁何时复核移除或替代。", checkEn: "Document application time, position, skin and limb status, resuscitation/imaging results, unresolved sources, and who will review removal or replacement and when.",
          escalateZh: "WSES 建议在生理允许时尽早移除或用外固定/确定性稳定替代；2–3 小时软组织警报不能被误写成适用于所有患者的固定自动移除时限。", escalateEn: "WSES advises removal as soon as physiologically justifiable or replacement by external/definitive stabilisation; the 2–3-hour soft-tissue alert must not be rewritten as a fixed automatic removal deadline for every patient.",
          sourceIds: ["S-WSES-PELVIC-2017", "S-NICE-NG37"]
        }
      ],
      metricNotes: [
        { value: "高能钝性 + 疑似活动性出血", labelZh: "NICE 束带进入范围", labelEn: "NICE binder-entry scope", noteZh: "适用于怀疑骨盆骨折活动性出血的特定情境；骨盆痛、骨折标签或单个低血压值本身不是自动按钮。", noteEn: "Applies to the defined context of suspected active bleeding from pelvic fracture; pelvic pain, a fracture label, or one low BP value alone is not an automatic button.", sourceId: "S-NICE-NG37" },
        { value: "FAST− ≠ 排除", labelZh: "腹膜后/腹腔内出血边界", labelEn: "Retroperitoneal/intraperitoneal bleeding boundary", noteZh: "NICE 明确指出阴性 FAST 不能排除腹腔内或腹膜后出血，不能因此停止骨盆或其他出血源评估。", noteEn: "NICE explicitly states that a negative FAST does not exclude intraperitoneal or retroperitoneal haemorrhage, so pelvic and other source assessment must continue.", sourceId: "S-NICE-NG39" },
        { value: "大转子水平", labelZh: "装置位置核查", labelEn: "Device-position check", noteZh: "WSES 将正确位置描述为大转子/耻骨联合水平；腰部过高的束带不应被当作有效应用。具体装置按厂家和本地课程。", noteEn: "WSES describes correct positioning around the greater trochanters/symphysis level; a high waist-level binder should not be accepted as effective. Device specifics follow the manufacturer and local course.", sourceId: "S-WSES-PELVIC-2017" },
        { value: "2–3 h", labelZh: "持续压迫的软组织警报", labelEn: "Soft-tissue alert during sustained compression", noteZh: "WSES 报告持续高压 2–3 小时可增加皮肤坏死/压疮风险；它提示尽早专科复核和移除/替代计划，不是脱离生理状态的自动时限。", noteEn: "WSES reports increased skin necrosis/pressure-ulcer risk with sustained high pressure for 2–3 hours; this prompts early specialist review and a removal/replacement plan, not an automatic deadline detached from physiology.", sourceId: "S-WSES-PELVIC-2017" }
      ],
      signalLabels: [
        ["mechanism", "机制与骨盆线索", "Mechanism and pelvic cues"], ["circulation", "循环与复苏反应", "Circulation and response"],
        ["sourceSearch", "并行出血源搜索", "Parallel source search"], ["fastBoundary", "FAST/影像边界", "FAST/imaging boundary"],
        ["binderState", "束带位置与装置", "Binder position and device"], ["skinDefinitive", "皮肤与确定性路径", "Skin and definitive pathway"]
      ],
      stageSignals: [
        {
          mechanism: ["摩托车高能撞击", "High-energy motorcycle impact", "alert", "骨盆/会阴疼痛增加骨盆源风险", "Pelvic/perineal pain raises pelvic-source concern"],
          circulation: ["HR 126，BP 88/56", "HR 126; BP 88/56", "alert", "持续低灌注，需要立即并行复苏", "Persistent hypoperfusion requires immediate parallel resuscitation"],
          sourceSearch: ["无大量肢体外出血", "No major external limb bleeding", "neutral", "仍需胸、腹、骨盆和长骨并行检查", "Chest, abdomen, pelvis, and long bones still require parallel checks"],
          fastBoundary: ["尚未释放 FAST", "FAST not yet released", "neutral", "缺失信息不是阴性", "Unavailable information is not a negative result"],
          binderState: ["尚未应用", "Not yet applied", "neutral", "先确认适用场景和团队计划", "First confirm scope and team plan"],
          skinDefinitive: ["确定性路径未建立", "Definitive pathway not established", "caution", "需提前呼叫创伤中心资源", "Activate trauma-centre resources early"]
        },
        {
          mechanism: ["高能机制与骨盆线索持续", "High-energy mechanism and pelvic cues persist", "alert", "风险没有因一个检查结果消失", "Risk is not erased by one test result"],
          circulation: ["HR 128，BP 86/54", "HR 128; BP 86/54", "alert", "低灌注未改善", "Hypoperfusion has not improved"],
          sourceSearch: ["骨盆/腹膜后仍是候选源", "Pelvis/retroperitoneum remain candidate sources", "alert", "同时保留胸腹及其他来源", "Chest, abdomen, and other sources remain in play"],
          fastBoundary: ["首轮 FAST 阴性", "Initial FAST negative", "caution", "不能排除腹腔内或腹膜后出血", "Does not exclude intraperitoneal or retroperitoneal haemorrhage"],
          binderState: ["进入本地授权束带路径", "Authorised local binder pathway entered", "caution", "按获批装置与移动计划执行", "Use the approved device and movement plan"],
          skinDefinitive: ["需同步建立皮肤与后续计划", "Skin and downstream plans required in parallel", "caution", "束带不是终点", "The binder is not the endpoint"]
        },
        {
          mechanism: ["风险假设仍成立", "Risk hypothesis remains", "caution", "部分反应不能证明唯一病因", "Partial response cannot prove a single cause"],
          circulation: ["HR 120，BP 96/62", "HR 120; BP 96/62", "caution", "部分改善但仍心动过速", "Partial improvement with persistent tachycardia"],
          sourceSearch: ["继续搜索其他出血源", "Continue search for other bleeding sources", "caution", "不能把所有休克归因于骨盆", "Do not attribute all shock to the pelvis"],
          fastBoundary: ["按稳定性选择紧急影像", "Urgent imaging selected by stability", "good", "非反应者只做指导干预所需最少影像", "For non-responders, limit imaging to what directs intervention"],
          binderState: ["大转子水平，装置稳定", "Greater-trochanter level; device stable", "good", "位置和双下肢状态已复查", "Position and both lower limbs rechecked"],
          skinDefinitive: ["皮肤与移除计划尚缺", "Skin and removal plan still missing", "alert", "必须明确下一责任人", "Next ownership must be explicit"]
        },
        {
          mechanism: ["解剖与生理共同交接", "Anatomy and physiology handed over together", "good", "不只交接‘骨盆骨折’标签", "Do not hand over only a pelvic-fracture label"],
          circulation: ["HR 118，BP 98/64", "HR 118; BP 98/64", "caution", "继续大出血与灌注复评", "Continue major-haemorrhage and perfusion reassessment"],
          sourceSearch: ["其他来源仍未全部排除", "Other sources not fully excluded", "caution", "明确已知、未知和担心", "State known, unknown, and concern"],
          fastBoundary: ["完整影像/损伤控制路径衔接", "Full imaging/damage-control pathway connected", "good", "由生理状态决定路线", "Physiology determines the route"],
          binderState: ["位置、时间、装置状态已记录", "Position, time, and device state documented", "good", "交接包含复核责任", "Handoff includes review ownership"],
          skinDefinitive: ["皮肤复查与移除/替代计划建立", "Skin review and removal/replacement plan established", "good", "衔接确定性止血/稳定", "Connected to definitive haemorrhage control/stabilisation"]
        }
      ],
      reassessmentRows: [
        ["机制/骨盆线索", "Mechanism/pelvic cues", ["高能撞击", "持续风险", "风险仍成立", "解剖与生理交接"], ["High-energy impact", "Risk persists", "Hypothesis remains", "Anatomy and physiology handed over"]],
        ["循环趋势", "Circulatory trend", ["126 / 88/56", "128 / 86/54", "120 / 96/62", "118 / 98/64"], ["126 / 88/56", "128 / 86/54", "120 / 96/62", "118 / 98/64"]],
        ["FAST/影像", "FAST/imaging", ["未释放", "FAST 阴性但不排除", "按稳定性选择", "完整路径衔接"], ["Not released", "Negative but not excluding", "Selected by stability", "Complete pathway connected"]],
        ["束带状态", "Binder state", ["未应用", "进入授权路径", "大转子水平/稳定", "时间与状态记录"], ["Not applied", "Authorised pathway", "Greater-trochanter level/stable", "Time and state documented"]],
        ["皮肤/肢体", "Skin/limbs", ["需建立基线", "同步规划", "复查完成但计划缺", "持续复查责任明确"], ["Baseline required", "Plan in parallel", "Rechecked; plan missing", "Ongoing ownership explicit"]],
        ["未解决问题", "Unresolved issue", ["出血源与复苏", "阴性结果边界", "其他来源和确定性止血", "移除/替代与接收责任"], ["Source and resuscitation", "Negative-result boundary", "Other sources and definitive control", "Removal/replacement and ownership"]]
      ],
      branchQuestions: [
        {
          stageIndex: 1,
          promptZh: "低灌注持续但首轮 FAST 阴性，最有依据的团队判断是什么？", promptEn: "Hypoperfusion persists but the initial FAST is negative. What is the best-supported team judgement?",
          options: [
            ["continue", "FAST 阴性不能排除腹腔内或腹膜后出血；继续并行寻找来源，并按本地授权骨盆束带/复苏路径推进", "A negative FAST does not exclude intraperitoneal or retroperitoneal haemorrhage; continue parallel source search and the authorised local binder/resuscitation pathway", "best-supported", "它保留检查边界、病人生理和束带适用范围。", "This preserves the test boundary, patient physiology, and binder scope."],
            ["exclude", "FAST 阴性已经排除骨盆和腹膜后出血", "A negative FAST has excluded pelvic and retroperitoneal bleeding", "unsafe", "这与 NICE 明确建议相反。", "This directly contradicts NICE guidance."],
            ["all", "所有低血压钝性创伤都自动套束带", "Automatically apply a binder to every hypotensive blunt-trauma patient", "unsafe", "束带需要高能机制和疑似活动性骨盆出血的特定场景。", "A binder requires the defined context of high-energy mechanism and suspected active pelvic bleeding."]
          ]
        },
        {
          stageIndex: 2,
          promptZh: "束带应用后血压部分改善，下一步最有依据的是？", promptEn: "Blood pressure partly improves after binder application. What is the best-supported next step?",
          options: [
            ["parallel", "复核大转子水平、皮肤和双下肢，继续寻找其他出血源，并按稳定性衔接影像/确定性止血", "Recheck greater-trochanter level, skin, and both lower limbs; continue other-source search and connect imaging/definitive control according to stability", "best-supported", "束带是辅助，部分改善不证明唯一病因或治疗结束。", "The binder is an adjunct; partial improvement proves neither a single cause nor treatment completion."],
            ["waist", "只要血压改善，即使束带在腰部也视为位置正确", "If blood pressure improves, accept a waist-level binder as correctly positioned", "unsafe", "正确位置仍需独立核查，且血压可受多种并行措施影响。", "Position still requires independent verification, and BP can reflect multiple parallel measures."],
            ["stop", "宣布骨盆是唯一出血源并停止其他检查", "Declare the pelvis the only bleeding source and stop other assessment", "unsafe", "反应不能证明唯一来源。", "Response does not prove a single source."]
          ]
        },
        {
          stageIndex: 3,
          promptZh: "进入转运/确定性路径前，哪项交接最完整？", promptEn: "Before transfer/definitive care, which handoff is most complete?",
          options: [
            ["handoff", "报告机制、循环趋势、FAST 边界、束带时间/大转子水平、皮肤和肢体状态、未解决出血源及移除/替代责任", "Report mechanism, circulatory trend, FAST limits, binder time/greater-trochanter level, skin and limb status, unresolved sources, and removal/replacement ownership", "best-supported", "它把患者、装置和系统责任同时交接。", "This hands over patient, device, and system ownership together."],
            ["label", "只交接‘已上骨盆束带’", "Hand over only ‘pelvic binder applied’", "incomplete", "缺少适应场景、反应、位置、并发症和下一责任人。", "This omits indication, response, position, complications, and next ownership."],
            ["deadline", "不看生理状态，规定所有患者在固定分钟自动移除", "Set one fixed-minute automatic removal rule for every patient regardless of physiology", "unsafe", "指南要求生理允许时由专科计划移除/替代，而非一刀切。", "Guidance requires a specialist removal/replacement plan when physiologically justifiable, not one universal clock rule."]
          ]
        }
      ]
    },
    splinting: {
      ui: {
        kickerZh: "四肢临时固定决策", kickerEn: "Temporary extremity-splint decision",
        titleZh: "从全身优先到固定前后神经血管比较", titleEn: "From whole-patient priority to pre/post neurovascular comparison",
        descriptionZh: "把伤口、畸形、软组织、神经血管基线、固定效果和进行性筋膜室风险组织成连续路线。", descriptionEn: "Organise wound, deformity, soft tissue, neurovascular baseline, splint effect, and evolving compartment risk into one continuous pathway.",
        signalAriaZh: "当前四肢固定病例的六项动态信号", signalAriaEn: "Six dynamic signals for the current extremity-splint case",
        metricLabelZh: "血管与筋膜室风险指标", metricLabelEn: "Vascular and compartment-risk indicators",
        metricGuardZh: "可触及脉搏不等于没有重大风险", metricGuardEn: "A palpable pulse does not mean important risk is absent"
      },
      guardrailZh: "先完成 xABCDE，再处理肢体；固定方法由损伤模式、软组织和本地授权决定。固定前后必须比较神经血管状态。可触及远端脉搏不能排除血管损伤或筋膜室综合征，固定后进行性疼痛、麻木或肿胀需要立即升级。",
      guardrailEn: "Complete xABCDE before the limb; the injury pattern, soft tissue, and local authorisation determine the splint. Compare neurovascular status before and after. A palpable distal pulse excludes neither vascular injury nor compartment syndrome, and progressive pain, numbness, or swelling after splinting requires immediate escalation.",
      steps: [
        {
          id: "whole-patient", number: "01", image: "../assets/trauma-skills/realism/splinting.png",
          titleZh: "先完成全身优先级，再定义肢体问题", titleEn: "Complete whole-patient priorities before defining the limb problem",
          enterZh: "xABCDE 威胁已经识别并正在处理，团队可以在不延误复苏的前提下评估肢体。", enterEn: "xABCDE threats have been identified and are being managed, allowing limb assessment without delaying resuscitation.",
          checkZh: "描述机制、伤口/开放伤、畸形、软组织肿胀、疼痛和污染；明确局部处理是否必须让位于全身复苏。", checkEn: "Describe mechanism, wound/open injury, deformity, soft-tissue swelling, pain, and contamination; state whether local care must yield to whole-patient resuscitation.",
          escalateZh: "灾难性出血、气道/呼吸或循环不稳优先；开放伤、明显失血或缺血肢体同步呼叫创伤、骨科/血管资源。", escalateEn: "Catastrophic bleeding, airway/breathing, or circulatory instability takes priority; open injury, major blood loss, or an ischaemic limb prompts parallel trauma and orthopaedic/vascular help.",
          sourceIds: ["S-NICE-NG39", "S-NICE-NG37", "S-AO-PATIENT-ASSESSMENT"]
        },
        {
          id: "baseline", number: "02", image: "../assets/trauma-skills/realism/splinting.png",
          titleZh: "固定前建立可比较的神经血管基线", titleEn: "Establish a comparable pre-splint neurovascular baseline",
          enterZh: "全身状态允许局部检查，尚未固定或复位。", enterEn: "Whole-patient status permits local examination before splinting or reduction.",
          checkZh: "记录伤口/皮肤、感觉、主动运动、可触及脉搏和其他灌注信息、持续出血/扩张血肿、疼痛及肿胀；意识受损时明确哪些项目不可可靠检查。", checkEn: "Document wound/skin, sensation, active movement, palpable pulse and other perfusion information, ongoing bleeding/expanding haematoma, pain, and swelling; state which items are unreliable when consciousness is impaired.",
          escalateZh: "脉搏缺失、持续失血或扩张性血肿等硬性血管征应立即升级；不得用正常毛细再充盈或 Doppler 单独排除血管损伤。", escalateEn: "Hard vascular signs such as absent pulse, ongoing blood loss, or expanding haematoma require immediate escalation; normal capillary refill or Doppler alone must not exclude vascular injury.",
          sourceIds: ["S-NICE-NG37", "S-AO-PATIENT-ASSESSMENT"]
        },
        {
          id: "supervised-splint", number: "03", image: "../assets/trauma-skills/realism/splinting.png",
          titleZh: "按伤型受监督固定并保护软组织", titleEn: "Splint under supervision according to injury pattern and protect soft tissue",
          enterZh: "伤型、远近关节、软组织/开放伤、设备和操作者权限已经由教师或临床负责人确认。", enterEn: "The injury pattern, adjacent joints, soft tissue/open wound, equipment, and operator authority have been confirmed by the instructor or clinical lead.",
          checkZh: "在模型上使用本地批准的固定方式，保持充分衬垫、避免新的压力点并使损伤部位获得临时稳定；网页不规定特定复位角度、牵引量或材料层数。", checkEn: "Use a locally approved technique on a trainer with adequate padding, no new pressure points, and temporary stability; the webpage does not prescribe fracture-specific reduction angles, traction force, or material layers.",
          escalateZh: "固定过程中若疼痛突增、感觉/运动/灌注恶化或发现硬性血管征，停止将其视为常规技能站并立即升级专科。", escalateEn: "If pain abruptly increases, sensation/movement/perfusion worsens, or a hard vascular sign appears during splinting, stop treating it as a routine skills station and escalate immediately.",
          sourceIds: ["S-NICE-NG37", "S-AO-PATIENT-ASSESSMENT"]
        },
        {
          id: "serial-recheck", number: "04", image: "../assets/illustrations/node-reassessment-vivid.png",
          titleZh: "固定后立即复查，并持续监测筋膜室/血管风险", titleEn: "Recheck immediately after splinting and monitor compartment/vascular risk",
          enterZh: "临时固定已完成，但装置压力、软组织肿胀、神经血管变化和病程方向仍可能改变。", enterEn: "Temporary splinting is complete, but device pressure, soft-tissue swelling, neurovascular findings, and trajectory may still change.",
          checkZh: "立即与固定前比较皮肤、感觉、运动、脉搏/灌注、疼痛和肿胀；转床、影像、转运和任何症状变化后重复并记录。", checkEn: "Immediately compare skin, sensation, movement, pulse/perfusion, pain, and swelling with baseline; repeat and document after transfers, imaging, transport, or symptom change.",
          escalateZh: "进行性超预期疼痛、被动牵伸痛、感觉/运动恶化或肿胀加重即使脉搏仍在也需紧急专科评估；胫骨骨折住院后持续 48 小时保持警觉。", escalateEn: "Progressive disproportionate pain, pain on passive stretch, worsening sensation/movement, or increasing swelling requires urgent specialist assessment even with a pulse; maintain awareness for 48 hours after tibial injury/fixation in hospital.",
          sourceIds: ["S-NICE-NG37", "S-AO-COMPARTMENT"]
        }
      ],
      metricNotes: [
        { value: "无脉 + 持续失血 + 扩张血肿", labelZh: "血管损伤硬性征", labelEn: "Hard signs of vascular injury", noteZh: "NICE 用这些硬性征诊断血管损伤并要求必要对线/关节复位后仍存在时立即手术探查；网页只训练识别和升级。", noteEn: "NICE uses these hard signs to diagnose vascular injury and recommends immediate exploration if they persist after necessary alignment/joint reduction; this page trains recognition and escalation only.", sourceId: "S-NICE-NG37" },
        { value: "毛细再充盈 / Doppler ≠ 排除", labelZh: "单一末梢指标边界", labelEn: "Single distal-sign boundary", noteZh: "NICE 明确不应依赖毛细再充盈或 Doppler 信号排除血管损伤；必须结合硬性征、连续神经血管检查和影像/专科路径。", noteEn: "NICE explicitly says not to rely on capillary refill or Doppler signal to exclude vascular injury; integrate hard signs, serial neurovascular examination, and imaging/specialty pathways.", sourceId: "S-NICE-NG37" },
        { value: "脉搏存在 ≠ 排除筋膜室风险", labelZh: "假性安抚警报", labelEn: "False-reassurance alert", noteZh: "AO 指出远端脉搏存在不能排除筋膜室综合征；进行性疼痛、被动牵伸痛、感觉和运动改变更需关注。", noteEn: "AO states that a distal pulse does not exclude compartment syndrome; progressive pain, pain on passive stretch, and sensory/motor change remain important.", sourceId: "S-AO-COMPARTMENT" },
        { value: "48 h", labelZh: "胫骨骨折住院监测范围", labelEn: "In-hospital tibial-fracture monitoring scope", noteZh: "NICE 要求胫骨骨折伤后或固定后 48 小时保持筋膜室综合征警觉并定期记录；这不是所有肢体伤统一留观时长。", noteEn: "NICE advises awareness and regular recording for compartment syndrome for 48 hours after tibial injury or fixation in hospital; this is not one universal observation duration for every limb injury.", sourceId: "S-NICE-NG37" }
      ],
      signalLabels: [
        ["wholePatient", "全身优先级", "Whole-patient priority"], ["woundTissue", "伤口与软组织", "Wound and soft tissue"],
        ["vascular", "血管与灌注", "Vascular and perfusion"], ["neuro", "感觉与运动", "Sensation and movement"],
        ["painSwelling", "疼痛与肿胀", "Pain and swelling"], ["splintState", "固定状态与复查", "Splint state and recheck"]
      ],
      stageSignals: [
        {
          wholePatient: ["xABCDE 正在完成", "xABCDE in progress", "caution", "局部固定不能延误全身复苏", "Local splinting must not delay whole-patient resuscitation"],
          woundTissue: ["小创口 + 明显畸形", "Small wound plus marked deformity", "alert", "按开放伤保护并呼叫骨科资源", "Protect as an open injury and activate orthopaedic resources"],
          vascular: ["足温暖、脉搏可触及", "Foot warm; pulse palpable", "caution", "只能作为基线，不能排除重要损伤", "A baseline only; it cannot exclude important injury"],
          neuro: ["轻度麻木，运动需记录", "Mild numbness; movement to document", "caution", "固定前留下可比较基线", "Create a comparable pre-splint baseline"],
          painSwelling: ["疼痛与肿胀基线待量化", "Pain and swelling baseline pending", "neutral", "用趋势而非一次描述", "Use a trend rather than one description"],
          splintState: ["尚未固定", "Not yet splinted", "neutral", "先确认伤型、设备与权限", "First confirm injury pattern, equipment, and authority"]
        },
        {
          wholePatient: ["全身状态暂可继续局部处理", "Whole-patient status currently permits local care", "good", "任何恶化都返回 xABCDE", "Any deterioration returns to xABCDE"],
          woundTissue: ["伤口已无菌覆盖，软组织受保护", "Wound covered; soft tissue protected", "good", "不在急诊反复探查/冲洗开放长骨伤", "Do not repeatedly explore/irrigate an open long-bone wound in ED"],
          vascular: ["脉搏/温度未恶化", "Pulse/temperature not worsened", "good", "仍需固定后立即比较", "Immediate post-splint comparison still required"],
          neuro: ["感觉稳定，可主动活动远端", "Sensation stable; distal active movement present", "good", "记录具体神经功能而非只写‘正常’", "Record specific function rather than only ‘normal’"],
          painSwelling: ["疼痛下降，肿胀可监测", "Pain reduced; swelling monitorable", "good", "下降不结束后续复评", "Improvement does not end serial reassessment"],
          splintState: ["受监督固定完成", "Supervised splint complete", "good", "检查衬垫、压力点和损伤稳定", "Check padding, pressure points, and injury stability"]
        },
        {
          wholePatient: ["生命体征暂稳定", "Vitals currently stable", "neutral", "局部恶化仍可危及肢体", "Local deterioration can still threaten the limb"],
          woundTissue: ["肿胀加重", "Swelling increasing", "alert", "需同时复查装置压力与筋膜室风险", "Recheck device pressure and compartment risk"],
          vascular: ["脉搏仍可触及", "Pulse remains palpable", "caution", "不能排除筋膜室综合征或重要血管损伤", "Does not exclude compartment syndrome or important vascular injury"],
          neuro: ["麻木进展", "Numbness progressing", "alert", "与固定前比较为明确恶化", "Clear deterioration from baseline"],
          painSwelling: ["超预期疼痛 + 被动牵伸痛", "Disproportionate pain plus pain on passive stretch", "alert", "立即升级而非等待脉搏消失", "Escalate now rather than waiting for pulse loss"],
          splintState: ["固定需立即复核", "Splint requires immediate review", "alert", "不能自行假设只是夹板太紧或只是骨折痛", "Do not assume this is only a tight splint or fracture pain"]
        },
        {
          wholePatient: ["进入专科协同并继续 xABCDE", "Specialty coordination with ongoing xABCDE", "good", "肢体救治与全身状态并行", "Limb care and whole-patient status proceed in parallel"],
          woundTissue: ["开放伤/肿胀完整交接", "Open injury/swelling fully handed over", "good", "记录污染、覆盖和未解决问题", "Document contamination, coverage, and unresolved issues"],
          vascular: ["另一分支：无脉/持续失血", "Alternate branch: absent pulse/ongoing loss", "alert", "硬性血管征立即血管-骨科协同", "Hard vascular signs prompt immediate vascular-orthopaedic coordination"],
          neuro: ["感觉/运动变化已标记", "Sensory/motor change flagged", "alert", "下一责任人知道基线与变化", "Next owner knows baseline and change"],
          painSwelling: ["进行性风险持续监测", "Progressive risk under continued monitoring", "caution", "脉搏存在不能关闭问题线", "A pulse cannot close the problem line"],
          splintState: ["装置、转运和复查计划已交接", "Device, transfer, and recheck plan handed over", "good", "明确何时何人再次检查", "Specify who rechecks and when"]
        }
      ],
      reassessmentRows: [
        ["全身优先级", "Whole-patient priority", ["xABCDE 先行", "暂可局部处理", "局部恶化需升级", "与专科并行"], ["xABCDE first", "Local care currently possible", "Local deterioration escalates", "Parallel with specialty care"]],
        ["伤口/软组织", "Wound/soft tissue", ["小创口/畸形", "覆盖和保护", "肿胀加重", "完整交接"], ["Small wound/deformity", "Covered and protected", "Swelling increasing", "Fully handed over"]],
        ["血管/灌注", "Vascular/perfusion", ["脉搏在，仅为基线", "未恶化", "脉搏在仍不排除", "硬性征分支升级"], ["Pulse present; baseline only", "Not worsened", "Pulse does not exclude", "Hard-sign branch escalated"]],
        ["感觉/运动", "Sensation/movement", ["轻度麻木", "稳定", "麻木进展", "变化已交接"], ["Mild numbness", "Stable", "Numbness progressing", "Change handed over"]],
        ["疼痛/肿胀", "Pain/swelling", ["基线待记录", "一度下降", "超预期/牵伸痛", "持续风险监测"], ["Baseline pending", "Initially reduced", "Disproportionate/stretch pain", "Continued risk monitoring"]],
        ["固定/未解决问题", "Splint/unresolved issue", ["尚未固定", "受监督完成", "需立即复核", "转运/复查责任明确"], ["Not splinted", "Completed under supervision", "Immediate review needed", "Transfer/recheck ownership clear"]]
      ],
      branchQuestions: [
        {
          stageIndex: 0,
          promptZh: "足部温暖且脉搏可触及，固定前最有依据的处理是什么？", promptEn: "The foot is warm with a palpable pulse. What is the best-supported pre-splint action?",
          options: [
            ["baseline", "完成全身优先评估，记录伤口、感觉、运动、脉搏/灌注、疼痛与肿胀基线，再按伤型受监督固定", "Complete whole-patient priorities, document wound, sensation, movement, pulse/perfusion, pain, and swelling baseline, then splint under supervision according to injury pattern", "best-supported", "脉搏是基线的一部分，不是排除所有风险的结论。", "The pulse is one baseline component, not a conclusion that excludes all risk."],
            ["safe", "因为脉搏存在，跳过神经血管记录并直接固定", "Because a pulse is present, skip neurovascular documentation and splint immediately", "unsafe", "失去固定前基线会掩盖固定后变化。", "Losing the pre-splint baseline obscures post-splint change."],
            ["local", "先处理畸形，暂不完成 xABCDE", "Treat the deformity before completing xABCDE", "unsafe", "多发伤中的全身威胁优先。", "Whole-patient threats take priority in polytrauma."]
          ]
        },
        {
          stageIndex: 2,
          promptZh: "固定后疼痛显著加重、被动牵伸痛和麻木进展，但脉搏仍在，最有依据的是？", promptEn: "After splinting there is markedly worse pain, pain on passive stretch, and progressive numbness, but the pulse remains. What is best supported?",
          options: [
            ["escalate", "与固定前比较并立即升级筋膜室/神经血管风险，由骨科/血管团队紧急评估，同时复核固定和全身状态", "Compare with baseline and immediately escalate compartment/neurovascular risk for urgent orthopaedic/vascular assessment while rechecking the splint and whole patient", "best-supported", "可触及脉搏不能排除筋膜室风险，趋势已显示恶化。", "A palpable pulse does not exclude compartment risk, and the trend shows deterioration."],
            ["pulse", "脉搏存在，因此排除筋膜室综合征并常规观察", "Because a pulse is present, exclude compartment syndrome and observe routinely", "unsafe", "这与 AO 明确边界相反。", "This contradicts the explicit AO boundary."],
            ["pain", "把所有疼痛归为正常骨折痛，不与固定前比较", "Attribute all pain to the fracture without comparing baseline", "unsafe", "进行性、超预期和牵伸痛需要识别为警报。", "Progressive, disproportionate, and stretch pain are alerts."]
          ]
        },
        {
          stageIndex: 3,
          promptZh: "另一分支出现无脉、持续出血或扩张性血肿，团队应如何处理？", promptEn: "An alternate branch develops absent pulse, ongoing bleeding, or an expanding haematoma. How should the team respond?",
          options: [
            ["hard", "把它作为硬性血管征立即升级血管-骨科协同；必要对线/关节复位后的处置由授权团队按指南执行", "Treat this as a hard vascular sign and immediately escalate vascular-orthopaedic coordination; authorised teams manage any necessary alignment/joint reduction under guidance", "best-supported", "NICE 将这些列为诊断血管损伤的硬性征。", "NICE lists these as hard signs for vascular injury."],
            ["doppler", "若还能听到 Doppler 信号就排除血管损伤", "Exclude vascular injury if a Doppler signal is still audible", "unsafe", "NICE 明确不应依赖 Doppler 排除。", "NICE explicitly says not to rely on Doppler to exclude injury."],
            ["wait", "等待固定结束和常规影像后再报告", "Wait until splinting and routine imaging are complete before reporting", "unsafe", "硬性征需要即时升级，不能被常规流程延误。", "Hard signs require immediate escalation and must not be delayed by routine workflow."]
          ]
        }
      ]
    }

  };

  (window.TRAUMA_SKILLS || []).forEach((skill) => {
    if (decisions[skill.id]) skill.clinicalDecision = decisions[skill.id];
  });
})();
