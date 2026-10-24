import React, { useMemo } from "react";
import { Printer, Edit3, RotateCcw, FileSpreadsheet } from "lucide-react";

interface HeaderProps {
  date: string;
  dayNumber: number;
  totalDays: number;
  onPrint: () => void;
  onCopySheet?: () => void;
  onOpenEditor: () => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  date,
  dayNumber,
  totalDays,
  onPrint,
  onCopySheet,
  onOpenEditor,
  onResetProgress,
}) => {
  // Format date: "2026-12-25" -> "DECEMBER 25, 2026"
  const formattedDate = useMemo(() => {
    try {
      const [year, month, day] = date.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      return d
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase();
    } catch {
      return "DECEMBER 25, 2026";
    }
  }, [date]);

  const paddedDay = String(dayNumber).padStart(2, "0");
  const paddedTotal = String(totalDays).padStart(2, "0");

  return (
    <header className="journal-header">
      <div className="journal-header-content">
        <div className="journal-brand">
          <h1 className="journal-logo">China, on foot</h1>
          <p className="journal-date">{formattedDate}</p>
        </div>

        <div className="journal-actions">
          <div className="day-badge-group">
            <span className="day-pill">DAY {paddedDay}</span>
            <span className="day-counter">
              {paddedDay} / {paddedTotal}
            </span>
          </div>

          <div className="header-icon-buttons no-print">
            <button
              type="button"
              className="icon-btn"
              title="Print or Export to PDF"
              aria-label="Export itinerary to PDF"
              onClick={onPrint}
            >
              <Printer size={16} />
              <span className="btn-label">PDF</span>
            </button>

            {onCopySheet && (
              <button
                type="button"
                className="icon-btn"
                title="Copy table for Google Sheets (A12)"
                aria-label="Copy itinerary for Google Sheets"
                onClick={onCopySheet}
              >
                <FileSpreadsheet size={16} />
                <span className="btn-label">Sheet</span>
              </button>
            )}

            <button
              type="button"
              className="icon-btn"
              title="Edit checkpoints"
              aria-label="Edit itinerary stops"
              onClick={onOpenEditor}
            >
              <Edit3 size={16} />
              <span className="btn-label">Edit</span>
            </button>

            <button
              type="button"
              className="icon-btn subtle"
              title="Reset progress"
              aria-label="Reset completed checkboxes"
              onClick={() => {
                if (window.confirm("Reset all checkboxes for this day?")) {
                  onResetProgress();
                }
              }}
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
