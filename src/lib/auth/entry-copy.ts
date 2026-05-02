export const ENTRY_SHARED_COPY = {
  emailPlaceholder: 'traveller@realm.com',
  passwordPlaceholder: '********',
} as const

export const ENTRY_SIGN_IN_COPY = {
  title: 'Enter the realm',
  description: 'Reconnect with your legacy.',
  emailLabel: 'Email',
  passwordLabel: 'Secret phrase',
  forgotLabel: 'Forgotten scrolls?',
  rememberLabel: 'Remember my spirit',
  submitLabel: 'Enter the Realm',
  orLabel: 'or explore as',
  createAccountLabel: 'Create account',
  guestLabel: 'Continue as guest',
} as const

export const ENTRY_SIGN_UP_COPY = {
  title: 'Create your account',
  description: 'Begin your journey through chronicles of Machala',
  heroNameLabel: 'Hero name',
  heroNamePlaceholder: 'Ardyn Vale',
  passwordLabel: 'Secret phrase',
  submitLabel: 'Create Account',
  backLabel: 'Back to sign in',
  guestLabel: 'Guest entry',
} as const

export const ENTRY_LEGAL_COPY = {
  prefix: 'I accept',
  merchantLawsLabel: 'Merchant Laws',
  connector: 'and',
  privacyCodexLabel: 'Privacy Codex',
  suffix: 'of realm.',
} as const

export const ENTRY_VALIDATION_MESSAGES = {
  emailInvalid: 'Enter a valid email.',
  passwordRequired: 'Secret phrase is required.',
  passwordLength: 'Secret phrase must have at least 6 characters.',
  heroNameRequired: 'Hero name is required.',
  acceptTermsRequired: 'Merchant Laws and Privacy Codex must be accepted.',
} as const

export const ENTRY_STATUS_MESSAGES = {
  continuationPending:
    'Realm continuation is not active yet. Current slice stays on entry and origins.',
  heroPrepared: 'Hero is prepared. Realm continuation comes in next slice.',
} as const

export const ENTRY_SIDE_COPY = {
  recentChroniclesTitle: 'Recent Chronicles',
} as const
