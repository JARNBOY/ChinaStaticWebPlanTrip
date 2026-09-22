# Host on Vercel with Offline PWA and Self-Hosted Fonts for China Travel

We decided to deploy the static travel itinerary website to Vercel as the primary host, supplemented by a local Progressive Web App (PWA) Service Worker and self-hosted fonts. Because the user travels in Mainland China with an AIS SIM2Fly roaming SIM, cellular traffic bypasses the Great Firewall (GFW), making Vercel fully accessible. However, to guard against offline metro conditions, hotel Wi-Fi GFW blocking, and blocked Google Fonts CDN, all assets and fonts are bundled locally and cached offline on the client device.
