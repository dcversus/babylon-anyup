# babylon-anyup GitHub Pages Documentation

This directory contains the GitHub Pages landing page with live Babylon.js demo.

## Structure

```
docs/
├── index.html     # Main landing page
├── styles.css     # Styling (dark theme, responsive)
├── demo.js        # Babylon.js split-screen demo (Y-up vs Z-up)
└── README.md      # This file
```

## Local Development

To preview locally, run a simple HTTP server:

```bash
# Using Python 3
cd docs
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server docs -p 8000

# Using PHP
cd docs
php -S localhost:8000
```

Then visit: http://localhost:8000

## Deployment

GitHub Pages is configured to auto-deploy from this directory when changes are pushed to `main`.

The deployment workflow is at: `.github/workflows/deploy-docs.yml`

### Enable GitHub Pages (First-Time Setup)

1. Go to repository Settings → Pages
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Save

The site will be live at: https://dcversus.github.io/babylon-anyup/

## Features

- **Hero Section**: Tagline and call-to-action
- **Live Demo**: Split-screen Y-up vs Z-up comparison
- **Problem Statement**: Edge Craft motivation
- **Installation Guide**: npm install instructions
- **Quick Start**: Code examples with syntax highlighting
- **Features List**: Key capabilities
- **Responsive Design**: Mobile-friendly
- **Dark Theme**: Game engine aesthetic

## Demo Explanation

The Babylon.js demo shows:

- **Left Panel (Y-up)**: Standard Babylon.js scene with Y-up coordinates
  - Terrain built with Y as vertical axis
  - Difficult to load Blizzard Z-up data correctly

- **Right Panel (Z-up)**: Scene demonstrating Z-up coordinate system
  - Terrain built with Z as vertical axis
  - Matches Blizzard game formats (Warcraft 3, StarCraft 2)
  - Shows how babylon-anyup makes Z-up data "just work"

Both scenes feature:
- Color-coded axes (X=Red, Y=Green, Z=Blue)
- Procedural terrain with height variation
- Grid overlay for reference
- Interactive rotation button

## Customization

To update content:

1. Edit `index.html` for structure and text
2. Edit `styles.css` for styling
3. Edit `demo.js` for Babylon.js scenes

Code highlighting uses [highlight.js](https://highlightjs.org/) CDN.

## Tech Stack

- Vanilla HTML/CSS/JS (no build step)
- [Babylon.js 7.0](https://www.babylonjs.com/) from CDN
- [highlight.js](https://highlightjs.org/) for syntax highlighting
- GitHub Actions for deployment

## Performance

- No build step = instant updates
- CDN resources for fast loading
- Optimized Babylon.js demos (60 FPS target)
- Responsive images and layouts
