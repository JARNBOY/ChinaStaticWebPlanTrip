# Research & Trade-off: Free Web Hosting Accessible in Mainland China (2025–2026)

**Target Project**: `ChinaStaticWebPlanTrip` (React + Vite + TypeScript)  
**Target User**: 1 Person (Personal Travel Itinerary & Checklist)  
**Core Requirement**: Free deployment, viewable online while traveling in Mainland China without infra scaling overhead.

---

## 1. Network Reality in Mainland China (The Great Firewall & Roaming)

Before choosing a platform, there are two distinct internet environments a traveler encounters in China:

### A. Cellular Roaming (AIS Sim2Fly / True Travel SIM / Foreign eSIM)
- **How it works**: Foreign carrier roaming tunnels data traffic back to the home gateway (e.g., Thailand/Singapore) before hitting the public internet.
- **GFW Status**: **Completely Bypasses GFW**.
- **Result**: `vercel.app`, `pages.dev`, `github.io`, Google, Instagram, LINE all work seamlessly on 4G/5G roaming.

### B. Local Wi-Fi & Local Chinese SIM (Hotel Wi-Fi, Airport, Cafés, China Unicom/Mobile)
- **How it works**: Traffic exits directly through Chinese state telecom ISPs subject to Great Firewall (GFW) inspection.
- **GFW Status**: **Active Filtering, DNS Poisoning, SNI Reset, TCP Dropping**.
- **Result**:
  - `*.vercel.app`: Frequently DNS-poisoned / blocked / high packet drop.
  - `*.pages.dev` (Cloudflare Pages): Default domain SNI blocked.
  - `*.github.io` (GitHub Pages): Heavily throttled, intermittent timeouts (10–30s or connection reset).
  - `*.firebaseapp.com` / `*.web.app` (Firebase Hosting): 100% blocked (Google IP range).
  - External Google Fonts (`fonts.googleapis.com`): **BLOCKED** — blocks page rendering unless fonts are self-hosted!

---

## 2. Free Hosting Platform Comparison Matrix

| Platform | Free Tier Limits | Access via China Wi-Fi (No VPN) | Access via Roaming SIM | Setup Difficulty | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vercel** (`*.vercel.app`) | 100GB bandwidth, unlimited personal deploys | ❌ Unstable / Often Blocked | ✅ 100% Smooth | 🟢 Super Easy (1-click, config ready) | Roaming SIM only |
| **Cloudflare Pages** (`*.pages.dev`) | Unlimited bandwidth, 500 builds/mo | ❌ Default domain blocked (`*.pages.dev`) | ✅ 100% Smooth | 🟢 Easy | Roaming SIM only |
| **Cloudflare Pages + Custom Domain** | Free tier + user domain | 🟡 Fair to Good (Anycast via HK/US) | ✅ 100% Smooth | 🟡 Medium (Need domain DNS) | Most stable if you own a domain |
| **GitHub Pages** (`*.github.io`) | 100GB/mo, 1GB repo size | 🟡 Sluggish / Intermittent | ✅ 100% Smooth | 🟢 Easy (GitHub Actions) | Already on GitHub |
| **GitLab Pages** (`*.gitlab.io`) | Free with GitLab CI | 🟡 Better than GitHub, but slow | ✅ 100% Smooth | 🟡 Medium | Alternate Git host |
| **Surge.sh** (`*.surge.sh`) | Free unlimited static sites | 🟡 Often works (less targeted by GFW) | ✅ 100% Smooth | 🟢 1 CLI command (`npx surge`) | Quickest test deploy |
| **Tencent Cloud EdgeOne** (Free Tier) | Free global CDN tier | 🟢 Good via HK/SG nodes (Mainland nodes need ICP) | ✅ 100% Smooth | 🔴 High (Sign up verification, ICP rules) | Overkill for 1 user |
| **Vite PWA (Offline-First)** | $0 (Runs locally on phone cache) | 🟢 **100% Bulletproof (0ms, No Net Needed)** | 🟢 **100% Bulletproof** | 🟢 Easy (`vite-plugin-pwa`) | **#1 Recommended Strategy** |

---

## 3. Detailed Trade-off of Each Approach (ท่า Deploy)

### ท่าที่ 1: Vercel (เร็วสุด ง่ายสุด สำหรับคนใช้ Roaming SIM)
- **จุดเด่น**: โปรเจกต์นี้มีไฟล์ `vercel.json` อยู่แล้ว สามารถเชื่อม GitHub เข้า Vercel แล้วกด deploy ได้ภายใน 1 นาที
- **ข้อจำกัด**: ถ้าต่อ Wi-Fi โรงแรมในจีน ตัวโดเมน `*.vercel.app` จะถูก GFW บล็อกหรือโหลดไม่ขึ้น
- **คำแนะนำ**: ถ้าใช้ **SIM2Fly / True Travel SIM / eSIM โรมมิ่ง** ตลอดทริป ท่านี้สะดวกที่สุดและไม่มีปัญหาเลย

