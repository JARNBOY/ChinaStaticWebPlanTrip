import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, Download, ChevronDown, ExternalLink } from "lucide-react";
import type { TicketItem } from "../data/needToKnowData";
import { getTicketBookingReminders, downloadIcsFile } from "../utils/calendar";
import { useLanguage } from "../context/LanguageContext";

interface CalendarReminderMenuProps {
  ticket: TicketItem;
  compact?: boolean;
  onShowToast?: (msg: string) => void;
}

export const CalendarReminderMenu: React.FC<CalendarReminderMenuProps> = ({
  ticket,
  compact = false,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
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

  const reminders = getTicketBookingReminders(ticket);
  if (!reminders) return null;

  const handleOpenExactGoogle = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(reminders.exactGoogleUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    if (onShowToast) onShowToast(t.calToastScheduled);
  };

  const handleOpenAdvanceGoogle = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(reminders.advanceGoogleUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    if (onShowToast) onShowToast(t.calToastScheduled);
  };

  const handleDownloadIcs = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadIcsFile(reminders.icsFilename, reminders.allEvents);
    setIsOpen(false);
    if (onShowToast) {
      onShowToast(
        language === "th"
          ? "ดาวน์โหลดไฟล์ .ics เรียบร้อยแล้ว (เปิดเพื่อนำเข้าปฏิทิน)"
          : "Downloaded .ics reminder file"
      );
    }
  };

  return (
    <div className="cal-menu-container" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={`cal-menu-trigger-btn ${compact ? "compact" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        title={t.calTicketReminderMenu}
        aria-expanded={isOpen}
      >
        <Calendar size={13} className="cal-btn-icon" />
        <span className="cal-btn-text">{t.calTicketReminderMenu}</span>
        <ChevronDown size={12} className={`cal-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="cal-dropdown-panel" role="menu">
          <div className="cal-dropdown-header">
            <span>{language === "th" ? "เลือกการแจ้งเตือน" : "Select Reminder"}</span>
          </div>

          <button
            type="button"
            className="cal-menu-option alert-opt"
            onClick={handleOpenExactGoogle}
            role="menuitem"
          >
            <Clock size={13} className="opt-icon" />
            <div className="opt-text-col">
              <span className="opt-title">
                {t.calRemindExact}
              </span>
              <span className="opt-sub">
                {`${reminders.exactEvent.startDate.split("T")[0]} (${reminders.exactEvent.startDate.split("T")[1]?.substring(0, 5) || "09:00"} น.)`}
              </span>
            </div>
            <ExternalLink size={11} className="opt-ext-icon" />
          </button>

          <button
            type="button"
            className="cal-menu-option advance-opt"
            onClick={handleOpenAdvanceGoogle}
            role="menuitem"
          >
            <Calendar size={13} className="opt-icon" />
            <div className="opt-text-col">
              <span className="opt-title">{t.calRemindAdvance}</span>
              <span className="opt-sub">
                {language === "th"
                  ? "เตือนตอนเช้าเพื่อเตรียมข้อมูลพาสปอร์ต"
                  : "Morning prep reminder (07:30 AM)"}
              </span>
            </div>
            <ExternalLink size={11} className="opt-ext-icon" />
          </button>

          <div className="cal-menu-divider" />

          <button
            type="button"
            className="cal-menu-option ics-opt"
            onClick={handleDownloadIcs}
            role="menuitem"
          >
            <Download size={13} className="opt-icon" />
            <div className="opt-text-col">
              <span className="opt-title">{t.calDownloadIcs}</span>
              <span className="opt-sub">
                {language === "th"
                  ? "Apple / Google / Outlook (เตือนครบทั้ง 2 รอบ)"
                  : "iCalendar file with pre-set alarms"}
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
