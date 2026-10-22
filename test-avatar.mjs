import assert from 'node:assert/strict';
import {makeCharacter,dressCharacter,disposeObject,itemIcon} from './dist/avatar.mjs';
import {fresh} from './dist/engine.mjs';
import {SLOTS,newItem} from './dist/economy.mjs';
for(const klass of ['kiem','phap','thuong']){
 const s=fresh();s.class=klass;const model=makeCharacter(0x356977,klass);
 for(const slot of Object.keys(SLOTS)){const before=model.userData.gearKey,it=newItem(s,slot,4,4,8,true);s.equipped[slot]=it.id;dressCharacter(model,s);assert.notEqual(model.userData.gearKey,before);assert(itemIcon(slot,4).includes('<svg'));}
 const parts=model.userData.gearParts;dressCharacter(model,s);assert.equal(model.userData.gearParts,parts,'unchanged state must reuse meshes');
 let meshes=0;model.traverse(o=>{if(o.isMesh){meshes++;assert([...o.geometry.attributes.position.array].every(Number.isFinite));}});assert(meshes>70);
 delete s.equipped.wings;dressCharacter(model,s);let after=0;model.traverse(o=>{if(o.isMesh)after++;});assert(after<meshes);disposeObject(model);console.log('PASS avatar',klass,'11 slots, geometry, reuse, remove wings, disposal');
}
