import * as React from 'react'

import { HStack } from '@/components/ui/core/stack'
import { Heading, Text } from '@/components/ui/core/typography'
import { SparklesIcon } from '@/components/ui/icons'

import { Decoration, Description } from './shared'

interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function HeroTitle({ children, ...props }: Omit<HeroTitleProps, 'className'>) {
  return (
    <Heading
      level="h1"
      font="medieval"
      color={'gold' as any}
      className="text-3xl whitespace-nowrap sm:text-4xl lg:text-5xl"
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

interface HeroSubtitleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  children: React.ReactNode
}

export function HeroSubtitle({ children, ...props }: HeroSubtitleProps) {
  return (
    <HStack align="center" gap="xs" {...props}>
      <SparklesIcon />
      <Text color={'secondary' as any} className="text-sm sm:text-base">
        {children}
      </Text>
      <SparklesIcon />
    </HStack>
  )
}

export function HeroDescription({ children, ...props }: React.ComponentProps<typeof Description>) {
  return (
    <Description className="text-[#8b7355]" {...props}>
      {children}
    </Description>
  )
}

export function DecorativeLabel({ children, ...props }: React.ComponentProps<typeof Decoration>) {
  return <Decoration {...props}>{children}</Decoration>
}
