import * as T from './vendor/three.module.js';
import {PETS,GRADES} from './economy.mjs?v=0.6';
import {createCreature} from './creatures.mjs?v=0.6';
import {disposeObject} from './avatar.mjs?v=0.6';
let portraits;
// Render the actual in-world models once, then reuse lightweight image tiles.
export function petPortrait(key){
 if(!portraits){portraits=new Map();let renderer;
  try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(112,96);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;const scene=new T.Scene();scene.add(new T.HemisphereLight(0xd5efff,0x403422,3));const lamp=new T.DirectionalLight(0xffe4bd,4);lamp.position.set(3,5,5);scene.add(lamp);const camera=new T.PerspectiveCamera(35,112/96,.1,30);camera.position.set(2,1.5,3.3);camera.lookAt(0,.85,0);
   for(const [id,p]of Object.entries(PETS)){const model=createCreature(p.shape);const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());const scale=1.8/Math.max(size.x,size.y,size.z);model.scale.multiplyScalar(scale);model.position.set(-center.x*scale,-bounds.min.y*scale,-center.z*scale);const tinted=new Set();model.traverse(o=>{if(o.isMesh&&!tinted.has(o.material)){tinted.add(o.material);o.material.color.lerp(new T.Color(GRADES[p.grade].hex),.3);}});scene.add(model);renderer.render(scene,camera);portraits.set(id,renderer.domElement.toDataURL());scene.remove(model);disposeObject(model);}
  }catch{ /* Text remains available if an extra preview context is unavailable. */ }
  finally{renderer?.dispose();renderer?.forceContextLoss();}
 }
 return portraits.has(key)?`<img class="pet-portrait" src="${portraits.get(key)}" alt="" loading="lazy">`:`<span>${PETS[key].icon}</span>`;
}
