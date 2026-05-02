export const routing = {
  locales: ['cs', 'en'] as const,
  defaultLocale: 'en' as const,
}

export type AppLocale = (typeof routing.locales)[number]
