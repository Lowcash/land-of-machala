import { Box, Stack } from '@/components/ui/core/layout'
import { BodyText, MetaLabel } from '@/components/ui/core/typography'
import { FlowCard } from '@/components/ui/prefabs/flow-card'

type EntryCardRootProps = React.PropsWithChildren

type EntryCardHeaderProps = {
  description: string
  title: string
}

type EntryCardStatusProps = {
  message?: string
}

type EntryCardDividerProps = {
  label: string
}

type EntryCardFooterProps = React.PropsWithChildren

type EntryCardContentProps = React.PropsWithChildren

type EntryCardSupportProps = {
  children: React.ReactNode
}

function Root({ children }: EntryCardRootProps) {
  return <FlowCard.Root fillHeight>{children}</FlowCard.Root>
}

function Header({ description, title }: EntryCardHeaderProps) {
  return (
    <FlowCard.Header
      description={<span className="hidden lg:inline">{description}</span>}
      descriptionItalic
      title={title}
    />
  )
}

function Status({ message }: EntryCardStatusProps) {
  if (!message) {
    return null
  }

  return (
    <Box border tone="surface">
      <BodyText align="center">{message}</BodyText>
    </Box>
  )
}

function Divider({ label }: EntryCardDividerProps) {
  return (
    <div className="flex w-full items-center">
      <span className="bg-outline-variant/40 h-px flex-1" />
      <MetaLabel tone="muted">{label}</MetaLabel>
      <span className="bg-outline-variant/40 h-px flex-1" />
    </div>
  )
}

function Content({ children }: EntryCardContentProps) {
  return <FlowCard.Content>{children}</FlowCard.Content>
}

function Support({ children }: EntryCardSupportProps) {
  return <Stack>{children}</Stack>
}

function Footer({ children }: EntryCardFooterProps) {
  return (
    <Stack fullWidth justify="between">
      {children}
    </Stack>
  )
}

function Actions({ children }: EntryCardFooterProps) {
  return <FlowCard.Actions>{children}</FlowCard.Actions>
}

export const EntryCard = {
  Actions,
  Content,
  Divider,
  Footer,
  Header,
  Root,
  Status,
  Support,
}
