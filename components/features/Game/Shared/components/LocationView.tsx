import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'

interface LocationViewProps {
  title: string
  description: string
  icon?: LucideIcon
  children: ReactNode
  aside?: ReactNode
  className?: string
}

/**
 * Unified Location View - Server Component
 * Standardizes the header and layout for all game locations.
 */
export function LocationView({
  title,
  description,
  icon: Icon,
  children,
  aside,
  className,
}: LocationViewProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Card variant="muted" className="border-[#8b6f47]/30 bg-black/40 p-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="mt-1 rounded border border-[#ffd700]/20 bg-[#ffd700]/10 p-2">
              <Icon className="h-5 w-5 text-[#ffd700]" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-bold tracking-wider text-[#ffd700] uppercase">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-[#8b7355] italic">
              &quot;{description}&quot;
            </p>
          </div>
          {aside}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  )
}
