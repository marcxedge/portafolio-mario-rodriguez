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
  initCursorGlow();
  initReveal();
  initCounters();
  initLangBars();
  initTypedText();
  initBackToTop();
  initSmoothAnchors();
  initGalleryScroll();
  initGalleryModal();
  initVerMas();
  initProjectNav();
  initTimelineBuild();
  initAudience();
});

/* Construcción del timeline — la línea se dibuja y los puntos aparecen en orden.
   Se dispara cuando la sección entra en pantalla y se repite al volver a ella,
   tanto en la web normal como en las pestañas del móvil simulado. */
function initTimelineBuild() {
  const navs = Array.from(document.querySelectorAll('.projects-timeline-nav'));
  if (!navs.length) return;

  navs.forEach(nav => {
    nav.querySelectorAll('.project-thumb').forEach((t, i) => t.style.setProperty('--i', i));
  });

  // Se anima una sola vez por carga de página: al volver a la sección ya no se repite
  const play = (nav) => {
    if (nav.dataset.played === '1') return;
    nav.dataset.played = '1';
    nav.classList.remove('is-building');
    void nav.offsetWidth;                       // reinicia la animación
    nav.classList.add('is-building');

    const entry = nav.parentElement.querySelector('.project-entry.is-active');
    if (entry) {
      entry.classList.remove('is-entering');
      void entry.offsetWidth;
      entry.classList.add('is-entering');
    }

    const total = 900 + nav.querySelectorAll('.project-thumb').length * 110;
    setTimeout(() => {
      nav.classList.remove('is-building');
      if (entry) entry.classList.remove('is-entering');
    }, total);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((items) => {
      items.forEach(e => {
        if (!e.isIntersecting) return;
        play(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    navs.forEach(n => io.observe(n));
  }

  // Dentro del móvil simulado las secciones se ocultan con display, así que el
  // observer no siempre dispara: se lanza al abrir la pestaña por primera vez.
  document.addEventListener('app:screenchange', () => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.screen.is-active .projects-timeline-nav').forEach(play);
    });
  });
}

/* Timeline nav — clicking a thumb shows the full entry; works for all sections */
function initProjectNav() {
  document.querySelectorAll('.projects-timeline-nav').forEach(nav => {
    const thumbs = Array.from(nav.querySelectorAll('.project-thumb'));
    if (!thumbs.length) return;

    const container = nav.parentElement;
    const entries = {};
    container.querySelectorAll('.project-entry[id]').forEach(e => { entries[e.id] = e; });

    const activate = (thumb) => {
      thumbs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      Object.values(entries).forEach(e => e.classList.remove('is-active'));
      thumb.classList.add('is-active');
      thumb.setAttribute('aria-selected', 'true');
      const target = entries[thumb.dataset.target];
      if (target) target.classList.add('is-active');
      nav.dataset.active = thumbs.indexOf(thumb);
    };

    thumbs.forEach(t => t.addEventListener('click', () => activate(t)));

    // Un role="tablist" debe moverse con las flechas; se añade Inicio/Fin.
    const step = (dir) => {
      const i = thumbs.findIndex(t => t.classList.contains('is-active'));
      const next = thumbs[Math.min(thumbs.length - 1, Math.max(0, i + dir))];
      if (next && next !== thumbs[i]) { activate(next); next.focus(); }
    };
    nav.addEventListener('keydown', (e) => {
      const keys = { ArrowLeft: -1, ArrowRight: 1 };
      if (e.key in keys) { e.preventDefault(); step(keys[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); activate(thumbs[0]); thumbs[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); activate(thumbs.at(-1)); thumbs.at(-1).focus(); }
    });

    // Deslizar sobre la entrada abierta pasa a la anterior o la siguiente
    let x0 = null, y0 = null;
    container.addEventListener('touchstart', (e) => {
      // la galería ya se desplaza en horizontal: ahí el gesto no es nuestro
      if (e.touches.length !== 1 || e.target.closest('.project-gallery-wrap, .cert-timeline')) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    container.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      // solo gestos claramente horizontales, para no robarle el scroll vertical
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.8) step(dx < 0 ? 1 : -1);
      x0 = y0 = null;
    }, { passive: true });

    if (thumbs[0]) activate(thumbs[0]);
  });
}

/* "Ver más / Ver menos" toggle on project descriptions */
function initVerMas() {
  const updateLabel = (btn, expanded) => {
    const lang = document.documentElement.lang || 'es';
    const label = window.I18N ? window.I18N.get(lang, expanded ? 'common.verMenos' : 'common.verMas') : (expanded ? 'Ver menos' : 'Ver más');
    const span = btn.querySelector('.ver-mas-label');
    if (span) span.textContent = label;
  };

  document.querySelectorAll('.btn-ver-mas').forEach(btn => {
    const wrap = btn.closest('.project-desc-wrap');
    if (!wrap) return;
    btn.addEventListener('click', () => {
      wrap.classList.toggle('is-expanded');
      updateLabel(btn, wrap.classList.contains('is-expanded'));
    });
  });

  document.addEventListener('i18n:changed', () => {
    document.querySelectorAll('.btn-ver-mas').forEach(btn => {
      const wrap = btn.closest('.project-desc-wrap');
      if (!wrap) return;
      updateLabel(btn, wrap.classList.contains('is-expanded'));
    });
  });
}

/* Project screenshots carousels — left/right arrow navigation (one per project) */
function initGalleryScroll() {
  document.querySelectorAll('.project-gallery-wrap').forEach((wrap) => {
    const track = wrap.querySelector('.project-gallery');
    const prev = wrap.querySelector('.gallery-prev');
    const next = wrap.querySelector('.gallery-next');
    if (!track || !prev || !next) return;

    const step = () => track.clientWidth * 0.7;
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const atStart = () => track.scrollLeft <= 4;
    const atEnd = () => track.scrollLeft >= maxScroll() - 4;

    prev.addEventListener('click', () => {
      if (atStart()) track.scrollTo({ left: maxScroll(), behavior: 'smooth' });
      else track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: step(), behavior: 'smooth' });
    });
  });
}

