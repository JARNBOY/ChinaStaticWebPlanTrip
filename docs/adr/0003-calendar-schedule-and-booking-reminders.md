# ADR 0003: Client-Side Calendar Integration vs. Google Antigravity SDK Agent

## Status
Proposed (Grilling & Discovery Phase)

## Context
The user requested adding two Google Calendar capabilities to the `ChinaStaticWebPlanTrip` application:
1. **Daily Itinerary Export**: A button on each day's plan (Days 1–9) to schedule the travel itinerary into Google Calendar.
2. **Ticket Booking Reminders**: For unpurchased tickets with critical deadlines (e.g. G28 Bullet Train opening on 16/12/2026 at 12:30), provide one-click buttons to add calendar reminders both on the deadline date and in advance (e.g. 15/12/2026 at 07:30 AM and 16/12/2026 at 07:30 AM).

The user also asked to research and compare this against the **Google Antigravity SDK (`google-antigravity-sdk`)** to evaluate how features can connect.

## Options Considered

### Option A: Client-Side Web Intent URL Templates + Dynamic RFC 5545 `.ics` Export (Recommended)
- **Mechanism**:
  - Direct Google Calendar Web Intent URL (`https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=...&details=...&location=...`).
  - RFC 5545 iCalendar (`.ics`) file generated dynamically in-browser via JavaScript `Blob` with embedded `VALARM` triggers (1 day before, 15 min before).
- **Pros**:
  - **Zero Backend**: Preserves 100% of the project's static, offline-first PWA architecture.
  - **Zero OAuth Friction**: No Google Cloud Console project, no client secrets, no redirect URIs, and no Google OAuth consent screens for travelers.
  - **100% Offline Capability**: `.ics` files can be generated without network.
  - **Cross-Platform**: Works with Google Calendar, Apple Calendar (iOS/macOS), and Outlook.
- **Cons**:
  - Google Calendar web URLs cannot programmatically force background alarms via URL parameters (addressed by providing dual buttons: "วันเปิดจองจริง" and "เตือนล่วงหน้า 1 วัน 07:30 น.", plus `.ics` download which supports native `VALARM`).

### Option B: Google Antigravity SDK (`google-antigravity-sdk`) Agent / Backend Service
- **Mechanism**:
  - Run a Python backend service using the Google Antigravity SDK, connected to Gemini models and a Google Calendar MCP tool or Google Calendar REST API with OAuth2 tokens.
- **Pros**:
  - Can autonomously inspect a user's private Google Calendar to check availability, avoid conflicts, and insert events directly in the background.
- **Cons**:
  - **Breaks Static Web Architecture**: Requires hosting a Python server (FastAPI/Flask) alongside the Vercel static frontend.
  - **Requires Complex Auth**: Each traveler must log in via Google OAuth2 with `https://www.googleapis.com/auth/calendar.events` scope, requiring Google verification.
  - **Runtime & Cost**: Consumes LLM tokens and server resources for a task that is deterministic.

## Decision
Adopt **Option A**:
1. Implement a dedicated `src/utils/calendar.ts` utility providing:
   - `buildGoogleCalendarUrl(event)`
   - `generateIcsFile(event | event[])`
   - Pre-configured reminder generators for the 5 critical booking deadlines (15/12 & 16/12 for G28 Train, Disney Pass, Disney Early Entry, Forbidden City, Rockbund).
   - Full day itinerary calendar event generators.
2. Add interactive UI buttons in:
   - `src/components/Header.tsx` & `RouteSummary.tsx`: "📅 Add Day to Calendar"
   - `src/components/NeedToKnowPage.tsx`: "⏰ ตั้งเตือนใน Google Calendar" for each must-book ticket with dropdown:
     - `วันเปิดจองจริง (เวลาเป๊ะ)`
     - `เตือนล่วงหน้า 1 วัน (07:30 น.)`
     - `ดาวน์โหลดไฟล์ .ics (เตือนครบทุกรอบ)`
