// ==========================================================================
// Mario Rodríguez — Capa de recorrido: misiones, progreso y cierre
//
// La idea es la de un juego serio: objetivos claros, retroalimentación
// inmediata con contenido (no puntos vacíos) y un cierre que lleva a una
// acción. El contenido del portafolio se lee entero sin participar, y la
// capa se puede apagar desde el panel.
// ==========================================================================

const QUEST_KEY = 'mr-quest-v1';
const QUEST_OFF_KEY = 'mr-quest-off';

/* Cada misión se cumple con algo que el visitante hace de todos modos.
   `insight` es lo que se revela al cumplirla: una frase de contenido. */
const QUEST_MISSIONS = [
  { id: 'desktop', icon: 'grid' },
  { id: 'project', icon: 'layers' },
  { id: 'gallery', icon: 'image' },
  { id: 'career', icon: 'route' },
  { id: 'certs', icon: 'badge' },
  { id: 'lang', icon: 'globe' },
  { id: 'theme', icon: 'moon' },
  { id: 'contact', icon: 'send' },
];

const QUEST_ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layers: '<polygon points="12 2 2 8 12 14 22 8 12 2"/><polyline points="2 14 12 20 22 14"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5-5 5-2-2-5 5"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h5a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h5"/>',
  badge: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>',
};

function questLang() {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}
function questText(key) {
  return window.I18N ? window.I18N.get(questLang(), key) || '' : '';
}

function questLoad() {
  try {
    const raw = localStorage.getItem(QUEST_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}
function questSave(done) {
  try { localStorage.setItem(QUEST_KEY, JSON.stringify([...done])); } catch { /* modo privado */ }
}
function questIsOff() {
  try { return localStorage.getItem(QUEST_OFF_KEY) === '1'; } catch { return false; }
}
function questSetOff(off) {
  try { localStorage.setItem(QUEST_OFF_KEY, off ? '1' : '0'); } catch { /* modo privado */ }
}

function initQuest() {
  const device = document.querySelector('.device');
  const panel = document.getElementById('questPanel');
  const list = document.getElementById('questList');
  const toast = document.getElementById('questToast');
  if (!device || !panel || !list || !toast) return;

  const rings = Array.from(document.querySelectorAll('[data-quest-ring]'));
  const done = questLoad();
  const total = QUEST_MISSIONS.length;
  let apagada = questIsOff();
  let cola = Promise.resolve();

  // ---- Pintado -----------------------------------------------------------

  const pintarAnillos = () => {
    const pct = done.size / total;
    rings.forEach((r) => {
      r.style.setProperty('--quest-p', pct.toFixed(3));
      r.querySelector('[data-quest-count]').textContent = `${done.size}`;
      r.classList.toggle('is-complete', done.size === total);
      r.hidden = apagada;
      r.setAttribute('aria-label', `${questText('quest.aria')} ${done.size}/${total}`);
    });
    document.getElementById('questProgressText').textContent = `${done.size} / ${total}`;
    document.getElementById('questBarFill').style.width = `${pct * 100}%`;
  };

  const pintarLista = () => {
    list.innerHTML = QUEST_MISSIONS.map((m) => {
      const ok = done.has(m.id);
      return `
        <li class="quest-item${ok ? ' is-done' : ''}">
          <span class="quest-item-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${QUEST_ICONS[m.icon]}</svg>
          </span>
          <span class="quest-item-body">
            <strong>${questText(`quest.${m.id}Title`)}</strong>
            <span class="quest-item-text">${ok ? questText(`quest.${m.id}Insight`) : questText(`quest.${m.id}Hint`)}</span>
          </span>
        </li>`;
    }).join('');

    const fin = document.getElementById('questDone');
    fin.hidden = done.size < total;
    fin.querySelector('[data-quest-done-title]').textContent = questText('quest.doneTitle');
    fin.querySelector('[data-quest-done-text]').textContent = questText('quest.doneText');
    fin.querySelector('[data-quest-done-cta]').textContent = questText('quest.doneCta');

    document.getElementById('questTitle').textContent = questText('quest.title');
    document.getElementById('questLead').textContent = questText('quest.lead');
    document.getElementById('questReset').textContent = questText('quest.reset');
    document.getElementById('questOff').textContent = questText(apagada ? 'quest.on' : 'quest.off');
  };

  const pintar = () => { pintarAnillos(); pintarLista(); };

  // ---- Aviso de misión cumplida -----------------------------------------

  const avisar = (m) => {
    cola = cola.then(() => new Promise((listo) => {
      toast.innerHTML = `
        <span class="quest-toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <span class="quest-toast-body">
          <strong>${questText(`quest.${m.id}Title`)}</strong>
          <span>${questText(`quest.${m.id}Insight`)}</span>
        </span>`;
      toast.classList.add('is-visible');
      setTimeout(() => {
        toast.classList.remove('is-visible');
        setTimeout(listo, 350);
      }, 3400);
    }));
  };

  // ---- Registro de misiones ---------------------------------------------

  const cumplir = (id) => {
    if (apagada || done.has(id)) return;
    const m = QUEST_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    done.add(id);
    questSave(done);
    pintar();
    avisar(m);
    if (done.size === total) setTimeout(() => abrir(), 1200);
  };
  window.questComplete = cumplir;   // lo usan main.js y app.js

  // ---- Panel -------------------------------------------------------------

  const abrir = () => {
    pintarLista();
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
  };
  const cerrar = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  };

  rings.forEach((r) => r.addEventListener('click', abrir));
  document.getElementById('questClose').addEventListener('click', cerrar);
  panel.addEventListener('click', (e) => { if (e.target === panel) cerrar(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) cerrar();
  });

  document.getElementById('questReset').addEventListener('click', () => {
    done.clear();
    questSave(done);
    pintar();
  });
  document.getElementById('questOff').addEventListener('click', () => {
    apagada = !apagada;
    questSetOff(apagada);
    if (apagada) toast.classList.remove('is-visible');
    pintar();
    if (apagada) cerrar();
  });

  document.addEventListener('i18n:changed', pintar);

  // ---- Disparadores ------------------------------------------------------

  document.querySelectorAll('[data-mock]').forEach((b) => {
    b.addEventListener('click', () => cumplir('desktop'));
  });
  document.getElementById('langToggle')?.addEventListener('click', () => cumplir('lang'));
  document.getElementById('themeToggle')?.addEventListener('click', () => cumplir('theme'));
  document.addEventListener('app:screenchange', () => {
    if (document.querySelector('.screen.is-active')?.id === 'contacto') cumplir('contact');
  });

  // el carril de certificaciones, recorrido hasta el final
  const rail = document.querySelector('.cert-timeline');
  rail?.addEventListener('scroll', () => {
    if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 12) cumplir('certs');
  }, { passive: true });

  pintar();
  initAudience();
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
    const done = document.querySelector('[data-quest-done-text]');
    if (done) done.textContent = window.I18N
      ? window.I18N.get(document.documentElement.lang === 'en' ? 'en' : 'es', 'quest.doneTextImpact')
      : done.textContent;
    if (window.I18N) window.I18N.apply(document.documentElement.lang || 'es');
  };
  cambiar();
  document.addEventListener('i18n:changed', cambiar);
}
