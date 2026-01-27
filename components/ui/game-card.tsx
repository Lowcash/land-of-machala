import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  icon?: LucideIcon
  children: React.ReactNode
}

export function GameCard({ title, icon: Icon, children, className, ...props }: GameCardProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/80 to-black/60 p-4 shadow-lg',
        className
      )}
      {...props}
    >
      {title && (
        <h3
          className="mb-4 flex items-center gap-2 text-base text-[#d4a574]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
