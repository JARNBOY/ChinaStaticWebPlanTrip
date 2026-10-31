# Wayfinder Map: Google Calendar Day Scheduling & Ticket Booking Alarms

## Destination
A complete, zero-friction Google Calendar integration in `ChinaStaticWebPlanTrip` allowing travelers to:
1. Schedule any day's travel itinerary into Google Calendar with 1 click.
2. Set calendar reminders for unpurchased tickets with critical booking deadlines (e.g. G28 Bullet Train on 16/12 at 12:30, plus 1-day advance alarms on 15/12 at 07:30 AM).

## Notes
- **Context Pointers**: `docs/adr/0003-calendar-schedule-and-booking-reminders.md`, `src/data/needToKnowData.ts`, `src/types/itinerary.ts`, `src/utils/sheetExport.ts`.
- **Constraint**: Must remain 100% static, client-side, and offline-compatible (PWA), requiring zero OAuth2 consent screens or backend dependencies.
- **Bilingual**: Labels must support Thai (default) and English via `LanguageContext`.

## Decisions so far
- [ADR 0003](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/docs/adr/0003-calendar-schedule-and-booking-reminders.md): Client-Side Web Intent URL Templates + Dynamic `.ics` RFC 5545 Export chosen over backend Python Google Antigravity SDK Agent.

## Frontier Tickets
- [T-01: Calendar URL & .ics Utility Engine](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/.scratch/calendar-sync/issues/01-calendar-utility-engine.md): Build `src/utils/calendar.ts` supporting Google Calendar Web Intent URLs and RFC 5545 `.ics` blobs with `VALARM`.
- [T-02: Ticket Booking Reminder UI in NeedToKnowPage](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/.scratch/calendar-sync/issues/02-ticket-reminder-ui.md): Add dual-action reminder buttons ("วันเปิดจองจริง" / "เตือนล่วงหน้า 1 วัน 07:30 น.") to all unpurchased `must_book` ticket cards and timeline deadlines.
- [T-03: Day Itinerary Calendar Export in Header & Summary](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/.scratch/calendar-sync/issues/03-day-itinerary-calendar-export.md): Add "📅 Add Day to Calendar" button in `Header.tsx` and `RouteSummary.tsx` with single-day event or full timeline `.ics` export.
- [T-04: Bilingual Translations & Verification](file:///Users/paponsuapmongkonchai/ChinaStaticWebPlanTrip/.scratch/calendar-sync/issues/04-translations-and-verification.md): Update `translations.ts` with all calendar labels and run `npm run build` and `npm run lint`.

## Not yet specified
- Push notification service worker integration (requires background push subscription and server vapid keys, currently out of scope).

## Out of scope
- Two-way calendar sync (requires full Google OAuth2 server infrastructure and user account database).
