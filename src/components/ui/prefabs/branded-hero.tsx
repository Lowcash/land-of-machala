import { VStack } from '@/components/ui/core/stack'
import { LogoIcon } from '@/components/ui/icons'
import { HeroDescription, HeroSubtitle, HeroTitle } from '@/components/ui/prefabs/typography/hero'

interface BrandedHeroProps {
  title?: string
  subtitle?: string
  description?: string
  logo?: React.ReactNode
}

export function BrandedHero({
  title = 'Land of Machala',
  subtitle,
  description,
  logo = <LogoIcon />,
}: BrandedHeroProps) {
  return (
    <VStack align="center" gap="sm">
      {logo}

      <VStack align="center" gap="xs">
        <HeroTitle>{title}</HeroTitle>
        {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
        {description && <HeroDescription>{description}</HeroDescription>}
      </VStack>
    </VStack>
  )
}
