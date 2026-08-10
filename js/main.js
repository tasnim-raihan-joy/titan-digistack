/* ============================================================
   Titan DigiStack — main.js
   - Product catalog (single source of truth)
   - Grid rendering per category
   - Tab interactions, sticky header shadow
   - Scroll reveal, mobile nav, footer year
   ============================================================ */

/* -----------------------------
   Configurable contact endpoints
   Update these for "Call for Price" CTAs.
   ----------------------------- */
window.TITAN_CONFIG = {
  whatsappNumber: '8801700000000', // E.164 without + ; opens via wa.me/<number>
  contactEmail:   'hello@titandigistack.com',
};

/* -----------------------------
   Catalog
   - Each item: { id, title, price, currency, badge?, category, image? }
   - price === null (or 'call') => "Call for Price"
   - All prices are BDT (৳) per the spec.
   ----------------------------- */
const PRODUCTS = [
  /* ----- WordPress Themes ----- */
  { id: 'th-001', title: 'Digital Product Selling Website Template', price: 0,    badge: 'free', category: 'themes' },
  { id: 'th-002', title: 'KitNinja – Ultimate Ecommerce Template',   price: null, badge: 'call', category: 'themes' },
  { id: 'th-003', title: '100+ Bangla Landing Page Templates',       price: 100,  badge: 'new',  category: 'themes' },
  { id: 'th-004', title: '1000+ Elementor Landing Page Templates',   price: 150,                category: 'themes' },
  { id: 'th-005', title: 'Astra Pro WP Theme',                       price: 450,                category: 'themes' },
  { id: 'th-006', title: 'GeneratePress Premium',                    price: 450,  priceMax: 750, category: 'themes' },
  { id: 'th-007', title: 'Rishi Theme Agency Pack Lifetime',         price: 600,                category: 'themes' },
  { id: 'th-008', title: 'OceanWP Theme Premium',                    price: 600,                category: 'themes' },
  { id: 'th-009', title: 'Divi WordPress Theme',                     price: 650,                category: 'themes' },
  { id: 'th-010', title: 'Zakra Theme Lifetime',                     price: 660,                category: 'themes' },
  { id: 'th-011', title: 'Kadence Theme',                            price: 720,                category: 'themes' },
  { id: 'th-012', title: 'XStore WordPress Theme',                   price: 780,                category: 'themes' },
  { id: 'th-013', title: 'Woodmart WordPress Theme',                 price: 960,                category: 'themes' },
  { id: 'th-014', title: 'GPL WordPress Theme & Plugin Membership',  price: 1050, badge: 'sale', category: 'themes' },
  { id: 'th-015', title: 'Woostify Theme Lifetime',                  price: 1250,               category: 'themes' },

  /* ----- WordPress Plugins ----- */
  { id: 'pl-001', title: 'ACF Pro',                                    price: 450,   category: 'plugins' },
  { id: 'pl-002', title: 'All-in-One WP Migration Unlimited',          price: 120,   category: 'plugins' },
  { id: 'pl-003', title: 'bKash Sandbox API Test Plugin',              price: 0,     badge: 'free', category: 'plugins' },
  { id: 'pl-004', title: 'Cartflows Pro License',                      price: 750,   category: 'plugins' },
  { id: 'pl-005', title: 'Elementor Agency One Plan',                  price: 450,   category: 'plugins' },
  { id: 'pl-006', title: 'Elementor Pro',                              price: 450,   badge: 'sale', category: 'plugins' },
  { id: 'pl-007', title: 'ElementsKit Premium',                        price: 720,   category: 'plugins' },
  { id: 'pl-008', title: 'EWWW Image Optimizer',                       price: 950,   category: 'plugins' },
  { id: 'pl-009', title: 'Happy Addons for Elementor',                 price: 750,   category: 'plugins' },
  { id: 'pl-010', title: 'Hide My WP Ghost',                           price: 1600,  category: 'plugins' },
  { id: 'pl-011', title: 'Imagify API Image Optimization',             price: 660,   category: 'plugins' },
  { id: 'pl-012', title: 'JetFormBuilder PRO',                         price: 600,   category: 'plugins' },
  { id: 'pl-013', title: 'JetPlugins by Crocoblock',                   price: 700,   category: 'plugins' },
  { id: 'pl-014', title: 'Ninja Tables',                               price: null,  badge: 'call', category: 'plugins' },
  { id: 'pl-015', title: 'Perfmatters Plugin',                         price: 480,   category: 'plugins' },
  { id: 'pl-016', title: 'Piotnet Addons For Elementor',               price: 400,   category: 'plugins' },
  { id: 'pl-017', title: 'PixelYourSite Pro',                          price: 1750,  category: 'plugins' },
  { id: 'pl-018', title: 'PowerPack Addons for Elementor',             price: 360,   category: 'plugins' },
  { id: 'pl-019', title: 'Premium Addons Pro for Elementor',           price: 360,   category: 'plugins' },
  { id: 'pl-020', title: 'Rank Math Pro',                              price: 650,   badge: 'new', category: 'plugins' },
  { id: 'pl-021', title: 'Royal Elementor Addons',                     price: 3600,  category: 'plugins' },
  { id: 'pl-022', title: 'ShopEngine – WooCommerce Builder',           price: 480,   category: 'plugins' },
  { id: 'pl-023', title: 'The Plus Addons For Elementor',              price: 420,   category: 'plugins' },
  { id: 'pl-024', title: 'Tutor LMS',                                  price: 550,   category: 'plugins' },
  { id: 'pl-025', title: 'Unlimited Addons for Elementor',             price: 600,   category: 'plugins' },
  { id: 'pl-026', title: 'WCFM Marketplace',                           price: 840,   category: 'plugins' },
  { id: 'pl-027', title: 'WooLentor Elementor Addon',                  price: 720,   category: 'plugins' },
  { id: 'pl-028', title: 'WP All Import and Export Plugin',            price: 1650,  category: 'plugins' },
  { id: 'pl-029', title: 'WP Encryption SSL Solution',                 price: 720,   category: 'plugins' },
  { id: 'pl-030', title: 'WP Funnels Pro',                             price: 600,   category: 'plugins' },

  /* ----- Graphic Tools ----- */
  { id: 'gr-001', title: '20,000+ PSD & CDR Flyer Templates',          price: 50,    badge: 'sale', category: 'graphic' },
  { id: 'gr-002', title: 'Freepik Official Subscription',              price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-003', title: 'Runway ML Subscription',                     price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-004', title: 'Midjourney AI Subscription',                 price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-005', title: 'Recraft AI Subscription & Credits',          price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-006', title: 'Ideogram AI',                                price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-007', title: 'ElevenLabs Creator Plan',                    price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-008', title: 'Taja AI – Video Content Automation',         price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-009', title: 'HeyGen Official Subscription',               price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-010', title: 'InVideo Official Subscription',              price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-011', title: 'JoggAI – AI Video Generator',                price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-012', title: 'Envato Elements Subscription',               price: 450,   category: 'graphic' },
  { id: 'gr-013', title: 'Filmora 14 Lifetime',                        price: 350,   priceMax: 550, category: 'graphic' },
  { id: 'gr-014', title: 'Adobe Creative Cloud Official',              price: null,  badge: 'call', category: 'graphic' },
  { id: 'gr-015', title: 'CapCut Pro',                                 price: 350,   category: 'graphic' },
  { id: 'gr-016', title: 'Google AI Pro (Gemini Veo 3)',               price: 700,   badge: 'new',  category: 'graphic' },
  { id: 'gr-017', title: 'Canva Premium',                              price: 500,   category: 'graphic' },
  { id: 'gr-018', title: 'Canva Pro',                                  price: 60,    badge: 'sale', category: 'graphic' },
  { id: 'gr-019', title: 'Adobe Master Collection 2025',               price: 99,    badge: 'new',  category: 'graphic' },
  { id: 'gr-020', title: 'Adobe Master Collection 2024',               price: 99,    category: 'graphic' },

  /* ----- AI Tools & Subscriptions ----- */
  { id: 'ai-001', title: 'Higgsfield AI – Video & Image Generator',    price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-002', title: 'Beautiful AI',                               price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-003', title: 'Bolt AI Builder',                            price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-004', title: 'Branalyzer AI – Brand Analysis',             price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-005', title: 'LinkedIn Premium',                           price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-006', title: 'Spotify Premium',                            price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-007', title: 'ChatGPT Go',                                 price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-008', title: 'ChatGPT Plus',                               price: 350,   badge: 'sale', category: 'ai' },
  { id: 'ai-009', title: 'ChatPRD AI',                                 price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-010', title: 'Claude AI and API',                          price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-011', title: 'ClickUp AI',                                 price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-012', title: 'Cloud AI Pro',                               price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-013', title: 'CorelDRAW Subscription',                     price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-014', title: 'Coursera Plus',                              price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-015', title: 'DataCamp Subscription',                      price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-016', title: 'Descript – AI Video Editing',                price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-017', title: 'Devin AI',                                   price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-018', title: 'Duolingo Subscription',                      price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-019', title: 'Figma Professional Plan',                    price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-020', title: 'Fireflies AI',                               price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-021', title: 'FlexClip AI',                                price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-022', title: 'Flutterflow Subscription',                   price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-023', title: 'Foxly URL Shortener',                        price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-024', title: 'Gamma AI – Presentation Builder',            price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-025', title: 'GitHub Pro / Team / Enterprise',             price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-026', title: 'Grammarly Premium',                          price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-027', title: 'Gravitec Push Notifications',                price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-028', title: 'Grok AI SuperGrok',                          price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-029', title: 'Group Buy SEO Tools',                        price: null,  badge: 'call', category: 'ai' },
  { id: 'ai-030', title: 'Gumloop AI Automation',                      price: null,  badge: 'call', category: 'ai' },

  /* ----- Software & Apps ----- */
  { id: 'sw-001', title: 'Truecaller Premium (Android & iOS)',         price: 250,   priceMax: 2150, category: 'software' },
  { id: 'sw-002', title: 'Microsoft Office Professional 2019/2021/2024', price: null, badge: 'call', category: 'software' },
  { id: 'sw-003', title: 'Microsoft Office Professional 2010/2013/2016', price: null, badge: 'call', category: 'software' },
  { id: 'sw-004', title: 'Microsoft Office 365 – Lifetime',            price: 450,   badge: 'sale', category: 'software' },
  { id: 'sw-005', title: 'FastStone Capture – Official License',       price: 10,    category: 'software' },
  { id: 'sw-006', title: 'Fast Screen Recorder – Lifetime',            price: 10,    category: 'software' },
  { id: 'sw-007', title: 'Duplicate Cleaner',                          price: 0,     badge: 'free', category: 'software' },
  { id: 'sw-008', title: 'CamScanner Premium',                         price: 350,   category: 'software' },
  { id: 'sw-009', title: 'Windows 7/8/10/11 Retail Key',               price: 500,   priceMax: 550, category: 'software' },
  { id: 'sw-010', title: 'AutoCAD with Activator & Serial Keys',       price: null,  badge: 'call', category: 'software' },
  { id: 'sw-011', title: 'AnyChat Live Chat Platform',                 price: 850,   category: 'software' },
  { id: 'sw-012', title: '100+ Premium Android Apps Bundle',           price: 0,     badge: 'free', category: 'software' },

  /* ----- Tutorials ----- */
  { id: 'tu-001', title: 'Visa Processing Course',                     price: 0, badge: 'free', category: 'tutorials' },
  { id: 'tu-002', title: 'Advance Logo Design in Adobe Illustrator',   price: 0, badge: 'free', category: 'tutorials' },
  { id: 'tu-003', title: 'Advance Web Development with PHP & Laravel', price: 0, badge: 'free', category: 'tutorials' },
  { id: 'tu-004', title: 'Advance HTML & CSS by UYLab',                price: 0, badge: 'free', category: 'tutorials' },
  { id: 'tu-005', title: 'Advance SEO Course by UY Lab',               price: 0, badge: 'free', category: 'tutorials' },
  { id: 'tu-006', title: 'AI Image Generator Tutorial by UY Lab',      price: 0, badge: 'free', category: 'tutorials' },

  /* ----- Digital Services ----- */
  { id: 'sv-001', title: 'Facebook BIN Number',                        price: 150,    category: 'services' },
  { id: 'sv-002', title: 'Facebook Page Likes, Share & Comment Service', price: null, badge: 'call', category: 'services' },
  { id: 'sv-003', title: 'YouTube Services – Subscribers, Likes, Watch Time', price: 550, category: 'services' },
  { id: 'sv-004', title: 'Digital Marketing Monthly Package',          price: 50000,  category: 'services' },
  { id: 'sv-005', title: 'Professional Web Design Services',           price: 15000,  category: 'services' },
  { id: 'sv-006', title: 'Facebook Page Review',                       price: null,   badge: 'call', category: 'services' },

  /* ----- eBooks & Entertainment ----- */
  { id: 'eb-001', title: '1400+ ChatGPT Prompts Library',                                  price: 0,  badge: 'free', category: 'ebooks' },
  { id: 'eb-002', title: 'গোড়া থেকে ডিজিটাল মার্কেটিং (Gora Theke Digital Marketing)', price: 10, category: 'ebooks' },
  { id: 'eb-003', title: 'Uddoktader Prothom Thikana eBook',                               price: 10, category: 'ebooks' },
  { id: 'eb-004', title: '5K Bangla eBook Bundle Collection',                              price: 99, badge: 'sale', category: 'ebooks' },
  { id: 'eb-005', title: 'Learn English Easily eBooks',                                    price: 0,  badge: 'free', category: 'ebooks' },
  { id: 'eb-006', title: 'Bangla Comics eBook Collection 85+',                             price: 0,  badge: 'free', category: 'ebooks' },
  { id: 'eb-007', title: 'Bangla Islamic Books PDF Collection 1300+',                      price: 0,  badge: 'free', category: 'ebooks' },
  { id: 'eb-008', title: '100+ Muhammed Zafar Iqbal Books PDF',                            price: 25, category: 'ebooks' },
  { id: 'eb-009', title: '200+ Tin Goyenda Books PDF',                                     price: 25, category: 'ebooks' },
  { id: 'eb-010', title: '300+ Masud Rana eBooks PDF',                                     price: 25, category: 'ebooks' },
];

window.PRODUCTS = PRODUCTS;

const CATEGORY_LABELS = {
  themes: 'WordPress Themes',
  plugins: 'WordPress Plugins',
  graphic: 'Graphic Tools',
  ai: 'AI Tools & Subscriptions',
  software: 'Software & Apps',
  tutorials: 'Tutorials',
  services: 'Digital Services',
  ebooks: 'eBooks & Entertainment',
};
window.CATEGORY_LABELS = CATEGORY_LABELS;

/* -----------------------------
   Helpers
   ----------------------------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/**
 * Resolve asset paths so they work from any depth.
 * - index.html              → 'assets/products/...'
 * - pages/shop.html         → '../assets/products/...'
 * Exposed on window so cart.js can use the same logic.
 */
function assetBase() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}
window.assetBase = assetBase;