### ท่าที่ 2: GitHub Pages (ฟรี อยู่บน Repo เดิม)
- **จุดเด่น**: โค้ดอยู่ใน GitHub อยู่แล้ว ไม่ต้องสมัคร Service ใหม่ แค่เปิด GitHub Actions deploy `dist/`
- **ข้อจำกัด**: ในจีนเน็ต Wi-Fi บางเครือข่ายเข้า `*.github.io` ช้ามาก หรือรูปภาพโหลดไม่ขึ้น
- **คำแนะนำ**: เหมาะเป็น Server สำรอง ควบคู่กับ Vercel

### ท่าที่ 3: Cloudflare Pages + Custom Domain (เสถียรที่สุดบนเน็ตจีน ถ้ามีโดเมน)
- **จุดเด่น**: แบนด์วิดท์ไม่จำกัด CDN ของ Cloudflare มี Node อยู่ฮ่องกง/โตเกียวที่เชื่อมต่อเข้าจีนได้ค่อนข้างดี
- **ข้อจำกัด**: โดเมนฟรี `*.pages.dev` โดน GFW บล็อก ต้องผูก Custom Domain ของตัวเอง (เช่น `trip.yourname.com`)
- **คำแนะนำ**: ถ้ามีโดเมนอยู่แล้ว แนะนำท่านี้ที่สุดสำหรับการเปิดผ่าน Wi-Fi จีน

### ท่าที่ 4: Surge.sh (ท่าแอบเงียบ ไม่ค่อยโดนเพ่งเล็ง)
- **จุดเด่น**: ใช้คำสั่ง `npm run build && npx surge dist` ได้ URL ทันที เช่น `china-trip-papon.surge.sh` ไม่ต้องตั้งค่า CI/CD
- **ข้อจำกัด**: เป็น Service ฝรั่งขนาดเล็ก อาจมีความเสี่ยงที่บางช่วงเน็ตจีนจะแกว่ง

### ท่าที่ 5 (หมัดเด็ด): PWA (Progressive Web App) Offline-First Cache
- **ทำไมถึงดีที่สุดสำหรับทริปนี้**:
  1. โปรเจกต์นี้เป็น Trip Plan & Checklist ที่เปิดดูตลอดวัน ทั้งบนรถไฟใต้ดิน Shanghai Metro (ที่อาจไม่มีสัญญาณ), ในห้าง, หรือตามถนน
  2. ติดตั้ง `vite-plugin-pwa` ให้ Service Worker แคชไฟล์ HTML, CSS, JS, ข้อมูล และรูปลงในเครื่องโทรศัพท์
  3. เปิดเว็บ 1 ครั้งก่อนบิน หรือตอนต่อเน็ตโรมมิ่ง จากนั้นจะ **Offline 100%** เปิดได้แม้ไม่มีเน็ต หรือเน็ตโรงแรมโดนบล็อก
  4. กด "Add to Home Screen" บน iPhone / Android แล้วใช้งานเหมือนแอปจริงแบบ Fullscreen

---

## 4. Critical Warning: จุดตายในโค้ดปัจจุบันที่ต้องแก้

ในไฟล์ `index.html` มีการเรียก:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:...&family=Newsreader:..." rel="stylesheet" />
```
> [!WARNING]
> **Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) ถูกบล็อก 100% ในจีน** บน Wi-Fi ท้องถิ่น  
> หากเปิดเว็บผ่านเน็ตจีน เบราว์เซอร์จะค้างรอ Google Fonts จน Timeout (10–30 วินาที) ทำให้หน้าเว็บค้างหรือไม่แสดงตัวหนังสือ (FOIT).  
> **วิธีแก้**: โหลดฟอนต์แบบ Local ผ่าน `@fontsource/inter` และ `@fontsource/newsreader` หรือใส่ Fallback system fonts.

---

## 5. Summary & Recommendation

1. **Deploy หลัก**: ต่อ GitHub เข้า **Vercel** (เพราะมี `vercel.json` พร้อมแล้ว)
2. **Deploy สำรอง**: เปิด **GitHub Pages** เผื่อ Vercel มีปัญหา
3. **Safety Net สูงสุด**: ทำ **PWA (Offline Service Worker)** และ Self-host ฟอนต์ เพื่อให้เปิดดูแพลนได้ 100% ตลอดเวลาไม่ว่าจะเจอสภาพเน็ตแบบไหนในจีน
