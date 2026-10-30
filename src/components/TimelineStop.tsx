import React, { useState } from "react";
import { Check, Map, Copy, AlertTriangle, Clock, Navigation, DollarSign, MapPin, ExternalLink, Maximize2 } from "lucide-react";
import type { StopTimelineEntry } from "../types/itinerary";
import { openMapLocation } from "../utils/maps";
import { copyForDriverOrDiDi } from "../utils/didi";
import { useLanguage } from "../context/LanguageContext";

interface TimelineStopProps {
  entry: StopTimelineEntry;
  isCompleted: boolean;
  isNext: boolean;
  onToggle: (id: string) => void;
  onOpenPhoto?: (id: string) => void;
  onShowToast: (message: string) => void;
  isLast: boolean;
}

export const TimelineStop: React.FC<TimelineStopProps> = ({
  entry,
  isCompleted,
  isNext,
  onToggle,
  onOpenPhoto,
  onShowToast,
  isLast,
}) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const handleCopyChinese = async () => {
    const success = await copyForDriverOrDiDi(
      entry.chineseTitle || entry.title,
      entry.address,
      (text) => {
        onShowToast(`Copied for driver/DiDi: "${text}"`);
      }
    );
    if (!success) {
      onShowToast("Could not copy destination text");
    }
  };

  const handleOpenMap = () => {
    openMapLocation(entry.mapQuery || entry.chineseTitle || entry.title, entry.coords, entry.mapUrl);
  };

  const paddedNum = String(entry.checkpointNumber).padStart(2, "0");

  return (
    <li
      className={`timeline-item stop-item ${isCompleted ? "completed" : ""} ${
        isNext ? "next-checkpoint" : ""
      } ${isLast ? "last-item" : ""}`}
      id={`entry-${entry.id}`}
    >
      {/* Route Spine Vertical Line */}
      {!isLast && <div className="route-line-spine" aria-hidden="true" />}

      {/* Node Marker on Spine */}
      <div className="spine-node-column" aria-hidden="true">
        <div className={`node-marker ${isCompleted ? "done" : ""} ${isNext ? "next-pulse" : ""}`}>
          {isCompleted && <Check size={11} strokeWidth={3} color="#F8F6F1" />}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="timeline-card stop-card">
        {/* Top Header Row with Checkbox, Time, and Badges */}
        <div className="card-top-bar">
          <label className="checkbox-touch-area" htmlFor={`chk-${entry.id}`}>
            <input
              type="checkbox"
              id={`chk-${entry.id}`}
              className="sr-only"
              checked={isCompleted}
              onChange={() => onToggle(entry.id)}
              aria-label={`Mark ${entry.time} ${entry.title} as completed`}
            />
            <span className={`custom-checkbox ${isCompleted ? "checked" : ""}`}>
              {isCompleted && <Check size={14} strokeWidth={2.5} />}
            </span>
          </label>

          <span className="checkpoint-time">{entry.time}</span>

          <div className="card-badges">
            <span className="badge-pill stop-pill">{t.stopNum(paddedNum)}</span>
            {entry.recheck && (
              <span className="badge-pill warning-pill" title="Schedule or ticket availability needs confirmation">
                <AlertTriangle size={11} />
                <span>{t.recheckBadge}</span>
              </span>
            )}
          </div>
        </div>

        {/* Titles - Kept authentic and untranslated as requested */}
        <div className="card-title-group" onClick={() => onToggle(entry.id)} role="button" tabIndex={0}>
          <h4 className="stop-english-title">{entry.title}</h4>
          {entry.chineseTitle && (
            <p className="stop-chinese-title">{entry.chineseTitle}</p>
          )}
        </div>

        {/* Destination Photo */}
        {entry.imageUrl && !imgError && (
          <figure
            className="stop-photo-container clickable"
            onClick={() => onOpenPhoto && onOpenPhoto(entry.id)}
            title="Click to view full image"
          >
            <img
              src={entry.imageUrl}
              alt={entry.imageAlt || entry.title}
              className="stop-photo-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
            <div className="stop-photo-zoom-hint" aria-hidden="true">
              <Maximize2 size={13} />
              <span>{t.fullPhoto}</span>
            </div>
          </figure>
        )}

        {/* Metadata Details Grid */}
        <dl className="stop-details-grid">
          {entry.duration && (
            <div className="detail-row">
              <dt className="detail-dt">
                <Clock size={12} className="detail-icon" />
                <span>{t.labelDuration}</span>
              </dt>
              <dd className="detail-dd">{entry.duration}</dd>
            </div>
          )}

          {entry.transport && (
            <div className="detail-row">
              <dt className="detail-dt">
                <Navigation size={12} className="detail-icon" />
                <span>{t.labelTransport}</span>
              </dt>
              <dd className="detail-dd">{entry.transport}</dd>
            </div>
          )}

          {entry.cost && entry.cost !== "—" && (
            <div className="detail-row">
              <dt className="detail-dt">
                <DollarSign size={12} className="detail-icon" />
                <span>{t.labelCost}</span>
              </dt>
              <dd className="detail-dd">{entry.cost}</dd>
            </div>
          )}

          {entry.address && entry.address !== "—" && (
            <div className="detail-row">
              <dt className="detail-dt">
                <MapPin size={12} className="detail-icon" />
                <span>{t.labelAddress}</span>
              </dt>
              <dd className="detail-dd address-dd">{entry.address}</dd>
            </div>
          )}

          {entry.note && (
            <div className="detail-row note-row">
              <dt className="detail-dt">
                <span>{t.labelNote}</span>
              </dt>
              <dd className="detail-dd note-dd">{entry.note}</dd>
            </div>
          )}
        </dl>

        {/* Action Buttons for Mobile Traveler */}
        <div className="stop-action-bar">
          {entry.mapUrl ? (
            <a
              href={entry.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn map-btn print-map-link"
              title="Open place in Amap (Gaode)"
            >
              <Navigation size={13} className="nav-arrow" />
              <span>{t.openAmap}</span>
              <ExternalLink size={10} />
            </a>
          ) : (
            <button
              type="button"
              className="action-btn map-btn no-print"
              onClick={handleOpenMap}
              title="Open destination in Apple/Google/Amap"
            >
              <Map size={13} />
              <span>{t.openMap}</span>
            </button>
          )}

          {entry.altLocations &&
            entry.altLocations.map((alt, idx) => (
              <a
                key={idx}
                href={alt.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn alt-map-btn print-map-link"
                title={`Open ${alt.label} in Amap`}
              >
                <Navigation size={12} className="nav-arrow" />
                <span>{alt.label}</span>
                <ExternalLink size={10} />
              </a>
            ))}

          <button
            type="button"
            className="action-btn copy-btn no-print"
            onClick={handleCopyChinese}
            title="Copy Chinese place and address to show driver or paste in DiDi"
          >
            <Copy size={13} />
            <span>{t.copyDidi}</span>
          </button>
        </div>
      </div>
    </li>
  );
};
