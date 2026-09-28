# Sentiment Tattoo Studio

Static React/Vite landing page for Sentiment Tattoo Studio, deployed to GitHub Pages at https://sentiment.hu.

## Local development

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm test
npm run build
```

The production build also generates real `/booking`, `/info`, `/about`, and `/gallery` entry points for GitHub Pages. Static assets are cached by a service worker, while page navigations remain network-first so deployments update promptly.
