# Contexto del proyecto — Portafolio Mario Rodríguez

> Este documento existe para que una nueva sesión de Claude Code (en otra máquina, otro IDE)
> pueda retomar este proyecto sin perder contexto. Resume qué es el proyecto, cómo está
> organizado, las reglas de trabajo (branches, publicación) y el historial de lo que se ha
> hecho hasta ahora. Actualízalo cuando termines un bloque de trabajo importante.

## Qué es esto

Portafolio personal de Mario Antonio Rodríguez Cedeño — Desarrollador Móvil
especializado en desarrollo móvil (Flutter, React Native, Android, iOS) y Edge AI/Machine
Learning. Es un sitio estático (HTML + CSS + JS puro, sin build step ni frameworks) presentado
como un **app-shell**: el sitio completo vive dentro de un marco de tablet/teléfono simulado
(barra de estado, barra de apps, pestañas inferiores, pantalla de inicio con iconos, botón
físico lateral), como si fuera una app móvil real corriendo en un dispositivo.

- **Repo**: `https://github.com/marcxedge/portafolio-mario-rodriguez` (público)
- **Sitio en vivo**: `https://marcxedge.github.io/portafolio-mario-rodriguez/` (GitHub Pages,
  sirve desde la rama `main`, carpeta `/`)
- **Dueño/Git user**: Mario Rodríguez — email `marior8488@gmail.com`
- **GitHub CLI (`gh`)**: ya autenticado en la cuenta `mightycoan` con scopes `repo`, `read:org`,
  `gist` — en una máquina nueva hay que correr `gh auth login` si no está autenticado.

## Estructura de archivos

```
├── index.html          # Todo el contenido y estructura del sitio (muy largo, una sola página)
├── css/
│   ├── style.css        # Estilos "de contenido": tema claro/oscuro, tipografía, tarjetas,
│   │                     #   animaciones de scroll-reveal, galería, formularios, etc.
│   └── app.css           # Estilos del "app-shell": marco del dispositivo, barra de estado,
│                          #   barra de apps, tabbar inferior, launcher/pantalla de inicio,
│                          #   splash screen, boot screen, apps de ejemplo del launcher
├── js/
│   ├── i18n.js            # Diccionario de traducciones ES/EN + motor de aplicación
│   │                       #   (data-i18n, data-i18n-html, data-i18n-attr)
│   ├── main.js              # Interacciones del CONTENIDO: menú, scroll reveal, contador,
│   │                         #   typing effect, tema, galería de fotos (lightbox)
│   └── app.js                 # Interacciones del APP-SHELL: tabs, launcher, splash/boot
│                               #   screen, apps de ejemplo (stack), drag-to-scroll, status bar
├── assets/
│   ├── CV_Mario_Rodriguez_ES.pdf   # CV en español — "Descargar CV" lo sirve cuando el sitio está en ES
│   ├── CV_Mario_Rodriguez_EN.pdf   # CV en inglés — lo sirve cuando el sitio está en EN
│   │                                #   (rutas en I18N_CV_PATHS de js/i18n.js; la fuente original
│   │                                #   de los PDF está en Documents\CV ESPAÑA\ en la máquina de Mario)
│   └── img/                         # Imágenes (foto de perfil, capturas de proyectos, etc.)
├── README.md            # README genérico orientado a "cómo personalizar el sitio"
│                         #   (está desactualizado: no menciona app.css/app.js/i18n.js ni el
│                         #   rediseño app-shell — no confiar en él para el estado actual)
└── HANDOFF.md            # Este archivo
```

No hay `package.json`, build step, ni dependencias — es HTML/CSS/JS servido directo. Para
verlo localmente basta un servidor estático, por ejemplo:

```bash
python -m http.server 8080
# luego abrir http://localhost:8080/
```

## Sistema de traducción (i18n)

- `js/i18n.js` define `I18N_TRANSLATIONS = { es: {...}, en: {...} }` con un objeto por idioma,
  organizado por secciones (`launcher`, `hero`, `skills`, `hobbies`, etc.).
