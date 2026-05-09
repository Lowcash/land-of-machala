import clsx from 'clsx'

// --- Shared ---

type TextAs = 'div' | 'p' | 'span'
export type TextAlign = 'center' | 'left'
export type TextTone = 'default' | 'error' | 'inherit' | 'muted' | 'primary' | 'soft'

export const TEXT_TRACKING_CLASS = {
  display: 'tracking-display',
  ui: 'tracking-ui',
} as const

const TEXT_ALIGN_CLASS: Record<TextAlign, string> = {
  center: 'text-center',
  left: 'text-left',
}

type BaseTextProps<As, Tone> = {
  align?: TextAlign
  as?: As
  children: React.ReactNode
  tone?: Tone
}

type SizedTextProps<As, Tone, Size> = BaseTextProps<As, Tone> & {
  size?: Size
}

// --- HeadingText ---

export type HeadingTextAs = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
export type HeadingTextSize = 'heading' | 'page'
export type HeadingTextTone = Extract<TextTone, 'default' | 'inherit' | 'primary'>

type HeadingTextProps = SizedTextProps<HeadingTextAs, HeadingTextTone, HeadingTextSize> & {
  italic?: boolean
}

const HEADING_TEXT_BASE_CLASS = 'font-display leading-(--line-height-tight) text-trim'

const HEADING_TEXT_SIZE_CLASS: Record<HeadingTextSize, string> = {
  heading: 'text-scale-4',
  page: 'text-scale-5',
}

const HEADING_TEXT_TONE_CLASS: Record<HeadingTextTone, string> = {
  default: 'text-white',
  inherit: '',
  primary: 'text-primary',
}

export function HeadingText({
  align = 'left',
  as = 'p',
  children,
  italic = false,
  size = 'heading',
  tone = 'default',
}: HeadingTextProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        HEADING_TEXT_BASE_CLASS,
        HEADING_TEXT_SIZE_CLASS[size],
        TEXT_ALIGN_CLASS[align],
        HEADING_TEXT_TONE_CLASS[tone],
        italic && 'italic'
      )}
    >
      {children}
    </Component>
  )
}

// --- BodyText ---

type BodyTextTone = Extract<TextTone, 'default' | 'error' | 'inherit' | 'muted'>
export type BodyTextSize = 'body' | 'label' | 'title'

type BodyTextProps = BaseTextProps<TextAs, BodyTextTone> & {
  italic?: boolean
  size?: BodyTextSize
}

const BODY_TEXT_SIZE_CLASS: Record<BodyTextSize, string> = {
  body: 'text-scale-2',
  label: 'text-scale-1',
  title: 'text-scale-3',
}

const BODY_TEXT_TONE_CLASS: Record<BodyTextTone, string> = {
  default: 'text-on-surface',
  inherit: '',
  error: 'text-error',
  muted: 'text-on-surface-variant',
}

export function BodyText({
  align = 'left',
  as = 'p',
  children,
  italic = false,
  size = 'body',
  tone = 'default',
}: BodyTextProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        'text-trim',
        'leading-(--line-height-relaxed)',
        BODY_TEXT_SIZE_CLASS[size],
        TEXT_ALIGN_CLASS[align],
        BODY_TEXT_TONE_CLASS[tone],
        italic && 'italic'
      )}
    >
      {children}
    </Component>
  )
}

// --- LabelText ---

export type LabelTextAs = 'div' | 'label' | 'p' | 'span'
export type LabelTextSize = 'body' | 'label'
export type LabelTextTone = TextTone

type LabelTextProps = SizedTextProps<LabelTextAs, LabelTextTone, LabelTextSize> & {
  htmlFor?: string
  uppercase?: boolean
}

const LABEL_TEXT_BASE_CLASS = 'font-interface leading-(--line-height-snug) text-trim'

const LABEL_TEXT_SIZE_CLASS: Record<LabelTextSize, string> = {
  body: 'text-scale-2',
  label: 'text-scale-1',
}

const LABEL_TEXT_TONE_CLASS: Record<LabelTextTone, string> = {
  default: 'text-outline',
  inherit: '',
  error: 'text-error',
  muted: 'text-on-surface-variant/80',
  primary: 'text-primary',
  soft: 'text-on-surface-variant/70',
}

export function LabelText({
  align = 'left',
  as = 'p',
  children,
  htmlFor,
  size = 'label',
  tone = 'primary',
  uppercase = false,
}: LabelTextProps) {
  const Component = as as React.ElementType

  return (
    <Component
      className={clsx(
        LABEL_TEXT_BASE_CLASS,
        TEXT_ALIGN_CLASS[align],
        LABEL_TEXT_SIZE_CLASS[size],
        LABEL_TEXT_TONE_CLASS[tone],
        uppercase && 'uppercase',
        as === 'label' && 'block'
      )}
      htmlFor={as === 'label' ? htmlFor : undefined}
    >
      {children}
    </Component>
  )
}

// --- DisplayValue ---

export type DisplayValueSize = 'compact' | 'heading' | 'hero'

type DisplayValueTone = Extract<TextTone, 'default' | 'inherit' | 'primary'>

type DisplayValueProps = SizedTextProps<TextAs, DisplayValueTone, DisplayValueSize>

const DISPLAY_VALUE_BASE_CLASS =
  'font-display font-bold tabular-nums leading-(--line-height-solid) text-trim'

const DISPLAY_VALUE_SIZE_CLASS: Record<DisplayValueSize, string> = {
  compact: 'text-scale-3',
  heading: 'text-scale-4',
  hero: 'text-scale-6',
}

const DISPLAY_VALUE_TONE_CLASS: Record<DisplayValueTone, string> = {
  default: 'text-on-surface',
  inherit: '',
  primary: 'text-primary',
}

export function DisplayValue({
  align = 'left',
  as = 'p',
  children,
  size = 'heading',
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

// --- BrandWordmark ---

const BRAND_WORDMARK_CLASS = clsx(
  'font-wordmark text-scale-3 text-brand-wordmark uppercase leading-(--line-height-tight) text-trim opacity-90',
  TEXT_TRACKING_CLASS.display
)

export function BrandWordmark({ children }: { children: React.ReactNode }) {
  return <p className={BRAND_WORDMARK_CLASS}>{children}</p>
}
