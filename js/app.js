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
});

/* Boot screen: plays once on the initial page load, simulating the device powering on.
   The home-screen/auto-open sequence (initLauncher) waits for BOOT_DURATION so its own
   timings stay exactly as they were before, just shifted to start once the device is "on". */
const BOOT_ON_DELAY = 400;
const BOOT_OFF_DELAY = 1300;
const BOOT_DURATION = 1750; // BOOT_OFF_DELAY + the 0.45s fade-out transition in css/app.css
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

/* Splash screen: plays on load and whenever the app is opened from the home screen */
let splashTimer;
function playSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  clearTimeout(splashTimer);
  splash.classList.remove('is-done');
  // restart the entrance and loading animations
  splash.querySelectorAll('img, .splash-name, .splash-bar > span').forEach((el) => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
  splashTimer = setTimeout(() => splash.classList.add('is-done'), 2000);
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
  // Opening the portfolio: short "Abriendo Mi Portafolio" notice, then the splash screen
  const opening = document.getElementById('launcherOpening');
  let openTimer;
  const openPortfolio = () => {
    if (openTimer) return;
    // simulate a tap on the app icon first, then show the notice
    const icon = document.querySelector('[data-open-app]');
    icon?.classList.remove('is-tapped');
    void icon?.offsetWidth;
    icon?.classList.add('is-tapped');
    openTimer = setTimeout(() => {
      opening?.classList.add('is-visible');
      openTimer = setTimeout(() => {
        opening?.classList.remove('is-visible');
        icon?.classList.remove('is-tapped');
        openTimer = null;
        setHome(false);
        playSplash();
      }, 1000);
    }, 500);
  };
  document.querySelectorAll('[data-open-app]').forEach((btn) => {
    btn.addEventListener('click', openPortfolio);
  });
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

  // On load the device shows its home screen; after a short pause it opens the portfolio app (with its splash)
  setHome(true);
  // The automatic opening is cancelled as soon as the user touches the home screen.
  // Waits for the boot screen to finish so this sequence's own timings stay as they were before.
  const autoOpenTimer = setTimeout(openPortfolio, BOOT_DURATION);
  const cancelAutoOpen = () => clearTimeout(autoOpenTimer);
  launcher.addEventListener('pointerdown', cancelAutoOpen, { once: true });
  launcher.addEventListener('click', cancelAutoOpen, { once: true });
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
  const locale = () => (en() ? 'en-US' : 'es-ES');
  let cleanup = null;

  // Real map: Leaflet + OpenStreetMap, loaded the first time the Maps sample app opens
  let leafletPromise = null;
  const loadLeaflet = () => {
    if (window.L) return Promise.resolve();
    if (!leafletPromise) {
      leafletPromise = new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = resolve;
        script.onerror = () => { leafletPromise = null; reject(); };
        document.head.appendChild(script);
      });
    }
    return leafletPromise;
  };

  // Approximate city per time zone, used when the browser does not give the exact location
  const zoneCenters = {
    'Europe/Madrid': [40.42, -3.7],
    'Europe/London': [51.5, -0.12],
    'Europe/Paris': [48.86, 2.35],
    'Europe/Berlin': [52.52, 13.4],
    'America/Guayaquil': [-0.23, -78.52],
    'America/Bogota': [4.71, -74.07],
    'America/Lima': [-12.05, -77.04],
    'America/Santiago': [-33.45, -70.67],
    'America/Argentina/Buenos_Aires': [-34.6, -58.38],
    'America/Mexico_City': [19.43, -99.13],
    'America/New_York': [40.71, -74.0],
    'America/Los_Angeles': [34.05, -118.24],
  };

  const locate = (map, marker, note, hint) => {
    const showAt = (lat, lng, zoom, text) => {
      map.setView([lat, lng], zoom);
      marker.setLatLng([lat, lng]);
      note.textContent = text;
    };
    const fallback = () => {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const c = zoneCenters[zone];
      if (c) {
        showAt(c[0], c[1], 5, (en() ? 'Approximate location from your time zone. ' : 'Ubicación aproximada según tu zona horaria. ') + hint);
      } else {
        note.textContent = hint;
      }
    };
    if (!navigator.geolocation) {
      fallback();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => showAt(pos.coords.latitude, pos.coords.longitude, 12, (en() ? 'Your current location. ' : 'Tu ubicación actual. ') + hint),
      fallback,
      { timeout: 8000, maximumAge: 600000 }
    );
  };

  const views = {
    settings(el) {
      const rows = en()
        ? ['Wi-Fi', 'Bluetooth', 'Notifications', 'Dark mode']
        : ['Wi-Fi', 'Bluetooth', 'Notificaciones', 'Modo oscuro'];
      el.innerHTML = `<div class="mock-list">${rows.map((label, i) =>
        `<label class="mock-row"><span>${label}</span><input class="mock-switch" type="checkbox" ${i < 3 ? 'checked' : ''} ${i === 3 ? 'data-dark' : ''}></label>`
      ).join('')}</div>`;
      const dark = el.querySelector('[data-dark]');
      dark.checked = document.documentElement.getAttribute('data-theme') !== 'light';
      dark.addEventListener('change', () => document.getElementById('themeToggle')?.click());
    },

    calendar(el) {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth();
      const monthName = new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(now);
      const weekdays = [];
      for (let i = 0; i < 7; i++) {
        weekdays.push(new Intl.DateTimeFormat(locale(), { weekday: 'narrow' }).format(new Date(2024, 0, 7 + i)));
      }
      const blanks = new Date(y, m, 1).getDay();
      const total = new Date(y, m + 1, 0).getDate();
      let cells = '';
      for (let i = 0; i < blanks; i++) cells += '<span></span>';
      for (let d = 1; d <= total; d++) {
        cells += `<button class="mock-day${d === now.getDate() ? ' is-today' : ''}" type="button">${d}</button>`;
      }
      el.innerHTML = `<h3 class="mock-h">${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h3>
        <div class="mock-cal">${weekdays.map((w) => `<span class="mock-wd">${w}</span>`).join('')}${cells}</div>
        <p class="mock-note" id="mockNote"></p>`;
      const note = el.querySelector('#mockNote');
      el.querySelectorAll('.mock-day').forEach((btn) => {
        btn.addEventListener('click', () => {
          el.querySelectorAll('.mock-day').forEach((b) => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          note.textContent = en() ? `Selected: ${btn.textContent} ${monthName}` : `Seleccionado: ${btn.textContent} de ${monthName}`;
        });
      });
    },

    camera(el) {
      el.innerHTML = `<div class="mock-viewfinder" id="mockView"><div class="mock-grid"></div></div>
        <div class="mock-camrow">
          <span class="mock-count" id="mockCount">0</span>
          <button class="mock-shutter" type="button" id="mockShutter" aria-label="${en() ? 'Take photo' : 'Tomar foto'}"></button>
          <span class="mock-thumb" id="mockThumb"></span>
        </div>`;
      let count = 0;
      el.querySelector('#mockShutter').addEventListener('click', () => {
        count += 1;
        el.querySelector('#mockCount').textContent = String(count);
        el.querySelector('#mockThumb').style.background = `hsl(${(count * 67) % 360} 70% 55%)`;
        const view = el.querySelector('#mockView');
        view.classList.add('is-flash');
        setTimeout(() => view.classList.remove('is-flash'), 250);
      });
    },

    music(el) {
      const tracks = ['Track 01', 'Track 02', 'Track 03'];
      let index = 0;
      let playing = false;
      let progress = 0;
      let timer = null;
      el.innerHTML = `<div class="mock-art"></div>
        <p class="mock-track" id="mockTrack"></p>
        <div class="mock-progress"><span id="mockBar"></span></div>
        <div class="mock-controls">
          <button class="mock-ctl" type="button" id="mockPrev" aria-label="${en() ? 'Previous' : 'Anterior'}">⏮</button>
          <button class="mock-ctl mock-play" type="button" id="mockPlay" aria-label="${en() ? 'Play' : 'Reproducir'}">▶</button>
          <button class="mock-ctl" type="button" id="mockNext" aria-label="${en() ? 'Next' : 'Siguiente'}">⏭</button>
        </div>`;
      const trackEl = el.querySelector('#mockTrack');
      const bar = el.querySelector('#mockBar');
      const playBtn = el.querySelector('#mockPlay');
      const render = () => {
        trackEl.textContent = tracks[index];
        bar.style.width = `${progress}%`;
        playBtn.textContent = playing ? '❚❚' : '▶';
      };
      const tick = () => {
        progress = (progress + 2) % 100;
        if (progress === 0) index = (index + 1) % tracks.length;
        render();
      };
      const setPlaying = (on) => {
        playing = on;
        clearInterval(timer);
        if (on) timer = setInterval(tick, 200);
        render();
      };
      playBtn.addEventListener('click', () => setPlaying(!playing));
      el.querySelector('#mockNext').addEventListener('click', () => { index = (index + 1) % tracks.length; progress = 0; render(); });
      el.querySelector('#mockPrev').addEventListener('click', () => { index = (index - 1 + tracks.length) % tracks.length; progress = 0; render(); });
      render();
      return () => clearInterval(timer);
    },

    maps(el) {
      el.innerHTML = `<div class="mock-map" id="mockMap"></div>
        <p class="mock-note" id="mockNote">${en() ? 'Finding your location…' : 'Buscando tu ubicación…'}</p>`;
      const note = el.querySelector('#mockNote');
      const hint = en() ? 'Tap the map to move the marker.' : 'Toca el mapa para mover el marcador.';
      let map = null;
      let alive = true;
      loadLeaflet().then(() => {
        if (!alive) return;
        map = window.L.map(el.querySelector('#mockMap')).setView([20, 0], 2);
        // Esri basemaps (no API key needed): dark style in dark mode, light style in light mode
        const dark = document.documentElement.getAttribute('data-theme') !== 'light';
        const style = dark ? 'Canvas/World_Dark_Gray_Base' : 'Canvas/World_Light_Gray_Base';
        window.L.tileLayer(`https://services.arcgisonline.com/ArcGIS/rest/services/${style}/MapServer/tile/{z}/{y}/{x}`, {
          maxZoom: 16,
          attribution: 'Tiles &copy; Esri',
        }).addTo(map);
        const marker = window.L.marker([20, 0]).addTo(map);
        map.on('click', (e) => marker.setLatLng(e.latlng));
        locate(map, marker, note, hint);
      }).catch(() => {
        note.textContent = en() ? 'The map could not be loaded.' : 'No se pudo cargar el mapa.';
      });
      return () => {
        alive = false;
        if (map) map.remove();
      };
    },
  };

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
    title.setAttribute('data-i18n', name.getAttribute('data-i18n'));
    body.className = key === 'maps' ? 'mock-body is-maps' : 'mock-body';
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
