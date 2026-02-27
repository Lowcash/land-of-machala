import { type HTMLAttributes, isValidElement } from 'react'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Heading, TextProps } from '@/components/ui/core/typography'
import { Icon as IconPrefab } from '@/components/ui/icons'

interface CardTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  'className' | 'style' | 'color'
> {
  children: React.ReactNode
  icon?: ReactNode | LucideIcon
  level?: 'h1' | 'h2' | 'h3' | 'h4'
  align?: TextProps['align']
  variant?: 'primary' | 'large' | 'fantasy-value'
}

export function CardTitle({
  children,
  icon: Icon,
  level = 'h2',
  align,
  variant = 'primary',
  ...props
}: CardTitleProps) {
  if (!children) return null

  const sizeClass =
    variant === 'large' ? 'text-xl' : variant === 'fantasy-value' ? 'text-lg' : 'text-base'

  return (
    <Heading
      level={level}
      font="fantasy"
      color="gold"
      align={align}
      className={cn('flex items-center gap-2 font-normal', sizeClass)}
      {...props}
    >
      {Icon && (
        <span className="flex shrink-0">
          {isValidElement(Icon) ? (
            Icon
          ) : (
            <IconPrefab icon={Icon as LucideIcon} size="md" color="gold" />
          )}
        </span>
      )}
      {children}
    </Heading>
  )
}
