import { VStack } from '@/components/ui/core/stack'
import { LogoIcon } from '@/components/ui/icons'
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
    <VStack align="center" gap="md" py="xl">
      <VStack align="center" gap="xs">
        {logo || <LogoIcon size="xl" />}
        <HeroTitle>{title}</HeroTitle>
      </VStack>

      <VStack align="center" gap="xs" maxWidth="md">
        {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
        {description && <HeroDescription align="center">{description}</HeroDescription>}
      </VStack>
    </VStack>
  )
}
