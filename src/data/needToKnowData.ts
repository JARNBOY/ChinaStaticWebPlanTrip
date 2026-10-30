export interface TicketItem {
  id: string;
  category: "transport_hotel" | "must_book_advance" | "attraction_ready" | "on_site";
  city: "Shanghai" | "Beijing" | "General";
  nameTh: string;
  nameEn: string;
  priceInfo?: string;
  initialStatus: "purchased" | "must_book" | "on_site";
  deadlineDate?: string;
  deadlineDescription: string;
  bookingChannel: string;
  actionNote?: string;
}

export interface DiningItem {
  id: string;
  city: "Shanghai" | "Beijing";
  category: "peking_duck" | "bbq_hotpot" | "dimsum_local" | "cafe_dessert";
  nameTh: string;
  nameCn: string;
  location: string;
  highlight: string;
  targetDay?: string;
  openingHours?: string;
  tags: string[];
}

export interface SurvivalTip {
  id: string;
  category: "app" | "passport_rule" | "weather" | "payment";
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  bullets: string[];
}

export const TICKET_ITEMS: TicketItem[] = [
  // Transport & Hotel
  {
    id: "flight-tickets",
    category: "transport_hotel",
    city: "General",
    nameTh: "ตั๋วเครื่องบินเดินทางไป-กลับ (BKK ⇄ China)",
    nameEn: "Roundtrip Flight Tickets",
    initialStatus: "purchased",
    deadlineDescription: "ซื้อเรียบร้อยแล้ว เดินทาง 25 ธ.ค. 2026 / กลับ 3 ม.ค. 2027",
    bookingChannel: "Airline / OTA",
    actionNote: "ไฟลต์ขากลับออกจากสนามบิน Daxing (PKX) วันที่ 3 ม.ค. 2027 เวลา 19:55 น.",
  },
  {
    id: "hotel-shanghai",
    category: "transport_hotel",
    city: "Shanghai",
    nameTh: "ที่พัก Shanghai: Ji Hotel (The Bund Tiantong Road)",
    nameEn: "Ji Hotel The Bund Tiantong Road",
    initialStatus: "purchased",
    deadlineDescription: "จองเรียบร้อยแล้ว (Check-in 25 ธ.ค. – Check-out 30 ธ.ค. 2026 รวม 5 คืน)",
    bookingChannel: "Trip.com / Official App",
    actionNote: "โรงแรมอยู่ใกล้ MRT Tiantong Road และสะพานจาปู่ เดินไป The Bund สะดวกมาก",
  },
  {
    id: "hotel-beijing",
    category: "transport_hotel",
    city: "Beijing",
    nameTh: "ที่พัก Beijing: L Hotel (Qianmen Branch)",
    nameEn: "L Hotel Qianmen Branch",
    initialStatus: "purchased",
    deadlineDescription: "จองเรียบร้อยแล้ว (Check-in 30 ธ.ค. 2026 – Check-out 3 ม.ค. 2027 รวม 4 คืน)",
    bookingChannel: "Trip.com / Official App",
    actionNote: "ตั้งอยู่ติดถนนคนเดินเฉียนเหมิน ใกล้จัตุรัสเทียนอันเหมินและกู้กง",
  },

  // Must Book Advance (Deadlines)
  {
    id: "train-sh-bj",
    category: "must_book_advance",
    city: "General",
    nameTh: "ตั๋วรถไฟความเร็วสูง Shanghai – Beijing (ขบวน G28 วันที่ 30 ธ.ค.)",
    nameEn: "Fuxing Bullet Train G28 (Shanghai Hongqiao ➔ Beijing South)",
    initialStatus: "must_book",
    deadlineDate: "2026-12-16T12:30:00",
    deadlineDescription: "🔴 เปิดจองวันพุธที่ 16 ธ.ค. 2569 เวลา 12:30 น. (15 วันล่วงหน้า) หรือสั่งจองล่วงหน้าช่วง ต.ค. - พ.ย.",
    bookingChannel: "แอป China Railway 12306",
    actionNote: "วิธีที่ 1: กดจองทันที 15 วันล่วงหน้า (16 ธ.ค. 12:30 น.) | วิธีที่ 2: ระบบใหม่ Appointment Ticket Purchase ล่วงหน้า 17–60 วัน (เปิดปลาย ต.ค.–พ.ย.) ระบบประมวลผลตั๋ว 16-20 วันก่อนเดินทาง",
  },
  {
    id: "shanghai-disney-pass",
    category: "must_book_advance",
    city: "Shanghai",
    nameTh: "ตั๋ว Shanghai Disney 1.5 Day Ticket",
    nameEn: "Shanghai Disneyland 1.5-Day Ticket",
    initialStatus: "must_book",
    deadlineDate: "2026-11-01T00:00:00",
    deadlineDescription: "🔴 เริ่มจองได้ตั้งแต่ต้นเดือน พฤศจิกายน 2569",
    bookingChannel: "Shanghai Disney Resort Official App / Klook / Trip.com",
    actionNote: "เข้า Park บ่ายวันแรก 28 ธ.ค. (ตั้งแต่ 15:00 น.) และเต็มวันในวันที่ 29 ธ.ค.",
  },
  {
    id: "shanghai-disney-early-bird",
    category: "must_book_advance",
    city: "Shanghai",
    nameTh: "บัตรเข้าก่อนเวลา Early Park Entry Pass (迪士尼早享卡)",
    nameEn: "Disney Early Park Entry Pass (Day 4: 29 Dec)",
    initialStatus: "must_book",
    deadlineDate: "2026-12-20T23:00:00",
    deadlineDescription: "🔴 เปิดให้กดซื้อล่วงหน้า 7 - 9 วันก่อนวันเข้าชม เวลา 23:00 น. เวลาไทย (00:00 น. เที่ยงคืนจีน)",
    bookingChannel: "แอปพลิเคชันทางการ Shanghai Disney Resort เท่านั้น",
    actionNote: "สำหรับเข้าวันที่ 29 ธ.ค. ระบบจะเปิดให้กดประมาณวันที่ 20-22 ธ.ค. เวลา 23:00 น. ตรง ตั๋ว Early มีจำนวนจำกัดต่อวัน ต้องรีบกด!",
  },
  {
    id: "forbidden-city-ticket",
    category: "must_book_advance",
    city: "Beijing",
    nameTh: "พระราชวังต้องห้าม (The Forbidden City / กู้กง)",
    nameEn: "The Forbidden City (The Palace Museum)",
    initialStatus: "must_book",
    deadlineDate: "2026-12-25T19:00:00",
    deadlineDescription: "🔴 ต้องจองล่วงหน้า 7 วัน เวลา 20:00 น. เวลาจีน (19:00 น. เวลาไทย)",
    bookingChannel: "WeChat Mini Program (故宫博物院观众服务) หรือเว็บทางการ",
    actionNote: "สำหรับรอบเข้าชม 1 ม.ค. 2570 ระบบจะเปิดให้กดวันที่ 25 ธ.ค. 2569 เวลา 19:00 น. เป๊ะๆ โควตาเต็มเร็วมากภายในไม่กี่นาที!",
  },
  {
    id: "rockbund-christmas-market",
    category: "must_book_advance",
    city: "Shanghai",
    nameTh: "Rockbund Christmas Market 2026 (ตลาดคริสต์มาสย่านร็อคบันด์)",
    nameEn: "Rockbund Christmas Market 2026 / Christkindlmarkt",
    initialStatus: "must_book",
    deadlineDate: "2026-11-18T00:00:00",
    deadlineDescription: "🔴 ต้องจองในแอพล่วงหน้า 18 พ.ย. – 28 ธ.ค. 2026 (เลือกรอบ 16:00–18:00 น.)",
    bookingChannel: "Official WeChat Mini Program / App Event",
    actionNote: "รอบเวลา 16:00–18:00 น. ของวันอาทิตย์ที่ 27 ธ.ค. จะได้บรรยากาศแสงเย็นต่อไฟประดับค่ำคืนสวยที่สุด",
  },

  // Attractions Already Purchased
  {
    id: "universal-beijing",
    category: "attraction_ready",
    city: "Beijing",
    nameTh: "ตั๋ว Universal Studios Beijing (เข้าวันที่ 31 ธ.ค.)",
    nameEn: "Universal Studios Beijing Day Pass",
    initialStatus: "purchased",
    deadlineDescription: "ซื้อเรียบร้อยแล้ว (สำหรับวันที่ 31 ธ.ค. 2569 วันสิ้นปี)",
    bookingChannel: "Official App / Fliggy / Trip.com",
    actionNote: "ฉลอง New Year's Eve ปราสาทฮอกวอตส์หิมะ + มื้อค่ำติ่มซำ Jin Ding Xuan 24 ชม.",
  },
  {
    id: "mutianyu-great-wall",
    category: "attraction_ready",
    city: "Beijing",
    nameTh: "กำแพงเมืองจีน ด่าน Mutianyu (รถเช่าส่วนตัว + กระเช้า/สไลเดอร์)",
    nameEn: "Mutianyu Great Wall Tour & Cable Car / Toboggan",
    initialStatus: "purchased",
    deadlineDescription: "จองเรียบร้อยแล้ว (เช่ารถออกเดินทาง 06:30 น. วันที่ 2 ม.ค. 2570)",
    bookingChannel: "Charter Service / Package",
    actionNote: "เริ่มเปิดบริการ 07:30 น. นั่งกระเช้าห้อยขา สไลเดอร์ลง และเล่นกับน้องแมวบนกำแพง",
  },
  {
    id: "hanfu-photoshoot",
    category: "attraction_ready",
    city: "Beijing",
    nameTh: "จ้างช่างแต่งหน้า + เช่าชุดจีนโบราณ (ร้านจินเฟิงฉางซู)",
    nameEn: "Jinfeng Changshu Hanfu Makeup & Rental",
    initialStatus: "purchased",
    deadlineDescription: "จองเรียบร้อยแล้ว วันที่ 1 ม.ค. 2570 นัด 07:30 น. (เวลาแต่งจริง 08:00 น.)",
    bookingChannel: "Dianping / WeChat Store",
    actionNote: "แต่งหน้าแปลงโฉมชุดจีนก่อนเดินเข้าถ่ายรูปในพระราชวังต้องห้าม",
  },

  // On-Site Purchase Tickets
  {
    id: "bund-tunnel",
    category: "on_site",
    city: "Shanghai",
    nameTh: "อุโมงค์เลเซอร์ลอดแม่น้ำ (Bund Sightseeing Tunnel)",
    nameEn: "Bund Sightseeing Tunnel",
    priceInfo: "50 หยวน (~250 บาท) / คน",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานได้ทันที",
    bookingChannel: "เคาน์เตอร์จำหน่ายตั๋วทางเข้าฝั่งผู่ตง (Lujiazui)",
    actionNote: "ใช้นั่งข้ามแม่น้ำหวงผู่จากฝั่ง Lujiazui กลับมายัง The Bund ฝั่งผู่ซี บ่ายวันที่ 27 ธ.ค.",
  },
  {
    id: "natural-history-museum",
    category: "on_site",
    city: "Shanghai",
    nameTh: "พิพิธภัณฑ์ประวัติศาสตร์ธรรมชาติเซี่ยงไฮ้ (Shanghai Natural History Museum)",
    nameEn: "Shanghai Natural History Museum",
    priceInfo: "30 หยวน (~150 บาท) / คน",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานหรือสแกนซื้อผ่าน WeChat",
    bookingChannel: "เคาน์เตอร์จำหน่ายตั๋วหน้าทางเข้า",
    actionNote: "เข้าชมบ่าย 14:30 น. วันที่ 26 ธ.ค. พร้อมเดินเล่นสวนประติมากรรม Jing'an Sculpture Park",
  },
  {
    id: "jingan-temple",
    category: "on_site",
    city: "Shanghai",
    nameTh: "วัดจิ้งอัน (Jing'an Temple)",
    nameEn: "Jing'an Temple",
    priceInfo: "50 หยวน (~250 บาท) / คน",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานได้ทันที",
    bookingChannel: "เคาน์เตอร์จำหน่ายตั๋วหน้าทางเข้าวัด",
    actionNote: "เข้าชมช่วงเช้า 08:30 น. วันที่ 26 ธ.ค. ก่อนไปทานเสี่ยวหลงเปาร้าน Lai Lai Xiao Long",
  },
  {
    id: "space-time-cube",
    category: "on_site",
    city: "Shanghai",
    nameTh: "SPACE & TIME CUBE นิทรรศการเมตาเวิร์สและศิลปะดิจิทัล",
    nameEn: "SPACE & TIME CUBE (Sinar Mas Plaza)",
    priceInfo: "ซื้อหน้างานตามแพ็กเกจ",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานได้ทันที",
    bookingChannel: "เคาน์เตอร์ทางเข้าชั้น LG Sinar Mas Plaza (MRT Line 12 Cruise Terminal ทางออก 3)",
    actionNote: "เข้าชมช่วง 10:00–12:00 น. วันที่ 28 ธ.ค. ก่อนมุ่งหน้าไปดิสนีย์แลนด์รอบบ่าย",
  },
  {
    id: "summer-palace",
    category: "on_site",
    city: "Beijing",
    nameTh: "พระราชวังฤดูร้อน อี้เหอหยวน (Summer Palace)",
    nameEn: "Summer Palace (Yiheyuan)",
    priceInfo: "ซื้อหน้างาน ~30-60 หยวน (ตั๋วรวม/ตั๋วผ่านประตู)",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานได้ทันทีที่เคาน์เตอร์",
    bookingChannel: "Ticket Office ประตูทางเข้าฝั่งเหนือ/ตะวันออก",
    actionNote: "เข้าชมบ่าย 11:30–14:30 น. วันที่ 2 ม.ค. ชมแสงเย็นทะเลสาบคุนหมิงและสะพาน 17 โค้ง",
  },
  {
    id: "temple-of-heaven",
    category: "on_site",
    city: "Beijing",
    nameTh: "หอสักการะฟ้าเทียนถาน (Temple of Heaven)",
    nameEn: "Temple of Heaven (Tiantan)",
    priceInfo: "ซื้อหน้างานหรือจองผ่าน WeChat Mini Program",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานได้ที่เคาน์เตอร์ (หรือกดล่วงหน้าใน WeChat)",
    bookingChannel: "เคาน์เตอร์จำหน่ายตั๋วหน้าทางเข้า",
    actionNote: "เข้าชมเช้าวันที่ 3 ม.ค. ไฮไลท์ตำหนัก Qinian Dian วงกลมสีน้ำเงินอันเลื่องชื่อ",
  },
  {
    id: "lama-temple",
    category: "on_site",
    city: "Beijing",
    nameTh: "วัดลามะยองเหอกง (Lama Temple)",
    nameEn: "Yonghe Temple (Lama Temple)",
    priceInfo: "25 หยวน (~125 บาท) / คน",
    initialStatus: "on_site",
    deadlineDescription: "ซื้อหน้างานได้ที่ Ticket Office (09:00–16:30 น.)",
    bookingChannel: "เคาน์เตอร์จำหน่ายตั๋วหน้าทางเข้า",
    actionNote: "วัดทิเบตศักดิ์สิทธิ์ ขอพรเรื่องงานและการเรียน แวะทานไอติมมัทฉะตรงข้ามวัดและติ่มซำ Jin Ding Xuan",
  },
];

