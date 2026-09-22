# Research & Trade-off: PDF Export & Amap Hyperlink Clickability

**Target Project**: `ChinaStaticWebPlanTrip` (React + Vite + TypeScript)  
**Topic**: Hyperlink preservation (Amap / Gaode Maps) when exporting itinerary to PDF  
**Context**: Offline/digital traveler guide for Shanghai trip  

---

## 1. Executive Summary & Direct Answer

> **คำถาม**: ถ้า export PDF file พวก URL location Amap ยังกดได้มั้ยจาก PDF?

### คำตอบสรุป (Bottom Line)
- **ในโค้ดปัจจุบัน ณ ตอนนี้**: **ยังกดไม่ได้** (ลิงก์ไม่แสดงใน PDF)
- **ทางเทคนิคหลังจากปรับจูนเล็กน้อย**: **สามารถกดได้ 100% บน Digital PDF** (ทั้งบน iPhone, Android, Mac และ PC)
- **ทำไมปัจจุบันกดไม่ได้**: 
  1. ใน CSS `@media print` มีการซ่อน `.stop-action-bar` (`display: none !important`) ซึ่งเป็นจุดที่เก็บปุ่ม Amap ของแต่ละ Checkpoint
  2. ใน `TimelineStop.tsx` ปุ่มหลักถูกสร้างด้วยแท็ก `<button onClick={handleOpenMap}>` ซึ่งไฟล์ PDF **ไม่รองรับ JavaScript event listeners** ทำให้ไม่สามารถแปลงเป็น Hyperlink ใน PDF ได้อัตโนมัติ

---

## 2. Technical Investigation: Current Codebase State

จากการตรวจสอบซอร์สโค้ดในโปรเจกต์:

### A. ซ่อนด้วย CSS Print Rule (`src/index.css` L1455–L1464)
```css
@media print {
  .no-print,
  .journal-header,
  .day-navigation,
  .next-stop-bar,
  .modal-backdrop,
  .stop-action-bar, /* <-- ถูกซ่อนทั้งหมด */
  .header-icon-buttons,
  .journal-footer {
    display: none !important;
  }
}
```
แถบปุ่มเปิดแผนที่ของแต่ละ Stop (`.stop-action-bar`) ถูกซ่อนทิ้งทั้งหมดเมื่อสั่ง Print หรือ Save as PDF

### B. Element เป็น `<button>` ไม่ใช่ `<a>` (`src/components/TimelineStop.tsx` L168–L177)
```tsx
<button
  type="button"
  className="action-btn map-btn"
  onClick={handleOpenMap}
  title={entry.mapUrl ? "Open place in Amap (Gaode)" : "Open destination in Apple/Google/Amap"}
>
  {entry.mapUrl ? <Navigation size={13} className="nav-arrow" /> : <Map size={13} />}
  <span>{entry.mapUrl ? "Open Amap" : "Open Map"}</span>
  {entry.mapUrl && <ExternalLink size={10} />}
</button>
```
ตามมาตรฐาน **ISO 32000-1 (PDF Specification - Section 12.5.6.5 URI Actions)**:
- ตัวสร้าง PDF (PDF Engine) ของเบราว์เซอร์ (Chrome Blink, Safari WebKit) จะสร้าง **PDF Link Annotation** (`/Subtype /Link /A << /S /URI ... >>`) ให้กับแท็ก **`<a href="...">`** เท่านั้น
- แท็ก `<button>` ที่ผูกกับ JavaScript `onClick` จะไม่มี URL ใน DOM attribute ส่งผลให้ PDF มองเห็นเป็นเพียงบล็อกสี่เหลี่ยมกราฟิกธรรมดา ไม่มี metadata สำหรับการคลิก

### C. จุดที่พร้อมเป็น Link อยู่แล้ว
- ใน `HotelCard.tsx`: ใช้ `<a href={hotel.mapUrl} target="_blank">` อยู่แล้ว
- ใน `TimelineRoute.tsx`: ใช้ `<a href={entry.mapUrl} target="_blank">` อยู่แล้ว
- ใน `TimelineStop.tsx` (ปุ่ม Alternate Locations): มีการใช้ `<a href={alt.mapUrl}>` อยู่แล้ว

---

## 3. Behavior When Clicking Amap URLs in PDF

