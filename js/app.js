// ==========================================================================
// Mario Rodríguez — App shell: bottom tabs and screen switching
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initBootScreen();
  initAppTabs();
  initLauncher();
  initToTop();
  initStatusBar();
  initMockApps();
  initDragScroll();
  initPullToRefresh();
});

/* Boot screen: plays once on the initial page load, simulating the device powering on.
   The home-screen/auto-open sequence (initLauncher) waits for BOOT_DURATION so its own
   timings stay exactly as they were before, just shifted to start once the device is "on". */
const BOOT_ON_DELAY = 650;
const BOOT_OFF_DELAY = 2100;
const BOOT_DURATION = 2550; // BOOT_OFF_DELAY + the 0.45s fade-out transition in css/app.css
function initBootScreen() {
  const boot = document.getElementById('bootScreen');
  if (!boot) return;
  setTimeout(() => boot.classList.add('is-on'), BOOT_ON_DELAY);
  setTimeout(() => boot.classList.add('is-off'), BOOT_OFF_DELAY);
}

/* Status bar above the screens: time and battery, visible in the home screen and inside the app */
function initStatusBar() {
  const sbTime = document.getElementById('sbTime');
  if (!sbTime) return;
  const update = () => {
    const now = new Date();
    const en = document.documentElement.lang === 'en';
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() < 12 ? (en ? 'AM' : 'a. m.') : (en ? 'PM' : 'p. m.');
    sbTime.textContent = `${hours}:${minutes} ${period}`;
  };
  update();
  setInterval(update, 30000);
  document.addEventListener('i18n:changed', update);
}

