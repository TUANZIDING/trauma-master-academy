# Trauma Master Academy / 创伤救治学院

[中文](#中文说明) · [English](#english)

An open, bilingual trauma-care learning platform that connects the complete pathway from pre-alert and trauma-bay teamwork to xABCDE, organ-system reasoning, procedural simulation, transfer, and reassessment.

一个中英文开放式创伤救治教学平台，将院前预警、团队到位、xABCDE、病种推理、操作模拟、资源协同、转运交接和动态复评连接为完整学习链。

> **Educational use only / 仅用于教学**
>
> Not bedside clinical decision support, a medical device, a hospital protocol, or an individual treatment plan.
> 不作为床旁诊疗指令、医疗器械、本院正式操作规程或个体化治疗方案。

## 中文说明

### 项目定位

Trauma Master Academy 面向医学生、实习医师、住培医师和青年临床医师。项目不以单一疾病或单项操作为中心，而是围绕一条连续创伤救治链训练：

```text
院前预警 → 团队启动 → 到院交接 → xABCDE → 病种与隐匿风险
        → 床旁检查/影像 → 操作技能 → 资源协同 → 转运交接 → 再评估
```

每个模块尽量同时回答四个问题：学员看什么、如何报告、何时组织团队资源、下一次复评什么。

### 完整课程体系

| 层级 | 内容 | 入口 |
|---|---|---|
| 总课程门户 | 全部课程、病种矩阵、病例与技能入口 | [`index.html`](index.html) |
| 创伤救治链 | 院前预警、团队启动、交接、xABCDE、资源与转运 | [`trauma-care-chain.html`](courses/trauma-care-chain.html) |
| 抢救室入门 | 空间、角色、并行任务与闭环沟通 | [`trauma-bay.html`](courses/trauma-bay.html) |
| xABCDE主干 | 从致命外出血到暴露/环境控制的初评与复评 | [`xabcde.html`](courses/xabcde.html) |
| 骨盆创伤 | 隐匿出血、骨盆固定、影像与资源路径 | [`pelvic-trauma.html`](courses/pelvic-trauma.html) |
| 灾难医学 | 多伤员优先级、资源失衡、团队推演与复盘 | [`trauma-disaster-medicine.html`](courses/trauma-disaster-medicine.html) |
| 病种迷你矩阵 | 颅脑、胸部、腹部、多发伤等病种推理模块 | [`index.html#curriculum`](index.html#curriculum) |
| 教学病例 | 腹部失血、多发伤休克再评估、颈椎/髋部损伤等 | [`index.html#curriculum`](index.html#curriculum) |
| 创伤技能学院 | BVM、插管、环甲膜切开、胸腔减压/引流、EFAST、止血带、骨盆束带、四肢固定 | [`trauma-skills-academy.html`](courses/trauma-skills-academy.html) |

更完整的中英文结构说明见 [项目地图](docs/PROJECT_MAP.md)。

### 教学设计

- 中英文页面切换与术语对应。
- xABCDE 优先级语言与患者—系统双重复评。
- 病例信息逐步释放，而不是一次性展示答案。
- 生命体征、查体、床旁影像、实验室信息与团队资源共同进入推理。
- 九项技能使用“五节点能力路线”，覆盖为什么做、怎么组织、成功表现、失败表现和下一次复评。
- 公开来源定位、主张级证据台账、隐私边界和发布前自动验证。
- 采用“盲点扫描、每轮 1–3 个关键问题、方案比较、批准后执行”的临床经验采访工作流。
- 医学主张、双语语义、本院适配、隐私授权和技术验证使用彼此独立的门禁。

### 医学、版权与隐私边界

- 单一生命体征、单幅影像或单次检查不得被包装成自动触发侵入性操作的规则。
- 合成图均是模拟教学视觉，不用于临床影像判读；真实开放影像保留来源和许可。
- 病例只在已脱敏且获授权的教学范围内展示，禁止再识别患者或传播原始病例文件。
- ATLS、ETM、WHO、NICE、WSES、AIUM、AO 等名称仅用于来源定位，不表示机构认证或背书。
- 自动验证通过不等同于临床专家审批。
- 教师模式只控制课堂呈现，不提供访问控制；未获授权的真实病例载荷不得进入公开仓库。

### 临床经验转化与证据工作台

- [临床经验采访工作流](docs/CLINICAL_EXPERIENCE_WORKFLOW.md)
- [医学证据治理](docs/EVIDENCE_GOVERNANCE.md)
- [隐私与教学授权检查表](docs/PRIVACY_AUTHORIZATION_CHECKLIST.md)
- [浏览器证据工作台](courses/evidence-governance.html)

规范化台账由 `npm run build:evidence-ledger` 从现有证据图谱生成。生成过程不会自动把任何记录升级为 `evidence_verified` 或 `publishable`。

### 本地运行

```bash
git clone https://github.com/TUANZIDING/trauma-master-academy.git
cd trauma-master-academy
npm run serve
```

访问 `http://127.0.0.1:8088/`。

### 发布前验证

```bash
npm run validate
```

验证内容包括中英文结构一致性、本地链接与媒体、学生可见审核标签、课程/病例结构、九项技能的决策数据及五节点视觉完整性。通过只表示自动结构检查通过。

## English

### Purpose

Trauma Master Academy is designed for medical students, interns, residents, and early-career clinicians. It teaches trauma care as one connected pathway rather than as isolated diseases or procedures:

```text
Pre-alert → team activation → arrival handover → xABCDE → injury-specific reasoning
          → bedside tests/imaging → skills → resources → transfer → reassessment
```

Each module aims to answer four questions: what the learner should observe, how to report it, when to organise team resources, and what must be reassessed next.

### Curriculum architecture

| Layer | Content | Entry |
|---|---|---|
| Main portal | Courses, disease matrix, cases, and skills | [`index.html`](index.html) |
| Trauma-care chain | Pre-alert, activation, handover, xABCDE, resources, and transfer | [`trauma-care-chain.html`](courses/trauma-care-chain.html) |
| Trauma-bay orientation | Space, roles, parallel tasks, and closed-loop communication | [`trauma-bay.html`](courses/trauma-bay.html) |
| xABCDE core | Primary survey, priority language, and reassessment | [`xabcde.html`](courses/xabcde.html) |
| Pelvic trauma | Occult bleeding, stabilisation, imaging, and resource pathways | [`pelvic-trauma.html`](courses/pelvic-trauma.html) |
| Trauma and disaster medicine | Triage, resource imbalance, team simulation, and debrief | [`trauma-disaster-medicine.html`](courses/trauma-disaster-medicine.html) |
| Mini-module matrix | Brain, chest, abdomen, and polytrauma reasoning modules | [`index.html#curriculum`](index.html#curriculum) |
| Teaching cases | Abdominal haemorrhage, shock reassessment, cervical spine/hip injury, and more | [`index.html#curriculum`](index.html#curriculum) |
| Trauma Skills Academy | BVM, intubation, eFONA, decompression/drainage, EFAST, tourniquet, pelvic binder, and splinting | [`trauma-skills-academy.html`](courses/trauma-skills-academy.html) |

See the bilingual [project map](docs/PROJECT_MAP.md) for the complete structure.

### Learning design

- Chinese/English page switching and aligned terminology.
- xABCDE priority language and dual patient-system reassessment.
- Progressive case disclosure instead of answer-first presentations.
- Integrated vital signs, examination, bedside imaging, laboratory information, and team resources.
- Five-node capability routes for nine procedural skills: why, organisation, success, failure, and next reassessment.
- Public-source locators, claim-level evidence registers, privacy boundaries, and automated pre-release checks.
- An interview workflow using blindspot scans, one to three high-leverage questions per round, route comparison, and approval before implementation.
- Independent gates for medical claims, bilingual meaning, local adaptation, privacy authorization, and technical validation.

### Clinical, copyright, and privacy boundaries

- No single vital sign, image, or test automatically authorises an invasive intervention.
- Synthetic images are simulation visuals, not diagnostic-image teaching substitutes. Authentic open images retain attribution and licence information.
- Cases are displayed only within their de-identified, authorised teaching scope. Re-identification and redistribution of original case files are prohibited.
- ATLS, ETM, WHO, NICE, WSES, AIUM, and AO identify sources only; no endorsement or certification is implied.
- Passing automated validation does not constitute clinical approval.
- Instructor mode controls classroom presentation only and is not access control; unauthorized real-case payload must remain outside the public repository.

### Clinical experience and evidence workspace

- [Clinical experience workflow](docs/CLINICAL_EXPERIENCE_WORKFLOW.md)
- [Evidence governance](docs/EVIDENCE_GOVERNANCE.md)
- [Privacy and teaching authorization checklist](docs/PRIVACY_AUTHORIZATION_CHECKLIST.md)
- [Browser evidence workspace](courses/evidence-governance.html)

Run `npm run build:evidence-ledger` to normalize the existing evidence graph. Generation never upgrades a record automatically to `evidence_verified` or `publishable`.

### Run locally

```bash
git clone https://github.com/TUANZIDING/trauma-master-academy.git
cd trauma-master-academy
npm run serve
```

Open `http://127.0.0.1:8088/`.

### Validate before release

```bash
npm run validate
```

Validation covers bilingual structure, local links and media, student-facing review labels, course and case structure, all nine skills' decision data, and five-node visual routes. A passing result confirms automated structural checks only.

## Repository structure / 仓库结构

```text
index.html        Main learning portal / 总课程门户
courses/          Core courses, mini modules, cases, skills / 课程、病种、病例与技能
assets/           Styles, scripts, illustrations, video / 样式、脚本、图片与视频
data/             Structured course and case data / 课程与病例数据
docs/             Project map, safety, design and source notes / 项目地图与审核文档
scripts/          Build and validation tools / 构建与验证脚本
.graph/           Auditable education-governance records / 可审计治理记录
.workflow/        Interview, route and approval templates / 采访、方案与批准模板
```

## Licence / 许可证

Original project code and documentation are released under the [MIT License](LICENSE). Third-party media and restricted case materials remain subject to [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

项目原创代码与文档按 [MIT License](LICENSE) 发布。第三方媒体和受限病例材料继续遵循 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 中的独立许可与使用边界。
