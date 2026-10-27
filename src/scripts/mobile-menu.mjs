// Native disclosure remains usable with JavaScript disabled.
for (const menu of document.querySelectorAll('.ha-mobile-menu')) {
  const button = menu.querySelector('summary');
  const panel = menu.querySelector('nav');
  let closing;
  const sync = () => {
    button.setAttribute('aria-expanded', String(menu.open));
    button.setAttribute('aria-label', menu.open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  };
  const close = (restore = false) => {
    if (!menu.open || closing) return;
    const finish = () => { menu.open = false; closing = null; sync(); if (restore) button.focus(); };
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && panel.animate) {
      closing = panel.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}],{duration:150,easing:'ease-out'});
      closing.finished.then(finish, finish);
    } else finish();
  };
  sync();
  menu.addEventListener('toggle', sync);
  button.addEventListener('click', event => { if (menu.open) { event.preventDefault(); close(true); } });
  menu.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open) { event.preventDefault(); closing?.cancel(); menu.open=false; sync(); button.focus(); } });
  menu.addEventListener('focusout', event => { if (!menu.contains(event.relatedTarget)) close(); });
  document.addEventListener('pointerdown', event => { if (!menu.contains(event.target)) close(); });
  for (const link of panel.querySelectorAll('a')) link.addEventListener('click', () => { menu.open = false; sync(); });
}
