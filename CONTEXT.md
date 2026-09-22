# China Static Web Plan Trip

A minimalist mobile-first travel itinerary and interactive quest checklist web application designed for exploring China (Shanghai and Beijing) on foot.

## Language

**Itinerary**:
The structured day-by-day travel timeline containing activities, locations, times, and routes.
_Avoid_: Schedule, agenda, diary

**Quest**:
An actionable checklist item or goal for the traveler during each itinerary leg (e.g. food to try, photo spot, ticket redemption).
_Avoid_: Task, todo, chore

**POI (Point of Interest)**:
A specific physical destination or stop with coordinates and map links (primarily Gaode/Amap with Apple/Google Maps fallbacks).
_Avoid_: Pin, place, waypoint

**Offline Cache**:
Client-side caching provided by a Service Worker (PWA) enabling full app usability without active internet connectivity.
_Avoid_: Local save, browser cache

**Location Carousel**:
A horizontal visual reel displaying photo cards and bilingual titles for all day stops with auto-scrolling and direct click-to-checkpoint navigation.
_Avoid_: Image slider, hero banner, photo gallery
