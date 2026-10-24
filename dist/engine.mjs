import {migrateRoster,validateRoster,rosterActions} from './pet-roster.mjs?v=0.6';
import {deployedPets} from './pet-data.mjs?v=0.6';
import {classSkill,skillTargets} from './class-skills.mjs?v=0.6';
import {harvestDuration,harvestNode,tickNodes,validateHarvest} from './gathering.mjs?v=0.6';
import {ensureCompanions,validateCompanions,companionActions,mountSpeed,mountBonus,skillProfile} from './companions.mjs?v=0.6';
import {equipmentActions} from './equipment-system.mjs?v=0.6';
import {GRADES,MATERIALS,PETS,ensureEconomy,amount,addMaterial,syncLegacy,spendMaterials,equipmentStats,petStats,validateEconomy} from './economy.mjs?v=0.6';
import {REGIONS,regionById,regionQuest,regionValue,emptyRegions,validateRegions} from './regions.mjs?v=0.6';
import {craftingActions,regionActions} from './progression.mjs?v=0.6';
export const VERSION=3, SAVE_KEY='long-mach-v3';
export const CLASSES={
 kiem:{name:'Kiếm khách',title:'Lưỡi kiếm giữa phong ba',hp:190,atk:25,range:4.8,color:0x367d89,desc:'Cân bằng công thủ. Kiếm khí quét rộng, phù hợp tiếp cận trực diện.'},
 phap:{name:'Linh sư',title:'Người gọi những vì sao',hp:145,atk:30,range:12,color:0x7379bb,desc:'Phép tầm xa, sát thương cao. Giữ khoảng cách khi đối thủ áp sát.'},
 thuong:{name:'Thương vệ',title:'Bức thành không khuất phục',hp:240,atk:22,range:6.4,color:0xb39b59,desc:'Sinh lực cao và trường thương. Bền bỉ trong những trận chiến dài.'}
};
export const NPCS=[{id:'lam',name:'Trưởng làng Lâm',x:32,z:89,color:0xb49965},{id:'forge',name:'Thợ rèn Cổ',x:22,z:103,color:0x7b6470},{id:'an',name:'Dấu ấn An Nhiên',x:107,z:49,color:0x69c9bc}];
export const OBSTACLES=[{x:18,z:90,r:6},{x:45,z:102,r:6},{x:22,z:116,r:5},{x:46,z:81,r:5},{x:23,z:28,r:15},{x:143,z:97,r:8}];
export const NODE_DEFS=[
 [65,89,'ore'],[77,96,'ore'],[88,84,'ore'],[99,95,'ore'],[115,88,'ore'],
 [45,67,'herb'],[56,80,'herb'],[69,111,'herb'],[95,110,'herb'],[123,105,'herb'],
 [90,51,'energy'],[112,61,'energy'],[129,43,'energy'],[155,57,'energy'],[149,31,'energy']
].map(([x,z,type],i)=>({id:'node'+i,x,z,type}));
export const ENEMY_DEFS=[
 [61,81,'wolf'],[72,67,'wolf'],[81,111,'wolf'],[92,76,'wolf'],[54,110,'wolf'],[103,108,'wolf'],
 [125,72,'cultist'],[140,65,'cultist'],[149,80,'cultist'],[133,52,'cultist'],[159,65,'cultist'],
 [107,35,'guardian'],[159,23,'lord']
].map(([x,z,type],i)=>({id:'enemy'+i,x,z,type}));
export const ENEMY_TYPES={wolf:{name:'Sói sương',hp:95,atk:12,xp:22,gold:22,speed:4.3,range:3,aggro:15},cultist:{name:'Ảnh giáo đồ',hp:180,atk:19,xp:40,gold:36,speed:4.7,range:3.8,aggro:17},guardian:{name:'Hắc Vệ',hp:950,atk:38,xp:180,gold:200,speed:3.3,range:6.8,aggro:19,boss:true},lord:{name:'Chủ tế Huyền Không',hp:2300,atk:55,xp:400,gold:450,speed:3.5,range:8,aggro:21,boss:true}};
export const SPIRITS={fox:{name:'Hỏa hồ',icon:'狐',desc:'Tăng sát thương, phóng linh hỏa mỗi 3 giây.'},crane:{name:'Thanh hạc',icon:'鶴',desc:'Tăng sinh lực và hồi phục định kỳ khi giao chiến.'},turtle:{name:'Huyền quy',icon:'龜',desc:'Tăng phòng thủ, giảm sát thương nhận vào.'}};
export const BRANCHES={
 weapon:{group:'equipment',name:'Binh khí',desc:'+9 công mỗi bậc',icon:'⚔',cap:8,base:80,step:55,resource:'ore',amount:2,unlock:0},
 armor:{group:'equipment',name:'Chiến giáp',desc:'+24 HP, +3 thủ mỗi bậc',icon:'▣',cap:8,base:70,step:50,resource:'ore',amount:2,unlock:0},
 talisman:{group:'equipment',name:'Pháp khí',desc:'+5 công, +12 linh lực mỗi bậc',icon:'◈',cap:8,base:90,step:55,resource:'energy',amount:2,unlock:3},
 body:{group:'inner',name:'Thể phách',desc:'+32 HP mỗi bậc',icon:'山',cap:5,base:90,step:65,resource:'herb',amount:3,unlock:0},
 force:{group:'inner',name:'Chân khí',desc:'+6 công, +15 linh lực mỗi bậc',icon:'氣',cap:5,base:110,step:70,resource:'energy',amount:3,unlock:3},
 mind:{group:'inner',name:'Tâm pháp',desc:'+3 thủ, hồi linh lực nhanh hơn',icon:'心',cap:5,base:100,step:65,resource:'herb',amount:3,unlock:3},
 slash:{group:'skills',name:'Long trảm',desc:'Tăng sát thương kỹ năng diện rộng',icon:'✦',cap:10,base:100,step:70,resource:'energy',amount:2,unlock:0},
 nova:{group:'skills',name:'Địa chấn',desc:'Tăng sát thương và thời gian choáng',icon:'◎',cap:10,base:130,step:80,resource:'energy',amount:3,unlock:3},
 mend:{group:'skills',name:'Hồi nguyên',desc:'Tăng lượng HP hồi bằng linh lực',icon:'✚',cap:10,base:110,step:70,resource:'herb',amount:3,unlock:0}
};
export const RESOURCE_NAMES={gold:'đồng',ore:'Thanh Thạch',herb:'linh thảo',energy:'linh khí',essence:'linh phách'};
const objectives=(...pairs)=>pairs.map(([key,need,label])=>({key,need,label}));
export const QUESTS=[
 {title:'Người giữ lửa',chapter:1,npc:'lam',text:'Dòng suối chuyển đen. Gặp trưởng làng Lâm để nghe lời nhắn cuối cùng của người giữ ấn.',goals:objectives(['talk',1,'Gặp trưởng làng Lâm']),gold:50,xp:35,story:'An Nhiên đã lên núi để tìm nguồn độc rồi mất tích. Trước hết, hãy đẩy lùi lũ sói sương đang vây đường làng.'},
 {title:'Dấu chân trong sương',chapter:1,npc:'lam',text:'Hạ bốn con sói sương ở bìa rừng. Auto farm có thể giúp bạn giữ khu vực an toàn.',goals:objectives(['wolves',4,'Hạ sói sương']),gold:100,xp:90,story:'Trên nanh sói có bụi Thanh Thạch bị nhiễm độc. Muốn đi sâu hơn, con cần vật liệu và linh thảo.'},
 {title:'Mạch đá còn ngân',chapter:1,npc:'lam',text:'Khai thác Thanh Thạch ở mỏ phía đông; hái linh thảo ven rừng để chuẩn bị hành trang.',goals:objectives(['mined',3,'Khai thác Thanh Thạch'],['gathered',2,'Hái linh thảo']),gold:120,xp:110,story:'Trong đá vẫn còn khí sạch. Đưa chúng vào lò rèn. Linh thảo sẽ giữ con sống sót khi qua màn sương.'},
 {title:'Lửa trong binh khí',chapter:1,npc:'lam',text:'Nâng binh khí lên +1, chế ít nhất một bình thuốc trong Tu luyện. Việc dùng tài nguyên do bạn quyết định.',goals:objectives(['weapon',1,'Binh khí +1'],['crafted',1,'Chế bình hồi phục']),gold:130,xp:100,story:'Một mảnh ấn khắc lời cảnh báo của An Nhiên: “Đừng tin kẻ canh đền.” Hắc Vệ đang chặn lối lên cổ đàn.'},
 {title:'Kẻ canh đền thất lạc',chapter:1,npc:'lam',text:'Đánh bại Hắc Vệ ở cổ đàn phía bắc. Vòng đỏ báo trước đòn đánh: dùng Lướt để tránh.',goals:objectives(['guardian',1,'Đánh bại Hắc Vệ']),gold:200,xp:180,story:'Mảnh ấn tỏa sáng, để lộ dấu chân đi về Vọng Nguyệt. Hãy thu linh khí và lần theo tiếng gọi của An Nhiên.'},
 {title:'Tiếng vọng người giữ ấn',chapter:2,npc:'an',text:'Hấp thu ba nguồn linh khí gần cổ đàn, rồi chạm vào dấu ấn An Nhiên. Mở khóa linh thú và thú cưỡi.',goals:objectives(['meditated',3,'Hấp thu linh khí']),gold:180,xp:160,story:'“Ta vẫn còn sống. Ảnh giáo đang hút long mạch để mở cánh cổng ở Vọng Nguyệt.” Một linh thú thức tỉnh, chọn đồng hành cùng con.'},
 {title:'Dấu ấn Ảnh giáo',chapter:2,npc:'an',text:'Hạ năm Ảnh giáo đồ ở vùng đông. Chúng giữ linh phách dùng để nuôi dưỡng linh thú.',goals:objectives(['cultists',5,'Hạ Ảnh giáo đồ']),gold:220,xp:200,story:'Các mảnh lệnh bài chỉ về ba phong ấn. Muốn phá chúng, con phải củng cố giáp và nội công.'},
 {title:'Thân tâm hợp nhất',chapter:2,npc:'an',text:'Nâng chiến giáp lên +2 và đầu tư ít nhất hai bậc nội công vào các nhánh tùy chọn.',goals:objectives(['armor',2,'Chiến giáp +2'],['inner',2,'Tổng bậc nội công']),gold:250,xp:220,story:'Con đã đủ sức chịu áp lực long mạch. Hãy giúp linh thú trưởng thành để cùng phá trận pháp.'},
 {title:'Linh thú cộng minh',chapter:2,npc:'an',text:'Nâng một linh thú lên bậc 2. Linh phách rơi từ Ảnh giáo đồ; đồng có thể kiếm bằng săn quái và truy nã.',goals:objectives(['spiritLevel',2,'Linh thú bậc 2']),gold:220,xp:220,story:'Ba trụ phong ấn quanh điện Vọng Nguyệt đang chuyển động. Đến từng trụ và giữ tương tác để giải trận.'},
 {title:'Ba trụ trấn hồn',chapter:2,npc:'an',text:'Giải ba trụ phong ấn ở phía đông. Quái có thể ngắt việc giải ấn nếu đánh trúng bạn.',goals:objectives(['seals',3,'Giải phong ấn']),gold:280,xp:240,story:'Cánh cổng đã mở. Chủ tế Huyền Không đang hút long mạch ở chính điện. Đã đến lúc chấm dứt nghi lễ.'},
 {title:'Đêm tàn Vọng Nguyệt',chapter:2,npc:'an',text:'Đánh bại Chủ tế Huyền Không ở đông bắc. Chuẩn bị thuốc, nâng kỹ năng và chọn linh thú phù hợp.',goals:objectives(['lord',1,'Đánh bại Huyền Không']),gold:500,xp:400,story:'Nghi lễ sụp đổ. Long mạch trở lại nhịp đập. An Nhiên bước ra khỏi vầng sáng, trao con chiếc ấn cuối cùng.'},
 {title:'Một lời thề mới',chapter:2,npc:'lam',text:'Trở về Vân Sơn gặp trưởng làng. Khép lại hai chương đầu của hành trình.',goals:[],gold:300,xp:200,story:'Vân Sơn đã bình yên, nhưng sáu long mạch khác vẫn đang suy yếu. Những thành bang sẽ phải chọn: cùng bảo vệ nguồn sống, hay tranh đoạt nó.'}
];
export const SHRINES=[{id:0,x:128,z:42},{id:1,x:154,z:48},{id:2,x:169,z:35}];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function freshBase(){return {version:2,name:'Lữ khách',class:'kiem',started:false,x:32,z:97,hp:190,mp:100,level:1,xp:0,gold:30,ore:0,herb:0,energy:0,essence:0,potions:5,quest:0,upgrades:Object.fromEntries(Object.keys(BRANCHES).map(k=>[k,['slash','nova','mend'].includes(k)?1:0])),spirits:{fox:0,crane:0,turtle:0},spirit:'fox',counts:{talk:0,wolves:0,cultists:0,mined:0,gathered:0,meditated:0,crafted:0,guardian:0,lord:0},seals:[],bounties:0,achievements:[],settings:{autoPotion:true,sound:false,quality:'high'},playTime:0};}
const isInt=(v,max=10000000)=>Number.isInteger(v)&&v>=0&&v<=max;
function parseBase(raw){
 const v=typeof raw==='string'?JSON.parse(raw):raw;
 if(!v||typeof v!=='object'||!Object.hasOwn(CLASSES,v.class)||typeof v.name!=='string'||v.name.length>20||!v.name.trim())throw Error('Tên hoặc lớp nhân vật không hợp lệ.');
 if(v.version===1){
  const fields=['level','xp','copper','ore','herb','potions','weapon','training','quest','kills','mined','gathered'];
  if(!fields.every(k=>isInt(v[k]))||v.level<1||v.quest>5||typeof v.started!=='boolean'||typeof v.boss!=='boolean')throw Error('Bản lưu 2D không hợp lệ.');
  const n=freshBase();Object.assign(n,{name:v.name,class:v.class,started:v.started,level:Math.min(v.level,100),xp:v.xp,gold:v.copper,ore:v.ore,herb:v.herb,potions:v.potions,quest:v.quest});
  n.upgrades.weapon=Math.min(v.weapon,8);n.upgrades.body=Math.min(v.training,5);n.counts={...n.counts,talk:v.quest>0?1:0,wolves:v.kills,mined:v.mined,gathered:v.gathered,crafted:v.crafted?1:0,guardian:v.boss?1:0};n.hp=stats(n).hp;n.mp=stats(n).mp;return n;
 }
 if(v.version!==2||typeof v.started!=='boolean')throw Error('Phiên bản bản lưu chưa được hỗ trợ.');
 for(const k of ['level','xp','gold','ore','herb','energy','essence','potions','quest','bounties'])if(!isInt(v[k]))throw Error('Chỉ số bản lưu không hợp lệ.');
 if(v.level<1||v.level>100||v.quest>QUESTS.length||!['x','z','hp','mp','playTime'].every(k=>Number.isFinite(v[k])&&v[k]>=0&&v[k]<1e9)||v.x>180||v.z>140)throw Error('Tọa độ hoặc tiến trình không hợp lệ.');
 if(!v.upgrades||!Object.entries(BRANCHES).every(([k,d])=>isInt(v.upgrades[k],d.cap)))throw Error('Nhánh nâng cấp không hợp lệ.');
 if(!v.counts||!Object.keys(freshBase().counts).every(k=>isInt(v.counts[k])))throw Error('Thống kê không hợp lệ.');
 if(!v.spirits||!Object.keys(SPIRITS).every(k=>isInt(v.spirits[k],5))||!Object.hasOwn(SPIRITS,v.spirit))throw Error('Linh thú không hợp lệ.');
 if(!Array.isArray(v.seals)||v.seals.length>3||new Set(v.seals).size!==v.seals.length||!v.seals.every(k=>isInt(k,2)))throw Error('Phong ấn không hợp lệ.');
 if(!Array.isArray(v.achievements)||v.achievements.length>4||!v.achievements.every(k=>isInt(k,3)))throw Error('Thành tựu không hợp lệ.');
 const n=freshBase();for(const k of Object.keys(n))if(Object.hasOwn(v,k))n[k]=structuredClone(v[k]);n.settings={autoPotion:v.settings?.autoPotion!==false,sound:v.settings?.sound===true,quality:v.settings?.quality==='low'?'low':'high'};n.hp=clamp(n.hp,1,stats(n).hp);n.mp=clamp(n.mp,0,stats(n).mp);return n;
}

