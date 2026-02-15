import { VStack } from '@/components/ui/core/stack'

import { HeroSubtitle, HeroTitle } from './hero'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <VStack align="center" gap="xs" fullWidth>
      <HeroTitle>{title}</HeroTitle>
      {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
    </VStack>
  )
}
