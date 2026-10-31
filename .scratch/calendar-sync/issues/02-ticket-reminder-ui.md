# T-02: Ticket Booking Reminder UI in NeedToKnowPage

**Status:** ready-for-agent  
**Blocked by:** T-01  
**Assigned:** unassigned  

## Goal
Add intuitive calendar reminder actions in `src/components/NeedToKnowPage.tsx` for all `must_book` tickets that are not yet purchased, and inside Tab 2 (Critical Booking Deadlines).

## Acceptance Criteria
- [ ] For unpurchased tickets with `initialStatus: "must_book"`, display a prominent "⏰ เพิ่มแจ้งเตือน Calendar" button.
- [ ] Clicking triggers a clean interactive popover/dropdown with:
  1. "📅 วันเปิดจองจริง (เวลาเป๊ะ)" -> Opens Google Calendar URL.
  2. "⏰ เตือนล่วงหน้า 1 วัน (07:30 น.)" -> Opens Google Calendar URL with reminder event.
  3. "📥 ดาวน์โหลดไฟล์ .ics (เตือนครบทุกรอบ)" -> Downloads `.ics` file with pre-set native alarms.
- [ ] In Tab 2 (Deadlines timeline), add calendar action to each urgent timeline card (G28 Train, Disney Pass, Disney Early Entry, Forbidden City, Rockbund).
