(() => {
 'use strict';
 const cards=[...document.querySelectorAll('[data-pocket-id]')],select=document.querySelector('[data-pocket-select]');
 const params=new URLSearchParams(location.search),course=params.get('course'),count=document.querySelector('[data-pocket-count]');
 const filtered=course?cards.filter(c=>c.dataset.pocketCourses.split(' ').includes(course)):[];
 if(filtered.length){const option=document.createElement('option');option.value='course';option.dataset.labelZh='本课全部';option.dataset.labelEn='This course';select.prepend(option);select.value='course';}
 else if(course)select.value=cards[0]?.dataset.pocketId||'all';
 const direct=params.get('card');if(direct&&[...select.options].some(o=>o.value===direct))select.value=direct;
 function render(){
  cards.forEach(card=>card.hidden=select.value==='course'?!filtered.includes(card):select.value!=='all'&&card.dataset.pocketId!==select.value);
  const en=document.body.dataset.lang==='en';[...select.options].forEach(o=>{o.textContent=o.dataset.labelZh?o.dataset[en?'labelEn':'labelZh']:en?'All':'全部';});
  const visible=cards.filter(c=>!c.hidden);cards.forEach(c=>c.classList.remove('pocket-print-last'));visible.at(-1)?.classList.add('pocket-print-last');
  count.textContent=en?`${visible.length} cards visible; choose one card to print it separately.`:`显示 ${visible.length} 张；选择单卡可独立打印。`;
 }
 select.addEventListener('change',()=>{const url=new URL(location.href);url.searchParams.set('card',select.value);history.replaceState(null,'',url);render();});
 document.querySelector('[data-pocket-print]').addEventListener('click',()=>print());
 new MutationObserver(render).observe(document.body,{attributes:true,attributeFilter:['data-lang']});render();
})();
