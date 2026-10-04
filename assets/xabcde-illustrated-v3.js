/* Only the xABCDE pilot: open and close teaching explanations in normal document flow. */
(() => {
  const control = document.querySelector('[data-xv-expand]');
  if (!control) return;
  let expanded = false;
  control.addEventListener('click', () => {
    expanded = !expanded;
    document.querySelectorAll('main details').forEach(detail => { detail.open = expanded; });
    control.querySelector('.zh').textContent = expanded ? '收起全部解说' : '展开全部解说';
    control.querySelector('.en').textContent = expanded ? 'Collapse all explanations' : 'Expand all explanations';
    control.setAttribute('aria-expanded', String(expanded));
  });
  control.setAttribute('aria-expanded', 'false');
})();
