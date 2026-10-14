import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {validateClinicalData,stripQualifiedClinical} from './clinical-boundary.mjs';
import {groups,escape} from './clinical-render.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const data=JSON.parse(read('data/clinical-pockets.json'));
const report=validateClinicalData(data);
for(const group of new Set([...Object.keys(groups),...Object.keys(data.lessonSections||{})])){
 const file=group==='orthopaedics'?'orthopaedics/index.html':['spine','upper-limb','lower-limb'].includes(group)?`orthopaedics/${group}.html`:`courses/${group}.html`;
 stripQualifiedClinical(file,read(file),data);
}
const page=read('courses/pocket-cards.html');stripQualifiedClinical('courses/pocket-cards.html',page,data);
assert.equal((page.match(/data-pocket-id=/g)||[]).length,data.cards.length);
const context={window:{}};vm.createContext(context);vm.runInContext(read('assets/academy-curriculum.js'),context);
const courses=Object.keys(context.window.ACADEMY_COURSES);
for(const id of [...courses,...['bvm','intubation','cricothyrotomy','needle-decompression','tube-thoracostomy','efast','tourniquet','pelvic-binder','splinting'].map(s=>`skill-${s}`)]){
 assert.ok(data.cards.some(c=>c.courses.includes(id)),`${id}: pocket missing`);
}
// Negative controls: unknown citations, false domestic attribution, fabricated
// clinical signatures and edits to generated numerical HTML must be rejected.
for(const edit of [d=>d.claims[0].references.push('invented'),d=>d.claims[0].domesticReferences.push('eu-bleeding'),d=>d.claims[0].clinicalReviewer='invented signature']){
 const copy=structuredClone(data);edit(copy);assert.throws(()=>validateClinicalData(copy));
}
const original=read('courses/special-populations.html');
const needle=escape(data.claims.find(c=>c.id==='peds-fluid').decision[0]);
const tampered=original.replace(needle,needle.replace('15 mg/kg','999 mg/kg'));assert.notEqual(tampered,original);
assert.throws(()=>stripQualifiedClinical('courses/special-populations.html',tampered,data));
const unqualified='unqualified '+['S','B','P'].join('')+' <777';
assert.equal(stripQualifiedClinical('courses/pocket-cards.html',page+unqualified,data).includes(unqualified),true);
execFileSync('python3',[path.join(root,'scripts/verify-pocket-pdfsv1.0.py')],{stdio:'inherit'});
for(const lang of ['zh','en'])assert.ok(fs.statSync(path.join(root,`docs/pocket-cards/trauma-pocket-cards-${lang}.pdf`)).size>10000);
assert.equal((read('courses/quality-governance.html').match(/id="review-record"/g)||[]).length,1);
for(const name of ['Codex','AI assistant']){const copy=structuredClone(data);copy.claims[0].clinicalReviewer={name,role:'clinician',date:data.version};assert.throws(()=>validateClinicalData(copy));}
console.log(JSON.stringify({pass:true,...report,coursesCovered:courses.length,skillsCovered:9,negativeControls:5},null,2));
