// ═══════════════════════════════════════════
// SARIAJI LOGAM — Animation Engine
// animate.js
// ═══════════════════════════════════════════

(function() {
  'use strict';

  // ── SCROLL REVEAL ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
      // Auto-assign direction if none set
      if (!el.classList.contains('from-up') &&
          !el.classList.contains('from-down') &&
          !el.classList.contains('from-left') &&
          !el.classList.contains('from-right') &&
          !el.classList.contains('from-scale')) {
        el.classList.add('from-up');
      }
      revealObserver.observe(el);
    });
  }


  // ── STAGGER CHILDREN ──
  // Usage: <div class="stagger-children"> children get auto delays
  function initStagger() {
    document.querySelectorAll('.stagger-children').forEach(parent => {
      const children = parent.children;
      Array.from(children).forEach((child, i) => {
        child.style.transitionDelay = (i * 0.08) + 's';
        child.classList.add('reveal', 'from-up');
        revealObserver.observe(child);
      });
    });
  }


  // ── ANIMATED COUNTER ──
  function animateCounter(el, target, duration = 1800) {
    const isFloat = target % 1 !== 0;
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    let start     = null;
    let startVal  = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * eased;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseFloat(el.dataset.count) || 0;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      counterObserver.observe(el);
    });
  }


  // ── PARALLAX HERO ──
  function initParallax() {
    const hero = document.querySelector('.hero-visual');
    if (!hero) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          hero.style.transform = `translateY(${scrollY * 0.18}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // ── MAGNETIC BUTTONS ──
  function initMagnetic() {
    document.querySelectorAll('.btn-gold, .btn-dark, .add-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect   = btn.getBoundingClientRect();
        const x      = e.clientX - rect.left - rect.width / 2;
        const y      = e.clientY - rect.top  - rect.height / 2;
        const strength = 0.22;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1)';
      });
      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform .1s ease';
      });
    });
  }


  // ── CURSOR TRAIL (subtle gold dots) ──
  function initCursorTrail() {
    // Only on desktop
    if (window.innerWidth < 768) return;
    const dots  = [];
    const count = 6;
    let   mouseX = 0, mouseY = 0;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:fixed; pointer-events:none; z-index:9999;
        width:${4 - i * 0.4}px; height:${4 - i * 0.4}px;
        border-radius:50%;
        background:rgba(200,168,75,${0.35 - i * 0.05});
        transition:transform .${i * 3 + 6}s ease, opacity .3s ease;
        transform:translate(-50%,-50%);
        top:0; left:0;
      `;
      document.body.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0 });
    }

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      dots[0].x = mouseX; dots[0].y = mouseY;
      dots[0].el.style.top  = mouseY + 'px';
      dots[0].el.style.left = mouseX + 'px';
    });

    function animDots() {
      for (let i = 1; i < count; i++) {
        dots[i].x += (dots[i-1].x - dots[i].x) * 0.28;
        dots[i].y += (dots[i-1].y - dots[i].y) * 0.28;
        dots[i].el.style.top  = dots[i].y + 'px';
        dots[i].el.style.left = dots[i].x + 'px';
      }
      requestAnimationFrame(animDots);
    }
    animDots();

    // Hide when over interactive elements
    document.querySelectorAll('a,button,input,select,textarea').forEach(el => {
      el.addEventListener('mouseenter', () => dots.forEach(d => d.el.style.opacity = '0'));
      el.addEventListener('mouseleave', () => dots.forEach(d => d.el.style.opacity = '1'));
    });
  }


  // ── SMOOTH SECTION SCROLL ──
  function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }


  // ── GALLERY HOVER TILT ──
  function initTilt() {
    document.querySelectorAll('.mg-item, .galeri-item').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = (e.clientX - rect.left) / rect.width  - 0.5;
        const y      = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform .12s ease';
      });
    });
  }


  // ── SECTION HEADING HIGHLIGHT ──
  const headObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        headObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  function initHeads() {
    document.querySelectorAll('.sec-head').forEach(el => headObserver.observe(el));
  }


  // ── NAVBAR SCROLL EFFECT ──
  function initNavbar() {
    const nb = document.getElementById('navbar');
    if (!nb) return;
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nb.classList.toggle('scrolled', y > 50);
      // Auto-hide on scroll down, show on scroll up
      if (y > 200) {
        nb.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        nb.style.transform = 'translateY(0)';
      }
      nb.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1), height .25s ease, background .25s ease';
      lastY = y;
    }, { passive: true });
  }


  // ── IMAGE LAZY + FADE IN ──
  function initImages() {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)';
          img.style.opacity    = '1';
          img.style.transform  = 'scale(1)';
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.style.opacity   = '0';
        img.style.transform = 'scale(.97)';
        imgObserver.observe(img);
        img.addEventListener('load', () => {
          img.style.opacity   = '1';
          img.style.transform = 'scale(1)';
        });
      }
    });
  }


  // ── GOLD UNDERLINE WORDS ──
  // Wrap spans around .highlight class for animated underline
  function initHighlights() {
    document.querySelectorAll('.gold-text').forEach(el => {
      el.style.position = 'relative';
      el.style.display  = 'inline-block';
    });
  }


  // ── SPARKLE ON CTA BAND ── 
  function initSparkles() {
    const cta = document.querySelector('.cta-band');
    if (!cta) return;
    cta.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.85) {
        const spark = document.createElement('div');
        const rect  = cta.getBoundingClientRect();
        const size  = 4 + Math.random() * 6;
        spark.style.cssText = `
          position:absolute;
          left:${e.clientX - rect.left}px;
          top:${e.clientY - rect.top}px;
          width:${size}px; height:${size}px;
          border-radius:50%;
          background:rgba(255,255,255,.8);
          pointer-events:none; z-index:2;
          animation:sparkle .6s ease forwards;
          transform:translate(-50%,-50%);
        `;
        cta.style.position = 'relative';
        cta.style.overflow = 'hidden';
        cta.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    });
  }


  // ── RE-INIT (for dynamic content) ──
  window.initAnimations = function() {
    initReveal();
    initStagger();
    initCounters();
    initTilt();
    initImages();
  };


  // ── INIT ON DOM READY ──
  function init() {
    initReveal();
    initStagger();
    initCounters();
    initParallax();
    initMagnetic();
    initCursorTrail();
    initSmoothLinks();
    initTilt();
    initNavbar();
    initHeads();
    initImages();
    initHighlights();
    initSparkles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run on dynamic content (e.g. after filter/CRUD)
  const originalInit = window.initAnimations;
  const mutationObs  = new MutationObserver(() => {
    initReveal();
    initTilt();
    initMagnetic();
  });
  mutationObs.observe(document.body, { childList: true, subtree: true });

})();
