import { forwardRef } from 'react'

import { Card, type CardRootProps } from '@/components/ui/core/card'

export interface NarrativeCardProps extends Omit<CardRootProps, 'p'> {
  variant?: 'primary' | 'secondary' | 'subtle' | 'ghost'
  p?: CardRootProps['p']
}

/**
 * A standard, beautifully padded cinematic card prefab.
 * Bakes in the responsive padding `p="md" md={{ p: 'lg' }}` pattern
 * to prevent repetitive prop-drilling across the frontend.
 */
const NarrativeCardRoot = forwardRef<HTMLElement, NarrativeCardProps>(
  ({ variant = 'subtle', gap = 'md', className, children, p, ...props }, ref) => {
    // We preserve the md override if users explicitly pass it, otherwise fallback to md={{ p: 'lg' }}
    const mdConfig = props.md ? { p: 'lg', ...props.md } : { p: 'lg' }

    return (
      <Card
        ref={ref}
        variant={variant}
        p={p ?? 'md'}
        md={mdConfig}
        gap={gap}
        className={className}
        {...props}
      >
        {children}
      </Card>
    )
  }
)

NarrativeCardRoot.displayName = 'NarrativeCard'

export const NarrativeCard = Object.assign(
  NarrativeCardRoot,
  {
    Header: Card.Header,
    Title: Card.Title,
    Content: Card.Content,
    Footer: Card.Footer,
  }
)
