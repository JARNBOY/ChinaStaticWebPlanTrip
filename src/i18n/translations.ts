export type Language = "th" | "en";

export interface Translations {
  // Brand & Header
  brandTitle: string;
  dayPill: string;
  essentialsPill: string;
  needToKnowCounter: string;
  btnPdf: string;
  btnSheet: string;
  btnEdit: string;
  btnReset: string;
  resetDayConfirm: string;

  // Day Navigation
  navShanghai: string;
  navBeijing: string;
  navNeedToKnow: string;

  // View Switcher
  viewTimeline: string;
  viewRouteMap: string;
  viewNeedToKnow: string;
  viewInteractiveBadge: string;

  // Location Carousel
  carouselDayHeader: (day: number, count: number) => string;
  carouselPlay: string;
  carouselPause: string;
  carouselPrev: string;
  carouselNext: string;
  carouselZoom: string;

  // Route Summary
  summaryDuration: string;
  summaryStops: string;
  summaryDidi: string;
  summaryWalking: string;

  // Hotel Card
  hotelBase: string;
  hotelAmapRoute: string;
  hotelCopyAddress: string;
  hotelSubway: string;
  hotelCopiedToast: string;

  // Progress Bar
  progressLabel: string;
  progressCompleted: string;
  progressAllDone: string;

  // Timeline & Stops
  stopNum: (num: string) => string;
  labelDuration: string;
  labelTransport: string;
  labelCost: string;
  labelAddress: string;
  labelNote: string;
  openAmap: string;
  openMap: string;
  copyDidi: string;
  fullPhoto: string;
  recheckBadge: string;
  transitLabel: string;

  // Next Stop Bar
  nextStopTitle: string;
  nextStopDoneBtn: string;
  nextStopAllDone: string;

  // Route Map Visualizer
  routeMapTitle: string;
  routeMapSubtitle: string;
  filterAll: string;
  filterPending: string;
  filterCompleted: string;

  // Image Viewer Modal
  photoCount: (current: number, total: number) => string;
  modalClose: string;
  modalPrev: string;
  modalNext: string;

  // Need to Know Page
  ntkHeroTitle: string;
  ntkHeroSubtitle: string;
  ntkStatReady: string;
  ntkStatMustBook: string;
  ntkStatOnSite: string;
  ntkStatTripDays: string;
  ntkBackToItinerary: string;
  ntkTabTickets: string;
  ntkTabDeadlines: string;
  ntkTabFood: string;
  ntkTabSurvival: string;
  ntkResetBtn: string;
  ntkResetConfirm: string;
  ntkFilterAll: string;
  ntkFilterMustBook: string;
  ntkFilterPurchased: string;
  ntkFilterOnSite: string;
  ntkBookingChannel: string;
  ntkAdvice: string;
  ntkDeadlinesTitle: string;
  ntkDeadlinesSubtitle: string;
  ntkFoodTitle: string;
  ntkFoodSubtitle: string;
  ntkSurvivalTitle: string;
  ntkSurvivalSubtitle: string;

