import clsx from 'clsx'

import { Stack } from '@/components/ui/core/layout'
import { BodyText, LabelText, type TextAlign } from '@/components/ui/core/typography-text'

export function BrandWordmark({ children }: { children: React.ReactNode }) {
  return <p className="font-brand text-primary tracking-[0.24em] uppercase">{children}</p>
}

type PageHeadlineProps = {
  children: React.ReactNode
}

export function PageHeadline({ children }: PageHeadlineProps) {
  return <h1 className={clsx('font-headline leading-tight text-white')}>{children}</h1>
}

type SectionTitleProps = {
  align?: TextAlign
  description?: React.ReactNode
  descriptionItalic?: boolean
  overline?: React.ReactNode
  showDivider?: boolean
  title: React.ReactNode
}

export function SectionTitle({
  align = 'center',
  description,
  descriptionItalic = false,
  overline,
  showDivider = false,
  title,
}: SectionTitleProps) {
  const isCentered = align === 'center'

  return (
    <Stack className={isCentered ? 'text-center' : 'text-left'}>
      {overline ? <LabelText align={align}>{overline}</LabelText> : null}
      <h2 className={clsx('font-headline text-white')}>{title}</h2>
      {description ? (
        <div className={isCentered ? 'mx-auto max-w-2xl' : ''}>
          <BodyText align={align} italic={descriptionItalic} tone="muted">
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
