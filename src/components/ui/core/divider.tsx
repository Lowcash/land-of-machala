import clsx from 'clsx'

import { Inline } from '@/components/ui/core/layout'
import { LabelText, type LabelTextTone, type TextAlign } from '@/components/ui/core/typography'

type DividerLineTone = 'default' | 'primary'

type DividerProps = {
  align?: TextAlign
  label?: React.ReactNode
  labelTone?: Extract<LabelTextTone, 'default' | 'primary' | 'soft'>
  short?: boolean
  tone?: DividerLineTone
}

const DIVIDER_LINE_TONE_CLASS: Record<DividerLineTone, string> = {
  default: 'bg-outline-variant/40',
  primary: 'bg-primary/30',
}

export function Divider({
  align = 'center',
  label,
  labelTone = 'soft',
  short = false,
  tone = label ? 'default' : 'primary',
}: DividerProps) {
  if (!label) {
    return (
      <div
        className={clsx(
          'h-px',
          short ? 'w-24' : 'w-full',
          DIVIDER_LINE_TONE_CLASS[tone],
          align === 'center' && 'mx-auto'
        )}
      />
    )
  }

  return (
    <Inline align="center" fullWidth gap="tight">
      <span className={clsx('h-px flex-1', DIVIDER_LINE_TONE_CLASS[tone])} />
      <LabelText size="label" tone={labelTone} uppercase>
        {label}
      </LabelText>
      <span className={clsx('h-px flex-1', DIVIDER_LINE_TONE_CLASS[tone])} />
    </Inline>
  )
}
