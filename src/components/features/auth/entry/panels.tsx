import { ENTRY_SIGN_IN_COPY, ENTRY_SIGN_UP_COPY } from '@/lib/auth/entry-messages'

import type {
  EntrySignInPanelProps,
  EntrySignUpPanelProps,
} from '@/components/features/auth/entry/view-model'
import { EntryCard } from '@/components/ui/prefabs/auth/entry-card'
import { SignInForm, SignUpForm } from '@/components/ui/prefabs/auth/entry-forms'
import { LegalTermsLabel } from '@/components/ui/prefabs/auth/legal-terms-label'

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
          <EntryCard.GuestSwitchActions
            guestLabel={ENTRY_SIGN_IN_COPY.guestLabel}
            onGuestClick={onGuestEntry}
            onSwitchClick={onSwitchToSignUp}
            switchLabel={ENTRY_SIGN_IN_COPY.createAccountLabel}
          />
        </EntryCard.Support>
      </EntryCard.Footer>
    </EntryCard.Root>
  )
}

export function EntrySignUpPanel({
  acceptTerms,
  email,
  errors,
  onAcceptTermsChange,
  onEmailChange,
  onGuestEntry,
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
            legalLabel={<LegalTermsLabel onLegalLinkClick={handleLegalLinkClick} />}
            onAcceptTermsChange={onAcceptTermsChange}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
            password={password}
          />
        </EntryCard.Content>
        <EntryCard.GuestSwitchActions
          guestLabel={ENTRY_SIGN_UP_COPY.guestLabel}
          onGuestClick={onGuestEntry}
          onSwitchClick={onSwitchToSignIn}
          switchLabel={ENTRY_SIGN_UP_COPY.backLabel}
        />
      </EntryCard.Footer>
    </EntryCard.Root>
  )
}

function handleLegalLinkClick(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault()
  event.stopPropagation()
}
