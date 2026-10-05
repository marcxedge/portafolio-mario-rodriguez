// ==========================================================================
// Mario Rodríguez — App shell: bottom tabs and screen switching
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initAppTabs();
  initLauncher();
});

/* Device home screen: the side button shows it, the portfolio icon brings the app back */
function initLauncher() {
  const device = document.querySelector('.device');
  const launcher = document.getElementById('launcher');
  const homeBtn = document.getElementById('homeBtn');
  const clock = document.getElementById('launcherTime');
  if (!device || !launcher || !homeBtn) return;

  const updateClock = () => {
    if (!clock) return;
    const locale = document.documentElement.lang === 'en' ? 'en-US' : 'es-ES';
    clock.textContent = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  };

  const setHome = (on) => {
    device.classList.toggle('is-home', on);
    launcher.setAttribute('aria-hidden', String(!on));
    homeBtn.setAttribute('aria-pressed', String(on));
    if (on) updateClock();
  };

  homeBtn.addEventListener('click', () => setHome(!device.classList.contains('is-home')));
  document.querySelectorAll('[data-open-app]').forEach((btn) => {
    btn.addEventListener('click', () => setHome(false));
  });
  document.addEventListener('i18n:changed', updateClock);
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

  // Initial screen from the URL hash (e.g. #proyecto), otherwise the first one
  const initial = location.hash.slice(1);
  showScreen(document.getElementById(initial) ? initial : screens[0].id, { updateHash: false });
}
