(() => {
 'use strict';
 const cards=[...document.querySelectorAll('[data-pocket-id]')];
 const select=document.querySelector('[data-pocket-select]');
 const course=new URLSearchParams(location.search).get('course');
 const count=document.querySelector('[data-pocket-count]');
 let filtered=course?cards.filter(c=>c.dataset.pocketCourses.split(' ').includes(course)):cards;
 if(!filtered.length)filtered=cards;
 // Begin with one screen-sized card; the selector retains every card for discovery.
 if(course&&filtered.length){select.value=filtered[0].dataset.pocketId;}
 function render(){
  const value=select.value;
  cards.forEach(card=>card.hidden=value!=='all'&&card.dataset.pocketId!==value);
  const lang=document.body.dataset.lang==='en'?'en':'zh';
  [...select.options].forEach(o=>{if(o.dataset.labelZh)o.textContent=o.dataset[lang==='zh'?'labelZh':'labelEn'];else o.textContent=lang==='zh'?'全部':'All';});
  const n=cards.filter(c=>!c.hidden).length;count.textContent=lang==='zh'?`显示 ${n} 张；每张独立打印。`:`${n} visible; one card per printed page.`;
 }
 select.addEventListener('change',()=>{const url=new URL(location.href);url.searchParams.set('card',select.value);history.replaceState(null,'',url);render();});
 const direct=new URLSearchParams(location.search).get('card');if(direct&&[...select.options].some(o=>o.value===direct))select.value=direct;
 document.querySelector('[data-pocket-print]').addEventListener('click',()=>print());
 new MutationObserver(render).observe(document.body,{attributes:true,attributeFilter:['data-lang']});render();
})();
