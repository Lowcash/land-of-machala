'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Heading } from '@/components/ui/core/typography'
import { Expand } from '@/components/ui/prefabs/animations/expand'
import { Description, Label } from '@/components/ui/prefabs/typography/shared'

import { VStack, stackVariants } from './stack'

const alertVariants = cva(
  'relative w-full overflow-hidden rounded-lg border shadow-lg shadow-black/40',
  {
    variants: {
      variant: {
        default: 'border-(--color-secondary)/40 bg-black/90 text-(--color-ivory) backdrop-blur-md',
        ornamental:
          'border-(--color-gold) bg-black/95 text-(--color-gold) shadow-[0_0_15px_rgba(var(--color-gold-rgb),0.1)] backdrop-blur-md',
        success: 'border-(--color-success)/60 bg-black/85 text-(--color-success) backdrop-blur-md',
        danger: 'border-(--color-danger)/60 bg-black/85 text-(--color-danger) backdrop-blur-md',
        warning: 'border-(--color-warning)/60 bg-black/85 text-(--color-warning) backdrop-blur-md',
        info: 'border-(--color-info)/60 bg-black/85 text-(--color-info) backdrop-blur-md',
      },
      size: {
        default: 'p-4',
        sm: 'p-3',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const iconMap = {
  default: Info,
  ornamental: Info,
  success: CheckCircle2,
  danger: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string
  icon?: React.ElementType
  showIcon?: boolean
}

export function Alert({
  variant = 'default',
  size,
  title,
  icon,
  showIcon = true,
  children,
  ...props
}: AlertProps) {
  const IconComponent = icon || iconMap[variant as keyof typeof iconMap] || Info

  return (
    <Expand>
      <div
        role="alert"
        className={cn(
          alertVariants({ variant, size }),
          stackVariants({ direction: 'row', align: 'start', gap: 'md' })
        )}
        {...props}
      >
        {/* Heraldic color strip on the left for certain variants */}
        {variant !== 'default' && variant !== 'ornamental' && (
          <div
            className={cn(
              'absolute top-0 bottom-0 left-0 w-1',
              variant === 'success' && 'bg-(--color-success)',
              variant === 'danger' && 'bg-(--color-danger)',
              variant === 'warning' && 'bg-(--color-warning)',
              variant === 'info' && 'bg-(--color-info)'
            )}
          />
        )}

        {showIcon && (
          <div className="shrink-0 pt-0.5">
            <IconComponent className="h-5 w-5 opacity-90" />
          </div>
        )}

        <VStack gap="xs" flex="1">
          {title && (
            <Label align="left" color="primary">
              {title}
            </Label>
          )}
          <Description align="left">{children}</Description>
        </VStack>
      </div>
    </Expand>
  )
}
