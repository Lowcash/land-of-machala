import { VStack } from '@/components/ui/core/stack'
import { LogoIcon } from '@/components/ui/icons'
import { FeatureSection } from '@/components/ui/prefabs/structure'
import { HeroDescription, HeroSubtitle, HeroTitle } from '@/components/ui/prefabs/typography/hero'

export interface BrandedHeroProps {
  title?: string
  subtitle?: string
  description?: string
  logo?: React.ReactNode
}

export function BrandedHero({
  title = 'Land of Machala',
  subtitle,
  description,
  logo,
}: BrandedHeroProps) {
  return (
    <FeatureSection align="center" gap="md">
      <VStack align="center" gap="xs">
        {logo || <LogoIcon size="xl" />}
        <HeroTitle>{title}</HeroTitle>
      </VStack>

      {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
      {description && (
        <HeroDescription align="center" maxWidth="md">
          {description}
        </HeroDescription>
      )}
    </FeatureSection>
  )
}
