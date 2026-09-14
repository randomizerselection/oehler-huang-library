/* Local visual-story enhancement. Native deck partials own all navigation. */
window.IGCSE = window.IGCSE || {};
(() => {
  const paper = '#f6f2e9', teal = '#164b43', gold = '#aa7518', rust = '#b65b35';
  const frames = [
    ['Your money is in the bank…', 'Can everyone get it back at once?'],
    ['But much of it is lent out.', 'Loans have value. Repayment comes later.'],
    ['Four savers want their money. Now.', '¥400,000 requested. How much is missing?'],
    ['Two paid. Two still waiting.', '¥200,000 paid. Another ¥200,000 needed.'],
    ['Who lends to a bank?', 'Other banks won’t lend. Where can it turn?'],
    ['The central bank can lend.', 'A temporary loan of ¥200,000 — if the bank qualifies.'],
    ['The remaining savers get paid.', 'Lender of last resort · 最后贷款人'],
  ];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = (label, x, y, cls = 'cb-label', extra = '') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="middle" ${extra}>${esc(label)}</text>`;
  const lines = (label, max) => {
    const result = []; let row = '';
    for (const word of label.split(' ')) {
      if (row && (row + ' ' + word).length > max) { result.push(row); row = word; }
      else row += (row ? ' ' : '') + word;
    }
    if (row) result.push(row);
    return result;
  };
  function bank(x, y, scale = 1, central = false) {
    return `<g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-115 0 L0-65 L115 0Z" fill="${central ? gold : teal}"/>
      <rect x="-105" y="8" width="210" height="118" rx="5" fill="${central ? '#e8d8af' : '#dbe6dc'}"/>
      ${[-76,-26,26,76].map(v => `<rect x="${v-10}" y="20" width="20" height="94" rx="3" fill="${central ? gold : teal}"/>`).join('')}
      <path d="M-119 128 H119 M-129 144 H129" stroke="${central ? gold : teal}" stroke-width="11"/>
      ${central ? text('CB',0,-15,'cb-note-label','style="font-size:25px"') : '<circle cy="-24" r="13" fill="#f6f2e9"/>'}
    </g>`;
  }
  function person(x, y, paid, waiting, index) {
    const colour = paid ? teal : waiting ? rust : '#527886';
    return `<g transform="translate(${x} ${y})">
      <circle cy="-39" r="17" fill="#d4a984"/>
      <path d="M-17-45 Q-15-65 6-58 Q23-55 16-36 L10-46Z" fill="#323d39"/>
      <path d="M-26 0 Q-26-20 0-20 Q26-20 26 0 L31 39 H-31Z" fill="${colour}"/>
      <path d="M-15 39 V65 M15 39 V65" stroke="#344f55" stroke-width="11" stroke-linecap="round"/>
      ${paid ? '<circle cx="27" cy="-38" r="15" fill="#164b43"/><path d="M19-38 l6 6 10-13" fill="none" stroke="white" stroke-width="3"/>' : ''}
      ${text(index === 0 ? 'Emma' : `Saver ${index+1}`, 0, 102, 'cb-detail')}
    </g>`;
  }
  function shops(x, y) {
    return `<g transform="translate(${x} ${y})">
      <rect x="-85" y="0" width="170" height="82" rx="4" fill="#d8dcd2"/>
      <path d="M-91 0 L-72-28 H72 L91 0Z" fill="${rust}"/>
      ${[-68,-34,0,34,68].map(v=>`<path d="M${v-17} 0 H${v+17} V13 Q${v} 27 ${v-17} 13Z" fill="${v%68===0 ? '#b65b35' : '#ebc89d'}"/>`).join('')}
      <rect x="-63" y="35" width="49" height="31" fill="#f6f2e9"/>
      <rect x="18" y="35" width="35" height="47" fill="#527886"/>
    </g>`;
  }
  const note = (x, y, id, colour = teal) => `<g transform="translate(${x} ${y})"><g data-token="${id}">
    <rect x="-29" y="-15" width="58" height="30" rx="4" fill="${colour}"/>
    <rect x="-24" y="-10" width="48" height="20" rx="2" fill="none" stroke="#ffffff80"/>
    ${text('100k', 0, 5, 'cb-note-label')}
  </g></g>`;
  function layout(portrait) {
    return portrait ? {
      w:640,h:1220,bank:[320,535,.78], people:[110,250,390,530].map(x=>[x,259]),
      ready:[[283,685],[357,685]], loans:Array.from({length:9},(_,i)=>[447+i%3*58,945+Math.floor(i/3)*33]),
      lender:[130,860,.62], shops:[505,827], customerLabel:[320,175], bankLabel:[320,480],
      readyLabel:[320,735], loanLabel:[505,1065], lenderLabel:[135,803],
      caption:[30,1120,580,70], requestsY:388,
    } : {
      w:1280,h:720,bank:[620,310,.92],people:[105,203,301,399].map(x=>[x,326]),
      ready:[[582,497],[658,497]],loans:Array.from({length:9},(_,i)=>[992+i%3*65,476+Math.floor(i/3)*34]),
      lender:[1056,225,.55],shops:[1056,389],customerLabel:[252,225],bankLabel:[620,239],
      readyLabel:[620,552],loanLabel:[1056,590],lenderLabel:[1056,167],
      caption:[64,617,1152,58],requestsY:480,
    };
  }
  function tokenPositions(stage, L) {
    const positions = {};
    for (let i=0;i<2;i++) positions[`cash${i}`] = stage>=3 ? [L.people[i][0],L.requestsY] : L.ready[i];
    for (let i=0;i<9;i++) positions[`loan${i}`] = stage>=1 ? L.loans[i] : [L.bank[0]-64+i%3*64,L.ready[0][1]+37+Math.floor(i/3)*30];
    if(stage>=5) for(let i=0;i<2;i++) positions[`aid${i}`] = stage>=6 ? [L.people[i+2][0],L.requestsY] : L.ready[i];
    return positions;
  }
  function markup(stage, L) {
    const portrait=L.w===640, [title,caption]=frames[stage], titleLines=lines(title,portrait?30:65);
    const positions=tokenPositions(stage,L);
    const request=stage>=2, payments=stage>=3, complete=stage===6;
    const waiting=stage>=3&&stage<6;
    const cashLabel=stage===0?'¥1.1m in funds':stage===5?'¥200,000 borrowed':stage>=3?'¥0 available':'¥200,000 available';
    let drawing=`<svg viewBox="0 0 ${L.w} ${L.h}" role="img" aria-labelledby="cb-film-title cb-film-desc">
      <title id="cb-film-title">${esc(title)}</title><desc id="cb-film-desc">${esc(caption)} ${request?'Four savers each want ¥100,000. ':''}${stage>=1?'Loans worth ¥900,000 will be repaid later. ':''}${payments?'Two savers have received their money. ':''}${complete?'The other two savers have now been paid using a central-bank loan.':''}</desc>
      <rect width="${L.w}" height="${L.h}" fill="${paper}"/>
      <defs><marker id="cb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="${teal}"/></marker></defs>
      <rect width="8" height="${L.h}" fill="${teal}"/>
      <text x="${portrait?30:64}" y="39" class="cb-small" style="fill:${teal}">FUNCTION 4 / EMERGENCY LENDING</text>
      <text x="${L.w-35}" y="39" class="cb-small" text-anchor="end">${stage+1} / 7</text>
      ${titleLines.map((t,i)=>`<text x="${portrait?30:64}" y="${105+i*43}" style="font-size:${portrait?36:49}px;font-weight:750;letter-spacing:-1px">${esc(t)}</text>`).join('')}
      ${text(request?'4 savers × ¥100,000':'Savers',...L.customerLabel)}
      ${L.people.map(([x,y],i)=>person(x,y,complete||(payments&&i<2),request&&!(complete||(payments&&i<2)),i)).join('')}
      ${text('Commercial bank',...L.bankLabel)}${bank(...L.bank)}
      ${shops(...L.shops)}
      ${stage<4?text('Borrowers',L.shops[0],L.shops[1]-45):''}
      ${stage>=1?`<path d="${portrait?'M402 626 Q505 675 505 779':'M759 404 H943'}" fill="none" stroke="#9cae9d" stroke-width="3" marker-end="url(#cb-arrow)"/>`:''}
      ${stage>=5?`<path d="${portrait?'M48 905 H20 V675 Q20 650 48 650 H238':'M958 255 Q838 240 744 313'}" fill="none" stroke="${gold}" stroke-width="4" marker-end="url(#cb-arrow)"/>`:''}
      ${stage>=1?text('¥900,000 in loans',...L.loanLabel,'cb-money-label'):''}
      ${stage>=1?text('Repaid later',L.loanLabel[0],L.loanLabel[1]+24,'cb-detail'):''}
      ${stage>=4 ? (stage===4 ? `<g transform="translate(${L.lender[0]} ${L.lender[1]})"><rect x="-90" y="-28" width="180" height="120" rx="14" class="cb-ghost"/>${text('?',0,52,'cb-label','style="font-size:75px;fill:#aa7518"')}</g>` : bank(...L.lender,true)) : ''}
      ${stage>=4?text(stage===4?'Who could help?':'Central bank',...L.lenderLabel):''}
      ${stage>=5?text('Loan, not a gift',L.lender[0],L.lender[1]+112,'cb-detail'):''}
      ${request?L.people.map(([x],i)=>`<rect x="${x-33}" y="${L.requestsY-20}" width="66" height="40" rx="6" class="cb-request"/>`).join(''):''}
      ${Object.entries(positions).map(([id,[x,y]])=>note(x,y,id,id.startsWith('aid')?gold:id.startsWith('loan')&&stage>=1?'#527886':teal)).join('')}
      ${stage===0?'':text(cashLabel,...L.readyLabel,'cb-money-label')}
      ${stage===0?text(cashLabel,L.bank[0],L.ready[0][1]-24,'cb-detail'):''}
      ${waiting?text('¥200,000 still needed',L.customerLabel[0],L.requestsY+66,'cb-money-label cb-waiting'):''}
      ${complete?text('All four paid',L.customerLabel[0],L.requestsY+66,'cb-money-label'):''}
      <rect x="${L.caption[0]}" y="${L.caption[1]}" width="${L.caption[2]}" height="${L.caption[3]}" rx="9" fill="${teal}"/>
      ${lines(caption,portrait?39:80).map((t,i,a)=>text(t,L.w/2,L.caption[1]+L.caption[3]/2+(i-(a.length-1)/2)*29+9,'cb-caption',portrait?'style="font-size:25px"':'')).join('')}
    </svg>`;
    return { drawing, positions };
  }
  const introFrames = [
    ['Commercial banks lend to households and firms.', 'A home for a household. Equipment for a firm.'],
    ['Who lends to commercial banks?', 'Where could the bank itself borrow?'],
    ['Central banks can lend to commercial banks.', 'A bank for banks · 银行的银行'],
  ];
  function introLayout(portrait, stage) {
    return portrait ? {
      w:640,h:1220,bank:[320,stage===0?390:635,.72],lender:[320,285,.64],
      home:[170,960],shop:[470,960],caption:[30,1120,580,70],
    } : {
      w:1280,h:720,bank:[stage===0?350:630,350,.8],lender:[190,350,.65],
      home:[1060,293],shop:[1060,485],caption:[64,617,1152,58],
    };
  }
  function household(x,y) {
    return `<g transform="translate(${x} ${y})">
      <path d="M-72-6 L-8-60 L56-6" fill="none" stroke="${rust}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M-59-5 V58 H42 V-5" fill="#e8d8af"/>
      <rect x="-42" y="7" width="24" height="22" fill="${paper}"/>
      <rect x="0" y="18" width="22" height="40" fill="${teal}"/>
      <circle cx="68" cy="-6" r="15" fill="#d4a984"/>
      <path d="M47 52 V30 Q47 13 68 13 Q89 13 89 30 V52Z" fill="#527886"/>
      <path d="M58 52 V70 M78 52 V70" stroke="#344f55" stroke-width="8" stroke-linecap="round"/>
    </g>`;
  }
  function introMarkup(stage,L) {
    const portrait=L.w===640, [title,caption]=introFrames[stage], [bx,by]=L.bank;
    const borrowerPaths=portrait
      ? [`M270 ${by+130} Q30 ${by+190} 30 930 H90`,`M370 ${by+130} Q610 ${by+190} 610 940 H566`]
      : [`M${bx+120} ${by+35} Q${bx+235} 280 950 280`,`M${bx+120} ${by+70} Q${bx+235} 472 950 472`];
    const positions={
      'intro-home':portrait?[60,(by+130+930)/2]:[(bx+120+950)/2,292],
      'intro-firm':portrait?[590,(by+130+940)/2]:[(bx+120+950)/2,470],
    };
    if(stage===2)positions['intro-central']=portrait?[320,492]:[399,390];
    const loanToken=(id,[x,y])=>`<g transform="translate(${x} ${y})"><g data-token="${id}">
      <rect x="-24" y="-16" width="48" height="32" rx="4" fill="${id==='intro-central'?gold:teal}"/>
      <rect x="-19" y="-11" width="38" height="22" rx="2" fill="none" stroke="#ffffff80"/>
      ${text('¥',0,7,'cb-note-label','style="font-size:21px"')}
    </g></g>`;
    const drawing=`<svg viewBox="0 0 ${L.w} ${L.h}" role="img" aria-labelledby="cb-intro-title" aria-describedby="cb-intro-desc">
      <title id="cb-intro-title">${esc(title)}</title>
      <desc id="cb-intro-desc">Commercial bank loans go to households and firms.${stage===1?' Who can lend to the commercial bank?':''}${stage===2?' A central bank can lend to commercial banks.':''}</desc>
      <rect width="${L.w}" height="${L.h}" fill="${paper}"/>
      <rect width="8" height="${L.h}" fill="${teal}"/>
      <defs>${[['loan',teal],['central',gold]].map(([id,colour])=>`<marker id="cb-intro-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="${colour}"/></marker>`).join('')}</defs>
      <text x="${portrait?30:64}" y="39" class="cb-small" style="fill:${teal}">OEHLER-HUANG / ECONOMICS</text>
      <text x="${L.w-35}" y="39" class="cb-small" text-anchor="end">${stage+1} / 3</text>
      ${lines(title,portrait?30:55).map((t,i)=>`<text x="${portrait?30:64}" y="${103+i*(portrait?44:53)}" style="font-size:${portrait?36:47}px;font-weight:750;letter-spacing:-1px">${esc(t)}</text>`).join('')}
      ${text('Commercial bank',bx,by-85)}
      ${text('商业银行',bx,by-53,'cb-detail')}${bank(...L.bank)}
      ${text('Households',L.home[0],L.home[1]-94)}
      ${text('家庭',L.home[0],L.home[1]-64,'cb-detail')}${household(...L.home)}
      ${text('Firms',L.shop[0],L.shop[1]-94)}
      ${text('企业',L.shop[0],L.shop[1]-64,'cb-detail')}${shops(L.shop[0],L.shop[1]-20)}
      ${borrowerPaths.map(d=>`<path d="${d}" fill="none" stroke="${teal}" stroke-width="4" marker-end="url(#cb-intro-loan)"/>`).join('')}
      ${text('Loans 贷款',portrait?320:(bx+120+950)/2,portrait?by+200:by+42,'cb-detail')}
      ${stage===1?`<g transform="translate(${L.lender[0]} ${L.lender[1]})"><rect x="-82" y="-44" width="164" height="145" rx="14" class="cb-ghost"/>${text('?',0,55,'cb-label','style="font-size:80px;fill:#aa7518"')}</g>`:''}
      ${stage===2?`${text('Central bank',L.lender[0],L.lender[1]-85)}${text('中央银行',L.lender[0],L.lender[1]-53,'cb-detail')}${bank(...L.lender,true)}
        <path d="${portrait?'M320 396 V514':'M292 390 H503'}" fill="none" stroke="${gold}" stroke-width="4" marker-end="url(#cb-intro-central)"/>
        ${text('Can lend 可贷款',portrait?444:399,portrait?485:347,'cb-detail')}`:''}
      ${Object.entries(positions).map(([id,position])=>loanToken(id,position)).join('')}
      <rect x="${L.caption[0]}" y="${L.caption[1]}" width="${L.caption[2]}" height="${L.caption[3]}" rx="9" fill="${teal}"/>
      ${lines(caption,portrait?39:80).map((t,i,a)=>text(t,L.w/2,L.caption[1]+L.caption[3]/2+(i-(a.length-1)/2)*29+9,'cb-caption',portrait?'style="font-size:25px"':'')).join('')}
    </svg>`;
    return {drawing,positions};
  }
  function mountFilm(slide, frameCount, getLayout, getMarkup, tokenOrigin) {
    if(!slide || slide.classList.contains('cb-enhanced')) return;
    const content=slide.querySelector('.content main > div'), steps=[...slide.querySelectorAll('.partial-item')];
    const film=document.createElement('div'); film.className='cb-film';
    film.setAttribute('aria-live','polite'); content.append(film); slide.classList.add('cb-enhanced');
    let previous={},lastStage=-1,lastPortrait;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    function draw(force=false,printing=false) {
      const stage=printing?frameCount-1:steps.filter(step=>step.classList.contains('is-visible')).length;
      const portrait=printing?false:slide.clientWidth>0&&slide.clientWidth/Math.max(1,slide.clientHeight)<.9;
      if(!force && stage===lastStage && portrait===lastPortrait)return;
      const L=getLayout(portrait,stage), {drawing,positions}=getMarkup(stage,L);
      film.innerHTML=drawing; film.dataset.frame=String(stage);
      if(!printing&&!reduced.matches&&lastStage>=0&&portrait===lastPortrait) {
        for(const element of film.querySelectorAll('[data-token]')) {
          const id=element.dataset.token, to=positions[id];
          const from=previous[id] || tokenOrigin(id,L,to);
          if(from[0]!==to[0]||from[1]!==to[1])element.animate([
            {transform:`translate(${from[0]-to[0]}px, ${from[1]-to[1]}px)`},
            {transform:'translate(0, 0)'}
          ],{duration:950,easing:'cubic-bezier(.22,.61,.36,1)'});
        }
      }
      previous=positions;lastStage=stage;lastPortrait=portrait;
    }
    const observer=new MutationObserver(()=>draw());
    steps.forEach(step=>observer.observe(step,{attributes:true,attributeFilter:['class']}));
    observer.observe(slide,{attributes:true,attributeFilter:['class']});
    new ResizeObserver(()=>draw()).observe(slide);
    window.addEventListener('beforeprint',()=>draw(true,true));
    window.addEventListener('afterprint',()=>draw(true));
    draw(true);
  }
  IGCSE.mountCentralBankHook = function() {
    mountFilm(document.querySelector('.slide.is-layout-central-bank-intro'),introFrames.length,introLayout,introMarkup,
      (id,L,to)=>id==='intro-central'?[L.lender[0],L.lender[1]+35]:to);
    mountFilm(document.querySelector('.slide.is-layout-central-bank-film'),frames.length,layout,markup,
      (id,L,to)=>id.startsWith('aid')?[L.lender[0],L.lender[1]+35]:to);
  };
})();
