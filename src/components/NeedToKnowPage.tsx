import React, { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Utensils,
  Coffee,
  ShieldCheck,
  Calendar,
  Ticket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  TICKET_ITEMS,
  DINING_ITEMS,
  SURVIVAL_TIPS,
  type TicketItem,
} from "../data/needToKnowData";
import { useLanguage } from "../context/LanguageContext";
import { CalendarReminderMenu } from "./CalendarReminderMenu";

const STORAGE_KEY = "china_trip_need_to_know_checklist_v1";

interface NeedToKnowPageProps {
  onBackToItinerary?: () => void;
  onShowToast?: (msg: string) => void;
}

export const NeedToKnowPage: React.FC<NeedToKnowPageProps> = ({
  onBackToItinerary,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  // Checklist state stored in localStorage
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default to items whose initialStatus is 'purchased'
    const initial: Record<string, boolean> = {};
    TICKET_ITEMS.forEach((item) => {
      initial[item.id] = item.initialStatus === "purchased";
    });
    return initial;
  });

  // Ticket filter state
  const [ticketFilter, setTicketFilter] = useState<"all" | "must_book" | "purchased" | "on_site">("all");
  // Food city filter
  const [foodCityFilter, setFoodCityFilter] = useState<"all" | "Shanghai" | "Beijing">("all");
  // Active tab inside Need to Know
  const [activeTab, setActiveTab] = useState<"tickets" | "deadlines" | "food" | "survival">("tickets");
  // Expandable details state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // Ignore quota errors
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetChecklist = () => {
    if (window.confirm(t.ntkResetConfirm)) {
      const initial: Record<string, boolean> = {};
      TICKET_ITEMS.forEach((item) => {
        initial[item.id] = item.initialStatus === "purchased";
      });
      setCheckedIds(initial);
    }
  };

  // Lookup map for tickets by ID
  const ticketMap = useMemo(() => {
    const map: Record<string, TicketItem> = {};
    TICKET_ITEMS.forEach((item) => {
      map[item.id] = item;
    });
    return map;
  }, []);

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return TICKET_ITEMS.filter((item) => {
      if (ticketFilter === "all") return true;
      if (ticketFilter === "must_book") return item.initialStatus === "must_book";
      if (ticketFilter === "purchased") return checkedIds[item.id] === true;
      if (ticketFilter === "on_site") return item.initialStatus === "on_site";
      return true;
    });
  }, [ticketFilter, checkedIds]);

  // Filtered foods
  const filteredDining = useMemo(() => {
    if (foodCityFilter === "all") return DINING_ITEMS;
    return DINING_ITEMS.filter((item) => item.city === foodCityFilter);
  }, [foodCityFilter]);

  // Progress calculations
  const totalTickets = TICKET_ITEMS.length;
  const purchasedCount = TICKET_ITEMS.filter((item) => checkedIds[item.id]).length;
  const mustBookPending = TICKET_ITEMS.filter(
    (item) => item.initialStatus === "must_book" && !checkedIds[item.id]
  ).length;

  return (
    <div className="need-to-know-container">
      {/* Editorial Header Banner */}
      <section className="ntk-hero-card">
        <div className="ntk-hero-badge">
          <span className="ntk-pill">{t.essentialsPill}</span>
          <span className="ntk-dates">
            {language === "th" ? "25 ธ.ค. 2569 – 03 ม.ค. 2570" : "25 DEC 2026 – 03 JAN 2027"}
          </span>
        </div>
        <h2 className="ntk-hero-title">{t.ntkHeroTitle}</h2>
        <p className="ntk-hero-subtitle">{t.ntkHeroSubtitle}</p>

        {/* Quick Stats Grid */}
        <div className="ntk-stats-grid">
          <div className="ntk-stat-item">
            <span className="ntk-stat-value">{purchasedCount} / {totalTickets}</span>
            <span className="ntk-stat-label">{t.ntkStatReady}</span>
          </div>
          <div className="ntk-stat-item alert">
            <span className="ntk-stat-value">{mustBookPending}</span>
            <span className="ntk-stat-label">{t.ntkStatMustBook}</span>
          </div>
          <div className="ntk-stat-item">
            <span className="ntk-stat-value">7</span>
            <span className="ntk-stat-label">{t.ntkStatOnSite}</span>
          </div>
          <div className="ntk-stat-item">
            <span className="ntk-stat-value">{language === "th" ? "10 วัน" : "10 Days"}</span>
            <span className="ntk-stat-label">{t.ntkStatTripDays}</span>
          </div>
        </div>

        {onBackToItinerary && (
          <div className="ntk-back-row">
            <button
              type="button"
              className="ntk-back-btn"
              onClick={onBackToItinerary}
            >
              {t.ntkBackToItinerary}
            </button>
          </div>
        )}
      </section>

      {/* Main Feature Tabs */}
      <div className="ntk-main-tabs" role="tablist">
        <button
          type="button"
          className={`ntk-tab-btn ${activeTab === "tickets" ? "active" : ""}`}
          onClick={() => setActiveTab("tickets")}
        >
          <Ticket size={16} />
          <span>{t.ntkTabTickets} ({purchasedCount}/{totalTickets})</span>
        </button>
        <button
          type="button"
          className={`ntk-tab-btn ${activeTab === "deadlines" ? "active" : ""}`}
          onClick={() => setActiveTab("deadlines")}
        >
          <Clock size={16} />
          <span>{t.ntkTabDeadlines}</span>
        </button>
        <button
          type="button"
          className={`ntk-tab-btn ${activeTab === "food" ? "active" : ""}`}
          onClick={() => setActiveTab("food")}
        >
          <Utensils size={16} />
          <span>{t.ntkTabFood} ({DINING_ITEMS.length})</span>
        </button>
        <button
          type="button"
          className={`ntk-tab-btn ${activeTab === "survival" ? "active" : ""}`}
          onClick={() => setActiveTab("survival")}
        >
          <ShieldCheck size={16} />
          <span>{t.ntkTabSurvival}</span>
        </button>
      </div>

      {/* TAB 1: TICKETS & CHECKLIST */}
      {activeTab === "tickets" && (
        <section className="ntk-tab-content">
          <div className="ntk-section-header">
            <div>
              <h3 className="ntk-section-title">Ticket & Booking Master Checklist</h3>
              <p className="ntk-section-desc">
                {language === "th"
                  ? "สามารถคลิกที่กล่องเพื่ออัปเดตสถานะการซื้อ ระบบจะบันทึกสถานะลงในเครื่องอัตโนมัติ"
                  : "Tap checkboxes to track bookings. Progress is automatically saved locally."}
              </p>
            </div>
            <button
              type="button"
              className="ntk-reset-btn"
              title={t.ntkResetConfirm}
              onClick={handleResetChecklist}
            >
              <RotateCcw size={14} />
              <span>{t.ntkResetBtn}</span>
            </button>
          </div>

          {/* Ticket Filter Pills */}
          <div className="ntk-filters-row">
            <button
              type="button"
              className={`ntk-filter-pill ${ticketFilter === "all" ? "active" : ""}`}
              onClick={() => setTicketFilter("all")}
            >
              {t.ntkFilterAll} ({TICKET_ITEMS.length})
            </button>
            <button
              type="button"
              className={`ntk-filter-pill alert ${ticketFilter === "must_book" ? "active" : ""}`}
              onClick={() => setTicketFilter("must_book")}
            >
              {t.ntkFilterMustBook} (5)
            </button>
            <button
              type="button"
              className={`ntk-filter-pill success ${ticketFilter === "purchased" ? "active" : ""}`}
              onClick={() => setTicketFilter("purchased")}
            >
              {t.ntkFilterPurchased} ({purchasedCount})
            </button>
            <button
              type="button"
              className={`ntk-filter-pill subtle ${ticketFilter === "on_site" ? "active" : ""}`}
              onClick={() => setTicketFilter("on_site")}
            >
              {t.ntkFilterOnSite} (7)
            </button>
          </div>

          {/* Ticket Cards List */}
          <div className="ntk-ticket-list">
            {filteredTickets.map((ticket: TicketItem) => {
              const isChecked = !!checkedIds[ticket.id];
              const isExpanded = !!expandedIds[ticket.id];

              return (
                <div
                  key={ticket.id}
                  className={`ntk-ticket-card ${isChecked ? "checked" : ""} ${
                    ticket.initialStatus === "must_book" ? "must-book-border" : ""
                  }`}
                >
                  <div className="ntk-ticket-main">
                    <label className="ntk-checkbox-label">
                      <input
                        type="checkbox"
                        className="ntk-native-checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(ticket.id)}
                      />
                      <span className="ntk-custom-checkbox">
                        {isChecked && <CheckCircle2 size={16} className="text-success" />}
                      </span>
                    </label>

                    <div className="ntk-ticket-info" onClick={() => toggleExpand(ticket.id)}>
                      <div className="ntk-ticket-top-row">
                        <span className={`ntk-city-tag ${ticket.city.toLowerCase()}`}>
                          {ticket.city}
                        </span>

                        {ticket.initialStatus === "must_book" && (
                          <span className="ntk-status-pill alert">
                            <Clock size={12} /> {language === "th" ? "ต้องจองล่วงหน้า" : "Must Book"}
                          </span>
                        )}
                        {ticket.initialStatus === "purchased" && (
                          <span className="ntk-status-pill success">
                            <CheckCircle2 size={12} /> {language === "th" ? "ซื้อแล้ว" : "Purchased"}
                          </span>
                        )}
                        {ticket.initialStatus === "on_site" && (
                          <span className="ntk-status-pill on-site">
                            {language === "th" ? "ซื้อหน้างาน" : "On-site"} {ticket.priceInfo ? `(${ticket.priceInfo})` : ""}
                          </span>
                        )}
                      </div>

                      <h4 className="ntk-ticket-name">
                        {language === "th" ? ticket.nameTh : ticket.nameEn}
                      </h4>
                      <p className="ntk-ticket-sub">{language === "th" ? ticket.nameEn : ticket.nameTh}</p>
                      <p className="ntk-ticket-deadline">{ticket.deadlineDescription}</p>

                      {ticket.deadlineDate && (
                        <div className="ntk-ticket-cal-wrap" onClick={(e) => e.stopPropagation()}>
                          <CalendarReminderMenu
                            ticket={ticket}
                            onShowToast={onShowToast}
                            compact
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className="ntk-expand-btn"
                      onClick={() => toggleExpand(ticket.id)}
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Expanded Notes & Action Guide */}
                  {isExpanded && (
                    <div className="ntk-ticket-details">
                      <div className="ntk-detail-row">
                        <span className="ntk-detail-label">{t.ntkBookingChannel}</span>
                        <span className="ntk-detail-val">{ticket.bookingChannel}</span>
                      </div>
                      {ticket.actionNote && (
                        <div className="ntk-detail-row highlight">
                          <span className="ntk-detail-label">{t.ntkAdvice}</span>
                          <span className="ntk-detail-val">{ticket.actionNote}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: CRITICAL BOOKING DEADLINES */}
      {activeTab === "deadlines" && (
        <section className="ntk-tab-content">
          <div className="ntk-section-header">
            <div>
              <h3 className="ntk-section-title">{t.ntkDeadlinesTitle}</h3>
              <p className="ntk-section-desc">
                {t.ntkDeadlinesSubtitle}
              </p>
            </div>
          </div>

          <div className="ntk-deadlines-timeline">
            {/* 1. China Railway 12306 Advance Request */}
            <div className="ntk-timeline-card">
              <div className="ntk-tl-time-badge">ปลาย ต.ค. – พ.ย. 2569</div>
              <div className="ntk-tl-content">
                <h4>1. ส่งคำขอจองตั๋วรถไฟความเร็วสูงล่วงหน้า (Appointment Ticket Purchase)</h4>
                <p className="ntk-tl-desc">
                  <strong>China Railway 12306:</strong> เส้นทางหลัก เซี่ยงไฮ้ ➔ ปักกิ่ง (ขบวน G28 วันที่ 30 ธ.ค.)
                  ระบบใหม่เปิดให้ส่งคำขอล่วงหน้าได้ 17–60 วัน โดยระบบจะประมวลผลจับคู่ตั๋วให้ในช่วง 16–20 วันก่อนเดินทาง
                  เมื่อได้ตั๋วจะมีแจ้งเตือนให้เข้ามาชำระเงิน
                </p>
                <div className="ntk-tl-footer">
                  <div className="ntk-tl-tag">แอป China Railway 12306</div>
                  {ticketMap["train-sh-bj"] && (
                    <CalendarReminderMenu
                      ticket={ticketMap["train-sh-bj"]}
                      onShowToast={onShowToast}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 2. Shanghai Disney 1.5-Day Ticket */}
            <div className="ntk-timeline-card">
              <div className="ntk-tl-time-badge">ต้นเดือน พ.ย. 2569</div>
              <div className="ntk-tl-content">
                <h4>2. ซื้อตั๋ว Shanghai Disneyland 1.5-Day Ticket</h4>
                <p className="ntk-tl-desc">
                  เปิดให้ซื้อตั๋วล่วงหน้าสำหรับเข้า Park บ่ายวันแรก 28 ธ.ค. (ตั้งแต่ 15:00 น.) และเต็มวัน 29 ธ.ค.
                  แนะนำซื้อผ่าน Official App หรือ Klook/Trip.com แล้วนำหมายเลขตั๋วมาผูกเข้าแอป Disney
                </p>
                <div className="ntk-tl-footer">
                  <div className="ntk-tl-tag">Shanghai Disney Resort App</div>
                  {ticketMap["shanghai-disney-pass"] && (
                    <CalendarReminderMenu
                      ticket={ticketMap["shanghai-disney-pass"]}
                      onShowToast={onShowToast}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 3. Rockbund Christmas Market */}
            <div className="ntk-timeline-card">
              <div className="ntk-tl-time-badge">18 พ.ย. – 28 ธ.ค. 2569</div>
              <div className="ntk-tl-content">
                <h4>3. จองรอบเข้า Rockbund Christmas Market 2026</h4>
                <p className="ntk-tl-desc">
                  ต้องจองรอบเวลาเข้าล่วงหน้าผ่านแอปพลิเคชัน/WeChat เลือกรอบเวลา <strong>16:00–18:00 น.</strong>
                  ของวันอาทิตย์ที่ 27 ธ.ค. เพื่อชมไฟยามค่ำคืนและบรรยากาศริมแม่น้ำ
                </p>
                <div className="ntk-tl-footer">
                  <div className="ntk-tl-tag">WeChat Mini Program</div>
                  {ticketMap["rockbund-christmas-market"] && (
                    <CalendarReminderMenu
                      ticket={ticketMap["rockbund-christmas-market"]}
                      onShowToast={onShowToast}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 4. China Railway 12306 15-day Instant Booking */}
            <div className="ntk-timeline-card urgent">
              <div className="ntk-tl-time-badge alert">วันพุธที่ 16 ธ.ค. 2569 เวลา 12:30 น.</div>
              <div className="ntk-tl-content">
                <h4>4. กดตั๋วรถไฟความเร็วสูง G28 แบบยืนยันทันที (15 วันล่วงหน้า)</h4>
                <p className="ntk-tl-desc">
                  <strong>วันตัดเชือก:</strong> หากไม่ได้ใช้ระบบ Appointment ระบบเปิดจำหน่ายตั๋วจริงล่วงหน้า 15 วัน
                  สำหรับเดินทางวันที่ 30 ธ.ค. (ขบวน G28 เวลา 19:00–23:18 น.)
                  ระบบเปิดตอน <strong>12:30 น. เวลาไทย</strong> เป๊ะๆ ต้องล็อกอินรอและรีบกดยืนยันทันที
                </p>
                <div className="ntk-tl-footer">
                  <div className="ntk-tl-tag alert">China Railway 12306 (สำคัญมาก!)</div>
                  {ticketMap["train-sh-bj"] && (
                    <CalendarReminderMenu
                      ticket={ticketMap["train-sh-bj"]}
                      onShowToast={onShowToast}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 5. Disney Early Park Entry Pass */}
            <div className="ntk-timeline-card urgent">
              <div className="ntk-tl-time-badge alert">~20–22 ธ.ค. 2569 เวลา 23:00 น.</div>
              <div className="ntk-tl-content">
                <h4>5. แย่งกดบัตร Disney Early Park Entry Pass (早享卡)</h4>
                <p className="ntk-tl-desc">
                  ระบบเปิดให้กดล่วงหน้า 7 - 9 วันก่อนวันเข้าชมจริง (29 ธ.ค.)
                  โดยเปิดเวลา <strong>23:00 น. เวลาไทย (00:00 น. เที่ยงคืนเวลาจีน)</strong>
                  กดผ่าน Official Disney App เท่านั้น เพื่อเข้า Park ก่อนบุคคลทั่วไป 1 ชั่วโมง (เช้าตรู่ 07:15 น.)
                  สำหรับ Rope Drop โซน Zootopia
                </p>
                <div className="ntk-tl-footer">
                  <div className="ntk-tl-tag alert">Shanghai Disney Official App</div>
                  {ticketMap["shanghai-disney-early-bird"] && (
                    <CalendarReminderMenu
                      ticket={ticketMap["shanghai-disney-early-bird"]}
                      onShowToast={onShowToast}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 6. Forbidden City */}
            <div className="ntk-timeline-card urgent">
              <div className="ntk-tl-time-badge alert">วันศุกร์ที่ 25 ธ.ค. 2569 เวลา 19:00 น.</div>
              <div className="ntk-tl-content">
                <h4>6. แย่งกดตั๋วพระราชวังต้องห้าม (The Forbidden City / กู้กง)</h4>
                <p className="ntk-tl-desc">
                  ระบบเปิดให้จองล่วงหน้า <strong>7 วันพอดี เวลา 20:00 น. เวลาจีน (19:00 น. เวลาไทย)</strong>
                  สำหรับรอบเข้าชมวันปีใหม่ 1 ม.ค. 2570 ตั๋วจะเปิดกดในค่ำคืนวันคริสต์มาส 25 ธ.ค.
                  โควตาเต็มเร็วมาก ต้องเตรียมกรอกเลขพาสปอร์ตให้พร้อมก่อนเวลา
                </p>
                <div className="ntk-tl-footer">
                  <div className="ntk-tl-tag alert">WeChat: 故宫博物院观众服务</div>
                  {ticketMap["forbidden-city-ticket"] && (
                    <CalendarReminderMenu
                      ticket={ticketMap["forbidden-city-ticket"]}
                      onShowToast={onShowToast}
                      compact
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: FOOD & CAFE WISHLIST */}
      {activeTab === "food" && (
        <section className="ntk-tab-content">
          <div className="ntk-section-header">
            <div>
              <h3 className="ntk-section-title">{t.ntkFoodTitle}</h3>
              <p className="ntk-section-desc">
                {t.ntkFoodSubtitle}
              </p>
            </div>
            <div className="ntk-city-filter-buttons">
              <button
                type="button"
                className={`ntk-filter-btn ${foodCityFilter === "all" ? "active" : ""}`}
                onClick={() => setFoodCityFilter("all")}
              >
                {t.filterAll}
              </button>
              <button
                type="button"
                className={`ntk-filter-btn ${foodCityFilter === "Shanghai" ? "active" : ""}`}
                onClick={() => setFoodCityFilter("Shanghai")}
              >
                Shanghai
              </button>
              <button
                type="button"
                className={`ntk-filter-btn ${foodCityFilter === "Beijing" ? "active" : ""}`}
                onClick={() => setFoodCityFilter("Beijing")}
              >
                Beijing
              </button>
            </div>
          </div>

          <div className="ntk-food-grid">
            {filteredDining.map((food) => (
              <div key={food.id} className="ntk-food-card">
                <div className="ntk-food-header">
                  <span className={`ntk-city-tag ${food.city.toLowerCase()}`}>{food.city}</span>
                  {food.targetDay && <span className="ntk-target-day">{food.targetDay}</span>}
                </div>
                <h4 className="ntk-food-title">{food.nameTh}</h4>
                <p className="ntk-food-cn">{food.nameCn}</p>
                <p className="ntk-food-loc">📍 {food.location}</p>
                <p className="ntk-food-highlight">{food.highlight}</p>
                {food.openingHours && (
                  <p className="ntk-food-hours">
                    🕒 {language === "th" ? "เวลาเปิด: " : "Hours: "}{food.openingHours}
                  </p>
                )}
                <div className="ntk-tags-row">
                  {food.tags.map((tag) => (
                    <span key={tag} className="ntk-tag-item">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: SURVIVAL TIPS & PREP */}
      {activeTab === "survival" && (
        <section className="ntk-tab-content">
          <div className="ntk-section-header">
            <div>
              <h3 className="ntk-section-title">{t.ntkSurvivalTitle}</h3>
              <p className="ntk-section-desc">
                {t.ntkSurvivalSubtitle}
              </p>
            </div>
          </div>

          <div className="ntk-survival-grid">
            {SURVIVAL_TIPS.map((tip) => (
              <div key={tip.id} className="ntk-survival-card">
                <div className="ntk-survival-head">
                  <div className="ntk-survival-icon">
                    {tip.category === "app" && <Calendar size={20} />}
                    {tip.category === "passport_rule" && <ShieldCheck size={20} />}
                    {tip.category === "weather" && <AlertTriangle size={20} />}
                    {tip.category === "payment" && <Coffee size={20} />}
                  </div>
                  <div>
                    <h4 className="ntk-survival-title">
                      {language === "th" ? tip.titleTh : tip.titleEn}
                    </h4>
                    <span className="ntk-survival-sub">
                      {language === "th" ? tip.titleEn : tip.titleTh}
                    </span>
                  </div>
                </div>
                <p className="ntk-survival-desc">{tip.descriptionTh}</p>
                <ul className="ntk-survival-list">
                  {tip.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
