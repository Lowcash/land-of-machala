import { Stack, type StackProps } from '@/components/ui/core/stack'

export interface FeatureGridProps extends Omit<StackProps, 'display' | 'cols' | 'gap'> {
  children: React.ReactNode
  variant?: 'standard' | 'dense' | 'selection'
}

/**
 * A semantic prefab for responsive grids used in Features.
 * - 'standard': 1 column mobile → 2 columns tablet/desktop
 * - 'dense': same layout, tighter gaps
 * - 'selection': always 2 columns (for selection buttons that must never stack)
 */
export function FeatureGrid({ children, variant = 'standard', ...props }: FeatureGridProps) {
  const isDense = variant === 'dense'
  const isSelection = variant === 'selection'

  if (isSelection) {
    return (
      <Stack display="grid" cols="2" gap="sm" fullWidth {...props}>
        {children}
      </Stack>
    )
  }

  return (
    <Stack
      display="grid"
      cols={isDense || isSelection ? '2' : '1'}
      gap={isDense ? 'xs' : 'sm'}
      sm={{ cols: '2', gap: isDense ? 'sm' : 'md' }}
      md={{ cols: '2', gap: isDense ? 'sm' : 'md' }}
      fullWidth
      {...props}
    >
      {children}
    </Stack>
  )
}