เมื่อปรับให้เป็นแท็ก `<a>` ที่มี `href="https://surl.amap.com/..."` และส่งออกเป็น PDF:

| อุปกรณ์ & แอปเปิด PDF | พฤติกรรมเมื่อแตะลิงก์ใน PDF | การทำงานร่วมกับแอป Amap (高德地图) |
| :--- | :--- | :--- |
| **iPhone / iPad** (Apple Books / Files app / LINE / GoodNotes) | เปิด Safari ไปยัง short URL ของ Amap | หากติดตั้งแอป Amap อยู่ iOS จะเด้งถาม *"Open in 'Amap'?"* หรือเปิดแอป Amap ไปยังหมุดพิกัดทันที |
| **Android** (Google Drive Viewer / Adobe Acrobat) | เปิด Chrome / Browser เริ่มต้น | Android Intent จะดักจับโดเมน Amap และเปิดเข้าแอป Amap โดยตรง |
| **Mac / Windows PC** (Preview / Chrome / Edge / Acrobat) | เปิด Browser แท็บใหม่ | เข้าสู่เว็บเวอร์ชัน `amap.com` แสดงแผนที่และพิกัดบนหน้าจอคอม |

### สภาพเน็ตในจีน (GFW & Mainland Accessibility)
- URL ที่ใช้คือ `https://surl.amap.com/xxxx`
- เป็นโครงสร้างพื้นฐานของ **Alibaba (China)** 100%
- **ผลลัพธ์**: ใช้งานได้รวดเร็วทันที ไม่ถูกบล็อกโดย Great Firewall ไม่ว่าจะต่อ Wi-Fi โรงแรมในจีน หรือใช้ซิมโรมมิ่ง

---

## 4. Trade-off Matrix: ท่าการ Export PDF แต่ละวิธี

| ท่าที่ใช้ทำ PDF | สถานะลิงก์ Amap (Clickability) | ขนาด Bundle เพิ่มขึ้น | รองรับภาษาจีน/ไทย | ความยากในการ Implement | แนะนำสำหรับโปรเจกต์นี้ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Browser Native (`window.print()`)** | 🟢 **กดได้ 100%** (ถ้าใช้ `<a href>`) | **0 KB** (ไม่ต้องลง lib) | 🟢 ดีเยี่ยม (ใช้ Font ของระบบ) | 🟢 ต่ำมาก (แก้ CSS + Component นิดเดียว) | ⭐ **#1 แนะนำมากที่สุด** |
| **2. Canvas Raster (`html2canvas` + `jsPDF`)** | 🔴 **กดไม่ได้ 0% (ลิงก์ตาย)** | ~350 KB | 🟡 เสี่ยงฟอนต์เบลอหรือเพี้ยน | 🟡 ปานกลาง | ❌ **ห้ามใช้เด็ดขาด** |
| **3. Vector React (`@react-pdf/renderer`)** | 🟢 **กดได้ 100%** (ผ่าน `<Link>`) | ~1.5 MB+ (หนักมาก) | 🔴 ต้องฝังฟอนต์ TTF ภาษาไทย+จีนเอง มิฉะนั้นเป็นสี่เหลี่ยม `□□` | 🔴 สูง (ต้องเขียน UI ซ้ำอีกชุด) | ❌ Overkill |
| **4. Server-Side (Puppeteer / Playwright)** | 🟢 **กดได้ 100%** | ต้องมี Server / Function | 🟢 ดีเยี่ยม | 🔴 ต้องมี Backend Hosting เสียเงิน | ❌ ผิดโจทย์ Static Web ฟรี |

### วิเคราะห์เจาะลึก:
- **ทำไมท่าที่ 2 (`html2canvas` + `jsPDF`) ถึงเป็นหลุมพรางยอดนิยม**:
  หลายโปรเจกต์มักติดตั้ง `html2canvas` เพราะคิดว่าง่าย แต่ `html2canvas` ทำการ "แคปเจอร์หน้าจอเป็นภาพบิตแมป (PNG)" แล้วนำภาพแปะลง PDF ผลคือข้อความทั้งหมดกลายเป็นรูปภาพ **ลิงก์ทั้งหมดจะกดไม่ติด ตัวหนังสือค้นหา (Search text) ไม่ได้ และภาพแตกเมื่อซูม**
