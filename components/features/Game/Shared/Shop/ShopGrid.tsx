import { cn } from '@/lib/utils'

interface ShopGridProps {
  children: React.ReactNode
  className?: string
}

export function ShopGrid({ children, className }: ShopGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 pb-20 sm:grid-cols-3 lg:grid-cols-4', // pb-20 for bottom safe area
        className
      )}
    >
      {children}
    </div>
  )
}
