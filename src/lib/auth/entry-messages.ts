import csMessages from '../../../messages/cs.json'
import enMessages from '../../../messages/en.json'

type EntryMessagesShape = {
  legal: {
    connector: string
    merchantLawsLabel: string
    prefix: string
    privacyCodexLabel: string
    suffix: string
  }
  shared: {
    emailPlaceholder: string
    passwordPlaceholder: string
  }
  side: {
    recentChroniclesTitle: string
  }
  signIn: {
    createAccountLabel: string
    description: string
    emailLabel: string
    forgotLabel: string
    guestLabel: string
    orLabel: string
    passwordLabel: string
    rememberLabel: string
    submitLabel: string
    title: string
  }
  signUp: {
    backLabel: string
    description: string
    guestLabel: string
    passwordLabel: string
    submitLabel: string
    title: string
  }
  status: {
    continuationPending: string
    heroPrepared: string
  }
  validation: {
    acceptTermsRequired: string
    emailInvalid: string
    passwordLength: string
    passwordRequired: string
  }
}

type MessagesShape = {
  Auth: EntryMessagesShape
}

const ENTRY_MESSAGES_BY_LOCALE = {
  cs: (csMessages as MessagesShape).Auth,
  en: (enMessages as MessagesShape).Auth,
} as const

export type EntryLocale = keyof typeof ENTRY_MESSAGES_BY_LOCALE

export function getEntryMessages(locale: EntryLocale = 'en') {
  return ENTRY_MESSAGES_BY_LOCALE[locale]
}

const DEFAULT_ENTRY_MESSAGES = getEntryMessages('en')

export const ENTRY_SHARED_COPY = DEFAULT_ENTRY_MESSAGES.shared
export const ENTRY_SIGN_IN_COPY = DEFAULT_ENTRY_MESSAGES.signIn
export const ENTRY_SIGN_UP_COPY = DEFAULT_ENTRY_MESSAGES.signUp
export const ENTRY_LEGAL_COPY = DEFAULT_ENTRY_MESSAGES.legal
export const ENTRY_VALIDATION_MESSAGES = DEFAULT_ENTRY_MESSAGES.validation
export const ENTRY_STATUS_MESSAGES = DEFAULT_ENTRY_MESSAGES.status
export const ENTRY_SIDE_COPY = DEFAULT_ENTRY_MESSAGES.side
