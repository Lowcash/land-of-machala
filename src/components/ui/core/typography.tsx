import clsx from 'clsx'

import { Stack } from '@/components/ui/core/layout'

type TextAlign = 'center' | 'left'

type BodyTextProps = {
  align?: TextAlign
  children: React.ReactNode
  italic?: boolean
  size?: 'sm' | 'base'
  tone?: 'default' | 'muted'
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
        align === 'center' ? 'text-center' : 'text-left',
        size === 'base' ? 'text-base leading-7 md:leading-8' : 'text-sm leading-6',
        tone === 'default' ? 'text-on-surface' : 'text-on-surface-variant',
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

export function MetaLabel({ children, tone = 'default' }: MetaLabelProps) {
  return (
    <p
      className={clsx(
        'font-label text-[10px] tracking-[0.18em] uppercase',
        tone === 'default' ? 'text-outline' : 'text-on-surface-variant/70'
      )}
    >
      {children}
    </p>
  )
}

type DisplayValueProps = {
  align?: TextAlign
  children: React.ReactNode
  size?: 'lg' | 'xl'
  tone?: 'default' | 'primary'
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
        align === 'center' ? 'text-center' : 'text-left',
        size === 'xl' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
        tone === 'primary' ? 'text-primary' : 'text-on-surface'
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
        align === 'center' ? 'text-center' : 'text-left'
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

type EyebrowProps = {
  align?: TextAlign
  children: React.ReactNode
  tone?: 'muted' | 'primary'
}

export function Eyebrow({ align = 'left', children, tone = 'primary' }: EyebrowProps) {
  return (
    <p
      className={clsx(
        'font-label text-[11px] tracking-[0.28em] uppercase',
        align === 'center' ? 'text-center' : 'text-left',
        tone === 'primary' ? 'text-primary' : 'text-outline'
      )}
    >
      {children}
    </p>
  )
}

type SectionTitleProps = {
  align?: TextAlign
  className?: string
  description?: React.ReactNode
  descriptionItalic?: boolean
  descriptionSize?: 'base' | 'lg'
  overline?: React.ReactNode
  overlineTone?: EyebrowProps['tone']
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
  overlineTone = 'primary',
  showDivider = false,
  title,
  titleSize = 'xl',
}: SectionTitleProps) {
  const isCentered = align === 'center'

  return (
    <Stack className={clsx(isCentered ? 'text-center' : 'text-left', className)} gap="sm">
      {overline ? (
        <Eyebrow align={align} tone={overlineTone}>
          {overline}
        </Eyebrow>
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
