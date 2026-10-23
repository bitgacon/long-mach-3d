import * as T from './vendor/three.module.js';
class CreatureFactory {constructor(){this.mats=new Map();}
 material(color,extra={}){const key=color+JSON.stringify(extra);if(!this.mats.has(key))this.mats.set(key,new T.MeshStandardMaterial({color,roughness:.85,...extra}));return this.mats.get(key);}
 mesh(geometry,color,x=0,y=0,z=0,parent=this.scene,extra={}){const m=new T.Mesh(geometry,this.material(color,extra));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 box(w,h,d,c,x,y,z,p){return this.mesh(new T.BoxGeometry(w,h,d),c,x,y,z,p);}
 cylinder(rt,rb,h,c,x,y,z,p,segments=8){return this.mesh(new T.CylinderGeometry(rt,rb,h,segments),c,x,y,z,p);}
 orb(r,c,x,y,z,p,detail=0,extra={}){return this.mesh(new T.IcosahedronGeometry(r,detail),c,x,y,z,p,extra);}
 wolf(color=0x71847b){const g=new T.Group();const body=this.orb(.7,color,0,.85,0,g,1);body.scale.set(.7,.75,1.4);const head=this.orb(.4,color,0,1.2,.85,g,1);this.box(.34,.24,.5,0xa2a88e,0,1.08,1.15,g);for(let side of [-1,1]){this.mesh(new T.ConeGeometry(.16,.45,4),color,side*.23,1.62,.75,g);this.orb(.06,0xffcb73,side*.28,1.27,1.05,g,0,{emissive:0xffa04e,emissiveIntensity:1});}const legs=[];for(let a of [-1,1])for(let b of [-1,1]){const leg=this.box(.17,.7,.2,0x455a52,a*.35,.35,b*.5,g);legs.push(leg);}g.userData.legs=legs;const tail=this.mesh(new T.ConeGeometry(.25,1.2,5),color,0,1,-1,g);tail.rotation.x=-.9;return g;}
 fox(){const g=this.wolf(0xd39962);g.scale.setScalar(.7);const tail=this.orb(.5,0xe3b580,0,1.1,-1.2,g);tail.scale.z=1.7;return g;}
 crane(){const g=new T.Group();this.orb(.65,0xe5e7d3,0,1.4,0,g,1).scale.set(1,.7,1.4);this.cylinder(.13,.2,1.1,0xdce5d3,0,2,.5,g);this.orb(.28,0xe5e7d3,0,2.6,.5,g);const beak=this.mesh(new T.ConeGeometry(.09,.65,5),0xd1a359,0,2.6,.95,g);beak.rotation.x=Math.PI/2;for(const x of [-.27,.27])this.cylinder(.05,.05,1,0x53584d,x,.6,0,g);return g;}
 turtle(){const g=new T.Group();this.orb(.95,0x416d60,0,.5,0,g,1).scale.set(1,.6,1.2);this.orb(.3,0x99b18c,0,.35,1,g);for(const x of [-.65,.65])for(const z of [-.55,.55])this.orb(.25,0x8ca880,x,.18,z,g);return g;}
 deer(){const g=this.wolf(0x8b7763);g.scale.set(1.4,1.6,1.5);this.cylinder(.15,.25,.8,0x8b7763,0,1.6,.7,g);for(let a of [-1,1]){const antler=this.cylinder(.04,.07,.9,0xdfc99b,a*.25,2.1,.7,g,4);antler.rotation.z=-a*.35;this.box(.45,.05,.06,0xdfc99b,a*.38,2.2,.7,g);}return g;}
 bird(){const g=this.crane();for(const side of [-1,1])for(let i=0;i<5;i++){const feather=this.mesh(new T.ConeGeometry(.25,2.5-i*.2,4),i%2?0xffae58:0xda5c49,side*(.8+i*.3),1.6,.1-i*.2,g);feather.rotation.z=side*1.1;}return g;}
 dragon(){const g=new T.Group();for(let i=0;i<8;i++)this.orb(.38,0xe1be5c,Math.sin(i*.7)*.5,1+i*.12,-i*.4,g);this.orb(.65,0xebcf78,0,1.4,.5,g);for(const x of [-.3,.3])this.mesh(new T.ConeGeometry(.1,.8,5),0xffedb6,x,2,.4,g);return g;}
 tiger(){const g=this.wolf(0xd9c9a8);for(let i=0;i<4;i++)this.box(1.05,.1,.1,0x665344,0,1.1,-.5+i*.3,g);g.scale.setScalar(1.15);return g;}
}
export function createCreature(key,ride=false){const f=new CreatureFactory(),method=key==='phoenix'?'bird':key;if(!['fox','crane','turtle','deer','wolf','bird','dragon','tiger'].includes(method))throw Error('Unknown creature');const g=f[method]();if(ride){const saddle=f.box(.7,.18,.8,0x713d37,0,1.35,0,g);saddle.userData.saddle=true;}return g;}
