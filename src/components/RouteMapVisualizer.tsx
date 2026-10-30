import React, { useState } from "react";
import {
  Check,
  MapPin,
  Navigation,
  Copy,
  ExternalLink,
  Maximize2,
  Footprints,
  Train,
  Car,
  Compass,
} from "lucide-react";
import type { TimelineEntry, StopTimelineEntry } from "../types/itinerary";
import { openMapLocation } from "../utils/maps";
import { copyForDriverOrDiDi } from "../utils/didi";
import { useLanguage } from "../context/LanguageContext";

interface RouteMapVisualizerProps {
  entries: TimelineEntry[];
  completedIds: Set<string>;
  onToggleComplete: (id: string) => void;
  onOpenPhoto: (stopId: string) => void;
  onShowToast: (message: string) => void;
  nextStopId?: string;
}

export const RouteMapVisualizer: React.FC<RouteMapVisualizerProps> = ({
  entries,
  completedIds,
  onToggleComplete,
  onOpenPhoto,
  onShowToast,
  nextStopId,
}) => {
  const { t } = useLanguage();
  const [filterMode, setFilterMode] = useState<"all" | "pending" | "completed">("all");
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  const stops = entries.filter((e): e is StopTimelineEntry => e.kind === "stop");
  const totalStops = stops.length;
  const completedCount = stops.filter((s) => completedIds.has(s.id)).length;

  const handleCopyChinese = async (stop: StopTimelineEntry) => {
    const success = await copyForDriverOrDiDi(
      stop.chineseTitle || stop.title,
      stop.address,
      (text) => {
        onShowToast(`Copied for driver/DiDi: "${text}"`);
      }
    );
    if (!success) {
      onShowToast("Could not copy destination text");
    }
  };

  const handleOpenMap = (stop: StopTimelineEntry) => {
    openMapLocation(
      stop.mapQuery || stop.chineseTitle || stop.title,
      stop.coords,
      stop.mapUrl
    );
  };

  // Find the selected stop details or default to the next uncompleted stop
  const activeStop =
    stops.find((s) => s.id === selectedStopId) ||
    stops.find((s) => s.id === nextStopId) ||
    stops[0];

  return (
    <div className="route-map-visualizer-container">
      {/* Route Map Header & Stats Bar */}
      <div className="rm-header-card">
        <div className="rm-header-top">
          <div className="rm-title-group">
            <Compass size={16} className="rm-icon" />
            <h3 className="rm-title">{t.routeMapTitle}</h3>
          </div>
          <span className="rm-progress-badge">
            {completedCount} / {totalStops} {t.progressCompleted}
          </span>
        </div>
        <p className="rm-subtitle">
          {t.routeMapSubtitle}
        </p>

        {/* Filter Pills */}
        <div className="rm-filters-row">
          <button
            type="button"
            className={`rm-filter-btn ${filterMode === "all" ? "active" : ""}`}
            onClick={() => setFilterMode("all")}
          >
            {t.filterAll} ({totalStops})
          </button>
          <button
            type="button"
            className={`rm-filter-btn ${filterMode === "pending" ? "active" : ""}`}
            onClick={() => setFilterMode("pending")}
          >
            {t.filterPending} ({totalStops - completedCount})
          </button>
          <button
            type="button"
            className={`rm-filter-btn ${filterMode === "completed" ? "active" : ""}`}
            onClick={() => setFilterMode("completed")}
          >
            {t.filterCompleted} ({completedCount})
          </button>
        </div>
      </div>

      {/* Main Visual Route Spine */}
      <div className="rm-spine-layout">
        <div className="rm-nodes-list">
          {entries.map((entry) => {
            if (entry.kind === "stop") {
              const isCompleted = completedIds.has(entry.id);
              const isNext = entry.id === nextStopId;
              const isSelected = activeStop?.id === entry.id;

              if (filterMode === "pending" && isCompleted) return null;
              if (filterMode === "completed" && !isCompleted) return null;

              const paddedCheckpoint = String(entry.checkpointNumber).padStart(2, "0");

              return (
                <div
                  key={entry.id}
                  className={`rm-stop-node-card ${isCompleted ? "completed" : ""} ${
                    isNext ? "next-active" : ""
                  } ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedStopId(entry.id)}
                >
                  {/* Left Column: Number Marker & Checkbox */}
                  <div className="rm-node-indicator">
                    <label
                      className="rm-checkbox-label"
                      onClick={(e) => e.stopPropagation()}
                      title={`Mark #${paddedCheckpoint} as completed`}
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => onToggleComplete(entry.id)}
                        className="rm-native-checkbox"
                      />
                      <span className={`rm-custom-checkbox ${isCompleted ? "checked" : ""}`}>
                        {isCompleted ? <Check size={13} strokeWidth={3} /> : paddedCheckpoint}
                      </span>
                    </label>
                  </div>

                  {/* Middle Column: Text & Time Information */}
                  <div className="rm-node-content">
                    <div className="rm-node-meta">
                      <span className="rm-time-pill">{entry.time}</span>
                      <span className="rm-checkpoint-pill">{t.stopNum(paddedCheckpoint)}</span>
                      {entry.duration && <span className="rm-duration-tag">{entry.duration}</span>}
                    </div>

                    <h4 className="rm-node-title">{entry.title}</h4>
                    {entry.chineseTitle && (
                      <p className="rm-node-chinese">{entry.chineseTitle}</p>
                    )}

                    {entry.address && entry.address !== "—" && (
                      <p className="rm-node-address">
                        <MapPin size={11} className="inline-icon" />
                        <span>{entry.address}</span>
                      </p>
                    )}

                    {/* Action Link Shortcuts */}
                    <div className="rm-node-actions" onClick={(e) => e.stopPropagation()}>
                      {entry.mapUrl ? (
                        <a
                          href={entry.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rm-action-chip map"
                          title={t.openAmap}
                        >
                          <Navigation size={11} />
                          <span>{t.openAmap}</span>
                          <ExternalLink size={9} />
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="rm-action-chip map"
                          onClick={() => handleOpenMap(entry)}
                          title={t.openMap}
                        >
                          <Navigation size={11} />
                          <span>{t.openMap}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="rm-action-chip copy"
                        onClick={() => handleCopyChinese(entry)}
                        title={t.copyDidi}
                      >
                        <Copy size={11} />
                        <span>{t.copyDidi}</span>
                      </button>

                      {entry.imageUrl && (
                        <button
                          type="button"
                          className="rm-action-chip photo"
                          onClick={() => onOpenPhoto(entry.id)}
                          title={t.fullPhoto}
                        >
                          <Maximize2 size={11} />
                          <span>{t.fullPhoto}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Clickable Photo Thumbnail */}
                  {entry.imageUrl && (
                    <div
                      className="rm-node-thumb-frame"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPhoto(entry.id);
                      }}
                      title="Tap to see full image"
                    >
                      <img
                        src={entry.imageUrl}
                        alt={entry.imageAlt || entry.title}
                        className="rm-node-thumb-img"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/shanghai/jingan-temple.jpg";
                        }}
                      />
                      <span className="rm-thumb-zoom-badge" aria-hidden="true">
                        <Maximize2 size={10} />
                      </span>
                    </div>
                  )}
                </div>
              );
            }

            // Route Leg (Transit connector between stops)
            if (entry.kind === "route") {
              const transportLower = (entry.transport || "").toLowerCase();
              const isDiDi = transportLower.includes("didi") || transportLower.includes("car") || transportLower.includes("taxi");
              const isMetro = transportLower.includes("metro") || transportLower.includes("train") || transportLower.includes("subway");
              const isWalk = !isDiDi && !isMetro;

              return (
                <div key={entry.id} className="rm-route-connector">
                  <div className="rm-connector-line" aria-hidden="true">
                    <span className="rm-connector-dot" />
                  </div>
                  <div className="rm-connector-badge">
                    {isWalk && <Footprints size={12} className="rm-transit-icon" />}
                    {isMetro && <Train size={12} className="rm-transit-icon" />}
                    {isDiDi && <Car size={12} className="rm-transit-icon" />}

                    <span className="rm-connector-label">
                      {entry.title} {entry.duration ? `(${entry.duration})` : ""}
                    </span>

                    {entry.mapUrl && (
                      <a
                        href={entry.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rm-connector-map-link"
                        title="Open walking/transit route in Amap"
                      >
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};
