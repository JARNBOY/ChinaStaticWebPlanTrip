# China, on foot — Shanghai & Beijing Trip Itinerary

Minimalist, mobile-first travel itinerary and interactive quest checklist web application built with React, TypeScript, Vite, and an Offline-First Progressive Web App (PWA) architecture.

---

## 🚀 Features

- **Mobile-First Editorial Timeline**: Clean, legible, day-by-day travel itinerary with estimated walk times and real-time progress tracking.
- **Interactive Quests**: Check off food discoveries, sights, photo opportunities, and ticket redemptions as you explore.
- **China-Ready Map Integrations**: Native Gaode / Amap (`surl.amap.com`) links with fallbacks to Apple Maps and Google Maps.
- **100% Offline PWA (China GFW Safe)**:
  - Bundled local fonts (`@fontsource/inter` and `@fontsource/newsreader`) — zero dependency on blocked `fonts.googleapis.com`.
  - Service Worker precaches all HTML, CSS, JS, routes, and high-resolution trip images.
  - Works instantly (0ms) in Shanghai subways, airplanes, or hotel Wi-Fi behind the Great Firewall.
- **Add to Home Screen**: Installable as a standalone app on iOS Safari and Android Chrome.

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Lint codebase
npm run lint

# Build production bundle (with PWA service worker and precached assets)
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment (Dual-Setup)

### 1. Primary Deployment: Vercel
1. Push this repository to GitHub: `git push -u origin main`
2. Open [vercel.com/new](https://vercel.com/new) and import `JARNBOY/ChinaStaticWebPlanTrip`.
3. Vercel automatically detects Vite and uses [vercel.json](./vercel.json).
4. Click **Deploy**. Your site will be live at `https://<project-name>.vercel.app`.
   *(When using an AIS SIM2Fly or international roaming eSIM in China, Vercel is accessible directly with no GFW blocking)*.

### 2. Backup Mirror: GitHub Pages
A GitHub Actions workflow is pre-configured in [.github/workflows/deploy.yml](./.github/workflows/deploy.yml).
1. Go to your GitHub repository: `https://github.com/JARNBOY/ChinaStaticWebPlanTrip`
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Every push to `main` will automatically build and publish your backup mirror at:
   `https://JARNBOY.github.io/ChinaStaticWebPlanTrip/`

---

## 📱 How to Install on Your Phone

1. **iOS (Safari)**:
   - Open the deployment URL in Safari.
   - Tap the **Share** button (box with an arrow pointing up).
   - Scroll down and tap **"Add to Home Screen"** (เพิ่มไปยังหน้าจอโฮม).
   - Tap **Add**. The app will now launch full-screen with offline support.

2. **Android (Chrome)**:
   - Open the deployment URL in Chrome.
   - Tap the three-dot menu icon in the top right.
   - Tap **"Install app"** or **"Add to Home screen"**.
