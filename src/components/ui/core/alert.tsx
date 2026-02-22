'use client'

import * as React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Label, Description } from '@/components/ui/prefabs/typography/shared'
import { stackVariants } from './stack'

const alertVariants = cva(
  'relative w-full overflow-hidden rounded-lg border-2 backdrop-blur-md shadow-lg shadow-black/40',
  {
    variants: {
      variant: {
        default: 'border-(--color-secondary)/40 bg-black/80 text-(--color-ivory)',
        ornamental: 'border-(--color-gold) bg-black/90 text-(--color-gold) shadow-[0_0_15px_rgba(var(--color-gold-rgb),0.1)]',
        success: 'border-(--color-success)/60 bg-(--color-success)/10 text-(--color-success)',
        danger: 'border-(--color-danger)/60 bg-(--color-danger)/10 text-(--color-danger)',
        warning: 'border-(--color-warning)/60 bg-(--color-warning)/10 text-(--color-warning)',
        info: 'border-(--color-info)/60 bg-(--color-info)/10 text-(--color-info)',
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
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
    <motion.div
      initial={{ height: 0, opacity: 0, y: 10 }}
      animate={{ height: 'auto', opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: 10 }}
      transition={{ 
        type: 'spring', 
        damping: 30, 
        stiffness: 250,
        opacity: { duration: 0.2 }
      }}
      style={{ originY: 0 }}
      role="alert"
    >
      <div 
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
              "absolute left-0 top-0 bottom-0 w-1",
              variant === 'success' && "bg-(--color-success)",
              variant === 'danger' && "bg-(--color-danger)",
              variant === 'warning' && "bg-(--color-warning)",
              variant === 'info' && "bg-(--color-info)"
            )}
          />
        )}

        {showIcon && (
          <div className="shrink-0 pt-0.5">
            <IconComponent className="h-5 w-5 opacity-90" />
          </div>
        )}

        <div className={cn(stackVariants({ direction: 'col', gap: 'xs', flex: '1' }))}>
          {title && (
            <Label align="left" color="primary">
              {title}
            </Label>
          )}
          <Description align="left" color="inherit" opacity="90">
            {children}
          </Description>
        </div>
      </div>
    </motion.div>
  )
}
