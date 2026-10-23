import {createCreature} from './creatures.mjs?v=0.5';
import {makeCharacter,dressCharacter} from './avatar.mjs?v=0.5';
import * as T from './vendor/three.module.js';
import {CLASSES,NPCS,OBSTACLES,SHRINES,distance,stats} from './engine.mjs?v=0.5';
import {GRADES,PETS} from './economy.mjs?v=0.5';
const palette={ground:0x45624f,grass:0x597b58,dark:0x203e35,stone:0x829081,wood:0x594638,roof:0x234e53,gold:0xd8b771};
export class World {
 constructor(canvas,game,labels){
  this.game=game;this.region=game.getRegion();this.canvas=canvas;this.labels=labels;this.scene=new T.Scene();this.scene.background=new T.Color(this.region.fog);this.scene.fog=new T.FogExp2(this.region.fog,.007);this.renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
  this.camera=new T.PerspectiveCamera(48,1,.1,350);this.angle=.65;this.zoom=34;this.pitch=.72;this.focus=new T.Vector3(game.s.x,1.5,game.s.z);this.ray=new T.Raycaster();this.plane=new T.Plane(new T.Vector3(0,1,0),0);this.pointer=new T.Vector2();this.hit=new T.Vector3();this.mats=new Map();this.structures=[];this.occlusionRay=new T.Raycaster();this.effects=[];this.elapsed=0;this.entities=new Map();this.labelNodes=new Map();this.swing=0;
  this.scene.add(new T.HemisphereLight(0xe0eee2,0x42513f,2.1));this.sun=new T.DirectionalLight(0xffe3af,3.1);this.sun.position.set(20,65,30);this.sun.castShadow=true;this.sun.shadow.mapSize.set(1024,1024);Object.assign(this.sun.shadow.camera,{left:-42,right:42,top:42,bottom:-42,near:1,far:160});this.sun.shadow.normalBias=.06;this.sun.shadow.bias=-.0001;this.scene.add(this.sun,this.sun.target);
  this.terrain();this.buildVillage();this.buildShrines();this.buildPortal();this.buildEntities();this.player=this.human(CLASSES[game.s.class].color,game.s.class);this.scene.add(this.player);this.mounts=Object.fromEntries(['deer','wolf','tiger','dragon'].map(k=>[k,createCreature(k,true)]));for(const m of Object.values(this.mounts))this.scene.add(m);this.mount=this.mounts.deer;this.pets={fox:this.fox(),crane:this.crane(),turtle:this.turtle(),wolf:this.wolf(0xbecfdd),deer:this.deer(),phoenix:this.bird(),dragon:this.dragon(),tiger:this.tiger()};for(const pet of Object.values(this.pets))this.scene.add(pet);this.pet=this.pets.fox;
  this.marker=this.ring(0xf5d18b,1.1);this.scene.add(this.marker);this.marker.visible=false;this.selection=this.ring(0xd78566,2);this.scene.add(this.selection);this.selection.visible=false;
  this.resize();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(canvas);this.quality(game.s.settings.quality);
 }

