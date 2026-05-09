import clsx from 'clsx'

import { Divider } from '@/components/ui/core/divider'
import { Stack } from '@/components/ui/core/layout'
import { BodyText, HeadingText, LabelText, type TextAlign } from '@/components/ui/core/typography'

export function PageHeadline({ children }: React.PropsWithChildren) {
  return (
    <HeadingText align="left" as="h1" size="page">
      {children}
    </HeadingText>
  )
}

type SectionHeadingProps = {
  align?: TextAlign
  description?: React.ReactNode
  descriptionItalic?: boolean
  descriptionVariant?: 'body' | 'heading'
  descriptionVisibility?: 'always' | 'desktop'
  overline?: React.ReactNode
  showDivider?: boolean
  title: React.ReactNode
}

export function SectionHeading({
  align = 'center',
  description,
  descriptionItalic = false,
  descriptionVariant = 'body',
  descriptionVisibility = 'always',
  overline,
  showDivider = false,
  title,
}: SectionHeadingProps) {
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
            'max-w-2xl',
            isCentered && 'mx-auto',
            descriptionVisibility === 'desktop' && 'hidden lg:flex'
          )}
          fullWidth
          gap="none"
        >
          {descriptionVariant === 'heading' ? (
            <HeadingText align={align} as="p" italic size="section" tone="default">
              {description}
            </HeadingText>
          ) : (
            <BodyText align={align} italic={descriptionItalic} tone="muted">
              {description}
            </BodyText>
          )}
        </Stack>
      ) : null}
      {showDivider ? <Divider align={align} short /> : null}
    </Stack>
  )
}