/**
 * Extension fallback chain: png → jpg → webp
 * Exposed on window so the onerror inline handler can reach it.
 */
window.IMAGE_EXTS = ['png', 'jpg', 'webp'];

window.tryNextImageExt = function (img) {
  const base = img.dataset.imgBase;
  if (!base) { img.remove(); return; }
  const idx = (parseInt(img.dataset.extIdx || '0', 10)) + 1;   // next index
  if (idx >= window.IMAGE_EXTS.length) { img.remove(); return; } // all tried → show placeholder
  img.dataset.extIdx = idx;
  img.src = `${base}.${window.IMAGE_EXTS[idx]}`;
};

/**
 * Returns image config for a product:
 *   { base, src, chain } | null
 *
 *   base  — path WITHOUT extension (used for fallback src swaps)
 *   src   — initial src to set on the <img>
 *   chain — true = use tryNextImageExt on error; false = single-shot (explicit URL)
 *
 * Convention (no product.image set):
 *   Tries assets/products/<id>.png → .jpg → .webp automatically.
 *
 * Override per product in main.js PRODUCTS array:
 *   image: 'assets/products/astra-pro.jpg'  — custom path (single-shot, no chain)
 *   image: 'https://cdn.example.com/x.png' — external URL (single-shot)
 *   image: false                             — force placeholder
 *   imageFit: 'contain'                      — logo/centered fit instead of cover
 */