export const DINING_ITEMS: DiningItem[] = [
  // Peking Duck
  {
    id: "rhapsody-duck",
    city: "Beijing",
    category: "peking_duck",
    nameTh: "Rhapsody / Xiao Dadong (เป็ดปักกิ่ง 10/10)",
    nameCn: "大董旗下·Rhapsody (北京apm店)",
    location: "ห้าง APM ชั้น 5 ถนนหวังฝูจิ่ง",
    highlight: "เป็ดปักกิ่งหนังกรอบจิ้มน้ำตาลทราย เนื้อนุ่มฉ่ำ แถมไอติมฟรี เมนูห้ามพลาดคือมะเขือเทศสอดไส้แสนอร่อย",
    targetDay: "Day 8 (02 ม.ค. 2570) มื้อเย็น",
    tags: ["Must Eat", "Peking Duck", "10/10 Recommended"],
  },
  {
    id: "sijiminfu-duck",
    city: "Beijing",
    category: "peking_duck",
    nameTh: "Si Ji Min Fu (Peking Chamber) เป็ดหนังบางกรอบ",
    nameCn: "四季民福烤鸭店",
    location: "สาขาถนนเฉียนเหมิน (Qianmen) หรือ สาขาหวังฝูจิ่ง",
    highlight: "ร้านเป็ดปักกิ่งคิวยาวอันดับ 1 หนังบางกรอบดุจแก้ว แป้งนุ่ม น้ำจิ้มเข้มข้น",
    tags: ["Peking Duck", "Famous Queue"],
  },
  {
    id: "quanjude-duck",
    city: "Beijing",
    category: "peking_duck",
    nameTh: "Quanjude Roast Duck Restaurant",
    nameCn: "全聚德烤鸭店",
    location: "ย่านหวังฝูจิ่ง / ถนนเฉียนเหมิน",
    highlight: "เป็ดย่างสูตรแขวนดั้งเดิมระดับตำนานของปักกิ่ง เปิดมานานกว่าร้อยปี",
    tags: ["Peking Duck", "Heritage Classic"],
  },

  // BBQ & Hotpot
  {
    id: "huoluhuo-apm",
    city: "Beijing",
    category: "bbq_hotpot",
    nameTh: "Huoluhuo (บุฟเฟต์ปิ้งย่าง 149 หยวน)",
    nameCn: "火炉火·烤肉自助 (北京apm店)",
    location: "ห้าง APM ชั้น 6 ถนนหวังฝูจิ่ง",
    highlight: "บุฟเฟต์คุ้มค่า 149 หยวน/คน มีทั้งเนื้อแกะ เนื้อวัว หอยนางรม ของคาวของหวาน ไอติมฟรี มีถุงดำใบใหญ่แจกให้ใส่เสื้อโค้ทกันกลิ่นติดเสื้อ",
    targetDay: "Day 7 (01 ม.ค. 2570) มื้อเย็น",
    tags: ["Buffet 149 RMB", "Lamb & Oysters", "Coat Bag Provided"],
  },
  {
    id: "long-time-ago",
    city: "Shanghai",
    category: "bbq_hotpot",
    nameTh: "Long Time Ago Mutton Skewers (แกะย่างเตาหมุน)",
    nameCn: "很久以前羊肉串",
    location: "Shanghai No. 1 Dept Store ชั้น 7 / Beijing APM ชั้น 6",
    highlight: "เนื้อแกะฮูหลุนเป้ยเอ่อร์เสียบไม้ย่างบนเตาหมุนอัตโนมัติ กลิ่นหอมเครื่องเทศจีน มีแผ่นแปะหน้าผากเย็นแถมให้",
    targetDay: "Day 2 (27 ธ.ค. 2569) มื้อค่ำ",
    openingHours: "เปิดตั้งแต่ 16:00 น. เป็นต้นไป",
    tags: ["Automatic Skewers", "Must Eat"],
  },
  {
    id: "feidachu",
    city: "Beijing",
    category: "bbq_hotpot",
    nameTh: "ร้านเชฟเฟย Feidachu (หมูผัดพริกหยวกฉางซา)",
    nameCn: "费大厨辣椒炒肉 (北京apm店)",
    location: "ห้าง APM ชั้น 5 ถนนหวังฝูจิ่ง",
    highlight: "เมนูเด็ดอันดับ 1 ของจีน: หมูผัดพริกหยวกเสิร์ฟบนเตาไฟร้อนๆ กินคู่กับข้าวสวยร้อนๆ",
    tags: ["Hunan Food", "Spicy Pork"],
  },
  {
    id: "chuanchuanxiang",
    city: "Shanghai",
    category: "bbq_hotpot",
    nameTh: "Chuan Chuan Xiang (หมาล่าเสียบไม้)",
    nameCn: "串串香",
    location: "ใกล้ที่พัก / ดิสนีย์แลนด์",
    highlight: "หมาล่าเสียบไม้รสชาติเข้มข้น เหมาะสำหรับมื้อดึกรอบค่ำหลังเที่ยวเสร็จ",
    targetDay: "Day 3 & Day 5 มื้อค่ำดึก",
    tags: ["Late Night", "Mala Skewers"],
  },

  // Dim Sum & Heritage
  {
    id: "jindingxuan",
    city: "Beijing",
    category: "dimsum_local",
    nameTh: "Jin Ding Xuan (ติ่มซำ 24 ชั่วโมง)",
    nameCn: "金鼎轩 (地坛南门店 - ใกล้วัดลามะ)",
    location: "ถนนเหอผิงหลี่ ใกล้วัดลามะ Yonghegong",
    highlight: "อาคารสไตล์จีนโบราณประดับโคมไฟแดงสว่างไสว เปิดตลอด 24 ชม. เมนูแนะนำ: ฮะเก๋า, ขนมจีบกุ้งจักรพรรดิ, เสี่ยวหลงเปา",
    targetDay: "Day 6 (31 ธ.ค. 2569) มื้อค่ำ",
    openingHours: "เปิด 24 ชั่วโมง",
    tags: ["24 Hours", "Dim Sum Classic"],
  },
  {
    id: "lailai-xiaolong",
    city: "Shanghai",
    category: "dimsum_local",
    nameTh: "Lai Lai Xiao Long (เสี่ยวหลงเปามันปู)",
    nameCn: "莱莱小笼",
    location: "ใกล้ถนนหนานจิงตะวันตก / วัดจิ้งอัน",
    highlight: "เสี่ยวหลงเปาไส้หมูผสมมันปูเยิ้มๆ แป้งบาง น้ำซุปหวานหอมขิง เมนูอาหารเช้าที่ดีที่สุดในเซี่ยงไฮ้",
    targetDay: "Day 1 (26 ธ.ค. 2569) มื้อเช้า",
    tags: ["Breakfast", "Crab Roe Xiao Long Bao"],
  },

  // Cafes & Desserts
  {
    id: "matcha-wang",
    city: "Shanghai",
    category: "cafe_dessert",
    nameTh: "Matcha Wang (ชาเขียวฟองนมน้องแกะ 3D)",
    nameCn: "Matcha Wang (HAI 550 ชั้น 1)",
    location: "ถนนหวยไห่จงลู่ (Huaihai Middle Rd No. 550)",
    highlight: "คาเฟ่มัทฉะเกรดพรีเมียม ไฮไลท์คือลาเต้ฟองนม 3D ปั้นรูปน้องแกะ Lily Lamb น่ารักที่สุดในโลก",
    targetDay: "Day 1 (26 ธ.ค. 2569)",
    tags: ["3D Foam Latte", "Cute Cafe"],
  },
  {
    id: "13de-marzo-wiggle",
    city: "Shanghai",
    category: "cafe_dessert",
    nameTh: "13DE MARZO Cafe & Wiggle Wiggle",
    nameCn: "13DE MARZO Cafe (安福路店)",
    location: "ถนนอันฟู (Anfu Road)",
    highlight: "คาเฟ่น้องหมีเกาะแก้วน้ำสุดฮิต *คำแนะนำ: แวะกดจองคิวน้ำไว้ก่อน แล้วเดินเล่นถ่ายรูปในร้าน Wiggle Wiggle*",
    targetDay: "Day 1 (26 ธ.ค. 2569)",
    tags: ["Teddy Bear Cup", "Anfu Road"],
  },
  {
    id: "rei-flower-coffee",
    city: "Shanghai",
    category: "cafe_dessert",
    nameTh: "REi · FLOWER COFFEE BAR",
    nameCn: "REi·FLOWER COFFEE BAR (北外滩店)",
    location: "ริมคลองหงโขว่ ย่าน North Bund",
    highlight: "จิบกาแฟยามเช้าพร้อมชมวิวด้านหลังของคลองหงโขว่และหอไข่มุก Oriental Pearl ยอดแหลม",
    targetDay: "Day 2 (27 ธ.ค. 2569) มื้อเช้า",
    tags: ["Skyline View", "Morning Coffee"],
  },
  {
    id: "starbucks-roastery",
    city: "Shanghai",
    category: "cafe_dessert",
    nameTh: "Starbucks Reserve Shanghai Roastery",
    nameCn: "星巴克臻选上海烘焙工坊",
    location: "ถนนหนานจิงตะวันตก (Nanjing West Road)",
    highlight: "โรงคั่วกาแฟสตาร์บัคส์ขนาดยักษ์ ถังบ่มทองเหลืองแกะสลักอักษรจีนโบราณ สวยงามตระการตา",
    targetDay: "Day 3 (28 ธ.ค. 2569)",
    tags: ["Roastery Reserve", "Iconic Landmark"],
  },
  {
    id: "amam-bakery",
    city: "Shanghai",
    category: "cafe_dessert",
    nameTh: "AMAM Lonbakery Town",
    nameCn: "AMAM Lonbakery Town (吴江路店)",
    location: "ถนนคนเดินอู๋เจียงลู่ (Wujiang Road)",
    highlight: "เบเกอรี่คาเฟ่สุดคิวท์ที่มีมาสคอตน้องหมาสีสันสดใส ขนมปังสดใหม่และมุมถ่ายรูปน่ารัก",
    targetDay: "Day 3 (28 ธ.ค. 2569)",
    tags: ["Cute Dog Mascot", "Bakery"],
  },
  {
    id: "zspace-cafe",
    city: "Beijing",
    category: "cafe_dessert",
    nameTh: "ZSPACE (自如ZSpace)",
    nameCn: "自如ZSpace (协作胡同40号)",
    location: "ตรอกหูท่ง Xiezuo No. 40 ย่านตงเฉิง",
    highlight: "บ้านโบราณเรือนสี่ประสาน (Siheyuan) อายุกว่า 100 ปี ปรับปรุงเป็นพื้นที่ศิลปะ คาเฟ่ และสวนกลางบ้านร่มรื่น",
    targetDay: "Day 7 (01 ม.ค. 2570)",
    openingHours: "10:00 - 22:00 น.",
    tags: ["Siheyuan Courtyard", "Hidden Gem"],
  },
  {
    id: "sugar-bar",
    city: "Beijing",
    category: "cafe_dessert",
    nameTh: "Sugar Bar (ดาดฟ้าชมวิวหอกลองและหลังคาบ้านโบราณ)",
    nameCn: "Sugar Bar (什刹海店)",
    location: "ย่านสือซาไห่ (Shichahai)",
    highlight: "เดินขึ้นชั้นบนสุด จะเห็นวิวหลังคากระเบื้องสีเทาของเมืองเก่าปักกิ่งและหอกลอง ถ่ายรูปแสงเย็นสวยมาก",
    targetDay: "Day 7 (01 ม.ค. 2570)",
    openingHours: "10:00 – 22:00 น.",
    tags: ["Rooftop View", "Drum Tower"],
  },
  {
    id: "still-water-berry-beans",
    city: "Beijing",
    category: "cafe_dessert",
    nameTh: "Still Water Cafe & Berry Beans",
    nameCn: "Still Water Cafe / Berry Beans (前门店)",
    location: "ถนนเฉียนเหมิน (Qianmen Street)",
    highlight: "คาเฟ่บรรยากาศอบอุ่นสไตล์หูท่งคลาสสิก กาแฟดริปคุณภาพดี นั่งจิบสบายๆ ก่อนไปเทียนถาน",
    targetDay: "Day 9 (03 ม.ค. 2570)",
    openingHours: "09:00 / 09:30 – 20:00/22:00 น.",
    tags: ["Qianmen Hutong", "Specialty Coffee"],
  },
];

