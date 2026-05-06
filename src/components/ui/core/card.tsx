import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

type CardWidth = '3xl' | 'auto'

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
        'bg-surface-container/80 flex flex-col border border-white/8 shadow-(--shadow-gilded) backdrop-blur-xl',
        centered && 'mx-auto',
        fillHeight && 'h-full'
      )}
      {...props}
    />
  )
}
