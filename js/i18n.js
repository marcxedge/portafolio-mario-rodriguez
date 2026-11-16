// ==========================================================================
// Mario Rodríguez — Portfolio i18n (ES / EN)
// ==========================================================================

const I18N_TRANSLATIONS = {
  es: {
    meta: {
      title: 'Mario Rodríguez Cedeño · Desarrollador Móvil & Edge AI',
      description: 'Portafolio de Mario Antonio Rodríguez Cedeño — Desarrollador Móvil especializado en Flutter, React Native, Android, iOS, Edge AI y Machine Learning.'
    },
    appbar: {
      brand: 'Mi Portafolio'
    },
    launcher: {
      screen: 'Pantalla de inicio del dispositivo',
      app: 'Mi Portafolio',
      homeButton: 'Ir a la pantalla de inicio',
      flutter: 'Flutter',
      reactnative: 'React Native',
      android: 'Android',
      ios: 'iOS',
      edgeai: 'Edge AI',
      unavailable: 'App no disponible',
      opening: 'Abriendo Mi Portafolio'
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
      greeting: 'Hola, soy', role: 'Desarrollador Móvil',
      description: 'Construyo apps para Android e iOS que se publican, se usan y funcionan incluso sin internet. 4 años, 3 apps en producción para empresas de sectores como energía, tecnología y consumo masivo.',
      badge: 'Disponible para trabajar · hasta 30 h/semana (estancia por estudios) · Valencia, España',
      ctaPrimary: 'Hablemos', ctaSecondary: 'Ver experiencia',
      photoAlt: 'Foto de Mario Antonio Rodríguez Cedeño',
      typedWords: ['Flutter.', 'React Native.', 'Android.', 'Edge AI.', 'Kotlin.']
    },
    about: {
      tag: 'Sobre mí', title: 'Perfil profesional',
      text: 'Desarrollador Móvil con 4 años construyendo apps para <strong>Android e iOS</strong> que se publican, se usan y funcionan incluso sin internet. He liderado equipos técnicos y entregado soluciones a empresas de <strong>sectores como energía, gobierno, tecnología y consumo masivo</strong> — desde prototipos hasta apps publicadas en las tiendas oficiales.<br><br>Originario de Ecuador, ahora en Valencia cursando un Máster en tecnologías web, nube y móvil en la <strong>Universitat de València</strong>.',
      statYears: 'Años de experiencia', statCerts: 'Certificaciones', statSdk: 'Apps en producción', statCompanies: 'Clientes destacados',
      value1Title: 'Apps móviles', value1Text: 'Apps nativas y multiplataforma de principio a fin.',
      value2Title: 'Hardware & SDKs', value2Text: 'Integración de hardware: drones, sensores e IoT.',
      value3Title: 'Edge AI & ML', value3Text: 'IA que corre en el móvil, sin depender de internet.',
      value4Title: 'Despliegue', value4Text: 'Publicación en Google Play y App Store.'
    },
    experience: {
      tag: 'Trayectoria', title: 'Experiencia profesional',
      job1Date: 'Mar 2025 — Sep 2026', job1Title: 'Líder de Equipo Móvil', job1Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job1Bullet1: 'Lideré el equipo que construyó la app de principio a fin — arquitectura, código y publicación.',
      job1Bullet2: 'Conecté drones reales a una app móvil (SDK de DJI).',
      job1Bullet3: 'Metí IA en el dispositivo: reconocimiento facial y lectura de texto, sin necesitar internet.',
      job2Date: 'Abr 2024 — Sep 2026', job2Title: 'Desarrollador Móvil', job2Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job2Bullet1: '3+ apps publicadas en Google Play y App Store para empresas de sectores como energía, sector público, tecnología y consumo masivo.',
      job2Bullet2: 'Gestión completa del ciclo de publicación en ambas tiendas.',
      job3Date: 'Abr 2023 — Mar 2024', job3Title: 'Desarrollador Frontend', job3Company: 'Pardux · Quito, Pichincha, Ecuador',
      job3Bullet1: 'Desarrollo y mantenimiento de interfaces web responsivas.',
      job3Bullet2: 'Diseño adaptable a cualquier pantalla y navegador.',
      job4Date: 'Oct 2020 — Nov 2022', job4Title: 'Especialista de Investigación y Desarrollo (I+D)', job4Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job4Bullet1: 'Investigación de nuevas tecnologías y toma de decisiones de arquitectura.',
      job4Bullet2: 'Prototipos y documentación técnica como base para los proyectos.'
    },
    skills: {
      tag: 'Stack', title: 'Competencias técnicas',
      mobileTitle: 'Desarrollo Móvil', aiTitle: 'IA & Integración', mlMobile: 'Machine Learning Móvil', djiSdk: 'SDK DJI (Drones)',
      frontendTitle: 'Frontend Web', backendTitle: 'Backend & BD', methodsTitle: 'Metodologías', toolsTitle: 'Herramientas',
      softTitle: 'Competencias blandas', soft1: 'Liderazgo', soft2: 'Resolución de problemas', soft3: 'Aprendizaje continuo', soft4: 'Proactividad',
      langTitle: 'Idiomas', langSpanish: 'Español', langNative: 'Nativo',
      langEnglish: 'Inglés'
    },
    education: {
      tag: 'Academia', title: 'Formación académica',
      masterDate: 'Sep 2026 — Jul 2027 (en curso)', masterTitle: 'Máster Universitario en Tecnologías Web, Computación en la Nube y Aplicaciones Móviles',
      masterPlace: 'Universitat de València · Valencia, España',
      masterNote: 'Áreas: Tecnologías Web, Computación en la Nube, Desarrollo de Aplicaciones Móviles.',
      degreeDate: 'Oct 2015 — Ago 2023', degreeTitle: 'Grado en Ingeniería en Sistemas Informáticos',
      degreePlace: 'Universidad Técnica de Manabí · Portoviejo, Ecuador',
      degreeNote: 'Proyecto de titulación: app móvil colaborativa de comunicación aumentada para inclusión auditiva (Android SDK en Java, Firebase Cloud, Machine Learning).'
    },
    projectsSection: {
      tag: 'Proyectos', title: 'Proyectos destacados'
    },
    project1: {
      tag: 'Proyecto de titulación',
      date: 'Jul 2022 — Ago 2023', affiliation: 'Asociado con Universidad Técnica de Manabí',
      thumbTitle: 'Asistente de Lenguaje de Señas',
      cardTitle: 'App de Lenguaje de Señas en Tiempo Real',
      description: 'Las personas con discapacidad auditiva enfrentan barreras de comunicación constantes. Esta app surgió para derribar una de ellas: convertir texto y voz a lenguaje de señas en tiempo real, directo desde el móvil.',
      point1: 'Convierte lo que escribes o dices a lenguaje de señas al instante, sin internet.',
      point2: 'Un diccionario visual del alfabeto de señas para aprender y consultar en cualquier momento.',
      point3: 'Reconoce las señas que haces con la cámara y las convierte en texto — comunicación en ambas direcciones.',
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
    project2: {
      tag: 'Proyecto personal',
      date: 'Abr 2026 — Presente', affiliation: 'Proyecto personal, publicado en GitHub',
      thumbTitle: 'Lift.xto',
      cardTitle: 'Lift.xto — App de Seguimiento de Gimnasio',
      description: 'Nació de mi propia frustración con las apps de gym existentes: o eran demasiado complicadas o perdías todo sin internet. La construí para resolver exactamente eso.',
      point1: 'Nunca pierdes tu historial — funciona sin internet y se sincroniza sola cuando hay conexión.',
      point2: 'Más de 1300 ejercicios con animaciones de técnica para entrenar bien desde el primer día.',
      point3: 'La app te dice cuándo subir de peso y te avisa si llevas tiempo sin progresar — como tener un coach personal.',
      repoLink: 'Ver repositorio',
      galleryTitle: 'Capturas de la aplicación',
      shot1Title: 'Inicio de sesión',
      shot1Desc: 'Login con Google o email/contraseña (con toggle de mostrar/ocultar contraseña) — habilita la sincronización con Firebase y el acceso multi-dispositivo.',
      shot2Title: 'Perfil obligatorio',
      shot2Desc: 'La primera vez que inicias sesión, la app pide nombre, apellido, estatura y fecha de nacimiento antes de dejarte entrar — la edad se calcula sola, sin pedirla directamente.',
      shot3Title: 'Rutina semanal + racha',
      shot3Desc: 'Vista principal con los 7 días de la semana, el día actual destacado, y una racha 🔥 de días consecutivos entrenados según lo programado — los días libres no la cortan.',
      shot4Title: 'Ejercicios del día',
      shot4Desc: 'Listado de ejercicios de un día puntual, con series/repeticiones objetivo y el grupo muscular elegido manualmente al crear cada ejercicio.',
      shot5Title: 'Detalle y progresión',
      shot5Desc: 'Historial de sesiones, récord personal (PR) y gráfico de evolución del peso levantado a lo largo del tiempo para ese ejercicio.',
      shot6Title: 'Volumen y 1RM estimado',
      shot6Desc: 'El mismo gráfico admite cambiar la métrica a volumen total o 1RM estimado (fórmula de Epley) — revela progreso real cuando el peso se mantiene pero las repeticiones suben.',
      shot7Title: 'Resumen de progreso',
      shot7Desc: 'Vista consolidada de récords personales por ejercicio, actualizada al instante gracias a la arquitectura reactiva (Repository + Observer) — sin necesidad de recargar la app.',
      shot8Title: 'Mapa muscular',
      shot8Desc: 'Visualización del volumen entrenado por grupo muscular en los últimos días, calculado a partir de la categorización elegida en cada ejercicio.',
      shot9Title: 'Catálogo de ejercicios',
      shot9Desc: 'Búsqueda y filtro por músculo sobre un catálogo de referencia de ~1300 ejercicios, con nombre traducido a español y miniatura de la técnica.',
      shot10Title: 'Ficha del ejercicio',
      shot10Desc: 'Cada ejercicio del catálogo trae un GIF animado de la técnica correcta e instrucciones numeradas en español — se puede usar para precargar nombre y músculo al crear un ejercicio propio.',
      shot11Title: 'Perfil, peso e IMC',
      shot11Desc: 'Pantalla unificada de perfil, peso corporal e Índice de Masa Corporal, con escala visual y rango de peso saludable recomendado para tu estatura.',
      shot12Title: 'Medidas corporales',
      shot12Desc: 'Cintura, pecho, cadera, bíceps, muslo, pantorrilla y cuello, con gráfico de evolución por zona — complementa el peso/IMC con composición corporal aproximada.',
      shot13Title: 'Sugerencia de progresión',
      shot13Desc: 'Al registrar una sesión, la app sugiere el peso/reps de la próxima según si llegaste al techo o piso de tu rango objetivo — autorregulación simple sobre tu propio historial.',
      shot14Title: 'Tu resumen, compartible',
      shot14Desc: 'Kg totales levantados, racha máxima histórica, músculo más trabajado y PRs destacados en una tarjeta que se comparte como imagen con un toque.'
    },
    project3: {
      tag: 'Proyecto profesional',
      date: 'Abr 2026 — Sep 2026', affiliation: 'Altura S.A. · Líder de Equipo Móvil / Desarrollador Móvil',
      thumbTitle: 'AMobile 7',
      cardTitle: 'AMobile 7 — App para Equipos en Campo',
      description: 'El reto era que los equipos en campo pudieran trabajar en zonas sin cobertura sin perder productividad. AMobile 7 resuelve eso: las órdenes llegan al móvil, se gestionan sin internet y los resultados se sincronizan solos al volver la señal.',
      point1: 'Los equipos trabajan igual con o sin internet — cero interrupciones por falta de señal.',
      point2: 'La cámara del móvil se convierte en herramienta de trabajo: lee texto, identifica objetos y ubica en el mapa sin salir de la app.',
      point3: 'Un asistente de IA en el bolsillo que responde preguntas sobre las tareas del día — sin necesidad de llamar a la oficina.',
      storePlayTop: 'Disponible en',
      storeAppleTop: 'Disponible en el'
    },
    certifications: {
      tag: 'Credenciales', title: 'Certificaciones',
      cert1Title: 'Curso de Flutter', cert1Meta: 'Platzi · feb 2023',
      cert2Title: 'Curso de Bases Técnicas de Android', cert2Meta: 'Platzi · mar 2023',
      cert3Title: 'Curso de Diseño de Interfaces con Android Studio', cert3Meta: 'Platzi · mar 2023',
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
    hobbies: {
      tag: 'Fuera del código', title: 'Vida más allá de la pantalla',
      intro: 'Cuando no estoy programando, me encontrarás entrenando, jugando o siguiendo el deporte —sobre todo fútbol—, metido de lleno en algún videojuego, o —por encima de todo— compartiendo tiempo de calidad con mi familia y amigos. Soy una persona muy sociable, y creo que esas conexiones importan tanto como cualquier línea de código.',
      gymTitle: 'Gimnasio', gymText: 'Entrenar con constancia me mantiene enfocado, disciplinado y con la energía a tope para cada reto.',
      footballTitle: 'Fútbol y deportes', footballText: 'El deporte me apasiona en general, sobre todo el fútbol: lo disfruto tanto jugándolo como siguiéndolo como hincha.',
      gamingTitle: 'Videojuegos', gamingText: 'Mi forma favorita de desconectar y ejercitar la estrategia y la creatividad.',
      familyTitle: 'Familia y amigos', familyText: 'Tiempo de calidad con la gente que quiero — lo que más valoro.',
      musicTitle: 'Música', musicText: 'La música me acompaña tanto como el código: la disfruto escuchándola y tocándola, con la guitarra y el bajo como mis instrumentos de cabecera. Escucho de todos los géneros, pero el Rock y el Metal son mi verdadera pasión.'
    },
    contact: {
      tag: 'Contacto', title: '¿Hablamos de tu próximo proyecto?',
      description: 'Autorizado para trabajar hasta 30 h/semana (estancia por estudios), en Valencia o en remoto. Escríbeme y con gusto conversamos.',
      emailLabel: 'Email', locationLabel: 'Ubicación', locationValue: 'Burjassot, Valencia (España)'
    },
    common: { verMas: 'Ver más', verMenos: 'Ver menos' },
    footer: {
      rights: 'Todos los derechos reservados.'
    }
  },

  en: {
    meta: {
      title: 'Mario Rodríguez Cedeño · Mobile Developer & Edge AI',
      description: 'Portfolio of Mario Antonio Rodríguez Cedeño — Mobile Developer specialized in Flutter, React Native, Android, iOS, Edge AI, and Machine Learning.'
    },
    appbar: {
      brand: 'My Portfolio'
    },
    launcher: {
      screen: 'Device home screen',
      app: 'My Portfolio',
      homeButton: 'Go to the home screen',
      flutter: 'Flutter',
      reactnative: 'React Native',
      android: 'Android',
      ios: 'iOS',
      edgeai: 'Edge AI',
      unavailable: 'App not available',
      opening: 'Opening My Portfolio'
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
      greeting: "Hi, I'm", role: 'Mobile Developer',
      description: 'I build Android & iOS apps that ship, get used, and work even offline. 4 years. 3 apps in production for companies in sectors like energy, technology, and consumer goods.',
      badge: 'Available for work · up to 30 h/week (student residence permit) · Valencia, Spain',
      ctaPrimary: "Let's talk", ctaSecondary: 'View experience',
      photoAlt: 'Photo of Mario Antonio Rodríguez Cedeño',
      typedWords: ['Flutter.', 'React Native.', 'Android.', 'Edge AI.', 'Kotlin.']
    },
    about: {
      tag: 'About me', title: 'Professional Profile',
      text: "Mobile Developer with 4 years building <strong>Android and iOS apps</strong> that ship, get used, and work offline. Led technical teams and delivered solutions to companies in <strong>sectors like energy, government, technology, and consumer goods</strong> — from prototypes to apps published on the official stores.<br><br>From Ecuador, now in Valencia completing a Master's in web, cloud, and mobile development at <strong>Universitat de València</strong>.",
      statYears: 'Years of experience', statCerts: 'Certifications', statSdk: 'Production apps', statCompanies: 'Key clients',
      value1Title: 'Mobile Apps', value1Text: 'Native and cross-platform apps, end to end.',
      value2Title: 'Hardware & SDKs', value2Text: 'Hardware integration: drones, sensors, IoT.',
      value3Title: 'Edge AI & ML', value3Text: 'AI that runs on the device — no internet needed.',
      value4Title: 'Deployment', value4Text: 'Publishing on Google Play and the App Store.'
    },
    experience: {
      tag: 'Career Path', title: 'Professional Experience',
      job1Date: 'Mar 2025 — Sep 2026', job1Title: 'Mobile Team Lead', job1Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job1Bullet1: 'Led the team that built the app from scratch — architecture, code, and release.',
      job1Bullet2: 'Connected real drones to a mobile app (DJI SDK).',
      job1Bullet3: 'Ran AI on the device itself: facial recognition and text reading, no internet needed.',
      job2Date: 'Apr 2024 — Sep 2026', job2Title: 'Mobile Developer', job2Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job2Bullet1: '3+ apps shipped to Google Play and the App Store for companies in sectors like energy, public services, technology, and consumer goods.',
      job2Bullet2: 'Owned the full release pipeline on both stores.',
      job3Date: 'Apr 2023 — Mar 2024', job3Title: 'Frontend Developer', job3Company: 'Pardux · Quito, Pichincha, Ecuador',
      job3Bullet1: 'Built and maintained responsive web interfaces.',
      job3Bullet2: 'Adaptive design that works on any screen and browser.',
      job4Date: 'Oct 2020 — Nov 2022', job4Title: 'Research and Development (R&D) Specialist', job4Company: 'Altura S.A. · Manta, Manabí, Ecuador',
      job4Bullet1: 'Researched new technologies to back architecture decisions.',
      job4Bullet2: 'Built prototypes and technical docs as foundation for new projects.'
    },
    skills: {
      tag: 'Stack', title: 'Technical Skills',
      mobileTitle: 'Mobile Development', aiTitle: 'AI & Integration', mlMobile: 'Mobile Machine Learning', djiSdk: 'DJI SDK Integration (Drones)',
      frontendTitle: 'Frontend Web', backendTitle: 'Backend & DB', methodsTitle: 'Methodologies', toolsTitle: 'Tools',
      softTitle: 'Soft Skills', soft1: 'Leadership', soft2: 'Problem Solving', soft3: 'Continuous Learning', soft4: 'Proactivity',
      langTitle: 'Languages', langSpanish: 'Spanish', langNative: 'Native',
      langEnglish: 'English'
    },
    education: {
      tag: 'Academic Background', title: 'Education',
      masterDate: 'Sep 2026 — Jul 2027 (in progress)', masterTitle: "Master's Degree in Web Technologies, Cloud Computing and Mobile Applications",
      masterPlace: 'Universitat de València · Valencia, Spain',
      masterNote: 'Focus areas: Web Technologies, Cloud Computing, Mobile Application Development.',
      degreeDate: 'Oct 2015 — Aug 2023', degreeTitle: "Bachelor's Degree in Computer Systems Engineering",
      degreePlace: 'Universidad Técnica de Manabí · Portoviejo, Ecuador',
      degreeNote: 'Thesis: collaborative mobile app for augmented communication for hearing inclusion (Android SDK in Java, Firebase Cloud, Machine Learning).'
    },
    projectsSection: {
      tag: 'Projects', title: 'Featured projects'
    },
    project1: {
      tag: 'Thesis Project',
      date: 'Jul 2022 — Aug 2023', affiliation: 'Associated with Universidad Técnica de Manabí',
      thumbTitle: 'Sign Language Assistant',
      cardTitle: 'Real-Time Sign Language App',
      description: 'People with hearing impairments face constant communication barriers. This app was built to break down one of them: converting text and voice to sign language in real time, right on a phone.',
      point1: 'Converts what you type or say to sign language instantly, offline.',
      point2: 'A visual dictionary of the sign alphabet to learn and reference anytime.',
      point3: 'Recognizes signs through the camera and converts them to text — two-way communication.',
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
    project2: {
      tag: 'Personal project',
      date: 'Apr 2026 — Present', affiliation: 'Personal project, published on GitHub',
      thumbTitle: 'Lift.xto',
      cardTitle: 'Lift.xto — Gym Tracking App',
      description: "Born from my own frustration with existing gym apps: either too complicated or you'd lose everything without internet. I built it to fix exactly that.",
      point1: 'Never lose your history — works offline and syncs automatically when connected.',
      point2: '1300+ exercises with technique animations to train right from day one.',
      point3: 'The app tells you when to increase weight and warns you if you stop progressing — like having a personal coach.',
      repoLink: 'View repository',
      galleryTitle: 'App screenshots',
      shot1Title: 'Sign in',
      shot1Desc: 'Sign in with Google or email/password (with a show/hide password toggle) — enables Firebase sync and multi-device access.',
      shot2Title: 'Mandatory profile',
      shot2Desc: "The first time you sign in, the app asks for first/last name, height, and birth date before letting you in — age is computed automatically, never asked directly.",
      shot3Title: 'Weekly routine + streak',
      shot3Desc: "Main view with all 7 days of the week, today highlighted, and a 🔥 streak of consecutive days trained according to the schedule — rest days don't break it.",
      shot4Title: "Day's exercises",
      shot4Desc: 'Exercise list for a given day, with target sets/reps and the muscle group picked by hand when the exercise was created.',
      shot5Title: 'Exercise detail & progression',
      shot5Desc: 'Session history, personal record (PR), and a chart showing the weight progression over time for that exercise.',
      shot6Title: 'Volume & estimated 1RM',
      shot6Desc: 'The same chart can switch to total volume or estimated 1RM (Epley formula) — reveals real progress when weight stays flat but reps go up.',
      shot7Title: 'Progress summary',
      shot7Desc: 'Consolidated view of personal records per exercise, updated instantly thanks to the reactive Repository + Observer architecture — no app restart needed.',
      shot8Title: 'Muscle map',
      shot8Desc: 'Visualization of trained volume per muscle group over the last few days, computed from the categorization chosen for each exercise.',
      shot9Title: 'Exercise catalog',
      shot9Desc: 'Search and filter by muscle over a reference catalog of ~1300 exercises, with names translated to Spanish and a technique thumbnail.',
      shot10Title: 'Exercise detail',
      shot10Desc: 'Every catalog exercise ships an animated technique GIF and numbered Spanish instructions — can be used to prefill name and muscle group when creating your own exercise.',
      shot11Title: 'Profile, weight & BMI',
      shot11Desc: 'Unified profile, body weight, and Body Mass Index screen, with a visual scale and the recommended healthy weight range for your height.',
      shot12Title: 'Body measurements',
      shot12Desc: 'Waist, chest, hips, biceps, thigh, calf, and neck, with an evolution chart per area — complements weight/BMI with approximate body composition.',
      shot13Title: 'Progression suggestion',
      shot13Desc: "When logging a session, the app suggests next time's weight/reps based on whether you hit the top or bottom of your target rep range — simple self-regulation over your own history.",
      shot14Title: 'Your shareable summary',
      shot14Desc: 'Total kg lifted, longest streak ever, most-trained muscle, and standout PRs in one card you can share as an image with a tap.'
    },
    project3: {
      tag: 'Professional project',
      date: 'Apr 2026 — Sep 2026', affiliation: 'Altura S.A. · Mobile Team Lead / Mobile Developer',
      thumbTitle: 'AMobile 7',
      cardTitle: 'AMobile 7 — App for Field Teams',
      description: 'The challenge: let field teams work in areas with no coverage without losing productivity. AMobile 7 solves that — work orders arrive on the phone, managed offline, results sync automatically when signal returns.',
      point1: 'Teams work the same with or without internet — zero interruptions from poor signal.',
      point2: "The phone's camera becomes a work tool: reads text, identifies objects, and maps locations — all inside the app.",
      point3: 'An AI assistant in your pocket that answers questions about the day\'s tasks — no need to call the office.',
      storePlayTop: 'Get it on',
      storeAppleTop: 'Download on the'
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
    hobbies: {
      tag: 'Beyond the code', title: 'Life beyond the screen',
      intro: "When I'm not coding, you'll find me training, playing or following sports — football above all —, deep into a video game, or — above everything — spending quality time with my family and friends. I'm a very sociable person, and I believe those connections matter just as much as any line of code.",
      gymTitle: 'Gym', gymText: 'Training consistently keeps me focused, disciplined, and full of energy for every challenge.',
      footballTitle: 'Football & sports', footballText: "I'm passionate about sports in general, football above all: I enjoy both playing it and following it as a fan.",
      gamingTitle: 'Video games', gamingText: 'My favorite way to unwind and exercise strategy and creativity.',
      familyTitle: 'Family & friends', familyText: 'Quality time with the people I love — what I value most.',
      musicTitle: 'Music', musicText: "Music is as much a part of my life as code: I enjoy both listening to it and playing it, with guitar and bass as my go-to instruments. I listen to every genre, but Rock and Metal are my true passion."
    },
    contact: {
      tag: 'Contact', title: "Shall we talk about your next project?",
      description: "Authorized to work up to 30 h/week (student residence permit), in Valencia or remotely. Reach out and let's talk.",
      emailLabel: 'Email', locationLabel: 'Location', locationValue: 'Burjassot, Valencia (Spain)'
    },
    common: { verMas: 'Show more', verMenos: 'Show less' },
    footer: {
      rights: 'All rights reserved.'
    }
  }
};

const I18N_STORAGE_KEY = 'mr-lang';
const I18N_CV_PATHS = { es: 'assets/CV_Mario_Rodriguez_ES.pdf', en: 'assets/CV_Mario_Rodriguez_EN.pdf' };

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
