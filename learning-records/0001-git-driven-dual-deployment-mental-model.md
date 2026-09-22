# Git-Driven Dual Deployment Mental Model for Offline-First Web Apps

The user established the requirement to understand the direct, hands-on steps to deploy a static React/Vite web application to Vercel and GitHub Pages. The key mental model established is Git-driven Continuous Deployment (`git push` -> webhook -> cloud build with `npm run build` -> Edge CDN), paired with PWA Service Worker caching and local `@fontsource` bundling to achieve high reliability in restricted network environments like Mainland China.
