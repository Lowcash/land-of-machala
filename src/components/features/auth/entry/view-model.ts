import type { LoginErrors, RegisterErrors } from '@/lib/auth/entry-validation'
import type { FormSubmitHandler } from '@/lib/types/component-props'

type EntryFormFields = {
  email: string
  password: string
}

type EntryPanelCommonProps = EntryFormFields & {
  onEmailChange: (value: string) => void
  onGuestEntry?: () => void
  onPasswordChange: (value: string) => void
  onSubmit: FormSubmitHandler
  statusMessage?: string
}

type EntryBaseFormState<E> = EntryFormFields & {
  errors: E
}

export type EntrySignInPanelProps = EntryPanelCommonProps & {
  errors: LoginErrors
  onRememberChange: (checked: boolean) => void
  onSwitchToSignUp: () => void
  rememberMe: boolean
}

export type EntrySignUpPanelProps = EntryPanelCommonProps & {
  acceptTerms: boolean
  errors: RegisterErrors
  onAcceptTermsChange: (checked: boolean) => void
  onSwitchToSignIn: () => void
}

export type LoginFormState = EntryBaseFormState<LoginErrors> & {
  rememberMe: boolean
}

export type RegisterFormState = EntryBaseFormState<RegisterErrors> & {
  acceptTerms: boolean
}
