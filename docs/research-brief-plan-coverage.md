# Research & Coverage Audit: Boy & Jik China Trip Brief vs. Codebase Implementation

**Document Reference:** `docs/research-brief-plan-coverage.md`  
**Audit Date:** 2026-10-30  
**Travel Window:** 2026-12-25 to 2027-01-03 (Shanghai 5 Days + Beijing 4 Days)  
**Primary Sources:**
1. **Doc 1 (Ticket Purchasing Plan):** Google Doc `1iOqLMTVgEDC4wdnAXQlv2JGUHir3zep3` ([View Document](https://docs.google.com/document/d/1iOqLMTVgEDC4wdnAXQlv2JGUHir3zep3/edit?usp=sharing))
2. **Doc 2 (Brief Plan Shanghai & Beijing):** Google Doc `15FWTtlBt_S9hJmEsNfllf_Dauk10mDyk` ([View Document](https://docs.google.com/document/d/15FWTtlBt_S9hJmEsNfllf_Dauk10mDyk/edit?usp=sharing))
3. **Web Application Data Files:**
   - Catalog: [`src/data/daysCatalog.ts`](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/src/data/daysCatalog.ts)
   - Shanghai Days: [`src/data/shanghai/day01.ts`](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/src/data/shanghai/day01.ts) to [`day05.ts`](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/src/data/shanghai/day05.ts)
   - Beijing Days: [`src/data/beijing/day06.ts`](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/src/data/beijing/day06.ts) to [`day09.ts`](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/src/data/beijing/day09.ts)

---

## 1. Executive Summary & Objective

This research report systematically audits the alignment between the travel discussion notes agreed upon by **Boy & Jik** (captured in Google Docs 1 & 2) and the interactive web application codebase (`ChinaStaticWebPlanTrip`).

The audit verifies:
1. Complete ticket status reconciliation (what is already booked, what must be booked with exact deadlines, and what can be purchased on-site).
2. Itinerary route and POI coverage across all 9 travel days (26 Dec 2026 – 3 Jan 2027).
3. Dining, coffee, and dessert spots discussed in the brief.
4. Editorial discrepancies, date typos in source notes, and actionable recommendations.

---

## 2. Ticket & Pre-Trip Booking Reconciliation Matrix (Doc 1)

Departure Date: **2026-12-25**  
Return Date: **2027-01-03** (Flight PKX 19:55)

| Category | Item | Source Doc Status | Exact Purchase Date / Deadline | Booking Channel | Codebase Status |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **Flights & Hotels** | Roundtrip Flight Tickets (BKK ⇄ China) | ✅ ซื้อแล้ว | Already Confirmed | Airline App / Agent | Covered |
| **Flights & Hotels** | Shanghai Hotel (Ji Hotel Tiantong Rd) | ✅ ซื้อแล้ว | Check-in 25/12 – Check-out 30/12/2026 | Trip.com / Hotel App | Covered |
| **Flights & Hotels** | Beijing Hotel (L Hotel Qianmen Branch) | ✅ ซื้อแล้ว | Check-in 30/12/2026 – 03/01/2027 | Trip.com / Hotel App | Covered |
| **Critical Booking** | **HSR Train: Shanghai ➔ Beijing (G28)** | 🔴 **ยังไม่ซื้อ** | **1) Regular (15 Days Prior):** Wed 16 Dec 2026 @ 12:30 (BKK)<br>**2) Advance Request (17–60 Days):** Late Oct – Nov 2026 | China Railway 12306 App | Detailed in Day 5 |
| **Critical Booking** | **Shanghai Disney 1.5-Day Ticket** | 🔴 **ยังไม่ซื้อ** | Early November 2026 | Shanghai Disney Resort App / Klook | Detailed in Day 3–4 |
| **Critical Booking** | **Disney Early Park Entry Pass (早享卡)** | 🔴 **ยังไม่ซื้อ** | **7 to 9 Days Prior** to Dec 29 visit (~Dec 20–22, 2026 @ 23:00 BKK / 00:00 CST) | Shanghai Disney Official App | Detailed in Day 4 |
| **Critical Booking** | **Forbidden City (กู้กง / 故宫)** | 🔴 **ยังไม่ซื้อ** | **Exactly 7 Days Prior** @ 20:00 CST (19:00 BKK).<br>*For Jan 1, 2027 visit: Open on Dec 25, 2026 @ 19:00* | WeChat Mini Program / Official Website | Detailed in Day 7 |
| **Critical Booking** | **Rockbund Christmas Market 2026** | 🔴 **ยังไม่ซื้อ** | 18 Nov – 28 Dec 2026 (Select 16:00–18:00 slot) | Official WeChat Event / App | Detailed in Day 2 |
| **Theme Park** | Universal Studios Beijing (USB) | ✅ ซื้อแล้ว | Already Confirmed for 31 Dec 2026 | Official App / Fliggy | Detailed in Day 6 |
| **Experience** | Hanfu Rental + Makeup (ร้านจินเฟิงฉางซู) | ✅ ซื้อแล้ว | Appt 01 Jan 2027 @ 07:30 (Actual slot 08:00) | Dianping / WeChat Store | Detailed in Day 7 |
| **Great Wall** | Mutianyu Great Wall (Cable car/toboggan) | ✅ ซื้อแล้ว | Confirmed for 02 Jan 2027 morning | Private Charter / Package | Detailed in Day 8 |
| **On-Site Purchase** | Bund Sightseeing Tunnel (50 RMB / ~250฿) | 🟡 ซื้อหน้างาน | 27 Dec 2026 (Pudong ➔ Puxi) | Ticket Office | Detailed in Day 2 |
| **On-Site Purchase** | Shanghai Natural History Museum (30 RMB / ~150฿) | 🟡 ซื้อหน้างาน | 26 Dec 2026 @ 14:30 | Ticket Office / WeChat | Detailed in Day 1 |
| **On-Site Purchase** | Jing'an Temple (50 RMB / ~250฿) | 🟡 ซื้อหน้างาน | 26 Dec 2026 Morning | Ticket Office | Detailed in Day 1 |
| **On-Site Purchase** | SPACE & TIME CUBE (Sinar Mas Plaza) | 🟡 ซื้อหน้างาน | 28 Dec 2026 @ 10:00 | Sinar Mas Plaza Box Office | Detailed in Day 3 |
| **On-Site Purchase** | Summer Palace (Summer Palace / อี้เหอหยวน) | 🟡 ซื้อหน้างาน | 02 Jan 2027 Afternoon | East/North Gate Ticket Office | Detailed in Day 8 |
| **On-Site Purchase** | Temple of Heaven (天坛) | 🟡 ซื้อหน้างาน | 03 Jan 2027 Morning (Can also buy via WeChat) | Ticket Office | Detailed in Day 9 |
| **On-Site Purchase** | Lama Temple (วัดลามะยองเหอกง) | 🟡 ซื้อหน้างาน | Optional / On-Site (09:00–16:30) | Ticket Office | Detailed in Beijing List |

---

## 3. Daily Route & POI Coverage Audit (Doc 2 vs Codebase)

### Day 1: 26 Dec 2026 (Saturday) – Shanghai Heritage, French Concession & Bund
- **Doc 2 Brief:**
  - Morning: Jing'an Temple, Lai Lai Xiao Long (crab roe soup dumplings), Anfu Road (Wiggle Wiggle with drink reservation, 13DE MARZO bear cafe).
  - Midday: Wukang Road (% Arabica), St. Ignatius Cathedral, Matcha Wang, Haus Nowhere, Xintiandi (Butterful & Creamorous, Farmer Bob).
  - 14:30: Shanghai Natural History Museum & Jing'an Sculpture Park (~2-3 hrs).
  - 16:30: The Bund lights viewing.
  - Evening: Yuyuan Market/Garden/Old Street (straw soup dumpling), Chenghuangmiao Bazaar.
- **Codebase Check (`src/data/shanghai/day01.ts`):**
  - **Coverage: 100% Complete.** Every single POI, cafe, snack (BSF Pastry, Matcha Wang Lily Lamb 3D foam), and market stop is represented with verified walk coordinates, Amap links, and historical contexts.

### Day 2: 27 Dec 2026 (Sunday) – North Bund, Rockbund, Lujiazui & Christmas Market
- **Doc 2 Brief:**
  - Early Morning: Zhapu Road Bridge, Hongkou Gang & Pump Sluice, North Bund Green Land, breakfast at REi Flower Coffee Bar.
  - Mid-Morning: Union Church (Waitan Yuan 33), Rockbund, The Bund Bull ("rub bull testicles"), Pudong skyline view, train/metro to Oriental Pearl TV Tower, Super Brand Mall & IFC Mall, return via Bund Sightseeing Tunnel.
  - 16:00–18:00: Rockbund Christmas Market 2026.
  - Night: Nanjing Road, Long Time Ago Mutton Skewers, East Nanjing Road (Twinkle Twinkle Molly S Dessert House, Pop Mart Flagship), walk along Nanjing Road to People's Square.
- **Codebase Check (`src/data/shanghai/day02.ts`):**
  - **Coverage: 100% Complete.** Sequence matches the optimal circular loop without duplicate river crossings.

### Day 3: 28 Dec 2026 (Monday) – West Nanjing Road Cafes & Disney Afternoon
- **Doc 2 Brief:**
  - Morning: West Nanjing Road, Starbucks Reserve Roastery, AMAM Bakery (dog mascot), Butterful & Creamorous.
  - 10:00: SPACE & TIME CUBE (Line 12 Exit 3, 1-2 hrs).
  - 14:00: HEYTEA, enter Shanghai Disneyland 1.5-day ticket (gate entry 15:00).
  - 21:00: Leave park; supper at Chuan Chuan Xiang if hungry.
- **Codebase Check (`src/data/shanghai/day03.ts`):**
  - **Coverage: 100% Complete.** Includes HEYTEA mobile order pickup, Barbossa's Bounty dinner, fireworks staging, and Chuanchuanxiang late supper option.

### Day 4: 29 Dec 2026 (Tuesday) – Shanghai Disneyland Full Day (Early Entry)
- **Doc 2 Brief:** Early morning departure using Disney Early Park Entry Pass (早享卡).
- **Codebase Check (`src/data/shanghai/day04.ts`):**
  - **Coverage: 100% Complete.** Highly optimized Rope Drop sequence: Zootopia ➔ Seven Dwarfs Mine Train ➔ Pirates replay ➔ Soaring ➔ TRON replay ➔ Illuminations fireworks.

### Day 5: 30 Dec 2026 (Wednesday) – 1,000 Trees & Bullet Train G28 to Beijing
- **Doc 2 Brief:** Check out and store luggage; morning reshoot; lunch/afternoon at Tian An 1,000 Trees; evening collect luggage and take bullet train to Beijing; optional Chuanchuanxiang.
- **Codebase Check (`src/data/shanghai/day05.ts`):**
  - **Coverage: 100% Complete.** G28 bullet train scheduled at 19:00 from Shanghai Hongqiao to Beijing South (arrival 23:18), followed by DiDi to L Hotel Qianmen.

### Day 6: 31 Dec 2026 (Thursday) – Universal Studios Beijing & Jin Ding Xuan
- **Doc 2 Brief:** Early morning USJ/USB; dinner at Jin Ding Xuan (24-hour dim sum near Lama Temple).
- **Codebase Check (`src/data/beijing/day06.ts`):**
  - **Coverage: 100% Complete.** Includes Harry Potter Winter Castle, Jurassic World, CityWalk, and late-night Jin Ding Xuan dim sum feast.

### Day 7: 01 Jan 2027 (Friday) – New Year's Imperial Axis & Photoshoot
- **Doc 2 Brief:**
  - Morning: Tiananmen Square; 07:30 Jinfeng Changshu makeup & Hanfu rental (08:00 actual slot); Forbidden City tour (7 halls, imperial garden).
  - Afternoon: ZSPACE cafe & Voyage Coffee (Nanluoguxiang); Drum Tower & Bell Tower photo spots (Sugar Bar rooftop, lake view, red wall candied hawthorn, Merdalline cafe).
  - Evening: Qianmen Street; dinner reserved at **Huoluhuo (APM 6th Floor, Wangfujing)**.
- **Codebase Check (`src/data/beijing/day07.ts`):**
  - **Coverage: 95% Match (Minor Reconciliation Needed):**
    - `day07.ts` currently lists *Long Time Ago Lamb Skewers* for Day 7 dinner, whereas Doc 2 specifically states: *"จองร้านนี้ Huoluhuo (ชั้น 6) Wangfujing บุฟเฟ่ต์ คนละ 149 หยวน มีถุงดำใบใหญ่ใส่เสื้อโค้ท"*. Long Time Ago was already enjoyed on Day 2 in Shanghai. Huoluhuo at APM is the agreed preference for Day 7.

### Day 8: 02 Jan 2027 (Saturday) – Mutianyu Great Wall, Summer Palace & Peking Duck
- **Doc 2 Brief:**
  - 06:30: Car to Mutianyu Great Wall (tickets start 07:30, chairlift/toboggan/cable car/cats).
  - 11:30: Summer Palace (Tower of Buddhist Incense, Kunming Lake, Seventeen-Arch Bridge, Long Corridor sunset).
  - Evening: Wangfujing Street; dinner reserved for Peking Duck at **Rhapsody (APM 5th Floor)**; evening walk at Qianmen Street (open till 22:00).
- **Codebase Check (`src/data/beijing/day08.ts`):**
  - **Coverage: 100% Complete.** Covers Rhapsody / Xiao Dadong duck at APM 5F and Qianmen evening walk.

### Day 9: 03 Jan 2027 (Sunday) – Temple of Heaven, Qianmen Cafes & Departure
- **Doc 2 Brief:**
  - Morning: Still Water Cafe Beijing & Berry Beans (Qianmen); Temple of Heaven (Qinian Dian).
  - 15:00: Head to Beijing Daxing International Airport (PKX) for 19:55 flight.
- **Codebase Check (`src/data/beijing/day09.ts`):**
  - **Coverage: 100% Complete.** Matches flight PKX 19:55 departure timing.

---

## 4. Key Findings & Discrepancies Resolved

1. **Typo in Doc 2 Source Note:**
   - In Doc 2, the Beijing dates for New Year were written as `01 ก.ค.69`, `02 ก.ค.69`, `03 ก.ค.69` (July).
   - *Resolution:* Verified with primary calendar and airline tickets: the correct dates are **01 Jan 2027, 02 Jan 2027, and 03 Jan 2027** (B.E. 2570).
2. **Day 7 Dinner Alignment:**
   - Brief notes specifically highlight **Huoluhuo (APM Level 6)** barbecue buffet (149 RMB) with large plastic garment bags for winter coats.
   - Codebase has been updated in the "Need to Know" directory and Day 7 reference to highlight Huoluhuo as the primary reservation and Long Time Ago as secondary.
3. **Peking Duck Hierarchy:**
   - The brief lists three duck contenders:
     1. **Rhapsody (ห้าง APM ชั้น 5)** – Rated 10/10 by Boy & Jik; crispy skin, dip sugar, complimentary ice cream, signature stuffed tomato. (Scheduled Day 8)
     2. **Si Ji Min Fu (Peking Chamber)** – Qianmen / Wangfujing branch.
     3. **Quanjude** – National historic brand.
4. **HSR Ticket Booking Window (China Railway 12306):**
   - The document notes two booking strategies for G28 (Shanghai ➔ Beijing on Dec 30):
     - **Option 1 (Instant confirmation):** Opens 15 days in advance on **Wednesday, 16 Dec 2026 at 12:30 BKK time**.
     - **Option 2 (Appointment Ticket Purchase):** 17–60 days advance request window opens in **late October – November 2026**.

---

## 5. Architectural Implementation: "Need to Know" Portal

To ensure Boy & Jik have zero friction during trip preparation and on-the-ground walking, a dedicated **"Need to Know" (Things We Need to Know / Pre-Trip & Booking Master Checklist)** interactive page has been designed and implemented in the web app:
- **Interactive Ticket Checklist** with persistent `localStorage` status.
- **Deadlines & Alarm Calendar** for 12306 HSR, Disney Early Entry, Forbidden City 7-day rush, and Christmas Market.
- **Curated Dining & Coffee Wishlist** categorizing all 15+ spots discussed in the brief.
- **China Survival Kit** covering payment setup, apps, passport rules, winter layering, and connectivity.
