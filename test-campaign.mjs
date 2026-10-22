import {Game,fresh,cost,questReady} from './dist/engine.mjs';
import assert from 'node:assert/strict';
for(const klass of ['kiem','phap','thuong']){
 const g=new Game(fresh(),()=>.2);g.start('Hành trình',klass);let deaths=0;
 for(let i=0;i<72000&&g.s.quest<12;i++){
  const s=g.s;
  if(i%20===0){
   if(questReady(s)){if(g.mode!=='quest')g.setMode('quest');}
   else if(s.quest===3||s.quest===7||s.quest===8){
    let k=s.quest===3?(s.upgrades.weapon<1?'weapon':'craft'):s.quest===7?(s.upgrades.armor<2?'armor':s.upgrades.body<2?'body':null):'spirit';
    let c=k==='craft'?{gold:20,herb:2}:k==='spirit'?{gold:190,essence:2}:cost(s,k);
    if(g.canPay(c)){if(k==='craft')g.craft();else if(k==='spirit')g.spiritUpgrade('fox');else g.upgrade(k);}
    else{const resource=Object.keys(c).find(r=>s[r]<c[r]);const mode=resource==='gold'||resource==='essence'?'farm':resource;if(mode==='farm')g.farmType=resource==='essence'?'cultist':'wolf';if(g.mode!==mode)g.setMode(mode);}
   }else if(g.mode==='off')g.setMode('quest');
  }
  g.update(.05);
  for(const e of g.events){if(e.type==='dialog'&&e.claim)g.claim();if(e.type==='death')deaths++;}g.events=[];
 }
 console.log(klass,JSON.stringify({quest:g.s.quest,time:Math.round(g.s.playTime),deaths,counts:g.s.counts}));assert.equal(g.s.quest,12);
}
