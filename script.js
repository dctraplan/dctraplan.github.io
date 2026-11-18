const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=document.documentElement;
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches,calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const GM={ph:{d:"Enquêtes paranormales : preuves, fantômes et frayeurs en direct.",c:["EMF 5","Spirit Box","Ultraviolets"],rgb:"16,224,160"},wow:{d:"Donjons et raids sur Midnight, boss par boss, avec le chat.",c:["Midnight","Niveau 90","Raids"],rgb:"165,107,255"},bf:{d:"Battlefield 6 : grosses parties, bons moments et fous rires avec le chat.",c:["Conquête","Escouade","Action"],rgb:"255,90,54"},sc:{d:"Exploration spatiale dans Star Citizen : vaisseaux, étoiles et bonne humeur.",c:["Stanton","Pyro","Vaisseaux"],rgb:"54,209,255"}};
let XP=0,clicks=0,LV=1,snd=false,actx=null,curV=null;const VIS=new Set();const DONE=new Set(),SEEN=new Set(),ACH={games:["Globe-trotter : les 4 ambiances",15],th:["Lumière ! Tu as changé de mode",5],live:["Spectateur : le live est chargé",10],cp:["Prêt à collaborer : message copié",15],pal:["Mode hacker : recherche rapide",10],clk:["Feu d’artifice : 10 clics",10],ghost:["Enquêteur : un seul suspect",15],d1:["Premier fantôme deviné",10],d3:["Série de 3 au défi",25],bs:["Chasseur de boss",5],"v-phasmo":["Visite : Phasmophobia",5],"v-wow":["Visite : WoW Midnight",5],"v-planning":["Visite : Planning",5],"v-communaute":["Visite : Communauté",5],t2:["Fidèle : 2 minutes sur le site",15],t5:["Habitué : 5 minutes sur le site",30],tal:["Découvreur de talents",10]};
function toast(m){const e=$("#ts");e.textContent=m;e.classList.add("on");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("on"),3200)}
function hud(){const lv=1+Math.floor(XP/40);if(lv>LV){LV=lv;beep(988,.25);toast("Niveau "+lv+" atteint !"+(lv==3?" Mode arc-en-ciel débloqué.":""))}$("#xp").textContent=`Niv. ${lv} · ${XP} XP · ${DONE.size}/${Object.keys(ACH).length} succès`;$("#xf").style.width=(XP%40)/40*100+"%";if(!$("#ap").hidden)ap();nxt()}
function beep(f,d){if(!snd||!(window.AudioContext||window.webkitAudioContext))return;actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();o.type="triangle";o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(actx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+d);o.stop(actx.currentTime+d)}
function ap(){$("#ap").innerHTML="<ul>"+Object.entries(ACH).map(([id,a])=>`<li class="${DONE.has(id)?"ok":""}">${DONE.has(id)?"✓":"○"} ${a[0]} <b>+${a[1]}</b></li>`).join("")+"</ul>"}
function nxt(){const L={accueil:"l’Accueil",phasmo:"Phasmophobia",wow:"WoW Midnight",communaute:"la Communauté"},td=Object.keys(L).filter(k=>!VIS.has(k)),e=$("#nx"),left=Object.keys(ACH).length-DONE.size;if(!e)return;e.innerHTML=td.length?`<span>Prochaine étape : explore <b>${L[td[0]]}</b> et gagne des XP.</span><a class="btn sm fill" href="#${td[0]}">Y aller</a>`:left?`<span>Il te reste <b>${left}</b> succès à débloquer. Clique sur la barre d’XP pour les voir.</span>`:`<span><b>Maître chasseur !</b> Tu as débloqué tous les succès.</span>`}
function ach(id){const a=ACH[id];if(!a||DONE.has(id))return;DONE.add(id);XP+=a[1];beep(880,.2);toast("Succès débloqué : "+a[0]+" (+"+a[1]+" XP)");hud()}hud();
let game="ph";function scramble(el,x){if(calm){el.textContent=x;return}let f=0;clearInterval(el._t);el._t=setInterval(()=>{f++;el.textContent=x.split("").map((c,i)=>i<f*2||c==" "?c:"▒░█▓"[Math.random()*4|0]).join("");if(f*2>=x.length){clearInterval(el._t);el.textContent=x}},22)}
function setGame(g){game=g;SEEN.add(g);if(SEEN.size==4)ach("games");R.dataset.game=g;$("#stage").dataset.g=g;scramble($("#gd"),GM[g].d);$("#chip").innerHTML=GM[g].c.map(c=>`<span>${c}</span>`).join("");$$(".gs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.g===g))}
$$(".gs button").forEach(b=>b.onclick=()=>setGame(b.dataset.g));setGame("ph");
$$(".uni a").forEach(a=>a.onmouseenter=()=>setGame(a.dataset.g));
$("#mq").innerHTML=Array(8).fill("<span>WOW MIDNIGHT</span><span>✦</span><span>PHASMOPHOBIA</span><span>✦</span><span>STAR CITIZEN</span><span>✦</span><span>BATTLEFIELD 6</span><span>✦</span><span>LIVES TWITCH</span><span>✦</span>").join("");
/* fond de particules sensible à la souris */
const cv=$("#bg"),cx=cv.getContext("2d");let P=[],B=[],M={x:-999,y:-999};
function init(){cv.width=innerWidth;cv.height=innerHeight;P=Array.from({length:Math.min(130,innerWidth/10|0)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.8+.6,k:Math.random(),px:0,py:0}))}
init();addEventListener("resize",init);
let t=0;function frame(){t+=.016;cx.clearRect(0,0,cv.width,cv.height);const col=GM[game].rgb,pa=+getComputedStyle(R).getPropertyValue("--pa");
P.forEach(p=>{let vx,vy;if(game=="ph"){vx=Math.sin(t+p.k*6)*.35;vy=Math.cos(t*.8+p.k*9)*.35}else if(game=="wow"){vx=Math.sin(t/2+p.k*9)*.4;vy=-.5-p.k*.9}else{vx=-(.8+p.k*3);vy=0}
const dx=p.x-M.x,dy=p.y-M.y,d=Math.hypot(dx,dy);if(d<170){const f=(170-d)/170*3.2;p.px+=dx/d*f;p.py+=dy/d*f}p.px*=.9;p.py*=.9;
p.x+=vx+p.px;p.y+=vy+p.py;if(p.x<-20)p.x=cv.width+20;if(p.x>cv.width+20)p.x=-20;if(p.y<-20)p.y=cv.height+20;if(p.y>cv.height+20)p.y=-20;
cx.fillStyle=XP>=80?`hsla(${(p.k*360+t*40)%360},90%,65%,${pa*(.4+p.k*.6)})`:`rgba(${col},${pa*(.4+p.k*.6)})`;cx.shadowColor=`rgb(${col})`;cx.shadowBlur=game=="ph"?14:6;
if(game=="sc"){cx.fillRect(p.x,p.y,4+p.k*18,p.r*.8)}else{cx.beginPath();cx.arc(p.x,p.y,p.r*(game=="ph"?1.8:1),0,7);cx.fill()}});
B=B.filter(b=>b.l>0);B.forEach(b=>{b.x+=b.vx;b.y+=b.vy;b.l--;cx.fillStyle=`rgba(${col},${b.l/40})`;cx.fillRect(b.x,b.y,3,3)});if(!calm)requestAnimationFrame(frame)}
addEventListener("pointerdown",e=>{if(++clicks>=10)ach("clk");if(calm)return;for(let i=0;i<22;i++){const a=Math.random()*6.28,s=1+Math.random()*4;B.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:40})}});
frame();
/* souris : curseur, parallaxe, inclinaison, projecteur, aimant */
const cur=$("#cur"),dot=$("#dot");let cxp=0,cyp=0,tx=0,ty=0;
addEventListener("pointermove",e=>{M.x=e.clientX;M.y=e.clientY;tx=e.clientX;ty=e.clientY;dot.style.transform=`translate(${tx}px,${ty}px)`;
R.style.setProperty("--gx",Math.round(e.clientX/innerWidth*100)+"%");
cur.classList.toggle("big",!!e.target.closest("a,button,.card"))});
if(fine&&!calm)(function lp(){cxp+=(tx-cxp)*.18;cyp+=(ty-cyp)*.18;cur.style.transform=`translate(${cxp}px,${cyp}px)`;requestAnimationFrame(lp)})();
function bindFx(){$$(".tilt:not([data-b]),.stage:not([data-b])").forEach(el=>{el.dataset.b=1;
el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
if(fine&&!calm){el.style.setProperty("--ry",nx*10+"deg");el.style.setProperty("--rx",-ny*10+"deg");el.querySelectorAll("[data-z]").forEach(l=>l.style.transform=`translate(${nx*-20}px,${ny*-20}px)`)}});
el.addEventListener("pointerleave",()=>{el.style.setProperty("--ry","0deg");el.style.setProperty("--rx","0deg");el.querySelectorAll("[data-z]").forEach(l=>l.style.transform="")})});
$$(".card:not([data-s2])").forEach(c=>{c.dataset.s2=1;c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--sx",e.clientX-r.left+"px");c.style.setProperty("--sy",e.clientY-r.top+"px")})});
$$(".mag:not([data-m])").forEach(m=>{m.dataset.m=1;m.addEventListener("pointermove",e=>{if(!fine||calm)return;const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});m.addEventListener("pointerleave",()=>m.style.transform="")})}
/* thème, progression, recherche rapide, live, collab */
const th={click(){}};function setTheme(){R.dataset.theme="dark"}
addEventListener("scroll",()=>$("#prg").style.transform=`scaleX(${scrollY/Math.max(1,document.body.scrollHeight-innerHeight)})`,{passive:true});
const pal=$("#pal"),pq=$("#pq");let pi=0,pit=[];
const goto=h=>{pal.hidden=true;route(h)};
const ACT=[["Aller au labo Phasmophobia",()=>goto("#labo")],["Aller à WoW Midnight",()=>goto("#wow")],["Voir le live",()=>goto("#live")],["Proposer une collaboration",()=>goto("#collab")],["Ambiance Phasmophobia",()=>setGame("ph")],["Ambiance WoW Midnight",()=>setGame("wow")],["Ambiance Star Citizen",()=>setGame("sc")],["Ambiance Battlefield 6",()=>setGame("bf")],...G.map((g,i)=>["Fantôme : "+g.name,()=>{$("#rst").click();goto("#labo");const c=$$(".g")[i];$$(".g").forEach(x=>x!==c&&x.classList.add("off"));c.classList.add("open","solo");setTimeout(()=>c.scrollIntoView({block:"center"}),450)}])];
function pr(){const q=norm(pq.value);pit=ACT.filter(a=>norm(a[0]).includes(q)).slice(0,8);pi=Math.min(pi,Math.max(0,pit.length-1));$("#pl").innerHTML=pit.map((a,i)=>`<button class="${i==pi?"on":""}" data-i="${i}">${a[0]}</button>`).join("")||`<p style="padding:1rem;margin:0">Rien trouvé. Essaie « labo » ou un nom de fantôme.</p>`}
function po(){ach("pal");pal.hidden=false;pq.value="";pi=0;pr();pq.focus()}
$("#kb").onclick=po;pq.oninput=()=>{pi=0;pr()};$("#pl").onclick=e=>{const b=e.target.closest("button");if(b)pit[+b.dataset.i][1]()};
pal.onclick=e=>{if(e.target===pal)pal.hidden=true};
addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();pal.hidden?po():pal.hidden=true}
if(pal.hidden)return;if(e.key==="Escape")pal.hidden=true;if(e.key==="ArrowDown"){pi=Math.min(pi+1,pit.length-1);pr();e.preventDefault()}if(e.key==="ArrowUp"){pi=Math.max(pi-1,0);pr();e.preventDefault()}if(e.key==="Enter"&&pit[pi])pit[pi][1]()});
$("#ld").onclick=()=>{ach("live");const h="parent="+(location.hostname||"dctraplan.github.io")+"&parent=dctraplan.github.io";$("#lv").innerHTML=`<iframe src="https://player.twitch.tv/?channel=realjustjack&muted=true&${h}" allowfullscreen title="Live Twitch de Réel Just Jack"></iframe><iframe src="https://www.twitch.tv/embed/realjustjack/chat?${h}&darkpopout" title="Chat Twitch"></iframe>`};
const cmsg=()=>{const v=i=>$(i).value.trim();$("#cp").value=`Salut Jack ! Je suis ${v("#cn")||"[ton pseudo]"} (${v("#cl")||"[ta chaîne]"}).\nJe te contacte pour : ${v("#ct")}.\n\n${v("#cm")||"[ton message]"}`};
["#cn","#cl","#ct","#cm"].forEach(i=>$(i).oninput=cmsg);cmsg();
$("#cc").onclick=async()=>{const b=$("#cc");try{await navigator.clipboard.writeText($("#cp").value)}catch(e){$("#cp").select();document.execCommand("copy")}ach("cp");b.textContent="Copié, colle-le sur Discord";setTimeout(()=>b.textContent="Copier le message",2500)};
/* labo */
const EV=[...new Set(G.flatMap(g=>g.evidence))].sort(),S={};EV.forEach(e=>S[e]=0);const ST=["","trouvée","exclue"];
$("#evs").innerHTML=EV.map(e=>`<button class="ev" data-e="${e}" data-s="0" aria-label="${e} : neutre"><b>${e}</b><span class="st"></span></button>`).join("");
$("#evs").onclick=e=>{const b=e.target.closest(".ev");if(!b)return;const k=b.dataset.e;S[k]=(S[k]+1)%3;b.dataset.s=S[k];b.querySelector(".st").textContent=ST[S[k]];b.setAttribute("aria-label",k+" : "+(ST[S[k]]||"neutre"));draw()};
function draw(){let n=0,last=null;const f=EV.filter(e=>S[e]==1);
$("#gh").innerHTML=G.map((g,i)=>{const ok=f.every(e=>g.evidence.includes(e))&&!g.evidence.some(e=>S[e]==2);if(ok){n++;last=g.name}
return`<div class="g tilt${ok?"":" off"}" tabindex="0" role="button" aria-expanded="false"><div class="gi"><div class="gf card"><strong>${g.name}${g.new?` <em class="nw">Nouveau</em>`:""}</strong><span class="tags">${g.evidence.map(e=>`<i class="${S[e]==1?"hit":""}">${e}</i>`).join("")}</span><small class="fl">Clique pour retourner la fiche</small></div><div class="gb card"><strong>${g.name}</strong><span class="tip">${g.tip}</span></div></div></div>`}).join("");
$("#cnt").textContent=n==1?"Un seul suspect : "+last:n+" suspects sur "+G.length;
if(n==1)$("#gh").querySelector(".g:not(.off)").classList.add("solo","open");if(n==1)ach("ghost");bindFx()}
$("#gh").onclick=e=>{const b=e.target.closest(".g");if(!b)return;b.classList.toggle("open");b.setAttribute("aria-expanded",b.classList.contains("open"))};
$("#gh").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){const b=e.target.closest(".g");if(b){e.preventDefault();b.click()}}};
$("#rst").onclick=()=>{EV.forEach(e=>S[e]=0);$$(".ev").forEach(b=>{b.dataset.s=0;b.querySelector(".st").textContent=""});draw()};
$("#rnd").onclick=()=>{$("#rst").click();const c=$$(".g"),g=c[Math.random()*c.length|0];c.forEach(x=>x!==g&&x.classList.add("off"));g.classList.add("open","solo");$("#cnt").textContent="Dossier tiré au hasard : "+g.querySelector("strong").textContent};draw();
/* wow */
let tab="dungeons",sel=0;$("#upd").textContent="Catalogue mis à jour le "+W.updated+".";
function list(){const q=norm($("#q").value),L=W[tab].map((d,i)=>[d,i]).filter(([d])=>!q||norm(d.name+d.zone).includes(q)||d.bosses.some(b=>norm(b.name).includes(q)));
$("#il").innerHTML=L.map(([d,i])=>`<button data-i="${i}" aria-current="${i==sel}">${d.name}<small>${d.zone}${d.level?" · niveau "+d.level:""} · ${d.bosses.length} boss</small></button>`).join("")||`<p style="padding:1rem">Aucun résultat. Essaie un autre nom de boss.</p>`;
const d=W[tab][sel];$("#det").innerHTML=d?`<h3>${d.name}</h3><p class="meta">${d.zone}${d.level?" · niveau "+d.level:""}${d.season?" · "+d.season:""}</p>${d.bosses.map(b=>`<div class="boss"><b>${b.name}</b><span>${b.context}</span></div>`).join("")}`:""}
$("#il").onclick=e=>{const b=e.target.closest("button");if(b){sel=+b.dataset.i;list()}};$("#q").oninput=list;
$$(".tab").forEach(b=>b.onclick=()=>{tab=b.dataset.t;sel=0;$$(".tab").forEach(x=>x.setAttribute("aria-pressed",x===b));list()});list();
bindFx();
/* pages */
const ROUTE={accueil:"accueil",univers:"explorer",experience:"explorer",live:"accueil",labo:"phasmo",defi:"phasmo",phasmo:"phasmo",wow:"wow",chaines:"communaute",collab:"communaute",communaute:"communaute",talents:"accueil",clips:"clips"};
function route(h){const id=(h||"").replace("#","")||"accueil",v=ROUTE[id]||"accueil",el=document.getElementById(id);
const sw=()=>{$$(".view").forEach(x=>x.classList.toggle("on",x.dataset.v===v));$$("nav a").forEach(a=>a.classList.toggle("cur",a.dataset.v===v));el&&id!==v?el.scrollIntoView():scrollTo(0,0);VIS.add(v);ach("v-"+v);nxt()};
if(curV===v||calm||curV===null){curV=v;sw();return}curV=v;const s=$("#sw");s.classList.remove("go");void s.offsetWidth;s.classList.add("go");setTimeout(sw,280)}
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();const h=a.getAttribute("href");route(h);try{history.replaceState(null,"",h)}catch(_){}});
addEventListener("hashchange",()=>route(location.hash));route(location.hash||"#accueil");
/* défi */
let dq=null,streak=0,best=0,dd=false;const same=(a,b)=>a.length==b.length&&a.every(x=>b.includes(x));
function dnew(){dd=false;dq=G[Math.random()*G.length|0];const o=[dq.name];while(o.length<4){const n=G[Math.random()*G.length|0].name;if(!o.includes(n))o.push(n)}o.sort(()=>Math.random()-.5);
$("#dq").innerHTML=dq.evidence.map(e=>`<i>${e}</i>`).join("");$("#do").innerHTML=o.map(x=>`<button class="btn" type="button">${x}</button>`).join("");$("#dm").textContent=""}
$("#do").onclick=e=>{const b=e.target.closest("button");if(!b||dd)return;dd=true;const g=G.find(x=>x.name===b.textContent),ok=same(g.evidence,dq.evidence);
if(ok){streak++;best=Math.max(best,streak);ach("d1");if(streak>=3)ach("d3");b.classList.add("ok");$("#dm").textContent="Bien joué ! "+g.tip}else{streak=0;b.classList.add("ko");$$("#do button").forEach(x=>x.textContent===dq.name&&x.classList.add("ok"));$("#dm").textContent="Raté : c’était "+dq.name+". "+dq.tip}
$("#ds").textContent=`Série : ${streak} · Record : ${best}`};
$("#dn").onclick=dnew;dnew();
$("#wr").onclick=()=>{ach("bs");const k=Math.random()<.5?"dungeons":"raids";tab=k;sel=Math.random()*W[k].length|0;$("#q").value="";$$(".tab").forEach(x=>x.setAttribute("aria-pressed",x.dataset.t===k));list();const bs=$$(".boss"),b=bs[Math.random()*bs.length|0];b.classList.add("hl");b.scrollIntoView({block:"center"})};

