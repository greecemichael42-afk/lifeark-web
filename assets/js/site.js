/* Google Analytics 4 (gtag.js) — Life Ark website, property G-X6LMX9VR0Y.
   Loaded once here so every page (and any future page that includes site.js) is tracked. */
(function(){
  var GA_ID='G-X6LMX9VR0Y';
  var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
  (document.head||document.documentElement).appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

const hdr=document.getElementById('hdr');
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40));
  addEventListener('load',()=>document.querySelector('.hero')?.classList.add('in'));
  document.querySelector('.hero')?.classList.add('in');
  // sub-page hero: staggered entrance + an injected animated wave divider (brand water motion)
  (function(){ const ph=document.querySelector('.page-hero'); if(!ph) return;
    if(!ph.querySelector('.wave-divider')){ const wd=document.createElement('div'); wd.className='wave-divider bottom'; wd.setAttribute('aria-hidden','true'); wd.innerHTML='<div class="wband w1"></div><div class="wband w2"></div>'; ph.appendChild(wd); }
    ph.classList.add('in');
  })();
  // Background videos (homepage hero, sub-page heroes, cinematic section backdrops)
  // autoplay on every device — phone and desktop alike. Each <video> carries data-src
  // (no inline <source>), so the mp4 is fetched by JS after the page parses (non-blocking)
  // and then played; if JS is unavailable it falls back to the poster image.
  (function(){
    document.querySelectorAll('video[data-src]').forEach(v=>{
      const s=document.createElement('source'); s.src=v.dataset.src; s.type='video/mp4'; v.appendChild(s);
      const go=()=>{ v.classList.add('ready'); const p=v.play(); if(p&&p.catch) p.catch(()=>{}); };
      v.load();
      if(v.readyState>=3) go(); else v.addEventListener('canplay',go,{once:true});
    });
  })();
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motes=document.getElementById('motes');
  if(motes && !reduce){
    for(let i=0;i<26;i++){
      const m=document.createElement('span');m.className='mote';
      const size=2+Math.random()*4;
      m.style.width=size+'px';m.style.height=size+'px';
      m.style.left=(Math.random()*100).toFixed(2)+'%';
      m.style.animationDuration=(14+Math.random()*16).toFixed(1)+'s';
      m.style.animationDelay=(-Math.random()*20).toFixed(1)+'s';
      motes.appendChild(m);
    }
  }
  if(!reduce){
    const amb=document.querySelector('.ambient');
    addEventListener('scroll',()=>{const y=scrollY;if(amb) amb.style.transform='translateY('+(y*0.12)+'px)';},{passive:true});
  }
  const body=document.body, langBtn=document.getElementById('langBtn');
  // Persist the visitor's language across pages (localStorage) and keep <html> +
  // <body> lang/dir in sync — so screen readers and RTL/LTR stay correct, and an
  // English visitor doesn't get reset to Arabic on every page navigation.
  const applyLang=(lang)=>{
    const en=lang==='en';
    document.documentElement.lang=en?'en':'ar';
    document.documentElement.dir=en?'ltr':'rtl';
    body.dataset.lang=en?'en':'ar'; body.dir=en?'ltr':'rtl'; body.lang=en?'en':'ar';
    if(langBtn){ langBtn.textContent=en?'AR':'EN'; langBtn.lang=en?'ar':'en'; langBtn.setAttribute('aria-label', en?'التبديل إلى العربية':'Switch to English'); }
    // swap placeholders + <select> option labels that carry per-language data attributes
    document.querySelectorAll('[data-ph-ar]').forEach(el=>{ const v=en?el.getAttribute('data-ph-en'):el.getAttribute('data-ph-ar'); if(v!=null) el.setAttribute('placeholder',v); });
    document.querySelectorAll('option[data-ar]').forEach(o=>{ const v=en?o.getAttribute('data-en'):o.getAttribute('data-ar'); if(v!=null) o.textContent=v; });
  };
  let savedLang='ar';
  try{ savedLang=localStorage.getItem('lifeark-lang')||'ar'; }catch(_){}
  applyLang(savedLang);
  if(langBtn) langBtn.addEventListener('click',()=>{
    const next=body.dataset.lang==='en'?'ar':'en';
    applyLang(next);
    try{ localStorage.setItem('lifeark-lang',next); }catch(_){}
  });
  const mobBtn=document.getElementById('mob');
  if(mobBtn){
    const nav=document.querySelector('.nav-links');
    if(nav && !nav.id) nav.id='primaryNav';
    mobBtn.setAttribute('aria-label','القائمة');
    mobBtn.setAttribute('aria-expanded','false');
    if(nav) mobBtn.setAttribute('aria-controls',nav.id);
    mobBtn.addEventListener('click',()=>{
      const open=nav.style.display==='flex';
      nav.style.cssText=open?'':'display:flex;position:absolute;top:88px;right:0;left:0;flex-direction:column;background:rgba(7,14,26,.96);padding:24px 28px;gap:16px;border-bottom:1px solid var(--line);backdrop-filter:blur(18px)';
      mobBtn.setAttribute('aria-expanded',open?'false':'true');
    });
    // close the open mobile menu when a link inside it is tapped (e.g. same-page #anchors)
    nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      if(nav.style.display==='flex'){ nav.style.cssText=''; mobBtn.setAttribute('aria-expanded','false'); }
    }));
  }

  // ===== creative motion polish =====
  (function(){
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer:fine)').matches;

    // 1) scroll progress bar
    const prog=document.getElementById('scrollProg');
    if(prog && !reduce){
      const onScroll=()=>{ const h=document.documentElement; const max=h.scrollHeight-h.clientHeight; prog.style.width=(max>0?(h.scrollTop/max*100):0)+'%'; };
      addEventListener('scroll',onScroll,{passive:true}); onScroll();
    }

    // 2) count-up numbers (auto-detect numeric stats)
    const parse=(t)=>{ const m=t.match(/^(\D*)([\d,]+)(.*)$/); if(!m) return null; const n=parseInt(m[2].replace(/,/g,''),10); return isNaN(n)?null:{pre:m[1],num:n,suf:m[3]}; };
    const fmt=(n)=>n.toLocaleString('en-US');
    // skip counters that live inside a modal — they're shown on demand (the
    // scroll-into-view observer can't reach a display:none modal, which would
    // otherwise freeze them at "0"); the modal shows their real values directly.
    const counters=[...document.querySelectorAll('.cred > b, .hero-stats .st b')].filter(el=>!el.closest('.modal')).map(el=>{ const p=parse(el.textContent.trim()); return p?{el,p,done:false}:null; }).filter(Boolean);
    if(counters.length && !reduce){
      const run=(o)=>{ const dur=1500, s=performance.now(); const step=(now)=>{ let t=Math.min(1,(now-s)/dur); t=1-Math.pow(1-t,3); o.el.textContent=o.p.pre+fmt(Math.round(o.p.num*t))+o.p.suf; if(t<1) requestAnimationFrame(step); }; requestAnimationFrame(step); };
      const io=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ const o=counters.find(c=>c.el===e.target); if(o && !o.done){ o.done=true; run(o); } io.unobserve(e.target); } }); },{threshold:.6});
      counters.forEach(o=>{ o.el.textContent=o.p.pre+'0'+o.p.suf; io.observe(o.el); });
    }

    // 3) magnetic gold buttons (desktop only)
    if(fine && !reduce){
      document.querySelectorAll('.btn-gold').forEach(b=>{
        b.addEventListener('pointermove',e=>{ const r=b.getBoundingClientRect(); const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2; b.style.transform='translate('+(x*.16).toFixed(1)+'px,'+(y*.26).toFixed(1)+'px)'; });
        b.addEventListener('pointerleave',()=>{ b.style.transform=''; });
      });
    }

    // 4) cursor-follow glow on cards
    if(fine && !reduce){
      document.querySelectorAll('.qa,.world').forEach(c=>{
        c.addEventListener('pointermove',e=>{ const r=c.getBoundingClientRect(); c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%'); c.style.setProperty('--my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%'); });
      });
    }

    // 5) cinematic hero departure — content lifts + fades as you scroll past, for camera-like depth
    const hero=document.querySelector('.hero');
    const hInner=hero&&hero.querySelector('.hero-inner');
    const hCue=hero&&hero.querySelector('.scroll-cue');
    if(hero && hInner && !reduce){
      let ticking=false;
      const upd=()=>{ ticking=false;
        const h=hero.offsetHeight||innerHeight;
        const y=Math.min(scrollY,h), p=y/h;
        hInner.style.transform='translateY('+(y*0.42).toFixed(1)+'px) scale('+(1-p*0.06).toFixed(3)+')';
        hInner.style.opacity=Math.max(0,1-p*1.35).toFixed(3);
        if(hCue) hCue.style.opacity=Math.max(0,0.7*(1-p*2.6)).toFixed(3);
      };
      addEventListener('scroll',()=>{ if(!ticking){ ticking=true; requestAnimationFrame(upd); } },{passive:true});
      upd();
    }

    // 6) 3D tilt on the world cards — they lean toward the cursor for tactile depth
    if(fine && !reduce){
      document.querySelectorAll('.world').forEach(c=>{
        c.addEventListener('pointerenter',()=>{ c.style.transition='transform .12s linear,border-color .5s,box-shadow .5s'; });
        c.addEventListener('pointermove',e=>{ const r=c.getBoundingClientRect();
          const rx=((0.5-(e.clientY-r.top)/r.height)*11).toFixed(2), ry=(((e.clientX-r.left)/r.width-0.5)*11).toFixed(2);
          c.style.transform='perspective(850px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-10px) scale(1.02)';
        });
        c.addEventListener('pointerleave',()=>{ c.style.transition=''; c.style.transform=''; });
      });
    }
  })();

  // ===== subscribe / lead capture =====
  // To collect emails into a real list, set ENDPOINT to your MailerLite/Mailchimp/Formspree
  // POST URL (e.g. "https://formspree.io/f/xxxxxxx"). Until then it falls back to WhatsApp
  // so leads still reach Life Ark.
  // 📧 NEWSLETTER LIST — to build a real mailing list: create a FREE form at formspree.io
  // (or MailerLite / Mailchimp), then paste its endpoint URL between the quotes below,
  // e.g. "https://formspree.io/f/xxxxxxx". Until then, subscribers reach you via WhatsApp.
  const SUBSCRIBE_ENDPOINT = "https://formsubmit.co/ajax/Life.ark.psych@gmail.com"; // Formsubmit → emails subscriptions to Life Ark
  const subForm=document.getElementById('subForm');
  if(subForm){
    subForm.addEventListener('submit',async (e)=>{
      e.preventDefault();
      const name=(subForm.name.value||'').trim();
      const email=(subForm.email.value||'').trim();
      if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ subForm.email.focus(); subForm.email.style.borderColor='#e0894f'; return; }
      const done=()=>{ subForm.style.display='none'; const d=document.getElementById('subDone'); if(d) d.style.display='block'; };
      if(SUBSCRIBE_ENDPOINT){
        fetch(SUBSCRIBE_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:name||'-',email,_replyto:email,_subject:'اشتراك جديد — ابقَ على المركب (Life Ark)',_template:'table',_captcha:'false',_autoresponse:'أهلًا بك على المركب 🌊\n\nشكرًا لاشتراكك في Life Ark. من وقت للتاني هنبعتلك مهارة عملية من مهارات DBT، وأول خبر بأي كتاب جديد أو حلقة جديدة من «في الصالة» — من غير إزعاج، وتقدر تلغي الاشتراك في أي وقت.\n\nلو حابب تحجز جلسة أو عندك أي سؤال، إحنا موجودين على الموقع.\n\n— فريق Life Ark\nhttps://lifearkdbt.com'})}).catch(()=>{});
        done();
      } else {
        // interim: deliver the lead to Life Ark via WhatsApp
        const msg=encodeURIComponent('أرغب في الاشتراك في نشرة Life Ark.\nالاسم: '+(name||'-')+'\nالبريد الإلكتروني: '+email);
        window.open('https://wa.me/201124239057?text='+msg,'_blank');
        done();
      }
    });
  }

  // ===== professionals enrollment modal — "Enrollment Open" (Formsubmit -> email) =====
  const enrollModal=document.getElementById('enrollModal');
  if(enrollModal){
    const ef=document.getElementById('enrollForm');
    const eView=document.getElementById('enrollView');
    const eDone=document.getElementById('enrollDone');
    const openE=()=>{ Array.from(ef.elements).forEach(el=>{ el.style.borderColor=''; }); eView.style.display='block'; eDone.style.display='none'; enrollModal.classList.add('open'); document.body.style.overflow='hidden'; const c=enrollModal.querySelector('.modal-card'); if(c) c.scrollTop=0; };
    const closeE=()=>{ enrollModal.classList.remove('open'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-enroll]').forEach(b=>{ b.addEventListener('click',e=>{ e.preventDefault(); openE(); }); });
    document.getElementById('enrollClose').addEventListener('click',closeE);
    enrollModal.addEventListener('click',e=>{ if(e.target===enrollModal) closeE(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && enrollModal.classList.contains('open')) closeE(); });
    Array.from(ef.elements).forEach(el=>{ const clr=()=>{ el.style.borderColor=''; }; el.addEventListener('input',clr); el.addEventListener('change',clr); });
    ef.addEventListener('submit',async (e)=>{
      e.preventDefault();
      const name=(ef.fullname.value||'').trim();
      const email=(ef.email.value||'').trim();
      const wa=(ef.whatsapp.value||'').trim();
      const bad=(el)=>{ el.focus(); el.style.borderColor='#e0894f'; };
      if(!name){ bad(ef.fullname); return; }
      if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ bad(ef.email); return; }
      if(!wa){ bad(ef.whatsapp); return; }
      fetch("https://formsubmit.co/ajax/Life.ark.psych@gmail.com",{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({
        name, email, whatsapp:wa,
        profession:ef.profession.value, experience:ef.experience.value, dbt_experience:ef.dbt_level.value, format:ef.format.value,
        goal:(ef.goal.value||'').trim()||'-',
        _replyto:email, _subject:'تسجيل اهتمام — تدريب DBT للمتخصصين (Life Ark)', _template:'table', _captcha:'false'
      })}).catch(()=>{});
      eView.style.display='none'; eDone.style.display='block'; const c=enrollModal.querySelector('.modal-card'); if(c) c.scrollTop=0;
    });
  }

  // ===== program details modal — 3 cards (overview) + full-detail views =====
  const programsModal=document.getElementById('programsModal');
  if(programsModal){
    const overview=document.getElementById('programsOverview');
    const detail=document.getElementById('programsDetail');
    const fulls=programsModal.querySelectorAll('.prog-full');
    const card=programsModal.querySelector('.modal-card');
    const showOverview=()=>{ detail.style.display='none'; overview.style.display='block'; if(card) card.scrollTop=0; };
    const showDetail=(key)=>{ overview.style.display='none'; detail.style.display='block'; fulls.forEach(f=>{ f.style.display=(f.getAttribute('data-prog')===key)?'block':'none'; }); if(card) card.scrollTop=0; };
    const openP=()=>{ showOverview(); programsModal.classList.add('open'); document.body.style.overflow='hidden'; };
    const closeP=()=>{ programsModal.classList.remove('open'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-programs]').forEach(b=>{ b.addEventListener('click',e=>{ e.preventDefault(); openP(); }); });
    programsModal.querySelectorAll('[data-prog-detail]').forEach(b=>{ b.addEventListener('click',()=>showDetail(b.getAttribute('data-prog-detail'))); });
    programsModal.querySelectorAll('[data-prog-back]').forEach(b=>{ b.addEventListener('click',showOverview); });
    document.getElementById('programsClose').addEventListener('click',closeP);
    programsModal.addEventListener('click',e=>{ if(e.target===programsModal) closeP(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && programsModal.classList.contains('open')) closeP(); });
    // any register button (in a card or a detail view) -> hide this modal; the global [data-enroll] handler opens the enrollment modal
    programsModal.querySelectorAll('[data-enroll]').forEach(b=>{ b.addEventListener('click',()=>programsModal.classList.remove('open')); });
  }

  // ===== Order modal (manual payment — v1) =====
  const orderModal=document.getElementById('orderModal');
  if(orderModal){
    const orderForm=document.getElementById('orderForm');
    const orderView=document.getElementById('orderView');
    const orderDone=document.getElementById('orderDone');
    const orderProduct=document.getElementById('orderProduct');
    const WA='201124239057';
    // price shown in the modal pay-box, matched by a substring of the product name
    const ORDER_PRICES=[
      {k:'رُكوب الموج', ar:'حوّل قيمة الكتاب (1000 ج.م / $100) إلى:', en:'Transfer the book price (1000 EGP / $100) to:'},
      {k:'العقل الصافي', ar:'حوّل قيمة الكتاب (800 ج.م / $50) إلى:', en:'Transfer the book price (800 EGP / $50) to:'}
    ];
    const orderFeeAr=document.getElementById('orderFeeAr'), orderFeeEn=document.getElementById('orderFeeEn');
    const updateOrderFee=(product)=>{ const m=ORDER_PRICES.find(p=>(product||'').indexOf(p.k)>=0);
      if(orderFeeAr) orderFeeAr.textContent=m?m.ar:'حوّل قيمة الكتاب إلى:';
      if(orderFeeEn) orderFeeEn.textContent=m?m.en:'Transfer the book price to:'; };
    const clearBorders=(form)=>{ Array.from(form.elements).forEach(el=>{ el.style.borderColor=''; }); };
    const openModal=(product)=>{
      if(product && orderProduct) orderProduct.value=product;
      updateOrderFee(product);
      clearBorders(orderForm);
      orderView.style.display='block'; orderDone.style.display='none';
      orderModal.classList.add('open'); document.body.style.overflow='hidden';
    };
    Array.from(orderForm.elements).forEach(el=>{ el.addEventListener('input',()=>{ el.style.borderColor=''; }); });
    const closeModal=()=>{ orderModal.classList.remove('open'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-order]').forEach(b=>{
      b.addEventListener('click',()=>openModal(b.getAttribute('data-order')));
    });
    document.getElementById('orderClose').addEventListener('click',closeModal);
    orderModal.addEventListener('click',e=>{ if(e.target===orderModal) closeModal(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && orderModal.classList.contains('open')) closeModal(); });
    orderForm.addEventListener('submit',e=>{
      e.preventDefault();
      const f=orderForm;
      const name=(f.fullname.value||'').trim();
      const wa=(f.whatsapp.value||'').trim();
      const email=(f.email.value||'').trim();
      const bad=(el)=>{ el.focus(); el.style.borderColor='#e0894f'; };
      if(!name){ bad(f.fullname); return; }
      if(!wa){ bad(f.whatsapp); return; }
      if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ bad(f.email); return; }
      const msg=encodeURIComponent(
        '🌊 طلب شراء من موقع Life Ark\n'+
        '——————————————\n'+
        'المنتج: '+f.product.value+'\n'+
        'الاسم: '+name+'\n'+
        'واتساب: '+wa+'\n'+
        'البريد الإلكتروني: '+email+'\n'+
        'طريقة الدفع: '+f.method.value+'\n'+
        'رقم العملية: '+((f.reference.value||'').trim()||'—')+'\n'+
        'ملاحظات: '+((f.notes.value||'').trim()||'—')+'\n'+
        '——————————————\n'+
        '(سأرفق صورة إيصال الدفع في هذه المحادثة)'
      );
      window.open('https://wa.me/'+WA+'?text='+msg,'_blank');
      orderView.style.display='none'; orderDone.style.display='block';
    });
  }

  // ===== Session booking modal (manual payment — v1) =====
  // Single source of truth: the modal markup lives here and is injected once into
  // each page, so it no longer has to be duplicated in every page's HTML.
  if(!document.getElementById('sessionModal')){
    document.body.insertAdjacentHTML('beforeend', `<div class="modal" id="sessionModal" role="dialog" aria-modal="true" aria-labelledby="sessionTitle">
  <div class="modal-card">
    <button type="button" class="modal-close" id="sessionClose" aria-label="إغلاق">&times;</button>

    <div id="sessionView">
      <h3 id="sessionTitle"><span class="lead-ar">طلب حجز جلسة</span><span class="lead-en">Session Booking Request</span></h3>
      <p class="msub"><span class="lead-ar">اختَر نوع الجلسة ومواعيدك المفضّلة، حوّل القيمة، ثم أرسل الطلب — ونؤكّد الموعد بعد مراجعة الدفع.</span><span class="lead-en">Pick your session type and preferred times, transfer the fee, then submit — we confirm your slot after reviewing payment.</span></p>

      <div class="pay-box">
        <div class="pt"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg><span class="lead-ar" id="sessFeeAr">قيمة الجلسة: 1000 ج.م / $50 — تُدفع قبل بدايتها إلى:</span><span class="lead-en" id="sessFeeEn">Session fee: 1000 EGP / $50 — paid before it starts, to:</span></div>
        <div class="prow"><b>InstaPay</b><span>sanfor2412@instapay</span></div>
        <div class="prow"><b><span class="lead-ar">اتصالات كاش</span><span class="lead-en">Etisalat Cash</span></b><span>01124239057</span></div>
        <div class="prow"><b><span class="lead-ar">تحويل بنكي</span><span class="lead-en">Bank transfer</span></b><span><span class="lead-ar">تُرسَل عند الطلب</span><span class="lead-en">sent upon request</span></span></div>
        <p class="pnote ar-only">حوّل قيمة الجلسة، وارفع صورة الإيصال في الفورم تحت — الحجز ما يكمّلش من غيرها. ونؤكّد الموعد بعد مراجعة الدفع.</p>
        <p class="pnote lead-en">Transfer the fee and upload your receipt in the form below — booking can't proceed without it. We confirm the slot after reviewing payment.</p>
      </div>

      <form class="order-form" id="sessionForm" novalidate>
        <div><label><span class="lead-ar">الاسم بالكامل</span><span class="lead-en">Full name</span></label>
          <input type="text" name="fullname" required autocomplete="name" placeholder="الاسم بالكامل" data-ph-ar="الاسم بالكامل" data-ph-en="Full name" /></div>
        <div><label><span class="lead-ar">رقم واتساب</span><span class="lead-en">WhatsApp number</span></label>
          <input type="tel" name="whatsapp" required inputmode="tel" autocomplete="tel" placeholder="+20 1XX XXX XXXX" /></div>
        <div><label><span class="lead-ar">البريد الإلكتروني</span><span class="lead-en">Email</span></label>
          <input type="email" name="email" required autocomplete="email" placeholder="example@email.com" /></div>
        <div><label><span class="lead-ar">نوع الجلسة</span><span class="lead-en">Session type</span></label>
          <select name="stype" required>
            <option value="الجلسة الفردية / Individual Session" data-ar="الجلسة الفردية" data-en="Individual Session">الجلسة الفردية</option>
            <option value="مجموعة مهارات DBT / DBT Skills Group" data-ar="مجموعة مهارات DBT" data-en="DBT Skills Group">مجموعة مهارات DBT</option>
            <option value="الورش المكثّفة / Intensive Workshop" data-ar="الورش المكثّفة" data-en="Intensive Workshop">الورش المكثّفة</option>
            <option value="برنامج DBT-SUD / DBT-SUD Program" data-ar="برنامج DBT-SUD" data-en="DBT-SUD Program">برنامج DBT-SUD</option>
            <option value="لست متأكدًا / Not sure" data-ar="لست متأكدًا" data-en="Not sure">لست متأكدًا</option>
          </select></div>
        <div><label><span class="lead-ar">شكل الجلسة</span><span class="lead-en">Format</span></label>
          <select name="format" required>
            <option value="أونلاين / Online" data-ar="أونلاين" data-en="Online">أونلاين</option>
            <option value="حضوري / In-person" data-ar="حضوري" data-en="In-person">حضوري</option>
            <option value="لست متأكدًا / Not sure" data-ar="لست متأكدًا" data-en="Not sure">لست متأكدًا</option>
          </select></div>
        <div><label><span class="lead-ar">سبب الحجز باختصار</span><span class="lead-en">Brief reason for booking</span></label>
          <textarea name="reason" placeholder="سطر أو سطرين يكفّوا" data-ph-ar="سطر أو سطرين يكفّوا" data-ph-en="A line or two is enough"></textarea></div>
        <div class="pay-upload"><label><span class="lead-ar">صورة إيصال الدفع (مطلوبة)</span><span class="lead-en">Payment receipt (required)</span></label>
          <input type="file" name="payment_receipt" accept="image/*,.pdf" required />
          <p class="req-hint ar-only" style="margin-top:6px">ارفع سكرين التحويل (إنستاباي / اتصالات كاش) — الحجز ما يكمّلش من غيرها.</p>
          <p class="req-hint lead-en" style="margin-top:6px">Upload your transfer screenshot — booking can't proceed without it.</p></div>
        <div class="sp-sat"><span class="lead-ar">📅 بعد ما تكمّل بياناتك وتضغط «اختر ميعادك واحجز»، هيفتحلك الكاليندر تختار منه اليوم والساعة وتأكّد الحجز — وبياناتك هتكون متعبّاة تلقائيًا.</span><span class="lead-en">📅 After filling your details and clicking "Pick your time & book", a calendar opens to choose the day & time and confirm — your details are prefilled automatically.</span></div>
        <div class="sp-sat" style="margin-top:8px"><span class="lead-ar">السبت مخصّص للجلسات الحضورية بالعيادة — للحجز الحضوري كلّمنا على واتساب.</span><span class="lead-en">Saturdays are reserved for in-person sessions at the clinic — message us on WhatsApp to book in person.</span></div>

        <label class="check"><input type="checkbox" name="emergency" required /><span class="ar-only">أُقِرّ بأن جلسات العلاج النفسي ليست بديلًا عن خدمات الطوارئ، وأنه في حالات الخطر العاجل أو الأفكار الانتحارية النشطة سأتواصل فورًا مع الطوارئ أو أقرب مستشفى.</span><span class="lead-en">I acknowledge that therapy is not a substitute for emergency services, and in cases of immediate danger or active suicidal thoughts I will contact emergency services or the nearest hospital immediately.</span></label>

        <div class="protect-note"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span class="ar-only">كل ما يُقال أثناء الجلسات سرّي وخاص، ولا يُكشف إلا في الحالات التي ينص عليها القانون والأخلاقيات المهنية.</span><span class="lead-en">Everything shared in sessions is private and confidential, disclosed only in cases required by law and professional ethics.</span></div>

        <button class="btn btn-gold" type="submit"><span class="lead-ar">اختر ميعادك واحجز</span><span class="lead-en">Pick your time &amp; book</span></button>
        <p class="req-hint ar-only">بعد ما ترفع الإيصال، هيفتحلك الكاليندر تختار الميعاد وتأكّد الحجز — وبنراجع الدفع ونأكّد حجزك.</p>
        <p class="req-hint lead-en">After uploading your receipt, a calendar opens to pick your time and confirm — we review payment and confirm your booking.</p>
      </form>
    </div>

    <div class="order-done" id="sessionDone">
      <div class="ok"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></div>
      <h3><span class="lead-ar">تم استلام طلب الحجز</span><span class="lead-en">Booking request received</span></h3>
      <p class="ar-only">الحجز لا يُعد مؤكدًا إلا بعد مراجعة الدفع وتأكيد الموعد من فريق Life Ark.</p>
      <p class="lead-en">Your booking is not confirmed until payment is reviewed and the appointment is confirmed by the Life Ark team.</p>

      <div class="pay-box" style="text-align:right;margin-top:18px">
        <div class="pt"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg><span class="lead-ar">خطوة أخيرة — اختيارية لكنها بتوفّر وقت أول جلسة</span><span class="lead-en">Last step — optional, saves time at your first session</span></div>
        <p class="pnote ar-only">حمّل «استمارة التعريف بالعميل»، ووقّعها (أو املأها في أول جلسة)، وأرسلها على واتساب أو البريد الإلكتروني قبل موعدك.</p>
        <p class="pnote lead-en">Download the intake form, sign it (or fill it at your first session), and send it on WhatsApp or email before your appointment.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:13px">
          <a class="btn btn-gold" href="assets/life-ark-intake-form.pdf" download="استمارة التعريف بالعميل - Life Ark.pdf"><span class="lead-ar">حمّل الاستمارة</span><span class="lead-en">Download Form</span></a>
          <a class="btn btn-wa" href="https://wa.me/201124239057" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20zm4.6-6c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a1 1 0 00-.7.3A2.8 2.8 0 006 9.3c0 1.6 1.2 3.2 1.4 3.4s2.3 3.6 5.6 4.9c2.1.9 2.6.7 3.1.6a2.5 2.5 0 001.7-1.2 2 2 0 00.1-1.2c0-.1-.2-.2-.4-.3z"/></svg><span class="lead-ar">ابعتها على واتساب</span><span class="lead-en">Send on WhatsApp</span></a>
        </div>
        <p class="pnote ar-only" style="margin-top:9px;text-align:center">أو على البريد الإلكتروني: <a href="mailto:Life.ark.psych@gmail.com?subject=Life%20Ark%20-%20Intake%20Form" style="direction:ltr;unicode-bidi:plaintext;color:var(--gold-bright);font-weight:700;text-decoration:none">Life.ark.psych@gmail.com</a></p>
      </div>

      <p class="ar-only" style="color:var(--ink-mute);font-size:.85rem;margin-top:12px">لو ما فُتحش واتساب تلقائيًا، تواصل معنا على +20 112 423 9057.</p>
    </div>
  </div>
</div>`);
  }
  // the booking modal is injected AFTER the initial applyLang() ran — re-apply the current
  // language so its placeholders + <select> option labels swap correctly on first load.
  applyLang(body.dataset.lang||savedLang||'ar');
  const sessModal=document.getElementById('sessionModal');
  if(sessModal){
    const sf=document.getElementById('sessionForm');
    const sView=document.getElementById('sessionView');
    const sDone=document.getElementById('sessionDone');
    const WA='201124239057';
    const FEES={
      'الجلسة الفردية':['قيمة الجلسة: 1000 ج.م / $50 — تُدفع قبل بدايتها إلى:','Session fee: 1000 EGP / $50 — paid before it starts, to:'],
      'مجموعة مهارات DBT':['اشتراك المجموعة: 4000 ج.م / $200 شهريًا (لمدة 12 شهرًا) — يُدفع إلى:','Group fee: EGP 4000 / $200 per month (for 12 months) — paid to:'],
      'الورش المكثّفة':['قيمة الورشة تُحدَّد حسب الورشة — للتفاصيل تواصل معنا، والدفع إلى:','Workshop fee varies by workshop — contact us for details, and pay to:'],
      'برنامج DBT-SUD':['قيمة البرنامج تُحدَّد بعد التقييم — والدفع إلى:','Program fee is set after assessment — and paid to:']
    };
    const feeAr=document.getElementById('sessFeeAr'), feeEn=document.getElementById('sessFeeEn');
    const updateFee=()=>{ const v=(sf.stype.value||''); const k=Object.keys(FEES).find(x=>v.indexOf(x)===0);
      const f=k?FEES[k]:['تُحدَّد القيمة حسب الخدمة — والدفع إلى:','The fee depends on the service — and is paid to:'];
      if(feeAr) feeAr.textContent=f[0]; if(feeEn) feeEn.textContent=f[1]; };

    // Scheduling (availability, slot-locking, calendar) is handled by Cal.com (see #calTrigger).
    const openS=(stype)=>{
      if(stype){ const sel=sf.stype; for(const o of sel.options){ if(o.value.indexOf(stype)===0){ sel.value=o.value; break; } } }
      updateFee();
      Array.from(sf.elements).forEach(el=>{ el.style.borderColor=''; });
      sView.style.display='block'; sDone.style.display='none';
      sessModal.classList.add('open'); document.body.style.overflow='hidden';
    };
    sf.stype.addEventListener('change',updateFee);
    Array.from(sf.elements).forEach(el=>{ el.addEventListener('input',()=>{ el.style.borderColor=''; }); });
    // Booking flow: this modal (form + payment + acknowledgment) shows FIRST,
    // then openCal() opens the Cal.com calendar — prefilled with the visitor's details — to pick the time.
    const openCal=(prefill)=>{ const t=document.getElementById('calTrigger'); if(!t) return;
      try{ t.setAttribute('data-cal-config', JSON.stringify(Object.assign({layout:'month_view'}, prefill||{}))); }catch(_){ }
      t.click(); };
    window.lifeArkBook=openS;
    const closeS=()=>{ sessModal.classList.remove('open'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-session]').forEach(b=>{
      b.addEventListener('click',e=>{ e.preventDefault(); openS(b.getAttribute('data-session')); });
    });
    document.getElementById('sessionClose').addEventListener('click',closeS);
    sessModal.addEventListener('click',e=>{ if(e.target===sessModal) closeS(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && sessModal.classList.contains('open')) closeS(); });
    sf.addEventListener('submit',e=>{
      e.preventDefault();
      const name=(sf.fullname.value||'').trim();
      const wa=(sf.whatsapp.value||'').trim();
      const email=(sf.email.value||'').trim();
      const bad=(el)=>{ el.focus(); el.style.borderColor='#e0894f'; };
      if(!name){ bad(sf.fullname); return; }
      if(!wa){ bad(sf.whatsapp); return; }
      if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ bad(sf.email); return; }
      const receipt=sf.querySelector('input[type=file][name="payment_receipt"]');
      if(!receipt || !receipt.files || !receipt.files.length){ if(receipt){ receipt.focus(); receipt.style.borderColor='#e0894f'; receipt.scrollIntoView({block:'center'}); } return; }
      if(!sf.emergency.checked){ sf.emergency.focus(); sf.emergency.scrollIntoView({block:'center'}); return; }
      const notes='واتساب: '+wa+' | نوع الجلسة: '+sf.stype.value+' | الشكل: '+sf.format.value+((sf.reason.value||'').trim()?(' | السبب: '+sf.reason.value.trim()):'');
      // email the booking details + the payment receipt to Life Ark (Formsubmit, multipart so the file attaches)
      try{
        const fd=new FormData(sf);
        fd.append('_subject','طلب حجز جلسة + إيصال دفع — Life Ark');
        fd.append('_captcha','false');
        fd.append('_template','table');
        fetch('https://formsubmit.co/Life.ark.psych@gmail.com',{method:'POST',body:fd,mode:'no-cors'}).catch(function(){});
      }catch(_){}
      closeS();
      openCal({ name:name, email:email, notes:notes });
    });
  }

  // ===== About Michael modal =====
  const aboutModal=document.getElementById('aboutModal');
  const aboutBtn=document.getElementById('aboutBtn');
  if(aboutModal && aboutBtn){
    const openA=()=>{ aboutModal.classList.add('open'); document.body.style.overflow='hidden';
      // reveal-on-scroll can't observe a display:none modal, so make its content
      // visible the moment it opens (fixes both the numbers and the qualifications).
      aboutModal.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
      aboutModal.querySelector('.modal-card').scrollTop=0; };
    const closeA=()=>{ aboutModal.classList.remove('open'); document.body.style.overflow=''; };
    aboutBtn.addEventListener('click',openA);
    document.getElementById('aboutClose').addEventListener('click',closeA);
    aboutModal.addEventListener('click',e=>{ if(e.target===aboutModal) closeA(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && aboutModal.classList.contains('open')) closeA(); });
  }

  // ===== Service detail modals (individual / group) =====
  const detailMap={indiv:'indivModal',group:'groupModal',sud:'sudModal',workshop:'workshopModal'};
  const detailIds=['indivModal','groupModal','sudModal','workshopModal'];
  const openDetail=(id)=>{ const m=document.getElementById(id); if(!m) return; m.classList.add('open'); document.body.style.overflow='hidden'; m.querySelector('.modal-card').scrollTop=0; };
  const closeDetail=(m)=>{ m.classList.remove('open'); document.body.style.overflow=''; };
  document.querySelectorAll('[data-detail]').forEach(b=>{
    b.addEventListener('click',(e)=>{ e.preventDefault(); openDetail(detailMap[b.getAttribute('data-detail')]); });
  });
  detailIds.forEach(id=>{
    const m=document.getElementById(id); if(!m) return;
    m.querySelector('.modal-close').addEventListener('click',()=>closeDetail(m));
    m.addEventListener('click',e=>{ if(e.target===m) closeDetail(m); });
  });
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape') return;
    detailIds.forEach(id=>{ const m=document.getElementById(id); if(m && m.classList.contains('open')) closeDetail(m); });
  });
  // book button inside a detail modal: close it (the global [data-session] handler opens booking)
  document.querySelectorAll('.detail-book').forEach(b=>{
    b.addEventListener('click',()=>{ const m=b.closest('.modal'); if(m) closeDetail(m); });
  });

  // ===== back-to-top + scroll-spy =====
  (function(){
    const toTop=document.getElementById('toTop');
    if(toTop){
      addEventListener('scroll',()=>{ toTop.classList.toggle('show', scrollY>600); },{passive:true});
      toTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
    }
    const navMap={};
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(a=>{ navMap[a.getAttribute('href').slice(1)]=a; });
    const secs=Object.keys(navMap).map(id=>document.getElementById(id)).filter(Boolean);
    if(secs.length){
      const spy=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ Object.values(navMap).forEach(a=>a.classList.remove('active')); const a=navMap[e.target.id]; if(a) a.classList.add('active'); } }); },{rootMargin:'-45% 0px -50% 0px',threshold:0});
      secs.forEach(s=>spy.observe(s));
    }
  })();

  // ===== academy waitlist (WhatsApp with prefilled interest) =====
  document.querySelectorAll('[data-academy]').forEach(a=>{
    a.addEventListener('click',e=>{ e.preventDefault(); const msg=encodeURIComponent('أهلاً، أرغب في تسجيل اهتمامي بأكاديمية مهارات Life Ark، وأن أعرف فور إطلاقها 🌊'); window.open('https://wa.me/201124239057?text='+msg,'_blank'); });
  });

  // ===== DBT Pathway Quiz (9 dimensions → 8 pathways, risk-first logic) =====
  (function(){
    const card=document.getElementById('quizCard'); if(!card) return;
    const $=id=>document.getElementById(id);
    const intro=$('quizIntro'), qScr=$('quizQ'), mScr=$('quizMulti'), rScr=$('quizRes');
    const bar=$('quizBar'), labelEl=$('quizLabel'), textEl=$('quizText'), optsEl=$('quizOpts');
    const bi=(ar,en)=>'<span class="lead-ar">'+ar+'</span><span class="lead-en">'+en+'</span>';
    const EN=['Rarely or never','Sometimes, but manageable','Often, with clear pain or problems','Severe — with risk or major losses'];
    const Q=[
      {lab:['الخوف من الهجر أو الترك','Fear of abandonment'],ar:'عندما تشعر أن شخصًا مهمًا قد يبتعد عنك، يتأخّر في الردّ، يرفضك، أو يتغيّر عليك… ماذا يحدث غالبًا؟',en:'When someone important might pull away, delays replying, rejects you, or changes toward you — what usually happens?',opts:['أتضايق بشكل طبيعي، لكن لا يسيطر ذلك عليّ.','أقلق أو أتعلّق قليلًا، لكن أستطيع تهدئة نفسي.','أشعر بخوف شديد من الفقد، وقد أبدأ في المطاردة أو اللوم أو الاختبار أو التعلّق أو الانسحاب.','يتحوّل الأمر إلى أزمة كبيرة: انهيار، تهديد، اندفاع، تعلّق شديد، قطع علاقة مفاجئ، أو تصرّفات مؤذية.']},
      {lab:['العلاقات الشديدة وغير المستقرّة','Unstable, intense relationships'],ar:'هل علاقاتك القريبة تمرّ بدورات متكرّرة من القرب الشديد ثم الخيبة أو الغضب أو الانسحاب أو القطع؟',en:'Do your close relationships cycle between intense closeness and disappointment, anger, withdrawal, or cut-off?',opts:['لا، علاقاتي مستقرّة نسبيًا.','يحدث توتر أحيانًا، لكنه لا يقلب العلاقة بالكامل.','نعم، علاقاتي غالبًا شديدة ومؤلمة، وتتأرجح بين التعلّق والغضب أو القرب والبعد.','نعم، تتحوّل بسرعة إلى أزمات كبيرة: قطع متكرّر، رجوع متكرّر، اتهامات، انهيارات، أو صراعات شديدة.']},
      {lab:['عدم ثبات الإحساس بالذات','Identity instability'],ar:'إلى أي درجة تشعر أن إحساسك بنفسك، قيمتك، أهدافك، أو صورتك عن نفسك يتغيّر بشدّة؟',en:'How much does your sense of self, worth, goals, or self-image change drastically?',opts:['لديّ إحساس واضح نسبيًا بنفسي، حتى لو تغيّرت مع الوقت.','أحيانًا أشكّ في نفسي أو أتأثّر برأي الآخرين، لكن لا أفقد إحساسي بذاتي.','كثيرًا أشعر أنني لا أعرف من أنا، أو تتغيّر صورتي عن نفسي بسرعة حسب العلاقة أو الموقف.','أشعر بفراغ أو تشتّت شديد في هويّتي، وقد أتبنّى أدوارًا أو قرارات أو علاقات ثم أنقلب عليها تمامًا.']},
      {lab:['الاندفاع والسلوكيات المؤذية','Impulsivity & self-damaging behavior'],ar:'تحت الضغط أو المشاعر الشديدة، هل تدخل في تصرّفات اندفاعية قد تؤذيك (إنفاق متهوّر، سلوك جنسي عالي الخطورة، تعاطي، قيادة متهوّرة، أكل قهري، قرارات مفاجئة مدمّرة)؟',en:'Under pressure or strong emotions, do you act impulsively in ways that could harm you (reckless spending, high-risk sex, substance use, reckless driving, binge eating, sudden destructive decisions)?',opts:['لا، أو يحدث نادرًا جدًا.','يحدث أحيانًا في مجال واحد، لكن دون خسائر كبيرة.','يحدث بشكل متكرّر أو في أكثر من مجال، ويسبّب مشاكل واضحة.','يحدث بشدّة، مع فقدان سيطرة أو عواقب كبيرة: صحية، مالية، قانونية، أسرية، أو متعلّقة بالتعاطي.']},
      {lab:['إيذاء النفس أو الأفكار الانتحارية','Self-harm or suicidal thoughts'],ar:'خلال آخر شهر، هل راودتك أفكار عن إيذاء نفسك أو إنهاء حياتك، أو حدث سلوك إيذاء نفس؟',en:'In the last month, have you had thoughts of harming yourself or ending your life, or any self-harm behavior?',opts:['لا.','أفكار عابرة مثل «نفسي أختفي» أو «مش قادر أكمّل»، دون نيّة أو خطة أو إيذاء.','أفكار متكرّرة أو قوية عن إيذاء النفس أو الموت، أو إيذاء نفس سابق، لكن دون خطة حالية واضحة.','لديّ نيّة أو خطة، أو حدث إيذاء نفس مؤخرًا، أو محاولة، أو أشعر أنني قد لا أستطيع منع نفسي.']},
      {lab:['شدّة تقلّب المشاعر','Emotional instability'],ar:'عند مواقف يومية (تأخّر ردّ، نقد، رفض، خيبة، ضغط، خلاف)… كيف تتغيّر مشاعرك؟',en:'In everyday situations (a late reply, criticism, rejection, letdown, stress, conflict) — how do your emotions shift?',opts:['أتأثّر، لكن مشاعري تظلّ في نطاق يمكن احتماله.','مشاعري ترتفع، لكنني أهدأ مع الوقت.','مشاعري تتقلّب بسرعة وبشدّة، وقد أظلّ عالقًا فيها لساعات.','مشاعري تسيطر عليّ تمامًا، وتقود قراراتي وسلوكي وعلاقاتي.']},
      {lab:['الشعور المزمن بالفراغ','Chronic emptiness'],ar:'هل تشعر بفراغ داخلي متكرّر، أو إحساس بأن الحياة بلا معنى أو أنك غير موجود من الداخل؟',en:'Do you feel a recurring inner emptiness, or that life is meaningless or that you are not really there inside?',opts:['لا، أو يحدث نادرًا.','يحدث أحيانًا في فترات الضغط أو الوحدة.','يحدث كثيرًا، وأحاول الهروب منه بالنوم أو العلاقات أو الأكل أو الشاشات أو الانشغال.','الفراغ شديد ومزمن، وقد يدفعني لتصرّفات مؤذية أو تعلّق شديد أو تعاطي أو رغبة في الاختفاء.']},
      {lab:['الغضب الشديد','Intense anger'],ar:'عندما تغضب، ماذا يحدث غالبًا؟',en:'When you get angry, what usually happens?',opts:['أغضب لكن أستطيع التعبير أو الانسحاب بشكل مناسب.','أرفع صوتي أو أتوتّر، لكن أرجع بسرعة نسبيًا.','غضبي شديد، وقد أقول كلامًا جارحًا، أو أهدّد، أو أقطع العلاقة، أو أفقد السيطرة.','غضبي يتحوّل إلى نوبات شديدة: تكسير، اعتداء، تهديد، إيذاء نفس، أو خسائر كبيرة في العلاقات.']},
      {lab:['الانفصال عن الواقع أو الشكّ الشديد','Dissociation or paranoid thinking'],ar:'تحت الضغط الشديد، هل تشعر أنك منفصل عن نفسك أو جسمك أو العالم، أو تشكّ بشدّة في نوايا الآخرين؟',en:'Under heavy stress, do you feel detached from yourself, your body, or the world, or strongly suspect others’ intentions?',opts:['لا، أو نادرًا جدًا.','يحدث أحيانًا بشكل خفيف (سرحان أو إحساس بعدم الواقعية)، ثم يزول.','يحدث بوضوح وقت الضغط: أشعر أنني منفصل أو مخدّر أو غير موجود، أو أشكّ أن الناس ضدّي.','يحدث بشدّة لدرجة أنني أفقد إحساسي بالواقع أو أتصرّف بناءً على شكوك قوية أو انفصال شديد.']}
    ];
    const AREAS=[{ar:'إنفاق متهوّر',en:'Reckless spending'},{ar:'علاقات أو سلوك جنسي عالي الخطورة',en:'High-risk sexual behavior'},{ar:'استخدام مواد أو تعاطي',en:'Substance use'},{ar:'قيادة متهوّرة',en:'Reckless driving'},{ar:'أكل قهري',en:'Binge eating'},{ar:'غضب أو شجار أو تكسير',en:'Anger, fights, or breaking things'},{ar:'قرارات مفاجئة مؤذية',en:'Sudden harmful decisions'},{ar:'أخرى',en:'Other'}];
    const SUBSTANCE_IDX=2;
    const closing=['هذه النتيجة مبدئية وليست تشخيصًا. المقابلة الإكلينيكية تساعدنا على فهم الصورة كاملة واختيار المسار الأكثر أمانًا وفعالية لك.','This result is preliminary and not a diagnosis. A clinical interview helps us see the full picture and choose the safest, most effective path for you.'];
    const RES={
      safety:{t:['الأولوية الآن: الأمان والتقييم الفردي','Priority now: safety and an individual assessment'],b:['إجاباتك تشير إلى أن الأولوية الآن هي الأمان والتقييم الفردي قبل اختيار أي ورشة أو جروب. قد يكون من المهم أن تبدأ بجلسة تقييم قريبة لوضع خطة أمان وفهم مستوى الخطر وتحديد الدعم المناسب.','Your answers suggest the priority right now is safety and an individual assessment before any workshop or group. It may help to start with an early assessment session to build a safety plan, gauge the level of risk, and arrange the right support.'],p:['المسار المقترح: تقييم أمان عاجل + جلسة فردية + خطة أمان.','Suggested path: urgent safety assessment + an individual session + a safety plan.'],type:'الجلسة الفردية'},
      sud:{t:['قد يكون المسار الأقرب هو DBT-SUD','The closest path may be DBT-SUD'],b:['إجاباتك تشير إلى أن استخدام المواد أو السلوك الإدماني قد يكون مرتبطًا بمشاعر شديدة أو اندفاع أو محاولة الهروب من ألمٍ داخلي. قد يكون المسار الأقرب هو DBT-SUD، وهو تطبيق متخصص من DBT لمن يعانون من اضطرابات استخدام المواد مع صعوبات تنظيم المشاعر.','Your answers suggest substance use or addictive behavior may be tied to intense emotions, impulsivity, or escaping inner pain. The closest path may be DBT-SUD — a specialized DBT application for substance-use difficulties alongside emotion dysregulation.'],p:['المسار المقترح: DBT-SUD — جلسات فردية + مهارات DBT + متابعة الرغبة الشديدة + خطة للزلّات والانتكاسات.','Suggested path: DBT-SUD — individual sessions + DBT skills + craving monitoring + a relapse plan.'],type:'برنامج DBT-SUD',note:['إذا كان هناك استخدام يومي أو أعراض انسحاب أو اعتماد جسدي، فقد تحتاج إلى تقييم طبي بالتوازي.','If there is daily use, withdrawal symptoms, or physical dependence, a parallel medical assessment may be needed.']},
      comprehensive:{t:['قد يكون الأنسب هو DBT الشامل','Comprehensive DBT may fit best'],b:['إجاباتك تشير إلى أن الصعوبة ليست في مهارة واحدة فقط، بل في نمط متكرّر يؤثّر على المشاعر والعلاقات والاندفاع وجودة الحياة. قد يكون الأنسب هو العلاج الجدلي السلوكي الشامل، لأنه يجمع بين الجلسات الفردية وجروب المهارات وخطة تطبيق مستمرة.','Your answers suggest the difficulty is not a single skill but a recurring pattern affecting emotions, relationships, impulsivity, and quality of life. Comprehensive DBT may fit best — it combines individual sessions, the skills group, and an ongoing practice plan.'],p:['المسار المقترح: DBT شامل — جلسات فردية + جروب مهارات + متابعة تطبيق المهارات.','Suggested path: comprehensive DBT — individual sessions + skills group + practice follow-up.'],type:'الجلسة الفردية'},
      individual:{t:['قد تحتاج إلى جلسات فردية كبداية','Individual sessions may be a good start'],b:['إجاباتك تشير إلى أنك قد تحتاج إلى مساحة فردية تساعدك على فهم أنماطك الخاصة، وتفكيك المواقف المتكرّرة، وتطبيق مهارات DBT على حياتك أنت تحديدًا.','Your answers suggest you may need an individual space to understand your own patterns, unpack recurring situations, and apply DBT skills to your specific life.'],p:['المسار المقترح: جلسات فردية DBT كبداية، مع إمكانية إضافة جروب المهارات لاحقًا حسب التقييم.','Suggested path: individual DBT sessions to start, with the skills group added later based on assessment.'],type:'الجلسة الفردية'},
      group:{t:['قد تستفيد من جروب مهارات DBT','A DBT skills group may suit you'],b:['إجاباتك تشير إلى أنك قد تستفيد من تعلّم مهارات عملية للتعامل مع المشاعر والأزمات والاندفاع والعلاقات. جروب مهارات DBT مناسب لمن يحتاج تدريبًا أسبوعيًا واضحًا على أدوات تساعده في الحياة اليومية، لا مساحة كلام أو فضفضة فقط.','Your answers suggest you may benefit from learning practical skills for emotions, crises, impulsivity, and relationships. A DBT skills group suits those who need clear weekly training in real-life tools — not just a space to vent.'],p:['المسار المقترح: جروب مهارات DBT — اليقظة الذهنية، تحمّل الضيق، تنظيم المشاعر، وفعالية العلاقات.','Suggested path: DBT skills group — mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness.'],type:'مجموعة مهارات DBT'},
      emotion_ws:{t:['قد تناسبك ورشة تنظيم المشاعر','An emotion-regulation workshop may fit'],b:['إجاباتك تشير إلى أن التحدّي الأساسي قد يكون في فهم المشاعر وتهدئتها وتقليل شدّتها قبل أن تقودك لتصرّفات لا تريدها. قد لا تحتاج في البداية إلى برنامج شامل، لكنك قد تستفيد من ورشة مركّزة في تنظيم المشاعر.','Your answers suggest your main challenge may be understanding, soothing, and lowering the intensity of emotions before they drive unwanted actions. You may not need a full program yet, but a focused emotion-regulation workshop could help.'],p:['المسار المقترح: ورشة تنظيم المشاعر.','Suggested path: an emotion-regulation workshop.'],type:'الورش المكثّفة'},
      rel_ws:{t:['قد تناسبك ورشة مهارات العلاقات','A relationship-skills workshop may fit'],b:['إجاباتك تشير إلى أن أكثر منطقة تحتاج تدريبًا قد تكون العلاقات: الخوف من الفقد، الطلب، الرفض، الحدود، أو الحفاظ على احترام الذات داخل العلاقة.','Your answers suggest the area most needing practice may be relationships: fear of loss, asking, refusing, boundaries, or keeping self-respect within a relationship.'],p:['المسار المقترح: ورشة مهارات العلاقات الفعّالة.','Suggested path: an interpersonal-effectiveness workshop.'],type:'الورش المكثّفة'},
      general:{t:['جلسة تقييم أوّلية قد تكون كافية','An initial assessment may be enough'],b:['إجاباتك لا تشير إلى احتياج واضح لمسار مكثّف في هذه المرحلة، لكن جلسة تقييم أوّلية قد تساعدك على فهم ما تحتاجه بدقة واختيار الخدمة الأنسب لك.','Your answers do not point to a clear need for an intensive path right now, but an initial assessment session can help you understand exactly what you need and choose the best service.'],p:['المسار المقترح: جلسة تقييم أوّلية أو ورشة تعريفية.','Suggested path: an initial assessment session or an intro workshop.'],type:'الجلسة الفردية'}
    };
    const N=Q.length;
    let i=0, scores=[], areas=[];
    const show=el=>{ [intro,qScr,mScr,rScr].forEach(s=>s.style.display='none'); el.style.display='block'; };
    const renderQ=()=>{
      const q=Q[i];
      bar.style.width=(i/N*100)+'%';
      $('quizCount').innerHTML=bi('سؤال '+(i+1)+' من '+N,'Question '+(i+1)+' of '+N);
      labelEl.innerHTML=bi(q.lab[0],q.lab[1]);
      textEl.innerHTML=bi(q.ar,q.en);
      optsEl.innerHTML='';
      q.opts.forEach((o,k)=>{ const b=document.createElement('button'); b.className='quiz-opt'; b.type='button'; b.innerHTML=bi(o,EN[k]); b.addEventListener('click',()=>pick(k)); optsEl.appendChild(b); });
      show(qScr);
    };
    const pick=v=>{ scores[i]=v; if(i===3 && v>=1){ renderMulti(); return; } next(); };
    const next=()=>{ i++; if(i<N) renderQ(); else result(); };
    const renderMulti=()=>{
      bar.style.width=(3.5/N*100)+'%';
      $('quizMultiCount').innerHTML=bi('سؤال 4 — تفصيل','Question 4 — detail');
      const box=$('quizMultiOpts'); box.innerHTML=''; areas=[];
      AREAS.forEach((a,k)=>{ const b=document.createElement('button'); b.className='quiz-mopt'; b.type='button'; b.innerHTML='<span class="box"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>'+bi(a.ar,a.en); b.addEventListener('click',()=>{ b.classList.toggle('sel'); if(b.classList.contains('sel')){ if(areas.indexOf(k)<0) areas.push(k); } else { areas=areas.filter(x=>x!==k); } }); box.appendChild(b); });
      show(mScr);
    };
    $('quizMultiNext').addEventListener('click',next);
    function route(s,sub,pc,sev,t,cl){
      const Q1=s[0],Q2=s[1],Q3=s[2],Q4=s[3],Q5=s[4],Q6=s[5],Q7=s[6],Q8=s[7],Q9=s[8];
      if(Q5===3 || (Q5===2 && (Q4===3||Q6===3||Q8===3))) return {key:'safety'};
      if(sub && Q4>=2) return {key:'sud', withSafety:Q5>=2};
      if(pc>=5 || t>=15 || sev>=3 || (Q4===3 && (Q1>=2||Q2>=2||Q6>=2||Q8>=2)) || (Q1>=2 && Q2>=2 && (Q6>=2||Q8>=2||Q5>=2))) return {key:'comprehensive'};
      if(Q3===3 || Q9>=2) return {key:'individual'};
      if(Q5===2 && t<15) return {key:'individual'};
      if(pc>=3 && pc<=4 && Q5<2 && !sub && t>=8 && t<=14) return {key:'group'};
      const mx=Math.max(cl.rel,cl.idc,cl.beh,cl.emo);
      if(cl.emo===mx && (Q6>=2||Q7>=2||Q8>=2) && Q1<2 && Q2<2 && Q4<2 && Q5<=1 && pc<=3 && t<10) return {key:'emotion_ws'};
      if(cl.rel===mx && (Q1>=2||Q2>=2) && Q5<=1 && Q4<2 && t<11) return {key:'rel_ws'};
      if(pc<2 && t<7) return {key:'general'};
      return {key: pc>=3 ? 'group' : 'individual'};
    }
    const result=()=>{
      bar.style.width='100%';
      const s=[]; for(let k=0;k<N;k++) s[k]=scores[k]||0;
      const t=s.reduce((a,b)=>a+b,0);
      const pc=s.filter(x=>x>=2).length, sev=s.filter(x=>x===3).length;
      const sub=areas.indexOf(SUBSTANCE_IDX)>=0 && s[3]>=2;
      const cl={rel:s[0]+s[1], idc:s[2]+s[8], beh:s[3]+s[4], emo:s[5]+s[6]+s[7]};
      const r=route(s,sub,pc,sev,t,cl), R=RES[r.key];
      $('quizResIc').innerHTML = (r.key==='safety')
        ? '<svg viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
      $('quizResT').innerHTML=bi(R.t[0],R.t[1]);
      $('quizResB').innerHTML=bi(R.b[0],R.b[1]);
      $('quizResPath').innerHTML=bi(R.p[0],R.p[1]);
      let nAr=closing[0], nEn=closing[1];
      if(R.note){ nAr=R.note[0]+' '+nAr; nEn=R.note[1]+' '+nEn; }
      if(r.key==='safety' || r.withSafety){ nAr='في حال وجود خطر عاجل أو نيّة لإيذاء النفس، تواصل فورًا مع 16328 أو أقرب طوارئ. '+nAr; nEn='In urgent danger or intent to self-harm, contact 16328 or your nearest emergency service now. '+nEn; }
      $('quizNote').innerHTML=bi(nAr,nEn);
      const cta=$('quizResCta');
      cta.innerHTML='<button type="button" class="btn btn-gold" id="quizBook">'+bi(r.key==='safety'?'احجز جلسة تقييم':'احجز الآن', r.key==='safety'?'Book an assessment':'Book now')+'</button>';
      $('quizBook').addEventListener('click',()=>{ if(window.lifeArkBook) window.lifeArkBook(R.type); });
      show(rScr);
    };
    $('quizStart').addEventListener('click',()=>{ i=0; scores=[]; areas=[]; renderQ(); });
    $('quizRestart').addEventListener('click',()=>{ i=0; scores=[]; areas=[]; show(intro); });
  })();

  // ===== FAQ accordion =====
  document.querySelectorAll('.faq-item .faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.closest('.faq-item');
      const wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });

  // ===== service accordion (therapy page — long sections folded into cards that open in place) =====
  (function(){
    const cards=[...document.querySelectorAll('.svc-card')];
    if(!cards.length) return;
    const HEAD_OFFSET=110;
    const openCard=(card,scroll)=>{
      if(!card) return;
      card.classList.add('open');
      const h=card.querySelector('.svc-card-head'); if(h) h.setAttribute('aria-expanded','true');
      card.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')); // ensure folded content is visible
      if(scroll){ const y=card.getBoundingClientRect().top+scrollY-HEAD_OFFSET; scrollTo({top:y,behavior:'smooth'}); }
    };
    const closeCard=(card)=>{ if(!card) return; card.classList.remove('open'); const h=card.querySelector('.svc-card-head'); if(h) h.setAttribute('aria-expanded','false'); };
    cards.forEach(card=>{
      const head=card.querySelector('.svc-card-head'); if(!head) return;
      head.addEventListener('click',()=>{ card.classList.contains('open')?closeCard(card):openCard(card,false); });
    });
    // sticky sub-nav + hero "browse the paths" links open and scroll to the matching card
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      const card=document.getElementById(a.getAttribute('href').slice(1));
      if(card && card.classList.contains('svc-card')){
        a.addEventListener('click',e=>{ e.preventDefault(); openCard(card,true); if(history.replaceState) history.replaceState(null,'','#'+card.id); });
      }
    });
    // deep-link: open the card named in the URL hash on load
    if(location.hash.length>1){ const c=document.getElementById(location.hash.slice(1)); if(c && c.classList.contains('svc-card')) openCard(c,true); }
  })();

  // ===== back button: return to the previous same-site page, else home =====
  document.querySelectorAll('a[data-back]').forEach(a=>{
    a.addEventListener('click',e=>{
      let sameSite=false;
      try{ const ref=document.referrer?new URL(document.referrer):null;
        sameSite = !!ref && ref.origin===location.origin && ref.pathname!==location.pathname; }catch(_){}
      if(sameSite){ e.preventDefault(); history.back(); }
      // otherwise the anchor's href="index.html" navigates home
    });
  });

  // ===== modal accessibility: trap Tab inside an open modal, restore focus on close =====
  // Honors the aria-modal="true" contract on every .modal (including the booking modal
  // injected earlier): when one opens, focus moves into it and Tab/Shift+Tab cycle only
  // within it; when it closes, focus returns to whatever opened it. Driven by the `open`
  // class, so it needs no change to each modal's own open/close handlers. Escape-to-close
  // is already wired per modal above.
  (function(){
    const FOCUSABLE='a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    // only controls that are actually rendered (skips hidden sub-views like *Done panels)
    const items=(modal)=>[...modal.querySelectorAll(FOCUSABLE)].filter(el=>el.offsetWidth>0||el.offsetHeight>0||el===document.activeElement);
    document.querySelectorAll('.modal').forEach(modal=>{
      let trigger=null;
      new MutationObserver(()=>{
        if(modal.classList.contains('open')){
          if(!modal.contains(document.activeElement)) trigger=(document.activeElement instanceof HTMLElement)?document.activeElement:null;
          // .modal.open is display:flex the moment the class lands, so focus directly —
          // no requestAnimationFrame (it gets throttled when the tab isn't visible).
          const f=items(modal), close=modal.querySelector('.modal-close');
          try{ (close||f[0]||modal).focus(); }catch(_){}
        } else if(trigger){
          try{ trigger.focus(); }catch(_){}
          trigger=null;
        }
      }).observe(modal,{attributes:true,attributeFilter:['class']});
    });
    document.addEventListener('keydown',e=>{
      if(e.key!=='Tab') return;
      const modal=document.querySelector('.modal.open'); if(!modal) return;
      const f=items(modal); if(!f.length){ e.preventDefault(); return; }
      const first=f[0], last=f[f.length-1], a=document.activeElement;
      if(!modal.contains(a)){ e.preventDefault(); first.focus(); }
      else if(e.shiftKey && a===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && a===last){ e.preventDefault(); first.focus(); }
    });
  })();
