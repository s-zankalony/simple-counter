# Simple Counter

A minimalist, mobile-friendly counter web app built with a single HTML file.

## Features

- **One-tap counting** — tap/click the large red button to increment the counter
- **Reset button** — appears after the first press to reset the count back to zero
- **Haptic feedback** — subtle vibration on supported mobile devices
- **Screen wake lock** — keeps the screen on while you're counting (supported browsers)
- **PWA support** — installable as a standalone app and works offline

## Usage

Open `index.html` in any modern browser — no build step or dependencies required.

```
open index.html
```

Or deploy the file to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Tech Stack

- **HTML / CSS / JavaScript** — single-file, no framework
- **[Tailwind CSS](https://tailwindcss.com/)** — pre-built and served locally for full offline support
- **Web APIs used:**
  - Screen Wake Lock API
  - Vibration API
  - Service Worker + Web App Manifest (PWA)

## Browser Support

Works in all modern browsers. PWA installation and wake lock features require a Chromium-based browser or Safari 16.4+.
