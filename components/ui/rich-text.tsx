import { cn } from '@/lib/utils'

import { P, Span } from './typography'

interface RichTextProps {
  content: string
  className?: string
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  italic?: boolean
  color?:
    | 'gold'
    | 'gold-muted'
    | 'copper'
    | 'copper-muted'
    | 'muted'
    | 'danger'
    | 'success'
    | 'magic'
    | 'info'
    | 'default'
  _internalClassName?: string
  _internalStyle?: React.CSSProperties
}

/**
 * RichText Component
 * Safely renders string content containing simple HTML-like tags (span, br)
 * and maps legacy hex color classes to the design system.
 */
export function RichText({
  content,
  className,
  as = 'p',
  size,
  italic = false,
  color,
  _internalClassName,
  _internalStyle,
}: RichTextProps) {
  // Map legacy hex colors and shorthand classes to design system variants
  const processContent = (text: string) => {
    return (
      text
        // Hex map (legacy)
        .replace(/text-\[#ffd700\]/g, 'text-game-gold')
        .replace(/text-\[#d4a574\]/g, 'text-game-gold-muted')
        .replace(/text-\[#6fbf6f\]/g, 'text-game-success')
        .replace(/text-\[#ff6b6b\]/g, 'text-game-danger')
        .replace(/text-\[#69ccf0\]/g, 'text-game-info')
        .replace(/text-\[#b66bd4\]/g, 'text-game-magic')
        .replace(/text-\[#8b7355\]/g, 'text-game-copper-muted')
        // Shorthand map (transitionary)
        .replace(/text-gold-muted/g, 'text-game-gold-muted')
        .replace(/text-gold/g, 'text-game-gold')
        .replace(/text-danger/g, 'text-game-danger')
        .replace(/text-success/g, 'text-game-success')
        .replace(/text-info/g, 'text-game-info')
        .replace(/text-magic/g, 'text-game-magic')
        .replace(/text-muted/g, 'text-game-copper-muted')
        .replace(/text-cold/g, 'text-game-info')
    )
  }

  const processed = processContent(content)

  // Use dangerouslySetInnerHTML for the legacy descriptions
  const Component = as === 'p' ? P : as === 'span' ? Span : 'div'

  return (
    <Component
      className={cn('leading-relaxed', italic && 'italic', className)}
      size={size}
      color={color}
      _internalClassName={_internalClassName}
      _internalStyle={_internalStyle}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  )
}
