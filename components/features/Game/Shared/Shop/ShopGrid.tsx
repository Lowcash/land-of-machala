import { cn } from '@/lib/utils'

import { GameGrid } from '@/components/ui/game-grid'

interface ShopGridProps {
  children: React.ReactNode
  className?: string
}

export function ShopGrid({ children, className }: ShopGridProps) {
  return (
    <GameGrid columns={{ default: 2, sm: 3, lg: 4 }} className={cn('pb-20', className)}>
      {children}
    </GameGrid>
  )
}
