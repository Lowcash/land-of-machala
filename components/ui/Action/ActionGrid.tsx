import { GameGrid } from '@/components/ui/game-grid'

interface ActionGridProps {
  children: React.ReactNode
  columns?: {
    default?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function ActionGrid({ children, columns }: ActionGridProps) {
  return (
    <GameGrid
      fullHeight={false}
      columns={columns || { default: 1, sm: 2 }} // Default for actions is usually 1 or 2 cols
    >
      {children}
    </GameGrid>
  )
}
