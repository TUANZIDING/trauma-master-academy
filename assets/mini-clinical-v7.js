(() => {
const data = {
  "tbi": {
    "file": "tbi-mini",
    "title": [
      "颅脑损伤：从意识变化开始",
      "TBI: begin with changing consciousness"
    ],
    "hook": [
      "意识在下降，先救哪一条生理线？",
      "Consciousness is declining: which physiologic threat comes first?"
    ],
    "chief": [
      "头部撞击后短暂意识丧失，伴反应与语言改变。",
      "Brief loss of consciousness after head impact, with altered response and speech."
    ],
    "history": [
      "电动车碰撞后头部着地；伤前神经状态、确切伤后时间、抗凝用药及过敏史待核实。",
      "Head impact after an e-bike collision; baseline neurology, exact injury time, anticoagulants and allergies need confirmation."
    ],
    "preh": [
      "颈椎保护、氧疗及用药情况原病例未详记；交接时逐项询问，不能假定已完成。",
      "Spinal precautions, oxygen and drugs were not fully documented; verify each during handoff rather than assume completion."
    ],
    "v0": [
      [
        "HR",
        "102",
        "/min"
      ],
      [
        "BP",
        "104/68",
        "mmHg"
      ],
      [
        "RR",
        "22",
        "/min"
      ],
      [
        "SpO₂",
        "93",
        "%"
      ],
      [
        "GCS",
        "14",
        "E4 V4 M6"
      ],
      [
        "T",
        "—",
        "°C"
      ]
    ],
    "v1": [
      [
        "HR",
        "—",
        "/min"
      ],
      [
        "BP",
        "—",
        "mmHg"
      ],
      [
        "RR",
        "—",
        "/min"
      ],
      [
        "SpO₂",
        "—",
        "%"
      ],
      [
        "GCS",
        "12",
        "E3 V4 M5"
      ],
      [
        "T",
        "—",
        "°C"
      ]
    ],
    "time": [
      "35分钟",
      "+35 min"
    ],
    "condition": [
      "氧疗条件与体温未记录；恶化时点未给出的数值不沿用首组。",
      "Oxygen conditions and temperature were not recorded; missing later values are not carried forward."
    ],
    "labs": [
      [
        "床旁血糖",
        "Capillary glucose",
        "5.8 mmol/L"
      ],
      [
        "Na⁺",
        "Na⁺",
        "139 mmol/L"
      ],
      [
        "Hb",
        "Hb",
        "132 g/L"
      ]
    ],
    "labnote": [
      "到院0分钟教学补充，非原始病历结果；这些正常示例不排除颅内进展。血气、凝血与用药背景仍需按临床获得。",
      "Arrival teaching additions, not original records. Normal examples do not exclude intracranial progression; obtain gas, coagulation and drug context as indicated."
    ],
    "priorities": [
      [
        "同步保护气道、纠正低氧与循环问题；记录GCS分项、瞳孔和四肢运动。",
        "Protect airway and correct oxygenation/circulation while recording GCS components, pupils and limb movement."
      ],
      [
        "意识下降或新局灶变化：立即重新xABCDE并联系神经外科；不等所有代谢检查出齐。",
        "Decline or a new focal change requires repeat xABCDE and neurosurgical review without waiting for every metabolic test."
      ],
      [
        "血糖、药物、低氧、低灌注与惊厥后状态并行核对；瞳孔差与运动侧别不能单独定位。",
        "Check glucose, drugs, oxygenation, perfusion and postictal state in parallel; pupil and motor sides alone do not localize a lesion."
      ],
      [
        "下一责任人同时复核神经分项与全身生理，记录干预和氧疗条件。",
        "The next owner reassesses neurologic components and systemic physiology with intervention and oxygen context."
      ]
    ],
    "care": [
      [
        "床旁：保护脑与气道",
        "Bedside: protect brain and airway",
        "先纠正低氧和低灌注，维持颈椎保护；有分泌物处理困难、通气或气道保护不足时由高级团队评估气道。",
        "Correct oxygenation and perfusion while protecting the cervical spine; advanced teams assess airway protection and ventilation when inadequate."
      ],
      [
        "恶化：复查与专科",
        "Decline: re-examine and escalate",
        "新意识、瞳孔或运动变化立即复评并讨论再影像；CT阴性不能替代持续观察。",
        "New mental, pupil or motor changes require urgent reassessment and consideration of repeat imaging; a negative CT does not replace observation."
      ],
      [
        "神经外科/重症：条件性升级",
        "Neurosurgery / ICU: conditional escalation",
        "占位病变、颅压监测、分层颅压治疗与手术由专科结合临床和CT决定；不把常规过度通气作为普遍措施。",
        "Specialists integrate examination and CT for mass lesions, ICP monitoring, tiered therapy and surgery; routine hyperventilation is not a universal measure."
      ]
    ],
    "skills": [
      [
        "trauma-skill.html?id=bvm",
        "气囊面罩通气",
        "BVM"
      ],
      [
        "trauma-skill.html?id=intubation",
        "气道技能",
        "Airway skills"
      ]
    ],
    "sources": [
      [
        "https://www.nice.org.uk/guidance/NG232/chapter/recommendations",
        "NICE NG232 · 1.9.10–1.9.16"
      ],
      [
        "https://www.facs.org/media/vgfgjpfk/best-practices-guidelines-traumatic-brain-injury.pdf",
        "ACS 2024 · Initial management / ICP management"
      ]
    ],
    "releases": [
      [
        "1 · 机制与保护",
        "头部着地并短暂意识丧失，院前颈椎保护状态需确认。",
        "哪些 A/D 轴信息必须在转运时闭环？",
        "1 · Mechanism and protection",
        "Head impact with brief LOC; prehospital c-spine protection status requires confirmation.",
        "Which A/D-axis data need closed-loop transfer?"
      ],
      [
        "2 · 首轮神经查体",
        "GCS 14（E4V4M6），双瞳孔 3 mm 等大灵敏。",
        "请用 E/V/M 分项而不只报总分；还缺什么？",
        "2 · First neuro exam",
        "GCS 14 (E4V4M6); pupils 3 mm, equal and reactive.",
        "Report E/V/M components, not just total; what is still missing?"
      ],
      [
        "3 · 全身生理",
        "SpO₂ 93%，BP 104/68 mmHg，有头皮裂伤但无明显大出血。",
        "为什么氧合和血压也是神经复评的一部分？",
        "3 · Systemic physiology",
        "SpO₂ 93%, BP 104/68 mmHg, scalp wound without major external hemorrhage.",
        "Why are oxygenation and pressure part of neurologic reassessment?"
      ],
      [
        "4 · 第一次 CT",
        "影像显示颞顶部挫伤/少量出血线索，无明显中线移位。",
        "这张影像能否预测 30 分钟后的神经状态？",
        "4 · First CT",
        "Imaging suggests a temporoparietal contusion/small hemorrhage without clear midline shift.",
        "Can this scan predict neurologic status 30 minutes later?"
      ],
      [
        "5 · 意识趋势",
        "35 分钟后 GCS 由 14 降至 12（E3V4M5）。",
        "请先核对低氧、低灌注、低血糖、药物和惊厥后状态，同时不延误颅内恶化评估。",
        "5 · Mental-status trend",
        "After 35 min GCS falls from 14 to 12 (E3V4M5).",
        "Check systemic confounders while urgently assessing intracranial deterioration."
      ],
      [
        "6 · 瞳孔与局灶体征",
        "右瞳孔 4 mm、左侧 3 mm，右上肢对刺激反应较前减弱。",
        "哪一条信息最改变你的升级优先级？",
        "6 · Pupils and focal signs",
        "Right pupil 4 mm vs left 3 mm, with reduced right-arm response.",
        "Which finding most changes escalation priority?"
      ],
      [
        "7 · 再影像/专科节点",
        "临床恶化应触发神经外科评估与适时重复影像，而非等待固定时间表。",
        "请明确哪个床边变化触发了升级。",
        "7 · Re-imaging/specialty node",
        "Clinical decline should trigger neurosurgical review and timely repeat imaging rather than wait for a fixed clock.",
        "Name the bedside change that triggered escalation."
      ],
      [
        "8 · 复评契约",
        "下一次必须同时重复 GCS 分项、瞳孔、四肢运动、SpO₂、BP 和血糖。",
        "请说明责任人、时点与升级红旗。",
        "8 · Reassessment contract",
        "Repeat GCS components, pupils, limb movement, SpO₂, BP, and glucose together.",
        "State owner, timing, and escalation red flags."
      ]
    ]
  },
  "abdomen": {
    "file": "abdominal-injury-mini",
    "title": [
      "腹部损伤：阴性FAST之后发生了什么？",
      "Abdominal injury: what follows a negative FAST?"
    ],
    "hook": [
      "数值曾经尚可，能否继续等待？",
      "An earlier acceptable snapshot: can we keep waiting?"
    ],
    "chief": [
      "侧向撞击后左上腹痛，伴皮肤偏凉。",
      "Left upper abdominal pain after lateral impact, with cool skin."
    ],
    "history": [
      "高能量侧向撞击，左上腹受力；伤后35分钟到院。抗凝药、既往疾病、过敏及进食时间待核实。",
      "High-energy lateral impact to the LUQ; arrival 35 minutes after injury. Verify anticoagulants, comorbidity, allergies and last meal."
    ],
    "preh": [
      "院前处理原病例未详记；核对外出血控制、氧疗、静脉通路、补液或血液、保暖和转运趋势。",
      "Prehospital treatment was not detailed; verify bleeding control, oxygen, access, fluids/blood, warmth and transport trends."
    ],
    "v0": [
      [
        "HR",
        "96",
        "/min"
      ],
      [
        "BP",
        "108/72",
        "mmHg"
      ],
      [
        "RR",
        "24",
        "/min"
      ],
      [
        "SpO₂",
        "96",
        "%"
      ],
      [
        "GCS",
        "—",
        "alert"
      ],
      [
        "T",
        "—",
        "°C"
      ]
    ],
    "v1": [
      [
        "HR",
        "118",
        "/min"
      ],
      [
        "BP",
        "88/56",
        "mmHg"
      ],
      [
        "RR",
        "29",
        "/min"
      ],
      [
        "SpO₂",
        "—",
        "%"
      ],
      [
        "Lactate",
        "4.6",
        "mmol/L"
      ],
      [
        "T",
        "—",
        "°C"
      ]
    ],
    "time": [
      "25分钟",
      "+25 min"
    ],
    "condition": [
      "SpO₂氧疗条件、GCS分项与体温未记录。后组仅显示原病例确实提供的观察值。",
      "Oxygen conditions, GCS components and temperature were not recorded. Later display includes only observations actually given."
    ],
    "labs": [
      [
        "Hb",
        "Hb",
        "128 g/L"
      ],
      [
        "乳酸（首轮）",
        "Initial lactate",
        "2.2 mmol/L"
      ],
      [
        "乳酸（25分钟）",
        "Lactate at +25 min",
        "4.6 mmol/L"
      ]
    ],
    "labnote": [
      "到院Hb与乳酸2.2为教学补充；25分钟乳酸4.6沿用原病例。急性失血早期Hb可仍正常，不能据此排除出血。",
      "Arrival Hb and lactate 2.2 are teaching additions; +25 min lactate 4.6 is retained. An initially normal Hb does not exclude acute bleeding."
    ],
    "priorities": [
      [
        "持续全身xABCDE，比较血压、皮肤灌注与腹部体征；早期正常数值不是放行证。",
        "Continue whole-body xABCDE; compare BP, perfusion and abdomen rather than clear risk from one snapshot."
      ],
      [
        "FAST回答是否见游离液，不能排除实质、肠系膜或腹膜后损伤。",
        "FAST assesses visible free fluid; it does not exclude solid-organ, mesenteric or retroperitoneal injury."
      ],
      [
        "失稳时复苏、血液与止血资源同步启动；不为重复超声或CT延误源控制。",
        "With instability, activate resuscitation, blood and haemostasis together; repeat ultrasound or CT must not delay source control."
      ],
      [
        "稳定允许时用增强CT定位；非手术管理意味着连续观察及可立即升级的资源。",
        "Use contrast CT when stability permits; nonoperative management requires monitoring and immediate escalation capability."
      ]
    ],
    "care": [
      [
        "床旁：寻找并控制出血",
        "Bedside: find and control bleeding",
        "快速xABCDE、通路、保暖、采血及血液准备并行；复苏反应与隐匿出血部位共同决定下一路径。",
        "Run xABCDE, access, warming, blood sampling and blood readiness in parallel; response and occult sources determine the next route."
      ],
      [
        "失稳：手术/介入准备",
        "Instability: prepare haemostasis",
        "持续不稳定或腹膜炎等需立即外科评估；只有生理和资源允许才进入CT，不能把“先CT”设为固定门槛。",
        "Persistent instability or peritonitis warrants urgent surgical assessment; CT requires appropriate physiology and resources, not a fixed prerequisite."
      ],
      [
        "稳定：CT、观察或栓塞",
        "Stability: CT, observation or embolisation",
        "肝脾非手术管理取决于稳定性、伴随损伤及救援能力；血管损伤讨论栓塞，肠道风险继续查体与选择性复查。",
        "Liver/spleen nonoperative care depends on stability, associated injury and rescue capacity; assess vascular injury for embolisation and bowel risk with serial examination and selected repeat imaging."
      ]
    ],
    "skills": [
      [
        "trauma-skill.html?id=efast",
        "EFAST观察窗口",
        "EFAST windows"
      ],
      [
        "chest-trauma-mini.html#cm5-resus",
        "胸部并行排查",
        "Parallel chest assessment"
      ]
    ],
    "sources": [
      [
        "https://link.springer.com/article/10.1186/s13017-020-00302-7",
        "WSES liver 2020 · Diagnosis / NOM / OM"
      ],
      [
        "https://link.springer.com/article/10.1186/s13017-022-00418-y",
        "WSES bowel 2022 · Diagnosis / Table 6"
      ],
      [
        "https://link.springer.com/article/10.1186/s13017-022-00457-5",
        "WSES spleen 2022 · Follow-up consensus"
      ],
      [
        "https://link.springer.com/article/10.1186/s13017-017-0151-4",
        "WSES Splenic Trauma 2017 — acute management"
      ]
    ],
    "releases": [
      [
        "1 · 机制",
        "左上腹承受侧向钝性撞击，无明显外出血。",
        "请列出可能受累区域，但不要现在就锁定某个脏器。",
        "1 · Mechanism",
        "Blunt lateral impact to the left upper abdomen with no major external bleeding.",
        "Name at-risk regions without locking onto one organ."
      ],
      [
        "2 · 首轮生命体征",
        "HR 96，BP 108/72，RR 24，SpO₂ 96%，意识清楚。",
        "一组“尚可”的数值能否结束出血风险评估？",
        "2 · Initial vitals",
        "HR 96, BP 108/72, RR 24, SpO₂ 96%, alert.",
        "Can one acceptable snapshot close hemorrhage assessment?"
      ],
      [
        "3 · 腹部查体",
        "左上腹压痛，暂无明显反跳痛或膨隆。",
        "哪些情况会降低早期查体的敏感性？",
        "3 · Abdominal exam",
        "Left-upper-quadrant tenderness without clear rebound or distension.",
        "What can reduce early examination sensitivity?"
      ],
      [
        "4 · 首次 FAST",
        "未见明确腹腔游离液。",
        "这个结果回答了什么，又没有回答什么？",
        "4 · First FAST",
        "No definite intraperitoneal free fluid.",
        "What has this answered, and what remains unanswered?"
      ],
      [
        "5 · 生理恶化",
        "25 分钟后 HR 118，BP 88/56，RR 29，皮肤湿冷，乳酸 4.6。",
        "现在请重写一句问题表征，并提出立即并行任务。",
        "5 · Physiologic decline",
        "After 25 min: HR 118, BP 88/56, RR 29, cool clammy skin, lactate 4.6.",
        "Rewrite the problem representation and name parallel tasks."
      ],
      [
        "6 · 重复检查",
        "压痛范围扩大，重复 FAST 出现少量液性暗区。",
        "什么改变了风险权重：是单个检查，还是“趋势+新信息”？",
        "6 · Repeat assessment",
        "Tenderness spreads and repeat FAST shows a small fluid pocket.",
        "Did one test change risk, or did trend plus new information do so?"
      ],
      [
        "7 · 解剖定位",
        "当血流动力学允许时，增强 CT 帮助判断实质脏器、空腔脏器和腹膜后风险。",
        "影像定位后，哪些床边趋势仍必须追踪？",
        "7 · Anatomic localization",
        "When physiology permits, contrast CT evaluates solid organ, hollow viscus, and retroperitoneal risk.",
        "Which bedside trends still require follow-up after imaging?"
      ],
      [
        "8 · 复评契约",
        "下一次血压、心率、腹部体征、乳酸/碱剩余和尿量必须有明确责任人与时点。",
        "请说出“谁、何时、看什么、何时升级”。",
        "8 · Reassessment contract",
        "Next BP, HR, abdominal findings, lactate/base deficit, and urine output need an owner and time.",
        "State who, when, what to compare, and what triggers escalation."
      ]
    ]
  },
  "polytrauma": {
    "file": "polytrauma-mini",
    "title": [
      "多发伤：同时救治，持续重新排序",
      "Polytrauma: act together and reprioritise"
    ],
    "hook": [
      "低氧与低灌注同时恶化，谁负责下一步？",
      "Oxygenation and perfusion worsen together: who owns the next action?"
    ],
    "chief": [
      "高速碰撞后多部位疼痛，伴呼吸和意识异常。",
      "Multisite pain after high-speed collision with abnormal breathing and consciousness."
    ],
    "history": [
      "高速机动车碰撞，被困20分钟；头胸腹骨盆均可能受力。确切伤后时间、病史、抗凝及过敏待核实。",
      "High-speed collision with 20-minute entrapment; possible head, chest, abdominal and pelvic injury. Verify injury time, history, anticoagulants and allergies."
    ],
    "preh": [
      "核对脱困过程、颈椎保护、止血与固定、氧疗、用药和血液/补液记录；原病例未给出具体措施，不能虚构已做。",
      "Verify extrication, spinal precautions, bleeding control, splinting, oxygen, drugs and fluids/blood; specific prehospital actions were not supplied."
    ],
    "v0": [
      [
        "HR",
        "126",
        "/min"
      ],
      [
        "BP",
        "86/54",
        "mmHg"
      ],
      [
        "RR",
        "30",
        "/min"
      ],
      [
        "SpO₂",
        "90",
        "%"
      ],
      [
        "GCS",
        "13",
        "components ?"
      ],
      [
        "T",
        "35.4",
        "°C"
      ]
    ],
    "v1": [
      [
        "HR",
        "—",
        "/min"
      ],
      [
        "BP",
        "78/48",
        "mmHg"
      ],
      [
        "RR",
        "—",
        "/min"
      ],
      [
        "SpO₂",
        "87",
        "%"
      ],
      [
        "GCS",
        "—",
        "slower response"
      ],
      [
        "T",
        "—",
        "°C"
      ]
    ],
    "time": [
      "10分钟",
      "+10 min"
    ],
    "condition": [
      "氧疗条件和GCS分项需补问；复评缺失值保持空缺，不能把总分13拆成猜测分项。",
      "Verify oxygen context and GCS components; later missing values stay missing, and a total of 13 is not split into guessed components."
    ],
    "labs": [
      [
        "乳酸",
        "Lactate",
        "5.2 mmol/L"
      ],
      [
        "INR",
        "INR",
        "1.4"
      ],
      [
        "纤维蛋白原",
        "Fibrinogen",
        "1.7 g/L"
      ],
      [
        "离子钙",
        "Ionised calcium",
        "1.05 mmol/L"
      ]
    ],
    "labnote": [
      "到院采样的合成教学补充，非原记录、非治疗阈值。用于讨论灌注、凝血与输血监测；不能等结果才开始救命处置。",
      "Synthetic arrival samples, not original records or treatment thresholds. Use to discuss perfusion, haemostasis and transfusion monitoring without delaying rescue care."
    ],
    "priorities": [
      [
        "领导者明确气道、呼吸与出血威胁，分派人员并行执行，而不是顺序排队。",
        "The leader identifies airway, breathing and bleeding threats and assigns parallel tasks rather than a queue."
      ],
      [
        "复苏与解剖定位同步推进，血液、胸部、腹部、骨盆和长骨来源都保留。",
        "Resuscitation and localisation proceed together; retain blood, chest, abdomen, pelvis and long-bone sources."
      ],
      [
        "10分钟低氧和血压更差即触发重排序；不等完成所有检查或课堂答题。",
        "Worse oxygenation and BP at +10 min trigger reprioritisation without waiting for all tests or quiz completion."
      ],
      [
        "移交前说清责任人、资源到位时间与失败替代路径；不把所有任务交给“团队”。",
        "Handover names owners, resource arrival times and fallback paths rather than assigning everything to “the team”."
      ]
    ],
    "care": [
      [
        "床旁：多条救命任务并行",
        "Bedside: parallel life-saving tasks",
        "外出血控制、气道/氧合、胸部可逆威胁、出血复苏、保暖与监护同步分工；每项行动后回报生理反应。",
        "Assign bleeding control, airway/oxygenation, reversible chest threats, haemorrhage resuscitation, warming and monitoring in parallel; report physiologic response after each action."
      ],
      [
        "止血与影像：按生理选择",
        "Haemostasis / imaging: choose by physiology",
        "持续失稳优先可实施的止血路径；能安全完成才讨论全身CT。伴脑损伤不能直接套用允许性低血压。",
        "Persistent instability prioritises feasible haemostasis; discuss whole-body CT when safe. Do not apply permissive hypotension mechanically with brain injury."
      ],
      [
        "多专科/重症：接续与遗漏伤",
        "Specialists / ICU: continuity and missed injuries",
        "持续追踪灌注、凝血、体温与钙；专科协商源控制，稳定后三级查体、遗漏伤筛查和康复。",
        "Track perfusion, haemostasis, temperature and calcium; coordinate source control, then tertiary survey, missed injuries and rehabilitation after stabilisation."
      ]
    ],
    "skills": [
      [
        "chest-trauma-mini.html#cm6-finger",
        "紧急胸部减压",
        "Emergency chest decompression"
      ],
      [
        "trauma-skill.html?id=pelvic-binder",
        "骨盆束带教学",
        "Pelvic binder teaching"
      ],
      [
        "trauma-skill.html?id=tourniquet",
        "止血带教学",
        "Tourniquet teaching"
      ]
    ],
    "sources": [
      [
        "https://link.springer.com/article/10.1186/s13054-023-04327-7",
        "European bleeding 2023 · R1, R9–11, R13, R18, R31"
      ],
      [
        "https://www.nice.org.uk/guidance/NG39/chapter/recommendations",
        "NICE NG39 · Haemorrhage / Imaging"
      ]
    ],
    "releases": [
      [
        "1 · 高能量机制",
        "高速撞击并被困 20 分钟，多解剖区受累。",
        "请先列生理威胁，再列解剖名称。",
        "1 · High-energy mechanism",
        "High-speed collision with 20-min entrapment and multiple regions at risk.",
        "Name physiologic threats before anatomic labels."
      ],
      [
        "2 · 到院生理",
        "GCS 13，HR 126，BP 86/54，RR 30，SpO₂ 90%，T 35.4℃。",
        "哪些任务不能等待上一项完成？",
        "2 · Arrival physiology",
        "GCS 13, HR 126, BP 86/54, RR 30, SpO₂ 90%, T 35.4°C.",
        "Which tasks cannot wait for the prior one to finish?"
      ],
      [
        "3 · B 轴线索",
        "左侧呼吸音减弱、低氧、胸壁压痛。",
        "请快速区分胸壁、肺实质、气/血胸和气道问题。",
        "3 · B-axis clues",
        "Reduced left breath sounds, hypoxemia, and chest-wall tenderness.",
        "Rapidly separate chest wall, lung, pleural, and airway mechanisms."
      ],
      [
        "4 · C 轴线索",
        "腹部压痛、骨盆风险、股骨畸形与低血压并存。",
        "出血可能同时存在多处；如何避免只追一个源？",
        "4 · C-axis clues",
        "Abdominal tenderness, pelvic risk, femoral deformity, and hypotension coexist.",
        "How do you avoid pursuing only one hemorrhage source?"
      ],
      [
        "5 · D/E 轴线索",
        "GCS 13，瞳孔暂等大，体温 35.4℃，保护状态需重新确认。",
        "哪些变化可能是颅内损伤，哪些可能由低氧/低灌注造成？",
        "5 · D/E-axis clues",
        "GCS 13, pupils currently equal, temperature 35.4°C, and protection status needs reconfirmation.",
        "Which changes may be intracranial and which may reflect hypoxia/hypoperfusion?"
      ],
      [
        "6 · 首轮资源返回",
        "EFAST、血气/乳酸、骨盆固定状态与血液准备各自返回部分信息。",
        "请说出哪个结果改变优先级，哪个只是补充。",
        "6 · First resource returns",
        "EFAST, blood gas/lactate, pelvic stabilization status, and blood preparation each return partial information.",
        "Which result changes priority and which merely adds context?"
      ],
      [
        "7 · 十分钟趋势",
        "BP 78/48，SpO₂ 87%，意识反应较前迟缓。",
        "现在请全队停下 20 秒，重新排序主导风险和并行任务。",
        "7 · Ten-minute trend",
        "BP 78/48, SpO₂ 87%, and slower responses.",
        "Pause the team for 20 seconds and reprioritize threats and parallel tasks."
      ],
      [
        "8 · 闭环契约",
        "每项任务要报告“完成/未完成、结果、对优先级的影响、下一节点”。",
        "请用 60–90 秒完成一次全面交接。",
        "8 · Closed-loop contract",
        "Each task reports completion, result, priority impact, and next node.",
        "Deliver a full 60–90 second handover."
      ]
    ]
  }
}
;
const key=document.body.dataset.miniCase,c=data[key];if(!c)return;
const bi=(z,e)=>`<span class="zh">${z}</span><span class="en">${e}</span>`;
const root=document.querySelector('#case-entry'),slot=root.querySelector('[data-mv-release]');let stage=0,answer=null;
const values=v=>v.map(([k,n,u])=>`<div class="mv-metric"><small>${k}</small><strong>${n}</strong><span>${u}</span></div>`).join('');
function snapshot(n){root.querySelector('[data-mv-vitals]').innerHTML=values(c[n?'v1':'v0']);root.querySelectorAll('[data-mv-snapshot]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.mvSnapshot===n)));root.querySelector('.mv-monitor-head span').innerHTML=n?bi('病例监护 · '+c.time[0],'Case observations · '+c.time[1]):bi('病例监护 · 到院0分钟','Case observations · arrival 0 min');}
root.querySelectorAll('[data-mv-snapshot]').forEach(b=>b.addEventListener('click',()=>snapshot(+b.dataset.mvSnapshot)));
function render(){
const releases=c.releases.slice(stage*2,stage*2+2);
slot.innerHTML=`<div class="mv-release-head"><span>${bi('信息释放','Information release')} ${stage+1} / 4</span><span>${bi('判断与处理同步','Reason and act together')}</span></div><h3>${bi(releases[0][0],releases[0][3])}</h3><div class="mv-facts">${releases.map(r=>`<article><p>${bi(r[1],r[4])}</p><strong>${bi(r[2],r[5])}</strong></article>`).join('')}</div><details><summary>${bi('展开团队优先级与下一次复评','Team priorities and next reassessment')}</summary><p>${bi(...c.priorities[stage])}</p></details><div class="mv-decision"><p>${bi('你会如何处理这些信息？','How will you use this information?')}</p><button class="button" data-mv-answer="1" aria-pressed="${answer===1}">${bi('整合生理、检查与复评','Integrate physiology, findings and reassessment')}</button><button class="button" data-mv-answer="0" aria-pressed="${answer===0}">${bi('用一个正常结果结束判断','Close reasoning with one normal result')}</button><p class="mv-feedback" role="status">${answer===null?bi('先作判断，再核对反馈；不影响病例数据。','Reason first, then check feedback; case data are unchanged.'):answer===1?bi(...c.priorities[stage]):bi('单项检查不能关闭多机制风险。请比较当前趋势、未知项与立即威胁；必要处理不等待下一条信息。','One test cannot close multiple risks. Compare trends, unknowns and immediate threats; needed care does not wait for the next release.')}</p></div><div class="mv-controls"><button class="button" data-mv-action="back" ${stage===0?'disabled':''}>${bi('上一轮','Previous')}</button><button class="button primary" data-mv-action="next" ${stage===3?'disabled':''}>${bi('释放下一轮','Release next')}</button><button class="button" data-mv-action="reset">${bi('重新开始','Restart')}</button></div>`;
slot.querySelectorAll('[data-mv-answer]').forEach(b=>b.addEventListener('click',()=>{answer=+b.dataset.mvAnswer;render();}));
slot.querySelectorAll('[data-mv-action]').forEach(b=>b.addEventListener('click',()=>{let a=b.dataset.mvAction;stage=a==='reset'?0:Math.max(0,Math.min(3,stage+(a==='next'?1:-1)));answer=null;snapshot(stage>=2?1:0);render();}));
}
render();
// Original case, scoring and anchors remain intact inside an instructor disclosure.
const legacy=document.querySelector('.mini-case-expansion');if(legacy){const det=document.createElement('details');det.className='section mv-teacher';det.innerHTML=`<summary>${bi('教师延伸：原病例、完整交接与复盘','Teacher extension: original case, handover and debrief')}</summary>`;legacy.before(det);det.append(legacy);}
document.querySelectorAll('.vl-process').forEach(el=>el.remove());
document.querySelectorAll('#route-overview .monitor-wave').forEach(el=>el.remove());
})();