/* engagement */
$$(".wt").forEach(b=>b.onclick=()=>{const h="parent="+(location.hostname||"dctraplan.github.io")+"&parent=dctraplan.github.io";b.closest(".card").querySelector(".fi").innerHTML=`<iframe src="https://player.twitch.tv/?channel=${b.dataset.ch}&muted=true&${h}" allowfullscreen title="Live de ${b.dataset.ch}" style="width:100%;height:100%;border:0"></iframe>`;ach("tal");b.textContent="Lecteur chargé"});
let ck=0;document.addEventListener("click",e=>{if(e.target.closest("#sn"))return;if(!e.target.closest("a,button,.g,.card"))return;beep(520,.05);if(ck<60){ck++;XP++;hud();const f=document.createElement("div");f.className="flt";f.textContent="+1 XP";f.style.left=e.clientX+"px";f.style.top=e.clientY+"px";document.body.appendChild(f);setTimeout(()=>f.remove(),900)}});
$("#xpb").onclick=e=>{if(e.target.closest("#sn")){snd=!snd;$("#sn").setAttribute("aria-pressed",snd);$("#sn").setAttribute("aria-label",snd?"Couper les sons":"Activer les sons");beep(660,.1);return}const p=$("#ap");p.hidden=!p.hidden;if(!p.hidden)ap()};
setTimeout(()=>ach("t2"),120000);setTimeout(()=>ach("t5"),300000);nxt();