- En el HTML:
  - `data-i18n="clave.anidada"` → reemplaza `textContent`.
  - `data-i18n-html="clave.anidada"` → reemplaza `innerHTML` (permite negritas, etc. dentro
    del texto traducido).
  - `data-i18n-attr="attr:clave;attr2:clave2"` → traduce atributos (ej. `aria-label`, `title`,
    `content` de meta tags).
- El toggle de idioma (botón `EN`/`ES` en la barra de apps y su réplica en la pantalla de
  inicio) dispara el evento `i18n:changed`, al que varias partes de `app.js` están suscritas
  para re-renderizar contenido dinámico (reloj, apps de ejemplo abiertas, etc.).
- **Convención importante**: el contenido generado dinámicamente por JS (texto de las apps de
  ejemplo del launcher, notas de calendario, etc.) NO usa el diccionario `I18N_TRANSLATIONS`;
  usa un patrón `en() ? 'texto inglés' : 'texto español'` directamente en el código, donde
  `en()` es `document.documentElement.lang === 'en'`. Si agregas contenido dinámico nuevo,
  sigue ese mismo patrón para mantener consistencia con el resto del archivo.

## Arquitectura del app-shell (`index.html` + `app.css` + `app.js`)

Estructura DOM (simplificada), de afuera hacia adentro:

```
.stage                        → centra todo en la ventana
  .device-wrap                → contenedor relativo; aquí vive el botón físico lateral
    .device (.is-home)        → el "marco" del dispositivo (borde grueso, bordes redondeados)
      .device-screen          → la "pantalla" real, con su propio radio de esquina
                                 independiente del marco (ver nota de bordes redondeados abajo)
        .boot-screen           → pantalla negra de "encendido", solo al cargar la página
        .splash                → splash "Mi Portafolio" al abrir la app
        .statusbar              → hora + batería, fijo arriba
        .appbar                  → marca + botones de idioma/tema + Descargar CV
        .screens                  → contenedor de las 5 secciones (#inicio, #experiencia,
                                     #proyecto, #habilidades, #contacto), cada una con su
                                     .screen-scroll interno
        .tabbar                   → navegación inferior entre las 5 secciones
        .mockapp (#mockApp)       → pantalla de "app de ejemplo" que se abre desde el launcher
                                     (ver sección "Apps del stack" abajo)
        .launcher (#launcher)     → pantalla de inicio del dispositivo (reloj, iconos de apps)
    .home-btn (#homeBtn)        → botón físico lateral (derecha en desktop/tablet, abajo en
                                   móvil portrait) que alterna entre el launcher y la app
```

### Secuencia al cargar la página

1. **Boot screen** (`initBootScreen` en `app.js`): pantalla negra con un punto que se enciende
   y luego se desvanece, simulando que el dispositivo se prende. Dura `BOOT_DURATION` (~2.55s,
   constantes `BOOT_ON_DELAY`/`BOOT_OFF_DELAY` al inicio de `app.js`).
2. Una vez termina el boot, arranca la secuencia que YA existía antes del boot screen (sin
   cambiar sus tiempos relativos): se ve el launcher un instante, se simula un tap en el icono
   "Mi Portafolio", aparece el aviso "Abriendo Mi Portafolio", y finalmente se muestra el
   splash de la app antes de revelar el contenido.

### Apps de ejemplo del launcher ("apps del stack")

El launcher tiene 6 iconos: "Mi Portafolio" (abre el sitio real) + 5 apps de ejemplo que
representan el **stack tecnológico** de Mario: **Flutter, React Native, Android, iOS, Edge AI**.
Cada una, al abrirse (`views` dentro de `initMockApps()` en `app.js`), muestra:

1. Un párrafo corto explicando que esa tecnología es parte del stack.
2. Una fila de etiquetas (`tags`/`tag`, reutilizando las clases ya existentes del sitio) con
   herramientas relacionadas (ej. Flutter → Dart, Provider, SQLite, Firebase).
