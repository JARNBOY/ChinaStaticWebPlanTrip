import React from "react";
import { Clock, MapPin, Car, Footprints, Train } from "lucide-react";
import type { RouteSummaryInfo, DayPlan } from "../types/itinerary";
import { useLanguage } from "../context/LanguageContext";
import { DayCalendarMenu } from "./DayCalendarMenu";

interface RouteSummaryProps {
  summary: RouteSummaryInfo;
  day?: DayPlan;
  onShowToast?: (msg: string) => void;
}

export const RouteSummary: React.FC<RouteSummaryProps> = ({
  summary,
  day,
  onShowToast,
}) => {
  const { t } = useLanguage();

  return (
    <section className="route-summary-card" aria-label="Day Route Summary">
      <div className="summary-meta-row">
        <div className="summary-stat-item">
          <Clock size={14} className="stat-icon" />
          <span className="stat-text">{summary.timeRange}</span>
        </div>
        <div className="summary-bullet">·</div>
        <div className="summary-stat-item">
          <MapPin size={14} className="stat-icon" />
          <span className="stat-text">
            {summary.stopsCount} {t.summaryStops} ({summary.estimatedDuration})
          </span>
        </div>
        {day && (
          <div className="summary-cal-action">
            <DayCalendarMenu day={day} onShowToast={onShowToast} compact />
          </div>
        )}
      </div>

      <div className="summary-transport-grid">
        <div className="transport-chip">
          <Car size={13} className="transport-icon" />
          <span className="transport-label">DiDi:</span>
          <span className="transport-val">{summary.didiCostEstimate}</span>
        </div>
        <div className="transport-chip">
          <Train size={13} className="transport-icon" />
          <span className="transport-label">Metro:</span>
          <span className="transport-val">Line 2 / 10 backup</span>
        </div>
        <div className="transport-chip">
          <Footprints size={13} className="transport-icon" />
          <span className="transport-label">Walk:</span>
          <span className="transport-val">5 pedestrian clusters</span>
        </div>
      </div>

      <p className="summary-clusters-note">{summary.walkNote}</p>
    </section>
  );
};
