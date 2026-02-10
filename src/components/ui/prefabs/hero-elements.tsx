import * as React from 'react'
import { Heading, Text } from '@/components/ui/core/typography'
import { HStack } from '@/components/ui/core/stack'
import { SparklesIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function HeroTitle({ children, className, ...props }: HeroTitleProps) {
  return (
    <Heading
      level="h1"
      font="medieval"
      color={'gold' as any}
      className={cn('text-3xl whitespace-nowrap sm:text-4xl lg:text-5xl', className)}
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

interface HeroSubtitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function HeroSubtitle({ children, ...props }: Omit<HeroSubtitleProps, 'className'>) {
  return (
    <HStack align="center" justify="center" gap="xs" {...props}>
      <SparklesIcon />
      <Text color={'secondary' as any} className="text-sm sm:text-base">
        {children}
      </Text>
      <SparklesIcon />
    </HStack>
  )
}

interface HeroDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function HeroDescription({ children, className, ...props }: HeroDescriptionProps) {
  return (
    <Text 
      variant="muted" 
      font="body"
      color={'secondary' as any}
      className={cn('text-xs italic sm:text-sm text-[#8b7355]', className)}
      {...props}
    >
      {children}
    </Text>
  )
}