export const SURVIVAL_TIPS: SurvivalTip[] = [
  {
    id: "apps",
    category: "app",
    titleTh: "แอปพลิเคชันจำเป็นต้องติดตั้งล่วงหน้า",
    titleEn: "Must-Have Mobile Apps",
    descriptionTh: "ควรโหลดและสมัครบัญชีตั้งแต่ก่อนเดินทางจากประเทศไทย เพื่อไม่ให้ติดปัญหาเรื่อง SMS OTP",
    bullets: [
      "Alipay & WeChat: ผูกบัตร Travel Card (YouTrip / TrueMoney Travel / Krungthai Travel Card) ให้พร้อม",
      "China Railway 12306: แอปจองและตรวจตั๋วรถไฟความเร็วสูง ลงทะเบียนชื่อภาษาอังกฤษตรงตาม Passport",
      "Shanghai Disney Resort App: สำหรับผูกบัตร 1.5 วัน กดซื้อตั๋ว Early Park Entry Pass และดูเวลารอเครื่องเล่น",
      "Gaode Map (高德地图 / Amap): แผนที่ที่แม่นยำที่สุดในจีนสำหรับการเดินเท้า รถไฟใต้ดิน และดูทางออกสถานี",
      "Didi Chuxing: สำหรับเรียกรถแท็กซี่ (สามารถเรียกผ่าน Mini Program ใน Alipay ได้สะดวกมาก)",
    ],
  },
  {
    id: "passport",
    category: "passport_rule",
    titleTh: "พาสปอร์ตตัวจริง & ระบบ Real-Name Verification",
    titleEn: "Original Passport & ID Requirement",
    descriptionTh: "ประเทศจีนใช้ระบบสแกนเอกสารประจำตัวตัวจริงในการผ่านประตูเกือบทุกจุด",
    bullets: [
      "พาสปอร์ตตัวจริงต้องพกติดกระเป๋าตลอดเวลา ไม่ควรเก็บไว้ที่โรงแรม",
      "รถไฟความเร็วสูง (G28): ไม่มีการพิมพ์ตั๋วกระดาษ ใช้การสแกนหน้าพาสปอร์ตที่ช่องตรวจตั๋วอัตโนมัติหรือช่อง Manual",
      "พระราชวังต้องห้าม (Forbidden City): สแกนพาสปอร์ตตัวจริงที่ประตูทางเข้า ไม่ต้องแลกตั๋วกระดาษ",
      "ดิสนีย์แลนด์ & ยูนิเวอร์แซล: ใช้พาสปอร์ตตัวจริงในการยืนยันตัวตนคู่กับ QR Code",
    ],
  },
  {
    id: "weather",
    category: "weather",
    titleTh: "สภาพอากาศปลาย ธ.ค. - ต้น ม.ค. & เสื้อผ้า",
    titleEn: "Winter Weather & Clothing Prep",
    descriptionTh: "เป็นช่วงฤดูหนาวจัด อุณหภูมิแตกต่างกันระหว่าง 2 เมือง",
    bullets: [
      "เซี่ยงไฮ้ (26-30 ธ.ค.): อุณหภูมิ 3°C ถึง 10°C ลมชื้นจากแม่น้ำหวงผู่พัดแรงตอนค่ำ แนะนำเสื้อกันลม",
      "ปักกิ่ง (31 ธ.ค. - 3 ม.ค.): อุณหภูมิ -7°C ถึง 3°C หนาวแห้ง ติดลบตลอดช่วงเช้าและดึก โดยเฉพาะบนกำแพงเมืองจีน Mutianyu",
      "การแต่งกายแนะนำ: กางเกงและเสื้อ Heattech Ultra Warm ด้านใน + สเวตเตอร์ + Down Jacket ขนเป็ดกันลม",
      "อุปกรณ์เสริม: ถุงมือทัชสกรีน (สำคัญมากเวลาหยิบมือถือถ่ายรูป), หมวกไหมพรมคลุมหู, ผ้าพันคอ, ถุงร้อน (Hot Pack / แผ่นแปะแก้หนาว)",
    ],
  },
  {
    id: "payment",
    category: "payment",
    titleTh: "การชำระเงินและอินเทอร์เน็ตโรมมิ่ง",
    titleEn: "Payment & Great Firewall Bypass",
    descriptionTh: "สังคมไร้เงินสด 99% และการเข้าถึงอินเทอร์เน็ตที่ราบรื่น",
    bullets: [
      "ประเทศจีนแทบไม่รับเงินสดและบัตรเครดิต Visa/Mastercard แบบรูดโดยตรง ต้องสแกน QR ผ่าน Alipay / WeChat Pay",
      "ร้านค้าส่วนใหญ่ไม่มีเงินทอน แนะนำแลกเงินสดสำรองไว้เพียงเล็กน้อย (คนละ 300-500 หยวน) เผื่อกรณีฉุกเฉิน",
      "อินเทอร์เน็ต: แนะนำเปิด Roaming หรือใช้ Travel SIM จากไทย (เช่น AIS SIM2Fly / True Travel SIM / eSIM) จะเล่น Line, Google, Facebook, Instagram ได้โดยไม่ต้องต่อ VPN",
    ],
  },
];
