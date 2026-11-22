// Roomy website settings — the only file to edit for prices, links and checkout.
window.ROOMY_SITE = {
  version: '1.0.0',
  // the newest installer (GitHub keeps this link pointing at the latest published release)
  downloadUrl: 'https://github.com/pithiwat/roomy/releases/latest',
  // Cloudflare Worker that sells Pro (worker/). Empty = buy buttons show "coming soon".
  // After `npx wrangler deploy` put the URL here, e.g. 'https://roomy-shop.<your-subdomain>.workers.dev'
  shopUrl: '',
  // Which checkout the buy buttons use: 'stripe' (Worker /buy, card + PromptPay) or 'paddle' (Paddle.js overlay on this page)
  payment: 'stripe',
  paddle: { environment: 'sandbox', clientToken: '', prices: { lifetime: '', yearly: '' } },
  prices: {
    th: { free: '฿0', lifetime: '฿590', yearly: '฿290', yearlyNote: '/ปี' },
    en: { free: '$0', lifetime: '$19', yearly: '$9', yearlyNote: '/year' },
  },
  trialDays: 7,
};
