import React, { useState } from "react";
import { Navigation, Map, Copy, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import type { StopTimelineEntry } from "../types/itinerary";
import { openMapLocation } from "../utils/maps";
import { copyForDriverOrDiDi } from "../utils/didi";

interface NextStopBarProps {
  nextStop: StopTimelineEntry | null;
  isAllCompleted: boolean;
  onShowToast: (msg: string) => void;
}

export const NextStopBar: React.FC<NextStopBarProps> = ({
  nextStop,
  isAllCompleted,
  onShowToast,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  if (isAllCompleted) {
    return (
      <aside className="next-stop-bar completed-bar no-print" aria-label="Day Completion Banner">
        <div className="next-bar-content">
          <CheckCircle2 size={18} color="#85A98F" />
          <span className="completed-text">All 17 stops completed for Day 1! Enjoy Shanghai evening.</span>
        </div>
      </aside>
    );
  }

  if (!nextStop) return null;

  const scrollToNext = () => {
    const el = document.getElementById(`entry-${nextStop.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCopyChinese = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyForDriverOrDiDi(
      nextStop.chineseTitle || nextStop.title,
      nextStop.address,
      (text) => onShowToast(`Copied for driver/DiDi: "${text}"`)
    );
    if (!success) onShowToast("Failed to copy destination");
  };

  const handleOpenMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    openMapLocation(nextStop.mapQuery || nextStop.chineseTitle || nextStop.title, nextStop.coords, nextStop.mapUrl);
  };

  return (
    <aside className={`next-stop-bar ${collapsed ? "collapsed" : ""} no-print`} aria-label="Next Checkpoint Quick Access">
      <div className="next-bar-header" onClick={() => setCollapsed(!collapsed)}>
        <div className="next-tag-group">
          <Navigation size={12} className="next-tag-icon" />
          <span className="next-tag">NEXT STOP #{nextStop.checkpointNumber}</span>
          <span className="next-time">{nextStop.time}</span>
        </div>

        <button
          type="button"
          className="collapse-toggle-btn"
          aria-label={collapsed ? "Expand next stop bar" : "Collapse next stop bar"}
        >
          {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!collapsed && (
        <div className="next-bar-body" onClick={scrollToNext}>
          <div className="next-destination-info">
            <h5 className="next-title">
              {nextStop.title}
              {nextStop.chineseTitle && (
                <span className="next-chinese"> {nextStop.chineseTitle}</span>
              )}
            </h5>
            {nextStop.duration && (
              <span className="next-duration-pill">{nextStop.duration}</span>
            )}
          </div>

          <div className="next-buttons-cluster">
            <button
              type="button"
              className="next-btn open-map-btn"
              onClick={handleOpenMap}
              title="Open in Maps"
            >
              <Map size={13} />
              <span>Map</span>
            </button>

            <button
              type="button"
              className="next-btn copy-cn-btn"
              onClick={handleCopyChinese}
              title="Copy Chinese name and address"
            >
              <Copy size={13} />
              <span>Copy CN</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
