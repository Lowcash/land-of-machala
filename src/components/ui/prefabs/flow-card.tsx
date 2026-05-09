import { Card } from '@/components/ui/core/card'
import { type FlexGap, Stack } from '@/components/ui/core/layout'
import type { BodyTextSize, TextAlign } from '@/components/ui/core/typography'

import { SectionHeading } from './typography'

type FlowCardRootProps = React.PropsWithChildren<{
  centered?: boolean
  fillHeight?: boolean
  width?: 'auto' | 'content'
}>

type FlowCardHeaderProps = {
  align?: TextAlign
  description?: React.ReactNode
  descriptionItalic?: boolean
  descriptionSize?: BodyTextSize
  descriptionVariant?: 'body' | 'heading'
  descriptionVisibility?: 'always' | 'desktop'
  overline?: React.ReactNode
  showDivider?: boolean
  title: React.ReactNode
}

type FlowCardContentAs = 'div' | 'section'

type FlowCardContentProps = React.PropsWithChildren<{
  as?: FlowCardContentAs
  className?: string
  fullWidth?: boolean
  gap?: FlexGap
}>

type FlowCardActionsProps = React.PropsWithChildren<{
  className?: string
  fullWidth?: boolean
  gap?: FlexGap
}>

function Root({
  centered = false,
  children,
  fillHeight = false,
  width = 'auto',
}: FlowCardRootProps) {
  return (
    <Card centered={centered} fillHeight={fillHeight} width={width}>
      {children}
    </Card>
  )
}

function Header({
  align,
  description,
  descriptionItalic = false,
  descriptionSize = 'body',
  descriptionVariant = 'body',
  descriptionVisibility = 'always',
  overline,
  showDivider = false,
  title,
}: FlowCardHeaderProps) {
  return (
    <SectionHeading
      align={align}
      description={description}
      descriptionItalic={descriptionItalic}
      descriptionSize={descriptionSize}
      descriptionVariant={descriptionVariant}
      descriptionVisibility={descriptionVisibility}
      overline={overline}
      showDivider={showDivider}
      title={title}
    />
  )
}

function Content({
  as = 'div',
  children,
  className = '',
  fullWidth = false,
  gap = 'base',
}: FlowCardContentProps) {
  return (
    <Stack as={as} className={className} fullWidth={fullWidth} gap={gap}>
      {children}
    </Stack>
  )
}

function Actions({
  children,
  className = '',
  fullWidth = false,
  gap = 'base',
}: FlowCardActionsProps) {
  return (
    <Stack align="center" className={className} fullWidth={fullWidth} gap={gap}>
      {children}
    </Stack>
  )
}

export const FlowCard = {
  Actions,
  Content,
  Header,
  Root,
} as const
