import { LATEST_CHANGES } from '@/lib/game/data/changelog'
import { LORE_QUOTES } from '@/lib/game/data/lore'
import { REGISTRATION_BENEFITS } from '@/lib/game/data/registration'
import { SERVER_STATS } from '@/lib/game/data/stats'

import { version } from '../../../../package.json'

/**
 * Strips the 'Game.' prefix from a translation key.
 */
function stripPrefix(key: string) {
  return key.replace('Game.', '')
}

/**
 * Resolves a random lore quote key for use in the UI.
 */
export function resolveLoreQuoteKey() {
  if (!LORE_QUOTES || LORE_QUOTES.length === 0) {
    return 'Lore.0'
  }
  const randomIndex = Math.floor(Math.random() * LORE_QUOTES.length)
  return `Lore.${randomIndex}`
}

/**
 * Resolves shared data for the application footer.
 */
export function resolveFooterData() {
  return {
    year: new Date().getFullYear(),
    version: version,
  }
}

/**
 * Resolves pre-translated footer props.
 */
export function resolveFooterProps(t: (key: any) => string) {
  const { year, version } = resolveFooterData()
  return {
    versionLabel: t('footer.version'),
    copyrightLabel: t('footer.copyright'),
    year,
    version,
  }
}

/**
 * Resolves pre-translated server stats.
 */
export function resolveTranslatedStats(tg: (key: any) => string) {
  return SERVER_STATS.map((s) => ({
    ...s,
    label: tg(stripPrefix(s.labelKey) as any),
  }))
}

/**
 * Resolves pre-translated changelog entries.
 */
export function resolveTranslatedChangelog(tg: (key: any) => string) {
  return LATEST_CHANGES.map((c) => ({
    ...c,
    category: c.categoryKey ? tg(stripPrefix(c.categoryKey) as any) : undefined,
    description: tg(stripPrefix(c.descriptionKey) as any),
  }))
}

/**
 * Resolves pre-translated registration benefits.
 */
export function resolveTranslatedBenefits(tg: (key: any) => string) {
  return REGISTRATION_BENEFITS.map((b) => tg(stripPrefix(b) as any))
}

/**
 * Resolves a translated lore quote.
 */
export function resolveTranslatedLoreQuote(tg: (key: any) => string) {
  const key = resolveLoreQuoteKey()
  return tg(stripPrefix(key) as any)
}
