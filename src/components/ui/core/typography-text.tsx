import clsx from 'clsx'

export type TextAlign = 'center' | 'left'
export type LabelTextAs = 'label' | 'p' | 'span'
export type LabelTextSize = 'default' | 'meta'
export type LabelTextTone = 'default' | 'error' | 'muted' | 'primary' | 'soft'

const LABEL_TEXT_BASE_CLASS = 'font-label uppercase'

export const TEXT_ALIGN_CLASS: Record<TextAlign, string> = {
  center: 'text-center',
  left: 'text-left',
}

type BodyTextProps = {
  align?: TextAlign
  children: React.ReactNode
  italic?: boolean
  tone?: 'default' | 'muted'
}

const BODY_TEXT_TONE_CLASS: Record<NonNullable<BodyTextProps['tone']>, string> = {
  default: 'text-on-surface',
  muted: 'text-on-surface-variant',
}

export function BodyText({
  align = 'left',
  children,
  italic = false,
  tone = 'default',
}: BodyTextProps) {
  return (
    <p className={clsx(TEXT_ALIGN_CLASS[align], BODY_TEXT_TONE_CLASS[tone], italic && 'italic')}>
      {children}
    </p>
  )
}

type MetaLabelProps = {
  children: React.ReactNode
  tone?: 'default' | 'muted'
}

export function MetaLabel({ children, tone = 'default' }: MetaLabelProps) {
  return <LabelText tone={tone === 'default' ? 'default' : 'soft'}>{children}</LabelText>
}

const LABEL_TEXT_TONE_CLASS: Record<LabelTextTone, string> = {
  default: 'text-outline',
  error: 'text-error',
  muted: 'text-on-surface-variant/80',
  primary: 'text-primary',
  soft: 'text-on-surface-variant/70',
}

type LabelTextProps = {
  align?: TextAlign
  as?: LabelTextAs
  children: React.ReactNode
  className?: string
  htmlFor?: string
  tone?: LabelTextTone
}

export function LabelText({
  align = 'left',
  as = 'p',
  children,
  className,
  htmlFor,
  tone = 'primary',
}: LabelTextProps) {
  const labelClassName = clsx(
    LABEL_TEXT_BASE_CLASS,
    TEXT_ALIGN_CLASS[align],
    LABEL_TEXT_TONE_CLASS[tone],
    className
  )

  if (as === 'label') {
    return (
      <label className={labelClassName} htmlFor={htmlFor}>
        {children}
      </label>
    )
  }

  if (as === 'span') {
    return <span className={labelClassName}>{children}</span>
  }

  return <p className={labelClassName}>{children}</p>
}

type HelperTextProps = {
  children?: React.ReactNode
  reserveSpace?: boolean
  tone?: 'default' | 'error' | 'invisible'
}

export function HelperText({ children, reserveSpace = true, tone = 'default' }: HelperTextProps) {
  const text = children ?? (reserveSpace ? '\u00A0' : null)

  return (
    <p
      className={clsx(
        reserveSpace && 'min-h-4',
        tone === 'error' ? 'font-label text-error' : '',
        tone === 'invisible' ? 'text-transparent' : '',
        tone === 'default' ? 'text-on-surface-variant' : ''
      )}
    >
      {text}
    </p>
  )
}

type DisplayValueProps = {
  align?: TextAlign
  children: React.ReactNode
  tone?: 'default' | 'primary'
}

const DISPLAY_VALUE_TONE_CLASS: Record<NonNullable<DisplayValueProps['tone']>, string> = {
  default: 'text-on-surface',
  primary: 'text-primary',
}

export function DisplayValue({ align = 'left', children, tone = 'default' }: DisplayValueProps) {
  return (
    <p
      className={clsx(
        'font-headline tabular-nums',
        TEXT_ALIGN_CLASS[align],
        DISPLAY_VALUE_TONE_CLASS[tone]
      )}
    >
      {children}
    </p>
  )
}
