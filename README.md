# Portafolio — Mario Rodríguez Cedeño

Portafolio personal de una sola página construido con HTML, CSS y JavaScript puro (sin frameworks ni dependencias de build).

## Estructura

```
├── index.html          # Contenido y estructura del sitio
├── css/style.css        # Estilos, tema claro/oscuro, animaciones
├── js/main.js            # Interacciones: menú, scroll reveal, contador, typing, tema
└── assets/
    ├── CV_Mario_Rodriguez_ES.pdf  # CV en español (botón "Descargar CV" con el sitio en ES)
    ├── CV_Mario_Rodriguez_EN.pdf  # CV en inglés (botón "Descargar CV" con el sitio en EN)
    └── img/profile.jpg          # Foto de perfil (extraída del CV)
```

## Cómo verlo

Solo abre `index.html` en el navegador, o sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
# o
python -m http.server 8080
```

## Personalizar

- **Datos**: edita directamente el texto en `index.html` (experiencia, certificaciones, habilidades, etc.).
- **Colores**: variables CSS en `:root` dentro de `css/style.css` (`--accent`, `--bg`, etc.).
- **CV descargable**: reemplaza `assets/CV_Mario_Rodriguez_ES.pdf` y `assets/CV_Mario_Rodriguez_EN.pdf` por las versiones más recientes.
- **Redes**: enlaces de LinkedIn/GitHub/Email están en el `hero-social` y en la sección de contacto de `index.html`.
