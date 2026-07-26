# 逐条主张证据包

本目录保存面向临床、隐私和发布闸门的审计输入；不保存或复制受限病例原件、受版权保护的指南正文或审批签名。

## 文件与状态

- [source-register.json](source-register.json)：候选来源的组织、版本、范围、定位与使用边界；
- [topic-locator-register.json](topic-locator-register.json)：FAST/EFAST、过敏反应、胸壁损伤与颅脑损伤等专题主张的章节/页面定位；
- `claims.json`：由 `npm run build:evidence-pack` 从网页显式 `.claim` 块生成的逐条清单；
- [atomized-mini-module-claims.json](atomized-mini-module-claims.json)：腹部、胸部、颅脑和多发伤四个合成迷你模块的第一批核心主张；构建时会解析为来源版本、专题定位、适用范围与发布决定；
- [atomized-pelvic-and-case-claims.json](atomized-pelvic-and-case-claims.json)：骨盆合成模块与三个真实教学病例的第一批记录；真实病例强制拆分为病例事实、影像描述、教学推断、隐私/授权范围四层；
- [atomized-core-course-claims.json](atomized-core-course-claims.json)：xABCDE、创伤抢救室、创伤救治链和灾难医学的第一批框架、沟通、资源与本地流程边界记录；
- [atomization-backlog.md](atomization-backlog.md)：尚未变成显式 `.claim` 的医学正文和视觉内容；它们是公开发布前的阻塞项。

`R-TA-20260719-01` 已批准受限教学发布：面向学生的创伤教学与模拟，不作为床旁诊疗指令、本院正式操作规程或个体化治疗方案。`candidate_sources_only`、`indexed_not_claim_approved`、`index_only`、`metadata_incomplete`、`pending_*` 仍不代表单条专题主张的无条件医学通过；具名审批人、职务、日期、批准范围和专题定位必须继续保留。

## 审查顺序

1. 运行生成脚本，获得候选主张与对应来源；
2. 审核人对专题主张补齐原文定位、适用范围、结论与理由；
3. 真实病例和影像另走隐私/影像闸门；
4. 对中英文语义、技术验证、发布风险完成独立记录；
5. 将全部记录附到模块送审台账，不得以本目录或总体教学发布决定替代专题定位和病例/影像授权。

## 版权与受限数据

ACS 等来源有使用限制。本目录只记录题名、版本、链接、范围和审核状态，不复制指南、教材或病例原文。受限病例只能以 `restricted_case_record` 标识登记，原件继续留在既有受限位置。
