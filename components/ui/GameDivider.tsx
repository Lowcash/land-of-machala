import { cn } from '@/lib/utils'

interface GameDividerProps {
  label?: string
  className?: string
}

export function GameDivider({ label, className }: GameDividerProps) {
  return (
    <div className={cn('my-6 flex items-center gap-4', className)}>
      <div className="via-game-copper h-px flex-1 bg-linear-to-r from-transparent to-transparent"></div>
      {label && <span className="font-fantasy text-game-copper-muted text-xs">{label}</span>}
      <div className="via-game-copper h-px flex-1 bg-linear-to-r from-transparent to-transparent"></div>
    </div>
  )
}
