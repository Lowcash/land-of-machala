import { type ComponentProps, type HTMLAttributes } from 'react'

import { HStack, VStack } from '@/components/ui/core/stack'
import { Heading, Text } from '@/components/ui/core/typography'
import { SparklesIcon } from '@/components/ui/icons'

import { Description, Label } from './shared'

interface HeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function HeroTitle({ children, ...props }: Omit<HeroTitleProps, 'className'>) {
  if (!children) return null

  return (
    <Heading
      level="h1"
      font="medieval"
      color={'gold' as any}
      className="text-3xl sm:text-4xl lg:text-5xl"
      style={{
        textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Heading>
  )
}

interface HeroSubtitleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: React.ReactNode
}

export function HeroSubtitle({ children, ...props }: HeroSubtitleProps) {
  return (
    <HStack align="center" gap="xs" {...props}>
      <SparklesIcon size="sm" color="gold" />
      <Text align="center" color={'secondary' as any} className="text-sm sm:text-base">
        {children}
      </Text>
      <SparklesIcon size="sm" color="gold" />
    </HStack>
  )
}

export function HeroDescription({ children, ...props }: ComponentProps<typeof Description>) {
  return <Description {...props}>{children}</Description>
}

export function DecorativeLabel({ children, ...props }: ComponentProps<typeof Label>) {
  return <Label {...props}>{children}</Label>
}

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <VStack align="center" gap="md" fullWidth>
      <HeroTitle>{title}</HeroTitle>
      {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
    </VStack>
  )
}
