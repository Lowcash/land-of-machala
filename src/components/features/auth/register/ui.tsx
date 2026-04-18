'use client'

import type { MouseEvent } from 'react'

import { HStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { EntranceStack } from '@/components/ui/prefabs/animations/entrance-stack'
import { BrandedHero } from '@/components/ui/prefabs/layout/branded-hero'
import { Benefits } from '@/components/ui/prefabs/narrative/benefits'
import { LoreQuote } from '@/components/ui/prefabs/narrative/lore-quote'
import { AuthGrid, FeatureSection } from '@/components/ui/prefabs/structure'
import { TextLink } from '@/components/ui/prefabs/typography/shared'
import { Background } from '@/components/ui/shared/background'
import { Footer, type FooterProps } from '@/components/ui/shared/footer'

import { RegisterCard } from './card'
import type { RegisterFormValues } from './form'
import type { RegisterUiLabels } from './types'

export interface RegisterViewUIProps {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  footerLinks: {
    hasAccount: string
    login: string
  }
  accordion: {
    benefitsTitle: string
  }
  benefits: {
    title: string
    description: string
    items: string[]
  }
  quote: string
  footer: FooterProps
  uiLabels: RegisterUiLabels
  backgroundSrc: string
  onRegister?: (values: RegisterFormValues) => void | Promise<void>
  loginHref?: string
  onLoginNavigate?: () => void
  isLoading?: boolean
}

export function RegisterViewUI({
  hero,
  footerLinks,
  accordion,
  benefits,
  quote,
  footer,
  uiLabels,
  backgroundSrc,
  onRegister,
  loginHref,
  onLoginNavigate,
  isLoading,
}: RegisterViewUIProps) {
  const handleLoginClick = onLoginNavigate
    ? (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        onLoginNavigate()
      }
    : undefined

  return (
    <EntranceStack fullHeight fullWidth py="xl">
      <Background src={backgroundSrc} />
      <AuthGrid>
        <FeatureSection gap="xl">
          <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />
          <RegisterCard uiLabels={uiLabels} onRegister={onRegister} isLoading={isLoading} />

          <HStack gap="xs" justify="center" fullWidth>
            <Text variant="primary" color="secondary">
              {footerLinks.hasAccount}
            </Text>
            <TextLink href={loginHref ?? '/'} onClick={handleLoginClick}>
              {footerLinks.login}
            </TextLink>
          </HStack>
        </FeatureSection>

        <FeatureSection>
          <GameAccordion
            passthroughOnDesktop
            items={[
              {
                value: 'benefits',
                title: accordion.benefitsTitle,
                content: (
                  <Benefits
                    title={benefits.title}
                    description={benefits.description}
                    benefits={benefits.items}
                    variant="responsive"
                  />
                ),
              },
            ]}
          />
          <LoreQuote quote={quote} />
          <Footer {...footer} />
        </FeatureSection>
      </AuthGrid>
    </EntranceStack>
  )
}
