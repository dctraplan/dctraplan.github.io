const menuButton=document.querySelector('.menu-toggle');const menu=document.querySelector('#nav');menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
// Twitch requires a real public hostname in the parent parameter. Local file previews show a fallback.
if(location.protocol==='https:'||location.protocol==='http:'){const host=location.hostname;if(host&&host!=='localhost'&&host!=='127.0.0.1'){const frame=document.createElement('iframe');frame.src='https://player.twitch.tv/?channel=realjustjack&parent='+encodeURIComponent(host)+'&muted=true';frame.title='Live Twitch Réel Just Jack';frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;frame.loading='lazy';document.querySelector('#player').replaceChildren(frame);}}

// Navigation interactive, animations respectueuses de l'accessibilité.
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const progress=document.getElementById('scroll-progress');
 const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';};
 addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress,{passive:true});updateProgress();
 const buttons=[...document.querySelectorAll('.filter-btn')];
 buttons.forEach(btn=>btn.addEventListener('click',()=>{
  const selected=btn.dataset.filter;
  buttons.forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  document.querySelectorAll('.game-card').forEach(card=>{card.hidden=selected!=='all'&&card.dataset.category!==selected;});
 }));
 if('IntersectionObserver' in window&&!reduce){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.game-card,.friend-profile,.intro-copy,.live-panel,.schedule,.social').forEach(el=>{el.classList.add('reveal-on-scroll');observer.observe(el);});
 }
 const navLinks=[...document.querySelectorAll('#nav a[href^="#"]')];
 if('IntersectionObserver' in window){
  const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('is-current',a.getAttribute('href')==='#'+e.target.id));}}),{rootMargin:'-25% 0px -60% 0px'});
  document.querySelectorAll('section[id],#live,#planning,#reseaux').forEach(el=>navObserver.observe(el));
 }
 if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce){
  const glow=document.getElementById('mouse-glow');let x=0,y=0,queued=false;
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;document.body.classList.add('has-pointer');if(!queued){queued=true;requestAnimationFrame(()=>{glow.style.left=x+'px';glow.style.top=y+'px';queued=false;});}},{passive:true});
  document.querySelectorAll('.game-card,.friend-profile').forEach(card=>{
   card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg) translateY(-4px)`;});
   card.addEventListener('pointerleave',()=>{card.style.transform='';});
  });
 }
})();

// V5: immersive, lightweight canvas ambiance + selectable mood. No external dependencies.
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const moods={horror:{caption:'Une porte grince… Tu entres dans le monde de Phasmophobia.',icon:'👻',rgb:'241,54,78'},action:{caption:'L’action démarre : bienvenue dans les parties intenses de Battlefield 6.',icon:'⚡',rgb:'255,154,72'},chill:{caption:'On se pose, on explore et on discute tranquillement ensemble.',icon:'☕',rgb:'78,199,187'}};
 const caption=document.querySelector('#mood-caption');const symbol=document.querySelector('.orbit-center');
 document.querySelectorAll('.mood-button').forEach(btn=>btn.addEventListener('click',()=>{
  const mood=btn.dataset.mood;document.body.dataset.mood=mood;
  document.querySelectorAll('.mood-button').forEach(b=>{let on=b===btn;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on));});
  caption.textContent=moods[mood].caption;if(symbol)symbol.textContent=moods[mood].icon;
 }));
 const canvas=document.querySelector('#ambient-canvas');if(!canvas||reduced)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let w=0,h=0,dpr=1,mouse={x:-1000,y:-1000},visible=true;
 const dots=Array.from({length:46},(_,i)=>({x:(i*127.3)%1000/1000,y:(i*237.9)%1000/1000,size:.7+(i%4)*.36,speed:.06+(i%5)*.02}));
 const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)};
 addEventListener('resize',resize,{passive:true});resize();
 addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});
 addEventListener('pointerleave',()=>{mouse.x=-1000;mouse.y=-1000});
 document.addEventListener('visibilitychange',()=>{visible=!document.hidden});
 let frame=0;
 const draw=()=>{requestAnimationFrame(draw);if(!visible)return;frame++;if(frame%2)return;ctx.clearRect(0,0,w,h);
  const rgb=moods[document.body.dataset.mood||'horror'].rgb;
  for(const dot of dots){const px=dot.x*w,py=((dot.y*h+frame*dot.speed)%(h+20));const dx=px-mouse.x,dy=py-mouse.y,dist=Math.hypot(dx,dy);const near=Math.max(0,1-dist/190);ctx.beginPath();ctx.arc(px,py,dot.size+near*1.2,0,Math.PI*2);ctx.fillStyle=`rgba(${rgb},${.18+near*.35})`;ctx.fill();if(near>.1){ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle=`rgba(${rgb},${near*.085})`;ctx.lineWidth=.7;ctx.stroke();}}
 };requestAnimationFrame(draw);
 // Mouse position changes only the ambient artwork, never text or navigation.
})();
