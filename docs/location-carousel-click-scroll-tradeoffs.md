# Location Preview Carousel & Click-to-Scroll Architecture Tradeoffs

**Status**: Research Document  
**Date**: 2026-09-23  
**Context**: Adding a location preview carousel in the section immediately following the Route Summary (`07:00 — 21:20 · 17 stops (~14h 20m)`) with 2-second auto-scrolling, place name/image overlay, responsive scaling, and click-to-scroll navigation to timeline stops.

---

## 1. Executive Summary & Problem Framing

Travelers exploring Shanghai across 17 stops benefit from a visual, scannable overview of the day's destinations before scrolling through the granular vertical timeline. A horizontal preview carousel provides:
1. Immediate visual orientation (photo + English/Chinese name).
2. Rapid interactive jumping (clicking any card smoothly scrolls the vertical timeline directly to that stop's details).
3. Passive exploration via auto-scroll (2-second interval with user interaction pauses).

---

## 2. Technical Evaluation: Carousel Implementation Approach

### Option A: External Dependency (e.g., Swiper, Embla Carousel)
- **Pros**: Built-in touch physics, virtual slides.
- **Cons**: Adds 30KB–60KB bundle overhead, potential CSS conflict with the app's bespoke paper-journal design system, external update risk in an offline static PWA.

### Option B: Native CSS Scroll-Snap + React Controlled Scroll Engine (Recommended)
- **Pros**:
  - **Zero extra dependencies**: Zero bundle bloat, aligns with fast static Vite architecture.
  - **Native touch performance**: Leverages CSS `scroll-snap-type: x mandatory` and `scroll-behavior: smooth` on mobile devices with native 120Hz GPU compositor scrolling.
  - **Full accessibility**: Easily paused by checking `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  - **Resilient timer loop**: Uses standard React `useRef` + `setInterval` with automatic pause on hover (`mouseenter`/`mouseleave`) and touch (`touchstart`/`touchend`).
- **Cons**: Requires explicit handling of loop wraparound and resize observers (trivial with a clean custom component).

**Decision**: Option B is superior for this static, offline-capable travel web application.

---

## 3. Interaction Mechanics: Click-to-Scroll & Target Highlighting

### 3.1 Scroll Coordination
When a user clicks a carousel card representing stop `k`:
```typescript
const handleCardClick = (stopId: string) => {
  const targetElement = document.getElementById(`entry-${stopId}`);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    // Provide visual feedback
    targetElement.classList.add('stop-target-pulse');
    setTimeout(() => {
      targetElement.classList.remove('stop-target-pulse');
    }, 1800);
  }
};
```

### 3.2 Visual Feedback (Pulse / Flash)
A subtle accent ring and background glow (`var(--accent-glow)`) animates on the target stop card for 1.8 seconds, ensuring travelers on busy Shanghai streets immediately recognize which stop was selected.

---

## 4. Auto-Scroll & UX Ergonomics (2-Second Interval)

A 2-second auto-advance cycle (`2000ms`) is brisk. To prevent disorienting travelers or causing accidental miss-taps:
1. **Pause on Hover**: Hovering over the carousel container pauses the auto-advance.
2. **Pause on Touch**: Touching or swiping on mobile immediately halts auto-scroll for a cooldown period (e.g., 4000ms idle timer).
3. **Reduced Motion**: If `prefers-reduced-motion: reduce` is active, auto-scrolling is disabled by default.
4. **Manual Controls**: Subtle left/right chevron buttons and a mini play/pause indicator afford full user agency.

---

## 5. Visual & Responsive Design Tokens

| Viewport | Card Width | Card Height / Ratio | Visible Cards |
| :--- | :--- | :--- | :--- |
| **Mobile (< 480px)** | `200px` | `130px` (aspect ~16/10) | ~1.4 cards peek |
| **Tablet (480px–768px)** | `230px` | `145px` | ~2.5 cards |
| **Desktop (> 768px)** | `250px` | `155px` | ~3.5 cards |

### Card Overlay Layers:
- **Base**: `<img>` with `object-fit: cover`, `loading="lazy"`.
- **Scrim Overlay**: `linear-gradient(to top, rgba(18, 18, 18, 0.88) 0%, rgba(18, 18, 18, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%)`.
- **Top Badge**: Checkpoint number `#01`–`#17` in a translucent glass pill (`rgba(255,255,255,0.2)`).
- **Time/Duration**: `08:15` or `45 min`.
- **Bottom Typography**:
  - English Title: Bold, legible (14px, white).
  - Chinese Title: Muted warm gold/cream (`rgba(255,255,255,0.75)` or `#E8DEC8`, 12px).
