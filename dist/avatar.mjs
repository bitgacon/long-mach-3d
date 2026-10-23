import * as T from './vendor/three.module.js';
import {GRADES,SLOTS} from './economy.mjs?v=0.4';
const skin=0xd6b28d,hair=0x20272b;
function mesh(parent,geometry,color,x=0,y=0,z=0,metal=false,glow=0){const material=new T.MeshStandardMaterial({color,metalness:metal?.65:.12,roughness:metal?.3:.75,emissive:color,emissiveIntensity:glow});const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
const box=(p,w,h,d,c,x,y,z,metal=false)=>mesh(p,new T.BoxGeometry(w,h,d),c,x,y,z,metal);
const orb=(p,r,c,x,y,z)=>mesh(p,new T.SphereGeometry(r,12,8),c,x,y,z);
const cone=(p,rt,rb,h,c,x,y,z,metal=false)=>mesh(p,new T.CylinderGeometry(rt,rb,h,10),c,x,y,z,metal);
const group=(p,x=0,y=0,z=0)=>{const g=new T.Group();g.position.set(x,y,z);p.add(g);return g;};
export function disposeObject(root){const gs=new Set(),ms=new Set();root.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])ms.add(m);});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}
export function makeCharacter(color=0x356977,klass='kiem'){
 const g=new T.Group(),rig=group(g);g.userData={rig,klass,baseColor:color,legs:[],arms:[]};
 for(const side of [-1,1]){const leg=group(rig,side*.23,1.22,0);cone(leg,.18,.15,.78,0x26333d,0,-.37,0);box(leg,.34,.3,.53,0x1b282f,0,-1.01,.08);g.userData.legs.push(leg);}
 cone(rig,.34,.59,.85,color,0,1.18,0);cone(rig,.48,.35,.82,color,0,1.98,0);cone(rig,.36,.36,.12,0xbca06c,0,1.58,0,true);
 for(const side of [-1,1]){const lapel=box(rig,.12,.79,.08,0xe0cd9e,side*.13,2,.4);lapel.rotation.z=side*.26;}
 cone(rig,.15,.17,.2,skin,0,2.49,0);const head=orb(rig,.3,skin,0,2.79,0);head.scale.set(.85,1.18,.84);
 const cap=orb(rig,.3,hair,0,2.93,-.045);cap.scale.set(.93,.7,.9);orb(rig,.14,hair,0,3.16,-.06);
 for(const side of [-1,1]){orb(rig,.06,skin,side*.26,2.79,0);box(rig,.065,.024,.025,0x222027,side*.105,2.84,.24);const brow=box(rig,.085,.018,.03,hair,side*.1,2.9,.23);brow.rotation.z=side*.13;const lock=cone(rig,.05,.025,.5,hair,side*.25,2.75,-.09);lock.rotation.x=-.1;}
 cone(rig,.045,.06,.12,skin,0,2.77,.26).rotation.x=Math.PI/2;box(rig,.1,.015,.02,0x795248,0,2.66,.238);
 for(const side of [-1,1]){const arm=group(rig,side*.55,2.25,0);orb(arm,.23,color,0,0,0);cone(arm,.17,.13,.7,color,0,-.36,0);orb(arm,.13,skin,0,-.8,0);g.userData.arms.push(arm);}
 const cape=mesh(rig,new T.CylinderGeometry(.34,.65,1.65,12,1,true,Math.PI/2,Math.PI),color,0,1.45,-.03);cape.material.side=T.DoubleSide;
 dressCharacter(g,{items:[],equipped:{},class:klass});return g;
}
export function dressCharacter(g,s){
 const key=JSON.stringify([s.class,Object.entries(s.equipped||{}).map(([slot,id])=>[slot,s.items.find(i=>i.id===id)])]);if(g.userData.gearKey===key)return;g.userData.gearKey=key;
 for(const old of g.userData.gearParts||[]){old.removeFromParent();disposeObject(old);}const parts=[];g.userData.gearParts=parts;
 const {rig,arms,legs}=g.userData;const mount=(parent)=>{const p=group(parent);parts.push(p);return p;};
 const get=slot=>s.items.find(i=>i.id===s.equipped?.[slot]);const color=it=>GRADES[it?.grade??0].hex;
 for(const slot of Object.keys(SLOTS)){
  const it=get(slot);if(!it&&slot!=='mainhand')continue;const c=color(it),gold=it?.grade>=3?0xf4d48b:0xa9bac2,glow=(it?.enhance||0)/32,p=mount(rig);
  if(slot==='helmet'){cone(p,.29,.34,.25,c,0,3.04,0,true);for(const side of [-1,1]){const crest=mesh(p,new T.ConeGeometry(.09,.55,5),gold,side*.26,3.25,-.03,true);crest.rotation.z=side*-.35;}orb(p,.08,gold,0,3.09,.31);}
  if(slot==='chest'){cone(p,.52,.4,.75,c,0,1.99,0,true);for(const side of [-1,1]){const shoulder=mesh(p,new T.SphereGeometry(.3,8,6),c,side*.58,2.3,0,true);shoulder.scale.set(1.2,.55,1.1);box(p,.09,.55,.08,gold,side*.3,2,.43,true);}const gem=mesh(p,new T.OctahedronGeometry(.14),gold,0,2.16,.45,true,glow);gem.scale.z=.4;}
  if(slot==='pants'){cone(p,.38,.62,.6,c,0,1.22,0,true);for(const side of [-1,1])box(p,.17,.49,.06,gold,side*.3,1.23,.46,true);}
  if(slot==='gloves')for(const arm of arms){const q=mount(arm);cone(q,.19,.17,.34,c,0,-.68,0,true);box(q,.13,.21,.06,gold,0,-.68,.16,true);}
  if(slot==='boots')for(const leg of legs){const q=mount(leg);cone(q,.19,.18,.4,c,0,-.83,0,true);box(q,.39,.24,.63,c,0,-1.04,.1,true);box(q,.08,.32,.04,gold,0,-.82,.2,true);}
  if(slot==='mainhand'){
   const q=mount(arms[1]);q.position.y=-.8;const klass=s.class||g.userData.klass;if(klass==='npc')continue;
   const h=klass==='thuong'?3.2:klass==='phap'?2.6:2.1;cone(q,.045,.06,h,klass==='phap'?0x6e4832:gold,0,h/2-.3,0,true);
   if(klass==='phap'){const gem=mesh(q,new T.OctahedronGeometry(.26),c,0,h-.16,0,true,.5+glow);const ring=mesh(q,new T.TorusGeometry(.34,.035,8,24),gold,0,h-.16,0,true);ring.rotation.y=.3;}
   else{box(q,.17,h*.6,.07,c,0,h*.54,0,true);mesh(q,new T.ConeGeometry(.14,.45,4),c,0,h-.15,0,true,glow).scale.z=.35;box(q,.65,.1,.14,gold,0,.23,0,true);orb(q,.09,c,0,-.35,0);}
   if(it?.tier>1)for(let j=0;j<it.tier-1;j++)orb(q,.055,c,0,.3+j*.2,.1);
  }
  if(slot==='offhand'){const q=mount(arms[0]);const shield=mesh(q,new T.CylinderGeometry(.43,.32,.14,6),c,-.08,-.52,.12,true);shield.rotation.x=Math.PI/2;mesh(q,new T.OctahedronGeometry(.17),gold,-.08,-.52,.23,true,glow);}
  if(slot==='necklace'){const chain=mesh(p,new T.TorusGeometry(.25,.025,8,24),gold,0,2.28,.25,true);chain.scale.y=.8;mesh(p,new T.OctahedronGeometry(.09),c,0,2.04,.46,true,.3);}
  if(slot==='bracelet'){const q=mount(arms[0]);const b=mesh(q,new T.TorusGeometry(.17,.045,8,24),c,0,-.78,0,true,.15);b.rotation.x=Math.PI/2;}
  if(slot==='ring'){const q=mount(arms[1]);mesh(q,new T.TorusGeometry(.07,.025,6,16),gold,.08,-.86,.075,true);orb(q,.045,c,.08,-.8,.12);}
  if(slot==='wings')for(const side of [-1,1]){const wing=group(p,side*.23,2.25,-.35);for(let j=0;j<7;j++){const feather=mesh(wing,new T.ConeGeometry(.16,1.95-j*.12,5),j%2?gold:c,side*(.2+j*.24),.1-j*.11,-j*.07,true,glow);feather.rotation.z=side*(-.8-j*.07);} }
 }
}

