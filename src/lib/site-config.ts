export type SiteConfig = {
  readonly appName: string
  readonly category: string
  readonly defaultDescription: string
  readonly defaultTitle: string
  readonly language: string
  readonly manifestPath: `/${string}`
  readonly shortName: string
  readonly themeColor: `#${string}`
  readonly webAppDescription: string
}

export const SITE_CONFIG = {
  appName: 'Land of Machala',
  shortName: 'Machala',
  defaultTitle: 'Land of Machala',
  defaultDescription: 'An epic RPG adventure.',
  webAppDescription: 'Server-first fantasy RPG entry for login, onboarding, and continued play.',
  category: 'games',
  language: 'en',
  manifestPath: '/manifest.webmanifest',
  themeColor: '#0d0a04',
} as const satisfies SiteConfig

export const SITE_APP_NAME = SITE_CONFIG.appName
export const SITE_SHORT_NAME = SITE_CONFIG.shortName
export const SITE_DEFAULT_TITLE = SITE_CONFIG.defaultTitle
export const SITE_DEFAULT_DESCRIPTION = SITE_CONFIG.defaultDescription
export const SITE_WEB_APP_DESCRIPTION = SITE_CONFIG.webAppDescription
export const SITE_CATEGORY = SITE_CONFIG.category
export const SITE_LANGUAGE = SITE_CONFIG.language
export const SITE_MANIFEST_PATH = SITE_CONFIG.manifestPath
export const SITE_THEME_COLOR = SITE_CONFIG.themeColor
