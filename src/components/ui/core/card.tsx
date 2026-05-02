type CardPadding = 'cozy' | 'roomy' | 'none'
type CardWidth = '2xl' | '4xl' | 'auto'
type CardMinHeight = 'entry' | 'none'
type CardLayout = 'none' | 'stack'
type CardGap = '3' | '4' | '5' | '6' | '8'

const CARD_PADDING_CLASS: Record<CardPadding, string> = {
  cozy: 'p-5 md:p-6',
  roomy: 'p-8 md:p-10',
  none: '',
}

const CARD_WIDTH_CLASS: Record<CardWidth, string> = {
  '2xl': 'w-full max-w-2xl',
  '4xl': 'w-full max-w-4xl',
  auto: '',
}

const CARD_MIN_HEIGHT_CLASS: Record<CardMinHeight, string> = {
  entry: 'lg:min-h-150',
  none: '',
}

const CARD_LAYOUT_CLASS: Record<CardLayout, string> = {
  none: '',
  stack: 'flex flex-col',
}

const CARD_GAP_CLASS: Record<CardGap, string> = {
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
}

type CardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
  centered?: boolean
  fillHeight?: boolean
  gap?: CardGap
  layout?: CardLayout
  minHeight?: CardMinHeight
  padding?: CardPadding
  width?: CardWidth
}

export function Card({
  centered = false,
  fillHeight = false,
  gap = '4',
  layout = 'none',
  minHeight = 'none',
  padding = 'none',
  width = 'auto',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'bg-surface-container/80 rounded-(--radius-card) border border-white/8 shadow-(--shadow-gilded) backdrop-blur-xl',
        centered ? 'mx-auto' : '',
        fillHeight ? 'h-full' : '',
        CARD_PADDING_CLASS[padding],
        CARD_WIDTH_CLASS[width],
        CARD_MIN_HEIGHT_CLASS[minHeight],
        CARD_LAYOUT_CLASS[layout],
        layout === 'stack' ? CARD_GAP_CLASS[gap] : '',
      ].join(' ')}
      {...props}
    />
  )
}
