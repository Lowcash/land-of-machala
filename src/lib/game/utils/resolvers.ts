import { LORE_QUOTES } from '@/lib/game/constants/lore'

/**
 * Resolves a random lore quote for use in the UI.
 * This encapsulates the business logic for quote selection.
 */
export function resolveLoreQuote() {
  const randomIndex = Math.floor(Math.random() * LORE_QUOTES.length)
  return LORE_QUOTES[randomIndex] || LORE_QUOTES[0]
}

/**
 * Resolves shared data for the application footer.
 * Currently provides the current copyright year and version.
 */
export function resolveFooterData() {
  return {
    year: new Date().getFullYear(),
    version: '2.0',
  }
}
