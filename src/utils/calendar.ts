import type { TicketItem } from "../data/needToKnowData";
import type { DayPlan, StopTimelineEntry } from "../types/itinerary";

export interface CalendarEvent {
  title: string;
  description: string;
  location?: string;
  startDate: string; // ISO format e.g. "2026-12-16T12:30:00" or date "2026-12-16"
  endDate?: string;   // ISO format e.g. "2026-12-16T13:00:00" or date "2026-12-17"
  allDay?: boolean;
  alarmMinutesBefore?: number[]; // e.g. [1440, 15] (1440 = 24h)
}

/**
 * Converts a Bangkok (UTC+7) ISO string or date into UTC string YYYYMMDDTHHmmssZ
 */
function formatUtcDate(dateStr: string, isEnd = false, allDay = false): string {
  if (allDay) {
    // For all-day events, dateStr is "YYYY-MM-DD"
    const cleanDate = dateStr.split("T")[0].replace(/-/g, "");
    if (isEnd) {
      // Google Calendar all-day end date is exclusive (day + 1)
      const parts = dateStr.split("T")[0].split("-").map(Number);
      const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + 1));
      return d.toISOString().split("T")[0].replace(/-/g, "");
    }
    return cleanDate;
  }

  // Parse as Bangkok time (UTC+7)
  // Example: "2026-12-16T12:30:00" -> subtract 7 hours -> 05:30:00 UTC
  const [datePart, timePart] = dateStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second = 0] = (timePart || "00:00:00").split(":").map(Number);

  const utcTimestamp = Date.UTC(year, month - 1, day, hour - 7, minute, second);
  const d = new Date(utcTimestamp);

  const pad = (n: number) => String(n).padStart(2, "0");
  const y = d.getUTCFullYear();
  const m = pad(d.getUTCMonth() + 1);
  const dt = pad(d.getUTCDate());
  const h = pad(d.getUTCHours());
  const min = pad(d.getUTCMinutes());
  const s = pad(d.getUTCSeconds());

  return `${y}${m}${dt}T${h}${min}${s}Z`;
}

/**
 * Generates a direct Google Calendar Web Intent URL
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const allDay = !!event.allDay;
  const startFormatted = formatUtcDate(event.startDate, false, allDay);
  
  // Default duration 30 mins if endDate not provided
  let endFormatted = startFormatted;
  if (allDay) {
    endFormatted = formatUtcDate(event.endDate || event.startDate, true, true);
  } else if (event.endDate) {
    endFormatted = formatUtcDate(event.endDate, true, false);
  } else {
    // 30 min duration
    const [dPart, tPart] = event.startDate.split("T");
    const [year, month, day] = dPart.split("-").map(Number);
    const [hour, minute] = (tPart || "00:00").split(":").map(Number);
    const endMinutes = minute + 30;
    const endHour = hour + Math.floor(endMinutes / 60);
    const remMin = endMinutes % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    const endDateStr = `${year}-${pad(month)}-${pad(day)}T${pad(endHour)}:${pad(remMin)}:00`;
    endFormatted = formatUtcDate(endDateStr, true, false);
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startFormatted}/${endFormatted}`,
    details: event.description,
  });

  if (event.location) {
    params.set("location", event.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates RFC 5545 iCalendar content string
 */
