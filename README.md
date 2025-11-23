# Gardens Havens 🌿

A Vue.js application for displaying garden species information with data from Wikidata and Wikipedia.

## Features

- 🌱 Species cards with images, range maps, and descriptions
- 🌍 Multi-language support (EN, FR, ES, ZH)
- 📱 Responsive design
- 🎨 Customizable visibility settings
- 👤 Username integration for custom species lists
- 🔍 Short and long descriptions from Wikidata/Wikipedia

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions

1. **Fork or clone this repository**

2. **Update the repository name in configuration files:**
   - In `package.json`: Update the `homepage` field to match your GitHub repository
   - In `vite.config.js`: Update the `base` path to match your repository name
   - In `public/404.html`: Update the redirect path

3. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on pushes to `main` branch

4. **Manual deployment (optional):**
   ```bash
   npm run deploy
   ```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure

```
src/
├── components/         # Vue components
├── data/              # Constants and static data
├── i18n/              # Internationalization
├── stores/            # Pinia state management
├── utils/             # Utility functions
└── views/             # Page components
```

## API Dependencies

- **Wikidata API**: For species data (taxon names, images, range maps)
- **Wikipedia REST API**: For detailed descriptions
- **Wikimedia Commons**: For images and media files

## Configuration

The app uses localStorage for persistent settings:
- Language preference
- Visibility toggles
- Username storage

## Browser Compatibility

- Modern browsers with ES6+ support
- No Internet Explorer support

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
