import React from "react";

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
  return (
    <section className="progress-section" aria-label="Itinerary Checklist Progress">
      <div className="progress-label-row">
        <span className="progress-label">Progress</span>
        <span className="progress-count">
          <strong>{completedCount}</strong> / {totalStops} completed
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
