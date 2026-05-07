import csMessages from '../../../messages/cs.json'
import enMessages from '../../../messages/en.json'

type EntryMessagesShape = {
  shared: {
    emailPlaceholder: string
    passwordPlaceholder: string
  }
  signIn: {
    title: string
    description: string
    emailLabel: string
    passwordLabel: string
    forgotLabel: string
    rememberLabel: string
    submitLabel: string
    orLabel: string
    createAccountLabel: string
    guestLabel: string
  }
  signUp: {
    title: string
    description: string
    passwordLabel: string
    submitLabel: string
    backLabel: string
    guestLabel: string
  }
  legal: {
    prefix: string
    merchantLawsLabel: string
    connector: string
    privacyCodexLabel: string
    suffix: string
  }
  validation: {
    emailInvalid: string
    passwordRequired: string
    passwordLength: string
    acceptTermsRequired: string
  }
  status: {
    continuationPending: string
    heroPrepared: string
  }
  side: {
    recentChroniclesTitle: string
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