- **ทำไมท่าที่ 1 (`window.print()`) ถึงดีที่สุด**:
  โปรเจกต์นี้มีปุ่ม Print อยู่แล้วที่ Header (`handlePrint = () => window.print()`) เบราว์เซอร์จะคอมไพล์ DOM เป็น Native PDF Vector ทำให้ข้อความคมชัด ค้นหาคำได้ ขนาดไฟล์เล็กมาก (หลักร้อย KB) และ **Hyperlink ทำงานได้อย่างสมบูรณ์แบบ**

---

## 5. Dual Scenario: Digital PDF vs. Printed Hardcopy

เมื่อนักท่องเที่ยวถือเอกสารนี้ มี 2 กรณีใช้งานจริง:

### กรณีที่ 1: Digital PDF (เปิดบน iPad / iPhone / Android)
- **ความต้องการ**: แตะที่ชื่อสถานที่หรือปุ่ม แล้วเปิดแอป Amap ทันที
- **วิธีแก้**: แปลงปุ่มใน `TimelineStop.tsx` จาก `<button>` เป็น `<a href={entry.mapUrl} target="_blank">`

### กรณีที่ 2: Printed Paper (พิมพ์ใส่กระดาษ A4 พกติดกระเป๋า)
- **ปัญหา**: กระดาษจริงกดไม่ได้
- **วิธีแก้**: ใน CSS `@media print` เราสามารถเลือกได้ 2 แบบ:
  1. **แบบสะอาด (Editorial Clean)**: แสดงข้อความที่อยู่ภาษาจีนและชื่อภาษาจีนให้ชัดเจน เพื่อยื่นให้คนขับแท็กซี่ดูได้ทันที
  2. **แบบ QR Code / Short URL**: แสดง URL สั้น (เช่น `surl.amap.com/7Cb0i...`) ใต้ชื่อสถานที่ หรือแสดง QR Code ขนาดเล็ก เพื่อให้เอามือถือสแกนจากกระดาษได้

---

## 6. Actionable Implementation Steps

หากต้องการให้ PDF ที่ Export ออกมามีลิงก์ Amap ที่กดได้ทันที สามารถทำตาม 2 ขั้นตอนนี้:

### ขั้นตอนที่ 1: ปรับ `TimelineStop.tsx`
เปลี่ยนปุ่ม Map จาก `<button>` เป็น `<a>`:
```tsx
{entry.mapUrl ? (
  <a
    href={entry.mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn map-btn print-map-link"
    title="Open place in Amap (Gaode)"
  >
    <Navigation size={13} className="nav-arrow" />
    <span>Open Amap</span>
    <ExternalLink size={10} />
  </a>
) : (
  <button
    type="button"
    className="action-btn map-btn"
    onClick={handleOpenMap}
    title="Open destination in Apple/Google/Amap"
  >
    <Map size={13} />
    <span>Open Map</span>
  </button>
)}
```

### ขั้นตอนที่ 2: ปรับแต่ง `@media print` ใน `src/index.css`
อนุญาตให้แสดงปุ่มแผนที่ในรูปแบบที่เรียบหรู เหมาะกับการพิมพ์:
```css
@media print {
  /* ซ่อนปุ่มอื่นๆ ที่ไม่จำเป็น เช่น Copy สำหรับ DiDi แต่คงปุ่ม Amap Link ไว้ */
  .no-print,
  .journal-header,
  .day-navigation,
  .next-stop-bar,
  .modal-backdrop,
  .header-icon-buttons,
  .journal-footer,
  .copy-btn {
    display: none !important;
  }

  /* แสดง Amap link ในโหมด Print */
  .stop-action-bar {
    display: flex !important;
    margin-top: 8px !important;
    gap: 8px !important;
  }

  .action-btn.map-btn,
  .action-btn.alt-map-btn {
    display: inline-flex !important;
    padding: 2px 8px !important;
    font-size: 11px !important;
    border: 1px solid #999 !important;
    color: #111 !important;
    text-decoration: underline !important;
  }
}
```

---

## 7. Reference Sources & Specs
- **ISO 32000-1 (PDF 1.7)**: Section 12.5.6.5 URI Actions (Hyperlink spec for PDF interactive features)
- **W3C CSS Paged Media Module Level 3**: `@page`, `@media print`, `break-inside: avoid`
- **Gaode Maps Open Platform (高德开放平台)**: URI Scheme & Mobile URL Redirect Specs (`surl.amap.com`)