/* Floating button: scrolls the active screen back to its top */
function initToTop() {
  const btn = document.getElementById('toTop');
  if (!btn) return;
  const activeScroll = () => document.querySelector('.screen.is-active .screen-scroll');

  const update = () => {
    const el = activeScroll();
    btn.classList.toggle('is-visible', !!el && el.scrollTop > 300);
  };

  btn.addEventListener('click', () => {
    activeScroll()?.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // scroll events don't bubble, so listen in the capture phase to catch every app screen
  document.addEventListener('scroll', update, { passive: true, capture: true });
  document.addEventListener('app:screenchange', update);
  update();
}

/* Device home screen: the side button shows it, the portfolio icon brings the app back */
function initLauncher() {
  const device = document.querySelector('.device');
  const launcher = document.getElementById('launcher');
  const homeBtn = document.getElementById('homeBtn');
  const clock = document.getElementById('launcherTime');
  if (!device || !launcher || !homeBtn) return;

  const DAYS = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
  const MONTHS = {
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  const dateEl = document.getElementById('launcherDate');

  const updateClock = () => {
    if (!clock) return;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    const now = new Date();
    // 12-hour time with a small AM/PM marker: Spanish "a. m." / "p. m.", English "AM" / "PM"
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() < 12
      ? (lang === 'en' ? 'AM' : 'a. m.')
      : (lang === 'en' ? 'PM' : 'p. m.');
    clock.innerHTML = `<span class="launcher-hm">${hours}:${minutes}</span><span class="launcher-ampm">${period}</span>`;
    if (dateEl) {
      const day = String(now.getDate()).padStart(2, '0');
      // Spanish: "Lun, 05 Oct" · English: "Mon, Oct 05"
      dateEl.textContent = lang === 'en'
        ? `${DAYS.en[now.getDay()]}, ${MONTHS.en[now.getMonth()]} ${day}`
        : `${DAYS.es[now.getDay()]}, ${day} ${MONTHS.es[now.getMonth()]}`;
    }
  };

  const setHome = (on) => {
    device.classList.toggle('is-home', on);
    launcher.setAttribute('aria-hidden', String(!on));
    homeBtn.setAttribute('aria-pressed', String(on));
    if (on) updateClock();
  };

  homeBtn.addEventListener('click', () => setHome(!device.classList.contains('is-home')));
  // Abrir el portafolio: solo el pulso del icono, la app entra sin pantalla de carga
  let openTimer;
  const openPortfolio = () => {
    if (openTimer) return;
    const icon = document.querySelector('[data-open-app]');
    icon?.classList.remove('is-tapped');
    void icon?.offsetWidth;
    icon?.classList.add('is-tapped');
    // sin aviso de apertura ni splash: la app entra directa
    setHome(false);
    openTimer = setTimeout(() => {
      icon?.classList.remove('is-tapped');
      openTimer = null;
    }, 450);
  };
  document.querySelectorAll('[data-open-app]').forEach((btn) => {
    btn.addEventListener('click', openPortfolio);
  });
  document.getElementById('appbarBack')?.addEventListener('click', () => setHome(true));
  document.addEventListener('i18n:changed', updateClock);

  // Real battery level when the browser exposes it (Chromium on laptops and Android); otherwise the static 100%
  const batTexts = document.querySelectorAll('.bat-text');
  const batFills = document.querySelectorAll('.bat-fill');
  if (batTexts.length && batFills.length && 'getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
      const update = () => {
        const pct = Math.round(battery.level * 100);
        batTexts.forEach((el) => { el.textContent = `${battery.charging ? '⚡ ' : ''}${pct}%`; });
        batFills.forEach((el) => el.setAttribute('width', String(Math.max(1, 16 * battery.level))));
      };
      update();
      battery.addEventListener('levelchange', update);
      battery.addEventListener('chargingchange', update);
    }).catch(() => { /* keep the static 100% */ });
  }

  // Decorative apps are not available: show a short notice
  const toast = document.getElementById('launcherToast');
  let toastTimer;
  document.querySelectorAll('[data-mock]').forEach((btn) => {
    btn.addEventListener('click', () => {
      // same tap animation as the portfolio icon
      btn.classList.remove('is-tapped');
      void btn.offsetWidth;
      btn.classList.add('is-tapped');
      setTimeout(() => btn.classList.remove('is-tapped'), 450);
    });
  });

  // Language and theme chips in the home screen reuse the header buttons' handlers
  const proxies = Array.from(document.querySelectorAll('[data-proxy]'));
  const syncProxies = () => {
    proxies.forEach((p) => {
      const src = document.getElementById(p.dataset.proxy);
      if (!src) return;
      p.innerHTML = src.innerHTML.replace(/ id="[^"]*"/g, '');
      p.setAttribute('aria-label', src.getAttribute('aria-label') || '');
      p.title = src.getAttribute('title') || '';
    });
  };
  proxies.forEach((p) => {
    p.addEventListener('click', () => {
      document.getElementById(p.dataset.proxy)?.click();
      setTimeout(syncProxies, 0);
    });
  });
  document.addEventListener('i18n:changed', syncProxies);
  syncProxies();

  // Al cargar, el dispositivo muestra su escritorio; la guía llega tras el encendido
  setHome(true);
  // En vez de abrir el portafolio solo, se presenta el escritorio con una guía
  // y al terminar se deja al visitante en el escritorio para que elija.
  setTimeout(() => initTour(), BOOT_DURATION);
}

/* Guía inicial: presenta el escritorio y cada app antes de abrir el portafolio.
   El foco se coloca sobre el elemento real de cada paso, así que sigue al
   diseño aunque cambien los iconos o el orden de la rejilla. */
const TOUR_STORAGE_KEY = 'mr-tour-seen';

/* La guía es para la primera visita. Con ?tour=1 se fuerza, para poder verla
   de nuevo sin tener que borrar el almacenamiento del navegador. */
function tourYaVista() {
  try {
    if (new URLSearchParams(window.location.search).get('tour') === '1') return false;
    return localStorage.getItem(TOUR_STORAGE_KEY) === '1';
  } catch { return false; }
}
function marcarTourVista() {
  try { localStorage.setItem(TOUR_STORAGE_KEY, '1'); } catch { /* modo privado */ }
}

function initTour(onFinish = () => {}) {
  const tour = document.getElementById('tour');
  const device = document.querySelector('.device');
  if (!tour || !device || tourYaVista()) { onFinish(); return; }

  const spot = document.getElementById('tourSpot');
  const card = document.getElementById('tourCard');
  const dots = document.getElementById('tourDots');
  const kicker = document.getElementById('tourKicker');
  const titleEl = document.getElementById('tourTitle');
  const textEl = document.getElementById('tourText');
  const skip = document.getElementById('tourSkip');
  const next = document.getElementById('tourNext');
  const en = () => document.documentElement.lang === 'en';
  const t = (key) => (window.I18N ? window.I18N.get(en() ? 'en' : 'es', key) : '');

  const steps = [
    { key: 'welcome', targets: [] },
    { key: 'portfolio', targets: ['[data-open-app]'] },
    { key: 'apps', targets: ['[data-mock="amobile"]', '[data-mock="liftxto"]', '[data-mock="slassist"]'] },
    { key: 'home', targets: ['#homeBtn'] },
  ];
  let i = 0;

  // Rectángulo que engloba todos los elementos del paso, en coordenadas del marco
  const union = (sels) => {
    const rects = sels
      .map((sel) => document.querySelector(sel))
      .filter(Boolean)
      .map((n) => n.getBoundingClientRect())
      .filter((r) => r.width && r.height);
    if (!rects.length) return null;
    const d = device.getBoundingClientRect();
    const box = {
      top: Math.min(...rects.map((r) => r.top)),
      left: Math.min(...rects.map((r) => r.left)),
      right: Math.max(...rects.map((r) => r.right)),
      bottom: Math.max(...rects.map((r) => r.bottom)),
    };
    const pad = 10;
    return {
      top: box.top - d.top - device.clientTop - pad,
      left: box.left - d.left - device.clientLeft - pad,
      width: box.right - box.left + pad * 2,
      height: box.bottom - box.top + pad * 2,
    };
  };

  const render = () => {
    const step = steps[i];
    kicker.textContent = `${i + 1} / ${steps.length}`;
    titleEl.textContent = t(`tour.${step.key}Title`);
    textEl.textContent = t(`tour.${step.key}Text`);
    next.textContent = i === steps.length - 1 ? t('tour.done') : t('tour.next');
    skip.textContent = t('tour.skip');
    dots.innerHTML = steps.map((_, n) => `<span class="${n === i ? 'is-on' : ''}"></span>`).join('');

    const r = union(step.targets);
    if (!r) {
      spot.classList.remove('has-target');
      spot.style.cssText = 'top:50%;left:50%;width:0;height:0;';
      card.style.top = '50%';
      card.style.transform = 'translate(-50%, -50%)';
      return;
    }
    spot.classList.add('has-target');
    spot.style.cssText = `top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px;`;

    // La tarjeta se coloca donde quepa: debajo del foco o, si no, encima
    const alto = card.offsetHeight || 190;
    const libreAbajo = device.clientHeight - (r.top + r.height);
    if (libreAbajo > alto + 28) {
      card.style.top = `${r.top + r.height + 18}px`;
      card.style.transform = 'translate(-50%, 0)';
    } else {
      card.style.top = `${Math.max(16, r.top - alto - 18)}px`;
      card.style.transform = 'translate(-50%, 0)';
    }
  };

  const end = () => {
    marcarTourVista();
    tour.classList.remove('is-open');
    tour.setAttribute('aria-hidden', 'true');
    window.removeEventListener('resize', render);
    document.removeEventListener('i18n:changed', render);
    document.removeEventListener('keydown', onKey);
    onFinish();
  };
  const avanzar = () => { if (i < steps.length - 1) { i += 1; render(); } else end(); };
  const onKey = (e) => {
    if (e.key === 'Escape') end();
    else if (e.key === 'ArrowRight' || e.key === 'Enter') avanzar();
    else if (e.key === 'ArrowLeft' && i > 0) { i -= 1; render(); }
  };

  next.addEventListener('click', avanzar);
  skip.addEventListener('click', end);
  // tocar el fondo también avanza, como en los tutoriales de las apps
  tour.addEventListener('click', (e) => { if (e.target === tour || e.target === spot) avanzar(); });
  window.addEventListener('resize', render);
  document.addEventListener('i18n:changed', render);
  document.addEventListener('keydown', onKey);

  tour.classList.add('is-open');
  tour.setAttribute('aria-hidden', 'false');
  render();
  requestAnimationFrame(render);   // segunda pasada: ya con la altura real de la tarjeta
}

/* Tirar para recargar.
   El marco usa `html, body { overflow: hidden }` y todo el desplazamiento
   ocurre dentro de .screen-scroll, así que el navegador móvil no tiene un
   contenedor raíz al que aplicar su propio gesto de recarga. Se reimplementa
   aquí para devolverlo sin renunciar a la maqueta de dispositivo. */
function initPullToRefresh() {
  const señal = document.getElementById('pullRefresh');
  if (!señal) return;

  const UMBRAL = 72;          // px de arrastre necesarios para recargar
  const TOPE = 110;           // hasta dónde sigue al dedo
  let scroller = null;
  let x0 = 0;
  let y0 = 0;
  let d = 0;
  let activo = false;

  const colocar = (px) => {
    señal.style.transform = `translate(-50%, ${px}px) rotate(${px * 3}deg)`;
    señal.style.opacity = Math.min(1, px / UMBRAL).toFixed(2);
  };
  const soltar = () => {
    señal.classList.remove('is-dragging');
    señal.style.transform = '';
    señal.style.opacity = '';
    scroller = null;
    activo = false;
    d = 0;
  };

  document.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const sc = e.target.closest('.screen-scroll, .mock-body');
    if (!sc || sc.scrollTop > 0) { scroller = null; return; }
    scroller = sc;
    x0 = e.touches[0].clientX;
    y0 = e.touches[0].clientY;
    d = 0;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!scroller) return;
    const dy = e.touches[0].clientY - y0;
    const dx = e.touches[0].clientX - x0;

    // el gesto es nuestro solo si es claramente vertical, hacia abajo y desde arriba del todo
    if (!activo) {
      if (dy <= 10 || Math.abs(dy) < Math.abs(dx) * 1.5 || scroller.scrollTop > 0) {
        if (dy < 0 || Math.abs(dx) > Math.abs(dy)) scroller = null;
        return;
      }
      activo = true;
      señal.classList.add('is-dragging');
    }

    e.preventDefault();                       // sin esto el contenedor rebota
    d = Math.min(TOPE, (dy - 10) * 0.55);
    colocar(d);
    señal.classList.toggle('is-ready', d >= UMBRAL);
  }, { passive: false });

  const fin = () => {
    if (!activo) { soltar(); return; }
    if (d >= UMBRAL) {
      señal.classList.add('is-loading');
      colocar(UMBRAL);
      setTimeout(() => window.location.reload(), 220);
      return;
    }
    soltar();
  };
  document.addEventListener('touchend', fin, { passive: true });
  document.addEventListener('touchcancel', fin, { passive: true });
}

