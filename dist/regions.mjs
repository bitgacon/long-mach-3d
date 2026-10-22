const makeQuests=(name,npc,stories)=>[
 {title:stories[0][0],text:stories[0][1],goals:[{key:'regionalKills',need:6,label:'Dẹp 6 quái trong khu vực'}],npc:'lam',gold:250, xp:180,story:stories[0][2]},
 {title:stories[1][0],text:stories[1][1],goals:[{key:'regionalOre',need:4,label:'Đào 4 mỏ đúng màu khu vực'},{key:'regionalHerb',need:4,label:'Hái 4 linh thảo đúng màu'},{key:'regionalEnergy',need:4,label:'Hấp thu 4 nguồn đúng màu'}],npc:'lam',gold:350,xp:250,story:stories[1][2]},
 {title:stories[2][0],text:stories[2][1],goals:[{key:'regionalCraft',need:1,label:'Chế 1 trang bị cùng màu khu vực'}],npc:'lam',gold:400,xp:300,story:stories[2][2]},
 {title:stories[3][0],text:stories[3][1],goals:[{key:'regionalBoss',need:1,label:'Hạ thủ lĩnh khu vực'}],npc:'lam',gold:600,xp:450,story:stories[3][2]}
].map((q,i)=>({...q,chapter:name,regionQuest:true,index:i,npcName:npc}));
export const REGIONS=[
 {id:'van',name:'Vân Sơn',grade:0,subtitle:'Miền khởi nguyên · Dấu ấn thất lạc',biome:'forest',ground:0x45624f,fog:0x91aaa0,spawn:{x:32,z:97},portal:{x:37,z:120},description:'Giải cứu long mạch đầu tiên và tìm dấu vết An Nhiên.',level:'1–6',unlockText:'Luôn mở',quests:[]},
 {id:'truc',name:'Trúc Hải',grade:1,subtitle:'Chương III · Tiếng sáo trong rừng',biome:'bamboo',ground:0x365b46,fog:0x87b298,spawn:{x:32,z:97},portal:{x:37,z:120},npc:'Dược sư Mộc',boss:'Mộc Yêu Cổ Thụ',mob:'Sói trúc',guard:'Thợ săn lạc lối',description:'Nguồn nước bị rễ tà mộc phong kín. Dược sư Mộc nhờ bạn cứu rừng trúc.',level:'6–12',unlockText:'Hoàn thành 3 nhiệm vụ Vân Sơn',quests:makeQuests('III','Dược sư Mộc',[
 ['Tiếng sáo mất dấu','Đàn sói trúc đang xua dân khỏi nguồn nước.','Tiếng sáo dẫn quái về phía rễ cổ thụ. Hãy tìm dược liệu cứu rừng.'],
 ['Dược mạch xanh','Thu thập đủ ba nguồn nguyên liệu Xanh lá tại Trúc Hải.','Linh khí còn sạch bên trong các đốt trúc. Hãy chế trang bị để xuyên qua rễ tà.'],
 ['Áo mới qua rừng','Chế một món đồ Xanh lá trong Lò rèn. Có thể ghép từ đồ Trắng bậc IV +8 hoặc chế trực tiếp.','Bộ rễ đã yếu đi. Mộc Yêu đang trú ở đền phía bắc.'],
 ['Rễ cổ thụ','Hạ Mộc Yêu Cổ Thụ rồi trở lại Dược sư Mộc.','Dòng nước chảy trở lại. Mộc trao bạn bản đồ Băng Hồ cùng lời nhắn: An Nhiên đã đi về phương bắc.']])},
 {id:'bang',name:'Băng Hồ',grade:2,subtitle:'Chương IV · Ký ức dưới mặt băng',biome:'snow',ground:0xa7bac4,fog:0xc2d8df,spawn:{x:32,z:97},portal:{x:37,z:120},npc:'Người giữ hồ Tuyết',boss:'Băng Vương',mob:'Lang băng',guard:'Hồn vệ băng',description:'Một mảnh ký ức của người giữ ấn bị giam dưới hồ đóng băng.',level:'12–20',unlockText:'Hoàn thành Trúc Hải',quests:makeQuests('IV','Người giữ hồ Tuyết',[
 ['Đêm trắng','Dẹp quái tuyết quanh tiền trạm.','Những hồn vệ đang che chở một cổ ấn bị đánh cắp.'],
 ['Tinh thể ký ức','Khai thác ba nguồn nguyên liệu Xanh lam trên bờ hồ.','Tinh thể giữ lại hình bóng của An Nhiên, bị áp giải về Hỏa Sơn.'],
 ['Khí giới phá băng','Chế một món đồ Xanh lam để chống giá buốt.','Băng Vương sắp đánh thức cơn bão cuối cùng.'],
 ['Người dưới hồ','Đánh bại Băng Vương ở cổ điện.','Băng tan, mảnh ấn hé lộ lối qua Hỏa Sơn. Bạch lộc đã sẵn sàng đồng hành.']])},
 {id:'hoa',name:'Hỏa Sơn',grade:3,subtitle:'Chương V · Lò rèn tro đỏ',biome:'volcano',ground:0x51403b,fog:0x785c55,spawn:{x:32,z:97},portal:{x:37,z:120},npc:'Thợ rèn Hỏa',boss:'Viêm Ma',mob:'Hỏa lang',guard:'Xích giáp vệ',description:'Ảnh giáo nung chảy linh mạch để rèn chìa khóa Thiên Cung.',level:'20–30',unlockText:'Hoàn thành Băng Hồ',quests:makeQuests('V','Thợ rèn Hỏa',[
 ['Tro trên đường','Dẹp quái lửa để mở đường tới lò rèn.','Hỏa cho biết linh mạch bị khóa trong tim Viêm Ma.'],
 ['Mạch đỏ','Thu thập vật liệu Đỏ từ các mỏ quanh núi lửa.','Vật liệu này chịu được nhiệt long mạch. Hãy rèn trang bị Sử thi.'],
 ['Rèn trong lửa','Chế một trang bị Đỏ tại Lò rèn.','Chìa khóa còn thiếu một mảnh trong tay Viêm Ma.'],
 ['Tim núi lửa','Hạ Viêm Ma ở miệng núi phía bắc.','Chìa khóa hoàn chỉnh mở lối lên Thiên Cung. Một đôi cánh sẽ giúp bạn vượt biển mây.']])},
 {id:'thien',name:'Thiên Cung',grade:4,subtitle:'Chương VI · Lời thề trên mây',biome:'sky',ground:0xc0b78f,fog:0xdcd6bc,spawn:{x:32,z:97},portal:{x:37,z:120},npc:'An Nhiên',boss:'Long Ảnh Đế',mob:'Vân lang',guard:'Kim giáp hồn',description:'An Nhiên chờ trên điện mây. Quyết định số phận các long mạch.',level:'30+',unlockText:'Hoàn thành Hỏa Sơn',quests:makeQuests('VI','An Nhiên',[
 ['Bậc thềm mây','Dẹp các hồn vệ giữ cầu trời.','Long Ảnh Đế đã dùng ấn giả để đảo dòng linh khí.'],
 ['Ánh vàng nguyên thủy','Thu vật liệu Vàng từ khoáng mạch, linh thảo và linh khí trên mây.','Ánh vàng đủ để rèn vật dẫn hợp nhất những mảnh ấn.'],
 ['Tín vật của lời thề','Chế một món Huyền thoại để mang long ấn vào chính điện.','An Nhiên sẽ giữ trận pháp. Bạn phải chặn Long Ảnh Đế.'],
 ['Bình minh sáu cõi','Hạ Long Ảnh Đế và trở về gặp An Nhiên.','Sáu dòng long mạch cùng tỏa sáng. Hành trình khép lại, nhưng lời thề bảo vệ thế giới vẫn còn.']])}
];
export const regionById=id=>REGIONS.find(r=>r.id===id);
export const emptyRegions=()=>Object.fromEntries(REGIONS.slice(1).map(r=>[r.id,{quest:0,kills:0,ore:0,herb:0,energy:0,craft:0,boss:0}]));
export function regionUnlocked(s,index){if(index===0)return true;if(index===1)return s.quest>=3;return (s.regions?.[REGIONS[index-1].id]?.quest||0)>=4;}
export function regionQuest(s){return s.map==='van'?null:regionById(s.map)?.quests[s.regions[s.map].quest]||null;}
export function regionValue(s,key){const p=s.regions?.[s.map];if(!p)return 0;return p[{regionalKills:'kills',regionalOre:'ore',regionalHerb:'herb',regionalEnergy:'energy',regionalCraft:'craft',regionalBoss:'boss'}[key]]||0;}
export function mapNodes(region){const spots=[[55,77],[76,90],[94,75],[115,90],[143,87],[49,59],[66,111],[92,111],[120,106],[144,111],[66,46],[92,48],[119,50],[144,55],[154,36]];return spots.map(([x,z],i)=>({id:'node'+i,x,z,type:['ore','herb','energy'][Math.floor(i/5)],grade:region.grade}));}
export function mapEnemies(region){return [[64,70],[80,61],[85,100],[106,80],[124,74],[140,97],[152,65],[130,40]].map(([x,z],i)=>({id:'enemy'+i,x,z,type:i<4?'wolf':'cultist',name:i<4?region.mob:region.guard})).concat([{id:'enemy11',x:107,z:30,type:'guardian',name:region.boss}]);}
export function mapObstacles(region){return [{x:18,z:90,r:6},{x:45,z:102,r:6},{x:22,z:116,r:5},{x:46,z:81,r:5},...(region.biome==='snow'?[{x:23,z:28,r:15}]:[{x:143,z:97,r:8}])];}
export function validateRegions(s){if(!regionById(s.map)||!s.regions)throw Error('Bản đồ không hợp lệ');for(const r of REGIONS.slice(1)){const p=s.regions[r.id];if(!p||!['quest','kills','ore','herb','energy','craft','boss'].every(k=>Number.isSafeInteger(p[k])&&p[k]>=0&&p[k]<=1e7)||p.quest>4)throw Error('Tiến trình khu vực không hợp lệ');}if(!regionUnlocked(s,REGIONS.findIndex(r=>r.id===s.map)))throw Error('Bản đồ chưa mở khóa');}
