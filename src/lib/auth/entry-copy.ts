import csMessages from '../../../messages/cs.json'
import enMessages from '../../../messages/en.json'

type EntryCopyShape = {
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
    heroNameLabel: string
    heroNamePlaceholder: string
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
    heroNameRequired: string
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
  Auth: EntryCopyShape
}

const ENTRY_COPY_BY_LOCALE = {
  cs: (csMessages as MessagesShape).Auth,
  en: (enMessages as MessagesShape).Auth,
} as const

export type EntryLocale = keyof typeof ENTRY_COPY_BY_LOCALE

export function getEntryCopy(locale: EntryLocale = 'en') {
  return ENTRY_COPY_BY_LOCALE[locale]
}

const DEFAULT_ENTRY_COPY = getEntryCopy('en')

export const ENTRY_SHARED_COPY = DEFAULT_ENTRY_COPY.shared
export const ENTRY_SIGN_IN_COPY = DEFAULT_ENTRY_COPY.signIn
export const ENTRY_SIGN_UP_COPY = DEFAULT_ENTRY_COPY.signUp
export const ENTRY_LEGAL_COPY = DEFAULT_ENTRY_COPY.legal
export const ENTRY_VALIDATION_MESSAGES = DEFAULT_ENTRY_COPY.validation
export const ENTRY_STATUS_MESSAGES = DEFAULT_ENTRY_COPY.status
export const ENTRY_SIDE_COPY = DEFAULT_ENTRY_COPY.side
