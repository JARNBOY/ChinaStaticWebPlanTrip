import { useState, useEffect, useCallback } from "react";
import type { TimelineEntry } from "../types/itinerary";
import {
  loadCompletedIds,
  saveCompletedIds,
  loadCustomEntries,
  saveCustomEntries,
  clearDayCustomization,
  clearDayProgress,
} from "../utils/storage";

export function useItineraryStorage(dayNumber: number, defaultEntries: TimelineEntry[]) {
  const [entries, setEntries] = useState<TimelineEntry[]>(() => {
    const custom = loadCustomEntries(dayNumber);
    return custom || defaultEntries;
  });

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    return new Set(loadCompletedIds(dayNumber));
  });

  // Keep synced if dayNumber changes
  useEffect(() => {
    const custom = loadCustomEntries(dayNumber);
    setEntries(custom || defaultEntries);
    setCompletedIds(new Set(loadCompletedIds(dayNumber)));
  }, [dayNumber, defaultEntries]);

  const toggleComplete = useCallback(
    (id: string) => {
      setCompletedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        saveCompletedIds(dayNumber, Array.from(next));
        return next;
      });
    },
    [dayNumber]
  );

  const resetProgress = useCallback(() => {
    clearDayProgress(dayNumber);
    setCompletedIds(new Set());
  }, [dayNumber]);

  const saveEntries = useCallback(
    (updatedEntries: TimelineEntry[]) => {
      setEntries(updatedEntries);
      saveCustomEntries(dayNumber, updatedEntries);
    },
    [dayNumber]
  );

  const resetToDefault = useCallback(() => {
    clearDayCustomization(dayNumber);
    setEntries(defaultEntries);
  }, [dayNumber, defaultEntries]);

  return {
    entries,
    completedIds,
    toggleComplete,
    resetProgress,
    saveEntries,
    resetToDefault,
  };
}
