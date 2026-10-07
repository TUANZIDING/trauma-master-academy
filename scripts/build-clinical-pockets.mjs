import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bi,escape,groups,clinicalBlock,pocket} from './clinical-render.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'data/clinical-pockets.json'),'utf8'));
for(const group of Object.keys(groups)){
 const file=path.join(root,`courses/${group}.html`);let html=fs.readFileSync(file,'utf8');
 html=html.replace(/<!-- clinical-reference -->[\s\S]*?<!-- \/clinical-reference -->\s*/g,'');
 if(group==='damage-control-resuscitation')html=html.replace(/<section class="section">\s*<h2><span class="zh">四个数字，[\s\S]*?<\/section>/,'');
 const block=`<!-- clinical-reference -->\n${clinicalBlock(data,group)}\n<!-- /clinical-reference -->\n`;
 const marker=html.indexOf('<section class="academy-sources"');
 const target=marker>=0?marker:html.indexOf('<!-- academy-post -->');
 if(target<0)throw Error(`No clinical insertion point: ${group}`);
 html=html.slice(0,target)+block+html.slice(target);fs.writeFileSync(file,html);
}
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>创伤口袋卡 | TraumaMaster Academy</title><link rel="icon" href="../assets/favicon.svg"><link rel="stylesheet" href="../assets/site.css"><link rel="stylesheet" href="../assets/academy-refresh.css?v=20261008"></head><body class="tma-v2 academy-page pocket-page" data-lang="zh"><header class="topbar"><a class="brand" href="../index.html"><span class="brand-mark">TM</span>TraumaMaster Academy</a><nav class="nav"><a href="../index.html#modules">${bi(['课程','Courses'])}</a><a href="quality-governance.html#review-record">${bi(['审核记录','Review record'])}</a></nav><div class="language-toggle"><button data-set-lang="zh" type="button">中文</button><button data-set-lang="en" type="button">EN</button></div></header><main class="wrap"><header class="pocket-heading"><p class="eyebrow">2026-10-08</p><h1>${bi(['创伤口袋卡','Trauma pocket cards'])}</h1><p>${bi(['选一张查数字、判断点和升级条件；展开查看来源差异。','Select a card for numbers, decision points and escalation; expand for source differences.'])}</p><div class="pocket-controls"><label>${bi(['选择口袋卡','Select card'])}<select data-pocket-select aria-label="Pocket card"><option value="all">${escape('全部 / All')}</option>${data.cards.map(c=>`<option value="${c.id}" data-label-zh="${escape(c.title[0])}" data-label-en="${escape(c.title[1])}">${escape(c.title[0])}</option>`).join('')}</select></label><button class="button" type="button" data-pocket-print>${bi(['打印当前','Print visible'])}</button><a class="button" href="../docs/pocket-cards/trauma-pocket-cards-zh.pdf">${bi(['下载中文 PDF','Chinese PDF'])}</a><a class="button" href="../docs/pocket-cards/trauma-pocket-cards-en.pdf">${bi(['下载英文 PDF','English PDF'])}</a></div><p class="learning-source-note" data-pocket-count aria-live="polite"></p></header><section class="pocket-grid" data-pocket-grid>${data.cards.map(c=>pocket(data,c)).join('\n')}</section><noscript>${bi(['脚本未启用：全部口袋卡仍可阅读和使用浏览器打印。','JavaScript disabled: all cards remain readable and printable.'])}</noscript></main><footer class="wrap footer">${bi(['医学教育与监督下训练；真实患者诊疗遵循本院规范及授权。','Medical education and supervised training; real care follows institutional policy and authorization.'])}</footer><script src="../assets/site.js"></script><script src="../assets/academy-pockets.js?v=20261008"></script></body></html>`;
fs.writeFileSync(path.join(root,'courses/pocket-cards.html'),html);
console.log(`Built ${data.cards.length} pocket cards and ${data.claims.length} source-qualified anchors.`);