 regionalTerrain(){
  const r=this.region,b=r.biome;
  this.mesh(new T.PlaneGeometry(440,380),r.ground,90,-.1,60).rotation.x=-Math.PI/2;
  this.path([[32,128],[32,96],[62,84],[80,63],[107,49],[107,30]],5,b==='snow'?0xd8e5e5:b==='volcano'?0x8d6350:0xb4af8f);
  this.path([[62,84],[93,110],[128,105],[151,85],[144,55],[107,49]],4,b==='snow'?0xc8dbe1:0x998b6e);
  for(let i=0;i<35;i++){const x=12+(i*37%161),z=15+(i*53%115);if(Math.hypot(x-32,z-97)<17||Math.abs(x-107)<12)continue;
   if(b==='bamboo')for(let j=0;j<3;j++)this.bamboo(x+j,z+j*.5,5+(i%4));
   if(b==='snow'){this.tree(x,z,2.2,true);this.mesh(new T.ConeGeometry(2.5,3.8,7),0xe1edf0,x,5,z);}
   if(b==='volcano'){const rock=this.orb(1.5+i%3,0x3f3b3c,x,1,z);rock.scale.y=1.6;this.orb(.5,0xf0753f,x,2.5,z,undefined,0,{emissive:0xfa5626,emissiveIntensity:2});}
   if(b==='sky'){this.cylinder(.6,.8,5,0xd5caa4,x,2.5,z);this.orb(.7,0xe7bc66,x,5.5,z,undefined,0,{emissive:0xaa8037,emissiveIntensity:.5});}
  }
  if(b==='snow'){this.mesh(new T.CircleGeometry(15,50),0x79b2cf,23,.02,28,undefined,{metalness:.5,roughness:.16}).rotation.x=-Math.PI/2;for(let i=0;i<8;i++)this.mesh(new T.ConeGeometry(2,7,5),0x9fd1df,12+i*4,3.5,12);}
  if(b==='volcano'){for(let i=0;i<8;i++){const lava=this.box(6,.1,11,0xff773e,153+i%2*3,.03,20+i*8);lava.material=this.material(0xff773e,{emissive:0xd93c18,emissiveIntensity:1});}this.mesh(new T.ConeGeometry(18,24,8),0x3d3438,160,12,15);}
  if(b==='sky'){for(let i=0;i<16;i++){const cloud=this.orb(6,0xe9e4d8,(i*43)%180,-1,(i*61)%140,undefined,1);cloud.scale.set(2,.25,1);}for(let i=0;i<7;i++)this.box(12,.7,5,0xe6d8ac,107,.4,39+i*7);}
  for(let i=0;i<20;i++){const a=i/20*Math.PI*2;this.mesh(new T.ConeGeometry(20,25+i%4*10,5),r.fog,90+Math.sin(a)*135,10,70+Math.cos(a)*120);}
  this.particles=new T.BufferGeometry();const pts=new Float32Array(90*3);for(let i=0;i<90;i++){pts[i*3]=(i*47)%180;pts[i*3+1]=2+(i*13)%13;pts[i*3+2]=(i*61)%140;}this.particles.setAttribute('position',new T.BufferAttribute(pts,3));this.scene.add(new T.Points(this.particles,new T.PointsMaterial({color:b==='volcano'?0xff9c56:0xf5ead0,size:b==='snow'?.2:.12,transparent:true,opacity:.7})));
 }
 buildPortal(){const p=this.region.portal,g=new T.Group();g.position.set(p.x,0,p.z);this.scene.add(g);for(const x of [-2.2,2.2])this.cylinder(.45,.7,5,0x9aab9f,x,2.5,0,g);this.box(6,.7,1,0xc4b782,0,5,0,g);const ring=this.ring(0x8cd9ed,2.3);ring.rotation.x=0;ring.position.y=2.5;g.add(ring);this.entities.set('portal',g);this.makeLabel('portal','Cổng dịch chuyển · E','npc');}
 bird(){return createCreature('bird');}
 dragon(){return createCreature('dragon');}
 tiger(){return createCreature('tiger');}

 dispose(){this.observer.disconnect();const geometries=new Set(),materials=new Set();this.scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();this.renderer.dispose();this.labels.replaceChildren();}

