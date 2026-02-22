import * as React from 'react'

import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { Heading, Text } from '@/components/ui/core/typography'
import { SparklesIcon } from '@/components/ui/icons'

import { Description, Label } from './shared'

interface HeroTitleProps {
  children: React.ReactNode
}

export function HeroTitle({ children }: HeroTitleProps) {
  if (!children) return null

  return (
    <Stack position="relative">
      <Heading level={1} font="medieval" color="gold" align="center">
        {/* We use a shadow effect through the stack or variants if available, 
            but for now we keep it clean. */}
        {children}
      </Heading>
    </Stack>
  )
}

interface HeroSubtitleProps {
  children: React.ReactNode
}

export function HeroSubtitle({ children }: HeroSubtitleProps) {
  return (
    <HStack align="center" gap="xs" justify="center">
      <SparklesIcon />
      <Text align="center" color="secondary" variant="small" sm={{ variant: 'base' }}>
        {children}
      </Text>
      <SparklesIcon />
    </HStack>
  )
}

export function HeroDescription({ children, ...props }: React.ComponentProps<typeof Description>) {
  return (
    <Description {...props} align="center">
      {children}
    </Description>
  )
}

export function DecorativeLabel({ children, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label {...props} align="center">
      {children}
    </Label>
  )
}

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