export function fresh(){return migrateRoster(ensureCompanions(ensureEconomy({...freshBase(),version:3,rulesRevision:6,harvest:{},map:'van',regions:emptyRegions(),gatherGrade:-1})));}
export function parseSave(raw){
 const v=typeof raw==='string'?JSON.parse(raw):structuredClone(raw);
 if(!v||typeof v!=='object')throw Error('Bản lưu không hợp lệ');
 if(v.version===3){if(v.rulesRevision!==6){ensureEconomy(v);ensureCompanions(v);for(const k of Object.keys(PETS)){v.petLevels[k]??=0;v.companions.treasures[k]??=0;}for(const k of ['slash','nova','mend'])v.upgrades[k]=Math.max(1,v.upgrades[k]);migrateRoster(v);v.rulesRevision=6;}if(['slash','nova','mend'].some(k=>v.upgrades[k]<1))throw Error('Kỹ năng phải từ cấp 1.');validateRoster(v);validateHarvest(v);validateEconomy(v);validateRegions(v);validateCompanions(v);if(!Number.isInteger(v.gatherGrade)||v.gatherGrade< -1||v.gatherGrade>4)throw Error('Bộ lọc mỏ không hợp lệ');
  const base=parseBase({...v,version:2,spirit:['fox','crane','turtle'].includes(v.spirit)?v.spirit:'fox',spirits:Object.fromEntries(['fox','crane','turtle'].map(k=>[k,v.petLevels[k]]))});
  const n={...base,version:3,rulesRevision:6,petRoster:structuredClone(v.petRoster),petDeck:[...v.petDeck],petNextId:v.petNextId,harvest:structuredClone(v.harvest||{}),map:v.map,regions:structuredClone(v.regions),gatherGrade:v.gatherGrade,materials:structuredClone(v.materials),items:structuredClone(v.items),equipped:structuredClone(v.equipped),nextItemId:v.nextItemId,petLevels:structuredClone(v.petLevels),spirit:v.spirit,materialPreference:v.materialPreference};if(v.companions)n.companions=structuredClone(v.companions);ensureCompanions(n);syncLegacy(n);n.hp=Math.min(v.hp,stats(n).hp);n.mp=Math.min(v.mp,stats(n).mp);return n;
 }
 const n={...parseBase(v),version:3,map:'van',regions:emptyRegions(),gatherGrade:-1};for(const k of ['slash','nova','mend'])n.upgrades[k]=Math.max(1,n.upgrades[k]);ensureEconomy(n);ensureCompanions(n);migrateRoster(n);n.rulesRevision=6;n.harvest={};return n;
}
export const activeQuest=s=>s.map&&s.map!=='van'?regionQuest(s):QUESTS[s.quest];

