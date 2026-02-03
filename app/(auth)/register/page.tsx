'use client'

import { RegisterForm } from '@/components/features/Auth/Register/RegisterForm'
import { RegisterInfo } from '@/components/features/Auth/Register/RegisterInfo'
import { AuthCard } from '@/components/features/Auth/Shared/AuthCard'
import { AuthHeader } from '@/components/features/Auth/Shared/AuthHeader'
import { AuthPageTemplate } from '@/components/features/Auth/Shared/AuthPageTemplate'
import { VStack } from '@/components/ui/stack'
import { GameLink, Span } from '@/components/ui/typography'

/**
 * Register Page
 * Uses the unified AuthPageTemplate to ensure consistency with the Login page.
 * Displays the registration form on the left and introductory info on the right (desktop).
 */
export default function RegisterPage() {
  return (
    <AuthPageTemplate sideContent={<RegisterInfo />}>
      <AuthCard>
        <AuthHeader />

        <VStack fullWidth maxW="sm" gap="md">
          <RegisterForm />

          <VStack align="center">
            <Span color="muted">Už máš účet? </Span>
            <GameLink href="/login">Přihlas se</GameLink>
          </VStack>
        </VStack>
      </AuthCard>
    </AuthPageTemplate>
  )
}
