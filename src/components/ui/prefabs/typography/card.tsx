import * as React from 'react'

import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Heading } from '@/components/ui/core/typography'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  icon?: React.ReactNode | LucideIcon
  level?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function CardTitle({
  children,
  icon: Icon,
  className,
  level = 'h2',
  ...props
}: CardTitleProps) {
  if (!children) return null

  return (
    <Heading
      level={level}
      font="fantasy"
      color={'gold' as any}
      className={cn('flex items-center gap-2 text-base font-normal', className)}
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
