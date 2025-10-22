# KubeSkills Landing Page

This repository now hosts the KubeSkills marketing site as a plain static webpage. The entire experience is rendered from a single `index.html` file with accompanying CSS, JavaScript, font, and image assets.

## Getting Started

- Double-click `index.html` or open it in your browser of choice.
- Alternatively, serve the directory with any static web server (for example, `python3 -m http.server 8080`) to test relative links and newsletter embeds locally.

## Project Structure

```text
.
├── css/        # Stylesheets (Bootstrap, theme, custom styles)
├── fonts/      # Font assets used by the theme
├── images/     # Logos, hero art, icons, and favicon
├── js/         # JavaScript dependencies and theme scripts
└── index.html  # Main landing page markup
```

## Deployment

Upload the contents of this repository to any static hosting provider (Netlify, GitHub Pages, S3, etc.). No build step is required—just ensure the directory structure remains intact so the relative asset paths continue to resolve.

## Customisation Tips

- Update copy or layouts directly inside `index.html`.
- Extend or override styling in `css/styles.css`.
- Replace assets by dropping new files into `images/`, keeping the filenames in sync with the markup.
- Newsletter functionality is provided through the embedded ConvertKit script near the top of the page.
