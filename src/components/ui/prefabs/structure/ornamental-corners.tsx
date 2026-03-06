import { cn } from '@/lib/utils'

interface OrnamentalCornersProps {
  isEnemy?: boolean
  className?: string
}

/**
 * A reusable decorative prefab for medieval-style corners.
 * Features rivets and gold/blood secondary borders.
 */
export function OrnamentalCorners({ isEnemy, className }: OrnamentalCornersProps) {
  const borderColor = isEnemy ? 'border-(--color-danger)/20' : 'border-(--color-secondary)/20'
  const rivetColor = isEnemy ? 'bg-(--color-danger)/40' : 'bg-(--color-secondary)/40'

  return (
    <div className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-lg', className)}>
      {/* Ornamental Borders */}
      <span
        className={cn(
          'absolute inset-1 rounded-sm border-[0.5px] opacity-20',
          borderColor
        )}
      />

      {/* Riven corners (visual flavor) */}
      <i className={cn('absolute top-1 left-1 h-1.5 w-1.5 rounded-full shadow-inner', rivetColor)} />
      <i className={cn('absolute top-1 right-1 h-1.5 w-1.5 rounded-full shadow-inner', rivetColor)} />
      <i className={cn('absolute bottom-1 left-1 h-1.5 w-1.5 rounded-full shadow-inner', rivetColor)} />
      <i className={cn('absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full shadow-inner', rivetColor)} />
    </div>
  )
}
