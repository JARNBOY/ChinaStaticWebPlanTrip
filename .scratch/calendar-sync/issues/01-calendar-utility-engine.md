# T-01: Calendar URL & .ics Utility Engine

**Status:** ready-for-agent  
**Blocked by:** none (Frontier)  
**Assigned:** unassigned  

## Goal
Implement `src/utils/calendar.ts` to generate Google Calendar Web Intent URLs and RFC 5545 `.ics` blobs for static client-side calendar integration without backends or OAuth.

## Acceptance Criteria
- [ ] `buildGoogleCalendarUrl(event)` returns valid `https://calendar.google.com/calendar/render?action=TEMPLATE...` URL with encoded parameters.
- [ ] `generateIcsBlob(events)` produces valid RFC 5545 VCALENDAR text with `VEVENT`, `DTSTART`, `DTEND`, `SUMMARY`, `DESCRIPTION`, and `VALARM`.
- [ ] `getTicketCalendarOptions(ticket)` derives exact deadline event and 1-day advance reminder (at 07:30 AM Bangkok time).
- [ ] `getDayItineraryCalendarOptions(day)` builds all-day summary event and individual stop events for a day.
