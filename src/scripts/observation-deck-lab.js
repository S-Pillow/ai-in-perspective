import * as THREE from 'three';
import { gsap } from 'gsap';

// Isolated art/interaction pilot: authored terrain morphology, no fake feed or fake data.
const WORLDS=[
  {id:'history',zenith:0x142c42,horizon:0x9ba8a2,floor:0xa19c8d,shadow:0x485b61,light:0xfce9ca,sky:0x315a72},
  {id:'risks',zenith:0x122b48,horizon:0x6e9d99,floor:0x437f81,shadow:0x233c53,light:0xe6e4cd,sky:0x27495f},
  {id:'benefits',zenith:0x283b59,horizon:0xe1ab8e,floor:0x9d9c7b,shadow:0x586d71,light:0xffe7b3,sky:0x567b86},
  {id:'environment',zenith:0x092f40,horizon:0x97ccbe,floor:0x427e76,shadow:0x1e4f58,light:0xd2f5dc,sky:0x3f8993},
  {id:'education',zenith:0x132e50,horizon:0x90b8bb,floor:0x698da6,shadow:0x233e60,light:0xe9f5de,sky:0x567ca1}
];
function disposeGroup(group){
  group.traverse(obj=>{if(obj.geometry)obj.geometry.dispose();if(obj.material){const m=Array.isArray(obj.material)?obj.material:[obj.material];m.forEach(x=>x.dispose());}});
  group.clear();
}
function worldHeight(x,z,type){
  const nz=(z+42)/70;
  const ridge=(v,w,s)=>Math.exp(-Math.pow((x-v)/w,2)) * s;
  const rough=.45*Math.sin(x*.37+Math.sin(z*.14))*Math.sin(z*.22-x*.17);
  if(type===0)return .7+ridge(-32,22,11)*(.8+.28*Math.sin(z*.10))+ridge(31,22,13)+3*Math.sin((z+12)*.11)+rough;
  if(type===1)return .4+ridge(-38,24,18)+ridge(34,21,15)+ridge(2,10,4)*Math.max(0,(z+39)/60)+rough*1.15;
  if(type===2)return 1+ridge(-32,25,12)+ridge(30,26,11)+4*Math.exp(-Math.pow((x+4)/18,2))*Math.sin(z*.1+1)**2+rough*.7;
  if(type===3)return .3+ridge(-40,19,15)+ridge(37,22,16)+ridge(-17,10,4)+rough*.9;
  return 2+ridge(-33,24,16)+ridge(32,24,15)+ridge(0,22,3)*Math.abs(Math.sin(z*.06))+.6*Math.sin(x*.2+z*.2);
}
function makeLandscape(scene,type,items){
  const theme=WORLDS[type];
  const group=new THREE.Group();scene.add(group);
  const geo=new THREE.PlaneGeometry(122,105,76,56);geo.rotateX(-Math.PI/2);geo.translate(0,-6,-28);
  const p=geo.attributes.position;
  const base=new THREE.Color(theme.floor),shade=new THREE.Color(theme.shadow);
  const colors=[];
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),z=p.getZ(i),h=worldHeight(x,z,type);
    const terrace=type===0?Math.floor(h/2.8)*2.8:h;
    p.setY(i,terrace-4);
    const n=THREE.MathUtils.clamp(h/19,0,1);
    const c=base.clone().lerp(shade,n*.82);
    if(type===0 && Math.abs(h/2.8-Math.round(h/2.8))<.08)c.lerp(new THREE.Color(0xd8b692),.18);
    colors.push(c.r,c.g,c.b);
  }
  geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();
  const mat=new THREE.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:1,metalness:0,side:THREE.DoubleSide});
  const terrain=new THREE.Mesh(geo,mat);terrain.receiveShadow=false;group.add(terrain);
  function addPillar(x,z,h,color,r=.35){const g=new THREE.CylinderGeometry(r*.62,r,h,8,1);const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color,roughness:.87,flatShading:true}));m.position.set(x,h/2-1,z);group.add(m);}
  const primary=new THREE.Color(theme.light);
  if(type===0){
    // Low archival cairns mark a physical passage through time, not literal historical data.
    for(let j=0;j<4;j++){
      const z=-50+j*12;const h=4.5+j*1.5;
      addPillar(-7+j*3,z,h,j%2?0x9b857b:0xd1b898,1.35);
    }
  }else if(type===1){
    for(let i=0;i<6;i++){
      const x=-21+i*8, z=-27-(i%3)*6, h=3.5+i%3*2.1;
      addPillar(x,z,h,0x1a4356,.48);
      const tip=new THREE.Mesh(new THREE.OctahedronGeometry(.46),new THREE.MeshBasicMaterial({color:0xb4ede4}));tip.position.set(x,h-.65,z);group.add(tip);
    }
    const route=new THREE.CatmullRomCurve3([new THREE.Vector3(-19,1,-27),new THREE.Vector3(-10,2,-23),new THREE.Vector3(1,1,-30),new THREE.Vector3(17,2,-25)]);
    const line=new THREE.Mesh(new THREE.TubeGeometry(route,60,.065,5,false),new THREE.MeshBasicMaterial({color:0x94dfd2}));group.add(line);
  }else if(type===2){
    for(let i=0;i<5;i++){
      const x=(i-2)*8,z=-20-(i%3)*9,h=2+(i%3)*2;
      addPillar(x,z,h,0xb99e86,.82);
    }
    const pts=[new THREE.Vector3(-24,1.5,-32),new THREE.Vector3(-13,6,-29),new THREE.Vector3(1,5,-35),new THREE.Vector3(13,8,-29),new THREE.Vector3(23,2,-37)];
    group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),90,.15,5,false),new THREE.MeshBasicMaterial({color:0xe9e1bd})));
  }else if(type===3){
    const lake=new THREE.Mesh(new THREE.PlaneGeometry(50,78,32,20),new THREE.MeshStandardMaterial({color:0x7dc9bd,metalness:.32,roughness:.25,transparent:true,opacity:.8}));lake.rotation.x=-Math.PI/2;lake.position.set(0,-3.4,-28);group.add(lake);
    for(let i=0;i<8;i++){const x=-31+i*8;addPillar(x,-45,2+(i%3),0x356e71,.18);}
  }else{
    for(let i=0;i<6;i++){
      const x=-24+i*9,z=-37+(i%2)*7,h=3+(i%3);
      addPillar(x,z,h,0x426980,.34);
      const cap=new THREE.Mesh(new THREE.IcosahedronGeometry(.46,1),new THREE.MeshBasicMaterial({color:0xd7eedf}));cap.position.set(x,h-.4,z);group.add(cap);
    }
  }
  return group;
}

