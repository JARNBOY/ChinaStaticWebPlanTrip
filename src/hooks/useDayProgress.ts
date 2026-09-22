import { useMemo } from "react";
import type { TimelineEntry, StopTimelineEntry } from "../types/itinerary";

export function useDayProgress(entries: TimelineEntry[], completedIds: Set<string>) {
  const checkableStops = useMemo(() => {
    return entries.filter((e): e is StopTimelineEntry => e.checkable === true);
  }, [entries]);

  const totalStops = checkableStops.length;

  const completedCount = useMemo(() => {
    return checkableStops.reduce((count, stop) => {
      return count + (completedIds.has(stop.id) ? 1 : 0);
    }, 0);
  }, [checkableStops, completedIds]);

  const percent = totalStops > 0 ? Math.round((completedCount / totalStops) * 100) : 0;

  // Find the next uncompleted stop for the sticky bottom bar
  const nextUncompletedStop = useMemo(() => {
    return checkableStops.find((stop) => !completedIds.has(stop.id)) || null;
  }, [checkableStops, completedIds]);

  return {
    checkableStops,
    totalStops,
    completedCount,
    percent,
    nextUncompletedStop,
    isAllCompleted: totalStops > 0 && completedCount === totalStops,
  };
}