3. Una mini-demo interactiva específica de esa tecnología:
   - **Flutter**: contador `+`/`−` con conteo de "widgets reconstruidos".
   - **React Native**: switch Android/iOS que re-pinta la misma tarjeta (forma de botón,
     colores) y una nota que explica la diferencia visual.
   - **Android**: botón FAB + snackbar "Guardado", más un selector de color dinámico
     (Material You) que repinta el FAB en vivo.
   - **iOS**: control segmentado General/Privacidad que cambia una lista de interruptores
     (switches) estilo iOS.
   - **Edge AI**: métricas en vivo (latencia, inferencias/s, precisión) que se actualizan solas,
     con una etiqueta que rota entre "Reconocimiento facial" / "OCR en vivo".

**No tienen enlaces de vuelta al portafolio** (se quitaron a propósito — ver historial abajo).

**Responsive**: cada app envuelve su contenido en `.mock-stack > .mock-info (intro + tags) +
.mock-demo (la demo)`. En pantallas angostas/portrait queda todo apilado en una columna; a
partir de `min-width: 700px` (el mismo breakpoint que usa el resto del sitio) pasa a dos
columnas (info a la izquierda, demo a la derecha) para aprovechar el ancho en desktop/tablet/
landscape.

### Nota sobre los bordes redondeados del marco

El marco (`.device`) tiene un borde mucho más grueso en el lado donde vive el botón físico
(derecha en desktop/tablet, abajo en móvil portrait) que en los otros lados. Si se usa un solo
`border-radius` para todo el marco, ese lado grueso "aplana" la esquina interior (la pantalla
se ve con esquina recta en vez de curva). La solución actual: `.device` tiene un radio uniforme
simple (NO se tocan sus esquinas de forma asimétrica), y `.device-screen` (el wrapper interno
que realmente recorta el contenido) tiene su **propio** `border-radius` independiente. Así el
marco oscuro y la pantalla lucen ambos uniformemente redondeados, con el grosor del borde como
"hueco" entre ambos. **No reintroducir radios asimétricos en `.device`** — ya se probó y el
usuario pidió revertirlo explícitamente.

## Flujo de trabajo de Git (MUY IMPORTANTE)

- **Rama de trabajo**: `diseno-app`. Todo el desarrollo activo ocurre aquí. Haz commits
  normales en esta rama por cada cambio/tarea completada.
- **Rama en vivo**: `main`. Es lo que sirve GitHub Pages. **Nunca se mergea ni se publica a
  `main` salvo que el usuario lo pida explícitamente** (frases como "súbelo al sitio en vivo",
  "publícalo", "sube eso"). Hasta entonces, `main` se queda como está aunque `diseno-app` tenga
  commits nuevos — eso es intencional, es el mecanismo de "preview antes de publicar".
- **Rama `diseno-original`**: es un punto de referencia/ancestro histórico (anterior al
  rediseño app-shell). Es ancestro directo de `diseno-app` (no divergió). Tratarla como
  snapshot de respaldo, no como rama activa.
- **Commits**: en español, describiendo QUÉ cambió y (cuando ayuda) por qué, en el tono que ya
  tienen los commits existentes (ver `git log --oneline`). **No agregar la línea
  `Co-Authored-By: Claude`** a los commits de este repo — preferencia explícita del usuario.

### Procedimiento exacto para publicar al sitio en vivo (solo cuando el usuario lo pida)

```bash
git status --short                      # confirmar árbol limpio
git branch --show-current               # confirmar que estás en diseno-app
git fetch -q origin
git log --oneline -1 origin/main        # y origin/diseno-app, main, diseno-app
# confirmar que todo es fast-forward antes de tocar nada
git push -q origin diseno-app
git checkout -q main
git merge --ff-only diseno-app
git push -q origin main
git checkout -q diseno-app              # volver a la rama de trabajo

# esperar a que GitHub Pages termine de construir:
for i in 1 2 3 4 5 6 7 8; do
  s=$(gh api repos/marcxedge/portafolio-mario-rodriguez/pages/builds/latest --jq '.status + " " + .commit')
  echo "$s"
  case "$s" in built*) break;; esac
  sleep 20
done
```

