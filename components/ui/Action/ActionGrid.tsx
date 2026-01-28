import { GameGrid } from '@/components/ui/game-grid'

interface ActionGridProps {
  children: React.ReactNode
  className?: string
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
  }
}

export function ActionGrid({ children, className, columns }: ActionGridProps) {
  return (
    <GameGrid
      className={className}
      columns={columns || { default: 1, sm: 2 }} // Default for actions is usually 1 or 2 cols
      containerClassName="h-auto min-h-0" // Override generic full height if needed, actions are usually part of a layout
    >
      {children}
    </GameGrid>
  )
}
