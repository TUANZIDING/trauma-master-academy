import assert from 'node:assert/strict';
import {clinicalBlock,groups,pocket} from './clinical-render.mjs';
export function validateClinicalData(data){
 const pair=(v,label)=>assert.ok(Array.isArray(v)&&v.length===2&&v.every(s=>typeof s==='string'&&s.trim()),label);
 const refs=(ids,label)=>{assert.ok(Array.isArray(ids)&&ids.length>0,label);ids.forEach(id=>assert.ok(data.sources[id],`${label}: unknown ${id}`));};
 const date=(v,label)=>{assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(v),label);assert.equal(new Date(v).toISOString().slice(0,10),v,label);};
 date(data.version,'release date');
 assert.equal(new Set(data.claims.map(c=>c.id)).size,data.claims.length);
 assert.equal(new Set(data.cards.map(c=>c.id)).size,data.cards.length);
 for(const [id,s] of Object.entries(data.sources)){
  pair(s.title,id);assert.ok(/^https:\/\//.test(s.url),id);assert.ok(s.locator&&s.coverage,id);date(s.checkedDate,id);assert.ok(s.checkedDate<=data.version,id);
 }
 for(const c of data.claims){
  ['title','anchor','scope','decision','upgrade','comparisonNote'].forEach(k=>pair(c[k],`${c.id} ${k}`));refs(c.references,c.id);
  assert.ok(c.domesticAlignment);assert.ok(Array.isArray(c.domesticReferences));
  c.domesticReferences.forEach(id=>assert.equal(data.sources[id]?.domestic,true,`${c.id}: false domestic attribution`));
  if(!c.domesticReferences.length)assert.equal(c.domesticAlignment,'international_reference_only');
  date(c.sourceCheck.date,c.id);assert.ok(c.sourceCheck.date<=data.version,c.id);assert.ok(c.sourceCheck.by);
  // This release records source checking, without forging a clinician signature.
  if(c.clinicalReviewer===null)assert.equal(c.clinicalReviewDate,null);
  else {
   const r=c.clinicalReviewer;assert.ok(r&&typeof r==='object'&&r.name&&r.role,c.id);
   assert.ok(!/(?:Codex|AI|人工智能)/i.test(r.name+' '+r.role),`${c.id}: generated signature`);
   date(r.date,c.id);assert.ok(r.date>=c.sourceCheck.date&&r.date<=data.version,c.id);
   if(c.clinicalReviewDate!==null)assert.equal(c.clinicalReviewDate,r.date);
  }
 }
 for(const [page,sections] of Object.entries(data.lessonSections||{})){
  assert.ok(sections.length,page);for(const section of sections){pair(section.title,page);refs(section.references,page);assert.ok(section.id&&section.cards.length,page);for(const card of section.cards){pair(card.title,page);card.rows.forEach(row=>pair(row,page));}}
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
 const group=rel==='orthopaedics/index.html'?'orthopaedics':rel.match(/^(?:courses|orthopaedics)\/(.+)\.html$/)?.[1];
 if(groups[group]||data.lessonSections?.[group]){
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