function imageConfigFor(product) {
  if (product.image === false) return null;

  if (typeof product.image === 'string') {
    const src = (product.image.startsWith('http') || product.image.startsWith('/'))
      ? product.image
      : assetBase() + product.image;
    // Strip known extension to get base — won't match for external CDN URLs that
    // have no extension, so we fall back to using the full URL as the base.
    const base = src.replace(/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i, '');
    return { base, src, chain: false };
  }

  const base = `${assetBase()}assets/products/${product.id}`;
  return { base, src: `${base}.${window.IMAGE_EXTS[0]}`, chain: true };
}
window.imageConfigFor = imageConfigFor;

// Backward-compat alias used by cart.js (returns just the initial src string)
window.defaultImageFor = (p) => { const c = imageConfigFor(p); return c ? c.src : null; };

function formatPrice(p) {
  if (p === null || p === undefined || p === 'call') return null;
  if (p === 0) return 'Free';
  return `৳${p.toLocaleString('en-BD')}`;
}

function priceLabel(product) {
  if (product.price === null) return '📞 Call for Price';
  const lo = formatPrice(product.price);
  if (product.priceMax) return `৳${product.price.toLocaleString('en-BD')}–৳${product.priceMax.toLocaleString('en-BD')}`;
  return lo;
}

/* Generate a deterministic placeholder gradient pair from product id. */
function placeholderColors(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const hue1 = h % 360;
  const hue2 = (hue1 + 40) % 360;
  return [`hsl(${hue1} 60% 22%)`, `hsl(${hue2} 70% 12%)`];
}

