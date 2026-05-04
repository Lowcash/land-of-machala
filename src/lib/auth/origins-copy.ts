import csMessages from '../../../messages/cs.json'
import enMessages from '../../../messages/en.json'

type OriginsCopyShape = {
  tutorial: {
    continueLabel: string
    skipLabel: string
  }
  setup: {
    title: string
    description: string
    overline: string
    raceTitle: string
    classTitle: string
    heroNameLabel: string
    heroNamePlaceholder: string
    randomizeLabel: string
    backLabel: string
    confirmLabel: string
  }
}

type MessagesShape = {
  Auth: {
    origins: OriginsCopyShape
  }
}

const ORIGINS_COPY_BY_LOCALE = {
  cs: (csMessages as MessagesShape).Auth.origins,
  en: (enMessages as MessagesShape).Auth.origins,
} as const

export type OriginsLocale = keyof typeof ORIGINS_COPY_BY_LOCALE

export function getOriginsCopy(locale: OriginsLocale = 'en') {
  return ORIGINS_COPY_BY_LOCALE[locale]
}

const DEFAULT_ORIGINS_COPY = getOriginsCopy('en')

export const ORIGINS_TUTORIAL_COPY = DEFAULT_ORIGINS_COPY.tutorial
export const ORIGINS_SETUP_COPY = DEFAULT_ORIGINS_COPY.setup