// Original vector illustrations stay crisp at inventory and mobile sizes.
const shapes={helmet:'M14 39V27Q14 12 32 12Q50 12 50 27V39L39 48V32H25V48ZM22 14L17 5L30 13M42 14L47 5L34 13',chest:'M22 11L32 17L42 11L56 22L48 34L43 29L46 54H18L21 29L16 34L8 22ZM25 23L32 29L39 23M32 29V48',pants:'M19 10H45L48 54H35L32 32L29 54H16ZM19 19H45',gloves:'M17 31V19Q21 15 24 20V30L25 12Q29 9 31 13V28L33 10Q37 8 39 12V29L41 17Q45 15 47 19V39L40 52H23L14 39L10 29Q13 23 17 31',boots:'M23 9H42L39 36L52 45V53H15V43L23 34ZM23 18H41M24 27H40',mainhand:'M29 7L37 3L37 39L33 44L29 39ZM19 39H47V44H19ZM30 44H36V56H30Z',offhand:'M32 7L52 17L48 42L32 56L16 42L12 17ZM32 16V45M22 27H42',necklace:'M12 14Q8 39 32 42Q56 39 52 14M32 36L42 46L32 58L22 46Z',bracelet:'M12 32A20 20 0 1 0 52 32A20 20 0 1 0 12 32M20 32A12 12 0 1 1 44 32A12 12 0 1 1 20 32M32 8L40 16L32 24L24 16Z',ring:'M18 39A14 14 0 1 0 46 39A14 14 0 1 0 18 39M23 39A9 9 0 1 1 41 39A9 9 0 1 1 23 39M32 6L44 17L32 29L20 17Z',wings:'M31 47Q8 40 5 10L23 25L31 40M33 47Q56 40 59 10L41 25L33 40M10 25L26 35M54 25L38 35M15 38L28 42M49 38L36 42',ore:'M12 43L20 15L38 8L53 32L44 53L23 56ZM20 15L31 36L53 32M31 36L23 56',herb:'M31 56V22M31 40Q8 40 9 19Q30 21 31 40M32 30Q34 9 55 10Q53 31 32 30',energy:'M32 5Q58 27 49 44Q32 62 15 44Q6 27 32 5M32 23Q45 36 32 48Q19 36 32 23',essence:'M32 7L53 32L32 57L11 32ZM22 32L32 20L42 32L32 44Z',cloth:'M15 14L45 9L52 49L22 55ZM15 14L10 49L22 55M23 22L42 18M25 33L44 29',steel:'M10 39L20 20L47 17L55 39L43 49L16 49ZM10 39H55M20 20L26 39M47 17L43 39',gem:'M19 13H45L56 27L32 55L8 27ZM8 27H56M19 13L25 27L32 55L39 27L45 13',feather:'M12 56L43 13M20 46Q7 22 39 7Q59 12 43 36L20 46M21 42L26 21M29 33L47 27',stone:'M32 7L53 20V44L32 57L11 44V20ZM23 26L32 20L41 26V38L32 44L23 38Z'};
export function itemIcon(key,grade=0){const c=GRADES[grade]?.hex||'#c8c5b8';return `<svg class="item-art" viewBox="0 0 64 64" aria-hidden="true"><path d="${shapes[key]||shapes.gem}" fill="${c}" fill-opacity=".28" stroke="${c}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;}

export function mountAvatar(canvas,s){
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
 const scene=new T.Scene();scene.add(new T.HemisphereLight(0xc3e8ff,0x403422,2.5));const key=new T.DirectionalLight(0xffe1af,4);key.position.set(3,6,5);scene.add(key);const rim=new T.DirectionalLight(0x87c4ff,3);rim.position.set(-3,3,-3);scene.add(rim);
 const model=makeCharacter({kiem:0x386d75,phap:0x685185,thuong:0x805144}[s.class],s.class);dressCharacter(model,s);scene.add(model);model.rotation.y=-.32;
 const floor=mesh(scene,new T.CylinderGeometry(1.2,1.4,.16,48),0x24434c,0,-.13,0,true);const ring=mesh(scene,new T.TorusGeometry(1.18,.025,8,64),0xd6bd81,0,-.04,0,true,.2);ring.rotation.x=Math.PI/2;
 const camera=new T.PerspectiveCamera(36,1,.1,50);let zoom=8.2;const resize=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 let frame,stopped=false,drag=null;canvas.onpointerdown=e=>{drag=e.clientX;canvas.setPointerCapture(e.pointerId);};canvas.onpointermove=e=>{if(drag!==null){model.rotation.y+=(e.clientX-drag)*.012;drag=e.clientX;}};canvas.onpointerup=canvas.onpointercancel=()=>drag=null;
 const wheel=e=>{e.preventDefault();zoom=Math.max(5.4,Math.min(9,zoom+e.deltaY*.005));};canvas.addEventListener('wheel',wheel,{passive:false});
 const render=t=>{if(stopped)return;if(!document.hidden){camera.position.set(0,2.15,zoom);camera.lookAt(0,1.65,0);model.userData.rig.position.y=Math.sin(t*.0018)*.018;renderer.render(scene,camera);}frame=requestAnimationFrame(render);};frame=requestAnimationFrame(render);
 return {rotate:a=>model.rotation.y+=a,dispose(){stopped=true;cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('wheel',wheel);disposeObject(scene);renderer.dispose();}};
}