export function generateIcsContent(events: CalendarEvent | CalendarEvent[]): string {
  const eventList = Array.isArray(events) ? events : [events];
  const nowUtc = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  let ics = "BEGIN:VCALENDAR\r\n";
  ics += "VERSION:2.0\r\n";
  ics += "PRODID:-//ChinaStaticWebPlanTrip//TH\r\n";
  ics += "CALSCALE:GREGORIAN\r\n";
  ics += "METHOD:PUBLISH\r\n";

  eventList.forEach((ev, idx) => {
    const allDay = !!ev.allDay;
    const startFormatted = formatUtcDate(ev.startDate, false, allDay);
    let endFormatted = startFormatted;
    if (allDay) {
      endFormatted = formatUtcDate(ev.endDate || ev.startDate, true, true);
    } else if (ev.endDate) {
      endFormatted = formatUtcDate(ev.endDate, true, false);
    }

    const uid = `china-trip-${idx}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}@chinatrip.app`;
    const cleanDesc = (ev.description || "").replace(/\n/g, "\\n").replace(/,/g, "\\,");
    const cleanTitle = (ev.title || "").replace(/,/g, "\\,");
    const cleanLoc = (ev.location || "").replace(/,/g, "\\,");

    ics += "BEGIN:VEVENT\r\n";
    ics += `UID:${uid}\r\n`;
    ics += `DTSTAMP:${nowUtc}\r\n`;

    if (allDay) {
      ics += `DTSTART;VALUE=DATE:${startFormatted}\r\n`;
      ics += `DTEND;VALUE=DATE:${endFormatted}\r\n`;
    } else {
      ics += `DTSTART:${startFormatted}\r\n`;
      ics += `DTEND:${endFormatted}\r\n`;
    }

    ics += `SUMMARY:${cleanTitle}\r\n`;
    ics += `DESCRIPTION:${cleanDesc}\r\n`;
    if (cleanLoc) {
      ics += `LOCATION:${cleanLoc}\r\n`;
    }

    // Embedded alarms
    const alarms = ev.alarmMinutesBefore || [1440, 15]; // Default: 1 day & 15 min
    alarms.forEach((mins) => {
      ics += "BEGIN:VALARM\r\n";
      ics += "ACTION:DISPLAY\r\n";
      ics += `DESCRIPTION:Reminder: ${cleanTitle}\r\n`;
      ics += `TRIGGER:-PT${mins}M\r\n`;
      ics += "END:VALARM\r\n";
    });

    ics += "END:VEVENT\r\n";
  });

  ics += "END:VCALENDAR\r\n";
  return ics;
}

/**
 * Downloads a generated .ics file to traveler device
 */