Si en algún punto `main` y `diseno-app` divergen de forma que `--ff-only` falla, **parar y
avisar al usuario** — no forzar merges ni hacer rebase sin que lo pida.

## Google Drive — PENDIENTE

El usuario pidió documentar también las reglas para subir una copia/respaldo del proyecto a
Google Drive, pero **todavía no se ha definido la carpeta correcta**:

- Se buscó en su Drive conectado por nombre ("portafolio", "portfolio") y no apareció ninguna
  carpeta de este proyecto.
- El usuario pasó un enlace (`.../folders/1dovmUy4zk6m2OXtrhb9M1qK7YLOHKd-O`) que resultó ser
  una carpeta de materiales universitarios (asignaturas de un grado/máster: "Programación del
  lado del cliente y visualización", "Centro de datos y virtualización", etc.), **no** es la
  carpeta correcta para este proyecto.
- Quedó pendiente que el usuario indique la carpeta real (nombre o enlace), o pida crear una
  carpeta nueva dedicada.

**Acción para la próxima sesión**: si el usuario retoma este tema, pedirle el enlace/nombre
correcto de la carpeta de Drive, o confirmar si quiere crear una nueva, y luego documentar aquí
mismo las reglas concretas (qué subir — ¿el código fuente?, ¿un zip por release?, ¿solo
assets/CV? — y cuándo).

## Convenciones y preferencias del usuario (aplican siempre)

- Nunca pedir confirmación de más — el usuario prefiere que se avance y se le avise, salvo
  acciones realmente irreversibles o ambiguas (como publicar a producción o tocar la carpeta
  de Drive incorrecta).
- El usuario escribe en español con bastantes erratas/typos — interpretar la intención, no
  corregirle ni comentar sobre ellas.
- Cuando pide "solo dime" / "no hagas nada" sobre una idea, es literal: dar la opinión/plan sin
  tocar código hasta que diga "impleméntalo" o similar.
- Para verificación visual de cambios de UI, usar capturas con Edge headless (ver sección de
  testing abajo) en vez de asumir que algo se ve bien solo por el código.
- No agregar `Co-Authored-By: Claude` a los commits de este repo (ver arriba).

## Testing / verificación visual (gotchas de las herramientas)

Este proyecto no tiene suite de tests automatizados — la verificación se ha hecho con
capturas de pantalla headless y pequeños harnesses HTML. Dos trampas ya documentadas para no
perder tiempo re-descubriéndolas:

1. **`--virtual-time-budget` de Chromium/Edge headless no siempre avanza las transiciones/
   animaciones CSS** de forma realista — a veces un elemento aparece "visible" en una captura
   cuando en un navegador real ya habría terminado su animación de salida. No es un bug del
   sitio; es una limitación conocida de la herramienta de testing.
2. **`--window-size=ANCHO,ALTO` en Edge headless no siempre produce un viewport CSS de ese
   ancho exacto**: por debajo de ~500px de ancho solicitado, el viewport real se queda
   "clampeado" a ~492px (no baja más); y el PNG final de `--screenshot` se **recorta** al
   tamaño solicitado en vez de escalarse, lo que puede hacer parecer que hay contenido
   "cortado"/desbordado cuando en realidad el layout real no tiene ningún problema. Antes de
   reportar o arreglar un supuesto bug de overflow visual visto en una captura headless,
   verificar con un diagnóstico de `getBoundingClientRect()` (inyectando un script temporal)
   en vez de confiar solo en la imagen.
3. Para probar interacciones (clics, inputs) sin un framework de automatización instalado, el
   patrón que ha funcionado: crear un `test-harness.html` temporal en la raíz del proyecto
   (servido por el mismo `python -m http.server`) con un `<iframe src="/index.html">` del mismo
   origen, manipular `iframe.contentDocument`/`contentWindow` desde el padre, volcar resultados
   a un `<pre id="out">` en el documento padre, y leerlo con
   `msedge.exe --headless=new --dump-dom`. **Borrar el harness antes de hacer commit** — nunca
   debe quedar versionado.

## Historial de trabajo (resumen cronológico)

El rediseño "app-shell" (marco de dispositivo simulado) ya estaba en marcha antes de esta
sesión de contexto. Lo que se hizo en las sesiones recientes, en orden:

1. **Scroll por arrastre con el mouse** en `.screen-scroll`/`.mock-body`, simulando un gesto
   táctil. Se exploró (y se descartó) una función de selección de texto automática con
   Mayús+arrastre; la versión final es arrastre simple sin ninguna validación ni excepción.
2. **Fix crítico de `setPointerCapture`**: capturar el puntero en cada `pointerdown` rompía
   todos los clics (botones "Hablemos"/"Ver experiencia", galería de fotos) porque los eventos
   de clic sintéticos quedaban redirigidos al elemento con la captura. Arreglado capturando
   solo cuando se detecta un arrastre real (>4px de movimiento).
3. Ajustes visuales al botón físico lateral (opacidad del borde, quitar el tinte azul al
   volver a inicio).
4. Sección "Idiomas" simplificada (Inglés — B1 en una sola fila).
5. Tarjeta de "Música" en la sección de hobbies: se probó un iframe de TikTok embebido (falló
   por bloqueo de tracking protection / error 503 del lado de TikTok), se simplificó a un
   enlace de perfil, y finalmente **se quitó también ese enlace y el párrafo invitando a
   verlo** (decisión explícita del usuario) — la tarjeta solo tiene el texto descriptivo ahora.
   Layout final: tarjeta destacada a todo el ancho (`is-featured`), ícono + contenido en fila
   en pantallas ≥560px.
6. **Animación de "encendido"** del dispositivo al cargar la página (`boot-screen`, ver
   arquitectura arriba). Se ajustó para que NO cambie los tiempos de la secuencia de apertura
   que ya existía (el boot corre primero, y luego arranca esa secuencia con sus tiempos
   originales intactos). Se alargó la pantalla negra inicial a pedido del usuario.
7. **Esquinas redondeadas del marco**: se intentó redondear solo el lado derecho (asimétrico),
   el usuario pidió revertirlo por verse "no uniforme", y se implementó la solución de dos
   capas (`.device` + `.device-screen` con radios independientes) descrita arriba — esa es la
   versión final, ya publicada.
8. **Apps del launcher reemplazadas por el stack tecnológico** (Flutter, React Native, Android,
   iOS, Edge AI) en vez de apps genéricas de ejemplo (Ajustes, Calendario, Cámara, Música,
   Mapas — incluyendo quitar la integración de Leaflet/OpenStreetMap que usaba la app de Mapas,
   ya no existe). Cada una con párrafo de contexto + demo interactiva. Se iteró varias veces:
   primero con enlaces "Ver en mi [sección]" de vuelta al portafolio (se quitaron a pedido del
   usuario), se amplió el contenido de cada demo, y finalmente se hizo responsive (dos columnas
   en desktop/landscape, apilado en móvil portrait) — ver arquitectura arriba para el detalle
   final de cada app.
9. **Publicado a producción** dos veces durante estas sesiones: una vez tras el punto 5-6, y
   otra vez (la más reciente) tras el punto 9, que incluyó los puntos 6-8 completos. El commit
   en vivo actual en `main` corresponde al mismo HEAD que `diseno-app` en el momento de cada
   publicación — revisar `git log --oneline -1 main` vs `origin/main` para confirmar si siguen
   sincronizados o si `diseno-app` ya avanzó más desde la última publicación.

Para el detalle línea por línea de cada decisión (incluyendo callejones sin salida explorados y
descartados), el historial de commits en `diseno-app` tiene mensajes descriptivos — úsalo como
fuente de verdad en caso de duda, no este resumen.
