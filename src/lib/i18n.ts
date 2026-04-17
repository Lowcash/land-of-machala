import { getTranslations } from 'next-intl/server'

/**
 * Server-side helper to handle multiple translation namespaces.
 * Mimics the 't' (feature-scoped) and 'g' (Game/Global) pattern.
 */
export async function getScopedTranslations(featureScope: string) {
  const g = await getTranslations('Game')
  const t = await getTranslations(featureScope as never)

  return { t, g }
}
