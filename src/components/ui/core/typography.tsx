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
      className={[
        align === 'center' ? 'text-center' : 'text-left',
        size === 'base' ? 'text-base leading-7 md:leading-8' : 'text-sm leading-6',
        tone === 'default' ? 'text-on-surface' : 'text-on-surface-variant',
        italic ? 'italic' : '',
      ].join(' ')}
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
      className={[
        'font-label text-[10px] tracking-[0.18em] uppercase',
        tone === 'default' ? 'text-outline' : 'text-on-surface-variant/70',
      ].join(' ')}
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
      className={[
        'font-headline tabular-nums',
        align === 'center' ? 'text-center' : 'text-left',
        size === 'xl' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
        tone === 'primary' ? 'text-primary' : 'text-on-surface',
      ].join(' ')}
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
      className={[
        'font-brand text-primary text-xl tracking-[0.24em] uppercase md:text-2xl',
        align === 'center' ? 'text-center' : 'text-left',
      ].join(' ')}
    >
      {children}
    </p>
  )
}

type PageHeadlineProps = {
  children: React.ReactNode
  size?: 'desktop' | 'mobile'
}

export function PageHeadline({ children, size = 'desktop' }: PageHeadlineProps) {
  return (
    <h1
      className={[
        'font-headline leading-tight text-white',
        size === 'desktop' ? 'text-4xl xl:text-5xl' : 'text-3xl sm:text-4xl',
      ].join(' ')}
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
      className={[
        'font-label text-[11px] tracking-[0.28em] uppercase',
        align === 'center' ? 'text-center' : 'text-left',
        tone === 'primary' ? 'text-primary' : 'text-primary/80',
      ].join(' ')}
    >
      {children}
    </p>
  )
}

type SectionTitleProps = {
  align?: TextAlign
  description?: React.ReactNode
  descriptionItalic?: boolean
  descriptionSize?: 'base' | 'lg'
  overline?: React.ReactNode
  showDivider?: boolean
  title: React.ReactNode
  titleSize?: 'lg' | 'xl'
}

export function SectionTitle({
  align = 'center',
  description,
  descriptionItalic = false,
  descriptionSize = 'base',
  overline,
  showDivider = false,
  title,
  titleSize = 'xl',
}: SectionTitleProps) {
  const isCentered = align === 'center'

  return (
    <div className={['space-y-2', isCentered ? 'text-center' : 'text-left'].join(' ')}>
      {overline ? <Eyebrow align={align}>{overline}</Eyebrow> : null}
      <h2
        className={[
          'font-headline text-white',
          titleSize === 'xl' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl',
        ].join(' ')}
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
        <div className={['bg-primary/30 h-px w-24', isCentered ? 'mx-auto' : ''].join(' ')} />
      ) : null}
    </div>
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
      className={[
        reserveSpace ? 'min-h-4' : '',
        'text-xs',
        tone === 'error' ? 'font-label text-error' : '',
        tone === 'invisible' ? 'text-transparent' : '',
        tone === 'default' ? 'text-on-surface-variant' : '',
      ].join(' ')}
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
      className={[
        'inline-flex gap-2',
        align === 'start' ? 'items-start' : 'items-center',
        width === 'full' ? 'w-full' : '',
      ].join(' ')}
    >
      <span className="shrink-0">{icon}</span>
      <span className="block flex-1">{children}</span>
    </span>
  )
}
