import assert from 'node:assert/strict';
import {clinicalBlock,groups,pocket} from './clinical-render.mjs';
export function validateClinicalData(data){
 const pair=(v,label)=>assert.ok(Array.isArray(v)&&v.length===2&&v.every(s=>typeof s==='string'&&s.trim()),label);
 const refs=(ids,label)=>{assert.ok(Array.isArray(ids)&&ids.length>0,label);ids.forEach(id=>assert.ok(data.sources[id],`${label}: unknown ${id}`));};
 assert.equal(data.version,'2026-10-08');
 assert.equal(new Set(data.claims.map(c=>c.id)).size,data.claims.length);
 assert.equal(new Set(data.cards.map(c=>c.id)).size,data.cards.length);
 for(const [id,s] of Object.entries(data.sources)){
  pair(s.title,id);assert.ok(/^https:\/\//.test(s.url),id);assert.ok(s.locator&&s.coverage,id);assert.equal(s.checkedDate,'2026-10-08');
 }
 for(const c of data.claims){
  ['title','anchor','scope','decision','upgrade','comparisonNote'].forEach(k=>pair(c[k],`${c.id} ${k}`));refs(c.references,c.id);
  assert.ok(c.domesticAlignment);assert.ok(Array.isArray(c.domesticReferences));
  c.domesticReferences.forEach(id=>assert.equal(data.sources[id]?.domestic,true,`${c.id}: false domestic attribution`));
  if(!c.domesticReferences.length)assert.equal(c.domesticAlignment,'international_reference_only');
  assert.equal(c.sourceCheck.date,data.version);assert.ok(c.sourceCheck.by.includes('Codex'));
  // This release records source checking, without forging a clinician signature.
  assert.equal(c.clinicalReviewer,null);assert.equal(c.clinicalReviewDate,null);
 }
 for(const card of data.cards){
  pair(card.title,card.id);pair(card.scope,card.id);refs(card.references,card.id);
  assert.ok(card.rows.length>=2&&card.rows.length<=4);card.rows.forEach(row=>pair(row,card.id));
  assert.ok(Array.isArray(card.courses)&&card.courses.length);assert.ok(Array.isArray(card.claimIds));
  card.claimIds.forEach(id=>assert.ok(data.claims.some(c=>c.id===id),card.id));
 }
 return {sourceCount:Object.keys(data.sources).length,anchors:data.claims.length,pocketCards:data.cards.length,clinicalSignoff:'unsigned'};
}
// Only byte-identical generated sections can carry source-qualified numerical
// references. A new threshold elsewhere still reaches the original detector.
export function stripQualifiedClinical(rel,text,data){
 const group=rel.match(/^courses\/(.+)\.html$/)?.[1];
 if(groups[group]){
  const re=/<!-- clinical-reference -->\n([\s\S]*?)\n<!-- \/clinical-reference -->/g;
  const matches=[...text.matchAll(re)];assert.equal(matches.length,1,`${rel}: one evidence section`);
  assert.equal(matches[0][1],clinicalBlock(data,group),`${rel}: changed/unqualified clinical reference`);
  text=text.replace(re,'');
 }
 if(rel==='courses/pocket-cards.html'){
  for(const card of data.cards){const expected=pocket(data,card);assert.ok(text.includes(expected),`Changed pocket ${card.id}`);text=text.replace(expected,'');}
 }
 return text;
}