function initAppTabs() {
  const screens = Array.from(document.querySelectorAll('.screen'));
  const tabs = Array.from(document.querySelectorAll('.tab[data-tab]'));
  if (!screens.length) return;

  // Show one screen, sync the tab bar and (optionally) the URL hash
  const showScreen = (id, { reset = false, updateHash = true } = {}) => {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains('screen')) return false;

    screens.forEach((s) => {
      const active = s === target;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
    });
    tabs.forEach((t) => {
      const active = t.dataset.tab === id;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });

    if (reset) target.querySelector('.screen-scroll').scrollTop = 0;
    if (updateHash) {
      try { history.replaceState(history.state, '', `#${id}`); } catch { /* ignore */ }
    }
    document.dispatchEvent(new Event('app:screenchange'));
    return true;
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => showScreen(tab.dataset.tab, { reset: true }));
  });

  // In-app links (e.g. hero buttons) that point to a screen switch tabs instead of scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)?.classList.contains('screen')) return;
      e.preventDefault();
      showScreen(id, { reset: true });
    });
  });

  // Always open on the home screen: drop any #section left in the URL from a previous visit
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  showScreen(screens[0].id, { updateHash: false });
}

/* Sample views for the decorative home-screen apps (settings, calendar, camera, music, maps) */
function initMockApps() {
  const wrap = document.getElementById('mockApp');
  const body = document.getElementById('mockBody');
  const title = document.getElementById('mockTitle');
  const back = document.getElementById('mockBack');
  if (!wrap || !body || !title || !back) return;

  const en = () => document.documentElement.lang === 'en';
  let cleanup = null;

  // Each sample app opens with a short note on why that technology is part of the stack,
  // the tools around it, and a small interactive demo of it.
  const tagsHtml = (list) => `<div class="tags">${list.map((t) => `<span class="tag">${t}</span>`).join('')}</div>`;

  /* Apps propias del escritorio: cada una abre la misma ficha que muestra el
     timeline del portafolio. Se clona el DOM de la entrada real en lugar de
     reescribir el contenido, así la réplica no se desincroniza al cambiar
     textos o idioma. */
  const PROJECT_APPS = {
    amobile: { entry: 'project-amobile', thumb: 'project-amobile' },
    liftxto: { entry: 'project-liftxto', thumb: 'project-liftxto' },
    slassist: { entry: 'project-tesis', thumb: 'project-tesis' },
  };

  const projectView = (key) => (el) => {
    const { entry, thumb } = PROJECT_APPS[key];
    const src = document.querySelector(`#${entry} .project-card`);
    if (!src) return null;

    const copy = src.cloneNode(true);
    copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    // controles atados por JS al cargar la página: en el clon no responderían
    copy.querySelectorAll('.gallery-nav, .btn-ver-mas').forEach((n) => n.remove());
    copy.querySelectorAll('.project-desc-wrap').forEach((n) => n.classList.add('is-expanded'));
    copy.querySelectorAll('[data-reveal]').forEach((n) => n.removeAttribute('data-reveal'));

    el.classList.add('mock-project');
    el.appendChild(copy);

    // Pie: saltar a la ficha dentro del portafolio
    const jump = document.createElement('button');
    jump.type = 'button';
    jump.className = 'mock-jump';
    jump.textContent = en() ? 'Open in the portfolio' : 'Ver en el portafolio';
    jump.addEventListener('click', () => {
      close();
      document.querySelector('[data-open-app]')?.click();
      setTimeout(() => {
        document.querySelector('[data-tab="proyecto"]')?.click();
        document.querySelector(`[data-target="${thumb}"]`)?.click();
      }, 60);
    });
    el.appendChild(jump);
    return null;
  };

  /* "Mi CV": visor al estilo Drive, con una barrita propia de idioma y descarga
     sobre el documento. El PDF incrustado solo se usa donde el navegador lo sabe
     mostrar; en móvil se enseña la vista previa en imagen, que funciona en iOS. */
  const cvView = (el) => {
    const en = () => document.documentElement.lang === 'en';
    const t = (k) => (window.I18N ? window.I18N.get(en() ? 'en' : 'es', k) : '');
    const rutas = { es: 'assets/CV_Mario_Rodriguez_ES.pdf', en: 'assets/CV_Mario_Rodriguez_EN.pdf' };
    const vistas = { es: 'assets/img/cv-es.webp', en: 'assets/img/cv-en.webp' };

    el.classList.add('mock-drive');
    el.innerHTML = `
      <div class="cv-bar">
        <div class="cv-langs" role="group">
          <button type="button" class="cv-lang" data-cv-lang="es">ES</button>
          <button type="button" class="cv-lang" data-cv-lang="en">EN</button>
        </div>
        <a class="cv-dl" data-cv-dl download>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/>
          </svg><span></span>
        </a>
      </div>
      <div class="cv-doc">
        <img data-cv-img alt="">
        <iframe data-cv-frame title="CV" loading="lazy"></iframe>
      </div>`;

    // el idioma se elige en la barrita del visor, así que el chip de la barra
    // de la app sobra mientras Mi CV está abierta
    const chipIdioma = document.querySelector('.mock-bar [data-proxy="langToggle"]');
    if (chipIdioma) chipIdioma.style.display = 'none';

    /* Red de seguridad: un bloqueador de contenido puede cortar el PDF y dejar
       el marco vacío sin avisar. El evento de carga no sirve para detectarlo,
       porque el navegador da por cargada su propia página de error: se comprueba
       con una petición al archivo y, si no llega, manda la vista en imagen. */
    const doc = el.querySelector('.cv-doc');
    const marco = el.querySelector('[data-cv-frame]');
    const comprobar = (ruta) => {
      fetch(ruta, { method: 'HEAD', cache: 'no-store' })
        .then((r) => { if (!r.ok) throw new Error(r.status); doc.classList.remove('is-fallback'); })
        .catch(() => doc.classList.add('is-fallback'));
    };

    let lang = en() ? 'en' : 'es';
    const pintar = () => {
      el.querySelector('[data-cv-img]').src = vistas[lang];
      marco.src = `${rutas[lang]}#toolbar=0&navpanes=0&view=Fit`;
      comprobar(rutas[lang]);
      const dl = el.querySelector('[data-cv-dl]');
      dl.href = rutas[lang];
      dl.querySelector('span').textContent = t('cv.download');
      el.querySelectorAll('[data-cv-lang]').forEach((b) =>
        b.classList.toggle('is-active', b.dataset.cvLang === lang));
    };
    pintar();

    // el interruptor cambia el idioma de todo el portafolio, no solo del visor
    el.querySelectorAll('[data-cv-lang]').forEach((b) =>
      b.addEventListener('click', () => {
        lang = b.dataset.cvLang;
        if (window.I18N) window.I18N.apply(lang);   // dispara i18n:changed y repinta
        else pintar();
      }));

    // si se cambia el idioma del portafolio, el visor lo sigue
    const seguir = () => { lang = en() ? 'en' : 'es'; pintar(); };
    document.addEventListener('i18n:changed', seguir);
    return () => {
      document.removeEventListener('i18n:changed', seguir);
      if (chipIdioma) chipIdioma.style.display = '';
    };
  };

  const views = {
    flutter(el) {
      el.innerHTML = `
        <div class="mock-stack">
          <div class="mock-info">
            <p class="mock-intro">${en()
              ? 'Part of my stack: I use it to build cross-platform apps (Android and iOS) from a single codebase. Try the counter below — the same widget pattern I use in production.'
              : 'Parte de mi stack: lo uso para construir apps multiplataforma (Android e iOS) con un solo código base. Prueba el contador de abajo, hecho con el mismo patrón de widgets que uso en producción.'}</p>
            ${tagsHtml(['Dart', 'Provider', 'SQLite', 'Firebase'])}
          </div>
          <div class="mock-demo mock-counter">
            <div class="mock-counter-row">
              <button class="mock-fab mock-fab-ghost" type="button" id="mockMinus" aria-label="-1">−</button>
              <span class="mock-counter-value" id="mockCounterValue">0</span>
              <button class="mock-fab" type="button" id="mockFab" aria-label="+1">+</button>
            </div>
            <p class="mock-note" id="mockRebuilds"></p>
          </div>
        </div>`;
      let count = 0;
      let rebuilds = 0;
      const valueEl = el.querySelector('#mockCounterValue');
      const rebuildEl = el.querySelector('#mockRebuilds');
      const renderRebuilds = () => {
        rebuildEl.textContent = en()
          ? `${rebuilds} widget${rebuilds === 1 ? '' : 's'} rebuilt`
          : `${rebuilds} widget${rebuilds === 1 ? '' : 's'} reconstruido${rebuilds === 1 ? '' : 's'}`;
      };
      renderRebuilds();
      const bump = (delta) => {
        count += delta;
        rebuilds += 1;
        valueEl.textContent = String(count);
        renderRebuilds();
      };
      el.querySelector('#mockFab').addEventListener('click', () => bump(1));
      el.querySelector('#mockMinus').addEventListener('click', () => bump(-1));
    },

    reactnative(el) {
      const note = (platform) => (platform === 'ios'
        ? (en() ? 'iOS: pill-shaped button, SF-style weight.' : 'iOS: botón en forma de píldora, peso tipo SF.')
        : (en() ? 'Android: rounded-rect button, Material ripple.' : 'Android: botón rectangular redondeado, estilo Material.'));
      el.innerHTML = `
        <div class="mock-stack">
          <div class="mock-info">
            <p class="mock-intro">${en()
              ? 'Part of my stack: I use it when most of the code needs to be shared between Android and iOS without losing a native feel. Switch the platform below to see the same screen adapt.'
              : 'Parte de mi stack: lo uso cuando la mayor parte del código debe compartirse entre Android e iOS sin perder una sensación nativa. Cambia la plataforma abajo para ver cómo se adapta la misma pantalla.'}</p>
            ${tagsHtml(['JavaScript', 'TypeScript', 'Expo'])}
          </div>
          <div class="mock-demo">
            <div class="mock-segmented" id="mockSeg">
              <button type="button" class="is-active" data-platform="android">Android</button>
              <button type="button" data-platform="ios">iOS</button>
            </div>
            <div class="mock-rn-card" id="mockRnCard">
              <span class="mock-rn-dot"></span>
              <p class="mock-rn-label">Hola 👋</p>
              <button type="button" class="mock-rn-btn">${en() ? 'Tap me' : 'Tócame'}</button>
            </div>
            <p class="mock-note" id="mockRnNote">${note('android')}</p>
          </div>
        </div>`;
      const card = el.querySelector('#mockRnCard');
      const noteEl = el.querySelector('#mockRnNote');
      el.querySelectorAll('#mockSeg button').forEach((btn) => {
        btn.addEventListener('click', () => {
          el.querySelectorAll('#mockSeg button').forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          card.classList.toggle('is-ios', btn.dataset.platform === 'ios');
          noteEl.textContent = note(btn.dataset.platform);
        });
      });
    },

    android(el) {
      el.innerHTML = `
        <div class="mock-stack">
          <div class="mock-info">
            <p class="mock-intro">${en()
              ? 'Part of my stack: native development in Kotlin when a project needs maximum performance or direct access to the Android SDK. Try the button below, Material-style, then pick a dynamic color.'
              : 'Parte de mi stack: desarrollo nativo en Kotlin cuando el proyecto necesita el máximo rendimiento o acceso directo al SDK de Android. Prueba el botón de abajo, al estilo Material, y elige un color dinámico.'}</p>
            ${tagsHtml(['Kotlin', 'Jetpack Compose', 'Material You'])}
          </div>
          <div class="mock-demo mock-android">
            <button class="mock-fab mock-fab-android" type="button" id="mockSnackBtn" aria-label="Save">✓</button>
            <div class="mock-snackbar" id="mockSnackbar">${en() ? 'Saved' : 'Guardado'}</div>
            <div class="mock-swatches" id="mockSwatches"></div>
          </div>
        </div>`;
      const snackbar = el.querySelector('#mockSnackbar');
      const fab = el.querySelector('#mockSnackBtn');
      let snackTimer;
      fab.addEventListener('click', () => {
        clearTimeout(snackTimer);
        snackbar.classList.add('is-visible');
        snackTimer = setTimeout(() => snackbar.classList.remove('is-visible'), 1800);
      });
      const swatchWrap = el.querySelector('#mockSwatches');
      const palettes = [['#8bc34a', '#4c8c2b'], ['#38bdf8', '#1d4ed8'], ['#f97316', '#c2410c'], ['#ec4899', '#a21caf']];
      palettes.forEach(([c1, c2], i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', en() ? `Color ${i + 1}` : `Color ${i + 1}`);
        if (i === 0) b.classList.add('is-active');
        b.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
        b.addEventListener('click', () => {
          swatchWrap.querySelectorAll('button').forEach((x) => x.classList.remove('is-active'));
          b.classList.add('is-active');
          fab.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
        });
        swatchWrap.appendChild(b);
      });
      return () => clearTimeout(snackTimer);
    },

    ios(el) {
      const sets = {
        general: en() ? ['Wi-Fi', 'Bluetooth', 'Dark mode'] : ['Wi-Fi', 'Bluetooth', 'Modo oscuro'],
        privacy: en() ? ['Face ID', 'Location', 'Notifications'] : ['Face ID', 'Ubicación', 'Notificaciones'],
      };
      el.innerHTML = `
        <div class="mock-stack">
          <div class="mock-info">
            <p class="mock-intro">${en()
              ? "Part of my stack: native development in Swift to make the most of Apple's ecosystem. This is the grouped, switch-driven list typical of iOS."
              : 'Parte de mi stack: desarrollo nativo en Swift para aprovechar al máximo el ecosistema de Apple. Así luce el típico listado con interruptores de iOS.'}</p>
            ${tagsHtml(['Swift', 'UIKit', 'SwiftUI'])}
          </div>
          <div class="mock-demo">
            <div class="mock-segmented" id="mockIosSeg">
              <button type="button" class="is-active" data-set="general">${en() ? 'General' : 'General'}</button>
              <button type="button" data-set="privacy">${en() ? 'Privacy' : 'Privacidad'}</button>
            </div>
            <div class="mock-list" id="mockIosList"></div>
          </div>
        </div>`;
      const listEl = el.querySelector('#mockIosList');
      const render = (key) => {
        listEl.innerHTML = sets[key].map((label, i) =>
          `<label class="mock-row"><span>${label}</span><input class="mock-switch" type="checkbox" ${i !== 1 ? 'checked' : ''}></label>`
        ).join('');
      };
      render('general');
      el.querySelectorAll('#mockIosSeg button').forEach((btn) => {
        btn.addEventListener('click', () => {
          el.querySelectorAll('#mockIosSeg button').forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          render(btn.dataset.set);
        });
      });
    },

    edgeai(el) {
      const labels = en() ? ['Facial recognition', 'Live OCR'] : ['Reconocimiento facial', 'OCR en vivo'];
      el.innerHTML = `
        <div class="mock-stack">
          <div class="mock-info">
            <p class="mock-intro">${en()
              ? 'Part of my stack: I deploy Machine Learning models directly on-device, without depending on a server. This is what a real-time inference monitor would look like.'
              : 'Parte de mi stack: despliego modelos de Machine Learning directamente en el dispositivo, sin depender de un servidor. Así luciría un monitor de inferencia en tiempo real.'}</p>
            ${tagsHtml(en() ? ['TensorFlow Lite', 'OCR', 'Facial recognition'] : ['TensorFlow Lite', 'OCR', 'Reconocimiento facial'])}
          </div>
          <div class="mock-demo mock-ai">
            <p class="mock-ai-model" id="mockAiModel"></p>
            <div class="mock-ai-row"><span>${en() ? 'Latency' : 'Latencia'}</span><strong id="mockLatency">—</strong></div>
            <div class="mock-ai-row"><span>${en() ? 'Inferences/s' : 'Inferencias/s'}</span><strong id="mockThroughput">—</strong></div>
            <div class="mock-ai-row"><span>${en() ? 'Accuracy' : 'Precisión'}</span><strong id="mockAccuracy">—</strong></div>
            <div class="mock-ai-bars" id="mockAiBars"></div>
          </div>
        </div>`;
      const bars = el.querySelector('#mockAiBars');
      for (let i = 0; i < 12; i++) bars.appendChild(document.createElement('span'));
      const latencyEl = el.querySelector('#mockLatency');
      const throughputEl = el.querySelector('#mockThroughput');
      const accuracyEl = el.querySelector('#mockAccuracy');
      const tick = () => {
        latencyEl.textContent = `${(8 + Math.random() * 14).toFixed(1)} ms`;
        throughputEl.textContent = `${(35 + Math.random() * 50).toFixed(0)}/s`;
        accuracyEl.textContent = `${(90 + Math.random() * 9).toFixed(1)}%`;
        bars.querySelectorAll('span').forEach((s) => { s.style.height = `${18 + Math.random() * 42}px`; });
      };
      tick();
      const timer = setInterval(tick, 900);
      const modelEl = el.querySelector('#mockAiModel');
      let modelIndex = 0;
      const setModel = () => { modelEl.textContent = `● ${labels[modelIndex % labels.length]}`; };
      setModel();
      const modelTimer = setInterval(() => { modelIndex += 1; setModel(); }, 3000);
      return () => { clearInterval(timer); clearInterval(modelTimer); };
    },
  };

  Object.keys(PROJECT_APPS).forEach((k) => { views[k] = projectView(k); });
  views.cv = cvView;

  const close = () => {
    if (cleanup) cleanup();
    cleanup = null;
    wrap.classList.remove('is-open');
    wrap.setAttribute('aria-hidden', 'true');
    // back button returns to the home screen
    document.querySelector('.device')?.classList.add('is-home');
    document.getElementById('homeBtn')?.setAttribute('aria-pressed', 'true');
  };

  const open = (key) => {
    const btn = document.querySelector(`[data-mock="${key}"]`);
    const name = btn?.querySelector('.app-name');
    if (!name) return;
    if (cleanup) cleanup();
    cleanup = null;
    title.textContent = name.textContent;
    const i18nKey = name.getAttribute('data-i18n');
    if (i18nKey) title.setAttribute('data-i18n', i18nKey);
    else title.removeAttribute('data-i18n');
    body.className = 'mock-body';
    body.innerHTML = '';
    cleanup = views[key](body) || null;
    wrap.classList.add('is-open');
    wrap.setAttribute('aria-hidden', 'false');
    // the sample app takes over the screen, so the home screen is hidden under it
    document.querySelector('.device')?.classList.remove('is-home');
    document.getElementById('homeBtn')?.setAttribute('aria-pressed', 'false');
  };

  document.querySelectorAll('[data-mock]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.dataset.mock));
  });
  back.addEventListener('click', close);
  // the side home button also leaves a sample app and goes to the home screen
  document.getElementById('homeBtn')?.addEventListener('click', () => {
    if (wrap.classList.contains('is-open')) close();
  });
}

