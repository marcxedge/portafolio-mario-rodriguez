// ==========================================================================
// Mario Rodríguez — Portfolio i18n (ES / EN)
// ==========================================================================

const I18N_TRANSLATIONS = {
  es: {
    meta: {
      title: 'Mario Rodríguez Cedeño · Desarrollador Mobile & Edge AI',
      description: 'Portafolio de Mario Antonio Rodríguez Cedeño — Ingeniero en Sistemas Informáticos especializado en Flutter, React Native, Android, iOS, Edge AI y Machine Learning.'
    },
    nav: {
      home: 'Inicio', about: 'Sobre mí', experience: 'Experiencia', skills: 'Habilidades',
      project: 'Proyectos', certifications: 'Certificaciones', volunteering: 'Voluntariado',
      contact: 'Contacto', downloadCV: 'Descargar CV'
    },
    a11y: {
      toggleTheme: 'Cambiar tema', scrollDown: 'Desplazarse hacia abajo', openMenu: 'Abrir menú',
      backToTop: 'Volver arriba', changeLanguage: 'Cambiar idioma',
      galleryPrev: 'Ver capturas anteriores', galleryNext: 'Ver capturas siguientes',
      closeModal: 'Cerrar'
    },
    hero: {
      eyebrow: 'Ingeniero en Sistemas Informáticos', greeting: 'Hola, soy', role: 'Desarrollador',
      description: 'Especializado en el diseño, desarrollo y despliegue de aplicaciones móviles nativas y multiplataforma. Apasionado por la integración de hardware, Edge AI y la optimización de modelos de Machine Learning para crear soluciones con impacto real.',
      badge: 'Disponible para trabajar · hasta 30h/semana (estancia por estudios) · Valencia, España',
      ctaPrimary: 'Hablemos', ctaSecondary: 'Ver experiencia',
      photoAlt: 'Foto de Mario Antonio Rodríguez Cedeño',
      typedWords: ['Mobile.', 'Flutter.', 'React Native.', 'Edge AI.', 'Multiplataforma.']
    },
    about: {
      tag: 'Sobre mí', title: 'Perfil profesional',
      text: 'Ingeniero en Sistemas Informáticos con sólida experiencia en el diseño, desarrollo y despliegue de <strong>aplicaciones móviles nativas y multiplataforma</strong>. Especializado en la integración de hardware, <strong>Edge AI</strong> y optimización de modelos de <strong>Machine Learning</strong>. Apasionado por la innovación tecnológica y la creación de soluciones que aporten valor real a los usuarios y al negocio.<br><br>Originario de Ecuador, actualmente cursando una maestría en Burjassot (Valencia, España).',
      statYears: 'Años de experiencia', statCerts: 'Certificaciones', statSdk: 'Plataformas SDK (DJI)', statCompanies: 'Empresas / roles',
      value1Title: 'Apps móviles', value1Text: 'Desarrollo de aplicaciones nativas y multiplataforma end-to-end.',
      value2Title: 'Hardware & SDKs', value2Text: 'Integración avanzada de SDKs (DJI, sensores, dispositivos IoT).',
      value3Title: 'Edge AI & ML', value3Text: 'Machine Learning y despliegue de modelos en dispositivos móviles.',
      value4Title: 'Despliegue', value4Text: 'Arquitectura y publicación en Google Play y App Store.'
    },
    experience: {
      tag: 'Trayectoria', title: 'Experiencia profesional',
      job1Date: 'Mar 2025 — Sep 2026', job1Title: 'Líder IDS-Mobile', job1Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job1Bullet1: 'Liderazgo técnico en la arquitectura y desarrollo end-to-end de apps móviles.',
      job1Bullet2: 'Integración avanzada de SDKs de DJI para control y automatización de drones.',
      job1Bullet3: 'Implementación de soluciones de Edge AI y despliegue de modelos de ML (reconocimiento facial y OCR) en tiempo real.',
      job2Date: 'Abr 2024 — Sep 2026', job2Title: 'Desarrollador Mobile', job2Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job2Bullet1: 'Desarrollo y mantenimiento de apps nativas (Android/iOS) y multiplataforma.',
      job2Bullet2: 'Gestión de despliegues y lanzamientos (code signing, aprovisionamiento) en Google Play Console y App Store Connect.',
      job3Date: 'Abr 2023 — Mar 2024', job3Title: 'Frontend Developer', job3Company: 'Pardux · Quito, Pichincha, Ecuador',
      job3Bullet1: 'Maquetación y mantenimiento de interfaces de usuario (UI) para aplicaciones web responsivas y escalables.',
      job4Date: 'Oct 2020 — Nov 2022', job4Title: 'Especialista I+D', job4Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job4Bullet1: 'Investigación e implementación de nuevas tecnologías, arquitecturas y metodologías para el desarrollo de apps.'
    },
    skills: {
      tag: 'Stack', title: 'Competencias técnicas',
      mobileTitle: 'Desarrollo Mobile', aiTitle: 'IA & Integración', mlMobile: 'Machine Learning Móvil', djiSdk: 'SDK DJI (Drones)',
      frontendTitle: 'Frontend Web', backendTitle: 'Backend & BD', methodsTitle: 'Metodologías', toolsTitle: 'Herramientas',
      softTitle: 'Competencias blandas', soft1: 'Liderazgo', soft2: 'Resolución de problemas', soft3: 'Aprendizaje continuo', soft4: 'Proactividad',
      langTitle: 'Idiomas', langSpanish: 'Español', langNative: 'Nativo',
      langEnWritten: 'Inglés — Escrito', langEnSpoken: 'Inglés — Hablado', langEnComprehension: 'Inglés — Interpretado'
    },
    education: {
      tag: 'Academia', title: 'Formación académica',
      masterDate: 'Sep 2026 — Presente', masterTitle: 'Máster Universitario en Tecnologías Web, Computación en la Nube y Aplicaciones Móviles',
      masterPlace: 'Universitat de València · Valencia, España',
      degreeDate: 'Oct 2015 — Ago 2023', degreeTitle: 'Ingeniería en Sistemas Informáticos',
      degreePlace: 'Universidad Técnica de Manabí · Portoviejo, Ecuador'
    },
    project: {
      tag: 'Proyecto de titulación', title: 'Comunicación aumentada para inclusión auditiva',
      date: 'Jul 2022 — Ago 2023', affiliation: 'Asociado con Universidad Técnica de Manabí',
      cardTitle: 'App Móvil Colaborativa de Comunicación Aumentada para Inclusión Auditiva',
      description: 'Proyecto de titulación enfocado en accesibilidad: una aplicación que traduce texto a lenguaje de señas mediante la generación de imágenes y gestos en tiempo real, apoyada en un modelo de Machine Learning personalizado.',
      point1: '<strong>Android SDK (Java)</strong> y <strong>Firebase Cloud</strong> como base técnica.',
      point2: 'Modelo de <strong>Machine Learning personalizado</strong> entrenado para el caso de uso.',
      point3: 'Transcripción automática de texto a lenguaje de señas mediante generación de imágenes y gestos en tiempo real.',
      tagAccessibility: 'Accesibilidad',
      galleryTitle: 'Capturas de la aplicación',
      shot1Title: 'Pantalla de inicio',
      shot1Desc: 'Punto de entrada de la app: desde aquí se accede al asistente de reconocimiento de señas y voz, al diccionario visual del abecedario, y se puede cambiar el idioma principal.',
      shot2Title: 'Diccionario visual',
      shot2Desc: 'Listado alfabético navegable donde el usuario elige una letra para consultar de inmediato su gesto correspondiente en Lenguaje de Señas.',
      shot3Title: 'Detalle de gesto por letra',
      shot3Desc: 'Al seleccionar una letra del diccionario, la app despliega la ilustración exacta del gesto en Lenguaje de Señas, pensada como material de aprendizaje rápido.',
      shot4Title: 'Asistente de comunicación',
      shot4Desc: 'Pantalla principal del asistente: el usuario puede escribir su propio texto, o iniciar el reconocimiento de voz o de señas, con control de entonación y velocidad.',
      shot5Title: 'Redacción del mensaje',
      shot5Desc: 'El usuario escribe libremente el mensaje que desea comunicar; ese texto es la base tanto para la síntesis de voz como para su conversión a señas.',
      shot6Title: 'Conversión a Lenguaje de Señas',
      shot6Desc: 'Un texto puede transformarse al instante en su representación gráfica en Lenguaje de Señas, mostrando la secuencia completa de gestos a comunicar.',
      shot7Title: 'Selector de modo de entrada',
      shot7Desc: 'Menú de acceso rápido para alternar entre reconocimiento de voz y reconocimiento de señas por cámara, según la necesidad del usuario.',
      shot8Title: 'Reconocimiento de voz',
      shot8Desc: 'Integración con los servicios de voz de Google: el habla del usuario se transcribe automáticamente a texto dentro de la conversación.',
      shot9Title: 'Reconocimiento de señas por cámara',
      shot9Desc: 'Modelo de Machine Learning personalizado que detecta en tiempo real los puntos clave de la mano para reconocer cada seña y componer el mensaje letra por letra.'
    },
    certifications: {
      tag: 'Credenciales', title: 'Certificaciones',
      cert1Title: 'Curso de Flutter', cert1Meta: 'Platzi · feb 2023',
      cert2Title: 'Bases Técnicas de Android', cert2Meta: 'Platzi · mar 2023',
      cert3Title: 'Diseño de Interfaces con Android Studio', cert3Meta: 'Platzi · mar 2023',
      cert4Title: 'Android Enterprise Associate', cert4Meta: 'Android · sep 2024',
      cert5Title: 'Android Enterprise Professional', cert5Meta: 'Android · dic 2024',
      cert6Title: 'Samsung Knox Associate', cert6Meta: 'Samsung · ago 2024',
      cert7Title: 'Samsung Knox Professional', cert7Meta: 'Samsung · sep 2024',
      showCredential: 'Mostrar credencial'
    },
    volunteering: {
      tag: 'Compromiso social', title: 'Voluntariado', role: 'Aspirante',
      date: 'May 2022 — Oct 2023 · 1 año 6 meses'
    },
    contact: {
      tag: 'Contacto', title: '¿Hablamos de tu próximo proyecto?',
      description: 'Disponible para trabajar hasta 30h/semana en Valencia (estancia por estudios) o en remoto. Escríbeme y con gusto conversamos.',
      emailLabel: 'Email', locationLabel: 'Ubicación', locationValue: 'Burjassot, Valencia (España)'
    },
    footer: {
      rights: 'Todos los derechos reservados.'
    }
  },

  en: {
    meta: {
      title: 'Mario Rodríguez Cedeño · Mobile Developer & Edge AI',
      description: 'Portfolio of Mario Antonio Rodríguez Cedeño — Computer Systems Engineer specialized in Flutter, React Native, Android, iOS, Edge AI, and Machine Learning.'
    },
    nav: {
      home: 'Home', about: 'About', experience: 'Experience', skills: 'Skills',
      project: 'Projects', certifications: 'Certifications', volunteering: 'Volunteering',
      contact: 'Contact', downloadCV: 'Download CV'
    },
    a11y: {
      toggleTheme: 'Switch theme', scrollDown: 'Scroll down', openMenu: 'Open menu',
      backToTop: 'Back to top', changeLanguage: 'Change language',
      galleryPrev: 'View previous screenshots', galleryNext: 'View next screenshots',
      closeModal: 'Close'
    },
    hero: {
      eyebrow: 'Computer Systems Engineer', greeting: "Hi, I'm", role: 'Developer',
      description: 'Specialized in the design, development, and deployment of native and cross-platform mobile applications. Passionate about hardware integration, Edge AI, and Machine Learning model optimization to build solutions with real impact.',
      badge: 'Available for work · up to 30h/week (student residence permit) · Valencia, Spain',
      ctaPrimary: "Let's talk", ctaSecondary: 'View experience',
      photoAlt: 'Photo of Mario Antonio Rodríguez Cedeño',
      typedWords: ['Mobile.', 'Flutter.', 'React Native.', 'Edge AI.', 'Cross-platform.']
    },
    about: {
      tag: 'About me', title: 'Professional Profile',
      text: "Computer Systems Engineer with solid experience in the design, development, and deployment of <strong>native and cross-platform mobile applications</strong>. Specialized in hardware integration, <strong>Edge AI</strong>, and <strong>Machine Learning</strong> model optimization. Passionate about technological innovation and building solutions that deliver real value to users and the business.<br><br>Originally from Ecuador, currently pursuing a master's degree in Burjassot (Valencia, Spain).",
      statYears: 'Years of experience', statCerts: 'Certifications', statSdk: 'SDK Platforms (DJI)', statCompanies: 'Companies / roles',
      value1Title: 'Mobile Apps', value1Text: 'End-to-end development of native and cross-platform applications.',
      value2Title: 'Hardware & SDKs', value2Text: 'Advanced integration of SDKs (DJI, sensors, IoT devices).',
      value3Title: 'Edge AI & ML', value3Text: 'Machine Learning and model deployment on mobile devices.',
      value4Title: 'Deployment', value4Text: 'Architecture and publishing on Google Play and App Store.'
    },
    experience: {
      tag: 'Career Path', title: 'Professional Experience',
      job1Date: 'Mar 2025 — Sep 2026', job1Title: 'IDS-Mobile Lead', job1Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job1Bullet1: 'Technical leadership in the architecture and end-to-end development of mobile apps.',
      job1Bullet2: 'Advanced integration of DJI SDKs for drone control and automation.',
      job1Bullet3: 'Implementation of Edge AI solutions and deployment of ML models (facial recognition and OCR) in real time.',
      job2Date: 'Apr 2024 — Sep 2026', job2Title: 'Mobile Developer', job2Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job2Bullet1: 'Development and maintenance of native (Android/iOS) and cross-platform apps.',
      job2Bullet2: 'Management of deployments and releases (code signing, provisioning) on Google Play Console and App Store Connect.',
      job3Date: 'Apr 2023 — Mar 2024', job3Title: 'Frontend Developer', job3Company: 'Pardux · Quito, Pichincha, Ecuador',
      job3Bullet1: 'Layout and maintenance of user interfaces (UI) for responsive and scalable web applications.',
      job4Date: 'Oct 2020 — Nov 2022', job4Title: 'R&D Specialist', job4Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job4Bullet1: 'Research and implementation of new technologies, architectures, and methodologies for app development.'
    },
    skills: {
      tag: 'Stack', title: 'Technical Skills',
      mobileTitle: 'Mobile Development', aiTitle: 'AI & Integration', mlMobile: 'Mobile Machine Learning', djiSdk: 'DJI SDK Integration (Drones)',
      frontendTitle: 'Frontend Web', backendTitle: 'Backend & DB', methodsTitle: 'Methodologies', toolsTitle: 'Tools',
      softTitle: 'Soft Skills', soft1: 'Leadership', soft2: 'Problem Solving', soft3: 'Continuous Learning', soft4: 'Proactivity',
      langTitle: 'Languages', langSpanish: 'Spanish', langNative: 'Native',
      langEnWritten: 'English — Written', langEnSpoken: 'English — Spoken', langEnComprehension: 'English — Comprehension'
    },
    education: {
      tag: 'Academic Background', title: 'Education',
      masterDate: 'Sep 2026 — Present', masterTitle: "Master's Degree in Web Technologies, Cloud Computing and Mobile Applications",
      masterPlace: 'Universitat de València · Valencia, Spain',
      degreeDate: 'Oct 2015 — Aug 2023', degreeTitle: 'Computer Systems Engineering',
      degreePlace: 'Universidad Técnica de Manabí · Portoviejo, Ecuador'
    },
    project: {
      tag: 'Thesis Project', title: 'Augmented communication for hearing inclusion',
      date: 'Jul 2022 — Aug 2023', affiliation: 'Associated with Universidad Técnica de Manabí',
      cardTitle: 'Collaborative Mobile App for Augmented Communication for Hearing Inclusion',
      description: 'Thesis project focused on accessibility: an application that translates text into sign language through real-time image and gesture generation, powered by a custom Machine Learning model.',
      point1: '<strong>Android SDK (Java)</strong> and <strong>Firebase Cloud</strong> as the technical foundation.',
      point2: 'Custom <strong>Machine Learning model</strong> trained for the use case.',
      point3: 'Automatic transcription of text into sign language through real-time image and gesture generation.',
      tagAccessibility: 'Accessibility',
      galleryTitle: 'App screenshots',
      shot1Title: 'Home screen',
      shot1Desc: "The app's entry point: from here users launch the sign-language and voice recognition assistant, browse the visual sign-language dictionary, or switch the app's language.",
      shot2Title: 'Visual dictionary',
      shot2Desc: 'A scrollable alphabetical list where the user picks a letter to instantly look up its corresponding Sign Language gesture.',
      shot3Title: 'Letter gesture detail',
      shot3Desc: 'Selecting a letter from the dictionary displays the exact Sign Language gesture illustration, designed as quick learning material.',
      shot4Title: 'Communication assistant',
      shot4Desc: "The assistant's home screen: users can type their own text, or trigger voice or sign-language recognition, with control over intonation and speed.",
      shot5Title: 'Writing the message',
      shot5Desc: 'The user freely types the message they want to communicate; that text drives both the voice synthesis and its later conversion into sign language.',
      shot6Title: 'Text-to-sign conversion',
      shot6Desc: 'Any text can be instantly transformed into its Sign Language graphical representation, showing the full gesture sequence to communicate.',
      shot7Title: 'Input mode selector',
      shot7Desc: "Quick-access menu to switch between voice recognition and camera-based sign recognition, depending on the user's needs.",
      shot8Title: 'Voice recognition',
      shot8Desc: "Integrated with Google's voice services: the user's speech is automatically transcribed into text within the conversation.",
      shot9Title: 'Camera-based sign recognition',
      shot9Desc: "A custom Machine Learning model detects the hand's key points in real time to recognize each sign and build the message letter by letter."
    },
    certifications: {
      tag: 'Credentials', title: 'Certifications',
      cert1Title: 'Flutter Course', cert1Meta: 'Platzi · Feb 2023',
      cert2Title: 'Android Technical Foundations Course', cert2Meta: 'Platzi · Mar 2023',
      cert3Title: 'Interface Design with Android Studio Course', cert3Meta: 'Platzi · Mar 2023',
      cert4Title: 'Android Enterprise Associate', cert4Meta: 'Android · Sep 2024',
      cert5Title: 'Android Enterprise Professional', cert5Meta: 'Android · Dec 2024',
      cert6Title: 'Samsung Knox Associate', cert6Meta: 'Samsung · Aug 2024',
      cert7Title: 'Samsung Knox Professional', cert7Meta: 'Samsung · Sep 2024',
      showCredential: 'View credential'
    },
    volunteering: {
      tag: 'Social Commitment', title: 'Volunteering', role: 'Aspirant',
      date: 'May 2022 — Oct 2023 · 1 yr 6 mos'
    },
    contact: {
      tag: 'Contact', title: "Shall we talk about your next project?",
      description: "Available to work up to 30h/week in Valencia (student residence permit) or remotely. Reach out and let's talk.",
      emailLabel: 'Email', locationLabel: 'Location', locationValue: 'Burjassot, Valencia (Spain)'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  }
};

const I18N_STORAGE_KEY = 'mr-lang';
const I18N_CV_PATHS = { es: 'assets/CV_Mario_Rodriguez.pdf', en: 'assets/CV_Mario_Rodriguez_EN.pdf' };

function i18nGet(lang, key) {
  return key.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : null), I18N_TRANSLATIONS[lang]);
}

