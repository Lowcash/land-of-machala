import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/layout'
import { SectionTitle } from '@/components/ui/core/typography'

type FlowCardRootProps = React.PropsWithChildren<{
  centered?: boolean
  fillHeight?: boolean
  width?: '3xl' | 'auto'
}>

type FlowCardHeaderProps = {
  description?: React.ReactNode
  descriptionItalic?: boolean
  overline?: React.ReactNode
  showDivider?: boolean
  title: React.ReactNode
}

type FlowCardContentProps = React.PropsWithChildren<{
  as?: 'div' | 'section'
  className?: string
}>
type FlowCardActionsProps = React.PropsWithChildren

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
  description,
  descriptionItalic = false,
  overline,
  showDivider = false,
  title,
}: FlowCardHeaderProps) {
  return (
    <SectionTitle
      description={description}
      descriptionItalic={descriptionItalic}
      overline={overline}
      showDivider={showDivider}
      title={title}
    />
  )
}

function Content({ as = 'div', children, className }: FlowCardContentProps) {
  return (
    <Stack as={as} className={className}>
      {children}
    </Stack>
  )
}

function Actions({ children }: FlowCardActionsProps) {
  return <Stack align="center">{children}</Stack>
}

export const FlowCard = {
  Actions,
  Content,
  Header,
  Root,
} as const
