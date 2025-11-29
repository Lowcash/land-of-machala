import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['cs'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Use default locale if invalid locale is provided
  const validLocale = (locale && locales.includes(locale as any)) ? locale : 'cs'

  return {
    locale: validLocale,
    messages: (await import(`../locales/${validLocale}.json`)).default,
    defaultTranslationValues: {
      b: '<b>',
      '/b': '</b>',
    },
  }
})