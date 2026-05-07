import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

type CardWidth = 'auto' | 'content'

const CARD_WIDTH_CLASS: Record<CardWidth, string> = {
  auto: '',
  content: 'w-full max-w-3xl',
}

type CardProps = NativePropsWithoutClassNameStyle<React.HTMLAttributes<HTMLDivElement>> & {
  centered?: boolean
  fillHeight?: boolean
  width?: CardWidth
}

export function Card({
  centered = false,
  fillHeight = false,
  width = 'auto',
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface-container/80 rounded-panel flex flex-col border border-white/8 p-(--inset-panel) shadow-(--shadow-surface) backdrop-blur-xl',
        centered && 'mx-auto',
        fillHeight && 'h-full',
        CARD_WIDTH_CLASS[width]
      )}
      {...props}
    />
  )
}
