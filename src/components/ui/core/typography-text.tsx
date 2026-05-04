import clsx from 'clsx'

export type TextAlign = 'center' | 'left'
export type LabelTextTone = 'error' | 'muted' | 'primary'
export type LabelTextAs = 'label' | 'p' | 'span'

export const TEXT_ALIGN_CLASS: Record<TextAlign, string> = {
  center: 'text-center',
  left: 'text-left',
}

type BodyTextProps = {
  align?: TextAlign
  children: React.ReactNode
  italic?: boolean
  size?: 'sm' | 'base'
  tone?: 'default' | 'muted'
}

const BODY_TEXT_SIZE_CLASS: Record<NonNullable<BodyTextProps['size']>, string> = {
  base: 'text-base leading-7 md:leading-8',
  sm: 'text-sm leading-6',
}

const BODY_TEXT_TONE_CLASS: Record<NonNullable<BodyTextProps['tone']>, string> = {
  default: 'text-on-surface',
  muted: 'text-on-surface-variant',
}

export function BodyText({
  align = 'left',
  children,
  italic = false,
  size = 'base',
  tone = 'default',
}: BodyTextProps) {
  return (
    <p
      className={clsx(
        TEXT_ALIGN_CLASS[align],
        BODY_TEXT_SIZE_CLASS[size],
        BODY_TEXT_TONE_CLASS[tone],
        italic && 'italic'
      )}
    >
      {children}
    </p>
  )
}

type MetaLabelProps = {
  children: React.ReactNode
  tone?: 'default' | 'muted'
}

const META_LABEL_TONE_CLASS: Record<NonNullable<MetaLabelProps['tone']>, string> = {
  default: 'text-outline',
  muted: 'text-on-surface-variant/70',
}

export function MetaLabel({ children, tone = 'default' }: MetaLabelProps) {
  return (
    <p
      className={clsx(
        'font-label text-[10px] tracking-[0.18em] uppercase',
        META_LABEL_TONE_CLASS[tone]
      )}
    >
      {children}
    </p>
  )
}

const LABEL_TEXT_TONE_CLASS: Record<LabelTextTone, string> = {
  error: 'text-error',
  muted: 'text-outline',
  primary: 'text-primary',
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
    'font-label text-xs tracking-[0.24em] uppercase',
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
        'text-xs',
        tone === 'error' ? 'font-label text-error' : '',
        tone === 'invisible' ? 'text-transparent' : '',
        tone === 'default' ? 'text-on-surface-variant' : ''
      )}
    >
      {text}
    </p>
  )
}

type IconLabelProps = {
  align?: 'center' | 'start'
  children: React.ReactNode
  icon: React.ReactNode
  width?: 'auto' | 'full'
}

export function IconLabel({ align = 'center', children, icon, width = 'auto' }: IconLabelProps) {
  return (
    <span
      className={clsx(
        'inline-flex gap-(--space-stack-sm)',
        align === 'start' ? 'items-start' : 'items-center',
        width === 'full' && 'w-full'
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="block flex-1">{children}</span>
    </span>
  )
}
