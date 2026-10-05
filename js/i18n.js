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
    projectsSection: {
      tag: 'Proyectos', title: 'Proyectos destacados'
    },
    project1: {
      tag: 'Proyecto de titulación',
      date: 'Jul 2022 — Ago 2023', affiliation: 'Asociado con Universidad Técnica de Manabí',
      cardTitle: 'App Móvil Colaborativa de Comunicación Aumentada para Inclusión Auditiva',
      description: 'Proyecto de titulación de accesibilidad: aplicación Android que traduce texto a lenguaje de señas mediante generación de imágenes y gestos en tiempo real. Desarrollada con Android SDK en Java, Firebase Cloud como backend y un modelo de Machine Learning personalizado.',
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
    project2: {
      tag: 'Proyecto personal',
      date: 'Abr 2026 — Presente', affiliation: 'Proyecto personal, publicado en GitHub',
      cardTitle: 'Lift.xto — App Móvil de Seguimiento de Gimnasio con Sincronización Offline-First',
      description: 'App móvil multiplataforma para registrar y analizar el entrenamiento de gimnasio: sobrecarga progresiva, mapa muscular, medidas corporales y gráficos de progreso. Desarrollada con Flutter y Dart, arquitectura Repository + Observer con Provider, persistencia local en SQLite y sincronización offline-first con Firebase (Firestore y Storage) mediante patrón outbox, con autenticación de Google y correo.',
      point1: '<strong>Flutter/Dart</strong> con <strong>SQLite local</strong> + sincronización <strong>offline-first</strong> contra Firebase Firestore/Storage (patrón outbox, resolución de conflictos por última escritura).',
      point2: 'Catálogo de referencia de <strong>~1300 ejercicios</strong> con instrucciones en español y GIFs de la técnica servidos bajo demanda desde Firebase Storage, más un <strong>mapa muscular interactivo</strong> y una <strong>racha de constancia</strong> calculada contra la rutina real del usuario.',
      point3: 'Capa de autorregulación propia sobre tu propio historial — <strong>sugerencia de sobrecarga progresiva</strong>, <strong>alerta de estancamiento</strong> y un <strong>resumen compartible</strong> con tus totales y récords, sin IA ni servicios externos — más arquitectura <strong>Repository + Observer</strong> (ChangeNotifier + provider), autenticación con <strong>Google Sign-In o email/contraseña</strong>, unidad de peso <strong>kg/lb</strong> configurable, diseño <strong>responsive</strong> y build de Android endurecida.',
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
      date: 'Abr 2026 — Sep 2026', affiliation: 'Altura S.A. · Líder IDS-Mobile / Desarrollador Mobile',
      cardTitle: 'AMobile 7 — Plataforma de Gestión de Fuerza de Campo',
      description: 'Aplicación multiplataforma para equipos de campo que recibe, gestiona y envía tareas operativas, con operación offline y sincronización automática. Desarrollada con Flutter bajo Clean Architecture, BLoC/Cubit para el estado, Drift sobre SQLite (WAL) para persistencia local, GetIt para inyección de dependencias y Dio para HTTP. Integra formularios HTML en WebView, cámara con TFLite y ML Kit, mapas con Google Maps y OpenStreetMap, tracking GPS en segundo plano y un asistente con Gemini.',
      point1: '<strong>Clean Architecture</strong> con BLoC/Cubit, persistencia local <strong>Drift sobre SQLite</strong> (WAL) y sincronización <strong>offline-first</strong> con reintentos y backoff exponencial.',
      point2: 'Interoperabilidad de <strong>más de 180 métodos JavaScript</strong> para formularios HTML dinámicos (cámara, GPS, firma, impresión), cámara con <strong>TFLite + Google ML Kit</strong> y tracking GPS en segundo plano.',
      point3: 'Mapas conmutables Google Maps / OpenStreetMap, <strong>asistente de IA con Gemini</strong> sobre datos locales, impresión ESC/POS y ZPL, arquitectura <strong>multi-tenant</strong> y soporte ES/EN/PT.',
      storePlayTop: 'Disponible en',
      storeAppleTop: 'Disponible en el'
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
    hobbies: {
      tag: 'Fuera del código', title: 'Vida más allá de la pantalla',
      intro: 'Cuando no estoy programando, me encontrarás entrenando, jugando o siguiendo el deporte —sobre todo fútbol—, metido de lleno en algún videojuego, o —por encima de todo— compartiendo tiempo de calidad con mi familia y amigos. Soy una persona muy sociable, y creo que esas conexiones importan tanto como cualquier línea de código.',
      gymTitle: 'Gimnasio', gymText: 'Entrenar con constancia me mantiene enfocado, disciplinado y con la energía a tope para cada reto.',
      footballTitle: 'Fútbol y deportes', footballText: 'El deporte me apasiona en general, sobre todo el fútbol: lo disfruto tanto jugándolo como siguiéndolo como hincha.',
      gamingTitle: 'Videojuegos', gamingText: 'Mi forma favorita de desconectar y ejercitar la estrategia y la creatividad.',
      familyTitle: 'Familia y amigos', familyText: 'Tiempo de calidad con la gente que quiero — lo que más valoro.'
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
    projectsSection: {
      tag: 'Projects', title: 'Featured projects'
    },
    project1: {
      tag: 'Thesis Project',
      date: 'Jul 2022 — Aug 2023', affiliation: 'Associated with Universidad Técnica de Manabí',
      cardTitle: 'Collaborative Mobile App for Augmented Communication for Hearing Inclusion',
      description: 'Accessibility thesis project: an Android app that translates text into sign language through real-time image and gesture generation. Built with the Android SDK in Java, Firebase Cloud as backend, and a custom Machine Learning model.',
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
    project2: {
      tag: 'Personal project',
      date: 'Apr 2026 — Present', affiliation: 'Personal project, published on GitHub',
      cardTitle: 'Lift.xto — Mobile Gym Tracking App with Offline-First Sync',
      description: 'Cross-platform mobile app for logging and analyzing gym workouts: progressive overload, a muscle map, body measurements, and progress charts. Built with Flutter and Dart, Repository + Observer architecture with Provider, local persistence in SQLite, and offline-first sync with Firebase (Firestore and Storage) using an outbox pattern, with Google and email authentication.',
      point1: '<strong>Flutter/Dart</strong> with <strong>local SQLite</strong> plus <strong>offline-first</strong> sync against Firebase Firestore/Storage (outbox pattern, last-write-wins conflict resolution).',
      point2: 'Reference catalog of <strong>~1300 exercises</strong> with Spanish instructions and technique GIFs served on demand from Firebase Storage, plus an <strong>interactive muscle map</strong> and a <strong>consistency streak</strong> computed against the user\'s actual routine.',
      point3: 'A self-coaching layer built on your own history — <strong>progressive overload suggestions</strong>, a <strong>plateau alert</strong>, and a <strong>shareable summary</strong> of your totals and records, no AI or external services — plus <strong>Repository + Observer</strong> architecture (ChangeNotifier + provider), <strong>Google Sign-In or email/password</strong> authentication, configurable <strong>kg/lb</strong> weight unit, responsive design, and a hardened Android release build.',
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
      date: 'Apr 2026 — Sep 2026', affiliation: 'Altura S.A. · IDS-Mobile Lead / Mobile Developer',
      cardTitle: 'AMobile 7 — Field Force Management Platform',
      description: 'Cross-platform app for field teams to receive, manage, and submit operational tasks, with offline operation and automatic sync. Built with Flutter under Clean Architecture, BLoC/Cubit for state, Drift over SQLite (WAL) for local persistence, GetIt for dependency injection, and Dio for HTTP. Integrates HTML forms in a WebView, a camera with TFLite and ML Kit, Google Maps and OpenStreetMap, background GPS tracking, and a Gemini assistant.',
      point1: '<strong>Clean Architecture</strong> with BLoC/Cubit, local persistence with <strong>Drift over SQLite</strong> (WAL) and <strong>offline-first</strong> sync with retries and exponential backoff.',
      point2: 'Interop layer exposing <strong>180+ JavaScript methods</strong> to dynamic HTML forms (camera, GPS, signature, printing), camera pipeline with <strong>TFLite + Google ML Kit</strong>, and background GPS tracking.',
      point3: 'Switchable Google Maps / OpenStreetMap, <strong>Gemini-powered AI assistant</strong> over local data, ESC/POS and ZPL printing, <strong>multi-tenant</strong> architecture, and ES/EN/PT support.',
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
      familyTitle: 'Family & friends', familyText: 'Quality time with the people I love — what I value most.'
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
