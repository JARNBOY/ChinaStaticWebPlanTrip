import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Compass } from "lucide-react";
import type { TimelineEntry, StopTimelineEntry } from "../types/itinerary";

interface LocationCarouselProps {
  entries: TimelineEntry[];
  onSelectStop?: (stopId: string) => void;
  autoScrollInterval?: number; // default: 2000ms
}

export const LocationCarousel: React.FC<LocationCarouselProps> = ({
  entries,
  onSelectStop,
  autoScrollInterval = 2000,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchTimerRef = useRef<number | null>(null);

  // Extract all checklist stops (Checkpoint 1 to 17)
  const stops = entries.filter(
    (e): e is StopTimelineEntry => e.kind === "stop"
  );

  // Smooth scroll carousel track to specific card index
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>(".carousel-card");
    if (!cards || cards.length === 0) return;

    const targetIndex = (index + cards.length) % cards.length;
    const targetCard = cards[targetIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setCurrentIndex(targetIndex);
    }
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    scrollToIndex(currentIndex + 1);
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  // Auto-scroll loop every 2 seconds (with hover/touch/pause guards and reduced-motion check)
  useEffect(() => {
    // Respect user's accessibility reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isPaused || isHovered || isTouched || prefersReducedMotion || stops.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % stops.length;
        const track = trackRef.current;
        if (track) {
          const cards = track.querySelectorAll<HTMLElement>(".carousel-card");
          if (cards[nextIndex]) {
            cards[nextIndex].scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "nearest",
            });
          }
        }
        return nextIndex;
      });
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, isTouched, stops.length, autoScrollInterval]);

  // Touch and drag detection with 4s idle resume
  const handleTouchStart = () => {
    setIsTouched(true);
    if (touchTimerRef.current) {
      window.clearTimeout(touchTimerRef.current);
    }
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      window.clearTimeout(touchTimerRef.current);
    }
    // Resume auto-scrolling after 4 seconds of idle inactivity
    touchTimerRef.current = window.setTimeout(() => {
      setIsTouched(false);
    }, 4000);
  };

  // Card click: trigger smooth-scroll to timeline checkpoint
  const handleCardClick = (stop: StopTimelineEntry, index: number) => {
    setCurrentIndex(index);

    if (onSelectStop) {
      onSelectStop(stop.id);
    } else {
      // Default direct scroll behavior
      const el = document.getElementById(`entry-${stop.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("stop-target-pulse");
        setTimeout(() => el.classList.remove("stop-target-pulse"), 1800);
      }
    }
  };

  if (stops.length === 0) return null;

  return (
    <section
      className="location-carousel-section no-print"
      aria-label="Day Checkpoints Visual Reel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Top Navigation Header */}
      <div className="carousel-header-row">
        <div className="carousel-title-group">
          <Compass size={14} className="carousel-icon" />
          <span className="carousel-title">DAY 1 CHECKPOINTS · {stops.length} LOCATIONS</span>
          <span className="carousel-counter-badge">
            {String(currentIndex + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
          </span>
        </div>

        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-control-btn play-pause-btn"
            onClick={togglePause}
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            aria-label={isPaused ? "Play auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>

          <button
            type="button"
            className="carousel-control-btn"
            onClick={handlePrev}
            title="Previous location"
            aria-label="Previous location"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            type="button"
            className="carousel-control-btn"
            onClick={handleNext}
            title="Next location"
            aria-label="Next location"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="carousel-viewport" ref={trackRef}>
        <div className="carousel-track">
          {stops.map((stop, index) => {
            const paddedCheckpoint = String(stop.checkpointNumber).padStart(2, "0");
            const isCurrent = index === currentIndex;

            return (
              <div
                key={stop.id}
                className={`carousel-card ${isCurrent ? "active-slide" : ""}`}
                onClick={() => handleCardClick(stop, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(stop, index);
                  }
                }}
                aria-label={`Jump to stop #${stop.checkpointNumber}: ${stop.title}`}
              >
                {/* Background Destination Photo */}
                <div className="carousel-card-img-wrapper">
                  <img
                    src={stop.imageUrl || "/images/shanghai/jingan-temple.jpg"}
                    alt={stop.imageAlt || stop.title}
                    className="carousel-card-img"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback placeholder image
                      (e.target as HTMLImageElement).src =
                        "/images/shanghai/jingan-temple.jpg";
                    }}
                  />
                  <div className="carousel-card-scrim" />
                </div>

                {/* Top Badge Overlay */}
                <div className="carousel-card-top-badges">
                  <span className="carousel-stop-badge">#{paddedCheckpoint}</span>
                  <span className="carousel-time-badge">{stop.time}</span>
                </div>

                {/* Bottom Place Name & Details Overlay */}
                <div className="carousel-card-bottom-info">
                  <h4 className="carousel-place-title">{stop.title}</h4>
                  {stop.chineseTitle && (
                    <span className="carousel-place-chinese">
                      {stop.chineseTitle}
                    </span>
                  )}
                  {stop.duration && (
                    <span className="carousel-duration-pill">{stop.duration}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
