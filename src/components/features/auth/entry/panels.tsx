import { ENTRY_SIGN_IN_COPY, ENTRY_SIGN_UP_COPY } from '@/lib/auth/entry-copy'
import type { FormSubmitHandler } from '@/lib/types/component-props'
import type { LoginErrors, RegisterErrors } from '@/lib/auth/entry-validation'

import { Button } from '@/components/ui/core/button'
import { EntryCard } from '@/components/ui/prefabs/auth/entry-card'
import { SignInForm, SignUpForm } from '@/components/ui/prefabs/auth/entry-forms'
import { LegalTermsLabel } from '@/components/ui/prefabs/auth/legal-terms-label'

type EntryFormCommon = {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: FormSubmitHandler
  onGuestEntry?: () => void
  statusMessage?: string
}

type EntrySignInPanelProps = EntryFormCommon & {
  errors: LoginErrors
  onRememberChange: (checked: boolean) => void
  onSwitchToSignUp: () => void
  rememberMe: boolean
}

type EntrySignUpPanelProps = EntryFormCommon & {
  acceptTerms: boolean
  errors: RegisterErrors
  heroName: string
  onAcceptTermsChange: (checked: boolean) => void
  onHeroNameChange: (value: string) => void
  onSwitchToSignIn: () => void
}

export function EntrySignInPanel({
  email,
  errors,
  onEmailChange,
  onGuestEntry,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  onSwitchToSignUp,
  password,
  rememberMe,
  statusMessage,
}: EntrySignInPanelProps) {
  return (
    <EntryCard.Root>
      <EntryCard.Footer>
        <EntryCard.Content>
          <EntryCard.Header
            description={ENTRY_SIGN_IN_COPY.description}
            title={ENTRY_SIGN_IN_COPY.title}
          />
          <EntryCard.Status message={statusMessage} />
          <SignInForm
            email={email}
            errors={errors}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            onRememberChange={onRememberChange}
            onSubmit={onSubmit}
            password={password}
            rememberMe={rememberMe}
          />
        </EntryCard.Content>
        <EntryCard.Support>
          <EntryCard.Divider label={ENTRY_SIGN_IN_COPY.orLabel} />
          <EntryCard.Actions>
            <Button fullWidth onClick={onGuestEntry} size="md" variant="ghost">
              {ENTRY_SIGN_IN_COPY.guestLabel}
            </Button>
            <Button fullWidth onClick={onSwitchToSignUp} size="md" variant="secondary">
              {ENTRY_SIGN_IN_COPY.createAccountLabel}
            </Button>
          </EntryCard.Actions>
        </EntryCard.Support>
      </EntryCard.Footer>
    </EntryCard.Root>
  )
}

export function EntrySignUpPanel({
  acceptTerms,
  email,
  errors,
  heroName,
  onAcceptTermsChange,
  onEmailChange,
  onGuestEntry,
  onHeroNameChange,
  onPasswordChange,
  onSubmit,
  onSwitchToSignIn,
  password,
  statusMessage,
}: EntrySignUpPanelProps) {
  return (
    <EntryCard.Root>
      <EntryCard.Footer>
        <EntryCard.Content>
          <EntryCard.Header
            description={ENTRY_SIGN_UP_COPY.description}
            title={ENTRY_SIGN_UP_COPY.title}
          />
          <EntryCard.Status message={statusMessage} />
          <SignUpForm
            acceptTerms={acceptTerms}
            email={email}
            errors={errors}
            heroName={heroName}
            legalLabel={<LegalTermsLabel onLegalLinkClick={handleLegalLinkClick} />}
            onAcceptTermsChange={onAcceptTermsChange}
            onEmailChange={onEmailChange}
            onHeroNameChange={onHeroNameChange}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
            password={password}
          />
        </EntryCard.Content>
        <EntryCard.Actions>
          <Button fullWidth onClick={onGuestEntry} size="md" variant="ghost">
            {ENTRY_SIGN_UP_COPY.guestLabel}
          </Button>
          <Button fullWidth onClick={onSwitchToSignIn} size="md" variant="secondary">
            {ENTRY_SIGN_UP_COPY.backLabel}
          </Button>
        </EntryCard.Actions>
      </EntryCard.Footer>
    </EntryCard.Root>
  )
}

function handleLegalLinkClick(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault()
  event.stopPropagation()
}
