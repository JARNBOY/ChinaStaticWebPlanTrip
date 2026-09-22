export type TransportType = "walk" | "didi" | "metro" | "transfer" | string;

export type AltLocation = {
  label: string;
  chineseLabel?: string;
  address?: string;
  mapUrl: string;
};

export type BaseTimelineEntry = {
  id: string;
  time: string;
  title: string;
  chineseTitle?: string;
  duration?: string;
  transport?: TransportType;
  cost?: string;
  address?: string;
  mapQuery?: string;
  mapUrl?: string;
  altLocations?: AltLocation[];
  note?: string;
  recheck?: boolean;
};

export type StopTimelineEntry = BaseTimelineEntry & {
  kind: "stop";
  checkpointNumber: number;
  checkable: true;
  imageUrl?: string;
  imageAlt?: string;
  coords?: { lat: number; lng: number };
};

export type RouteTimelineEntry = BaseTimelineEntry & {
  kind: "route";
  checkable: false;
};

export type TimelineEntry = StopTimelineEntry | RouteTimelineEntry;

export type DayStatus = "ready" | "draft" | "coming-soon";

export type DayMeta = {
  dayNumber: number;
  date: string; // "2026-12-25"
  city: "Shanghai" | "Beijing";
  routeTitle: string;
  routeSubtitle: string;
  status: DayStatus;
};

export type RouteSummaryInfo = {
  timeRange: string;
  stopsCount: number;
  estimatedDuration: string;
  didiCostEstimate: string;
  transportOverview: string;
  walkNote: string;
};

export type HotelInfo = {
  name: string;
  chineseName: string;
  tier?: string;
  address: string;
  chineseAddress: string;
  subwayAccess: string;
  mapUrl: string;
};

export type DayPlan = DayMeta & {
  summary: RouteSummaryInfo;
  hotel?: HotelInfo;
  entries: TimelineEntry[];
};

