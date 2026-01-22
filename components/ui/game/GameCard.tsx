import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GameCardProps {
  title?: string
  children: ReactNode
  className?: string
  footer?: ReactNode
}

export function GameCard({ title, children, className, footer }: GameCardProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-0 w-full flex-col overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 shadow-xl backdrop-blur-md',
        className
      )}
    >
      {title && (
        <div className="border-b border-[#8b6f47] bg-black/40 px-4 py-2">
          <h3 className="text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            {title}
          </h3>
        </div>
      )}

      <div className="scrollbar-custom flex-1 overflow-y-auto p-4">{children}</div>

      {footer && <div className="border-t border-[#8b6f47] bg-black/40 px-4 py-3">{footer}</div>}
    </div>
  )
}
