import clsx from 'clsx'

type TextAs = 'div' | 'p' | 'span'
export type TextAlign = 'center' | 'left'
export type TextTone = 'default' | 'error' | 'inherit' | 'muted' | 'primary' | 'soft'

export type HeadingTextAs = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
export type HeadingTextSize = 'page' | 'section'
export type HeadingTextTone = Extract<TextTone, 'default' | 'inherit' | 'primary'>
export type LabelTextAs = 'div' | 'label' | 'p' | 'span'
export type LabelTextSize = 'default' | 'meta'
export type LabelTextTone = TextTone
export type DisplayValueSize = 'default' | 'hero'

export const TEXT_TRACKING_CLASS = {
  action: 'tracking-[0.18em]',
  wordmark: 'tracking-[0.24em]',
} as const

type BodyTextTone = Extract<TextTone, 'default' | 'error' | 'inherit' | 'muted'>
type DisplayValueTone = Extract<TextTone, 'default' | 'inherit' | 'primary'>

type BaseTextProps<As, Tone> = {
  align?: TextAlign
  as?: As
  children: React.ReactNode
  tone?: Tone
}

type SizedTextProps<As, Tone, Size> = BaseTextProps<As, Tone> & {
  size?: Size
}

const HEADING_TEXT_BASE_CLASS = 'font-display leading-tight'
const HEADING_TEXT_SIZE_CLASS: Record<HeadingTextSize, string> = {
  page: 'text-3xl sm:text-4xl lg:text-5xl',
  section: 'text-2xl sm:text-3xl',
}
const LABEL_TEXT_BASE_CLASS = 'font-interface'
const DISPLAY_VALUE_BASE_CLASS = 'font-display tabular-nums'
const DISPLAY_VALUE_SIZE_CLASS: Record<DisplayValueSize, string> = {
  default: 'text-3xl leading-none',
  hero: 'text-5xl leading-none',
}

const TEXT_ALIGN_CLASS: Record<TextAlign, string> = {
  center: 'text-center',
  left: 'text-left',
}

const HEADING_TEXT_TONE_CLASS: Record<HeadingTextTone, string> = {
  default: 'text-white',
  inherit: '',
  primary: 'text-primary',
}

type HeadingTextProps = SizedTextProps<HeadingTextAs, HeadingTextTone, HeadingTextSize>

export function HeadingText({
  align = 'left',
  as = 'p',
  children,
  size = 'section',
  tone = 'default',
}: HeadingTextProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        HEADING_TEXT_BASE_CLASS,
        HEADING_TEXT_SIZE_CLASS[size],
        TEXT_ALIGN_CLASS[align],
        HEADING_TEXT_TONE_CLASS[tone]
      )}
    >
      {children}
    </Component>
  )
}

type BodyTextProps = BaseTextProps<TextAs, BodyTextTone> & {
  italic?: boolean
}

const BODY_TEXT_TONE_CLASS: Record<BodyTextTone, string> = {
  default: 'text-on-surface',
  inherit: '',
  muted: 'text-on-surface-variant',
  error: 'text-error',
}

export function BodyText({
  align = 'left',
  as = 'p',
  children,
  italic = false,
  tone = 'default',
}: BodyTextProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(TEXT_ALIGN_CLASS[align], BODY_TEXT_TONE_CLASS[tone], italic && 'italic')}
    >
      {children}
    </Component>
  )
}

const LABEL_TEXT_TONE_CLASS: Record<LabelTextTone, string> = {
  default: 'text-outline',
  inherit: '',
  primary: 'text-primary',
  soft: 'text-on-surface-variant/70',
  muted: 'text-on-surface-variant/80',
  error: 'text-error',
}

const LABEL_TEXT_SIZE_CLASS: Record<LabelTextSize, string> = {
  default: '',
  meta: 'text-xs',
}

type LabelTextProps = SizedTextProps<LabelTextAs, LabelTextTone, LabelTextSize> & {
  htmlFor?: string
  uppercase?: boolean
}

export function LabelText({
  align = 'left',
  as = 'p',
  children,
  htmlFor,
  size = 'default',
  tone = 'primary',
  uppercase = false,
}: LabelTextProps) {
  const Component = as as React.ElementType
  const labelClassName = clsx(
    LABEL_TEXT_BASE_CLASS,
    TEXT_ALIGN_CLASS[align],
    LABEL_TEXT_SIZE_CLASS[size],
    LABEL_TEXT_TONE_CLASS[tone],
    uppercase && 'uppercase',
    as === 'label' && 'block'
  )

  return (
    <Component className={labelClassName} htmlFor={as === 'label' ? htmlFor : undefined}>
      {children}
    </Component>
  )
}

type DisplayValueProps = SizedTextProps<TextAs, DisplayValueTone, DisplayValueSize>

const DISPLAY_VALUE_TONE_CLASS: Record<DisplayValueTone, string> = {
  default: 'text-on-surface',
  inherit: '',
  primary: 'text-primary',
}

export function DisplayValue({
  align = 'left',
  as = 'p',
  children,
  size = 'default',
  tone = 'default',
}: DisplayValueProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        DISPLAY_VALUE_BASE_CLASS,
        DISPLAY_VALUE_SIZE_CLASS[size],
        TEXT_ALIGN_CLASS[align],
        DISPLAY_VALUE_TONE_CLASS[tone]
      )}
    >
      {children}
    </Component>
  )
}

const BRAND_WORDMARK_CLASS = clsx(
  'font-wordmark text-primary uppercase',
  TEXT_TRACKING_CLASS.wordmark
)

export function BrandWordmark({ children }: { children: React.ReactNode }) {
  return <p className={BRAND_WORDMARK_CLASS}>{children}</p>
}