/* Drag-to-scroll with the mouse pointer: click and drag up/down to scroll the content,
   like swiping on a real phone. Touch keeps its native scrolling; this only reacts to the mouse. */
function initDragScroll() {
  const targets = document.querySelectorAll('.screen-scroll, .mock-body');
  targets.forEach((el) => {
    let startY = 0;
    let startScroll = 0;
    let dragging = false;
    let moved = false;

    const onMove = (e) => {
      if (!dragging) return;
      const dy = e.clientY - startY;
      if (!moved && Math.abs(dy) > 4) {
        moved = true;
        el.classList.add('is-dragging');
        // only capture the pointer once this is a real drag, so a plain click on a button or
        // link underneath isn't redirected to this container and lost; capture is a nice-to-have
        // (keeps the drag going if the cursor leaves the element), so a failure here must never
        // stop the scroll update below
        try { el.setPointerCapture?.(e.pointerId); } catch { /* ignore */ }
      }
      if (moved) {
        e.preventDefault();
        el.scrollTop = startScroll - dy;
      }
    };

    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      if (moved) {
        // swallow the click that follows a real drag, so links/buttons don't fire by accident
        const swallow = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
        document.addEventListener('click', swallow, { capture: true, once: true });
      }
      try { el.releasePointerCapture?.(e.pointerId); } catch { /* ignore */ }
    };

    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      startY = e.clientY;
      startScroll = el.scrollTop;
    });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
  });
}
