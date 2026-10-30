import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Navigation, Copy, ExternalLink, MapPin } from "lucide-react";
import type { StopTimelineEntry } from "../types/itinerary";
import { openMapLocation } from "../utils/maps";
import { copyForDriverOrDiDi } from "../utils/didi";
import { useLanguage } from "../context/LanguageContext";

interface ImageViewerModalProps {
  isOpen: boolean;
  stops: StopTimelineEntry[];
  currentStopId: string | null;
  onClose: () => void;
  onSelectStop: (stopId: string) => void;
  onShowToast: (message: string) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  stops,
  currentStopId,
  onClose,
  onSelectStop,
  onShowToast,
}) => {
  const { t } = useLanguage();
  // Filter only stops with valid images
  const photoStops = stops.filter((s) => !!s.imageUrl);

  const currentIndex = photoStops.findIndex((s) => s.id === currentStopId);
  const currentStop = currentIndex >= 0 ? photoStops[currentIndex] : photoStops[0];

  const handlePrev = useCallback(() => {
    if (photoStops.length <= 1) return;
    const prevIndex = (currentIndex - 1 + photoStops.length) % photoStops.length;
    onSelectStop(photoStops[prevIndex].id);
  }, [currentIndex, photoStops, onSelectStop]);

  const handleNext = useCallback(() => {
    if (photoStops.length <= 1) return;
    const nextIndex = (currentIndex + 1) % photoStops.length;
    onSelectStop(photoStops[nextIndex].id);
  }, [currentIndex, photoStops, onSelectStop]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !currentStop) return null;

  const handleCopyChinese = async () => {
    const success = await copyForDriverOrDiDi(
      currentStop.chineseTitle || currentStop.title,
      currentStop.address,
      (text) => {
        onShowToast(`Copied for driver/DiDi: "${text}"`);
      }
    );
    if (!success) {
      onShowToast("Could not copy destination text");
    }
  };

  const handleOpenMap = () => {
    openMapLocation(
      currentStop.mapQuery || currentStop.chineseTitle || currentStop.title,
      currentStop.coords,
      currentStop.mapUrl
    );
  };

  const paddedNum = String(currentStop.checkpointNumber).padStart(2, "0");

  return (
    <div
      className="image-viewer-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Full image view of ${currentStop.title}`}
      onClick={onClose}
    >
      <div className="image-viewer-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Floating Control Bar */}
        <div className="image-viewer-top-bar">
          <div className="image-viewer-counter">
            <span className="iv-stop-tag">{t.stopNum(paddedNum)}</span>
            <span className="iv-count-text">
              {t.photoCount(currentIndex + 1, photoStops.length)}
            </span>
          </div>

          <button
            type="button"
            className="image-viewer-close-btn"
            onClick={onClose}
            aria-label={t.modalClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Stage with Image and Navigation Arrows */}
        <div className="image-viewer-stage">
          {photoStops.length > 1 && (
            <button
              type="button"
              className="iv-nav-arrow prev"
              onClick={handlePrev}
              title={t.modalPrev}
              aria-label={t.modalPrev}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="iv-image-frame">
            <img
              src={currentStop.imageUrl}
              alt={currentStop.imageAlt || currentStop.title}
              className="iv-main-image"
              loading="eager"
            />
          </div>

          {photoStops.length > 1 && (
            <button
              type="button"
              className="iv-nav-arrow next"
              onClick={handleNext}
              title={t.modalNext}
              aria-label={t.modalNext}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom Details Drawer */}
        <div className="image-viewer-bottom-drawer">
          <div className="iv-info-group">
            <div className="iv-title-row">
              <h3 className="iv-title">{currentStop.title}</h3>
              {currentStop.time && <span className="iv-time-pill">{currentStop.time}</span>}
            </div>

            {currentStop.chineseTitle && (
              <p className="iv-chinese-title">{currentStop.chineseTitle}</p>
            )}

            {currentStop.address && currentStop.address !== "—" && (
              <p className="iv-address">
                <MapPin size={12} className="inline-icon" />
                <span>{currentStop.address}</span>
              </p>
            )}

            {currentStop.note && <p className="iv-note">{currentStop.note}</p>}
          </div>

          <div className="iv-actions-row">
            {currentStop.mapUrl ? (
              <a
                href={currentStop.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="iv-action-btn map-btn"
                title={t.openAmap}
              >
                <Navigation size={14} />
                <span>{t.openAmap}</span>
                <ExternalLink size={11} />
              </a>
            ) : (
              <button
                type="button"
                className="iv-action-btn map-btn"
                onClick={handleOpenMap}
                title={t.openMap}
              >
                <Navigation size={14} />
                <span>{t.openMap}</span>
              </button>
            )}

            <button
              type="button"
              className="iv-action-btn copy-btn"
              onClick={handleCopyChinese}
              title={t.copyDidi}
            >
              <Copy size={14} />
              <span>{t.copyDidi}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
