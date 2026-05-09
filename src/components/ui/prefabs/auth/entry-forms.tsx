import {
  ENTRY_SHARED_COPY,
  ENTRY_SIGN_IN_COPY,
  ENTRY_SIGN_UP_COPY,
} from '@/lib/auth/entry-messages'
import type { LoginErrors, RegisterErrors } from '@/lib/auth/entry-validation'
import type { FormSubmitHandler } from '@/lib/types/component-props'

import { Button } from '@/components/ui/core/button'
import { Stack } from '@/components/ui/core/layout'
import { CheckboxField } from '@/components/ui/forms/checkbox-field'
import { Field } from '@/components/ui/forms/field'

type AuthFormBaseProps = {
  email: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: FormSubmitHandler
  password: string
}

type AuthFormShellProps = {
  children: React.ReactNode
  onSubmit: FormSubmitHandler
}

function AuthFormShell({ children, onSubmit }: AuthFormShellProps) {
  return (
    <Stack as="form" fullWidth onSubmit={onSubmit}>
      {children}
    </Stack>
  )
}

type SignInFormProps = AuthFormBaseProps & {
  errors: LoginErrors
  onForgotSecret?: () => void
  onRememberChange: (checked: boolean) => void
  rememberMe: boolean
}

const REMEMBER_SPIRIT_ID = 'remember-spirit'

export function SignInForm({
  email,
  errors,
  onEmailChange,
  onForgotSecret,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  password,
  rememberMe,
}: SignInFormProps) {
  return (
    <AuthFormShell onSubmit={onSubmit}>
      <Field
        autoComplete="email"
        error={errors.email}
        label={ENTRY_SIGN_IN_COPY.emailLabel}
        onChange={(event) => onEmailChange(event.target.value)}
        placeholder={ENTRY_SHARED_COPY.emailPlaceholder}
        type="email"
        value={email}
      />
      <Field
        actionLabel={ENTRY_SIGN_IN_COPY.forgotLabel}
        autoComplete="current-password"
        error={errors.password}
        label={ENTRY_SIGN_IN_COPY.passwordLabel}
        onActionClick={onForgotSecret}
        onChange={(event) => onPasswordChange(event.target.value)}
        placeholder={ENTRY_SHARED_COPY.passwordPlaceholder}
        type="password"
        value={password}
      />
      <CheckboxField
        checked={rememberMe}
        id={REMEMBER_SPIRIT_ID}
        label={ENTRY_SIGN_IN_COPY.rememberLabel}
        onChange={(event) => onRememberChange(event.target.checked)}
      />
      <Button fullWidth type="submit">
        {ENTRY_SIGN_IN_COPY.submitLabel}
      </Button>
    </AuthFormShell>
  )
}

type SignUpFormProps = AuthFormBaseProps & {
  acceptTerms: boolean
  errors: RegisterErrors
  legalLabel: React.ReactNode
  onAcceptTermsChange: (checked: boolean) => void
}

const MERCHANT_TERMS_ID = 'merchant-terms'

export function SignUpForm({
  acceptTerms,
  email,
  errors,
  legalLabel,
  onAcceptTermsChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  password,
}: SignUpFormProps) {
  return (
    <AuthFormShell onSubmit={onSubmit}>
      <Field
        autoComplete="email"
        error={errors.email}
        label={ENTRY_SIGN_IN_COPY.emailLabel}
        onChange={(event) => onEmailChange(event.target.value)}
        placeholder={ENTRY_SHARED_COPY.emailPlaceholder}
        type="email"
        value={email}
      />
      <Field
        autoComplete="new-password"
        error={errors.password}
        label={ENTRY_SIGN_UP_COPY.passwordLabel}
        onChange={(event) => onPasswordChange(event.target.value)}
        placeholder={ENTRY_SHARED_COPY.passwordPlaceholder}
        type="password"
        value={password}
      />
      <CheckboxField
        checked={acceptTerms}
        error={errors.acceptTerms}
        id={MERCHANT_TERMS_ID}
        label={legalLabel}
        onChange={(event) => onAcceptTermsChange(event.target.checked)}
      />
      <Button fullWidth type="submit">
        {ENTRY_SIGN_UP_COPY.submitLabel}
      </Button>
    </AuthFormShell>
  )
}
