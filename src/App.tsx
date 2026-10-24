import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { DayNavigation } from "./components/DayNavigation";
import { DayHeader } from "./components/DayHeader";
import { RouteSummary } from "./components/RouteSummary";
import { LocationCarousel } from "./components/LocationCarousel";
import { HotelCard } from "./components/HotelCard";
import { ProgressBar } from "./components/ProgressBar";
import { Timeline } from "./components/Timeline";
import { NextStopBar } from "./components/NextStopBar";
import { PlanEditorModal } from "./components/PlanEditorModal";
import { Toast } from "./components/Toast";
import { DAYS_CATALOG } from "./data/daysCatalog";
import { SHANGHAI_DAY_01 } from "./data/shanghai/day01";
import { SHANGHAI_DAY_02 } from "./data/shanghai/day02";
import { SHANGHAI_DAY_03 } from "./data/shanghai/day03";
import { SHANGHAI_DAY_04 } from "./data/shanghai/day04";
import { SHANGHAI_DAY_05 } from "./data/shanghai/day05";
import { BEIJING_DAY_06 } from "./data/beijing/day06";
import { BEIJING_DAY_07 } from "./data/beijing/day07";
import { BEIJING_DAY_08 } from "./data/beijing/day08";
import { BEIJING_DAY_09 } from "./data/beijing/day09";
import type { DayPlan } from "./types/itinerary";
import { useItineraryStorage } from "./hooks/useItineraryStorage";
import { useDayProgress } from "./hooks/useDayProgress";
import { getActiveDay, setActiveDay, checkAndMigratePlanVersion } from "./utils/storage";
import { copyDayForGoogleSheets } from "./utils/sheetExport";

// Ensure visitors get the latest updated Day 1–5 Master Plan
checkAndMigratePlanVersion();

const DAY_PLANS: Record<number, DayPlan> = {
  1: SHANGHAI_DAY_01,
  2: SHANGHAI_DAY_02,
  3: SHANGHAI_DAY_03,
  4: SHANGHAI_DAY_04,
  5: SHANGHAI_DAY_05,
  6: BEIJING_DAY_06,
  7: BEIJING_DAY_07,
  8: BEIJING_DAY_08,
  9: BEIJING_DAY_09,
};


export function App() {
  const [activeDayNumber, setActiveDayNumber] = useState<number>(() => getActiveDay());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeDayPlan = DAY_PLANS[activeDayNumber] || SHANGHAI_DAY_01;

  const {
    entries,
    completedIds,
    toggleComplete,
    resetProgress,
    saveEntries,
    resetToDefault,
  } = useItineraryStorage(activeDayNumber, activeDayPlan.entries);

  const {
    totalStops,
    completedCount,
    percent,
    nextUncompletedStop,
    isAllCompleted,
  } = useDayProgress(entries, completedIds);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSelectDay = (dayNum: number) => {
    setActiveDayNumber(dayNum);
    setActiveDay(dayNum);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySheet = async () => {
    const success = await copyDayForGoogleSheets(activeDayPlan.date, entries);
    if (success) {
      showToast(`📋 Copied Day ${activeDayPlan.dayNumber} table for Google Sheets! Paste into cell A12.`);
    } else {
      showToast("❌ Unable to copy to clipboard.");
    }
  };

  const handleSelectStop = (stopId: string) => {
    const el = document.getElementById(`entry-${stopId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("stop-target-pulse");
      setTimeout(() => {
        el.classList.remove("stop-target-pulse");
      }, 1800);
    }
  };

  return (
    <div className="travel-app-root">
      <div className="journal-page-container">
        {/* Top Sticky Header */}
        <Header
          date={activeDayPlan.date}
          dayNumber={activeDayPlan.dayNumber}
          totalDays={DAYS_CATALOG.length}
          onPrint={handlePrint}
          onCopySheet={handleCopySheet}
          onOpenEditor={() => setIsEditorOpen(true)}
          onResetProgress={resetProgress}
        />

        {/* 10-Day Navigation (Shanghai 1-6, Beijing 7-10) */}
        <DayNavigation
          days={DAYS_CATALOG}
          activeDay={activeDayNumber}
          onSelectDay={handleSelectDay}
        />

        {/* Main Editorial Card */}
        <main className="journal-editorial-card">
          {/* Day Title & Route */}
          <DayHeader
            dayNumber={activeDayPlan.dayNumber}
            city={activeDayPlan.city}
            routeTitle={activeDayPlan.routeTitle}
            routeSubtitle={activeDayPlan.routeSubtitle}
          />

          {/* Top Compact Route Summary */}
          <RouteSummary summary={activeDayPlan.summary} />

          {/* Visual Location Preview Reel with 2s Auto-Scroll & Click-to-Scroll */}
          <LocationCarousel
            entries={entries}
            dayNumber={activeDayPlan.dayNumber}
            onSelectStop={handleSelectStop}
          />

          {/* Hotel Information & Amap Route */}
          {activeDayPlan.hotel && (
            <HotelCard
              hotel={activeDayPlan.hotel}
              onShowToast={showToast}
            />
          )}

          {/* Progress Tracker (e.g. 0 / 17 completed) */}
          <ProgressBar
            completedCount={completedCount}
            totalStops={totalStops}
            percent={percent}
          />

          {/* Continuous Vertical Timeline: 17 Stops + 13 Routes */}
          <Timeline
            entries={entries}
            completedIds={completedIds}
            nextStopId={nextUncompletedStop?.id}
            onToggle={toggleComplete}
            onShowToast={showToast}
          />
        </main>

        {/* Journal Footer */}
        <footer className="journal-footer no-print">
          <p className="footer-credits">
            China Trip Itinerary · Designed for mobile exploration & mindful walking
          </p>
          <div className="footer-actions">
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setIsEditorOpen(true)}
            >
              Customize Itinerary
            </button>
            <span className="footer-sep">·</span>
            <button
              type="button"
              className="footer-link-btn"
              onClick={handlePrint}
            >
              Print / Save PDF
            </button>
          </div>
        </footer>
      </div>

      {/* Sticky Bottom Next Stop Bar for Mobile */}
      <NextStopBar
        nextStop={nextUncompletedStop}
        isAllCompleted={isAllCompleted}
        onShowToast={showToast}
      />

      {/* Lightweight V1 Editor Modal */}
      <PlanEditorModal
        isOpen={isEditorOpen}
        entries={entries}
        onClose={() => setIsEditorOpen(false)}
        onSave={saveEntries}
        onResetToDefault={resetToDefault}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
