# Trauma Skills Academy / 创伤技能学院

[中文](#中文说明) · [English](#english)

A bilingual, evidence-aware trauma education and simulation courseware project for medical students and early-career clinicians.

面向医学生、住培医师和青年临床医师的中英文创伤教学与模拟课件项目。

> **Educational use only / 仅用于教学**
> This project is not bedside clinical decision support, a medical device, a hospital protocol, or an individual treatment plan.
> 本项目不作为床旁诊疗指令、医疗器械、本院正式操作规程或个体化治疗方案。

## 中文说明

### 项目定位

Trauma Skills Academy 将创伤学习组织为“观察—报告—团队决策—监督下训练—生理验证—动态复评”的连续路径。课程强调 xABCDE、团队沟通、病例逐步释放和患者—系统双重复评，避免把创伤技能简化为孤立操作。

### 当前内容

- 九项核心创伤技能：球囊面罩通气、气管插管、环甲膜切开、胸腔紧急减压、胸腔闭式引流、EFAST、止血带、骨盆束带和四肢临时固定。
- 五门主干课程：创伤抢救室导览、xABCDE、骨盆创伤、创伤救治链、创伤急救与灾难医学。
- 胸部、腹部、颅脑、多发伤迷你模块，以及经过脱敏边界管理的教学病例。
- 中英文切换、逐步释放病例、形成性反馈、来源定位和发布前自动检查。

### 医学与隐私边界

- 页面中的数值和影像必须结合适用范围解释，不得用单一阈值自动触发侵入性操作。
- 合成图均为模拟教学视觉，不用于影像判读；真实开放影像保留来源和许可说明。
- 病例仅按已脱敏且获授权的教学范围展示，禁止再识别、传播原始资料或推断患者身份。
- ATLS、ETM、WHO、NICE、WSES、AIUM、AO 等名称仅用于来源定位，不表示这些机构对本项目认证或背书。
- 自动验证通过不等同于临床专家批准。

### 本地运行

```bash
git clone https://github.com/TUANZIDING/trauma-skills-academy.git
cd trauma-skills-academy
npm run serve
```

然后访问：`http://127.0.0.1:8088/`

### 验证

```bash
npm run validate
```

验证器检查中英文结构一致性、本地链接、图片资源、学生可见审核标签、九项技能的决策结构和五节点视觉完整性。验证结果只代表结构和规则检查通过。

### 目录

```text
index.html        课程门户
courses/          独立课程与病例模块
assets/           样式、脚本、图片与视频
data/             课程及病例结构化数据
docs/             设计、医学边界与来源说明
scripts/          构建与验证脚本
.graph/           可审计的教学内容治理记录
```

### 贡献要求

医学内容修改应同时说明：主张内容、来源版本、适用范围、教学用途与审核状态。不得提交患者可识别信息、未经授权的病例影像、受版权保护的教材扫描件或将个人经验伪装成指南结论。

## English

### Purpose

Trauma Skills Academy organises trauma learning as a continuous pathway: observe, report, decide as a team, practise under supervision, verify physiological response, and reassess. It combines xABCDE, progressive case disclosure, team communication, and patient-system reassessment rather than teaching procedures as isolated movements.

### Included content

- Nine core skills: bag-valve-mask ventilation, tracheal intubation, emergency front-of-neck airway, emergency chest decompression, tube thoracostomy, EFAST, tourniquet use, pelvic binder application, and temporary limb splinting.
- Five core courses: trauma-bay orientation, xABCDE, pelvic trauma, the trauma-care chain, and trauma/disaster medicine.
- Mini modules for chest, abdomen, brain injury, and polytrauma, plus de-identified teaching cases with explicit privacy boundaries.
- Chinese/English switching, progressive cases, formative feedback, source locators, and pre-release validation.

### Clinical and privacy boundaries

- Numeric alerts and imaging findings must be interpreted within their stated scope; no single threshold automatically authorises an invasive intervention.
- Synthetic images are simulation visuals and are not for diagnostic-image interpretation. Authentic open images retain attribution and licence information.
- Cases are displayed only within their de-identified, authorised teaching scope. Re-identification and redistribution of original case materials are prohibited.
- References to ATLS, ETM, WHO, NICE, WSES, AIUM, and AO identify evidence sources only and do not imply endorsement or certification.
- Passing automated validation does not constitute clinical approval.

### Run locally

```bash
git clone https://github.com/TUANZIDING/trauma-skills-academy.git
cd trauma-skills-academy
npm run serve
```

Then open `http://127.0.0.1:8088/`.

### Validate

```bash
npm run validate
```

Validation covers bilingual structure, local links and media, student-facing review labels, decision data for all nine skills, and the five-node visual routes. A passing result confirms structural checks only.

### Contributing

Every medical-content change should identify the claim, source/version, applicability, teaching purpose, and review status. Do not contribute identifiable patient information, unauthorised case imaging, copyrighted textbook scans, or personal experience presented as guideline evidence.

## Licence / 许可证

Original project code and documentation are released under the [MIT License](LICENSE). Third-party media and restricted case materials remain subject to the terms in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

项目原创代码与文档按 [MIT License](LICENSE) 发布。第三方素材和受限病例材料继续遵循 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 中的独立许可与边界。
