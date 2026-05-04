import clsx from 'clsx'

import { Stack } from '@/components/ui/core/layout'
import {
  BodyText,
  LabelText,
  type LabelTextAs,
  type LabelTextTone,
  TEXT_ALIGN_CLASS,
  type TextAlign,
} from '@/components/ui/core/typography-text'

type DisplayValueProps = {
  align?: TextAlign
  children: React.ReactNode
  size?: 'lg' | 'xl'
  tone?: 'default' | 'primary'
}

const DISPLAY_VALUE_SIZE_CLASS: Record<NonNullable<DisplayValueProps['size']>, string> = {
  lg: 'text-xl md:text-2xl',
  xl: 'text-2xl md:text-3xl',
}

const DISPLAY_VALUE_TONE_CLASS: Record<NonNullable<DisplayValueProps['tone']>, string> = {
  default: 'text-on-surface',
  primary: 'text-primary',
}

export function DisplayValue({
  align = 'left',
  children,
  size = 'lg',
  tone = 'default',
}: DisplayValueProps) {
  return (
    <p
      className={clsx(
        'font-headline tabular-nums',
        TEXT_ALIGN_CLASS[align],
        DISPLAY_VALUE_SIZE_CLASS[size],
        DISPLAY_VALUE_TONE_CLASS[tone]
      )}
    >
      {children}
    </p>
  )
}

type BrandWordmarkProps = {
  align?: TextAlign
  children: React.ReactNode
}

export function BrandWordmark({ align = 'left', children }: BrandWordmarkProps) {
  return (
    <p
      className={clsx(
        'font-brand text-primary text-xl tracking-[0.24em] uppercase md:text-2xl',
        TEXT_ALIGN_CLASS[align]
      )}
    >
      {children}
    </p>
  )
}

type PageHeadlineProps = {
  children: React.ReactNode
  className?: string
  size?: 'desktop' | 'mobile'
}

export function PageHeadline({ children, className, size = 'desktop' }: PageHeadlineProps) {
  return (
    <h1
      className={clsx(
        'font-headline leading-tight text-white',
        size === 'desktop' ? 'text-4xl xl:text-5xl' : 'text-2xl sm:text-3xl',
        className
      )}
    >
      {children}
    </h1>
  )
}

type SectionTitleProps = {
  align?: TextAlign
  className?: string
  description?: React.ReactNode
  descriptionItalic?: boolean
  descriptionSize?: 'base' | 'lg'
  overline?: React.ReactNode
  overlineAs?: Exclude<LabelTextAs, 'label'>
  overlineTone?: LabelTextTone
  showDivider?: boolean
  title: React.ReactNode
  titleSize?: 'lg' | 'xl'
}

export function SectionTitle({
  align = 'center',
  className,
  description,
  descriptionItalic = false,
  descriptionSize = 'base',
  overline,
  overlineAs = 'p',
  overlineTone = 'primary',
  showDivider = false,
  title,
  titleSize = 'xl',
}: SectionTitleProps) {
  const isCentered = align === 'center'

  return (
    <Stack className={clsx(isCentered ? 'text-center' : 'text-left', className)} gap="sm">
      {overline ? (
        <LabelText align={align} as={overlineAs} tone={overlineTone}>
          {overline}
        </LabelText>
      ) : null}
      <h2
        className={clsx(
          'font-headline text-white',
          titleSize === 'xl' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
        )}
      >
        {title}
      </h2>
      {description ? (
        <div className={isCentered ? 'mx-auto max-w-2xl' : ''}>
          <BodyText
            align={align}
            italic={descriptionItalic}
            size={descriptionSize === 'lg' ? 'base' : 'sm'}
            tone="muted"
          >
            {description}
          </BodyText>
        </div>
      ) : null}
      {showDivider ? (
        <div className={clsx('bg-primary/30 h-px w-24', isCentered && 'mx-auto')} />
      ) : null}
    </Stack>
  )
}
