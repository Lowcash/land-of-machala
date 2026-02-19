export type LocationKey = 'city' | 'forest' | 'dungeon' | 'origins' | 'auth'

const BACKGROUND_MAP: Record<LocationKey, string> = {
  city: '/assets/locations/city.jpg',
  forest: '/assets/locations/forest.jpg',
  dungeon: '/assets/locations/dungeon.jpg',
  origins: '/assets/locations/city.jpg', // Placeholder for origins
  auth: '/assets/locations/city.jpg',    // Placeholder for auth
}

/**
 * Resolves a background source URL for a given location key.
 * This runs on the server, keeping the full map out of the client bundle.
 */
export function resolveBackground(location: LocationKey = 'city'): string {
  return BACKGROUND_MAP[location] || BACKGROUND_MAP.city
}