 material(color,extra={}){const key=color+JSON.stringify(extra);if(!this.mats.has(key))this.mats.set(key,new T.MeshStandardMaterial({color,roughness:.85,...extra}));return this.mats.get(key);}
 mesh(geometry,color,x=0,y=0,z=0,parent=this.scene,extra={}){const m=new T.Mesh(geometry,this.material(color,extra));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 box(w,h,d,c,x,y,z,p){return this.mesh(new T.BoxGeometry(w,h,d),c,x,y,z,p);}
 cylinder(rt,rb,h,c,x,y,z,p,segments=8){return this.mesh(new T.CylinderGeometry(rt,rb,h,segments),c,x,y,z,p);}
 orb(r,c,x,y,z,p,detail=0,extra={}){return this.mesh(new T.IcosahedronGeometry(r,detail),c,x,y,z,p,extra);}
 ring(color,r){const m=new T.Mesh(new T.RingGeometry(r*.88,r,48),new T.MeshBasicMaterial({color,transparent:true,opacity:.7,side:T.DoubleSide,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=.08;return m;}
 path(points,width,color){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(p[0],.035,p[1]))),ps=curve.getPoints(65);for(let i=0;i<ps.length-1;i++){const a=ps[i],b=ps[i+1],m=this.box(width,.06,a.distanceTo(b)+.2,color,(a.x+b.x)/2,.01,(a.z+b.z)/2);m.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);m.castShadow=false;}}
 terrain(){if(this.region.id!=='van')return this.regionalTerrain();
  this.mesh(new T.PlaneGeometry(440,380),palette.ground,90,-.1,60).rotation.x=-Math.PI/2;
  this.path([[29,134],[32,98],[45,88],[67,84],[91,65],[108,43],[107,30]],5.4,0x9b9b7f);this.path([[67,84],[89,93],[115,87],[137,71],[156,50],[159,23]],4.7,0x91947b);this.path([[108,43],[130,44],[156,50]],3.2,0x898e77);
  const water=this.mesh(new T.CircleGeometry(14.5,64),0x508d90,23,-.03,28,this.scene,{metalness:.3,roughness:.2,transparent:true,opacity:.9});water.rotation.x=-Math.PI/2;this.water=water;
  this.mesh(new T.CircleGeometry(17,40),0x839886,23,-.055,28).rotation.x=-Math.PI/2;
  let seed=913;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  const grassGeometry=new T.ConeGeometry(.18,.7,3),grass=new T.InstancedMesh(grassGeometry,this.material(0x708a5e),1200),matrix=new T.Matrix4(),pos=new T.Vector3(),scale=new T.Vector3(),quat=new T.Quaternion();
  for(let i=0;i<1200;i++){pos.set(rand()*180,.2,rand()*140);scale.setScalar(.6+rand());matrix.compose(pos,quat,scale);grass.setMatrixAt(i,matrix);}grass.receiveShadow=true;this.scene.add(grass);
  for(let i=0;i<100;i++){let x=rand()*180,z=rand()*140;if(this.game.obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.r+5)||Math.hypot(x-32,z-97)<15||Math.abs(z-(126-x*.65))<10||Math.hypot(x-107,z-35)<12||Math.hypot(x-159,z-23)<14)continue;const r=1.8+rand()*2.5;this.tree(x,z,r,rand()>.65);}
  for(let i=0;i<40;i++){let x=rand()*180,z=rand()*140;if(distance({x,z},{x:32,z:97})<15)continue;let r=.5+rand()*1.5;const m=this.orb(r,0x657a6b,x,r*.35,z);m.scale.set(1.2,.7,1);m.rotation.set(rand(),rand(),rand());}
  for(let i=0;i<28;i++){const a=i/28*Math.PI*2,x=90+Math.sin(a)*(125+rand()*25),z=70+Math.cos(a)*(110+rand()*20),h=25+rand()*48;const m=this.mesh(new T.ConeGeometry(22+rand()*15,h,5),i%2?0x6f8980:0x7f9589,x,h/2-3,z);m.rotation.y=rand()*3;m.castShadow=false;}
  for(let i=0;i<16;i++){this.bamboo(49+i%4*1.2,56+Math.floor(i/4)*1.3,4+rand()*2);}
  for(let i=0;i<22;i++){let x=8+rand()*48,z=74+rand()*52;if(Math.hypot(x-32,z-97)<12)continue;const m=this.orb(.2,0xd6ba88,x,.3,z);m.castShadow=false;}
  this.particles=new T.BufferGeometry();const pts=new Float32Array(180*3);for(let i=0;i<180;i++){pts[i*3]=rand()*180;pts[i*3+1]=2+rand()*14;pts[i*3+2]=rand()*140;}this.particles.setAttribute('position',new T.BufferAttribute(pts,3));this.scene.add(new T.Points(this.particles,new T.PointsMaterial({color:0xffe5a3,size:.12,transparent:true,opacity:.65,depthWrite:false})));
 }
 tree(x,z,r,pine=false){this.cylinder(.2,.4,r*2.2,0x594d3a,x,r*1.1,z);if(pine){for(let j=0;j<3;j++)this.mesh(new T.ConeGeometry(r*(1-j*.18),r*1.8,7),[0x2e5544,0x39634b,0x4b7354][j],x,r*1.7+j*r*.65,z);}else{const crown=this.orb(r,0x52765a,x,r*2.1,z,undefined,1);crown.scale.y=.75;this.orb(r*.72,0x749269,x-r*.5,r*2.5,z+.3,undefined,1);this.orb(r*.6,0x456b52,x+r*.6,r*2.1,z-.3,undefined,1);}}
 bamboo(x,z,h){this.cylinder(.1,.13,h,0x547a55,x,h/2,z,undefined,5);for(let j=1;j<5;j++){this.cylinder(.15,.15,.07,0x8da77c,x,j*h/5,z,undefined,5);let leaf=this.mesh(new T.ConeGeometry(.45,1.8,3),0x64865b,x+.4,j*h/5+.4,z);leaf.rotation.z=-1.1;}}
 roof(w,d,y,p,color=palette.roof){const geo=new T.BufferGeometry();const v=new Float32Array([-w/2,0,-d/2,w/2,0,-d/2,0,2,-d/2,-w/2,0,d/2,0,2,d/2,w/2,0,d/2,-w/2,0,-d/2,0,2,-d/2,0,2,d/2,-w/2,0,-d/2,0,2,d/2,-w/2,0,d/2,w/2,0,-d/2,w/2,0,d/2,0,2,d/2,w/2,0,-d/2,0,2,d/2,0,2,-d/2]);geo.setAttribute('position',new T.BufferAttribute(v,3));geo.computeVertexNormals();const m=this.mesh(geo,color,0,y,0,p,{side:T.DoubleSide});for(const x of [-w/2,w/2])this.box(.17,.2,d+.3,0x779082,x,y,0,p);this.box(.25,.3,d+.4,0xc7b17a,0,y+2,0,p);return m;}
 house(x,z,w=8,d=7){const g=new T.Group();g.position.set(x,0,z);this.scene.add(g);this.box(w+.7,.6,d+.7,0x7b8170,0,.3,0,g);this.box(w,3.6,d,0xc6b998,0,2.4,0,g);for(const a of [-1,1])for(const b of [-1,1])this.box(.35,4.4,.35,palette.wood,a*(w/2-.2),2.5,b*(d/2-.2),g);this.box(1.6,2.5,.1,0x4b443b,0,1.8,d/2+.07,g);this.box(2,1.3,.13,0x48665f,-w*.3,2.6,d/2+.1,g);for(let i=0;i<4;i++)this.box(.08,1.4,.15,0xb7ad86,-w*.3-.7+i*.45,2.6,d/2+.2,g);this.roof(w+2,d+2,4.5,g);this.lantern(x+w/2+.5,z+d/2+.5);g.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.transparent=true;}});this.structures.push(g);}
 lantern(x,z){this.cylinder(.08,.12,3.4,0x554637,x,1.7,z);this.box(1,.12,.12,0x554637,x+.4,3.3,z);this.cylinder(.3,.33,.65,0xdac58c,x+.75,2.9,z,undefined,6);this.orb(.16,0xffd087,x+.75,2.9,z,undefined,0,{emissive:0xffaa55,emissiveIntensity:2});}
 buildVillage(){
  const floor=this.mesh(new T.CircleGeometry(14,12),0x95977c,32,-.02,97);floor.rotation.x=-Math.PI/2;this.house(18,90);this.house(45,102,9,8);this.house(22,116,7,6);this.house(46,81,7,6);
  for(let i=0;i<9;i++){this.box(2.2,.13,1,0xb1ac90,32,.04,86+i*1.6);}
  const gate=new T.Group();gate.position.set(35,0,75);this.scene.add(gate);this.cylinder(.3,.4,6.5,0x6f4739,-4,3.25,0,gate);this.cylinder(.3,.4,6.5,0x6f4739,4,3.25,0,gate);this.box(10,.65,.7,0x6d493c,0,5.4,0,gate);this.roof(11,2,6.2,gate);this.box(2.8,1.4,.2,0x273f3b,0,5.6,.5,gate);
  this.box(2,1.2,1.8,0x5d665b,22,.6,101);this.cylinder(.65,.9,.5,0x8f7054,22,1.35,101);this.orb(.4,0xffcc75,22,1.65,101,undefined,0,{emissive:0xff7733,emissiveIntensity:2});
  this.pagoda(107,27,0x35565a,2);this.pagoda(159,16,0x4b424e,3);
  for(const n of this.game.npcs){const m=this.human(n.color,'npc');m.position.set(n.x,0,n.z);m.rotation.y=.5;this.scene.add(m);this.entities.set(n.id,m);this.makeLabel(n.id,n.name,'npc');const beacon=this.ring(n.id==='an'?0x7ee3d0:0xe7c787,1.3);beacon.position.set(n.x,.09,n.z);this.scene.add(beacon);}
 }
 pagoda(x,z,c,tiers){const g=new T.Group();g.position.set(x,0,z);this.scene.add(g);this.cylinder(10,11,.7,0x7f897c,0,.35,0,g,8);for(let j=0;j<3;j++)this.box(6-j,.3,2,0x9b9f8c,0,.15+j*.2,9-j*1.3,g);for(let i=0;i<tiers;i++){const w=10-i*2;for(let a of [-1,1])for(let b of [-1,1])this.cylinder(.25,.3,3.5,0x5c5144,a*(w/2-1),1.8+i*4,b*(w/2-1),g);this.roof(w+2,w+1,3.5+i*4,g,c);}this.orb(.6,0xe2c589,0,tiers*4+2,0,g,0,{metalness:.65,roughness:.3});}
 buildShrines(){for(const s of this.game.shrines){const g=new T.Group();g.position.set(s.x,0,s.z);this.scene.add(g);this.cylinder(1.5,2,.4,0x7a8078,0,.2,0,g,6);this.cylinder(.65,.9,3,0x515d5a,0,1.8,0,g,5);this.orb(.65,0x88d8b9,0,3.7,0,g,0,{emissive:0x42b7a5,emissiveIntensity:.8});this.entities.set('seal'+s.id,g);this.makeLabel('seal'+s.id,'Phong ấn '+(s.id+1),'seal');}}
 human(color,klass='kiem'){return makeCharacter(color,klass);}

 wolf(color=0x71847b){const g=new T.Group();const body=this.orb(.7,color,0,.85,0,g,1);body.scale.set(.7,.75,1.4);const head=this.orb(.4,color,0,1.2,.85,g,1);this.box(.34,.24,.5,0xa2a88e,0,1.08,1.15,g);for(let side of [-1,1]){this.mesh(new T.ConeGeometry(.16,.45,4),color,side*.23,1.62,.75,g);this.orb(.06,0xffcb73,side*.28,1.27,1.05,g,0,{emissive:0xffa04e,emissiveIntensity:1});}const legs=[];for(let a of [-1,1])for(let b of [-1,1]){const leg=this.box(.17,.7,.2,0x455a52,a*.35,.35,b*.5,g);legs.push(leg);}g.userData.legs=legs;const tail=this.mesh(new T.ConeGeometry(.25,1.2,5),color,0,1,-1,g);tail.rotation.x=-.9;return g;}
 fox(){return createCreature('fox');}
 crane(){return createCreature('crane');}
 turtle(){return createCreature('turtle');}
 deer(){return createCreature('deer');}
 buildEntities(){for(const e of this.game.enemies){let g=e.type==='wolf'?this.wolf():this.human(e.type==='cultist'?0x664c68:0x4d454f,'thuong');if(e.boss){g.scale.setScalar(e.type==='lord'?2.1:1.7);for(let a of [-1,1]){const horn=this.mesh(new T.ConeGeometry(.18,.8,5),0xb9a382,a*.35,3.5,0,g);horn.rotation.z=a*.4;}}g.position.set(e.x,0,e.z);this.scene.add(g);this.entities.set(e.id,g);this.makeLabel(e.id,e.name,e.boss?'boss':'enemy');const danger=this.ring(0xe2705c,e.range+1.8);this.scene.add(danger);g.userData.danger=danger;}
  for(const n of this.game.nodes){const g=new T.Group();g.position.set(n.x,0,n.z);this.scene.add(g);if(n.type==='ore'){this.orb(1,0x697d72,0,.3,0,g);for(let i=0;i<4;i++){const m=this.mesh(new T.ConeGeometry(.4,1.7+i*.2,5),i%2?0x95d7cd:0x559f9c,(i%2-.5)*.8,1.1,(Math.floor(i/2)-.5)*.8,g,{emissive:0x235b59,emissiveIntensity:.4,metalness:.25,roughness:.3});m.rotation.z=(i%2-.5)*.35;}}
   else if(n.type==='herb'){for(let i=0;i<6;i++){let a=i*Math.PI/3;const m=this.mesh(new T.ConeGeometry(.22,1.5,3),0x94b275,Math.sin(a)*.3,.6,Math.cos(a)*.3,g);m.rotation.z=Math.sin(a)*.5;m.rotation.x=Math.cos(a)*.5;}this.orb(.25,0xe4c88e,0,1.2,0,g);}
   else{this.cylinder(.9,1.2,.5,0x7b8979,0,.25,0,g);const orb=this.orb(.65,0x77d3c5,0,1.6,0,g,1,{emissive:0x57c5b4,emissiveIntensity:1.5,transparent:true,opacity:.75});g.userData.orb=orb;const ring=this.ring(0x8fe8d6,1.4);g.add(ring);}this.entities.set(n.id,g);this.makeLabel(n.id,{ore:'Mỏ',herb:'Linh thảo',energy:'Linh khí'}[n.type]+' · '+GRADES[n.grade].color,'resource');this.labelNodes.get(n.id).style.color=GRADES[n.grade].hex;const tint=new T.Color(GRADES[n.grade].hex);g.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.color.lerp(tint,.6);}});const gradeRing=this.ring(tint,1.6);g.add(gradeRing);}
 }
 makeLabel(id,name,type){const el=document.createElement('div');el.className='world-label '+type;el.innerHTML=`<span>${name}</span>${type==='enemy'||type==='boss'?'<i><b></b></i>':''}`;this.labels.appendChild(el);this.labelNodes.set(id,el);}
 rotate(delta){this.angle+=delta;}
 resize(){const r=this.canvas.getBoundingClientRect();this.renderer.setSize(r.width,r.height,false);this.camera.aspect=r.width/r.height;this.camera.updateProjectionMatrix();this.width=r.width;this.height=r.height;}
 quality(v){const low=v==='low';this.renderer.setPixelRatio(Math.min(devicePixelRatio,low?1:1.7));this.renderer.shadowMap.enabled=!low;this.resize();}
 project(x,y,z){const p=new T.Vector3(x,y,z).project(this.camera);return {x:(p.x*.5+.5)*this.width,y:(-.5*p.y+.5)*this.height,visible:p.z<1&&p.z>-1&&Math.abs(p.x)<1.1&&Math.abs(p.y)<1.1};}
 pick(clientX,clientY){const r=this.canvas.getBoundingClientRect();this.pointer.set((clientX-r.left)/r.width*2-1,-(clientY-r.top)/r.height*2+1);this.ray.setFromCamera(this.pointer,this.camera);if(this.ray.ray.intersectPlane(this.plane,this.hit))return {x:this.hit.x,z:this.hit.z};return null;}
 event(e){if(e.type==='cast'){this.swing=.45;const m=this.ring(e.kind==='nova'?0x98ded6:0xf4d49b,Math.max(1,e.r));m.position.set(e.x,.12,e.z);this.scene.add(m);this.effects.push({mesh:m,time:.5,max:.5});}if(e.type==='heal'||e.type==='gather'){const m=this.ring(e.type==='heal'?0xa4db8b:0x9ce1db,2);m.position.set(e.x,.13,e.z);this.scene.add(m);this.effects.push({mesh:m,time:.7,max:.7});}}
 animateRig(g,move,t,swing=0){const legs=g.userData.legs||[],arms=g.userData.arms||[];legs.forEach((l,i)=>l.rotation.x=move?Math.sin(t*10+i%2*Math.PI)*.55:0);arms.forEach((a,i)=>a.rotation.x=swing&&i===1?-1.7+Math.sin(swing*14)*.6:move?Math.sin(t*10-i*Math.PI)*.3:0);}
 update(dt){this.elapsed+=dt;const g=this.game,s=g.s,t=this.elapsed;this.swing=Math.max(0,this.swing-dt);const desired=new T.Vector3(s.x,1.4,s.z);this.focus.lerp(desired,1-Math.exp(-dt*7));const d=this.zoom;this.camera.position.set(this.focus.x+Math.sin(this.angle)*d*Math.cos(this.pitch),this.focus.y+d*Math.sin(this.pitch),this.focus.z+Math.cos(this.angle)*d*Math.cos(this.pitch));this.camera.lookAt(this.focus);this.camera.updateMatrixWorld();this.occlusionRay.set(this.camera.position,this.focus.clone().sub(this.camera.position).normalize());this.occlusionRay.far=this.camera.position.distanceTo(this.focus);for(const house of this.structures){const blocked=this.occlusionRay.intersectObject(house,true).length>0;house.traverse(o=>{if(o.isMesh){o.material.opacity=blocked?.25:1;o.material.depthWrite=!blocked;}});}this.sun.position.set(s.x+28,65,s.z+22);this.sun.target.position.set(s.x,0,s.z);
  for(const [k,m]of Object.entries(this.mounts))m.visible=g.mount&&k===s.companions.mount;this.mount=this.mounts[s.companions.mount];dressCharacter(this.player,s);this.player.position.set(s.x,g.mount?(s.companions.mount==='deer'?1.75:1.2):0,s.z);this.player.rotation.y=g.facing||0;this.animateRig(this.player,g.moving,t,this.swing);this.mount.visible=g.mount;this.mount.position.set(s.x,0,s.z);this.mount.rotation.y=g.facing||0;this.animateRig(this.mount,g.moving,t);
  for(const [key,pet]of Object.entries(this.pets))pet.visible=key===s.spirit;this.pet=this.pets[s.spirit];this.pet.visible=s.petLevels[s.spirit]>0;this.pet.position.lerp(new T.Vector3(s.x+2.2,['phoenix','dragon'].includes(s.spirit)?2.5: .15,s.z+2),1-Math.exp(-dt*4));this.pet.rotation.y=g.facing||0;this.pet.scale.setScalar(s.spirit==='turtle'?.5:.7);this.animateRig(this.pet,g.moving,t);
  for(const e of g.enemies){const m=this.entities.get(e.id);m.visible=e.dead<=0;m.position.set(e.x,0,e.z);if(distance(s,e)<e.aggro)m.rotation.y=Math.atan2(s.x-e.x,s.z-e.z);this.animateRig(m,e.wind<=0&&distance(s,e)<e.aggro,t,e.wind>0?.3:0);const danger=m.userData.danger;danger.visible=e.dead<=0&&e.wind>0;danger.position.set(e.x,.1,e.z);danger.material.opacity=.25+Math.sin(t*12)*.12;const label=this.labelNodes.get(e.id);label.querySelector('b').style.width=Math.max(0,e.hp/e.max*100)+'%';}
  for(const n of g.nodes){const m=this.entities.get(n.id);m.visible=n.cd<=0;if(m.userData.orb){m.userData.orb.position.y=1.6+Math.sin(t*2+n.x)*.2;m.userData.orb.rotation.y=t*.5;}}
  for(const n of this.game.shrines){const m=this.entities.get('seal'+n.id);m.scale.y=s.seals.includes(n.id)?1.2:1;}
  for(const [id,el]of this.labelNodes){const m=this.entities.get(id);let pos=m.position,far=distance(s,{x:pos.x,z:pos.z});const p=this.project(pos.x,id.startsWith('enemy')?(id==='enemy12'?8:id==='enemy11'?6:3.3):id.startsWith('seal')?4.5:3.8,pos.z);el.hidden=!m.visible||!p.visible||far>36;el.style.transform=`translate(-50%,-100%) translate(${p.x}px,${p.y}px)`;el.classList.toggle('near',far<5);}
  const sel=g.enemies.find(e=>e.id===g.selected&&!e.dead);this.selection.visible=!!sel;if(sel){this.selection.position.set(sel.x,.1,sel.z);this.selection.scale.setScalar(sel.boss?1.7:1);}
  this.marker.visible=!!g.destination;if(g.destination)this.marker.position.set(g.destination.x,.12,g.destination.z);
  for(const e of this.effects){e.time-=dt;e.mesh.scale.setScalar(1+(1-e.time/e.max)*.2);e.mesh.material.opacity=e.time/e.max*.8;if(e.time<=0){this.scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();}}this.effects=this.effects.filter(e=>e.time>0);
  const pts=this.particles.attributes.position;for(let i=0;i<pts.count;i++){pts.array[i*3]+=.12*dt;pts.array[i*3+1]+=.08*Math.sin(t+i)*dt;if(pts.array[i*3]>180)pts.array[i*3]=0;}pts.needsUpdate=true;this.renderer.render(this.scene,this.camera);
 }
}
