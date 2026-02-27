# Air Medical 24X7 — Converted Static Website

A fully deployable, host-ready static website for **Air Medical 24X7**, an air ambulance and medical evacuation service provider based in India and UAE.

---

## What Was Broken & Why

The original project used a **React / Create-React-App (CRA)** scaffold that was completely hollow — `App.js` returned `null` and the actual website lived in `frontend/public/` as pre-built HTML, CSS, and Vanilla JS. This caused two problems:

| # | Problem | Impact |
|---|---------|--------|
| 1 | `style.css` and `script.js` referenced via `%PUBLIC_URL%/...` tokens | Only works after `npm run build` — breaks on direct file open |
| 2 | Emergent platform scripts (`emergent-main.js`, `debug-monitor.js`) injected into `<head>` | Unnecessary external dependencies in production |
| 3 | Hidden React `<div id="root">` mount point | Dead markup |
| 4 | Project buried inside CRA scaffold | No standalone deployable folder |

---

## What Was Converted / Added

| File | Action | Details |
|------|--------|---------|
| `frontend/public/index.html` | Cleaned & copied → `index.html` | Fixed `%PUBLIC_URL%` tokens, removed Emergent scripts and React root div |
| `frontend/public/style.css` | Copied as-is → `css/style.css` | No changes needed — pure CSS with no build tokens |
| `frontend/public/script.js` | Copied as-is → `js/app.js` | No changes needed — pure Vanilla JS, no imports |
| `assets/` | Created | Placeholder for future local images |
| `README.md` | Created | This file |

**Removed / not carried over:**
- `frontend/src/` — 46 Radix UI / Tailwind component files (never rendered, unused)
- `frontend/package.json` — ~50 npm dependencies (React, Tailwind, Radix UI, etc.)  
- `backend/` — FastAPI/MongoDB server (not needed for static hosting)
- Emergent platform badge and monitoring scripts

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | Custom CSS3 + Bootstrap 5.3 (CDN) |
| Icons | Bootstrap Icons 1.11 (CDN) |
| Fonts | Google Fonts — Outfit + Inter (CDN) |
| JavaScript | Vanilla ES5+ — no framework, no build step |

---

## How to Run Locally

No build step or server required — just open the file:

```
# Option 1: Double-click
double-click converted-project/index.html

# Option 2: VS Code Live Server
Right-click index.html → "Open with Live Server"

# Option 3: Python simple server (from converted-project/ folder)
python -m http.server 8080
# then open http://localhost:8080
```

> **Note:** An internet connection is required for CDN assets (Bootstrap, fonts, images).

---

## How to Deploy

### Netlify Drop (Fastest — 30 seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `converted-project/` folder onto the page
3. Your site is live instantly with a public URL

### GitHub Pages
1. Push the `converted-project/` folder contents to a GitHub repo
2. Go to **Settings → Pages**
3. Set Source to **main branch / root**
4. Your site is live at `https://<username>.github.io/<repo>/`

### Vercel
```bash
npm i -g vercel
cd converted-project
vercel
```

### Any Static Host
Upload the contents of `converted-project/` to any web server or CDN bucket (AWS S3, Cloudflare Pages, Firebase Hosting, etc.).

---

## Features

- ✅ Sticky emergency bar with phone numbers
- ✅ Responsive navbar with mobile hamburger menu
- ✅ Hero section with parallax background and animated entry
- ✅ Animated stats counter (triggered on scroll)
- ✅ Services grid with hover effects
- ✅ Why Choose Us section with image grid
- ✅ Process timeline (responsive — vertical on mobile)
- ✅ Emergency CTA section with city call buttons
- ✅ Testimonials Bootstrap carousel
- ✅ Global coverage section
- ✅ Footer with offices, quick links, newsletter form
- ✅ Quote request modal with HTML5 validation + loading spinner
- ✅ Success toast notification
- ✅ Back-to-top button
- ✅ SEO meta tags + Schema.org JSON-LD + Open Graph

---

## Known Limitations

| Limitation | Details |
|------------|---------|
| Form submissions | Quote form shows a success toast but does **not** send data anywhere. To make it functional, connect to a form service (Formspree, EmailJS, Netlify Forms) or a backend API. |
| Newsletter | Same as above — email input resets but is not stored or sent. |
| Images | All images load from Unsplash/Pexels CDN URLs. Download and place in `assets/` for offline-safe/self-hosted deployment. |
| Logo | Loads from an Emergent CDN URL. Replace with your own hosted image for production. |
