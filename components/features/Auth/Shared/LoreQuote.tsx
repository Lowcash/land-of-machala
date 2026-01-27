import { cn } from '@/lib/utils'

interface LoreQuoteProps {
  className?: string
  text: string
}

export function LoreQuote({ className, text }: LoreQuoteProps) {
  return (
    <div
      className={cn(
        'border-game-copper/50 text-game-copper-muted rounded-lg border bg-black/60 p-4 text-center text-sm italic',
        className
      )}
    >
      {text}
    </div>
  )
}