/* Project screenshots lightbox — image left, title/description right, with prev/next */
function initGalleryModal() {
  const allItems = Array.from(document.querySelectorAll('.gallery-item'));
  const modal = document.getElementById('galleryModal');
  if (!allItems.length || !modal) return;

  const imgEl = document.getElementById('galleryModalImg');
  const titleEl = document.getElementById('galleryModalTitle');
  const descEl = document.getElementById('galleryModalDesc');
  const indexEl = document.getElementById('galleryModalIndex');
  const closeBtn = document.getElementById('galleryModalClose');
  const backdrop = document.getElementById('galleryModalBackdrop');
  const prevBtn = document.getElementById('galleryModalPrev');
  const nextBtn = document.getElementById('galleryModalNext');

  let items = allItems;
  let current = 0;

  const render = (i) => {
    current = (i + items.length) % items.length;
    const item = items[current];
    const img = item.querySelector('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    titleEl.textContent = item.querySelector('h4').textContent;
    descEl.textContent = item.querySelector('p').textContent;
    indexEl.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };

  const open = (item) => {
    const gallery = item.closest('.project-gallery');
    items = gallery ? Array.from(gallery.querySelectorAll('.gallery-item')) : allItems;
    render(items.indexOf(item));
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  allItems.forEach((item) => item.addEventListener('click', () => open(item)));
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  prevBtn.addEventListener('click', () => render(current - 1));
  nextBtn.addEventListener('click', () => render(current + 1));

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') render(current - 1);
    if (e.key === 'ArrowRight') render(current + 1);
  });
}

/* Language toggle (ES / EN) */
function initLanguage() {
  const btn = document.getElementById('langToggle');
  const lang = window.I18N.getInitialLang();
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
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
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
      if (!target || target.classList.contains('screen')) return; // app.js handles tab screens
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 70) + 10;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* Adaptación por candidatura: ?for=impacto reordena el énfasis sin cambiar
   ningún hecho. SL Assist pasa al frente y los textos de entrada y de cierre
   hablan de propósito. Sin parámetro, el portafolio se comporta como siempre. */
function initAudience() {
  let perfil = null;
  try { perfil = new URLSearchParams(window.location.search).get('for'); } catch { return; }
  if (perfil !== 'impacto' && perfil !== 'impact') return;

  document.documentElement.dataset.audience = 'impacto';

  // SL Assist primero en la línea de proyectos, y abierto por defecto
  const nav = document.querySelector('#proyecto .projects-timeline-nav');
  const tesis = nav?.querySelector('[data-target="project-tesis"]');
  if (nav && tesis) {
    nav.prepend(tesis);
    nav.querySelectorAll('.project-thumb').forEach((t, i) => t.style.setProperty('--i', i));
    tesis.click();
  }

  // Textos con otro énfasis, declarados en i18n como variantes
  const cambiar = () => {
    const intro = document.querySelector('#proyecto .timeline-intro');
    if (intro) intro.setAttribute('data-i18n', 'projectsSection.introImpact');
    if (window.I18N) window.I18N.apply(document.documentElement.lang || 'es');
  };
  cambiar();
  document.addEventListener('i18n:changed', cambiar);
}
