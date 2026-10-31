import fs from 'fs';
import path from 'path';

const knowledgeGraph = {
  version: "2.0.0",
  metadata: {
    projectName: "ChinaStaticWebPlanTrip",
    projectDescription: "Mobile-first PWA travel itinerary and interactive progression map for Shanghai & Beijing 10-day trip with bilingual localization, offline checklist, and ticket master hub",
    analyzedAt: new Date().toISOString(),
    commitHash: "ce141df8e507f71fa289898fbeb5b8e6078c6bf2",
    entryPoint: "src/main.tsx",
    languages: ["TypeScript", "TSX", "CSS", "HTML", "JSON"],
    frameworks: ["React 19", "Vite 8", "Vite PWA (Workbox)", "Lucide React"],
    totalNodes: 36,
    totalEdges: 62
  },
  layers: [
    {
      id: "layer:application-orchestration",
      name: "Application Orchestration",
      description: "Bootstrapping, entry points, layout shell, view routing, and top-level modals",
      nodeIds: [
        "file:src/main.tsx",
        "file:src/App.tsx",
        "file:index.html"
      ]
    },
    {
      id: "layer:interactive-views",
      name: "Interactive View Controllers",
      description: "Primary view surfaces toggled by ViewSwitcher: Timeline, Route Map Visualizer, and Need to Know Master Hub",
      nodeIds: [
        "file:src/components/Timeline.tsx",
        "file:src/components/RouteMapVisualizer.tsx",
        "file:src/components/NeedToKnowPage.tsx",
        "file:src/components/ImageViewerModal.tsx",
        "file:src/components/ViewSwitcher.tsx"
      ]
    },
    {
      id: "layer:presentation-components",
      name: "Presentation Components",
      description: "Specialized UI widgets including location carousel, hotel cards, headers, progress bars, and transit stops",
      nodeIds: [
        "file:src/components/Header.tsx",
        "file:src/components/DayNavigation.tsx",
        "file:src/components/DayHeader.tsx",
        "file:src/components/RouteSummary.tsx",
        "file:src/components/LocationCarousel.tsx",
        "file:src/components/HotelCard.tsx",
        "file:src/components/ProgressBar.tsx",
        "file:src/components/TimelineStop.tsx",
        "file:src/components/TimelineRoute.tsx",
        "file:src/components/NextStopBar.tsx",
        "file:src/components/PlanEditorModal.tsx",
        "file:src/components/Toast.tsx"
      ]
    },
    {
      id: "layer:state-and-localization",
      name: "State Management & Localization",
      description: "Reactive state hooks, persistent progress storage, and bilingual TH/EN dictionary system",
      nodeIds: [
        "file:src/context/LanguageContext.tsx",
        "file:src/i18n/translations.ts",
        "file:src/hooks/useItineraryStorage.ts",
        "file:src/hooks/useDayProgress.ts"
      ]
    },
    {
      id: "layer:data-and-catalogs",
      name: "Static Itinerary & Knowledge Data",
      description: "Canonical data stores for Shanghai (Days 1–5), Beijing (Days 6–9), tickets, deadlines, and dining",
      nodeIds: [
        "file:src/data/daysCatalog.ts",
        "file:src/data/needToKnowData.ts",
        "file:src/data/shanghai/day01.ts",
        "file:src/data/shanghai/day02.ts",
        "file:src/data/shanghai/day03.ts",
        "file:src/data/shanghai/day04.ts",
        "file:src/data/shanghai/day05.ts",
        "file:src/data/beijing/day06.ts",
        "file:src/data/beijing/day07.ts",
        "file:src/data/beijing/day08.ts",
        "file:src/data/beijing/day09.ts",
        "file:src/types/itinerary.ts"
      ]
    },
    {
      id: "layer:integrations-and-utilities",
      name: "External Integrations & Utilities",
      description: "Amap deep-linking, DiDi driver clipboard assistance, Google Sheets TSV exporter, and local persistence",
      nodeIds: [
        "file:src/utils/maps.ts",
        "file:src/utils/didi.ts",
        "file:src/utils/sheetExport.ts",
        "file:src/utils/storage.ts"
      ]
    }
  ],
  nodes: [
    {
      id: "file:src/main.tsx",
      name: "main.tsx",
      type: "code",
      filePath: "src/main.tsx",
      summary: "Application bootstrap mounting React 19 root and wrapping with LanguageProvider",
      tags: ["entry", "bootstrap", "react-dom"]
    },
    {
      id: "file:src/App.tsx",
      name: "App.tsx",
      type: "code",
      filePath: "src/App.tsx",
      summary: "Root container orchestrating day selection (1-9), triple view mode (timeline/route-map/need-to-know), photo lightbox, and modals",
      tags: ["orchestrator", "layout", "view-controller"]
    },
    {
      id: "file:src/context/LanguageContext.tsx",
      name: "LanguageContext.tsx",
      type: "code",
      filePath: "src/context/LanguageContext.tsx",
      summary: "Bilingual Context provider defaulting to Thai ('th') with English ('en') toggle and localStorage persistence",
      tags: ["i18n", "context", "state"]
    },
    {
      id: "file:src/i18n/translations.ts",
      name: "translations.ts",
      type: "code",
      filePath: "src/i18n/translations.ts",
      summary: "Type-safe translation dictionaries for system UI strings while leaving Chinese text and place names untouched",
      tags: ["i18n", "dictionary", "types"]
    },
    {
      id: "file:src/hooks/useItineraryStorage.ts",
      name: "useItineraryStorage.ts",
      type: "code",
      filePath: "src/hooks/useItineraryStorage.ts",
      summary: "State hook synchronizing day custom entries, checklist completion Set, and version migration in localStorage",
      tags: ["hook", "storage", "persistence"]
    },
    {
      id: "file:src/hooks/useDayProgress.ts",
      name: "useDayProgress.ts",
      type: "code",
      filePath: "src/hooks/useDayProgress.ts",
      summary: "Calculates checkpoint stats: totalStops, completedCount, completion percent, and nextUncompletedStop",
      tags: ["hook", "metrics", "progression"]
    },
    {
      id: "file:src/components/ViewSwitcher.tsx",
      name: "ViewSwitcher.tsx",
      type: "code",
      filePath: "src/components/ViewSwitcher.tsx",
      summary: "Floating glassmorphism bottom bar allowing thumb switching between Timeline, Route Map, and Need to Know",
      tags: ["navigation", "mobile", "glassmorphism"]
    },
    {
      id: "file:src/components/RouteMapVisualizer.tsx",
      name: "RouteMapVisualizer.tsx",
      type: "code",
      filePath: "src/components/RouteMapVisualizer.tsx",
      summary: "Visual progression map displaying numbered pins, transit connectors (Walk/Metro/DiDi), status filter pills, and zoomable photos",
      tags: ["visualization", "route-map", "interactive"]
    },
    {
      id: "file:src/components/ImageViewerModal.tsx",
      name: "ImageViewerModal.tsx",
      type: "code",
      filePath: "src/components/ImageViewerModal.tsx",
      summary: "Fullscreen Lightbox modal for high-res uncropped photos with keyboard navigation, Amap and DiDi action buttons",
      tags: ["lightbox", "modal", "gallery"]
    },
    {
      id: "file:src/components/NeedToKnowPage.tsx",
      name: "NeedToKnowPage.tsx",
      type: "code",
      filePath: "src/components/NeedToKnowPage.tsx",
      summary: "4-tab master hub: Tickets Checklist, Critical Booking Deadlines, Boy & Jik Food Wishlist, and China Travel Survival Kit",
      tags: ["hub", "checklist", "knowledge-base"]
    },
    {
      id: "file:src/components/Timeline.tsx",
      name: "Timeline.tsx",
      type: "code",
      filePath: "src/components/Timeline.tsx",
      summary: "Continuous vertical journal timeline rendering sequenced checkpoint stops and transit connector legs",
      tags: ["timeline", "layout", "journal"]
    },
    {
      id: "file:src/components/TimelineStop.tsx",
      name: "TimelineStop.tsx",
      type: "code",
      filePath: "src/components/TimelineStop.tsx",
      summary: "Individual checkpoint stop card with checkbox, bilingual titles, photo thumbnail, Amap link, and DiDi copy button",
      tags: ["checkpoint", "card", "interactive"]
    },
    {
      id: "file:src/components/TimelineRoute.tsx",
      name: "TimelineRoute.tsx",
      type: "code",
      filePath: "src/components/TimelineRoute.tsx",
      summary: "Transit leg connector between stops displaying transport icon, duration, walking notes, and Amap directions",
      tags: ["transit", "connector", "route"]
    },
    {
      id: "file:src/components/LocationCarousel.tsx",
      name: "LocationCarousel.tsx",
      type: "code",
      filePath: "src/components/LocationCarousel.tsx",
      summary: "Horizontal photo reel with 2-second auto-scrolling, touch guard, checkpoint badges, and zoom triggers",
      tags: ["carousel", "visual-reel", "photos"]
    },
    {
      id: "file:src/components/Header.tsx",
      name: "Header.tsx",
      type: "code",
      filePath: "src/components/Header.tsx",
      summary: "Sticky top brand header with localized Buddhist/Gregorian date, [TH|EN] toggle, PDF print, and Sheets export",
      tags: ["header", "branding", "actions"]
    },
    {
      id: "file:src/components/DayNavigation.tsx",
      name: "DayNavigation.tsx",
      type: "code",
      filePath: "src/components/DayNavigation.tsx",
      summary: "Horizontal swipeable day pill bar grouping Shanghai (Days 1-5), Beijing (Days 6-9), and Need to Know shortcut",
      tags: ["navigation", "day-selector", "tabs"]
    },
    {
      id: "file:src/components/NextStopBar.tsx",
      name: "NextStopBar.tsx",
      type: "code",
      filePath: "src/components/NextStopBar.tsx",
      summary: "Sticky bottom floating bar highlighting next pending stop with quick map routing and DiDi Chinese copy",
      tags: ["floating-bar", "quick-access", "mobile"]
    },
    {
      id: "file:src/components/HotelCard.tsx",
      name: "HotelCard.tsx",
      type: "code",
      filePath: "src/components/HotelCard.tsx",
      summary: "Lodging details card with subway access, English/Chinese address, copy button, and Amap route navigation",
      tags: ["hotel", "card", "navigation"]
    },
    {
      id: "file:src/components/ProgressBar.tsx",
      name: "ProgressBar.tsx",
      type: "code",
      filePath: "src/components/ProgressBar.tsx",
      summary: "Compact visual progress bar tracking daily checkpoint completion percentage",
      tags: ["progress", "gamification", "feedback"]
    },
    {
      id: "file:src/components/RouteSummary.tsx",
      name: "RouteSummary.tsx",
      type: "code",
      filePath: "src/components/RouteSummary.tsx",
      summary: "Daily overview card listing time range, stops count, estimated duration, DiDi cost, and walking clusters",
      tags: ["summary", "overview", "metadata"]
    },
    {
      id: "file:src/components/PlanEditorModal.tsx",
      name: "PlanEditorModal.tsx",
      type: "code",
      filePath: "src/components/PlanEditorModal.tsx",
      summary: "Modal dialog enabling traveler customization of checkpoint titles, times, and notes with local save and reset",
      tags: ["editor", "modal", "customization"]
    },
    {
      id: "file:src/components/Toast.tsx",
      name: "Toast.tsx",
      type: "code",
      filePath: "src/components/Toast.tsx",
      summary: "Subtle temporary notification popup confirming clipboard copy and export actions",
      tags: ["toast", "feedback", "ui"]
    },
    {
      id: "file:src/data/daysCatalog.ts",
      name: "daysCatalog.ts",
      type: "data",
      filePath: "src/data/daysCatalog.ts",
      summary: "Master catalog array defining all 9 trip days, city assignments, dates, route titles, and statuses",
      tags: ["catalog", "metadata", "itinerary"]
    },
    {
      id: "file:src/data/needToKnowData.ts",
      name: "needToKnowData.ts",
      type: "data",
      filePath: "src/data/needToKnowData.ts",
      summary: "Authoritative data store containing 17 master tickets, exact booking alarms, 17 curated dining spots, and travel survival rules",
      tags: ["data", "tickets", "food", "survival"]
    },
    {
      id: "file:src/data/shanghai/day01.ts",
      name: "day01.ts (Shanghai)",
      type: "data",
      filePath: "src/data/shanghai/day01.ts",
      summary: "Day 1 itinerary: Pudong Airport arrival, Maglev, Jing'an Temple, People's Sq, The Bund, Riverside Promenade",
      tags: ["itinerary", "shanghai", "day-plan"]
    },
    {
      id: "file:src/data/shanghai/day02.ts",
      name: "day02.ts (Shanghai)",
      type: "data",
      filePath: "src/data/shanghai/day02.ts",
      summary: "Day 2 itinerary: French Concession tree-lined walk, Fuxing Park, Sinan Mansions, Xintiandi, Long Time Ago skewers",
      tags: ["itinerary", "shanghai", "day-plan"]
    },
    {
      id: "file:src/data/shanghai/day03.ts",
      name: "day03.ts (Shanghai)",
      type: "data",
      filePath: "src/data/shanghai/day03.ts",
      summary: "Day 3 itinerary: Rockbund Christmas Market, Suzhou Creek heritage walk, Lujiazui Megatowers, Lai Lai Xiao Long",
      tags: ["itinerary", "shanghai", "day-plan"]
    },
    {
      id: "file:src/data/shanghai/day04.ts",
      name: "day04.ts (Shanghai)",
      type: "data",
      filePath: "src/data/shanghai/day04.ts",
      summary: "Day 4 itinerary: Shanghai Disneyland Day 1 entry from 15:00, Tron Lightcycle, Pirates of the Caribbean, Evening Castle Fireworks",
      tags: ["itinerary", "disney", "shanghai"]
    },
    {
      id: "file:src/data/shanghai/day05.ts",
      name: "day05.ts (Shanghai)",
      type: "data",
      filePath: "src/data/shanghai/day05.ts",
      summary: "Day 5 itinerary: Disneyland Rope Drop (Zootopia Hot Pursuit), Evening G28 High-Speed Rail transfer to Beijing",
      tags: ["itinerary", "disney", "bullet-train"]
    },
    {
      id: "file:src/data/beijing/day06.ts",
      name: "day06.ts (Beijing)",
      type: "data",
      filePath: "src/data/beijing/day06.ts",
      summary: "Day 6 itinerary: Wangfujing morning walk, The Forbidden City / Palace Museum, Jingshan Park panoramic sunset",
      tags: ["itinerary", "beijing", "forbidden-city"]
    },
    {
      id: "file:src/data/beijing/day07.ts",
      name: "day07.ts (Beijing)",
      type: "data",
      filePath: "src/data/beijing/day07.ts",
      summary: "Day 7 itinerary: Temple of Heaven Echo Wall & Hall of Prayer, Dashilar Hutongs, APM Huoluhuo BBQ buffet",
      tags: ["itinerary", "beijing", "temple-of-heaven"]
    },
    {
      id: "file:src/data/beijing/day08.ts",
      name: "day08.ts (Beijing)",
      type: "data",
      filePath: "src/data/beijing/day08.ts",
      summary: "Day 8 itinerary: Mutianyu Great Wall (Cable car & Toboggan), Olympic Park Bird's Nest & Water Cube illumination",
      tags: ["itinerary", "beijing", "great-wall"]
    },
    {
      id: "file:src/data/beijing/day09.ts",
      name: "day09.ts (Beijing)",
      type: "data",
      filePath: "src/data/beijing/day09.ts",
      summary: "Day 9 itinerary: Summer Palace Longevity Hill & Kunming Lake, 798 Art Zone, Daxing International Airport departure",
      tags: ["itinerary", "beijing", "summer-palace"]
    },
    {
      id: "file:src/types/itinerary.ts",
      name: "itinerary.ts (Types)",
      type: "code",
      filePath: "src/types/itinerary.ts",
      summary: "TypeScript data contracts for DayPlan, StopTimelineEntry, RouteTimelineEntry, HotelInfo, and RouteSummaryInfo",
      tags: ["types", "contracts", "domain"]
    },
    {
      id: "file:src/utils/maps.ts",
      name: "maps.ts",
      type: "code",
      filePath: "src/utils/maps.ts",
      summary: "Amap (Gaode) URL builder and geo-coordinates resolver for China mapping",
      tags: ["maps", "amap", "geolocation"]
    },
    {
      id: "file:src/utils/didi.ts",
      name: "didi.ts",
      type: "code",
      filePath: "src/utils/didi.ts",
      summary: "Clipboard helper formatting bilingual destination names and Chinese addresses for DiDi taxi driver communication",
      tags: ["didi", "clipboard", "driver-assist"]
    },
    {
      id: "file:src/utils/sheetExport.ts",
      name: "sheetExport.ts",
      type: "code",
      filePath: "src/utils/sheetExport.ts",
      summary: "Exports formatted TSV tab-delimited day tables for copy-pasting directly into Google Sheets starting at cell A12",
      tags: ["export", "google-sheets", "tsv"]
    },
    {
      id: "file:src/utils/storage.ts",
      name: "storage.ts",
      type: "code",
      filePath: "src/utils/storage.ts",
      summary: "LocalStorage key managers for active day, completed checkboxes, and plan version migration",
      tags: ["storage", "persistence", "migration"]
    }
  ],
  edges: [
    { id: "e1", source: "file:src/main.tsx", target: "file:src/App.tsx", type: "renders", label: "Mounts" },
    { id: "e2", source: "file:src/main.tsx", target: "file:src/context/LanguageContext.tsx", type: "imports", label: "Wraps LanguageProvider" },
    { id: "e3", source: "file:src/context/LanguageContext.tsx", target: "file:src/i18n/translations.ts", type: "imports", label: "Loads TH/EN dictionaries" },
    { id: "e4", source: "file:src/App.tsx", target: "file:src/hooks/useItineraryStorage.ts", type: "imports", label: "Invokes plan & completion storage" },
    { id: "e5", source: "file:src/App.tsx", target: "file:src/hooks/useDayProgress.ts", type: "imports", label: "Invokes metrics engine" },
    { id: "e6", source: "file:src/App.tsx", target: "file:src/context/LanguageContext.tsx", type: "imports", label: "Reads active locale & dict" },
    { id: "e7", source: "file:src/App.tsx", target: "file:src/components/Header.tsx", type: "renders", label: "Renders top bar" },
    { id: "e8", source: "file:src/App.tsx", target: "file:src/components/DayNavigation.tsx", type: "renders", label: "Renders day tabs" },
    { id: "e9", source: "file:src/App.tsx", target: "file:src/components/ViewSwitcher.tsx", type: "renders", label: "Renders floating view switcher" },
    { id: "e10", source: "file:src/App.tsx", target: "file:src/components/Timeline.tsx", type: "renders", label: "Renders when mode=timeline" },
    { id: "e11", source: "file:src/App.tsx", target: "file:src/components/RouteMapVisualizer.tsx", type: "renders", label: "Renders when mode=route-map" },
    { id: "e12", source: "file:src/App.tsx", target: "file:src/components/NeedToKnowPage.tsx", type: "renders", label: "Renders when mode=need-to-know" },
    { id: "e13", source: "file:src/App.tsx", target: "file:src/components/ImageViewerModal.tsx", type: "renders", label: "Renders on photo click" },
    { id: "e14", source: "file:src/App.tsx", target: "file:src/components/NextStopBar.tsx", type: "renders", label: "Renders on timeline view" },
    { id: "e15", source: "file:src/App.tsx", target: "file:src/components/LocationCarousel.tsx", type: "renders", label: "Renders photo reel" },
    { id: "e16", source: "file:src/App.tsx", target: "file:src/components/HotelCard.tsx", type: "renders", label: "Renders lodging info" },
    { id: "e17", source: "file:src/App.tsx", target: "file:src/components/ProgressBar.tsx", type: "renders", label: "Renders completion rate" },
    { id: "e18", source: "file:src/App.tsx", target: "file:src/components/PlanEditorModal.tsx", type: "renders", label: "Renders customization modal" },
    { id: "e19", source: "file:src/App.tsx", target: "file:src/components/Toast.tsx", type: "renders", label: "Displays clipboard alerts" },
    { id: "e20", source: "file:src/App.tsx", target: "file:src/data/daysCatalog.ts", type: "imports", label: "Reads days list" },
    { id: "e21", source: "file:src/App.tsx", target: "file:src/data/shanghai/day01.ts", type: "imports", label: "Reads Day 1 plan" },
    { id: "e22", source: "file:src/App.tsx", target: "file:src/data/shanghai/day02.ts", type: "imports", label: "Reads Day 2 plan" },
    { id: "e23", source: "file:src/App.tsx", target: "file:src/data/shanghai/day03.ts", type: "imports", label: "Reads Day 3 plan" },
    { id: "e24", source: "file:src/App.tsx", target: "file:src/data/shanghai/day04.ts", type: "imports", label: "Reads Day 4 plan" },
    { id: "e25", source: "file:src/App.tsx", target: "file:src/data/shanghai/day05.ts", type: "imports", label: "Reads Day 5 plan" },
    { id: "e26", source: "file:src/App.tsx", target: "file:src/data/beijing/day06.ts", type: "imports", label: "Reads Day 6 plan" },
    { id: "e27", source: "file:src/App.tsx", target: "file:src/data/beijing/day07.ts", type: "imports", label: "Reads Day 7 plan" },
    { id: "e28", source: "file:src/App.tsx", target: "file:src/data/beijing/day08.ts", type: "imports", label: "Reads Day 8 plan" },
    { id: "e29", source: "file:src/App.tsx", target: "file:src/data/beijing/day09.ts", type: "imports", label: "Reads Day 9 plan" },
    { id: "e30", source: "file:src/Timeline.tsx", target: "file:src/components/TimelineStop.tsx", type: "renders", label: "Renders stop items" },
    { id: "e31", source: "file:src/Timeline.tsx", target: "file:src/components/TimelineRoute.tsx", type: "renders", label: "Renders transit legs" },
    { id: "e32", source: "file:src/components/TimelineStop.tsx", target: "file:src/utils/maps.ts", type: "calls", label: "Launches Amap" },
    { id: "e33", source: "file:src/components/TimelineStop.tsx", target: "file:src/utils/didi.ts", type: "calls", label: "Copies Chinese name" },
    { id: "e34", source: "file:src/components/TimelineRoute.tsx", target: "file:src/utils/maps.ts", type: "calls", label: "Opens transit map" },
    { id: "e35", source: "file:src/components/RouteMapVisualizer.tsx", target: "file:src/utils/maps.ts", type: "calls", label: "Opens Amap pin" },
    { id: "e36", source: "file:src/components/RouteMapVisualizer.tsx", target: "file:src/utils/didi.ts", type: "calls", label: "Copies Chinese text" },
    { id: "e37", source: "file:src/components/ImageViewerModal.tsx", target: "file:src/utils/maps.ts", type: "calls", label: "Amap shortcut" },
    { id: "e38", source: "file:src/components/ImageViewerModal.tsx", target: "file:src/utils/didi.ts", type: "calls", label: "DiDi shortcut" },
    { id: "e39", source: "file:src/components/NextStopBar.tsx", target: "file:src/utils/maps.ts", type: "calls", label: "Quick Amap" },
    { id: "e40", source: "file:src/components/NextStopBar.tsx", target: "file:src/utils/didi.ts", type: "calls", label: "Quick DiDi" },
    { id: "e41", source: "file:src/components/HotelCard.tsx", target: "file:src/utils/maps.ts", type: "calls", label: "Amap hotel routing" },
    { id: "e42", source: "file:src/components/HotelCard.tsx", target: "file:src/utils/didi.ts", type: "calls", label: "Copies hotel address" },
    { id: "e43", source: "file:src/components/Header.tsx", target: "file:src/utils/sheetExport.ts", type: "calls", label: "Exports Google Sheets TSV" },
    { id: "e44", source: "file:src/components/NeedToKnowPage.tsx", target: "file:src/data/needToKnowData.ts", type: "imports", label: "Loads tickets & dining" },
    { id: "e45", source: "file:src/hooks/useItineraryStorage.ts", target: "file:src/utils/storage.ts", type: "calls", label: "Reads & writes localStorage" }
  ],
  tour: [
    {
      id: "step-1-entry",
      title: "1. Application Bootstrap & Locale Provider",
      description: "Execution begins in main.tsx, wrapping App with LanguageProvider. The provider loads language preference ('th' default) from localStorage and injects type-safe translations.",
      nodeIds: ["file:src/main.tsx", "file:src/context/LanguageContext.tsx", "file:src/i18n/translations.ts"]
    },
    {
      id: "step-2-coordinator",
      title: "2. Master App Layout & Multi-View State",
      description: "App.tsx acts as the primary coordinator. It reads the active day (1–9), queries useItineraryStorage and useDayProgress, and controls the 3 view modes: Timeline, Route Map Visualizer, and Need to Know.",
      nodeIds: ["file:src/App.tsx", "file:src/components/ViewSwitcher.tsx", "file:src/hooks/useItineraryStorage.ts", "file:src/hooks/useDayProgress.ts"]
    },
    {
      id: "step-3-timeline",
      title: "3. Journal Timeline & Transit Engine",
      description: "The Timeline component renders sequenced checkpoints (TimelineStop) with checkboxes and transit connections (TimelineRoute) indicating walk times, metro lines, and taxi costs.",
      nodeIds: ["file:src/components/Timeline.tsx", "file:src/components/TimelineStop.tsx", "file:src/components/TimelineRoute.tsx"]
    },
    {
      id: "step-4-route-map",
      title: "4. Interactive Route Map Progression Visualizer",
      description: "RouteMapVisualizer maps the day's journey into an interactive node progression spine with status filters (All, Pending, Visited), transit badges, and direct links to full resolution photos.",
      nodeIds: ["file:src/components/RouteMapVisualizer.tsx", "file:src/components/ImageViewerModal.tsx"]
    },
    {
      id: "step-5-need-to-know",
      title: "5. Things We Need to Know Master Hub",
      description: "NeedToKnowPage provides 4 tabs: Ticket Master Checklist with local progress, Critical Booking Deadlines with Bangkok alarm times, Boy & Jik Food Guide, and China Survival Kit.",
      nodeIds: ["file:src/components/NeedToKnowPage.tsx", "file:src/data/needToKnowData.ts"]
    },
    {
      id: "step-6-utilities",
      title: "6. China Travel Utilities & PWA Architecture",
      description: "External utility bridges resolve Amap (Gaode) deep links, format destination addresses in Chinese for DiDi drivers, export TSV tables to Google Sheets, and enable offline PWA caching.",
      nodeIds: ["file:src/utils/maps.ts", "file:src/utils/didi.ts", "file:src/utils/sheetExport.ts", "file:src/utils/storage.ts"]
    }
  ]
};

const outputPath = path.resolve('.ua/knowledge-graph.json');
fs.writeFileSync(outputPath, JSON.stringify(knowledgeGraph, null, 2), 'utf-8');
console.log('Successfully written knowledge-graph.json to', outputPath);
