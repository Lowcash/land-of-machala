import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/layout'
import type { TextAlign } from '@/components/ui/core/typography'

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
}>

type FlowCardActionsProps = React.PropsWithChildren<{
  className?: string
  fullWidth?: boolean
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
}: FlowCardContentProps) {
  return (
    <Stack as={as} className={className} fullWidth={fullWidth}>
      {children}
    </Stack>
  )
}

function Actions({ children, className = '', fullWidth = false }: FlowCardActionsProps) {
  return (
    <Stack align="center" className={className} fullWidth={fullWidth}>
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
