// ══════════════════════════════════════════
// SARIAJI LOGAM — Shared Components & Storage
// ══════════════════════════════════════════

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyqutItsxZizEw2_USYg_RFmZVGRf9oEFj3iTj8cKPbUhBpNfw_kVh-YeAFH-WhfSoH/exec';

// ── DEFAULT DATA ──
const DEFAULT = {
  info: {
    nama:    'Sariaji Logam',
    tagline: 'Bengkel Las & Konstruksi',
    wa:      '6281936596224',
    email:   'sariaji.logam@gmail.com',
    alamat:  'Jl. Tanah Lot No.16, Pandak Gede, Kec. Kediri, Kabupaten Tabanan, Bali 82121',
    jam:     'Senin – Sabtu: 08.00 – 17.00 WIB',
    fb:      'https://www.facebook.com/sariaji.logam/', ig: '#', yt: '#'
  },
  layanan: [
    { id:1, nama:'Konstruksi Baja',       icon:'', desc:'Rangka baja untuk gedung, gudang, dan pabrik.',      harga:'Hubungi kami', aktif:true },
    { id:2, nama:'Kanopi & Tenda',        icon:'', desc:'Kanopi baja ringan dan polycarbonate berkualitas.', harga:'Hubungi kami', aktif:true },
    { id:3, nama:'Pagar & Tralis',        icon:'', desc:'Pagar besi berbagai desain, kuat dan estetik.',     harga:'Hubungi kami', aktif:true },
    { id:4, nama:'Rolling Door',          icon:'', desc:'Rolling door manual & elektrik berbagai ukuran.',   harga:'Hubungi kami', aktif:true },
    { id:5, nama:'Pintu Harmonika',       icon:'', desc:'Pintu harmonika besi untuk toko dan garasi.',       harga:'Hubungi kami', aktif:true },
    { id:6, nama:'Las & Fabrikasi Custom',icon:'', desc:'Las dan fabrikasi logam sesuai desain khusus.',    harga:'Hubungi kami',  aktif:true },
  ],
galeri: [
  { id:1,  judul:'Pintu Kaca Minimalis',       kategori:'pintu',      img:'/images/galeri/pintu-kaca-01.jpeg' },
  { id:2,  judul:'Pintu Besi Solid',            kategori:'pintu',      img:'/images/galeri/pintu-besi-01.jpeg' },
  { id:3,  judul:'Jendela Aluminium',           kategori:'tralis',     img:'/images/galeri/jendela-01.jpeg' },
  { id:4,  judul:'Pemasangan Kusen Proyek',     kategori:'konstruksi', img:'/images/galeri/pemasangan-01.jpeg' },
  { id:5,  judul:'Tangga Spiral Besi',          kategori:'konstruksi', img:'/images/galeri/tangga-spiral.jpeg' },
  { id:6,  judul:'Kanopi Polycarbonate',        kategori:'kanopi',     img:'/images/galeri/kanopi-01.jpeg' },
  { id:7,  judul:'Tangga Besi Custom',          kategori:'konstruksi', img:'/images/galeri/tangga-besi.jpeg' },
  { id:8,  judul:'Kanopi Baja Ringan',          kategori:'kanopi',     img:'/images/galeri/kanopi-02.jpeg' },
  { id:9,  judul:'Konstruksi Rangka Baja',      kategori:'konstruksi', img:'/images/galeri/konstruksi-baja.jpeg' },
  { id:10, judul:'Atap Baja Ringan',            kategori:'konstruksi', img:'/images/galeri/atap-baja.jpeg' },
  { id:11, judul:'Pintu Kaca French Door',      kategori:'pintu',      img:'/images/galeri/pintu-kaca-02.jpeg' },
  { id:12, judul:'Tim Ahli Sariaji Logam',      kategori:'konstruksi', img:'/images/galeri/tim-kerja.jpeg' },
],
  // harga: [
  //   { id:1, nama:'Pagar Minimalis',    harga:'350.000', satuan:'/m²',   fitur:['Besi hollow 4x4','Cat anti karat','Garansi 2 tahun'], unggulan:false },
  //   { id:2, nama:'Kanopi Standard',    harga:'450.000', satuan:'/m²',   fitur:['Baja ringan SNI','Polycarbonate UV','Garansi 3 tahun'], unggulan:true },
  //   { id:3, nama:'Rolling Door',       harga:'1.200.000',satuan:'/unit',fitur:['Besi galvanis','Kunci double','Garansi 2 tahun'], unggulan:false },
  //   { id:4, nama:'Konstruksi Baja',    harga:'600.000', satuan:'/m²',   fitur:['Baja WF/H-Beam','Las penuh','Garansi 5 tahun'], unggulan:false },
  //   { id:5, nama:'Pintu Harmonika',    harga:'1.500.000',satuan:'/unit',fitur:['Aluminium/besi','Cat powder coat','Garansi 2 tahun'], unggulan:false },
  //   { id:6, nama:'Custom Fabrikasi',   harga:'Nego',    satuan:'',      fitur:['Desain bebas','Material pilihan','Konsultasi gratis'], unggulan:false },
  // ],
  // pesanan: []
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
    ['tentang', `${prefix}pages/tentang.html`, 'Tentang'],
    ['kontak',  `${prefix}pages/kontak.html`,  'Kontak'],
  ];
  const info = Store.get('info');
  return `
  <a href="https://wa.me/${info.wa}?text=${encodeURIComponent('Halo Sariaji Logam! Saya ingin konsultasi mengenai layanan Anda.')}" target="_blank" class="wa-float"><span class="wa-icon">💬</span><span>Chat WhatsApp</span></a>
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
