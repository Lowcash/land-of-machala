import * as React from 'react'

import { LucideIcon } from 'lucide-react'

import { Heading, TextProps } from '@/components/ui/core/typography'

interface CardTitleProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'className' | 'style' | 'color'
> {
  children: React.ReactNode
  icon?: React.ReactNode | LucideIcon
  level?: 'h1' | 'h2' | 'h3' | 'h4'
  align?: TextProps['align']
}

export function CardTitle({ children, icon: Icon, level = 'h2', align, ...props }: CardTitleProps) {
  if (!children) return null

  return (
    <Heading
      level={level}
      font="fantasy"
      color="gold"
      align={align}
      className="flex items-center gap-2 text-base font-normal"
      {...props}
    >
      {Icon && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          {typeof Icon === 'function' ? <Icon size={20} /> : Icon}
        </span>
      )}
      {children}
    </Heading>
  )
}
