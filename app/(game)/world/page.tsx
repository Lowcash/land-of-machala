import { showInfo } from '@/app/actions/game'
import { WorldClient } from './_client'

/**
 * World Page - Server Component with SSR Hydration
 * 
 * This page uses a hybrid architecture:
 * 1. Server Component fetches initial game data (SSR)
 * 2. Client Component hydrates with that data
 * 3. React Query takes over for subsequent updates
 * 
 * Benefits:
 * - Faster initial render (no client fetch waterfall)
 * - Reduced CLS (Cumulative Layout Shift)
 * - Better performance on slow connections
 * - Still keeps full interactivity with React Query
 */
export default async function WorldPage() {
  // Fetch initial game data on server (cached)
  const result = await showInfo()

  // Pass resolved data to client component for hydration
  return <WorldClient initialData={result?.data} />
}
