// Progressive enhancements: no tracking, no dependencies.
(()=>{'use strict';
 const menu=document.querySelector('#nav'), toggle=document.querySelector('.menu-toggle');
 if(menu&&toggle){document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target)&&menu.classList.contains('open')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});}
 // Highlight navigation while browsing; never fake a live indicator.
 const links=[...document.querySelectorAll('#nav a[href^="#"]')];
 if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){for(const a of links)a.classList.toggle('is-current',a.hash==='#'+entry.target.id);}}},{rootMargin:'-25% 0px -60% 0px'});document.querySelectorAll('main [id]').forEach(el=>{if(links.some(a=>a.hash==='#'+el.id))obs.observe(el)});}
})();