  // Footer
  footerCredits: string;
  footerViewTimeline: string;
  footerViewNeedToKnow: string;
  footerCustomize: string;
  footerPrint: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  th: {
    brandTitle: "China, on foot",
    dayPill: "วัน",
    essentialsPill: "สิ่งที่ต้องรู้",
    needToKnowCounter: "ข้อมูลจำเป็น",
    btnPdf: "PDF",
    btnSheet: "ชีต",
    btnEdit: "แก้ไข",
    btnReset: "รีเซ็ต",
    resetDayConfirm: "ต้องการรีเซ็ตเช็คลิสต์ทั้งหมดของวันนี้หรือไม่?",

    navShanghai: "เซี่ยงไฮ้",
    navBeijing: "ปักกิ่ง",
    navNeedToKnow: "สิ่งที่ต้องรู้",

    viewTimeline: "ไทม์ไลน์",
    viewRouteMap: "แผนผังเส้นทาง",
    viewNeedToKnow: "สิ่งที่ต้องรู้",
    viewInteractiveBadge: "แบบโต้ตอบ",

    carouselDayHeader: (day, count) => `จุดแวะพัก วันที่ ${day} · ${count} สถานที่`,
    carouselPlay: "เล่นต่ออัตโนมัติ",
    carouselPause: "หยุดชั่วคราว",
    carouselPrev: "สถานที่ก่อนหน้า",
    carouselNext: "สถานที่ถัดไป",
    carouselZoom: "ดูรูปขนาดเต็ม",

    summaryDuration: "เวลาโดยประมาณ",
    summaryStops: "จุดแวะพัก",
    summaryDidi: "ค่าแท็กซี่ DiDi",
    summaryWalking: "เดินเท้า",

    hotelBase: "โรงแรมที่พัก",
    hotelAmapRoute: "เส้นทาง Amap",
    hotelCopyAddress: "คัดลอกที่อยู่จีน",
    hotelSubway: "การเดินทางรถไฟใต้ดิน",
    hotelCopiedToast: "คัดลอกที่อยู่ภาษาจีนเรียบร้อยแล้ว",

    progressLabel: "ความคืบหน้า",
    progressCompleted: "เสร็จสิ้นแล้ว",
    progressAllDone: "แวะครบทุกจุดของวันนี้แล้ว! ยอดเยี่ยมมาก 🎉",

    stopNum: (num) => `จุดที่ ${num}`,
    labelDuration: "เวลาที่ใช้",
    labelTransport: "การเดินทาง",
    labelCost: "ค่าใช้จ่าย",
    labelAddress: "ที่อยู่",
    labelNote: "บันทึก",
    openAmap: "เปิด Amap",
    openMap: "เปิดแผนที่",
    copyDidi: "คัดลอกจีน (DiDi)",
    fullPhoto: "ดูรูปเต็ม",
    recheckBadge: "ตรวจสอบ",
    transitLabel: "การเดินทาง",

    nextStopTitle: "จุดต่อไป",
    nextStopDoneBtn: "ถึงแล้ว",
    nextStopAllDone: "แวะครบทุกจุดของวันนี้แล้ว! เที่ยวให้สนุกนะ! 🎉",

    routeMapTitle: "แผนผังเส้นทาง & การเดินทาง",
    routeMapSubtitle: "แผนผังจุดแวะพักและการเดินทางเชื่อมต่อ สามารถแตะที่รูปเพื่อดูภาพขนาดเต็ม หรือแตะเปิดแผนที่ Amap ได้ทันที",
    filterAll: "ทั้งหมด",
    filterPending: "ยังไม่ถึง",
    filterCompleted: "แวะแล้ว",

    photoCount: (current, total) => `รูปที่ ${current} จาก ${total} รูป`,
    modalClose: "ปิด",
    modalPrev: "ก่อนหน้า",
    modalNext: "ถัดไป",

    ntkHeroTitle: "Things We Need to Know",
    ntkHeroSubtitle: "สรุปแผนการจองตั๋ว, กำหนดเวลาที่ต้องแย่งกดก่อนวันเดินทาง, ลายแทงร้านอาหาร & คาเฟ่ Boy & Jik และข้อควรระวังสำคัญสำหรับเซี่ยงไฮ้และปักกิ่ง",
    ntkStatReady: "ตั๋วที่เตรียมพร้อมแล้ว",
    ntkStatMustBook: "ตั๋วที่ต้องแย่งกดตามวัน",
    ntkStatOnSite: "ตั๋วที่ซื้อหน้างานได้",
    ntkStatTripDays: "ระยะเวลาทริป (5 SH + 4 BJ)",
    ntkBackToItinerary: "← กลับไปดูแผนการเดินทางรายวัน (Day 1 – 9)",
    ntkTabTickets: "ตั๋ว & เช็คลิสต์",
    ntkTabDeadlines: "ไทม์ไลน์วันเปิดจอง",
    ntkTabFood: "ของกิน & คาเฟ่",
    ntkTabSurvival: "ข้อควรรู้ & เตรียมตัว",
    ntkResetBtn: "รีเซ็ตสถานะ",
    ntkResetConfirm: "ต้องการรีเซ็ตสถานะตั๋วกลับเป็นค่าเริ่มต้นตามที่ระบุใน Google Doc หรือไม่?",
    ntkFilterAll: "ทั้งหมด",
    ntkFilterMustBook: "🔴 ต้องจองล่วงหน้าตามวัน",
    ntkFilterPurchased: "✅ ซื้อเรียบร้อยแล้ว",
    ntkFilterOnSite: "🟡 ซื้อหน้างาน",
    ntkBookingChannel: "ช่องทางจอง:",
    ntkAdvice: "คำแนะนำ:",
    ntkDeadlinesTitle: "Critical Booking Deadlines",
    ntkDeadlinesSubtitle: "ไทม์ไลน์และวันที่ต้องตั้งนาฬิกาปลุกเพื่อกดจองตั๋วสำคัญล่วงหน้าตามเวลาไทย",
    ntkFoodTitle: "Boy & Jik Curated Food & Cafe Guide",
    ntkFoodSubtitle: "รวมพิกัดร้านอาหาร เป็ดปักกิ่ง บุฟเฟต์เนื้อแกะ ติ่มซำ และคาเฟ่น่ารักตามที่ Boy & Jik คุยกัน",
    ntkSurvivalTitle: "China Travel Survival Kit & Essential Rules",
    ntkSurvivalSubtitle: "ข้อควรรู้และการเตรียมตัวเพื่อการเดินทางที่ราบรื่น ไร้กังวลในเซี่ยงไฮ้และปักกิ่ง",

    footerCredits: "China Trip Itinerary · ออกแบบเพื่อการเดินเที่ยวด้วยตัวเองในเซี่ยงไฮ้และปักกิ่ง",
    footerViewTimeline: "ดูแผนรายวัน (Timeline)",
    footerViewNeedToKnow: "ดูสิ่งที่ต้องรู้ (Need to Know)",
    footerCustomize: "ปรับแต่งแผน",
    footerPrint: "พิมพ์ / บันทึก PDF",
  },