export function bootObservationDeck(){
  const root=document.querySelector('[data-deck]');if(!root)return;
  const track=root.querySelector('[data-deck-track]'),panels=Array.from(root.querySelectorAll('[data-deck-window]'));
  const prev=root.querySelector('[data-deck-prev]'),next=root.querySelector('[data-deck-next]');
  const counter=root.querySelector('[data-deck-counter]');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let active=1,renderer=null,scene=null,camera=null,landscape=null,stars=null,animation=0,clock=0,visible=true,disposed=false;
  let canvas=document.createElement('canvas');canvas.className='deck-world-canvas';canvas.setAttribute('aria-hidden','true');
  const colors=new THREE.Color();
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.30;
    renderer.setClearColor(0x121e32,1);
    scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x708f9c,.006);
    camera=new THREE.PerspectiveCamera(49,1,.1,320);camera.position.set(0,10,36);camera.lookAt(0,2,-23);
    scene.add(new THREE.HemisphereLight(0xc8f9f1,0x26394e,2.3));
    const sun=new THREE.DirectionalLight(0xffecd5,2.8);sun.position.set(-24,39,-8);scene.add(sun);
    const rim=new THREE.DirectionalLight(0x88caca,1.5);rim.position.set(16,4,-40);scene.add(rim);
    // Environment genuinely rendered in 3D behind an architectural ship viewport.
    root.dataset.webgl='ready';
  }catch(e){root.dataset.webgl='unavailable';}
  function resize(){if(!renderer||disposed)return;const b=canvas.getBoundingClientRect();if(b.width<2||b.height<2)return;renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.45));renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;camera.fov=b.width<430?59:49;camera.updateProjectionMatrix();render();}
  function render(){if(!renderer||!scene||!visible)return;renderer.render(scene,camera);}
  function changeWorld(index){
    if(!renderer||disposed)return;
    if(landscape){scene.remove(landscape);disposeGroup(landscape);landscape=null;}
    const t=WORLDS[index];
    renderer.setClearColor(t.sky,1);
    scene.fog.color.setHex(t.horizon);
    landscape=makeLandscape(scene,index);
    panels[index].querySelector('[data-deck-render-slot]').appendChild(canvas);
    resize();render();
  }
  function centerIndex(){const box=track.getBoundingClientRect(),center=box.left+box.width/2;let best=active,min=Infinity;panels.forEach((p,i)=>{const r=p.getBoundingClientRect();const d=Math.abs((r.left+r.width/2)-center);if(d<min){min=d;best=i;}});return best;}
  function updateActive(){const idx=centerIndex();if(idx===active)return;active=idx;panels.forEach((p,i)=>{p.classList.toggle('deck-module--active',i===active);p.setAttribute('aria-current',i===active?'true':'false');});counter.textContent=String(active+1).padStart(2,'0')+' / 05';prev.disabled=active===0;next.disabled=active===panels.length-1;changeWorld(active);}
  function go(index,behavior='smooth'){
    const i=Math.max(0,Math.min(panels.length-1,index));const p=panels[i];
    track.scrollTo({left:p.offsetLeft-(track.clientWidth-p.clientWidth)/2,behavior:reduce.matches?'instant':behavior});
    if(behavior==='instant'||reduce.matches){setTimeout(updateActive,60);}
  }
  prev.addEventListener('click',()=>go(active-1));next.addEventListener('click',()=>go(active+1));
  track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(active-1);}else if(e.key==='ArrowRight'){e.preventDefault();go(active+1);}});
  let startX=0,startScroll=0,moved=false,dragging=false;
  track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('a,button'))return;dragging=true;moved=false;startX=e.clientX;startScroll=track.scrollLeft;track.classList.add('deck-dragging');track.setPointerCapture?.(e.pointerId);});
  track.addEventListener('pointermove',e=>{if(!dragging)return;const distance=e.clientX-startX;if(Math.abs(distance)>5)moved=true;if(moved){track.scrollLeft=startScroll-distance;}});
  function endDrag(){if(!dragging)return;dragging=false;track.classList.remove('deck-dragging');go(centerIndex());}
  track.addEventListener('pointerup',endDrag);track.addEventListener('pointercancel',endDrag);
  track.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
  let debounce;track.addEventListener('scroll',()=>{clearTimeout(debounce);debounce=setTimeout(updateActive,125);},{passive:true});
  const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
  ro?.observe(track);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)render();});
  let last=0;
  function frame(t){if(disposed)return;let dt=Math.min(.035,(t-last)/1000||0);last=t;if(renderer&&visible&&!reduce.matches){clock+=dt; if(landscape)landscape.rotation.y=Math.sin(clock*.09)*.018;render();}animation=requestAnimationFrame(frame);}
  panels.forEach((p,i)=>{p.classList.toggle('deck-module--active',i===active);p.setAttribute('aria-current',i===active?'true':'false');});
  // Initial frame is Risks & Safety so the approved existing route is immediately useful.
  requestAnimationFrame(()=>{go(1,'instant');changeWorld(1);animation=requestAnimationFrame(frame);});
  window.addEventListener('pagehide',()=>{disposed=true;clearTimeout(debounce);cancelAnimationFrame(animation);ro?.disconnect();if(landscape){scene.remove(landscape);disposeGroup(landscape);}renderer?.dispose();},{once:true});
}