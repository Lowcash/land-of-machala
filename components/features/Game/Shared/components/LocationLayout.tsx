import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'

interface LocationLayoutProps {
  /** Optional title for the location info box */
  title?: string
  /** Optional lore or description text in italics */
  description?: string | ReactNode
  /** Main content of the location */
  children: ReactNode
  /** Additional container classes */
  className?: string
}

/**
 * Shared layout for all location action views (Town, Bank, Shops, etc.)
 * Provides a consistent info card at the top and standard spacing.
 */
export function LocationLayout({ title, description, children, className }: LocationLayoutProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <Card variant="muted" className="mb-2 p-3">
          {title && (
            <h4 className="mb-1 text-xs font-bold tracking-wider text-[#d4a574] uppercase">
              {title}
            </h4>
          )}
          {description && typeof description === 'string' ? (
            <p className="text-[11px] leading-relaxed text-[#8b7355] italic">
              &quot;{description}&quot;
            </p>
          ) : (
            description
          )}
        </Card>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}
