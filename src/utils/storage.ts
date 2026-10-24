import type { TimelineEntry } from "../types/itinerary";

const COMPLETED_PREFIX = "china_trip_completed_day_";
const CUSTOM_ITEMS_PREFIX = "china_trip_custom_day_";
const ACTIVE_DAY_KEY = "china_trip_active_day";
export const APP_PLAN_VERSION = "2026-10-24-days1-5-master-v5";
const PLAN_VERSION_KEY = "china_trip_plan_version";

export function checkAndMigratePlanVersion(): void {
  try {
    const currentVer = localStorage.getItem(PLAN_VERSION_KEY);
    if (currentVer !== APP_PLAN_VERSION) {
      // Clear stale day customizations so visitors automatically receive updated Days 1-5
      for (let i = 1; i <= 9; i++) {
        localStorage.removeItem(`${CUSTOM_ITEMS_PREFIX}${i}`);
      }
      localStorage.setItem(PLAN_VERSION_KEY, APP_PLAN_VERSION);
    }
  } catch (e) {
    console.error("Migration error:", e);
  }
}

export function loadCompletedIds(dayNumber: number): string[] {
  try {
    const raw = localStorage.getItem(`${COMPLETED_PREFIX}${dayNumber}`);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCompletedIds(dayNumber: number, ids: string[]): void {
  try {
    localStorage.setItem(`${COMPLETED_PREFIX}${dayNumber}`, JSON.stringify(ids));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function loadCustomEntries(dayNumber: number): TimelineEntry[] | null {
  try {
    const raw = localStorage.getItem(`${CUSTOM_ITEMS_PREFIX}${dayNumber}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCustomEntries(dayNumber: number, entries: TimelineEntry[]): void {
  try {
    localStorage.setItem(`${CUSTOM_ITEMS_PREFIX}${dayNumber}`, JSON.stringify(entries));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function clearDayCustomization(dayNumber: number): void {
  try {
    localStorage.removeItem(`${CUSTOM_ITEMS_PREFIX}${dayNumber}`);
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function clearDayProgress(dayNumber: number): void {
  try {
    localStorage.removeItem(`${COMPLETED_PREFIX}${dayNumber}`);
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function getActiveDay(): number {
  try {
    const raw = localStorage.getItem(ACTIVE_DAY_KEY);
    return raw ? parseInt(raw, 10) || 1 : 1;
  } catch {
    return 1;
  }
}

export function setActiveDay(dayNumber: number): void {
  try {
    localStorage.setItem(ACTIVE_DAY_KEY, dayNumber.toString());
  } catch (e) {
    console.error("Storage error:", e);
  }
}
