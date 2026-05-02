import { ENTRY_VALIDATION_MESSAGES } from '@/lib/auth/entry-copy'
import { isValidEmail } from '@/lib/validation/email'

export type LoginErrors = {
  email?: string
  password?: string
}

export type RegisterErrors = {
  acceptTerms?: string
  email?: string
  heroName?: string
  password?: string
}

type LoginInput = {
  email: string
  password: string
}

type RegisterInput = {
  acceptTerms: boolean
  email: string
  heroName: string
  password: string
}

export function validateLoginInput({ email, password }: LoginInput): LoginErrors {
  const nextErrors: LoginErrors = {}

  if (!isValidEmail(email)) {
    nextErrors.email = ENTRY_VALIDATION_MESSAGES.emailInvalid
  }

  if (!password.trim()) {
    nextErrors.password = ENTRY_VALIDATION_MESSAGES.passwordRequired
  }

  return nextErrors
}

export function validateRegisterInput({
  acceptTerms,
  email,
  heroName,
  password,
}: RegisterInput): RegisterErrors {
  const nextErrors: RegisterErrors = {}

  if (!heroName.trim()) {
    nextErrors.heroName = ENTRY_VALIDATION_MESSAGES.heroNameRequired
  }

  if (!isValidEmail(email)) {
    nextErrors.email = ENTRY_VALIDATION_MESSAGES.emailInvalid
  }

  if (password.trim().length < 6) {
    nextErrors.password = ENTRY_VALIDATION_MESSAGES.passwordLength
  }

  if (!acceptTerms) {
    nextErrors.acceptTerms = ENTRY_VALIDATION_MESSAGES.acceptTermsRequired
  }

  return nextErrors
}
