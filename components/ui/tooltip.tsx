import { Span } from './typography'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  // Simplified since Radix Tooltip was removed to reduce dependencies
  return (
    <Span
      title={typeof content === 'string' ? content : undefined}
      _internalClassName="cursor-help underline decoration-white/20 decoration-dotted underline-offset-4"
    >
      {children}
    </Span>
  )
}
