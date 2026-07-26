# TraumaMaster Academy Graph 验证报告

**合同状态：teaching_release_approved_limited_scope（受限教学发布已批准）**
**验证日期：2026-07-19**

**治理状态更新：** 项目发起人已批准受限教学发布；记录见 [approval-log.md](approval-log.md) 与 [evidence/release-decision.json](evidence/release-decision.json)。批准范围不扩展至床旁诊疗指令、本院正式操作规程或个体化治疗方案；专题来源定位、具名审批记录与病例/影像展示范围继续是强制记录。

## Graph 结构验证

命令：

```bash
python3 /Users/dinghaixiang/.codex/skills/graph-engineering-architect/scripts/validate_graph.py .graph/trauma-education
```

结果：`PASS: graph contract is structurally valid`

该检查确认 JSON 具有所需的根目标、执行与独立核验节点、锚点、人工闸门、停止/交接节点、有效边和治理字段。它**不能**证明来源最新、临床判断正确、锚点实际独立、病例已经脱敏或任何人已经批准发布。

## 现有网站技术验证

命令：

```bash
npm run validate
```

结果：通过。

- HTML 页面：13；文本文件：80；
- 中英文计数：1841 / 1841，结构配对通过；
- 必需文件缺失、禁止内容、主张检查、链接、图像替代文本、JSON 和生成资产检查均无报告问题。

技术验证证明当前代码库通过既有静态规则；它不构成医学来源、隐私/授权、影像专科、本院流程或公开发布批准。

## 尚未执行的领域验证

以下验证需要具名人工责任人完成并存档，当前均未完成：

1. 学生可见医学主张的指南/教材版本、范围与原文定位核验；
2. 真实病例、Word 文档、CT/影像及派生资产的授权、脱敏和影像专科审核；
3. 本院流程和资源调用表述的本地适用性确认；
4. 中英文医学语义的人工复核；
5. 发布前风险复核，以及课程负责人和创伤临床审核人的具名书面发布决定。

在这些项目完成前，任何候选版本都必须保持未批准状态。

## 证据包生成

命令：

```bash
npm run build:evidence-pack
```

结果：从 `index.html` 与 12 个课程页面中生成 38 条显式 `.claim` 记录，全部映射至候选来源，并继承受限教学发布决定、专题定位与后续具名审核字段。证据包的范围、来源状态与未原子化正文审计项见 [evidence/README.md](evidence/README.md) 和 [evidence/atomization-backlog.md](evidence/atomization-backlog.md)。

专题定位：7/7 条要求专题定位的主张已记录在 [evidence/topic-locator-register.json](evidence/topic-locator-register.json)。其中中国严重过敏反应指南仍待补入获授权的正式出版信息与稳定定位；该缺口不会被通用教材或国际来源替代。