function i18nGetStoredLang() {
  try {
    const stored = localStorage.getItem(I18N_STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch { /* ignore */ }
  return 'es';
}

function i18nGetUrlLang() {
  try {
    const value = new URLSearchParams(window.location.search).get('lang');
    if (value === 'es' || value === 'en') return value;
  } catch { /* ignore */ }
  return null;
}

function i18nGetInitialLang() {
  return i18nGetUrlLang() || i18nGetStoredLang();
}

function i18nSyncUrl(lang) {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') === lang) return;
    url.searchParams.set('lang', lang);
    window.history.replaceState(window.history.state, '', url);
  } catch { /* ignore */ }
}

function i18nApply(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = i18nGet(lang, el.getAttribute('data-i18n'));
    if (value !== null) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const value = i18nGet(lang, el.getAttribute('data-i18n-html'));
    if (value !== null) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      const value = i18nGet(lang, key);
      if (value !== null) el.setAttribute(attr, value);
    });
  });

  const cvLink = document.getElementById('cvDownload');
  if (cvLink) cvLink.setAttribute('href', I18N_CV_PATHS[lang]);

  const langBtn = document.getElementById('langToggle');
  const langLabel = document.getElementById('langToggleLabel');
  if (langBtn && langLabel) {
    const nextLang = lang === 'es' ? 'en' : 'es';
    langLabel.textContent = nextLang.toUpperCase();
    const label = i18nGet(lang, 'a11y.changeLanguage');
    langBtn.setAttribute('aria-label', label);
    langBtn.setAttribute('title', label);
  }

  try { localStorage.setItem(I18N_STORAGE_KEY, lang); } catch { /* ignore */ }
  i18nSyncUrl(lang);

  document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
}

window.I18N = { apply: i18nApply, get: i18nGet, getStoredLang: i18nGetStoredLang, getInitialLang: i18nGetInitialLang };
