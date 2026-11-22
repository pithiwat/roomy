// Roomy website settings — the only file to edit for prices, links and checkout.
window.ROOMY_SITE = {
  version: '1.0.0',
  // the newest installer (GitHub keeps this link pointing at the latest published release)
  downloadUrl: 'https://github.com/pithiwat/roomy/releases/latest',
  // Cloudflare Worker that sells Pro (worker/). Empty = buy buttons show "coming soon".
  // After `npx wrangler deploy` put the URL here, e.g. 'https://roomy-shop.<your-subdomain>.workers.dev'
  shopUrl: 'https://roomy-shop.pithiwat.workers.dev',
  // Which checkout the buy buttons use: 'stripe' (Worker /buy, card + PromptPay) or 'paddle' (Paddle.js overlay on this page)
  payment: 'paddle',
  // Paddle (Catalog > Products > Roomy Pro). Monthly and annual renew automatically; lifetime is one payment.
  // `environment` picks which set is used. Switch to 'production' once the live client-side token is filled in
  // (Developer tools > Authentication > Client-side tokens) and the Worker has PADDLE_ENV = "production".
  paddle: {
    environment: 'sandbox',
    sandbox: { clientToken: '', prices: { monthly: 'pri_01m825frty6r16p3a9ft3gg5ex', yearly: 'pri_01m81t5874k86n5gtjtaytm45e', lifetime: 'pri_01m81t42bn28k9j7ynyb5ddfpg' } },
    production: { clientToken: 'live_31596280246135b93067315eef4', prices: { monthly: 'pri_01m827bwrw525vpmc1bcnccbqg', yearly: 'pri_01m827dxadty3zhcj800jje0gx', lifetime: 'pri_01m827fs5c7nfh1tyrpj0yd6ta' } },
  },
  // Shown on the cards. Paddle charges in the buyer's currency (Thailand = THB price set in Paddle).
  // ~฿34.6 per US$: monthly ฿104 = $2.99, annual ฿519 = $14.99 (save 58% vs monthly), lifetime ฿699 = $19.99
  prices: {
    th: { free: '฿0', monthly: '฿104', monthlyNote: '/เดือน', yearly: '฿519', yearlyNote: '/ปี', yearlyMonth: '≈ ฿43 ต่อเดือน', lifetime: '฿699' },
    en: { free: '$0', monthly: '$2.99', monthlyNote: '/month', yearly: '$14.99', yearlyNote: '/year', yearlyMonth: '≈ $1.25 a month', lifetime: '$19.99' },
  },
  trialDays: 7,
};
