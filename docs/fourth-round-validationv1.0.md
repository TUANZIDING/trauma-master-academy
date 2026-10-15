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

## C1–C3 内容补强

- C1：保留通用骨科卡；上肢卡改为髁上/肘伤神经血管、肱骨干桡神经、前臂筋膜室与BBI/API；下肢卡改为膝脱位ABI、牵引夹板禁忌、胫骨筋膜室、老年髋部。更新clinical-pockets.json的卡和课程生成区、独立题库，新增BOAST髁上、WTA、BASK膝脱位与EAST来源。EAST 2012仅支持穿透性下肢，未冒充钝性膝脱位证据。
- C2：胸部mini/胸管技能卡及关键步骤、题目解释统一即刻>1500 mL、持续>200 mL/h×2–4 h（本站WSES 3 h参考）或持续不稳定即外科评估；补EAST 2011公开原文依据。不稳定不等待累计时间。
- C3：DAS 2015两种触诊分支与2025统一纵切≤8 cm明确区分，8–10 cm仅标2015不可触及分支。skill-standardsv1.0.json、口袋卡、前测和9页双语OSCE PDF同步。未将旧版分支标成2025新要求。
- 验证：build:all-pockets、build:learning、build:skills、validate 全部通过；50张卡、45评分行为及双语PDF逐页文本一致。

## D1–D3 性能与工程

- D1：126张>500 KB位图（含骨科assets）从307.68 MB转换为800/1600两档WebP，质量80、最长边≤1600，两档合计19.59 MB；旧原图从发布树移除，可从Git历史恢复。无Git LFS，.gitattributes标记WebP二进制。图片署名和原站许可保持，CSV补转换哈希；50卡PDF不因图片压缩改写临床内容。
- 压缩脚本compress-imagesv1.0.py、图像台账image-variantsv1.0.json与build-image-markupv1.0.mjs记录尺寸/srcset；静态和动态img均设置宽高、懒加载（主图高优先）。CSS背景、技能拼接地址、骨科相对地址与大图链接已同步。
- 原NDMS来源JPEG缺EOI，重新下载与原台账SHA256一致；仅补FF D9结束标记即可完整解码，再转WebP，未生成像素。修复过程和源哈希留台账，抽查转码图无底部缺块。
- 图片预算含全部懒加载img的最大srcset候选及保守计入样式表资源，33条课程/技能路由最大1,218,642字节；无页面超过3 MB；单图均<600 KB。网页首页首屏满足1.5 MB。结果见media-budgetv1.0.json。
- D2：新增固定版本requirements.txt（pypdf/reportlab/Pillow）与check-pythonv1.0.mjs，validate开头缺依赖时给出安装命令；README双语环境准备与npm ci更新。
- D3：新增Playwright脚本visual-regressionv1.0.mjs，默认25路由×2视口=50张截图，检查溢出、容器文字裁切、控制台及404并输出JSON。Playwright固定开发依赖；支持指定已有Chromium。截图/报告默认Git忽略。
- 实测Chromium151：首轮50视口发现并修复背景图/相对路径404、骨科favicon；无横向溢出或容器裁切。favicon修复后两视口复测通过；收尾再次运行全部50视口。人工查看首页桌面/手机及口袋卡手机截图。首次无历史像素基线，不称已完成像素差分回归。
- 验证：四项规定构建/校验全通过，图片预算检查纳入默认validate。
