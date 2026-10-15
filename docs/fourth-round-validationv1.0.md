# 第四轮验收记录 v1.0

日期：2026-10-15。基线：493af24。按A→E逐批执行；临床审核字段不代填，原始患者材料不发布。

## A1 孕妇抗D

- 修改：data/clinical-pockets.json、data/academy-question-bankv1.0.json，重建特殊人群课程、口袋卡网页/PDF、题库JS与内联前后测、技能来源索引。新增BCSH 2014 DOI与BSH入口、NHS实施路径，保留Queensland≥13周KB来源并并列差异。
- BSH网页与NHS实施全文已读取；Wiley出版全文不可访问，未称已直接读取BCSH原文。最低剂量适用英国路径，不强套本院制剂。
- 验证：build:all-pockets、build:learning、build:skills、validate 全部通过；双语口袋PDF各50页、OSCE各9页。
