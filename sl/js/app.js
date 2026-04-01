// ══════════════════════════════════════════
// SARIAJI LOGAM — Shared Components & Storage
// ══════════════════════════════════════════

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyqutItsxZizEw2_USYg_RFmZVGRf9oEFj3iTj8cKPbUhBpNfw_kVh-YeAFH-WhfSoH/exec';

// ── DEFAULT DATA ──
const DEFAULT = {
  info: {
    nama:    'Sariaji Logam',
    tagline: 'Bengkel Las & Konstruksi',
    wa:      '6285238929492',
    email:   'sariaji.logam@gmail.com',
    alamat:  'Jl. Raya Sariaji No. 88, Denpasar, Bali',
    jam:     'Senin – Sabtu: 08.00 – 17.00 WIB',
    fb:      '#', ig: '#', yt: '#'
  },
  layanan: [
    { id:1, nama:'Konstruksi Baja',       icon:'🏗️', desc:'Rangka baja untuk gedung, gudang, dan pabrik.',      harga:'Rp 600.000/m²', aktif:true },
    { id:2, nama:'Kanopi & Tenda',        icon:'⛺', desc:'Kanopi baja ringan dan polycarbonate berkualitas.', harga:'Rp 450.000/m²', aktif:true },
    { id:3, nama:'Pagar & Tralis',        icon:'🔒', desc:'Pagar besi berbagai desain, kuat dan estetik.',     harga:'Rp 350.000/m²', aktif:true },
    { id:4, nama:'Rolling Door',          icon:'🚪', desc:'Rolling door manual & elektrik berbagai ukuran.',   harga:'Rp 1.200.000/unit', aktif:true },
    { id:5, nama:'Pintu Harmonika',       icon:'🪗', desc:'Pintu harmonika besi untuk toko dan garasi.',       harga:'Rp 1.500.000/unit', aktif:true },
    { id:6, nama:'Las & Fabrikasi Custom',icon:'⚙️', desc:'Las dan fabrikasi logam sesuai desain khusus.',    harga:'Nego',          aktif:true },
  ],
  galeri: [
    { id:1, judul:'Konstruksi Gudang Industri', kategori:'konstruksi', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
    { id:2, judul:'Kanopi Carport Modern',       kategori:'kanopi',     img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { id:3, judul:'Pagar Besi Minimalis',        kategori:'pagar',      img:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80' },
    { id:4, judul:'Rolling Door Toko',           kategori:'rolling',    img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
    { id:5, judul:'Tralis Jendela Custom',       kategori:'tralis',     img:'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80' },
    { id:6, judul:'Pintu Besi Harmonika',        kategori:'pintu',      img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    { id:7, judul:'Rangka Baja Pabrik',          kategori:'konstruksi', img:'https://images.unsplash.com/photo-1581094651181-35942459ef62?w=600&q=80' },
    { id:8, judul:'Kanopi Polycarbonate',        kategori:'kanopi',     img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
  ],
  harga: [
    { id:1, nama:'Pagar Minimalis',    harga:'350.000', satuan:'/m²',   fitur:['Besi hollow 4x4','Cat anti karat','Garansi 2 tahun'], unggulan:false },
    { id:2, nama:'Kanopi Standard',    harga:'450.000', satuan:'/m²',   fitur:['Baja ringan SNI','Polycarbonate UV','Garansi 3 tahun'], unggulan:true },
    { id:3, nama:'Rolling Door',       harga:'1.200.000',satuan:'/unit',fitur:['Besi galvanis','Kunci double','Garansi 2 tahun'], unggulan:false },
    { id:4, nama:'Konstruksi Baja',    harga:'600.000', satuan:'/m²',   fitur:['Baja WF/H-Beam','Las penuh','Garansi 5 tahun'], unggulan:false },
    { id:5, nama:'Pintu Harmonika',    harga:'1.500.000',satuan:'/unit',fitur:['Aluminium/besi','Cat powder coat','Garansi 2 tahun'], unggulan:false },
    { id:6, nama:'Custom Fabrikasi',   harga:'Nego',    satuan:'',      fitur:['Desain bebas','Material pilihan','Konsultasi gratis'], unggulan:false },
  ],
  pesanan: []
};

// ── STORAGE (localStorage) ──
const Store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('sl_'+key)) ?? DEFAULT[key]; }
    catch { return DEFAULT[key]; }
  },
  set(key, val) { localStorage.setItem('sl_'+key, JSON.stringify(val)); },
  reset(key) { localStorage.removeItem('sl_'+key); }
};

// ── NAVBAR HTML ──
function renderNavbar(active='', prefix='') {
  const links = [
    ['beranda', `${prefix}index.html`,         'Beranda'],
    ['layanan', `${prefix}pages/layanan.html`, 'Layanan'],
    ['galeri',  `${prefix}pages/galeri.html`,  'Galeri'],
    ['harga',   `${prefix}pages/harga.html`,   'Harga'],
    ['tentang', `${prefix}pages/tentang.html`, 'Tentang'],
    ['kontak',  `${prefix}pages/kontak.html`,  'Kontak'],
  ];
  const info = Store.get('info');
  return `
  <a href="https://wa.me/${info.wa}" target="_blank" class="wa-float"><span class="wa-icon">💬</span><span>Chat WhatsApp</span></a>
  <nav id="navbar">
    <a href="${prefix}index.html" class="nb-logo">
      <div class="nb-logo-mark">⚙</div>
      <div class="nb-logo-text">${info.nama}<small>${info.tagline}</small></div>
    </a>
    <div class="nb-links">
      ${links.map(([id,href,label])=>`<a href="${href}" class="nb-link${active===id?' active':''}">${label}</a>`).join('')}
      <a href="${prefix}pages/kontak.html" class="nb-link nb-cta">Order Sekarang</a>
    </div>
    <button class="nb-hamburger" onclick="toggleNav()"><span></span><span></span><span></span></button>
  </nav>
  <div class="nb-mobile" id="mobileNav">
    ${links.map(([id,href,label])=>`<a href="${href}" class="nb-link" onclick="toggleNav()">${label}</a>`).join('')}
    <a href="${prefix}pages/kontak.html" class="nb-link nb-cta" onclick="toggleNav()">Order Sekarang</a>
  </div>`;
}

// ── FOOTER HTML ──
function renderFooter(prefix='') {
  const info = Store.get('info');
  return `
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <div class="footer-logo-mark">⚙</div>
          <div class="footer-logo-name">${info.nama}</div>
        </div>
        <p class="footer-tagline">${info.tagline}. Kualitas terjamin, pengerjaan profesional.</p>
        <div class="footer-socials">
          <a href="${info.fb}" class="social-icon">📘</a>
          <a href="${info.ig}" class="social-icon">📸</a>
          <a href="${info.yt}" class="social-icon">▶️</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Layanan</div>
        <div class="footer-links">
          <a href="${prefix}pages/layanan.html">Konstruksi Baja</a>
          <a href="${prefix}pages/layanan.html">Kanopi & Tenda</a>
          <a href="${prefix}pages/layanan.html">Pagar & Tralis</a>
          <a href="${prefix}pages/layanan.html">Rolling Door</a>
          <a href="${prefix}pages/layanan.html">Pintu Harmonika</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigasi</div>
        <div class="footer-links">
          <a href="${prefix}index.html">Beranda</a>
          <a href="${prefix}pages/galeri.html">Galeri</a>
          <a href="${prefix}pages/harga.html">Harga</a>
          <a href="${prefix}pages/tentang.html">Tentang</a>
          <a href="${prefix}pages/kontak.html">Kontak</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Kontak</div>
        <div class="footer-links">
          <span>📍 ${info.alamat}</span>
          <span>📱 +${info.wa}</span>
          <span>✉️ ${info.email}</span>
          <span>🕐 ${info.jam}</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${info.nama}. Semua hak dilindungi.</span>
      <a href="${prefix}admin/login.html" class="footer-admin-link">🔐 Admin</a>
    </div>
  </footer>`;
}

// ── TOGGLE MOBILE NAV ──
function toggleNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// ── SCROLL EFFECTS ──
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 40);
});

// ── REVEAL ON SCROLL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.12 });
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
});
