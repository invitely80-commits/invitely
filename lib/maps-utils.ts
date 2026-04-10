/**
 * Utility functions for handling Google Maps and Apple Maps links.
 */

export interface MapsLinks {
  embedUrl: string | null;
  googleMapsUrl: string;
  appleMapsUrl: string;
}

/**
 * Extracts the embed URL from a Google Maps sharing URL or iframe tag.
 */
export function extractEmbedUrl(input: string): string | null {
  if (!input) return null;

  // If it's an iframe tag, extract the src
  const iframeMatch = input.match(/src="([^"]+)"/);
  if (iframeMatch) return iframeMatch[1];

  // If it's already an embed URL
  if (input.includes("google.com/maps/embed")) return input;

  return null;
}

/**
 * Generates a Google Maps directions URL for a given link or address.
 */
export function getGoogleMapsDirectionsUrl(mapUrl?: string | null, address?: string): string {
  if (mapUrl && !mapUrl.includes("embed")) {
    return mapUrl;
  }
  
  const query = encodeURIComponent(address || "");
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

/**
 * Generates an Apple Maps directions URL for a given address.
 */
export function getAppleMapsDirectionsUrl(address: string): string {
  const query = encodeURIComponent(address);
  return `https://maps.apple.com/?daddr=${query}`;
}

/**
 * Gets all relevant map links for an event.
 */
export function getMapsContext(mapUrl: string | null | undefined, address: string): MapsLinks {
  const embedUrl = extractEmbedUrl(mapUrl || "");
  const googleMapsUrl = getGoogleMapsDirectionsUrl(mapUrl, address);
  const appleMapsUrl = getAppleMapsDirectionsUrl(address);

  return {
    embedUrl,
    googleMapsUrl,
    appleMapsUrl,
  };
}
