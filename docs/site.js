'use strict';
/* global ROOMY_SITE, RoomyMotion */
// Roomy landing page: English is in the HTML (main language); Thai below (same data-i18n keys). Prices/links come from config.js.
(() => {
  const C = window.ROOMY_SITE;
  const PAD = C.paddle[C.paddle.environment] || C.paddle.sandbox;     // the active Paddle set (sandbox or production)
  const TH_TEXT = {
    "foot.terms": "ข้อกำหนด",
    "foot.privacy": "ความเป็นส่วนตัว",
    "foot.refund": "การคืนเงิน",
    "foot.contact": "ติดต่อ",
    "nav.features": "ฟีเจอร์",
    "nav.pricing": "ราคา",
    "nav.faq": "คำถาม",
    "cta.download": "ดาวน์โหลดฟรี",
    "hero.eyebrow": "สำหรับ Windows 10 และ 11",
    "hero.title": "เครื่องเร็วขึ้น ที่ว่างเพิ่ม ในไม่กี่คลิก",
    "hero.lead": "Roomy คืนหน่วยความจำ เตรียมเครื่องเล่นเกม พักโปรแกรมเบื้องหลัง อัปเดตโปรแกรม และล้างไฟล์ขยะหลายกิกะไบต์อย่างปลอดภัย ทุกอย่างที่จะเปลี่ยน ถามก่อนเสมอ",
    "n1.t": "คืนหน่วยความจำ",
    "n1.d": "ดูว่าแอปและแท็บเบราว์เซอร์ไหนใช้ RAM แล้วคืนหน่วยความจำในคลิกเดียว โดยไม่ปิดอะไร Pro คืนให้เองเมื่อ RAM สูงนาน",
    "n2.t": "โหมดเกม",
    "n2.d": "แตะเดียวคืนหน่วยความจำ เปลี่ยนเป็นพลังงานเต็มที่ และปิดแอปที่คุณเลือก หาเกมจาก Steam, Epic, Riot, Xbox และตรวจ ping",
    "n3.t": "เพิ่มประสิทธิภาพ",
    "n3.d": "พักโปรแกรมและบริการเบื้องหลังที่ไม่ค่อยได้ใช้ และปิดโปรแกรมที่เปิดเองตอนเริ่มเครื่อง ปลุกกลับได้ทุกเมื่อ",
    "n4.t": "อัปเดตโปรแกรม",
    "n4.d": "หาโปรแกรมที่ตกรุ่นแล้วอัปเดตแบบเงียบจากผู้พัฒนาแต่ละราย ผ่านตัวจัดการแพ็กเกจที่มากับ Windows",
    "n5.t": "ตรวจสุขภาพและข้อมูลเชิงลึก",
    "n5.d": "คะแนนสุขภาพเครื่องพร้อมคำแนะนำ ประวัติหน่วยความจำและพื้นที่ และการตรวจเบื้องหลังที่เตือนเมื่อขยะเยอะ โดยไม่มีโปรแกรมค้าง",
    "n6.t": "ล้างแบบเลือกเองและความเป็นส่วนตัว",
    "n6.d": "เลือกได้เองว่าจะล้างอะไร: ประวัติเว็บ คุกกี้ แท็บเก่า ไฟล์ล่าสุด คลิปบอร์ด แคช DNS และ log ของ Windows",
    "p.monthly": "Pro รายเดือน",
    "p.mnote": "ทดลองฟรี 7 วันในโปรแกรมก่อน · ยกเลิกได้ทุกเมื่อ",
    "p.save": "ประหยัด 58%",
    "p.y1": "ทุกอย่างใน Pro รายเดือน",
    "p.y2": "จ่ายปีละครั้ง ยกเลิกได้ทุกเมื่อ",
    "p.y3": "ใช้ในเครื่องคุณ และย้ายไปเครื่องใหม่ได้",
    "p.lnote": "ไม่ต้องสมัครสมาชิก",
    "p.f0": "หน้าหลัก ตรวจสุขภาพเครื่อง โหมดเกม",
    "q7": "ยกเลิกรายเดือนหรือรายปีได้ไหม",
    "a7": "ได้ทุกเมื่อ จากลิงก์ในอีเมลใบเสร็จ Pro ใช้ได้จนครบรอบที่จ่ายไว้ แล้ว Roomy จะกลับเป็นเวอร์ชันฟรี ไม่มีอะไรเสีย โฟลเดอร์ที่ย้ายไว้ยังใช้งานได้",
    "q8": "คืนหน่วยความจำหรือพักโปรแกรม จะทำให้อะไรเสียไหม",
    "a8": "ไม่ การคืนหน่วยความจำไม่ได้ปิดแอปใด ๆ Windows จะคืนให้แต่ละแอปเท่าที่ต้องใช้ ส่วนการพักแค่ไม่ให้โปรแกรมเปิดเองเท่านั้น ไม่ได้ถอนการติดตั้ง และปลุกกลับได้ทุกเมื่อ",
    "cta.pricing": "ดูราคา Pro",
    "hero.trial": "ทดลอง Pro ครบทุกฟีเจอร์ฟรี 7 วัน · ไม่ต้องใส่บัตร",
    "trust.ask": "ถามก่อนลบทุกครั้ง",
    "trust.files": "ไม่แตะไฟล์งาน รูป และเอกสาร",
    "trust.bg": "ไม่มีโปรแกรมค้างในเบื้องหลัง",
    "trust.privacy": "ไม่เก็บหรือส่งข้อมูลไฟล์ของคุณ",
    "feat.title": "ครบทุกอย่างให้เครื่องเร็วและมีที่ว่าง",
    "feat.lead": "ความเร็ว พื้นที่ และความปลอดภัย ในแอปเดียวที่ใช้ง่าย Roomy บอกก่อนเสมอว่าแต่ละอย่างจะทำอะไร และไม่มีโปรแกรมค้างในเบื้องหลัง",
    "f1.t": "แผนที่พื้นที่",
    "f1.d": "เห็นทั้งไดรฟ์เป็นกล่อง กล่องยิ่งใหญ่ยิ่งกินที่ คลิกเจาะลึกลงไปได้ทันที สแกนล้านไฟล์ในไม่กี่นาที",
    "f2.t": "ล้างแคชอย่างปลอดภัย",
    "f2.d": "Windows เบราว์เซอร์ การ์ดจอ แอป เกม และเครื่องมือนักพัฒนา ล้างเฉพาะที่สร้างใหม่ได้ และข้ามโปรแกรมที่เปิดอยู่",
    "f3.t": "ย้ายโฟลเดอร์ไปไดรฟ์อื่น",
    "f3.d": "ย้ายโฟลเดอร์ใหญ่ไป D: แล้วทิ้งทางลัดไว้ที่เดิม โปรแกรมยังหาเจอ ตรวจครบทุกไบต์ และย้ายกลับได้ทุกเมื่อ",
    "f4.t": "ไฟล์ซ้ำและไฟล์เก่า",
    "f4.d": "หาไฟล์ที่เนื้อหาเหมือนกันทุกไบต์ และไฟล์ใหญ่ที่ไม่ได้แตะมานาน ไม่ดาวน์โหลดไฟล์บน OneDrive โดยไม่ตั้งใจ",
    "f5.t": "ย่อดิสก์ Docker / WSL",
    "f5.d": "ไฟล์ .vhdx ที่บวมขึ้นเรื่อย ๆ ไม่หดคืนเอง Roomy บีบให้เหลือเท่าข้อมูลจริง ข้อมูลข้างในไม่หาย",
    "f6.t": "ดูแลอัตโนมัติ",
    "f6.d": "ตั้งรอบไว้ครั้งเดียว Windows ทำให้เอง ไม่มีโปรแกรมค้างในเบื้องหลัง ระหว่างรอใช้หน่วยความจำ 0 MB",
    "how.title": "สามขั้นตอน จบในไม่กี่นาที",
    "how.1t": "สแกน",
    "how.1d": "เลือกไดรฟ์แล้วกดสแกน ไดรฟ์ C ส่วนใหญ่ใช้ 1–3 นาที",
    "how.2t": "ดู",
    "how.2d": "แผนที่บอกทันทีว่าโฟลเดอร์ไหนใหญ่ และอะไรล้างได้อย่างปลอดภัย",
    "how.3t": "คืนพื้นที่",
    "how.3d": "ล้าง ย้าย หรือย่อ ด้วยการยืนยันที่อ่านเข้าใจง่ายทุกครั้ง",
    "price.title": "เริ่มฟรี อัปเกรดเมื่อพร้อม",
    "price.lead": "เวอร์ชันฟรีบอกได้ว่า Pro จะคืนพื้นที่ในเครื่องคุณได้อีกเท่าไร วัดจากเครื่องจริง ก่อนตัดสินใจซื้อ",
    "p.free": "ฟรี",
    "p.f1": "คืนหน่วยความจำวันละ 3 ครั้ง จัดการโปรแกรมเริ่มต้น",
    "p.f2": "ล้างแบบเลือกเอง: Windows เบราว์เซอร์ ความเป็นส่วนตัว",
    "p.f3": "แผนที่พื้นที่ ไฟล์ใหญ่ โปรแกรมที่ติดตั้ง",
    "p.f4": "อัปเดตโปรแกรม (ทีละโปรแกรม)",
    "p.yearly": "Pro รายปี",
    "p.p0": "ทุกอย่างในเวอร์ชันฟรี",
    "p.p1": "คืนหน่วยความจำไม่จำกัด และคืนเองอัตโนมัติ",
    "p.p2": "เล่นเกมแบบเร่งเครื่อง พักโปรแกรมได้ไม่จำกัด",
    "p.p3": "ล้างแคชแอป เกม และเครื่องมือนักพัฒนา",
    "p.p4": "ย้ายโฟลเดอร์ ย่อดิสก์ Docker/WSL",
    "p.p5": "ล้างตามรอบเวลา อัปเดตทั้งหมด ประวัติ 7 วัน",
    "cta.buy": "ซื้อ Pro",
    "p.best": "คุ้มที่สุด",
    "p.lifetime": "Pro ตลอดชีพ",
    "p.once": "จ่ายครั้งเดียว",
    "p.l1": "ทุกฟีเจอร์ Pro ใช้ได้ตลอดไป",
    "p.l2": "อัปเดตเวอร์ชันใหม่ฟรี",
    "p.l3": "ย้ายไปเครื่องใหม่ได้",
    "price.note": "ทดลองทุกฟีเจอร์ Pro ฟรี 7 วันในโปรแกรม ไม่ต้องใส่บัตร รายเดือนและรายปีต่ออายุอัตโนมัติจนกว่าจะยกเลิก",
    "faq.title": "คำถามที่พบบ่อย",
    "q1": "ปลอดภัยไหม จะลบไฟล์สำคัญหรือเปล่า",
    "a1": "Roomy ลบเฉพาะแคชและไฟล์ชั่วคราวที่ Windows และโปรแกรมสร้างใหม่ได้เอง ข้ามไฟล์ที่เปิดใช้อยู่ ไม่แตะเอกสาร รูป หรือไฟล์งาน และถามยืนยันก่อนทุกครั้ง ไฟล์ที่คุณเลือกลบเองจะไปที่ถังขยะ กู้คืนได้",
    "q2": "ทดลองครบ 7 วันแล้วเกิดอะไรขึ้น",
    "a2": "Roomy กลับเป็นเวอร์ชันฟรีเอง ไม่มีการตัดเงิน และไม่ต้องใส่บัตรตั้งแต่แรก โฟลเดอร์ที่ย้ายไปแล้วยังใช้งานได้ และย้ายกลับได้เสมอ",
    "q3": "ซื้อแล้วใช้งานอย่างไร",
    "a3": "หลังชำระเงิน คุณจะได้ license key ทันทีบนหน้าจอ เปิด Roomy กดปุ่ม Pro ที่มุมซ้ายล่าง แล้ววาง key จบ",
    "q4": "เปลี่ยนเครื่องใหม่ได้ไหม",
    "a4": "ได้ ถอด license ออกจากเครื่องเก่าในหน้า Pro แล้วใส่ key เดิมในเครื่องใหม่",
    "q5": "Windows ขึ้นเตือน \"Windows protected your PC\"",
    "a5": "Roomy ยังเป็นโปรแกรมใหม่ Windows SmartScreen จึงอาจเตือน ให้กด More info แล้ว Run anyway ตัวติดตั้งดาวน์โหลดจากหน้า GitHub ของ Roomy โดยตรง",
    "q6": "ต้องใช้ Windows รุ่นไหน",
    "a6": "Windows 10 และ 11 แบบ 64 บิต ติดตั้งได้ทั้งสำหรับตัวเองหรือทุกคนในเครื่อง",
    "final.title": "ให้ไดรฟ์ของคุณกลับมามีที่ว่าง",
    "final.note": "Windows 10/11 · ฟรี · ทดลอง Pro 7 วัน · ไทยและอังกฤษ",
    "foot.releases": "ประวัติเวอร์ชัน",
  };
  // strings used only by this script (not in the HTML)
  const EXTRA = {
    en: { 'cta.soon': 'Coming soon', 'price.pay': 'Pay by card or PromptPay · Your key appears right after payment', 'price.payPaddle': 'Pay by card or PayPal, taxes included · Your key appears right after payment' },
    th: { 'cta.soon': 'เร็ว ๆ นี้', 'price.pay': 'ชำระด้วยบัตรหรือ PromptPay · ได้ key ทันทีหลังชำระเงิน', 'price.payPaddle': 'ชำระด้วยบัตรหรือ PayPal รวมภาษีแล้ว · ได้ key ทันทีหลังชำระเงิน' },
  };
  // Paddle.js checkout (only loaded when the site is set to Paddle). After payment -> the Worker's /thanks shows the key.
  let paddleLoading = null;
  function loadPaddle() {
    if (window.Paddle) return Promise.resolve(window.Paddle);
    if (!paddleLoading) paddleLoading = new Promise((ok, bad) => {
      const s = document.createElement('script'); s.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      s.onload = () => {
        if (C.paddle.environment !== 'production') window.Paddle.Environment.set('sandbox');
        window.Paddle.Initialize({ token: PAD.clientToken, eventCallback: (ev) => {
          if (ev.name === 'checkout.completed' && ev.data && ev.data.transaction_id) location.href = `${C.shopUrl.replace(/\/$/, '')}/thanks?txn=${ev.data.transaction_id}&lang=${lang}`;
        } });
        ok(window.Paddle);
      };
      s.onerror = bad; document.head.appendChild(s);
    });
    return paddleLoading;
  }
  async function paddleCheckout(plan) {
    const P = await loadPaddle();
    P.Checkout.open({ items: [{ priceId: PAD.prices[plan], quantity: 1 }], customData: { plan, lang }, settings: { locale: lang, displayMode: 'overlay', theme: 'light' } });
  }
  const META = {
    th: { title: 'Roomy — ให้ Windows เร็วและมีที่ว่าง' },
    en: { title: 'Roomy — Keep your Windows PC fast and roomy' },
  };
  // English is the main language; Thai only when the visitor picks it (remembered)
  let lang = 'en';
  try { lang = localStorage.getItem('roomy.lang') === 'th' ? 'th' : 'en'; } catch { /* */ }
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  nodes.forEach((n) => { n.dataset.en = n.textContent; });
  const text = (k, node) => (lang === 'th' ? TH_TEXT[k] : node ? node.dataset.en : null) || (node ? node.dataset.en : '');
  const tr = (k) => EXTRA[lang][k] || '';

  function apply() {
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    nodes.forEach((n) => { n.textContent = text(n.dataset.i18n, n); });
    document.querySelectorAll('[data-price]').forEach((n) => { n.textContent = C.prices[lang][n.dataset.price] || ''; });
    document.querySelectorAll('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang));
    // buy buttons: Stripe -> the Worker's /buy; Paddle -> Paddle.js overlay here; nothing set up -> "coming soon"
    const shop = C.shopUrl && C.shopUrl.replace(/\/$/, '');
    const paddleReady = C.payment === 'paddle' && PAD.clientToken && shop;
    document.querySelectorAll('.buy').forEach((b) => {
      if (paddleReady && PAD.prices[b.dataset.plan]) { b.href = '#pricing'; b.onclick = (e) => { e.preventDefault(); paddleCheckout(b.dataset.plan); }; b.textContent = text('cta.buy', b); b.removeAttribute('aria-disabled'); }
      else if (C.payment !== 'paddle' && shop) { b.href = `${shop}/buy?plan=${b.dataset.plan}&lang=${lang}`; b.onclick = null; b.textContent = text('cta.buy', b); b.removeAttribute('aria-disabled'); }
      else { b.removeAttribute('href'); b.onclick = null; b.textContent = tr('cta.soon'); b.setAttribute('aria-disabled', 'true'); }
    });
    if (shop) { const n = document.getElementById('payNote'); n.textContent = text('price.note', n) + ' · ' + tr(C.payment === 'paddle' ? 'price.payPaddle' : 'price.pay'); }
    if (motion) motion.setLang(lang);
  }
  document.querySelectorAll('.dl').forEach((a) => { a.href = C.downloadUrl; });
  document.querySelectorAll('.lang button').forEach((b) => b.onclick = () => { lang = b.dataset.lang; try { localStorage.setItem('roomy.lang', lang); } catch { /* */ } apply(); });

  const motion = RoomyMotion.mount(document.getElementById('motion'), { lang });
  RoomyMotion.instance = motion;                       // handy for seeking in the browser console
  apply();

  // reveal on scroll (respects reduced motion via CSS)
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.feat, .steps li, .plan, details').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
})();
