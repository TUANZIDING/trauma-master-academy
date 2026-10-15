# 第四轮验收记录 v1.0

日期：2026-10-15。基线：493af24。按A→E逐批执行；临床审核字段不代填，原始患者材料不发布。

## A1 孕妇抗D

- 修改：data/clinical-pockets.json、data/academy-question-bankv1.0.json，重建特殊人群课程、口袋卡网页/PDF、题库JS与内联前后测、技能来源索引。新增BCSH 2014 DOI与BSH入口、NHS实施路径，保留Queensland≥13周KB来源并并列差异。
- BSH网页与NHS实施全文已读取；Wiley出版全文不可访问，未称已直接读取BCSH原文。最低剂量适用英国路径，不强套本院制剂。
- 验证：build:all-pockets、build:learning、build:skills、validate 全部通过；双语口袋PDF各50页、OSCE各9页。

## B1–B5 文字、呈现与外链

- B1：按HTML文本、JS语法树字符串和JSON字段处理英文，保留URL、DOI、属性、文件名与中文紧凑表达。修复596处英文显示片段；新增scripts/english-textv1.0.mjs与validate-round4v1.0.mjs，加入默认校验。
- B2：50卡增加双语footer，移除rows内重复规范短句；clinical-render.mjs、build-pocket-pdfs.py及PDF一致性校验均同步。中文直接粘连“以本院”补标点。
- B3：更正ATLS残句；academy-viewv1.0.js默认隐藏审核状态，保留teacher=1和质量治理页；临床原始未知与审核状态分开。默认静态DOM与动态交互检查纳入待复核/未签署等词。
- B4：修复双側→双侧、监測→监测；OpenCC扫描发现显著/抬高及日文原始图注的误转换，人工排除，保留原始日文署名。
- B5：RCH更新为primary-and-secondary-survey，WHO更新为现行emergency-and-critical-care。FDA原地址本次可直接打开全文，因此保留并记录实测，而非误称404。保留BSH并列来源。新check:links脚本总预算15秒、HEAD疑似失败后GET、403/412/429人工确认、括号平衡解析。另发现一项图片来源DOI解析404：保留DOI文本和有效Commons版权出处，移除失效超链接。
- 验证：四项构建/校验全通过；扫描25851个英文片段，50个卡片页脚，399项DOM交互断言通过。首轮外链299项发现一项失效DOI及一项Markdown尾标点误读，均已修正；完整外链结果收尾时重跑并附统计。
