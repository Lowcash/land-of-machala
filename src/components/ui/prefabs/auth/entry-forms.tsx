import { ENTRY_SHARED_COPY, ENTRY_SIGN_IN_COPY, ENTRY_SIGN_UP_COPY } from '@/lib/auth/entry-copy'
import type { LoginErrors, RegisterErrors } from '@/lib/auth/entry-validation'

import { Button } from '@/components/ui/core/button'
import { CheckboxField } from '@/components/ui/forms/checkbox-field'
import { Field } from '@/components/ui/forms/field'

type SignInFormProps = {
  email: string
  errors: LoginErrors
  onEmailChange: (value: string) => void
  onForgotSecret?: () => void
  onRememberChange: (checked: boolean) => void
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
  onPasswordChange: (value: string) => void
  password: string
  rememberMe: boolean
}

type SignUpFormProps = {
  acceptTerms: boolean
  email: string
  errors: RegisterErrors
  heroName: string
  legalLabel: React.ReactNode
  onAcceptTermsChange: (checked: boolean) => void
  onEmailChange: (value: string) => void
  onHeroNameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
  password: string
}

export function SignInForm({
  email,
  errors,
  onEmailChange,
  onForgotSecret,
  onRememberChange,
  onPasswordChange,
  onSubmit,
  password,
  rememberMe,
}: SignInFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
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
        id="remember-spirit"
        label={ENTRY_SIGN_IN_COPY.rememberLabel}
        onChange={(event) => onRememberChange(event.target.checked)}
      />
      <Button fullWidth type="submit">
        {ENTRY_SIGN_IN_COPY.submitLabel}
      </Button>
    </form>
  )
}

export function SignUpForm({
  acceptTerms,
  email,
  errors,
  heroName,
  legalLabel,
  onAcceptTermsChange,
  onEmailChange,
  onHeroNameChange,
  onPasswordChange,
  onSubmit,
  password,
}: SignUpFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field
        error={errors.heroName}
        label={ENTRY_SIGN_UP_COPY.heroNameLabel}
        onChange={(event) => onHeroNameChange(event.target.value)}
        placeholder={ENTRY_SIGN_UP_COPY.heroNamePlaceholder}
        value={heroName}
      />
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
        id="merchant-terms"
        label={legalLabel}
        onChange={(event) => onAcceptTermsChange(event.target.checked)}
        toggleOnLabelClick={false}
      />
      <Button fullWidth type="submit">
        {ENTRY_SIGN_UP_COPY.submitLabel}
      </Button>
    </form>
  )
}