export function downloadIcsFile(filename: string, events: CalendarEvent | CalendarEvent[]): void {
  const content = generateIcsContent(events);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export interface TicketReminderOptions {
  exactEvent: CalendarEvent;
  advanceEvent: CalendarEvent;
  exactGoogleUrl: string;
  advanceGoogleUrl: string;
  icsFilename: string;
  allEvents: CalendarEvent[];
}

/**
 * Builds reminder events for must-book tickets (deadline day + 1 day advance at 07:30 AM)
 */
export function getTicketBookingReminders(ticket: TicketItem): TicketReminderOptions | null {
  if (!ticket.deadlineDate) return null;

  const deadlineISO = ticket.deadlineDate;
  const [datePart, rawTimePart = "09:00:00"] = deadlineISO.split("T");
  const timePart = (!rawTimePart || rawTimePart === "00:00:00" || rawTimePart === "00:00") ? "09:00:00" : rawTimePart;
  const [year, month, day] = datePart.split("-").map(Number);

  // Compute 1 day before
  const prevDate = new Date(year, month - 1, day - 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  const prevDateStr = `${prevDate.getFullYear()}-${pad(prevDate.getMonth() + 1)}-${pad(prevDate.getDate())}`;
  const advanceStartISO = `${prevDateStr}T07:30:00`;
  const advanceEndISO = `${prevDateStr}T08:00:00`;

  // Compute exact deadline end time (+30 min)
  const [h, m] = timePart.split(":").map(Number);
  const endMin = m + 30;
  const endH = h + Math.floor(endMin / 60);
  const deadlineStartISO = `${datePart}T${pad(h)}:${pad(m)}:00`;
  const deadlineEndISO = `${datePart}T${pad(endH)}:${pad(endMin % 60)}:00`;

  // Formatted deadline time label for human reading
  const deadlineTimeLabel = `${pad(h)}:${pad(m)} น.`;

  // 1. Exact Event (Day of booking at exact time)
  const exactEvent: CalendarEvent = {
    title: `🔴 [เปิดจองตั๋ว] ${ticket.nameTh}`,
    description: `สำคัญมาก: วันนี้ระบบเปิดจำหน่ายตั๋ว ${ticket.nameTh} เวลา ${deadlineTimeLabel} (เวลาไทย)!\n\n` +
      `ช่องทางจอง: ${ticket.bookingChannel}\n` +
      `คำแนะนำ: ${ticket.actionNote || ticket.deadlineDescription}\n` +
      `รายละเอียดตั๋ว: ${ticket.nameEn} (${ticket.city})\n\n` +
      `ทริปเซี่ยงไฮ้-ปักกิ่ง 25 ธ.ค. 2569 – 3 ม.ค. 2570`,
    location: ticket.bookingChannel,
    startDate: deadlineStartISO,
    endDate: deadlineEndISO,
    alarmMinutesBefore: [15, 5],
  };

  // 2. Advance Reminder Event (1 Day prior at 07:30 AM Bangkok time)
  const advanceEvent: CalendarEvent = {
    title: `⏰ [เตือนล่วงหน้า 1 วัน] เตรียมตัวจอง ${ticket.nameTh}`,
    description: `พรุ่งนี้ (${day}/${month} เวลา ${deadlineTimeLabel}) ระบบจะเปิดจอง ${ticket.nameTh}!\n\n` +
      `สิ่งที่ต้องเตรียมวันนี้:\n` +
      `1. ตรวจสอบล็อกอินแอป: ${ticket.bookingChannel}\n` +
      `2. กรอกข้อมูลพาสปอร์ตให้เรียบร้อยเพื่อความรวดเร็ว\n` +
      `3. ตั้งนาฬิกาปลุกก่อนเวลา 10 นาที\n\n` +
      `คำแนะนำ: ${ticket.actionNote || ticket.deadlineDescription}`,
    location: ticket.bookingChannel,
    startDate: advanceStartISO,
    endDate: advanceEndISO,
    alarmMinutesBefore: [10],
  };

  const exactGoogleUrl = buildGoogleCalendarUrl(exactEvent);
  const advanceGoogleUrl = buildGoogleCalendarUrl(advanceEvent);
  const icsFilename = `reminder-${ticket.id}.ics`;

  return {
    exactEvent,
    advanceEvent,
    exactGoogleUrl,
    advanceGoogleUrl,
    icsFilename,
    allEvents: [advanceEvent, exactEvent],
  };
}

/**
 * Builds calendar options for an entire day plan
 */
export function getDayItineraryCalendarOptions(day: DayPlan) {
  const stops = day.entries.filter((e): e is StopTimelineEntry => e.kind === "stop");

  // Format checklist summary
  const stopsSummaryText = stops
    .map(
      (s) =>
        `#${String(s.checkpointNumber).padStart(2, "0")} [${s.time}] ${s.title}${
          s.chineseTitle ? ` (${s.chineseTitle})` : ""
        }${s.duration ? ` - ${s.duration}` : ""}`
    )
    .join("\n");

  // 1. All-Day Summary Event
  const summaryEvent: CalendarEvent = {
    title: `🇨🇳 Day ${day.dayNumber}: ${day.routeTitle} (${day.city})`,
    description: `China Trip Itinerary — Day ${day.dayNumber} (${day.city})\n` +
      `เส้นทาง: ${day.routeTitle}\n` +
      `ไฮไลท์: ${day.routeSubtitle}\n\n` +
      `จุดแวะพักทั้งหมด (${stops.length} จุด):\n${stopsSummaryText}\n\n` +
      `โรงแรมที่พัก: ${day.hotel ? `${day.hotel.name} (${day.hotel.chineseName})` : "N/A"}\n` +
      `DiDi ประมาณการ: ${day.summary?.didiCostEstimate || "N/A"}\n` +
      `เวลาโดยประมาณ: ${day.summary?.timeRange || "N/A"} (${day.summary?.estimatedDuration || ""})`,
    location: day.hotel?.chineseAddress || day.city,
    startDate: day.date,
    endDate: day.date,
    allDay: true,
  };

  // 2. Individual Timed Stop Events (for .ics download)
  const detailedEvents: CalendarEvent[] = stops.map((s) => {
    // Format stop time e.g. "10:30"
    const [h = "09", m = "00"] = (s.time || "09:00").split(":");
    const startISO = `${day.date}T${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;

    // Guess 45-60 min duration for each stop
    const stopHour = Number(h);
    const stopMin = Number(m);
    const endMinutes = stopMin + 45;
    const endH = stopHour + Math.floor(endMinutes / 60);
    const pad = (n: number) => String(n).padStart(2, "0");
    const endISO = `${day.date}T${pad(endH)}:${pad(endMinutes % 60)}:00`;

    return {
      title: `#${String(s.checkpointNumber).padStart(2, "0")} ${s.title} ${
        s.chineseTitle ? `(${s.chineseTitle})` : ""
      }`,
      description: `China Trip Day ${day.dayNumber} Stop #${s.checkpointNumber}\n` +
        `เวลา: ${s.time} | เวลาที่ใช้: ${s.duration || "N/A"}\n` +
        `ที่อยู่: ${s.address || "—"}\n` +
        `บันทึก: ${s.note || "—"}\n` +
        `แผนที่ Amap: ${s.mapUrl || "N/A"}`,
      location: s.address || s.chineseTitle || s.title,
      startDate: startISO,
      endDate: endISO,
      alarmMinutesBefore: [15],
    };
  });

  return {
    summaryEvent,
    summaryGoogleUrl: buildGoogleCalendarUrl(summaryEvent),
    detailedEvents,
    icsFilename: `china-trip-day-${day.dayNumber}-${day.date}.ics`,
  };
}
