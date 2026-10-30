import React from "react";
import { ListChecks, Map, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export type ViewMode = "timeline" | "route-map" | "need-to-know";

interface ViewSwitcherProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  completedStopsCount: number;
  totalStopsCount: number;
  hasUrgentDeadlines?: boolean;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  currentMode,
  onSelectMode,
  completedStopsCount,
  totalStopsCount,
  hasUrgentDeadlines = true,
}) => {
  const { t } = useLanguage();

  return (
    <aside className="view-switcher-bar no-print" aria-label="View Mode Navigation">
      <div className="view-switcher-inner">
        {/* Button 1: Timeline Journal View */}
        <button
          type="button"
          className={`view-switcher-tab ${currentMode === "timeline" ? "active" : ""}`}
          onClick={() => onSelectMode("timeline")}
          aria-pressed={currentMode === "timeline"}
          title="Switch to Editorial Timeline Journal view"
        >
          <ListChecks size={15} className="tab-icon" />
          <span className="tab-label">{t.viewTimeline}</span>
          <span className="tab-badge">
            {completedStopsCount}/{totalStopsCount}
          </span>
        </button>

        {/* Button 2: Interactive Route Map View */}
        <button
          type="button"
          className={`view-switcher-tab ${currentMode === "route-map" ? "active" : ""}`}
          onClick={() => onSelectMode("route-map")}
          aria-pressed={currentMode === "route-map"}
          title="Switch to Interactive Route Map & Progression view"
        >
          <Map size={15} className="tab-icon" />
          <span className="tab-label">{t.viewRouteMap}</span>
          <span className="tab-badge map-badge">{t.viewInteractiveBadge}</span>
        </button>

        {/* Button 3: Need to Know Essentials View */}
        <button
          type="button"
          className={`view-switcher-tab ${currentMode === "need-to-know" ? "active" : ""}`}
          onClick={() => onSelectMode("need-to-know")}
          aria-pressed={currentMode === "need-to-know"}
          title="Switch to Pre-Trip Essentials & Tickets Checklist"
        >
          <Compass size={15} className="tab-icon" />
          <span className="tab-label">{t.viewNeedToKnow}</span>
          {hasUrgentDeadlines && (
            <span className="tab-alert-dot" title="Has critical booking deadlines">
              ●
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