function placeholderInitials(title) {
  const words = title.replace(/[^a-z0-9 ]/gi, ' ').trim().split(/\s+/);
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'TD';
}

function callForPriceHref(product) {
  const cfg = window.TITAN_CONFIG;
  const text = encodeURIComponent(`Hi Titan DigiStack, I'd like a price quote for "${product.title}".`);
  return `https://wa.me/${cfg.whatsappNumber}?text=${text}`;
}

/* -----------------------------
   Product card render
   ----------------------------- */
function renderCard(product) {
  const isCall = product.price === null;
  const isFree = product.price === 0;
  const [c1, c2] = placeholderColors(product.id);

  const badgeHtml = (() => {
    if (product.badge === 'free' || isFree) return `<span class="badge badge--free">Free</span>`;
    if (product.badge === 'call' || isCall) return `<span class="badge badge--call">Quote</span>`;
    if (product.badge === 'sale') return `<span class="badge badge--sale">Sale</span>`;
    if (product.badge === 'new')  return `<span class="badge">New</span>`;
    return '';
  })();

  const priceHtml = isCall
    ? `<div class="card-price call-price">📞 Call for Price</div>`
    : `<div class="card-price">${priceLabel(product)}</div>`;

  const ctaHtml = isCall
    ? `<a class="btn-cart call" href="${callForPriceHref(product)}" target="_blank" rel="noopener" aria-label="Get a quote on WhatsApp for ${product.title}">Get Price</a>`
    : `<button class="btn-cart" type="button" data-add-to-cart data-id="${product.id}" aria-label="Add ${product.title} to cart">Add to Cart</button>`;

  const imgCfg   = imageConfigFor(product);
  const fitClass  = product.imageFit === 'contain' ? ' card-image__photo--contain' : '';
  const photoHtml = imgCfg
    ? (() => {
        const errHandler = imgCfg.chain
          ? 'window.tryNextImageExt(this)'
          : 'this.remove()';
        const chainAttrs = imgCfg.chain
          ? `data-img-base="${imgCfg.base}" data-ext-idx="0"`
          : '';
        return `<img class="card-image__photo${fitClass}" src="${imgCfg.src}" alt="${product.title.replace(/"/g, '&quot;')}" loading="lazy" ${chainAttrs} onerror="${errHandler}">`;
      })()
    : '';

  return `
    <article class="product-card reveal" data-id="${product.id}" data-title="${product.title.toLowerCase()}" data-category="${product.category}">
      <div class="card-image" style="--ph-a:${c1};--ph-b:${c2};">
        <div class="placeholder" aria-hidden="true">${placeholderInitials(product.title)}</div>
        ${photoHtml}
        ${badgeHtml}
      </div>
      <div class="card-body">
        <span class="card-cat">${CATEGORY_LABELS[product.category] || ''}</span>
        <h3 class="card-title" title="${product.title}">${product.title}</h3>
        ${priceHtml}
        <div class="card-actions">${ctaHtml}</div>
      </div>
    </article>`;
}

