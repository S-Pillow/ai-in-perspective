/** AIIP EXPERIENCE-10: two illustrative water-cooling examples. Original isometric SVG artwork.
 * Uses the projection and hairline/glow language of the owner-uploaded ISO-GLOW (MIT).
 * This is not an engineered site drawing, a data feed, or a water balance. */
const waterStage = document.querySelector('[data-water-stage]');
if (waterStage) {
  const frame = waterStage.closest('[data-water-experience]');
  const view = frame.querySelector('[data-water-scroll]');
  const modes = [...frame.querySelectorAll('[data-water-mode-btn]')];
  const focuses = [...frame.querySelectorAll('[data-water-focus-btn]')];
  const motionButton = frame.querySelector('[data-water-motion]');
  const readingStep = frame.querySelector('[data-water-reading-step]');
  const readingTitle = frame.querySelector('[data-water-reading-title]');
  const readingBody = frame.querySelector('[data-water-reading-body]');
  const modeDescriptor = frame.querySelector('[data-water-mode-description]');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const C = Math.cos(Math.PI / 6);
  const S = Math.sin(Math.PI / 6);
  const P = (x, y, z = 0) => [636 + (x - y) * C, 92 + (x + y) * S - z];
  const p = (xyz) => P(...xyz).map(v => Number(v).toFixed(1)).join(',');
  const poly = (pts, cls, attrs='') => `<polygon class="${cls}" points="${pts.map(p).join(' ')}" ${attrs}/>`;
  const path = (pts, cls, attrs='') => `<path class="${cls}" d="M${pts.map(p).join(' L')}" ${attrs}/>`;
  const line = (a, b, cls) => path([a,b], cls);
  const dot = (x,y,z,r,cls) => {const [a,b]=P(x,y,z);return `<circle cx="${a}" cy="${b}" r="${r}" class="${cls}"/>`};
  const box = (x,y,z,w,d,h,cls='') => `<g class="iw-box ${cls}">
      ${poly([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],'iw-box-front')}
      ${poly([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],'iw-box-side')}
      ${poly([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],'iw-box-top')}
    </g>`;
  const chip=(x,y,z,label,kind='')=>{const [a,b]=P(x,y,z); const width=Math.max(98,label.length*7+22);return `<g class="iw-chip ${kind}" transform="translate(${a},${b})"><rect x="${-width/2}" y="-17" width="${width}" height="25" rx="6"/><text text-anchor="middle" y="0">${label}</text></g>`};
  const pipe=(pts,kind,zone)=>{
    const marker=kind==='hot'||kind==='blowdown'?'iw-arrow-amber':kind==='reuse'||kind==='return'||kind==='discharge'?'iw-arrow-teal':'iw-arrow-blue';
    return `<g class="iw-pipe iw-pipe--${kind}" data-water-zone="${zone}">${path(pts,'iw-pipe-back')}${path(pts,'iw-pipe-core',`marker-end="url(#${marker})"`)}${path(pts,'iw-pipe-moving')}</g>`;
  };
  const label=(x,y,z,title,small)=>`<g class="iw-site-label" transform="translate(${P(x,y,z).map(n=>n.toFixed(1)).join(',')})"><text text-anchor="middle">${title}</text>${small?`<text y="17" text-anchor="middle" class="iw-site-label-small">${small}</text>`:''}</g>`;
  const tree=(x,y,scale=1)=>{const [tx,ty]=P(x,y,42*scale),[bx,by]=P(x,y,3);return `<g class="iw-tree"><ellipse cx="${bx}" cy="${by}" rx="${19*scale}" ry="${7*scale}" class="iw-tree-base"/>${line([x,y,3],[x,y,23*scale],'iw-tree-trunk')}<path d="M${tx} ${ty} L${bx-18*scale} ${by-13*scale} Q${bx} ${by-24*scale} ${bx+18*scale} ${by-13*scale} Z" class="iw-tree-crown"/></g>`};
  const foundation=()=>{
    let out=`<g class="iw-foundation">
      ${poly([[0,0,-18],[620,0,-18],[620,415,-18],[0,415,-18]],'iw-base-shadow')}
      ${poly([[0,415,-18],[620,415,-18],[620,415,0],[0,415,0]],'iw-base-front')}
      ${poly([[620,0,-18],[620,415,-18],[620,415,0],[620,0,0]],'iw-base-side')}
      ${poly([[0,0,0],[620,0,0],[620,415,0],[0,415,0]],'iw-base-top')}
      ${poly([[13,13,2],[607,13,2],[607,402,2],[13,402,2]],'iw-base-outline')}
    </g>`;
    for(let x=45;x<620;x+=45)out+=line([x,24,1],[x,390,1],'iw-grid');
    for(let y=40;y<415;y+=45)out+=line([21,y,1],[598,y,1],'iw-grid');
    out+=`<g class="iw-river" data-water-zone="withdrawal discharge">
      ${poly([[22,245,3],[233,245,3],[233,402,3],[22,402,3]],'iw-waterbank')}
      ${poly([[33,256,5],[223,256,5],[223,389,5],[33,389,5]],'iw-river-surface')}
      ${[0,1,2,3,4].map(i=>path([[51+i*15,272+i*20,6],[91+i*15,272+i*20,6],[141+i*15,273+i*20,6]],'iw-river-wave')).join('')}
      ${label(110,331,8,'RIVER / SOURCE','EXAMPLE WATER BODY')}
    </g>`;
    out+='<g class="iw-site-pads">';
    out+=poly([[240,80,2],[444,80,2],[444,246,2],[240,246,2]],'iw-pad');
    out+=poly([[455,126,2],[588,126,2],[588,305,2],[455,305,2]],'iw-pad');
    out+=poly([[250,285,2],[454,285,2],[454,382,2],[250,382,2]],'iw-pad');
    out+='</g><g class="iw-landscape">';
    [[28,65,.9],[58,124,.8],[140,67,.78],[572,46,.85],[596,348,.88],[364,394,.66],[25,407,.65],[229,395,.52],[608,117,.68],[584,387,.55]].forEach(t=>out+=tree(...t));
    return out+'</g>';
  };
  const rack=(x,y,i)=>{
    const f=y+44,z=7,h=96,w=52;
    let out=`<g class="iw-rack">${box(x,y,z,w,44,h,'iw-rack-body')}${poly([[x+4,f+.1,z+5],[x+w-4,f+.1,z+5],[x+w-4,f+.1,z+h-6],[x+4,f+.1,z+h-6]],'iw-rack-face')}`;
    for(let j=0;j<7;j++){
      const level=z+h-12-j*11.1;
      out+=poly([[x+8,f+.4,level-8],[x+w-7,f+.4,level-8],[x+w-7,f+.4,level],[x+8,f+.4,level]],'iw-server-bay');
      out+=line([x+13,f+.5,level-4],[x+31,f+.5,level-4],'iw-server-slot');
      out+=dot(x+39,f+.7,level-4,1.7,`iw-rack-led ${j%3?'':'iw-rack-led-delay'}`);
    }
    out+=poly([[x+7,f+.7,z+h-5],[x+w-7,f+.7,z+h-5],[x+w-7,f+.7,z+h-1],[x+7,f+.7,z+h-1]],'iw-switch');
    out+=dot(x+15,y+19,z+h+.8,7,'iw-roof-fan')+dot(x+34,y+21,z+h+.8,7,'iw-roof-fan');
    out+=`<text x="${P(x+26,f+7,5)[0]}" y="${P(x+26,f+7,5)[1]}" text-anchor="middle" class="iw-rack-id">SRV ${i}</text></g>`;
    return out;
  };
  const dataCenter=()=>`<g class="iw-equipment iw-compute" data-water-zone="reuse evaporation">
      ${box(276,100,4,160,133,15,'iw-floor')}
      ${rack(282,115,1)}${rack(338,115,2)}
      ${box(404,128,19,20,44,55,'iw-pdu')}
      ${[0,1,2,3].map(i=>line([423,133+i*8,34],[423,133+i*8,62],'iw-server-slot')).join('')}
      ${label(354,223,15,'AI COMPUTE','HEAT SOURCE')}
    </g>`;
  const tower=()=>{
    const [cx,cy]=P(530,190,92);
    let vents='';for(let i=0;i<11;i++)vents+=line([466+i*8,217,22],[466+i*8,217,74],'iw-tower-slat');
    return `<g class="iw-equipment iw-tower" data-water-zone="reuse evaporation discharge">
      ${box(464,154,4,108,83,75,'iw-tower-shell')}
      ${poly([[469,158,78],[567,158,78],[567,232,78],[469,232,78]],'iw-tower-top')}
      ${vents}
      ${dot(515,195,79,24,'iw-tower-fan')}${dot(515,195,80,6,'iw-tower-hub')}
      ${box(480,221,7,75,8,10,'iw-basin')}
      ${label(521,245,10,'COOLING TOWER','EVAPORATION + BLOWDOWN')}
      <g class="iw-vapor" data-water-zone="evaporation">
        <ellipse cx="${cx-28}" cy="${cy-80}" rx="30" ry="19" class="iw-vapor-puff"/>
        <ellipse cx="${cx+4}" cy="${cy-115}" rx="39" ry="21" class="iw-vapor-puff iw-vapor-delay"/>
        <ellipse cx="${cx+21}" cy="${cy-148}" rx="37" ry="20" class="iw-vapor-puff iw-vapor-delay2"/>
      </g>
      ${chip(515,170,185,'EVAPORATION','iw-chip-vapor')}
    </g>`;
  };
  const waterTreatment=()=>`<g class="iw-equipment iw-treatment" data-water-zone="discharge">
    ${box(334,298,7,82,49,30,'iw-treatment-box')}
    ${box(348,310,38,19,18,6,'iw-treatment-hatch')}
    ${box(380,306,38,19,18,6,'iw-treatment-hatch')}
    ${label(372,357,13,'TREATMENT','DISCHARGE ROUTE')}
  </g>`;
  const evaporative=()=>{
    let out=foundation();
    out+='<g class="iw-flow-net">';
    out+=pipe([[173,309,10],[232,309,10],[232,273,10],[260,273,10],[260,221,10],[470,221,10]],'intake','withdrawal');
    out+=pipe([[473,181,18],[439,181,18],[439,193,18],[406,193,18]],'reuse','reuse');
    out+=pipe([[406,211,16],[444,211,16],[444,252,16],[497,252,16]],'hot','reuse');
    out+=pipe([[541,231,11],[541,283,11],[412,283,11],[412,314,11]],'blowdown','discharge');
    out+=pipe([[371,348,10],[273,348,10],[238,351,10],[192,351,10]],'discharge','discharge');
    out+='</g>';
    out+=`<g class="iw-pump" data-water-zone="withdrawal">${box(209,279,9,45,50,23,'iw-pump-box')}${box(214,287,33,22,28,6,'iw-pump-top')}${label(224,339,17,'INTAKE','MAKEUP WATER')}</g>`;
    out+=dataCenter();
    out+=`<g class="iw-equipment iw-exchanger" data-water-zone="reuse">${box(398,188,22,54,45,39,'iw-exchanger-box')}${[0,1,2,3].map(i=>line([410+i*9,234,31],[410+i*9,234,49],'iw-server-slot')).join('')}${label(423,239,14,'HEAT','EXCHANGER')}</g>`;
    out+=tower()+waterTreatment();
    out+=chip(226,268,30,'WITHDRAWAL','iw-chip-intake');
    out+=chip(447,183,76,'REUSED IN LOOP','iw-chip-reuse');
    out+=chip(270,357,22,'TREATED RETURN*','iw-chip-return');
    out+=`<g class="iw-guides"><path d="M${p([242,363,8])}L${p([211,363,8])}" class="iw-guide"/></g>`;
    return out;
  };
  const powerPlant=()=>{
    let out=`<g class="iw-equipment iw-generation" data-water-zone="withdrawal discharge">
      ${box(290,112,7,175,127,54,'iw-generation-shell')}
      ${box(311,124,61,118,85,11,'iw-generation-roof')}
      ${box(326,134,74,44,34,25,'iw-turbine-box')}
      ${box(390,128,74,23,37,17,'iw-turbine-box')}
      ${[0,1,2,3,4,5].map(i=>line([301+i*21,239,38],[301+i*21,239,51],'iw-server-slot')).join('')}
      ${label(380,251,8,'POWER GENERATION','ONCE-THROUGH EXAMPLE')}
    </g>`;
    out+=`<g class="iw-equipment iw-condenser" data-water-zone="withdrawal discharge">${box(465,192,9,93,76,43,'iw-condenser-shell')}${box(474,206,53,30,49,8,'iw-condenser-vent')}${box(515,206,53,30,49,8,'iw-condenser-vent')}${label(511,274,11,'CONDENSER','HEAT TRANSFER')}</g>`;
    return out;
  };
  const onceThrough=()=>{
    let out=foundation();
    out+='<g class="iw-flow-net">';
    out+=pipe([[173,313,9],[233,313,9],[233,274,9],[440,274,9],[465,244,9]],'intake','withdrawal');
    out+=pipe([[558,261,9],[558,327,9],[431,327,9],[431,361,9],[186,361,9]],'return','discharge');
    out+='</g>';
    out+=`<g class="iw-pump" data-water-zone="withdrawal">${box(208,287,7,49,48,26,'iw-pump-box')}${box(216,297,34,19,24,5,'iw-pump-top')}${label(232,343,12,'INTAKE','RIVER WATER')}</g>`;
    out+=powerPlant();
    out+=chip(264,268,26,'WITHDRAWAL','iw-chip-intake');
    out+=chip(412,351,21,'RETURN TO SOURCE','iw-chip-return');
    out+=chip(557,269,70,'WARMER WATER','iw-chip-warm');
    return out;
  };
  const renderScene=(mode)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 710" role="img" aria-labelledby="water-svg-title water-svg-desc">
    <title id="water-svg-title">${mode==='evaporative'?'Evaporative cooling at an example data center':'Once-through cooling at an example power-generation plant'}</title>
    <desc id="water-svg-desc">${mode==='evaporative'?'An illustrative isometric data center withdraws makeup water from a source. Water recirculates in a cooling loop, some evaporates, and blowdown passes through treatment before a possible permitted return to the water body. The discharge route shown is not universal.':'An illustrative isometric power plant withdraws river water into its condenser and returns much of that water to its source at a higher temperature. This does not represent a specific plant.'}</desc>
    <defs>
      <marker id="iw-arrow-blue" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 2L10 6L1 10Z" fill="#7ad9fa"/></marker>
      <marker id="iw-arrow-teal" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 2L10 6L1 10Z" fill="#83ddc9"/></marker>
      <marker id="iw-arrow-amber" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 2L10 6L1 10Z" fill="#eebc89"/></marker>
      <linearGradient id="iw-river-fill" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#164b60"/><stop offset="1" stop-color="#0c283a"/></linearGradient>
      <filter id="iw-halo" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="iw-glow"><stop stop-color="#2c656e" stop-opacity=".2"/><stop offset="1" stop-color="#09131b" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="665" cy="393" rx="540" ry="330" fill="url(#iw-glow)"/>
    ${mode==='evaporative'?evaporative():onceThrough()}
    <text x="94" y="66" class="iw-svg-overline">ISO SYSTEM STUDY / ${mode==='evaporative'?'DATA CENTER':'POWER PLANT'}</text>
    <text x="94" y="91" class="iw-svg-subline">CONCEPTUAL ILLUSTRATION — NOT A MEASURED FACILITY</text>
    <text x="1245" y="648" text-anchor="end" class="iw-svg-overline">SCHEMATIC • NOT TO SCALE</text>
  </svg>`;
  const focusCopy = {
    evaporative:{
      all:['THE WATER PATH','Water moves through several different paths','The cooling system takes in makeup water, recirculates water to move heat, evaporates some into the air, and sends a portion to blowdown treatment. In this example, treated discharge may return to the river where permitted.'],
      withdrawal:['01 / WITHDRAWAL','New water enters the cooling system','Water withdrawn from the illustrated river replaces water lost from the cooling system. Real facilities may instead use municipal water, groundwater, or reclaimed wastewater.'],
      reuse:['02 / RECIRCULATION','The same cooling water can be reused many times','Water moves between the heat exchanger and cooling tower before more makeup water is needed. Internal recirculation is not the same as returning withdrawn water to the river.'],
      evaporation:['03 / EVAPORATION','Water vapor carries heat into the atmosphere','Evaporation removes heat and consumes water within the local accounting boundary. The water is not destroyed, but it may not return to the original watershed when or where it is needed.'],
      discharge:['04 / BLOWDOWN & DISCHARGE','Some liquid water leaves for treatment or reuse','Blowdown removes concentrated minerals from the cooling loop. This example shows permitted treated discharge returning to the river; other sites may use sewer, treatment or recovery systems.']
    },
    onceThrough:{
      all:['THE WATER PATH','Much withdrawn cooling water can return','In this power-generation example, river water passes through a condenser and is discharged back into the river. The return water may be warmer, so return does not mean impact-free.'],
      withdrawal:['01 / WITHDRAWAL','River water enters the condenser','Once-through cooling generally withdraws a large volume of water, runs it through a condenser, then sends it back toward the source.'],
      discharge:['02 / RETURN FLOW','Most of the cooling water returns to its source','The water carries heat back to the river. Temperature, discharge permits and aquatic ecosystems matter even where consumptive water use is relatively low.']
    }
  };
  const states={evaporative:{subtitle:'Data center · recirculating evaporative cooling',available:['all','withdrawal','reuse','evaporation','discharge']},onceThrough:{subtitle:'Power generation · once-through river-water cooling',available:['all','withdrawal','discharge']}};
  let mode='evaporative',focus='all',paused=motionQuery.matches;
  function updateReading(){const r=focusCopy[mode][focus];if(!r)return; readingStep.textContent=r[0];readingTitle.textContent=r[1];readingBody.textContent=r[2];}
  function updateButtons(){
    for(const b of modes)b.setAttribute('aria-pressed',String(b.dataset.waterModeBtn===mode));
    for(const b of focuses){
      const k=b.dataset.waterFocusBtn;
      const active=states[mode].available.includes(k);
      b.disabled=!active;
      b.title=active?'':(k==='reuse'?'This once-through example does not recirculate cooling water.':'Evaporation is not the primary depicted route in this once-through example.');
      b.setAttribute('aria-pressed',String(k===focus));
    }
    modeDescriptor.textContent=states[mode].subtitle;
    motionButton.setAttribute('aria-pressed',String(paused));
    motionButton.textContent=paused?'Play movement':'Pause movement';
  }
  function pan(k, instant=false){if(!view || view.scrollWidth<=view.clientWidth)return;
    const pos={all:.30,withdrawal:.15,reuse:.53,evaporation:.85,discharge:mode==='onceThrough'?.58:.57}[k]??.30;
    const left=Math.max(0,(view.scrollWidth-view.clientWidth)*pos);
    view.scrollTo({left,behavior:instant||motionQuery.matches?'instant':'smooth'});
  }
  function setMode(m){
    if(!states[m] || mode===m)return;
    mode=m;focus='all';waterStage.innerHTML=renderScene(mode);waterStage.dataset.mode=mode;waterStage.dataset.focus=focus;
    updateButtons();updateReading();waterStage.dataset.motion=paused?'off':'on';pan('all',true);
  }
  function setFocus(k){if(!states[mode].available.includes(k))return;focus=k;waterStage.dataset.focus=k;updateButtons();updateReading();pan(k)}
  for(const b of modes)b.addEventListener('click',()=>setMode(b.dataset.waterModeBtn));
  for(const b of focuses)b.addEventListener('click',()=>setFocus(b.dataset.waterFocusBtn));
  motionButton.addEventListener('click',()=>{paused=!paused;waterStage.dataset.motion=paused?'off':'on';updateButtons()});
  motionQuery.addEventListener('change',e=>{if(e.matches){paused=true;waterStage.dataset.motion='off';updateButtons();}});
  document.addEventListener('visibilitychange',()=>{
    // Background-tab SVG work should stop, without changing the user's pause preference.
    waterStage.classList.toggle('iw-hidden',document.hidden);
  });
  waterStage.innerHTML=renderScene(mode);
  waterStage.dataset.mode=mode;
  waterStage.dataset.focus=focus;
  waterStage.dataset.motion=paused?'off':'on';
  updateButtons();updateReading();
  // Mobile opens on a meaningful view of the source/intake, not the blank SVG margin.
  requestAnimationFrame(()=>pan('all',true));
}