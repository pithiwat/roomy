'use strict';
/*
 * Roomy motion intro (24 s). Deterministic: render(t) draws the frame for time t (seconds), so the same code
 * plays on the website (requestAnimationFrame) and is exported frame-by-frame to MP4 (tools/render-video.js).
 *   RoomyMotion.mount(el, { lang: 'th'|'en', autoplay: true, record: false }) -> { render, play, pause, setLang, DURATION }
 * Numbers in the demo are illustrative and consistent with each other (a typical full C: drive).
 */
(function (root) {
  const DURATION = 30;
  const T = {
    th: {
      nav: ['ไดรฟ์ทั้งหมด', 'แผนที่พื้นที่', 'ล้างพื้นที่', 'ย้ายไปไดรฟ์อื่น', 'หน่วยความจำและแอป', 'โหมดเกม'],
      cap: ['ไดรฟ์ C เต็มอีกแล้ว?', 'สแกนล้านไฟล์ได้ในไม่กี่นาที', 'เห็นทันทีว่าอะไรกินพื้นที่', 'ล้างอย่างปลอดภัย ถามก่อนลบทุกครั้ง', 'ย้ายโฟลเดอร์ใหญ่ไปไดรฟ์อื่น โปรแกรมยังหาเจอ', 'เครื่องอืด? คืนหน่วยความจำในคลิกเดียว พร้อมเล่นเกม', ''],
      memH: 'หน่วยความจำและแอป', memSub: 'คืนหน่วยความจำโดยไม่ปิดแอปใด ๆ', memBtn: 'คืนหน่วยความจำ', memUsed: 'ใช้อยู่', ready: 'พร้อมเล่นเกม', apps: [['Google Chrome · 38 แท็บ', 2.9], ['Discord', 0.6], ['Steam', 0.4]],
      drive: 'ไดรฟ์ C', free: 'เหลือ {0} GB จาก 476 GB', warn: 'พื้นที่ใกล้เต็ม', scanH: 'กำลังสแกน C:', files: 'ไฟล์', found: 'ขนาดที่พบ', time: 'เวลา',
      mapH: 'แผนที่พื้นที่', mapSub: 'กล่องยิ่งใหญ่ ยิ่งกินพื้นที่มาก', cleanH: 'ล้างพื้นที่', cleanSub: 'ลบเฉพาะแคชที่สร้างใหม่ได้เอง', freed: 'ได้คืน',
      rows: [['แคช Shader ของ NVIDIA', 'เกมสร้างใหม่เองตอนเปิด'], ['ไฟล์ดาวน์โหลดของ Windows Update', 'อัปเดตที่ติดตั้งแล้ว'], ['ข้อมูล Docker ที่ไม่ได้ใช้', 'container ที่หยุดแล้ว, build cache'], ['ไฟล์ชั่วคราว (Temp)', 'เก่ากว่า 1 วัน']],
      moveH: 'ย้ายไปไดรฟ์อื่น', moveSub: 'คัดลอก ตรวจครบทุกไบต์ แล้วทิ้งทางลัดไว้ที่เดิม', folder: 'วิดีโอโปรเจกต์', junction: 'ทางลัด · ย้ายกลับได้',
      endP: 'คืนพื้นที่ให้เครื่องของคุณ', gain: 'ว่างเพิ่ม +{0} GB',
      boxes: ['Docker', 'เกม', 'แคชการ์ดจอ', 'Windows', 'วิดีโอ', 'โปรแกรม', 'ดาวน์โหลด', 'อื่น ๆ'],
    },
    en: {
      nav: ['All drives', 'Space map', 'Free up space', 'Move to another drive', 'Memory & apps', 'Game mode'],
      cap: ['Drive C full again?', 'Scan a million files in minutes', 'See what takes up space, instantly', 'Clean up safely. Always asks first', 'Move big folders to another drive. Apps still find them', 'PC feels slow? Free up memory in one click, ready to play', ''],
      memH: 'Memory & apps', memSub: 'Frees memory without closing any app', memBtn: 'Free up memory', memUsed: 'in use', ready: 'Ready to play', apps: [['Google Chrome · 38 tabs', 2.9], ['Discord', 0.6], ['Steam', 0.4]],
      drive: 'Drive C', free: '{0} GB free of 476 GB', warn: 'Almost full', scanH: 'Scanning C:', files: 'Files', found: 'Found', time: 'Time',
      mapH: 'Space map', mapSub: 'The bigger the box, the more space it takes', cleanH: 'Free up space', cleanSub: 'Only caches that get recreated', freed: 'Freed',
      rows: [['NVIDIA shader cache', 'Games rebuild it on launch'], ['Windows Update downloads', 'Updates already installed'], ['Unused Docker data', 'Stopped containers, build cache'], ['Temporary files', 'Older than 1 day']],
      moveH: 'Move to another drive', moveSub: 'Copy, verify every byte, leave a shortcut behind', folder: 'Video projects', junction: 'Shortcut · can move back',
      endP: 'Room for what matters', gain: '+{0} GB free',
      boxes: ['Docker', 'Games', 'GPU cache', 'Windows', 'Videos', 'Programs', 'Downloads', 'Other'],
    },
  };
  // scene windows [start, end] in seconds
  const S = [[0, 4], [4, 8], [8, 12], [12, 16.5], [16.5, 20], [20, 25], [25, 30]];
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const back = (p) => { const c = 1.6; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const fill = (s, ...a) => s.replace(/\{(\d)\}/g, (m, i) => a[i]);
  const nf = (n, l) => Math.round(n).toLocaleString(l === 'th' ? 'th-TH' : 'en-US');
  const LOGO = '<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="2" y="2" width="60" height="60" rx="15" fill="#0E7C66"/><rect x="11" y="11" width="24" height="42" rx="5" fill="#BFEBDD"/><rect x="38" y="11" width="15" height="19" rx="5" fill="#6CD3B3"/><rect x="39.1" y="34.1" width="12.8" height="17.8" rx="3.9" fill="none" stroke="#E6F7F1" stroke-width="2.2" stroke-dasharray="3.2 2.6"/></svg>';
  const CHECK = '<svg viewBox="0 0 16 16"><path d="M3.5 8.4l3 3 6-6.3"/></svg>';
  // treemap boxes [x, y, w, h, color, size GB]
  const BOXES = [[0, 0, 300, 230, '#3a9fb5', 41], [304, 0, 230, 160, '#7d8f2e', 38], [538, 0, 232, 160, '#c4534a', 22], [0, 234, 300, 126, '#5f6fd1', 34], [304, 164, 160, 196, '#b56b8d', 19], [468, 164, 150, 196, '#4b78c2', 27], [622, 164, 148, 100, '#d08a2b', 12], [622, 268, 148, 92, '#8a9490', 16]];
  const CLEAN = [14.2, 3.9, 4.1, 1.4];

  function mount(el, opts = {}) {
    let lang = opts.lang || 'en';
    el.classList.add('rm');
    if (opts.record) el.classList.add('record');
    el.innerHTML = `<div class="rm-stage"><div class="rm-bg"></div>
      <div class="rm-win"><aside class="rm-side"><div class="rm-brand"><span style="width:30px;height:30px">${LOGO}</span><b>Roomy</b></div><div class="rm-navs"></div></aside>
        <main class="rm-main">
          <section class="rm-scene" data-s="0"><h2 class="rm-h" data-k="drive"></h2><p class="rm-sub">&nbsp;</p>
            <div class="rm-card rm-drive"><div class="rm-ring"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" stroke-linecap="round"/></svg><span class="pct"></span></div>
            <div><h3>C: Windows</h3><p class="freeTxt"></p><span class="rm-warn" data-k="warn"></span></div></div></section>
          <section class="rm-scene" data-s="1"><h2 class="rm-h" data-k="scanH"></h2><p class="rm-sub">&nbsp;</p>
            <div class="rm-card rm-scan"><div class="rm-stats"><div><b class="sf"></b><small data-k="files"></small></div><div><b class="ss"></b><small data-k="found"></small></div><div><b class="st"></b><small data-k="time"></small></div></div>
            <div class="rm-bar"><i class="sb"></i></div><div class="rm-path sp"></div></div></section>
          <section class="rm-scene" data-s="2"><h2 class="rm-h" data-k="mapH"></h2><p class="rm-sub" data-k="mapSub"></p><div class="rm-tm"></div></section>
          <section class="rm-scene" data-s="3"><div class="rm-clean"><div class="rm-total"><div><h2 class="rm-h" data-k="cleanH"></h2><p class="rm-sub" data-k="cleanSub" style="margin:0"></p></div><div style="text-align:right"><small style="color:#5e6672" data-k="freed"></small><br><b class="ct"></b></div></div><div class="rows"></div></div></section>
          <section class="rm-scene" data-s="4"><h2 class="rm-h" data-k="moveH"></h2><p class="rm-sub" data-k="moveSub"></p>
            <div class="rm-move"><div class="rm-drivecol" style="left:0"><h4>C:</h4></div><div class="rm-drivecol" style="left:440px"><h4>D:</h4></div>
            <div class="rm-link"></div><div class="rm-folder mf"><b data-k="folder"></b><small>9.5 GB</small></div><div class="rm-junction" data-k="junction"></div></div></section>
          <section class="rm-scene" data-s="5"><h2 class="rm-h" data-k="memH"></h2><p class="rm-sub" data-k="memSub"></p>
            <div class="rm-card rm-mem"><div class="rm-ring"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="mfg" cx="60" cy="60" r="52" stroke-linecap="round"/></svg><span class="mpct"></span></div>
              <div class="rm-memr"><div class="rm-memt"><b class="mused"></b> <small data-k="memUsed"></small></div><div class="rm-apps"></div>
              <div class="rm-memb"><span class="rm-btn mbtn" data-k="memBtn"></span><span class="rm-ready"><i></i><b data-k="ready"></b></span></div></div></div></section>
        </main></div>
      <div class="rm-end"><div><div class="logo">${LOGO}</div><h2>Roomy</h2><p data-k="endP"></p><span class="gain"></span></div></div>
      <div class="rm-cap"></div></div>
      <div class="rm-ctrl"><button class="pp" aria-label="Play/Pause"></button><div class="rm-prog"><i></i></div></div>`;
    const $ = (s) => el.querySelector(s);
    const $$ = (s) => [...el.querySelectorAll(s)];
    const stage = $('.rm-stage');
    const tm = $('.rm-tm');
    BOXES.forEach(([x, y, w, h, c]) => { const b = document.createElement('div'); b.className = 'rm-box'; Object.assign(b.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', background: c }); b.innerHTML = '<b></b><span></span>'; tm.appendChild(b); });
    const rows = $('.rows');
    CLEAN.forEach(() => { const r = document.createElement('div'); r.className = 'rm-row'; r.innerHTML = `<span class="rm-check">${CHECK}</span><div><span class="n"></span><small></small></div><span class="s"></span>`; rows.appendChild(r); });

    function setLang(l) {
      lang = T[l] ? l : 'th';
      const L = T[lang];
      $('.rm-navs').innerHTML = L.nav.map((n, i) => `<div class="rm-nav" data-i="${i}"><i></i>${n}</div>`).join('');
      $$('[data-k]').forEach((e) => { e.textContent = L[e.dataset.k]; });
      $$('.rm-box').forEach((b, i) => { b.querySelector('b').textContent = L.boxes[i]; b.querySelector('span').textContent = BOXES[i][5] + ' GB'; });
      $('.rm-apps').innerHTML = L.apps.map(([n, gb]) => `<div class="rm-app"><span>${n}</span><b>${gb.toFixed(1)} GB</b><i style="width:${(gb / 2.9) * 100}%"></i></div>`).join('');
      $$('.rm-row').forEach((r, i) => { r.querySelector('.n').textContent = L.rows[i][0]; r.querySelector('small').textContent = L.rows[i][1]; r.querySelector('.s').textContent = CLEAN[i] + ' GB'; });
      render(cur);
    }

    function show(i, t, fadeIn = 0.45, fadeOut = 0.35) {
      const [a, b] = S[i];
      const o = Math.min(seg(t, a, a + fadeIn), 1 - seg(t, b - fadeOut, b));
      const sc = $(`.rm-scene[data-s="${i}"]`);
      if (!sc) return o;
      sc.style.opacity = o;
      sc.style.transform = `translateY(${(1 - ease(seg(t, a, a + 0.6))) * 18}px)`;
      return o;
    }

    let cur = 0;
    function render(t) {
      cur = t = clamp(t, 0, DURATION);
      const L = T[lang];
      // window + nav highlight
      const navOn = t < 8 ? 0 : t < 12 ? 1 : t < 16.5 ? 2 : t < 20 ? 3 : t < 23.4 ? 4 : 5;
      $$('.rm-nav').forEach((n, i) => n.classList.toggle('on', i === navOn));
      const winOut = ease(seg(t, 25, 26));
      $('.rm-win').style.opacity = 1 - winOut;
      $('.rm-win').style.transform = `scale(${1 - winOut * 0.06})`;
      // S1 drive filling up
      show(0, t);
      const fillP = ease(seg(t, 0.3, 2.6));
      const pct = Math.round(fillP * 97);
      $('.pct').textContent = pct + '%';
      const C = 2 * Math.PI * 52;
      const fg = $('.fg'); fg.setAttribute('stroke-dasharray', `${C * pct / 100} ${C}`); fg.setAttribute('stroke', pct > 90 ? '#cf3f35' : pct > 75 ? '#b87410' : '#0e7c66');
      $('.freeTxt').textContent = fill(L.free, Math.round(476 * (1 - pct / 100)));
      $('.rm-warn').style.opacity = seg(t, 2.6, 3);
      // S2 scan
      show(1, t);
      const sp = ease(seg(t, 4.3, 7.6));
      $('.sf').textContent = nf(1523411 * sp, lang);
      $('.ss').textContent = (461 * sp).toFixed(0) + ' GB';
      $('.st').textContent = Math.round(sp * 96) + 's';
      $('.sb').style.width = (sp * 100) + '%';
      const paths = ['C:\\Users\\you\\AppData\\Local\\NVIDIA\\DXCache', 'C:\\Program Files\\Steam\\steamapps\\common', 'C:\\Users\\you\\Videos\\Projects', 'C:\\ProgramData\\Docker\\wsl', 'C:\\Windows\\SoftwareDistribution\\Download'];
      $('.sp').textContent = paths[Math.min(paths.length - 1, Math.floor(sp * paths.length))];
      // S3 treemap
      show(2, t);
      $$('.rm-box').forEach((b, i) => {
        const p = back(seg(t, 8.3 + i * 0.12, 8.9 + i * 0.12));
        b.style.transform = `scale(${clamp(p, 0, 1.2)})`;
        b.style.opacity = clamp(seg(t, 8.3 + i * 0.12, 8.6 + i * 0.12));
        const hot = (i === 0 || i === 2) && t > 10.2;
        b.classList.toggle('hot', hot);
        b.style.filter = t > 10.2 && !(i === 0 || i === 2) ? 'saturate(.4) brightness(.85)' : '';
      });
      // S4 cleanup
      show(3, t);
      let freed = 0;
      $$('.rm-row').forEach((r, i) => {
        const at = 12.9 + i * 0.6;
        const on = t >= at;
        r.querySelector('.rm-check').classList.toggle('on', on);
        r.querySelector('.rm-check').style.transform = `scale(${on ? clamp(back(seg(t, at, at + 0.3)), 0, 1.25) : 1})`;
        freed += CLEAN[i] * ease(seg(t, at, at + 0.9));
        r.style.opacity = clamp(seg(t, 12.2 + i * 0.1, 12.6 + i * 0.1));
      });
      $('.ct').textContent = '+' + freed.toFixed(1) + ' GB';
      // S5 move folder C: -> D:
      show(4, t);
      const mp = ease(seg(t, 17.3, 18.6));
      const fx = 20 + mp * 440, fy = 90;
      Object.assign($('.mf').style, { left: fx + 'px', top: fy + 'px' });
      const lp = seg(t, 18.6, 19.2);
      Object.assign($('.rm-link').style, { left: '150px', top: '190px', width: (lp * 440) + 'px', opacity: lp > 0 ? 1 : 0 });
      Object.assign($('.rm-junction').style, { left: '20px', top: '210px', opacity: seg(t, 18.9, 19.3) });
      // S6 memory: 92% in use, "Free up memory" pressed, drops to 61%, then "Ready to play"
      show(5, t);
      const press = seg(t, 21.6, 21.9);
      const mp2 = ease(seg(t, 21.9, 23.1));
      const mpc = Math.round(92 - mp2 * 31);
      const mfg = $('.mfg'); mfg.setAttribute('stroke-dasharray', `${C * mpc / 100} ${C}`); mfg.setAttribute('stroke', mpc > 85 ? '#cf3f35' : mpc > 75 ? '#b87410' : '#0e7c66');
      $('.mpct').textContent = mpc + '%';
      $('.mused').textContent = (16 * mpc / 100).toFixed(1) + ' / 16 GB';
      $('.mbtn').style.transform = `scale(${1 - Math.sin(press * Math.PI) * 0.08})`;
      $('.mbtn').classList.toggle('done', t > 23.1);
      $$('.rm-app').forEach((a, i) => { a.style.opacity = clamp(seg(t, 20.5 + i * 0.15, 20.9 + i * 0.15)); a.querySelector('i').style.transform = `scaleX(${1 - mp2 * [0.45, 0.35, 0.3][i]})`; });
      const rd = seg(t, 23.4, 23.8); $('.rm-ready').style.opacity = rd; $('.rm-ready').style.transform = `scale(${clamp(back(rd), 0, 1.2)})`;
      // S7 end card
      const eo = seg(t, 25.6, 26.4);
      const end = $('.rm-end'); end.style.opacity = eo; end.style.transform = `translateY(${(1 - ease(eo)) * 20}px)`;
      const gain = (14.2 + 3.9 + 4.1 + 1.4 + 9.5) * ease(seg(t, 26.2, 27.6));
      $('.gain').textContent = fill(L.gain, gain.toFixed(1));
      $('.gain').style.opacity = seg(t, 26.2, 26.6);
      // caption
      const si = S.findIndex(([a, b]) => t >= a && t < b);
      const cap = $('.rm-cap');
      const [a, b] = S[si < 0 ? S.length - 1 : si];
      cap.textContent = L.cap[si < 0 ? 6 : si] || '';
      cap.style.opacity = Math.min(seg(t, a + 0.2, a + 0.6), 1 - seg(t, b - 0.4, b));
      // progress bar
      $('.rm-prog i').style.width = (t / DURATION * 100) + '%';
    }

    // scale the 1280×720 stage to the element width
    const fit = () => { stage.style.transform = `scale(${el.clientWidth / 1280})`; };
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fit).observe(el);
    fit();

    // playback
    let playing = false, t0 = 0, raf = 0;
    const PLAY = '<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>', PAUSE = '<svg viewBox="0 0 16 16"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';
    const loop = (now) => { if (!playing) return; let t = (now - t0) / 1000; if (t >= DURATION) { t0 = now; t = 0; } render(t); raf = requestAnimationFrame(loop); };
    function play() { if (playing) return; playing = true; el.classList.remove('paused'); $('.pp').innerHTML = PAUSE; t0 = performance.now() - cur * 1000; raf = requestAnimationFrame(loop); }
    function pause() { playing = false; cancelAnimationFrame(raf); el.classList.add('paused'); $('.pp').innerHTML = PLAY; }
    $('.pp').onclick = () => (playing ? pause() : play());
    $('.rm-prog').onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); cur = clamp((e.clientX - r.left) / r.width) * DURATION; t0 = performance.now() - cur * 1000; render(cur); };
    $('.pp').innerHTML = PLAY;

    setLang(lang);
    const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (opts.record) render(0);
    else if (reduced) { render(27.8); pause(); }               // still image of the end result
    else if (opts.autoplay !== false) play(); else { render(0); pause(); }
    // pause when scrolled out of view (saves battery)
    if (!opts.record && typeof IntersectionObserver !== 'undefined') new IntersectionObserver(([e]) => { if (!e.isIntersecting && playing) { pause(); el.dataset.auto = '1'; } else if (e.isIntersecting && el.dataset.auto) { delete el.dataset.auto; play(); } }, { threshold: 0.2 }).observe(el);
    return { render, play, pause, setLang, DURATION };
  }
  root.RoomyMotion = { mount, DURATION };
})(typeof window !== 'undefined' ? window : this);