function renderGrid(category) {
  const grid = $(`[data-grid="${category}"]`);
  if (!grid) return;
  const items = PRODUCTS.filter(p => p.category === category);
  grid.innerHTML = items.map(renderCard).join('');
}

/* -----------------------------
   Sticky header shadow
   ----------------------------- */
function initStickyHeader() {
  const header = $('#siteHeader');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* -----------------------------
   Category tabs
   ----------------------------- */
function initCategoryTabs() {
  const tabs = $$('.cat-tab');
  if (!tabs.length) return;

  const sections = tabs
    .map(t => t.getAttribute('href'))
    .filter(h => h && h.startsWith('#'))
    .map(h => document.getElementById(h.slice(1)))
    .filter(Boolean);

  // Click → active state
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });

  // Scroll-spy to highlight current tab
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = '#' + e.target.id;
          tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
  }
}

/* -----------------------------
   Scroll reveal (IntersectionObserver)
   ----------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.06 });

  // Observe sections + cards
  $$('.cat-section, .why__item, .offer-card, .product-card, .section-head').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

/* -----------------------------
   Mobile nav
   ----------------------------- */
function initMobileNav() {
  const nav     = $('#mobileNav');
  const opener  = $('#hamburger');
  const closer  = $('#mobileNavClose');
  if (!nav || !opener) return;

  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden', 'false');
    opener.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    (closer || nav.querySelector('a')).focus();
  };
  const close = () => {
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    opener.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  opener.addEventListener('click', open);
  closer?.addEventListener('click', close);
  nav.addEventListener('click', (e) => { if (e.target.matches('a')) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
  });
}

