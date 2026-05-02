import { RootEntryShellClient } from '@/components/features/auth/root-entry-shell-client'

export type EntryScreen = 'signIn' | 'signUp'

export type RootEntryShellProps = {
  initialScreen?: EntryScreen
  onGuestEntry?: () => void
  onLoginSuccess?: () => void
  onRegisterSuccess?: () => void
  statusMessage?: string
}

export function RootEntryShell({
  initialScreen = 'signIn',
  onGuestEntry,
  onLoginSuccess,
  onRegisterSuccess,
  statusMessage,
}: RootEntryShellProps) {
  return (
    <RootEntryShellClient
      initialScreen={initialScreen}
      onGuestEntry={onGuestEntry}
      onLoginSuccess={onLoginSuccess}
      onRegisterSuccess={onRegisterSuccess}
      statusMessage={statusMessage}
    />
  )
}
