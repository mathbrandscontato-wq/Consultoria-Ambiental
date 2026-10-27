// Vídeo decorativo automático, respeitando movimento reduzido e economia de dados.
const video=document.querySelector('.ha-video');
if(video){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=true,userPaused=false;
 const update=()=>{
  const enabled=!userPaused&&!reduced.matches&&!navigator.connection?.saveData&&!document.hidden&&visible;
  if(!enabled){video.pause();return;}
  if(!video.getAttribute('src'))video.src=matchMedia('(max-width:820px)').matches?video.dataset.mobile:video.dataset.desktop;
  video.play().catch(()=>{});
 };
 const pause=document.querySelector('.video-pause');
 pause?.addEventListener('click',()=>{userPaused=!userPaused;pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Reproduzir vídeo de fundo':'Pausar vídeo de fundo');pause.innerHTML=userPaused?'<svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m8 5 11 7-11 7Z"/></svg>':'<svg class="ui-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 5v14M15 5v14"/></svg>';update();});
 reduced.addEventListener('change',update);
 document.addEventListener('visibilitychange',update);
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){visible=entry.isIntersecting;update();}},{threshold:.01});observer.observe(video);}
 update();
}
