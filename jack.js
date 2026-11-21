(()=>{const d=document,r=d.documentElement,$=(s,e=d)=>e.querySelector(s),$$=(s,e=d)=>[...e.querySelectorAll(s)],rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const notes={refuge:"Mode Refuge : lumière douce, on s'installe.",focus:"Mode Focus : tout est aligné, comme mon câblage.",tension:"Mode Tension : j'ai éteint la lumière. Bouge la souris, c'est ta lampe torche."};
function mood(m,save){r.dataset.mood=m;$$('.moods button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m));$('#moodNote').textContent=notes[m];$$('[data-t]').forEach(e=>{e.dataset.o??=e.textContent;e.textContent=m==='tension'?e.dataset.t:e.dataset.o});if(save)try{localStorage.setItem('rjj-mood',m)}catch(e){}}
let s='refuge';try{s=localStorage.getItem('rjj-mood')||s}catch(e){}
$$('.moods button').forEach(b=>b.onclick=()=>mood(b.dataset.m,1));mood(notes[s]?s:'refuge');
let q;addEventListener('pointermove',e=>{if(q)return;q=requestAnimationFrame(()=>{q=0;r.style.setProperty('--mx',e.clientX+'px');r.style.setProperty('--my',e.clientY+'px')})});
if(!rm&&matchMedia('(hover:hover)').matches)$$('.tilt').forEach(c=>{c.onpointermove=e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`};c.onpointerleave=()=>c.style.transform=''});
const P=$('#player'),N={realjustjack:'Jack',damepioupiou:'DamePiouPiou',eiwen_:'Eiwen'};
function play(ch){P.innerHTML=`<iframe src="https://player.twitch.tv/?channel=${ch}&parent=${location.hostname||'localhost'}" allowfullscreen title="Live de ${N[ch]}"></iframe>`;$$('.tab').forEach(t=>t.classList.toggle('on-air',t.dataset.ch===ch));const a=$('#tw');a.href='https://www.twitch.tv/'+ch;a.textContent='Voir '+N[ch]+' sur Twitch'}
$$('[data-ch]').forEach(b=>b.addEventListener('click',()=>{play(b.dataset.ch);if(!b.classList.contains('tab')&&b.tagName!=='A')$('#live').scrollIntoView({behavior:rm?'auto':'smooth'})}));
Object.keys(N).forEach(ch=>fetch('https://decapi.me/twitch/uptime/'+ch).then(x=>x.text()).then(t=>{if(!/offline|not found|error|invalid/i.test(t))$$('[data-ch="'+ch+'"]').forEach(e=>e.classList.add('live-on'))}).catch(()=>{}));
const Q=["C'était le vent. Probablement.","Il jure que c'était le chat.","Record battu. Pas fier.","Le fantôme a gagné.","Ça compte pas, la porte a claqué !"];let n=0;$('#boo').onclick=e=>{n++;e.currentTarget.textContent=n;$('#booq').textContent=Q[n%Q.length]};
})();
