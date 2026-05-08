import csMessages from '../../../messages/cs.json'
import enMessages from '../../../messages/en.json'

type OriginsMessagesShape = {
  setup: {
    backLabel: string
    classTitle: string
    confirmLabel: string
    description: string
    heroNameLabel: string
    heroNamePlaceholder: string
    overline: string
    raceTitle: string
    randomizeLabel: string
    title: string
  }
  tutorial: {
    continueLabel: string
    skipLabel: string
  }
}

type MessagesShape = {
  Auth: {
    origins: OriginsMessagesShape
  }
}

const ORIGINS_MESSAGES_BY_LOCALE = {
  cs: (csMessages as MessagesShape).Auth.origins,
  en: (enMessages as MessagesShape).Auth.origins,
} as const

export type OriginsLocale = keyof typeof ORIGINS_MESSAGES_BY_LOCALE

export function getOriginsMessages(locale: OriginsLocale = 'en') {
  return ORIGINS_MESSAGES_BY_LOCALE[locale]
}

const DEFAULT_ORIGINS_MESSAGES = getOriginsMessages('en')

export const ORIGINS_TUTORIAL_COPY = DEFAULT_ORIGINS_MESSAGES.tutorial
export const ORIGINS_SETUP_COPY = DEFAULT_ORIGINS_MESSAGES.setup
