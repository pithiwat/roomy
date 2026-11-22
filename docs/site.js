'use strict';
/* global ROOMY_SITE, RoomyMotion */
// Roomy landing page: English is in the HTML (main language); Thai below (same data-i18n keys). Prices/links come from config.js.
(() => {
  const C = window.ROOMY_SITE;
  const TH_TEXT = {
    "nav.features": "ฟีเจอร์",
    "nav.pricing": "ราคา",
    "nav.faq": "คำถาม",
    "cta.download": "ดาวน์โหลดฟรี",
    "hero.eyebrow": "สำหรับ Windows 10 และ 11",
    "hero.title": "ไดรฟ์ C เต็ม? คืนพื้นที่ได้ในไม่กี่คลิก",
    "hero.lead": "Roomy สแกนทั้งไดรฟ์ แสดงให้เห็นว่าอะไรกินพื้นที่ แล้วช่วยล้าง ย้าย และย่อขนาดอย่างปลอดภัย ทุกอย่างที่จะลบ ถามก่อนเสมอ",
    "cta.pricing": "ดูราคา Pro",
    "hero.trial": "ทดลอง Pro ครบทุกฟีเจอร์ฟรี 7 วัน · ไม่ต้องใส่บัตร",
    "trust.ask": "ถามก่อนลบทุกครั้ง",
    "trust.files": "ไม่แตะไฟล์งาน รูป และเอกสาร",
    "trust.bg": "ไม่มีโปรแกรมค้างในเบื้องหลัง",
    "trust.privacy": "ไม่เก็บหรือส่งข้อมูลไฟล์ของคุณ",
    "feat.title": "ทุกอย่างที่ต้องใช้ เพื่อให้ไดรฟ์กลับมาโล่ง",
    "feat.lead": "ไม่ต้องเดาว่าอะไรลบได้ Roomy รู้ว่าแคชไหนสร้างใหม่ได้เอง และบอกทุกครั้งว่าจะได้พื้นที่คืนเท่าไร",
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
    "p.f1": "สแกนและแผนที่พื้นที่ทุกไดรฟ์",
    "p.f2": "ล้างแคช Windows เบราว์เซอร์ และการ์ดจอ",
    "p.f3": "ไฟล์ใหญ่ ประเภทไฟล์ และโปรแกรมที่ติดตั้ง",
    "p.f4": "ไฟล์ซ้ำ/ไฟล์เก่า (5 รายการแรก)",
    "p.yearly": "Pro รายปี",
    "p.p0": "ทุกอย่างในเวอร์ชันฟรี",
    "p.p1": "ล้างแคชแอป เกม และเครื่องมือนักพัฒนา",
    "p.p2": "ย้ายโฟลเดอร์ไปไดรฟ์อื่น",
    "p.p3": "ย่อดิสก์ Docker/WSL และบีบอัดโฟลเดอร์",
    "p.p4": "ดูแลอัตโนมัติ และอัปเดตไดรเวอร์",
    "p.p5": "ไม่ต่ออายุอัตโนมัติ ไม่มีการตัดเงินซ้ำ",
    "cta.buy": "ซื้อ Pro",
    "p.best": "คุ้มที่สุด",
    "p.lifetime": "Pro ตลอดชีพ",
    "p.once": "จ่ายครั้งเดียว",
    "p.l1": "ทุกฟีเจอร์ Pro ใช้ได้ตลอดไป",
    "p.l2": "อัปเดตเวอร์ชันใหม่ฟรี",
    "p.l3": "ย้ายไปเครื่องใหม่ได้",
    "price.note": "ทุกแผนทดลอง Pro ฟรี 7 วันได้ในโปรแกรมก่อนซื้อ",
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
    "final.note": "Windows 10/11 · ฟรี · ทดลอง Pro 7 วัน",
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
        window.Paddle.Initialize({ token: C.paddle.clientToken, eventCallback: (ev) => {
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
    P.Checkout.open({ items: [{ priceId: C.paddle.prices[plan], quantity: 1 }], customData: { plan, lang }, settings: { locale: lang, displayMode: 'overlay', theme: 'light' } });
  }
  const META = {
    th: { title: 'Roomy — คืนพื้นที่ให้ Windows อย่างปลอดภัย' },
    en: { title: 'Roomy — Free up space on Windows, safely' },
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
    const paddleReady = C.payment === 'paddle' && C.paddle.clientToken && shop;
    document.querySelectorAll('.buy').forEach((b) => {
      if (paddleReady && C.paddle.prices[b.dataset.plan]) { b.href = '#pricing'; b.onclick = (e) => { e.preventDefault(); paddleCheckout(b.dataset.plan); }; b.textContent = text('cta.buy', b); b.removeAttribute('aria-disabled'); }
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
