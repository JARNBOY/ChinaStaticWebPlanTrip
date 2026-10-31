import React, { useState, useRef, useEffect } from "react";
import { Calendar, Download, ChevronDown, ExternalLink } from "lucide-react";
import type { DayPlan } from "../types/itinerary";
import { getDayItineraryCalendarOptions, downloadIcsFile } from "../utils/calendar";
import { useLanguage } from "../context/LanguageContext";

interface DayCalendarMenuProps {
  day: DayPlan;
  compact?: boolean;
  onShowToast?: (msg: string) => void;
}

export const DayCalendarMenu: React.FC<DayCalendarMenuProps> = ({
  day,
  compact = false,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const options = getDayItineraryCalendarOptions(day);

  const handleOpenGoogle = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(options.summaryGoogleUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    if (onShowToast) onShowToast(t.calToastScheduled);
  };

  const handleDownloadIcs = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadIcsFile(options.icsFilename, [options.summaryEvent, ...options.detailedEvents]);
    setIsOpen(false);
    if (onShowToast) {
      onShowToast(
        language === "th"
          ? `ดาวน์โหลดกำหนดการ Day ${day.dayNumber} (.ics) เรียบร้อยแล้ว`
          : `Downloaded Day ${day.dayNumber} itinerary (.ics)`
      );
    }
  };

  return (
    <div className="cal-menu-container" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={`icon-btn cal-day-btn ${compact ? "compact" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        title={t.calAddDayGoogle}
        aria-expanded={isOpen}
      >
        <Calendar size={15} />
        <span className="btn-label">{t.btnCalendar}</span>
        <ChevronDown size={11} className={`cal-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="cal-dropdown-panel header-align" role="menu">
          <div className="cal-dropdown-header">
            <span>
              {language === "th" ? `ปฏิทิน Day ${day.dayNumber}: ${day.city}` : `Day ${day.dayNumber} Calendar`}
            </span>
          </div>

          <button
            type="button"
            className="cal-menu-option"
            onClick={handleOpenGoogle}
            role="menuitem"
          >
            <Calendar size={14} className="opt-icon text-accent" />
            <div className="opt-text-col">
              <span className="opt-title">{t.calAddDayGoogle}</span>
              <span className="opt-sub">
                {language === "th" ? "บันทึกภาพรวมทั้งวัน พร้อมภาษาจีนทุกจุด" : "All-day overview with all POIs"}
              </span>
            </div>
            <ExternalLink size={11} className="opt-ext-icon" />
          </button>

          <button
            type="button"
            className="cal-menu-option"
            onClick={handleDownloadIcs}
            role="menuitem"
          >
            <Download size={14} className="opt-icon" />
            <div className="opt-text-col">
              <span className="opt-title">{t.calDownloadDayIcs}</span>
              <span className="opt-sub">
                {language === "th" ? "แยกตามเวลาจริงครบทั้งวัน (Apple/Google)" : "All timed checkpoints (.ics)"}
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
