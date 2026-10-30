import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface ProgressBarProps {
  completedCount: number;
  totalStops: number;
  percent: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completedCount,
  totalStops,
  percent,
}) => {
  const { t } = useLanguage();

  return (
    <section className="progress-section" aria-label="Itinerary Checklist Progress">
      <div className="progress-label-row">
        <span className="progress-label">{t.progressLabel}</span>
        <span className="progress-count">
          <strong>{completedCount}</strong> / {totalStops} {t.progressCompleted}
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
};
