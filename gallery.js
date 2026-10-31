'use strict';
const $=id=>document.getElementById(id);
const gallery=$('gallery'),dialog=$('viewer');
let all=[],visible=[],activeCategory='All screens',currentIndex=-1,lastTrigger=null;
function element(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
function categoryButtons(){
  const categories=['All screens',...new Set(all.map(s=>s.category))];
  $('categories').replaceChildren(...categories.map(name=>{
    const b=element('button','category');b.type='button';b.dataset.category=name;b.setAttribute('aria-pressed',String(name===activeCategory));
    b.append(element('span','',name),element('span','',String(name==='All screens'?all.length:all.filter(s=>s.category===name).length)));
    b.addEventListener('click',()=>{activeCategory=name;[...$('categories').children].forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===name)));render();$('screens').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});return b;
  }));
}
function render(){
  const query=$('search').value.trim().toLowerCase();
  visible=all.filter(s=>(activeCategory==='All screens'||s.category===activeCategory)&&[s.title,s.description,s.category,...s.steps].join(' ').toLowerCase().includes(query));
  $('library-title').textContent=activeCategory;
  $('result-count').textContent=`${visible.length} of ${all.length} screenshots · native Android · version 0.3.0`;
  $('empty').hidden=visible.length>0;
  gallery.replaceChildren(...visible.map((s,i)=>{
    const figure=element('figure','screen-card');
    const button=element('button','image-button');button.type='button';button.setAttribute('aria-label',`Open screenshot: ${s.title}`);
    const image=element('img');image.src=s.thumbnail||s.image;image.alt=s.title;image.width=1080;image.height=2220;image.loading='lazy';
    button.append(image,element('span','screen-number',String(all.indexOf(s)+1).padStart(2,'0')),element('span','zoom-hint','↗'));
    button.addEventListener('click',()=>openViewer(i,button));
    const info=element('figcaption','card-info');info.append(element('p','card-category',s.category),element('h3','',s.title),element('p','description',s.description));
    const view=element('button','view-button','View screen and steps');view.type='button';view.addEventListener('click',()=>openViewer(i,view));info.append(view);figure.append(button,info);return figure;
  }));
}
function openViewer(index,trigger){
  if(index<0||index>=visible.length)return;
  currentIndex=index;if(trigger)lastTrigger=trigger;
  const screen=visible[index];
  $('viewer-title').textContent=screen.title;$('viewer-category').textContent=screen.category;
  $('viewer-description').textContent=screen.description;$('viewer-image').src=screen.image;$('viewer-image').alt=screen.title;
  $('viewer-steps').replaceChildren(...screen.steps.map(step=>element('li','',step)));
  $('viewer-position').textContent=`${index+1} / ${visible.length} in this view`;
  $('previous').disabled=index===0;$('next').disabled=index===visible.length-1;
  $('original').href=screen.image;$('copy-status').textContent='';
  if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');
  history.replaceState(null,'',`#screen=${encodeURIComponent(screen.id)}`);
}
function closeViewer(){dialog.close();}
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');history.replaceState(null,'',location.pathname+location.search);if(lastTrigger?.isConnected)lastTrigger.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog)closeViewer();});
$('close').addEventListener('click',closeViewer);$('previous').addEventListener('click',()=>openViewer(currentIndex-1));$('next').addEventListener('click',()=>openViewer(currentIndex+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();openViewer(currentIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();openViewer(currentIndex+1);}});
$('copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('copy-status').textContent='Link copied.';}catch{$('copy-status').textContent='Copy the URL from your address bar to share this screen.';}});
$('search').addEventListener('input',render);
function openHashScreen(){
  if(!location.hash.startsWith('#screen=')||!all.length)return;
  let id;try{id=decodeURIComponent(location.hash.slice(8));}catch{return;}
  if(!all.some(s=>s.id===id))return;
  activeCategory='All screens';$('search').value='';categoryButtons();render();
  openViewer(visible.findIndex(s=>s.id===id));
}
window.addEventListener('hashchange',openHashScreen);
fetch('screenshots.json').then(r=>{if(!r.ok)throw Error('Manifest unavailable');return r.json();}).then(data=>{
  all=data;categoryButtons();render();
  openHashScreen();
}).catch(()=>{$('result-count').textContent='The screenshot list could not load. Please refresh or use the GitHub index.';});
