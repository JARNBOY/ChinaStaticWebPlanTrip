import React, { useMemo } from "react";
import { Printer, Edit3, RotateCcw, FileSpreadsheet } from "lucide-react";
import type { DayPlan } from "../types/itinerary";
import { useLanguage } from "../context/LanguageContext";
import { DayCalendarMenu } from "./DayCalendarMenu";

interface HeaderProps {
  date: string;
  dayNumber: number;
  totalDays: number;
  isNeedToKnow?: boolean;
  activeDayPlan?: DayPlan;
  onShowToast?: (msg: string) => void;
  onPrint: () => void;
  onCopySheet?: () => void;
  onOpenEditor: () => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  date,
  dayNumber,
  totalDays,
  isNeedToKnow = false,
  activeDayPlan,
  onShowToast,
  onPrint,
  onCopySheet,
  onOpenEditor,
  onResetProgress,
}) => {
  const { language, setLanguage, t } = useLanguage();

  // Format date: "2026-12-25" -> localized date
  const formattedDate = useMemo(() => {
    if (isNeedToKnow) {
      return language === "th"
        ? "25 ธ.ค. 2569 – 03 ม.ค. 2570"
        : "DEC 25, 2026 – JAN 03, 2027";
    }
    try {
      const [year, month, day] = date.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      if (language === "th") {
        return d.toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
      return d
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase();
    } catch {
      return language === "th" ? "25 ธันวาคม 2569" : "DECEMBER 25, 2026";
    }
  }, [date, isNeedToKnow, language]);

  const paddedDay = String(dayNumber).padStart(2, "0");
  const paddedTotal = String(totalDays).padStart(2, "0");

  return (
    <header className="journal-header">
      <div className="journal-header-content">
        <div className="journal-brand">
          <h1 className="journal-logo">{t.brandTitle}</h1>
          <p className="journal-date">{formattedDate}</p>
        </div>

        <div className="journal-actions">
          <div className="day-badge-group">
            {isNeedToKnow ? (
              <>
                <span className="day-pill ntk-badge">{t.essentialsPill}</span>
                <span className="day-counter">{t.needToKnowCounter}</span>
              </>
            ) : (
              <>
                <span className="day-pill">
                  {t.dayPill} {paddedDay}
                </span>
                <span className="day-counter">
                  {paddedDay} / {paddedTotal}
                </span>
              </>
            )}
          </div>

          <div className="header-icon-buttons no-print">
            {/* Language Switcher Control */}
            <div className="lang-switcher-pill" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-btn ${language === "th" ? "active" : ""}`}
                onClick={() => setLanguage("th")}
                title="เปลี่ยนเป็นภาษาไทย (TH)"
                aria-pressed={language === "th"}
              >
                TH
              </button>
              <button
                type="button"
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
                title="Switch to English (EN)"
                aria-pressed={language === "en"}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              className="icon-btn"
              title="Print or Export to PDF"
              aria-label="Export itinerary to PDF"
              onClick={onPrint}
            >
              <Printer size={16} />
              <span className="btn-label">{t.btnPdf}</span>
            </button>

            {!isNeedToKnow && onCopySheet && (
              <button
                type="button"
                className="icon-btn"
                title="Copy table for Google Sheets (A12)"
                aria-label="Copy itinerary for Google Sheets"
                onClick={onCopySheet}
              >
                <FileSpreadsheet size={16} />
                <span className="btn-label">{t.btnSheet}</span>
              </button>
            )}

            {!isNeedToKnow && activeDayPlan && (
              <DayCalendarMenu day={activeDayPlan} onShowToast={onShowToast} />
            )}

            {!isNeedToKnow && (
              <>
                <button
                  type="button"
                  className="icon-btn"
                  title="Edit checkpoints"
                  aria-label="Edit itinerary stops"
                  onClick={onOpenEditor}
                >
                  <Edit3 size={16} />
                  <span className="btn-label">{t.btnEdit}</span>
                </button>

                <button
                  type="button"
                  className="icon-btn subtle"
                  title="Reset progress"
                  aria-label="Reset completed checkboxes"
                  onClick={() => {
                    if (window.confirm(t.resetDayConfirm)) {
                      onResetProgress();
                    }
                  }}
                >
                  <RotateCcw size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