  en: {
    brandTitle: "China, on foot",
    dayPill: "DAY",
    essentialsPill: "ESSENTIALS",
    needToKnowCounter: "NEED TO KNOW",
    btnPdf: "PDF",
    btnSheet: "Sheet",
    btnEdit: "Edit",
    btnReset: "Reset",
    resetDayConfirm: "Reset all checkboxes for this day?",

    navShanghai: "SHANGHAI",
    navBeijing: "BEIJING",
    navNeedToKnow: "Need to Know",

    viewTimeline: "Timeline",
    viewRouteMap: "Route Map",
    viewNeedToKnow: "Need to Know",
    viewInteractiveBadge: "Interactive",

    carouselDayHeader: (day, count) => `DAY ${day} CHECKPOINTS · ${count} LOCATIONS`,
    carouselPlay: "Resume auto-scroll",
    carouselPause: "Pause auto-scroll",
    carouselPrev: "Previous location",
    carouselNext: "Next location",
    carouselZoom: "View full photo",

    summaryDuration: "Est. Duration",
    summaryStops: "Stops",
    summaryDidi: "DiDi Est.",
    summaryWalking: "Walking",

    hotelBase: "Hotel & Base",
    hotelAmapRoute: "Amap Route",
    hotelCopyAddress: "Copy Address",
    hotelSubway: "Subway Access",
    hotelCopiedToast: "Chinese address copied to clipboard",

    progressLabel: "Progress",
    progressCompleted: "completed",
    progressAllDone: "All checkpoints completed for today! 🎉",

    stopNum: (num) => `Stop ${num}`,
    labelDuration: "Duration",
    labelTransport: "Transport",
    labelCost: "Cost",
    labelAddress: "Address",
    labelNote: "Note",
    openAmap: "Open Amap",
    openMap: "Open Map",
    copyDidi: "Copy Chinese (DiDi)",
    fullPhoto: "Full Photo",
    recheckBadge: "RECHECK",
    transitLabel: "Transit",

    nextStopTitle: "NEXT STOP",
    nextStopDoneBtn: "Mark Done",
    nextStopAllDone: "All stops completed for today! Great job! 🎉",

    routeMapTitle: "Interactive Route Map & Progression",
    routeMapSubtitle: "Tap photo to view full resolution image, or tap Amap to navigate directly",
    filterAll: "All",
    filterPending: "Pending",
    filterCompleted: "Visited",

    photoCount: (current, total) => `${current} of ${total} Photos`,
    modalClose: "Close",
    modalPrev: "Previous",
    modalNext: "Next",

    ntkHeroTitle: "Things We Need to Know",
    ntkHeroSubtitle: "Master tickets plan, booking deadlines calendar, Boy & Jik food wishlist, and China survival guide for Shanghai & Beijing",
    ntkStatReady: "Tickets Ready",
    ntkStatMustBook: "Urgent Booking Deadlines",
    ntkStatOnSite: "Buy On-Site Tickets",
    ntkStatTripDays: "Trip Duration (5 SH + 4 BJ)",
    ntkBackToItinerary: "← Back to Daily Itinerary (Day 1 – 9)",
    ntkTabTickets: "Tickets & Checklist",
    ntkTabDeadlines: "Booking Deadlines",
    ntkTabFood: "Food & Cafes",
    ntkTabSurvival: "Survival Guide",
    ntkResetBtn: "Reset Status",
    ntkResetConfirm: "Reset ticket checklist to initial status from Google Doc?",
    ntkFilterAll: "All",
    ntkFilterMustBook: "🔴 Must Book in Advance",
    ntkFilterPurchased: "✅ Already Purchased",
    ntkFilterOnSite: "🟡 Buy On-Site",
    ntkBookingChannel: "Booking Channel:",
    ntkAdvice: "Advice:",
    ntkDeadlinesTitle: "Critical Booking Deadlines",
    ntkDeadlinesSubtitle: "Exact dates and alarms to book critical tickets in advance (Bangkok Time)",
    ntkFoodTitle: "Boy & Jik Curated Food & Cafe Guide",
    ntkFoodSubtitle: "Peking duck, lamb skewers buffet, 24-hr dim sum, and cute cafes discussed by Boy & Jik",
    ntkSurvivalTitle: "China Travel Survival Kit & Essential Rules",
    ntkSurvivalSubtitle: "Crucial preparation rules for a seamless winter adventure in Shanghai and Beijing",

    footerCredits: "China Trip Itinerary · Designed for mobile exploration & mindful walking in Shanghai & Beijing",
    footerViewTimeline: "View Timeline",
    footerViewNeedToKnow: "View Need to Know",
    footerCustomize: "Customize Itinerary",
    footerPrint: "Print / Save PDF",
  },
};