export function stats(s){const u=s.upgrades,c=CLASSES[s.class],e=equipmentStats(s),p=petStats(s),m=mountBonus(s);return {hp:c.hp+(s.level-1)*20+u.armor*24+u.body*32+e.hp+p.hp+m.hp,mp:100+u.talisman*12+u.force*15+e.mp+p.mp,atk:c.atk+(s.level-1)*4+u.weapon*9+u.talisman*5+u.force*6+e.atk+p.atk,def:u.armor*3+u.mind*3+e.def+p.def,range:c.range};}
export function cost(s,key){const b=BRANCHES[key],lv=s.upgrades[key];return {gold:b.base+b.step*lv,[b.resource]:b.amount+Math.floor(lv/2)};}
export function value(s,key){if(key.startsWith('regional'))return regionValue(s,key);if(key==='inner')return s.upgrades.body+s.upgrades.force+s.upgrades.mind;if(key==='spiritLevel')return Math.max(...Object.values(s.petLevels||s.spirits));if(key==='seals')return s.seals.length;return s.upgrades[key]??s.counts[key]??0;}
export function questReady(s){const q=activeQuest(s);return !!q&&q.goals.every(g=>value(s,g.key)>=g.need);}
export const ACHIEVEMENTS=[{title:'Người mở đường',key:'wolves',need:10,gold:100},{title:'Người nghe tiếng đá',key:'mined',need:15,gold:150},{title:'Người phá sương',key:'guardian',need:1,gold:180},{title:'Bình minh Vọng Nguyệt',key:'lord',need:1,gold:350}];
export class Game {
 constructor(save=fresh(),random=Math.random){this.s=save;this.random=random;this.events=[];this.mode='off';this.farmType='wolf';this.target=null;this.selected=null;this.path=[];this.destination=null;this.channel=null;this.mount=false;this.paused=false;this.cooldowns={attack:0,slash:0,nova:0,mend:0,dash:0};this.ward=0;this.spiritClock=0;this.uiTime=0;this.lastWait='';this.actionTime=0;ensureEconomy(this.s);ensureCompanions(this.s);migrateRoster(this.s);this.s.map??='van';this.s.regions??=emptyRegions();this.loadRegion();if(!this.walkable(this.s.x,this.s.z)){this.s.x=32;this.s.z=97;}}
 emit(type,data={}){this.events.push({type,...data});if(this.events.length>150)this.events.shift();}
 say(text){this.emit('notice',{text});}
 start(name,klass){if(!Object.hasOwn(CLASSES,klass))return;this.s.name=name.trim().slice(0,20)||'Lữ khách';this.s.class=klass;this.s.started=true;this.s.hp=stats(this.s).hp;this.say('Chào mừng đến Vân Sơn. Gặp trưởng làng để bắt đầu.');}
 addXP(n){let s=this.s;s.xp+=n;while(s.level<100&&s.xp>=s.level*100){s.xp-=s.level*100;s.level++;s.hp=stats(s).hp;s.mp=stats(s).mp;this.emit('level',{level:s.level});}}
 canPay(c){return Object.entries(c).every(([k,v])=>(MATERIALS[k]?amount(this.s,k,0):this.s[k])>=v);}
 pay(c){if(!this.canPay(c))return false;for(const [k,v]of Object.entries(c)){if(MATERIALS[k])spendMaterials(this.s,{[k]:v},0);else this.s[k]-=v;}return true;}
 upgrade(key){const b=BRANCHES[key];if(!b)return false;const s=this.s;if(s.quest<b.unlock){this.say('Mở khóa sau nhiệm vụ '+b.unlock+'.');return false;}if(s.upgrades[key]>=b.cap){this.say('Đã đạt bậc tối đa.');return false;}if(!this.pay(cost(s,key))){this.say('Chưa đủ tài nguyên để nâng cấp.');return false;}const old=stats(s).hp;s.upgrades[key]++;s.hp+=stats(s).hp-old;this.say((classSkill(s,key)?.name||b.name)+' đã lên bậc '+s.upgrades[key]+'.');this.emit('upgrade');return true;}
 craft(){if(!this.pay({gold:20,herb:2})){this.say('Cần 20 đồng và 2 linh thảo.');return false;}this.s.potions++;this.s.counts.crafted++;this.say('Đã chế một bình hồi phục.');return true;}
 spiritUpgrade(key){if(this.s.quest<6||!Object.hasOwn(SPIRITS,key))return false;const lv=this.s.spirits[key];if(lv>=5)return false;if(!this.pay({gold:100+lv*90,essence:lv+1})){this.say('Chưa đủ đồng hoặc linh phách.');return false;}this.s.spirits[key]++;this.s.petLevels[key]=this.s.spirits[key];this.s.spirit=key;this.say(SPIRITS[key].name+' bậc '+this.s.spirits[key]+'.');return true;}
 selectSpirit(key){if(this.s.petLevels[key]>0){this.s.spirit=key;this.s.hp=Math.min(this.s.hp,stats(this.s).hp);return true;}return false;}
 potion(){let s=this.s;if(!s.potions||s.hp>=stats(s).hp)return false;s.potions--;const n=Math.round(stats(s).hp*.55);s.hp=Math.min(stats(s).hp,s.hp+n);this.emit('heal',{amount:n,x:s.x,z:s.z});return true;}
 setMode(mode){this.mode=this.mode===mode?'off':mode;this.path=[];this.destination=null;this.channel=null;this.target=null;this.lastWait='';this.say(this.mode==='off'?'Đã dừng tự động.':({farm:'Auto farm: '+ENEMY_TYPES[this.farmType].name,ore:'Tự động khai thác Thanh Thạch',herb:'Tự động thu hái linh thảo',energy:'Tự động hấp thu linh khí',quest:'Tự động theo mục tiêu nhiệm vụ'})[this.mode]);}
 stop(manual=false){const old=this.mode;this.mode='off';this.path=[];this.destination=null;this.channel=null;this.target=null;if(old!=='off'&&manual)this.say('Đã dừng auto để bạn điều khiển.');}
 walkable(x,z){return x>5&&x<175&&z>8&&z<134&&!this.obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.r+1);}
 move(dx,dz,dt,manual=false){if(manual)this.stop(true);const len=Math.hypot(dx,dz);if(!len)return;const speed=this.mount?mountSpeed(this.s):7.3,step=Math.min(speed*dt,len);const nx=this.s.x+dx/len*step,nz=this.s.z+dz/len*step;if(this.walkable(nx,nz)){this.s.x=nx;this.s.z=nz;}else if(this.walkable(nx,this.s.z))this.s.x=nx;else if(this.walkable(this.s.x,nz))this.s.z=nz;this.facing=Math.atan2(dx,dz);this.moving=true;if(this.channel)this.channel=null;}
 navigate(x,z){x=clamp(x,6,174);z=clamp(z,9,133);if(this.destination&&distance(this.destination,{x,z})<2&&this.path.length)return;this.destination={x,z};const step=3,W=61,H=47,start={x:Math.round(this.s.x/step),z:Math.round(this.s.z/step)},goal={x:Math.round(x/step),z:Math.round(z/step)},key=p=>p.z*W+p.x;
  const queue=[start],seen=new Set([key(start)]),parents=new Map();let best=start,bd=Infinity;
  for(let i=0;i<queue.length&&i<2900;i++){let p=queue[i],d=Math.hypot(p.x-goal.x,p.z-goal.z);if(d<bd){best=p;bd=d;}if(d<1)break;for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){let n={x:p.x+dx,z:p.z+dz};if(n.x<0||n.z<0||n.x>=W||n.z>=H||seen.has(key(n))||!this.walkable(n.x*step,n.z*step)||!this.walkable(n.x*step,p.z*step)||!this.walkable(p.x*step,n.z*step))continue;seen.add(key(n));parents.set(key(n),p);queue.push(n);}}
  const route=[];let p=best;while(key(p)!==key(start)){route.unshift({x:p.x*step,z:p.z*step});p=parents.get(key(p));if(!p)break;}if(this.walkable(x,z)&&bd<2)route.push({x,z});this.path=route;
 }
 goto(x,z){this.stop(true);this.navigate(x,z);}
 nearest(arr){return arr.reduce((a,b)=>!a||distance(this.s,b)<distance(this.s,a)?b:a,null);}
 unlocked(e){return this.s.map!=='van'||e.type!=='lord'||this.s.seals.length===3;}
 attack(kind='attack'){
  if(!['attack','slash','nova','mend','dash'].includes(kind)||this.paused||!this.s.started||this.cooldowns[kind]>0)return false;const s=this.s,st=stats(s),u=s.upgrades,skill=skillProfile(s,kind);
  if(kind==='mend'){if(s.mp<skill.mp||s.hp>=st.hp)return false;s.mp-=skill.mp;this.mount=false;if(skill.shield)this.ward=Math.max(this.ward,skill.shield);this.cooldowns.mend=skill.cooldown;let n=Math.round(st.hp*skill.heal);s.hp=Math.min(st.hp,s.hp+n);this.emit('heal',{x:s.x,z:s.z,amount:n});return true;}
  if(kind==='dash'){this.cooldowns.dash=4;this.ward=.7;let a=this.facing||0;for(let i=0;i<12;i++){let nx=s.x+Math.sin(a)*.6,nz=s.z+Math.cos(a)*.6;if(this.walkable(nx,nz)){s.x=nx;s.z=nz;}}this.emit('cast',{kind,x:s.x,z:s.z,r:2});this.channel=null;return true;}
  const mp=skill.mp||0;if(s.mp<mp){this.say('Chưa đủ linh lực.');return false;}
  const range=kind==='attack'?st.range:skill.range;
  let targets=this.enemies.filter(e=>!e.dead&&this.unlocked(e)&&distance(s,e)<=range);if(kind!=='attack')targets=skillTargets(s,skill,targets,this.selected,this.facing);
  if(kind==='attack'){const target=this.selected&&targets.find(e=>e.id===this.selected);targets=target?[target]:[this.nearest(targets)].filter(Boolean);}
  if(!targets.length&&kind==='attack')return false;s.mp-=mp;this.cooldowns[kind]=skill.cooldown;this.mount=false;this.channel=null;this.emit('cast',{kind,x:s.x,z:s.z,r:range,color:skill.color});
  for(const e of targets){const multi=skill.multiplier;this.hit(e,Math.round(st.atk*multi),kind);if(kind==='nova')e.stun=skill.stun;this.facing=Math.atan2(e.x-s.x,e.z-s.z);}return true;
 }
 hit(e,n,kind){if(e.dead)return;e.hp-=n;this.emit('damage',{id:e.id,x:e.x,z:e.z,amount:n,kind});if(e.hp>0)return;e.dead=e.boss?999999:18;e.wind=0;this.s.gold+=e.gold;this.addXP(e.xp);if(e.type==='wolf')this.s.counts.wolves++;if(e.type==='cultist')this.s.counts.cultists++;if(this.s.map==='van'){if(e.type==='guardian')this.s.counts.guardian=1;if(e.type==='lord')this.s.counts.lord=1;}else{const r=this.s.regions[this.s.map];if(e.boss)r.boss=1;else r.kills++;}const grade=this.getRegion().grade;addMaterial(this.s,'essence',grade,e.boss?5:1);if(e.boss)addMaterial(this.s,'feather',grade,4);if(this.random()<.28)addMaterial(this.s,'herb',grade);this.emit('kill',{id:e.id,x:e.x,z:e.z,boss:e.boss});if(e.boss)this.say('Đã hạ '+e.name+'! Quay lại trả nhiệm vụ.');}
 interact(id){
  if(this.paused||!this.s.started)return;const portal=this.getRegion().portal;if((id==='portal'||!id)&&distance(this.s,portal)<5){this.emit('panel',{panel:'atlas'});return;}if(this.s.map!=='van'&&this.regionalInteract(id)!==false)return;const s=this.s,npc=this.npcs.find(n=>(!id||n.id===id)&&distance(s,n)<5.5);
  if(npc){if(npc.id==='forge'){this.emit('panel',{panel:'forge'});return;}if(npc.id==='lam')s.counts.talk=1;const q=QUESTS[s.quest];if(q&&q.npc===npc.id&&questReady(s)){this.stop();this.emit('dialog',{npc:npc.name,text:q.story,claim:true});}else this.emit('dialog',{npc:npc.name,text:npc.id==='lam'?'Hãy đi theo dấu long mạch. Ta sẽ giữ ngọn đèn sáng cho ngày con trở về.':'Tăng sức mạnh trước khi tiến vào Vọng Nguyệt. Hãy nhớ tránh vòng đỏ báo đòn đánh.',claim:false});return;}
  const shrine=this.shrines.find(n=>(!id||id==='seal'+n.id)&&distance(s,n)<4&&!s.seals.includes(n.id));if(shrine){if(s.quest<9){this.say('Phong ấn chưa đáp lại. Tiếp tục chính tuyến.');return;}this.beginChannel('seal',shrine,3.5);return;}
  const node=this.nodes.find(n=>(!id||n.id===id)&&n.cd<=0&&distance(s,n)<4);if(node){this.beginChannel(node.type,node,harvestDuration(s,node.type));return;}this.say('Đến gần NPC, tài nguyên hoặc trụ phong ấn để tương tác.');
 }
 beginChannel(type,obj,duration){if(this.channel?.id===obj.id&&this.channel.type===type)return;this.channel={type,id:obj.id,time:duration,total:duration};this.path=[];this.destination=null;this.mount=false;}
 claim(){if(this.s.map!=='van')return false;const q=QUESTS[this.s.quest];if(!q||!questReady(this.s)||distance(this.s,NPCS.find(n=>n.id===q.npc))>6)return false;this.s.gold+=q.gold;this.addXP(q.xp);this.s.quest++;if(this.s.quest===6){this.s.spirits.fox=Math.max(1,this.s.spirits.fox);this.s.petLevels.fox=this.s.spirits.fox;ensureCompanions(this.s);if(!this.s.petRoster.some(p=>p.species==='fox'))this.s.petRoster.push({id:'pet-'+this.s.petNextId++,species:'fox',rank:1,treasure:0,protected:false});if(!this.s.petDeck.length)this.s.petDeck.push(this.s.petRoster.find(p=>p.species==='fox').id);addMaterial(this.s,'essence',0,4);this.say('Mở khóa Hỏa hồ và thú cưỡi! Nhấn V để cưỡi.');}else this.say(this.s.quest===QUESTS.length?'Hoàn thành hai chương! Vân Sơn đã được cứu.':'Nhiệm vụ mới: '+QUESTS[this.s.quest].title);this.emit('quest');return true;}
 bounty(){const available=Math.floor((this.s.counts.wolves+this.s.counts.cultists)/10)-this.s.bounties;if(available<1)return false;this.s.bounties++;this.s.gold+=120;addMaterial(this.s,'ore',0,2);this.say('Truy nã hoàn tất: +120 đồng, +2 Thanh Thạch.');return true;}
 achievement(i){const a=ACHIEVEMENTS[i];if(!a||this.s.achievements.includes(i)||value(this.s,a.key)<a.need)return false;this.s.achievements.push(i);this.s.gold+=a.gold;this.say('Nhận thành tựu: '+a.title);return true;}
 toggleMount(){ensureCompanions(this.s);if(this.s.quest<6){this.say('Thú cưỡi mở sau nhiệm vụ Tiếng vọng người giữ ấn.');return;}this.mount=!this.mount;this.say(this.mount?'Đã lên thú cưỡi. Chiến đấu sẽ tự xuống.':'Đã xuống thú cưỡi.');}
 wait(text){if(this.lastWait!==text){this.lastWait=text;this.say(text);}}
 autoStep(){
  if(this.mode==='quest'&&this.s.map!=='van')return this.regionalAuto();const s=this.s;let action=this.mode,enemyType=this.farmType,nodeType=action;
  if(this.canAuto('mend')&&s.hp>0&&s.hp<stats(s).hp*.65)this.attack('mend');
  const threat=this.nearest(this.enemies.filter(e=>!e.dead&&this.unlocked(e)&&distance(s,e)<e.range+3));
  if(threat&&action!=='farm'){this.path=[];this.selected=threat.id;if(this.canAuto('nova')&&this.cooldowns.nova<=0&&s.mp>=skillProfile(s,'nova').mp)this.attack('nova');else if(this.canAuto('slash')&&this.cooldowns.slash<=0&&s.mp>=skillProfile(s,'slash').mp)this.attack('slash');else if(distance(s,threat)<=stats(s).range)this.attack();else this.navigate(threat.x,threat.z);return;}
  if(action==='quest'){const q=QUESTS[s.quest];if(!q){this.stop();this.say('Đã hoàn thành chính tuyến. Chọn auto farm hoặc thu thập để tiếp tục.');return;}if(questReady(s)||q.goals[0]?.key==='talk'){const n=NPCS.find(n=>n.id===q.npc);if(distance(s,n)<4.8){this.interact(n.id);}else this.navigate(n.x,n.z+2);return;}
   const goal=q.goals.find(g=>value(s,g.key)<g.need);if(['wolves','cultists','guardian','lord'].includes(goal.key)){action='farm';enemyType={wolves:'wolf',cultists:'cultist',guardian:'guardian',lord:'lord'}[goal.key];}
   else if(['mined','gathered','meditated'].includes(goal.key)){nodeType={mined:'ore',gathered:'herb',meditated:'energy'}[goal.key];action='gather';}
   else if(goal.key==='seals'){const shrine=this.shrines.find(n=>!s.seals.includes(n.id));if(distance(s,shrine)<3.5)this.interact('seal'+shrine.id);else this.navigate(shrine.x,shrine.z);return;}
   else {this.stop();this.emit('panel',{panel:goal.key==='spiritLevel'?'spirits':goal.key==='inner'?'inner':'equipment'});this.say('Hãy chọn nâng cấp hoặc chế thuốc để hoàn thành nhiệm vụ.');return;}
  }
  if(action==='farm'){
   const e=this.nearest(this.enemies.filter(e=>!e.dead&&e.type===enemyType&&this.unlocked(e)));
   if(!e){this.path=[];this.wait('Đang chờ mục tiêu tái xuất…');return;}this.lastWait='';this.target=e.id;this.selected=e.id;let d=distance(s,e);if(d<=stats(s).range*.85){this.path=[];this.destination=null;if(e.wind>.1){const dx=s.x-e.x,dz=s.z-e.z,a=Math.atan2(dx||1,dz||1);this.facing=a;if(this.canAuto('dash')&&this.cooldowns.dash<=0)this.attack('dash');}else{if(this.canAuto('nova')&&s.mp>=skillProfile(s,'nova').mp&&this.cooldowns.nova<=0)this.attack('nova');else if(this.canAuto('slash')&&s.mp>=skillProfile(s,'slash').mp&&this.cooldowns.slash<=0)this.attack('slash');else this.attack();}}else this.navigate(e.x,e.z);return;
  }
  if(['ore','herb','energy'].includes(nodeType)){const node=this.nearest(this.nodes.filter(n=>n.type===nodeType&&n.cd<=0&&(this.s.gatherGrade<0||n.grade===this.s.gatherGrade)));if(!node){this.path=[];this.wait('Không có mỏ sẵn sàng đúng bộ lọc. Đổi màu mỏ hoặc chờ hồi phục…');return;}this.lastWait='';if(distance(s,node)<3.5)this.beginChannel(node.type,node,harvestDuration(s,node.type));else this.navigate(node.x,node.z);}
 }
 update(dt,input={x:0,z:0}){
  if(this.paused||!this.s.started)return;dt=clamp(dt,0,.1);const s=this.s;s.hp=Math.min(s.hp,stats(s).hp);this.moving=false;s.playTime+=dt;for(const k of Object.keys(this.cooldowns))this.cooldowns[k]=Math.max(0,this.cooldowns[k]-dt);this.ward=Math.max(0,this.ward-dt);s.mp=Math.min(stats(s).mp,s.mp+dt*(4+s.upgrades.mind*.8));
  if(input.x||input.z)this.move(input.x*100,input.z*100,dt,true);else{this.actionTime-=dt;if(this.mode!=='off'&&this.actionTime<=0&&!this.channel){this.autoStep();this.actionTime=.25;}if(this.path.length&&!this.channel){const p=this.path[0];if(distance(s,p)<.65)this.path.shift();else this.move(p.x-s.x,p.z-s.z,dt);}}
  tickNodes(this,dt);
  for(const e of this.enemies){if(e.dead>0){if(!e.boss){e.dead=Math.max(0,e.dead-dt);if(e.dead<=0){e.hp=e.max;e.x=e.home.x;e.z=e.home.z;}}continue;}if(!this.unlocked(e))continue;e.cd-=dt;e.stun=Math.max(0,e.stun-dt);if(e.stun)continue;const d=distance(s,e),home=distance(e,e.home);
   if(e.wind>0){e.wind-=dt;if(e.wind<=0&&distance(s,e)<e.range+1.8&&this.ward<=0){const n=Math.max(3,e.atk-stats(s).def);s.hp-=n;this.mount=false;this.channel=null;this.emit('hurt',{amount:n,x:s.x,z:s.z});}continue;}
   if(d<e.aggro&&home<30){if(d>e.range){const nx=e.x+(s.x-e.x)/d*e.speed*dt,nz=e.z+(s.z-e.z)/d*e.speed*dt;if(this.walkable(nx,nz)){e.x=nx;e.z=nz;}}else if(e.cd<=0){e.wind=e.boss?1.2:.6;e.cd=e.boss?2.8:2;}}
   else if(home>1){e.x+=(e.home.x-e.x)/home*e.speed*dt;e.z+=(e.home.z-e.z)/home*e.speed*dt;if(home>25)e.hp=Math.min(e.max,e.hp+dt*20);}
  }
  if(this.channel){const c=this.channel;c.time-=dt;if(c.time<=0){if(c.type==='seal'){if(!s.seals.includes(c.id))s.seals.push(c.id);this.say('Đã giải phong ấn '+s.seals.length+'/3.');this.emit('seal',{id:c.id});}else{const n=this.nodes.find(n=>n.id===c.id);if(n&&n.cd<=0)harvestNode(this,n);}this.channel=null;}}
  this.spiritClock+=dt;if(this.spiritClock>3){this.spiritClock=0;this.rosterPulse();}
  if(s.settings.autoPotion&&s.hp>0&&s.hp<stats(s).hp*.35)this.potion();
  if(s.hp<=0){s.hp=stats(s).hp;s.mp=stats(s).mp;Object.assign(s,this.getRegion().spawn);this.stop();this.mount=false;this.ward=4;for(const e of this.enemies){e.x=e.home.x;e.z=e.home.z;e.wind=0;e.hp=e.max;}this.emit('death');this.say('Đã hồi sinh tại tiền trạm, giữ nguyên tài nguyên. Auto đã dừng.');}
 }
}

Object.assign(Game.prototype,{getStats(){return stats(this.s);}},companionActions,equipmentActions,craftingActions,rosterActions,regionActions({NPCS,SHRINES,OBSTACLES,NODE_DEFS,ENEMY_DEFS,ENEMY_TYPES,distance}));
