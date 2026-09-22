/**
 * Platform-aware map opening utility.
 * Generates an appropriate map link or search query for Apple Maps / Gaode / Google.
 */
export function openMapLocation(query: string, coords?: { lat: number; lng: number }, directUrl?: string) {
  if (directUrl) {
    window.open(directUrl, "_blank", "noopener,noreferrer");
    return;
  }

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  let url: string;

  if (coords) {
    if (isIOS) {
      url = `https://maps.apple.com/?ll=${coords.lat},${coords.lng}&q=${encodeURIComponent(query)}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    }
  } else {
    if (isIOS) {
      url = `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Shanghai " + query)}`;
    }
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
