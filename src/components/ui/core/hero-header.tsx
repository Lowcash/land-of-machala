import * as React from 'react'
import { Heading, Text } from './typography'

interface HeroHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  title?: string
  subtitle?: string
  description?: string
}

export function HeroHeader({ title, subtitle, description, ...props }: HeroHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center" {...props}>
      {title && (
        <Heading level="h1" font="medieval">
          {title}
        </Heading>
      )}
      {subtitle && (
        <Heading level="h2">
          {subtitle}
        </Heading>
      )}
      {description && (
        <Text variant="lead">
          {description}
        </Text>
      )}
    </div>
  )
}
