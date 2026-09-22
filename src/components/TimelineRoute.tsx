import React from "react";
import { Car, Footprints, Train, Navigation, ExternalLink, MapPin } from "lucide-react";
import type { RouteTimelineEntry } from "../types/itinerary";

interface TimelineRouteProps {
  entry: RouteTimelineEntry;
  isLast: boolean;
}

export const TimelineRoute: React.FC<TimelineRouteProps> = ({ entry, isLast }) => {
  const getTransportIcon = () => {
    const t = (entry.transport || "").toLowerCase();
    if (t.includes("didi") || t.includes("car") || t.includes("taxi")) {
      return <Car size={12} />;
    }
    if (t.includes("metro") || t.includes("train") || t.includes("subway")) {
      return <Train size={12} />;
    }
    return <Footprints size={12} />;
  };

  return (
    <li
      className={`timeline-item route-item ${isLast ? "last-item" : ""}`}
      id={`entry-${entry.id}`}
    >
      {/* Route Spine Connector */}
      {!isLast && <div className="route-line-spine route-transfer-spine" aria-hidden="true" />}

      {/* Subtle small node indicator */}
      <div className="spine-node-column" aria-hidden="true">
        <div className="route-dot-marker" />
      </div>

      {/* Route Card */}
      <div className="timeline-card route-card">
        <div className="route-content-row">
          <div className="route-left">
            <span className="route-time">{entry.time}</span>
            <div className="route-title-cluster">
              <span className="route-title">{entry.title}</span>
              {entry.chineseTitle && (
                <span className="route-chinese">{entry.chineseTitle}</span>
              )}
            </div>
          </div>

          <div className="route-right">
            {entry.mapUrl && (
              <a
                href={entry.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="route-map-link-btn"
                title="Open Route in Amap"
              >
                <Navigation size={11} className="route-nav-icon" />
                <span>Amap Route</span>
                <ExternalLink size={10} />
              </a>
            )}

            <span className="route-transport-badge">
              {getTransportIcon()}
              <span className="badge-text">{entry.transport || "Transit"}</span>
            </span>

            {entry.cost && entry.cost !== "—" && (
              <span className="route-cost-pill">{entry.cost}</span>
            )}
          </div>
        </div>

        {entry.address && (
          <div className="route-address-text">
            <MapPin size={11} className="detail-icon" />
            <span>{entry.address}</span>
          </div>
        )}

        {entry.note && <p className="route-note-text">{entry.note}</p>}
      </div>
    </li>
  );
};