/* -----------------------------
   Footer year
   ----------------------------- */
function initFooterYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

/* -----------------------------
   Shop page: filters, sort, results
   Activated only when shop markup is present.
   ----------------------------- */
function initShopPage() {
  const root = $('#shopRoot');
  if (!root) return;

  const grid       = $('[data-grid="shop"]', root);
  const countLabel = $('#shopCount', root);
  const sortSelect = $('#shopSort', root);
  const minRange   = $('#priceMin', root);
  const maxRange   = $('#priceMax', root);
  const minOut     = $('#priceMinOut', root);
  const maxOut     = $('#priceMaxOut', root);
  const search     = $('#shopSearch', root);
  const includeCall = $('#includeCall', root);

  // Compute price bounds from real products (excluding "call for price")
  const priced = PRODUCTS.filter(p => typeof p.price === 'number');
  const minPrice = 0;
  const maxPrice = Math.max(...priced.map(p => p.priceMax || p.price), 1000);

  // Init range UI
  minRange.min = maxRange.min = String(minPrice);
  minRange.max = maxRange.max = String(maxPrice);
  minRange.value = String(minPrice);
  maxRange.value = String(maxPrice);
  syncRangeOutputs();

  function syncRangeOutputs() {
    const lo = Math.min(+minRange.value, +maxRange.value);
    const hi = Math.max(+minRange.value, +maxRange.value);
    minOut.textContent = `৳${lo.toLocaleString('en-BD')}`;
    maxOut.textContent = `৳${hi.toLocaleString('en-BD')}`;
  }

  function selectedCategories() {
    return $$('input[name="cat"]:checked', root).map(i => i.value);
  }

  function applyFilters() {
    const cats   = selectedCategories();
    const lo     = Math.min(+minRange.value, +maxRange.value);
    const hi     = Math.max(+minRange.value, +maxRange.value);
    const q      = (search.value || '').toLowerCase().trim();
    const allowCall = includeCall.checked;
    const sort   = sortSelect.value;

    let list = PRODUCTS.slice();

    if (!cats.includes('all')) {
      list = list.filter(p => cats.includes(p.category));
    }

    if (q) list = list.filter(p => p.title.toLowerCase().includes(q));

    list = list.filter(p => {
      if (p.price === null) return allowCall;
      const eff = p.priceMax || p.price;
      return p.price >= lo && eff <= hi;
    });

    switch (sort) {
      case 'price-asc':  list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)); break;
      case 'price-desc': list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1)); break;
      case 'name-asc':   list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'name-desc':  list.sort((a, b) => b.title.localeCompare(a.title)); break;
      default: /* relevance: keep original order */ break;
    }

    if (!list.length) {
      grid.innerHTML = `<div class="shop-empty"><h3>No products match.</h3><p>Try widening your price range or clearing filters.</p></div>`;
    } else {
      grid.innerHTML = list.map(renderCard).join('');
      // Re-trigger reveal
      $$('.product-card', grid).forEach(c => c.classList.add('is-visible'));
    }
    if (countLabel) countLabel.textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
  }

  // Wire up
  $$('input[name="cat"]', root).forEach(input => {
    input.addEventListener('change', () => {
      // "all" is exclusive
      if (input.value === 'all' && input.checked) {
        $$('input[name="cat"]', root).forEach(i => { if (i !== input) i.checked = false; });
      } else if (input.checked) {
        const allBox = $('input[name="cat"][value="all"]', root);
        if (allBox) allBox.checked = false;
      } else if (!$$('input[name="cat"]:checked', root).length) {
        const allBox = $('input[name="cat"][value="all"]', root);
        if (allBox) allBox.checked = true;
      }
      applyFilters();
    });
  });

  [minRange, maxRange].forEach(r => r.addEventListener('input', () => { syncRangeOutputs(); applyFilters(); }));
  search.addEventListener('input', applyFilters);
  includeCall.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  $('#resetFilters', root)?.addEventListener('click', () => {
    $$('input[name="cat"]', root).forEach(i => i.checked = i.value === 'all');
    minRange.value = String(minPrice);
    maxRange.value = String(maxPrice);
    search.value = '';
    includeCall.checked = true;
    sortSelect.value = 'relevance';
    syncRangeOutputs();
    applyFilters();
  });

  // Pre-select category from URL hash, e.g. shop.html#themes
  const hash = window.location.hash.replace('#', '');
  if (hash && CATEGORY_LABELS[hash]) {
    $$('input[name="cat"]', root).forEach(i => i.checked = false);
    const target = $(`input[name="cat"][value="${hash}"]`, root);
    if (target) target.checked = true;
  }

  applyFilters();
}

/* -----------------------------
   Boot
   ----------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Render every category that has a grid in the page
  Object.keys(CATEGORY_LABELS).forEach(renderGrid);

  initStickyHeader();
  initCategoryTabs();
  initScrollReveal();
  initMobileNav();
  initFooterYear();
  initShopPage();

  // Notify other modules products are rendered
  document.dispatchEvent(new CustomEvent('titan:products-rendered'));
});
