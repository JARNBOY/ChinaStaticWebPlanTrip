import type { DayMeta } from "../types/itinerary";

interface DayNavigationProps {
  days: DayMeta[];
  activeDay: number;
  onSelectDay: (dayNumber: number) => void;
  isNeedToKnowActive?: boolean;
  onSelectNeedToKnow?: () => void;
}

export const DayNavigation: React.FC<DayNavigationProps> = ({
  days,
  activeDay,
  onSelectDay,
  isNeedToKnowActive = false,
  onSelectNeedToKnow,
}) => {
  const shanghaiDays = days.filter((d) => d.city === "Shanghai");
  const beijingDays = days.filter((d) => d.city === "Beijing");

  const renderGroup = (title: string, groupDays: DayMeta[]) => (
    <div className="nav-city-group">
      <span className="nav-city-label">{title}</span>
      <div className="nav-pills-row">
        {groupDays.map((day) => {
          const isActive = !isNeedToKnowActive && day.dayNumber === activeDay;
          const isReady = day.status === "ready";
          const padded = String(day.dayNumber).padStart(2, "0");

          return (
            <button
              key={day.dayNumber}
              type="button"
              className={`day-nav-pill ${isActive ? "active" : ""} ${day.status}`}
              onClick={() => {
                if (isReady) {
                  onSelectDay(day.dayNumber);
                } else {
                  alert(
                    `Day ${padded} (${day.city}: ${day.routeTitle}) is currently in ${day.status} state. Full itinerary coming soon!`
                  );
                }
              }}
              title={`${day.city} Day ${padded}: ${day.routeTitle} (${day.status})`}
            >
              <span className="pill-num">{padded}</span>
              <span className="pill-dot" aria-hidden="true">
                {isActive ? "●" : "○"}
              </span>
              {day.status !== "ready" && (
                <span className="pill-badge-tiny">{day.status === "draft" ? "draft" : "soon"}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <nav className="day-navigation no-print" aria-label="Trip days navigation">
      <div className="day-navigation-inner">
        {renderGroup("SHANGHAI", shanghaiDays)}
        <div className="nav-divider" />
        {renderGroup("BEIJING", beijingDays)}
        {onSelectNeedToKnow && (
          <>
            <div className="nav-divider" />
            <button
              type="button"
              className={`day-nav-pill need-to-know-pill ${isNeedToKnowActive ? "active" : ""}`}
              onClick={onSelectNeedToKnow}
              title="Important Pre-Trip Notes, Tickets Checklist & Deadlines"
            >
              <span className="pill-icon">📌</span>
              <span className="pill-text-strong">Need to Know</span>
              <span className="pill-dot" aria-hidden="true">
                {isNeedToKnowActive ? "●" : "○"}
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
