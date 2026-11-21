(()=>{'use strict';
const surprises=[
['Le refuge ouvre ses portes','Bienvenue à la maison ! Aujourd’hui, partage ton jeu préféré avec la communauté.'],
['La lampe torche','Défi Phasmophobia : raconte ton plus gros sursaut.'],
['Le grimoire oublié','WoW : quelle classe choisirais-tu pour une aventure sans fin ?'],
['Décollage immédiat','Star Citizen : plutôt exploration, commerce ou pilotage ?'],
['Pause chocolat chaud','Prends cinq minutes pour découvrir un petit créateur sur Twitch.'],
['Le fantôme farceur','Imagine un nom ridicule pour un fantôme de Phasmophobia.'],
['La quête du jour','Quel est ton meilleur souvenir de jeu en coopération ?'],
['Le coffre mystérieux','Choisis un objet gaming imaginaire que tu aimerais trouver.'],
['Le salon des aventuriers','Passe dire bonjour sur le Discord de Jack !'],
['L’inventaire','Quel objet de jeu vidéo garderais-tu dans la vraie vie ?'],
['Le vaisseau du Père Noël','Dessine mentalement le vaisseau spatial du Père Noël.'],
['La pause lore','Raconte un détail de lore qui t’a marqué.'],
['La Banshee revient','Phasmophobia : quel fantôme te fait le plus peur ?'],
['L’équipage','Remercie un joueur ou un créateur qui t’a aidé cette année.'],
['Le défi sans panique','Essaie de rester calme pendant ta prochaine chasse aux fantômes. Bonne chance !'],
['Le portail','Si tu pouvais visiter un univers de jeu, lequel choisirais-tu ?'],
['Le rire contagieux','Partage ton clip gaming le plus drôle avec un ami.'],
['La playlist du refuge','Quelle musique accompagne tes sessions gaming ?'],
['La soirée découverte','Découvre un jeu indépendant que tu ne connais pas encore.'],
['La guilde','Quel serait le nom de ta guilde idéale ?'],
['La cabine du pilote','Star Citizen : ta destination de rêve dans les étoiles ?'],
['Le dernier indice','Phasmophobia : quel indice te fait dire « on rentre » ?'],
['Le cadeau invisible','Offre un mot gentil à quelqu’un de la communauté.'],
['La veille de Noël','Merci de faire vivre ce refuge. Passe un merveilleux réveillon !']
];
const grid=document.getElementById('xmasGrid'),status=document.getElementById('xmasStatus'),reveal=document.getElementById('xmasReveal');if(!grid||!status||!reveal)return;
const now=new Date(),year=now.getFullYear(),month=now.getMonth()+1,day=now.getDate();const active=year===2026&&month===12&&day>=5&&day<=25;const finished=year>2026||(year===2026&&month===12&&day>25);const before=year<2026||(year===2026&&(month<12||(month===12&&day<5)));
if(before)status.textContent='Ouverture du calendrier le 5 décembre 2026, pour le lancement officiel !';else if(active)status.textContent=day===25?'🎁 Joyeux Noël ! Merci de faire partie du refuge.':`Aujourd’hui, découvre la case ${day} ! Les cases précédentes restent accessibles.`;else if(finished)status.textContent='L’édition Noël 2026 est terminée. Merci d’avoir joué avec nous !';else status.textContent='Les surprises de Noël 2026 seront bientôt disponibles.';
function show(n){const title=document.getElementById('xmasRevealTitle'),body=document.getElementById('xmasRevealText');if(n===25){title.textContent='🎁 Joyeux Noël de la part de Jack !';body.textContent='Merci pour tes visites, tes messages et tes moments de rire. Que ton Noël soit doux, avec du gaming et de belles rencontres !';}else{title.textContent=`Case ${n} — ${surprises[n-1][0]}`;body.textContent=surprises[n-1][1];}reveal.hidden=false;reveal.scrollIntoView({behavior:'smooth',block:'nearest'});}
for(let n=1;n<=25;n++){const unlocked=year===2026&&month===12&&day>=n&&day>=5||finished;const b=document.createElement('button');b.type='button';b.className='xmas-door'+(unlocked?' unlocked':' locked')+(active&&n===day?' today':'');b.disabled=!unlocked;b.setAttribute('aria-label',unlocked?`Ouvrir la surprise du ${n} décembre`:`Case ${n}, disponible le ${Math.max(n,5)} décembre`);b.innerHTML=`<span class="xmas-door-num">${n}</span><span class="xmas-door-icon" aria-hidden="true">${unlocked?'✦':'✧'}</span>`;if(unlocked)b.addEventListener('click',()=>show(n));grid.appendChild(b);}
document.getElementById('xmasClose')?.addEventListener('click',()=>{reveal.hidden=true;});
})();