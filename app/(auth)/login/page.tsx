'use client'

import { Changelog } from '@/components/features/Auth/Login/Changelog'
import { GuestLoginButton } from '@/components/features/Auth/Login/GuestLoginButton'
import { LoginForm } from '@/components/features/Auth/Login/LoginForm'
import { ServerStats } from '@/components/features/Auth/Login/ServerStats'
import { AuthCard } from '@/components/features/Auth/Shared/AuthCard'
import { AuthHeader } from '@/components/features/Auth/Shared/AuthHeader'
import { AuthPageTemplate } from '@/components/features/Auth/Shared/AuthPageTemplate'
import { GameDivider } from '@/components/ui/game-divider'
import { VStack } from '@/components/ui/stack'
import { GameLink, Span } from '@/components/ui/typography'

/**
 * Login Page
 * Uses the unified AuthPageTemplate to ensure consistency with the Register page.
 * Displays the login form on the left and server information on the right (desktop).
 */
export default function LoginPage() {
  return (
    <AuthPageTemplate
      sideContent={
        <>
          <ServerStats />
          <Changelog />
        </>
      }
    >
      <AuthCard>
        <AuthHeader />

        <VStack fullWidth maxW="sm" gap="md">
          <LoginForm />
          <GameDivider />
          <VStack gap="md">
            <GuestLoginButton />
            <VStack align="center">
              <Span color="muted">Nemáš ještě účet? </Span>
              <GameLink href="/register">Zaregistruj se</GameLink>
            </VStack>
          </VStack>
        </VStack>
      </AuthCard>
    </AuthPageTemplate>
  )
}
