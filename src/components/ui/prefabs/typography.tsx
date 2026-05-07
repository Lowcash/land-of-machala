import clsx from 'clsx'

import { Divider } from '@/components/ui/core/divider'
import { Stack } from '@/components/ui/core/layout'
import {
  BodyText,
  HeadingText,
  LabelText,
  TEXT_TRACKING_CLASS,
  type TextAlign,
} from '@/components/ui/core/typography'

const BRAND_WORDMARK_CLASS = clsx(
  'font-wordmark text-primary uppercase',
  TEXT_TRACKING_CLASS.wordmark
)

export function BrandWordmark({ children }: { children: React.ReactNode }) {
  return <p className={BRAND_WORDMARK_CLASS}>{children}</p>
}

export function PageHeadline({ children }: React.PropsWithChildren) {
  return (
    <HeadingText align="left" as="h1" size="page">
      {children}
    </HeadingText>
  )
}

type SectionTitleProps = {
  align?: TextAlign
  description?: React.ReactNode
  descriptionItalic?: boolean
  descriptionVisibility?: 'always' | 'desktop'
  overline?: React.ReactNode
  showDivider?: boolean
  title: React.ReactNode
}

export function SectionTitle({
  align = 'center',
  description,
  descriptionItalic = false,
  descriptionVisibility = 'always',
  overline,
  showDivider = false,
  title,
}: SectionTitleProps) {
  const isCentered = align === 'center'

  return (
    <Stack align={isCentered ? 'center' : 'start'}>
      {overline ? (
        <LabelText align={align} uppercase>
          {overline}
        </LabelText>
      ) : null}
      <HeadingText align={align} as="h2" size="section">
        {title}
      </HeadingText>
      {description ? (
        <Stack
          className={clsx(
            'w-full max-w-2xl',
            isCentered && 'mx-auto',
            descriptionVisibility === 'desktop' && 'hidden lg:flex'
          )}
          fullWidth
          gap="none"
        >
          <BodyText align={align} italic={descriptionItalic} tone="muted">
            {description}
          </BodyText>
        </Stack>
      ) : null}
      {showDivider ? <Divider align={align} short /> : null}
    </Stack>
  )
}
