(() => {
  const cases = {
    abdomen: {
      label: ['腹部脏器损伤与隐匿性出血', 'Abdominal organ injury and occult hemorrhage'],
      subtitle: ['合成教学病例：用“解剖发现能否解释生理恶化”贯穿全程。', 'Synthetic teaching case: keep asking whether anatomy explains the physiologic deterioration.'],
      panorama: [
        ['机制与时间', '高能量侧向撞击，左上腹受力；伤后 35 分钟到院。', 'Mechanism & time', 'High-energy lateral impact to the left upper abdomen; arrival 35 minutes after injury.'],
        ['首轮生理', 'HR 96，BP 108/72，RR 24，SpO₂ 96%；皮肤偏凉。', 'Initial physiology', 'HR 96, BP 108/72, RR 24, SpO₂ 96%; skin is cool.'],
        ['首轮查体', '左上腹压痛，暂无明显反跳痛；骨盆稳定。', 'Initial exam', 'Left-upper-quadrant tenderness without clear rebound; pelvis stable.'],
        ['床旁节点', '首次 FAST 未见明确游离液，不把“阴性”等同于“无腹部损伤”。', 'Bedside node', 'Initial FAST shows no definite free fluid; negative does not mean no abdominal injury.'],
        ['趋势变化', '25 分钟后 HR 118，BP 88/56，RR 29，乳酸 4.6 mmol/L，腹痛扩大。', 'Trend change', 'After 25 min: HR 118, BP 88/56, RR 29, lactate 4.6 mmol/L, with wider pain.'],
        ['高阶信息', '重复 FAST 出现少量液性暗区；增强 CT 用于稳定条件下的定位与分层。', 'Advanced information', 'Repeat FAST shows a small fluid pocket; contrast CT localizes and stratifies injury when physiology permits.']
      ],
      releases: [
        ['1 · 机制', '左上腹承受侧向钝性撞击，无明显外出血。', '请列出可能受累区域，但不要现在就锁定某个脏器。', '1 · Mechanism', 'Blunt lateral impact to the left upper abdomen with no major external bleeding.', 'Name at-risk regions without locking onto one organ.'],
        ['2 · 首轮生命体征', 'HR 96，BP 108/72，RR 24，SpO₂ 96%，意识清楚。', '一组“尚可”的数值能否结束出血风险评估？', '2 · Initial vitals', 'HR 96, BP 108/72, RR 24, SpO₂ 96%, alert.', 'Can one acceptable snapshot close hemorrhage assessment?'],
        ['3 · 腹部查体', '左上腹压痛，暂无明显反跳痛或膨隆。', '哪些情况会降低早期查体的敏感性？', '3 · Abdominal exam', 'Left-upper-quadrant tenderness without clear rebound or distension.', 'What can reduce early examination sensitivity?'],
        ['4 · 首次 FAST', '未见明确腹腔游离液。', '这个结果回答了什么，又没有回答什么？', '4 · First FAST', 'No definite intraperitoneal free fluid.', 'What has this answered, and what remains unanswered?'],
        ['5 · 生理恶化', '25 分钟后 HR 118，BP 88/56，RR 29，皮肤湿冷，乳酸 4.6。', '现在请重写一句问题表征，并提出立即并行任务。', '5 · Physiologic decline', 'After 25 min: HR 118, BP 88/56, RR 29, cool clammy skin, lactate 4.6.', 'Rewrite the problem representation and name parallel tasks.'],
        ['6 · 重复检查', '压痛范围扩大，重复 FAST 出现少量液性暗区。', '什么改变了风险权重：是单个检查，还是“趋势+新信息”？', '6 · Repeat assessment', 'Tenderness spreads and repeat FAST shows a small fluid pocket.', 'Did one test change risk, or did trend plus new information do so?'],
        ['7 · 解剖定位', '当血流动力学允许时，增强 CT 帮助判断实质脏器、空腔脏器和腹膜后风险。', '影像定位后，哪些床边趋势仍必须追踪？', '7 · Anatomic localization', 'When physiology permits, contrast CT evaluates solid organ, hollow viscus, and retroperitoneal risk.', 'Which bedside trends still require follow-up after imaging?'],
        ['8 · 复评契约', '下一次血压、心率、腹部体征、乳酸/碱剩余和尿量必须有明确责任人与时点。', '请说出“谁、何时、看什么、何时升级”。', '8 · Reassessment contract', 'Next BP, HR, abdominal findings, lactate/base deficit, and urine output need an owner and time.', 'State who, when, what to compare, and what triggers escalation.']
      ],
      differentials: [
        ['实质脏器出血', '机制、左上腹压痛与恶化的灌注支持；用重复趋势和影像定位。', 'Solid-organ hemorrhage', 'Mechanism, LUQ tenderness, and worsening perfusion support it; localize with serial trends and imaging.'],
        ['空腔脏器/系膜损伤', '早期 FAST 可阴性，腹痛扩大和腹膜刺激征趋势更关键。', 'Bowel or mesenteric injury', 'FAST may be negative early; evolving pain and peritoneal findings matter.'],
        ['腹膜后/骨盆来源', '不在 FAST 最擅长的窗口；必须结合机制、骨盆和 CT。', 'Retroperitoneal or pelvic source', 'Poorly covered by standard FAST windows; integrate mechanism, pelvis, and CT.'],
        ['腹外或混合性原因', '胸腔、长骨、心源性/梗阻性等仍可解释低血压；不要被腹痛锚定。', 'Extra-abdominal or mixed causes', 'Chest, long-bone, cardiac, or obstructive causes may explain hypotension; avoid abdominal anchoring.']
      ],
      phases: [
        ['0–5 分钟', 'xABCDE、监护、保温、建立通路，同时寻找可见与隐匿出血。', '0–5 min', 'xABCDE, monitoring, warming, access, and parallel search for visible and occult hemorrhage.'],
        ['5–15 分钟', '连续查体、FAST/EFAST 与灌注指标；不用一次阴性结果关闭假设。', '5–15 min', 'Serial exam, FAST/EFAST, and perfusion markers; do not close the hypothesis after one negative test.'],
        ['15–60 分钟', '根据生理稳定性选择下一信息/控制出血路径，同步血液与手术/介入资源。', '15–60 min', 'Choose the next diagnostic or hemorrhage-control path by physiology and synchronize blood and procedural resources.'],
        ['稳定后', '连续腹部查体、灌注与实验室趋势，设定明确恶化触发点。', 'After stabilization', 'Continue abdominal, perfusion, and laboratory trends with explicit deterioration triggers.']
      ],
      handover: ['高能量侧向撞击后 35 分钟到院，首轮生命体征尚可，但左上腹压痛且皮肤偏凉。首次 FAST 未见明确游离液，25 分钟后心率升至 118、血压降至 88/56 mmHg、乳酸 4.6 mmol/L，腹痛扩大，重复 FAST 出现少量液性暗区。当前以隐匿性腹腔出血为主要担心，但空腔脏器、腹膜后与腹外来源仍需并行排查。已按 xABCDE 复苏并同步出血控制资源；请明确下一次血压、腹部体征、乳酸/碱剩余和尿量复评的责任人与升级条件。', 'High-energy lateral impact with arrival at 35 minutes. Initial vital signs were acceptable, but LUQ tenderness and cool skin were present. The first FAST showed no definite free fluid. Twenty-five minutes later HR rose to 118, BP fell to 88/56 mmHg, lactate reached 4.6 mmol/L, pain spread, and repeat FAST showed a small fluid pocket. Occult intraperitoneal hemorrhage is the leading concern, while bowel, retroperitoneal, and extra-abdominal sources remain under parallel evaluation. xABCDE resuscitation and hemorrhage-control resources are active. Name the owner and escalation criteria for the next BP, abdominal exam, lactate/base deficit, and urine-output review.']
    },
    chest: {
      label: ['胸部外伤与连枷胸趋势复评', 'Chest trauma and flail-chest trend reassessment'],
      subtitle: ['合成教学病例：从胸廓运动进入呼吸功、氧合和疲劳风险。', 'Synthetic teaching case: move from chest motion to work of breathing, oxygenation, and fatigue risk.'],
      panorama: [
        ['机制', '高能量侧向撞击，右前外侧胸壁受力。', 'Mechanism', 'High-energy lateral impact to the right anterolateral chest.'],
        ['到院生理', 'HR 108，BP 116/74，RR 26，SpO₂ 94%（吸氧前）。', 'Arrival physiology', 'HR 108, BP 116/74, RR 26, SpO₂ 94% before oxygen.'],
        ['胸壁查体', '局部压痛、捏发感，吸气时右前胸局部内陷。', 'Chest-wall exam', 'Focal tenderness and crepitus with inspiratory inward movement of the right anterior segment.'],
        ['呼吸趋势', '30 分钟后 RR 32，SpO₂ 89%，说话变短，辅助呼吸肌参与。', 'Respiratory trend', 'After 30 min: RR 32, SpO₂ 89%, shorter speech, accessory-muscle use.'],
        ['床旁信息', '肺超声/胸片用于检查气胸、血胸与肺挫伤线索。', 'Bedside information', 'Lung ultrasound and radiography assess pneumothorax, hemothorax, and contusion clues.'],
        ['核心失配', '胸壁损伤不只是“骨折数量”；疼痛、挫伤和疲劳共同决定恶化。', 'Core mismatch', 'Chest-wall injury is not just a fracture count; pain, contusion, and fatigue drive deterioration together.']
      ],
      releases: [
        ['1 · 撞击机制', '右前外侧胸壁承受高能量撞击。', '哪些即时致死性 B 轴问题必须先排查？', '1 · Impact', 'High-energy impact to the right anterolateral chest.', 'Which immediately lethal B-axis threats need rapid exclusion?'],
        ['2 · 初始呼吸', 'RR 26，SpO₂ 94%，能说完整句，但疼痛明显。', '哪些征象提示呼吸功正在增加？', '2 · Initial breathing', 'RR 26, SpO₂ 94%, full sentences, but prominent pain.', 'Which signs indicate increasing work of breathing?'],
        ['3 · 动态视诊', '吸气时局部内陷，呼气时向外凸；右侧呼吸音减弱。', '请分开报告胸壁运动、通气和氧合。', '3 · Dynamic inspection', 'Local inward inspiration and outward expiration; reduced right breath sounds.', 'Report chest motion, ventilation, and oxygenation separately.'],
        ['4 · 疼痛与分泌物', '深呼吸和咳嗽受限，痰液排出效率下降。', '疼痛如何通过呼吸力学促进肺不张和感染风险？', '4 · Pain and clearance', 'Deep breathing and cough are limited, reducing secretion clearance.', 'How can pain promote atelectasis and infection through respiratory mechanics?'],
        ['5 · 趋势恶化', '30 分钟后 RR 32，SpO₂ 89%，说话变短，辅助肌参与。', '此时“氧饱和度”与“呼吸功”哪个更重要？为什么两者都要看？', '5 · Deterioration', 'After 30 min: RR 32, SpO₂ 89%, short speech, accessory-muscle use.', 'Why must oxygenation and work of breathing be interpreted together?'],
        ['6 · 影像节点', '影像提示多根胸骨折及肺挫伤，并需继续排查气/血胸。', '影像中哪些发现能解释床边恶化，哪些仍不能？', '6 · Imaging node', 'Imaging suggests multiple rib fractures and lung contusion while pneumothorax/hemothorax remain under assessment.', 'Which findings explain the bedside decline, and which do not?'],
        ['7 · 疲劳警报', '若 RR 从 32 降至 22，但意识变差、呼吸变浅，这可能是疲劳而非好转。', '请重新定义“趋势改善”。', '7 · Fatigue alarm', 'A fall in RR from 32 to 22 with worse mentation and shallow breathing may indicate fatigue, not improvement.', 'Redefine what true trend improvement means.'],
        ['8 · 复评契约', '下一次复评应同时比较说话、呼吸功、胸壁运动、呼吸音、SpO₂ 与二氧化碳趋势。', '请指定责任人、时间和升级信号。', '8 · Reassessment contract', 'Compare speech, work, chest motion, breath sounds, SpO₂, and carbon-dioxide trend.', 'Name owner, timing, and escalation signals.']
      ],
      differentials: [
        ['胸壁不稳定/连枷节段', '反常运动和疼痛限制通气；观察动态而不只数骨折。', 'Chest-wall instability', 'Paradoxical motion and pain impair ventilation; assess motion, not fracture count alone.'],
        ['肺挫伤/肺不张', '氧合可随时间恶化，需连续监护与影像。', 'Contusion or atelectasis', 'Oxygenation may worsen over time, requiring serial monitoring and imaging.'],
        ['气胸/血胸', '呼吸音不对称、血流动力学改变或超声线索提高权重。', 'Pneumothorax or hemothorax', 'Asymmetric sounds, hemodynamic change, or ultrasound clues raise priority.'],
        ['其他低氧机制', '气道分泌物、误吸、镇静/阿片效应和头部损伤均可参与。', 'Other hypoxemic mechanisms', 'Secretions, aspiration, sedatives/opioids, and head injury may contribute.']
      ],
      phases: [
        ['0–5 分钟', '迅速排查致死性 B 轴问题，供氧、监护并重复听视触诊。', '0–5 min', 'Exclude lethal B-axis threats, support oxygenation, monitor, and repeat look-listen-feel assessment.'],
        ['5–15 分钟', '评估疼痛、咳嗽、胸廓运动、呼吸功与床旁超声。', '5–15 min', 'Assess pain, cough, chest motion, work of breathing, and bedside ultrasound.'],
        ['15–60 分钟', '根据趋势升级呼吸支持，并与多模式镇痛、肺卫生及胸壁专科评估并行。', '15–60 min', 'Escalate respiratory support by trend alongside multimodal analgesia, pulmonary hygiene, and chest-wall review.'],
        ['稳定后', '继续前 72 小时呼吸趋势、疼痛控制、排痰能力与并发症监测。', 'After stabilization', 'Continue early respiratory trends, pain control, secretion clearance, and complication surveillance.']
      ],
      handover: ['患者受高能量右前外侧胸部撞击。到院 HR 108、BP 116/74 mmHg、RR 26、SpO₂ 94%，右前胸局部反常运动、压痛和捏发感，右侧呼吸音减弱。30 分钟后 RR 升至 32、SpO₂ 降至 89%，说话变短且辅助肌参与。当前评估为胸壁不稳定合并肺挫伤导致的进展性呼吸功增加和低氧，仍需快速排查气胸/血胸及其他低氧原因。已进入氧合支持、连续监护、多模式镇痛与肺卫生路径；请在下一时点重复说话能力、呼吸功、胸壁运动、呼吸音、SpO₂ 与二氧化碳趋势，并明确呼吸支持升级责任人。', 'High-energy impact affected the right anterolateral chest. Arrival values were HR 108, BP 116/74 mmHg, RR 26, and SpO₂ 94%, with focal paradoxical motion, tenderness, crepitus, and reduced right breath sounds. Thirty minutes later RR rose to 32, SpO₂ fell to 89%, speech shortened, and accessory muscles were recruited. Current assessment is progressive work of breathing and hypoxemia from chest-wall instability with pulmonary contusion; pneumothorax, hemothorax, and other causes remain under rapid evaluation. Oxygenation, monitoring, multimodal analgesia, and pulmonary hygiene are active. Repeat speech, work, motion, breath sounds, SpO₂, and CO₂ trend at the next checkpoint and name the owner of escalation.']
    },
    tbi: {
      label: ['颅脑损伤与继发性脑损伤预防', 'TBI and prevention of secondary brain injury'],
      subtitle: ['合成教学病例：不让一个 GCS 或一张 CT 取代连续神经复评。', 'Synthetic teaching case: do not let one GCS or one CT replace serial neurologic reassessment.'],
      panorama: [
        ['机制', '电动车撞击后头部着地，短暂意识丧失。', 'Mechanism', 'E-bike collision with head impact and brief loss of consciousness.'],
        ['到院状态', 'GCS 14（E4V4M6），双瞳孔 3 mm 等大灵敏。', 'Arrival state', 'GCS 14 (E4V4M6); pupils 3 mm, equal and reactive.'],
        ['全身生理', 'HR 102，BP 104/68，RR 22，SpO₂ 93%；低氧和低灌注可加重继发损伤。', 'Systemic physiology', 'HR 102, BP 104/68, RR 22, SpO₂ 93%; hypoxemia and hypoperfusion can worsen secondary injury.'],
        ['神经趋势', '35 分钟后 GCS 12（E3V4M5），右瞳孔 4 mm、左侧 3 mm，右上肢反应减弱。', 'Neurologic trend', 'After 35 min: GCS 12 (E3V4M5), right pupil 4 mm vs left 3 mm, weaker right-arm response.'],
        ['影像节点', '头颅 CT 用于解剖定位，但负性或早期影像不能替代症状趋势。', 'Imaging node', 'Head CT localizes anatomy, but a negative or early scan does not replace symptom trends.'],
        ['复评红旗', '意识下降、新瞳孔差、局灶体征、重复呕吐或惊厥均需升级。', 'Reassessment red flags', 'Declining mentation, new anisocoria, focal deficit, repeated vomiting, or seizure requires escalation.']
      ],
      releases: [
        ['1 · 机制与保护', '头部着地并短暂意识丧失，院前颈椎保护状态需确认。', '哪些 A/D 轴信息必须在转运时闭环？', '1 · Mechanism and protection', 'Head impact with brief LOC; prehospital c-spine protection status requires confirmation.', 'Which A/D-axis data need closed-loop transfer?'],
        ['2 · 首轮神经查体', 'GCS 14（E4V4M6），双瞳孔 3 mm 等大灵敏。', '请用 E/V/M 分项而不只报总分；还缺什么？', '2 · First neuro exam', 'GCS 14 (E4V4M6); pupils 3 mm, equal and reactive.', 'Report E/V/M components, not just total; what is still missing?'],
        ['3 · 全身生理', 'SpO₂ 93%，BP 104/68 mmHg，有头皮裂伤但无明显大出血。', '为什么氧合和血压也是神经复评的一部分？', '3 · Systemic physiology', 'SpO₂ 93%, BP 104/68 mmHg, scalp wound without major external hemorrhage.', 'Why are oxygenation and pressure part of neurologic reassessment?'],
        ['4 · 第一次 CT', '影像显示颞顶部挫伤/少量出血线索，无明显中线移位。', '这张影像能否预测 30 分钟后的神经状态？', '4 · First CT', 'Imaging suggests a temporoparietal contusion/small hemorrhage without clear midline shift.', 'Can this scan predict neurologic status 30 minutes later?'],
        ['5 · 意识趋势', '35 分钟后 GCS 由 14 降至 12（E3V4M5）。', '请先核对低氧、低灌注、低血糖、药物和惊厥后状态，同时不延误颅内恶化评估。', '5 · Mental-status trend', 'After 35 min GCS falls from 14 to 12 (E3V4M5).', 'Check systemic confounders while urgently assessing intracranial deterioration.'],
        ['6 · 瞳孔与局灶体征', '右瞳孔 4 mm、左侧 3 mm，右上肢对刺激反应较前减弱。', '哪一条信息最改变你的升级优先级？', '6 · Pupils and focal signs', 'Right pupil 4 mm vs left 3 mm, with reduced right-arm response.', 'Which finding most changes escalation priority?'],
        ['7 · 再影像/专科节点', '临床恶化应触发神经外科评估与适时重复影像，而非等待固定时间表。', '请明确哪个床边变化触发了升级。', '7 · Re-imaging/specialty node', 'Clinical decline should trigger neurosurgical review and timely repeat imaging rather than wait for a fixed clock.', 'Name the bedside change that triggered escalation.'],
        ['8 · 复评契约', '下一次必须同时重复 GCS 分项、瞳孔、四肢运动、SpO₂、BP 和血糖。', '请说明责任人、时点与升级红旗。', '8 · Reassessment contract', 'Repeat GCS components, pupils, limb movement, SpO₂, BP, and glucose together.', 'State owner, timing, and escalation red flags.']
      ],
      differentials: [
        ['进展性颅内损伤', '意识下降、新瞳孔差和局灶体征提高权重。', 'Progressive intracranial injury', 'Declining mentation, new anisocoria, and focal signs increase priority.'],
        ['低氧/低灌注', '可制造或加重意识变化，也是可修正的继发损伤因素。', 'Hypoxemia or hypoperfusion', 'Can cause or worsen altered mentation and represents modifiable secondary injury.'],
        ['药物/代谢性原因', '镇静镇痛、低血糖、电解质或中毒需并行核对。', 'Drug or metabolic causes', 'Sedation, hypoglycemia, electrolytes, and intoxication require parallel checks.'],
        ['惊厥后/颈髓问题', '未见抽搐不等于无惊厥；运动异常也必须结合颈椎保护解释。', 'Postictal or cervical-cord problem', 'Unwitnessed seizure remains possible; motor findings also require c-spine context.']
      ],
      phases: [
        ['0–5 分钟', '稳定气道、氧合和循环，维持颈椎保护，完成 GCS 分项与瞳孔基线。', '0–5 min', 'Stabilize airway, oxygenation, and circulation; maintain c-spine protection; document GCS components and pupils.'],
        ['5–15 分钟', '查血糖、追踪全身生理，完成头到脚神经检查与影像准备。', '5–15 min', 'Check glucose and systemic physiology; complete structured neurologic exam and imaging preparation.'],
        ['15–60 分钟', '对任何恶化立即重新 xABCDE，联系神经外科，根据临床趋势决定重复影像/高级监测。', '15–60 min', 'For any decline, repeat xABCDE, involve neurosurgery, and guide repeat imaging/advanced monitoring by trend.'],
        ['稳定后', '连续神经趋势、并发症预防、早期康复与家属沟通。', 'After stabilization', 'Continue neurologic trends, complication prevention, early rehabilitation, and family communication.']
      ],
      handover: ['电动车撞击后头部着地，曾短暂意识丧失。到院 GCS 14（E4V4M6），双瞳孔 3 mm 等大灵敏，HR 102、BP 104/68 mmHg、RR 22、SpO₂ 93%。初次 CT 提示颞顶部挫伤/少量出血线索，无明显中线移位。35 分钟后 GCS 降至 12（E3V4M5），新出现右侧瞳孔较大与右上肢反应减弱。当前最担心进展性颅内损伤，同时正并行排查低氧、低灌注、低血糖、药物和惊厥后状态。已重新进入 xABCDE、维持颈椎保护并启动神经外科/重复影像评估；请明确下一次 GCS 分项、瞳孔、四肢运动、SpO₂、BP 和血糖复评的责任人。', 'After an e-bike collision the patient struck the head and briefly lost consciousness. Arrival GCS was 14 (E4V4M6), pupils 3 mm equal/reactive, HR 102, BP 104/68 mmHg, RR 22, and SpO₂ 93%. Initial CT suggested temporoparietal contusion/small hemorrhage without clear midline shift. Thirty-five minutes later GCS fell to 12 (E3V4M5), with new right-greater-than-left pupil size and weaker right-arm response. Progressive intracranial injury is the leading concern while hypoxemia, hypoperfusion, hypoglycemia, medication effect, and postictal state are checked in parallel. xABCDE has been repeated, c-spine protection maintained, and neurosurgical/re-imaging review activated. Name the owner of the next GCS-component, pupil, limb, SpO₂, BP, and glucose reassessment.']
    },
    polytrauma: {
      label: ['头胸腹骨盆多发伤：并行优先级', 'Head–chest–abdomen–pelvis polytrauma: parallel priorities'],
      subtitle: ['合成教学病例：同步管理生理、解剖、资源和时间冲突。', 'Synthetic teaching case: synchronize physiology, anatomy, resources, and time conflicts.'],
      panorama: [
        ['机制', '高速机动车撞击，被困 20 分钟，头胸腹骨盆均有传力。', 'Mechanism', 'High-speed vehicle collision with 20-min entrapment and multi-region energy transfer.'],
        ['到院生理', 'GCS 13，HR 126，BP 86/54，RR 30，SpO₂ 90%，T 35.4℃。', 'Arrival physiology', 'GCS 13, HR 126, BP 86/54, RR 30, SpO₂ 90%, T 35.4°C.'],
        ['解剖地图', '头面部擦伤、左胸呼吸音减弱、腹部压痛、骨盆风险及股骨畸形。', 'Anatomic map', 'Facial abrasions, reduced left breath sounds, abdominal tenderness, pelvic concern, and femoral deformity.'],
        ['并行任务', '气道/氧合、出血控制、复苏、超声、保温、血液与专科资源同时开始。', 'Parallel tasks', 'Airway/oxygenation, hemorrhage control, resuscitation, ultrasound, warming, blood, and specialty resources start together.'],
        ['趋势节点', '10 分钟后 BP 78/48、SpO₂ 87%；任何单一轴都不能解释全部生理严重度。', 'Trend node', 'After 10 min BP 78/48 and SpO₂ 87%; no single axis explains all physiologic severity.'],
        ['团队契约', '每个任务要有责任人、预期返回时间、失败信号与替代路径。', 'Team contract', 'Every task needs an owner, expected return time, failure signal, and fallback path.']
      ],
      releases: [
        ['1 · 高能量机制', '高速撞击并被困 20 分钟，多解剖区受累。', '请先列生理威胁，再列解剖名称。', '1 · High-energy mechanism', 'High-speed collision with 20-min entrapment and multiple regions at risk.', 'Name physiologic threats before anatomic labels.'],
        ['2 · 到院生理', 'GCS 13，HR 126，BP 86/54，RR 30，SpO₂ 90%，T 35.4℃。', '哪些任务不能等待上一项完成？', '2 · Arrival physiology', 'GCS 13, HR 126, BP 86/54, RR 30, SpO₂ 90%, T 35.4°C.', 'Which tasks cannot wait for the prior one to finish?'],
        ['3 · B 轴线索', '左侧呼吸音减弱、低氧、胸壁压痛。', '请快速区分胸壁、肺实质、气/血胸和气道问题。', '3 · B-axis clues', 'Reduced left breath sounds, hypoxemia, and chest-wall tenderness.', 'Rapidly separate chest wall, lung, pleural, and airway mechanisms.'],
        ['4 · C 轴线索', '腹部压痛、骨盆风险、股骨畸形与低血压并存。', '出血可能同时存在多处；如何避免只追一个源？', '4 · C-axis clues', 'Abdominal tenderness, pelvic risk, femoral deformity, and hypotension coexist.', 'How do you avoid pursuing only one hemorrhage source?'],
        ['5 · D/E 轴线索', 'GCS 13，瞳孔暂等大，体温 35.4℃，保护状态需重新确认。', '哪些变化可能是颅内损伤，哪些可能由低氧/低灌注造成？', '5 · D/E-axis clues', 'GCS 13, pupils currently equal, temperature 35.4°C, and protection status needs reconfirmation.', 'Which changes may be intracranial and which may reflect hypoxia/hypoperfusion?'],
        ['6 · 首轮资源返回', 'EFAST、血气/乳酸、骨盆固定状态与血液准备各自返回部分信息。', '请说出哪个结果改变优先级，哪个只是补充。', '6 · First resource returns', 'EFAST, blood gas/lactate, pelvic stabilization status, and blood preparation each return partial information.', 'Which result changes priority and which merely adds context?'],
        ['7 · 十分钟趋势', 'BP 78/48，SpO₂ 87%，意识反应较前迟缓。', '现在请全队停下 20 秒，重新排序主导风险和并行任务。', '7 · Ten-minute trend', 'BP 78/48, SpO₂ 87%, and slower responses.', 'Pause the team for 20 seconds and reprioritize threats and parallel tasks.'],
        ['8 · 闭环契约', '每项任务要报告“完成/未完成、结果、对优先级的影响、下一节点”。', '请用 60–90 秒完成一次全面交接。', '8 · Closed-loop contract', 'Each task reports completion, result, priority impact, and next node.', 'Deliver a full 60–90 second handover.']
      ],
      differentials: [
        ['出血性低灌注', '腹、骨盆、长骨和胸腔可同时贡献；趋势和源控制必须同步。', 'Hemorrhagic hypoperfusion', 'Abdomen, pelvis, long bone, and chest may contribute simultaneously; trend and source control must synchronize.'],
        ['胸部梗阻/换气失败', '低氧与呼吸音不对称要求迅速排查张力性气胸等可逆威胁。', 'Thoracic obstruction or gas-exchange failure', 'Hypoxemia and asymmetric sounds require rapid exclusion of reversible threats such as tension pneumothorax.'],
        ['颅内或全身性意识下降', '头部损伤、低氧、低灌注、药物与低温均可影响 D 轴。', 'Intracranial or systemic mental decline', 'Head injury, hypoxia, hypoperfusion, medication, and hypothermia can all alter the D axis.'],
        ['混合性多机制失稳', '多发伤常不能由一个诊断解释；应按对生理严重度的贡献动态赋权。', 'Mixed multi-mechanism instability', 'Polytrauma rarely fits one label; dynamically weight each mechanism by contribution to physiology.']
      ],
      phases: [
        ['0–5 分钟', '团队领导口述主导威胁，分配 xABCDE 并行任务和资源调度。', '0–5 min', 'Team leader verbalizes dominant threats and assigns parallel xABCDE tasks and resources.'],
        ['5–15 分钟', '在床旁整合 EFAST、血气/乳酸、出血源地图、保温与凝血风险。', '5–15 min', 'Integrate EFAST, blood gas/lactate, hemorrhage map, warming, and coagulation risk at bedside.'],
        ['15–60 分钟', '每 5–10 分钟或任何恶化时重新排序，协调 CT、手术室、介入、血库与 ICU。', '15–60 min', 'Reprioritize every 5–10 min or after deterioration; coordinate CT, OR, IR, blood bank, and ICU.'],
        ['稳定后', '完成三级查体、遗漏伤筛查、并发症预防与完整转运交接。', 'After stabilization', 'Complete tertiary survey, missed-injury screen, complication prevention, and full transfer handover.']
      ],
      handover: ['高速机动车撞击后被困 20 分钟的多发伤患者。到院 GCS 13、HR 126、BP 86/54 mmHg、RR 30、SpO₂ 90%、体温 35.4℃。查体有左侧呼吸音减弱、腹部压痛、骨盆风险和股骨畸形。10 分钟后 BP 降至 78/48、SpO₂ 降至 87%且意识反应迟缓。当前为出血性低灌注、胸部换气/梗阻风险与头部或全身性意识改变并存的混合性失稳。已按 xABCDE 并行启动氧合、出血控制、快速复苏、EFAST、保温、血液与多专科资源。请各任务负责人在规定时点回报完成状态、结果、对优先级的影响和替代路径；团队领导负责下一次全队重新排序。', 'This is a polytrauma patient after high-speed collision and 20-min entrapment. Arrival GCS 13, HR 126, BP 86/54 mmHg, RR 30, SpO₂ 90%, temperature 35.4°C. Findings include reduced left breath sounds, abdominal tenderness, pelvic risk, and femoral deformity. After 10 minutes BP fell to 78/48, SpO₂ to 87%, and responses slowed. Current assessment is mixed instability with hemorrhagic hypoperfusion, thoracic gas-exchange/obstructive risk, and intracranial or systemic mental-status decline. Oxygenation, hemorrhage control, rapid resuscitation, EFAST, warming, blood, and multispecialty resources are active in parallel. Each owner must report completion, result, priority impact, and fallback at the assigned time; the team leader owns the next whole-team reprioritization.']
    }
  };

  const key = document.body.dataset.miniCase;
  const c = cases[key];
  if (!c) return;
  const bi = (v) => `<span class="zh">${v[0]}</span><span class="en">${v[1]}</span>`;
  const panorama = c.panorama.map((x) => `<article class="case-panorama-card"><strong>${bi([x[0], x[2]])}</strong><p>${bi([x[1], x[3]])}</p></article>`).join('');
  const releases = c.releases.map((x, i) => `<article class="case-release-card${i === 0 ? ' is-visible' : ''}" data-case-release="${i}"><strong>${bi([x[0], x[3]])}</strong><p>${bi([x[1], x[4]])}</p><p class="release-prompt">${bi([x[2], x[5]])}</p></article>`).join('');
  const differentials = c.differentials.map((x, i) => `<article class="shock-hypothesis-card${i === 0 ? ' leading' : ''}"><div><strong>${bi([x[0], x[2]])}</strong><span class="weight ${i === 0 ? 'high' : 'medium'}">${bi([i === 0 ? '高优先级复评' : '并行保留', i === 0 ? 'High-priority reassessment' : 'Keep in parallel'])}</span></div><p>${bi([x[1], x[3]])}</p></article>`).join('');
  const phases = c.phases.map((x) => `<article><strong>${bi([x[0], x[2]])}</strong><p>${bi([x[1], x[3]])}</p></article>`).join('');
  const root = document.createElement('div');
  root.className = 'mini-case-expansion';
  root.setAttribute('data-case-lab', '');
  root.innerHTML = `
    <section class="section" id="case-panorama">
      <div class="section-header"><div><span class="eyebrow">CASE-BASED MINI MODULE</span><h2>${bi(c.label)}</h2><p class="muted">${bi(c.subtitle)}</p></div><span class="tag">${bi(['合成轨迹 · 非诊疗阈值', 'Synthetic trajectory · not treatment thresholds'])}</span></div>
      <div class="case-panorama-grid">${panorama}</div>
      <div class="case-causal-warning"><strong>${bi(['教学边界', 'Teaching boundary'])}</strong><p>${bi(['数值为医学生趋势练习而合成，不对应特定患者，也不构成处置阈值。临床实施必须结合当前指南、个体生理和本院流程。', 'Values are synthesized for trend learning, do not represent a specific patient, and are not action thresholds. Clinical care requires current guidance, individual physiology, and local protocols.'])}</p></div>
    </section>
    <section class="section" id="progressive-release">
      <div class="section-header"><div><h2>${bi(['信息逐步释放：每轮重写问题表征', 'Progressive release: rewrite the representation every round'])}</h2><p class="muted">${bi(['先回答卡片中的问题，再释放下一条；教师可用“显示全部”快速复盘。', 'Answer each prompt before releasing the next item; instructors may reveal all for debrief.'])}</p></div><div class="quiz-actions"><button class="button" type="button" data-case-lab-action="hideAnswers">${bi(['隐藏参考', 'Hide reference'])}</button><button class="button primary" type="button" data-case-lab-action="releaseNext">${bi(['释放下一条', 'Release next'])}</button><button class="button" type="button" data-case-lab-action="showAnswers">${bi(['教师显示参考', 'Instructor reveal reference'])}</button></div></div>
      <div class="case-release-grid">${releases}</div>
    </section>
    <section class="section" id="case-differential">
      <div class="section-header"><div><h2>${bi(['机制权重：支持、不足与下一步', 'Mechanism weights: support, gaps, and next step'])}</h2><p class="muted">${bi(['不用一个标签替代动态鉴别；新的查体、生命体征和影像会持续改变权重。', 'Do not replace dynamic differentiation with one label; new exam, vital-sign, and imaging data continuously change weights.'])}</p></div></div>
      <div class="shock-hypothesis-grid">${differentials}</div>
    </section>
    <section class="section" id="case-management">
      <div class="section-header"><div><h2>${bi(['分阶段处置与复评契约', 'Phased management and reassessment contract'])}</h2><p class="muted">${bi(['这是团队思维框架，不是个体化医嘱。', 'This is a team reasoning framework, not an individualized treatment order.'])}</p></div></div>
      <div class="reassessment-timeline">${phases}</div>
    </section>
    <section class="section" id="case-briefing">
      <div class="section-header"><div><h2>${bi(['完整交接：SBAR + xABCDE + 下一次复评', 'Full handover: SBAR + xABCDE + next reassessment'])}</h2><p class="muted">${bi(['交接不只说“已做了什么”，还要说趋势、未解释信息、资源状态和下一责任人。', 'Handover states trends, unresolved information, resource status, and the next owner—not only completed tasks.'])}</p></div></div>
      <div class="handover-builder-grid"><article><strong>S / B</strong><p>${bi(['机制、伤后时间、到院状态与重要背景。', 'Mechanism, time since injury, arrival state, and relevant background.'])}</p></article><article><strong>A + xABCDE</strong><p>${bi(['已知、可疑、担心，以及哪条生理趋势正在恶化。', 'Known, suspected, feared, and which physiologic trend is worsening.'])}</p></article><article><strong>R / Resources</strong><p>${bi(['已启动与尚未到位的检查、血液、专科和转运资源。', 'Active and pending tests, blood, specialty, and transfer resources.'])}</p></article><article><strong>Reassessment owner</strong><p>${bi(['谁、何时、比较哪些变量，哪个红旗触发升级。', 'Who, when, which variables, and what red flag triggers escalation.'])}</p></article></div>
      <article class="quiz-card" data-quiz-card><label>${bi(['请完成 60–90 秒交接', 'Deliver a 60–90 second handover'])}<textarea rows="7" placeholder="situation / background / assessment / recommendation / reassessment owner"></textarea></label><div class="quiz-actions"><button class="button primary" type="button" data-quiz-submit>${bi(['提交交接', 'Submit handover'])}</button><button class="button" type="button" data-quiz-reveal>${bi(['显示完整参考', 'Reveal full reference'])}</button></div><div class="quiz-explanation handover-reference" hidden><strong>${bi(['参考交接', 'Reference handover'])}</strong><p>${bi(c.handover)}</p></div></article>
    </section>`;
  const anchor = document.querySelector('#clinical-depth') || document.querySelector('#mini') || document.querySelector('#sources');
  anchor?.parentNode.insertBefore(root, anchor);
})();
