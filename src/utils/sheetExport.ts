import type { TimelineEntry } from "../types/itinerary";

/**
 * Formats a day's timeline entries into TSV (Tab-Separated Values)
 * matching the Google Sheets columns:
 * Col A: Checkbox (FALSE)
 * Col B: Date (e.g. 26/12)
 * Col C: Activity (Time + Name + Chinese Title)
 * Col D: Notes (Duration, Cost, Transport, Tips, Address)
 * Col E: Amap Link
 */
export function formatDayToSheetTSV(dateStr: string, entries: TimelineEntry[]): string {
  const [, month, d] = dateStr.split("-");
  const dateFormatted = `${parseInt(d, 10)}/${parseInt(month, 10)}`;

  const rows: string[] = [];
  let isFirst = true;

  entries.forEach((entry) => {
    const colA = "FALSE";
    const colB = isFirst ? dateFormatted : "";
    isFirst = false;

    let activity = `${entry.time} น. ${entry.title}`;
    if (entry.chineseTitle) {
      activity += ` (${entry.chineseTitle})`;
    }

    const notesParts: string[] = [];
    if (entry.duration) notesParts.push(`⏱️ ${entry.duration}`);
    if (entry.cost) notesParts.push(`💰 ${entry.cost}`);
    if (entry.transport) notesParts.push(`🚗 ${entry.transport}`);
    if (entry.note) notesParts.push(entry.note.replace(/[\r\n\t]+/g, " ").trim());
    if (entry.address) notesParts.push(`📍 ${entry.address.replace(/[\r\n\t]+/g, " ").trim()}`);

    const colD = notesParts.join(" | ");
    const colE = entry.mapUrl || "";

    rows.push(`${colA}\t${colB}\t${activity}\t${colD}\t${colE}`);
  });

  return rows.join("\n");
}

/**
 * Copies the formatted day plan to clipboard
 */
export async function copyDayForGoogleSheets(
  dateStr: string,
  entries: TimelineEntry[]
): Promise<boolean> {
  const tsv = formatDayToSheetTSV(dateStr, entries);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(tsv);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = tsv;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error("Failed to copy TSV to clipboard:", err);
    return false;
  }
}
