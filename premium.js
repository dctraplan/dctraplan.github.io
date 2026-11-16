(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return;
  let pending = false, x=0, y=0;
  window.addEventListener('pointermove', e => {
    x=e.clientX; y=e.clientY;
    if (pending) return;
    pending=true;
    requestAnimationFrame(() => {
      document.body.style.setProperty('--pointer-x', x+'px');
      document.body.style.setProperty('--pointer-y', y+'px');
      pending=false;
    });
  }, {passive:true});
})();
