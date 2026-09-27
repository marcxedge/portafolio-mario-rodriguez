// ==========================================================================
// Mario Rodríguez — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initYear();
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollProgress();
  initCursorGlow();
  initReveal();
  initCounters();
  initLangBars();
  initTypedText();
  initBackToTop();
  initSmoothAnchors();
});

/* Language toggle (ES / EN) */
function initLanguage() {
  const btn = document.getElementById('langToggle');
  const lang = window.I18N.getStoredLang();
  window.I18N.apply(lang);

  btn?.addEventListener('click', () => {
    const current = document.documentElement.lang === 'en' ? 'en' : 'es';
    const next = current === 'es' ? 'en' : 'es';
    window.I18N.apply(next);
  });
}

/* Footer year */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* Theme toggle with localStorage persistence */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = safeGet('mr-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (stored) {
    root.setAttribute('data-theme', stored);
  } else if (prefersLight) {
    root.setAttribute('data-theme', 'light');
  }

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    safeSet('mr-theme', next);
  });
}

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

/* Navbar background on scroll */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile menu */
function initMobileMenu() {
  const btn = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

/* Highlight active nav link based on section in view */
function initScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* Top scroll progress bar */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* Cursor glow follows pointer (desktop only) */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

/* Reveal-on-scroll animation */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, groupIndex) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el, i) => {
    el.setAttribute('data-reveal-delay', String(i % 4));
    observer.observe(el);
  });
}

/* Animated number counters in stats */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* Animate language proficiency bars */
function initLangBars() {
  const bars = document.querySelectorAll('.lang-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => observer.observe(b));
}

/* Typing effect for hero role words (restarts on language change) */
let typedGeneration = 0;

function initTypedText() {
  const el = document.getElementById('typed');
  if (!el) return;

  document.addEventListener('i18n:changed', (e) => startTyping(el, e.detail.lang));
  startTyping(el, document.documentElement.lang === 'en' ? 'en' : 'es');
}

function startTyping(el, lang) {
  const generation = ++typedGeneration;
  const words = window.I18N.get(lang, 'hero.typedWords') || ['Mobile.'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    if (generation !== typedGeneration) return;
    const current = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = deleting ? 45 : 90;
    setTimeout(tick, speed);
  };

  tick();
}

/* Back-to-top button */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Smooth scroll with navbar offset for in-page anchors */
function initSmoothAnchors() {
  const navbar = document.getElementById('navbar');
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 70) + 10;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
